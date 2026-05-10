import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import {
  Activity, BookOpen, Bot, Brain, Briefcase,
  Building2, Compass, Eye, FileSearch, FileText,
  Globe, Heart, Layers, LineChart, Menu, Network,
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
      { label: 'Company Overview',    desc: 'Who we are and what drives us forward',       href: '#about-overview', Icon: Building2 },
      { label: 'Vision & Mission',    desc: 'Equitable, AI-powered health transformation', href: '#about-vision', Icon: Eye       },
      { label: 'Our Approach',        desc: 'Research-first, Africa-led methodology',      href: '#about-approach', Icon: Compass   },
      { label: 'Why AiVantha Health', desc: 'What sets us apart in the ecosystem',         href: '#about-why', Icon: Star      },
      { label: 'Partnerships',        desc: 'Building the ecosystem together',             href: '#about-partnerships', Icon: Users     },
    ],
  },
  {
    label: 'Services',
    href: '#services',
    type: 'services',
    subItems: [
      { label: 'AI & Data Strategy',                  desc: 'National and institutional AI strategies',                       href: '#ai-data-strategy',            Icon: Brain       },
      { label: 'Digital Health Transformation',       desc: 'Digital health roadmaps & system modernisation',                 href: '#digital-health-transformation', Icon: Zap         },
      { label: 'AI Governance & Ethics',              desc: 'Responsible AI frameworks & compliance',                         href: '#ai-governance-ethics',          Icon: Shield      },
      { label: 'Clinical Decision Support',           desc: 'Point-of-care AI guidance tools',                                href: '#health-data-systems',           Icon: Stethoscope },
      { label: 'Predictive Analytics & Intelligence', desc: 'Outbreak detection, risk stratification & population insights',  href: '#ai-data-strategy',              Icon: Activity    },
      { label: 'Data Systems & Interoperability',     desc: 'Health data architecture & seamless data exchange',              href: '#health-data-systems',           Icon: Network     },
      { label: 'Applied Research & Evaluation',       desc: 'AI research, MEL frameworks & impact measurement',               href: '#applied-research',              Icon: FileSearch  },
    ],
  },
  {
    label: 'Products',
    href: '#solutions',
    type: 'products',
    subItems: [
      { label: 'CardiacTek',          desc: 'AI cardiac diagnostics & biosignal analysis',       href: '#solutions', Icon: Heart     },
      { label: 'Oxylytics',           desc: 'Real-time oxygen & respiratory health analytics',   href: '#solutions', Icon: Activity  },
      { label: 'AiVantha Coach',      desc: 'AI training & workflow support for health workers', href: '#solutions', Icon: Bot       },
      { label: 'AiVantha Data',       desc: 'Interoperable health intelligence platform',        href: '#solutions', Icon: LineChart },
      { label: 'AiVantha Talent Hub', desc: "Africa's vetted AI & health data talent network",  href: '#solutions', Icon: Users     },
    ],
  },
  {
    label: 'Resources',
    href: '#solutions',
    type: 'resources',
    subItems: [
      { label: 'Research & Insights',   desc: 'Original findings from our field work',     href: '#solutions', Icon: BookOpen   },
      { label: 'Publications',          desc: 'Peer-reviewed papers and reports',          href: '#solutions', Icon: FileText   },
      { label: 'Case Studies',          desc: 'Real impact across African health systems', href: '#solutions', Icon: Briefcase  },
      { label: 'Reports & Whitepapers', desc: 'In-depth analysis and frameworks',          href: '#solutions', Icon: FileSearch },
      { label: 'Blog & Articles',       desc: 'Perspectives from the field',              href: '#solutions', Icon: PenSquare  },
    ],
    featured: {
      label: 'Latest Report',
      title: 'AI Readiness in Sub-Saharan Africa 2025',
      desc: 'A landscape analysis of digital health infrastructure across 12 countries.',
      href: '#solutions',
    },
  },
  { label: 'Contact', href: '#contact' },
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

/* ── Shared sub-components ── */
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
        <span className={styles.dropItemDesc}>{item.desc}</span>
      </span>
    </a>
  )
}

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false)
  const [open,           setOpen]           = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileDropdown, setMobileDropdown] = useState(null)
  const hoverTimer = useRef(null)

  const { scrollY } = useScroll()
  const headerY     = useTransform(scrollY, [0, 100], [0, -10])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.inner}>
        <motion.div style={{ y: headerY }} className={styles.headerContent}>

          {/* Logo */}
          <a href="#home" className={styles.brand} onClick={e => handleLink(e, '#home')}>
            <img src="/AiVantha Logo.png" alt="AiVantha Health" className={styles.logoImg} />
          </a>

          {/* Desktop nav links */}
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
                          {/* ── Products: 2-column list ── */}
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

                          {/* ── About: simple list ── */}
                          {item.type === 'list' && (
                            <div className={styles.dropList}>
                              {item.subItems.map(sub => <DropItem key={sub.label} item={sub} handleLink={handleLink} />)}
                            </div>
                          )}

                          {/* ── Services: 2-column (3 left + 4 right) ── */}
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

                          {/* ── Solutions: 3-column mega menu ── */}
                          {item.type === 'mega' && (
                            <div className={styles.megaLayout}>
                              {item.columns.map((col, ci) => (
                                <div key={col.label} className={styles.megaCol}>
                                  <p className={styles.colLabel}>{col.label}</p>

                                  {/* Products column → cards */}
                                  {ci === 0 ? (
                                    <div className={styles.productCards}>
                                      {col.items.map(sub => (
                                        <a key={sub.label} href={sub.href} className={styles.productCard} onClick={e => handleLink(e, sub.href)}>
                                          <div className={styles.productCardHead}>
                                            <span className={styles.productIconWrap}>
                                              <sub.Icon size={15} strokeWidth={1.8} />
                                            </span>
                                            <span className={`${styles.badge} ${BADGE_CLASS[sub.badgeType]}`}>{sub.badge}</span>
                                          </div>
                                          <span className={styles.productTitle}>{sub.label}</span>
                                          <span className={styles.productDesc}>{sub.desc}</span>
                                        </a>
                                      ))}
                                    </div>
                                  ) : (
                                    /* Talent Hub & Capabilities → list items */
                                    <div className={styles.megaList}>
                                      {col.items.map(sub => <DropItem key={sub.label} item={sub} handleLink={handleLink} />)}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* ── Resources: list + featured card ── */}
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

            {/* CTA */}
            <li>
              <a href="#contact" className={`${styles.link} ${styles.cta}`} onClick={e => handleLink(e, '#contact')}>
                Partner With Us
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
                          {/* Solutions has columns, others have subItems */}
                          {item.columns
                            ? item.columns.map(col => (
                                <div key={col.label}>
                                  <p className={styles.mobileColLabel}>{col.label}</p>
                                  {col.items.map(sub => (
                                    <a key={sub.label} href={sub.href} className={styles.mobileSubLink} onClick={e => handleLink(e, sub.href)}>
                                      <sub.Icon size={14} strokeWidth={1.8} className={styles.mobileSubIcon} />
                                      {sub.label}
                                    </a>
                                  ))}
                                </div>
                              ))
                            : item.subItems?.map(sub => (
                                <a key={sub.label} href={sub.href} className={styles.mobileSubLink} onClick={e => handleLink(e, sub.href)}>
                                  <sub.Icon size={14} strokeWidth={1.8} className={styles.mobileSubIcon} />
                                  {sub.label}
                                </a>
                              ))
                          }
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
              transition={{ delay: navItems.length * 0.05 }}
            >
              <a href="#contact" className={`${styles.mobileLink} ${styles.mobileCta}`} onClick={e => handleLink(e, '#contact')}>
                Partner With Us
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

