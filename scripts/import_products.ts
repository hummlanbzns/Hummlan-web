import { readFileSync } from 'fs';
import { execSync } from 'child_process';

const markdown = readFileSync('/home/team/shared/product_expansion_research.md', 'utf-8');
const lines = markdown.split('\n');

// Categories mapping
const CATEGORY_MAP: Record<string, string> = {
  'fashion': 'fashion',
  'personal care': 'personal-care',
  'personal_care': 'personal-care',
  'household': 'household',
  'food': 'food',
};

// Slug mapping for special cases where simple _→- conversion doesn't match DB
const SLUG_OVERRIDES: Record<string, string> = {
  'fj_llr_ven': 'fjllrven',
  'schmidt_s': 'schmidts',
  'mrs_meyer_s': 'mrs-meyers',
  'justine_s': 'justines',
  'pact_organic': 'pact-organic', // already handled by _→- but explicit for clarity
};

function normalizeBrandSlug(slug: string): string {
  // Check for explicit overrides first
  if (SLUG_OVERRIDES[slug]) return SLUG_OVERRIDES[slug];
  // Default: replace underscores with hyphens
  return slug.replace(/_/g, '-');
}

function slugify(text: string): string {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/&/g, 'and');
}

function execSql(sql: string, label: string) {
  try {
    const escaped = sql.replace(/'/g, "'\\''");
    execSync(`team-db '${escaped}'`, { stdio: 'pipe', timeout: 10000 });
    process.stdout.write(`.`);
  } catch (e: any) {
    if (e.stderr?.includes('UNIQUE constraint')) {
      // skip duplicates silently
    } else {
      console.error(`\nError on ${label}: ${e.stderr || e.message}`);
    }
  }
}

// ============================================================
// STEP 1: Parse and insert new brands (defined at end of file)
// ============================================================
console.log('=== Phase 1: Inserting new brands ===');

// Find the "New Brand Candidates" section
const brandSectionStart = lines.findIndex(l => l.includes('## Phase 2: New Brand Candidates'));
const brandLines = lines.slice(brandSectionStart);

const newBrands: { name: string; slug: string; category: string; hss: number; description: string }[] = [];
let currentBrand: any = null;

for (const line of brandLines) {
  const brandMatch = line.match(/^####\s+(.+?)\s+\(HSS:\s*(\d+)\/100\)\s+\[([\w-]+)\]/);
  if (brandMatch) {
    if (currentBrand) newBrands.push(currentBrand);
    currentBrand = {
      name: brandMatch[1].trim(),
      slug: brandMatch[3],
      category: '',
      hss: parseInt(brandMatch[2]),
      description: '',
    };
  }
  if (currentBrand && line.includes('**Category:**')) {
    currentBrand.category = line.split('**Category:**')[1]?.trim().toLowerCase() || '';
  }
  if (currentBrand && line.includes('**Why Add:**')) {
    currentBrand.description = line.split('**Why Add:**')[1]?.trim() || '';
  }
}
if (currentBrand) newBrands.push(currentBrand);

console.log(`Found ${newBrands.length} new brands to add`);

for (const brand of newBrands) {
  const catId = CATEGORY_MAP[brand.category] || 'general';
  const sql = `INSERT OR IGNORE INTO brands (id, name, slug, description, overall_sustainability_score) VALUES ('${brand.slug}', '${brand.name.replace(/'/g, "''")}', '${brand.slug}', '${brand.description.replace(/'/g, "''")}', ${brand.hss})`;
  execSql(sql, `brand: ${brand.name}`);
}
console.log(`\nDone inserting ${newBrands.length} brands`);

// ============================================================
// STEP 2: Insert products from the main section
// ============================================================
console.log('\n=== Phase 2: Parsing products ===');

interface Product {
  name: string;
  brandSlug: string;
  category: string;
  description: string;
  price: string;
  sustainability: string;
}

const products: Product[] = [];
let currentBrandSlug = '';
let currentCategory = '';

// Track which section we're in
let currentSection = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Track which category section we're in
  const sectionMatch = line.match(/^###\s+(.+?)(?:\s+Brands)?$/);
  if (sectionMatch) {
    const sectionName = sectionMatch[1].toLowerCase();
    if (sectionName.includes('fashion')) currentSection = 'fashion';
    else if (sectionName.includes('personal')) currentSection = 'personal-care';
    else if (sectionName.includes('household')) currentSection = 'household';
    else if (sectionName.includes('food')) currentSection = 'food';
  }

  // Stop at Phase 2
  if (line.includes('## Phase 2:')) break;

  // Parse brand header: #### BrandName (HSS: XX/100) [brand-slug] — X existing product(s)
  const brandMatch = line.match(/^####\s+.+?\s+\(HSS:\s*\d+\/100\)\s+\[([\w-]+)\]/);
  if (brandMatch) {
    currentBrandSlug = normalizeBrandSlug(brandMatch[1]);
    continue;
  }

  // Parse product: - **Product Name** — *Category*
  const productMatch = line.match(/^-\s+\*\*(.+?)\*\*\s+—\s+\*([^*]+)\*/);
  if (productMatch && currentBrandSlug) {
    const product: Product = {
      name: productMatch[1].trim(),
      brandSlug: currentBrandSlug,
      category: productMatch[2].trim().toLowerCase(),
      description: '',
      price: '',
      sustainability: '',
    };

    // Look ahead for description, price, and sustainability
    for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
      const nextLine = lines[j];
      if (nextLine.includes('**Description:**')) {
        product.description = nextLine.split('**Description:**')[1]?.trim() || '';
      } else if (nextLine.includes('**Est. Price:**')) {
        product.price = nextLine.split('**Est. Price:**')[1]?.trim() || '';
      } else if (nextLine.includes('**Sustainability:**')) {
        product.sustainability = nextLine.split('**Sustainability:**')[1]?.trim() || '';
      }
      // Stop at next product or brand
      if (nextLine.match(/^-\s+\*\*/) && nextLine !== line) break;
    }

    products.push(product);
  }
}

console.log(`Parsed ${products.length} products total`);

// ============================================================
// STEP 3: Insert products into DB
// ============================================================
console.log('\n=== Phase 3: Inserting products ===');

let insertCount = 0;
let errorCount = 0;

for (const product of products) {
  const productSlug = slugify(product.name);
  const id = `prod_${product.brandSlug}_${productSlug}`;
  const catId = CATEGORY_MAP[product.category] || CATEGORY_MAP[currentSection] || 'general';

  const name = product.name.replace(/'/g, "''");
  const desc = (product.description || '').replace(/'/g, "''");
  const summary = (product.sustainability || '').replace(/'/g, "''");

  const sql = `INSERT OR IGNORE INTO products (id, brand_id, category_id, name, slug, description, sustainability_summary) VALUES ('${id}', '${product.brandSlug}', '${catId}', '${name}', '${productSlug}', '${desc}', '${summary}')`;
  
  try {
    const escaped = sql.replace(/'/g, "'\\''");
    execSync(`team-db '${escaped}'`, { stdio: 'pipe', timeout: 10000 });
    insertCount++;
    if (insertCount % 20 === 0) process.stdout.write(`${insertCount}/${products.length}\n`);
  } catch (e: any) {
    if (e.stderr?.includes('UNIQUE constraint')) {
      insertCount++; // already exists, count it
    } else {
      errorCount++;
    }
  }
}

console.log(`\nDone! Inserted ${insertCount}/${products.length} products. Errors: ${errorCount}`);