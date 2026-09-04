#!/usr/bin/env python3
"""
Reusable catalog batch-2 importer — 12 NEW brands (full HSS + 5-pillar drill-downs).

Same proven pattern as scripts/import_catalog_batch1.py: parses per-`## brand`
sections from a catalog content .md, INSERTs brand + HSS row + 5 pillar rows
(with `detail` bodies) + representative products (placeholder favicon image,
honest no-fake-price buy state handled by the product page).

Source content: /home/team/shared/catalog-expansion-batch2.md
  (researcher-prepared, task a14ce8e3; scores + per-pillar detail blocks).

Usage:
  python3 scripts/import_catalog_batch2.py --dry     # parse + print plan, no writes
  python3 scripts/import_catalog_batch2.py            # execute
  CATALOG_CONTENT=/path/to/other.md python3 scripts/import_catalog_batch2.py  # point at any matching .md

Pattern notes:
  * Pillar scores are taken from the `### <Pillar> — N/5` headings in the
    content file (authoritative, all HSS-consistent). Where the hand-written
    import-notes table disagreed with the content headings, the CONTENT wins.
  * HSS star count derived: >=90->5, 77-88->4, 60-76->3, 40-59->2, <40->1.
  * entity IDs/slugs were pre-verified against the live `brands` table (2026-08-30):
    none of the 12 slugs exist; brand count was 115.
"""
import subprocess, sys, re, json, os
DRY = '--dry' in sys.argv
CONTENT = '/home/team/shared/catalog-expansion-batch2.md'
# Point to any catalog .md in the same format to reuse for future batches.
CONTENT = os.environ.get('CATALOG_CONTENT', CONTENT)
# ---------------------------------------------------------------------------
# Brand metadata (id/slug/website/desc must exist; scores parsed from content)
# ---------------------------------------------------------------------------
BRAND_META = {
    'Outerknown': {
        'id': 'outerknown', 'slug': 'outerknown', 'mode': 'insert', 'hss': 66, 'stars': 3,
        'website_url': 'https://www.outerknown.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=outerknown.com&sz=128',
        'description': 'Surf-and-sportswear label built on recycled fibres and certified organic cotton with a genuinely responsible-sourcing story (Fair Labor- and bluesign-aligned).',
        'products': [
            ('Foundation Short', 'foundation-short', 'fashion_outdoor_surf_apparel', 'Everyday surf short built from recycled nylon and Fair Labor-aligned supply chains.'),
        ],
    },
    'prAna': {
        'id': 'prana', 'slug': 'prana', 'mode': 'insert', 'hss': 54, 'stars': 2,
        'website_url': 'https://www.prana.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=prana.com&sz=128',
        'description': 'Long-standing outdoor-apparel brand (Columbia-owned) with a genuine organic-cotton and recycled-fibre heritage and broad responsible-sourcing commitments.',
        'products': [
            ('Stretch Zion Pant', 'stretch-zion-pant', 'fashion_outdoor', 'Classic outdoor pant in a bluesign-approved recycled nylon blend.'),
        ],
    },
    'Mud Jeans': {
        'id': 'mud-jeans', 'slug': 'mud-jeans', 'mode': 'insert', 'hss': 76, 'stars': 3,
        'website_url': 'https://www.mudjeans.eu',
        'logo_url': 'https://www.google.com/s2/favicons?domain=mudjeans.eu&sz=128',
        'description': 'Genuinely circular European denim brand — jeans you lease, repair and recycle, made from certified organic cotton.',
        'products': [
            ('Lease A Jeans (Relaxed Tapered)', 'lease-a-jeans', 'fashion_denim', 'Certified organic cotton denim you can lease, repair and recycle.'),
        ],
    },
    'Dedicated Brand Co.': {
        'id': 'dedicated-brand-co', 'slug': 'dedicated-brand-co', 'mode': 'insert', 'hss': 58, 'stars': 2,
        'website_url': 'https://www.dedicatedbrand.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=dedicatedbrand.com&sz=128',
        'description': 'EU streetwear brand with strong GOTS-certified organic cotton and fair manufacturing.',
        'products': [
            ('Organic Cotton Oversized Tee', 'organic-cotton-oversized-tee', 'fashion_sustainable_basics', 'GOTS-certified organic cotton streetwear tee from fair manufacturing.'),
        ],
    },
    'Coyuchi': {
        'id': 'coyuchi', 'slug': 'coyuchi', 'mode': 'insert', 'hss': 76, 'stars': 3,
        'website_url': 'https://www.coyuchi.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=coyuchi.com&sz=128',
        'description': 'Circular organic home-textiles brand — organic cotton and linen, a take-back "Second Life" resale program and Fair Trade factory commitments.',
        'products': [
            ('Organic Cotton Percale Sheet Set', 'organic-cotton-percale-sheet-set', 'household', 'Organic-cotton bedding with take-back "Second Life" resale.'),
        ],
    },
    'Avocado Green Mattress': {
        'id': 'avocado-green-mattress', 'slug': 'avocado-green-mattress', 'mode': 'insert', 'hss': 65, 'stars': 3,
        'website_url': 'https://www.avocadogreenmattress.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=avocadogreenmattress.com&sz=128',
        'description': 'Organic mattress brand with genuinely certified materials (GOLS latex, GOTS wool/cotton, MADE SAFE) and a take-back recycling program.',
        'products': [
            ('Classic Green Mattress', 'classic-green-mattress', 'household', 'GOLS latex and GOTS wool/cotton mattress with take-back recycling.'),
        ],
    },
    'Boll & Branch': {
        'id': 'boll-and-branch', 'slug': 'boll-and-branch', 'mode': 'insert', 'hss': 61, 'stars': 3,
        'website_url': 'https://www.bollandbranch.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=bollandbranch.com&sz=128',
        'description': 'Ethical luxury-bedding brand built on certified organic cotton and Fair Trade supply chains with a transparent sourcing story.',
        'products': [
            ('Signature Sheet Set', 'signature-sheet-set', 'household', 'Fair Trade Certified organic-cotton luxury sheets.'),
        ],
    },
    'ILIA': {
        'id': 'ilia', 'slug': 'ilia', 'mode': 'insert', 'hss': 57, 'stars': 2,
        'website_url': 'https://www.iliabeauty.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=iliabeauty.com&sz=128',
        'description': 'Well-known clean-beauty brand with non-toxic, cruelty-free and largely vegan formulas and some recycled packaging.',
        'products': [
            ('Super Serum Skin Tint', 'super-serum-skin-tint', 'personal_care_beauty_skincare', 'Clean, vegan skin tint with recyclable glass packaging.'),
        ],
    },
    'RMS Beauty': {
        'id': 'rms-beauty', 'slug': 'rms-beauty', 'mode': 'insert', 'hss': 60, 'stars': 3,
        'website_url': 'https://www.rmsbeauty.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=rmsbeauty.com&sz=128',
        'description': 'Pioneer in "living" clean beauty — non-toxic, cruelty-free, minimal-ingredient formulas with recyclable glass packaging.',
        'products': [
            ('UnCoverup Concealer', 'uncoverup-concealer', 'personal_care_beauty_skincare', 'Minimal-ingredient "living" concealer in recyclable glass.'),
        ],
    },
    'OSEA': {
        'id': 'osea', 'slug': 'osea', 'mode': 'insert', 'hss': 61, 'stars': 3,
        'website_url': 'https://www.oseamalibu.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=oseamalibu.com&sz=128',
        'description': 'Clean, vegan, cruelty-free ocean-inspired skincare brand with a genuine non-toxic and sustainability story.',
        'products': [
            ('Ocean Cleansing Milk', 'ocean-cleansing-milk', 'personal_care_beauty_skincare', 'Vegan, waterless-conscious skincare in recyclable glass.'),
        ],
    },
    'Alter Eco': {
        'id': 'alter-eco', 'slug': 'alter-eco', 'mode': 'insert', 'hss': 72, 'stars': 3,
        'website_url': 'https://www.alterecofoods.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=alterecofoods.com&sz=128',
        'description': 'Farmer-owned, Fairtrade and B Corp chocolate-and-food brand with genuinely verified ethical sourcing and compostable, plastic-free packaging.',
        'products': [
            ('Dark Chocolate Truffles (Quinoa)', 'dark-chocolate-truffles', 'food_fair_trade_chocolate', 'Fairtrade organic chocolate in plastic-free, compostable packaging.'),
        ],
    },
    'Etee': {
        'id': 'etee', 'slug': 'etee', 'mode': 'insert', 'hss': 72, 'stars': 3,
        'website_url': 'https://www.etee.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=etee.com&sz=128',
        'description': 'Plastic-free, zero-waste Canadian brand with genuinely circular, home-compostable and refillable household and personal-care products.',
        'products': [
            ('Dishwasher Detergent (Refill)', 'dishwasher-detergent-refill', 'household_cleaning_products', 'Plastic-free, home-compostable dishwasher detergent refill.'),
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