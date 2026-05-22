import { Link } from 'react-router-dom';

const links = [
  {
    tab: 'styles',
    title: 'UI Styles',
    description: '67 curated design styles from Glassmorphism to Brutalism',
    count: '67 styles',
    gradient: 'from-purple-500/20 to-purple-600/5',
    border: 'border-purple-500/20 hover:border-purple-500/40',
    icon: (
      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    accent: 'text-purple-400',
  },
  {
    tab: 'colors',
    title: 'Color Palettes',
    description: '96 curated palettes with full design token hex values',
    count: '96 palettes',
    gradient: 'from-cyan-500/20 to-cyan-600/5',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    icon: (
      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    accent: 'text-cyan-400',
  },
  {
    tab: 'typography',
    title: 'Typography',
    description: '57 Google Fonts pairings with live previews',
    count: '57 pairings',
    gradient: 'from-blue-500/20 to-blue-600/5',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
      </svg>
    ),
    accent: 'text-blue-400',
  },
  {
    tab: 'charts',
    title: 'Chart Types',
    description: '25 chart types with library recommendations',
    count: '25 charts',
    gradient: 'from-green-500/20 to-green-600/5',
    border: 'border-green-500/20 hover:border-green-500/40',
    icon: (
      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    accent: 'text-green-400',
  },
  {
    tab: 'ux',
    title: 'UX Guidelines',
    description: '99 actionable UX principles prioritized by impact',
    count: '99 guidelines',
    gradient: 'from-yellow-500/20 to-yellow-600/5',
    border: 'border-yellow-500/20 hover:border-yellow-500/40',
    icon: (
      <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accent: 'text-yellow-400',
  },
  {
    tab: 'products',
    title: 'Products',
    description: '96 product types with matched styles and palettes',
    count: '96 products',
    gradient: 'from-pink-500/20 to-pink-600/5',
    border: 'border-pink-500/20 hover:border-pink-500/40',
    icon: (
      <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    accent: 'text-pink-400',
  },
];

export default function ExplorerLinks() {
  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map(link => (
          <Link
            key={link.tab}
            to={`/explorer?tab=${link.tab}`}
            className={`bg-gradient-to-br ${link.gradient} border ${link.border} rounded-xl p-5 transition-all duration-200 hover:scale-[1.02] group`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/5 rounded-lg">{link.icon}</div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-white">{link.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-2">{link.description}</p>
                <span className={`text-xs font-semibold ${link.accent}`}>{link.count} →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
