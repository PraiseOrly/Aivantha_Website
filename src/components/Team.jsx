import { useEffect, useRef } from 'react'
import styles from './Team.module.css'

const tags = [
  'AI & Machine Learning', 'Public Health & Epidemiology',
  'Digital Health Consulting', 'Technology Product Development',
  'Health Data Science', 'AI Ethics & Governance',
  'Clinical Research', 'Health Policy',
  'MEL Frameworks', 'Health Systems Strengthening',
]

export default function Team() {
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
    <section className="section" id="team" ref={ref}>
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-tag">Our Team</span>
          <h2>Built by Africans, for Africa</h2>
        </div>
        <div className={styles.grid}>
          <div className={`${styles.text} fade-up`} style={{ transitionDelay: '.1s' }}>
            <p>AiVantha Health was founded by four co-founders united by a single conviction: that the transformation of Africa's health systems must be led from within the continent. Our founding team brings together expertise in AI and machine learning, public health and epidemiology, digital health consulting, and technology product development.</p>
            <p>Our growing team spans researchers, AI engineers, health data scientists, consultants, and talent specialists — all based in Africa, all working toward the same mission. We hire for excellence, retain through purpose, and develop through practice.</p>
            <p>We are governed by a Board of Directors with international representation from Kenya, Tanzania, Nigeria, and Ghana, and guided by an Advisory Council of distinguished experts in AI, healthcare, policy, and investment.</p>
          </div>
          <div className={`${styles.sidebar} fade-up`} style={{ transitionDelay: '.2s' }}>
            <div className={styles.expertiseBlock}>
              <h4>Areas of Expertise</h4>
              <div className={styles.tagCloud}>
                {tags.map(t => <span key={t}>{t}</span>)}
              </div>
            </div>
            <div className={styles.presenceBlock}>
              <h4>Pan-African Presence</h4>
              <p>Headquartered in Nairobi, Kenya &middot; Operating across East &amp; West Africa &middot; Board representation: Kenya, Tanzania, Nigeria &amp; Ghana</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
