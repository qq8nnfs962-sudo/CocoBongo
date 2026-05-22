import { SystemDesign } from '../../../data/systemDesigns';

interface Props {
  design: SystemDesign;
  page: string;
}

function GenericLanding({ design }: { design: SystemDesign }) {
  const isDark = design.backgroundColor.startsWith('#0') || design.backgroundColor.startsWith('#1') || design.backgroundColor.startsWith('#03') || design.backgroundColor === '#09090B';

  return (
    <div className="min-h-screen" style={{ backgroundColor: design.backgroundColor, color: design.textColor, fontFamily: `'${design.bodyFont}', sans-serif` }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4" style={{ borderBottom: `1px solid ${design.primaryColor}20` }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg" style={{ background: `linear-gradient(135deg, ${design.primaryColor}, ${design.accentColor})` }} />
          <span className="font-bold text-sm">{design.name}</span>
        </div>
        <div className="flex items-center gap-6 text-xs opacity-60">
          {design.pages.slice(0, 4).map(p => <a key={p} href="#">{p}</a>)}
        </div>
        <button className="px-4 py-2 text-xs font-semibold rounded-lg text-white" style={{ backgroundColor: design.primaryColor }}>
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <div className="px-8 py-16 text-center">
        <div className="inline-flex items-center gap-2 text-xs border rounded-full px-3 py-1.5 mb-6 opacity-70" style={{ borderColor: `${design.primaryColor}40` }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: design.accentColor }} />
          {design.category} Platform
        </div>
        <h1 className="text-4xl font-black mb-4" style={{ fontFamily: `'${design.headingFont}', serif` }}>
          The Modern{' '}
          <span style={{ background: `linear-gradient(90deg, ${design.primaryColor}, ${design.accentColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {design.category}
          </span>{' '}
          Platform
        </h1>
        <p className="opacity-60 text-base max-w-xl mx-auto mb-8">{design.description}</p>
        <div className="flex justify-center gap-3">
          <button className="px-6 py-3 font-semibold rounded-xl text-sm text-white" style={{ background: `linear-gradient(135deg, ${design.primaryColor}, ${design.secondaryColor})` }}>
            Start Free Trial
          </button>
          <button className="px-6 py-3 font-semibold rounded-xl text-sm border" style={{ borderColor: `${design.primaryColor}30`, color: design.textColor, backgroundColor: `${design.surfaceColor}` }}>
            Learn More
          </button>
        </div>
      </div>

      {/* Feature grid */}
      <div className="px-8 pb-12 grid grid-cols-3 gap-4 max-w-4xl mx-auto">
        {[
          { title: 'AI-Powered', desc: 'Smart automation that learns from your workflow and optimizes outcomes' },
          { title: 'Real-time Sync', desc: 'Live data synchronization across all your devices and team members' },
          { title: 'Advanced Analytics', desc: 'Deep insights and visualizations to help you make data-driven decisions' },
        ].map(f => (
          <div key={f.title} className="rounded-2xl p-5 border" style={{ backgroundColor: design.surfaceColor, borderColor: `${design.primaryColor}20` }}>
            <div className="w-8 h-8 rounded-lg mb-3" style={{ backgroundColor: `${design.accentColor}30` }}>
              <div className="w-full h-full flex items-center justify-center text-lg">✦</div>
            </div>
            <h3 className="text-sm font-bold mb-2">{f.title}</h3>
            <p className="text-xs opacity-60 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenericDashboard({ design }: { design: SystemDesign }) {
  return (
    <div className="min-h-screen p-4 space-y-4" style={{ backgroundColor: design.backgroundColor, color: design.textColor }}>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold" style={{ fontFamily: `'${design.headingFont}', serif` }}>Dashboard</h1>
        <button className="px-3 py-1.5 text-xs font-semibold rounded-lg text-white" style={{ backgroundColor: design.primaryColor }}>
          + New
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total Users', value: '24,891', change: '+12%' },
          { label: 'Revenue', value: '$48,200', change: '+8.4%' },
          { label: 'Conversion', value: '3.24%', change: '+0.5%' },
          { label: 'Satisfaction', value: '94.2%', change: '+2.1%' },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-4 border" style={{ backgroundColor: design.surfaceColor, borderColor: `${design.primaryColor}20` }}>
            <p className="text-xs opacity-50 mb-1">{s.label}</p>
            <p className="font-bold text-xl">{s.value}</p>
            <p className="text-xs mt-1" style={{ color: design.accentColor }}>{s.change} this month</p>
          </div>
        ))}
      </div>

      {/* Chart area */}
      <div className="rounded-xl p-4 border" style={{ backgroundColor: design.surfaceColor, borderColor: `${design.primaryColor}20` }}>
        <h2 className="text-sm font-semibold mb-4">Performance Overview</h2>
        <div className="flex items-end gap-1 h-28">
          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-t opacity-80"
              style={{ height: `${v}%`, backgroundColor: i === 5 || i === 9 ? design.accentColor : design.primaryColor }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs opacity-40">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>

      {/* Recent items */}
      <div className="rounded-xl p-4 border" style={{ backgroundColor: design.surfaceColor, borderColor: `${design.primaryColor}20` }}>
        <h2 className="text-sm font-semibold mb-3">Recent Activity</h2>
        <div className="space-y-2">
          {[
            { text: 'New user registered', time: '2 min ago', type: 'user' },
            { text: 'Report generated successfully', time: '15 min ago', type: 'report' },
            { text: 'Payment processed: $1,240', time: '1 hr ago', type: 'payment' },
            { text: 'System backup completed', time: '3 hrs ago', type: 'system' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: `1px solid ${design.primaryColor}10` }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: `${design.accentColor}20` }}>
                {item.type === 'user' ? '👤' : item.type === 'report' ? '📊' : item.type === 'payment' ? '💳' : '⚙️'}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium">{item.text}</p>
              </div>
              <span className="text-xs opacity-40">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GenericListPage({ design, page }: { design: SystemDesign; page: string }) {
  return (
    <div className="min-h-screen p-4 space-y-4" style={{ backgroundColor: design.backgroundColor, color: design.textColor }}>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold" style={{ fontFamily: `'${design.headingFont}', serif` }}>{page}</h1>
        <div className="flex gap-2">
          <input
            className="px-3 py-1.5 text-xs rounded-lg border bg-transparent placeholder-opacity-40"
            style={{ borderColor: `${design.primaryColor}30`, color: design.textColor }}
            placeholder="Search..."
          />
          <button className="px-3 py-1.5 text-xs font-semibold rounded-lg text-white" style={{ backgroundColor: design.primaryColor }}>
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden border hover:scale-[1.02] transition-transform cursor-pointer" style={{ backgroundColor: design.surfaceColor, borderColor: `${design.primaryColor}20` }}>
            <div className="h-28 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${design.primaryColor}40, ${design.accentColor}20)` }}>
              <div className="w-12 h-12 rounded-full opacity-50" style={{ backgroundColor: design.accentColor }} />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold mb-1">{page} Item {i + 1}</h3>
              <p className="text-xs opacity-50 mb-3">A sample entry for the {page.toLowerCase()} section of this design system.</p>
              <div className="flex gap-1">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${design.primaryColor}20`, color: design.primaryColor }}>
                  {design.category}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${design.accentColor}20`, color: design.accentColor }}>
                  Active
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenericDetailPage({ design, page }: { design: SystemDesign; page: string }) {
  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: design.backgroundColor, color: design.textColor }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-xs opacity-50 mb-4">
          <span>{design.name}</span>
          <span>/</span>
          <span>{page}</span>
          <span>/</span>
          <span>Detail View</span>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: `${design.primaryColor}20` }}>
              <div className="h-48 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${design.backgroundColor}, ${design.surfaceColor}, ${design.primaryColor}30)` }}>
                <div className="text-center opacity-50">
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-3" style={{ backgroundColor: design.primaryColor }} />
                  <p className="text-sm">{page} Preview</p>
                </div>
              </div>
              <div className="p-6" style={{ backgroundColor: design.surfaceColor }}>
                <h1 className="text-2xl font-black mb-2" style={{ fontFamily: `'${design.headingFont}', serif` }}>{page} Detail</h1>
                <p className="text-sm opacity-60 mb-4 leading-relaxed">
                  This is a detailed view for the {page.toLowerCase()} section. It shows all relevant information, metadata, and actions available for this item in the {design.name} design system.
                </p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 text-sm font-semibold rounded-xl text-white" style={{ backgroundColor: design.primaryColor }}>
                    Primary Action
                  </button>
                  <button className="px-4 py-2 text-sm font-semibold rounded-xl border" style={{ borderColor: `${design.primaryColor}30` }}>
                    Secondary
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl p-4 border" style={{ backgroundColor: design.surfaceColor, borderColor: `${design.primaryColor}20` }}>
              <h3 className="text-sm font-bold mb-3">Details</h3>
              {[
                ['Status', 'Active'],
                ['Category', design.category],
                ['Created', 'Jan 15, 2024'],
                ['Modified', 'Today'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5 text-xs" style={{ borderBottom: `1px solid ${design.primaryColor}10` }}>
                  <span className="opacity-50">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-4 border" style={{ backgroundColor: design.surfaceColor, borderColor: `${design.primaryColor}20` }}>
              <h3 className="text-sm font-bold mb-3">Related</h3>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2 py-2" style={{ borderBottom: `1px solid ${design.primaryColor}10` }}>
                  <div className="w-6 h-6 rounded" style={{ backgroundColor: `${design.primaryColor}30` }} />
                  <span className="text-xs">Related Item {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GenericFormPage({ design, page }: { design: SystemDesign; page: string }) {
  return (
    <div className="min-h-screen p-4 flex items-center justify-center" style={{ backgroundColor: design.backgroundColor, color: design.textColor }}>
      <div className="w-full max-w-md">
        <div className="rounded-2xl p-8 border" style={{ backgroundColor: design.surfaceColor, borderColor: `${design.primaryColor}20` }}>
          <h1 className="text-2xl font-black mb-2 text-center" style={{ fontFamily: `'${design.headingFont}', serif` }}>{page}</h1>
          <p className="text-sm opacity-50 text-center mb-6">Complete this form to continue</p>

          <div className="space-y-4">
            {[
              { label: 'Name', type: 'text', placeholder: 'Your full name' },
              { label: 'Email', type: 'email', placeholder: 'your@email.com' },
              { label: 'Message', type: 'textarea', placeholder: 'Tell us more...' },
            ].map(field => (
              <div key={field.label}>
                <label className="text-xs font-semibold mb-1 block opacity-60">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    className="w-full px-3 py-2.5 text-sm rounded-xl border bg-transparent resize-none focus:outline-none"
                    style={{ borderColor: `${design.primaryColor}30`, color: design.textColor }}
                    placeholder={field.placeholder}
                    rows={3}
                  />
                ) : (
                  <input
                    type={field.type}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border bg-transparent focus:outline-none"
                    style={{ borderColor: `${design.primaryColor}30`, color: design.textColor }}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}

            <button className="w-full py-3 font-semibold rounded-xl text-sm text-white mt-2" style={{ background: `linear-gradient(135deg, ${design.primaryColor}, ${design.secondaryColor})` }}>
              Submit →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GenericPages({ design, page }: Props) {
  const pageLower = page.toLowerCase();

  if (pageLower === 'landing' || pageLower === 'home') {
    return <GenericLanding design={design} />;
  }
  if (pageLower === 'dashboard' || pageLower === 'overview') {
    return <GenericDashboard design={design} />;
  }
  if (['listing', 'catalog', 'explore', 'feed', 'leaderboard', 'report', 'candidates', 'reports', 'segments', 'plans'].includes(pageLower)) {
    return <GenericListPage design={design} page={page} />;
  }
  if (['detail', 'item', 'course', 'article', 'employee', 'profile', 'appointment', 'menu', 'records'].includes(pageLower)) {
    return <GenericDetailPage design={design} page={page} />;
  }
  if (['checkout', 'onboarding', 'reservation', 'search', 'mortgage', 'order', 'messages', 'nutrition', 'goals', 'my progress', 'settings', 'workout', 'wishlist', 'playground', 'changelog', 'api reference', 'docs', 'pricing'].includes(pageLower)) {
    return <GenericFormPage design={design} page={page} />;
  }

  return <GenericLanding design={design} />;
}
