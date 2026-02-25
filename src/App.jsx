import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && email.includes('@')) {
      console.log('Email submitted:', email)
      setSubmitted(true)
    }
  }

  return (
    <div className="landing">
      {/* Background effects */}
      <div className="bg-glow" aria-hidden="true" />
      <div className="bg-noise" aria-hidden="true" />

      <main className="container">
        {/* Hero Section */}
        <header className="hero">
          {/* Logo / Brand */}
          <div className="brand">
            <div className="logo">
              <svg viewBox="0 0 100 50" className="infinity-logo" aria-label="Becknology">
                <defs>
                  <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <path
                  d="M25 25c0-8.284 6.716-15 15-15 8.284 0 15 6.716 15 15 0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15s-6.716-15-15-15c-8.284 0-15 6.716-15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15z"
                  fill="none"
                  stroke="url(#infinityGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2 className="wordmark">Becknology</h2>
            <p className="tagline">Where Markets Meet Machines</p>
          </div>

          {/* Main Headline */}
          <h1 className="headline">
            The Hidden Story Behind What You Buy
          </h1>

          {/* Subheadline */}
          <p className="subheadline">
            Every week: 3 trending products &rarr; the factories behind them &rarr; the companies worth watching. <span className="highlight">Free.</span>
          </p>
        </header>

        {/* Email Capture Form */}
        <section className="capture">
          {!submitted ? (
            <form className="capture-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="email-input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
              />
              <button type="submit" className="cta-button">
                Get the Free Watchlist
              </button>
            </form>
          ) : (
            <div className="success-message">
              <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p>You're in! Check your inbox Sunday morning.</p>
            </div>
          )}

          {/* Social Proof */}
          <p className="social-proof">
            Join readers who see the market behind the machine.
          </p>

          {/* Small Print */}
          <p className="small-print">
            No spam. Unsubscribe anytime. Every Sunday morning.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          Becknology — Where Markets Meet Machines | New episodes every Sunday at 7 PM Central
        </p>
      </footer>
    </div>
  )
}

export default App
