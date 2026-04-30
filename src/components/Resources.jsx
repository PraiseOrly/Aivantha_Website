import { useEffect, useRef } from 'react'
import styles from './Solutions.module.css'

// 4 products per tone guidelines - no status labels
const products = [
  {
    title: 'Clinical AI Solutions',
    desc: 'AI-powered tools that address real clinical and operational challenges, from decision support at the point of care to predictive models for population health. Built for low-resource settings and validated in African clinical realities.',
    who: 'Hospitals · Clinics · Health systems',
    outcome: 'Better clinical decisions at every touchpoint',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    title: 'Predictive Analytics & Surveillance',
    desc: 'Advanced analytics and machine learning models for disease surveillance, outbreak detection, and population health risk stratification. Built for health ministries and public health agencies that need to act before crises escalate.',
    who: 'Health ministries · Public health agencies',
    outcome: 'Early warning. Faster response. Saved lives.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: 'AiVantha Data',
    desc: 'An interoperable health intelligence platform that integrates fragmented data sources into a single decision-making environment for health ministries, hospital networks, and public health agencies. So leaders can see what is happening, where, and why.',
    who: 'Health ministries · Hospital networks · Agencies',
    outcome: 'One source of truth for the entire health system',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/>
        <line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>
      </svg>
    ),
  },
  {
    title: 'AiVantha Coach',
    desc: 'An AI-driven platform for health worker training, workflow optimisation, and decision support in resource-limited settings. Built to multiply the impact of every health worker on the continent.',
    who: 'Health workforce · Training programmes',
    outcome: 'More capable health workers, more patients served',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
]

export default function Resources() {
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
    <section className="section-alt" id="resources" ref={ref}>
      <div className="container">
        <div className="section-header fade-up">
          <h2>Products Built for Africa</h2>
          <p className="section-lead">
            Real tools for real health challenges. Each product is designed from the ground up for African constraints — validated in real clinical environments before deployment.
          </p>
        </div>

        <div className={styles.grid}>
          {products.map((p, i) => (
            <div key={p.title} className={`${styles.card} fade-up`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className={styles.iconWrap}>{p.icon}</div>
              <h3>{p.title}</h3>
              <p className={styles.desc}>{p.desc}</p>
              <div className={styles.productMeta}>
                <span className={styles.who}>{p.who}</span>
                <span className={styles.outcome}>{p.outcome}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
