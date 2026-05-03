import { useEffect, useRef } from 'react'
import styles from './Solutions.module.css'

const products = [
  {
    title: 'CardiacTek',
    desc: 'AI-enabled cardiac diagnostics and biosignal analysis platform.',
    status: 'In Development',
    statusType: 'dev',
    bullets: [
      'ECG and cardiac signal interpretation',
      'Early detection support for cardiovascular conditions',
      'Clinical decision assistance for healthcare providers'
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v5c0 6 8 10 8 10z"/>
        <polyline points="16,22 16,18 8,14 8,22"/>
      </svg>
    )
  },
  {
    title: 'AiVantha Coach',
    desc: 'AI-powered training and workflow support system for healthcare workers.',
    status: 'Planned',
    statusType: 'planned',
    bullets: [
      'Continuous medical education support',
      'Clinical workflow guidance',
      'AI-assisted learning and upskilling'
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    )
  },
  {
    title: 'AiVantha Data',
    desc: 'Health intelligence and analytics platform for decision-makers.',
    status: 'Planned',
    statusType: 'planned',
    bullets: [
      'Real-time health dashboards',
      'Population and system-level analytics',
      'Predictive health insights'
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/>
        <line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>
      </svg>
    )
  }
]

const talentCategories = [
  'AI & Machine Learning Engineers',
  'Health Data Scientists & Analysts',
  'Biostatisticians & Informaticians',
  'Digital Health Product Managers',
  'Monitoring & Evaluation Specialists'
]

const deploymentModels = [
  'Project-based teams',
  'Embedded specialists in organizations',
  'Long-term talent placements',
  'Fractional AI leadership roles',
  'Capacity-building partnerships'
]

const capabilities = [
  'Predictive Analytics - Forecast disease trends and health system demand.',
  'Clinical Decision Support Systems - AI tools that assist clinicians in diagnosis and treatment decisions.',
  'Interoperable Health Platforms - Systems built on FHIR / HL7 standards for seamless data exchange.',
  'Health Intelligence Systems - Integrated dashboards for governments and health organizations.',
  'Workflow Optimization Tools - AI systems that reduce inefficiencies in clinical and administrative workflows.'
]



const techStack = [
  { category: 'AI & ML',              tools: 'TensorFlow · PyTorch · Scikit-learn' },
  { category: 'Data Systems',          tools: 'SQL · BigQuery · PostgreSQL'         },
  { category: 'Health Interoperability',tools: 'HL7 FHIR · DHIS2 · OpenHIE'       },
  { category: 'Cloud & DevOps',        tools: 'AWS · Azure · Docker · Kubernetes'  },
  { category: 'Product Development',   tools: 'FastAPI · React · Flutter'          },
]

// Trust anchor
const TRUST_ANCHOR = "We are not a vendor. We are a long-term transformation partner — and we design every engagement to leave our clients stronger, more capable, and less dependent on external expertise over time."

export default function Solutions() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="solutions-section" id="solutions" ref={ref}>
      <div className="container">
        <div className="section-header fade-up">
          <h2>Our Solutions</h2>
          <p className="section-lead">
            AI-powered health technologies, talent platforms, and data systems designed to strengthen Africa&apos;s healthcare infrastructure.
          </p>
        </div>

        {/* Products */}
        <div className={`${styles.sectionSubheader} fade-up`} style={{'--delay': '0.1s'}}>
          <h3>Products</h3>
          <p>We build AI-driven healthcare products that support clinical decision-making, workforce development, and health system intelligence.</p>
        </div>
        <div className={`${styles.productsGrid} fade-up`} style={{'--delay': '0.2s'}}>
          {products.map((product, i) => (
            <div key={product.title} className={`${styles.productCard} fade-up`} style={{'--delay': `${0.3 + i * 0.1}s`}}>
              <span className={`${styles.statusBadge} ${styles[product.statusType]}`}>
                {product.status}
              </span>
              <div className={styles.iconWrap}>{product.icon}</div>
              <h4>{product.title}</h4>
              <p>{product.desc}</p>
              <ul>
                {product.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Talent Hub */}
        <div className={`${styles.sectionSubheader} fade-up`} style={{'--delay': '0.8s'}}>
          <h3>Talent Hub</h3>
          <p>Africa&apos;s dedicated AI and data talent ecosystem for healthcare innovation and deployment.</p>
        </div>
        <div className={`${styles.talentSection} fade-up`} style={{'--delay': '0.9s'}}>
          <div className={styles.talentWhat}>
            <h4>What It Is</h4>
            <p>A curated platform connecting organizations with <strong>vetted African AI and health data professionals</strong>.</p>
          </div>
          <div className={styles.talentLists}>
            <div>
              <h5>Talent Categories</h5>
              <ul>
                {talentCategories.map((cat, i) => <li key={i}>{cat}</li>)}
              </ul>
            </div>
            <div>
              <h5>Deployment Models</h5>
              <ul>
                {deploymentModels.map((model, i) => <li key={i}>{model}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Capabilities */}
        <div className={`${styles.sectionSubheader} fade-up`} style={{'--delay': '1.4s'}}>
          <h3>Solution Capabilities</h3>
          <p>We design and deploy <strong>core AI and data capabilities</strong> that power modern healthcare systems.</p>
        </div>
        <div className={styles.capabilitiesGrid} style={{'--delay': '1.5s'}}>
          {capabilities.map((cap, i) => (
            <div key={i} className={`${styles.capabilityCard} fade-up`} style={{'--delay': `${1.6 + i * 0.05}s`}}>
              {cap}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
