import styles from './Footer.module.css'

const scrollTo = (href) => {
  const el = document.querySelector(href)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>

          <div className={styles.brand}>
            <a href="#home" className={styles.logoLink} onClick={e => { e.preventDefault(); scrollTo('#home') }}>
              <img src="/logo.png" alt="AiVantha Health" className={styles.logoImg} />
            </a>
            <p className={styles.tagline}><em>Building Africa's Intelligent Health Future</em></p>
            <div className={styles.pillars}>
              {['Research', 'Consulting', 'Innovation', 'Talent'].map((p, i, arr) => (
                <span key={p}>{p}{i < arr.length - 1 && <span className={styles.sep}> · </span>}</span>
              ))}
            </div>
            <p className={styles.hq}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Nairobi, Kenya · Pan-African Operations
            </p>
          </div>

          <div className={styles.col}>
            <h4>Navigate</h4>
            <ul>
              {[
                ['The Challenge', '#challenge'],
                ['About Us',      '#about'    ],
                ['What We Do',    '#pillars'  ],
                ['Solutions',     '#solutions'],
                ['Why AiVantha',  '#why'      ],
                ['Who We Serve',  '#serve'    ],
                ['Our Team',      '#team'     ],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} onClick={e => { e.preventDefault(); scrollTo(href) }}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>What We Do</h4>
            <ul>
              {[
                'Research Institute',
                'Consulting Advisory',
                'AiVantha Lab',
                'Talent Marketplace',
              ].map(p => (
                <li key={p}>
                  <a href="#pillars" onClick={e => { e.preventDefault(); scrollTo('#pillars') }}>{p}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Get In Touch</h4>
            <div className={styles.contactBlock}>
              <a href="mailto:info@aivantha.site" className={styles.emailLink}>
                info@aivantha.site
              </a>
              <p className={styles.contactNote}>
                General enquiries, partnerships, investor relations, media &amp; all other outreach.
              </p>
            </div>
          </div>

        </div>

        <div className={styles.bottom}>
          <p>&copy; 2026 AiVantha Health. All rights reserved.</p>
          <p>Founded in Nairobi, Kenya · Serving Pan-Africa</p>
        </div>
      </div>
    </footer>
  )
}
