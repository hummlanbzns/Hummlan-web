#!/usr/bin/env python3
"""Import Catalog Expansion Batch 8 (TECH) — BRANDS ONLY (12 owner-approved brands, weighted HSS).

Owner approved the 12-brand tech proposal on 2026-10-04 (Apple, Samsung, Sony, Microsoft,
Google, Dell, HP, Lenovo, Philips, Bosch, Nokia, Panasonic) with draft scores LOCKED (no
amendments). Rebrand context (owner decision Sep 2026): products are removed site-wide, so
this batch inserts NO product rows — only the brand row + 6 sustainability_rating rows
(1 HSS + 5 pillars) per brand = 84 ops total. Product rows stay in the DB (hidden, unused).

Same proven pattern as batches 1-7:
  * Pillar scores are taken from the `### <Pillar> — N/5` headings in the
    content file (authoritative, all HSS-consistent with the weighted HSS).
  * HSS = WEIGHTED value per owner methodology (Climate .2, Circular .2, Pollution .15,
    Supply Chain & Social .2, Biodiversity .15; overall = weighted mean × 20).
  * Star mapping: >=90->5, 77-88->4, 60-76->3, 40-59->2, <40->1.
  * entity IDs/slugs pre-verified against the live `brands` table (2026-10-04, 187 brands):
    none of the 12 slugs exist. All mappings are the obvious ones (apple, samsung, sony,
    microsoft, google, dell, hp, lenovo, philips, bosch, nokia, panasonic).
  * No product insert step: `products` key is deliberately absent from BRAND_META.
  * No B Corp / certification claims for any of the 12; all self-reported figures keep
    the company-disclosed flags verbatim; Sony/Bosch/Panasonic use bot-walled-source
    favicons as documented in the handoff (sony via Google favicon cache, bosch from its
    own HTML link tags).
"""
import subprocess, sys, re, os

DRY = '--dry' in sys.argv
CONTENT = '/home/team/shared/catalog-expansion-batch8-tech.md'
# Point to any catalog .md in the same format to reuse for future batches.
CONTENT = os.environ.get('CATALOG_CONTENT', CONTENT)

# ---------------------------------------------------------------------------
# Brand metadata (id/slug/website/desc must exist; scores parsed from content)
# HSS = WEIGHTED value per owner methodology (NOT plain pillar mean).
# ---------------------------------------------------------------------------
BRAND_META = {
    'Apple': {
        'id': 'apple', 'slug': 'apple', 'mode': 'insert', 'hss': 51, 'stars': 2,
        'website_url': 'https://www.apple.com',
        'logo_url': 'https://www.apple.com/favicon.ico',
        'description': 'US consumer-technology giant (est. 1976) — iPhone, Mac, iPad, Watch and services — running the most scrutinised supplier-responsibility programme in consumer electronics.',
    },
    'Samsung': {
        'id': 'samsung', 'slug': 'samsung', 'mode': 'insert', 'hss': 51, 'stars': 2,
        'website_url': 'https://www.samsung.com',
        'logo_url': 'https://www.samsung.com/global/sustainability/assets/img/favicon.png',
        'description': 'South-Korean electronics conglomerate (est. 1938) — Galaxy smartphones, TVs, home appliances and memory chips — the world\'s largest phone maker.',
    },
    'Sony': {
        'id': 'sony', 'slug': 'sony', 'mode': 'insert', 'hss': 51, 'stars': 2,
        'website_url': 'https://www.sony.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=sony.com&sz=64',
        'description': 'Japanese electronics and entertainment group (est. 1946) — PlayStation, TVs, cameras, plus music and film businesses.',
    },
    'Microsoft': {
        'id': 'microsoft', 'slug': 'microsoft', 'mode': 'insert', 'hss': 47, 'stars': 2,
        'website_url': 'https://www.microsoft.com',
        'logo_url': 'https://www.microsoft.com/favicon.ico',
        'description': 'US software and cloud giant (est. 1975) — Windows, Azure, Office, Surface and Xbox.',
    },
    'Google': {
        'id': 'google', 'slug': 'google', 'mode': 'insert', 'hss': 47, 'stars': 2,
        'website_url': 'https://www.google.com',
        'logo_url': 'https://www.google.com/favicon.ico',
        'description': 'US technology group (est. 1998) — Search, Android, Pixel and Nest hardware, and cloud infrastructure.',
    },
    'Dell': {
        'id': 'dell', 'slug': 'dell', 'mode': 'insert', 'hss': 55, 'stars': 2,
        'website_url': 'https://www.dell.com',
        'logo_url': 'https://www.dell.com/favicon.ico',
        'description': 'US PC and enterprise-technology company (est. 1984) — laptops, desktops, servers and services.',
    },
    'HP': {
        'id': 'hp', 'slug': 'hp', 'mode': 'insert', 'hss': 51, 'stars': 2,
        'website_url': 'https://www.hp.com',
        'logo_url': 'https://www.hp.com/favicon.ico',
        'description': 'US computing and printing company (est. 1939) — PCs, printers, supplies and services.',
    },
    'Lenovo': {
        'id': 'lenovo', 'slug': 'lenovo', 'mode': 'insert', 'hss': 47, 'stars': 2,
        'website_url': 'https://www.lenovo.com',
        'logo_url': 'https://www.lenovo.com/favicon.ico',
        'description': 'Chinese multinational (est. 1984) — the world\'s largest PC maker, plus smart devices and enterprise servers.',
    },
    'Philips': {
        'id': 'philips', 'slug': 'philips', 'mode': 'insert', 'hss': 51, 'stars': 2,
        'website_url': 'https://www.philips.com',
        'logo_url': 'https://www.philips.com/favicon.ico',
        'description': 'Dutch health-technology company (est. 1891) — medical equipment, personal care and home appliances.',
    },
    'Bosch': {
        'id': 'bosch', 'slug': 'bosch', 'mode': 'insert', 'hss': 51, 'stars': 2,
        'website_url': 'https://www.bosch.com',
        'logo_url': 'https://www.bosch.com/media/tech/tech_images/favicon.ico',
        'description': 'German engineering and technology group (est. 1886) — home appliances, power tools and mobility technology.',
    },
    'Nokia': {
        'id': 'nokia', 'slug': 'nokia', 'mode': 'insert', 'hss': 47, 'stars': 2,
        'website_url': 'https://www.nokia.com',
        'logo_url': 'https://www.nokia.com/favicon.ico',
        'description': 'Finnish telecom-infrastructure company (est. 1865) — 5G networks and operator equipment for the B2B market.',
    },
    'Panasonic': {
        'id': 'panasonic', 'slug': 'panasonic', 'mode': 'insert', 'hss': 47, 'stars': 2,
        'website_url': 'https://www.panasonic.com',
        'logo_url': 'https://www.panasonic.com/favicon.ico',
        'description': 'Japanese electronics conglomerate (est. 1918) — consumer electronics, home appliances and batteries.',
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
        # NOTE: no product insert step — batch 8 is BRANDS ONLY per the owner rebrand.
    print(f'\ndone: {ok} ok, {fail} failed {"(dry)" if DRY else ""}')
    sys.exit(1 if fail else 0)


if __name__ == '__main__':
    main()