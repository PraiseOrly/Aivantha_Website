import { useEffect, useRef } from 'react'
import styles from './WhoWeServe.module.css'

const clients = [
  {
    title: 'Governments',
    value: 'Policy insights, system optimisation, AI strategy',
    points: ['National AI & data strategy', 'Health information system modernisation', 'AI readiness assessments', 'Policy research & implementation support'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    title: 'Hospitals & Clinics',
    value: 'Decision support, workflow optimisation, analytics',
    points: ['AI clinical decision support tools', 'Predictive analytics & diagnostics', 'Workflow optimisation', 'Embedded AI talent deployment'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    title: 'NGOs & Development Partners',
    value: 'AI for public health, M&E support',
    points: ['Applied research & evidence generation', 'MEL frameworks & evaluation', 'Pilot deployment support', 'AI governance advisory'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    title: 'Private Sector',
    value: 'Scalable AI tools and access to top talent',
    points: ['Purpose-built AI health solutions', 'Vetted AI & data talent', 'Digital health product co-development', 'Research collaboration & joint publication'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
]

export default function WhoWeServe() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section-alt" id="serve" ref={ref}>
      <div className="container">
<div className="section-header fade-up">
          <h2>Trusted by Health System Stakeholders</h2>
          <p className="section-lead">
            We build long-term partnerships that strengthen systems — not dependencies.
          </p>
        </div>
        <div className={styles.grid}>
          {clients.map((c, i) => (
            <div key={c.title} className={`${styles.card} fade-up`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className={styles.iconWrap}>{c.icon}</div>
              <h3>{c.title}</h3>
              <p className={styles.value}>{c.value}</p>
              <ul className={styles.points}>
                {c.points.map(p => <li key={p}><span className={styles.dot} />{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className={`${styles.closing} fade-up`} style={{ transitionDelay: '.4s' }}>
          <p>
            We are not a vendor. We are a long-term partner — and we design every engagement to
            leave our clients stronger, more capable, and less dependent on external expertise
            over time.
          </p>
        </div>
      </div>
    </section>
  )
}
