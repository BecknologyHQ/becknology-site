import './App.css'

// ─── DATA ────────────────────────────────────────────────────────────────────

const TIKTOK_WEEK = [
  { day: 'MON', topic: 'SOTU Chip Fabs', ticker: 'INTC', status: 'Posted' },
  { day: 'WED', topic: 'Blizzard Salt Mine', ticker: 'MOS', status: 'Approved' },
  { day: 'FRI', topic: 'Creatine Gummies', ticker: 'HAIN', status: 'Approved' },
]

const SUNDAY_SHOW = {
  title: 'Markets Meet Machines Ep1',
  tickers: ['ROK', 'VRT', 'CEG'],
  status: 'Approved',
}

const X_POSTS = [
  { date: 'Mon 2/24', preview: 'The SOTU had one word that matters for your portfolio: semiconductors. Here\'s why...', status: 'Posted' },
  { date: 'Tue 2/25', preview: 'Fun fact: Your salt came from a mine 650ft underground. And one company owns it all...', status: 'Scheduled' },
  { date: 'Wed 2/26', preview: 'The creatine in your gummies traveled 4,000 miles before hitting that bottle...', status: 'Scheduled' },
  { date: 'Thu 2/27', preview: 'Thread: 5 stocks that benefit from the reshoring megatrend', status: 'Draft' },
  { date: 'Fri 2/28', preview: 'Weekend watchlist: 3 automation plays nobody is talking about', status: 'Draft' },
  { date: 'Sat 3/1', preview: 'How I use PLC logic for position sizing (yes, really)', status: 'Draft' },
  { date: 'Sun 3/2', preview: 'NEW EP: Markets Meet Machines is LIVE. Link in bio.', status: 'Scheduled' },
]

const UPCOMING_MOMENTS = [
  { date: 'Mar 17', event: 'St. Patrick\'s Day', hook: 'Guinness', ticker: 'DEO' },
  { date: 'Mar 18', event: 'March Madness', hook: 'Basketball manufacturing', ticker: 'NKE' },
  { date: 'Apr 5', event: 'Easter', hook: 'Chocolate', ticker: 'HSY' },
  { date: 'May 5', event: 'Cinco de Mayo', hook: 'Tequila', ticker: 'BF.B' },
]

const YOUTUBE_EPISODES = [
  { ep: 1, date: 'Mar 2', title: 'Markets Meet Machines', tickers: ['ROK', 'VRT', 'CEG'], views: '—' },
  { ep: 2, date: 'Mar 9', title: 'AI Power Crisis', tickers: ['CEG', 'VST', 'ETN'], views: '—' },
  { ep: 3, date: 'Mar 16', title: 'Warehouse Wars', tickers: ['SYM', 'AMZN', 'WMT'], views: '—' },
]

// ─── STATUS HELPERS ──────────────────────────────────────────────────────────

const STATUS_COLORS = {
  Draft: { bg: 'rgba(107, 114, 128, 0.2)', color: '#9ca3af', border: 'rgba(107, 114, 128, 0.3)' },
  Approved: { bg: 'rgba(234, 179, 8, 0.15)', color: '#fbbf24', border: 'rgba(234, 179, 8, 0.3)' },
  Filming: { bg: 'rgba(249, 115, 22, 0.15)', color: '#fb923c', border: 'rgba(249, 115, 22, 0.3)' },
  Posted: { bg: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: 'rgba(34, 197, 94, 0.3)' },
  Scheduled: { bg: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
}

function StatusBadge({ status }) {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.Draft
  return (
    <span className="status-badge" style={{ background: colors.bg, color: colors.color, borderColor: colors.border }}>
      {status}
    </span>
  )
}

function TickerPill({ ticker }) {
  return <span className="ticker-pill">${ticker}</span>
}

// ─── INFINITY LOGO SVG ───────────────────────────────────────────────────────

function InfinityLogo() {
  return (
    <svg className="infinity-logo" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <path
        d="M30 30c0-8.284 6.716-15 15-15 6.213 0 11.544 3.78 13.82 9.167C61.456 18.78 66.787 15 73 15c8.284 0 15 6.716 15 15s-6.716 15-15 15c-6.213 0-11.544-3.78-13.82-9.167C56.544 41.22 51.213 45 45 45c-8.284 0-15-6.716-15-15z"
        stroke="url(#infinityGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <InfinityLogo />
        <div className="header-text">
          <h1 className="header-title">BECKNOLOGY</h1>
          <p className="header-tagline">WHERE MARKETS MEET MACHINES</p>
        </div>
      </div>
      <div className="header-meta">
        <span className="header-date">Content Calendar</span>
        <span className="header-week">Week of Feb 24, 2025</span>
      </div>
    </header>
  )
}

function ThisWeekSection() {
  return (
    <section className="section">
      <h2 className="section-title">
        <span className="section-icon">&#x1F4F1;</span>
        THIS WEEK
      </h2>
      <div className="week-grid">
        {TIKTOK_WEEK.map((item, i) => (
          <div key={i} className="content-card tiktok-card">
            <div className="card-header">
              <span className="day-label">{item.day}</span>
              <span className="platform-tag">TikTok</span>
            </div>
            <h3 className="card-topic">{item.topic}</h3>
            <div className="card-footer">
              <TickerPill ticker={item.ticker} />
              <StatusBadge status={item.status} />
            </div>
          </div>
        ))}
        <div className="content-card sunday-card">
          <div className="card-header">
            <span className="day-label">SUN</span>
            <span className="platform-tag youtube">YouTube</span>
          </div>
          <h3 className="card-topic">{SUNDAY_SHOW.title}</h3>
          <div className="card-footer">
            <div className="ticker-group">
              {SUNDAY_SHOW.tickers.map((t, i) => (
                <TickerPill key={i} ticker={t} />
              ))}
            </div>
            <StatusBadge status={SUNDAY_SHOW.status} />
          </div>
        </div>
      </div>
    </section>
  )
}

function XPostsSection() {
  return (
    <section className="section">
      <h2 className="section-title">
        <span className="section-icon">&#x1D54F;</span>
        X POSTS QUEUE
      </h2>
      <div className="x-posts-grid">
        {X_POSTS.map((post, i) => (
          <div key={i} className="x-post-card">
            <div className="x-post-header">
              <span className="x-post-date">{post.date}</span>
              <StatusBadge status={post.status} />
            </div>
            <p className="x-post-preview">{post.preview}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function UpcomingSection() {
  return (
    <section className="section">
      <h2 className="section-title">
        <span className="section-icon">&#x1F4C5;</span>
        UPCOMING MOMENTS
      </h2>
      <p className="section-subtitle">Cultural moments mapped to content opportunities</p>
      <div className="upcoming-grid">
        {UPCOMING_MOMENTS.map((moment, i) => (
          <div key={i} className="upcoming-card">
            <div className="upcoming-date">{moment.date}</div>
            <div className="upcoming-content">
              <h4 className="upcoming-event">{moment.event}</h4>
              <p className="upcoming-hook">{moment.hook}</p>
              <TickerPill ticker={moment.ticker} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function YouTubeSection() {
  return (
    <section className="section">
      <h2 className="section-title">
        <span className="section-icon">&#x25B6;</span>
        YOUTUBE TRACKER
      </h2>
      <div className="youtube-table">
        <div className="youtube-header">
          <span>EP</span>
          <span>AIR DATE</span>
          <span>TITLE</span>
          <span>TICKERS</span>
          <span>VIEWS</span>
        </div>
        {YOUTUBE_EPISODES.map((ep, i) => (
          <div key={i} className="youtube-row">
            <span className="ep-number">#{ep.ep}</span>
            <span className="ep-date">{ep.date}</span>
            <span className="ep-title">{ep.title}</span>
            <span className="ep-tickers">
              {ep.tickers.map((t, j) => (
                <TickerPill key={j} ticker={t} />
              ))}
            </span>
            <span className="ep-views">{ep.views}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function StatusLegend() {
  return (
    <div className="status-legend">
      <span className="legend-title">Status:</span>
      {Object.keys(STATUS_COLORS).map((status) => (
        <StatusBadge key={status} status={status} />
      ))}
    </div>
  )
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

function App() {
  return (
    <div className="app">
      <div className="bg-gradient" />
      <div className="container">
        <Header />
        <StatusLegend />
        <ThisWeekSection />
        <XPostsSection />
        <UpcomingSection />
        <YouTubeSection />
        <footer className="footer">
          <p>&copy; 2025 Becknology. Built in Kansas City.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
