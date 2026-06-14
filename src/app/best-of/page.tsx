import type { Metadata } from 'next';
import Link from 'next/link';
import { Bug, BookOpen, Star, TrendingUp, ArrowRight } from 'lucide-react';
import { SITE_NAME, absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Best Of — Curated Sustainable Product Guides',
  description:
    'Hummlan\'s curated "Best Of" guides. Every product rigorously rated by our EU Taxonomy & CSRD-aligned sustainability framework. Find the cheapest prices for the most sustainable products, vetted and verified.',
  alternates: {
    canonical: '/best-of',
  },
  openGraph: {
    title: 'Best Of — Curated Sustainable Product Guides | Hummlan.com',
    description:
      'Every product rigorously rated by our EU Taxonomy & CSRD-aligned sustainability framework. Find the cheapest prices for the most sustainable products, vetted and verified.',
    url: '/best-of',
    type: 'website',
    images: [
      {
        url: '/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'Hummlan.com Best Of — Curated Sustainable Product Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Of — Curated Sustainable Product Guides | Hummlan.com',
    description:
      'Every product rigorously rated by our EU Taxonomy & CSRD-aligned sustainability framework.',
    images: ['/og-default.svg'],
  },
};

const guides = [
  {
    slug: 'affordable-sustainable-basics-under-50',
    title: 'The Most Affordable Organic & Sustainable Basics (Under $50)',
    description:
      'We found the cheapest sustainable basics that pass our stern EU Taxonomy & CSRD-aligned ratings. Pact leggings from $25, boxers from $10/pair, and Patagonia Baggies shorts from $44 on sale.',
    primaryKeyword: 'affordable sustainable clothing',
    hssRange: '79–95/100',
    priceRange: '$10–$50',
    brandCount: 2,
    productCount: 3,
    date: 'June 2025',
    icon: '👕',
  },
  {
    slug: 'affordable-sustainable-home-essentials',
    title: 'The Most Affordable Sustainable Home Essentials (Under $20)',
    description:
      'We found the cheapest eco-friendly dish soaps, laundry detergents, and cleaners that pass our stern EU Taxonomy & CSRD-aligned ratings. Starting at $0.04/use.',
    primaryKeyword: 'affordable sustainable home essentials',
    hssRange: '84–93/100',
    priceRange: '$3.79–$20',
    brandCount: 5,
    productCount: 5,
    date: 'June 2025',
    icon: '🧹',
  },
];

export default function BestOfHub() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bug className="w-8 h-8 text-yellow-500 fill-yellow-500" aria-label="Hummlan bumblebee logo" />
            Hummlan.com
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-gray-600 font-medium hover:text-green-600">Home</Link>
            <Link href="/best-of" className="text-gray-900 font-bold hover:text-green-600">Best Of</Link>
            <Link href="/about" className="text-gray-600 font-medium hover:text-green-600">Our Stern Standards</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hub Header */}
        <section className="bg-gradient-to-br from-green-600 to-green-800 py-20 text-center text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <BookOpen className="w-10 h-10 text-green-200" />
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Best Of Guides</h1>
            </div>
            <p className="text-xl text-green-50 max-w-2xl mx-auto leading-relaxed">
              Our curated collection of product guides — every pick rigorously vetted by our
              <strong className="text-white"> Stern but Fair Rating System</strong>, backed by EU Taxonomy
              and CSRD principles. No greenwashing. Just the best sustainable products at the
              cheapest prices.
            </p>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            {guides.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-500 mb-2">Coming Soon</h2>
                <p className="text-gray-400">Our first Best Of guide is being prepared. Check back shortly!</p>
              </div>
            ) : (
              <div className="space-y-8">
                {guides.map((guide, i) => (
                  <Link
                    key={guide.slug}
                    href={`/best-of/${guide.slug}`}
                    className="block group bg-white rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex items-start gap-6">
                        <div className="hidden md:flex text-5xl mt-1" role="img" aria-label="Guide category icon">
                          {guide.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                              New
                            </span>
                            <span className="text-gray-400 text-sm">{guide.date}</span>
                          </div>
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                            {guide.title}
                          </h2>
                          <p className="text-gray-600 leading-relaxed mb-6">{guide.description}</p>

                          <div className="flex flex-wrap gap-4 mb-6">
                            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg text-sm">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-medium text-gray-700">HSS: {guide.hssRange}</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg text-sm">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              <span className="font-medium text-gray-700">{guide.priceRange}</span>
                            </div>
                            <div className="bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700">
                              {guide.productCount} products · {guide.brandCount} brands
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-green-600 font-bold group-hover:gap-3 transition-all">
                            Read the full guide
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* What to expect section */}
            <section className="mt-16 bg-white rounded-2xl border shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What Makes a &quot;Best Of&quot; Guide?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4">
                  <div className="text-3xl mb-3">🔬</div>
                  <h3 className="font-bold text-gray-900 mb-2">Rigorous Rating</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Every product is scored across 5 EU Taxonomy-aligned pillars: Climate, Circular Economy,
                    Pollution, Supply Chain, and Biodiversity.
                  </p>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-3">💰</div>
                  <h3 className="font-bold text-gray-900 mb-2">Price Reality</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We verify the cheapest available price through sale patterns, multipack options, and
                    secondhand alternatives — not just MSRP.
                  </p>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-3">📋</div>
                  <h3 className="font-bold text-gray-900 mb-2">Stern Critique</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We call out what&apos;s missing from each brand — no free passes. If there&apos;s no circular
                    economy program or microplastic data, we flag it.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA to methodology */}
            <section className="mt-8 text-center">
              <p className="text-gray-500 mb-4">Want to understand how we rate products?</p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors"
              >
                Read our full methodology →
              </Link>
            </section>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <Link href="/" className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
              <Bug className="w-10 h-10 text-yellow-500 fill-yellow-500" aria-label="Hummlan bumblebee logo" />
              Hummlan.com
            </Link>
            <nav className="flex gap-8 text-sm font-bold text-gray-500 uppercase tracking-widest">
              <Link href="/best-of" className="hover:text-green-600">Best Of</Link>
              <Link href="/about" className="hover:text-green-600">Our Standards</Link>
              <Link href="/privacy" className="hover:text-green-600">Privacy</Link>
              <Link href="/terms" className="hover:text-green-600">Terms</Link>
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