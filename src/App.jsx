import './App.css'

// ─── DATA ────────────────────────────────────────────────────────────────────

const CONTENT_PIPELINE = [
  { day: 'Monday', type: 'TikTok', topic: 'Manufacturing Monday', status: 'Draft' },
  { day: 'Wednesday', type: 'TikTok', topic: 'Wild Fact Wednesday', status: 'Draft' },
  { day: 'Friday', type: 'TikTok', topic: 'Factory Friday', status: 'Draft' },
  { day: 'Sunday', type: 'Sunday Show', topic: 'Weekly Deep Dive', status: 'Draft' },
]

const X_POSTS = [
  { content: 'State of the Union manufacturing analysis', impressions: 1247, date: 'Feb 24' },
  { content: 'Boeing 737 supply chain breakdown', impressions: 892, date: 'Feb 23' },
  { content: 'Tesla Model Y production insights', impressions: 634, date: 'Feb 22' },
  { content: 'Frito-Lay chips automation', impressions: 521, date: 'Feb 21' },
  { content: 'Ball Corp aluminum cans process', impressions: 445, date: 'Feb 20' },
]

const ACTIVE_AGENTS = [
  { name: 'Dexter', task: 'Content research', status: 'Running' },
  { name: 'Market Scanner', task: 'Ticker analysis', status: 'Idle' },
  { name: 'Social Monitor', task: 'X engagement tracking', status: 'Running' },
]

const TICKER_TRACKER = [
  { date: 'Feb-24', ticker: 'NVDA', bias: 'Bullish', status: 'Active' },
  { date: 'Feb-26', ticker: 'VRT', bias: 'Bullish', status: 'Pending' },
  { date: 'Feb-28', ticker: 'ROK', bias: 'Bullish', status: 'Pending' },
]

const NORTH_STAR_METRICS = {
  email: 0,
  xFollowers: 5,
  posts: 88,
  revenue: 0,
}

// ─── INFINITY LOGO SVG ───────────────────────────────────────────────────────

function InfinityLogo() {
  return (
    <svg viewBox="0 0 120 60" className="mc-logo" aria-label="Becknology">
      <defs>
        <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path
        d="M30 30c0-8.284 6.716-15 15-15 8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15zm30 0c0-8.284 6.716-15 15-15 8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15z"
        fill="none"
        stroke="url(#infinityGrad)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

// ─── STATUS PILL ─────────────────────────────────────────────────────────────

function StatusPill({ status }) {
  const statusColors = {
    Draft: 'pill-draft',
    Approved: 'pill-approved',
    Filmed: 'pill-filmed',
    Posted: 'pill-posted',
    Running: 'pill-running',
    Idle: 'pill-idle',
    Active: 'pill-active',
    Pending: 'pill-pending',
  }
  return <span className={`mc-pill ${statusColors[status] || ''}`}>{status}</span>
}

// ─── HEADER ──────────────────────────────────────────────────────────────────

function Header() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="mc-header">
      <div className="mc-header-left">
        <InfinityLogo />
        <h1 className="mc-title">Mission Control</h1>
      </div>
      <div className="mc-header-right">
        <span className="mc-date">{today}</span>
      </div>
    </header>
  )
}

// ─── MISSION BANNER ──────────────────────────────────────────────────────────

function MissionBanner() {
  return (
    <section className="mc-mission-banner">
      <p className="mc-mission-text">
        Build the world&apos;s best translation layer between manufacturing and markets
        and make Andrew Becker financially free by age 42.
      </p>
    </section>
  )
}

// ─── CONTENT PIPELINE ────────────────────────────────────────────────────────

function ContentPipeline() {
  return (
    <section className="mc-section">
      <h2 className="mc-section-title">Content Pipeline</h2>
      <div className="mc-pipeline-grid">
        {CONTENT_PIPELINE.map((item, i) => (
          <div key={i} className="mc-pipeline-card">
            <div className="mc-pipeline-header">
              <span className="mc-pipeline-day">{item.day}</span>
              <span className="mc-pipeline-type">{item.type}</span>
            </div>
            <p className="mc-pipeline-topic">{item.topic}</p>
            <StatusPill status={item.status} />
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── X PERFORMANCE ───────────────────────────────────────────────────────────

function XPerformance() {
  return (
    <section className="mc-section">
      <h2 className="mc-section-title">X Performance</h2>
      <div className="mc-table-wrap">
        <table className="mc-table">
          <thead>
            <tr>
              <th>Post</th>
              <th>Impressions</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {X_POSTS.map((post, i) => (
              <tr key={i}>
                <td>{post.content}</td>
                <td className="mc-impressions">{post.impressions.toLocaleString()}</td>
                <td className="mc-date-cell">{post.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

// ─── ACTIVE AGENTS ───────────────────────────────────────────────────────────

function ActiveAgents() {
  return (
    <section className="mc-section">
      <h2 className="mc-section-title">Active Agents</h2>
      <div className="mc-agents-grid">
        {ACTIVE_AGENTS.map((agent, i) => (
          <div key={i} className="mc-agent-card">
            <div className="mc-agent-header">
              <span className="mc-agent-name">{agent.name}</span>
              <StatusPill status={agent.status} />
            </div>
            <p className="mc-agent-task">{agent.task}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── TICKER TRACKER ──────────────────────────────────────────────────────────

function TickerTracker() {
  return (
    <section className="mc-section">
      <h2 className="mc-section-title">Ticker Tracker</h2>
      <div className="mc-table-wrap">
        <table className="mc-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Ticker</th>
              <th>Bias</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {TICKER_TRACKER.map((item, i) => (
              <tr key={i}>
                <td>{item.date}</td>
                <td className="mc-ticker-symbol">{item.ticker}</td>
                <td className="mc-bias-bullish">{item.bias}</td>
                <td><StatusPill status={item.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

// ─── NORTH STAR METRICS ──────────────────────────────────────────────────────

function NorthStarMetrics() {
  return (
    <section className="mc-section mc-north-star">
      <h2 className="mc-section-title">North Star Metrics</h2>
      <div className="mc-metrics-grid">
        <div className="mc-metric-card">
          <span className="mc-metric-value">{NORTH_STAR_METRICS.email}</span>
          <span className="mc-metric-label">Email Subscribers</span>
        </div>
        <div className="mc-metric-card">
          <span className="mc-metric-value">{NORTH_STAR_METRICS.xFollowers}</span>
          <span className="mc-metric-label">X Followers</span>
        </div>
        <div className="mc-metric-card">
          <span className="mc-metric-value">{NORTH_STAR_METRICS.posts}</span>
          <span className="mc-metric-label">Total Posts</span>
        </div>
        <div className="mc-metric-card">
          <span className="mc-metric-value">${NORTH_STAR_METRICS.revenue}</span>
          <span className="mc-metric-label">Revenue</span>
        </div>
      </div>
      <div className="mc-goal-banner">
        <span className="mc-goal-icon">🎯</span>
        <span className="mc-goal-text">Goal: Freedom by 42</span>
      </div>
    </section>
  )
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

function App() {
  return (
    <div className="mc-app">
      <Header />
      <main className="mc-main">
        <MissionBanner />
        <div className="mc-grid-layout">
          <ContentPipeline />
          <XPerformance />
          <ActiveAgents />
          <TickerTracker />
        </div>
        <NorthStarMetrics />
      </main>
    </div>
  )
}

export default App
