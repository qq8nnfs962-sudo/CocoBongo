import { useState, useMemo } from 'react';
import { useCsvData } from '../../hooks/useCsvData';
import { UXGuideline } from '../../data/types';
import SearchBar from './SearchBar';
import Badge from '../ui/Badge';
import Spinner from '../ui/Spinner';

function priorityVariant(p: string): 'red' | 'yellow' | 'green' {
  if (p === 'High') return 'red';
  if (p === 'Medium') return 'yellow';
  return 'green';
}

const CATEGORIES = ['All', 'Navigation', 'Performance', 'Accessibility', 'Visual', 'Interaction'];

export default function UXTab() {
  const { data, loading } = useCsvData<UXGuideline>('/data/ux-guidelines.csv');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return data.filter(g => {
      const matchCat = activeCategory === 'All' || g.category === activeCategory;
      if (!matchCat) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.tags.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
      );
    });
  }, [data, search, activeCategory]);

  const highCount = filtered.filter(g => g.priority === 'High').length;
  const mediumCount = filtered.filter(g => g.priority === 'Medium').length;
  const lowCount = filtered.filter(g => g.priority === 'Low').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">UX Guidelines</h2>
          <p className="text-gray-400 text-sm mt-1">
            {filtered.length} guidelines —&nbsp;
            <span className="text-red-400">{highCount} High</span>&nbsp;·&nbsp;
            <span className="text-yellow-400">{mediumCount} Medium</span>&nbsp;·&nbsp;
            <span className="text-green-400">{lowCount} Low</span>
          </p>
        </div>
        <div className="w-72">
          <SearchBar value={search} onChange={setSearch} placeholder="Search guidelines..." />
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-purple-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(guideline => (
          <div key={guideline.id} className="glass-card p-4 hover:border-white/20 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {guideline.title}
                  </h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant="blue" size="sm">{guideline.category}</Badge>
                    <Badge variant={priorityVariant(guideline.priority)} size="sm">{guideline.priority}</Badge>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-2">{guideline.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {guideline.tags.split(';').slice(0, 5).map(tag => (
                    <Badge key={tag} size="sm">{tag.trim()}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No guidelines found</p>
          <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="mt-3 text-purple-400 hover:text-purple-300 text-sm">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
