#!/usr/bin/env bash
#
# restore-deploy.sh — one-command recovery for the Hummlan deploy after a machine re-image.
#
# WHY THIS EXISTS:
#   The machine has been re-imaged repeatedly (Aug 14, Aug 17, ...). Each re-image wipes
#   /opt/hummlan-web (repo, .env, .next) and port 3000 falls back to the "coming soon"
#   placeholder. Manual restores took ~30 min each. This script makes the next restore
#   a single command.
#
# USAGE:
#   bash /home/team/shared/restore-deploy.sh
#
#   (Run as root — the shared/opt dirs are root-owned. No flags needed; the script is
#    idempotent and safe to re-run: if the app is already healthy it exits 0 immediately
#    without touching anything.)
#
# WHAT IT DOES (only when the deploy is NOT healthy):
#   1. Frees port 3000 (kills placeholder/stale server via lsof; fallback pkill with
#      bracket-guarded patterns so it can never match its own command line)
#   2. Clones hummlanbzns/Hummlan-web to /opt/hummlan-web at origin/main
#      (or fast-forwards an existing repo — never a destructive re-clone of a healthy app)
#   3. Writes .env (chmod 600) from /home/team/shared/.env.hummlan template
#   4. rm -rf .next, npm install, npm run build
#   5. Starts: setsid nohup env PORT=3000 node_modules/.bin/next start -p 3000
#   6. Waits for health: / 200 AND /learn/news contains CONTENT_MARKER (Edition #4)
#
# SAFETY:
#   - If the app is already serving (home 200 + Edition #4 live) → exit 0, no rebuild.
#   - If a `next build` is already running (restore in progress) → WAIT for it, never
#     start a second build.
#   - Secret-free: no credentials are embedded here; Awin creds come from the template.
#
# NOTE: bump CONTENT_MARKER when the weekly digest moves past Edition #4, so the
#       health check keeps matching the live content.

set -uo pipefail

REPO_URL="https://github.com/hummlanbzns/Hummlan-web"
APP_DIR="/opt/hummlan-web"
ENV_TEMPLATE="/home/team/shared/.env.hummlan"
PORT="3000"
BASE_URL="http://localhost:${PORT}"
CONTENT_MARKER="Edition #4"        # bump when digest moves past Edition #4
START_TIMEOUT=180                  # seconds to wait for the server to come up
BUILD_WAIT_TIMEOUT=1500            # seconds to wait for an already-running build

log() { printf '[restore-deploy] %s\n' "$*"; }
die() { log "ERROR: $*"; exit 1; }

# --- health: home 200 AND /learn/news contains the content marker ---
is_healthy() {
  curl -sf -o /dev/null "$BASE_URL/" || return 1
  local news
  news="$(curl -sf "$BASE_URL/learn/news")" || return 1
  case "$news" in
    *"$CONTENT_MARKER"*) return 0 ;;
  esac
  return 1
}

# --- free port 3000 (placeholder bun / stale next-server) ---
free_port_3000() {
  log "Freeing port $PORT (placeholder/stale server)"
  local pids
  pids="$(lsof -t -iTCP:"$PORT" -sTCP:LISTEN 2>/dev/null || true)"
  if [ -n "$pids" ]; then
    log "  killing listener PID(s): $(echo "$pids" | tr '\n' ' ')"
    # shellcheck disable=SC2086  # intended word-splitting (newline-separated PIDs)
    kill $pids 2>/dev/null || true
    sleep 2
    # shellcheck disable=SC2086
    kill -9 $pids 2>/dev/null || true
    sleep 1
  fi
  # Belt-and-braces: bracket-guarded patterns never match this script's own command line
  pkill -f '[n]ext-server' 2>/dev/null || true
  pkill -x bun 2>/dev/null || true   # placeholder runs as bare `bun`
  sleep 1
}

# --- .env from stored template (gitignored, chmod 600) ---
setup_env() {
  if [ -f "$ENV_TEMPLATE" ]; then
    log "Writing .env from template $ENV_TEMPLATE"
    cp "$ENV_TEMPLATE" "$APP_DIR/.env"
    chmod 600 "$APP_DIR/.env"
  elif [ -f "$APP_DIR/.env" ]; then
    log "WARNING: $ENV_TEMPLATE missing — keeping existing $APP_DIR/.env"
  else
    log "WARNING: no .env template and no existing .env — continuing WITHOUT Awin credentials"
  fi
}

# --- wait for the server to become healthy ---
wait_for_health() {
  local waited=0
  while [ "$waited" -lt "$START_TIMEOUT" ]; do
    if is_healthy; then return 0; fi
    sleep 5
    waited=$((waited + 5))
  done
  log "Server did not become healthy within ${START_TIMEOUT}s. Last lines of $APP_DIR/.run/server.log:"
  tail -20 "$APP_DIR/.run/server.log" 2>/dev/null || true
  return 1
}

main() {
  log "Hummlan deploy-restore starting (port $PORT)"

  # 1) Already healthy → nothing to do (idempotent, no destructive re-clone)
  if [ -d "$APP_DIR/.git" ] && is_healthy; then
    log "Deploy is ALREADY healthy (home 200, '$CONTENT_MARKER' live on /learn/news). Nothing to do — exiting 0."
    exit 0
  fi

  # 2) Restore already in progress? Wait for the running build — never start a second one
  if pgrep -f '[n]ext build' >/dev/null 2>&1; then
    log "A 'next build' is already running — waiting up to ${BUILD_WAIT_TIMEOUT}s for it (no second build started)..."
    local waited=0
    while pgrep -f '[n]ext build' >/dev/null 2>&1 && [ "$waited" -lt "$BUILD_WAIT_TIMEOUT" ]; do
      sleep 10
      waited=$((waited + 10))
    done
    if is_healthy; then
      log "The in-progress restore finished; deploy is now healthy."
      exit 0
    fi
    log "Build finished but deploy still not healthy — continuing with restore."
  fi

  # 3) Free port 3000
  free_port_3000

  # 4) Obtain the repo at origin/main
  if [ -d "$APP_DIR/.git" ]; then
    log "Updating existing repo at $APP_DIR to origin/main"
    git -C "$APP_DIR" fetch origin --quiet || die "git fetch failed"
    git -C "$APP_DIR" checkout main --quiet 2>/dev/null || true
    # Deterministic restore target = origin/main; local /opt changes are discardable
    git -C "$APP_DIR" reset --hard origin/main --quiet || die "git reset --hard failed"
  else
    log "Cloning $REPO_URL"
    rm -rf "$APP_DIR"   # remove any partial/non-git leftovers first
    git clone --quiet "$REPO_URL" "$APP_DIR" || die "git clone failed"
  fi
  log "Now at: $(git -C "$APP_DIR" log --oneline -1)"

  # 5) .env from template
  setup_env

  # 6) Build (memory-light: single sequential build, no parallel tooling)
  cd "$APP_DIR" || die "cd $APP_DIR failed"
  log "Removing stale .next"
  rm -rf .next
  log "npm install (may take a few minutes)"
  npm install --no-audit --no-fund || die "npm install failed"
  log "npm run build (may take a few minutes)"
  npm run build || die "npm run build failed"

  # 7) Start production server on port 3000 (env exports PORT=80 — must override)
  mkdir -p .run
  log "Starting next server on port $PORT"
  setsid nohup env PORT="$PORT" node_modules/.bin/next start -p "$PORT" > .run/server.log 2>&1 &
  disown 2>/dev/null || true

  # 8) Wait for health
  wait_for_health || die "server not healthy after ${START_TIMEOUT}s — see $APP_DIR/.run/server.log"

  log "RESTORE COMPLETE — Hummlan is live on port $PORT ('$CONTENT_MARKER' verified)."
}

main "$@"
