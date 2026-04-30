import { useEffect, useRef } from 'react'
import styles from './About.module.css'

export default function About() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-tag">About Us</span>
          <h2>Who We Are</h2>
        </div>
        <div className={styles.grid}>
          <div className={`${styles.text} fade-up`} style={{ transitionDelay: '.1s' }}>
            <p>AiVantha Health exists to close one of the most consequential gaps in African healthcare: the distance between the vast amounts of health data generated on the continent and the actionable intelligence that health systems need to save lives, allocate resources wisely, and respond to crises before they escalate.</p>
            <p>We are a team of African researchers, engineers, data scientists, and consultants who believe that the future of healthcare on this continent will be built by Africans — not imported. Our work is grounded in the realities of African health systems, guided by rigorous evidence, and shaped by a deep commitment to ethical, responsible AI.</p>
            <p>Founded in 2026 and headquartered in Nairobi, Kenya, AiVantha Health operates across East and West Africa, with a growing presence across the continent. We serve governments, development partners, hospitals, NGOs, and private healthcare organisations — delivering research, strategy, technology, and talent that is built to last, not built to pilot.</p>
          </div>
          <div className={styles.cards}>
            <div className={`${styles.callout} ${styles.calloutBlue} fade-up`} style={{ transitionDelay: '.2s' }}>
              <div className={styles.icon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3>Our Vision</h3>
              <p><em>"An Africa where healthcare systems and decisions are powered by trusted data, ethical AI, and local expertise — enabling better health outcomes for all."</em></p>
            </div>
            <div className={`${styles.callout} ${styles.calloutGold} fade-up`} style={{ transitionDelay: '.3s' }}>
              <div className={styles.icon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4l3 3"/>
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>To accelerate equitable, data-driven healthcare transformation in Africa — through impactful research, innovative AI solutions, evidence-based consulting, and the mobilisation of Africa's best AI and data talent.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
