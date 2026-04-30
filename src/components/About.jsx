import { useEffect, useRef } from 'react'
import styles from './About.module.css'

// 4 differentiators per tone guidelines
const differentiators = [
  {
    title: 'Africa-Led',
    desc: 'Built by Africa\'s top AI and health talent, designed for African realities, benchmarked against global standards.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    title: 'Research-First',
    desc: 'Every strategy and tool is grounded in evidence generated before deployment, not assumptions imported from other contexts.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    title: 'Ethical by Design',
    desc: 'Responsible AI and data governance are core design principles, not compliance add-ons.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'End-to-End Platform',
    desc: 'Research, consulting, product development, and talent under one roof, compounding value at every stage.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
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
              <strong>Our story</strong>
            </p>
            <p>
              Founded in 2026 in Nairobi, Kenya — built to last, not built to pilot. The founding team came together around one conviction: Africa's health systems must be transformed from within. Not imported. Not adapted. Built to solve.
            </p>
            <div className={styles.badges}>
              <span>Founded 2026</span>
              <span>Nairobi, Kenya</span>
              <span>Pan-African Operations</span>
            </div>
          </div>

          <div className={styles.vmStack}>
            <div className={`${styles.vmCard} ${styles.vmGold} fade-up`} style={{ transitionDelay: '.2s' }}>
              <div className={styles.vmLabel}>Mission</div>
              <p>
                Accelerating equitable, data-driven healthcare transformation in Africa through research, consulting, innovation, and talent deployment.
              </p>
            </div>
            <div className={`${styles.vmCard} ${styles.vmBlue} fade-up`} style={{ transitionDelay: '.3s' }}>
              <div className={styles.vmLabel}>Vision</div>
              <p>
                An Africa where health systems and decisions are powered by trusted data, ethical AI, and local expertise.
              </p>
            </div>
          </div>
        </div>

        {/* Differentiation */}
        <div className="section-header fade-up" style={{ marginTop: 'var(--space-3xl)' }}>
          <h3>Why We're Different</h3>
        </div>

        <div className={styles.diffGrid}>
          {differentiators.map((d, i) => (
            <div key={d.title} className={`${styles.diffCard} fade-up`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className={styles.diffIcon}>{d.icon}</div>
              <h4>{d.title}</h4>
              <p>{d.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
