import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'

const navItems = [
  {
    label: 'About Us',
    href: '#about',
    subItems: [
      { label: 'Our Story',       desc: 'Founded 2026 · Nairobi · built to last, not to pilot',           href: '#about' },
      { label: 'Mission & Vision', desc: 'Equitable, data-driven health transformation across Africa',    href: '#about' },
      { label: 'Our Values',      desc: 'Ethical by design · Evidence first · Africa-led · Built to scale', href: '#about' },
      { label: 'Why We\'re Different', desc: 'Africa-first research, consulting, innovation & talent',    href: '#about' },
    ],
  },
  {
    label: 'Services',
    href: '#pillars',
    subItems: [
      {
        label: 'Strategy',
        desc: 'Evidence that drives policy, investment, and implementation',
        href: '#pillars',
        children: [
          { label: 'Research & Insights',   desc: 'Evidence that drives decisions',   href: '#pillars' },
          { label: 'Strategy & Advisory',   desc: 'From insight to execution',        href: '#pillars' },
        ],
      },
      {
        label: 'Execution',
        desc: 'From roadmap to deployed system',
        href: '#pillars',
        children: [
          { label: 'AI Solutions & Innovation', desc: 'Built for African health system realities',      href: '#pillars' },
          { label: 'Talent & Capacity',         desc: 'Africa\'s vetted AI talent network for health', href: '#pillars' },
        ],
      },
    ],
  },
  {
    label: 'Solutions',
    href: '#solutions',
    subItems: [
      { label: 'Governments & Ministries',   desc: 'National AI strategy and health system transformation', href: '#solutions' },
      { label: 'Hospitals & Clinics',        desc: 'Decision support, diagnostics, and workflow AI',        href: '#solutions' },
      { label: 'NGOs & Development Partners', desc: 'Applied research, MEL, and AI governance',             href: '#solutions' },
      { label: 'Private Sector',             desc: 'AI tools, vetted talent, and co-development',           href: '#solutions' },
    ],
  },
  {
    label: 'Resources',
    href: '#solutions',
    subItems: [
      { label: 'Clinical AI Solutions',             desc: 'AI tools for point-of-care decision support',              href: '#solutions' },
      { label: 'Predictive Analytics',              desc: 'Outbreak detection and risk stratification',               href: '#solutions' },
      { label: 'AiVantha Data',                     desc: 'Interoperable health intelligence platform',               href: '#solutions' },
      { label: 'AiVantha Coach',                    desc: 'AI-driven workforce augmentation for limited settings',    href: '#solutions' },
    ],
  },
]

const scrollTo = (href) => {
  const el = document.querySelector(href)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled,        setScrolled]        = useState(false)
  const [open,            setOpen]            = useState(false)
  const [activeDropdown,  setActiveDropdown]  = useState(null)
  const [mobileDropdown,  setMobileDropdown]  = useState(null)

  const { scrollY } = useScroll()
  const headerY     = useTransform(scrollY, [0, 100], [0, -10])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleLink = (e, href) => {
    e.preventDefault()
    setOpen(false)
    setActiveDropdown(null)
    setMobileDropdown(null)
    scrollTo(href)
  }

  return (
    /* Page-load entrance: starts 100px above + invisible, animates to position in 0.8s */
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── inner wrapper ── */}
      <div className={styles.inner}>

        {/* Parallax content wrapper */}
        <motion.div style={{ y: headerY }} className={styles.headerContent}>

          {/* Logo */}
          <a href="#home" className={styles.brand} onClick={e => handleLink(e, '#home')}>
            <img src="/AiVantha Logo.png" alt="AiVantha Health" className={styles.logoImg} />
          </a>

          {/* Desktop nav */}
          <ul className={styles.links}>
            {navItems.map(item => (
              <li
                key={item.label}
                className={styles.linkItem}
                onMouseEnter={() => item.subItems && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.subItems ? (
                  <>
                    <button
                      className={`${styles.link} ${activeDropdown === item.label ? styles.linkActive : ''}`}
                      onClick={() => setActiveDropdown(d => d === item.label ? null : item.label)}
                    >
                      {item.label}
                      <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          className={styles.dropdown}
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {item.label === 'Services' ? (
                            <div className={styles.dropdownGrid}>
                              <div className={styles.columnDivider}>
                                {item.subItems.map(group => (
                                  <div key={group.label} className={styles.dropdownGroup}>
                                    <span className={styles.groupLabel}>{group.label}</span>
                                    <span className={styles.groupDesc}>{group.desc}</span>
                                    {group.children?.map(child => (
                                      <a
                                        key={child.label}
                                        href={child.href}
                                        className={styles.dropdownLink}
                                        onClick={e => handleLink(e, child.href)}
                                      >
                                        <span className={styles.linkTitle}>{child.label}</span>
                                        <span className={styles.linkDesc}>{child.desc}</span>
                                      </a>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className={styles.dropdownList}>
                              {item.subItems.map(sub => (
                                <a
                                  key={sub.label}
                                  href={sub.href}
                                  className={styles.dropdownLink}
                                  onClick={e => handleLink(e, sub.href)}
                                >
                                  <span className={styles.linkTitle}>{sub.label}</span>
                                  <span className={styles.linkDesc}>{sub.desc}</span>
                                </a>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className={styles.link}
                    onClick={e => handleLink(e, item.href)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}

            {/* Contact */}
            <li>
              <a href="#contact" className={styles.link} onClick={e => handleLink(e, '#contact')}>
                Contact
              </a>
            </li>

            {/* CTA */}
            <li>
              <a href="#contact" className={`${styles.link} ${styles.cta}`} onClick={e => handleLink(e, '#contact')}>
                Get in touch
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Mobile hamburger */}
        <button
          className={styles.toggleBtn}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          {open
            ? <X size={22} className={styles.toggleIcon} />
            : <Menu size={22} className={styles.toggleIcon} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                className={styles.mobileItem}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                {item.subItems ? (
                  <>
                    <button
                      className={`${styles.mobileLink} ${mobileDropdown === item.label ? styles.mobileLinkOpen : ''}`}
                      onClick={() => setMobileDropdown(d => d === item.label ? null : item.label)}
                    >
                      {item.label}
                      <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {mobileDropdown === item.label && (
                        <motion.div
                          className={styles.mobileDropdown}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.subItems.map(sub => (
                            <a
                              key={sub.label}
                              href={sub.href}
                              className={styles.mobileSubLink}
                              onClick={e => handleLink(e, sub.href)}
                            >
                              {sub.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <a href={item.href} className={styles.mobileLink} onClick={e => handleLink(e, item.href)}>
                    {item.label}
                  </a>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navItems.length * 0.06 }}
            >
              <a
                href="#contact"
                className={`${styles.mobileLink} ${styles.mobileCta}`}
                onClick={e => handleLink(e, '#contact')}
              >
                Get in touch
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
