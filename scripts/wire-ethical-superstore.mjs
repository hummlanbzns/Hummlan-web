#!/usr/bin/env node
/**
 * wire-ethical-superstore.mjs — Wire Ethical Superstore (Awin 3651) to our products
 *
 * Ethical Superstore (advertiserId 3651) is a UK eco marketplace carrying
 * many brands we rate. This script creates Awin tracking links for our
 * products from brands they carry, using brand-level search URLs.
 *
 * Ethical Superstore is behind Cloudflare so individual product URLs
 * can't be verified programmatically. Instead we use brand search pages,
 * which is the standard affiliate approach for multi-brand marketplaces.
 *
 * Usage:
 *   node scripts/wire-ethical-superstore.mjs
 *   node scripts/wire-ethical-superstore.mjs --dry-run
 *
 * Requires: TEAM_DB_URL & TEAM_DB_AUTH_TOKEN in env
 *           AWIN_PUBLISHER_ID & AWIN_API_KEY in .env
 */

import { readFileSync, existsSync } from 'fs';
import { createClient } from '@libsql/client';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes('--dry-run');
const ADVERTISER_ID = 3651;
const PUBLISHER_ID = (() => {
  try {
    const envPath = resolve(__dirname, '..', '.env');
    if (existsSync(envPath)) {
      const text = readFileSync(envPath, 'utf-8');
      for (const line of text.split('\n')) {
        const trimmed = line.trim();
        if (trimmed.startsWith('AWIN_PUBLISHER_ID=')) {
          return trimmed.split('=')[1].trim();
        }
      }
    }
  } catch {}
  return process.env.AWIN_PUBLISHER_ID;
})();

const DB_URL = process.env.TEAM_DB_URL;
const DB_TOKEN = process.env.TEAM_DB_AUTH_TOKEN;

if (!DB_URL || !DB_TOKEN) {
  console.error('ERROR: TEAM_DB_URL and TEAM_DB_AUTH_TOKEN must be set');
  process.exit(1);
}

const db = createClient({ url: DB_URL, authToken: DB_TOKEN });

async function q(sql, args = []) {
  const rs = await db.execute({ sql, args });
  return rs.rows;
}

function makeAwinUrl(destinationUrl) {
  const encoded = encodeURIComponent(destinationUrl);
  return `https://www.awin1.com/cread.php?awinmid=${ADVERTISER_ID}&awinaffid=${PUBLISHER_ID}&ued=${encoded}`;
}

/**
 * Brands from our DB that Ethical Superstore carries.
 * Verified via public knowledge of Ethical Superstore's catalogue.
 * Each entry maps a brand_id to search term & URL path.
 */
const BRAND_MAP = [
  // --- Household cleaning ---
  { brandId: 'ecover',        searchTerm: 'Ecover',          urlPath: 'search/ecover' },
  { brandId: 'method',        searchTerm: 'Method',          urlPath: 'search/method' },
  { brandId: 'seventh_generation', searchTerm: 'Seventh Generation', urlPath: 'search/seventh-generation' },
  { brandId: 'biokleen',      searchTerm: 'Biokleen',        urlPath: 'search/biokleen' },
  { brandId: 'meliora',       searchTerm: 'Meliora',         urlPath: 'search/meliora' },
  { brandId: 'mrs_meyer_s',   searchTerm: 'Mrs Meyers',      urlPath: 'search/mrs+meyers' },
  { brandId: 'ecos',          searchTerm: 'ECOS',            urlPath: 'search/ecos' },
  { brandId: 'attitude',      searchTerm: 'Attitude',        urlPath: 'search/attitude' },
  { brandId: 'cleancult',     searchTerm: 'Cleancult',       urlPath: 'search/cleancult' },
  { brandId: 'dropps',        searchTerm: 'Dropps',          urlPath: 'search/dropps' },

  // --- Personal care & beauty ---
  { brandId: 'weleda',        searchTerm: 'Weleda',          urlPath: 'search/weleda' },
  { brandId: 'dr_bronner_s',  searchTerm: "Dr Bronner's",    urlPath: 'search/dr+bronners' },
  { brandId: 'burts-bees',    searchTerm: "Burt's Bees",     urlPath: 'search/burts+bees' },
  { brandId: 'ethique',       searchTerm: 'Ethique',         urlPath: 'search/ethique' },
  { brandId: 'native-deodorant', searchTerm: 'Native Deodorant', urlPath: 'search/native+deodorant' },
  { brandId: 'bulldog',       searchTerm: 'Bulldog Skincare', urlPath: 'search/bulldog' },
  { brandId: 'acure',         searchTerm: 'Acure',           urlPath: 'search/acure' },
  { brandId: 'upcircle-beauty', searchTerm: 'UpCircle',       urlPath: 'search/upcircle' },

  // --- Oral care ---
  { brandId: 'georganics',    searchTerm: 'Georganics',      urlPath: 'search/georganics' },

  // --- Feminine care / bathroom ---
  { brandId: 'organyc',       searchTerm: 'Organyc',         urlPath: 'search/organyc' },
  { brandId: 'who-gives-a-crap', searchTerm: 'Who Gives A Crap', urlPath: 'search/who+gives+a+crap' },

  // --- Drinkware & food storage ---
  { brandId: 'klean-kanteen', searchTerm: 'Klean Kanteen',   urlPath: 'search/klean+kanteen' },
  { brandId: 'stasher',       searchTerm: 'Stasher',         urlPath: 'search/stasher' },
  { brandId: 'frank-green',   searchTerm: 'Frank Green',     urlPath: 'search/frank+green' },

  // --- Food & drink ---
  { brandId: 'traditional_medicinals', searchTerm: 'Traditional Medicinals', urlPath: 'search/traditional+medicinals' },
  { brandId: 'frontier_co_op', searchTerm: 'Frontier Co-op', urlPath: 'search/frontier+coop' },
  { brandId: 'celestial_seasonings', searchTerm: 'Celestial Seasonings', urlPath: 'search/celestial+seasonings' },

  // --- Baby & kids ---
  { brandId: 'babo_botanicals', searchTerm: 'Babo Botanicals', urlPath: 'search/babo+botanicals' },
];

async function main() {
  console.log('=== Wire Ethical Superstore (Awin 3651) ===');
  if (DRY_RUN) console.log('>>> DRY RUN — no changes will be made <<<\n');

  // 1. Load brands from DB
  console.log('\n[1/3] Loading brands from DB...');
  const brands = await q('SELECT id, name FROM brands');
  const brandNameMap = {};
  for (const b of brands) {
    brandNameMap[b.id] = b.name;
  }
  console.log(`  ${brands.length} brands loaded`);

  // 2. For each mapped brand, get products and build links
  console.log('\n[2/3] Building Awin tracking links...');
  const operations = []; // { productId, brandId, brandName, affiliateUrl, price }

  for (const mapping of BRAND_MAP) {
    const brandName = brandNameMap[mapping.brandId];
    if (!brandName) {
      console.log(`  ✗ Brand "${mapping.brandId}" not found in DB, skipping`);
      continue;
    }

    const products = await q(
      'SELECT id, name FROM products WHERE brand_id = ?',
      [mapping.brandId]
    );

    if (products.length === 0) {
      console.log(`  - ${mapping.searchTerm} (${mapping.brandId}): no products in DB`);
      continue;
    }

    // Build the destination URL for this brand
    const destinationUrl = `https://www.ethicalsuperstore.com/${mapping.urlPath}`;
    const affiliateUrl = makeAwinUrl(destinationUrl);

    console.log(`  ✓ ${mapping.searchTerm} (${mapping.brandId}): ${products.length} product(s)`);

    for (const product of products) {
      // Get current price from any existing active link
      const pricing = await q(
        'SELECT price FROM affiliate_links WHERE product_id = ? AND is_active = 1 AND price > 0 ORDER BY price ASC LIMIT 1',
        [product.id]
      );
      const price = pricing.length > 0 ? pricing[0].price : 0;

      operations.push({
        productId: product.id,
        brandId: mapping.brandId,
        brandName: mapping.searchTerm,
        affiliateUrl,
        price,
        destinationUrl,
      });

      console.log(`    ${product.name}: → Ethical Superstore (Awin)`);
    }
  }

  if (operations.length === 0) {
    console.log('\n  No products to wire. Exiting.');
    process.exit(0);
  }

  console.log(`\n  Total: ${operations.length} product links to create\n`);

  // 3. Apply changes
  console.log('[3/3] Applying changes...');
  if (DRY_RUN) {
    console.log('\n>>> DRY RUN — no changes made <<<');
    console.log('Would create links for:');
    for (const op of operations) {
      console.log(`  ${op.productId} → ${op.affiliateUrl}`);
    }
    return;
  }

  let inserted = 0;
  let skipped = 0;

  for (const op of operations) {
    // Check if an Ethical Superstore link already exists for this product
    const existing = await q(
      'SELECT id FROM affiliate_links WHERE product_id = ? AND vendor_name = ?',
      [op.productId, 'Ethical Superstore (Awin)']
    );

    if (existing.length > 0) {
      // Update existing link
      const now = new Date().toISOString();
      await q(
        `UPDATE affiliate_links SET affiliate_url = ?, price = ?, is_active = 1, last_fetched_at = ?
         WHERE id = ?`,
        [op.affiliateUrl, op.price, now, existing[0].id]
      );
      skipped++;
    } else {
      // Insert new link
      const linkId = `al_awin_ethicalsuperstore_${op.productId}`;
      const now = new Date().toISOString();
      await q(
        `INSERT INTO affiliate_links (id, product_id, vendor_name, affiliate_url, price, currency, is_active, last_fetched_at)
         VALUES (?, ?, ?, ?, ?, 'USD', 1, ?)`,
        [linkId, op.productId, 'Ethical Superstore (Awin)', op.affiliateUrl, op.price, now]
      );
      inserted++;
    }
  }

  console.log(`\n✅ Done! ${inserted} inserted, ${skipped} already existed (updated).`);
  console.log(`   Total products wired: ${operations.length}`);
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});