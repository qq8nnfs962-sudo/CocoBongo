import { Link } from 'react-router-dom';
import { SystemDesign } from '../../data/systemDesigns';

interface SystemCardProps {
  design: SystemDesign;
}

export default function SystemCard({ design }: SystemCardProps) {
  return (
    <Link
      to={`/systems/${design.id}`}
      className="glass-card hover:border-white/20 transition-all duration-300 group overflow-hidden block"
    >
      {/* Color bar preview */}
      <div className="flex h-12">
        <div className="flex-1" style={{ backgroundColor: design.backgroundColor }} />
        <div className="flex-1" style={{ backgroundColor: design.surfaceColor }} />
        <div className="flex-1" style={{ backgroundColor: design.primaryColor }} />
        <div className="flex-1" style={{ backgroundColor: design.secondaryColor }} />
        <div className="flex-1" style={{ backgroundColor: design.accentColor }} />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors mb-1">
              {design.name}
            </h3>
            <p className="text-xs text-gray-600">{design.category}</p>
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-3 leading-relaxed line-clamp-2">{design.description}</p>

        {/* Style info */}
        <div className="mb-3 text-xs">
          <span className="text-gray-600">Style: </span>
          <span className="text-gray-400">{design.style}</span>
        </div>

        {/* Font info */}
        <div className="mb-3 text-xs flex gap-4">
          <div>
            <span className="text-gray-600">H: </span>
            <span className="text-purple-400 font-mono">{design.headingFont}</span>
          </div>
          <div>
            <span className="text-gray-600">B: </span>
            <span className="text-cyan-400 font-mono">{design.bodyFont}</span>
          </div>
        </div>

        {/* Color dots */}
        <div className="flex gap-1.5 mb-3">
          {[design.primaryColor, design.secondaryColor, design.accentColor, design.textColor].map((color, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full border border-white/10"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        {/* Pages */}
        <div className="flex flex-wrap gap-1">
          {design.pages.slice(0, 4).map(page => (
            <span key={page} className="text-xs text-gray-700 bg-white/5 px-2 py-0.5 rounded">
              {page}
            </span>
          ))}
          {design.pages.length > 4 && (
            <span className="text-xs text-gray-700">+{design.pages.length - 4}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
