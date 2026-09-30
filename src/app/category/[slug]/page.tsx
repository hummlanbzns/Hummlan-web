import type { Metadata } from 'next';
import { cache } from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ChevronRight, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from '@/lib/seo';
import BrandLogo from '@/components/BrandLogo';

const getCategory = cache(async (slug: string) => {
  const rs = await db.execute({
    sql: 'SELECT * FROM categories WHERE slug = ?',
    args: [slug],
  });
  return rs.rows[0] as any;
});

// Rated brands in this category (direct or child categories). Brands link to
// categories through their products in the DB; product rows are kept but never
// rendered — the category page is a brands-by-category index only.
async function getBrandsInCategory(categoryId: string) {
  const rs = await db.execute({
    sql: `
      SELECT DISTINCT b.id, b.name, b.slug, b.description, b.logo_url,
             b.overall_sustainability_score
      FROM brands b
      JOIN products p ON p.brand_id = b.id
      WHERE (p.category_id = ? OR p.category_id IN (SELECT id FROM categories WHERE parent_id = ?))
        AND b.overall_sustainability_score IS NOT NULL
      ORDER BY b.overall_sustainability_score DESC, b.name ASC
    `,
    args: [categoryId, categoryId],
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
    `Browse ${category.name} brands rated by our strict Hummlan Sustainability Score.`;

  return {
    title: `${category.name} Brands — HSS Ratings`,
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
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const brands = await getBrandsInCategory(category.id);

  const categorySchema = brands.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} | ${SITE_NAME}`,
    description: category.description,
    url: absoluteUrl(`/category/${slug}`),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: brands.map((brand: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(`/brand/${brand.slug}`),
        name: brand.name,
      })),
    },
  } : null;

  const highlight: Record<string, string> = {
    'Personal Care': 'Zero-plastic packaging & certified organic ingredients',
    'Food': 'Regenerative farming & plastic-neutral supply chains',
    'Fashion': 'Fair-trade certified & low-impact natural fibres',
    'Household': 'Non-toxic formulations & plastic-waste reduction',
  }[category.name] || category.description;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow py-12">
        {categorySchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
          />
        )}

        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12 bg-white p-8 rounded-2xl border shadow-sm">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{category.name}</h1>
            <p className="text-lg text-gray-600 max-w-2xl">{highlight}</p>
            <p className="text-sm text-gray-500 mt-3">
              {brands.length} rated brand{brands.length === 1 ? '' : 's'} in this category — full 5-pillar HSS breakdowns on each brand page.
            </p>
          </div>

          <div className="mb-10 border rounded-2xl bg-blue-50 border-blue-100 p-5 flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900 leading-relaxed">
              Wondering how these ratings work? Read our{' '}
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

          {brands.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {brands.map((brand: any) => (
                <Link
                  key={brand.id}
                  href={`/brand/${brand.slug}`}
                  className="group bg-white border rounded-2xl p-6 hover:shadow-lg hover:border-orange-200 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <BrandLogo name={brand.name} logoUrl={brand.logo_url} size={36} score={brand.overall_sustainability_score} className="shrink-0" />
                      <h3 className="font-bold text-gray-900 group-hover:text-orange-700 transition-colors">{brand.name}</h3>
                    </div>
                    <div className="flex-shrink-0 ml-3 bg-orange-50 border border-orange-100 rounded-xl px-3 py-2 text-center">
                      <span className="block text-lg font-extrabold text-orange-700">{brand.overall_sustainability_score}</span>
                      <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">HSS</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-grow mb-4">
                    {brand.description || 'No description available.'}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">View Rating</span>
                    <ChevronRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-2xl border shadow-inner">
              <p className="text-xl text-gray-500 font-medium">No rated brands here yet.</p>
              <p className="text-gray-400 mt-2 max-w-md mx-auto">New HSS ratings are added regularly. Try the brand search instead.</p>
              <Link
                href="/search"
                className="mt-6 inline-block bg-brand text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-dark transition-colors"
              >
                Search All Brands
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}