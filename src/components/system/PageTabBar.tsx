interface PageTabBarProps {
  pages: string[];
  activePage: string;
  onPageChange: (page: string) => void;
}

export default function PageTabBar({ pages, activePage, onPageChange }: PageTabBarProps) {
  return (
    <div className="flex items-center gap-1 bg-black/30 rounded-xl p-1 overflow-x-auto no-scrollbar">
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
            activePage === page
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
              : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
