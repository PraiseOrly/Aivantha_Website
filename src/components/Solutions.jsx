import {
  ArrowRight, Briefcase, Database, GraduationCap, Heart, Users,
} from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import '../styles/global.css'
import styles from './Solutions.module.css'

// ── Static data ───────────────────────────────────────────────────────────────

const PARTICLES = [
  { id: 0,  left: '9%',  top: '15%', size: '3px', delay: '0.5s', dur: '9s'  },
  { id: 1,  left: '19%', top: '68%', size: '2px', delay: '1.4s', dur: '11s' },
  { id: 2,  left: '29%', top: '42%', size: '4px', delay: '2.6s', dur: '7s'  },
  { id: 3,  left: '37%', top: '82%', size: '2px', delay: '0.8s', dur: '10s' },
  { id: 4,  left: '45%', top: '18%', size: '3px', delay: '3.3s', dur: '12s' },
  { id: 5,  left: '54%', top: '58%', size: '5px', delay: '1.9s', dur: '8s'  },
  { id: 6,  left: '63%', top: '11%', size: '2px', delay: '0.4s', dur: '10s' },
  { id: 7,  left: '71%', top: '75%', size: '3px', delay: '2.8s', dur: '7s'  },
  { id: 8,  left: '78%', top: '44%', size: '2px', delay: '4.2s', dur: '11s' },
  { id: 9,  left: '86%', top: '28%', size: '4px', delay: '1.6s', dur: '9s'  },
  { id: 10, left: '93%', top: '63%', size: '3px', delay: '1.0s', dur: '8s'  },
  { id: 11, left: '16%', top: '51%', size: '2px', delay: '5.4s', dur: '12s' },
  { id: 12, left: '24%', top: '88%', size: '3px', delay: '3.8s', dur: '7s'  },
  { id: 13, left: '59%', top: '33%', size: '2px', delay: '2.2s', dur: '10s' },
  { id: 14, left: '74%', top: '86%', size: '4px', delay: '4.9s', dur: '9s'  },
  { id: 15, left: '40%', top: '55%', size: '2px', delay: '6.2s', dur: '11s' },
  { id: 16, left: '49%', top: '6%',  size: '3px', delay: '1.5s', dur: '8s'  },
  { id: 17, left: '82%', top: '19%', size: '2px', delay: '3.5s', dur: '12s' },
  { id: 18, left: '7%',  top: '39%', size: '5px', delay: '5.9s', dur: '7s'  },
  { id: 19, left: '96%', top: '55%', size: '2px', delay: '3.0s', dur: '10s' },
]

const STATS = [
  { value: 3,   suffix: '',  label: 'Core AI Products'        },
  { value: 500, suffix: '+', label: 'Professionals in Network' },
  { value: 25,  suffix: '+', label: 'Deployment Partners'      },
  { value: 10,  suffix: '+', label: 'Active Product Pilots'    },
]

const MARQUEE_ITEMS = [
  'CardiacTek', 'AiVantha Coach', 'AiVantha Data', 'AI Health Products',
  'Talent Marketplace', 'Clinical AI', 'Health Intelligence',
  'Expert Matching', 'Fractional AI', 'Health Tech Talent',
  'Digital Products', 'Scalable Systems',
]

const products = [
  {
    title: 'CardiacTek',
    badge: 'In Development', badgeType: 'dev',
    desc: 'AI-enabled cardiac diagnostics and biosignal analysis platform.',
    bullets: ['ECG and cardiac signal interpretation', 'Early detection of cardiovascular conditions', 'Clinical decision support for healthcare providers'],
    Icon: Heart,
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
  },
  {
    title: 'AiVantha Coach',
    badge: 'Beta', badgeType: 'beta',
    desc: 'AI-powered training and workflow support system for healthcare workers.',
    bullets: ['Continuous medical education support', 'Clinical workflow guidance', 'AI-assisted learning and upskilling'],
    Icon: GraduationCap,
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  },
  {
    title: 'AiVantha Data',
    badge: 'Active', badgeType: 'active',
    desc: 'Health intelligence and analytics platform for decision-makers.',
    bullets: ['Real-time health system dashboards', 'Population and system-level analytics', 'Predictive health insights for planning'],
    Icon: Database,
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
]

const BADGE_CLASS = {
  dev:    styles.badgeDev,
  beta:   styles.badgeBeta,
  active: styles.badgeActive,
}

const talentCards = [
  {
    title: 'Talent Categories',
    Icon: Users,
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    items: [
      'AI & Machine Learning Engineers',
      'Health Data Scientists & Analysts',
      'Biostatisticians & Informaticians',
      'Digital Health Product Managers',
      'Monitoring & Evaluation Specialists',
    ],
  },
  {
    title: 'Deployment Models',
    Icon: Briefcase,
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    items: [
      'Project-based expert teams',
      'Embedded specialists in organizations',
      'Long-term talent placements',
      'Fractional AI leadership roles',
      'Capacity-building partnerships',
    ],
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCounter({ value, suffix, label, start }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    const duration = 1800
    let startTime = null
    let rafId

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [start, value])

  return (
    <div className={styles.statItem}>
      <div className={styles.statNum}>{count}{suffix}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  )
}

function ProductCard({ product, index, reduced }) {
  const { title, badge, badgeType, desc, bullets, Icon, img } = product
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduced ? undefined : { y: -6 }}
    >
      <img src={img} alt="" className={styles.cardBg} aria-hidden="true" />
      <div className={styles.cardOverlay} />
      <span className={`${styles.badge} ${BADGE_CLASS[badgeType]}`}>{badge}</span>
      <div className={styles.cardBody}>
        <div className={styles.cardIcon}><Icon size={20} strokeWidth={1.7} /></div>
        <h4 className={styles.cardTitle}>{title}</h4>
        <p className={styles.cardDesc}>{desc}</p>
        <ul className={styles.cardBullets}>
          {bullets.map(b => <li key={b}>{b}</li>)}
        </ul>
        <span className={styles.cardCta}>View More <ArrowRight size={14} /></span>
      </div>
    </motion.div>
  )
}

function TalentCard({ card, index, reduced }) {
  const { title, Icon, img, items } = card
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduced ? undefined : { y: -6 }}
    >
      <img src={img} alt="" className={styles.cardBg} aria-hidden="true" />
      <div className={styles.cardOverlay} />
      <div className={styles.cardBody}>
        <div className={styles.cardIcon}><Icon size={20} strokeWidth={1.7} /></div>
        <h4 className={styles.cardTitle}>{title}</h4>
        <ul className={styles.cardBullets}>
          {items.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Solutions() {
  const reduced = useReducedMotion()
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div>
      {/* Header on body background */}
      <div id="solutions" className={styles.solutionsHeader}>
        <div className="container">
          <motion.div
            className={styles.headerInner}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={styles.sectionEyebrow}>Our Solutions</p>
            <h2 className={styles.headerTitle}>AI-Powered Health Technologies for Africa</h2>
            <p className={styles.headerLead}>
              An integrated ecosystem of AI products, talent infrastructure, and health intelligence systems — built for African healthcare realities and scalable across the continent.
            </p>
            <div className={styles.headerDivider} />
          </motion.div>
        </div>
      </div>

      {/* Immersive section */}
      <section className={styles.solutionsSection}>
        <div className={styles.blob1} aria-hidden="true" />
        <div className={styles.blob2} aria-hidden="true" />
        <div className={styles.blob3} aria-hidden="true" />

        {!reduced && PARTICLES.map(p => (
          <span
            key={p.id}
            className={styles.particle}
            style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.dur }}
            aria-hidden="true"
          />
        ))}

        <div className="container">
          {/* Stats bar */}
          <div ref={statsRef} className={styles.statsBar}>
            {STATS.map(s => (
              <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} start={statsInView} />
            ))}
          </div>

          {/* Group 1: AI Products */}
          <div className={styles.cardGroup}>
            <motion.div
              className={styles.groupLabel}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.groupTag}>AI Products</span>
              <p className={styles.groupDesc}>AI-powered products supporting clinical care, workforce development, and health system intelligence.</p>
            </motion.div>

            <div className={styles.productsGrid}>
              {products.map((product, i) => (
                <ProductCard key={product.title} product={product} index={i} reduced={reduced} />
              ))}
            </div>
          </div>

          {/* Group 2: Talent Marketplace */}
          <div className={`${styles.cardGroup} ${styles.cardGroupBorder}`}>
            <motion.div
              className={styles.groupLabel}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.groupTag}>AiVantha Talent Marketplace</span>
              <p className={styles.groupDesc}>A curated platform connecting organizations with vetted African AI and health data professionals.</p>
            </motion.div>

            <motion.div
              className={styles.talentIntroCard}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p>
                A talent infrastructure that enables health systems to access <strong>specialized AI and data expertise on demand</strong> — from project-based engagements to embedded long-term specialists and fractional AI leadership.
              </p>
            </motion.div>

            <div className={styles.talentGrid}>
              {talentCards.map((card, i) => (
                <TalentCard key={card.title} card={card} index={i} reduced={reduced} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#contact" className={styles.talentCta}>
                Explore AiVantha Talent Marketplace <ArrowRight size={15} strokeWidth={2} />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Marquee */}
        <div className={styles.marqueeSection}>
          <div className={styles.marqueeFadeLeft} aria-hidden="true" />
          <div className={styles.marqueeFadeRight} aria-hidden="true" />
          <div className={styles.marqueeTrack}>
            {doubled.map((item, i) => (
              <span key={i} className={styles.marqueeItem}>
                {item}
                <span className={styles.marqueeSep}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
