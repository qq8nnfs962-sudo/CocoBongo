import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { systemDesigns } from '../data/systemDesigns';
import PageTabBar from '../components/system/PageTabBar';
import FintechPages from '../components/system/demo-pages/FintechPages';
import AISaaSPages from '../components/system/demo-pages/AISaaSPages';
import GenericPages from '../components/system/demo-pages/GenericPages';
import { generateDesignSystemMd } from '../lib/utils';

function TokenRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5">
      <span className="text-gray-500 text-xs">{label}</span>
      <div className="flex items-center gap-2">
        {color && (
          <div className="w-4 h-4 rounded border border-white/20" style={{ backgroundColor: color }} />
        )}
        <span className="text-gray-300 text-xs font-mono">{value}</span>
      </div>
    </div>
  );
}

export default function SystemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const design = systemDesigns.find(d => d.id === id);
  const [activePage, setActivePage] = useState('');

  if (!design) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 text-lg">System not found</p>
        <Link to="/systems" className="mt-3 text-purple-400 hover:text-purple-300 text-sm block">
          ← Back to Systems
        </Link>
      </div>
    );
  }

  const currentPage = activePage || design.pages[0];

  const handleExport = () => {
    const md = generateDesignSystemMd(design, design.pages);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${design.id}-design-system.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  function renderDemoPage() {
    if (design!.id === 'fintech-crypto') {
      return <FintechPages design={design!} page={currentPage} />;
    }
    if (design!.id === 'ai-saas') {
      return <AISaaSPages design={design!} page={currentPage} />;
    }
    return <GenericPages design={design!} page={currentPage} />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/systems" className="text-gray-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-white">{design.name}</h1>
            <p className="text-xs text-gray-500">{design.style} · {design.category}</p>
          </div>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-medium rounded-xl transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export MD
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel: design tokens */}
        <div className="w-64 flex-shrink-0 border-r border-white/10 overflow-y-auto p-4 space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {design.tags.map(tag => (
              <span key={tag} className="text-xs bg-white/5 text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>

          {/* Colors */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Color Tokens</p>
            <div className="space-y-1">
              <TokenRow label="Primary" value={design.primaryColor} color={design.primaryColor} />
              <TokenRow label="Secondary" value={design.secondaryColor} color={design.secondaryColor} />
              <TokenRow label="Accent" value={design.accentColor} color={design.accentColor} />
              <TokenRow label="Background" value={design.backgroundColor} color={design.backgroundColor} />
              <TokenRow label="Surface" value={design.surfaceColor} color={design.surfaceColor} />
              <TokenRow label="Text" value={design.textColor} color={design.textColor} />
            </div>
          </div>

          {/* Color preview bar */}
          <div className="flex h-6 rounded-lg overflow-hidden border border-white/10">
            {[design.primaryColor, design.secondaryColor, design.accentColor, design.backgroundColor, design.surfaceColor].map((c, i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>

          {/* Typography */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Typography</p>
            <div className="space-y-1">
              <TokenRow label="Heading" value={design.headingFont} />
              <TokenRow label="Body" value={design.bodyFont} />
            </div>
          </div>

          {/* Style */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Style</p>
            <p className="text-gray-400 text-xs">{design.style}</p>
          </div>

          {/* Palette */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Palette</p>
            <p className="text-gray-400 text-xs">{design.palette}</p>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">About</p>
            <p className="text-gray-500 text-xs leading-relaxed">{design.description}</p>
          </div>
        </div>

        {/* Right panel: browser frame + demo */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Browser frame top */}
          <div className="flex-shrink-0 bg-gray-900 border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 bg-black/30 rounded-lg px-3 py-1.5 text-xs text-gray-500 font-mono">
                preview.uiux-explorer.dev/{design.id}/{currentPage.toLowerCase().replace(/\s+/g, '-')}
              </div>
            </div>
            <PageTabBar
              pages={design.pages}
              activePage={currentPage}
              onPageChange={setActivePage}
            />
          </div>

          {/* Demo content */}
          <div className="flex-1 overflow-y-auto">
            <div className="text-xs text-gray-700 bg-gray-900 px-4 py-1.5 border-b border-white/5">
              Viewing: <span className="text-gray-500">{design.name}</span> — <span className="text-purple-400">{currentPage}</span>
            </div>
            {renderDemoPage()}
          </div>
        </div>
      </div>
    </div>
  );
}
