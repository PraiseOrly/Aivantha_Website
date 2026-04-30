import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

const INTERVAL = 7000

function parseHeadline(text) {
  return text.split('||').map((part, i) =>
    i % 2 === 1
      ? <em key={i} className={styles.accent}>{part}</em>
      : part
  )
}

const slides = [
  {
    tag: 'Healthcare AI · Africa-First',
    headline: "Building Africa's ||Intelligent Health|| Future",
    sub: "One platform combining research, consulting, innovation, and talent — transforming health systems across the continent.",
    cta1: { label: 'Explore Our Work', href: '#pillars' },
    cta2: { label: 'Partner With Us', href: '#contact' },
    metric: { num: '4', label: 'Integrated Pillars' },
    wm: 'health',
    accentColor: '#c8960c',
  },
  {
    tag: '$16.6B Market Opportunity',
    headline: "Africa's Health Crisis Is a ||Data Intelligence|| Problem",
    sub: "Africa bears 25% of global disease burden but receives <1% of health AI investment. The data exists — the intelligence to act on it does not.",
    cta1: { label: 'See the Challenge', href: '#challenge' },
    cta2: { label: 'Our Approach', href: '#pillars' },
    metric: { num: '25%', label: 'global disease burden' },
    wm: 'globe',
    accentColor: '#e11d48',
  },
  {
    tag: 'Invest · Partner · Transform',
    headline: "The Time to Build ||Africa's Health AI Future|| Is Now",
    sub: "41 of 54 African countries have digital health strategies. $16.6B addressable market. Be part of the transformation.",
    cta1: { label: 'Investment Enquiries', href: '#contact' },
    cta2: { label: 'Partnership Opportunities', href: '#contact' },
    metric: { num: '41/54', label: 'countries ready' },
    wm: 'chart',
    accentColor: '#059669',
  },
  {
    tag: 'Solutions',
    headline: "||AI Solutions|| Built for African Clinical Reality",
    sub: "Clinical decision support, predictive surveillance, health intelligence platforms — validated in real African healthcare settings.",
    cta1: { label: 'View Solutions', href: '#solutions' },
    cta2: { label: 'Talent Hub', href: '#contact' },
    metric: { num: '408M+', label: 'people served' },
    wm: 'circuit',
    accentColor: '#2563eb',
  },
  {
    tag: 'Impact',
    headline: "||Built for Africa||. Scaled for the World.",
    sub: "Improving clinical decisions, strengthening health planning, reducing fragmentation, expanding access, building local capacity.",
    cta1: { label: 'See Our Impact', href: '#why' },
    cta2: { label: 'Partner With Us', href: '#contact' },
    metric: { num: 'Pan-African', label: 'Operations' },
    wm: 'chart',
    accentColor: '#c8960c',
  },
]

const watermarks = {
  health: (
    <svg className={styles.wm} viewBox="0 0 200 200" fill="none" stroke="currentColor">
      <path d="M20 100 L50 100 L65 40 L85 160 L100 80 L115 120 L130 100 L180 100" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="100" cy="100" r="90" strokeWidth="3" opacity=".3"/>
    </svg>
  ),
  globe: (
    <svg className={styles.wm} viewBox="0 0 200 200" fill="none" stroke="currentColor">
      <circle cx="100" cy="100" r="90" strokeWidth="4"/>
      <ellipse cx="100" cy="100" rx="40" ry="90" strokeWidth="3"/>
      <line x1="10" y1="100" x2="190" y2="100" strokeWidth="3"/>
      <line x1="10" y1="65" x2="190" y2="65" strokeWidth="2" opacity=".5"/>
      <line x1="10" y1="135" x2="190" y2="135" strokeWidth="2" opacity=".5"/>
    </svg>
  ),
  research: (
    <svg className={styles.wm} viewBox="0 0 200 200" fill="none" stroke="currentColor">
      <rect x="30" y="20" width="140" height="160" rx="8" strokeWidth="4"/>
      <line x1="60" y1="70" x2="140" y2="70" strokeWidth="4" strokeLinecap="round"/>
      <line x1="60" y1="100" x2="140" y2="100" strokeWidth="4" strokeLinecap="round"/>
      <line x1="60" y1="130" x2="110" y2="130" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  ),
  circuit: (
    <svg className={styles.wm} viewBox="0 0 200 200" fill="none" stroke="currentColor">
      <circle cx="100" cy="100" r="20" strokeWidth="4"/>
      <circle cx="40"  cy="40"  r="12" strokeWidth="3"/>
      <circle cx="160" cy="40"  r="12" strokeWidth="3"/>
      <circle cx="40"  cy="160" r="12" strokeWidth="3"/>
      <circle cx="160" cy="160" r="12" strokeWidth="3"/>
      <line x1="52" y1="52" x2="85" y2="85" strokeWidth="3"/>
      <line x1="148" y1="52" x2="115" y2="85" strokeWidth="3"/>
      <line x1="52" y1="148" x2="85" y2="115" strokeWidth="3"/>
      <line x1="148" y1="148" x2="115" y2="115" strokeWidth="3"/>
    </svg>
  ),
  chart: (
    <svg className={styles.wm} viewBox="0 0 200 200" fill="none" stroke="currentColor">
      <polyline points="20,160 60,120 100,80 130,95 170,40" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="170,40 170,50 160,40" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="20" y1="160" x2="20" y2="20" strokeWidth="3" opacity=".4"/>
      <line x1="20" y1="160" x2="185" y2="160" strokeWidth="3" opacity=".4"/>
    </svg>
  ),
}

export default function Hero() {
  const [active, setActive]     = useState(0)
  const [paused, setPaused]     = useState(false)
  const [progress, setProgress] = useState(0)
  const rafRef  = useRef(null)
  const startRef = useRef(Date.now())

  const goTo = (idx) => {
    setActive(idx)
    setProgress(0)
    startRef.current = Date.now()
  }

  useEffect(() => {
    if (paused) return
    const timer = setTimeout(() => goTo((active + 1) % slides.length), INTERVAL)
    return () => clearTimeout(timer)
  }, [active, paused])

  useEffect(() => {
    if (paused) { cancelAnimationFrame(rafRef.current); return }
    setProgress(0)
    const start = Date.now()
    const tick = () => {
      const pct = Math.min((Date.now() - start) / INTERVAL * 100, 100)
      setProgress(pct)
      if (pct < 100) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, paused])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' })
  }

  return (
    <section
      className={styles.hero}
      id="home"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.bgGrid} />

      {slides.map((slide, i) => (
        <div key={i} className={`${styles.slide} ${i === active ? styles.slideActive : ''}`}>
          <div className={styles.wmWrap}>{watermarks[slide.wm]}</div>
          <div className="container">
            <div className={styles.content}>
              <span className={styles.tag}>{slide.tag}</span>
              <h1 className={styles.headline}>{parseHeadline(slide.headline)}</h1>
              <p className={styles.sub}>{slide.sub}</p>
              <div className={styles.actions}>
                <button className={`btn btn-gold ${styles.btnMain}`} onClick={() => scrollTo(slide.cta1.href)}>
                  {slide.cta1.label}
                </button>
                <button className={`btn btn-outline-white`} onClick={() => scrollTo(slide.cta2.href)}>
                  {slide.cta2.label}
                </button>
              </div>
            </div>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricNum}>{slide.metric.num}</span>
            <span className={styles.metricLabel}>{slide.metric.label}</span>
          </div>
        </div>
      ))}

      {/* Controls */}
      <div className={styles.controls}>
        <button className={styles.arrow} onClick={() => goTo((active - 1 + slides.length) % slides.length)} aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div className={styles.dots}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button className={styles.arrow} onClick={() => goTo((active + 1) % slides.length)} aria-label="Next">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      {/* Slide counter */}
      <div className={styles.counter}>
        <span className={styles.counterCurrent}>{String(active + 1).padStart(2, '0')}</span>
        <span className={styles.counterSep}> / </span>
        <span className={styles.counterTotal}>{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* Progress bar */}
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
    </section>
  )
}
