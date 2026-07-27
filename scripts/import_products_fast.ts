import { readFileSync } from 'fs';
import { execSync } from 'child_process';

const markdown = readFileSync('/home/team/shared/product_expansion_research.md', 'utf-8');
const lines = markdown.split('\n');
const brandData: { id: string; slug: string }[] = JSON.parse(readFileSync('/tmp/brands_lookup.json', 'utf-8'));
const existingProductIds: { id: string }[] = JSON.parse(readFileSync('/tmp/existing_products.json', 'utf-8'));

const existingSet = new Set(existingProductIds.map(r => r.id));
console.log(`Loaded ${brandData.length} brands, ${existingSet.size} existing products`);

// category_id in products must match categories.id (uses underscores, not hyphens)
const CATEGORY_MAP: Record<string, string> = {
  'fashion': 'fashion',
  'personal care': 'personal_care',
  'personal_care': 'personal_care',
  'household': 'household',
  'food': 'food',
};

// Build brand lookup
const brandLookup: Record<string, string> = {};
for (const brand of brandData) {
  brandLookup[brand.slug] = brand.id;
  brandLookup[brand.id] = brand.id;
  brandLookup[brand.slug.replace(/-/g, '_')] = brand.id;
}

function slugify(text: string): string {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/&/g, 'and');
}

// Parse products
interface Product {
  name: string;
  brandId: string;
  category: string;
  description: string;
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

  const brandMatch = line.match(/^####\s+.+?\s+\(HSS:\s*\d+\/100\)\s+\[([\w-]+)\]/);
  if (brandMatch) {
    currentBrandId = brandLookup[brandMatch[1]] || brandMatch[1];
    continue;
  }

  const productMatch = line.match(/^-\s+\*\*(.+?)\*\*\s+—\s+\*([^*]+)\*/);
  if (productMatch && currentBrandId) {
    const product: Product = {
      name: productMatch[1].trim(),
      brandId: currentBrandId,
      category: productMatch[2].trim().toLowerCase(),
      description: '',
      sustainability: '',
    };
    for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
      const nextLine = lines[j];
      if (nextLine.includes('**Description:**')) {
        product.description = nextLine.split('**Description:**')[1]?.trim() || '';
      } else if (nextLine.includes('**Sustainability:**')) {
        product.sustainability = nextLine.split('**Sustainability:**')[1]?.trim() || '';
      }
      if (nextLine.match(/^-\s+\*\*/) && nextLine !== line) break;
    }
    products.push(product);
  }
}

console.log(`Parsed ${products.length} products total`);

// Filter to new products only
const newProducts = products.filter(p => {
  const slug = slugify(p.name);
  const id = `prod_${p.brandId}_${slug}`;
  return !existingSet.has(id);
});

console.log(`${newProducts.length} new products to insert`);

if (newProducts.length === 0) {
  console.log('All products already exist!');
  process.exit(0);
}

// Build batch INSERT values
const allValues: string[] = [];
for (const product of newProducts) {
  const slug = slugify(product.name);
  const id = `prod_${product.brandId}_${slug}`;
  const catId = CATEGORY_MAP[product.category] || CATEGORY_MAP[currentSection] || 'general';
  
  const name = product.name.replace(/'/g, "''");
  const desc = (product.description || '').replace(/'/g, "''");
  const summary = (product.sustainability || '').replace(/'/g, "''");
  
  allValues.push(`('${id}','${product.brandId}','${catId}','${name}','${slug}','${desc}','${summary}')`);
}

// Insert in batches to avoid command line length limits
const BATCH = 100;
let inserted = 0;
for (let i = 0; i < allValues.length; i += BATCH) {
  const batch = allValues.slice(i, i + BATCH);
  const sql = `INSERT OR IGNORE INTO products (id,brand_id,category_id,name,slug,description,sustainability_summary) VALUES ${batch.join(',')}`;
  try {
    const escaped = sql.replace(/'/g, "'\\''");
    execSync(`team-db '${escaped}'`, { stdio: 'pipe', timeout: 120000 });
    inserted += batch.length;
    process.stdout.write(`${inserted}/${newProducts.length}\n`);
  } catch (e: any) {
    console.error(`\nBatch error at ${i}: ${(e.stderr || e.message || '').toString().substring(0, 300)}`);
    // Fall back to individual inserts for this batch
    for (const val of batch) {
      const singleSql = `INSERT OR IGNORE INTO products (id,brand_id,category_id,name,slug,description,sustainability_summary) VALUES ${val}`;
      try {
        const escaped = singleSql.replace(/'/g, "'\\''");
        execSync(`team-db '${escaped}'`, { stdio: 'pipe', timeout: 60000 });
        inserted++;
      } catch (e2: any) {
        if (!(e2.stderr || '').toString().includes('UNIQUE')) {
          console.error(`  Error in single insert: ${(e2.stderr || e2.message || '').toString().substring(0, 100)}`);
        }
      }
    }
  }
}

console.log(`\nDone! Inserted ${inserted}/${newProducts.length} products.`);
