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
      url: `${SITE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Fetch all categories
  let categories: any[] = [];
  try {
    const rs = await db.execute('SELECT slug, updated_at FROM categories');
    categories = rs.rows as any[];
  } catch (e) {
    console.error('Failed to fetch categories for sitemap:', e);
  }

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat: any) => ({
    url: `${SITE_URL}/category/${cat.slug}`,
    lastModified: cat.updated_at ? new Date(cat.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Fetch all products
  let products: any[] = [];
  try {
    const rs = await db.execute('SELECT slug, updated_at FROM products');
    products = rs.rows as any[];
  } catch (e) {
    console.error('Failed to fetch products for sitemap:', e);
  }

  const productPages: MetadataRoute.Sitemap = products.map((prod: any) => ({
    url: `${SITE_URL}/product/${prod.slug}`,
    lastModified: prod.updated_at ? new Date(prod.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
