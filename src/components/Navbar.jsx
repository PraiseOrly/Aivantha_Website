import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Navbar.module.css'

const navItems = [
  {
    label: 'About Us',
    href: '#about',
    subItems: [
      { label: 'Company Story', href: '#about' },
      { label: 'Mission & Vision', href: '#about' },
      { label: 'Values', href: '#about' },
      { label: 'Team', href: '#about' },
    ],
  },
  {
    label: 'Services',
    href: '#pillars',
    subItems: [
      { 
        label: 'Strategy Engine',
        href: '#pillars',
        children: [
          { label: 'Research Institute', href: '#pillars' },
          { label: 'Consulting', href: '#pillars' },
        ],
      },
      { 
        label: 'Execution Engine',
        href: '#pillars',
        children: [
          { label: 'Innovation Lab', href: '#pillars' },
          { label: 'Talent Marketplace', href: '#pillars' },
        ],
      },
    ],
  },
  {
    label: 'Solutions',
    href: '#solutions',
    subItems: [
      { label: 'Governments', href: '#solutions' },
      { label: 'Hospitals', href: '#solutions' },
      { label: 'NGOs', href: '#solutions' },
      { label: 'Private Sector', href: '#solutions' },
    ],
  },
  {
    label: 'Resources',
    href: '#challenge',
    subItems: [
      { label: 'Products & Roadmap', href: '#challenge' },
      { label: 'Tech Stack', href: '#challenge' },
      { label: 'Market Context', href: '#challenge' },
      { label: '$16.6B Opportunity', href: '#challenge' },
    ],
  },
  {
    label: 'Impact',
    href: '#why',
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
                        transition={{ duration: 0.2 }}
                      >
                        {item.label === 'Services' ? (
                          // Two-column layout for Services
                          <div className={styles.dropdownGrid}>
                            {item.subItems.map((group) => (
                              <div key={group.label} className={styles.dropdownGroup}>
                                <span className={styles.groupLabel}>{group.label}</span>
                                {group.children?.map((child) => (
                                  <a
                                    key={child.label}
                                    href={child.href}
                                    className={styles.dropdownLink}
                                    onClick={(e) => handleLink(e, child.href)}
                                  >
                                    {child.label}
                                  </a>
                                ))}
                              </div>
                            ))}
                          </div>
                        ) : (
                          // Single column for other dropdowns
                          <div className={styles.dropdownList}>
                            {item.subItems.map((subItem) => (
                              <a
                                key={subItem.label}
                                href={subItem.href}
                                className={styles.dropdownLink}
                                onClick={(e) => handleLink(e, subItem.href)}
                              >
                                {subItem.label}
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
          <li>
            <a
              href="#contact"
              className={styles.cta}
              onClick={(e) => handleLink(e, '#contact')}
            >
              Partner With Us
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
                Partner With Us
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
