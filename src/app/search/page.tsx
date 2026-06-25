import type { Metadata } from 'next';
import Link from 'next/link';
import { searchHSS, getSearchCategories } from '@/lib/hss-search';
import { Search, ShieldCheck, ChevronRight, AlertCircle, Bug } from 'lucide-react';
import SearchForm from './SearchForm';
import FilterPanel from './FilterPanel';

export const metadata: Metadata = { title: 'HSS Search Engine — Sustainability Scores', description: 'Search any brand by Hummlan Sustainability Score (HSS). Transparent ratings for brands outside our affiliate program too.' };

const scoreBand = (s: number | null) => s === null ? 'low' : s >= 70 ? 'high' : s >= 40 ? 'mid' : 'low';
const SCORE_COLORS: Record<string, string> = { high: 'bg-green-100 text-green-800 border-green-200', mid: 'bg-yellow-100 text-yellow-800 border-yellow-200', low: 'bg-red-100 text-red-800 border-red-200' };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string; sort?: string; minScore?: string }> }) {
  const params = await searchParams;
  const query = params.q || ''; const category = params.category || ''; const sort = (params.sort as any) || 'score'; const minScore = Number(params.minScore) || 0;
  const categories = await getSearchCategories();
  let results: any[] = []; let hasSearched = false;
  if (query || category || params.minScore) { hasSearched = true; results = await searchHSS({ query, category: category || undefined, minScore, sort, limit: 50 }); }

  return (<div className="flex flex-col min-h-screen bg-gray-50">
    <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2"><Bug className="w-8 h-8 text-yellow-500 fill-yellow-500" aria-label="Hummlan bee" />Hummlan.com</Link>
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-gray-600 hover:text-orange-600 font-medium">Home</Link>
          <Link href="/about" className="text-gray-600 hover:text-orange-600 font-medium">Standards</Link>
          <Link href="/learn" className="text-gray-600 hover:text-orange-600 font-medium">Learn</Link>
        </nav>
      </div>
    </header>
    <main className="flex-grow py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-orange-100 rounded-2xl mb-4"><Search className="w-8 h-8 text-orange-600" /></div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">HSS Search Engine</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Search any brand or product &mdash; even those outside our affiliate program &mdash; by their Hummlan Sustainability Score.</p>
        </div>
        <SearchForm initialQuery={query} />
        <FilterPanel categories={categories} selectedCategory={category} currentSort={sort} currentMinScore={minScore} />
        <div className="mt-8">
          {hasSearched && results.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border"><AlertCircle className="w-16 h-16 text-gray-200 mx-auto mb-4" /><h2 className="text-xl font-bold">No results</h2><p className="text-gray-500">Try adjusting filters.</p></div>
          )}
          {hasSearched && results.length > 0 && (
            <><p className="text-sm text-gray-500 mb-4">{results.length} result{results.length > 1 ? 's' : ''}</p>
            <div className="space-y-4">
              {results.map((r: any) => (<div key={r.id} className="bg-white border rounded-2xl p-5 hover:shadow-lg transition-all flex flex-col sm:flex-row gap-5">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center font-extrabold text-xl border-2 shrink-0 ${SCORE_COLORS[scoreBand(r.overallScore)]}`}>{r.overallScore !== null ? Math.round(r.overallScore) : '—'}<span className="text-[10px] font-bold text-gray-400 uppercase ml-1">HSS</span></div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-xl font-bold text-gray-900">{r.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${r.hasAffiliateLinks ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}>{r.hasAffiliateLinks ? 'AFFILIATE' : 'INDEXED'}</span>
                  </div>
                  {r.categoryName && <Link href={`/category/${r.categorySlug}`} className="text-xs font-semibold text-orange-600">{r.categoryName}</Link>}
                  {r.pillarScores?.length > 0 && <div className="grid grid-cols-5 gap-2 mt-3">{r.pillarScores.map((p: any) => {
                    const pct = p.max_score > 0 ? (p.rating_score / p.max_score) * 100 : 0;
                    return (<div key={p.source_name} className="bg-gray-50 rounded-lg p-2 border"><div className="flex justify-between text-[10px] mb-1"><span className="font-semibold text-gray-600 truncate">{p.source_name.replace('Hummlan Pillar: ','')}</span><span className="font-bold">{p.rating_score}/{p.max_score}</span></div><div className="w-full bg-gray-200 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${pct >= 70 ? 'bg-green-500' : pct >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{width:`${pct}%`}} /></div></div>);
                  })}</div>}
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                    <Link href={`/brand/${r.slug}`} className="text-sm font-bold text-orange-600 flex items-center gap-1">View Full Rating <ChevronRight className="w-4 h-4" /></Link>
                    {r.lowestPrice && <span className="text-sm text-gray-500">From <strong>${r.lowestPrice}</strong></span>}
                  </div>
                </div>
              </div>))}
            </div></>
          )}
          {!hasSearched && <div className="text-center py-20"><Search className="w-20 h-20 text-gray-200 mx-auto mb-4" /><h2 className="text-xl font-bold text-gray-900 mb-2">Ready to check a brand?</h2><p className="text-gray-500 mb-6">Type a name above or browse categories.</p><div className="flex flex-wrap justify-center gap-3">{categories.slice(0,8).map(c => <Link key={c.slug} href={`/search?category=${c.slug}`} className="bg-white border rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:border-orange-300 transition-colors shadow-sm">{c.name}</Link>)}</div></div>}
        </div>
      </div>
    </main>
    <footer className="bg-white border-t py-12 mt-12 text-center"><p className="text-gray-400 text-xs">&copy; 2025 Hummlan.com. HSS Search indexes brands independent of affiliate relationships.</p></footer>
  </div>);
}