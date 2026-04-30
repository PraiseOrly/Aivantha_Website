import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'

const links = [
  { label: 'About',      href: '#about'     },
  { label: 'Challenge', href: '#challenge' },
  { label: 'Approach',   href: '#pillars'  },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Impact',    href: '#why'      },
  { label: 'Partners',  href: '#serve'    },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const target = document.querySelector(href)
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 70
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
<a href="#home" className={styles.brand} onClick={e => handleLink(e, '#home')}>
          <img src="/AiVantha Logo.png" alt="AiVantha Health" className={styles.logoImg} />
        </a>

        <button
          className={`${styles.toggle} ${open ? styles.toggleOpen : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>

        <ul className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={e => handleLink(e, l.href)}>{l.label}</a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className={styles.cta}
              onClick={e => handleLink(e, '#contact')}
            >
              Partner With Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
