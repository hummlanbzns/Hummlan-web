import type { MetadataRoute } from 'next';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://hummlan.com').replace(/\/$/, '');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/learn`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/learn/news`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/eu-taxonomy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/csrd`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Categories that contain at least one rated brand (category pages are
  // now brands-by-category indexes).
  let categories: any[] = [];
  try {
    const rs = await db.execute(`
      SELECT DISTINCT c.slug FROM categories c
      WHERE EXISTS (
        SELECT 1 FROM products p
        JOIN brands b ON b.id = p.brand_id
        WHERE (p.category_id = c.id OR p.category_id IN (SELECT id FROM categories WHERE parent_id = c.id))
          AND b.overall_sustainability_score IS NOT NULL
      )
    `);
    categories = rs.rows as any[];
  } catch (e) {
    console.error('Failed to fetch categories for sitemap:', e);
  }

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat: any) => ({
    url: `${SITE_URL}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // All rated brands
  let brands: any[] = [];
  try {
    const rs = await db.execute("SELECT slug, updated_at FROM brands WHERE overall_sustainability_score IS NOT NULL");
    brands = rs.rows as any[];
  } catch (e) {
    console.error('Failed to fetch brands for sitemap:', e);
  }

  const brandPages: MetadataRoute.Sitemap = brands.map((brand: any) => ({
    url: `${SITE_URL}/brand/${brand.slug}`,
    lastModified: brand.updated_at ? new Date(brand.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...brandPages];
}