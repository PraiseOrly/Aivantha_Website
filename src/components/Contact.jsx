import { useEffect, useRef, useState } from 'react'
import styles from './Contact.module.css'

const engageTypes = [
  { icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ), label: 'Governments & Ministries',  desc: 'Digital health strategy & infrastructure' },
  { icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v4l3 3"/>
      </svg>
    ), label: 'Development Partners',       desc: 'Research collaboration & programme MEL' },
  { icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ), label: 'Hospitals & Clinics',        desc: 'AI clinical decision support deployment' },
  { icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ), label: 'Investors & Partners',       desc: 'Funding, strategic partnership & scale' },
]

export default function Contact() {
  const [form, setForm]       = useState({ name: '', org: '', email: '', enquiry: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', org: '', email: '', enquiry: '', message: '' })
    }, 3500)
  }

  return (
    <section className="section-dark" id="contact" ref={ref}>
      <div className="container">
<div className={`section-header fade-up`}>
          <h2 className="h2-light">Let's Build Africa's Health Future Together</h2>
<p className="section-lead lead-light">
            The opportunity in Africa's health AI transformation is too large for any single organization.
            We collaborate with governments, institutions, partners, and investors committed to systemic impact.
          </p>
        </div>

        <div className={styles.engageGrid}>
          {engageTypes.map((e, i) => (
            <div key={e.label} className={`${styles.engageCard} fade-up`} style={{ transitionDelay: `${i * 0.08 + 0.1}s` }}>
              <div className={styles.engageIcon}>{e.icon}</div>
              <div>
                <div className={styles.engageLabel}>{e.label}</div>
                <div className={styles.engageDesc}>{e.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.mainGrid}>
          <div className={`${styles.info} fade-up`} style={{ transitionDelay: '.15s' }}>
            <div className={styles.ctaBlock}>
              <div className={styles.ctaIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/>
                </svg>
              </div>
              <h3>Ready to Connect?</h3>
              <p>
                Every partnership we build advances the mission — better health outcomes,
                powered by trusted data and ethical AI, for Africa.
              </p>
              <a href="mailto:info@aivantha.site" className={styles.emailCta}>
                info@aivantha.site
              </a>
              <div className={styles.hqTag}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Nairobi, Kenya · Pan-African Operations
              </div>
            </div>
          </div>

          <div className={`${styles.formWrap} fade-up`} style={{ transitionDelay: '.25s' }}>
            <h3>Send Us a Message</h3>
            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.fRow}>
                <div className={styles.fg}>
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                </div>
                <div className={styles.fg}>
                  <label htmlFor="org">Organisation</label>
                  <input id="org" name="org" type="text" placeholder="Your organisation" value={form.org} onChange={handleChange} />
                </div>
              </div>
              <div className={styles.fg}>
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className={styles.fg}>
                <label htmlFor="enquiry">Nature of Enquiry</label>
                <select id="enquiry" name="enquiry" value={form.enquiry} onChange={handleChange}>
                  <option value="">Select enquiry type</option>
                  <option value="partnership">Investment &amp; Partnership</option>
                  <option value="government">Government &amp; Policy</option>
                  <option value="research">Research Collaboration</option>
                  <option value="consulting">Consulting Advisory</option>
                  <option value="clinical">Clinical AI Deployment</option>
                  <option value="talent">Talent Marketplace</option>
                  <option value="media">Media &amp; Press</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className={styles.fg}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={4} placeholder="Tell us about your project, challenge, or enquiry..." value={form.message} onChange={handleChange} />
              </div>
              <button type="submit" className={`btn-submit ${submitted ? 'success' : ''}`}>
                {submitted ? '✓ Message Sent — We\'ll be in touch' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
