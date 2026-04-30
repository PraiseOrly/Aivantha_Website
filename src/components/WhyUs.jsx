import { useEffect, useRef } from 'react'
import styles from './WhyUs.module.css'

const items = [
  {
    title: 'Africa-Led, Globally Informed',
    desc: "Built by Africa's top AI and health talent — solutions designed for African realities, benchmarked against global standards.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    title: 'Research-First Approach',
    desc: 'Every solution is grounded in data and evidence. We generate the evidence before we build the solution, and build solutions only on evidence that holds.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    title: 'Ethical by Design',
    desc: 'Strong commitment to responsible AI and data governance — AI ethics, bias mitigation, and local regulatory frameworks are core design principles, not afterthoughts.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'End-to-End Platform',
    desc: 'From insight → strategy → solution → deployment. Research, consulting, product development, and talent under one roof — compounding value at every stage.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    title: 'Impact-Driven',
    desc: 'Focused on measurable health outcomes across Africa. Our dual bottom line: commercial sustainability and demonstrable improvement in African community health.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
]

export default function WhyUs() {
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
    <section className="section" id="why" ref={ref}>
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-tag">Our Differentiators</span>
          <h2>Why AiVantha Health?</h2>
        </div>
        <div className={styles.grid}>
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`${styles.card} ${i === 4 ? styles.cardCenter : ''} fade-up`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.iconWrap}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
