import type { Metadata } from 'next';
import HummlanBeeMark from "@/components/HummlanBeeMark";
import Link from 'next/link';
import { Bug, CheckCircle, AlertTriangle, TrendingUp, ShoppingBag, Star } from 'lucide-react';
import { SITE_NAME, absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Affordable Sustainable Basics Under $50 — Hummlan Stern-Rated',
  description:
    'We found the cheapest sustainable basics that pass our stern EU Taxonomy & CSRD-aligned ratings. Pact leggings from $25 & Patagonia shorts from $44.',
  alternates: {
    canonical: '/best-of/affordable-sustainable-basics-under-50',
  },
  openGraph: {
    title: 'Affordable Sustainable Basics Under $50 — Hummlan Stern-Rated',
    description:
      'We found the cheapest sustainable basics that pass our stern EU Taxonomy & CSRD-aligned ratings. Pact leggings from $25 & Patagonia shorts from $44.',
    url: '/best-of/affordable-sustainable-basics-under-50',
    type: 'article',
    publishedTime: '2025-06-01',
    images: [
      {
        url: '/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'Affordable Sustainable Basics Under $50 — Hummlan Stern-Rated',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Affordable Sustainable Basics Under $50 — Hummlan Stern-Rated',
    description:
      'We found the cheapest sustainable basics that pass our stern EU Taxonomy & CSRD-aligned ratings. Pact leggings from $25 & Patagonia shorts from $44.',
    images: ['/og-default.svg'],
  },
};

// Affiliate link configurations
const AFFILIATE_LINKS = {
  pactLeggings: {
    url: 'https://wearpact.com/collections/womens-leggings',
    label: 'Check latest price on Pact leggings →',
    retail: 'Pact',
  },
  pactBoxers: {
    url: 'https://wearpact.com/collections/mens-underwear',
    label: 'Compare Pact multipack prices →',
    retail: 'Pact',
  },
  patagoniaBaggies: {
    url: 'https://www.patagonia.com/shop/baggies-shorts',
    label: 'Check Patagonia Baggies sale availability →',
    retail: 'Patagonia',
  },
};

// Product schema data
const productSchemas = [
  {
    '@type': 'Product',
    name: "Pact Women's Go-To Legging / Classic Legging",
    description:
      'GOTS-certified organic cotton leggings. Ethically made, Fair Trade Certified.',
    brand: {
      '@type': 'Brand',
      name: 'Pact',
    },
    offers: [
      {
        '@type': 'Offer',
        price: '25.00',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2025-12-31',
        url: 'https://wearpact.com/collections/womens-leggings',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '79',
      bestRating: '100',
      ratingCount: '1',
    },
  },
  {
    '@type': 'Product',
    name: "Pact Men's Boxer Briefs (3-Pack / 6-Pack)",
    description:
      'GOTS-certified organic cotton boxer briefs in multipack options.',
    brand: {
      '@type': 'Brand',
      name: 'Pact',
    },
    offers: [
      {
        '@type': 'Offer',
        price: '36.00',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2025-12-31',
        url: 'https://wearpact.com/collections/mens-underwear',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '79',
      bestRating: '100',
      ratingCount: '1',
    },
  },
  {
    '@type': 'Product',
    name: "Patagonia Baggies Shorts 5\"",
    description:
      '100% recycled nylon shorts made from NetPlus® recycled fishing nets with DWR finish.',
    brand: {
      '@type': 'Brand',
      name: 'Patagonia',
    },
    offers: [
      {
        '@type': 'Offer',
        price: '44.00',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2025-12-31',
        url: 'https://www.patagonia.com/shop/baggies-shorts',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '95',
      bestRating: '100',
      ratingCount: '1',
    },
  },
];

// FAQ schema
const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is affordable sustainable clothing actually possible?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — especially for high-use basics like leggings, underwear, and shorts. Focus on multipacks and seasonal sales from brands with verifiable certifications. Pact\'s sale pricing (~$25 for leggings) is now competitive with conventional mid-tier brands.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does organic cotton compare to recycled materials?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both have sustainability advantages. Organic cotton eliminates pesticides and supports soil health. Recycled materials (like Patagonia\'s NetPlus®) reduce virgin resource extraction and waste. Neither is universally "better" — the best choice depends on which impact you prioritize. Our HSS accounts for both.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why include Patagonia if MSRP is over $50?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Because the Baggies Shorts regularly drop to ~$44 during sale windows while maintaining a 95/100 HSS — the highest sustainability score in our database. If your priority is maximum verifiable sustainability at an affordable price, this is the pick.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are cheaper sustainable products lower quality?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not inherently. Lower price can reflect direct-to-consumer models (Pact), multipack economics (Pact boxers), or seasonal markdowns (Patagonia Web Specials) — not lower standards. We assess quality through durability evidence in our circular economy pillar.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Pact compare to Patagonia on sustainability?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pact (79/100) is a strong entry-level sustainable brand with solid certifications. Patagonia (95/100) is a best-in-class leader with circular economy programs, full emissions reporting, and deeper supply chain transparency. Both pass our stern threshold, but Patagonia operates at a different level of rigor. The trade-off is price — Pact is more consistently under $50.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you update scores when brands improve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We monitor certification renewals, new disclosures, and material changes. If Pact adds a circular economy program or Patagonia transitions to 100% PFC-free DWR, their HSS will reflect it.',
      },
    },
  ],
};

export default function AffordableSustainableBasicsPage() {
  const fullSchema = {
    '@context': 'https://schema.org',
    '@graph': [...productSchemas, faqSchema],
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <HummlanBeeMark className="w-8 h-8" />
            Hummlan.com
          </Link>
          
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-gray-600 font-medium hover:text-brand">Home</Link>
            <Link href="/best-of" className="text-gray-600 font-medium hover:text-brand">Best Of</Link>
            <Link href="/about" className="text-gray-600 font-medium hover:text-brand">Our Standards</Link>
            <Link href="/eu-taxonomy" className="text-gray-600 font-medium hover:text-brand">EU Taxonomy</Link>
            <Link href="/csrd" className="text-gray-600 font-medium hover:text-brand">CSRD</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(fullSchema) }}
        />

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-brand">Home</Link></li>
              <li>/</li>
              <li><Link href="/best-of" className="hover:text-brand">Best Of</Link></li>
              <li>/</li>
              <li className="text-gray-900 font-medium">Affordable Sustainable Basics Under $50</li>
            </ol>
          </nav>

          {/* Title Section */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            The Most Affordable Organic &amp; Sustainable Basics <span className="text-brand">(Under $50)</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl">
            <span className="font-bold">Primary keyword:</span> affordable sustainable clothing &middot;
            <span className="font-bold"> Updated:</span> June 2025
          </p>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4 mb-12">
            <p>
              If you&apos;ve searched for <strong>affordable sustainable clothing</strong>, you&apos;ve hit the same wall: lots of &quot;eco&quot; marketing, premium price tags, and very little proof that any of it matters.
            </p>
            <p>
              This guide is different.
            </p>
            <p>
              Every product here passed <strong>Hummlan&apos;s Stern but Fair Rating System</strong> — built on the backbone of the <strong>EU Taxonomy</strong> (which defines what &quot;sustainable&quot; actually means) and <strong>CSRD</strong> (which demands transparent, verifiable evidence). We don&apos;t reward storytelling. We reward third-party proof, measurable impact, and accessible pricing.
            </p>
            <p>
              Then we applied the second filter: <strong>price reality</strong>. Every pick below can land at or under <strong>$50</strong> when bought at typical sale prices or through smart bundle deals.
            </p>
          </div>

          {/* Affiliate Disclosure */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-12 text-sm text-amber-800">
            <strong>Disclosure:</strong> Hummlan may earn a commission from qualifying purchases made through affiliate links. Ratings are independent, evidence-based, and cannot be bought or influenced by brands.
          </div>

          {/* How Our Stern but Fair Rating Works */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How Our Stern but Fair Rating Works</h2>
            <p className="text-gray-700 mb-6">
              We evaluate every brand across <strong>five core pillars</strong> aligned to the EU Taxonomy&apos;s six environmental objectives and CSRD evidence standards:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-bold text-gray-900 border-b-2 border-gray-200">Pillar</th>
                    <th className="text-left p-3 font-bold text-gray-900 border-b-2 border-gray-200">What We Assess</th>
                    <th className="text-left p-3 font-bold text-gray-900 border-b-2 border-gray-200">EU Taxonomy Link</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Climate Impact', 'Emissions reduction, renewable energy, carbon footprint', 'Article 10 — Climate Mitigation'],
                    ['Circular Economy', 'Durability, recycled content, repair programs, end-of-life', 'Article 13 — Transition to a Circular Economy'],
                    ['Pollution Prevention', 'Chemical management, hazardous substances, microplastics', 'Article 14 — Pollution Prevention & Control'],
                    ['Supply Chain & Social', 'Fair wages, labor audits, supplier transparency', 'CSRD ESRS S1 (Own Workforce)'],
                    ['Biodiversity & Sourcing', 'Raw material sourcing, land use, deforestation', 'Article 15 — Biodiversity & Ecosystems'],
                  ].map(([pillar, assessment, link], i) => (
                    <tr key={pillar} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 font-semibold text-gray-900 border-b">{pillar}</td>
                      <td className="p-3 text-gray-700 border-b">{assessment}</td>
                      <td className="p-3 text-gray-600 border-b">{link}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Each brand receives a <strong>Hummlan Sustainability Score (HSS)</strong> out of 100 based on the strength and verifiability of their evidence across these pillars.
            </p>
          </section>

          {/* Product 1: Pact Leggings */}
          <section className="mb-16 bg-white rounded-2xl border shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingBag className="w-6 h-6 text-brand" />
              <h2 className="text-2xl font-bold text-gray-900">1. Pact Women&apos;s Go-To Legging / Classic Legging</h2>
            </div>
            <p className="text-brand-dark font-bold mb-6">Best for: Everyday organic cotton basics at mainstream prices</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-gray-600">Typical MSRP:</span><span className="font-semibold">$38–$44</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Observed low price:</span><span className="font-semibold text-brand-dark">~$25</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Material profile:</span><span className="font-semibold">GOTS-certified organic cotton blend</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Brand HSS:</span><span className="font-semibold"><span className="bg-brand text-white px-2 py-0.5 rounded text-sm">79/100</span> — Very Good</span></div>
              </div>
            </div>

            <h3 className="font-bold text-lg text-gray-900 mb-3">💰 Price Breakdown</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-bold text-gray-900 border-b">Purchase Option</th>
                    <th className="text-left p-3 font-bold text-gray-900 border-b">Price</th>
                    <th className="text-left p-3 font-bold text-gray-900 border-b">Price Per Wear (est.)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white"><td className="p-3 border-b">Full MSRP</td><td className="p-3 border-b">$38–$44</td><td className="p-3 border-b">~$0.38–$0.44 (100 wears)</td></tr>
                  <tr className="bg-gray-50"><td className="p-3 border-b">Sale price (20–30% off)</td><td className="p-3 border-b">~$25–$32</td><td className="p-3 border-b text-brand-dark font-semibold">~$0.25–$0.32</td></tr>
                  <tr className="bg-white"><td className="p-3 border-b">Bundled with top</td><td className="p-3 border-b">~$50–$60 for set</td><td className="p-3 border-b">Best for capsule wardrobe</td></tr>
                </tbody>
              </table>
            </div>

            {/* Sustainability Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">🌿 Stern but Fair Sustainability Summary</h3>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-5 h-5 text-brand" /><span className="font-bold">Climate Impact (82/100)</span></div>
                <p className="text-gray-700 text-sm ml-7">Pact sources GOTS-certified organic cotton, which eliminates synthetic fertilizers and reduces water consumption compared to conventional cotton. Their Colorado-based operations use efficient logistics. <span className="text-amber-700 font-medium">What&apos;s missing:</span> No public Scope 1-3 emissions breakdown or SBTi-aligned reduction target.</p>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-5 h-5 text-amber-500" /><span className="font-bold">Circular Economy (68/100)</span></div>
                <p className="text-gray-700 text-sm ml-7">Products are designed for durability — customer reviews consistently report 2–3 years of regular wear. However, Pact has no repair program, no take-back scheme, and limited recycled content. <span className="text-amber-700 font-medium">Stern verdict:</span> Above-average product lifespan but no circular infrastructure.</p>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-5 h-5 text-brand" /><span className="font-bold">Pollution Prevention (78/100)</span></div>
                <p className="text-gray-700 text-sm ml-7">GOTS certification restricts hazardous chemicals. The organic cotton base eliminates pesticide runoff. <span className="text-amber-700 font-medium">What&apos;s missing:</span> No Bluesign certification or ZDHC membership.</p>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-5 h-5 text-brand" /><span className="font-bold">Supply Chain &amp; Social (85/100) ✅ Strongest pillar</span></div>
                <p className="text-gray-700 text-sm ml-7">Pact is Fair Trade Certified, meaning farmers and workers receive premiums for community investment. They publish their factory list and supplier code of conduct.</p>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-5 h-5 text-amber-500" /><span className="font-bold">Biodiversity &amp; Sourcing (72/100)</span></div>
                <p className="text-gray-700 text-sm ml-7">Organic cotton farming supports soil health and reduces water pollution. But no regenerative agriculture commitments or biodiversity reporting.</p>
              </div>

              <div className="mt-6 p-4 bg-brand-light border border-brand-light rounded-lg">
                <p className="text-brand-dark font-medium text-sm"><strong>👉 Verdict:</strong> Pact is the strongest entry point for shoppers looking for affordable sustainable clothing with real certifications behind it. For the price point, no other brand delivers this level of verified proof.</p>
              </div>
            </div>

            {/* Affiliate CTA */}
            <a
              href={AFFILIATE_LINKS.pactLeggings.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-brand text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-dark transition-colors shadow-lg"
            >
              {AFFILIATE_LINKS.pactLeggings.label}
              <TrendingUp className="w-5 h-5" />
            </a>
          </section>

          {/* Product 2: Pact Boxers */}
          <section className="mb-16 bg-white rounded-2xl border shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingBag className="w-6 h-6 text-brand" />
              <h2 className="text-2xl font-bold text-gray-900">2. Pact Men&apos;s Boxer Briefs (3-Pack / 6-Pack)</h2>
            </div>
            <p className="text-brand-dark font-bold mb-6">Best for: Budget-friendly sustainable underwear without compromise</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-gray-600">Typical MSRP:</span><span className="font-semibold">$18 (single)</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Lowest per-pair:</span><span className="font-semibold text-brand-dark">~$8–$9 in 6-pack sale</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Material:</span><span className="font-semibold">GOTS-certified organic cotton</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Brand HSS:</span><span className="font-semibold"><span className="bg-brand text-white px-2 py-0.5 rounded text-sm">79/100</span> — Very Good</span></div>
              </div>
            </div>

            <h3 className="font-bold text-lg text-gray-900 mb-3">💰 Price Breakdown</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-bold text-gray-900 border-b">Purchase Option</th>
                    <th className="text-left p-3 font-bold text-gray-900 border-b">Price</th>
                    <th className="text-left p-3 font-bold text-gray-900 border-b">Per-Pair Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white"><td className="p-3 border-b">Single pair</td><td className="p-3 border-b">$18</td><td className="p-3 border-b">$18.00</td></tr>
                  <tr className="bg-gray-50"><td className="p-3 border-b">3-Pack</td><td className="p-3 border-b">~$36–$42</td><td className="p-3 border-b">~$12.00–$14.00</td></tr>
                  <tr className="bg-white"><td className="p-3 border-b">6-Pack</td><td className="p-3 border-b">~$60–$72</td><td className="p-3 border-b">~$10.00–$12.00</td></tr>
                  <tr className="bg-brand-light"><td className="p-3 border-b font-semibold text-brand-dark">Sale on 6-pack</td><td className="p-3 border-b">~$48–$55</td><td className="p-3 border-b font-semibold text-brand-dark">~$8.00–$9.17 🏆 Best value</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <p className="text-gray-700 text-sm mb-4">Identical brand-level rating to Pact above (79/100). What matters here is <strong>product-specific value</strong>:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mb-4">
                <li><strong>Material efficiency:</strong> Multipacks reduce per-unit packaging waste — a meaningful circular economy signal</li>
                <li><strong>Longevity:</strong> Double-stitched seams and flatlock construction extend usable life beyond typical fast-fashion underwear</li>
                <li><strong>End-of-life:</strong> 100% organic cotton means composability in industrial facilities (no synthetic blends)</li>
              </ul>
              <p className="text-amber-700 text-sm"><strong>The trade-off:</strong> No recycled content in the fabric itself. Pact could improve by introducing recycled organic cotton blends.</p>
              <div className="mt-6 p-4 bg-brand-light border border-brand-light rounded-lg">
                <p className="text-brand-dark font-medium text-sm"><strong>👉 Verdict:</strong> At ~$10/pair or less, Pact&apos;s multipacks beat most conventional brands on both price and sustainability proof.</p>
              </div>
            </div>

            <a
              href={AFFILIATE_LINKS.pactBoxers.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-brand text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-dark transition-colors shadow-lg"
            >
              {AFFILIATE_LINKS.pactBoxers.label}
              <TrendingUp className="w-5 h-5" />
            </a>
          </section>

          {/* Product 3: Patagonia Baggies */}
          <section className="mb-16 bg-white rounded-2xl border shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-brand fill-brand" />
              <h2 className="text-2xl font-bold text-gray-900">3. Patagonia Baggies Shorts — 5&quot;</h2>
            </div>
            <p className="text-brand-dark font-bold mb-6">Best for: Maximum sustainability rigor when you can time the sale</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-gray-600">Typical MSRP:</span><span className="font-semibold">$65</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Observed low price:</span><span className="font-semibold text-brand-dark">~$44</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Material:</span><span className="font-semibold">100% recycled nylon (NetPlus®)</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Brand HSS:</span><span className="font-semibold"><span className="bg-brand text-white px-2 py-0.5 rounded text-sm">95/100</span> — Excellent 🏆</span></div>
              </div>
            </div>

            <h3 className="font-bold text-lg text-gray-900 mb-3">💰 Price Breakdown</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-bold text-gray-900 border-b">Purchase Option</th>
                    <th className="text-left p-3 font-bold text-gray-900 border-b">Price</th>
                    <th className="text-left p-3 font-bold text-gray-900 border-b">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white"><td className="p-3 border-b">Full MSRP</td><td className="p-3 border-b">$65</td><td className="p-3 border-b text-amber-700">Above our $50 ceiling</td></tr>
                  <tr className="bg-gray-50"><td className="p-3 border-b font-semibold text-brand-dark">Patagonia Web Special</td><td className="p-3 border-b font-semibold text-brand-dark">~$44–$49</td><td className="p-3 border-b">Direct from Patagonia, limited sizes</td></tr>
                  <tr className="bg-white"><td className="p-3 border-b">REI Member Sale</td><td className="p-3 border-b">~$49–$52</td><td className="p-3 border-b">Seasonal</td></tr>
                  <tr className="bg-gray-50"><td className="p-3 border-b">End-of-season clearance</td><td className="p-3 border-b">~$39–$44</td><td className="p-3 border-b">Best deal, limited stock</td></tr>
                  <tr className="bg-brand-light"><td className="p-3 border-b font-semibold text-brand-dark">Secondhand / Worn Wear</td><td className="p-3 border-b font-semibold text-brand-dark">~$30–$45</td><td className="p-3 border-b">Certified used, lowest carbon option</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">🌿 Stern but Fair Sustainability Summary</h3>
              <p className="text-sm text-gray-600 mb-4">Patagonia&apos;s <strong>95/100 HSS</strong> is the highest in Hummlan&apos;s database — but we still apply the same stern lens.</p>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-5 h-5 text-brand" /><span className="font-bold">Climate Impact (96/100)</span></div>
                <p className="text-gray-700 text-sm ml-7">B Corp certified. Detailed Scope 1-3 emissions with SBTi targets. NetPlus® recycled nylon. <span className="text-amber-700 font-medium">Critique:</span> DWR finish adds lifecycle emissions; PFC-free transition not yet complete across all runs.</p>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-5 h-5 text-brand" /><span className="font-bold">Circular Economy (97/100) ✅ Best-in-class</span></div>
                <p className="text-gray-700 text-sm ml-7">Worn Wear program (repair, resale, trade-in). Repair guides and replacement parts available. <span className="text-amber-700 font-medium">Critique:</span> Recycled nylon still sheds microplastics; shedding not solved at product level.</p>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-5 h-5 text-brand" /><span className="font-bold">Pollution Prevention (88/100)</span></div>
                <p className="text-gray-700 text-sm ml-7">Bluesign-approved materials. PFC-free DWR transition underway. <span className="text-amber-700 font-medium">Critique:</span> Not all colorways available in 100% PFC-free DWR.</p>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-5 h-5 text-brand" /><span className="font-bold">Supply Chain &amp; Social (98/100) ✅ Gold standard</span></div>
                <p className="text-gray-700 text-sm ml-7">Fair Trade Certified sewing. Public factory list with audit scores. Fully aligned with CSRD ESRS S1 expectations. <span className="font-medium">No material violations found.</span></p>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-5 h-5 text-brand" /><span className="font-bold">Biodiversity &amp; Sourcing (94/100)</span></div>
                <p className="text-gray-700 text-sm ml-7">NetPlus® directly reduces ocean plastic pollution. Regenerative organic cotton programs. 1% for the Planet contributions. <span className="text-amber-700 font-medium">Critique:</span> Recycled synthetics don&apos;t address microplastic pollution harming aquatic ecosystems.</p>
              </div>

              <div className="mt-6 p-4 bg-brand-light border border-brand-light rounded-lg">
                <p className="text-brand-dark font-medium text-sm"><strong>👉 Verdict:</strong> Patagonia is the most rigorously sustainable brand in this guide. At ~$44 on sale, the Baggies Shorts are the single best value for a shopper who prioritizes maximum sustainability proof.</p>
              </div>
            </div>

            <a
              href={AFFILIATE_LINKS.patagoniaBaggies.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-brand text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-dark transition-colors shadow-lg"
            >
              {AFFILIATE_LINKS.patagoniaBaggies.label}
              <TrendingUp className="w-5 h-5" />
            </a>
          </section>

          {/* Quick Comparison Table */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Comparison Table</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-bold text-gray-900 border-b">Product</th>
                    <th className="text-left p-3 font-bold text-gray-900 border-b">Typical MSRP</th>
                    <th className="text-left p-3 font-bold text-gray-900 border-b">Low Price</th>
                    <th className="text-left p-3 font-bold text-gray-900 border-b">HSS</th>
                    <th className="text-left p-3 font-bold text-gray-900 border-b">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="p-3 border-b font-semibold">Pact Go-To Legging</td>
                    <td className="p-3 border-b">$38–$44</td>
                    <td className="p-3 border-b text-brand-dark font-semibold">~$25</td>
                    <td className="p-3 border-b"><span className="bg-brand text-white px-2 py-0.5 rounded text-xs">79/100</span></td>
                    <td className="p-3 border-b">Everyday organic basics, best overall value</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 border-b font-semibold">Pact Boxer Briefs (3-pk)</td>
                    <td className="p-3 border-b">~$42</td>
                    <td className="p-3 border-b text-brand-dark font-semibold">~$12/pair</td>
                    <td className="p-3 border-b"><span className="bg-brand text-white px-2 py-0.5 rounded text-xs">79/100</span></td>
                    <td className="p-3 border-b">Cheapest entry to verified organic underwear</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 border-b font-semibold">Patagonia Baggies 5&quot;</td>
                    <td className="p-3 border-b">$65</td>
                    <td className="p-3 border-b text-brand-dark font-semibold">~$44</td>
                    <td className="p-3 border-b"><span className="bg-brand text-white px-2 py-0.5 rounded text-xs">95/100</span></td>
                    <td className="p-3 border-b">Maximum sustainability rigor (on sale)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* HSS Score Reference */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Stern but Fair: What the Scores Mean</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-bold text-gray-900 border-b">HSS Range</th>
                    <th className="text-left p-3 font-bold text-gray-900 border-b">Rating</th>
                    <th className="text-left p-3 font-bold text-gray-900 border-b">What It Means</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white"><td className="p-3 border-b font-semibold">90–100</td><td className="p-3 border-b">★★★★★ Excellent</td><td className="p-3 border-b">Verifiable evidence across all 5 pillars. Industry-leading.</td></tr>
                  <tr className="bg-gray-50"><td className="p-3 border-b font-semibold">75–89</td><td className="p-3 border-b">★★★★☆ Very Good</td><td className="p-3 border-b">Strong evidence in most pillars. Credible with some gaps.</td></tr>
                  <tr className="bg-white"><td className="p-3 border-b font-semibold">50–74</td><td className="p-3 border-b">★★★☆☆ Moderate</td><td className="p-3 border-b">Partial evidence. Some certifications but significant gaps.</td></tr>
                  <tr className="bg-gray-50"><td className="p-3 border-b font-semibold">Below 50</td><td className="p-3 border-b">★★☆☆☆ Weak</td><td className="p-3 border-b">Self-reported claims only or insufficient disclosure.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Seasonal Timing */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">When Is the Cheapest Time to Buy Sustainable Basics?</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-bold text-gray-900 border-b">Timing</th>
                    <th className="text-left p-3 font-bold text-gray-900 border-b">What to Watch</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white"><td className="p-3 border-b font-semibold">Earth Month (April)</td><td className="p-3 border-b">Both Pact and Patagonia run strong promos</td></tr>
                  <tr className="bg-gray-50"><td className="p-3 border-b font-semibold">Memorial Day (late May)</td><td className="p-3 border-b">Seasonal transition sales</td></tr>
                  <tr className="bg-white"><td className="p-3 border-b font-semibold">Patagonia Web Specials</td><td className="p-3 border-b">Ongoing — check patagonia.com regularly</td></tr>
                  <tr className="bg-gray-50"><td className="p-3 border-b font-semibold">Black Friday / Cyber Week</td><td className="p-3 border-b">Deep discounts, but verify stock early</td></tr>
                  <tr className="bg-white"><td className="p-3 border-b font-semibold">REI Anniversary Sale (May)</td><td className="p-3 border-b">Patagonia Baggies often included</td></tr>
                  <tr className="bg-gray-50"><td className="p-3 border-b font-semibold">End-of-Season (Aug/Jan)</td><td className="p-3 border-b">Clearance pricing, limited sizing</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Why Hummlan's Ratings Are Stricter */}
          <section className="mb-16 bg-brand-light rounded-2xl p-8 border border-brand-light">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Hummlan&apos;s Ratings Are Stricter Than Typical &quot;Eco&quot; Lists</h2>
            <ol className="list-decimal pl-5 space-y-4 text-gray-700">
              <li><strong>EU Taxonomy-aligned pillars</strong> — We don&apos;t just ask &quot;is this green?&quot; We assess specific environmental objectives: climate, circularity, pollution, biodiversity, and supply chain.</li>
              <li><strong>CSRD-style evidence standards</strong> — We weight third-party verified proof (certifications, audited reports, public disclosures) higher than self-reported claims.</li>
              <li><strong>No greenwashing passes</strong> — A brand can have excellent marketing and still score lower if evidence is weak.</li>
              <li><strong>Price-agnostic scoring</strong> — A low price doesn&apos;t hurt a brand&apos;s HSS, and a high price doesn&apos;t help. We rate sustainability independently so you can find the cheapest sustainable option.</li>
            </ol>
          </section>

          {/* FAQ Section */}
          <section className="mb-16" id="faq">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQ: Affordable Sustainable Basics</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Is affordable sustainable clothing actually possible?',
                  a: 'Yes — especially for high-use basics like leggings, underwear, and shorts. Focus on multipacks and seasonal sales from brands with verifiable certifications. Pact\'s sale pricing (~$25 for leggings) is now competitive with conventional mid-tier brands.',
                },
                {
                  q: 'How does organic cotton compare to recycled materials?',
                  a: 'Both have sustainability advantages. Organic cotton eliminates pesticides and supports soil health (biodiversity win). Recycled materials (like Patagonia\'s NetPlus®) reduce virgin resource extraction and waste. Neither is universally "better" — the best choice depends on which impact you prioritize. Our HSS accounts for both.',
                },
                {
                  q: 'Why include Patagonia if MSRP is over $50?',
                  a: 'Because the Baggies Shorts regularly drop to ~$44 during sale windows while maintaining a 95/100 HSS — the highest sustainability score in our database.',
                },
                {
                  q: 'Are cheaper sustainable products lower quality?',
                  a: 'Not inherently. Lower price can reflect direct-to-consumer models (Pact), multipack economics (Pact boxers), or seasonal markdowns — not lower standards.',
                },
                {
                  q: 'How does Pact compare to Patagonia on sustainability?',
                  a: 'Pact (79/100) is a strong entry-level sustainable brand. Patagonia (95/100) is a best-in-class leader with circular economy programs and deeper supply chain transparency. Both pass our stern threshold.',
                },
                {
                  q: 'Do you update scores when brands improve?',
                  a: 'Yes. We monitor certification renewals, new disclosures, and material changes. If Pact adds a circular economy program or Patagonia transitions to 100% PFC-free DWR, their HSS will reflect it.',
                },
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
            <div className="space-y-4 text-brand-light">
              <p>If you&apos;re looking for <strong className="text-white">affordable sustainable clothing</strong> that won&apos;t break the bank or your ethics:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Start with Pact</strong> for everyday basics. Their Go-To Legging at ~$25 and Boxer Briefs at ~$10/pair in multipacks are the strongest price-to-sustainability ratios in this guide.</li>
                <li><strong>Watch Patagonia sale windows</strong> for the Baggies Shorts if you want the highest-rigor sustainability rating at a reachable price point.</li>
                <li><strong>Use our price comparison tables</strong> to decide based on your specific category need and budget.</li>
              </ul>
              <p className="text-brand-light text-sm pt-4 italic">Hummlan will continue updating tracked prices and HSS scores as new certifications, disclosures, and deal patterns emerge. This is not a static guide — it&apos;s a living comparison.</p>
            </div>
          </section>

          {/* Publishing Meta */}
          <div className="text-sm text-gray-500 border-t pt-6">
            <p><strong>Internal links:</strong> <Link href="/best-of" className="text-brand hover:underline">Best Of hub</Link> · <Link href="/about" className="text-brand hover:underline">Our Methodology</Link> · <Link href="/shop" className="text-brand hover:underline">Shop</Link></p>
            <p className="mt-2">Guide published: June 2025 | Prices and ratings checked as of publication date. Sustainability scores are updated as new evidence becomes available.</p>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <Link href="/" className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
              <HummlanBeeMark className="w-10 h-10" />
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
            <p className="text-gray-400 text-xs max-w-2xl mx-auto leading-relaxed">
              Hummlan is an independent comparison site. We earn affiliate commissions from some of
              the stores we link to, which helps fund our in-depth sustainability research and stern
              rating framework.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}