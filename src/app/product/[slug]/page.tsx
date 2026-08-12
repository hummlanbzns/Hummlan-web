import type { Metadata } from 'next';
import { cache } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import {
  ShoppingBag,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Award,
  TrendingDown,
  BookOpen,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import SustainabilityBreakdown from '@/components/SustainabilityBreakdown';
import { SITE_NAME, absoluteUrl, toOgImageUrl } from '@/lib/seo';
import HummlanBeeMark from '@/components/HummlanBeeMark';

const getProduct = cache(async (slug: string) => {
  const rs = await db.execute({
    sql: `
      SELECT p.*, b.name as brand_name, b.slug as brand_slug, b.overall_sustainability_score as brand_score, c.name as category_name, c.slug as category_slug
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN categories c ON p.category_id = c.id
      WHERE p.slug = ?
    `,
    args: [slug],
  });
  return rs.rows[0] as any;
});

const getAffiliateLinks = cache(async (productId: string) => {
  const rs = await db.execute({
    sql: 'SELECT * FROM affiliate_links WHERE product_id = ? AND is_active = 1 ORDER BY price ASC',
    args: [productId],
  });
  return rs.rows as any[];
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

function getProductDescription(product: any) {
  return (
    product?.sustainability_summary ||
    product?.description ||
    'Compare sustainability evidence and current affiliate pricing on Hummlan.com.'
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product not found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = getProductDescription(product);
  const ogImage = toOgImageUrl(product.image_url);

  return {
    title: `${product.name} (${product.brand_name})`,
    description,
    alternates: {
      canonical: `/product/${slug}`,
    },
    openGraph: {
      title: `${product.name} | ${SITE_NAME}`,
      description,
      type: 'website',
      url: `/product/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${product.name} social preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const links = await getAffiliateLinks(product.id);
  const ratings: any[] = await getSustainabilityRatings(product.brand_id);

  const cheapestPrice = links.length > 0 ? links[0].price : null;
  const description = getProductDescription(product);
  const ogImage = toOgImageUrl(product.image_url);

  const reviewSchema = ratings.length > 0
    ? ratings.map((r) => {
        const pillarName = r.source_name.replace('Hummlan Pillar: ', '');
        const score = r.rating_score ?? 0;
        const maxScore = r.max_score ?? 5;
        const reviewDescription = r.description || `Sustainability rating for ${pillarName}`;
        return {
          '@type': 'Review',
          author: {
            '@type': 'Organization',
            name: 'Hummlan.com',
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: Number(score),
            bestRating: Number(maxScore),
            worstRating: 0,
          },
          name: `${pillarName} Sustainability Rating`,
          description: reviewDescription,
        };
      })
    : [];

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description,
    sku: product.id,
    category: product.category_name,
    image: [
      ogImage.startsWith('http') ? ogImage : absoluteUrl(ogImage),
    ],
    brand: {
      '@type': 'Brand',
      name: product.brand_name,
    },
    aggregateRating: product.brand_score
      ? {
          '@type': 'AggregateRating',
          ratingValue: Number(product.brand_score) / 20,
          bestRating: 5,
          worstRating: 1,
          ratingCount: Math.max(ratings.length, 1),
        }
      : undefined,
    review: reviewSchema.length > 0 ? reviewSchema : undefined,
    offers: links.map((link: any) => ({
      '@type': 'Offer',
      priceCurrency: link.currency || 'USD',
      price: Number(link.price),
      url: link.affiliate_url,
      seller: {
        '@type': 'Organization',
        name: link.vendor_name,
      },
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    })),
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <main className="flex-grow py-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />

        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb — category + brand internal links for SEO */}
          <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-brand">Home</Link></li>
              <li>/</li>
              <li>
                <Link href={`/category/${product.category_slug}`} className="hover:text-brand">
                  {product.category_name}
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-medium">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image Placeholder */}
            <div className="aspect-square bg-white rounded-2xl flex items-center justify-center border shadow-sm overflow-hidden group">
              <ShoppingBag className="w-32 h-32 text-gray-200 group-hover:scale-110 transition-transform duration-500" />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <Link
                  href={`/brand/${product.brand_slug}`}
                  className="text-brand font-bold uppercase tracking-widest mb-2 inline-block hover:text-brand-dark transition-colors"
                >
                  {product.brand_name}
                </Link>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>

                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="group/tooltip relative">
                    <div className="bg-brand text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm cursor-help">
                      <ShieldCheck className="w-4 h-4" />
                      HSS Rating: {product.brand_score}/100
                      <span className="inline-block w-3.5 h-3.5 rounded-full bg-white/20 text-center text-[10px] leading-3.5 font-bold">i</span>
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl z-50 leading-relaxed font-normal normal-case text-center">
                      Our Hummlan Sustainability Score (HSS) out of 100 measures brand alignment with strict EU Taxonomy criteria and CSRD reporting disclosures across 5 rigorous pillars.
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                  {cheapestPrice && (
                    <div className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm">
                      <TrendingDown className="w-4 h-4" />
                      From ${cheapestPrice}
                    </div>
                  )}
                </div>

                <p className="text-lg text-gray-600 leading-relaxed italic">"{product.description}"</p>
              </div>

              {/* Quick Summary */}
              <div className="bg-white border rounded-xl p-6 shadow-sm mb-8">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-brand" />
                  Expert Verdict
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.sustainability_summary ? (
                    product.sustainability_summary
                  ) : (
                    <>
                      This product is manufactured by{' '}
                      <Link href={`/brand/${product.brand_slug}`} className="text-brand font-semibold hover:underline">
                        {product.brand_name}
                      </Link>
                      {`, which achieves an overall Hummlan Sustainability Score of ${product.brand_score}/100. ${product.brand_name} is rigorously vetted across our five core sustainability pillars, including EU Taxonomy alignment and robust environmental disclosures. Check our detailed pillar breakdown below to see how this product scores across environmental and ethical standards.`}
                    </>
                  )}
                </p>
              </div>

              {/* Price Comparison Call-to-Action */}
              {links.length > 0 ? (
                <div className="bg-brand-light border border-brand-light rounded-xl p-6">
                  <h2 className="text-xl font-bold text-brand-dark mb-4">
                    {links.length === 1 ? 'Lowest Web Price Found' : 'Compare Prices & Buy'}
                  </h2>
                  <div className="space-y-3">
                    {links.map((link, index) => (
                      <div
                        key={link.id}
                        className={`flex items-center justify-between p-3 bg-white border rounded-lg transition-colors shadow-sm ${
                          links.length === 1
                            ? 'border-brand/20'
                            : index === 0
                              ? 'border-brand ring-1 ring-brand ring-opacity-50'
                              : 'hover:border-brand'
                        }`}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">{link.vendor_name}</span>
                            {index === 0 && links.length > 1 && (
                              <span className="bg-brand-light text-brand-dark text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-tighter uppercase">
                                Cheapest
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-400 font-medium">AFFILIATE PARTNER</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xl font-bold text-brand-dark">${link.price}</span>
                          <a
                            href={link.affiliate_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-brand text-white px-4 py-2 rounded-lg font-bold hover:bg-brand-dark flex items-center gap-2 transition-colors"
                          >
                            Visit Store
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-brand-light border border-brand-light rounded-xl p-6">
                  <h2 className="text-xl font-bold text-brand-dark mb-4">Compare Prices & Buy</h2>
                  <p className="text-gray-500 italic">No pricing information available yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Sustainability Breakdown */}
          <div className="max-w-4xl mx-auto mb-8">
            <SustainabilityBreakdown ratings={ratings} />
          </div>

          <div className="max-w-4xl mx-auto mb-16 border rounded-2xl bg-blue-50 border-blue-100 p-5 flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900 leading-relaxed">
              This score follows our published framework. See{' '}
              <Link href="/eu-taxonomy" className="underline font-semibold hover:text-blue-950">
                EU Taxonomy
              </Link>{' '}
              and{' '}
              <Link href="/csrd" className="underline font-semibold hover:text-blue-950">
                CSRD
              </Link>{' '}
              explainers for the evidence logic behind each rating pillar.
            </p>
          </div>

        </div>
      </main>

    </div>
  );
}
