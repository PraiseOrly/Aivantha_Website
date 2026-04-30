import { useEffect, useRef } from 'react'
import styles from './Solutions.module.css'

const products = [
  {
    badge: 'In Development', badgeType: 'dev',
    title: 'NuruMed', sub: 'Clinical Decision Support',
    desc: "An AI-powered tool that supports clinicians in diagnosis, triage, and treatment recommendations using patient data and locally validated clinical guidelines. Designed for low-resource settings with limited connectivity. NuruMed brings the equivalent of a specialist second opinion to every consultation — wherever care is being delivered.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  },
  {
    badge: 'In Development', badgeType: 'dev',
    title: 'CardiacTek', sub: 'Cardiac Diagnostics',
    desc: "AI-enabled biosignal analysis and cardiac diagnostic support for hospitals and clinics across Africa. Addresses one of the fastest-growing disease burdens on the continent — non-communicable cardiovascular disease. CardiacTek makes early detection possible at scale, in settings where cardiologists are scarce.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  },
  {
    badge: 'Planned 2027', badgeType: 'planned',
    title: 'AiVantha Data', sub: 'Health Intelligence Platform',
    desc: "An interoperable health intelligence dashboard and analytics platform for health ministries, hospital networks, and public health agencies. Integrates fragmented data sources into a single decision-making environment — so leaders can see what is happening, where, and why.",
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
    title: 'AiVantha Coach', sub: 'Workforce Augmentation',
    desc: "An AI-driven platform for health worker training, workflow optimisation, and decision support in resource-limited settings. Built to multiply the impact of every health worker on the continent — because in Africa, every skilled health worker serves ten times more patients than the global average.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  },
]

export default function Solutions() {
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
    <section className="section-alt" id="solutions" ref={ref}>
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-tag">Our Solutions</span>
          <h2>Solutions Built for Africa</h2>
          <p className="section-lead">
            Every AiVantha product is designed from the ground up for the constraints and realities
            of African health systems — not adapted from tools built for other contexts. They are
            research-validated, ethically designed, and deployment-ready.
          </p>
        </div>
        <div className={styles.grid}>
          {products.map((p, i) => (
            <div
              key={p.title}
              className={`${styles.card} fade-up`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className={`${styles.badge} ${p.badgeType === 'dev' ? styles.badgeDev : styles.badgePlanned}`}>
                {p.badge}
              </span>
              <div className={styles.iconWrap}>{p.icon}</div>
              <h3>{p.title}</h3>
              <p className={styles.sub}>{p.sub}</p>
              <p className={styles.desc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
