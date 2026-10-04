#!/usr/bin/env python3
"""Import Catalog Expansion Batch 7 — BRANDS ONLY (12 owner-approved brands, weighted HSS).

Owner approved the 12-brand Batch 7 proposal on 2026-09-30. Rebrand context (owner
decision Sep 2026): products are removed site-wide, so this batch inserts NO product
rows — only the brand row + 6 sustainability_rating rows (1 HSS + 5 pillars) per
brand = 84 ops total. Product rows stay in the DB (hidden, unused).

Same proven pattern as batches 1-6:
  * Pillar scores are taken from the `### <Pillar> — N/5` headings in the
    content file (authoritative, all HSS-consistent with the weighted HSS).
  * HSS star count derived: >=90->5, 77-88->4, 60-76->3, 40-59->2, <40->1.
  * entity IDs/slugs were pre-verified against the live `brands` table (2026-09-30,
    175 brands): none of the 12 slugs exist. Non-obvious mappings:
    Darn Tough Vermont -> darn-tough, On -> on-running,
    Stonyfield Organic -> stonyfield, Nature's Path -> natures-path,
    Counter Culture Coffee -> counter-culture.
  * No product insert step: `products` key is deliberately absent from BRAND_META.
"""
import subprocess, sys, re, os

DRY = '--dry' in sys.argv
CONTENT = '/home/team/shared/catalog-expansion-batch7.md'
# Point to any catalog .md in the same format to reuse for future batches.
CONTENT = os.environ.get('CATALOG_CONTENT', CONTENT)

# ---------------------------------------------------------------------------
# Brand metadata (id/slug/website/desc must exist; scores parsed from content)
# HSS = WEIGHTED value per owner methodology (NOT plain pillar mean).
# ---------------------------------------------------------------------------
BRAND_META = {
    'Eileen Fisher': {
        'id': 'eileen-fisher', 'slug': 'eileen-fisher', 'mode': 'insert', 'hss': 58, 'stars': 2,
        'website_url': 'https://www.eileenfisher.com',
        'logo_url': 'https://www.eileenfisher.com/favicon.ico',
        'description': 'US womenswear brand (est. 1984) building timeless, durable basics in organic linen, wool and other natural fibres, with a decades-old Renew take-back and resale programme.',
    },
    'Osprey': {
        'id': 'osprey', 'slug': 'osprey', 'mode': 'insert', 'hss': 55, 'stars': 2,
        'website_url': 'https://www.osprey.com',
        'logo_url': 'https://www.osprey.com/favicon.ico',
        'description': 'US backpack and outdoor-gear brand (est. 1974) focused on durable, repairable packs, with an unconditional lifetime repair-or-replace guarantee and bluesign-style materials work.',
    },
    'Darn Tough Vermont': {
        'id': 'darn-tough', 'slug': 'darn-tough', 'mode': 'insert', 'hss': 58, 'stars': 2,
        'website_url': 'https://darntough.com',
        'logo_url': 'https://darntough.com/cdn/shop/files/MTN_Logo_2000x2000-200x200-a17bdef1-cab9-4345-a181-baea88cc3129-2.png?v=1636580249&width=32',
        'description': 'US sock brand knitting performance merino socks at its own Vermont mills, with an unconditional lifetime guarantee, a published 2024 sustainability report and a commitment to the Responsible Wool Standard.',
    },
    'On': {
        'id': 'on-running', 'slug': 'on-running', 'mode': 'insert', 'hss': 55, 'stars': 2,
        'website_url': 'https://www.on.com',
        'logo_url': 'https://www.on.com/favicon.ico',
        'description': 'Swiss running-shoe and apparel brand (est. 2010) known for its Cyclon subscription take-back model, per-product carbon-footprint reporting and a growing use of recycled materials.',
    },
    'Smartwool': {
        'id': 'smartwool', 'slug': 'smartwool', 'mode': 'insert', 'hss': 58, 'stars': 2,
        'website_url': 'https://www.smartwool.com',
        'logo_url': 'https://www.smartwool.com/cdn/shop/files/smartwool-favicon.png?crop=center&height=32&v=1776353846&width=32',
        'description': 'US merino-wool apparel and socks brand (est. 1974) running the Second Cut circular programme — recycled yarn from its own cutoffs, resale and sock recycling — under a 2030 Sustainability Commitment.',
    },
    'Stonyfield Organic': {
        'id': 'stonyfield', 'slug': 'stonyfield', 'mode': 'insert', 'hss': 57, 'stars': 2,
        'website_url': 'https://www.stonyfield.com',
        'logo_url': 'https://www.stonyfield.com/wp-content/themes/stonyfield/assets/imgs/favicon/favicon-32x32.png',
        'description': 'US certified-organic yogurt brand (est. 1983) that is a Certified B Corp, runs a verified science-based climate target and 100% renewable electricity at its main plant, sourced from organic family farms.',
    },
    "Nature's Path": {
        'id': 'natures-path', 'slug': 'natures-path', 'mode': 'insert', 'hss': 60, 'stars': 3,
        'website_url': 'https://www.naturespath.com',
        'logo_url': 'https://naturespath.com/cdn/shop/files/natures-favicon.png?crop=center&height=48&v=1681234030&width=48',
        'description': 'Canadian family-owned organic cereal and snack brand (est. 1967), always-organic across five brands, with Fair Trade collections and an explicitly regenerative-organic farming programme.',
    },
    'Dandelion Chocolate': {
        'id': 'dandelion-chocolate', 'slug': 'dandelion-chocolate', 'mode': 'insert', 'hss': 54, 'stars': 2,
        'website_url': 'https://www.dandelionchocolate.com',
        'logo_url': 'https://www.dandelionchocolate.com/cdn/shop/files/D_Favicon.png?crop=center&height=32&v=1738499517&width=32',
        'description': 'US bean-to-bar craft chocolate maker (est. 2010) using just cocoa beans and sugar, sourcing single-origin cacao directly with producers and publishing an annual sourcing report with per-origin prices.',
    },
    'Counter Culture Coffee': {
        'id': 'counter-culture', 'slug': 'counter-culture', 'mode': 'insert', 'hss': 61, 'stars': 3,
        'website_url': 'https://counterculturecoffee.com',
        'logo_url': 'https://counterculturecoffee.com/cdn/shop/files/CCC_Favicon_32x32.png?v=1651866699',
        'description': 'US specialty coffee roaster (est. 1995), a certified B Corp since 2020, publishing annual Transparency Reports since 2009 and buying direct-trade coffee with per-purchase price disclosure.',
    },
    'Taza Chocolate': {
        'id': 'taza-chocolate', 'slug': 'taza-chocolate', 'mode': 'insert', 'hss': 61, 'stars': 3,
        'website_url': 'https://www.tazachocolate.com',
        'logo_url': 'https://www.tazachocolate.com/cdn/shop/files/taza-chocolate-favicon.png?crop=center&height=32&v=1750799565&width=32',
        'description': 'US stone-ground chocolate maker using only certified USDA Organic cacao, running the chocolate industry\'s first third-party-certified Direct Trade sourcing programme with published per-origin prices.',
    },
    'Public Goods': {
        'id': 'public-goods', 'slug': 'public-goods', 'mode': 'insert', 'hss': 47, 'stars': 2,
        'website_url': 'https://www.publicgoods.com',
        'logo_url': 'https://www.publicgoods.com/cdn/shop/files/favicon_fc7fb350-ca6f-4973-b9c3-14cd9c6e6baf.webp?crop=center&height=32&v=1738420561&width=32',
        'description': 'US direct-to-consumer membership brand selling household essentials, personal care and cleaning products with a store-wide refill system and a clean-ingredient, fragrance-free positioning.',
    },
    'Vinted': {
        'id': 'vinted', 'slug': 'vinted', 'mode': 'insert', 'hss': 55, 'stars': 2,
        'website_url': 'https://www.vinted.com',
        'logo_url': 'https://marketplace-web-assets.vinted.com/_next/static/media/favicon.0_k8xxmqp9dn_.ico',
        'description': 'European second-hand marketplace (est. 2008) where tens of millions of members buy and sell pre-owned fashion and home goods, with published impact reports and a climate action plan.',
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
        # ---------- INSERT: brand + 6 rating rows (NO product rows — rebrand) ----------
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
        # NOTE: no product insert step — batch 7 is BRANDS ONLY per the owner rebrand.
    print(f'\ndone: {ok} ok, {fail} failed {"(dry)" if DRY else ""}')
    sys.exit(1 if fail else 0)


if __name__ == '__main__':
    main()