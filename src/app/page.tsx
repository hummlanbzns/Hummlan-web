import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ShieldCheck, Scale, CheckCircle, Search, ArrowRight } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterSignup';
import HummlanBeeMark from '@/components/HummlanBeeMark';
import SearchForm from '@/components/SearchFormWrapper';
import BrandLogo from '@/components/BrandLogo';
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
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Hummlan.com | Cheapest Sustainable Products Ranked',
    description: 'Compare sustainable products by strict EU Taxonomy + CSRD-aligned ratings and find the cheapest live offers in one place.',
    url: '/', type: 'website',
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Hummlan.com homepage social preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hummlan.com | Cheapest Sustainable Products Ranked',
    description: 'Compare sustainable products by strict EU Taxonomy + CSRD-aligned ratings and find the cheapest live offers in one place.',
    images: [DEFAULT_OG_IMAGE],
  },
};

async function getCategories() {
  const rs = await db.execute('SELECT * FROM categories WHERE parent_id IS NULL LIMIT 8');
  return rs.rows;
}

async function getBrands() {
  const rs = await db.execute(`
    SELECT DISTINCT b.id, b.name, b.slug, b.overall_sustainability_score, b.description, b.logo_url,
           c.name as category_name, c.slug as category_slug
    FROM brands b
    LEFT JOIN products p ON p.brand_id = b.id
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE b.overall_sustainability_score IS NOT NULL
    ORDER BY b.overall_sustainability_score DESC
  `);
  return rs.rows;
}

function scoreColor(score: number) {
  if (score >= 70) return { text: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200' };
  if (score >= 50) return { text: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200' };
  if (score >= 30) return { text: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-200' };
  return { text: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200' };
}

const categoryHighlights: Record<string, string> = {
  'personal-care': 'Zero-plastic packaging & certified organic ingredients',
  'food': '100% traceable, organic, & fair-trade certified essentials',
  'fashion': 'Recycled materials & fair-wear certified supply chains',
  'household': 'Cruelty-free, plant-based formulas & zero-waste options',
};

export default async function Home() {
  const categories = await getCategories();
  const brands = await getBrands();

  // Deduplicate brands by slug (Shein appeared twice due to multiple categories)
  const seen = new Set<string>();
  const uniqueBrands = brands.filter((b: any) => {
    if (seen.has(b.slug)) return false;
    seen.add(b.slug);
    return true;
  });

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${SITE_NAME} | Cheapest Sustainable Products Ranked`,
    description: SITE_DESCRIPTION,
    url: absoluteUrl('/'),
    mainEntity: {
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      itemListElement: uniqueBrands.map((brand: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(`/brand/${brand.slug}`),
        name: brand.name,
      })),
    },
  };

  return (
    <div className="bg-gray-50">
      <main className="flex-grow">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />

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
              We find the cheapest prices for products that actually meet our stern &ldquo;Hummlan
              Sustainability Score&rdquo; &mdash; grounded in EU Taxonomy and CSRD-aligned evidence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#brands" className="bg-white text-orange-800 px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg">
                Browse All Brands
              </a>
              <Link href="/about" className="bg-orange-800/50 backdrop-blur-sm border border-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-800/70 transition-colors">
                Our Methodology
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm font-medium text-orange-100">
              <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-300" /> EU Taxonomy Based</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-300" /> CSRD Aligned</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-300" /> Stern &amp; Fair Ratings</div>
            </div>
          </div>
        </section>

        {/* Features/Stats */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border">
                <div className="p-3 bg-orange-100 rounded-xl"><ShieldCheck className="w-6 h-6 text-orange-700" /></div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Stern Ratings</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">No marketing fluff. We use hard data from third-party certifications and corporate reports.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border">
                <div className="p-3 bg-blue-100 rounded-xl"><Scale className="w-6 h-6 text-blue-600" /></div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Fair Comparisons</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">We show you the cheapest prices available across multiple eco-conscious retailers.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border">
                <div className="p-3 bg-orange-100 rounded-xl"><HummlanBeeMark className="w-6 h-6 text-orange-700" /></div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">EU Taxonomy Standard</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Our backbone is the EU&apos;s own framework for sustainable activities. Zero greenwashing.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Bar Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <div className="inline-flex p-3 bg-orange-100 rounded-2xl mb-4"><Search className="w-8 h-8 text-orange-600" /></div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Search Any Brand</h2>
            <p className="text-gray-600 mb-6">Look up any brand&rsquo;s HSS rating &mdash; even if we don&rsquo;t sell their products.</p>
            <SearchForm initialQuery="" />
          </div>
        </section>

        {/* All Brands Rated */}
        <section id="brands" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">All Brands Rated</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Every brand in our database, ranked by the Hummlan Sustainability Score (HSS) &mdash; a stern 5-pillar assessment grounded in EU Taxonomy and CSRD standards.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {uniqueBrands.map((brand: any) => {
                const colors = scoreColor(brand.overall_sustainability_score);
                return (
                  <Link
                    key={brand.id}
                    href={`/brand/${brand.slug}`}
                    className="group bg-white border rounded-2xl p-6 hover:shadow-lg hover:border-orange-200 transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <BrandLogo name={brand.name} logoUrl={brand.logo_url} size={36} score={brand.overall_sustainability_score} className="shrink-0" />
                        <div className="min-w-0">
                          <h3 className="font-bold text-gray-900 group-hover:text-orange-700 transition-colors truncate">{brand.name}</h3>
                          {brand.category_name && (
                            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{brand.category_name}</span>
                          )}
                        </div>
                      </div>
                      <div className={`flex-shrink-0 ml-3 w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center border ${colors.border}`}>
                        <span className={`text-xl font-extrabold ${colors.text}`}>{brand.overall_sustainability_score}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 flex-grow mb-4">
                      {brand.description || 'No description available.'}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">View Rating</span>
                      <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Link href="/search" className="inline-flex items-center gap-2 bg-white border-2 border-orange-200 text-orange-700 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 hover:border-orange-400 transition-all">
                <Search className="w-5 h-5" /> Search All Brands &amp; Products
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-gray-900 py-24 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Focused research across multiple categories to find the most sustainable options for your daily life.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category: any) => (
                <Link key={category.id} href={`/category/${category.slug}`} className="group bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-orange-600 hover:bg-gray-800/50 transition-all">
                  <h3 className="font-bold text-xl mb-3 group-hover:text-orange-400 transition-colors">{category.name}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">{categoryHighlights[category.slug] || category.description}</p>
                  <span className="text-orange-600 font-bold text-sm">Explore {category.name} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <NewsletterSignup />
      </main>
    </div>
  );
}
