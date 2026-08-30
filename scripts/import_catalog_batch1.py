#!/usr/bin/env python3
"""
import_catalog_batch1.py — Catalog Expansion Batch 1 importer.

Two parts, mirroring the proven batch-6 pillar-import pattern (quote-aware
'' escaping, one `team-db` statement per call, dry-run, entity-ID verification):

PART A (UPDATE): Backfill missing pillar `detail` for existing brands
  (Procter & Gamble, Walmart). Reads their 5 detail blocks from the content
  file and UPDATEs the matching existing `Hummlan Pillar:` rows. No new rows.

PART B (INSERT): 10 NEW real companies (Lush, Rituals, Stella McCartney,
  ECOALF, Armedangels, Girlfriend Collective, dopper, KeepCup, PANGAIA,
  Aesop). For each: new brands row + 6 sustainability_ratings rows
  (1 HSS overall + 5 pillars) with the matching detail block + a small set of
  representative products (placeholder image = domain favicon, honest no-fake-
  price buy state = no affiliate_links fabricated).

Source content: /home/team/shared/catalog-expansion-batch1.md
  (researcher-prepared, task bb502af6; scores + per-pillar detail blocks).

Usage:
  python3 scripts/import_catalog_batch1.py --dry     # parse + print plan, no writes
  python3 scripts/import_catalog_batch1.py            # execute

Pattern notes:
  * Pillar scores are taken from the `### <Pillar> — N/5` headings in the
    content file (authoritative, all HSS-consistent). Where the hand-written
    import-notes table disagreed with the content headings (Armedangels
    Circular, Girlfriend Collective Climate), the CONTENT file wins.
  * HSS star count derived: >=90->5, 77-88->4, 60-76->3, 40-59->2, <40->1.
  * entity IDs/slugs are verified against the live `brands` table before insert
    (no slug collisions — checked 2026-08-30).
"""
import subprocess, sys, re, json, os

DRY = '--dry' in sys.argv
CONTENT = '/home/team/shared/catalog-expansion-batch1.md'
# Point to any catalog .md in the same format to reuse for future batches.
CONTENT = os.environ.get('CATALOG_CONTENT', CONTENT)

# ---------------------------------------------------------------------------
# Brand metadata (id/slug/website/desc must exist; scores parsed from content)
# ---------------------------------------------------------------------------
BRAND_META = {
    # Part A — backfill only (no new row)
    'Procter & Gamble': {
        'id': 'procter_gamble', 'slug': 'procter-gamble', 'mode': 'backfill',
        'website_url': 'https://us.pg.com',
        'description': 'Global consumer-goods giant (Pampers, Tide, Gillette) — real climate/circularity programmes at massive scale, capped by plastic volume and supply-chain complexity.',
    },
    'Walmart': {
        'id': 'walmart', 'slug': 'walmart', 'mode': 'backfill',
        'website_url': 'https://www.walmart.com',
        'description': 'World\u2019s largest retailer with large-scale renewable and supply-chain programmes, tempered by enormous volume and labour-related controversy.',
    },
    # Part B — new inserts
    'Lush': {
        'id': 'lush', 'slug': 'lush', 'mode': 'insert', 'hss': 69, 'stars': 3,
        'website_url': 'https://www.lush.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=lush.com&sz=128',
        'description': 'Ethics-led cosmetics brand famed for packaging-free "naked" products, cruelty-free advocacy and regenerating-sourcing programmes.',
        'products': [
            ('Shampoo Bar (Honey I Washed The Hair)', 'shampoo-bar-honey-i-washed-the-hair', 'personal_care_hair_care_bars', 'Naked (packaging-free) solid shampoo bar in Lush\u2019s signature honey-oat scent.'),
            ('Intergalactic Bath Bomb', 'intergalactic-bath-bomb', 'personal_care_hair_body', 'Packaging-free bath bomb with ethically sourced ingredients.'),
        ],
    },
    'Rituals': {
        'id': 'rituals', 'slug': 'rituals', 'mode': 'insert', 'hss': 51, 'stars': 2,
        'website_url': 'https://www.rituals.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=rituals.com&sz=128',
        'description': 'Premium lifestyle body-care brand whose wellness positioning outpaces its verified sustainability substance.',
        'products': [
            ('The Ritual of Sakura Body Cream', 'the-ritual-of-sakura-body-cream', 'personal_care_beauty_skincare', 'Premium body cream in a recyclable glass jar.'),
        ],
    },
    'Stella McCartney': {
        'id': 'stella-mccartney', 'slug': 'stella-mccartney', 'mode': 'insert', 'hss': 65, 'stars': 3,
        'website_url': 'https://www.stellamccartney.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=stellamccartney.com&sz=128',
        'description': 'Luxury-fashion house pioneering material responsibility \u2014 no leather, fur or exotic skins, heavy use of recycled and bio-based materials.',
        'products': [
            ('Falabella Bag', 'falabella-bag', 'fashion_accessories', 'Iconic cruelty-free bag made with recycled and vegan materials.'),
        ],
    },
    'ECOALF': {
        'id': 'ecoalf', 'slug': 'ecoalf', 'mode': 'insert', 'hss': 69, 'stars': 3,
        'website_url': 'https://ecoalf.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=ecoalf.com&sz=128',
        'description': 'Spanish pioneer of upcycled materials \u2014 ocean plastic and post-consumer waste turned into garments.',
        'products': [
            ('Recycled Down Jacket', 'recycled-down-jacket', 'fashion_outdoor', 'Jacket made with recycled fabric and upcycled down.'),
        ],
    },
    'Armedangels': {
        'id': 'armedangels', 'slug': 'armedangels', 'mode': 'insert', 'hss': 76, 'stars': 3,
        'website_url': 'https://www.armedangels.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=armedangels.com&sz=128',
        'description': 'Cologne fair-fashion brand \u2014 GOTS-certified organic cotton, Fairtrade, B Corp (widely reported) and a transparent supply chain.',
        'products': [
            ('Organic Cotton T-Shirt', 'organic-cotton-t-shirt', 'fashion_sustainable_basics', 'GOTS-certified organic cotton basic tee from fair-trade supply chains.'),
        ],
    },
    'Girlfriend Collective': {
        'id': 'girlfriend-collective', 'slug': 'girlfriend-collective', 'mode': 'insert', 'hss': 69, 'stars': 3,
        'website_url': 'https://www.girlfriend.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=girlfriend.com&sz=128',
        'description': 'US activewear brand built on recyclability and transparency \u2014 recycled bottles and fishing-net fibres, OEKO-TEX certified.',
        'products': [
            ('Compressive High-Rise Legging', 'compressive-high-rise-legging', 'fashion_eco_activewear', 'Legging made from recycled plastic bottles and fishing nets.'),
        ],
    },
    'dopper': {
        'id': 'dopper', 'slug': 'dopper', 'mode': 'insert', 'hss': 76, 'stars': 3,
        'website_url': 'https://dopper.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=dopper.com&sz=128',
        'description': 'Dutch reusable-bottle brand \u2014 widely-reported B Corp with a take-back refurbishment scheme and clean-water projects.',
        'products': [
            ('Original Water Bottle 500ml', 'original-water-bottle-500ml', 'household_reusable_drinkware', 'Durable reusable bottle with take-back and refurbishment.'),
        ],
    },
    'KeepCup': {
        'id': 'keepcup', 'slug': 'keepcup', 'mode': 'insert', 'hss': 76, 'stars': 3,
        'website_url': 'https://au.keepcup.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=keepcup.com&sz=128',
        'description': 'The original reusable-cup brand \u2014 circular-economy icon, widely-reported B Corp, replaces hundreds of single-use cups per user.',
        'products': [
            ('Brew Cork 12oz', 'brew-cork-12oz', 'household_reusable_drinkware', 'Reusable cup with a cork band and replaceable parts.'),
        ],
    },
    'PANGAIA': {
        'id': 'pangaia', 'slug': 'pangaia', 'mode': 'insert', 'hss': 58, 'stars': 2,
        'website_url': 'https://pangaia.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=pangaia.com&sz=128',
        'description': 'Materials-science fashion brand with innovative bio-based and recycled materials, tempered by heavy self-reported marketing and a thin supply-chain record.',
        'products': [
            ('Recycled Cotton Hoodie', 'recycled-cotton-hoodie', 'fashion', 'Hoodie made from recycled and bio-based fibres.'),
        ],
    },
    'Aesop': {
        'id': 'aesop', 'slug': 'aesop', 'mode': 'insert', 'hss': 57, 'stars': 2,
        'website_url': 'https://www.aesop.com',
        'logo_url': 'https://www.google.com/s2/favicons?domain=aesop.com&sz=128',
        'description': 'Premium, design-led skincare brand \u2014 cruelty-free and plant-based, now owned by L\u2019Or\u00e9al, with limited environmental disclosure and opaque supply chains.',
        'products': [
            ('Resurrection Aromatique Hand Wash', 'resurrection-aromatique-hand-wash', 'personal_care_beauty_skincare', 'Plant-based hand wash with recyclable packaging.'),
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
    new_ids = {m['id'] for m in BRAND_META.values() if m['mode'] == 'insert'}
    # verify new ids/slugs don't already exist
    r = db("SELECT id, slug FROM brands WHERE id IN (%s) OR slug IN (%s)" % (
        ','.join("'%s'" % esc(x) for x in new_ids),
        ','.join("'%s'" % esc(BRAND_META[n]['slug']) for n in BRAND_META if BRAND_META[n]['mode']=='insert'),
    ))
    existing = [row['id'] for row in json.loads(r.stdout)] if r.returncode == 0 else []
    if existing:
        print(f'ABORT: these new ids already exist: {existing}')
        sys.exit(1)

    print(f'Parsed content: {len(blocks)} brand blocks | DRY={"yes" if DRY else "no"}\n')

    ok = fail = 0
    for name, meta in BRAND_META.items():
        brand_blocks = blocks.get(name, {})
        if len(brand_blocks) != 5:
            print(f'  [warn] {name}: expected 5 pillars, got {len(brand_blocks)}')
        id_ = meta['id']

        # ---------- PART A / backfill: UPDATE detail on existing pillar rows
        if meta['mode'] == 'backfill':
            for pillar in PILLARS:
                if pillar not in brand_blocks:
                    print(f'  [warn] {name}: missing {pillar}')
                    continue
                _, body = brand_blocks[pillar]
                sql = f"UPDATE sustainability_ratings SET detail = '{esc(body)}' WHERE entity_type='brand' AND entity_id='{esc(id_)}' AND source_name='Hummlan Pillar: {esc(pillar)}'"
                if DRY:
                    print(f'  [BACKFILL dry] {id_} :: {pillar}  ({len(body)} chars)')
                    ok += 1
                    continue
                p = db(sql)
                if p.returncode == 0:
                    ok += 1
                else:
                    fail += 1
                    print(f'  [BACKFILL FAIL] {id_} :: {pillar} — {p.stderr.strip()[:200]}')
            continue

        # ---------- PART B / insert: brand + 6 rating rows + products
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
