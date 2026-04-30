import { useEffect, useRef } from 'react'
import styles from './Solutions.module.css'

const labSolutions = [
  'Clinical decision support systems',
  'Predictive analytics for disease surveillance',
  'Health intelligence dashboards',
  'AI-powered diagnostics and workflow tools',
  'Interoperable digital health platforms',
]

const products = [
  {
    badge: 'Live', badgeType: 'live',
    title: 'Clinical AI Solutions',
    sub: 'AiVantha Lab — Active',
    desc: 'We design and deploy AI-powered tools that address real clinical and operational challenges — from decision support at the point of care to predictive models for population health. Built for low-resource settings, validated in African clinical realities.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    badge: 'Live', badgeType: 'live',
    title: 'Predictive Analytics & Surveillance',
    sub: 'AiVantha Lab — Active',
    desc: 'Advanced analytics and machine learning models for disease surveillance, outbreak detection, and population health risk stratification — helping health systems act before crises escalate.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    badge: 'Planned 2027', badgeType: 'planned',
    title: 'AiVantha Data',
    sub: 'Health Intelligence Platform',
    desc: 'An interoperable health intelligence dashboard and analytics platform for health ministries, hospital networks, and public health agencies. Integrates fragmented data sources into a single decision-making environment — so leaders can see what is happening, where, and why.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/>
        <line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>
      </svg>
    ),
  },
  {
    badge: 'Planned 2027', badgeType: 'planned',
    title: 'AiVantha Coach',
    sub: 'Workforce Augmentation',
    desc: 'An AI-driven platform for health worker training, workflow optimisation, and decision support in resource-limited settings. Built to multiply the impact of every health worker on the continent.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
]

const techStack = [
  { category: 'AI & ML',              tools: 'TensorFlow · PyTorch · Scikit-learn' },
  { category: 'Data Systems',          tools: 'SQL · BigQuery · PostgreSQL'         },
  { category: 'Health Interoperability',tools: 'HL7 FHIR · DHIS2 · OpenHIE'       },
  { category: 'Cloud & DevOps',        tools: 'AWS · Azure · Docker · Kubernetes'  },
  { category: 'Product Development',   tools: 'FastAPI · React · Flutter'          },
]

export default function Solutions() {
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
<section className="section-alt" id="solutions" ref={ref}>
      <div className="container">
<div className="section-header fade-up">
          <h2>Solutions Built for Africa</h2>
          <p className="section-lead">
            Every AiVantha solution is designed from the ground up for the constraints and realities
            of African health systems — research-validated, ethically designed, and built to scale.
            Our products address immediate needs while building long-term infrastructure for continental transformation.
          </p>
        </div>

        <div className={styles.grid}>
          {products.map((p, i) => (
            <div key={p.title} className={`${styles.card} fade-up`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className={`${styles.badge} ${p.badgeType === 'live' ? styles.badgeLive : styles.badgePlanned}`}>
                {p.badge}
              </span>
              <div className={styles.iconWrap}>{p.icon}</div>
              <h3>{p.title}</h3>
              <p className={styles.sub}>{p.sub}</p>
              <p className={styles.desc}>{p.desc}</p>
              {i < 2 && (
                <ul className={styles.labList}>
                  {labSolutions.slice(i === 0 ? 0 : 2, i === 0 ? 3 : 5).map(s => (
                    <li key={s}><span className={styles.lbullet} />{s}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Tech Ecosystem */}
        <div className={`${styles.techSection} fade-up`} style={{ transitionDelay: '.4s' }}>
          <h3>Core Technology Ecosystem</h3>
          <p>Across our divisions, we leverage industry-leading tools and open health standards.</p>
          <div className={styles.techGrid}>
            {techStack.map(t => (
              <div key={t.category} className={styles.techCard}>
                <span className={styles.techCat}>{t.category}</span>
                <span className={styles.techTools}>{t.tools}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
