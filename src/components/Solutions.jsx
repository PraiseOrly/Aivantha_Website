import {
  ArrowRight, BarChart3, Briefcase, Database,
  GraduationCap, Heart, Network, Stethoscope,
  TrendingUp, Users, Zap,
} from 'lucide-react'
import { useEffect, useRef } from 'react'
import styles from './Solutions.module.css'

/* ── Data ── */
const products = [
  {
    title: 'CardiacTek',
    badge: 'In Development', badgeType: 'dev',
    desc: 'AI-enabled cardiac diagnostics and biosignal analysis platform.',
    bullets: [
      'ECG and cardiac signal interpretation',
      'Early detection of cardiovascular conditions',
      'Clinical decision support for healthcare providers',
    ],
    Icon: Heart,
  },
  {
    title: 'AiVantha Coach',
    badge: 'Beta', badgeType: 'beta',
    desc: 'AI-powered training and workflow support system for healthcare workers.',
    bullets: [
      'Continuous medical education support',
      'Clinical workflow guidance',
      'AI-assisted learning and upskilling',
    ],
    Icon: GraduationCap,
  },
  {
    title: 'AiVantha Data',
    badge: 'Active', badgeType: 'active',
    desc: 'Health intelligence and analytics platform for decision-makers.',
    bullets: [
      'Real-time health system dashboards',
      'Population and system-level analytics',
      'Predictive health insights for planning',
    ],
    Icon: Database,
  },
]

const talentCategories = [
  'AI & Machine Learning Engineers',
  'Health Data Scientists & Analysts',
  'Biostatisticians & Informaticians',
  'Digital Health Product Managers',
  'Monitoring & Evaluation Specialists',
]

const deploymentModels = [
  'Project-based expert teams',
  'Embedded specialists in organizations',
  'Long-term talent placements',
  'Fractional AI leadership roles',
  'Capacity-building partnerships',
]

const capabilities = [
  {
    title: 'Predictive Health Intelligence',
    desc: 'AI models that forecast and detect health system risks before they become crises.',
    bullets: ['Disease trend forecasting', 'Outbreak prediction and surveillance', 'Health system demand modeling'],
    Icon: TrendingUp,
  },
  {
    title: 'Clinical AI Systems',
    desc: 'AI tools that support decision-making at the point of care.',
    bullets: ['Diagnostic support systems', 'Treatment recommendation assistance', 'Real-time clinical decision tools'],
    Icon: Stethoscope,
  },
  {
    title: 'Interoperable Health Platforms',
    desc: 'Systems that unify fragmented health data across institutions and borders.',
    bullets: ['Built on FHIR / HL7 standards', 'Seamless data exchange across facilities', 'Integrated national health data ecosystems'],
    Icon: Network,
  },
  {
    title: 'Health Intelligence Dashboards',
    desc: 'Decision-support platforms for health leaders and policymakers.',
    bullets: ['Real-time health system visibility', 'Population health analytics', 'Policy and planning support'],
    Icon: BarChart3,
  },
  {
    title: 'Workflow Optimization Systems',
    desc: 'AI systems that improve efficiency across every layer of healthcare delivery.',
    bullets: ['Reduces administrative burden', 'Optimizes clinical workflows', 'Enhances patient throughput'],
    Icon: Zap,
  },
]

const BADGE = {
  dev:    styles.badgeDev,
  beta:   styles.badgeBeta,
  active: styles.badgeActive,
}

export default function Solutions() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.06 }
    )
    ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.solutionsSection} id="solutions" ref={ref}>
      {/* Ambient glow blobs */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />

      <div className="container">

        {/* ── Header ── */}
        <div className="section-header fade-up">
          <span className="section-tag gold-tag">Our Solutions</span>
          <h2 className="h2-light">AI-Powered Health Technologies for Africa</h2>
          <p className="section-lead lead-light">
            An integrated ecosystem of AI products, talent infrastructure, and health intelligence systems — built for African healthcare realities and scalable across the continent.
          </p>
          <div className="divider" />
        </div>

        {/* ── Platform Overview ── */}
        <div className={`${styles.platformOverview} fade-up`}>
          <p>
            AiVantha Health Solutions is an integrated ecosystem of <strong>AI products</strong>, <strong>talent infrastructure</strong>, and <strong>health intelligence systems</strong>.
          </p>
          <p>
            We design and deploy solutions that move from <strong>research to real-world impact</strong>, ensuring every system is built for African healthcare realities and scalable across institutions, regions, and countries.
          </p>
        </div>

        {/* ════════════════════════ 01 · PRODUCTS ════════════════════════ */}
        <div className={styles.sectionBlock}>
          <div className={`${styles.sectionMeta} fade-up`}>
            <span className={styles.sectionNum}>01 · Products</span>
            <h3 className={styles.sectionTitle}>AI-Driven Healthcare Technologies</h3>
            <p className={styles.sectionDesc}>
              AI-powered products supporting clinical care, workforce development, and health system intelligence.
            </p>
          </div>

          <div className={styles.productsGrid}>
            {products.map((product, i) => (
              <div
                key={product.title}
                className={`${styles.productCard} fade-up`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span className={`${styles.badge} ${BADGE[product.badgeType]}`}>{product.badge}</span>

                <h4 className={styles.productName}>{product.title}</h4>
                <p className={styles.productDesc}>{product.desc}</p>

                <ul className={styles.productBullets}>
                  {product.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>

                <a href="#contact" className={styles.productCta}>
                  View More <ArrowRight size={13} strokeWidth={2.2} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════ 02 · TALENT HUB ════════════════════════ */}
        <div className={`${styles.sectionBlock} ${styles.sectionBlockBorder}`}>
          <div className={`${styles.sectionMeta} fade-up`}>
            <span className={styles.sectionNum}>02 · Talent Hub</span>
            <h3 className={styles.sectionTitle}>Africa's AI & Health Data Talent Ecosystem</h3>
            <p className={styles.sectionDesc}>
              A curated platform connecting organizations with vetted African AI and health data professionals to accelerate digital transformation.
            </p>
          </div>

          <div className={`${styles.talentIntro} fade-up`} style={{ transitionDelay: '.07s' }}>
            <p>
              A talent infrastructure that enables health systems to access <strong>specialized AI and data expertise on demand</strong> — from project-based engagements to embedded long-term specialists and fractional AI leadership.
            </p>
          </div>

          <div className={styles.talentGrid}>
            <div className={`${styles.talentCol} fade-up`} style={{ transitionDelay: '.13s' }}>
              <div className={styles.talentColTitle}>
                <Users size={13} strokeWidth={2.2} />
                Talent Categories
              </div>
              <ul className={styles.talentList}>
                {talentCategories.map(c => <li key={c}>{c}</li>)}
              </ul>
            </div>

            <div className={`${styles.talentCol} fade-up`} style={{ transitionDelay: '.2s' }}>
              <div className={styles.talentColTitle}>
                <Briefcase size={13} strokeWidth={2.2} />
                Deployment Models
              </div>
              <ul className={styles.talentList}>
                {deploymentModels.map(m => <li key={m}>{m}</li>)}
              </ul>
            </div>
          </div>

          <div className={`fade-up`} style={{ transitionDelay: '.26s' }}>
            <a href="#contact" className={styles.talentCta}>
              Explore Talent Hub <ArrowRight size={15} strokeWidth={2} />
            </a>
          </div>
        </div>

        {/* ════════════════════════ 03 · HEALTH INTELLIGENCE SYSTEMS ════════════════════════ */}
        <div className={`${styles.sectionBlock} ${styles.sectionBlockBorder}`}>
          <div className={`${styles.sectionMeta} fade-up`}>
            <span className={styles.sectionNum}>03 · Health Intelligence Systems</span>
            <h3 className={styles.sectionTitle}>The Core Infrastructure Layer</h3>
            <p className={styles.sectionDesc}>
              AI and data infrastructure that powers modern, interoperable, and intelligent healthcare systems — the layer that connects all products into a unified ecosystem.
            </p>
          </div>

          <div className={styles.capGrid}>
            {capabilities.map((cap, i) => (
              <div
                key={cap.title}
                className={`${styles.capCard} fade-up`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className={styles.capIconWrap}>
                  <cap.Icon size={20} strokeWidth={1.7} />
                </div>
                <h4 className={styles.capTitle}>{cap.title}</h4>
                <p className={styles.capDesc}>{cap.desc}</p>
                <ul className={styles.capBullets}>
                  {cap.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
