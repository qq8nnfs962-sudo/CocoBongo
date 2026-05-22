import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 border border-white/10 p-8 md:p-12">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          v1.0 — Pro Max Edition
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-none tracking-tight">
          UI/UX Pro Max{' '}
          <span className="gradient-text block sm:inline">System Explorer</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
          The ultimate design library for modern UI systems. Explore 67 styles, 96 palettes, 57 font pairings, 16 complete design systems, and more.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/explorer?tab=styles"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/25"
          >
            Explore Library
          </Link>
          <Link
            to="/builder"
            className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200"
          >
            Build a System
          </Link>
          <Link
            to="/systems"
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold rounded-xl transition-all duration-200"
          >
            Browse Systems →
          </Link>
        </div>
      </div>
    </div>
  );
}
