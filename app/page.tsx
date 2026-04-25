export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ borderBottom: '1px solid var(--border)', background: 'rgba(8,8,8,0.85)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: 'var(--accent)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7C2 4.24 4.24 2 7 2s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5z" fill="white" fillOpacity="0.4"/>
              <path d="M7 4.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" fill="white"/>
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>addecay</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {['Features', 'Pricing', 'Docs', 'Blog'].map((item) => (
            <a key={item} href="#"
              className="text-sm transition-colors duration-150 hover:text-white"
              style={{ color: 'var(--text-secondary)' }}>
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="#" className="text-sm transition-colors duration-150 hover:text-white"
            style={{ color: 'var(--text-secondary)' }}>
            Sign in
          </a>
          <a href="#pricing"
            className="text-sm font-medium px-3.5 py-1.5 rounded-lg transition-opacity hover:opacity-80"
            style={{ background: 'var(--accent)', color: 'white' }}>
            Get started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center pt-40 pb-32 px-6 overflow-hidden">
        {/* radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%)',
          }} />
        {/* subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

        {/* badge */}
        <div className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-8"
          style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-secondary)' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
          Now in public beta
        </div>

        <h1 className="relative max-w-4xl text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          <span className="text-gradient">Your content decays.</span>
          <br />
          <span style={{ color: 'var(--text-primary)' }}>We help you fight back.</span>
        </h1>

        <p className="relative max-w-xl text-lg leading-relaxed mb-10"
          style={{ color: 'var(--text-secondary)' }}>
          Addecay monitors your published content for freshness signals, surfaces what&apos;s losing traction, and tells you exactly what to update — before rankings drop.
        </p>

        <div className="relative flex flex-col sm:flex-row items-center gap-3">
          <a href="#pricing"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
            style={{ background: 'var(--accent)', color: 'white', boxShadow: '0 0 30px var(--accent-glow)' }}>
            Start for free
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 hover:border-white/20 hover:text-white"
            style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
            View demo
          </a>
        </div>

        <p className="relative mt-5 text-xs" style={{ color: 'var(--text-muted)' }}>
          No credit card required · 14-day free trial
        </p>
      </section>

      {/* Features */}
      <section className="px-6 pb-28 max-w-6xl mx-auto" id="features">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Everything your content needs to stay alive
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: '◎',
              title: 'Decay Detection',
              desc: 'Automatically identifies content losing organic traction using freshness signals, backlink velocity, and engagement drop patterns.',
            },
            {
              icon: '⬡',
              title: 'AI Update Briefs',
              desc: 'Generates precise update recommendations — new statistics, missing subtopics, outdated sections — ranked by expected impact.',
            },
            {
              icon: '◈',
              title: 'Competitor Pulse',
              desc: 'Tracks competing pages for the same keywords and alerts you when a rival article is updated or outpacing yours.',
            },
            {
              icon: '◇',
              title: 'Freshness Score',
              desc: 'A single 0–100 score per URL reflecting content age, SERP position trend, and audience engagement — at a glance.',
            },
            {
              icon: '○',
              title: 'Bulk Monitoring',
              desc: 'Connect your sitemap or CMS and monitor hundreds of URLs automatically. Works with WordPress, Webflow, Ghost, and more.',
            },
            {
              icon: '◑',
              title: 'Team Workflows',
              desc: 'Assign update tasks, set deadlines, and track refreshes directly in Addecay. Integrates with Slack and Linear.',
            },
          ].map((f) => (
            <div key={f.title}
              className="p-6 rounded-xl transition-all duration-200 hover:border-white/10"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="text-xl mb-4" style={{ color: 'var(--accent)' }}>{f.icon}</div>
              <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 pb-28 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Live in minutes
          </h2>
        </div>

        <div className="grid md:grid-cols-3 rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--border)' }}>
          {[
            { step: '01', title: 'Connect your site', desc: 'Paste your sitemap URL or connect via our CMS integrations. We index your content instantly.' },
            { step: '02', title: 'Addecay monitors', desc: 'Our engine checks freshness signals daily — rankings, clicks, engagement, and competitive changes.' },
            { step: '03', title: 'You act on insights', desc: 'Get prioritized refresh queues and AI-drafted update briefs sent straight to your workflow.' },
          ].map((s, i) => (
            <div key={s.step} className="flex flex-col gap-4 p-8"
              style={{
                background: i === 1 ? 'var(--surface-elevated)' : 'var(--surface)',
                borderRight: i < 2 ? '1px solid var(--border)' : 'none',
              }}>
              <span className="text-xs font-mono font-semibold" style={{ color: 'var(--text-muted)' }}>{s.step}</span>
              <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 pb-28 max-w-5xl mx-auto" id="pricing">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
            Pricing
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Simple, usage-based pricing
          </h2>
          <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Start free. Scale as your content library grows.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              name: 'Starter',
              price: '$0',
              period: 'forever',
              desc: 'Perfect for individuals and small blogs.',
              features: ['Up to 25 URLs', 'Weekly freshness scans', 'Decay score dashboard', 'Email alerts'],
              cta: 'Get started free',
              highlight: false,
            },
            {
              name: 'Pro',
              price: '$29',
              period: '/month',
              desc: 'For content teams serious about organic growth.',
              features: ['Up to 500 URLs', 'Daily freshness scans', 'AI update briefs', 'Competitor pulse', 'Slack & Linear integration', 'Priority support'],
              cta: 'Start free trial',
              highlight: true,
            },
            {
              name: 'Scale',
              price: '$99',
              period: '/month',
              desc: 'For agencies and large content operations.',
              features: ['Unlimited URLs', 'Real-time monitoring', 'Everything in Pro', 'Custom CMS connectors', 'Dedicated onboarding', 'SLA guarantee'],
              cta: 'Contact sales',
              highlight: false,
            },
          ].map((plan) => (
            <div key={plan.name}
              className="relative flex flex-col p-6 rounded-xl"
              style={{
                background: plan.highlight ? 'var(--surface-elevated)' : 'var(--surface)',
                border: plan.highlight ? '1px solid var(--accent)' : '1px solid var(--border)',
              }}>
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-semibold px-3 py-0.5 rounded-full"
                    style={{ background: 'var(--accent)', color: 'white' }}>
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: plan.highlight ? 'var(--accent)' : 'var(--text-muted)' }}>
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>{plan.price}</span>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{plan.period}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{plan.desc}</p>
              </div>

              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <svg className="mt-0.5 shrink-0" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke={plan.highlight ? 'var(--accent)' : 'var(--text-muted)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#"
                className="text-center text-sm font-medium py-2.5 rounded-lg transition-opacity hover:opacity-80"
                style={{
                  background: plan.highlight ? 'var(--accent)' : 'transparent',
                  color: plan.highlight ? 'white' : 'var(--text-secondary)',
                  border: plan.highlight ? 'none' : '1px solid var(--border)',
                }}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="px-6 pb-28 max-w-3xl mx-auto text-center">
        <div className="relative p-12 rounded-xl overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
          <h2 className="relative text-3xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            Stop letting good content decay
          </h2>
          <p className="relative text-sm leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
            Join teams who use Addecay to keep their content library performing — not just when it&apos;s published, but years after.
          </p>
          <a href="#pricing"
            className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
            style={{ background: 'var(--accent)', color: 'white' }}>
            Get started free
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 pb-12 max-w-6xl mx-auto"
        style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 pt-10">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                <path d="M2 7C2 4.24 4.24 2 7 2s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5z" fill="white" fillOpacity="0.4"/>
                <path d="M7 4.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" fill="white"/>
              </svg>
            </div>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>addecay</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
            {[
              { heading: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
              { heading: 'Resources', links: ['Docs', 'Blog', 'Guides', 'Status'] },
              { heading: 'Company', links: ['About', 'Twitter', 'GitHub', 'Contact'] },
              { heading: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
            ].map((col) => (
              <div key={col.heading}>
                <p className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{col.heading}</p>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="transition-colors duration-150 hover:text-white"
                        style={{ color: 'var(--text-muted)' }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 flex items-center justify-between"
          style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2026 Addecay. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Built for content teams
          </p>
        </div>
      </footer>

    </div>
  );
}
