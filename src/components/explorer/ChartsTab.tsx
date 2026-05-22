import { useState, useMemo } from 'react';
import { useCsvData } from '../../hooks/useCsvData';
import { ChartType } from '../../data/types';
import SearchBar from './SearchBar';
import Badge from '../ui/Badge';
import Spinner from '../ui/Spinner';

function complexityColor(c: string): 'green' | 'yellow' | 'red' {
  if (c === 'Low') return 'green';
  if (c === 'Medium') return 'yellow';
  return 'red';
}

const chartIcons: Record<string, JSX.Element> = {
  'Line Chart': (
    <svg viewBox="0 0 40 30" className="w-10 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="2,25 10,15 18,20 26,8 34,12 38,5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Bar Chart': (
    <svg viewBox="0 0 40 30" className="w-10 h-8 text-blue-400" fill="currentColor">
      <rect x="3" y="8" width="7" height="20" rx="1" opacity="0.8" />
      <rect x="12" y="14" width="7" height="14" rx="1" opacity="0.8" />
      <rect x="21" y="4" width="7" height="24" rx="1" opacity="0.8" />
      <rect x="30" y="10" width="7" height="18" rx="1" opacity="0.8" />
    </svg>
  ),
};

function ChartIcon({ name }: { name: string }) {
  if (chartIcons[name]) return chartIcons[name];
  return (
    <svg className="w-10 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 40 30">
      <rect x="2" y="2" width="36" height="26" rx="2" strokeWidth="1.5" opacity="0.5" />
      <circle cx="20" cy="15" r="8" strokeWidth="1.5" opacity="0.7" />
    </svg>
  );
}

export default function ChartsTab() {
  const { data, loading } = useCsvData<ChartType>('/data/charts.csv');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.use_case.toLowerCase().includes(q) ||
      c.libraries.toLowerCase().includes(q)
    );
  }, [data, search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Chart Types</h2>
          <p className="text-gray-400 text-sm mt-1">{filtered.length} of {data.length} chart types</p>
        </div>
        <div className="w-72">
          <SearchBar value={search} onChange={setSearch} placeholder="Search charts..." />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(chart => (
          <div key={chart.id} className="glass-card p-5 hover:border-white/20 transition-all duration-300 group">
            <div className="flex items-start gap-4 mb-3">
              <div className="p-2 bg-white/5 rounded-lg flex-shrink-0">
                <ChartIcon name={chart.name} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-white truncate">{chart.name}</h3>
                  <Badge variant={complexityColor(chart.complexity)} size="sm">{chart.complexity}</Badge>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{chart.description}</p>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Use Cases</p>
              <p className="text-gray-400 text-xs">{chart.use_case}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Libraries</p>
              <div className="flex flex-wrap gap-1.5">
                {chart.libraries.split(';').map(lib => (
                  <Badge key={lib} variant="cyan" size="sm">{lib.trim()}</Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No charts found for "{search}"</p>
          <button onClick={() => setSearch('')} className="mt-3 text-purple-400 hover:text-purple-300 text-sm">
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
