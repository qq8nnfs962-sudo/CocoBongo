import { useState, useMemo } from 'react';
import { useCsvData } from '../../hooks/useCsvData';
import { Product } from '../../data/types';
import SearchBar from './SearchBar';
import Badge from '../ui/Badge';
import Spinner from '../ui/Spinner';

const categoryColors: Record<string, 'purple' | 'blue' | 'cyan' | 'green' | 'red' | 'yellow' | 'orange' | 'pink'> = {
  'Fintech': 'green',
  'AI SaaS': 'purple',
  'Healthcare': 'cyan',
  'E-Learning': 'yellow',
  'E-Commerce': 'pink',
  'Gaming': 'red',
  'Social': 'blue',
  'Sustainability': 'green',
  'Real Estate': 'orange',
  'Restaurant': 'orange',
  'Analytics': 'blue',
  'Travel': 'cyan',
  'HR': 'blue',
  'NFT': 'purple',
  'Fitness': 'red',
  'Developer Tools': 'default' as any,
};

const CATEGORIES = ['All', 'Fintech', 'AI SaaS', 'Healthcare', 'E-Learning', 'E-Commerce', 'Gaming', 'Social', 'Analytics', 'Travel', 'HR', 'NFT', 'Fitness', 'Developer Tools'];

export default function ProductsTab() {
  const { data, loading } = useCsvData<Product>('/data/products.csv');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return data.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      if (!matchCat) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [data, search, activeCategory]);

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
          <h2 className="text-xl font-bold text-white">Product Recommendations</h2>
          <p className="text-gray-400 text-sm mt-1">{filtered.length} of {data.length} products</p>
        </div>
        <div className="w-72">
          <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(product => (
          <div key={product.id} className="glass-card p-5 hover:border-white/20 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                  {product.name}
                </h3>
                <Badge
                  variant={categoryColors[product.category] || 'default'}
                  size="sm"
                  className="mt-1"
                >
                  {product.category}
                </Badge>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">{product.description}</p>

            <div className="space-y-2">
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Recommended Styles</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.recommended_styles.split(';').slice(0, 3).map(s => (
                    <Badge key={s} variant="purple" size="sm">{s.trim()}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Recommended Palettes</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.recommended_palettes.split(';').slice(0, 3).map(p => (
                    <Badge key={p} variant="cyan" size="sm">{p.trim()}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No products found</p>
          <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="mt-3 text-purple-400 hover:text-purple-300 text-sm">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
