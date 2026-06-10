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
import NewsletterSignup from '@/components/NewsletterSignup';
import { SITE_NAME, absoluteUrl, toOgImageUrl } from '@/lib/seo';
import HummlanBeeMark from '@/components/HummlanBeeMark';

const getProduct = cache(async (slug: string) => {
  const rs = await db.execute({
    sql: `
      SELECT p.*, b.name as brand_name, b.overall_sustainability_score as brand_score, c.name as category_name, c.slug as category_slug
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
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <HummlanBeeMark className="w-8 h-8 text-orange-600" />
            Hummlan.com
          </Link>
          <nav className="flex gap-2 items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-700">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/category/${product.category_slug}`} className="hover:text-orange-700">
              {product.category_name}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium truncate max-w-[150px]">{product.name}</span>
          </nav>
        </div>
      </header>

      <main className="flex-grow py-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />

        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image Placeholder */}
            <div className="aspect-square bg-white rounded-2xl flex items-center justify-center border shadow-sm overflow-hidden group">
              <ShoppingBag className="w-32 h-32 text-gray-200 group-hover:scale-110 transition-transform duration-500" />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <p className="text-orange-700 font-bold uppercase tracking-widest mb-2">{product.brand_name}</p>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>

                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="bg-orange-700 text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm">
                    <ShieldCheck className="w-4 h-4" />
                    HSS Rating: {product.brand_score}/100
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
                  <Award className="w-5 h-5 text-orange-700" />
                  Expert Verdict
                </h2>
                <p className="text-gray-700 leading-relaxed">{product.sustainability_summary}</p>
              </div>

              {/* Price Comparison Call-to-Action */}
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-6">
                <h2 className="text-xl font-bold text-orange-950 mb-4">Compare Prices & Buy</h2>
                <div className="space-y-3">
                  {links.map((link, index) => (
                    <div
                      key={link.id}
                      className={`flex items-center justify-between p-3 bg-white border rounded-lg transition-colors shadow-sm ${index === 0 ? 'border-orange-600 ring-1 ring-orange-600 ring-opacity-50' : 'hover:border-orange-300'}`}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">{link.vendor_name}</span>
                          {index === 0 && (
                            <span className="bg-orange-100 text-orange-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-tighter uppercase">
                              Cheapest
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-400 font-medium">AFFILIATE PARTNER</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-orange-800">${link.price}</span>
                        <a
                          href={link.affiliate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-orange-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-800 flex items-center gap-2 transition-colors"
                        >
                          Visit Store
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                  {links.length === 0 && (
                    <p className="text-gray-500 italic">No pricing information available yet.</p>
                  )}
                </div>
              </div>
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

          <NewsletterSignup />
        </div>
      </main>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 text-sm font-semibold mb-6 text-gray-600">
            <Link href="/about" className="hover:text-orange-700">Our Standards</Link>
            <Link href="/eu-taxonomy" className="hover:text-orange-700">EU Taxonomy</Link>
            <Link href="/csrd" className="hover:text-orange-700">CSRD</Link>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 Hummlan.com. Affiliate marketing helps support our stern and fair sustainability
            research.
          </p>
        </div>
      </footer>
    </div>
  );
}
