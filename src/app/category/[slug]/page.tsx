import type { Metadata } from 'next';
import { cache } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ShoppingBag, ChevronRight, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from '@/lib/seo';
import HummlanBeeMark from '@/components/HummlanBeeMark';

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
      LEFT JOIN affiliate_links al ON p.id = al.product_id
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
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <HummlanBeeMark className="w-8 h-8 text-orange-600" />
            Hummlan.com
          </Link>
          <nav className="flex gap-2 items-center text-sm text-gray-500 font-medium">
            <Link href="/" className="hover:text-orange-700">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{category.name}</span>
          </nav>
        </div>
      </header>

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
                <p className="text-lg text-gray-600 max-w-2xl">{category.description}</p>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-xl border">
                <Link
                  href={`/category/${slug}?sort=sustainability`}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${sort === 'sustainability' ? 'bg-white shadow-sm text-orange-700' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Most Sustainable
                </Link>
                <Link
                  href={`/category/${slug}?sort=price`}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${sort === 'price' ? 'bg-white shadow-sm text-orange-700' : 'text-gray-500 hover:text-gray-700'}`}
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
                    <span className="text-sm font-bold text-orange-700">Compare Deals →</span>
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
                className="mt-6 inline-block bg-orange-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-800 transition-colors"
              >
                Explore Other Categories
              </Link>
            </div>
          )}
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
            © 2025 Hummlan.com. All products are evaluated by our stern sustainability framework.
          </p>
        </div>
      </footer>
    </div>
  );
}
