import { SystemDesign } from '../../../data/systemDesigns';

interface Props {
  design: SystemDesign;
  page: string;
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-600" />
          <span className="font-bold text-sm">NeuralChat</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-gray-500">
          <a href="#" className="hover:text-white">Features</a>
          <a href="#" className="hover:text-white">Pricing</a>
          <a href="#" className="hover:text-white">Docs</a>
          <a href="#" className="hover:text-white">Blog</a>
        </div>
        <div className="flex gap-2">
          <button className="text-xs text-gray-400 hover:text-white px-3 py-1.5">Log in</button>
          <button className="text-xs bg-white text-black font-semibold px-3 py-1.5 rounded-lg">Start free →</button>
        </div>
      </nav>

      {/* Hero */}
      <div className="px-8 py-20 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs text-indigo-400 border border-indigo-500/30 bg-indigo-500/10 rounded-full px-3 py-1.5 mb-8">
          <span>✦</span> Now with GPT-4o and Claude 3.5 Sonnet
        </div>
        <h1 className="text-5xl font-black text-white mb-6 leading-tight tracking-tight">
          Build AI features<br />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">10x faster</span>
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
          The all-in-one AI platform for developers. Connect models, manage prompts, analyze usage, and ship faster.
        </p>
        <div className="flex justify-center gap-3 mb-12">
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm">
            Start for free
          </button>
          <button className="px-6 py-3 bg-white/5 border border-white/10 text-gray-300 font-semibold rounded-xl text-sm">
            View docs
          </button>
        </div>

        {/* Social proof */}
        <div className="text-xs text-gray-600 mb-12">
          Trusted by 12,000+ developers at
          <div className="flex items-center justify-center gap-8 mt-3 opacity-40">
            {['Stripe', 'Vercel', 'Linear', 'Notion', 'Loom'].map(c => (
              <span key={c} className="text-white font-bold">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Feature grid */}
      <div className="px-8 pb-16">
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { title: 'Model Router', desc: 'Automatically route prompts to the best model based on cost and performance', badge: 'New' },
            { title: 'Prompt Studio', desc: 'Version-controlled prompt library with A/B testing and analytics', badge: null },
            { title: 'Cost Analytics', desc: 'Real-time token usage tracking with budget alerts and team breakdowns', badge: null },
            { title: 'Fine-tuning', desc: 'Upload your data and fine-tune models with one click. No ML expertise needed', badge: 'Beta' },
            { title: 'Streaming SDK', desc: 'Drop-in React components for chat UIs with streaming responses', badge: null },
            { title: 'Team Access', desc: 'RBAC, audit logs, and SSO for enterprise security requirements', badge: null },
          ].map(f => (
            <div key={f.title} className="bg-white/3 border border-white/8 rounded-xl p-5 hover:bg-white/5 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-white">{f.title}</h3>
                {f.badge && <span className="text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full">{f.badge}</span>}
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-3">Simple, transparent pricing</h1>
          <p className="text-gray-400">Start for free. Scale as you grow.</p>
          <div className="flex justify-center gap-1 mt-4 bg-white/5 border border-white/10 rounded-xl p-1 w-fit mx-auto">
            <button className="px-4 py-1.5 text-sm bg-white text-black rounded-lg font-semibold">Monthly</button>
            <button className="px-4 py-1.5 text-sm text-gray-400">Annual <span className="text-green-400 text-xs">-20%</span></button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {[
            {
              name: 'Starter', price: '$0', desc: 'For individuals and small projects',
              features: ['1M tokens/month', '3 model providers', 'Basic analytics', 'Community support'],
              cta: 'Get started', featured: false,
            },
            {
              name: 'Pro', price: '$49', desc: 'For growing teams and production apps',
              features: ['50M tokens/month', 'All model providers', 'Advanced analytics', 'Fine-tuning access', 'Priority support', 'Webhooks & alerts'],
              cta: 'Start free trial', featured: true,
            },
            {
              name: 'Enterprise', price: 'Custom', desc: 'For large teams with custom needs',
              features: ['Unlimited tokens', 'Dedicated infra', 'Custom SLA', 'SAML SSO', 'Audit logs', 'Custom contracts'],
              cta: 'Contact sales', featured: false,
            },
          ].map(plan => (
            <div key={plan.name} className={`rounded-2xl p-6 border ${plan.featured ? 'bg-indigo-600/20 border-indigo-500/50 shadow-xl shadow-indigo-500/10' : 'bg-white/3 border-white/10'}`}>
              {plan.featured && <div className="text-xs text-indigo-300 font-semibold mb-3 flex items-center gap-1">⭐ Most Popular</div>}
              <h2 className="text-lg font-bold mb-1">{plan.name}</h2>
              <p className="text-gray-500 text-xs mb-4">{plan.desc}</p>
              <div className="text-3xl font-black mb-1">{plan.price}<span className="text-sm text-gray-500 font-normal">{plan.price !== 'Custom' ? '/mo' : ''}</span></div>
              <ul className="space-y-2 mt-4 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                    <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2.5 rounded-xl text-sm font-semibold ${plan.featured ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-white/10 hover:bg-white/15 text-white'}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">AI Dashboard</h1>
        <button className="px-3 py-1.5 text-xs bg-indigo-600 text-white rounded-lg">New Project</button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total Tokens Used', value: '18.4M', change: '+2.1M this week', color: 'text-indigo-400' },
          { label: 'Active Projects', value: '8', change: '+2 this month', color: 'text-purple-400' },
          { label: 'Avg Response Time', value: '1.2s', change: '-0.3s vs last week', color: 'text-cyan-400' },
          { label: 'Est. Monthly Cost', value: '$34.20', change: 'Under budget', color: 'text-green-400' },
        ].map(s => (
          <div key={s.label} className="bg-white/3 border border-white/8 rounded-xl p-4">
            <p className="text-gray-500 text-xs mb-1">{s.label}</p>
            <p className={`font-bold text-xl ${s.color}`}>{s.value}</p>
            <p className="text-gray-600 text-xs mt-1">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Usage chart */}
      <div className="bg-white/3 border border-white/8 rounded-xl p-4">
        <h2 className="text-sm font-semibold mb-4">Token Usage — Last 7 Days</h2>
        <div className="flex items-end gap-2 h-24">
          {[1.2, 2.8, 1.9, 3.4, 2.1, 4.2, 3.8].map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-indigo-600 rounded-t opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${(v / 4.5) * 100}%` }} />
              <span className="text-gray-600 text-xs">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent projects */}
      <div className="bg-white/3 border border-white/8 rounded-xl p-4">
        <h2 className="text-sm font-semibold mb-3">Recent Projects</h2>
        <div className="space-y-2">
          {[
            { name: 'Customer Support Bot', model: 'GPT-4o', tokens: '4.2M', status: 'Active' },
            { name: 'Code Review Assistant', model: 'Claude 3.5', tokens: '2.8M', status: 'Active' },
            { name: 'Content Generator', model: 'GPT-3.5', tokens: '8.1M', status: 'Paused' },
            { name: 'Data Extraction Pipeline', model: 'Claude 3 Haiku', tokens: '3.3M', status: 'Active' },
          ].map(p => (
            <div key={p.name} className="flex items-center justify-between py-2 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-xs">🤖</div>
                <div>
                  <p className="text-sm font-medium text-white">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.model} · {p.tokens} tokens</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{p.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DocsPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white flex">
      {/* Sidebar */}
      <div className="w-48 border-r border-white/5 p-4 flex-shrink-0">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Getting Started</p>
        <div className="space-y-1 mb-4">
          {['Introduction', 'Quick Start', 'Authentication', 'Rate Limits'].map(item => (
            <button key={item} className={`w-full text-left text-xs py-1.5 px-2 rounded ${item === 'Quick Start' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>{item}</button>
          ))}
        </div>
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Models</p>
        <div className="space-y-1 mb-4">
          {['Overview', 'GPT-4o', 'Claude 3.5', 'Gemini Pro', 'Fine-tuning'].map(item => (
            <button key={item} className="w-full text-left text-xs py-1.5 px-2 rounded text-gray-500 hover:text-white hover:bg-white/5">{item}</button>
          ))}
        </div>
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Guides</p>
        <div className="space-y-1">
          {['Chat Completions', 'Streaming', 'Function Calling', 'Embeddings'].map(item => (
            <button key={item} className="w-full text-left text-xs py-1.5 px-2 rounded text-gray-500 hover:text-white hover:bg-white/5">{item}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-2xl">
          <p className="text-xs text-indigo-400 mb-2">Getting Started</p>
          <h1 className="text-2xl font-black mb-4">Quick Start</h1>
          <p className="text-gray-400 text-sm mb-6">Get up and running with NeuralChat in 5 minutes.</p>

          <h2 className="text-base font-bold mb-3">1. Install the SDK</h2>
          <div className="bg-black/50 border border-white/10 rounded-xl p-4 mb-6 font-mono text-sm">
            <span className="text-gray-500">$ </span>
            <span className="text-green-400">npm install</span>
            <span className="text-white"> @neuralchat/sdk</span>
          </div>

          <h2 className="text-base font-bold mb-3">2. Initialize the client</h2>
          <div className="bg-black/50 border border-white/10 rounded-xl p-4 mb-6 font-mono text-xs space-y-1">
            <p><span className="text-purple-400">import</span> <span className="text-cyan-400">{'{ NeuralChat }'}</span> <span className="text-purple-400">from</span> <span className="text-yellow-300">'@neuralchat/sdk'</span>;</p>
            <p className="mt-2"><span className="text-purple-400">const</span> <span className="text-white">client</span> = <span className="text-purple-400">new</span> <span className="text-cyan-400">NeuralChat</span>({'{'}</p>
            <p className="pl-4"><span className="text-white">apiKey</span>: process.env.<span className="text-cyan-400">NEURALCHAT_API_KEY</span>,</p>
            <p>{'}'});</p>
          </div>

          <h2 className="text-base font-bold mb-3">3. Make your first request</h2>
          <div className="bg-black/50 border border-white/10 rounded-xl p-4 font-mono text-xs space-y-1">
            <p><span className="text-purple-400">const</span> <span className="text-white">response</span> = <span className="text-purple-400">await</span> client.chat({'{'}</p>
            <p className="pl-4"><span className="text-white">model</span>: <span className="text-yellow-300">'gpt-4o'</span>,</p>
            <p className="pl-4"><span className="text-white">messages</span>: [{'{'}</p>
            <p className="pl-8"><span className="text-white">role</span>: <span className="text-yellow-300">'user'</span>,</p>
            <p className="pl-8"><span className="text-white">content</span>: <span className="text-yellow-300">'Hello!'</span></p>
            <p className="pl-4">{'}'}],</p>
            <p>{'}'});</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AISaaSPages({ design, page }: Props) {
  switch (page) {
    case 'Landing': return <LandingPage />;
    case 'Pricing': return <PricingPage />;
    case 'Dashboard': return <DashboardPage />;
    case 'Docs': return <DocsPage />;
    default: return <LandingPage />;
  }
}
