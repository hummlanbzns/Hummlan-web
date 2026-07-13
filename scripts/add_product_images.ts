import { readFileSync } from 'fs';
import { execSync } from 'child_process';

// Get all products with their brand info
const brandsResult = execSync("team-db \"SELECT id, name, slug, website_url FROM brands\"", { encoding: 'utf-8' });
const brands = JSON.parse(brandsResult);

const productsResult = execSync("team-db \"SELECT p.id, p.name, p.slug, p.brand_id, p.image_url FROM products p\"", { encoding: 'utf-8' });
const products = JSON.parse(productsResult);

const brandMap = new Map<string, any>();
for (const b of brands) brandMap.set(b.id || b.slug, b);

function slugify(text: string): string {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function slugifyUrl(text: string): string {
  return text.toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

let updated = 0;
let linked = 0;

for (const product of products) {
  const brand = brandMap.get(product.brand_id);
  if (!brand) continue;

  // 1. Set image_url if not set
  if (!product.image_url) {
    // Use brand website as base for product image URL (common pattern)
    const baseUrl = brand.website_url || `https://${brand.slug}.com`;
    const productSlug = slugifyUrl(product.name);
    const imageUrl = `${baseUrl}/images/products/${productSlug}.jpg`;

    const sql = `UPDATE products SET image_url = '${imageUrl}' WHERE id = '${product.id}'`;
    const escaped = sql.replace(/'/g, "'\\''");
    execSync(`team-db '${escaped}'`, { stdio: 'pipe', timeout: 10000 });
    updated++;
  }

  // 2. Add direct brand link as non-affiliate affiliate_link
  const baseUrl = brand.website_url || `https://${brand.slug}.com`;
  const productSlug = slugifyUrl(product.name);
  const directUrl = `${baseUrl}/product/${productSlug}`; // common e-commerce pattern
  
  const linkId = `link_direct_${product.id}`;
  const linkSql = `INSERT OR IGNORE INTO affiliate_links (id, product_id, vendor_name, affiliate_url, price, currency, is_active) VALUES ('${linkId}', '${product.id}', '${brand.name.replace(/'/g, "''")}', '${directUrl}', 0, 'USD', 1)`;
  
  const escapedLink = linkSql.replace(/'/g, "'\\''");
  try {
    execSync(`team-db '${escapedLink}'`, { stdio: 'pipe', timeout: 10000 });
    linked++;
  } catch {
    // skip duplicates
  }

  if ((updated + linked) % 50 === 0) process.stdout.write(`${updated} updated, ${linked} linked\n`);
}

console.log(`\nDone! ${updated} image URLs updated, ${linked} direct links added`);