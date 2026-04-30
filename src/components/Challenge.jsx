import { useEffect, useRef } from 'react'
import styles from './Challenge.module.css'

const painPoints = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
        <line x1="6" y1="8" x2="6.01" y2="8" strokeWidth="3"/>
        <line x1="10" y1="8" x2="18" y2="8"/><line x1="10" y1="12" x2="18" y2="12"/>
      </svg>
    ),
    title: 'Fragmented Systems',
    desc: 'Siloed health information systems that cannot share data — leaving clinicians, planners, and policymakers flying blind.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: 'No AI Decision Support',
    desc: 'High-stakes clinical decisions are made without the benefit of AI tools — tools that already exist, but were never designed for African contexts.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Talent Gap',
    desc: 'A severe shortage of vetted African AI and health data professionals — meaning even when funding arrives, capacity does not exist to execute.',
  },
]

const problems = [
  'Fragmented, siloed health information systems',
  'Clinicians making decisions without AI support',
  'Health programmes with no evaluation framework',
  'AI tools designed elsewhere that fail locally',
  'Shortage of vetted African AI talent',
]

const responses = [
  'Interoperable health analytics and data advisory',
  'Clinical AI tools built for African contexts',
  'Applied research and MEL that generates real evidence',
  'Africa-first design — validated before scale',
  "Africa's first vetted health AI talent marketplace",
]

const market = [
  { fig: '$16.6B',     desc: 'Africa digital health market by 2030',      src: 'Grand View Research'       },
  { fig: '33.6%',     desc: 'AI-in-health CAGR across Africa 2024–2030', src: 'Grand View Research'       },
  { fig: '408M',      desc: 'People in SSA without adequate healthcare',  src: 'UNDP, 2020'                },
  { fig: '416M',      desc: 'Mobile internet users in Africa (2024)',     src: 'GSMA'                      },
  { fig: '41 of 54',  desc: 'African countries with digital health strategies', src: 'Smart Africa, 2025' },
  { fig: '0.4 vs 1.0',desc: 'Physicians per 1,000 — Nigeria vs WHO min', src: 'World Bank, 2021'          },
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
            <div className={styles.hookQuote}>
              "The data that could save millions of African lives already exists.
              The systems to act on it do not."
            </div>
            <p className={styles.hookSub}>
              Africa carries <strong>25% of the world's disease burden</strong> but receives less than 1% of
              global health AI investment. This is not just a resource problem — it is an intelligence problem.
            </p>
          </div>
        </div>
      </div>

      {/* Pain points */}
      <div className={`${styles.painSection} section`}>
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-tag">The Challenge</span>
            <h2>Africa's Health Data Crisis</h2>
            <p className="section-lead">
              Health systems across the continent are generating vast amounts of data.
              The problem is not a lack of data — it is an inability to turn that data
              into the intelligence needed to act.
            </p>
          </div>

          <div className={styles.painGrid}>
            {painPoints.map((p, i) => (
              <div key={p.title} className={`${styles.painCard} fade-up`} style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className={styles.painIcon}>{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Problem / Response comparison */}
          <div className={styles.dualGrid}>
            <div className={`${styles.card} ${styles.problemCard} fade-up`} style={{ transitionDelay: '.1s' }}>
              <div className={styles.cardHeader}>
                <span className={`${styles.dot} ${styles.dotRed}`} />
                <h3>The Problem</h3>
              </div>
              <ul>
                {problems.map(p => <li key={p}><span className={styles.dash}>—</span>{p}</li>)}
              </ul>
            </div>
            <div className={`${styles.card} ${styles.responseCard} fade-up`} style={{ transitionDelay: '.22s' }}>
              <div className={styles.cardHeader}>
                <span className={`${styles.dot} ${styles.dotGreen}`} />
                <h3>Our Response</h3>
              </div>
              <ul>
                {responses.map(r => <li key={r}><span className={styles.check}>✓</span>{r}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Market Context */}
      <div className={styles.marketSection}>
        <div className="container">
          <h3 className={`${styles.marketTitle} fade-up`}>The Market Opportunity</h3>
          <p className={`${styles.marketSub} fade-up`} style={{ transitionDelay: '.1s' }}>
            The scale of the problem creates the scale of the opportunity.
          </p>
          <div className={styles.marketGrid}>
            {market.map((m, i) => (
              <div key={m.fig} className={`${styles.mCard} fade-up`} style={{ transitionDelay: `${i * 0.08 + 0.2}s` }}>
                <div className={styles.mFig}>{m.fig}</div>
                <div className={styles.mDesc}>{m.desc}</div>
                <div className={styles.mSrc}>{m.src}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
