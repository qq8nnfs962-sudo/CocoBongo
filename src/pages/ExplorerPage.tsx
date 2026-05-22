import { useSearchParams, useNavigate } from 'react-router-dom';
import StylesTab from '../components/explorer/StylesTab';
import ColorsTab from '../components/explorer/ColorsTab';
import TypographyTab from '../components/explorer/TypographyTab';
import ChartsTab from '../components/explorer/ChartsTab';
import UXTab from '../components/explorer/UXTab';
import ProductsTab from '../components/explorer/ProductsTab';
import { cn } from '../lib/utils';

const TABS = [
  { id: 'styles', label: 'Styles', count: '67', color: 'text-purple-400', activeColor: 'text-purple-300 border-purple-500' },
  { id: 'colors', label: 'Colors', count: '96', color: 'text-cyan-400', activeColor: 'text-cyan-300 border-cyan-500' },
  { id: 'typography', label: 'Typography', count: '57', color: 'text-blue-400', activeColor: 'text-blue-300 border-blue-500' },
  { id: 'charts', label: 'Charts', count: '25', color: 'text-green-400', activeColor: 'text-green-300 border-green-500' },
  { id: 'ux', label: 'UX Guidelines', count: '99', color: 'text-yellow-400', activeColor: 'text-yellow-300 border-yellow-500' },
  { id: 'products', label: 'Products', count: '96', color: 'text-pink-400', activeColor: 'text-pink-300 border-pink-500' },
];

export default function ExplorerPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'styles';

  const handleTabChange = (tabId: string) => {
    navigate(`/explorer?tab=${tabId}`);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="sticky top-0 z-10 bg-gray-950 border-b border-white/10 px-6 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-black text-white">Design Library Explorer</h1>
          <p className="text-gray-500 text-sm">Browse and discover design assets</p>
        </div>
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg border-b-2 transition-all whitespace-nowrap',
                activeTab === tab.id
                  ? `${tab.activeColor} bg-white/5`
                  : 'text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5'
              )}
            >
              {tab.label}
              <span className={cn(
                'text-xs px-1.5 py-0.5 rounded-full font-mono',
                activeTab === tab.id ? 'bg-white/10' : 'bg-white/5'
              )}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'styles' && <StylesTab />}
        {activeTab === 'colors' && <ColorsTab />}
        {activeTab === 'typography' && <TypographyTab />}
        {activeTab === 'charts' && <ChartsTab />}
        {activeTab === 'ux' && <UXTab />}
        {activeTab === 'products' && <ProductsTab />}
      </div>
    </div>
  );
}
