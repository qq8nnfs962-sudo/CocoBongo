import { Link } from 'react-router-dom';
import { systemDesigns } from '../../data/systemDesigns';

const featured = ['fintech-crypto', 'ai-saas', 'gaming', 'nft-marketplace'];

export default function FeaturedDesigns() {
  const designs = systemDesigns.filter(d => featured.includes(d.id));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Featured Systems</h2>
        <Link to="/systems" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
          View all 16 →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {designs.map(design => (
          <Link
            key={design.id}
            to={`/systems/${design.id}`}
            className="glass-card p-4 hover:border-white/20 transition-all duration-300 group"
          >
            {/* Color dots */}
            <div className="flex gap-1.5 mb-3">
              {[design.primaryColor, design.secondaryColor, design.accentColor, design.backgroundColor, design.surfaceColor].map((color, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full border border-white/10 flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <h3 className="text-sm font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
              {design.name}
            </h3>
            <p className="text-gray-600 text-xs mb-2">{design.style}</p>
            <p className="text-gray-500 text-xs line-clamp-2">{design.description}</p>

            <div className="flex flex-wrap gap-1 mt-3">
              {design.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
