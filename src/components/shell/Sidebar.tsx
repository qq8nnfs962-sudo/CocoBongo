import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface SidebarProps {
  onClose?: () => void;
}

const navItems = [
  {
    path: '/',
    label: 'Home',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    path: '/explorer',
    label: 'Explorer',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    path: '/builder',
    label: 'Builder',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    path: '/systems',
    label: 'Systems',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
];

const explorerLinks = [
  { label: 'Styles', tab: 'styles', color: 'text-purple-400' },
  { label: 'Colors', tab: 'colors', color: 'text-cyan-400' },
  { label: 'Typography', tab: 'typography', color: 'text-blue-400' },
  { label: 'Charts', tab: 'charts', color: 'text-green-400' },
  { label: 'UX Guidelines', tab: 'ux', color: 'text-yellow-400' },
  { label: 'Products', tab: 'products', color: 'text-pink-400' },
];

export default function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-gray-950 border-r border-white/10">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-bold text-white leading-tight">UI/UX Explorer</h1>
          <p className="text-xs text-gray-500">Pro Max</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors lg:hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider px-3 py-2">Navigation</p>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            onClick={onClose}
            className={({ isActive }) => cn(
              'nav-link',
              isActive && 'nav-link-active'
            )}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}

        {/* Explorer sub-links */}
        {location.pathname === '/explorer' || location.pathname.startsWith('/explorer') ? (
          <div className="pt-2">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider px-3 py-2">Explorer Tabs</p>
            {explorerLinks.map(link => (
              <NavLink
                key={link.tab}
                to={`/explorer?tab=${link.tab}`}
                onClick={onClose}
                className={({ isActive }) => cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200',
                  'text-gray-500 hover:text-white hover:bg-white/5',
                  isActive && 'text-white bg-white/5'
                )}
              >
                <span className={cn('w-1.5 h-1.5 rounded-full bg-current', link.color)} />
                <span className={link.color}>{link.label}</span>
              </NavLink>
            ))}
          </div>
        ) : null}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="glass-card p-3 text-center">
          <p className="text-xs text-gray-500">UI/UX Pro Max</p>
          <p className="text-xs text-purple-400 font-medium">Design Library v1.0</p>
        </div>
      </div>
    </div>
  );
}
