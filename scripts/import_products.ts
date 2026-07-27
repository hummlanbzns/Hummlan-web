import { readFileSync } from 'fs';
import { execSync } from 'child_process';

const markdown = readFileSync('/home/team/shared/product_expansion_research.md', 'utf-8');
const lines = markdown.split('\n');
const brandData: { id: string; slug: string }[] = JSON.parse(readFileSync('/tmp/brands_lookup.json', 'utf-8'));

// Categories mapping
// category_id in products must match categories.id (uses underscores, not hyphens)
const CATEGORY_MAP: Record<string, string> = {
  'fashion': 'fashion',
  'personal care': 'personal_care',
  'personal_care': 'personal_care',
  'household': 'household',
  'food': 'food',
};

// Build brand lookup: raw markdown slug → brand id
const brandLookup: Record<string, string> = {};
for (const brand of brandData) {
  // key by slug (hyphenated)
  brandLookup[brand.slug] = brand.id;
  // key by id (underscore)
  brandLookup[brand.id] = brand.id;
  // key by underscore version of slug (for markdown slugs with underscores)
  brandLookup[brand.slug.replace(/-/g, '_')] = brand.id;
}
console.log(`Loaded ${brandData.length} brands, ${Object.keys(brandLookup).length} lookup keys`);

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
console.log('\n=== Phase 1: Inserting new brands ===');

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

console.log(`Found ${newBrands.length} new brand candidates`);
let brandInsertCount = 0;
for (const brand of newBrands) {
  if (brandLookup[brand.slug]) {
    continue; // already exists
  }
  const catId = CATEGORY_MAP[brand.category] || 'general';
  const brandSlug = brand.slug.replace(/_/g, '-');
  const sql = `INSERT OR IGNORE INTO brands (id, name, slug, description, overall_sustainability_score) VALUES ('${brand.slug}', '${brand.name.replace(/'/g, "''")}', '${brandSlug}', '${brand.description.replace(/'/g, "''")}', ${brand.hss})`;
  execSql(sql, `brand: ${brand.name}`);
  brandInsertCount++;
}
console.log(`\nDone. Inserted ${brandInsertCount} new brands, skipped ${newBrands.length - brandInsertCount} existing`);

// ============================================================
// STEP 2: Parse products from the main section
// ============================================================
console.log('\n=== Phase 2: Parsing products ===');

interface Product {
  name: string;
  brandId: string;
  category: string;
  description: string;
  price: string;
  sustainability: string;
}

const products: Product[] = [];
let currentBrandId = '';
let currentSection = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  const sectionMatch = line.match(/^###\s+(.+?)(?:\s+Brands)?$/);
  if (sectionMatch) {
    const sectionName = sectionMatch[1].toLowerCase();
    if (sectionName.includes('fashion')) currentSection = 'fashion';
    else if (sectionName.includes('personal')) currentSection = 'personal_care';
    else if (sectionName.includes('household')) currentSection = 'household';
    else if (sectionName.includes('food')) currentSection = 'food';
  }

  if (line.includes('## Phase 2:')) break;

  // Parse brand header: #### BrandName (HSS: XX/100) [brand-slug]
  const brandMatch = line.match(/^####\s+.+?\s+\(HSS:\s*\d+\/100\)\s+\[([\w-]+)\]/);
  if (brandMatch) {
    const rawSlug = brandMatch[1];
    currentBrandId = brandLookup[rawSlug] || rawSlug;
    if (!brandLookup[rawSlug]) {
      console.log(`\n  ⚠ No brand found for slug "${rawSlug}" — using raw slug as ID`);
    }
    continue;
  }

  // Parse product: - **Product Name** — *Category*
  const productMatch = line.match(/^-\s+\*\*(.+?)\*\*\s+—\s+\*([^*]+)\*/);
  if (productMatch && currentBrandId) {
    const product: Product = {
      name: productMatch[1].trim(),
      brandId: currentBrandId,
      category: productMatch[2].trim().toLowerCase(),
      description: '',
      price: '',
      sustainability: '',
    };

    for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
      const nextLine = lines[j];
      if (nextLine.includes('**Description:**')) {
        product.description = nextLine.split('**Description:**')[1]?.trim() || '';
      } else if (nextLine.includes('**Est. Price:**')) {
        product.price = nextLine.split('**Est. Price:**')[1]?.trim() || '';
      } else if (nextLine.includes('**Sustainability:**')) {
        product.sustainability = nextLine.split('**Sustainability:**')[1]?.trim() || '';
      }
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
  const id = `prod_${product.brandId}_${productSlug}`;
  const catId = CATEGORY_MAP[product.category] || CATEGORY_MAP[currentSection] || 'general';

  const name = product.name.replace(/'/g, "''");
  const desc = (product.description || '').replace(/'/g, "''");
  const summary = (product.sustainability || '').replace(/'/g, "''");

  const sql = `INSERT OR IGNORE INTO products (id, brand_id, category_id, name, slug, description, sustainability_summary) VALUES ('${id}', '${product.brandId}', '${catId}', '${name}', '${productSlug}', '${desc}', '${summary}')`;
  
  try {
    const escaped = sql.replace(/'/g, "'\\''");
    execSync(`team-db '${escaped}'`, { stdio: 'pipe', timeout: 10000 });
    insertCount++;
    if (insertCount % 20 === 0) process.stdout.write(`${insertCount}/${products.length}\n`);
  } catch (e: any) {
    if (e.stderr?.includes('UNIQUE constraint')) {
      insertCount++;
    } else {
      errorCount++;
      console.error(`\nError inserting "${product.name}": ${e.stderr?.substring(0, 200) || e.message}`);
    }
  }
}

console.log(`\nDone! Inserted ${insertCount}/${products.length} products. Errors: ${errorCount}`);
