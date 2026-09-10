#!/usr/bin/env python3
"""
Reusable catalog batch-5 importer — 12 NEW brands (full HSS + 5-pillar drill-downs).

Same proven pattern as scripts/import_catalog_batch4.py: parses per-`## brand`
sections from a catalog content .md, INSERTs brand + HSS row + 5 pillar rows
(with `detail` bodies) + representative products (placeholder favicon image,
honest no-fake-price buy state handled by the product page).

Source content: /home/team/shared/catalog-expansion-batch5.md
  (researcher-prepared, task 23b6d36d; metadata + scores + per-pillar detail blocks).
  WEIGHTED methodology per owner: HSS = weighted mean of 5 pillar scores x20
  (weights Climate .2, Circular .2, Pollution .15, Supply .2, Biodiversity .15).
  The weighted HSS values are set EXPLICITLY in BRAND_META below (authoritative,
  verified in the import notes — matches the approved content exactly, delta 0).

Usage:
  python3 scripts/import_catalog_batch5.py --dry     # parse + print plan, no writes
  python3 scripts/import_catalog_batch5.py            # execute
  CATALOG_CONTENT=/path/to/other.md python3 scripts/import_catalog_batch5.py  # point at any matching .md

Pattern notes:
  * Pillar scores are taken from the `### <Pillar> — N/5` headings in the
    content file (authoritative, all HSS-consistent with the weighted HSS).
  * HSS star count derived: >=90->5, 77-88->4, 60-76->3, 40-59->2, <40->1.
  * entity IDs/slugs were pre-verified against the live `brands` table (2026-09-07):
    none of the 12 slugs exist; brand count was 151.
  * Category FK lesson (batch 4): products.category_id MUST be a categories.id
    (underscore ids like fashion_sustainable_footwear), never a hyphen slug.
"""
import subprocess, sys, re, json, os
DRY = '--dry' in sys.argv
CONTENT = '/home/team/shared/catalog-expansion-batch5.md'
# Point to any catalog .md in the same format to reuse for future batches.
CONTENT = os.environ.get('CATALOG_CONTENT', CONTENT)
# ---------------------------------------------------------------------------
# Brand metadata (id/slug/website/desc must exist; scores parsed from content)
# HSS = WEIGHTED value per owner methodology (NOT plain pillar mean).
# ---------------------------------------------------------------------------
BRAND_META = {
    'Nisolo': {
        'id': 'nisolo', 'slug': 'nisolo', 'mode': 'insert', 'hss': 62, 'stars': 3,
        'website_url': 'https://nisolo.com',
        'logo_url': 'https://nisolo.com/cdn/shop/files/Untitled_design_21.png?crop=center&height=32&v=1770300715&width=32',
        'description': 'US-born, Peru-anchored B Corp footwear brand making handcrafted leather shoes and boots through audited, living-wage factories with radically transparent pricing.',
        'products': [
            ('Nisolo Handcrafted Leather Shoes', 'leather-shoes', 'fashion_sustainable_footwear', 'Handcrafted leather shoes or boots from audited, living-wage factories (LWG-audited tanneries).'),
        ],
    },
    "Rothy's": {
        'id': 'rothys', 'slug': 'rothys', 'mode': 'insert', 'hss': 55, 'stars': 2,
        'website_url': 'https://rothys.com',
        'logo_url': 'https://rothys.com/cdn/shop/files/Favicon-Reflex-BG-32x32.png?crop=center&height=32&v=1719817406&width=32',
        'description': 'US footwear and bag brand knitting shoes from recycled plastic bottles, with a take-back recycling program and durable, machine-washable designs.',
        'products': [
            ("Rothy's The Point Flat", 'the-point-flat', 'fashion_sustainable_footwear', 'The Point flat or knitted sneaker made from recycled-plastic yarn.'),
        ],
    },
    'Vaude': {
        'id': 'vaude', 'slug': 'vaude', 'mode': 'insert', 'hss': 80, 'stars': 4,
        'website_url': 'https://www.vaude.com',
        'logo_url': 'https://www.vaude.com/media/favicon/favicon.ico',
        'description': 'German outdoor-gear brand (founded 1974) built on bluesign® system-partner production, Fair Wear leader status, science-based climate targets and PFC-free finishes.',
        'products': [
            ('Vaude Sustainable Hiking Jacket', 'hiking-jacket', 'fashion_outdoor_activewear', 'Hiking/touring jacket or backpack in bluesign®-certified recycled materials.'),
        ],
    },
    'Kuyichi': {
        'id': 'kuyichi', 'slug': 'kuyichi', 'mode': 'insert', 'hss': 64, 'stars': 3,
        'website_url': 'https://kuyichi.com',
        'logo_url': 'https://kuyichi.com/media/favicon/default/favicon_2.png',
        'description': 'Dutch denim pioneer (est. 2001) building jeans from certified organic cotton and recycled denim through Fair Wear-foundation, transparent supply chains.',
        'products': [
            ('Kuyichi Classic Organic Denim Jeans', 'organic-denim-jeans', 'fashion_denim', 'Classic organic-cotton denim jeans (GOTS-certified).'),
        ],
    },
    'Polarn O. Pyret': {
        'id': 'polarn-o-pyret', 'slug': 'polarn-o-pyret', 'mode': 'insert', 'hss': 62, 'stars': 3,
        'website_url': 'https://polarnopyret.com',
        'logo_url': 'https://polarnopyret.com/favicons/favicon-57x57.png?v=1',
        'description': "Swedish kids'-wear brand (est. 1976) designing durable, hand-me-down-ready clothing with a strong sustainability strategy, transparent factory list and recycled/organic material commitments.",
        'products': [
            ("Polarn O. Pyret Kids' Base Layer", 'base-layer', 'baby_toddler', "Kids' base layer or fleece in organic cotton or recycled wool."),
        ],
    },
    'The Honest Company': {
        'id': 'honest-company', 'slug': 'honest-company', 'mode': 'insert', 'hss': 43, 'stars': 2,
        'website_url': 'https://www.honest.com',
        'logo_url': 'https://honest.com/cdn/shop/files/favicon.png?crop=center&height=32&v=1775072747&width=32',
        'description': 'US baby and personal-care brand (founded by Jessica Alba) known for "clean" plant-based formulas, EWG-verified ingredients and transparent ingredient policies.',
        'products': [
            ('The Honest Company Baby Wipes', 'baby-wipes', 'baby_toddler_eco_nappies_wipes', 'Baby wipes or plant-based personal-care essentials.'),
        ],
    },
    'SheaMoisture': {
        'id': 'sheamoisture', 'slug': 'sheamoisture', 'mode': 'insert', 'hss': 50, 'stars': 2,
        'website_url': 'https://www.sheamoisture.com',
        'logo_url': 'https://www.sheamoisture.com',  # site favicon 403s to bots — use homepage as logo source
        'description': 'US hair- and skin-care brand (est. 1912, now part of Unilever) sourcing shea butter from women-led cooperatives in West Africa through its fair-trade Community Commerce model, and a certified B Corp.',
        'products': [
            ('SheaMoisture Raw Shea Butter', 'shea-butter', 'personal_care_hair_body', 'Raw shea butter or shea-based hair/body care (Community Commerce).'),
        ],
    },
    'Liforme': {
        'id': 'liforme', 'slug': 'liforme', 'mode': 'insert', 'hss': 54, 'stars': 2,
        'website_url': 'https://liforme.com',
        'logo_url': 'https://liforme.com/cdn/shop/files/20.05_Liforme_Logo_Pink-White_Letter_Mark.png?crop=center&height=32&v=1691596462&width=32',
        'description': 'UK yoga-mat brand making durable, high-grip natural-rubber mats with alignment guidance; plastic-free packaging claims and a charitable giving model.',
        'products': [
            ('Liforme Yoga Mat', 'yoga-mat', 'personal_care_natural_wellness', 'Yoga mat in natural rubber with alignment system.'),
        ],
    },
    'Guayaki': {
        'id': 'guayaki', 'slug': 'guayaki', 'mode': 'insert', 'hss': 71, 'stars': 3,
        'website_url': 'https://guayaki.com',
        'logo_url': 'https://guayaki.com',  # Shopify Liquid-error favicon — use homepage as logo source
        'description': 'US-born, B Corp-certified yerba maté brand built on regenerative agroforestry — Organic and Fair Trade-certified maté grown beneath the Atlantic Forest canopy, with a land-restoration mission.',
        'products': [
            ('Guayaki Organic Yerba Maté', 'yerba-mate', 'food_tea', 'Organic yerba maté, loose leaf or canned (Fair Trade).'),
        ],
    },
    'Lotus Foods': {
        'id': 'lotus-foods', 'slug': 'lotus-foods', 'mode': 'insert', 'hss': 67, 'stars': 3,
        'website_url': 'https://www.lotusfoods.com',
        'logo_url': 'https://www.lotusfoods.com/cdn/shop/files/logo_11853cc7-fe51-495b-8af2-57d1b5e4f8db.png?v=1665732914',
        'description': 'US family-founded, B Corp-certified rice company sourcing organic and regenerative heirloom rices through its More Crop Per Drop programme, which cuts water use and supports smallholder farmers.',
        'products': [
            ('Lotus Foods Organic Heirloom Rice', 'organic-rice', 'food', 'Organic heirloom jasmine or jasmine brown rice (More Crop Per Drop).'),
        ],
    },
    'Bellroy': {
        'id': 'bellroy', 'slug': 'bellroy', 'mode': 'insert', 'hss': 62, 'stars': 3,
        'website_url': 'https://bellroy.com',
        'logo_url': 'https://bellroy.com/favicon.ico',
        'description': 'Australian B Corp-certified accessories brand (wallets, bags, totes) using LWG-rated leather and recycled materials, with a published factory map and durability-first design.',
        'products': [
            ('Bellroy Slim Leather Wallet', 'leather-wallet', 'fashion_accessories', 'Slim leather wallet or recycled-fiber tote/daypack.'),
        ],
    },
    'Obakki': {
        'id': 'obakki', 'slug': 'obakki', 'mode': 'insert', 'hss': 54, 'stars': 2,
        'website_url': 'https://www.obakki.com',
        'logo_url': 'https://cdn.shopify.com/s/files/1/0396/6038/8519/files/favicon-32x32_32x32.png?v=1599065569',
        'description': 'Canadian ethical-lifestyle brand working directly with artisans in over 30 countries to create home goods, textiles and lifestyle goods on fair-terms partnerships, with a clean-water charitable foundation.',
        'products': [
            ('Obakki Artisan Home Goods', 'artisan-home-goods', 'fashion_fair_trade_artisan', 'Artisan-made home goods or textiles (fair-terms partnership).'),
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