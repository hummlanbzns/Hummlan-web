import Link from 'next/link';
import { db } from '@/lib/db';
import { ShoppingBag, Filter } from 'lucide-react';
import HummlanBeeMark from '@/components/HummlanBeeMark';

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

export default async function ShopPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ sort?: string }>
}) {
  const { sort = 'sustainability' } = await searchParams;
  const products = await getAllProducts(sort);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <HummlanBeeMark className="w-8 h-8 text-brand" />
            Hummlan.com
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-gray-900 font-medium hover:text-brand">Home</Link>
            <Link href="/best-of" className="text-gray-600 font-medium hover:text-brand">Best Of</Link>
            <Link href="/about" className="text-gray-600 font-medium hover:text-brand">Our Standards</Link>
            <Link href="/eu-taxonomy" className="text-gray-600 font-medium hover:text-brand">EU Taxonomy</Link>
            <Link href="/csrd" className="text-gray-600 font-medium hover:text-brand">CSRD</Link>
          </nav>
        </div>
      </header>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <Link key={product.id} href={`/product/${product.slug}`} className="group bg-white border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="aspect-square bg-gray-50 flex items-center justify-center relative">
                  <ShoppingBag className="w-16 h-16 text-gray-200 group-hover:scale-110 group-hover:text-brand-light transition-all duration-500" />
                  <div className="absolute top-4 right-4 bg-brand text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                    HSS: {product.brand_score}/100
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

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 text-sm font-semibold mb-6 text-gray-600">
            <Link href="/best-of" className="hover:text-brand">Best Of</Link>
            <Link href="/about" className="hover:text-brand">Our Standards</Link>
            <Link href="/eu-taxonomy" className="hover:text-brand">EU Taxonomy</Link>
            <Link href="/csrd" className="hover:text-brand">CSRD</Link>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 Hummlan.com. Stern sustainability comparisons.
          </p>
        </div>
      </footer>
    </div>
  );
}
