const stats = [
  { value: '67', label: 'UI Styles', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { value: '96', label: 'Color Palettes', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { value: '57', label: 'Font Pairings', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { value: '25', label: 'Chart Types', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { value: '99', label: 'UX Guidelines', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { value: '16', label: 'Design Systems', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
];

export default function StatsGrid() {
  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Library Stats</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map(stat => (
          <div
            key={stat.label}
            className={`${stat.bg} border ${stat.border} rounded-xl p-4 text-center`}
          >
            <div className={`text-3xl font-black ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
