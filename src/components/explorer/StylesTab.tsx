import { useState, useMemo } from 'react';
import { useCsvData } from '../../hooks/useCsvData';
import { Style } from '../../data/types';
import SearchBar from './SearchBar';
import Badge from '../ui/Badge';
import Spinner from '../ui/Spinner';

const vibeColors: Record<string, 'purple' | 'blue' | 'cyan' | 'green' | 'red' | 'yellow' | 'orange' | 'pink'> = {
  'Ethereal': 'cyan',
  'Tactile': 'blue',
  'Playful': 'pink',
  'Bold': 'red',
  'Minimal': 'default' as any,
  'Futuristic': 'purple',
  'Energetic': 'orange',
  'Warm': 'yellow',
  'Natural': 'green',
  'Electric': 'cyan',
  'Mysterious': 'purple',
};

function getVibeColor(vibe: string): 'purple' | 'blue' | 'cyan' | 'green' | 'red' | 'yellow' | 'orange' | 'pink' | 'default' {
  const lower = vibe.toLowerCase();
  if (lower.includes('ethereal') || lower.includes('futuristic')) return 'cyan';
  if (lower.includes('bold') || lower.includes('rebellious') || lower.includes('intense') || lower.includes('dramatic')) return 'red';
  if (lower.includes('playful') || lower.includes('fun') || lower.includes('friendly')) return 'pink';
  if (lower.includes('warm') || lower.includes('cozy')) return 'yellow';
  if (lower.includes('natural') || lower.includes('fresh') || lower.includes('healthy')) return 'green';
  if (lower.includes('mysterious') || lower.includes('creative') || lower.includes('powerful')) return 'purple';
  if (lower.includes('energetic') || lower.includes('dynamic')) return 'orange';
  if (lower.includes('electric') || lower.includes('technical') || lower.includes('cool')) return 'blue';
  return 'default' as any;
}

export default function StylesTab() {
  const { data, loading } = useCsvData<Style>('/data/styles.csv');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.tags.toLowerCase().includes(q) ||
      s.vibe.toLowerCase().includes(q)
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
          <h2 className="text-xl font-bold text-white">UI Styles</h2>
          <p className="text-gray-400 text-sm mt-1">{filtered.length} of {data.length} styles</p>
        </div>
        <div className="w-72">
          <SearchBar value={search} onChange={setSearch} placeholder="Search styles..." />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(style => (
          <div key={style.id} className="glass-card glass-card-hover p-5 group">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                {style.name}
              </h3>
              <Badge variant={getVibeColor(style.vibe) as any}>{style.vibe}</Badge>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
              {style.description}
            </p>
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Use Cases</p>
              <div className="flex flex-wrap gap-1.5">
                {style.use_cases.split(';').slice(0, 3).map(uc => (
                  <Badge key={uc} variant="blue" size="sm">{uc.trim()}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {style.tags.split(';').slice(0, 4).map(tag => (
                  <Badge key={tag} size="sm">{tag.trim()}</Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No styles found for "{search}"</p>
          <button onClick={() => setSearch('')} className="mt-3 text-purple-400 hover:text-purple-300 text-sm">
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
