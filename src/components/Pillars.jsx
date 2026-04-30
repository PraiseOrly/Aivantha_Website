import { useEffect, useRef } from 'react'
import styles from './Pillars.module.css'

const pillars = [
  {
    num: '01', tag: 'Research', title: 'AiVantha Research Institute',
    focus: 'Impactful AI & Health Data Research for Africa',
    desc: "Applied AI and health data research that generates the evidence Africa's health systems need. From disease surveillance analytics to AI readiness assessments, our research informs policy, investment, and innovation across the continent. The Research Institute is the knowledge engine of AiVantha Health — every product we build and every strategy we advise is grounded in its outputs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    num: '02', tag: 'Consulting', title: 'AiVantha Consultancy',
    focus: 'Evidence-Based AI & Data Advisory for Healthcare',
    desc: "Evidence-based strategy and advisory for governments, NGOs, hospitals, and development partners. We translate research into digital health roadmaps, AI governance frameworks, and health information system transformations that actually work in practice. Practical, implementation-focused, and locally contextualised — because advice that cannot be implemented is not advice.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    num: '03', tag: 'Innovation', title: 'AiVantha Lab',
    focus: 'Building Innovative AI & Data-Driven Health Solutions',
    desc: "The product and innovation arm of AiVantha Health. We design, prototype, and deploy AI-powered digital health solutions — including NuruMed (clinical decision support), CardiacTek (cardiac diagnostics), and AiVantha Data (health intelligence dashboards) — built for African clinical realities and validated in the field. Built on evidence. Built to scale.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    num: '04', tag: 'Talent', title: 'AiVantha Talent Marketplace',
    focus: "Africa's AI & Data Talent Hub for Healthcare",
    desc: "Africa's first platform connecting health organisations with vetted AI and data professionals who specialise in healthcare. From embedded ML engineers to fractional health data scientists, we make it possible to build health AI with African talent at the core — strengthening local capacity while meeting global standards.",
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

export default function Pillars() {
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
    <section className="section" id="pillars" ref={ref}>
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-tag">What We Do</span>
          <h2>An Integrated Platform for Health AI</h2>
          <p className="section-lead">
            Unlike consultancies that advise without building, or startups that build without evidence,
            AiVantha Health brings research, strategy, technology, and talent together in one place.
            Each of our four pillars reinforces the others — creating a platform that is greater than
            the sum of its parts.
          </p>
        </div>
        <div className={styles.grid}>
          {pillars.map((p, i) => (
            <div
              key={p.num}
              className={`${styles.card} fade-up`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className={styles.num}>{p.num}</span>
              <div className={styles.iconWrap}>{p.icon}</div>
              <span className={styles.tag}>{p.tag}</span>
              <h3>{p.title}</h3>
              <p className={styles.focus}>{p.focus}</p>
              <p className={styles.desc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
