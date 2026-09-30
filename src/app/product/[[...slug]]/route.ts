import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * Rebrand (Sep 2026): product pages are retired — no product pushing of any kind.
 * The product DATA stays in the DB (owner decision pending), but /product/* URLs
 * no longer render a page. This catch-all resolves the product's owning brand and
 * issues a permanent (301) redirect to the brand rating page, so old product links
 * still resolve to useful content. Unknown product slugs return 404 (its brand page
 * may still be findable via /search).
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const segments = (slug ?? []).filter(Boolean);
  const productSlug = segments[0];

  // /product (no slug) → brand search hub
  if (!productSlug) {
    return NextResponse.redirect(new URL('/search', _request.url), 301);
  }

  try {
    const rs = await db.execute({
      sql: `
        SELECT b.slug AS brand_slug
        FROM products p
        JOIN brands b ON b.id = p.brand_id
        WHERE p.slug = ?
        LIMIT 1
      `,
      args: [productSlug],
    });
    const row = rs.rows[0] as { brand_slug?: string } | undefined;

    if (row?.brand_slug) {
      return NextResponse.redirect(
        new URL(`/brand/${row.brand_slug}`, _request.url),
        301,
      );
    }
  } catch (err) {
    console.error('Product redirect lookup failed:', err);
  }

  return new NextResponse(null, { status: 404 });
}