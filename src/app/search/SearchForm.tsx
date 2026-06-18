'use client';

import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { useState, useCallback, useRef } from 'react';

export default function SearchForm({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const trimmed = query.trim();
    trimmed ? params.set('q', trimmed) : params.delete('q');
    router.push(`/search?${params.toString()}`);
  }, [query, router]);

  const clearSearch = useCallback(() => {
    setQuery('');
    inputRef.current?.focus();
    const params = new URLSearchParams(window.location.search);
    params.delete('q');
    router.push(`/search?${params.toString()}`);
  }, [router]);

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
        </div>
        <input ref={inputRef} type="text" value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any brand (e.g. Patagonia, Dr. Bronner's...)"
          className="w-full pl-12 pr-14 py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all shadow-sm" />
        {query && (
          <button type="button" onClick={clearSearch}
            className="absolute inset-y-0 right-14 flex items-center text-gray-400 hover:text-gray-600" aria-label="Clear">
            <X className="w-5 h-5" />
          </button>
        )}
        <button type="submit"
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-orange-600 hover:text-orange-700" aria-label="Search">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}