import type { Metadata } from 'next';
import { cache } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { ShieldCheck, Award, ChevronRight, ShoppingBag, ExternalLink } from 'lucide-react';
import SustainabilityBreakdown from '@/components/SustainabilityBreakdown';
import BrandLogo from '@/components/BrandLogo';
import { SITE_NAME, absoluteUrl } from '@/lib/seo';

const getBrand = cache(async (slug: string) => {
  const rs = await db.execute({
    sql: 'SELECT * FROM brands WHERE slug = ?',
    args: [slug],
  });
  return rs.rows[0] as any;
});

async function getSustainabilityRatings(brandId: string) {
  const rs = await db.execute({
    sql: `
      SELECT * FROM sustainability_ratings
      WHERE entity_id = ? AND source_name LIKE 'Hummlan Pillar:%'
      ORDER BY source_name ASC
    `,
    args: [brandId],
  });
  return rs.rows;
}

async function getBrandProducts(brandId: string) {
  const rs = await db.execute({
    sql: `
      SELECT p.slug, p.name, p.description, MIN(al.price) as min_price
      FROM products p
      LEFT JOIN affiliate_links al ON p.id = al.product_id
      WHERE p.brand_id = ?
      GROUP BY p.id
      ORDER BY p.name ASC
      LIMIT 12
    `,
    args: [brandId],
  });
  return rs.rows as any[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrand(slug);

  if (!brand) {
    return {
      title: 'Brand not found',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${brand.name} Sustainability Rating (HSS: ${brand.overall_sustainability_score}/100)`,
    description: brand.description || `Full Hummlan Sustainability Score breakdown for ${brand.name}. See how ${brand.name} scores across all 5 HSS pillars.`,
    alternates: { canonical: `/brand/${slug}` },
    openGraph: {
      title: `${brand.name} | ${SITE_NAME}`,
      description: `HSS Rating: ${brand.overall_sustainability_score}/100. Detailed 5-pillar sustainability assessment for ${brand.name}.`,
      url: `/brand/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${brand.name} | ${SITE_NAME}`,
      description: `HSS Rating: ${brand.overall_sustainability_score}/100. Detailed 5-pillar sustainability assessment for ${brand.name}.`,
    },
  };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = await getBrand(slug);

  if (!brand) {
    notFound();
  }

  const ratings: any[] = await getSustainabilityRatings(brand.id);
  const products = await getBrandProducts(brand.id);

  const scoreColor =
    brand.overall_sustainability_score >= 70 ? 'text-green-600' :
    brand.overall_sustainability_score >= 50 ? 'text-yellow-600' :
    brand.overall_sustainability_score >= 30 ? 'text-orange-600' :
    'text-red-600';

  const scoreBg =
    brand.overall_sustainability_score >= 70 ? 'bg-green-100' :
    brand.overall_sustainability_score >= 50 ? 'bg-yellow-100' :
    brand.overall_sustainability_score >= 30 ? 'bg-orange-100' :
    'bg-red-100';

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-brand">Home</Link></li>
              <li>/</li>
              <li><Link href="/search" className="hover:text-brand">Search</Link></li>
              <li>/</li>
              <li className="text-gray-900 font-medium">{brand.name}</li>
            </ol>
          </nav>

          {/* Hero Section */}
          <div className="bg-white rounded-2xl border shadow-sm p-8 md:p-12 mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-1">
                <p className="text-brand font-bold uppercase tracking-widest mb-2 text-sm">Brand Rating</p>
                <div className="flex items-center gap-4 mb-4">
                  <BrandLogo name={brand.name} logoUrl={brand.logo_url} size={80} score={brand.overall_sustainability_score} />
                  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{brand.name}</h1>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">{brand.description || `Sustainability assessment for ${brand.name}.`}</p>
                <div className="flex flex-wrap gap-4">
                  <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-xl ${scoreBg} border`}>
                    <ShieldCheck className={`w-6 h-6 ${scoreColor}`} />
                    <div>
                      <p className={`text-2xl font-extrabold ${scoreColor}`}>{brand.overall_sustainability_score}/100</p>
                      <p className="text-xs text-gray-500 font-medium">Hummlan Sustainability Score</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl border min-w-[200px]">
                <p className="text-6xl font-extrabold text-gray-900 mb-2">{brand.overall_sustainability_score}</p>
                <p className="text-sm text-gray-500 font-medium">out of 100</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      brand.overall_sustainability_score >= 70 ? 'bg-green-500' :
                      brand.overall_sustainability_score >= 50 ? 'bg-yellow-500' :
                      brand.overall_sustainability_score >= 30 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${brand.overall_sustainability_score}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sustainability Breakdown */}
          <div className="mb-8">
            <SustainabilityBreakdown ratings={ratings} />
          </div>

          {/* Products Section */}
          {products.length > 0 && (
            <div className="bg-white rounded-2xl border shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-brand" />
                {brand.name} Products We Track
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product: any) => (
                  <Link
                    key={product.slug}
                    href={`/product/${product.slug}`}
                    className="flex items-center justify-between p-4 border rounded-xl hover:border-brand hover:shadow-sm transition-all group"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-brand-dark transition-colors">{product.name}</p>
                      {product.min_price && (
                        <p className="text-sm text-gray-500 mt-1">From ${product.min_price}</p>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Learn More */}
          <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5 flex items-start gap-3">
            <Award className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900 leading-relaxed">
              Our ratings are <strong>"stern but fair"</strong>, based on third-party certifications and
              EU Taxonomy + CSRD alignment. Learn more about{' '}
              <Link href="/eu-taxonomy" className="underline font-semibold hover:text-blue-950">EU Taxonomy</Link>{' '}
              and{' '}
              <Link href="/csrd" className="underline font-semibold hover:text-blue-950">CSRD</Link>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}