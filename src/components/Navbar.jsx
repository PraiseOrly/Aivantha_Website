import { AnimatePresence, motion } from 'framer-motion'

import {
  Activity, BookOpen, Bot, Brain, Briefcase,
  Building2, Compass, Eye, FileSearch, FileText,
  Heart, LineChart, Menu, Network,
  PenSquare, Shield, Star, Stethoscope, Users, X, Zap,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.css'

/* ── Nav data ── */
const navItems = [
  { label: 'Home', href: '#home' },
  {
    label: 'About',
    href: '#about',
    type: 'products',
    subItems: [
      { label: 'Overview', desc: '', href: '#about-overview', Icon: Building2 },
      { label: 'Our Story', desc: '', href: '#about-story', Icon: Eye },
      { label: 'Mission & Vision', desc: '', href: '#about-approach', Icon: Compass },
      { label: 'What We Do', desc: '', href: '#about-why', Icon: Star },
      { label: 'Why AiVantha', desc: '', href: '#about-partnerships', Icon: Users },
      { label: 'Impact & Partnerships', desc: '', href: '#about-partnerships', Icon: Users },

    ],
  },
  {
    label: 'Services',
    href: '#services',
    type: 'services',
    subItems: [
      { label: 'AI & Data Strategy',                  desc: '', href: '#ai-data-strategy',              Icon: Brain       },
      { label: 'Digital Health Transformation',       desc: '', href: '#digital-health-transformation', Icon: Zap         },
      { label: 'AI Governance & Ethics',              desc: '', href: '#ai-governance-ethics',          Icon: Shield      },
      { label: 'Clinical Decision Support',           desc: '', href: '#health-data-systems',           Icon: Stethoscope },
      { label: 'Predictive Analytics & Intelligence', desc: '', href: '#ai-data-strategy',              Icon: Activity    },
      { label: 'Data Systems & Interoperability',     desc: '', href: '#health-data-systems',           Icon: Network     },
      { label: 'Applied Research & Evaluation',       desc: '', href: '#applied-research',              Icon: FileSearch  },
    ],
  },
  {
    label: 'Products',
    href: '#solutions',
    type: 'products',
    subItems: [
      { label: 'CardiacTek',          desc: '', href: '#solutions', Icon: Heart     },
      { label: 'Oxylytics',           desc: '', href: '#solutions', Icon: Activity  },
      { label: 'AiVantha Coach',      desc: '', href: '#solutions', Icon: Bot       },
      { label: 'AiVantha Data',       desc: '', href: '#solutions', Icon: LineChart },
      { label: 'AiVantha Talent Marketplace', desc: '', href: '#solutions', Icon: Users     },
    ],
  },
  {
    label: 'Resources',
    href: '#resources',
    type: 'resources',
    subItems: [
      { label: 'Research & Insights',   desc: '', href: '#resources', Icon: BookOpen   },
      { label: 'Publications',          desc: '', href: '#resources', Icon: FileText   },
      { label: 'Case Studies',          desc: '', href: '#resources', Icon: Briefcase  },
      { label: 'Reports & Whitepapers', desc: '', href: '#resources', Icon: FileSearch },
      { label: 'Blog & Articles',       desc: '', href: '#resources', Icon: PenSquare  },
    ],
    featured: {
      label: 'Latest Report',
      title: 'AI Readiness in Sub-Saharan Africa 2025',
      desc: 'A landscape analysis of digital health infrastructure across 12 countries.',
      href: '#resources',
    },
  },
]

const DROPDOWN_POS = {
  Services:  styles.dropdownServices,
  Products:  styles.dropdownServices,
  Resources: styles.dropdownResources,
}

const BADGE_CLASS = {
  dev:    styles.badgeDev,
  beta:   styles.badgeBeta,
  active: styles.badgeActive,
}

const scrollTo = href => {
  const el = document.querySelector(href)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
}

function IconWrap({ Icon }) {
  return (
    <span className={styles.iconWrap}>
      <Icon size={14} strokeWidth={1.8} />
    </span>
  )
}

function DropItem({ item, handleLink }) {
  return (
    <a href={item.href} className={styles.dropItem} onClick={e => handleLink(e, item.href)}>
      <IconWrap Icon={item.Icon} />
      <span className={styles.dropItemText}>
        <span className={styles.dropItemTitle}>
          {item.label}
          {item.badge && (
            <span className={`${styles.badge} ${BADGE_CLASS[item.badgeType]}`}>{item.badge}</span>
          )}
        </span>
        {item.desc ? <span className={styles.dropItemDesc}>{item.desc}</span> : null}
      </span>
    </a>
  )
}

export default function Navbar() {
  const [open,           setOpen]           = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileDropdown, setMobileDropdown] = useState(null)
  const hoverTimer = useRef(null)

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

  const onEnter = label => {
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setActiveDropdown(label), 90)
  }
  const onLeave = () => {
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setActiveDropdown(null), 160)
  }

  return (
    <motion.nav
      className={styles.nav}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.inner}>

        {/* Logo */}
        <a href="#home" className={styles.brand} onClick={e => handleLink(e, '#home')}>
          <img src="/AiVantha Logo.png" alt="AiVantha Health" className={styles.logoImg} />
        </a>

        {/* Center nav links */}
        <ul className={styles.links}>
          {navItems.map(item => (
            <li
              key={item.label}
              className={styles.linkItem}
              onMouseEnter={() => item.type && onEnter(item.label)}
              onMouseLeave={() => item.type && onLeave()}
            >
              {item.type ? (
                <>
                  <button
                    className={`${styles.link} ${activeDropdown === item.label ? styles.linkActive : ''}`}
                    onClick={() => setActiveDropdown(d => d === item.label ? null : item.label)}
                  >
                    {item.label}
                    <svg
                      className={`${styles.chevron} ${activeDropdown === item.label ? styles.chevronOpen : ''}`}
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        className={`${styles.dropdown} ${DROPDOWN_POS[item.label] || ''}`}
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {item.type === 'products' && (
                          <div className={styles.servicesLayout}>
                            <div className={styles.servicesLeft}>
                              {item.subItems.slice(0, 3).map(sub => <DropItem key={sub.label} item={sub} handleLink={handleLink} />)}
                            </div>
                            <div className={styles.servicesRight}>
                              {item.subItems.slice(3).map(sub => <DropItem key={sub.label} item={sub} handleLink={handleLink} />)}
                            </div>
                          </div>
                        )}

                        {item.type === 'list' && (
                          <div className={styles.dropList}>
                            {item.subItems.map(sub => <DropItem key={sub.label} item={sub} handleLink={handleLink} />)}
                          </div>
                        )}

                        {item.type === 'services' && (
                          <div className={styles.servicesLayout}>
                            <div className={styles.servicesLeft}>
                              <p className={styles.colLabel}>Advisory & Strategy</p>
                              {item.subItems.slice(0, 3).map(sub => <DropItem key={sub.label} item={sub} handleLink={handleLink} />)}
                            </div>
                            <div className={styles.servicesRight}>
                              <p className={styles.colLabel}>Technology & Research</p>
                              {item.subItems.slice(3).map(sub => <DropItem key={sub.label} item={sub} handleLink={handleLink} />)}
                            </div>
                          </div>
                        )}

                        {item.type === 'resources' && (
                          <div className={styles.resourcesLayout}>
                            <div className={styles.resourcesLeft}>
                              <p className={styles.colLabel}>Browse</p>
                              {item.subItems.map(sub => <DropItem key={sub.label} item={sub} handleLink={handleLink} />)}
                            </div>
                            <div className={styles.resourcesRight}>
                              <p className={styles.colLabel}>Featured</p>
                              <a href={item.featured.href} className={styles.featuredCard} onClick={e => handleLink(e, item.featured.href)}>
                                <div className={styles.featuredThumb} />
                                <span className={styles.featuredLabel}>{item.featured.label}</span>
                                <span className={styles.featuredTitle}>{item.featured.title}</span>
                                <span className={styles.featuredDesc}>{item.featured.desc}</span>
                                <span className={styles.featuredCta}>Read Report →</span>
                              </a>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <a href={item.href} className={styles.link} onClick={e => handleLink(e, item.href)}>
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Right: CTAs */}
        <div className={styles.navActions}>
          <a href="#contact" className={styles.ctaBtnSecondary} onClick={e => handleLink(e, '#contact')}>
            Book a Demo
          </a>
          <a href="#contact" className={styles.ctaBtn} onClick={e => handleLink(e, '#contact')}>
            Partner With Us
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.toggleBtn}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
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
                transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                {item.type ? (
                  <>
                    <button
                      className={`${styles.mobileLink} ${mobileDropdown === item.label ? styles.mobileLinkOpen : ''}`}
                      onClick={() => setMobileDropdown(d => d === item.label ? null : item.label)}
                    >
                      {item.label}
                      <svg
                        className={`${styles.chevron} ${mobileDropdown === item.label ? styles.chevronOpen : ''}`}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      >
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
                          transition={{ duration: 0.22 }}
                        >
                          {item.subItems?.map(sub => (
                            <a key={sub.label} href={sub.href} className={styles.mobileSubLink} onClick={e => handleLink(e, sub.href)}>
                              <sub.Icon size={14} strokeWidth={1.8} className={styles.mobileSubIcon} />
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
              className={styles.mobileCtas}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navItems.length * 0.05 }}
            >
              <a href="#contact" className={`${styles.mobileLink} ${styles.mobileCta}`} onClick={e => handleLink(e, '#contact')}>
                Partner With Us
              </a>
              <a href="#contact" className={`${styles.mobileLink} ${styles.mobileCtraSecondary}`} onClick={e => handleLink(e, '#contact')}>
                Book a Demo
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
