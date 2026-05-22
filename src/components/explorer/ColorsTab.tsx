import { useState, useMemo } from 'react';
import { useCsvData } from '../../hooks/useCsvData';
import { ColorPalette } from '../../data/types';
import SearchBar from './SearchBar';
import Spinner from '../ui/Spinner';
import { getContrastColor } from '../../lib/utils';

function ColorSwatch({ color, label }: { color: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(color).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  return (
    <div className="group/swatch flex flex-col items-center gap-1 cursor-pointer" onClick={handleCopy}>
      <div
        className="w-8 h-8 rounded-lg border border-white/10 transition-transform group-hover/swatch:scale-110"
        style={{ backgroundColor: color }}
        title={`${label}: ${color}`}
      />
      <span className="text-gray-600 text-xs font-mono hidden group-hover:block">
        {copied ? '✓' : color}
      </span>
    </div>
  );
}

function PaletteCard({ palette }: { palette: ColorPalette }) {
  const [expanded, setExpanded] = useState(false);
  const swatches = [
    { label: 'Primary', color: palette.primary },
    { label: 'Secondary', color: palette.secondary },
    { label: 'Accent', color: palette.accent },
    { label: 'Background', color: palette.background },
    { label: 'Surface', color: palette.surface },
    { label: 'Text', color: palette.text },
  ];

  return (
    <div className="glass-card overflow-hidden hover:border-white/20 transition-all duration-300">
      {/* Color bar */}
      <div className="flex h-14">
        {swatches.map(s => (
          <div
            key={s.label}
            className="flex-1"
            style={{ backgroundColor: s.color }}
          />
        ))}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-bold text-white">{palette.name}</h3>
          <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">{palette.mood}</span>
        </div>
        <p className="text-gray-400 text-xs leading-relaxed mb-3">{palette.description}</p>

        {/* Swatch row */}
        <div className="flex gap-2 mb-3">
          {swatches.map(s => (
            <ColorSwatch key={s.label} color={s.color} label={s.label} />
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
        >
          {expanded ? 'Hide' : 'Show'} hex codes
          <svg className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expanded && (
          <div className="mt-3 space-y-1.5 bg-black/30 rounded-lg p-3">
            {swatches.map(s => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">{s.label}</span>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border border-white/20" style={{ backgroundColor: s.color }} />
                  <span className="text-gray-300 text-xs font-mono">{s.color}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ColorsTab() {
  const { data, loading } = useCsvData<ColorPalette>('/data/colors.csv');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.mood.toLowerCase().includes(q)
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
          <h2 className="text-xl font-bold text-white">Color Palettes</h2>
          <p className="text-gray-400 text-sm mt-1">{filtered.length} of {data.length} palettes — click swatches to copy hex</p>
        </div>
        <div className="w-72">
          <SearchBar value={search} onChange={setSearch} placeholder="Search palettes..." />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filtered.map(palette => (
          <PaletteCard key={palette.id} palette={palette} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No palettes found for "{search}"</p>
          <button onClick={() => setSearch('')} className="mt-3 text-purple-400 hover:text-purple-300 text-sm">
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
