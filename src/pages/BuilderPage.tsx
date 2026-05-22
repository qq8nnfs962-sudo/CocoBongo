import { useState } from 'react';
import { useCsvData } from '../hooks/useCsvData';
import { Style, ColorPalette, Typography, Product } from '../data/types';
import { generateDesignSystemMd } from '../lib/utils';

const STEPS = ['Product', 'Style', 'Colors', 'Typography', 'Preview'];

function StepIndicator({ currentStep, completedSteps, onStepClick }: {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
}) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = completedSteps.includes(stepNum);
        const isClickable = isCompleted;

        return (
          <div key={label} className="flex items-center">
            <button
              onClick={() => isClickable && onStepClick(stepNum)}
              disabled={!isClickable && !isActive}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                isActive ? 'bg-purple-600 text-white' :
                isCompleted ? 'bg-white/10 text-white cursor-pointer hover:bg-white/15' :
                'text-gray-600 cursor-not-allowed'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                isActive ? 'bg-white text-purple-600' :
                isCompleted ? 'bg-green-500 text-white' :
                'bg-white/10 text-gray-600'
              }`}>
                {isCompleted ? '✓' : stepNum}
              </span>
              <span className="text-sm font-medium">{label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={`w-8 h-0.5 ${isCompleted ? 'bg-purple-500' : 'bg-white/10'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

const PRODUCT_CATEGORIES = [
  { id: 'saas', name: 'SaaS Platform', icon: '🚀', desc: 'B2B software and tools' },
  { id: 'ecommerce', name: 'E-Commerce', icon: '🛍️', desc: 'Online shopping and retail' },
  { id: 'fintech', name: 'Fintech', icon: '💳', desc: 'Finance and payments' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥', desc: 'Medical and wellness' },
  { id: 'gaming', name: 'Gaming', icon: '🎮', desc: 'Games and entertainment' },
  { id: 'social', name: 'Social Media', icon: '💬', desc: 'Community and social' },
  { id: 'education', name: 'Education', icon: '📚', desc: 'Learning and e-learning' },
  { id: 'analytics', name: 'Analytics', icon: '📊', desc: 'Data and reporting' },
  { id: 'travel', name: 'Travel', icon: '✈️', desc: 'Booking and discovery' },
  { id: 'real-estate', name: 'Real Estate', icon: '🏠', desc: 'Property and listings' },
  { id: 'restaurant', name: 'Restaurant', icon: '🍽️', desc: 'Food and beverage' },
  { id: 'fitness', name: 'Fitness', icon: '💪', desc: 'Health and workouts' },
];

const PAGE_OPTIONS = [
  'Landing', 'Dashboard', 'Pricing', 'Features', 'About', 'Contact',
  'Login', 'Sign Up', 'Profile', 'Settings', 'Docs', 'Blog',
  'Checkout', 'Cart', 'Product Detail', 'Listing', 'Search',
  'Analytics', 'Reports', 'Onboarding',
];

export default function BuilderPage() {
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Selections
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(null);
  const [selectedTypo, setSelectedTypo] = useState<Typography | null>(null);
  const [systemName, setSystemName] = useState('');
  const [selectedPages, setSelectedPages] = useState<string[]>(['Landing', 'Dashboard']);
  const [exported, setExported] = useState(false);

  const { data: styles } = useCsvData<Style>('/data/styles.csv');
  const { data: palettes } = useCsvData<ColorPalette>('/data/colors.csv');
  const { data: typographies } = useCsvData<Typography>('/data/typography.csv');

  const goToStep = (n: number) => setStep(n);

  const completeStep = (n: number) => {
    setCompletedSteps(prev => Array.from(new Set([...prev, n])));
    setStep(n + 1);
  };

  const skipStep = (n: number) => {
    setCompletedSteps(prev => Array.from(new Set([...prev, n])));
    setStep(n + 1);
  };

  const handleExport = () => {
    const design = {
      name: systemName || 'My Design System',
      style: selectedStyle?.name || 'Custom',
      primaryColor: selectedPalette?.primary || '#7C3AED',
      secondaryColor: selectedPalette?.secondary || '#2563EB',
      accentColor: selectedPalette?.accent || '#06B6D4',
      backgroundColor: selectedPalette?.background || '#030712',
      surfaceColor: selectedPalette?.surface || '#111827',
      textColor: selectedPalette?.text || '#F9FAFB',
      headingFont: selectedTypo?.heading_font || 'Inter',
      bodyFont: selectedTypo?.body_font || 'Inter',
    };
    const md = generateDesignSystemMd(design, selectedPages);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(systemName || 'my-design-system').toLowerCase().replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
  };

  const togglePage = (page: string) => {
    setSelectedPages(prev => prev.includes(page) ? prev.filter(p => p !== page) : [...prev, page]);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-2">Design System Builder</h1>
        <p className="text-gray-400">Build your perfect design system step by step</p>
      </div>

      {/* Step indicator */}
      <div className="overflow-x-auto no-scrollbar">
        <StepIndicator
          currentStep={step}
          completedSteps={completedSteps}
          onStepClick={goToStep}
        />
      </div>

      {/* Step content */}
      <div className="glass-card p-6">

        {/* STEP 1: Product Type */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-2">What are you building?</h2>
            <p className="text-gray-400 text-sm mb-6">Choose your product category to get tailored recommendations</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {PRODUCT_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedProduct(cat.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedProduct === cat.id
                      ? 'bg-purple-600/20 border-purple-500 text-white'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <p className="text-sm font-semibold">{cat.name}</p>
                  <p className="text-xs opacity-60 mt-0.5">{cat.desc}</p>
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => selectedProduct && completeStep(1)}
                disabled={!selectedProduct}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  selectedProduct
                    ? 'bg-purple-600 hover:bg-purple-500 text-white'
                    : 'bg-white/10 text-gray-600 cursor-not-allowed'
                }`}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Style */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Pick a Visual Style</h2>
            <p className="text-gray-400 text-sm mb-6">Choose the aesthetic direction for your design system</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
              {styles.slice(0, 24).map((style, i) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style)}
                  className={`p-4 rounded-xl border text-left transition-all group ${
                    selectedStyle?.id === style.id
                      ? 'bg-purple-600/20 border-purple-500'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-bold text-white">{style.name}</h3>
                    {i < 6 && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-1.5 py-0.5 rounded-full">Top Pick</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">{style.description}</p>
                  <p className="text-xs text-purple-400 mt-2">{style.vibe}</p>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={() => skipStep(2)} className="px-4 py-2 text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Skip →
              </button>
              <button
                onClick={() => completeStep(2)}
                disabled={!selectedStyle}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  selectedStyle
                    ? 'bg-purple-600 hover:bg-purple-500 text-white'
                    : 'bg-white/10 text-gray-600 cursor-not-allowed'
                }`}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Colors */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Choose a Color Palette</h2>
            <p className="text-gray-400 text-sm mb-6">Select the color system for your design</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
              {palettes.slice(0, 24).map(palette => (
                <button
                  key={palette.id}
                  onClick={() => setSelectedPalette(palette)}
                  className={`rounded-xl border overflow-hidden text-left transition-all ${
                    selectedPalette?.id === palette.id
                      ? 'border-purple-500 ring-2 ring-purple-500/30'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex h-8">
                    {[palette.primary, palette.secondary, palette.accent, palette.background, palette.surface].map((c, i) => (
                      <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <div className="p-3 bg-white/5">
                    <p className="text-xs font-bold text-white">{palette.name}</p>
                    <p className="text-xs text-gray-600">{palette.mood}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={() => skipStep(3)} className="px-4 py-2 text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Skip →
              </button>
              <button
                onClick={() => completeStep(3)}
                disabled={!selectedPalette}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  selectedPalette
                    ? 'bg-purple-600 hover:bg-purple-500 text-white'
                    : 'bg-white/10 text-gray-600 cursor-not-allowed'
                }`}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Typography */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Choose Typography</h2>
            <p className="text-gray-400 text-sm mb-6">Pick a font pairing for your design system</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
              {typographies.slice(0, 16).map(typo => (
                <button
                  key={typo.id}
                  onClick={() => setSelectedTypo(typo)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedTypo?.id === typo.id
                      ? 'bg-purple-600/20 border-purple-500'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="mb-3 p-3 bg-black/20 rounded-lg">
                    <p className="text-xl font-bold text-white mb-1" style={{ fontFamily: `'${typo.heading_font}', sans-serif` }}>
                      Heading Preview
                    </p>
                    <p className="text-xs text-gray-400" style={{ fontFamily: `'${typo.body_font}', sans-serif` }}>
                      Body text sample for this font pairing
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-purple-400 font-mono">{typo.heading_font}</span>
                    <span className="text-gray-600">+</span>
                    <span className="text-cyan-400 font-mono">{typo.body_font}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={() => skipStep(4)} className="px-4 py-2 text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Skip →
              </button>
              <button
                onClick={() => completeStep(4)}
                disabled={!selectedTypo}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  selectedTypo
                    ? 'bg-purple-600 hover:bg-purple-500 text-white'
                    : 'bg-white/10 text-gray-600 cursor-not-allowed'
                }`}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Preview + Export */}
        {step === 5 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Your Design System</h2>
            <p className="text-gray-400 text-sm mb-6">Review, name, and export your system</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: name + pages */}
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">System Name</label>
                  <input
                    type="text"
                    value={systemName}
                    onChange={e => setSystemName(e.target.value)}
                    placeholder="My Awesome Design System"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Select Pages ({selectedPages.length} selected)</label>
                  <div className="flex flex-wrap gap-2">
                    {PAGE_OPTIONS.map(page => (
                      <button
                        key={page}
                        onClick={() => togglePage(page)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedPages.includes(page)
                            ? 'bg-purple-600 text-white'
                            : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white border border-white/10'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: summary */}
              <div className="space-y-4">
                <div className="bg-black/30 rounded-xl p-4 space-y-3">
                  <h3 className="text-sm font-bold text-white">Summary</h3>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Product Type</span>
                      <span className="text-gray-300 capitalize">{selectedProduct || <span className="text-gray-600">Not selected</span>}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Style</span>
                      <span className="text-gray-300">{selectedStyle?.name || <span className="text-gray-600">Not selected</span>}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Palette</span>
                      <div className="flex items-center gap-2">
                        {selectedPalette && (
                          <div className="flex gap-1">
                            {[selectedPalette.primary, selectedPalette.secondary, selectedPalette.accent].map((c, i) => (
                              <div key={i} className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: c }} />
                            ))}
                          </div>
                        )}
                        <span className="text-gray-300">{selectedPalette?.name || <span className="text-gray-600">Not selected</span>}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Typography</span>
                      <span className="text-gray-300">
                        {selectedTypo ? `${selectedTypo.heading_font} / ${selectedTypo.body_font}` : <span className="text-gray-600">Not selected</span>}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Pages</span>
                      <span className="text-gray-300">{selectedPages.length} pages</span>
                    </div>
                  </div>

                  {selectedPalette && (
                    <div className="flex h-6 rounded-lg overflow-hidden border border-white/10">
                      {[selectedPalette.primary, selectedPalette.secondary, selectedPalette.accent, selectedPalette.background, selectedPalette.surface].map((c, i) => (
                        <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleExport}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/25"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {exported ? '✓ Exported!' : 'Export as Markdown'}
                </button>

                {exported && (
                  <p className="text-center text-xs text-green-400">
                    Design system exported successfully!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
