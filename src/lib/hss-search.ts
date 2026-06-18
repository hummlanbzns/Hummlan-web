import { db } from '@/lib/db';

export interface HSSSearchResult {
  type: 'brand' | 'product';
  id: string;
  name: string;
  slug: string;
  brandName: string | null;
  brandSlug: string | null;
  description: string;
  overallScore: number | null;
  categoryName: string;
  categorySlug: string;
  certifications: string[];
  hasAffiliateLinks: boolean;
  lowestPrice: number | null;
  imageUrl: string | null;
  pillarScores?: any[];
}

export interface HSSSearchOptions {
  query: string;
  category?: string;
  minScore?: number;
  maxScore?: number;
  sort?: 'score' | 'name' | 'price';
  limit?: number;
}

export async function searchHSS(options: HSSSearchOptions): Promise<HSSSearchResult[]> {
  const { query, category, minScore = 0, maxScore = 100, sort = 'score', limit = 50 } = options;
  const searchTerm = query.trim();
  const params: any[] = [];
  const conditions: string[] = [];

  if (searchTerm) {
    conditions.push(`(b.name LIKE ? OR p.name LIKE ? OR b.description LIKE ? OR p.description LIKE ?)`);
    const likeTerm = `%${searchTerm}%`;
    params.push(likeTerm, likeTerm, likeTerm, likeTerm);
  }
  if (category) { conditions.push('c.slug = ?'); params.push(category); }
  conditions.push('(b.overall_sustainability_score >= ? AND b.overall_sustainability_score <= ?)');
  params.push(minScore, maxScore);

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const orderClause = sort === 'name' ? 'b.name ASC, p.name ASC' : sort === 'price' ? 'min_price ASC NULLS LAST' : 'b.overall_sustainability_score DESC, b.name ASC';

  const sql = `
    SELECT 'brand' as type, b.id, b.name, b.slug, b.description,
      b.overall_sustainability_score as overallScore,
      NULL as productName, NULL as productSlug, NULL as lowestPrice, NULL as imageUrl,
      c.name as categoryName, c.slug as categorySlug,
      CASE WHEN COUNT(al.id) > 0 THEN 1 ELSE 0 END as hasAffiliateLinks
    FROM brands b
    LEFT JOIN products p ON p.brand_id = b.id
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN affiliate_links al ON al.product_id = p.id AND al.is_active = 1
    ${whereClause}
    GROUP BY b.id
    ORDER BY ${orderClause}
    LIMIT ?
  `;
  params.push(limit);

  try {
    const rs = await db.execute({ sql, args: params });
    const results = rs.rows as any[];
    const enriched = await Promise.all(results.map(async (row) => {
      const pillarRs = await db.execute({
        sql: `SELECT source_name, rating_score, max_score, description FROM sustainability_ratings WHERE entity_type='brand' AND entity_id=? ORDER BY source_name ASC`,
        args: [row.id],
      });
      return { ...row, certifications: [], pillarScores: pillarRs.rows as any[] };
    }));
    return enriched as any;
  } catch (err) { console.error('HSS search error:', err); return []; }
}

export async function getSearchCategories(): Promise<{ name: string; slug: string; count: number }[]> {
  const rs = await db.execute(`
    SELECT c.name, c.slug, COUNT(DISTINCT b.id) as count
    FROM categories c JOIN products p ON p.category_id = c.id
    JOIN brands b ON b.id = p.brand_id
    WHERE b.overall_sustainability_score IS NOT NULL
    GROUP BY c.id ORDER BY count DESC
  `);
  return rs.rows as any[];
}