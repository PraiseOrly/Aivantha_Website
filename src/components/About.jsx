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
            <p>
              <strong>AiVantha Health</strong> is an African AI and data-driven healthcare company
              operating at the intersection of <strong>Research | Consulting | Innovation | Talent</strong>.
            </p>
            <p>
              We design and deliver ethical, scalable, and locally grounded digital health solutions —
              powered by cutting-edge research and Africa's top AI talent.
            </p>
            <p>
              Our integrated platform ensures that every solution is <strong>evidence-based</strong> through
              Research, <strong>strategically aligned</strong> through Consulting,{' '}
              <strong>technically robust</strong> through Innovation, and{' '}
              <strong>sustainably deployed</strong> through Talent.
            </p>
            <p>
              Founded in 2026 and headquartered in Nairobi, Kenya, AiVantha Health operates across
              East and West Africa, serving governments, development partners, hospitals, NGOs, and
              private healthcare organisations — delivering work that is built to last, not built to pilot.
            </p>
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
              <p><em>An Africa where healthcare systems and decisions are powered by trusted data, ethical AI, and local expertise — driving better health outcomes for all.</em></p>
            </div>
            <div className={`${styles.callout} ${styles.calloutGold} fade-up`} style={{ transitionDelay: '.3s' }}>
              <div className={styles.icon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4l3 3"/>
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>To accelerate equitable, data-driven healthcare transformation in Africa through <strong>research, consulting, innovation, and talent deployment</strong>.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
