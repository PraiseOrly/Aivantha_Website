import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'

const navItems = [
  {
    label: 'About Us',
    href: '#about',
    subItems: [
      { label: 'Our story', desc: 'Founded 2026 · Nairobi · built to last, not to pilot', href: '#about' },
      { label: 'Mission & vision', desc: 'Equitable, data-driven health transformation across Africa', href: '#about' },
      { label: 'Our values', desc: 'Ethical by design · Evidence first · Africa-led · Built to scale', href: '#about' },
      { label: 'Why we\'re different', desc: 'Africa-first research, consulting, innovation & talent', href: '#about' },
    ],
  },
  {
    label: 'Services',
    href: '#services',
    subItems: [
      { 
        label: 'Strategy',
        desc: 'Evidence that drives policy, investment, and implementation',
        href: '#services',
        children: [
          { label: 'Research & insights', desc: 'Evidence that drives decisions', href: '#services' },
          { label: 'Strategy & advisory', desc: 'From insight to execution', href: '#services' },
        ],
      },
      { 
        label: 'Execution',
        desc: 'From roadmap to deployed system',
        href: '#services',
        children: [
          { label: 'AI solutions & innovation', desc: 'Built for African health system realities', href: '#services' },
          { label: 'Talent & capacity', desc: 'Africa\'s vetted AI talent network for health', href: '#services' },
        ],
      },
    ],
  },
  {
    label: 'Solutions',
    href: '#solutions',
    subItems: [
      { label: 'Governments & ministries', desc: 'National AI strategy and health system transformation', href: '#solutions' },
      { label: 'Hospitals & clinics', desc: 'Decision support, diagnostics, and workflow AI', href: '#solutions' },
      { label: 'NGOs & development partners', desc: 'Applied research, MEL, and AI governance', href: '#solutions' },
      { label: 'Private sector', desc: 'AI tools, vetted talent, and co-development', href: '#solutions' },
    ],
  },
  {
    label: 'Resources',
    href: '#resources',
    subItems: [
      { label: 'Clinical AI solutions', desc: 'AI tools for point-of-care decision support and population health', href: '#resources' },
      { label: 'Predictive analytics & surveillance', desc: 'Outbreak detection and risk stratification for health agencies', href: '#resources' },
      { label: 'AiVantha Data', desc: 'Interoperable health intelligence platform for ministries and networks', href: '#resources' },
      { label: 'AiVantha Coach', desc: 'AI-driven workforce augmentation for resource-limited settings', href: '#resources' },
    ],
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileDropdown, setMobileDropdown] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (e, href) => {
    e.preventDefault()
    setOpen(false)
    setActiveDropdown(null)
    setMobileDropdown(null)
    const target = document.querySelector(href)
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 70
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const toggleDropdown = (label) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  const toggleMobileDropdown = (label) => {
    setMobileDropdown(mobileDropdown === label ? null : label)
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#home" className={styles.brand} onClick={e => handleLink(e, '#home')}>
          <img src="/AiVantha Logo.png" alt="AiVantha Health" className={styles.logoImg} />
        </a>

        {/* Desktop Navigation */}
        <ul className={styles.links}>
          {navItems.map((item) => (
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
                    onClick={() => toggleDropdown(item.label)}
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
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                      >
                        {item.label === 'Services' ? (
                          // Two-column layout for Services with column labels
                          <div className={styles.dropdownGrid}>
                            <div className={styles.columnDivider}>
                              {item.subItems.map((group) => (
                                <div key={group.label} className={styles.dropdownGroup}>
                                  <span className={styles.groupLabel}>{group.label}</span>
                                  <span className={styles.groupDesc}>{group.desc}</span>
                                  {group.children?.map((child) => (
                                    <a
                                      key={child.label}
                                      href={child.href}
                                      className={styles.dropdownLink}
                                      onClick={(e) => handleLink(e, child.href)}
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
                          // Single column for About, Solutions, Resources
                          <div className={styles.dropdownList}>
                            {item.subItems.map((subItem) => (
                              <a
                                key={subItem.label}
                                href={subItem.href}
                                className={styles.dropdownLink}
                                onClick={(e) => handleLink(e, subItem.href)}
                              >
                                <span className={styles.linkTitle}>{subItem.label}</span>
                                <span className={styles.linkDesc}>{subItem.desc}</span>
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
                  onClick={(e) => handleLink(e, item.href)}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
          {/* Contact link - no dropdown */}
          <li>
            <a 
              href="#contact" 
              className={styles.link}
              onClick={(e) => handleLink(e, '#contact')}
            >
              Contact
            </a>
          </li>
          {/* CTA Button */}
          <li>
            <a
              href="#contact"
              className={styles.cta}
              onClick={(e) => handleLink(e, '#contact')}
            >
              Get in touch
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className={`${styles.toggle} ${open ? styles.toggleOpen : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {open && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item) => (
                <div key={item.label} className={styles.mobileItem}>
                  {item.subItems ? (
                    <>
                      <button
                        className={`${styles.mobileLink} ${mobileDropdown === item.label ? styles.mobileLinkOpen : ''}`}
                        onClick={() => toggleMobileDropdown(item.label)}
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
                            {item.subItems.map((subItem) => (
                              <a
                                key={subItem.label}
                                href={subItem.href}
                                className={styles.mobileSubLink}
                                onClick={(e) => handleLink(e, subItem.href)}
                              >
                                {subItem.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className={styles.mobileLink}
                      onClick={(e) => handleLink(e, item.href)}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
              <a
                href="#contact"
                className={`${styles.mobileLink} ${styles.mobileCta}`}
                onClick={(e) => handleLink(e, '#contact')}
              >
                Get in touch
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
