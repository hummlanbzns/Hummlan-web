#!/usr/bin/env python3
"""
Reusable catalog batch-4 importer — 12 NEW brands (full HSS + 5-pillar drill-downs).

Same proven pattern as scripts/import_catalog_batch3.py: parses per-`## brand`
sections from a catalog content .md, INSERTs brand + HSS row + 5 pillar rows
(with `detail` bodies) + representative products (placeholder favicon image,
honest no-fake-price buy state handled by the product page).

Source content: /home/team/shared/catalog-expansion-batch4.md
  (researcher-prepared, task c2bdfc6c; metadata + scores + per-pillar detail blocks).
  WEIGHTED methodology per owner: HSS = weighted mean of 5 pillar scores x20
  (weights Climate .2, Circular .2, Pollution .15, Supply .2, Biodiversity .15).
  The weighted HSS values are set EXPLICITLY in BRAND_META below (authoritative,
  verified in the import notes — matches the approved content exactly).

Usage:
  python3 scripts/import_catalog_batch4.py --dry     # parse + print plan, no writes
  python3 scripts/import_catalog_batch4.py            # execute
  CATALOG_CONTENT=/path/to/other.md python3 scripts/import_catalog_batch4.py  # point at any matching .md

Pattern notes:
  * Pillar scores are taken from the `### <Pillar> — N/5` headings in the
    content file (authoritative, all HSS-consistent with the weighted HSS).
  * HSS star count derived: >=90->5, 77-88->4, 60-76->3, 40-59->2, <40->1.
  * entity IDs/slugs were pre-verified against the live `brands` table (2026-09-04):
    none of the 12 slugs exist; brand count was 139.
"""
import subprocess, sys, re, json, os
DRY = '--dry' in sys.argv
CONTENT = '/home/team/shared/catalog-expansion-batch4.md'
# Point to any catalog .md in the same format to reuse for future batches.
CONTENT = os.environ.get('CATALOG_CONTENT', CONTENT)
# ---------------------------------------------------------------------------
# Brand metadata (id/slug/website/desc must exist; scores parsed from content)
# HSS = WEIGHTED value per owner methodology (NOT plain pillar mean).
# ---------------------------------------------------------------------------
BRAND_META = {
    'Frank And Oak': {
        'id': 'frank-and-oak', 'slug': 'frank-and-oak', 'mode': 'insert', 'hss': 54, 'stars': 2,
        'website_url': 'https://frankandoak.com',
        'logo_url': 'https://cdn.shopify.com/s/files/1/0553/7100/6130/files/fao-favi_5884448c-1242-40e1-b2a7-5df890fec27d.png?crop=center&height=48&v=1772137419&width=48',
        'description': 'Canadian sustainable-fashion brand (part of Cielo) making seasonal, less-but-better basics with recycled and certified fabrics and a circular "Style That Lasts" ethos.',
        'products': [
            ('Organic Cotton Everyday Tee', 'organic-cotton-everyday-tee', 'fashion-modern-basics', 'Recycled-blend / organic-cotton everyday layer.'),
        ],
    },
    'Unbound Merino': {
        'id': 'unbound-merino', 'slug': 'unbound-merino', 'mode': 'insert', 'hss': 62, 'stars': 3,
        'website_url': 'https://unboundmerino.com',
        'logo_url': 'https://unboundmerino.com/cdn/shop/files/favicon-v2.png?crop=center&height=32&v=1745727507&width=32',
        'description': 'Canadian merino-wool basics brand designing versatile, long-lasting travel-friendly pieces from responsibly-sourced, non-mulesed merino.',
        'products': [
            ('Everyday Merino Tee', 'everyday-merino-tee', 'fashion-modern-basics', 'Versatile, long-lasting travel-friendly merino tee.'),
        ],
    },
    'Aday': {
        'id': 'aday', 'slug': 'aday', 'mode': 'insert', 'hss': 58, 'stars': 2,
        'website_url': 'https://www.aday.com',
        'logo_url': 'https://images.fillout.com/orgid-297978/flowpublicid-undefined/widgetid-custom-favicon/jCBETWwFM5a7LMRBME2LRd/Screenshot-2025-06-03-at-2.13.50aPM.png?a=9byrpdbN6BvPLbHWJPUFTR',
        'description': 'US womenswear brand designing "one thing that does five things" — versatile, travel-friendly, recycled-material workwear with a circular repair/resale arm.',
        'products': [
            ('The Everything Jacket', 'the-everything-jacket', 'fashion-womens-tops-t-shirts', 'Multi-use performance-work jacket with repair/resale arm.'),
        ],
    },
    'Endangered Species Chocolate': {
        'id': 'endangered-species-chocolate', 'slug': 'endangered-species-chocolate', 'mode': 'insert', 'hss': 75, 'stars': 3,
        'website_url': 'https://www.chocolatebar.com',
        'logo_url': 'https://chocolatebar.com/cdn/shop/files/logo.svg?crop=center&height=32&v=1709176356&width=32',
        'description': 'US bean-to-bar chocolate brand committed to Fairtrade and certified-organic cocoa, with a 10%-of-profits-to-conservation model and a wildlife-protection mission.',
        'products': [
            ('72% Dark Chocolate Bar', '72-dark-chocolate-bar', 'food_fair_trade_chocolate', 'Fairtrade, organic 72% dark chocolate bar.'),
        ],
    },
    'Brooklinen': {
        'id': 'brooklinen', 'slug': 'brooklinen', 'mode': 'insert', 'hss': 44, 'stars': 2,
        'website_url': 'https://www.brooklinen.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=brooklinen.com&sz=128',
        'description': 'US premium bedding and home-linens brand known for quality, durable cotton sheets — an honesty-focused score reflecting genuine durability but thin published sustainability depth.',
        'products': [
            ('Classic Percale Sheet Set', 'classic-percale-sheet-set', 'household', 'Long-staple cotton percale sheet set.'),
        ],
    },
    'Parachute': {
        'id': 'parachute', 'slug': 'parachute', 'mode': 'insert', 'hss': 51, 'stars': 2,
        'website_url': 'https://www.parachutehome.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=parachutehome.com&sz=128',
        'description': 'US premium home and bedding brand (cotton, linen, down and wool) known for quality and durability, with fair-trade and GOTS-organic options in key collections.',
        'products': [
            ('Linen Sheet Set', 'linen-sheet-set', 'household', 'Linen or GOTS-organic cotton bedding.'),
        ],
    },
    'Indie Lee': {
        'id': 'indie-lee', 'slug': 'indie-lee', 'mode': 'insert', 'hss': 57, 'stars': 2,
        'website_url': 'https://www.indielee.com',
        'logo_url': 'https://indielee.com/cdn/shop/files/Indie_Lee_2026_Logo_Montserrat_FAVICON_white-on-purple.png?v=1773001769&width=96',
        'description': 'US clean-beauty skincare brand (founded by a health advocate) with non-toxic, cruelty-free, largely vegan formulas in recyclable glass and a sustainability focus.',
        'products': [
            ('CoQ-10 Toner', 'coq10-toner', 'personal-care-beauty-skincare', 'Non-toxic, cruelty-free toner in recyclable glass.'),
        ],
    },
    'Act + Acre': {
        'id': 'act-acre', 'slug': 'act-acre', 'mode': 'insert', 'hss': 57, 'stars': 2,
        'website_url': 'https://actandacre.com',
        'logo_url': 'https://actandacre.com/cdn/shop/files/A_A_Favicon_32x32.png?v=1786563323',
        'description': 'US clean-haircare brand with "stem cell" scalp-care, non-toxic, cruelty-free formulas, recycled packaging and a certified-B-Corp claim.',
        'products': [
            ('Daily Shampoo', 'daily-shampoo', 'personal-care-hair-body', 'Non-toxic, cruelty-free daily shampoo with recycled packaging.'),
        ],
    },
    'Curie': {
        'id': 'curie', 'slug': 'curie', 'mode': 'insert', 'hss': 61, 'stars': 3,
        'website_url': 'https://www.curie.com',
        'logo_url': 'https://www.curie.com/favicon.ico',
        'description': 'US clean deodorant brand with non-toxic, cruelty-free, skin-safe formulas in paper/glass packaging and a refill program.',
        'products': [
            ('Natural Deodorant (Glass Refill)', 'natural-deodorant-glass-refill', 'personal-care-deodorant', 'Non-toxic, skin-safe deodorant in glass jar with refill.'),
        ],
    },
    'Leaf Shave': {
        'id': 'leaf-shave', 'slug': 'leaf-shave', 'mode': 'insert', 'hss': 72, 'stars': 3,
        'website_url': 'https://leafshave.com',
        'logo_url': 'https://leafshave.com/cdn/shop/files/Leaf_Mark_Deep_Green_d3f623d8-dcb4-4880-a7a0-6d1e05cf9fe0.png?crop=center&height=32&v=1766560641&width=32',
        'description': 'US/Canada zero-waste shaving brand making metal safety razors designed to last decades, with a genuine plastic-free, recyclable-metal circular model.',
        'products': [
            ('Leaf Razor (Metal Safety Razor)', 'leaf-razor-metal-safety-razor', 'personal-care-mens-grooming', 'Full metal safety razor that replaces disposable plastic shavers.'),
        ],
    },
    'Ocean Bottle': {
        'id': 'ocean-bottle', 'slug': 'ocean-bottle', 'mode': 'insert', 'hss': 72, 'stars': 3,
        'website_url': 'https://oceanbottle.co',
        'logo_url': 'https://oceanbottle.co/cdn/shop/files/OB_SuperBlue_Favicon.png?v=1750338907&width=32',
        'description': 'UK reusable-bottle brand with a certified plastic-recovery funding model (each bottle funds the collection of ocean-bound plastic) and recycled-material builds.',
        'products': [
            ('750ml Reusable Bottle', '750ml-reusable-bottle', 'household-reusable-drinkware', 'Reusable bottle made with recycled steel + plastic; funds ocean-plastic collection.'),
        ],
    },
    'By Humankind': {
        'id': 'by-humankind', 'slug': 'by-humankind', 'mode': 'insert', 'hss': 72, 'stars': 3,
        'website_url': 'https://byhumankind.com',
        'logo_url': 'https://cdn.shopify.com/shopifycloud/storefront/assets/favicon-418d2057.png',
        'description': 'US plastic-free personal-care brand making concentrated, waterless refills (deodorant, shampoo, body wash) in home-compostable/paper packaging.',
        'products': [
            ('Deodorant Refill (Home-Compostable)', 'deodorant-refill-home-compostable', 'personal-care-deodorant', 'Waterless, home-compostable deodorant refill cartridge.'),
        ],
    },
}

PILLARS = ['Climate Impact', 'Circular Economy', 'Pollution Prevention',
           'Supply Chain & Social', 'Biodiversity']


def esc(s):
    return s.replace("'", "''")


def parse_content(path):
    """Parse per-`## brand` blocks: {display_name: {pillar: (score, body)}}."""
    blocks = {}
    cur = None
    cur_pillar = None
    score = None
    body = []
    with open(path) as f:
        for raw in f:
            line = raw.rstrip('\n')
            if line.startswith('## '):
                name = line[3:].split(' (')[0].strip()
                if name not in BRAND_META:
                    print(f'  [warn] content brand not in meta: {name}')
                cur = name
                blocks.setdefault(cur, {})
                cur_pillar = None
                body = []
            elif line.startswith('### ') and cur:
                m = re.match(r'\s*(.+?)\s*[—–-]\s*(\d)/5', line[4:])
                cur_pillar = m.group(1).strip() if m else line[4:].strip()
                score = int(m.group(2)) if m else None
                blocks[cur][cur_pillar] = [score, '']
                body = []
            elif cur and cur_pillar and line.strip():
                blocks[cur][cur_pillar][1] += ('' if not blocks[cur][cur_pillar][1] else '\n') + line.strip()
    return blocks


def db(sql):
    p = subprocess.run(['team-db', sql], capture_output=True, text=True, timeout=90)
    return p


def main():
    blocks = parse_content(CONTENT)
    print(f'Parsed content: {len(blocks)} brand blocks | DRY={"yes" if DRY else "no"}\n')
    ok = fail = 0
    for name, meta in BRAND_META.items():
        brand_blocks = blocks.get(name, {})
        if len(brand_blocks) != 5:
            print(f'  [warn] {name}: expected 5 pillars, got {len(brand_blocks)}')
        id_ = meta['id']
        # ---------- INSERT: brand + 6 rating rows + products
        if DRY:
            print(f'  [INSERT dry] {id_} ({name}, HSS {meta["hss"]}, {meta["stars"]}★)')
            ok += 1
        else:
            sql = ("INSERT INTO brands (id,name,slug,website_url,description,logo_url,overall_sustainability_score) VALUES "
                   f"('{esc(id_)}','{esc(name)}','{esc(meta['slug'])}','{esc(meta['website_url'])}','{esc(meta['description'])}','{esc(meta['logo_url'])}',{meta['hss']})")
            p = db(sql)
            if p.returncode == 0:
                ok += 1
            else:
                fail += 1
                print(f'  [INSERT BRAND FAIL] {id_}: {p.stderr.strip()[:200]}')
        # HSS overall row
        hss_sql = ("INSERT INTO sustainability_ratings (id,entity_type,entity_id,source_name,rating_value,rating_score,max_score) VALUES "
                   f"('sr_{esc(id_)}_hss','brand','{esc(id_)}','Hummlan Sustainability Score','{meta['stars']}',{meta['hss']},100)")
        if DRY:
            ok += 1
        else:
            p = db(hss_sql)
            ok += 1 if p.returncode == 0 else 0
            if p.returncode != 0:
                fail += 1
                print(f'  [HSS FAIL] {id_}: {p.stderr.strip()[:200]}')
        # 5 pillar rows + detail
        for pillar in PILLARS:
            if pillar not in brand_blocks:
                print(f'  [warn] {name}: missing {pillar}')
                continue
            score, body = brand_blocks[pillar]
            slit = pillar.lower().replace(' & ', '_').replace(' ', '_')
            rid = f'sr_{esc(id_)}_{slit}'
            sql = ("INSERT INTO sustainability_ratings (id,entity_type,entity_id,source_name,rating_value,rating_score,max_score,detail) VALUES "
                   f"('{rid}','brand','{esc(id_)}','Hummlan Pillar: {esc(pillar)}','{score}/5',{score},5,'{esc(body)}')")
            if DRY:
                ok += 1
            else:
                p = db(sql)
                if p.returncode == 0:
                    ok += 1
                else:
                    fail += 1
                    print(f'  [PILLAR FAIL] {id_} :: {pillar}: {p.stderr.strip()[:200]}')
        # products (placeholder favicon image, honest no-fake-price buy state)
        for pname, pslug, cat, pdesc in meta.get('products', []):
            pid = f'prod_{id_}_{pslug}'
            pslug_full = f'{id_}-{pslug}'  # brand-prefix to avoid generic-slug collisions
            img = meta['logo_url']
            sql = ("INSERT INTO products (id,brand_id,category_id,name,slug,description,image_url) VALUES "
                   f"('{esc(pid)}','{esc(id_)}','{esc(cat)}','{esc(pname)}','{esc(pslug_full)}','{esc(pdesc)}','{esc(img)}')")
            if DRY:
                ok += 1
            else:
                p = db(sql)
                if p.returncode == 0:
                    ok += 1
                else:
                    fail += 1
                    print(f'  [PRODUCT FAIL] {pid}: {p.stderr.strip()[:200]}')
    print(f'\ndone: {ok} ok, {fail} failed {"(dry)" if DRY else ""}')
    sys.exit(1 if fail else 0)


if __name__ == '__main__':
    main()