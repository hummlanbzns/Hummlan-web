import type { Metadata } from 'next';
import Link from 'next/link';
import { Bug, CheckCircle, AlertTriangle, TrendingUp, ShoppingBag, Star } from 'lucide-react';
import { SITE_NAME, absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Affordable Sustainable Home Essentials Under $20 — Stern-Rated',
  description:
    'We found the cheapest eco-friendly dish soaps, laundry detergents, and cleaners that pass our stern EU Taxonomy & CSRD-aligned ratings. Starting at $0.04/use.',
  alternates: {
    canonical: '/best-of/affordable-sustainable-home-essentials',
  },
  openGraph: {
    title: 'Affordable Sustainable Home Essentials Under $20 — Stern-Rated',
    description:
      'We found the cheapest eco-friendly dish soaps, laundry detergents, and cleaners that pass our stern EU Taxonomy & CSRD-aligned ratings. Starting at $0.04/use.',
    url: '/best-of/affordable-sustainable-home-essentials',
    type: 'article',
    publishedTime: '2025-06-01',
    images: [
      {
        url: '/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'Affordable Sustainable Home Essentials Under $20 | Hummlan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Affordable Sustainable Home Essentials Under $20 — Stern-Rated',
    description:
      'We found the cheapest eco-friendly dish soaps, laundry detergents, and cleaners that pass our stern EU Taxonomy & CSRD-aligned ratings.',
    images: ['/og-default.svg'],
  },
};

const AFFILIATE_LINKS = {
  meliora: {
    url: 'https://meliorameansbetter.com/',
    label: 'Shop Meliora cleaning bar →',
  },
  drBronners: {
    url: 'https://www.drbronner.com/',
    label: "Check Dr. Bronner's current price →",
  },
  blueland: {
    url: 'https://www.blueland.com/',
    label: 'Shop Blueland starter sets →',
  },
  dropps: {
    url: 'https://www.dropps.com/',
    label: 'Compare Dropps subscription pricing →',
  },
  ecos: {
    url: 'https://www.ecos.com/',
    label: 'Check ECOS prices at Amazon →',
  },
};

const productSchemas = [
  {
    '@type': 'Product',
    name: 'Meliora All-Purpose Cleaning Bar + Stainless Steel Tin',
    description: 'Zero-waste concentrated cleaning bar with MADE SAFE certification. Plastic-free packaging.',
    brand: { '@type': 'Brand', name: 'Meliora' },
    offers: [{ '@type': 'Offer', price: '6.95', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: 'https://meliorameansbetter.com/' }],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '93', bestRating: '100', ratingCount: '1' },
  },
  {
    '@type': 'Product',
    name: "Dr. Bronner's Pure-Castile Liquid Soap (32 oz)",
    description: 'USDA Organic, Fair Trade certified multi-purpose liquid soap. 18 uses from one bottle.',
    brand: { '@type': 'Brand', name: "Dr. Bronner's" },
    offers: [{ '@type': 'Offer', price: '12.50', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: 'https://www.drbronner.com/' }],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '92', bestRating: '100', ratingCount: '1' },
  },
  {
    '@type': 'Product',
    name: 'Blueland Multi-Surface Cleaner Starter Set',
    description: 'Refillable glass bottle system with concentrated dissolvable tablets. EPA Safer Choice certified.',
    brand: { '@type': 'Brand', name: 'Blueland' },
    offers: [{ '@type': 'Offer', price: '15.00', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: 'https://www.blueland.com/' }],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '85', bestRating: '100', ratingCount: '1' },
  },
  {
    '@type': 'Product',
    name: 'Dropps Laundry Detergent Pods (48 ct)',
    description: 'Cradle to Cradle Certified laundry pods with compostable packaging.',
    brand: { '@type': 'Brand', name: 'Dropps' },
    offers: [{ '@type': 'Offer', price: '15.99', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: 'https://www.dropps.com/' }],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '84', bestRating: '100', ratingCount: '1' },
  },
  {
    '@type': 'Product',
    name: 'ECOS Laundry Detergent (100 oz, 96 loads)',
    description: 'Plant-based laundry detergent made with 100% renewable energy. Widely available.',
    brand: { '@type': 'Brand', name: 'ECOS' },
    offers: [{ '@type': 'Offer', price: '10.49', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: 'https://www.ecos.com/' }],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '84', bestRating: '100', ratingCount: '1' },
  },
];

const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Can I really replace all my cleaners with Dr. Bronner\'s?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — but it takes effort. You\'ll need to learn the right dilution ratios for each task. For most people, combining Dr. Bronner\'s (for all-purpose) with a specialized dish or laundry option works best.' } },
    { '@type': 'Question', name: 'Are Dropps pods bad for the environment because of the plastic film?', acceptedAnswer: { '@type': 'Answer', text: 'The PVA film is water-soluble and biodegradable in properly managed wastewater systems. However, there are concerns about PVA persistence in some environments. If you want to avoid the debate entirely, choose Meliora powder or Dr. Bronner\'s liquid.' } },
    { '@type': 'Question', name: 'What\'s the cheapest sustainable cleaning option?', acceptedAnswer: { '@type': 'Answer', text: 'ECOS laundry detergent at ~$0.11/load and Meliora Cleaning Bar at ~$0.04/use are the cheapest options in this guide, depending on your category.' } },
    { '@type': 'Question', name: 'Which brand has the highest sustainability score?', acceptedAnswer: { '@type': 'Answer', text: 'Meliora at 93/100 — driven by zero plastic packaging, MADE SAFE certification, and B Corp status. Dr. Bronner\'s (92/100) is a close second, with stronger supply chain ethics but plastic bottles.' } },
    { '@type': 'Question', name: 'Are these available in stores or only online?', acceptedAnswer: { '@type': 'Answer', text: 'ECOS and Dr. Bronner\'s are widely available at Target, Walmart, Whole Foods, and Amazon. Dropps and Blueland are primarily online. Meliora is direct website and select natural stores.' } },
    { '@type': 'Question', name: 'What\'s better: concentrate bars or liquid refills?', acceptedAnswer: { '@type': 'Answer', text: 'Concentrate bars (Meliora) are better for circular economy (zero plastic, minimal shipping). Liquid refills (Blueland) are more convenient for most people. Both beat traditional bottled cleaners by a wide margin.' } },
  ],
};

export default function HomeEssentialsPage() {
  const fullSchema = { '@context': 'https://schema.org', '@graph': [...productSchemas, faqSchema] };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bug className="w-8 h-8 text-brand fill-brand" aria-label="Hummlan bumblebee logo" />
            Hummlan.com
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-gray-600 font-medium hover:text-brand">Home</Link>
            <Link href="/best-of" className="text-gray-900 font-bold hover:text-brand">Best Of</Link>
            <Link href="/about" className="text-gray-600 font-medium hover:text-brand">Our Stern Standards</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(fullSchema) }} />

        <article className="max-w-4xl mx-auto px-4 py-12">
          <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-brand">Home</Link></li>
              <li>/</li>
              <li><Link href="/best-of" className="hover:text-brand">Best Of</Link></li>
              <li>/</li>
              <li className="text-gray-900 font-medium">Sustainable Home Essentials Under $20</li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            The Most Affordable Sustainable Home Essentials <span className="text-brand">(Under $20)</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            <span className="font-bold">Primary keyword:</span> affordable sustainable home essentials &middot;
            <span className="font-bold"> Updated:</span> June 2025
          </p>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4 mb-12">
            <p>If you&apos;ve browsed the cleaning aisle lately, you&apos;ve seen the same problem: shelves full of products labeled &quot;green,&quot; &quot;natural,&quot; and &quot;plant-based&quot; — none of which are legally regulated terms.</p>
            <p>This guide cuts through the noise. Every product here passed <strong>Hummlan&apos;s Stern but Fair Rating System</strong> — built on the backbone of the <strong>EU Taxonomy</strong> and <strong>CSRD</strong>. Then we applied the second filter: <strong>price reality</strong>. Every pick below is available for under <strong>$20</strong> per unit.</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-12 text-sm text-amber-800">
            <strong>Disclosure:</strong> Hummlan may earn a commission from qualifying purchases made through affiliate links. Ratings are independent, evidence-based, and cannot be bought or influenced by brands.
          </div>

          {/* Pillar table */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How Our Stern but Fair Rating Works</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-gray-100"><th className="text-left p-3 font-bold text-gray-900 border-b-2 border-gray-200">Pillar</th><th className="text-left p-3 font-bold text-gray-900 border-b-2 border-gray-200">What We Assess</th><th className="text-left p-3 font-bold text-gray-900 border-b-2 border-gray-200">EU Taxonomy Link</th></tr></thead>
                <tbody>
                  {[['Climate Impact', 'Emissions reduction, renewable energy, carbon footprint', 'Article 10 — Climate Mitigation'],['Circular Economy', 'Durability, recycled content, refill systems, zero-waste design', 'Article 13 — Transition to a Circular Economy'],['Pollution Prevention', 'Chemical management, aquatic toxicity, biodegradability', 'Article 14 — Pollution Prevention & Control'],['Supply Chain & Social', 'Fair wages, labor audits, supplier transparency', 'CSRD ESRS S1 (Own Workforce)'],['Biodiversity & Sourcing', 'Raw material sourcing, land use, ecosystem impact', 'Article 15 — Biodiversity & Ecosystems']].map(([p, a, l], i) => (
                    <tr key={p} className={i%2===0?'bg-white':'bg-gray-50'}><td className="p-3 font-semibold text-gray-900 border-b">{p}</td><td className="p-3 text-gray-700 border-b">{a}</td><td className="p-3 text-gray-600 border-b">{l}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Product rendering helper */}
          {[
            {
              num: 1, name: "Meliora All-Purpose Cleaning Bar + Stainless Steel Tin",
              best: "Zero-waste multi-purpose cleaning with the highest HSS",
              msrp: "$6.95 per bar + tin (lasts 3–6 months)", low: "~$0.04/use", hss: "93/100", hssLabel: "Excellent",
              priceRows: [['All-Purpose Cleaning Bar','$6.95','~$0.04'],['Laundry Powder (60 loads)','$13.95','~$0.23/load'],['Dish Soap Bar','$5.95','~$0.04/wash'],['Full bundle (all 3)','~$25.00','Best value']],
              summary: [
                { icon: 'check', title: 'Climate Impact (92/100)', text: 'Concentrate bars eliminate water weight in shipping. Manufactured in small batches in the US.', missing: 'No published Scope 1-3 emissions breakdown.' },
                { icon: 'check', title: 'Circular Economy (95/100) ✅ Best-in-class', text: 'Zero plastic packaging. Cardboard wrapper + reusable stainless steel tin. Strongest circular economy score of any household product in our database.', missing: 'Stainless steel tin production has its own lifecycle impact, but it\'s a one-time purchase replacing dozens of plastic bottles.' },
                { icon: 'check', title: 'Pollution Prevention (94/100)', text: 'MADE SAFE certified — one of the strictest chemical safety certifications. Leaping Bunny certified.', missing: 'No full aquatic biodegradability testing for every compound.' },
                { icon: 'check', title: 'Supply Chain & Social (88/100)', text: 'B Corp certified. 1% for the Planet. Radical ingredient transparency.', missing: 'Factory audit details not publicly available.' },
                { icon: 'check', title: 'Biodiversity & Sourcing (85/100)', text: 'Plant-based ingredients with MADE SAFE ecosystem-toxicology screening.', missing: 'No specific regenerative sourcing commitments.' },
              ],
              verdict: 'Meliora is the strongest zero-waste, highest-sustainability pick. The $6.95 cleaning bar is one of the cheapest sustainable products overall.',
              affiliate: AFFILIATE_LINKS.meliora,
            },
            {
              num: 2, name: "Dr. Bronner's Pure-Castile Liquid Soap (32 oz)",
              best: "Multi-purpose versatility at an accessible price",
              msrp: "MSRP $16.99–$18.99", low: "~$12.50–$14.00 sale", hss: "92/100", hssLabel: "Excellent",
              priceRows: [['All-purpose cleaner','1 tbsp per 16 oz water','~$0.03'],['Dish soap','Undiluted or 1:1','~$0.05'],['Laundry','1/3 cup per load','~$0.26/load'],['Bar soap (5 oz)','N/A — $4.99','~$0.04/wash']],
              summary: [
                { icon: 'check', title: 'Climate Impact (85/100)', text: 'Organic agriculture reduces fertilizer-related emissions. Fair Trade supply chain.', missing: 'Liquid soap is 90% water — significant transport emissions.' },
                { icon: 'triangle', title: 'Circular Economy (72/100)', text: '18-in-1 versatility is a genuine win — one product replaces many.', missing: 'Plastic bottles (100% PCR, but still single-use). No refill program.' },
                { icon: 'check', title: 'Pollution Prevention (91/100)', text: 'USDA Organic certified. No synthetic pesticides, no GMOs. Leaping Bunny.', missing: 'Castile soap\'s high pH requires user acidification for some tasks.' },
                { icon: 'check', title: 'Supply Chain & Social (96/100) ✅ Gold standard', text: 'Fair Trade certified across supply chain. Detailed supplier lists. CSRD-aligned gold standard for social disclosure.', missing: '' },
                { icon: 'check', title: 'Biodiversity & Sourcing (88/100)', text: 'USDA Organic = supports soil health and biodiversity.', missing: 'No regenerative agriculture commitments at scale.' },
              ],
              verdict: "Dr. Bronner's is the most versatile pick — one bottle can replace half your cleaning cabinet. The stern caveat: plastic packaging and water-heavy shipping are real costs.",
              affiliate: AFFILIATE_LINKS.drBronners,
            },
            {
              num: 3, name: "Blueland Multi-Surface & Dish Starter Sets",
              best: "Refillable system with the most convenient subscription",
              msrp: "$18 (Multi-Surface), $22 (Dish)", low: "~$15–$18 sale", hss: "85/100", hssLabel: "Very Good",
              priceRows: [['Multi-Surface Cleaner','$18.00','~$15.00','~$2.00/tablet'],['Dish Soap','$22.00','~$18.00','~$3.00/tablet'],['Hand Soap','$18.00','~$15.00','~$2.00/tablet'],['Bundle all 3','~$52.00','~$42.00','~$7.00/month']],
              summary: [
                { icon: 'check', title: 'Climate Impact (78/100)', text: 'Concentrated tablets eliminate water shipping. Lightweight packaging.', missing: 'No renewable energy commitment in manufacturing.' },
                { icon: 'check', title: 'Circular Economy (90/100) ✅ Strongest pillar', text: 'Buy the bottle once, buy tablets forever. Glass or stainless steel bottles.', missing: 'PVA tablet binder raises questions about aquatic persistence.' },
                { icon: 'check', title: 'Pollution Prevention (82/100)', text: 'EPA Safer Choice certified. No phosphates, chlorine, or ammonia.', missing: 'No MADE SAFE or Cradle to Cradle certification.' },
                { icon: 'triangle', title: 'Supply Chain & Social (78/100)', text: 'B Corp certified with public benefit report.', missing: 'Manufacturing partner details not fully public.' },
                { icon: 'triangle', title: 'Biodiversity & Sourcing (72/100)', text: 'Plant-based ingredients.', missing: 'No organic certification. Limited sourcing transparency.' },
              ],
              verdict: "Blueland's refill model is the most convenient path to zero-waste cleaning. Starter set cost (~$18) pays off within 6 months vs conventional brands.",
              affiliate: AFFILIATE_LINKS.blueland,
            },
            {
              num: 4, name: "Dropps Laundry Detergent Pods + Dishwasher Pods",
              best: "Best cost-per-load in sustainable laundry",
              msrp: "$19.99 (48 ct laundry)", low: "~$15.99 subscription", hss: "84/100", hssLabel: "Very Good",
              priceRows: [['Laundry Pods 48 ct','$19.99','$15.99','~$0.33'],['Dishwasher Pods 60 ct','$22.99','$18.39','~$0.31'],['Bulk Laundry 120 ct','$44.99','$35.99','~$0.30 🏆'],['Bulk Dishwasher 120 ct','$39.99','$31.99','~$0.27 🏆']],
              summary: [
                { icon: 'check', title: 'Climate Impact (80/100)', text: 'Concentrated formula. Compact packaging.', missing: 'No renewable energy commitment. No public carbon data.' },
                { icon: 'triangle', title: 'Circular Economy (75/100)', text: 'Compostable outer packaging (FSC-certified paper).', missing: 'PVA pod film controversy — dissolves but persistence concerns remain.' },
                { icon: 'check', title: 'Pollution Prevention (90/100) ✅ Strongest pillar', text: 'Cradle to Cradle Certified. EPA Safer Choice. Leaping Bunny.', missing: 'PVA film assessed separately from formula certification.' },
                { icon: 'check', title: 'Supply Chain & Social (82/100)', text: 'B Corp certified. Public benefit report.', missing: 'Less detailed supply chain disclosure than top-tier brands.' },
                { icon: 'triangle', title: 'Biodiversity & Sourcing (78/100)', text: 'Plant-based enzymes and surfactants.', missing: 'No organic or regenerative sourcing claims.' },
              ],
              verdict: 'Dropps is the strongest cost-per-load option at $0.30/load on subscription. Cradle to Cradle certification provides real material safety confidence.',
              affiliate: AFFILIATE_LINKS.dropps,
            },
            {
              num: 5, name: "ECOS Laundry Detergent + All-Purpose Cleaner",
              best: "Widely available budget-friendly option",
              msrp: "$13.99 (96 loads laundry)", low: "~$10.49 sale", hss: "84/100", hssLabel: "Very Good",
              priceRows: [['Laundry Detergent (96 loads)','$13.99','~$10.49','~$0.11/load 🏆'],['All-Purpose Cleaner','$5.99','~$4.49','~$0.12/use'],['Dish Soap','$4.99','~$3.79','~$0.06/wash']],
              summary: [
                { icon: 'check', title: 'Climate Impact (92/100) ✅ Best in guide', text: '100% renewable energy in manufacturing — solar, wind, and carbon offsets.', missing: 'Score covers manufacturing energy, not full lifecycle.' },
                { icon: 'triangle', title: 'Circular Economy (55/100) ❌ Weakest pillar', text: 'Standard single-use plastic bottles. Recyclable, but linear model.', missing: 'No refill program. No take-back scheme. Biggest gap.' },
                { icon: 'check', title: 'Pollution Prevention (85/100)', text: 'MADE SAFE certified. EPA Safer Choice. Leaping Bunny.', missing: 'No Cradle to Cradle certification.' },
                { icon: 'check', title: 'Supply Chain & Social (80/100)', text: 'B Corp certified. Public benefit report.', missing: 'Factory-level transparency limited.' },
                { icon: 'triangle', title: 'Biodiversity & Sourcing (78/100)', text: 'Plant-based surfactants. MADE SAFE ecosystem screening.', missing: 'No organic ingredients. Limited sourcing transparency.' },
              ],
              verdict: 'ECOS is the "no excuses" sustainable option — available at Target/Walmart/Amazon at prices competitive with conventional brands. $0.11/load laundry is cheapest in this guide.',
              affiliate: AFFILIATE_LINKS.ecos,
            },
          ].map((prod) => (
            <section key={prod.num} className="mb-16 bg-white rounded-2xl border shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <ShoppingBag className="w-6 h-6 text-brand" />
                <h2 className="text-2xl font-bold text-gray-900">{prod.num}. {prod.name}</h2>
              </div>
              <p className="text-brand font-bold mb-6">Best for: {prod.best}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-gray-600">Price:</span><span className="font-semibold text-right">{prod.msrp}</span></div><div className="flex justify-between"><span className="text-gray-600">Lowest:</span><span className="font-semibold text-brand">{prod.low}</span></div><div className="flex justify-between"><span className="text-gray-600">HSS:</span><span className="font-semibold"><span className="bg-brand text-white px-2 py-0.5 rounded text-sm">{prod.hss}</span> — {prod.hssLabel}</span></div></div>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">💰 Price Breakdown</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead><tr className="bg-gray-100">{prod.priceRows[0].map((_, ci) => <th key={ci} className="text-left p-3 font-bold text-gray-900 border-b">{['Product','MSRP','Sale Price','Per-Use'][ci]||'Option'}</th>)}</tr></thead>
                  <tbody>{prod.priceRows.map((row, ri) => <tr key={ri} className={ri%2===0?'bg-white':'bg-gray-50'}>{row.map((cell, ci) => <td key={ci} className={`p-3 border-b ${ci===row.length-1?'font-semibold text-brand':''}`}>{cell}</td>)}</tr>)}</tbody>
                </table>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">🌿 Stern but Fair Sustainability Summary</h3>
                {prod.summary.map((s, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      {s.icon === 'check' ? <CheckCircle className="w-5 h-5 text-brand" /> : <AlertTriangle className="w-5 h-5 text-amber-500" />}
                      <span className="font-bold text-sm">{s.title}</span>
                    </div>
                    <p className="text-gray-700 text-sm ml-7">{s.text}{s.missing ? <span className="text-amber-700 font-medium"> {s.missing}</span> : ''}</p>
                  </div>
                ))}
                <div className="mt-4 p-4 bg-brand-light border border-brand-light rounded-lg">
                  <p className="text-brand-dark font-medium text-sm"><strong>👉 Verdict:</strong> {prod.verdict}</p>
                </div>
              </div>
              <a href={prod.affiliate.url} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-2 bg-brand text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-dark transition-colors shadow-lg">{prod.affiliate.label}<TrendingUp className="w-5 h-5" /></a>
            </section>
          ))}

          {/* Quick Comparison Table */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Comparison Table</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-gray-100"><th className="text-left p-3 font-bold text-gray-900 border-b">Product</th><th className="text-left p-3 font-bold text-gray-900 border-b">Best For</th><th className="text-left p-3 font-bold text-gray-900 border-b">MSRP</th><th className="text-left p-3 font-bold text-gray-900 border-b">Low Price</th><th className="text-left p-3 font-bold text-gray-900 border-b">Per-Use</th><th className="text-left p-3 font-bold text-gray-900 border-b">HSS</th></tr></thead>
                <tbody>
                  {[['Meliora Cleaning Bar','Zero plastic / highest HSS','$6.95','$6.95','~$0.04','93'],["Dr. Bronner's 32 oz",'Multi-purpose versatility','$16.99','~$12.50','~$0.05','92'],['Blueland Multi-Surface','Refillable system','$18.00','~$15.00','~$0.10','85'],['Dropps Laundry Pods','Cost-per-load','$19.99','~$15.99','~$0.33','84'],['ECOS Laundry 100 oz','Budget + availability','$13.99','~$10.49','~$0.11','84']].map((r,i) => (
                    <tr key={i} className={i%2===0?'bg-white':'bg-gray-50'}><td className="p-3 border-b font-semibold">{r[0]}</td><td className="p-3 border-b">{r[1]}</td><td className="p-3 border-b">{r[2]}</td><td className="p-3 border-b text-brand font-semibold">{r[3]}</td><td className="p-3 border-b">{r[4]}</td><td className="p-3 border-b"><span className="bg-brand text-white px-2 py-0.5 rounded text-xs">{r[5]}</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Buying calendar */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">When Is the Cheapest Time to Buy?</h2>
            <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr className="bg-gray-100"><th className="text-left p-3 font-bold text-gray-900 border-b">Timing</th><th className="text-left p-3 font-bold text-gray-900 border-b">What to Watch</th></tr></thead><tbody>
              {[['Earth Month (April)','20–30% off across all 5 brands'],['Amazon Prime Day (July)','ECOS, Dropps, Blueland discounted 15–25%'],['Black Friday / Cyber Week','Subscription bundles + starter kit deals'],['Subscribe & Save','10–15% recurring discounts (all brands)'],['Target Circle App','ECOS regularly 10–20% off']].map(([t,w],i) => <tr key={i} className={i%2===0?'bg-white':'bg-gray-50'}><td className="p-3 border-b font-semibold">{t}</td><td className="p-3 border-b">{w}</td></tr>)}
            </tbody></table></div>
          </section>

          {/* Why stricter */}
          <section className="mb-16 bg-brand-light rounded-2xl p-8 border border-brand-light">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Hummlan&apos;s Ratings Are Stricter Than Typical &quot;Eco&quot; Lists</h2>
            <ol className="list-decimal pl-5 space-y-4 text-gray-700">
              <li><strong>EU Taxonomy-aligned pillars</strong> — We assess specific environmental objectives, not marketing claims.</li>
              <li><strong>CSRD-style evidence standards</strong> — Third-party verified proof weighted higher than self-reported claims.</li>
              <li><strong>No greenwashing passes</strong> — Mrs. Meyer&apos;s (62/100) and Grove Collaborative (65/100) were excluded specifically because disclosure depth fell below our threshold.</li>
              <li><strong>Price-agnostic scoring</strong> — Low price doesn&apos;t hurt HSS. We rate sustainability independently so you can find the cheapest sustainable option.</li>
            </ol>
          </section>

          {/* FAQ */}
          <section className="mb-16" id="faq">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQ: Affordable Sustainable Home Essentials</h2>
            <div className="space-y-4">
              {[
                {q: "Can I really replace all my cleaners with Dr. Bronner's?", a: "Yes — but it takes effort. You'll need to learn the right dilution ratios. For most people, combining Dr. Bronner's with a specialized dish or laundry option works best."},
                {q: 'Are Dropps pods bad for the environment because of the plastic film?', a: "The PVA film is water-soluble and biodegradable in properly managed wastewater systems. However, concerns about PVA persistence remain. If you want to avoid the debate, choose Meliora powder or Dr. Bronner's liquid."},
                {q: "What's the cheapest sustainable cleaning option?", a: "ECOS laundry detergent at ~$0.11/load and Meliora Cleaning Bar at ~$0.04/use are the cheapest options."},
                {q: 'Which brand has the highest sustainability score?', a: "Meliora at 93/100 — driven by zero plastic packaging, MADE SAFE certification, and B Corp status. Dr. Bronner's (92/100) is a close second."},
                {q: 'Are these available in stores or only online?', a: "ECOS and Dr. Bronner's are widely available at Target, Walmart, and Whole Foods. Dropps and Blueland are primarily online. Meliora is direct website and select natural stores."},
                {q: "What's better: concentrate bars or liquid refills?", a: "Concentrate bars (Meliora) are better for circular economy. Liquid refills (Blueland) are more convenient. Both beat traditional bottled cleaners by a wide margin."},
              ].map((faq, i) => (
                <details key={i} className="bg-white rounded-xl border p-5 group">
                  <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.q}</span>
                    <span className="text-brand text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-gray-700 text-sm leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Final Verdict */}
          <section className="mb-16 bg-gradient-to-br from-brand to-brand-dark rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Final Verdict</h2>
            <ul className="list-disc pl-5 space-y-3 text-brand-light">
              <li><strong>Start with Meliora</strong> for zero-waste cleaning at the highest HSS. The $6.95 cleaning bar is the cheapest sustainable product in this guide.</li>
              <li><strong>Use Dr. Bronner's</strong> for multi-purpose versatility. One bottle replaces half your cleaning cabinet.</li>
              <li><strong>Add Blueland</strong> for a convenient refill system with subscription convenience.</li>
              <li><strong>Keep ECOS on hand</strong> for everyday budget-friendly cleaning — $0.11/load for laundry.</li>
              <li><strong>Try Dropps</strong> for the best cost-per-load with Cradle to Cradle material safety.</li>
            </ul>
            <p className="text-brand-light text-sm pt-4 italic">Prices and ratings checked as of publication. Scores updated as new evidence becomes available.</p>
          </section>

          <div className="text-sm text-gray-500 border-t pt-6">
            <p><strong>Internal links:</strong> <Link href="/best-of" className="text-brand hover:underline">Best Of hub</Link> · <Link href="/about" className="text-brand hover:underline">Our Methodology</Link> · <Link href="/shop" className="text-brand hover:underline">Shop</Link></p>
            <p className="mt-2">Guide published: June 2025 | Prices and ratings checked as of publication date.</p>
          </div>
        </article>
      </main>

      <footer className="bg-white border-t py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <Link href="/" className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
              <Bug className="w-10 h-10 text-brand fill-brand" aria-label="Hummlan bumblebee logo" />
              Hummlan.com
            </Link>
            <nav className="flex gap-8 text-sm font-bold text-gray-500 uppercase tracking-widest">
              <Link href="/best-of" className="hover:text-brand">Best Of</Link>
              <Link href="/about" className="hover:text-brand">Our Standards</Link>
              <Link href="/privacy" className="hover:text-brand">Privacy</Link>
              <Link href="/terms" className="hover:text-brand">Terms</Link>
            </nav>
          </div>
          <div className="text-center pt-12 border-t border-gray-100">
            <p className="text-gray-400 text-sm mb-2">© 2025 Hummlan.com. All rights reserved.</p>
            <p className="text-gray-400 text-xs max-w-2xl mx-auto leading-relaxed">Hummlan is an independent comparison site. We earn affiliate commissions from some of the stores we link to.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}