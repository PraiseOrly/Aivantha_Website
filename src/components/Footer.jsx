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
            <a href="#home" className={styles.logo} onClick={e => { e.preventDefault(); scrollTo('#home') }}>
              <span className="brand-ai">Ai</span>
              <span className="brand-vantha">Vantha</span>
              <span className="brand-health"> Health</span>
            </a>
            <p className={styles.tagline}><em>Building Africa's Intelligent Health Future</em></p>
            <div className={styles.pillars}>
              {['Research','Consulting','Innovation','Talent'].map((p, i, arr) => (
                <span key={p}>{p}{i < arr.length - 1 && <span className={styles.sep}> | </span>}</span>
              ))}
            </div>
          </div>

          <div className={styles.col}>
            <h4>Navigate</h4>
            <ul>
              {[
                ['About', '#about'], ['The Challenge', '#challenge'],
                ['What We Do', '#pillars'], ['Solutions', '#solutions'],
                ['Why Us', '#why'], ['Who We Serve', '#serve'],
              ].map(([label, href]) => (
                <li key={href}><a href={href} onClick={e => { e.preventDefault(); scrollTo(href) }}>{label}</a></li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Our Pillars</h4>
            <ul>
              {['Research Institute','Consultancy','AiVantha Lab','Talent Marketplace'].map(p => (
                <li key={p}><a href="#pillars" onClick={e => { e.preventDefault(); scrollTo('#pillars') }}>{p}</a></li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Contact</h4>
            <ul>
              {[
                ['info@aivanthahealth.com', 'mailto:info@aivanthahealth.com'],
                ['talent@aivanthahealth.com', 'mailto:talent@aivanthahealth.com'],
                ['research@aivanthahealth.com', 'mailto:research@aivanthahealth.com'],
                ['media@aivanthahealth.com', 'mailto:media@aivanthahealth.com'],
              ].map(([label, href]) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2026 AiVantha Health. All rights reserved. &nbsp;|&nbsp; Nairobi, Kenya &nbsp;|&nbsp; Pan-African Operations</p>
        </div>
      </div>
    </footer>
  )
}
