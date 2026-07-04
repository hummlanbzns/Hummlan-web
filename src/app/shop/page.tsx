import Link from 'next/link';
import { db } from '@/lib/db';
import { ShoppingBag, Filter, Info, ChevronRight } from 'lucide-react';

async function getAllProducts(sortBy: string = 'sustainability') {
  const orderClause = sortBy === 'price' 
    ? 'MIN(al.price) ASC' 
    : 'b.overall_sustainability_score DESC';

  const rs = await db.execute({
    sql: `
      SELECT p.*, b.name as brand_name, b.overall_sustainability_score as brand_score, MIN(al.price) as min_price
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      LEFT JOIN affiliate_links al ON p.id = al.product_id
      GROUP BY p.id
      ORDER BY ${orderClause}
    `
  });
  return rs.rows;
}

async function getCategories() {
  const rs = await db.execute('SELECT * FROM categories WHERE parent_id IS NULL');
  return rs.rows;
}

export default async function ShopPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ sort?: string }>
}) {
  const { sort = 'sustainability' } = await searchParams;
  const products = await getAllProducts(sort);
  const categories = await getCategories();

  const categoryHighlights: Record<string, { highlight: string; color: string }> = {
    'Personal Care': { highlight: 'Zero-plastic packaging & certified organic ingredients', color: 'from-emerald-600 to-emerald-800' },
    'Food': { highlight: 'Regenerative farming & plastic-neutral supply chains', color: 'from-amber-600 to-amber-800' },
    'Fashion': { highlight: 'Fair-trade certified & low-impact natural fibres', color: 'from-violet-600 to-violet-800' },
    'Household': { highlight: 'Non-toxic formulations & plastic-waste reduction', color: 'from-cyan-600 to-cyan-800' },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12 bg-white p-8 rounded-2xl border shadow-sm">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">All Sustainable Finds</h1>
                <p className="text-lg text-gray-600 max-w-2xl">The complete catalog of products meeting our stern sustainability standards, compared for the best price.</p>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-xl border">
                <Link 
                  href="/shop?sort=sustainability"
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${sort === 'sustainability' ? 'bg-white shadow-sm text-brand' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Most Sustainable
                </Link>
                <Link 
                  href="/shop?sort=price"
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${sort === 'price' ? 'bg-white shadow-sm text-brand' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Cheapest
                </Link>
              </div>
            </div>
          </div>

          {/* Category Tiles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category: any) => {
                const info = categoryHighlights[category.name] || { highlight: 'Rigorously vetted for EU Taxonomy + CSRD alignment', color: 'from-gray-600 to-gray-800' };
                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className={`group bg-gradient-to-br ${info.color} p-6 rounded-2xl text-white hover:scale-[1.02] transition-all duration-300 shadow-md`}
                  >
                    <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-white/80 leading-relaxed mb-4">{info.highlight}</p>
                    <span className="text-sm font-bold text-white/90 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Browse Products <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
            <span className="text-sm text-gray-400 font-medium bg-gray-100 px-3 py-1 rounded-full">
              {products.length} products
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <Link key={product.id} href={`/product/${product.slug}`} className="group bg-white border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="aspect-square bg-gray-50 flex items-center justify-center relative">
                  <ShoppingBag className="w-16 h-16 text-gray-200 group-hover:scale-110 group-hover:text-brand-light transition-all duration-500" />
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
                  <p className="text-xs text-brand font-bold uppercase tracking-wider mb-2">{product.brand_name}</p>
                  <h3 className="font-bold text-gray-900 mb-4 group-hover:text-brand-dark transition-colors leading-snug flex-grow">{product.name}</h3>
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
        </div>
      </main>

    </div>
  );
}
