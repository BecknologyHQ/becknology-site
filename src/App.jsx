import { useState, useEffect, useRef, useCallback } from 'react'

// ─── DATA ────────────────────────────────────────────────────────────────────

const TICKER_DATA = [
  { symbol: 'NQ', price: 21847.50, change: 1.24, up: true },
  { symbol: 'ES', price: 6012.25, change: 0.87, up: true },
  { symbol: 'GC', price: 2945.30, change: -0.32, up: false },
  { symbol: 'CL', price: 78.42, change: 2.15, up: true },
  { symbol: 'ROK', price: 287.64, change: 0.45, up: true },
  { symbol: 'VRT', price: 124.38, change: 3.21, up: true },
  { symbol: 'CEG', price: 215.92, change: 1.87, up: true },
  { symbol: 'ETN', price: 342.15, change: -0.54, up: false },
  { symbol: 'SYM', price: 45.67, change: 2.33, up: true },
  { symbol: 'FANUY', price: 18.24, change: 0.98, up: true },
  { symbol: 'ABB', price: 52.81, change: -0.71, up: false },
  { symbol: 'GLW', price: 38.45, change: 1.12, up: true },
  { symbol: 'AMZN', price: 228.34, change: 0.67, up: true },
  { symbol: 'NVDA', price: 138.87, change: 4.52, up: true },
  { symbol: 'RRX', price: 267.93, change: -1.23, up: false },
  { symbol: 'CGNX', price: 52.18, change: -1.08, up: false },
  { symbol: 'BTC', price: 97245, change: 2.41, up: true },
]

const RESTAURANTS = [
  { name: 'Chick-fil-A', type: 'Fast Food', color: '#e31837' },
  { name: 'Chipotle', type: 'Mexican', color: '#A81612' },
  { name: 'Panera', type: 'Bakery Cafe', color: '#4A7729' },
  { name: 'Shake Shack', type: 'Burgers', color: '#1d7a3f' },
  { name: 'Wingstop', type: 'Wings', color: '#2D8B3D' },
  { name: 'Cava', type: 'Mediterranean', color: '#2C5F2D' },
  { name: 'Five Guys', type: 'Burgers', color: '#EF2724' },
  { name: 'Texas Roadhouse', type: 'Steakhouse', color: '#8B0000' },
  { name: 'Olive Garden', type: 'Italian', color: '#556B2F' },
  { name: 'First Watch', type: 'Breakfast', color: '#d4920b' },
  { name: 'Local Gem', type: 'Try Something New', color: '#7c3aed' },
  { name: "Dealer's Choice", type: 'Ask a Coworker', color: '#e040a0' },
]

const WILD_FACTS = [
  { fact: 'A single semiconductor fab uses as much electricity as 50,000 homes.', category: 'POWER' },
  { fact: 'Amazon deploys over 750,000 robots across its fulfillment network.', category: 'AUTOMATION' },
  { fact: 'The average car contains over 30,000 parts from hundreds of suppliers.', category: 'MANUFACTURING' },
  { fact: 'Data centers will consume 8% of US electricity by 2030, up from 3% today.', category: 'AI INFRASTRUCTURE' },
  { fact: 'A Cognex vision system inspects 1,200 parts per minute with 99.7% accuracy.', category: 'MACHINE VISION' },
  { fact: "Vertiv's cooling systems keep 70% of the world's data centers from overheating.", category: 'INFRASTRUCTURE' },
  { fact: 'A single Hershey plant can produce 70 million Kisses per day.', category: 'CONSUMER GOODS' },
  { fact: 'The global industrial robot market will hit $80 billion by 2030.', category: 'ROBOTICS' },
]

const DISCOVERY_DATA = [
  { tag: 'WILD FACT', tagColor: '#f59e0b', timestamp: 'Today', title: 'Your Coffee Traveled 7,000 Miles', body: 'Start with something familiar. Ethiopian highlands to automated roasting to robotic packaging — your morning brew touches 23 automated systems before it hits your cup.', category: 'consumer' },
  { tag: 'HOW IT WORKS', tagColor: '#22c55e', timestamp: 'Today', title: 'Inside an Amazon Fulfillment Center', body: 'Show the machine. Kiva robots, vision-guided picking arms, ML-optimized routing — 750K+ robots turn chaos into next-day delivery.', category: 'automation' },
  { tag: 'COMPANY SPOTLIGHT', tagColor: '#06b6d4', timestamp: 'Today', title: 'Vertiv Holdings ($VRT) — The AI Power Play', body: 'While everyone watches NVIDIA, Vertiv quietly keeps 70% of global data centers from overheating. Up 187% in 12 months.', category: 'markets' },
  { tag: 'MARKET SIGNAL', tagColor: '#7c3aed', timestamp: '06:42 ET', title: 'NQ Momentum Shift Detected', body: 'Pre-market volume spike aligns with historical pattern preceding 2%+ intraday moves. Key level: 21,800. The automation thesis is in the tape.', category: 'markets' },
  { tag: 'CROSSOVER', tagColor: '#e040a0', timestamp: '03:12 ET', title: 'When PLC Logic Meets Risk Management', body: 'Connect the dots. Industrial control system principles applied to position sizing — deterministic state machines for trade management.', category: 'crossover' },
  { tag: 'RABBIT HOLE', tagColor: '#8b5cf6', timestamp: 'Today', title: 'The Mineral Supply Chain Loop', body: 'AI needs chips. Chips need rare earth minerals. Minerals need mining. Mining needs automation. Automation needs AI. The infinity loop.', category: 'discovery' },
]

const SPOTLIGHT_COMPANIES = [
  { ticker: 'ROK', name: 'Rockwell Automation', thesis: 'Largest pure-play industrial automation company. 50%+ of North American PLC market.', sector: 'Industrial Automation', metric: '+45% 1Y' },
  { ticker: 'VRT', name: 'Vertiv Holdings', thesis: 'Data center thermal management. Every AI GPU needs cooling — Vertiv provides it.', sector: 'AI Infrastructure', metric: '+187% 1Y' },
  { ticker: 'CEG', name: 'Constellation Energy', thesis: 'Nuclear power for data centers. Carbon-free baseload. Microsoft signed a 20-year PPA.', sector: 'Energy / AI Power', metric: '+92% 1Y' },
  { ticker: 'NVDA', name: 'NVIDIA', thesis: 'The engine behind AI training. Data center revenue up 400% YoY. The picks-and-shovels play.', sector: 'AI / Semiconductors', metric: '+210% 1Y' },
  { ticker: 'SYM', name: 'Symbotic', thesis: 'Warehouse automation robots for Walmart, Target, and more. $23B backlog.', sector: 'Warehouse Automation', metric: '+65% 1Y' },
  { ticker: 'ETN', name: 'Eaton Corporation', thesis: 'Electrical infrastructure for data centers and EV charging. Power distribution backbone.', sector: 'Electrical Systems', metric: '+38% 1Y' },
]

const RESOURCES_DATA = [
  { title: 'The 3 AM Playbook', desc: 'Pre-market futures strategy framework for NQ and ES', tag: 'STRATEGY', available: true },
  { title: 'How Robots See', desc: 'Machine vision systems explained — from Cognex to custom', tag: 'AUTOMATION', available: true },
  { title: 'AI Power Crisis Report', desc: 'Why data centers are the new oil wells', tag: 'RESEARCH', available: true },
  { title: 'PLC-to-Python Pipeline', desc: 'Bridging industrial automation data to quantitative models', tag: 'TUTORIAL', available: true },
  { title: 'Reshoring Thesis', desc: 'Why manufacturing is coming back to America — and who wins', tag: 'INVESTMENT', premium: true },
  { title: 'Tradeify Funded Trader', desc: 'Fastest path to a funded futures account', tag: 'PARTNER', available: true, affiliate: true },
]

const TYPING_PHRASES = [
  'AI needs data centers...',
  'Data centers need power...',
  'Power needs minerals...',
  'Minerals need mining...',
  'Mining needs automation...',
  'Everything is connected.',
]

// ─── SVG ICONS (no emojis) ──────────────────────────────────────────────────

function ArrowIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
}
function LockIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
}

// ─── FADE-IN WRAPPER ────────────────────────────────────────────────────────

function FadeInSection({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`bk-fade-in ${visible ? 'visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function AnimatedBackground() {
  return (
    <div className="bk-grid-bg" aria-hidden="true">
      <div className="bk-orb bk-orb-1" />
      <div className="bk-orb bk-orb-2" />
      <div className="bk-orb bk-orb-3" />
      <div className="bk-orb bk-orb-4" />
      <div className="bk-noise" />
    </div>
  )
}

function NavBar({ navOpen, setNavOpen }) {
  const scrollTo = (id) => {
    setNavOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <nav className="bk-nav">
      <div className="bk-nav-inner">
        <div className="bk-nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="bk-nav-brand-mark">
            <img src="/logo.png" alt="Becknology" className="bk-nav-logo" />
          </div>
        </div>
        <div className={`bk-nav-links ${navOpen ? 'open' : ''}`}>
          <button className="bk-nav-link" onClick={() => scrollTo('feed')}>Discover</button>
          <button className="bk-nav-link" onClick={() => scrollTo('decider')}>The Decider</button>
          <button className="bk-nav-link" onClick={() => scrollTo('spotlight')}>Markets</button>
          <button className="bk-nav-link" onClick={() => scrollTo('resources')}>Resources</button>
        </div>
        <button className="bk-hamburger" onClick={() => setNavOpen(!navOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}

function TickerTape({ prices }) {
  const fmt = (p) => p >= 1000 ? p.toLocaleString('en-US', { minimumFractionDigits: p >= 10000 ? 2 : 2, maximumFractionDigits: 2 }) : p.toFixed(2)
  const items = prices.map((t, i) => (
    <span key={i} className={`bk-ticker-item ${t.flash || ''}`}>
      <span className="bk-ticker-symbol">{t.symbol}</span>
      <span className="bk-ticker-price">{fmt(t.price)}</span>
      <span className={`bk-ticker-change ${t.up ? 'up' : 'down'}`}>{t.up ? '+' : ''}{t.change.toFixed(2)}%</span>
    </span>
  ))
  return (
    <div className="bk-ticker-bar">
      <div className="bk-ticker-track">
        {items}{items.map((el, i) => <span key={`d${i}`} className={`bk-ticker-item ${prices[i]?.flash || ''}`}>{el.props.children}</span>)}
      </div>
      <div className="bk-ticker-disclaimer">Simulated data — not financial advice</div>
    </div>
  )
}

function HeroSection({ typingText, email, setEmail, onSubmit }) {
  return (
    <section className="bk-hero">
      <FadeInSection>
        <div className="bk-hero-logo-wrap">
          <img src="/logo-wide.jpg" alt="Becknology" className="bk-hero-logo" />
        </div>
      </FadeInSection>
      <FadeInSection delay={150}>
        <h1 className="bk-hero-title">
          Discover Where <span className="bk-gradient-text">Everything</span> Connects
        </h1>
      </FadeInSection>
      <FadeInSection delay={300}>
        <p className="bk-hero-subtitle">
          The free discovery platform where automation, capital markets, and everyday products
          collide. Wild facts, real signals, and rabbit holes you didn&apos;t know existed.
        </p>
      </FadeInSection>
      <FadeInSection delay={400}>
        <div className="bk-hero-typing">
          <span className="bk-typing-text">{typingText}</span>
          <span className="bk-typing-cursor">|</span>
        </div>
      </FadeInSection>
      <FadeInSection delay={500}>
        <div className="bk-email-row">
          <input type="email" className="bk-input" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          <button className="bk-btn-primary" onClick={onSubmit}>Get the Signal</button>
        </div>
      </FadeInSection>
    </section>
  )
}

function TheDecider({ isSpinning, spinResult, onSpin, wheelRotation, showConfetti, zipCode, setZipCode }) {
  const segCount = RESTAURANTS.length
  const segAngle = 360 / segCount
  const conicStops = RESTAURANTS.map((r, i) => {
    const start = (i * segAngle).toFixed(1)
    const end = ((i + 1) * segAngle).toFixed(1)
    return `${r.color} ${start}deg ${end}deg`
  }).join(', ')

  return (
    <section id="decider" className="bk-section bk-decider-section">
      <FadeInSection>
        <h2 className="bk-section-title">Where Should We Eat?</h2>
        <p className="bk-section-subtitle">Type in your zip. Spin it. Go.</p>
        <div className="bk-zip-row">
          <input type="text" className="bk-input bk-zip-input" placeholder="Your zip" maxLength={5} value={zipCode} onChange={e => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))} />
        </div>
      </FadeInSection>
      <FadeInSection delay={200}>
        <div className="bk-wheel-stage" style={{ perspective: '1000px' }}>
          <div className="bk-wheel-3d">
            <div className="bk-wheel-pointer">
              <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
                <defs><linearGradient id="ptrGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e040a0"/><stop offset="100%" stopColor="#7c3aed"/></linearGradient></defs>
                <polygon points="14,36 0,0 28,0" fill="url(#ptrGrad)"/>
              </svg>
            </div>
            <div className="bk-wheel" style={{ transform: `rotate(${wheelRotation}deg)`, background: `conic-gradient(${conicStops})` }}>
              {RESTAURANTS.map((r, i) => {
                const angle = segAngle * i + segAngle / 2
                return (
                  <span key={i} className="bk-wheel-label" style={{ transform: `rotate(${angle}deg) translateY(-120px) rotate(-${angle}deg)` }}>
                    {r.name.length > 12 ? r.name.slice(0, 11) + '\u2026' : r.name}
                  </span>
                )
              })}
            </div>
            <button className={`bk-spin-btn ${isSpinning ? 'spinning' : ''}`} onClick={onSpin} disabled={isSpinning}>
              {isSpinning ? <span className="bk-spin-icon" /> : 'SPIN'}
            </button>
            {isSpinning && <div className="bk-wheel-ring" />}
          </div>
        </div>
      </FadeInSection>
      {spinResult && !isSpinning && (
        <div className="bk-wheel-result">
          {showConfetti && <div className="bk-confetti" aria-hidden="true">{Array.from({length:12}).map((_,i) => <span key={i} className="bk-confetti-dot" style={{'--i':i}} />)}</div>}
          <span className="bk-result-tag">YOU&apos;RE GOING TO</span>
          <h3 className="bk-result-name bk-gradient-text">{spinResult.name}</h3>
          <p className="bk-result-type">{spinResult.type}{zipCode && zipCode.length === 5 ? ` near ${zipCode}` : ''}</p>
          <button className="bk-btn-outline" onClick={onSpin} style={{ marginTop: 16 }}>Spin Again</button>
        </div>
      )}
    </section>
  )
}

function DiscoveryFeed({ filter, setFilter }) {
  const filtered = filter === 'all' ? DISCOVERY_DATA : DISCOVERY_DATA.filter(d => d.category === filter)
  return (
    <section id="feed" className="bk-section">
      <FadeInSection>
        <h2 className="bk-section-title">Discovery Feed</h2>
        <p className="bk-section-subtitle">Latest dispatches from the intersection.</p>
      </FadeInSection>
      <FadeInSection delay={100}>
        <div className="bk-feed-filters">
          {['all', 'markets', 'automation', 'consumer', 'discovery', 'crossover'].map(f => (
            <button key={f} className={`bk-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? 'ALL' : f.toUpperCase()}
            </button>
          ))}
        </div>
      </FadeInSection>
      <div className="bk-signals-grid">
        {filtered.map((s, i) => (
          <FadeInSection key={`${filter}-${i}`} delay={i * 100}>
            <div className="bk-signal-card" style={{ '--accent': s.tagColor }}>
              <div className="bk-signal-header">
                <span className="bk-signal-tag" style={{ color: s.tagColor }}>{s.tag}</span>
                <span className="bk-signal-time">{s.timestamp}</span>
              </div>
              <h3 className="bk-signal-title">{s.title}</h3>
              <p className="bk-signal-body">{s.body}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}

function DidYouKnow({ currentIndex, onPrev, onNext }) {
  const fact = WILD_FACTS[currentIndex]
  return (
    <section className="bk-section bk-facts-section">
      <FadeInSection>
        <h2 className="bk-section-title">Did You Know?</h2>
        <div className="bk-fact-card">
          <span className="bk-fact-category">{fact.category}</span>
          <p className="bk-fact-text">{fact.fact}</p>
          <div className="bk-fact-nav">
            <button className="bk-fact-arrow" onClick={onPrev}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div className="bk-fact-dots">
              {WILD_FACTS.map((_, i) => <span key={i} className={`bk-dot ${i === currentIndex ? 'active' : ''}`} />)}
            </div>
            <button className="bk-fact-arrow" onClick={onNext}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}

function CompanySpotlight() {
  const trackRef = useRef(null)
  const scroll = (dir) => { trackRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' }) }
  return (
    <section id="spotlight" className="bk-section">
      <FadeInSection>
        <h2 className="bk-section-title">Company Spotlight</h2>
        <p className="bk-section-subtitle">The tickers behind the thesis.</p>
      </FadeInSection>
      <FadeInSection delay={100}>
        <div className="bk-spotlight-wrap">
          <button className="bk-spot-arrow left" onClick={() => scroll(-1)} aria-label="Scroll left">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div className="bk-spotlight-track" ref={trackRef}>
            {SPOTLIGHT_COMPANIES.map((c, i) => (
              <div key={i} className="bk-spotlight-card">
                <span className="bk-spot-sector">{c.sector}</span>
                <span className="bk-spot-ticker bk-gradient-text">${c.ticker}</span>
                <span className="bk-spot-name">{c.name}</span>
                <p className="bk-spot-thesis">{c.thesis}</p>
                <span className={`bk-spot-metric ${c.metric.startsWith('+') ? 'up' : 'down'}`}>{c.metric}</span>
              </div>
            ))}
          </div>
          <button className="bk-spot-arrow right" onClick={() => scroll(1)} aria-label="Scroll right">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </FadeInSection>
    </section>
  )
}

function ResourcesGrid() {
  return (
    <section id="resources" className="bk-section">
      <FadeInSection>
        <h2 className="bk-section-title">Resources</h2>
        <p className="bk-section-subtitle">Frameworks, tutorials, and field notes.</p>
      </FadeInSection>
      <div className="bk-resources-grid">
        {RESOURCES_DATA.map((r, i) => (
          <FadeInSection key={i} delay={i * 80}>
            <div className={`bk-resource-card ${r.premium ? 'locked' : ''}`}>
              <span className="bk-resource-tag">{r.tag}</span>
              <h3 className="bk-resource-title">{r.title} {r.premium && <LockIcon />}</h3>
              <p className="bk-resource-desc">{r.desc}</p>
              {!r.premium && r.available && <span className="bk-resource-arrow"><ArrowIcon /></span>}
              {!r.available && !r.premium && <span className="bk-coming-soon">COMING SOON</span>}
              {r.affiliate && <span className="bk-partner-tag">AFFILIATE PARTNER</span>}
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}

function NewsletterCTA({ email, setEmail, onSubmit }) {
  return (
    <section id="cta" className="bk-section bk-final-cta">
      <FadeInSection>
        <h2 className="bk-section-title">Get the <span className="bk-gradient-text">Signal</span></h2>
        <p className="bk-section-subtitle">Weekly dispatch from the intersection of automation and capital markets. Wild facts, real signals, rabbit holes. No ads, no noise — just the thread.</p>
        <div className="bk-email-row">
          <input type="email" className="bk-input" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          <button className="bk-btn-primary" onClick={onSubmit}>Subscribe</button>
        </div>
        <div className="bk-social-links">
          <a href="https://youtube.com/@BecknologyTV" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="https://tiktok.com/@becknologytv" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://x.com/BecknologyTV" target="_blank" rel="noopener noreferrer">X</a>
        </div>
      </FadeInSection>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bk-footer">
      <img src="/logo.png" alt="Becknology" className="bk-footer-logo" />
      <span className="bk-footer-tagline">Markets · Machines · Method</span>
      <div className="bk-footer-links">
        <a href="#feed">Discover</a><a href="#decider">The Decider</a><a href="#spotlight">Markets</a><a href="#resources">Resources</a>
      </div>
      <span className="bk-footer-copy">&copy; {new Date().getFullYear()} Becknology. Built in Kansas City.</span>
    </footer>
  )
}

// ─── STYLES ──────────────────────────────────────────────────────────────────

const CSS = `
@property --angle { syntax:'<angle>'; inherits:false; initial-value:0deg }
@keyframes rotate-angle { to { --angle:360deg } }

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;scrollbar-width:thin;scrollbar-color:#7c3aed #0a0a0f}
::-webkit-scrollbar{width:8px}
::-webkit-scrollbar-track{background:#0a0a0f}
::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#7c3aed,#e040a0);border-radius:4px}
::-webkit-scrollbar-thumb:hover{background:linear-gradient(180deg,#9b4dff,#ff4d9b)}
body{font-family:'Outfit',sans-serif;background:#0a0a0f;color:#f0f0f5;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:#a78bfa;text-decoration:none;transition:color .2s}a:hover{color:#c4b5fd}

/* Fade In */
.bk-fade-in{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}
.bk-fade-in.visible{opacity:1;transform:translateY(0)}

/* Background */
.bk-grid-bg{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.bk-grid-bg::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(124,58,237,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,.06) 1px,transparent 1px);background-size:60px 60px}
.bk-grid-bg::after{content:'';position:absolute;width:3px;height:3px;top:0;left:0;border-radius:50%;box-shadow:120px 15vh 0 rgba(124,58,237,.25),280px 35vh 0 rgba(224,64,160,.2),450px 55vh 0 rgba(6,182,212,.22),620px 20vh 0 rgba(124,58,237,.18),790px 70vh 0 rgba(224,64,160,.25),950px 40vh 0 rgba(6,182,212,.2),110px 80vh 0 rgba(155,77,255,.22),340px 10vh 0 rgba(255,77,155,.18),560px 90vh 0 rgba(77,155,255,.2),730px 50vh 0 rgba(124,58,237,.22),890px 25vh 0 rgba(224,64,160,.18),1060px 65vh 0 rgba(6,182,212,.25),200px 45vh 0 rgba(155,77,255,.2),480px 75vh 0 rgba(255,77,155,.22),650px 8vh 0 rgba(77,155,255,.18),820px 85vh 0 rgba(124,58,237,.2),1000px 30vh 0 rgba(224,64,160,.22),160px 60vh 0 rgba(6,182,212,.18),390px 95vh 0 rgba(155,77,255,.25),700px 42vh 0 rgba(255,77,155,.2),1100px 15vh 0 rgba(77,155,255,.22),50px 52vh 0 rgba(124,58,237,.18),510px 28vh 0 rgba(224,64,160,.2),850px 78vh 0 rgba(6,182,212,.22),1150px 48vh 0 rgba(155,77,255,.18);animation:particles-drift 45s linear infinite}
@keyframes particles-drift{0%{transform:translateY(0)}100%{transform:translateY(-100vh)}}
.bk-orb{position:absolute;border-radius:50%;filter:blur(120px);opacity:.6}
.bk-orb-1{width:650px;height:650px;top:-10%;left:-5%;background:radial-gradient(circle,rgba(124,58,237,.2) 0%,transparent 70%);animation:orb1 22s ease-in-out infinite}
.bk-orb-2{width:550px;height:550px;top:35%;right:-10%;background:radial-gradient(circle,rgba(224,64,160,.17) 0%,transparent 70%);animation:orb2 28s ease-in-out infinite}
.bk-orb-3{width:450px;height:450px;bottom:15%;left:15%;background:radial-gradient(circle,rgba(6,182,212,.12) 0%,transparent 70%);animation:orb3 25s ease-in-out infinite}
.bk-orb-4{width:400px;height:400px;bottom:-5%;right:25%;background:radial-gradient(circle,rgba(77,155,255,.12) 0%,transparent 70%);animation:orb4 30s ease-in-out infinite}
@keyframes orb1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(80px,-60px) scale(1.08)}66%{transform:translate(-40px,40px) scale(.95)}}
@keyframes orb2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-100px,80px) scale(1.05)}66%{transform:translate(60px,-30px) scale(.92)}}
@keyframes orb3{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(60px,50px) scale(1.1)}66%{transform:translate(-80px,-40px) scale(.9)}}
@keyframes orb4{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-50px,-60px) scale(1.06)}66%{transform:translate(70px,30px) scale(.94)}}
.bk-noise{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.035;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}

/* Nav */
.bk-nav{position:sticky;top:0;z-index:200;background:rgba(10,10,15,.92);backdrop-filter:blur(20px);border-bottom:1px solid rgba(124,58,237,.08)}
.bk-nav-inner{max-width:1200px;margin:0 auto;padding:0 24px;height:56px;display:flex;align-items:center;justify-content:space-between}
.bk-nav-brand{display:flex;align-items:center;cursor:pointer}
.bk-nav-brand-mark{position:relative;padding:2px;border-radius:10px;background:linear-gradient(135deg,#7c3aed,#e040a0,#06b6d4);background-size:300% 300%;animation:border-shimmer 6s ease infinite}
.bk-nav-brand-mark::after{content:'';position:absolute;inset:-6px;border-radius:14px;background:linear-gradient(135deg,rgba(124,58,237,.3),rgba(224,64,160,.2),rgba(6,182,212,.3));filter:blur(12px);opacity:.4;z-index:-1;animation:border-shimmer 6s ease infinite}
@keyframes border-shimmer{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.bk-nav-logo{height:32px;border-radius:8px;display:block}
.bk-nav-links{display:flex;align-items:center;gap:4px}
.bk-nav-link{position:relative;background:none;border:none;color:#9ca3af;font-family:'Outfit',sans-serif;font-size:.85rem;padding:8px 14px;border-radius:6px;cursor:pointer;transition:all .2s}
.bk-nav-link::after{content:'';position:absolute;bottom:2px;left:50%;width:0;height:2px;background:linear-gradient(90deg,#7c3aed,#e040a0);transition:all .3s;transform:translateX(-50%);border-radius:1px}
.bk-nav-link:hover{color:#f0f0f5}
.bk-nav-link:hover::after{width:70%}
.bk-hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px}
.bk-hamburger span{width:22px;height:2px;background:#a78bfa;border-radius:2px;transition:all .2s}

/* Ticker */
.bk-ticker-bar{position:sticky;top:56px;z-index:100;background:rgba(10,10,15,.92);backdrop-filter:blur(16px);border-bottom:1px solid transparent;border-image:linear-gradient(90deg,transparent,rgba(124,58,237,.25),rgba(224,64,160,.25),transparent) 1;padding:8px 0;overflow:hidden;font-family:'JetBrains Mono',monospace;font-size:.8rem}
.bk-ticker-track{display:flex;gap:40px;white-space:nowrap;width:max-content;animation:ticker 40s linear infinite}
.bk-ticker-bar:hover .bk-ticker-track{animation-play-state:paused}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.bk-ticker-item{display:inline-flex;gap:8px;align-items:center;padding:4px 10px;border-radius:4px;transition:background .2s}
.bk-ticker-item:hover{background:rgba(124,58,237,.08)}
.bk-ticker-item.flash-up{animation:flash-green .8s ease}
.bk-ticker-item.flash-down{animation:flash-red .8s ease}
@keyframes flash-green{0%{box-shadow:0 0 12px rgba(34,197,94,.4)}100%{box-shadow:none}}
@keyframes flash-red{0%{box-shadow:0 0 12px rgba(239,68,68,.4)}100%{box-shadow:none}}
.bk-ticker-symbol{color:#a78bfa;font-weight:700}
.bk-ticker-price{color:#f0f0f5}
.bk-ticker-change.up{color:#22c55e}.bk-ticker-change.down{color:#ef4444}
.bk-ticker-disclaimer{text-align:center;font-size:.55rem;color:#4b5563;padding:4px 0 0;letter-spacing:.5px}

/* Main */
.bk-main{position:relative;z-index:1}

/* Hero */
.bk-hero{max-width:800px;margin:0 auto;padding:80px 24px 60px;text-align:center}
.bk-hero-logo-wrap{position:relative;display:inline-block;margin-bottom:36px}
.bk-hero-logo-wrap::before{content:'';position:absolute;inset:-40px;background:radial-gradient(ellipse,rgba(124,58,237,.2) 0%,rgba(224,64,160,.1) 40%,transparent 70%);filter:blur(30px);z-index:-1}
.bk-hero-logo{width:min(380px,85vw);border-radius:12px;display:block}
.bk-hero-title{font-family:'Outfit',sans-serif;font-weight:800;font-size:clamp(2rem,5.5vw,3.8rem);line-height:1.1;margin-bottom:20px;text-shadow:0 0 40px rgba(124,58,237,.15)}
.bk-gradient-text{background:linear-gradient(135deg,#9b4dff 0%,#ff4d9b 40%,#4d9bff 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 0 20px rgba(155,77,255,.3))}
.bk-hero-subtitle{font-size:1.05rem;color:#9ca3af;max-width:560px;margin:0 auto 24px;line-height:1.7}
.bk-hero-typing{font-family:'JetBrains Mono',monospace;font-size:.9rem;color:#a78bfa;height:28px;margin-bottom:32px;display:flex;justify-content:center;align-items:center}
.bk-typing-cursor{animation:blink .8s step-end infinite;margin-left:2px;color:#e040a0}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}

/* Buttons */
.bk-btn-primary{position:relative;overflow:hidden;font-family:'Outfit',sans-serif;font-weight:600;font-size:.95rem;padding:12px 28px;border-radius:8px;border:none;background:linear-gradient(135deg,#7c3aed,#e040a0);color:#fff;cursor:pointer;transition:transform .2s,box-shadow .2s}
.bk-btn-primary::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);transform:translateX(-100%);transition:transform .5s}
.bk-btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(124,58,237,.5),0 0 40px rgba(224,64,160,.15)}
.bk-btn-primary:hover::before{transform:translateX(100%)}
.bk-btn-outline{font-family:'Outfit',sans-serif;font-weight:600;font-size:.95rem;padding:12px 28px;border-radius:8px;border:1px solid rgba(124,58,237,.4);background:transparent;color:#a78bfa;cursor:pointer;transition:all .2s}
.bk-btn-outline:hover{border-color:#7c3aed;background:rgba(124,58,237,.08)}

/* Input */
.bk-input{font-family:'JetBrains Mono',monospace;font-size:.85rem;padding:12px 18px;border-radius:8px;border:1px solid rgba(124,58,237,.25);background:rgba(17,17,24,.6);backdrop-filter:blur(8px);color:#f0f0f5;outline:none;transition:border-color .3s,box-shadow .3s}
.bk-input:focus{border-color:#7c3aed;box-shadow:0 0 0 3px rgba(124,58,237,.15),0 0 20px rgba(124,58,237,.1)}
.bk-input::placeholder{color:#6b7280}
.bk-email-row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}

/* Sections */
.bk-section{max-width:1100px;margin:0 auto;padding:80px 24px}
.bk-section-title{font-family:'Outfit',sans-serif;font-weight:700;font-size:clamp(1.6rem,3.5vw,2.4rem);text-align:center;margin-bottom:10px}
.bk-section-title::after{content:'';display:block;width:60px;height:2px;margin:14px auto 0;background:linear-gradient(90deg,#7c3aed,#e040a0);border-radius:2px}
.bk-section-subtitle{text-align:center;color:#9ca3af;font-size:1rem;max-width:500px;margin:0 auto 40px}

/* Decider / Wheel */
.bk-decider-section{text-align:center}
.bk-zip-row{display:flex;justify-content:center;margin-bottom:28px}
.bk-zip-input{width:120px;text-align:center;font-size:.9rem;letter-spacing:2px}
.bk-wheel-stage{display:inline-block;margin:0 auto 32px}
.bk-wheel-3d{position:relative;display:inline-block;transform:rotateX(5deg);transform-style:preserve-3d}
.bk-wheel-pointer{position:relative;z-index:4;margin:0 auto 4px;width:28px;filter:drop-shadow(0 4px 14px rgba(224,64,160,.6))}
.bk-wheel{width:340px;height:340px;border-radius:50%;position:relative;margin:0 auto;transition:transform 4.3s cubic-bezier(.17,.67,.12,.99);border:4px solid rgba(124,58,237,.5);box-shadow:inset 0 0 40px rgba(0,0,0,.7),inset 0 0 80px rgba(0,0,0,.3),0 0 30px rgba(124,58,237,.35),0 0 80px rgba(124,58,237,.15),0 12px 40px rgba(0,0,0,.6)}
.bk-wheel::before{content:'';position:absolute;inset:0;border-radius:50%;z-index:1;pointer-events:none;background:radial-gradient(ellipse at 30% 25%,rgba(255,255,255,.18) 0%,transparent 55%),radial-gradient(ellipse at 70% 80%,rgba(0,0,0,.2) 0%,transparent 50%)}
.bk-wheel::after{content:'';position:absolute;inset:0;border-radius:50%;z-index:2;pointer-events:none;background:repeating-conic-gradient(rgba(0,0,0,.35) 0deg .5deg,transparent .5deg 30deg)}
.bk-wheel-label{position:absolute;top:50%;left:50%;font-family:'JetBrains Mono',monospace;font-size:.55rem;font-weight:700;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,.9);transform-origin:center center;margin-top:-6px;margin-left:-35px;width:70px;text-align:center;pointer-events:none;z-index:3}
.bk-spin-btn{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:68px;height:68px;border-radius:50%;border:2px solid rgba(124,58,237,.5);background:radial-gradient(circle,#141420 60%,#1a1a2e 100%);color:#a78bfa;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:.8rem;cursor:pointer;z-index:5;transition:all .3s;box-shadow:0 0 15px rgba(124,58,237,.2),inset 0 0 10px rgba(124,58,237,.1)}
.bk-spin-btn:hover:not(:disabled){transform:translate(-50%,-50%) scale(1.08);border-color:rgba(224,64,160,.6);box-shadow:0 0 25px rgba(224,64,160,.4),inset 0 0 15px rgba(224,64,160,.1)}
.bk-spin-btn.spinning{cursor:wait}
.bk-spin-icon{display:inline-block;width:16px;height:16px;border:2px solid rgba(167,139,250,.3);border-top-color:#a78bfa;border-radius:50%;animation:spin-icon .6s linear infinite}
@keyframes spin-icon{to{transform:rotate(360deg)}}
.bk-wheel-ring{position:absolute;inset:-12px;border-radius:50%;border:2px solid transparent;border-top-color:rgba(224,64,160,.5);border-right-color:rgba(124,58,237,.3);animation:ring-spin 1.2s linear infinite;pointer-events:none;z-index:0}
@keyframes ring-spin{to{transform:rotate(360deg)}}

/* Confetti */
.bk-confetti{position:relative;height:0;overflow:visible;display:flex;justify-content:center}
.bk-confetti-dot{position:absolute;width:6px;height:6px;border-radius:50%;background:#e040a0;animation:confetti-burst .8s ease-out forwards;animation-delay:calc(var(--i) * 0.03s);opacity:0}
.bk-confetti-dot:nth-child(odd){background:#7c3aed}
.bk-confetti-dot:nth-child(3n){background:#06b6d4}
@keyframes confetti-burst{0%{opacity:1;transform:translate(0,0) scale(1)}100%{opacity:0;transform:translate(calc(cos(calc(var(--i)*30deg))*80px),calc(sin(calc(var(--i)*30deg))*80px - 40px)) scale(0)}}

/* Wheel Result */
.bk-wheel-result{animation:fadeUp .5s ease;text-align:center;padding-top:8px}
.bk-result-tag{font-family:'JetBrains Mono',monospace;font-size:.7rem;letter-spacing:2px;color:#9ca3af}
.bk-result-name{font-size:2.2rem;font-weight:800;margin:8px 0}
.bk-result-type{color:#9ca3af;font-size:.9rem}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

/* Facts */
.bk-facts-section{text-align:center}
.bk-fact-card{max-width:650px;margin:0 auto;background:rgba(17,17,24,.6);backdrop-filter:blur(12px);border:1px solid rgba(124,58,237,.1);border-radius:16px;padding:40px 32px;transition:border-color .3s}
.bk-fact-card:hover{border-color:rgba(124,58,237,.25)}
.bk-fact-category{font-family:'JetBrains Mono',monospace;font-size:.7rem;font-weight:700;letter-spacing:2px;color:#f59e0b}
.bk-fact-text{font-family:'Outfit',sans-serif;font-size:1.35rem;font-weight:500;line-height:1.5;margin:20px 0 28px;min-height:84px}
.bk-fact-nav{display:flex;align-items:center;justify-content:center;gap:16px}
.bk-fact-arrow{background:none;border:1px solid rgba(124,58,237,.2);color:#a78bfa;width:36px;height:36px;border-radius:50%;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center}
.bk-fact-arrow:hover{border-color:#7c3aed;background:rgba(124,58,237,.1)}
.bk-fact-dots{display:flex;gap:6px}
.bk-dot{width:8px;height:8px;border-radius:50%;background:rgba(124,58,237,.2);transition:all .3s}
.bk-dot.active{background:#7c3aed;box-shadow:0 0 8px rgba(124,58,237,.5)}

/* Feed Filters */
.bk-feed-filters{display:flex;gap:8px;justify-content:center;margin-bottom:32px;flex-wrap:wrap}
.bk-filter-btn{font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:1px;padding:6px 16px;border-radius:20px;border:1px solid rgba(124,58,237,.12);background:rgba(17,17,24,.4);backdrop-filter:blur(8px);color:#6b7280;cursor:pointer;transition:all .25s}
.bk-filter-btn:hover{color:#a78bfa;border-color:rgba(124,58,237,.3);background:rgba(17,17,24,.6)}
.bk-filter-btn.active{background:linear-gradient(135deg,rgba(124,58,237,.2),rgba(224,64,160,.1));color:#a78bfa;border-color:rgba(124,58,237,.4)}

/* Signal Cards */
.bk-signals-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.bk-signal-card{position:relative;background:rgba(17,17,24,.6);backdrop-filter:blur(12px);border:1px solid rgba(124,58,237,.08);border-left:3px solid var(--accent,#7c3aed);border-radius:12px;padding:24px;transition:all .3s;overflow:hidden}
.bk-signal-card::before{content:'';position:absolute;inset:-1px;border-radius:12px;background:conic-gradient(from var(--angle),#7c3aed,#e040a0,#06b6d4,#7c3aed);mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;padding:1px;opacity:0;transition:opacity .4s;animation:rotate-angle 4s linear infinite}
.bk-signal-card:hover{transform:translateY(-4px);box-shadow:0 8px 32px rgba(124,58,237,.1)}
.bk-signal-card:hover::before{opacity:1}
.bk-signal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.bk-signal-tag{font-family:'JetBrains Mono',monospace;font-size:.65rem;font-weight:700;letter-spacing:1.5px}
.bk-signal-time{font-family:'JetBrains Mono',monospace;font-size:.65rem;color:#6b7280}
.bk-signal-title{font-family:'Outfit',sans-serif;font-weight:600;font-size:1.05rem;margin-bottom:8px}
.bk-signal-body{color:#9ca3af;font-size:.85rem;line-height:1.6}

/* Spotlight */
.bk-spotlight-wrap{position:relative}
.bk-spotlight-track{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:4px}
.bk-spotlight-track::-webkit-scrollbar{display:none}
.bk-spotlight-card{min-width:300px;background:rgba(17,17,24,.6);backdrop-filter:blur(12px);border:1px solid rgba(124,58,237,.1);border-radius:12px;padding:28px;scroll-snap-align:start;flex-shrink:0;transition:all .3s;position:relative;overflow:hidden}
.bk-spotlight-card::before{content:'';position:absolute;inset:-1px;border-radius:12px;background:conic-gradient(from var(--angle),#7c3aed,#e040a0,#06b6d4,#7c3aed);mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;padding:1px;opacity:0;transition:opacity .4s;animation:rotate-angle 4s linear infinite}
.bk-spotlight-card:hover{transform:translateY(-4px);border-color:rgba(124,58,237,.3);box-shadow:0 8px 32px rgba(124,58,237,.1)}
.bk-spotlight-card:hover::before{opacity:1}
.bk-spot-sector{font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:2px;color:#6b7280;display:block;margin-bottom:12px}
.bk-spot-ticker{font-family:'Outfit',sans-serif;font-weight:800;font-size:2rem;display:block;margin-bottom:4px;text-shadow:0 0 20px rgba(155,77,255,.2)}
.bk-spot-name{font-size:.9rem;color:#9ca3af;display:block;margin-bottom:12px}
.bk-spot-thesis{font-size:.85rem;color:#9ca3af;line-height:1.5;margin-bottom:12px}
.bk-spot-metric{font-family:'JetBrains Mono',monospace;font-size:.8rem;font-weight:700}
.bk-spot-metric.up{color:#22c55e}.bk-spot-metric.down{color:#ef4444}
.bk-spot-arrow{position:absolute;top:50%;transform:translateY(-50%);width:40px;height:40px;border-radius:50%;border:1px solid rgba(124,58,237,.15);background:rgba(10,10,15,.9);backdrop-filter:blur(8px);color:#a78bfa;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;z-index:2}
.bk-spot-arrow:hover{border-color:#7c3aed;background:rgba(124,58,237,.1);box-shadow:0 0 12px rgba(124,58,237,.2)}
.bk-spot-arrow.left{left:-12px}.bk-spot-arrow.right{right:-12px}

/* Resources */
.bk-resources-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.bk-resource-card{position:relative;overflow:hidden;background:rgba(17,17,24,.6);backdrop-filter:blur(12px);border:1px solid rgba(124,58,237,.08);border-radius:12px;padding:24px;cursor:pointer;transition:all .3s}
.bk-resource-card::before{content:'';position:absolute;inset:-1px;border-radius:12px;background:conic-gradient(from var(--angle),#7c3aed,#e040a0,#06b6d4,#7c3aed);mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;padding:1px;opacity:0;transition:opacity .4s;animation:rotate-angle 4s linear infinite}
.bk-resource-card:hover{transform:translateY(-4px);box-shadow:0 8px 32px rgba(124,58,237,.1)}
.bk-resource-card:hover::before{opacity:1}
.bk-resource-card:hover .bk-resource-arrow{transform:translateX(4px);color:#a78bfa}
.bk-resource-card.locked{opacity:.65}
.bk-resource-card.locked:hover{opacity:.85}
.bk-resource-tag{font-family:'JetBrains Mono',monospace;font-size:.6rem;font-weight:700;letter-spacing:2px;color:#7c3aed;margin-bottom:10px;display:block}
.bk-resource-title{font-family:'Outfit',sans-serif;font-weight:600;font-size:1.05rem;margin-bottom:6px;display:flex;align-items:center;gap:6px}
.bk-resource-desc{color:#9ca3af;font-size:.85rem}
.bk-resource-arrow{position:absolute;top:24px;right:24px;color:#6b7280;transition:all .3s}
.bk-coming-soon{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:1px;color:#6b7280;margin-top:8px;display:block}
.bk-partner-tag{font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:1px;color:#f59e0b;opacity:.7;margin-top:6px;display:block}

/* CTA */
.bk-final-cta{text-align:center;padding-top:80px}
.bk-social-links{display:flex;gap:24px;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:.8rem;margin-top:24px}
.bk-social-links a{color:#6b7280;transition:color .2s}
.bk-social-links a:hover{color:#a78bfa}

/* Footer */
.bk-footer{position:relative;z-index:1;border-top:1px solid transparent;border-image:linear-gradient(90deg,transparent,rgba(124,58,237,.25),rgba(224,64,160,.15),transparent) 1;padding:40px 24px;display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center}
.bk-footer-logo{width:48px;border-radius:6px;margin-bottom:4px;opacity:.8;transition:opacity .2s}
.bk-footer-logo:hover{opacity:1}
.bk-footer-tagline{color:#6b7280;font-size:.85rem}
.bk-footer-links{display:flex;gap:20px;font-size:.8rem}
.bk-footer-links a{color:#6b7280;transition:color .2s}
.bk-footer-links a:hover{color:#a78bfa}
.bk-footer-copy{color:#4b5563;font-size:.7rem;margin-top:4px}

/* Responsive */
@media(max-width:768px){
  .bk-nav-links{position:fixed;top:56px;left:0;right:0;background:rgba(10,10,15,.98);backdrop-filter:blur(20px);flex-direction:column;padding:20px;gap:12px;transform:translateY(-110%);transition:transform .3s;border-bottom:1px solid rgba(124,58,237,.1)}
  .bk-nav-links.open{transform:translateY(0)}
  .bk-hamburger{display:flex}
  .bk-signals-grid{grid-template-columns:1fr}
  .bk-resources-grid{grid-template-columns:1fr}
  .bk-hero{padding:60px 20px 40px}
  .bk-section{padding:60px 20px}
  .bk-email-row{flex-direction:column;align-items:center}
  .bk-input{width:100%;max-width:300px}
  .bk-ticker-bar{font-size:.7rem}
  .bk-wheel{width:280px;height:280px}
  .bk-wheel-label{font-size:.5rem;transform-origin:center center}
  .bk-spot-arrow{display:none}
}
@media(max-width:480px){
  .bk-hero-title{font-size:1.8rem}
  .bk-section-title{font-size:1.4rem}
  .bk-orb{opacity:.3}
  .bk-fact-text{font-size:1.1rem}
  .bk-wheel{width:260px;height:260px}
}
`

// ─── MAIN APP ────────────────────────────────────────────────────────────────

function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [email, setEmail] = useState('')

  // Typing effect
  const [typingText, setTypingText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Ticker prices
  const [prices, setPrices] = useState(() => TICKER_DATA.map(t => ({ ...t, flash: '' })))

  // Wheel
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinResult, setSpinResult] = useState(null)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [zipCode, setZipCode] = useState('')

  // Facts
  const [currentFactIndex, setCurrentFactIndex] = useState(0)

  // Feed
  const [feedFilter, setFeedFilter] = useState('all')

  // Typing effect
  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIndex]
    const speed = isDeleting ? 30 : 60
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypingText(phrase.slice(0, charIndex + 1))
        if (charIndex + 1 === phrase.length) {
          setTimeout(() => setIsDeleting(true), 2000)
        } else {
          setCharIndex(c => c + 1)
        }
      } else {
        setTypingText(phrase.slice(0, charIndex - 1))
        if (charIndex - 1 === 0) {
          setIsDeleting(false)
          setPhraseIndex(p => (p + 1) % TYPING_PHRASES.length)
          setCharIndex(0)
        } else {
          setCharIndex(c => c - 1)
        }
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, phraseIndex])

  // Ticker price simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(t => {
        const delta = (Math.random() - 0.48) * 0.004 * t.price
        const newPrice = +(t.price + delta).toFixed(2)
        const newChange = +((newPrice - TICKER_DATA.find(d => d.symbol === t.symbol).price) / TICKER_DATA.find(d => d.symbol === t.symbol).price * 100).toFixed(2)
        const isUp = newChange >= 0
        const changed = (isUp !== t.up)
        return { ...t, price: newPrice, change: newChange, up: isUp, flash: changed ? (isUp ? 'flash-up' : 'flash-down') : '' }
      }))
      // Clear flash after animation
      setTimeout(() => {
        setPrices(prev => prev.map(t => ({ ...t, flash: '' })))
      }, 850)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  // Facts auto-rotate
  useEffect(() => {
    const timer = setInterval(() => setCurrentFactIndex(i => (i + 1) % WILD_FACTS.length), 8000)
    return () => clearInterval(timer)
  }, [])

  // Wheel spin
  const handleSpin = useCallback(() => {
    if (isSpinning) return
    setIsSpinning(true)
    setSpinResult(null)
    setShowConfetti(false)
    const idx = Math.floor(Math.random() * RESTAURANTS.length)
    const segAngle = 360 / RESTAURANTS.length
    const target = 360 - (idx * segAngle) - (segAngle / 2)
    const spins = 5 + Math.floor(Math.random() * 3)
    const total = wheelRotation + spins * 360 + target
    setWheelRotation(total)
    setTimeout(() => {
      setIsSpinning(false)
      setSpinResult(RESTAURANTS[idx])
      setShowConfetti(true)
    }, 4500)
  }, [isSpinning, wheelRotation])

  const handleSubmit = () => {
    if (email) alert(`Thanks! We'll send the signal to ${email}`)
  }

  return (
    <>
      <style>{CSS}</style>
      <AnimatedBackground />
      <NavBar navOpen={navOpen} setNavOpen={setNavOpen} />
      <TickerTape prices={prices} />
      <main className="bk-main">
        <HeroSection typingText={typingText} email={email} setEmail={setEmail} onSubmit={handleSubmit} />
        <TheDecider isSpinning={isSpinning} spinResult={spinResult} onSpin={handleSpin} wheelRotation={wheelRotation} showConfetti={showConfetti} zipCode={zipCode} setZipCode={setZipCode} />
        <DiscoveryFeed filter={feedFilter} setFilter={setFeedFilter} />
        <DidYouKnow currentIndex={currentFactIndex} onPrev={() => setCurrentFactIndex(i => (i - 1 + WILD_FACTS.length) % WILD_FACTS.length)} onNext={() => setCurrentFactIndex(i => (i + 1) % WILD_FACTS.length)} />
        <CompanySpotlight />
        <ResourcesGrid />
        <NewsletterCTA email={email} setEmail={setEmail} onSubmit={handleSubmit} />
      </main>
      <Footer />
    </>
  )
}

export default App
