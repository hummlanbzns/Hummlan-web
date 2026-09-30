#!/usr/bin/env python3
"""Import Catalog Expansion Batch 6 — BRANDS ONLY (12 new brands, weighted HSS).

Rebrand context (owner decision Sep 2026): products are removed site-wide, so this
batch inserts NO product rows — only the brand row + 6 sustainability_rating rows
(1 HSS + 5 pillars) per brand = 84 ops total. Product rows stay in the DB (hidden).

Same proven pattern as batches 1-5:
  * Pillar scores are taken from the `### <Pillar> — N/5` headings in the
    content file (authoritative, all HSS-consistent with the weighted HSS).
  * HSS star count derived: >=90->5, 77-88->4, 60-76->3, 40-59->2, <40->1.
  * entity IDs/slugs were pre-verified against the live `brands` table (2026-09-10,
    163 brands): none of the 12 slugs exist. Non-obvious mappings:
    The Cheeky Panda -> cheeky-panda, Miyoko's Creamery -> miyokos,
    The North Face -> north-face, Numi Organic Tea -> numi,
    Kicking Horse Coffee -> kicking-horse, Rishi Tea -> rishi,
    Equal Exchange -> equal-exchange.
  * No product insert step: `products` key is deliberately absent from BRAND_META.
"""
import subprocess, sys, re, os

DRY = '--dry' in sys.argv
CONTENT = '/home/team/shared/catalog-expansion-batch6.md'
# Point to any catalog .md in the same format to reuse for future batches.
CONTENT = os.environ.get('CATALOG_CONTENT', CONTENT)

# ---------------------------------------------------------------------------
# Brand metadata (id/slug/website/desc must exist; scores parsed from content)
# HSS = WEIGHTED value per owner methodology (NOT plain pillar mean).
# ---------------------------------------------------------------------------
BRAND_META = {
    'Cotopaxi': {
        'id': 'cotopaxi', 'slug': 'cotopaxi', 'mode': 'insert', 'hss': 62, 'stars': 3,
        'website_url': 'https://www.cotopaxi.com',
        'logo_url': 'https://www.cotopaxi.com/cdn/shop/files/favicon_1_32x32.png?v=1613684591',
        'description': 'US outdoor-gear and apparel brand — a Public Benefit Corporation and certified B Corp — building durable packs, bags and layers designed to be repaired, traded in and kept for life.',
    },
    'MiiR': {
        'id': 'miir', 'slug': 'miir', 'mode': 'insert', 'hss': 65, 'stars': 3,
        'website_url': 'https://www.miir.com',
        'logo_url': 'https://www.miir.com/cdn/shop/files/favicon_32x32_719642f6-e0ce-4b17-8815-3a64f77b45f7.png?crop=center&height=32&v=1664920791&width=32',
        'description': 'US drinkware brand making stainless-steel bottles, mugs and tumblers with giving built into every purchase, annual impact reporting and an increased use of recycled stainless steel.',
    },
    'Etiko': {
        'id': 'etiko', 'slug': 'etiko', 'mode': 'insert', 'hss': 62, 'stars': 3,
        'website_url': 'https://etiko.com.au',
        'logo_url': 'https://etiko.com.au/cdn/shop/files/etikocorner.png?crop=center&height=32&v=1651539380&width=32',
        'description': 'Australian B Corp-certified, Fairtrade-certified footwear and apparel brand making vegan sneakers and organic-cotton basics through fair-wage, transparent supply chains.',
    },
    'The Cheeky Panda': {
        'id': 'cheeky-panda', 'slug': 'cheeky-panda', 'mode': 'insert', 'hss': 61, 'stars': 3,
        'website_url': 'https://thecheekypanda.com',
        'logo_url': 'https://uk.cheekypanda.com/cdn/shop/files/CP-Favicon_32x32.png?v=1754317227',
        'description': 'UK B Corp-certified brand making bamboo toilet tissue, kitchen rolls and facial tissues — FSC-certified, Leaping Bunny cruelty-free and vegan — with climate action reporting and policy transparency.',
    },
    'Numi Organic Tea': {
        'id': 'numi', 'slug': 'numi', 'mode': 'insert', 'hss': 66, 'stars': 3,
        'website_url': 'https://www.numitea.com',
        'logo_url': 'https://numitea.com/cdn/shop/files/numi-favicon_32x32.svg?v=1704738194',
        'description': 'US organic tea brand with Fair Trade verified and Fair Labor certifications, plastic-free compostable wrappers, a published carbon-footprint programme, and a foundation funding clean-water projects.',
    },
    'Kicking Horse Coffee': {
        'id': 'kicking-horse', 'slug': 'kicking-horse', 'mode': 'insert', 'hss': 57, 'stars': 2,
        'website_url': 'https://www.kickinghorsecoffee.com',
        'logo_url': 'https://kickinghorsecoffee.com/cdn/shop/files/KHC_Favicon.png?crop=center&height=32&v=1720803032&width=32',
        'description': 'Canadian coffee roaster (est. 1996) sourcing only certified Organic and Fairtrade coffee beans, roasted in the Rocky Mountains and sold across North America.',
    },
    "Miyoko's Creamery": {
        'id': 'miyokos', 'slug': 'miyokos', 'mode': 'insert', 'hss': 50, 'stars': 2,
        'website_url': 'https://miyokos.com',
        'logo_url': 'https://www.miyokos.com/cdn/shop/files/search-logo.jpg?crop=center&height=32&v=1721334371&width=32',
        'description': 'US plant-based dairy brand making vegan cheeses and butters from organic cashews and oats, including a Dairy Farm Transition Program that partners with animal farms to shift to regenerative plant production.',
    },
    'Hello Bello': {
        'id': 'hello-bello', 'slug': 'hello-bello', 'mode': 'insert', 'hss': 43, 'stars': 2,
        'website_url': 'https://www.hellobello.com',
        'logo_url': 'https://www.hellobello.com/favicon.ico',
        'description': 'US baby-care brand making plant-powered diapers, wipes and personal care with organic botanicals, manufactured in its own Waco, Texas factory powered by 100% renewable energy with a zero-waste process.',
    },
    'Axiology': {
        'id': 'axiology', 'slug': 'axiology', 'mode': 'insert', 'hss': 47, 'stars': 2,
        'website_url': 'https://axiologybeauty.com',
        'logo_url': 'https://axiologybeauty.com/cdn/shop/files/AXI-favcon-V2_32x32_crop_center.png?v=1723305933',
        'description': 'US plastic-free beauty brand making multi-use balm-to-lip crayons, highlighters and eye crayons from plant-based, skin-nourishing ingredients with no plastic packaging.',
    },
    'The North Face': {
        'id': 'north-face', 'slug': 'north-face', 'mode': 'insert', 'hss': 40, 'stars': 2,
        'website_url': 'https://www.thenorthface.com',
        'logo_url': 'https://www.thenorthface.com/favicon.ico',
        'description': 'Global outdoor-apparel and gear brand (part of VF Corporation) — a category giant whose sustainability profile sits mostly in company-disclosed programmes (recycled materials, Responsible Down), facing persistent scrutiny over chemical claims and supply-chain scale.',
    },
    'Rishi Tea': {
        'id': 'rishi', 'slug': 'rishi', 'mode': 'insert', 'hss': 61, 'stars': 3,
        'website_url': 'https://rishi-tea.com',
        'logo_url': 'https://www.rishi-tea.com/cdn/shop/files/Rishi-Favicon_1_32x32.png?v=1691791996',
        'description': 'US purveyor of direct-trade organic teas — over 95% of ingredients certified organic — sourcing from artisan tea and botanical farmers via long-term relationships, with origin transparency across the range.',
    },
    'Equal Exchange': {
        'id': 'equal-exchange', 'slug': 'equal-exchange', 'mode': 'insert', 'hss': 58, 'stars': 2,
        'website_url': 'https://www.equalexchange.coop',
        'logo_url': 'https://www.equalexchange.coop/favicon.ico',
        'description': 'US fair-trade food cooperative (est. 1986) selling organic and fairly traded coffee, chocolate, tea and bananas — sourced from small-farmer co-ops through a pioneering fair-trade model.',
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
        # NOTE: no product insert step — batch 6 is BRANDS ONLY per the rebrand.
    print(f'\ndone: {ok} ok, {fail} failed {"(dry)" if DRY else ""}')
    sys.exit(1 if fail else 0)


if __name__ == '__main__':
    main()