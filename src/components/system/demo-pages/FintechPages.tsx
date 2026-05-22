import { SystemDesign } from '../../../data/systemDesigns';

interface Props {
  design: SystemDesign;
  page: string;
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans overflow-hidden">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500" />
          <span className="font-bold text-sm">CryptoDeskPro</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-gray-400">
          <a href="#" className="hover:text-white">Markets</a>
          <a href="#" className="hover:text-white">Trade</a>
          <a href="#" className="hover:text-white">Portfolio</a>
          <a href="#" className="hover:text-white">Learn</a>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs text-gray-300 border border-white/20 rounded-lg hover:bg-white/5">Sign In</button>
          <button className="px-3 py-1.5 text-xs bg-violet-600 text-white rounded-lg">Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative px-8 py-16 text-center">
        <div className="absolute inset-0 bg-gradient-radial from-violet-900/20 via-transparent to-transparent" />
        <div className="relative">
          {/* Live ticker */}
          <div className="flex items-center justify-center gap-6 mb-8 text-xs">
            {[
              { sym: 'BTC', price: '$43,201', change: '+2.4%', up: true },
              { sym: 'ETH', price: '$2,547', change: '+1.8%', up: true },
              { sym: 'SOL', price: '$98.23', change: '-0.7%', up: false },
              { sym: 'BNB', price: '$312', change: '+3.1%', up: true },
            ].map(coin => (
              <div key={coin.sym} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                <span className="text-gray-400">{coin.sym}</span>
                <span className="text-white font-mono font-semibold">{coin.price}</span>
                <span className={coin.up ? 'text-green-400' : 'text-red-400'}>{coin.change}</span>
              </div>
            ))}
          </div>

          <h1 className="text-5xl font-black mb-4">
            Trade Crypto Like a <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Pro</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
            Advanced trading tools, real-time data, and institutional-grade security for the modern crypto trader.
          </p>
          <div className="flex justify-center gap-3">
            <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-xl text-sm shadow-lg shadow-violet-500/30">
              Start Trading Free
            </button>
            <button className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl text-sm">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Feature grid */}
      <div className="px-8 pb-12 grid grid-cols-3 gap-4">
        {[
          { title: 'Real-time Data', desc: 'Sub-millisecond market data across 200+ trading pairs', icon: '⚡' },
          { title: 'Advanced Charts', desc: 'TradingView-grade charting with 100+ technical indicators', icon: '📊' },
          { title: 'Secure Custody', desc: 'Military-grade encryption and cold storage protection', icon: '🔐' },
        ].map(f => (
          <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="text-2xl mb-3">{f.icon}</div>
            <h3 className="text-sm font-bold text-white mb-2">{f.title}</h3>
            <p className="text-gray-500 text-xs">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Portfolio Dashboard</h1>
          <p className="text-gray-500 text-xs">Last updated: Just now</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-400">Export</button>
          <button className="px-3 py-1.5 text-xs bg-violet-600 text-white rounded-lg">Deposit</button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total Value', value: '$284,547.32', change: '+$12,451', positive: true },
          { label: '24h P&L', value: '+$4,892', change: '+1.75%', positive: true },
          { label: 'Open Positions', value: '7', change: '3 long / 4 short', positive: null },
          { label: 'Win Rate', value: '73.4%', change: 'Last 30 days', positive: true },
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-gray-500 text-xs mb-1">{s.label}</p>
            <p className="text-white font-bold text-lg">{s.value}</p>
            <p className={`text-xs mt-1 ${s.positive === true ? 'text-green-400' : s.positive === false ? 'text-red-400' : 'text-gray-500'}`}>
              {s.change}
            </p>
          </div>
        ))}
      </div>

      {/* Chart placeholder + holdings */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Portfolio Performance</h2>
            <div className="flex gap-1">
              {['1D', '1W', '1M', '3M', '1Y'].map(t => (
                <button key={t} className={`px-2 py-1 text-xs rounded ${t === '1M' ? 'bg-violet-600 text-white' : 'text-gray-500 hover:text-white'}`}>{t}</button>
              ))}
            </div>
          </div>
          {/* Fake chart */}
          <div className="h-36 relative">
            <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,90 C30,80 50,70 80,60 C110,50 130,75 160,55 C190,35 210,45 240,30 C270,15 290,40 320,25 C350,10 380,20 400,15 L400,120 L0,120 Z" fill="url(#chartGrad)" />
              <path d="M0,90 C30,80 50,70 80,60 C110,50 130,75 160,55 C190,35 210,45 240,30 C270,15 290,40 320,25 C350,10 380,20 400,15" fill="none" stroke="#7C3AED" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h2 className="text-sm font-semibold mb-3">Allocation</h2>
          <div className="space-y-2">
            {[
              { name: 'BTC', pct: 45, color: '#F59E0B' },
              { name: 'ETH', pct: 28, color: '#818CF8' },
              { name: 'SOL', pct: 15, color: '#06B6D4' },
              { name: 'Other', pct: 12, color: '#6B7280' },
            ].map(h => (
              <div key={h.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">{h.name}</span>
                  <span className="text-gray-300">{h.pct}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full" style={{ width: `${h.pct}%`, backgroundColor: h.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <h2 className="text-sm font-semibold mb-3">Recent Transactions</h2>
        <table className="w-full text-xs">
          <thead>
            <tr className="text-gray-600 border-b border-white/5">
              <th className="text-left py-2">Asset</th>
              <th className="text-left py-2">Type</th>
              <th className="text-right py-2">Amount</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">P&L</th>
              <th className="text-right py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {[
              { asset: 'BTC', type: 'Buy', amount: '0.5 BTC', price: '$42,800', pnl: '+$201', date: '2h ago', positive: true },
              { asset: 'ETH', type: 'Sell', amount: '2 ETH', price: '$2,540', pnl: '-$14', date: '5h ago', positive: false },
              { asset: 'SOL', type: 'Buy', amount: '50 SOL', price: '$96.40', pnl: '+$91', date: '1d ago', positive: true },
              { asset: 'BNB', type: 'Sell', amount: '10 BNB', price: '$308', pnl: '+$40', date: '2d ago', positive: true },
            ].map((tx, i) => (
              <tr key={i} className="border-b border-white/5 text-gray-400">
                <td className="py-2 font-medium text-white">{tx.asset}</td>
                <td className="py-2"><span className={`px-2 py-0.5 rounded-full text-xs ${tx.type === 'Buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{tx.type}</span></td>
                <td className="py-2 text-right font-mono">{tx.amount}</td>
                <td className="py-2 text-right font-mono">{tx.price}</td>
                <td className={`py-2 text-right font-mono font-semibold ${tx.positive ? 'text-green-400' : 'text-red-400'}`}>{tx.pnl}</td>
                <td className="py-2 text-right text-gray-600">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">Holdings</h1>
        <button className="px-3 py-1.5 text-xs bg-violet-600 text-white rounded-lg">+ Add Asset</button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-white/5">
            <tr className="text-gray-500">
              <th className="text-left px-4 py-3">Asset</th>
              <th className="text-right px-4 py-3">Holdings</th>
              <th className="text-right px-4 py-3">Avg Buy</th>
              <th className="text-right px-4 py-3">Current Price</th>
              <th className="text-right px-4 py-3">Value</th>
              <th className="text-right px-4 py-3">P&L</th>
              <th className="text-right px-4 py-3">P&L %</th>
              <th className="text-right px-4 py-3">Allocation</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Bitcoin', sym: 'BTC', color: '#F59E0B', amt: '3.24', avg: '$38,200', price: '$43,201', val: '$139,971', pnl: '+$16,246', pct: '+12.4%', alloc: '49%', pos: true },
              { name: 'Ethereum', sym: 'ETH', color: '#818CF8', amt: '32.5', avg: '$2,100', price: '$2,547', val: '$82,778', pnl: '+$14,528', pct: '+21.3%', alloc: '29%', pos: true },
              { name: 'Solana', sym: 'SOL', color: '#06B6D4', amt: '450', avg: '$105', price: '$98.23', val: '$44,204', pnl: '-$3,038', pct: '-6.5%', alloc: '16%', pos: false },
              { name: 'BNB', sym: 'BNB', color: '#EAB308', amt: '55', avg: '$295', price: '$312', val: '$17,160', pnl: '+$935', pct: '+5.8%', alloc: '6%', pos: true },
            ].map(h => (
              <tr key={h.sym} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ backgroundColor: h.color }}>{h.sym[0]}</div>
                    <div>
                      <p className="text-white font-medium">{h.sym}</p>
                      <p className="text-gray-600">{h.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-gray-300 font-mono">{h.amt}</td>
                <td className="px-4 py-3 text-right text-gray-400 font-mono">{h.avg}</td>
                <td className="px-4 py-3 text-right text-white font-mono">{h.price}</td>
                <td className="px-4 py-3 text-right text-white font-semibold">{h.val}</td>
                <td className={`px-4 py-3 text-right font-mono font-semibold ${h.pos ? 'text-green-400' : 'text-red-400'}`}>{h.pnl}</td>
                <td className={`px-4 py-3 text-right font-mono ${h.pos ? 'text-green-400' : 'text-red-400'}`}>{h.pct}</td>
                <td className="px-4 py-3 text-right text-gray-400">{h.alloc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OnboardingPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${s <= 2 ? 'bg-violet-600 text-white' : 'bg-white/10 text-gray-500'}`}>{s}</div>
              {s < 4 && <div className={`w-10 h-0.5 ${s < 2 ? 'bg-violet-600' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-center mb-2">Verify Your Identity</h2>
          <p className="text-gray-500 text-sm text-center mb-6">KYC verification — takes less than 2 minutes</p>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Full Legal Name</label>
              <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all" placeholder="As shown on your ID" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Date of Birth</label>
                <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-violet-500/50 transition-all" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Country</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-violet-500/50 transition-all">
                  <option value="">Select country</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                </select>
              </div>
            </div>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-violet-500/50 transition-colors cursor-pointer">
              <div className="text-3xl mb-2">📄</div>
              <p className="text-sm text-gray-400">Upload Government ID</p>
              <p className="text-xs text-gray-600 mt-1">Passport, Driver's License, or National ID</p>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-xl text-sm">
              Continue to Step 3 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TradePage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white p-4">
      <div className="grid grid-cols-3 gap-4">
        {/* Chart area */}
        <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-xs">₿</div>
              <div>
                <p className="font-bold text-white">BTC/USDT</p>
                <p className="text-green-400 text-xs">$43,201.54 <span className="text-gray-500">+2.4%</span></p>
              </div>
            </div>
            <div className="flex gap-1">
              {['1m', '5m', '15m', '1H', '4H', '1D'].map(t => (
                <button key={t} className={`px-2 py-1 text-xs rounded ${t === '1H' ? 'bg-violet-600 text-white' : 'text-gray-500'}`}>{t}</button>
              ))}
            </div>
          </div>
          {/* Candle chart mockup */}
          <div className="h-48 flex items-end gap-1 px-2">
            {Array.from({ length: 30 }).map((_, i) => {
              const h = 20 + Math.sin(i * 0.5) * 30 + Math.random() * 40;
              const isUp = Math.random() > 0.4;
              return (
                <div key={i} className="flex-1 flex flex-col items-center justify-end">
                  <div className="w-0.5 mx-auto mb-0.5" style={{ height: `${h * 0.3}px`, backgroundColor: isUp ? '#22C55E' : '#EF4444', opacity: 0.5 }} />
                  <div className="w-full rounded-sm" style={{ height: `${h * 0.6}px`, backgroundColor: isUp ? '#22C55E' : '#EF4444', opacity: 0.8 }} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Order form */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex gap-1 mb-4 bg-black/30 p-1 rounded-lg">
            <button className="flex-1 py-2 text-xs font-semibold bg-green-600 text-white rounded-md">Buy</button>
            <button className="flex-1 py-2 text-xs font-semibold text-gray-500">Sell</button>
          </div>

          <div className="flex gap-1 mb-4 text-xs">
            {['Limit', 'Market', 'Stop'].map(t => (
              <button key={t} className={`flex-1 py-1.5 rounded-lg ${t === 'Limit' ? 'bg-white/10 text-white' : 'text-gray-500'}`}>{t}</button>
            ))}
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Price (USDT)</label>
              <input className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-green-500/50" defaultValue="43,150.00" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Amount (BTC)</label>
              <input className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-green-500/50" defaultValue="0.1" />
            </div>
            <div className="flex gap-1">
              {['25%', '50%', '75%', '100%'].map(p => (
                <button key={p} className="flex-1 text-xs py-1.5 bg-white/5 border border-white/10 rounded text-gray-400 hover:bg-white/10">{p}</button>
              ))}
            </div>
            <div className="bg-black/30 rounded-lg p-3 space-y-2 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Total</span><span className="text-white font-mono">$4,315.00</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Fee (0.1%)</span><span className="text-white font-mono">$4.32</span>
              </div>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl text-sm shadow-lg shadow-green-500/20">
              Buy BTC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FintechPages({ design, page }: Props) {
  switch (page) {
    case 'Landing': return <LandingPage />;
    case 'Dashboard': return <DashboardPage />;
    case 'Portfolio': return <PortfolioPage />;
    case 'Onboarding': return <OnboardingPage />;
    case 'Trade': return <TradePage />;
    default: return <LandingPage />;
  }
}
