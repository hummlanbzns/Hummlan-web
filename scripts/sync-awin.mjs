#!/usr/bin/env node
/**
 * sync-awin.mjs — Awin affiliate link sync script
 *
 * Fetches the owner's approved Awin programmes, matches them to brands in the
 * Hummlan DB, and upserts real commission-tracking deep links into the
 * affiliate_links table in place of plain direct URLs that earn nothing.
 *
 * Usage:
 *   node scripts/sync-awin.mjs            # live run
 *   node scripts/sync-awin.mjs --dry-run  # preview only
 *
 * Requires: AWIN_PUBLISHER_ID & AWIN_API_KEY in .env (or env).
 *           TEAM_DB_URL & TEAM_DB_AUTH_TOKEN in env (set by the platform).
 * Never commit credentials.
 */

import { readFileSync, existsSync } from 'fs';
import { createClient } from '@libsql/client';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ── Config ──────────────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes('--dry-run');
const BASE_URL = 'https://api.awin.com';

// ── Load .env ───────────────────────────────────────────────────────────────
function loadEnv() {
  const envPath = resolve(__dirname, '..', '.env');
  if (!existsSync(envPath)) {
    console.error('ERROR: .env file not found at', envPath);
    process.exit(1);
  }
  const text = readFileSync(envPath, 'utf-8');
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    process.env[key] = val;
  }
}

loadEnv();

const PUBLISHER_ID = process.env.AWIN_PUBLISHER_ID;
const API_KEY = process.env.AWIN_API_KEY;
const DB_URL = process.env.TEAM_DB_URL;
const DB_TOKEN = process.env.TEAM_DB_AUTH_TOKEN;

if (!PUBLISHER_ID || !API_KEY) {
  console.error('ERROR: AWIN_PUBLISHER_ID and AWIN_API_KEY must be set in .env');
  process.exit(1);
}
if (!DB_URL || !DB_TOKEN) {
  console.error('ERROR: TEAM_DB_URL and TEAM_DB_AUTH_TOKEN must be set');
  process.exit(1);
}

// ── DB client ────────────────────────────────────────────────────────────────
const db = createClient({ url: DB_URL, authToken: DB_TOKEN });

async function dbQuery(sql, args = []) {
  const rs = await db.execute({ sql, args });
  return rs.rows;
}

// ── Awin API helpers ────────────────────────────────────────────────────────
async function awinFetch(path) {
  const url = `${BASE_URL}${path}`;
  console.log(`  GET ${url}`);
  const resp = await fetch(url, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  if (!resp.ok) {
    const body = await resp.text().catch(() => '');
    throw new Error(`Awin API ${resp.status}: ${body.slice(0, 200)}`);
  }
  return resp.json();
}

// ── Normalise brand name for fuzzy matching ────────────────────────────────
function normalise(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '').replace(/&/g, 'and').trim();
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log('=== Awin Affiliate Sync ===');
  if (DRY_RUN) console.log('>>> DRY RUN — no changes will be made <<<\n');

  // 1. Fetch joined programmes
  console.log('\n[1/4] Fetching joined Awin programmes...');
  let programmes;
  try {
    programmes = await awinFetch(`/publishers/${PUBLISHER_ID}/programmes?relationship=joined`);
  } catch (err) {
    const resp = await fetch(`${BASE_URL}/publishers/${PUBLISHER_ID}/programmes?relationship=joined`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    const text = await resp.text();
    console.error('  Failed to fetch programmes:', err.message);
    console.log('  Raw response (first 500 chars):', text.slice(0, 500));
    process.exit(1);
  }

  if (!Array.isArray(programmes) || programmes.length === 0) {
    console.log('  No joined programmes found. Response:', JSON.stringify(programmes).slice(0, 500));
    process.exit(0);
  }

  console.log(`  Found ${programmes.length} joined programme(s):`);
  for (const p of programmes) {
    console.log(`    - ${p.name || '(unnamed)'} (advertiserId: ${p.id})`);
  }

  // 2. Load brands from DB
  console.log('\n[2/4] Matching programmes to brands...');
  const brands = await dbQuery('SELECT id, name FROM brands');
  const brandMap = {};
  for (const b of brands) {
    brandMap[normalise(b.name)] = b.id;
  }

  const matched = [];
  for (const prog of programmes) {
    const progName = prog.name || '';
    const norm = normalise(progName);
    if (brandMap[norm]) {
      matched.push({
        programme: prog,
        brandId: brandMap[norm],
        brandName: brands.find(b => b.id === brandMap[norm])?.name || progName,
      });
      console.log(`  ✓ "${progName}" → brand "${brandMap[norm]}"`);
    } else {
      console.log(`  ✗ "${progName}" → no matching brand found (normalised: "${norm}")`);
    }
  }

  if (matched.length === 0) {
    console.log('  No brands matched. Exiting.');
    process.exit(0);
  }

  // 3. For each matched brand, get products and build links
  console.log('\n[3/4] Building Awin tracking links...');

  const operations = []; // { type: 'insert'|'deactivate', ... }

  for (const { programme, brandId, brandName } of matched) {
    const advertiserId = programme.id;
    if (!advertiserId) {
      console.warn(`  ⚠ Programme "${programme.name}" has no id, skipping`);
      continue;
    }

    // Get products for this brand
    const products = await dbQuery('SELECT id, name, slug FROM products WHERE brand_id = ?', [brandId]);
    if (products.length === 0) {
      console.log(`  - ${brandName}: no products found in DB, skipping`);
      continue;
    }

    console.log(`\n  ${brandName} (advertiserId: ${advertiserId}) — ${products.length} product(s)`);

    for (const product of products) {
      // Find best destination URL
      // Priority: 1) product-specific non-Awin URL, 2) any non-Awin URL, 3) brand website
      let destinationUrl;
      let price = 0;

      // Try product-specific URLs first (inactive rows may have better URLs than active homepage links)
      const specificLinks = await dbQuery(
        `SELECT id, affiliate_url, price FROM affiliate_links
         WHERE product_id = ? AND affiliate_url NOT LIKE '%awin1.com%' AND affiliate_url NOT LIKE '%?srsltid%'
         ORDER BY is_active DESC, LENGTH(affiliate_url) ASC LIMIT 1`,
        [product.id]
      );

      if (specificLinks.length > 0 && specificLinks[0].affiliate_url) {
        destinationUrl = specificLinks[0].affiliate_url;
        // Get price from any active link regardless of source
        const activePricing = await dbQuery(
          'SELECT price FROM affiliate_links WHERE product_id = ? AND is_active = 1 AND price > 0 ORDER BY price ASC LIMIT 1',
          [product.id]
        );
        price = activePricing.length > 0 ? activePricing[0].price : 0;
      } else {
        // Fallback: any non-Awin link
        const existingLinks = await dbQuery(
          'SELECT affiliate_url FROM affiliate_links WHERE product_id = ? AND affiliate_url NOT LIKE \'%awin1.com%\' ORDER BY is_active DESC LIMIT 1',
          [product.id]
        );
        if (existingLinks.length > 0 && existingLinks[0].affiliate_url) {
          destinationUrl = existingLinks[0].affiliate_url;
        } else {
          // Fallback: brand website
          const brandInfo = await dbQuery('SELECT website_url FROM brands WHERE id = ?', [brandId]);
          destinationUrl = brandInfo.length > 0 && brandInfo[0].website_url
            ? brandInfo[0].website_url
            : `https://${brandId}.com`;
        }

        const activeLink = await dbQuery(
          'SELECT price FROM affiliate_links WHERE product_id = ? AND is_active = 1 ORDER BY price ASC LIMIT 1',
          [product.id]
        );
        price = activeLink.length > 0 ? activeLink[0].price : 0;
      }

      if (!destinationUrl || destinationUrl === '') {
        destinationUrl = programme.url || `https://${brandId}.com`;
      }

      // Build Awin tracking link
      const encodedUrl = encodeURIComponent(destinationUrl);
      const affiliateUrl = `https://www.awin1.com/cread.php?awinmid=${advertiserId}&awinaffid=${PUBLISHER_ID}&ued=${encodedUrl}`;

      // Check if an Awin link already exists for this product + brand to avoid duplicates
      const existingAwin = await dbQuery(
        'SELECT id FROM affiliate_links WHERE product_id = ? AND vendor_name = ?',
        [product.id, `${brandName} (Awin)`]
      );

      const linkId = existingAwin.length > 0
        ? existingAwin[0].id
        : `al_awin_${brandId}_${product.id}`;

      // Find old plain links to deactivate (non-Awin, active)
      const oldLinks = await dbQuery(
        'SELECT id FROM affiliate_links WHERE product_id = ? AND affiliate_url NOT LIKE \'%awin1.com%\' AND is_active = 1',
        [product.id]
      );

      operations.push({
        type: 'upsert',
        id: linkId,
        productId: product.id,
        brandName,
        affiliateUrl,
        price,
        isNew: existingAwin.length === 0,
      });

      for (const old of oldLinks) {
        operations.push({
          type: 'deactivate',
          id: old.id,
          productId: product.id,
        });
      }

      console.log(`    ${product.name}:`);
      console.log(`      URL: ${affiliateUrl}`);
      console.log(`      Price: $${price}`);
      console.log(`      (${existingAwin.length > 0 ? 'UPDATE existing' : 'INSERT new'})`);
      if (oldLinks.length > 0) {
        console.log(`      → Will deactivate ${oldLinks.length} old direct link(s)`);
      }
    }
  }

  // 4. Apply changes
  console.log('\n[4/4] Applying changes...');
  const upsertOps = operations.filter(o => o.type === 'upsert');
  const deactivateOps = operations.filter(o => o.type === 'deactivate');
  console.log(`  → ${upsertOps.length} Awin link(s) to upsert`);
  console.log(`  → ${deactivateOps.length} old direct link(s) to deactivate`);

  if (DRY_RUN) {
    console.log('\n>>> DRY RUN — no changes made <<<');
    return;
  }

  // Upsert Awin links
  let inserted = 0;
  let updated = 0;
  for (const op of upsertOps) {
    const now = new Date().toISOString();
    if (op.isNew) {
      await db.execute({
        sql: `INSERT INTO affiliate_links (id, product_id, vendor_name, affiliate_url, price, currency, is_active, last_fetched_at)
              VALUES (?, ?, ?, ?, ?, 'USD', 1, ?)`,
        args: [op.id, op.productId, `${op.brandName} (Awin)`, op.affiliateUrl, op.price, now],
      });
      inserted++;
    } else {
      await db.execute({
        sql: `UPDATE affiliate_links SET affiliate_url = ?, price = ?, is_active = 1, last_fetched_at = ?
              WHERE id = ?`,
        args: [op.affiliateUrl, op.price, now, op.id],
      });
      updated++;
    }
  }

  // Deactivate old plain links
  let deactivated = 0;
  for (const op of deactivateOps) {
    if (op.id === null) {
      // Rows with null id — deactivate by product_id + non-awin pattern
      await db.execute({
        sql: `UPDATE affiliate_links SET is_active = 0
              WHERE product_id = ? AND affiliate_url NOT LIKE '%awin1.com%' AND is_active = 1`,
        args: [op.productId],
      });
    } else {
      await db.execute({
        sql: 'UPDATE affiliate_links SET is_active = 0 WHERE id = ? AND is_active = 1',
        args: [op.id],
      });
    }
    deactivated++;
  }

  console.log(`\n✅ Done! ${inserted} inserted, ${updated} updated, ${deactivated} deactivated.`);
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});