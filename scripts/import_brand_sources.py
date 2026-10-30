#!/usr/bin/env python3
"""Import verified brand sources into the `brand_sources` table.

Usage:
    python3 scripts/import_brand_sources.py data/brand-sources/batch-01.json
    python3 scripts/import_brand_sources.py data/brand-sources/*.json --dry-run

The JSON file is a dict keyed by brand **slug**; each value is a list of source
objects with the keys: pillar, title, publisher, url, source_type,
published_date, supports, is_primary. `accessed_date` defaults to the file's
`_meta.accessed_date`, else today (UTC).

Adding a new batch is a data-only drop-in: drop a new JSON file in
data/brand-sources/ and run the script. No code changes needed.

Rows are upserted idempotently. The id is derived from brand_id + pillar +
url, so re-running the same file updates in place instead of duplicating.
"""
import argparse
import datetime as _dt
import hashlib
import json
import os
import subprocess
import sys
import urllib.request

PILLARS = {"climate", "circular", "pollution", "supply_chain", "biodiversity"}
SOURCE_TYPES = {
    "company_report", "certifier", "regulator", "ngo", "news", "academic", "industry",
}


def db_http_url():
    url = os.environ.get("TEAM_DB_URL", "")
    if not url:
        sys.exit("TEAM_DB_URL is not set")
    if url.startswith("libsql://"):
        url = "https://" + url[len("libsql://"):]
    return url.rstrip("/") + "/v2/pipeline"


def arg(value, kind="text"):
    if value is None:
        return {"type": "null"}
    if kind == "integer":
        return {"type": "integer", "value": str(int(value))}
    return {"type": "text", "value": str(value)}


def execute_pipeline(statements):
    """Run a list of (sql, args) tuples in one Turso HTTP pipeline request."""
    token = os.environ.get("TEAM_DB_AUTH_TOKEN")
    if not token:
        sys.exit("TEAM_DB_AUTH_TOKEN is not set")
    requests = [
        {"type": "execute", "stmt": {"sql": sql, "args": args}}
        for sql, args in statements
    ]
    requests.append({"type": "close"})
    body = json.dumps({"requests": requests}).encode()
    req = urllib.request.Request(
        db_http_url(),
        data=body,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        payload = json.loads(resp.read().decode())
    errors = []
    for i, result in enumerate(payload.get("results", [])):
        if result.get("type") == "error":
            errors.append((i, result.get("error")))
    return errors


def fetch_brand_ids(slugs):
    """Resolve slug -> brands.id, using the same pipeline endpoint."""
    token = os.environ.get("TEAM_DB_AUTH_TOKEN")
    placeholders = ",".join("?" for _ in slugs)
    sql = f"SELECT id, slug FROM brands WHERE slug IN ({placeholders})"
    body = json.dumps({
        "requests": [
            {"type": "execute", "stmt": {"sql": sql, "args": [arg(s) for s in slugs]}},
            {"type": "close"},
        ]
    }).encode()
    req = urllib.request.Request(
        db_http_url(),
        data=body,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        payload = json.loads(resp.read().decode())
    rows = payload["results"][0]["response"]["result"]["rows"]
    cols = [c["name"] for c in payload["results"][0]["response"]["result"]["cols"]]
    i_id, i_slug = cols.index("id"), cols.index("slug")
    return {r[i_slug]["value"]: r[i_id]["value"] for r in rows}


def source_id(brand_id, pillar, url):
    key = f"{brand_id}|{pillar or 'overall'}|{url}".lower()
    return "bs_" + hashlib.sha1(key.encode()).hexdigest()[:20]


def validate(slug, src, index):
    problems = []
    if not src.get("url", "").startswith("http"):
        problems.append("url must be an absolute http(s) URL")
    if not src.get("title"):
        problems.append("title is required")
    if src.get("pillar") is not None and src["pillar"] not in PILLARS:
        problems.append(f"pillar must be one of {sorted(PILLARS)} or null")
    if src.get("source_type") not in SOURCE_TYPES:
        problems.append(f"source_type must be one of {sorted(SOURCE_TYPES)}")
    if not src.get("supports"):
        problems.append("supports (one-line claim) is required")
    if not src.get("accessed_date"):
        problems.append("accessed_date is required")
    return [f"{slug}[{index}]: {p}" for p in problems]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("files", nargs="+")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--accessed-date", default=None,
                    help="override accessed date (YYYY-MM-DD); defaults to _meta or today")
    args = ap.parse_args()

    today = args.accessed_date or _dt.datetime.now(_dt.timezone.utc).strftime("%Y-%m-%d")
    data, errors = {}, []
    for path in args.files:
        with open(path, encoding="utf-8") as fh:
            payload = json.load(fh)
        meta_date = (payload.get("_meta") or {}).get("accessed_date")
        for slug, sources in payload.items():
            if slug.startswith("_"):
                continue
            for i, src in enumerate(sources):
                src = dict(src)
                src.setdefault("accessed_date", meta_date or today)
                data.setdefault(slug, []).append(src)

    for slug, sources in data.items():
        for i, src in enumerate(sources):
            errors += validate(slug, src, i)
    if errors:
        print("VALIDATION FAILED:", *errors, sep="\n  ")
        return 1

    brand_ids = fetch_brand_ids(list(data.keys()))
    missing = [s for s in data if s not in brand_ids]
    if missing:
        print("Unknown brand slugs (no row in brands):", ", ".join(missing))
        return 1

    statements, total = [], 0
    for slug, sources in data.items():
        brand_id = brand_ids[slug]
        # Idempotent: clear this brand's rows, then insert the batch rows.
        statements.append(("DELETE FROM brand_sources WHERE brand_id = ?", [arg(brand_id)]))
        for src in sources:
            sid = source_id(brand_id, src.get("pillar"), src["url"])
            statements.append((
                """INSERT INTO brand_sources
                   (id, brand_id, pillar, title, publisher, url, source_type,
                    published_date, accessed_date, supports, is_primary, created_at)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                [
                    arg(sid), arg(brand_id), arg(src.get("pillar")), arg(src["title"]),
                    arg(src.get("publisher")), arg(src["url"]), arg(src.get("source_type")),
                    arg(src.get("published_date")), arg(src["accessed_date"]),
                    arg(src.get("supports")), arg(int(bool(src.get("is_primary"))), "integer"),
                    arg(_dt.datetime.now(_dt.timezone.utc).strftime("%Y-%m-%d %H:%M:%S")),
                ],
            ))
            total += 1

    print(f"{len(data)} brands, {total} sources, {len(statements)} statements")
    if args.dry_run:
        print("dry run — nothing written")
        return 0

    errs = execute_pipeline(statements)
    if errs:
        print("DB errors:", errs[:5])
        return 1
    print(f"OK — wrote {total} sources for {len(data)} brands")
    return 0


if __name__ == "__main__":
    sys.exit(main())
