import { useState, useMemo } from 'react';
import { useCsvData } from '../../hooks/useCsvData';
import { Typography } from '../../data/types';
import SearchBar from './SearchBar';
import Badge from '../ui/Badge';
import Spinner from '../ui/Spinner';

function TypographyCard({ typo }: { typo: Typography }) {
  const headingStyle = { fontFamily: `'${typo.heading_font}', sans-serif` };
  const bodyStyle = { fontFamily: `'${typo.body_font}', sans-serif` };
  const tags = typo.style_tags.split(';').map(t => t.trim()).filter(Boolean);

  return (
    <div className="glass-card p-5 hover:border-white/20 transition-all duration-300 group">
      {/* Font preview */}
      <div className="mb-4 p-4 bg-black/30 rounded-xl">
        <p className="text-2xl font-bold text-white mb-2 leading-tight" style={headingStyle}>
          Design Systems
        </p>
        <p className="text-sm text-gray-300 leading-relaxed" style={bodyStyle}>
          The quick brown fox jumps over the lazy dog. Creating beautiful, consistent user experiences through systematic design.
        </p>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Heading</span>
          <span className="text-xs text-purple-400 font-mono">{typo.heading_font}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Body</span>
          <span className="text-xs text-cyan-400 font-mono">{typo.body_font}</span>
        </div>
      </div>

      <p className="text-gray-500 text-xs mb-3">{typo.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags.slice(0, 4).map(tag => (
          <Badge key={tag} size="sm">{tag}</Badge>
        ))}
      </div>

      <a
        href={typo.google_fonts_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
        onClick={e => e.stopPropagation()}
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        View on Google Fonts
      </a>
    </div>
  );
}

export default function TypographyTab() {
  const { data, loading } = useCsvData<Typography>('/data/typography.csv');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter(t =>
      t.heading_font.toLowerCase().includes(q) ||
      t.body_font.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.style_tags.toLowerCase().includes(q)
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
          <h2 className="text-xl font-bold text-white">Font Pairings</h2>
          <p className="text-gray-400 text-sm mt-1">{filtered.length} of {data.length} pairings</p>
        </div>
        <div className="w-72">
          <SearchBar value={search} onChange={setSearch} placeholder="Search fonts..." />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(typo => (
          <TypographyCard key={typo.id} typo={typo} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No font pairings found for "{search}"</p>
          <button onClick={() => setSearch('')} className="mt-3 text-purple-400 hover:text-purple-300 text-sm">
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
