import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ShoppingBag, ShieldCheck, Scale, CheckCircle } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterSignup';
import HummlanBeeMark from '@/components/HummlanBeeMark';
import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  absoluteUrl,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Cheapest Sustainable Products Ranked',
  description:
    'Compare sustainable products by strict EU Taxonomy + CSRD-aligned ratings and find the cheapest live offers in one place.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hummlan.com | Cheapest Sustainable Products Ranked',
    description:
      'Compare sustainable products by strict EU Taxonomy + CSRD-aligned ratings and find the cheapest live offers in one place.',
    url: '/',
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Hummlan.com homepage social preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hummlan.com | Cheapest Sustainable Products Ranked',
    description:
      'Compare sustainable products by strict EU Taxonomy + CSRD-aligned ratings and find the cheapest live offers in one place.',
    images: [DEFAULT_OG_IMAGE],
  },
};

async function getCategories() {
  const rs = await db.execute('SELECT * FROM categories WHERE parent_id IS NULL LIMIT 8');
  return rs.rows;
}

async function getFeaturedProducts() {
  const rs = await db.execute(`
    SELECT p.*, b.name as brand_name, b.overall_sustainability_score as brand_score, MIN(al.price) as min_price
    FROM products p
    JOIN brands b ON p.brand_id = b.id
    LEFT JOIN affiliate_links al ON p.id = al.product_id
    GROUP BY p.id
    ORDER BY b.overall_sustainability_score DESC
    LIMIT 8
  `);
  return rs.rows;
}

export default async function Home() {
  const categories = await getCategories();
  const products = await getFeaturedProducts();

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${SITE_NAME} | Cheapest Sustainable Products Ranked`,
    description: SITE_DESCRIPTION,
    url: absoluteUrl('/'),
    mainEntity: {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      itemListElement: products.map((product: any, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(`/product/${product.slug}`),
        name: product.name,
      })),
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <HummlanBeeMark className="w-8 h-8 text-orange-600" />
            Hummlan.com
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-gray-900 font-medium hover:text-orange-700">
              Home
            </Link>
            <Link href="/search" className="text-gray-600 font-medium hover:text-orange-700">
              Search
            </Link>
            <Link href="/learn" className="text-gray-600 font-medium hover:text-orange-700">
              Learn
            </Link>
            <Link href="/best-of" className="text-gray-600 font-medium hover:text-orange-700">
              Best Of
            </Link>
            <Link href="/about" className="text-gray-600 font-medium hover:text-orange-700">
              Our Stern Standards
            </Link>
            <Link href="/eu-taxonomy" className="text-gray-600 font-medium hover:text-orange-700">
              EU Taxonomy
            </Link>
            <Link href="/csrd" className="text-gray-600 font-medium hover:text-orange-700">
              CSRD
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
        />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-700 to-orange-900 py-24 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Sustainable shopping, <br className="hidden md:block" /> without the greenwash.
            </h1>
            <p className="text-xl text-orange-50 mb-10 max-w-2xl mx-auto font-medium">
              We find the cheapest prices for products that actually meet our stern "Hummlan
              Sustainability Score" — grounded in EU Taxonomy and CSRD-aligned evidence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#featured"
                className="bg-white text-orange-800 px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg"
              >
                Shop Sustainable Finds
              </a>
              <Link
                href="/about"
                className="bg-orange-800/50 backdrop-blur-sm border border-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-800/70 transition-colors"
              >
                Our Methodology
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm font-medium text-orange-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-orange-300" />
                EU Taxonomy Based
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-orange-300" />
                CSRD Aligned
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-orange-300" />
                Stern & Fair Ratings
              </div>
            </div>
          </div>
        </section>

        {/* Features/Stats */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-orange-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Stern Ratings</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    No marketing fluff. We use hard data from third-party certifications and
                    corporate reports.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Scale className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Fair Comparisons</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We show you the cheapest prices available across multiple eco-conscious
                    retailers.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <HummlanBeeMark className="w-6 h-6 text-orange-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">EU Taxonomy Standard</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Our backbone is the EU&apos;s own framework for sustainable activities. Zero
                    greenwashing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="featured" className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  High Performance, High Sustainability
                </h2>
                <p className="text-gray-600">The best rated products by our stern HSS framework.</p>
              </div>
              <Link href="/shop" className="text-orange-700 font-bold hover:underline hidden sm:block">
                View All Products →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product: any) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group bg-white border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className="aspect-square bg-gray-50 flex items-center justify-center relative">
                    <ShoppingBag className="w-16 h-16 text-gray-200 group-hover:scale-110 group-hover:text-orange-100 transition-all duration-500" />
                    <div className="absolute top-4 right-4 bg-orange-700 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                      HSS: {product.brand_score}/100
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-xs text-orange-700 font-bold uppercase tracking-wider mb-2">
                      {product.brand_name}
                    </p>
                    <h3 className="font-bold text-gray-900 mb-4 group-hover:text-orange-800 transition-colors leading-snug flex-grow">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                      <p className="text-lg font-extrabold text-gray-900">
                        {product.min_price ? `$${product.min_price}` : 'Check Price'}
                      </p>
                      <span className="text-sm font-bold text-orange-700">View Deals →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <NewsletterSignup />

        {/* Categories Section */}
        <section className="bg-gray-900 py-24 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Focused research across multiple categories to find the most sustainable options for
                your daily life.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category: any) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="group bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-orange-600 hover:bg-gray-800/50 transition-all"
                >
                  <h3 className="font-bold text-xl mb-3 group-hover:text-orange-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">{category.description}</p>
                  <span className="text-orange-600 font-bold text-sm">Explore {category.name} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <Link href="/" className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
              <HummlanBeeMark className="w-10 h-10 text-orange-600" />
              Hummlan.com
            </Link>
            <nav className="flex flex-wrap justify-center gap-8 text-sm font-bold text-gray-500 uppercase tracking-widest">
              <Link href="/search" className="hover:text-orange-700">
                Search
              </Link>
              <Link href="/learn" className="hover:text-orange-700">
                Learn
              </Link>
              <Link href="/best-of" className="hover:text-orange-700">
                Best Of
              </Link>
              <Link href="/about" className="hover:text-orange-700">
                Our Standards
              </Link>
              <Link href="/eu-taxonomy" className="hover:text-orange-700">
                EU Taxonomy
              </Link>
              <Link href="/csrd" className="hover:text-orange-700">
                CSRD
              </Link>
              <Link href="/privacy" className="hover:text-orange-700">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-orange-700">
                Terms
              </Link>
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
