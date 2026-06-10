import { createClient } from '@libsql/client';
import { AffiliateAdapter, AffiliateProduct } from './adapters/BaseAdapter';
import { MockAdapter } from './adapters/MockAdapter';
import { AmazonAdapter } from './adapters/AmazonAdapter';
import { AwinAdapter } from './adapters/AwinAdapter';

const url = process.env.TEAM_DB_URL;
const authToken = process.env.TEAM_DB_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error('TEAM_DB_URL and TEAM_DB_AUTH_TOKEN must be set');
}

const db = createClient({
  url,
  authToken,
});

function slugify(text: string) {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

async function syncVendorFeed(adapter: AffiliateAdapter) {
  const vendorName = adapter.vendorName;
  console.log(`Syncing feed for vendor: ${vendorName}...`);
  
  const items = await adapter.fetchProducts();
  
  const brandsRs = await db.execute('SELECT id, name FROM brands');
  const brands = brandsRs.rows;
  
  const categoriesRs = await db.execute('SELECT id, name FROM categories');
  const categories = categoriesRs.rows;

  for (const item of items) {
    // 1. Find or Match Brand
    const brand = brands.find(b => 
      b.name.toString().toLowerCase() === item.brand.toLowerCase() ||
      item.brand.toLowerCase().includes(b.name.toString().toLowerCase())
    );
    
    if (!brand) {
      console.log(`Skipping item ${item.name}: Brand "${item.brand}" not found in curated list.`);
      continue;
    }

    // 2. Find or Match Category
    let category = categories.find(c => 
      c.name.toString().toLowerCase() === item.category.toLowerCase()
    );
    
    if (!category) {
      category = categories.find(c => 
        item.category.toLowerCase().includes(c.name.toString().toLowerCase())
      );
    }
    
    if (!category) {
      if (item.category.toLowerCase().includes('shirt') || item.category.toLowerCase().includes('clothing')) {
        category = categories.find(c => c.id === 'fashion');
      } else if (item.category.toLowerCase().includes('soap') || item.category.toLowerCase().includes('care')) {
        category = categories.find(c => c.id === 'personal_care');
      } else if (item.category.toLowerCase().includes('cleaning')) {
        category = categories.find(c => c.id === 'household_cleaning_products');
      } else {
        category = categories.find(c => c.id === 'household');
      }
    }

    const productId = `p_${slugify(item.brand)}_${slugify(item.name)}`;
    const productSlug = slugify(`${item.brand} ${item.name}`);

    // 3. Upsert Product
    await db.execute({
      sql: `INSERT INTO products (id, brand_id, category_id, name, slug, description, image_url, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(slug) DO UPDATE SET 
              description = excluded.description,
              image_url = excluded.image_url,
              updated_at = CURRENT_TIMESTAMP`,
      args: [productId, brand.id, category?.id || 'household', item.name, productSlug, item.description, item.imageUrl]
    });

    // 4. Update Affiliate Link
    const linkId = `al_${vendorName.toLowerCase()}_${productId}`;
    await db.execute({
      sql: `INSERT INTO affiliate_links (id, product_id, vendor_name, affiliate_url, price, currency, last_fetched_at)
            VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(id) DO UPDATE SET
              price = excluded.price,
              last_fetched_at = CURRENT_TIMESTAMP`,
      args: [linkId, productId, vendorName, item.url, item.price, item.currency]
    });

    // 5. Record Price History
    await db.execute({
      sql: 'INSERT INTO price_history (affiliate_link_id, price) VALUES (?, ?)',
      args: [linkId, item.price]
    });
    
    console.log(`Processed ${item.name} (${item.brand}) - $${item.price}`);
  }
}

async function run() {
  const adapters: AffiliateAdapter[] = [
    new MockAdapter('EarthHero', [
      {
        sku: 'EH-PACT-01',
        brand: 'Pact Organic',
        name: 'Organic Cotton Crew Neck Tee',
        category: 'Clothing',
        price: 24.99,
        currency: 'USD',
        url: 'https://earthhero.com/pact-tee',
        imageUrl: 'https://images.earthhero.com/pact-tee.jpg',
        description: 'Soft, breathable organic cotton tee.'
      },
      {
        sku: 'EH-BRON-01',
        brand: "Dr. Bronner's",
        name: 'Pure-Castile Liquid Soap - Peppermint',
        category: 'Body Care',
        price: 15.99,
        currency: 'USD',
        url: 'https://earthhero.com/bronners-soap',
        imageUrl: 'https://images.earthhero.com/bronners-soap.jpg',
        description: 'Iconic multi-use liquid soap.'
      },
      {
        sku: 'EH-MELI-01',
        brand: 'Meliora',
        name: 'Eco-Friendly Laundry Powder',
        category: 'Cleaning',
        price: 18.50,
        currency: 'USD',
        url: 'https://earthhero.com/meliora-laundry',
        imageUrl: 'https://images.earthhero.com/meliora-laundry.jpg',
        description: 'People and planet friendly laundry detergent.'
      }
    ]),
    new MockAdapter('Amazon', [
      {
        sku: 'AMZ-PATA-01',
        brand: 'Patagonia',
        name: "Torrentshell 3L Men's Jacket",
        category: 'Outdoor Apparel',
        price: 149.00,
        currency: 'USD',
        url: 'https://amazon.com/patagonia-torrentshell',
        imageUrl: 'https://m.media-amazon.com/images/patagonia.jpg',
        description: 'Reliable rain protection.'
      },
      {
        sku: 'AMZ-BRON-01',
        brand: "Dr. Bronner's",
        name: 'Pure-Castile Liquid Soap - Peppermint',
        category: 'Health & Household',
        price: 16.49,
        currency: 'USD',
        url: 'https://amazon.com/bronners-soap',
        imageUrl: 'https://m.media-amazon.com/images/bronners.jpg',
        description: 'Peppermint liquid soap.'
      },
      {
        sku: 'AMZ-SEV-01',
        brand: 'Seventh Generation',
        name: 'Dish Liquid Free & Clear',
        category: 'Dish Soap',
        price: 4.99,
        currency: 'USD',
        url: 'https://amazon.com/seventh-gen-dish',
        imageUrl: 'https://m.media-amazon.com/images/seventh.jpg',
        description: 'Plant-based dish soap.'
      }
    ]),
    // Shell adapters for future use
    new AmazonAdapter({ accessKey: 'MOCK', secretKey: 'MOCK', tag: 'MOCK' }),
    new AwinAdapter('MOCK', 'MOCK')
  ];

  for (const adapter of adapters) {
    try {
      await syncVendorFeed(adapter);
    } catch (error) {
      console.error(`Failed to sync ${adapter.vendorName}:`, error);
    }
  }

  console.log('All feeds synced.');
  process.exit(0);
}

run().catch(console.error);
