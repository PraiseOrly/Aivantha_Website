import { Activity, ArrowRight, Brain, Database, FileText, Shield, Stethoscope, Zap } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import '../styles/global.css'
import styles from './Services.module.css'

// ── Static data ───────────────────────────────────────────────────────────────

const PARTICLES = [
  { id: 0,  left: '8%',  top: '12%', size: '3px', delay: '0s',    dur: '8s'  },
  { id: 1,  left: '18%', top: '72%', size: '2px', delay: '1.2s',  dur: '11s' },
  { id: 2,  left: '27%', top: '38%', size: '4px', delay: '2.4s',  dur: '7s'  },
  { id: 3,  left: '35%', top: '85%', size: '2px', delay: '0.6s',  dur: '9s'  },
  { id: 4,  left: '43%', top: '22%', size: '3px', delay: '3.1s',  dur: '12s' },
  { id: 5,  left: '52%', top: '61%', size: '5px', delay: '1.8s',  dur: '8s'  },
  { id: 6,  left: '61%', top: '14%', size: '2px', delay: '0.3s',  dur: '10s' },
  { id: 7,  left: '69%', top: '78%', size: '3px', delay: '2.7s',  dur: '7s'  },
  { id: 8,  left: '76%', top: '46%', size: '2px', delay: '4.0s',  dur: '11s' },
  { id: 9,  left: '84%', top: '30%', size: '4px', delay: '1.5s',  dur: '9s'  },
  { id: 10, left: '91%', top: '67%', size: '3px', delay: '0.9s',  dur: '8s'  },
  { id: 11, left: '14%', top: '54%', size: '2px', delay: '5.2s',  dur: '12s' },
  { id: 12, left: '22%', top: '90%', size: '3px', delay: '3.6s',  dur: '7s'  },
  { id: 13, left: '58%', top: '35%', size: '2px', delay: '2.1s',  dur: '10s' },
  { id: 14, left: '72%', top: '88%', size: '4px', delay: '4.8s',  dur: '9s'  },
  { id: 15, left: '38%', top: '52%', size: '2px', delay: '6.0s',  dur: '11s' },
  { id: 16, left: '47%', top: '8%',  size: '3px', delay: '1.4s',  dur: '8s'  },
  { id: 17, left: '80%', top: '17%', size: '2px', delay: '3.3s',  dur: '12s' },
  { id: 18, left: '6%',  top: '36%', size: '5px', delay: '5.7s',  dur: '7s'  },
  { id: 19, left: '94%', top: '52%', size: '2px', delay: '2.9s',  dur: '10s' },
]

const STATS = [
  { value: 50,  suffix: '+',  label: 'AI Projects Delivered' },
  { value: 12,  suffix: '+',  label: 'Countries Reached'     },
  { value: 98,  suffix: '%',  label: 'Client Satisfaction'   },
  { value: 200, suffix: 'K+', label: 'Patients Impacted'     },
]

const MARQUEE_ITEMS = [
  'Clinical AI', 'Health Data Governance', 'Predictive Analytics',
  'Digital Transformation', 'FHIR Interoperability', 'AI Ethics',
  'Population Health', 'Decision Support', 'Health Intelligence',
  'Data Strategy', 'Machine Learning', 'African Health Systems',
]

const serviceCategories = [
  {
    label: 'Advisory & Strategy',
    desc: 'Strategic consulting that guides healthcare organisations through AI adoption, data governance, and sustainable digital transformation.',
    services: [
      {
        title: 'AI & Data Strategy',
        id: 'ai-data-strategy',
        description: 'We design AI and data strategies that help health systems turn fragmented data into actionable intelligence.',
        items: ['National & institutional AI strategy design', 'Health data strategy and governance frameworks', 'AI readiness & maturity assessments', 'Strategic roadmaps for AI adoption in healthcare'],
        Icon: Brain,
        img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
        featured: true,
      },
      {
        title: 'Digital Health Transformation',
        id: 'digital-health-transformation',
        description: 'End-to-end support for digitising health operations, from infrastructure planning to change management.',
        items: ['Digital health transformation roadmaps', 'System modernisation and digitisation strategy', 'Scaling frameworks for health innovations', 'Change management and adoption support'],
        Icon: Zap,
        img: 'https://images.unsplash.com/photo-1559523161-0fc0d8b814f2?w=800&q=80',
      },
      {
        title: 'AI Governance & Ethics',
        id: 'ai-governance-ethics',
        description: 'Frameworks for responsible AI deployment, accountability structures, and ethical compliance in health systems.',
        items: ['Responsible AI frameworks', 'Data privacy & protection strategies', 'Regulatory compliance advisory', 'Ethical risk assessments for AI systems'],
        Icon: Shield,
        img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      },
    ],
  },
  {
    label: 'Technology & Research',
    desc: 'Data-driven technology solutions and applied research that power intelligent, scalable health systems across Africa.',
    services: [
      {
        title: 'Clinical Decision Support',
        id: 'clinical-decision-support',
        description: 'AI-powered tools that surface actionable insights at the point of care to improve clinical outcomes.',
        items: ['Clinical AI model development and deployment', 'Diagnostic support systems', 'Real-time patient risk stratification', 'Clinician-facing decision dashboards'],
        Icon: Stethoscope,
        img: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80',
      },
      {
        title: 'Predictive Analytics & Intelligence',
        id: 'predictive-analytics',
        description: 'Population health modelling, risk stratification, and predictive systems for proactive health interventions.',
        items: ['Population health modelling', 'Disease surveillance & outbreak forecasting', 'Resource and demand prediction systems', 'AI-driven health intelligence dashboards'],
        Icon: Activity,
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      },
      {
        title: 'Data Systems & Interoperability',
        id: 'health-data-systems',
        description: 'Architecture and integration solutions that unify fragmented health data across platforms and systems.',
        items: ['Health information system design', 'Data architecture and system integration', 'Interoperability frameworks (FHIR / HL7 aligned)', 'Data pipelines and analytics infrastructure'],
        Icon: Database,
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      },
      {
        title: 'Applied Research & Evaluation',
        id: 'applied-research',
        description: 'Rigorous evaluation frameworks that measure real-world impact and translate evidence into practice.',
        items: ['AI in healthcare research', 'Health systems modelling & analytics', 'Implementation research studies', 'Policy briefs & evidence reports'],
        Icon: FileText,
        img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
        wide: true,
      },
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

function ServiceCard({ service, index, reduced }) {
  const { title, description, items, Icon, img, id, featured } = service
  return (
    <motion.div
      id={id}
      className={`${styles.card} ${featured ? styles.cardFeatured : ''}`}
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
        <p className={styles.cardDesc}>{description}</p>
        <ul className={styles.cardBullets}>
          {items.slice(0, 3).map(b => <li key={b}>{b}</li>)}
        </ul>
        <span className={styles.cardCta}>Learn More <ArrowRight size={14} /></span>
      </div>
    </motion.div>
  )
}

function WideCard({ service, reduced }) {
  const { title, description, items, Icon, img, id } = service
  return (
    <motion.div
      id={id}
      className={styles.cardWide}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduced ? undefined : { y: -4 }}
    >
      <div className={styles.cardWideImgWrap}>
        <img src={img} alt="" className={styles.cardWideBg} aria-hidden="true" />
      </div>
      <div className={styles.cardWideContent}>
        <div className={styles.cardIcon}><Icon size={20} strokeWidth={1.7} /></div>
        <h4 className={styles.cardTitle}>{title}</h4>
        <p className={styles.cardDesc}>{description}</p>
        <ul className={styles.cardBullets}>
          {items.map(b => <li key={b}>{b}</li>)}
        </ul>
        <span className={styles.cardCta}>Learn More <ArrowRight size={14} /></span>
      </div>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Services() {
  const reduced = useReducedMotion()
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div>
      {/* Header on body background */}
      <div id="services" className={styles.servicesHeader}>
        <div className="container">
          <motion.div
            className={styles.headerInner}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={styles.sectionEyebrow}>Our Services</p>
            <h2 className={styles.headerTitle}>Strengthening Health Systems Through Data and AI</h2>
            <p className={styles.headerLead}>
              Evidence-based AI, data, and digital health advisory services designed to strengthen Africa&apos;s health systems.
            </p>
            <div className={styles.headerDivider} />
          </motion.div>
        </div>
      </div>

      {/* Dark immersive section */}
      <section className={styles.servicesSection}>
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

          {/* Service card groups */}
          {serviceCategories.map((cat, catIdx) => {
            const regularServices = cat.services.filter(s => !s.wide)
            const wideService = cat.services.find(s => s.wide)
            const isAdvisory = catIdx === 0

            return (
              <div
                key={cat.label}
                className={`${styles.cardGroup} ${catIdx > 0 ? styles.cardGroupBorder : ''}`}
              >
                <motion.div
                  className={styles.groupLabel}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={styles.groupTag}>{cat.label}</span>
                  <p className={styles.groupDesc}>{cat.desc}</p>
                </motion.div>

                {isAdvisory ? (
                  <div className={styles.advisoryGrid}>
                    {regularServices.map((service, i) => (
                      <ServiceCard key={service.id} service={service} index={i} reduced={reduced} />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className={styles.techGrid}>
                      {regularServices.map((service, i) => (
                        <ServiceCard key={service.id} service={service} index={i} reduced={reduced} />
                      ))}
                    </div>
                    {wideService && <WideCard service={wideService} reduced={reduced} />}
                  </>
                )}
              </div>
            )
          })}
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
