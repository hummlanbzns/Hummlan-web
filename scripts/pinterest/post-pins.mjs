#!/usr/bin/env node
/**
 * Hummlan Pinterest auto-poster (API v5).
 *
 * Reads the structured pin pack (scripts/pinterest/pin-pack-1.json) and creates
 * each pin via the Pinterest API. Safe to re-run: already-posted pins are tracked
 * in a state file and skipped (no duplicates).
 *
 * Env (never commit these):
 *   PINTEREST_ACCESS_TOKEN   required (pins:read/write scope)
 *   PINTEREST_BOARD_ID       optional override for every pin
 *   PINTEREST_SANDBOX=1      route to the sandbox API (api-sandbox.pinterest.com)
 *                            instead of production. NOTE: sandbox requires a
 *                            sandbox-scoped token; the production user OAuth token
 *                            does NOT authenticate there (verified: code 2).
 *
 * Usage:
 *   node scripts/pinterest/post-pins.mjs --dry            # list what WOULD be posted
 *   node scripts/pinterest/post-pins.mjs --pin patagonia  # post one pin (by id)
 *   node scripts/pinterest/post-pins.mjs --sandbox        # run against the sandbox API
 *   node scripts/pinterest/post-pins.mjs                  # post all un-posted pins
 *
 * Notes:
 *   - image_url pins (media_source.source_type="image_url") are posted with the
 *     given URL. Generated pins use the hummlan.com public URL derived from
 *     PUBLIC_URL_PREFIX (default https://hummlan.com) + the image_file path.
 *   - The 'link' field is only set for business accounts; this one is a business
 *     account, so it is included. Pinterest may still require a manual "apply
 *     link" step after creation — that is handled server-side; we just read the
 *     returned pin URL.
 *   - State file: scripts/pinterest/.posted.json (gitignored).
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACK_PATH = join(__dirname, 'pin-pack-1.json');
const args0 = process.argv.slice(2);
const SANDBOX0 = args0.includes('--sandbox') || process.env.PINTEREST_SANDBOX === '1';
const STATE_PATH = join(__dirname, SANDBOX0 ? '.posted.sandbox.json' : '.posted.json');
const PUBLIC_URL_PREFIX = process.env.PUBLIC_URL_PREFIX || 'https://hummlan.com';

const TOKEN = process.env.PINTEREST_ACCESS_TOKEN;
const BOARD_OVERRIDE = process.env.PINTEREST_BOARD_ID;

const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const SANDBOX = args.includes('--sandbox') || process.env.PINTEREST_SANDBOX === '1';
const onlyPin = args.includes('--pin') ? args[args.indexOf('--pin') + 1] : null;
const API_BASE = SANDBOX
  ? 'https://api-sandbox.pinterest.com/v5'
  : 'https://api.pinterest.com/v5';

const pack = JSON.parse(readFileSync(PACK_PATH, 'utf8'));
const state = existsSync(STATE_PATH) ? JSON.parse(readFileSync(STATE_PATH, 'utf8')) : { posted: [] };
const posted = new Set(state.posted);

function resolveImage(pin) {
  if (pin.image_generated) {
    return `${PUBLIC_URL_PREFIX}/${pin.image_file}`;
  }
  return pin.image_url;
}

function saveState() {
  writeFileSync(STATE_PATH, JSON.stringify({ posted: [...posted] }, null, 2) + '\n');
}

async function createPin(pin) {
  const board = BOARD_OVERRIDE || pin.board;
  const payload = {
    board_id: board,
    title: pin.title,
    description: pin.description,
    link: pin.link, // business account
    media_source: { source_type: 'image_url', url: resolveImage(pin) },
  };
  const res = await fetch(`${API_BASE}/pins`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let json = {};
  try { json = JSON.parse(text); } catch { /* keep raw */ }
  if (!res.ok) {
    throw new Error(`Pinterest API ${res.status}: ${json.message || text}`);
  }
  return json;
}

async function main() {
  if (!TOKEN) {
    console.error('ERR: PINTEREST_ACCESS_TOKEN not set in env.');
    process.exit(1);
  }

  const pins = pack.pins.filter((p) => (onlyPin ? p.id === onlyPin : true));
  if (onlyPin && pins.length === 0) {
    console.error(`ERR: no pin with id "${onlyPin}" in ${PACK_PATH}`);
    process.exit(1);
  }

  const pending = pins.filter((p) => !posted.has(p.id));

  console.log(`Pack: ${pack.pins.length} pins | ${posted.size} already posted | ${pending.length} pending | ${DRY ? 'DRY-RUN' : 'LIVE'} | ${SANDBOX ? 'SANDBOX' : 'PRODUCTION'}\n`);

  for (const pin of pending) {
    const action = DRY ? 'WOULD POST' : 'POSTING';
    console.log(`[${action}] ${pin.id}`);
    console.log(`  api   : ${API_BASE}`);
    console.log(`  title : ${pin.title}`);
    console.log(`  board : ${BOARD_OVERRIDE || pin.board}`);
    console.log(`  link  : ${pin.link}`);
    console.log(`  image : ${resolveImage(pin)}`);
    if (DRY) {
      console.log('  (dry) no API call made\n');
      continue;
    }
    try {
      const created = await createPin(pin);
      posted.add(pin.id);
      saveState();
      const pinUrl = created.pin_url || created.id || '(see pin_url in API response)';
      console.log(`  OK -> ${pinUrl}`);
      console.log('  NOTE: for business links, Pinterest may show the link only after you click "Apply link" on the pin.\n');
    } catch (e) {
      console.error(`  FAIL: ${e.message}\n`);
    }
  }

  console.log(`Done. ${pending.length} processed (${DRY ? 'dry' : 'live'}). Total posted on record: ${posted.size}`);
  if (!DRY && !onlyPin) {
    console.log('State saved to .posted.json');
  }
}

main();
