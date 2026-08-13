#!/usr/bin/env python3
"""
Harvest product images for Hummlan products (audit finding M3).

Strategy (honest, every URL verified):
  1. Products with a DIRECT brand/vendor link to a Shopify store -> fetch the
     store's /products.json catalog, fuzzy-match the product title, use the
     catalog image (real product photo).
  2. All remaining products -> fall back to the brand logo URL (verified in
     earlier audit work; sanctioned fallback in the task).
  3. Brands with no logo URL -> leave NULL (frontend placeholder shown).

Every candidate URL is verified with an HTTP GET: must return 200 and an
image/* content type, or it is discarded.

Usage: python3 harvest_product_images.py products_export.json
Output: image_map.json (verified slug -> {url, source}), no_image.json (slugs left empty)
"""
import json, re, sys, subprocess, time, urllib.request

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36"

# vendor_name -> (catalog URL, title-match key)
CATALOGS = {
    "Pact Organic": "https://wearpact.com/products.json?limit=250",
    "Brand Direct": "https://www.drbronner.com/products.json?limit=250",
    "Jungle Culture (Awin)": "https://jungleculture.eco/products.json?limit=250",
    "Acure": "https://acure.com/products.json?limit=250",
    "Quiet Dose (Awin)": "https://quietdose.com/products.json?limit=250",
}

def fetch(url, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", "replace")

def norm(s):
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", " ", s)
    # drop common size/quantity words that shouldn't gate matching
    s = re.sub(r"\b(organic|set|oz|ml|pack|size|us|mens|womens|s mens|unscented|2x|32oz|16oz|8oz|12oz|24oz)\b", " ", s)
    return " ".join(s.split())

def token_score(a, b):
    ta, tb = norm(a).split(), norm(b).split()
    if not ta or not tb:
        return 0
    inter = set(ta) & set(tb)
    return len(inter) / max(len(ta), len(tb))

def load_catalog(url):
    try:
        data = json.loads(fetch(url))
        return data.get("products", [])
    except Exception as e:
        print(f"  [warn] catalog fetch failed {url}: {e}", file=sys.stderr)
        return []

def verify_image(url):
    """Return True if url resolves to an image (HTTP 200 + image content-type)."""
    try:
        req = urllib.request.Request(url, method="GET", headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=20) as r:
            ct = r.headers.get("Content-Type", "")
            if r.status == 200 and ct.startswith("image/"):
                return True
            print(f"  [reject] {r.status} {ct} {url}", file=sys.stderr)
    except Exception as e:
        print(f"  [reject] {e} {url}", file=sys.stderr)
    return False

def main():
    export_path = sys.argv[1] if len(sys.argv) > 1 else "/tmp/products-export.json"
    rows = json.load(open(export_path))

    # Preload catalogs per vendor
    catalogs = {}
    for vendor, url in CATALOGS.items():
        prods = load_catalog(url)
        catalogs[vendor] = prods
        print(f"catalog {vendor}: {len(prods)} products", file=sys.stderr)
        time.sleep(1)

    image_map = {}   # slug -> {"url":..., "source": "product"|"brand_logo"}
    no_image = []    # slugs left without an image

    for r in rows:
        slug, vendor = r["product_slug"], r["vendor_name"]
        if vendor in CATALOGS and catalogs[vendor]:
            best, best_score = None, 0.0
            for cp in catalogs[vendor]:
                sc = token_score(r["product_name"], cp.get("title", ""))
                if sc > best_score:
                    best, best_score = cp, sc
            if best and best_score >= 0.5 and best.get("images"):
                img = best["images"][0].get("src")
                if img:
                    image_map[slug] = {"url": img, "source": "product", "matched": best.get("title"), "score": round(best_score, 2)}
                    continue
                print(f"  [warn] {slug}: matched '{best.get('title')}' but no image", file=sys.stderr)
            else:
                print(f"  [warn] {slug}: no confident match ({best_score:.2f}) in {vendor}", file=sys.stderr)
        # fallback: brand logo
        logo = r.get("brand_logo")
        if logo:
            image_map[slug] = {"url": logo, "source": "brand_logo", "brand": r.get("brand_name")}
        else:
            no_image.append({"slug": slug, "brand": r.get("brand_name"), "reason": "brand has no logo"})

    # ---- verification pass (parallel-ish, throttled) ----
    print(f"\nverifying {len(image_map)} candidate URLs ...", file=sys.stderr)
    verified, rejected = {}, 0
    for i, (slug, info) in enumerate(image_map.items()):
        if verify_image(info["url"]):
            verified[slug] = info
        else:
            rejected += 1
            no_image.append({"slug": slug, "brand": info.get("brand", "?"), "reason": f"unverified: {info['url']}"})
        if i % 20 == 0:
            time.sleep(0.3)

    with open("/tmp/image-map.json", "w") as f:
        json.dump(verified, f, indent=1)
    with open("/tmp/no-image.json", "w") as f:
        json.dump(no_image, f, indent=1)

    src = {}
    for info in verified.values():
        src[info["source"]] = src.get(info["source"], 0) + 1
    print(f"\nDONE: {len(verified)} verified images {src}; {len(no_image)} without", file=sys.stderr)

if __name__ == "__main__":
    main()
