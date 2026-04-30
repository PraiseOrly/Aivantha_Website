import { useEffect, useRef } from 'react'
import styles from './Pillars.module.css'

// 4 services per tone guidelines
const services = [
  {
    num: '01',
    tag: 'Research',
    title: 'Research & Insights',
    focus: 'Evidence that drives decisions',
    items: [
      'AI applications in public health and clinical care',
      'Health systems analytics and modelling',
      'AI readiness and impact assessments',
      'Responsible AI and data governance frameworks',
      'Evaluation of digital health and AI interventions',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    num: '02',
    tag: 'Strategy',
    title: 'Strategy & Advisory',
    focus: 'From insight to execution',
    items: [
      'AI and data strategy for health systems',
      'Digital health transformation roadmaps',
      'Health information systems and data architecture',
      'AI governance, ethics, and regulatory readiness',
      'Monitoring, Evaluation & Learning (MEL)',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    num: '03',
    tag: 'Innovation',
    title: 'AI Solutions & Innovation',
    focus: 'Built for real-world health environments',
    items: [
      'Clinical decision support tools',
      'Predictive analytics for disease surveillance',
      'Health intelligence dashboards',
      'AI-enabled diagnostics and workflow tools',
      'Interoperable digital health platforms',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    num: '04',
    tag: 'Talent',
    title: 'Talent & Capacity',
    focus: 'The people behind the systems',
    items: [
      'AI/ML engineers and health data scientists',
      'Biostatisticians and informatics specialists',
      'Digital health product and implementation experts',
      'Project-based teams, embedded experts, long-term partnerships',
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
]

// Impact areas
const impactAreas = [
  {
    title: 'Disease Surveillance & Predictive Health Intelligence',
    desc: 'Identifying outbreaks before they escalate',
  },
  {
    title: 'Clinical Decision Support & AI-Enabled Diagnostics',
    desc: 'Giving clinicians the intelligence to act with confidence',
  },
  {
    title: 'Health Workforce Capacity Building',
    desc: 'Multiplying the impact of every health worker on the continent',
  },
  {
    title: 'Data-Driven Policy & System Transformation',
    desc: 'Turning fragmented data into decisions that reach communities',
  },
]

// Trust differentiators
const approachDifferentiators = [
  {
    title: 'Africa-First Design',
    desc: 'Solutions built for African system constraints, not adapted from elsewhere after the fact',
  },
  {
    title: 'Research-Led Execution',
    desc: 'Every strategy and tool grounded in evidence before deployment',
  },
  {
    title: 'Integrated Delivery',
    desc: 'Research, strategy, product, and talent operate as one system, compounding value at each stage',
  },
  {
    title: 'Built for Scale',
    desc: 'Pilots designed with national scale in mind from day one, with capacity building at the core',
  },
]

const TRUST_ANCHOR = "We are not a vendor. We are a long-term transformation partner — and we design every engagement to leave our clients stronger, more capable, and less dependent on external expertise over time."

export default function Services() {
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
    <section className="section" id="services" ref={ref}>
      <div className="container">

        {/* Header */}
        <div className="section-header fade-up">
          <span className="section-eyebrow">End-to-End AI for Health Systems</span>
          <h2>One Platform. Four Capabilities. End-to-End Impact.</h2>
          <p className="section-lead">
            Research. Advisory. Product development. Talent. Delivered together — not as isolated offerings.
            AiVantha is an integrated partner for health system transformation across Africa.
          </p>
        </div>

        {/* Services grid */}
        <div className={styles.pillarsRow}>
          {services.map((s, i) => (
            <div key={s.num} className={`${styles.card} fade-up`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className={styles.num}>{s.num}</span>
              <div className={styles.iconWrap}>{s.icon}</div>
              <span className={styles.tag}>{s.tag}</span>
              <h4>{s.title}</h4>
              <p className={styles.focus}>{s.focus}</p>
              <ul className={styles.itemList}>
                {s.items.map(item => (
                  <li key={item}><span className={styles.bullet} />{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Where we create impact */}
        <div className={`${styles.impactSection} fade-up`} style={{ transitionDelay: '.3s' }}>
          <div className="section-header">
            <h3>Where We Create Impact</h3>
            <p className="section-lead">
              Africa's health challenges are interconnected — and so are AiVantha's solutions.
            </p>
          </div>
          <div className={styles.impactGrid}>
            {impactAreas.map(area => (
              <div key={area.title} className={styles.impactCard}>
                <h4>{area.title}</h4>
                <p>{area.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why our approach works */}
        <div className={`${styles.approachSection} fade-up`} style={{ transitionDelay: '.4s' }}>
          <div className="section-header">
            <h3>Why Our Approach Works</h3>
            <p className="section-lead">
              Integrated by design. Effective by evidence.
            </p>
          </div>
          <div className={styles.approachGrid}>
            {approachDifferentiators.map(d => (
              <div key={d.title} className={styles.approachCard}>
                <h4>{d.title}</h4>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.trustAnchor}>
            <p>{TRUST_ANCHOR}</p>
          </div>
        </div>

      </div>
    </section>
  )
}
