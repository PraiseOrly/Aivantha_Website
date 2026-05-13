import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { useState } from 'react'
import '../styles/global.css'
import styles from './ContactFooter.module.css'

// ── Ambient data ──────────────────────────────────────────────────────────────

const PARTICLES = [
  { id: 0,  left: '4%',  top: '10%', size: '2px', delay: '0s',   dur: '10s' },
  { id: 1,  left: '13%', top: '64%', size: '3px', delay: '1.4s', dur: '13s' },
  { id: 2,  left: '21%', top: '29%', size: '2px', delay: '2.8s', dur: '8s'  },
  { id: 3,  left: '30%', top: '80%', size: '4px', delay: '0.6s', dur: '11s' },
  { id: 4,  left: '39%', top: '17%', size: '2px', delay: '3.5s', dur: '9s'  },
  { id: 5,  left: '48%', top: '52%', size: '3px', delay: '1.9s', dur: '12s' },
  { id: 6,  left: '57%', top: '8%',  size: '2px', delay: '0.3s', dur: '10s' },
  { id: 7,  left: '65%', top: '75%', size: '4px', delay: '2.1s', dur: '8s'  },
  { id: 8,  left: '74%', top: '40%', size: '2px', delay: '4.3s', dur: '13s' },
  { id: 9,  left: '82%', top: '22%', size: '3px', delay: '1.7s', dur: '9s'  },
  { id: 10, left: '90%', top: '68%', size: '2px', delay: '0.8s', dur: '11s' },
  { id: 11, left: '96%', top: '45%', size: '3px', delay: '3.9s', dur: '8s'  },
  { id: 12, left: '9%',  top: '88%', size: '2px', delay: '5.2s', dur: '12s' },
  { id: 13, left: '36%', top: '45%', size: '3px', delay: '2.4s', dur: '10s' },
  { id: 14, left: '69%', top: '88%', size: '2px', delay: '4.7s', dur: '9s'  },
  { id: 15, left: '54%', top: '33%', size: '4px', delay: '6.1s', dur: '11s' },
  { id: 16, left: '44%', top: '92%', size: '2px', delay: '1.2s', dur: '8s'  },
  { id: 17, left: '78%', top: '5%',  size: '3px', delay: '3.3s', dur: '13s' },
  { id: 18, left: '17%', top: '47%', size: '2px', delay: '5.6s', dur: '9s'  },
  { id: 19, left: '86%', top: '55%', size: '3px', delay: '2.0s', dur: '10s' },
]

// ── Static content ────────────────────────────────────────────────────────────

const NAV_LINKS = [
  ['About',     '#about'    ],
  ['Services',  '#services' ],
  ['Solutions', '#solutions'],
  ['Contact',   '#contact'  ],
]

const scrollTo = href => {
  const el = document.querySelector(href)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' })
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.213 5.567 5.952-5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

// ── Component ─────────────────────────────────────────────────────────────────

export default function ContactFooter() {
  const [form, setForm]           = useState({ name: '', org: '', email: '', enquiry: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const reduced = useReducedMotion()

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', org: '', email: '', enquiry: '', message: '' })
    }, 3500)
  }

  const fadeUp = (delay = 0) => reduced ? {} : {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }

  return (
    <footer className={styles.footer} id="contact">

      {/* ── Ambient layer ── */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <div className={styles.orb3} aria-hidden="true" />
      {!reduced && PARTICLES.map(p => (
        <span key={p.id} className={styles.particle}
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.dur }}
          aria-hidden="true"
        />
      ))}

      {/* ══════════════════════════════════════════
          MAIN SPLIT: Left CTA  |  Right Form
      ══════════════════════════════════════════ */}
      <div className={styles.mainSection}>
        <div className="container">
          <div className={styles.splitGrid}>

            {/* ── Left: CTA column ── */}
            <motion.div className={styles.leftCol} {...fadeUp(0)}>
              <p className={styles.eyebrow}>Get In Touch</p>
              <h2 className={styles.headline}>
                Let's Build Africa's<br />Health Future Together
              </h2>
              <p className={styles.mission}>
                The transformation is too large for any single organisation. AiVantha partners with governments, development partners, hospitals, and investors aligned to systemic impact.
              </p>

              {/* Availability badge */}
              <div className={styles.availBadge}>
                <span className={styles.pulseDot} aria-hidden="true" />
                Available for partnerships
              </div>

              {/* Email */}
              <a href="mailto:info@aivantha.site" className={styles.emailHero}>
                info@aivantha.site
              </a>

              {/* Location */}
              <p className={styles.location}>
                <MapPin size={13} />
                Kigali, Rwanda · Pan-African Operations
              </p>

              {/* Social */}
              <div className={styles.socialRow}>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                   className={styles.socialIcon} aria-label="LinkedIn">
                  <LinkedInIcon />
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer"
                   className={styles.socialIcon} aria-label="X">
                  <XIcon />
                </a>
              </div>
            </motion.div>

            {/* ── Right: Form column ── */}
            <motion.div className={styles.rightCol} {...fadeUp(0.15)}>
              <div className={styles.formPanel}>
                <p className={styles.formEyebrow}>Send Us a Message</p>
                <form onSubmit={handleSubmit} noValidate>
                  <div className={styles.fRow}>
                    <div className={styles.fg}>
                      <label htmlFor="cf-name">Full Name</label>
                      <input id="cf-name" name="name" type="text"
                        placeholder="Your full name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className={styles.fg}>
                      <label htmlFor="cf-org">Organisation</label>
                      <input id="cf-org" name="org" type="text"
                        placeholder="Your organisation" value={form.org} onChange={handleChange} />
                    </div>
                  </div>
                  <div className={styles.fg}>
                    <label htmlFor="cf-email">Email Address</label>
                    <input id="cf-email" name="email" type="email"
                      placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className={styles.fg}>
                    <label htmlFor="cf-enquiry">Nature of Enquiry</label>
                    <select id="cf-enquiry" name="enquiry" value={form.enquiry} onChange={handleChange}>
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
                    <label htmlFor="cf-message">Message</label>
                    <textarea id="cf-message" name="message" rows={4}
                      placeholder="Tell us about your project, challenge, or enquiry..."
                      value={form.message} onChange={handleChange} />
                  </div>
                  <button type="submit"
                    className={`${styles.submitBtn} ${submitted ? styles.submitSuccess : ''}`}>
                    {submitted ? '✓ Message Sent — We\'ll be in touch' : 'Send Message'}
                    {!submitted && <ArrowRight size={15} />}
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Gradient rule ── */}
      <div className={styles.gradRule} aria-hidden="true" />

      {/* ══════════════════════════════════════════
          BOTTOM: Logo | Nav | Copyright
      ══════════════════════════════════════════ */}
      <motion.div className={styles.bottomZone} {...fadeUp(0.05)}>
        <div className="container">
          <div className={styles.bottomGrid}>

            {/* Brand */}
            <div className={styles.brand}>
              <a href="#home" className={styles.logoLink}
                 onClick={e => { e.preventDefault(); scrollTo('#home') }}>
                <img src="/logo.png" alt="AiVantha Health" className={styles.logoImg} />
              </a>
              <p className={styles.tagline}><em>Building Africa's Intelligent Health Future</em></p>
            </div>

            {/* Horizontal nav */}
            <nav className={styles.bottomNav} aria-label="Footer navigation">
              {NAV_LINKS.map(([label, href], i) => (
                <span key={href} className={styles.navItem}>
                  <a href={href} className={styles.navLink}
                     onClick={e => { e.preventDefault(); scrollTo(href) }}>
                    {label}
                  </a>
                  {i < NAV_LINKS.length - 1 && <span className={styles.navSep} aria-hidden="true">·</span>}
                </span>
              ))}
            </nav>

            {/* Copyright */}
            <div className={styles.copy}>
              <p>&copy; 2026 AiVantha Health</p>
              <p>Kigali, Rwanda · Pan-Africa</p>
            </div>

          </div>
        </div>
      </motion.div>

    </footer>
  )
}
