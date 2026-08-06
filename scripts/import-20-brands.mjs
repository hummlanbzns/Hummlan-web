#!/usr/bin/env node
/**
 * import-20-brands.mjs — Import 20 new HSS-rated brands + categories + products
 *
 * Reads from brand-expansion-proposal.md and inserts all data into the
 * shared Turso DB via @libsql/client.
 *
 * Usage: node scripts/import-20-brands.mjs
 * Requires: TEAM_DB_URL & TEAM_DB_AUTH_TOKEN in env.
 */

import { createClient } from '@libsql/client';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_URL = process.env.TEAM_DB_URL;
const DB_TOKEN = process.env.TEAM_DB_AUTH_TOKEN;

if (!DB_URL || !DB_TOKEN) {
  console.error('ERROR: TEAM_DB_URL and TEAM_DB_AUTH_TOKEN must be set');
  process.exit(1);
}

const db = createClient({ url: DB_URL, authToken: DB_TOKEN });
const now = new Date().toISOString();

// ── Helper ──────────────────────────────────────────────────────────────────
let logLines = [];

function log(msg) {
  console.log(msg);
  logLines.push(msg);
}

async function q(sql, args = []) {
  try {
    const rs = await db.execute({ sql, args });
    return rs.rows;
  } catch (err) {
    // Ignore duplicate key errors on re-runs
    if (err.message && err.message.includes('UNIQUE constraint')) {
      return [];
    }
    throw err;
  }
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ── Category definitions ────────────────────────────────────────────────────
const NEW_CATEGORIES = [
  // Top-level technology category
  { id: 'technology', name: 'Technology', slug: 'technology', parent_id: null, description: 'Technology and electronics' },
  // Technology subcategories
  { id: 'technology_refurbished_electronics', name: 'Refurbished Electronics', slug: 'technology-refurbished-electronics', parent_id: 'technology', description: 'Refurbished phones, laptops, and electronics' },
  { id: 'technology_eco_accessories', name: 'Eco Accessories', slug: 'technology-eco-accessories', parent_id: 'technology', description: 'Eco-friendly phone cases, cables, and accessories' },
  // Fashion subcategories
  { id: 'fashion_sustainable_footwear', name: 'Sustainable Footwear', slug: 'fashion-sustainable-footwear', parent_id: 'fashion', description: 'Sustainable and ethical footwear' },
  { id: 'fashion_accessories', name: 'Accessories', slug: 'fashion-accessories', parent_id: 'fashion', description: 'Bags, accessories, and more' },
  // Household subcategories
  { id: 'household_reusable_drinkware', name: 'Reusable Drinkware', slug: 'household-reusable-drinkware', parent_id: 'household', description: 'Reusable bottles, cups, and drinkware' },
  { id: 'household_food_storage', name: 'Food Storage', slug: 'household-food-storage', parent_id: 'household', description: 'Plastic-free food storage solutions' },
  { id: 'household_bathroom', name: 'Bathroom', slug: 'household-bathroom', parent_id: 'household', description: 'Bathroom essentials including toilet paper' },
  // Personal Care subcategories
  { id: 'personal_care_oral_care', name: 'Oral Care', slug: 'personal-care-oral-care', parent_id: 'personal_care', description: 'Natural oral care products' },
  { id: 'personal_care_feminine_care', name: 'Feminine Care', slug: 'personal-care-feminine-care', parent_id: 'personal_care', description: 'Organic feminine care products' },
];

// ── Brand definitions ───────────────────────────────────────────────────────
const BRANDS = [
  // TIER 1 — HIGH PRIORITY
  {
    id: 'allbirds', name: 'Allbirds', slug: 'allbirds',
    website_url: 'https://www.allbirds.com',
    category_id: 'fashion_sustainable_footwear',
    overall_score: 78,
    description: 'Allbirds leads on carbon footprint transparency and natural materials (merino wool, TENCEL, sugarcane EVA). However, their "carbon neutral" claims rely heavily on offsets rather than absolute emission reductions, and the price point (£95-135 per shoe) puts them above many competitors. Strong B Corp credentials (82 score) and FSC-certified packaging are genuine positives. Known downside: the wool shoes have durability concerns reported by users, and the shift into synthetic materials (Tree Dasher) muddies their natural-fibre positioning.',
    awin_id: 18738,
    awin_region: 'GB',
    pillars: { Climate: 90, Materials: 85, 'Social/Labor': 78, Transparency: 80, 'Price/Accessibility': 55 },
    certifications: ['B Corp', 'FSC', 'Climate Neutral'],
    tier: 1,
  },
  {
    id: 'boody', name: 'Boody', slug: 'boody',
    website_url: 'https://boody.com',
    category_id: 'fashion_basics_underwear',
    overall_score: 78,
    description: 'Boody makes bamboo viscose underwear and basics that are genuinely soft and well-priced (comparable to major high-street brands). They hold OEKO-TEX Standard 100 and FSC certifications for their bamboo sourcing. However, "bamboo" fabric is actually viscose/rayon processed with chemicals — they\'re transparent about this but the marketing can mislead casual shoppers. No B Corp certification yet. Excellent value-for-sustainability ratio.',
    awin_id: 21022,
    awin_region: 'GB',
    pillars: { Climate: 75, Materials: 85, 'Social/Labor': 80, Transparency: 70, 'Price/Accessibility': 80 },
    certifications: ['OEKO-TEX Standard 100', 'FSC'],
    tier: 1,
  },
  {
    id: 'georganics', name: 'Georganics', slug: 'georganics',
    website_url: 'https://georganics.com',
    category_id: 'personal_care_oral_care',
    overall_score: 80,
    description: 'UK-based plastic-free oral care brand doing it right — glass jars, refillable tooth tabs, compostable silk floss. Genuinely zero-waste packaging (no greenwashing there). Vegan Society and Leaping Bunny certified. The downside: tooth tabs are more expensive per-brush than conventional toothpaste and some users report the texture takes getting used to. Strong local brand with Awin access.',
    awin_id: 23054,
    awin_region: 'GB',
    pillars: { Climate: 82, Materials: 88, 'Social/Labor': 75, Transparency: 85, 'Price/Accessibility': 70 },
    certifications: ['Vegan Society', 'Leaping Bunny', 'Plastic-Free Trustmark'],
    tier: 1,
  },
  {
    id: 'back-market', name: 'Back Market', slug: 'back-market',
    website_url: 'https://www.backmarket.com',
    category_id: 'technology_refurbished_electronics',
    overall_score: 82,
    description: 'Back Market is the leading refurbished electronics marketplace (phones, laptops, tablets). The climate impact case is undeniable — extending device lifespans is the single biggest consumer action for reducing e-waste. B Corp certified (2019) and transparent about their refurbisher vetting process. The "stern" side: not all refurbishers on the platform meet the same quality bar, warranty coverage varies by seller, and they take a commission that can make prices higher than direct-from-refurbisher.',
    awin_id: 25205,
    awin_region: 'GB',
    pillars: { Climate: 90, Materials: 85, 'Social/Labor': 70, Transparency: 75, 'Price/Accessibility': 90 },
    certifications: ['B Corp'],
    tier: 1,
  },
  {
    id: 'smol', name: 'Smol', slug: 'smol',
    website_url: 'https://smol.co.uk',
    category_id: 'household_laundry_dish',
    overall_score: 83,
    description: 'UK direct-to-consumer cleaning brand that does concentrated laundry capsules and dishwasher tablets in plastic-free cardboard packaging. Genuinely cheaper than big brands on a per-wash basis. Carbon neutral certified and transparent about ingredients (no phosphates, chlorine, microplastics). The "stern" part: some products still use synthetic ingredients (no COSMOS or Ecolabel yet), and the subscription model can be inconvenient for occasional users.',
    awin_id: null,
    awin_region: null,
    pillars: { Climate: 80, Materials: 82, 'Social/Labor': 78, Transparency: 85, 'Price/Accessibility': 88 },
    certifications: ['Carbon Neutral Certified', 'Plastic-Free Trustmark'],
    tier: 1,
  },

  // TIER 2 — MEDIUM PRIORITY
  {
    id: 'who-gives-a-crap', name: 'Who Gives A Crap', slug: 'who-gives-a-crap',
    website_url: 'https://whogivesacrap.org',
    category_id: 'household_bathroom',
    overall_score: 84,
    description: 'The poster child for sustainable toilet paper — 100% recycled bamboo/toilet paper in plastic-free wrapping. B Corp, 1% for the Planet, and donates 50% of profits to sanitation projects. The product genuinely works well (not the thin recycled paper of old). The cost is higher than conventional TP, and the bulk boxes require storage space. GOTS-certified bamboo would be stronger than "recycled" claims for some eco-conscious buyers.',
    awin_id: 66840,
    awin_region: 'AU',
    pillars: { Climate: 88, Materials: 90, 'Social/Labor': 85, Transparency: 82, 'Price/Accessibility': 75 },
    certifications: ['B Corp', '1% for the Planet', 'FSC', 'Climate Neutral'],
    tier: 2,
  },
  {
    id: 'klean-kanteen', name: 'Klean Kanteen', slug: 'klean-kanteen',
    website_url: 'https://kleankanteen.com',
    category_id: 'household_reusable_drinkware',
    overall_score: 77,
    description: 'OG of stainless steel water bottles — made from 90% post-consumer recycled stainless steel, B Corp, Climate Neutral, 1% for the Planet. Wide mouth compatibility, lifetime warranty. The downsides: expensive ($30-45 per bottle), heavy compared to plastic, and the "avocado green" aesthetic is polarising. Also, the market is very saturated (Hydro Flask, S\'well, etc. — but KK is the most sustainable).',
    awin_id: null,
    awin_region: null,
    pillars: { Climate: 75, Materials: 85, 'Social/Labor': 78, Transparency: 80, 'Price/Accessibility': 65 },
    certifications: ['B Corp', 'Climate Neutral', '1% for the Planet'],
    tier: 2,
  },
  {
    id: 'stasher', name: 'Stasher', slug: 'stasher',
    website_url: 'https://stasher.com',
    category_id: 'household_food_storage',
    overall_score: 73,
    description: 'Platinum silicone reusable bags — the most popular alternative to single-use Ziploc bags. B Corp, plastic-free, PFAS-free, dishwasher/microwave/oven safe. Made in China (the silicone supply chain is hard to localise). The real downside is price: $13-25 per bag makes the upfront cost high compared to a box of Ziplocs. However, they last for years.',
    awin_id: null,
    awin_region: null,
    pillars: { Climate: 72, Materials: 78, 'Social/Labor': 75, Transparency: 80, 'Price/Accessibility': 60 },
    certifications: ['B Corp', 'Plastic-Free Trustmark', 'PFAS-free'],
    tier: 2,
  },
  {
    id: 'pela', name: 'Pela', slug: 'pela',
    website_url: 'https://pela.earth',
    category_id: 'technology_eco_accessories',
    overall_score: 77,
    description: 'Maker of the world\'s first compostable phone case (made from flax straw and bioplastic). B Corp, Climate Neutral, 1% for the Planet. Also makes compostable AirPod cases, watch bands, and sunglasses. The "stern" truth: the cases are compostable only in industrial facilities, not home compost bins, and the bioplastic still requires specific conditions to break down. Cases are thicker than standard, and the material yellows over time.',
    awin_id: 74962,
    awin_region: 'US',
    pillars: { Climate: 78, Materials: 85, 'Social/Labor': 75, Transparency: 80, 'Price/Accessibility': 65 },
    certifications: ['B Corp', 'Climate Neutral', '1% for the Planet'],
    tier: 2,
  },
  {
    id: 'imperfect-foods', name: 'Imperfect Foods', slug: 'imperfect-foods',
    website_url: 'https://imperfectfoods.com',
    category_id: 'food_online_grocery',
    overall_score: 80,
    description: 'US-based produce delivery service that rescues "ugly" fruits and vegetables that would otherwise go to waste. B Corp, saves millions of pounds of food annually. Carbon-neutral delivery. The downsides: limited geographic availability (US only), you don\'t get to choose exact items in your box (curated by what\'s surplus), and some customers report quality inconsistency.',
    awin_id: null,
    awin_region: null,
    pillars: { Climate: 85, Materials: 75, 'Social/Labor': 78, Transparency: 82, 'Price/Accessibility': 80 },
    certifications: ['B Corp'],
    tier: 2,
  },

  // TIER 3 — FILLING CATEGORY GAPS
  {
    id: 'veja', name: 'Veja', slug: 'veja',
    website_url: 'https://veja-store.com',
    category_id: 'fashion_sustainable_footwear',
    overall_score: 77,
    description: 'French sneaker brand using wild Amazonian rubber, organic cotton, and recycled plastic bottles. Genuinely transparent supply chain — they publish factory lists and pay fair wages. No marketing budget (relies on word of mouth/influencers). The "but": the shoes are expensive (£95-150), some styles have limited cushioning, and the wild rubber supply chain is harder to scale. Still, the most credible sustainable sneaker brand on the market.',
    awin_id: null,
    awin_region: null,
    pillars: { Climate: 72, Materials: 85, 'Social/Labor': 90, Transparency: 85, 'Price/Accessibility': 55 },
    certifications: [],
    tier: 3,
  },
  {
    id: 'native-deodorant', name: 'Native Deodorant', slug: 'native-deodorant',
    website_url: 'https://nativecos.com',
    category_id: 'personal_care_deodorant',
    overall_score: 69,
    description: 'Popular natural deodorant brand owned by P&G — which immediately raises greenwashing questions. The formulas are genuinely aluminium-free, paraben-free, and baking-soda-free (good for sensitive skin). Wide range of scents, subscription model. The P&G ownership (since 2017) means supply chain transparency is limited compared to independent brands. A useful "accessible natural" brand for comparison content.',
    awin_id: null,
    awin_region: null,
    pillars: { Climate: 62, Materials: 70, 'Social/Labor': 68, Transparency: 65, 'Price/Accessibility': 78 },
    certifications: ['Leaping Bunny'],
    tier: 3,
  },
  {
    id: 'burts-bees', name: "Burt's Bees", slug: 'burts-bees',
    website_url: 'https://burtsbees.com',
    category_id: 'personal_care_beauty_skincare',
    overall_score: 70,
    description: 'The OG natural personal care brand — accessible, affordable, and widely available. Leaping Bunny certified, uses recycled packaging where possible, and sources beeswax responsibly. Owned by Clorox since 2007, which dilutes the "natural" positioning. Great price point for affordability-focused content.',
    awin_id: null,
    awin_region: null,
    pillars: { Climate: 60, Materials: 72, 'Social/Labor': 68, Transparency: 65, 'Price/Accessibility': 85 },
    certifications: ['Leaping Bunny'],
    tier: 3,
  },
  {
    id: 'upcircle-beauty', name: 'UpCircle Beauty', slug: 'upcircle-beauty',
    website_url: 'https://upcirclebeauty.com',
    category_id: 'personal_care_beauty_skincare',
    overall_score: 81,
    description: 'UK brand using repurposed ingredients from other industries (coffee grounds from cafes, fruit stones from juice factories). Vegan, cruelty-free, plastic-free/refillable packaging. B Corp certified. The downsides: relatively small product range, higher price point than mainstream, and some products have shorter shelf life due to the upcycled natural ingredients.',
    awin_id: null,
    awin_region: null,
    pillars: { Climate: 85, Materials: 88, 'Social/Labor': 80, Transparency: 82, 'Price/Accessibility': 72 },
    certifications: ['B Corp', 'Vegan Society', 'Leaping Bunny'],
    tier: 3,
  },
  {
    id: 'ecover', name: 'Ecover', slug: 'ecover',
    website_url: 'https://ecover.com',
    category_id: 'household_laundry_dish',
    overall_score: 73,
    description: 'Pioneering eco-cleaning brand (founded 1980) with plant-based formulas and the iconic blue plastic bottles made from 100% recycled ocean plastic. Cradle to Cradle certified. Owned by SC Johnson since 2018, which raises the usual corporate concerns. Their formulas are genuinely effective and widely available in supermarkets. Affordable and accessible — good for mass-market eco content.',
    awin_id: null,
    awin_region: null,
    pillars: { Climate: 72, Materials: 75, 'Social/Labor': 70, Transparency: 68, 'Price/Accessibility': 80 },
    certifications: ['Cradle to Cradle', 'Leaping Bunny', 'Vegan'],
    tier: 3,
  },
  {
    id: 'organyc', name: 'Organyc', slug: 'organyc',
    website_url: 'https://organyc.net',
    category_id: 'personal_care_feminine_care',
    overall_score: 77,
    description: 'Certified organic cotton feminine care (pads, liners, tampons) — 100% organic cotton, chlorine-free, no fragrances/dyes. One of the more affordable organic period care brands. Cradle to Cradle Gold certified, plastic-free packaging. The downside: availability varies by country, and some users report the pads are bulkier than mainstream brands.',
    awin_id: null,
    awin_region: null,
    pillars: { Climate: 75, Materials: 85, 'Social/Labor': 78, Transparency: 72, 'Price/Accessibility': 75 },
    certifications: ['ICEA Organic', 'Cradle to Cradle Gold', 'Vegan'],
    tier: 3,
  },
  {
    id: 'freitag', name: 'FREITAG', slug: 'freitag',
    website_url: 'https://freitag.ch',
    category_id: 'fashion_accessories',
    overall_score: 74,
    description: 'Bags made from recycled truck tarpaulins, seat belts, and bicycle inner tubes. Every product is unique (no two are identical). Swiss design, built to last a lifetime. Fully transparent about their material sourcing and manufacturing (in-house in Zurich). The elephant in the room: prices start at CHF 190 for a small bag, making them inaccessible to most shoppers. Still, an icon of circular design.',
    awin_id: 116249,
    awin_region: 'DE',
    pillars: { Climate: 78, Materials: 85, 'Social/Labor': 80, Transparency: 88, 'Price/Accessibility': 40 },
    certifications: [],
    tier: 3,
  },
  {
    id: 'method', name: 'Method', slug: 'method',
    website_url: 'https://methodproducts.com',
    category_id: 'household_cleaning_products',
    overall_score: 69,
    description: 'The "designer" eco-cleaning brand — beautiful bottles, genuinely effective plant-based formulas. Leaping Bunny certified, Cradle to Cradle formulations, on the EWG Verified list. Owned by SC Johnson (same issue as Ecover). The plastic bottles look good but some are single-use (not refillable). Widely available, affordable, and a gateway brand for people new to eco-cleaning.',
    awin_id: null,
    awin_region: null,
    pillars: { Climate: 65, Materials: 70, 'Social/Labor': 68, Transparency: 62, 'Price/Accessibility': 82 },
    certifications: ['Leaping Bunny', 'Cradle to Cradle', 'EWG Verified'],
    tier: 3,
  },
  {
    id: 'frank-green', name: 'Frank Green', slug: 'frank-green',
    website_url: 'https://frankgreen.com',
    category_id: 'household_reusable_drinkware',
    overall_score: 70,
    description: 'Australian brand making reusable coffee cups and water bottles with a patented one-touch lid mechanism. Ceramic-lined stainless steel, dishwasher safe. The design is genuinely functional and the cups have strong brand recognition. The downsides: expensive (£25-35 for a cup), the ceramic lining can chip over time, and the market is saturated. Good for "best reusable coffee cup" roundups.',
    awin_id: null,
    awin_region: null,
    pillars: { Climate: 70, Materials: 78, 'Social/Labor': 72, Transparency: 72, 'Price/Accessibility': 60 },
    certifications: [],
    tier: 3,
  },
  {
    id: 'abeego', name: 'Abeego', slug: 'abeego',
    website_url: 'https://abeego.com',
    category_id: 'household_food_storage',
    overall_score: 81,
    description: 'The original beeswax food wrap — made from GOTS-certified organic cotton, beeswax, jojoba oil, and tree resin. Plastic-free, compostable, reusable for up to a year. B Corp certified, 1% for the Planet. The downsides: not vegan (uses beeswax), lifespan depends on proper care (don\'t use with raw meat or heat), and they\'re pricier than a roll of cling film. But they genuinely work and last.',
    awin_id: null,
    awin_region: null,
    pillars: { Climate: 82, Materials: 88, 'Social/Labor': 80, Transparency: 78, 'Price/Accessibility': 78 },
    certifications: ['B Corp', '1% for the Planet', 'GOTS-certified cotton'],
    tier: 3,
  },
];

// ── Product definitions (Tier 1: 2-4 each, Tier 2/3: 1-2 each) ──────────────
const PRODUCTS = [
  // Allbirds (4 products)
  { id: 'allbirds_wool-runners', brand_id: 'allbirds', name: 'Wool Runners', slug: 'allbirds-wool-runners', category_id: 'fashion_sustainable_footwear', description: 'The iconic merino wool sneaker — lightweight, breathable, and machine washable. Made from ZQ-certified merino wool with a SweetFoam midsole (sugarcane-based).' },
  { id: 'allbirds_tree-runners', brand_id: 'allbirds', name: 'Tree Runners', slug: 'allbirds-tree-runners', category_id: 'fashion_sustainable_footwear', description: 'Lightweight sneaker made from TENCEL Lyocell (eucalyptus tree fibre). Great for warmer weather. Same SweetFoam sole, machine washable.' },
  { id: 'allbirds_tree-breezers', brand_id: 'allbirds', name: 'Tree Breezers', slug: 'allbirds-tree-breezers', category_id: 'fashion_sustainable_footwear', description: 'Sustainable ballet flat made from TENCEL Lyocell with a performance insole and elastic heel grip. A stylish eco-friendly workwear option.' },
  { id: 'allbirds_wool-dasher-mizzles', brand_id: 'allbirds', name: 'Wool Dasher Mizzles', slug: 'allbirds-wool-dasher-mizzles', category_id: 'fashion_sustainable_footwear', description: 'Weather-resistant running/training shoe with Merino wool upper and Puddle Guard water-repellent treatment. For wet-weather workouts.' },

  // Boody (3 products)
  { id: 'boody_shaper-camisole', brand_id: 'boody', name: 'Shaper Camisole', slug: 'boody-shaper-camisole', category_id: 'fashion_basics_underwear', description: 'Smooth-fitting bamboo viscose camisole with built-in shelf bra. OEKO-TEX certified, FSC bamboo. Seamless and tagless for comfort.' },
  { id: 'boody_bamboo-hipster', brand_id: 'boody', name: 'Bamboo Hipster', slug: 'boody-bamboo-hipster', category_id: 'fashion_basics_underwear', description: 'Everyday bamboo viscose hipster underwear. Soft, breathable, and moisture-wicking. Pack of 3 available. OEKO-TEX Standard 100 certified.' },
  { id: 'boody_bamboo-classic-sock', brand_id: 'boody', name: 'Bamboo Classic Sock 3-Pack', slug: 'boody-bamboo-classic-sock', category_id: 'fashion_basics_underwear', description: 'Soft bamboo viscose socks with reinforced heel and toe. Naturally antibacterial and moisture-wicking. FSC-certified bamboo packaging.' },

  // Georganics (3 products)
  { id: 'georganics_toothpowder', brand_id: 'georganics', name: 'Natural Toothpowder - Spearmint', slug: 'georganics-toothpowder-spearmint', category_id: 'personal_care_oral_care', description: 'Zero-waste toothpowder in a glass jar. Made with calcium carbonate, baking soda, and essential oils. Plastic-free, vegan, and cruelty-free.' },
  { id: 'georganics_toothpaste-tablets', brand_id: 'georganics', name: 'Toothpaste Tablets - Fluoride Free', slug: 'georganics-toothpaste-tablets', category_id: 'personal_care_oral_care', description: 'Plastic-free toothpaste tablets in a refillable glass jar. Zero waste, vegan, and made with natural ingredients. Just chew and brush.' },
  { id: 'georganics_silk-dental-floss', brand_id: 'georganics', name: 'Natural Silk Dental Floss', slug: 'georganics-silk-dental-floss', category_id: 'personal_care_oral_care', description: 'Compostable silk dental floss in a reusable glass dispenser. Coated with natural Candelilla wax. Plastic-free and zero waste.' },

  // Back Market (3 products — generic marketplace, no specific SKUs to list)
  { id: 'backmarket_iphone-14-pro', brand_id: 'back-market', name: 'iPhone 14 Pro (Refurbished)', slug: 'backmarket-iphone-14-pro', category_id: 'technology_refurbished_electronics', description: 'Grade A refurbished iPhone 14 Pro from Back Market. Professionally tested, 1-year warranty, up to 30% cheaper than new.' },
  { id: 'backmarket_macbook-air-m2', brand_id: 'back-market', name: 'MacBook Air M2 (Refurbished)', slug: 'backmarket-macbook-air-m2', category_id: 'technology_refurbished_electronics', description: 'Refurbished MacBook Air with M2 chip. Battery health 90%+ guaranteed. 1-year warranty included. Grade A condition.' },
  { id: 'backmarket_samsung-galaxy-s23', brand_id: 'back-market', name: 'Samsung Galaxy S23 (Refurbished)', slug: 'backmarket-samsung-galaxy-s23', category_id: 'technology_refurbished_electronics', description: 'Grade A refurbished Samsung Galaxy S23. Professionally restored, 1-year warranty, 30-day money-back guarantee.' },

  // Smol (2 products)
  { id: 'smol_laundry-capsules', brand_id: 'smol', name: 'Concentrated Laundry Capsules (55 pack)', slug: 'smol-laundry-capsules', category_id: 'household_laundry_dish', description: 'Ultra-concentrated plant-based laundry capsules in plastic-free cardboard packaging. 55 washes per box. Hypoallergenic, no phosphates or chlorine.' },
  { id: 'smol_dishwasher-tablets', brand_id: 'smol', name: 'Dishwasher Tablets (60 pack)', slug: 'smol-dishwasher-tablets', category_id: 'household_laundry_dish', description: 'Plastic-free dishwasher tablets in compostable packaging. Plant-based formula, no microplastics. 60 tablets per box.' },

  // Who Gives A Crap (1 product)
  { id: 'wgac_toilet-paper-48', brand_id: 'who-gives-a-crap', name: '100% Recycled Toilet Paper (48 Rolls)', slug: 'wgac-toilet-paper-48', category_id: 'household_bathroom', description: 'Premium 100% recycled bamboo toilet paper. Plastic-free wrapping, 3-ply strength. 48 mega rolls = 192 regular rolls. B Corp certified.' },

  // Klean Kanteen (2 products)
  { id: 'kk_classic-20oz', brand_id: 'klean-kanteen', name: 'Classic 20oz Stainless Steel Water Bottle', slug: 'klean-kanteen-classic-20oz', category_id: 'household_reusable_drinkware', description: 'Iconic 20oz stainless steel water bottle made from 90% post-consumer recycled steel. BPA-free, wide mouth, leak-proof cap. Lifetime warranty.' },
  { id: 'kk_tkwide-32oz', brand_id: 'klean-kanteen', name: 'TKWide 32oz Insulated Water Bottle', slug: 'klean-kanteen-tkwide-32oz', category_id: 'household_reusable_drinkware', description: 'Double-wall vacuum insulated 32oz bottle. Keeps drinks cold for 24 hours. Made from 90% post-consumer recycled stainless steel.' },

  // Stasher (1 product)
  { id: 'stasher_sandwich-bag', brand_id: 'stasher', name: 'Reusable Silicone Sandwich Bag', slug: 'stasher-sandwich-bag', category_id: 'household_food_storage', description: 'Platinum silicone reusable sandwich bag. BPA-free, PFAS-free, dishwasher/microwave/oven safe. Replaces hundreds of single-use plastic bags.' },

  // Pela (2 products)
  { id: 'pela_iphone-15-case', brand_id: 'pela', name: 'Compostable iPhone 15 Case', slug: 'pela-iphone-15-case', category_id: 'technology_eco_accessories', description: 'World\'s first compostable phone case made from flax straw and bioplastic. 100% compostable (industrial facility). 6ft drop protection.' },
  { id: 'pela_airpods-pro-case', brand_id: 'pela', name: 'Compostable AirPods Pro Case', slug: 'pela-airpods-pro-case', category_id: 'technology_eco_accessories', description: 'Compostable AirPods Pro case cover made from flax straw. Drop protection, full access to charging port. Compostable at end of life.' },

  // Imperfect Foods (1 product — service, not specific SKU)
  { id: 'imperfect_produce-box', brand_id: 'imperfect-foods', name: 'Seasonal Produce Box (Medium)', slug: 'imperfect-produce-box', category_id: 'food_online_grocery', description: 'Mixed seasonal rescued produce box — 8-10 lbs of fruits and vegetables saved from food waste. Curated based on surplus. Carbon neutral delivery.' },

  // Veja (2 products)
  { id: 'veja_v-10', brand_id: 'veja', name: 'V-10 Leather Sneakers', slug: 'veja-v-10', category_id: 'fashion_sustainable_footwear', description: 'Iconic V-10 sneaker made from wild Amazonian rubber, organic cotton canvas, and leather from tanneries with gold-rated environmental certifications.' },
  { id: 'veja_campo', brand_id: 'veja', name: 'Campo Leather Trainers', slug: 'veja-campo', category_id: 'fashion_sustainable_footwear', description: 'Minimalist Campo trainer with wild rubber sole and organic cotton lining. Chrome-free leather from environmentally certified tanneries.' },

  // Native Deodorant (1 product)
  { id: 'native_cucumber-mint', brand_id: 'native-deodorant', name: 'Cucumber & Mint Deodorant Stick', slug: 'native-cucumber-mint', category_id: 'personal_care_deodorant', description: 'Aluminum-free, baking-soda-free natural deodorant. Cucumber and mint scent. Leaping Bunny certified, paraben-free. 72-hour odour protection.' },

  // Burt's Bees (1 product)
  { id: 'burts-bees_lip-balm', brand_id: 'burts-bees', name: 'Original Beeswax Lip Balm (4-Pack)', slug: 'burts-bees-original-lip-balm', category_id: 'personal_care_beauty_skincare', description: 'The classic 100% natural beeswax lip balm. Moisturizes with beeswax, vitamin E, and peppermint oil. No parabens, phthalates, or petrolatum.' },

  // UpCircle Beauty (1 product)
  { id: 'upcircle_coffee-scrub', brand_id: 'upcircle-beauty', name: 'Coffee Face Scrub (100ml)', slug: 'upcircle-coffee-face-scrub', category_id: 'personal_care_beauty_skincare', description: 'Upcycled arabica coffee grounds face scrub. Made with repurposed coffee from UK cafes. Gently exfoliates, 100% natural, plastic-free glass jar.' },

  // Ecover (1 product)
  { id: 'ecover_zero-laundry', brand_id: 'ecover', name: 'Zero Laundry Liquid (1.5L)', slug: 'ecover-zero-laundry-liquid', category_id: 'household_laundry_dish', description: 'Plant-based laundry liquid in 100% recycled ocean plastic bottle. Fragrance and dye free. Cradle to Cradle certified. Effective on all fabrics.' },

  // Organyc (1 product)
  { id: 'organyc_organic-pads', brand_id: 'organyc', name: '100% Organic Cotton Pads (Regular)', slug: 'organyc-organic-cotton-pads', category_id: 'personal_care_feminine_care', description: '100% organic cotton pads with plastic-free packaging. Hypoallergenic, chlorine-free, and fragrance-free. Cradle to Cradle Gold certified.' },

  // Freitag (1 product)
  { id: 'freitag_f202', brand_id: 'freitag', name: 'F202 LARSEN Top Bag', slug: 'freitag-f202', category_id: 'fashion_accessories', description: 'Urban top bag made from recycled truck tarpaulin. Unique design, waterproof, with seatbelt shoulder strap. Made in Zurich, Switzerland.' },

  // Method (1 product)
  { id: 'method_all-purpose-cleaner', brand_id: 'method', name: 'All-Purpose Cleaner - Pink Grapefruit (828ml)', slug: 'method-all-purpose-pink-grapefruit', category_id: 'household_cleaning_products', description: 'Plant-based all-purpose spray cleaner. Biodegradable formula, Leaping Bunny certified. Bottle made from 100% recycled ocean plastic.' },

  // Frank Green (1 product)
  { id: 'frank-green_12oz-cup', brand_id: 'frank-green', name: '12oz Reusable Coffee Cup', slug: 'frank-green-12oz-coffee-cup', category_id: 'household_reusable_drinkware', description: 'Ceramic-lined reusable coffee cup with patented one-touch lid. Stainless steel body, dishwasher safe. Keeps drinks hot for 2 hours.' },

  // Abeego (1 product)
  { id: 'abeego_3pack-wraps', brand_id: 'abeego', name: 'Beeswax Food Wraps (3-Pack)', slug: 'abeego-beeswax-food-wraps-3pack', category_id: 'household_food_storage', description: 'Original beeswax food wraps — assorted sizes. GOTS-certified organic cotton, beeswax, jojoba oil. Reusable for up to 1 year. Compostable.' },
];

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  log('=== Import 20 New HSS-Rated Brands ===\n');

  // 1. Add new categories
  log('[1/5] Adding new categories...');
  let catsAdded = 0;
  for (const cat of NEW_CATEGORIES) {
    const exists = await q('SELECT id FROM categories WHERE id = ?', [cat.id]);
    if (exists.length === 0) {
      await q(
        'INSERT INTO categories (id, name, slug, parent_id, description) VALUES (?, ?, ?, ?, ?)',
        [cat.id, cat.name, cat.slug, cat.parent_id, cat.description]
      );
      catsAdded++;
      log(`  + ${cat.id} (${cat.name})`);
    } else {
      log(`  . ${cat.id} (already exists)`);
    }
  }
  log(`  → ${catsAdded} categories created\n`);

  // 2. Add certifications
  log('[2/5] Adding certifications...');
  const allCertNames = new Set();
  for (const brand of BRANDS) {
    for (const cert of brand.certifications) {
      allCertNames.add(cert);
    }
  }
  let certsAdded = 0;
  for (const certName of allCertNames) {
    const certId = slugify(certName);
    const exists = await q('SELECT id FROM certifications WHERE id = ?', [certId]);
    if (exists.length === 0) {
      await q(
        'INSERT INTO certifications (id, name, slug, description) VALUES (?, ?, ?, ?)',
        [certId, certName, certId, null]
      );
      certsAdded++;
    }
  }
  log(`  → ${certsAdded} certifications created (${allCertNames.size} total)\n`);

  // 3. Add brands + rating pillars
  log('[3/5] Adding brands...');
  let brandsAdded = 0;
  let ratingsAdded = 0;
  for (const brand of BRANDS) {
    const exists = await q('SELECT id FROM brands WHERE id = ?', [brand.id]);
    if (exists.length === 0) {
      await q(
        `INSERT INTO brands (id, name, slug, website_url, description, logo_url, overall_sustainability_score, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, NULL, ?, ?, ?)`,
        [brand.id, brand.name, brand.slug, brand.website_url, brand.description, brand.overall_score, now, now]
      );
      brandsAdded++;
      log(`  + ${brand.id} (${brand.name}, HSS ${brand.overall_score})`);

      // Insert 5 pillar ratings
      const pillarNames = ['Climate', 'Materials', 'Social/Labor', 'Transparency', 'Price/Accessibility'];
      for (const pillar of pillarNames) {
        const score = brand.pillars[pillar];
        if (score !== undefined) {
          const ratingId = `sr_${brand.id}_${slugify(pillar)}`;
          await q(
            `INSERT INTO sustainability_ratings (id, entity_type, entity_id, source_name, rating_value, rating_score, max_score, description, last_updated_at)
             VALUES (?, 'brand', ?, 'Hummlan HSS Methodology', ?, ?, 100, ?, ?)`,
            [ratingId, brand.id, pillar, score, `${brand.name} scores ${score}/100 on the ${pillar} pillar.`, now]
          );
          ratingsAdded++;
        }
      }
    } else {
      log(`  . ${brand.id} (already exists)`);
    }
  }
  log(`  → ${brandsAdded} brands added, ${ratingsAdded} ratings added\n`);

  // 4. Add products
  log('[4/5] Adding products...');
  let productsAdded = 0;
  for (const product of PRODUCTS) {
    const exists = await q('SELECT id FROM products WHERE id = ?', [product.id]);
    if (exists.length === 0) {
      await q(
        `INSERT INTO products (id, brand_id, category_id, name, slug, description, image_url, sustainability_summary, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, NULL, NULL, ?, ?)`,
        [product.id, product.brand_id, product.category_id, product.name, product.slug, product.description, now, now]
      );
      productsAdded++;
    }
  }
  log(`  → ${productsAdded} products added\n`);

  // 5. Summary
  const brandCount = await q('SELECT COUNT(*) as c FROM brands');
  const prodCount = await q('SELECT COUNT(*) as c FROM products');
  const ratingCount = await q('SELECT COUNT(*) as c FROM sustainability_ratings WHERE entity_type = \'brand\' AND source_name = \'Hummlan HSS Methodology\'');

  log('[5/5] Final summary:');
  log(`  Brands:              ${brandCount[0].c}`);
  log(`  Products:            ${prodCount[0].c}`);
  log(`  HSS Pillar Ratings:  ${ratingCount[0].c}`);
  log(`  Awin-ready brands:   ${BRANDS.filter(b => b.awin_id).length}`);

  // List Awin-ready brands for next step
  const awinBrands = BRANDS.filter(b => b.awin_id);
  log('\nAwin-ready brands (run npm run sync-awin to generate tracking links):');
  for (const b of awinBrands) {
    log(`  - ${b.name} (ID ${b.awin_id}, ${b.awin_region})`);
  }

  log('\n✅ Import complete!');
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});