#!/usr/bin/env python3
"""
Reusable catalog batch-3 importer — 12 NEW brands (full HSS + 5-pillar drill-downs).

Same proven pattern as scripts/import_catalog_batch2.py: parses per-`## brand`
sections from a catalog content .md, INSERTs brand + HSS row + 5 pillar rows
(with `detail` bodies) + representative products (placeholder favicon image,
honest no-fake-price buy state handled by the product page).

Source content: /home/team/shared/catalog-expansion-batch3.md
  (researcher-prepared, task 91c4cfb7; metadata + scores + per-pillar detail blocks).

Usage:
  python3 scripts/import_catalog_batch3.py --dry     # parse + print plan, no writes
  python3 scripts/import_catalog_batch3.py            # execute
  CATALOG_CONTENT=/path/to/other.md python3 scripts/import_catalog_batch3.py  # point at any matching .md

Pattern notes:
  * Pillar scores are taken from the `### <Pillar> — N/5` headings in the
    content file (authoritative, all HSS-consistent).
  * HSS star count derived: >=90->5, 77-88->4, 60-76->3, 40-59->2, <40->1.
  * entity IDs/slugs were pre-verified against the live `brands` table (2026-09-04):
    none of the 12 slugs exist; brand count was 127.
"""
import subprocess, sys, re, json, os
DRY = '--dry' in sys.argv
CONTENT = '/home/team/shared/catalog-expansion-batch3.md'
# Point to any catalog .md in the same format to reuse for future batches.
CONTENT = os.environ.get('CATALOG_CONTENT', CONTENT)
# ---------------------------------------------------------------------------
# Brand metadata (id/slug/website/desc must exist; scores parsed from content)
# ---------------------------------------------------------------------------
BRAND_META = {
    'Houdini Sportswear': {
        'id': 'houdini-sportswear', 'slug': 'houdini-sportswear', 'mode': 'insert', 'hss': 76, 'stars': 3,
        'website_url': 'https://houdinisportswear.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=houdinisportswear.com&sz=128',
        'description': 'Swedish circular-sportswear pioneer designing technical outdoor layers to be rented, repaired and recycled — built on mono-material fabrics and a "wear, rent, share, recycle" model.',
        'products': [
            ('Mono-Air Jacket', 'mono-air-jacket', 'fashion_outdoor', 'Mono-material, recyclable technical shell layer.'),
        ],
    },
    'Colorful Standard': {
        'id': 'colorful-standard', 'slug': 'colorful-standard', 'mode': 'insert', 'hss': 58, 'stars': 2,
        'website_url': 'https://www.colorfulstandard.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=colorfulstandard.com&sz=128',
        'description': 'Portuguese affordable-apparel brand making heavyweight organic-cotton basics (hoodies, sweats, tees) in a self-run EU factory — a strong price-to-quality-and-organic story with limited circularity.',
        'products': [
            ('Heavyweight Organic Cotton Sweatshirt', 'heavyweight-organic-cotton-sweatshirt', 'fashion_sustainable_basics', 'Heavyweight organic-cotton sweatshirt from a self-run EU factory.'),
        ],
    },
    'Knowledge Cotton Apparel': {
        'id': 'knowledge-cotton-apparel', 'slug': 'knowledge-cotton-apparel', 'mode': 'insert', 'hss': 62, 'stars': 3,
        'website_url': 'https://knowledgecottonapparel.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=knowledgecottonapparel.com&sz=128',
        'description': 'Danish everyday-apparel brand built on certified organic cotton, transparent supply chains and membership of the Sustainable Apparel Coalition — honest mid-tier basics with real standards depth.',
        'products': [
            ('Organic Cotton Overshirt', 'organic-cotton-overshirt', 'fashion_modern_basics', 'Certified organic-cotton everyday overshirt.'),
        ],
    },
    'Vivobarefoot': {
        'id': 'vivobarefoot', 'slug': 'vivobarefoot', 'mode': 'insert', 'hss': 58, 'stars': 2,
        'website_url': 'https://www.vivobarefoot.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=vivobarefoot.com&sz=128',
        'description': 'UK barefoot-footwear brand made largely from natural and recycled materials, with repair, resale (ReVivo) and ocean-plastic lines — genuinely circular intent in a niche category.',
        'products': [
            ('Magna Barefoot Shoe', 'magna-barefoot-shoe', 'fashion_sustainable_footwear', 'Barefoot shoe with a natural/eco upper and resale (ReVivo) program.'),
        ],
    },
    'United by Blue': {
        'id': 'united-by-blue', 'slug': 'united-by-blue', 'mode': 'insert', 'hss': 48, 'stars': 2,
        'website_url': 'https://www.unitedbyblue.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=unitedbyblue.com&sz=128',
        'description': 'US outdoor-apparel brand with a 1-for-1 ocean-cleanup model — every product funds the removal of a pound of ocean trash — plus recycled-materials basics.',
        'products': [
            ('Recycled-Fibre Crew Tee', 'recycled-fibre-crew-tee', 'fashion_modern_basics', 'Recycled-fibre crew tee — one for one ocean cleanup.'),
        ],
    },
    'Birch Living': {
        'id': 'birch-living', 'slug': 'birch-living', 'mode': 'insert', 'hss': 66, 'stars': 3,
        'website_url': 'https://birchliving.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=birchliving.com&sz=128',
        'description': 'US organic-mattress brand using GOTS-certified organic wool, cotton and latex with carbon-neutral delivery and a take-back recycling program.',
        'products': [
            ('Birch Natural Mattress', 'birch-natural-mattress', 'household', 'Organic latex and GOTS wool/cotton mattress with take-back recycling.'),
        ],
    },
    'Naturepedic': {
        'id': 'naturepedic', 'slug': 'naturepedic', 'mode': 'insert', 'hss': 68, 'stars': 3,
        'website_url': 'https://naturepedic.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=naturepedic.com&sz=128',
        'description': 'US organic-mattress company (founded 2003) specialising in certified-organic, non-toxic mattresses for babies, kids and adults — GOTS-certified and EWG-verified, plastic-free.',
        'products': [
            ('Organic Cotton Mattress', 'organic-cotton-mattress', 'household', 'GOTS-certified, EWG-verified organic mattress for adults or kids.'),
        ],
    },
    'Odylique': {
        'id': 'odylique', 'slug': 'odylique', 'mode': 'insert', 'hss': 65, 'stars': 3,
        'website_url': 'https://www.odylique.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=odylique.com&sz=128',
        'description': 'UK organic skincare brand with Soil Association-certified organic cosmetics — genuinely certified, natural, cruelty-free, small-batch formulas in mostly glass packaging.',
        'products': [
            ('Certified Organic Facial Moisturiser', 'certified-organic-facial-moisturiser', 'personal_care_beauty_skincare', 'Soil Association-certified organic facial moisturiser in glass.'),
        ],
    },
    'Earth Harbor': {
        'id': 'earth-harbor', 'slug': 'earth-harbor', 'mode': 'insert', 'hss': 54, 'stars': 2,
        'website_url': 'https://earthharbor.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=earthharbor.com&sz=128',
        'description': 'US vegan, "ocean-safe", clean-beauty skincare brand with small-batch formulas, recyclable glass, and a plastic-neutral/refill message.',
        'products': [
            ('Ocean-Inspired Serum', 'ocean-inspired-serum', 'personal_care_beauty_skincare', 'Vegan, ocean-safe serum in recyclable glass.'),
        ],
    },
    'Theo Chocolate': {
        'id': 'theo-chocolate', 'slug': 'theo-chocolate', 'mode': 'insert', 'hss': 72, 'stars': 3,
        'website_url': 'https://www.theochocolate.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=theochocolate.com&sz=128',
        'description': 'US bean-to-bar chocolate brand (Seattle) built on Fairtrade and organic certification, direct farm partnerships and plastic-reduced packaging — a genuinely strong ethical food story.',
        'products': [
            ('Dark Chocolate Bar', 'dark-chocolate-bar', 'food_fair_trade_chocolate', 'Organic, Fairtrade bean-to-bar dark chocolate.'),
        ],
    },
    'A Good Company': {
        'id': 'a-good-company', 'slug': 'a-good-company', 'mode': 'insert', 'hss': 65, 'stars': 3,
        'website_url': 'https://agoodcompany.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=agoodcompany.com&sz=128',
        'description': 'Swedish B Corp making everyday green goods (bamboo items, recycled notebooks, phone accessories) with visible carbon data and plastic-free design.',
        'products': [
            ('Bamboo Toothbrush', 'bamboo-toothbrush', 'personal_care_oral_care', 'Plastic-free bamboo toothbrush from a certified B Corp.'),
        ],
    },
    'Rapanui Clothing': {
        'id': 'rapanui-clothing', 'slug': 'rapanui-clothing', 'mode': 'insert', 'hss': 66, 'stars': 3,
        'website_url': 'https://www.rapanuiclothing.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=rapanuiclothing.com&sz=128',
        'description': 'UK organic-cotton basics brand with fully transparent supply chains — factory, farm and price published openly — and a "Teemill" circular manufacturing model that turns used garments into new ones.',
        'products': [
            ('Organic Cotton Graphic Tee', 'organic-cotton-graphic-tee', 'fashion_sustainable_basics', 'Organic-cotton tee with a take-back loop that turns used garments into new ones.'),
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