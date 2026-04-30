import { useEffect, useRef } from 'react'
import styles from './WhyUs.module.css'

const items = [
  {
    title: 'African-Led, Globally Benchmarked',
    desc: "Our solutions are built for Africa by Africa's top AI talent — not adapted from tools designed for other contexts and imported.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
  {
    title: 'Evidence First, Always',
    desc: 'Every strategy we advise, every tool we build, every talent deployment we facilitate is grounded in research. We do not guess; we generate evidence.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
  {
    title: 'Ethical and Responsible AI',
    desc: 'Committed to AI ethics, data privacy, bias mitigation, and local governance frameworks — not as compliance, but as a core design principle.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    title: 'Integrated, Not Fragmented',
    desc: 'Research, consulting, product development, and talent under one roof. Our platform creates compounding value because every pillar feeds the others.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  },
  {
    title: 'Built for Scale',
    desc: 'We design for the full journey — from pilot to national scale. Our approach combines implementation focus with long-term capacity building.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  },
  {
    title: 'Impact is the Measure',
    desc: 'We track health outcomes, not outputs. Our dual bottom line is commercial sustainability and measurable improvement in African community health.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
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
              className={`${styles.card} fade-up`}
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
