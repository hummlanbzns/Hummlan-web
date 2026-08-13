import type { Metadata } from 'next';
import { cache } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ShoppingBag, ChevronRight, BookOpen, Info } from 'lucide-react';
import { notFound } from 'next/navigation';
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from '@/lib/seo';

const getCategory = cache(async (slug: string) => {
  const rs = await db.execute({
    sql: 'SELECT * FROM categories WHERE slug = ?',
    args: [slug],
  });
  return rs.rows[0] as any;
});

async function getProductsInCategory(categoryId: string, sortBy: string = 'sustainability') {
  const orderClause = sortBy === 'price' ? 'MIN(al.price) ASC' : 'b.overall_sustainability_score DESC';

  const rs = await db.execute({
    sql: `
      SELECT p.*, b.name as brand_name, b.overall_sustainability_score as brand_score, MIN(al.price) as min_price
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      LEFT JOIN affiliate_links al ON p.id = al.product_id AND al.is_active = 1 AND al.affiliate_url NOT LIKE '%search%'
      WHERE p.category_id = ?
      GROUP BY p.id
      ORDER BY ${orderClause}
    `,
    args: [categoryId],
  });
  return rs.rows;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: 'Category not found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    category.description ||
    `Browse ${category.name} products ranked by strict sustainability evidence and cheapest available prices.`;

  return {
    title: `${category.name} Deals`,
    description,
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title: `${category.name} | ${SITE_NAME}`,
      description,
      url: `/category/${slug}`,
      type: 'website',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${category.name} category social preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} | ${SITE_NAME}`,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { slug } = await params;
  const { sort = 'sustainability' } = await searchParams;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsInCategory(category.id, sort);

  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} | ${SITE_NAME}`,
    description: category.description,
    url: absoluteUrl(`/category/${slug}`),
    mainEntity: {
      '@type': 'ItemList',
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

      <main className="flex-grow py-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
        />

        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12 bg-white p-8 rounded-2xl border shadow-sm">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{category.name}</h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                  {
                    {
                      'Personal Care': 'Zero-plastic packaging & certified organic ingredients',
                      'Food': 'Regenerative farming & plastic-neutral supply chains',
                      'Fashion': 'Fair-trade certified & low-impact natural fibres',
                      'Household': 'Non-toxic formulations & plastic-waste reduction',
                    }[category.name] || category.description
                  }
                </p>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-xl border">
                <Link
                  href={`/category/${slug}?sort=sustainability`}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${sort === 'sustainability' ? 'bg-white shadow-sm text-brand' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Most Sustainable
                </Link>
                <Link
                  href={`/category/${slug}?sort=price`}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${sort === 'price' ? 'bg-white shadow-sm text-brand' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Cheapest
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-10 border rounded-2xl bg-blue-50 border-blue-100 p-5 flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900 leading-relaxed">
              Wondering how these rankings work? Read our{' '}
              <Link href="/eu-taxonomy" className="underline font-semibold hover:text-blue-950">
                EU Taxonomy guide
              </Link>{' '}
              and{' '}
              <Link href="/csrd" className="underline font-semibold hover:text-blue-950">
                CSRD explainer
              </Link>{' '}
              to see the evidence standards behind HSS.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group bg-white border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="aspect-square bg-gray-50 flex items-center justify-center relative">
                  {product.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-all duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <ShoppingBag className="w-16 h-16 text-gray-200 group-hover:scale-110 group-hover:text-brand-light transition-all duration-500" />
                  )}
                  <div className="absolute top-4 right-4 bg-brand text-white text-xs font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                    HSS: {product.brand_score}/100
                    <span className="group/tip relative inline-flex">
                      <Info className="w-3 h-3 text-white/70 cursor-help" />
                      <span className="absolute bottom-full right-0 mb-1.5 px-2 py-1 bg-gray-900 text-white text-[10px] rounded shadow-lg opacity-0 group-hover/tip:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        Hummlan Sustainability Score out of 100
                        <span className="absolute top-full right-2 border-4 border-transparent border-t-gray-900"></span>
                      </span>
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-xs text-brand font-bold uppercase tracking-wider mb-2">
                    {product.brand_name}
                  </p>
                  <h3 className="font-bold text-gray-900 mb-4 group-hover:text-brand-dark transition-colors leading-snug flex-grow">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <p className="text-lg font-extrabold text-gray-900">
                      {product.min_price ? `$${product.min_price}` : 'Check Price'}
                    </p>
                    <span className="text-sm font-bold text-brand">Compare Deals →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-24 bg-white rounded-2xl border shadow-inner">
              <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="text-xl text-gray-500 font-medium">No products found in this category yet.</p>
              <Link
                href="/"
                className="mt-6 inline-block bg-brand text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-dark transition-colors"
              >
                Explore Other Categories
              </Link>
            </div>
          )}
        </div>
      </main>

    </div>
  );
}
