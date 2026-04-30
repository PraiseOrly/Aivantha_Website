import { useEffect, useRef } from 'react'
import styles from './WhoWeServe.module.css'

const clients = [
  {
    title: 'Government Health Ministries & Agencies',
    desc: 'AI and data strategy, health information system modernisation, AI readiness assessments, policy research, and implementation support.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    title: 'International Development Partners & Foundations',
    desc: 'Applied research, MEL frameworks, pilot deployment support, evidence generation, and AI governance advisory.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
  {
    title: 'Hospitals, Clinic Networks & Private Healthcare',
    desc: 'AI clinical decision support tools, predictive analytics, workflow optimisation, and embedded AI talent.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  },
  {
    title: 'NGOs & Implementing Partners',
    desc: 'Monitoring, evaluation, and learning for digital health programmes; health data analytics; AI solution co-design.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    title: 'Technology & Academic Partners',
    desc: 'Research collaboration, co-development of AI health tools, talent pipeline access, and joint publication.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
  },
]

export default function WhoWeServe() {
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
    <section className="section-alt" id="serve" ref={ref}>
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-tag">Clients &amp; Partners</span>
          <h2>Who We Serve</h2>
          <p className="section-lead">
            AiVantha Health works with organisations committed to improving health outcomes across
            Africa through data, technology, and evidence.
          </p>
        </div>
        <div className={styles.grid}>
          {clients.map((c, i) => (
            <div
              key={c.title}
              className={`${styles.card} fade-up`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.iconWrap}>{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
        <div className={`${styles.closing} fade-up`} style={{ transitionDelay: '.5s' }}>
          <p>
            We are not a vendor. We are a long-term partner — and we design every engagement to
            leave our clients stronger, more capable, and less dependent on external expertise
            over time.
          </p>
        </div>
      </div>
    </section>
  )
}
