import { useEffect, useRef } from 'react'
import styles from './About.module.css'

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Ethical by Design',
    desc: 'Responsible AI and data governance embedded in every solution — not added as compliance, but designed in from day one.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: 'Evidence First',
    desc: 'Every strategy, every tool, every deployment is grounded in rigorous research. We do not guess — we generate evidence.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Africa-Led',
    desc: 'Built by Africans for Africa — grounded in local realities, not imported from systems designed for other contexts.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    title: 'Built to Scale',
    desc: 'From pilot to national scale. We design for the full journey with long-term capacity building at the core.',
  },
]

export default function About() {
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
    <section className="section" id="about" ref={ref}>
      <div className="container">

{/* Header */}
        <div className="section-header fade-up">
          <h2>Africa's Health AI Transformation Partner</h2>
          <p className="section-lead">
            AiVantha Health is an African AI and data-driven healthcare company transforming how health systems generate evidence, make decisions, and deliver care across the continent.
          </p>
          <div className="divider" />
        </div>

        {/* Story block */}
        <div className={styles.storyGrid}>
          <div className={`${styles.storyText} fade-up`} style={{ transitionDelay: '.1s' }}>
            <p className={styles.lead}>
              <strong>AiVantha Health</strong> is an African AI and data-driven healthcare company transforming how health systems generate evidence, make decisions, and deliver care.
            </p>
            <p>
              We are not a vendor. We are a long-term transformation partner — grounded in local realities, operating across East and West Africa.
            </p>
            <p>
              Founded in 2026 and headquartered in Nairobi, Kenya — built to last, not built to pilot.
            </p>
            <div className={styles.badges}>
              <span>Founded 2026</span>
              <span>Nairobi, Kenya</span>
              <span>Pan-African Operations</span>
              <span>Series A Ready</span>
            </div>
          </div>

<div className={styles.vmStack}>
            <div className={`${styles.vmCard} ${styles.vmBlue} fade-up`} style={{ transitionDelay: '.2s' }}>
              <div className={styles.vmLabel}>Our Vision</div>
              <p>
                <em>
                  An Africa where healthcare systems and decisions are powered by trusted data,
                  ethical AI, and local expertise — driving better health outcomes for all.
                </em>
              </p>
              <span className={styles.vmSub}>The foundation for a $16.6B market</span>
            </div>
            <div className={`${styles.vmCard} ${styles.vmGold} fade-up`} style={{ transitionDelay: '.3s' }}>
              <div className={styles.vmLabel}>Our Mission</div>
              <p>
                To accelerate equitable, data-driven healthcare transformation in Africa through
                <strong> research, consulting, innovation, and talent deployment</strong>.
              </p>
              <span className={styles.vmSub}>Delivering measurable impact at scale</span>
            </div>
          </div>
        </div>

        {/* Core values */}
        <div className={styles.valuesGrid}>
          {values.map((v, i) => (
            <div key={v.title} className={`${styles.valueCard} fade-up`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className={styles.valueIcon}>{v.icon}</div>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
