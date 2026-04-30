import { useState, useEffect, useRef } from 'react'
import styles from './Contact.module.css'

const contacts = [
  { label: 'General & Partnership',   value: 'info@aivantha.site',      href: 'mailto:info@aivantha.site'      },
  { label: 'Talent Marketplace',      value: 'talent@aivantha.site',    href: 'mailto:talent@aivantha.site'    },
  { label: 'Research Collaboration',  value: 'research@aivantha.site',  href: 'mailto:research@aivantha.site'  },
  { label: 'Media & Press',           value: 'media@aivantha.site',     href: 'mailto:media@aivantha.site'     },
  { label: 'Headquarters',            value: 'Nairobi, Kenya · Pan-African Operations', href: null },
]

export default function Contact() {
  const [form, setForm]       = useState({ name:'', org:'', email:'', enquiry:'', message:'' })
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setForm({ name:'', org:'', email:'', enquiry:'', message:'' }) }, 3500)
  }

  return (
    <section className="section-dark" id="contact" ref={ref}>
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-tag gold-tag">Work With Us</span>
          <h2 className="h2-light">Let's Build Africa's Health Future Together</h2>
          <p className="section-lead lead-light">
            Whether you are a government seeking to modernise your health data infrastructure, a
            development partner investing in digital health, a hospital looking to deploy AI
            decision support, or a researcher wanting to collaborate — we want to hear from you.
          </p>
        </div>
        <div className={styles.grid}>
          <div className={`${styles.info} fade-up`} style={{ transitionDelay: '.1s' }}>
            <h3>Get In Touch</h3>
            <div className={styles.contactList}>
              {contacts.map(c => (
                <div className={styles.row} key={c.label}>
                  <span className={styles.clabel}>{c.label}</span>
                  {c.href
                    ? <a href={c.href}>{c.value}</a>
                    : <span>{c.value}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.formWrap} fade-up`} style={{ transitionDelay: '.2s' }}>
            <h3>Send Us a Message</h3>
            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.fg}>
                <label htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
              </div>
              <div className={styles.fg}>
                <label htmlFor="org">Organisation</label>
                <input id="org" name="org" type="text" placeholder="Your organisation" value={form.org} onChange={handleChange} />
              </div>
              <div className={styles.fg}>
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className={styles.fg}>
                <label htmlFor="enquiry">Nature of Enquiry</label>
                <select id="enquiry" name="enquiry" value={form.enquiry} onChange={handleChange}>
                  <option value="">Select enquiry type</option>
                  <option value="partnership">Partnership</option>
                  <option value="research">Research Collaboration</option>
                  <option value="talent">Talent Marketplace</option>
                  <option value="consulting">Consulting Advisory</option>
                  <option value="media">Media &amp; Press</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className={styles.fg}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={4} placeholder="Tell us about your project or enquiry..." value={form.message} onChange={handleChange} />
              </div>
              <button type="submit" className={`btn-submit ${submitted ? 'success' : ''}`}>
                {submitted ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
