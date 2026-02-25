import logoSquare from '/logo.png'
import './App.css'

// ─── WATCHLIST DATA — WEEK 1 (March 1, 2026) ─────────────────────────────────

const WATCHLIST = [
  {
    ticker: 'ONTO',
    name: 'Onto Innovation',
    hiddenStory: 'Every semiconductor fab being built in America needs machines that inspect wafers at the nanometer level. 3 companies on earth build them. One is in Wilmington MA.',
    whyWatch: 'CHIPS Act funding is flowing. TSMC Arizona, Intel Ohio, Samsung Texas = new customers. Every new fab is a new contract.',
    accent: '#8b5cf6',
  },
  {
    ticker: 'CMP',
    name: 'Compass Minerals',
    hiddenStory: 'There is a mine 2000 feet underground in Hutchinson Kansas. The caverns are large enough to fit Manhattan inside. It has been running for 100 years. They supply road salt for half of North America.',
    whyWatch: 'The Boston blizzard this week was a direct revenue event. Winter storms = instant demand spike. Real assets in the ground. No software can disrupt a salt mine.',
    accent: '#3b82f6',
  },
  {
    ticker: 'BCPC',
    name: 'Balchem Corporation',
    hiddenStory: 'Approximately 90% of global creatine monohydrate is manufactured at a single facility in China. The creatine gummy boom on TikTok has one supply chain chokepoint.',
    whyWatch: 'Tariff escalation on Chinese specialty chemicals hits every supplement brand simultaneously. Balchem builds domestic specialty nutrition ingredients. Tailwind forming.',
    accent: '#ec4899',
  },
]

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="wl-header">
      <div className="wl-header-inner">
        <div className="wl-header-brand">
          <img src={logoSquare} alt="Becknology" className="wl-logo" />
          <div className="wl-header-text">
            <h1 className="wl-title">BECKNOLOGY WEEKLY WATCHLIST</h1>
            <p className="wl-date">Week of March 1, 2026</p>
          </div>
        </div>
        <p className="wl-tagline">Where Markets Meet Machines</p>
      </div>
      <div className="wl-subheader">
        <p>The hidden story behind what you buy — free every Sunday morning at <strong>becknology.com</strong></p>
      </div>
    </header>
  )
}

function TickerCard({ ticker, name, hiddenStory, whyWatch, accent }) {
  return (
    <article className="wl-card" style={{ '--accent': accent }}>
      <div className="wl-card-header">
        <span className="wl-ticker">${ticker}</span>
        <span className="wl-name">{name}</span>
      </div>

      <div className="wl-section">
        <h3 className="wl-section-title">The Hidden Story</h3>
        <p className="wl-section-text">{hiddenStory}</p>
      </div>

      <div className="wl-section">
        <h3 className="wl-section-title wl-why-watch">Why Watch</h3>
        <p className="wl-section-text">{whyWatch}</p>
      </div>
    </article>
  )
}

function WatchlistGrid() {
  return (
    <main className="wl-main">
      <div className="wl-grid">
        {WATCHLIST.map((item, i) => (
          <TickerCard key={i} {...item} />
        ))}
      </div>
    </main>
  )
}

function Footer() {
  return (
    <footer className="wl-footer">
      <div className="wl-disclaimer">
        <p><strong>Disclaimer:</strong> Education and entertainment only. Not financial advice. Do your own research.</p>
      </div>
      <div className="wl-footer-links">
        <span className="wl-footer-item">
          <svg className="wl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          becknology.com
        </span>
        <span className="wl-footer-item">
          <svg className="wl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          New episode every Sunday at 7 PM Central
        </span>
        <span className="wl-footer-item">
          <svg className="wl-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
          </svg>
          @BecknologyTV
        </span>
      </div>
    </footer>
  )
}

function PrintButton() {
  return (
    <button className="wl-print-btn no-print" onClick={() => window.print()}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 6 2 18 2 18 9"/>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
        <rect x="6" y="14" width="12" height="8"/>
      </svg>
      Print / Save PDF
    </button>
  )
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

function App() {
  return (
    <div className="wl-page">
      <PrintButton />
      <Header />
      <WatchlistGrid />
      <Footer />
    </div>
  )
}

export default App
