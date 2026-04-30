import { useEffect, useRef } from 'react'
import styles from './Pillars.module.css'

const divisions = [
  {
    id: 'div1',
    label: 'Division 1',
    title: 'Research & Consulting',
    subtitle: 'The thinking and strategy engine — transforming data and evidence into actionable insights and policies.',
    pillars: [
      {
        num: '01', tag: 'Research', title: 'AiVantha Research Institute',
        focus: 'Advancing AI & Health Data Research in Africa',
        items: [
          'AI in clinical care and public health',
          'Health systems analytics and modelling',
          'AI readiness and impact assessments',
          'Responsible AI and data governance',
          'Evaluation of digital health interventions',
        ],
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
        ),
      },
      {
        num: '02', tag: 'Consulting', title: 'AiVantha Consultancy',
        focus: 'Turning Insight into Action',
        items: [
          'AI & data strategy for healthcare',
          'Digital health transformation roadmaps',
          'Health data systems and architecture',
          'AI governance and regulatory readiness',
          'Monitoring, Evaluation & Learning (MEL)',
        ],
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        ),
      },
    ],
  },
  {
    id: 'div2',
    label: 'Division 2',
    title: 'Innovation & Talent',
    subtitle: 'The execution engine — building solutions and deploying the talent needed to scale them.',
    pillars: [
      {
        num: '03', tag: 'Innovation', title: 'AiVantha Lab',
        focus: 'Building AI-Powered Health Solutions',
        items: [
          'Clinical decision support systems',
          'Predictive analytics for disease surveillance',
          'Health intelligence dashboards',
          'AI-powered diagnostics and workflow tools',
          'Interoperable digital health platforms',
        ],
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        ),
      },
      {
        num: '04', tag: 'Talent', title: 'AiVantha Talent Marketplace',
        focus: "Africa's AI Talent Hub for Healthcare",
        items: [
          'AI/ML engineers & health data scientists',
          'Biostatisticians & digital health specialists',
          'Project-based and embedded teams',
          'Long-term placements',
          'Capacity-building partnerships',
        ],
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        ),
      },
    ],
  },
]

export default function Pillars() {
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
    <section className="section" id="pillars" ref={ref}>
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-tag">What We Do</span>
          <h2>Our Operating Model</h2>
          <p className="section-lead">
            AiVantha Health operates through two synergistic divisions that bring our four pillars to
            life — from insight to strategy to solution to deployment.
          </p>
        </div>

        {divisions.map((div, di) => (
          <div key={div.id} className={`${styles.division} fade-up`} style={{ transitionDelay: `${di * 0.15}s` }}>
            <div className={styles.divisionHeader}>
              <span className={styles.divisionLabel}>{div.label}</span>
              <h3>{div.title}</h3>
              <p>{div.subtitle}</p>
            </div>
            <div className={styles.pillarsRow}>
              {div.pillars.map((p, pi) => (
                <div key={p.num} className={`${styles.card} fade-up`} style={{ transitionDelay: `${(di * 2 + pi) * 0.1}s` }}>
                  <span className={styles.num}>{p.num}</span>
                  <div className={styles.iconWrap}>{p.icon}</div>
                  <span className={styles.tag}>{p.tag}</span>
                  <h4>{p.title}</h4>
                  <p className={styles.focus}>{p.focus}</p>
                  <ul className={styles.itemList}>
                    {p.items.map(item => (
                      <li key={item}><span className={styles.bullet} />{ item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
