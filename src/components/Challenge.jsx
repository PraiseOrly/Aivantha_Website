import { useEffect, useRef } from 'react'
import styles from './Challenge.module.css'

// 4 core problems per tone guidelines
const problems = [
  {
    title: 'Fragmented Systems',
    desc: 'Siloed data. Clinicians and planners flying blind.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
        <line x1="6" y1="8" x2="6.01" y2="8" strokeWidth="3"/>
        <line x1="10" y1="8" x2="18" y2="8"/>
        <line x1="10" y1="12" x2="18" y2="12"/>
      </svg>
    ),
  },
  {
    title: 'No AI Decision Support',
    desc: 'High-stakes decisions made without AI tools that exist everywhere else.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    title: 'Talent Gap',
    desc: 'Funding arrives but vetted capacity to execute does not.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Imported Solutions',
    desc: 'AI tools designed elsewhere that fail when applied to African clinical realities.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
]

// Verbatim framing line
const FRAMING_LINE = "Africa bears 25% of the global disease burden but receives less than 1% of global health AI investment."

// Stats for context
const stats = [
  { fig: '$16.6B', desc: 'Africa digital health market by 2030', src: 'Grand View Research' },
  { fig: '33.6%', desc: 'AI-in-health CAGR across Africa 2024–2030', src: 'Grand View Research' },
  { fig: '408M',  desc: 'People in SSA without adequate healthcare', src: 'UNDP, 2020' },
  { fig: '41/54', desc: 'African countries with digital health strategies', src: 'Smart Africa, 2025' },
]

export default function Challenge() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="challenge" ref={ref}>
      {/* Emotional hook banner */}
      <div className={styles.hookBanner}>
        <div className="container">
          <div className={`${styles.hookInner} fade-up`}>
            <p className={styles.hookSub}>
              {FRAMING_LINE}
            </p>
          </div>
        </div>
      </div>

      {/* Problem cards */}
      <div className={`${styles.problemsSection} section`}>
        <div className="container">
          <div className="section-header fade-up">
            <h2>The Gap Is Both a Crisis and a $16.6B Opportunity</h2>
            <p className="section-lead">
              Health systems across the continent generate vast amounts of data. The problem is not a lack of data — it is an inability to turn that data into intelligence.
            </p>
          </div>

          <div className={styles.problemGrid}>
            {problems.map((p, i) => (
              <div key={p.title} className={`${styles.problemCard} fade-up`} style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className={styles.problemIcon}>{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className={`${styles.statsRow} fade-up`} style={{ transitionDelay: '.3s' }}>
            {stats.map(s => (
              <div key={s.desc} className={styles.statItem}>
                <span className={styles.statFig}>{s.fig}</span>
                <span className={styles.statDesc}>{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
