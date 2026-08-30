# Pinterest Auto-Posting (Hummlan)

Durable, repeatable capability to auto-post Hummlan pins to the owner's Pinterest
business account (`pinterest.com/Hummmlan`) via the Pinterest API v5.

## Files
- `pin-pack-1.json` — structured source for the first 10 pins (title, description,
  destination link, image, target board), derived from `/home/team/shared/pinterest-pin-pack-1.md`.
- `post-pins.mjs` — the poster. Reads the pack + env, creates pins via `POST /v5/pins`,
  skips already-posted pins (dedup state in `.posted.json`, gitignored).
- `generate-pin-images.mjs` — generates the 9 branded 1000×1500 pin graphics
  (SVG → PNG via `sharp`) into `public/pins/`. Dr. Bronner's pin 3 is not generated —
  it uses a real product photo URL from the pack.

## Setup / secrets (never commit)
Set in the environment (machine Secrets / env, NOT in any committed file):
```
PINTEREST_ACCESS_TOKEN=...   (REQUIRED)
PINTEREST_APP_ID=...         (metadata only, not used at runtime)
PINTEREST_APP_SECRET=...     (metadata only, not used at runtime)
PINTEREST_BOARD_ID=...       (optional override for every pin)
PUBLIC_URL_PREFIX=...        (optional; default https://hummlan.com)
```

## Usage
```bash
# list what WOULD be posted (no API calls)
node scripts/pinterest/post-pins.mjs --dry

# run against the SANDBOX API (api-sandbox.pinterest.com) instead of production
node scripts/pinterest/post-pins.mjs --dry --sandbox     # dry-run against sandbox
node scripts/pinterest/post-pins.mjs --sandbox --pin patagonia   # post one pin to sandbox

# post one specific pin (by id in pin-pack-1.json) — production
node scripts/pinterest/post-pins.mjs --pin dr-bronners

# post everything not yet posted — production
node scripts/pinterest/post-pins.mjs
```
Re-runs are safe: each successfully-created pin is recorded in `.posted.json` (production) or
`.posted.sandbox.json` (sandbox, kept separate so sandbox posts never collide with production
dedup) and skipped. Posting is at the user's discretion (lead decides the full 5–10/week schedule).

## Regenerating the pin images
`sharp` is intentionally NOT a repo dependency (generation-time tool only). The committed
`public/pins/*.png` are the durable deliverable. To regenerate:
```bash
mkdir -p /tmp/pinimg && cd /tmp/pinimg && npm init -y && npm i sharp
node /opt/hummlan-web/scripts/pinterest/generate-pin-images.mjs /tmp/pinimg/node_modules
```

## Boards
Owner account `Hummmlan` boards (read via API): Bamboo Cool, Educational,
Products (947093065328074979), Sustainable Clothing for Men/Women, etc.
Target board is per-pin (`board` field) or overridable via `PINTEREST_BOARD_ID`.

## ⚠️ Token scopes (verified 2026-08-30)
The current `PINTEREST_ACCESS_TOKEN` is READ-only for pins:
- `GET /v5/boards` → OK (boards:read) — account + boards confirmed.
- `POST /v5/pins` → **HTTP 401 `Missing: ['boards:write', 'pins:write']`**.
- `POST /v5/boards` → **HTTP 401 `Missing: ['boards:write']`**.

So the capability is built and validated for reading, but **live pin creation cannot proceed
until the owner re-authorizes the app token with `pins:write`** (and `boards:write` if a
dedicated "Hummlan — Sustainable Ratings" board is desired). No pin was posted. Once the token
has write scopes, `--dry` then `--pin <id>` proves E2E, and the lead/owner schedules the full pack.

**Sandbox note (verified 2026-08-30):** `--sandbox` switches the base URL to
`api-sandbox.pinterest.com`, but the production OAuth token does NOT authenticate on the
sandbox (GET boards, GET user_account, and POST pins all return `Authentication failed`, HTTP 401).
A sandbox-scoped test-user token is required to create a real pin in sandbox. See
`/home/team/shared/pinterest-review-video-checklist.md` for the production-access review flow.
