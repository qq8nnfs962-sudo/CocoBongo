import { useState, useMemo } from 'react';
import { systemDesigns } from '../data/systemDesigns';
import SystemCard from '../components/system/SystemCard';

const CATEGORIES = ['All', 'Fintech', 'AI SaaS', 'Healthcare', 'E-Learning', 'E-Commerce', 'Gaming', 'Social', 'Sustainability', 'Developer Tools', 'Real Estate', 'Restaurant', 'Analytics', 'Travel', 'HR', 'NFT', 'Fitness'];

export default function SystemsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return systemDesigns.filter(d => {
      const matchCat = activeCategory === 'All' || d.category === activeCategory;
      if (!matchCat) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.style.toLowerCase().includes(q) ||
        d.tags.some(t => t.includes(q))
      );
    });
  }, [search, activeCategory]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Design Systems</h1>
          <p className="text-gray-400">16 complete design systems with tokens, typography, and page demos</p>
        </div>
        <div className="w-72">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search systems..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat
                ? 'bg-purple-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-gray-600 text-sm">{filtered.length} system{filtered.length !== 1 ? 's' : ''}</p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(design => (
          <SystemCard key={design.id} design={design} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No systems found</p>
          <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="mt-3 text-purple-400 hover:text-purple-300 text-sm">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
