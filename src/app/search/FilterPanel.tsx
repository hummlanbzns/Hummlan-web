'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RotateCcw } from 'lucide-react';

export default function FilterPanel({
  categories, selectedCategory, currentSort, currentMinScore,
}: {
  categories: { name: string; slug: string; count: number }[];
  selectedCategory: string; currentSort: string; currentMinScore: number;
}) {
  const router = useRouter();
  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    value ? params.set(key, value) : params.delete(key);
    router.push(`/search?${params.toString()}`);
  };
  const hasFilters = selectedCategory || currentSort !== 'score' || currentMinScore > 0;

  return (
    <div className="max-w-5xl mx-auto mb-6">
      <div className="bg-white border rounded-2xl p-4 shadow-sm">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[180px]">
            <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Category</label>
            <select value={selectedCategory} onChange={e => updateParam('category', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none">
              <option value="">All Categories</option>
              {categories.map(c => <option key={c.slug} value={c.slug}>{c.name} ({c.count})</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Sort</label>
            <select value={currentSort} onChange={e => updateParam('sort', e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none">
              <option value="score">Highest Score</option>
              <option value="name">Name (A-Z)</option>
              <option value="price">Price (Low)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Min Score</label>
            <select value={String(currentMinScore)} onChange={e => updateParam('minScore', e.target.value === '0' ? '' : e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none">
              <option value="0">Any</option>
              <option value="70">70+ (High)</option>
              <option value="50">50+ (Moderate)</option>
            </select>
          </div>
          {hasFilters && (
            <button onClick={() => router.push('/search')}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 hover:text-orange-600 border rounded-lg transition-colors">
              <RotateCcw className="w-4 h-4" /> Clear
            </button>
          )}
        </div>
      </div>
      {!selectedCategory && (
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.slice(0, 12).map(c => (
            <Link key={c.slug} href={`/search?category=${c.slug}`}
              className="px-3 py-1.5 bg-white border rounded-full text-xs font-medium text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-all shadow-sm">
              {c.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}