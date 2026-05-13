import { Activity, Brain, Database, FileText, Shield, Stethoscope, Zap } from 'lucide-react'
import { useEffect, useRef } from 'react'
import '../styles/global.css'
import styles from './Services.module.css'

const serviceCategories = [
  {
    label: 'Advisory & Strategy',
    desc: 'Strategic consulting that guides healthcare organisations through AI adoption, data governance, and sustainable digital transformation.',
    services: [
      {
        title: 'AI & Data Strategy',
        id: 'ai-data-strategy',
        description: 'We design AI and data strategies that help health systems turn fragmented data into actionable intelligence.',
        items: [
          'National & institutional AI strategy design',
          'Health data strategy and governance frameworks',
          'AI readiness & maturity assessments',
          'Strategic roadmaps for AI adoption in healthcare',
        ],
        Icon: Brain,
      },
      {
        title: 'Digital Health Transformation',
        id: 'digital-health-transformation',
        description: 'End-to-end support for digitising health operations, from infrastructure planning to change management.',
        items: [
          'Digital health transformation roadmaps',
          'System modernisation and digitisation strategy',
          'Scaling frameworks for health innovations',
          'Change management and adoption support',
        ],
        Icon: Zap,
      },
      {
        title: 'AI Governance & Ethics',
        id: 'ai-governance-ethics',
        description: 'Frameworks for responsible AI deployment, accountability structures, and ethical compliance in health systems.',
        items: [
          'Responsible AI frameworks',
          'Data privacy & protection strategies',
          'Regulatory compliance advisory',
          'Ethical risk assessments for AI systems',
        ],
        Icon: Shield,
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
        items: [
          'Clinical AI model development and deployment',
          'Diagnostic support systems',
          'Real-time patient risk stratification',
          'Clinician-facing decision dashboards',
        ],
        Icon: Stethoscope,
      },
      {
        title: 'Predictive Analytics & Intelligence',
        id: 'predictive-analytics',
        description: 'Population health modelling, risk stratification, and predictive systems for proactive health interventions.',
        items: [
          'Population health modelling',
          'Disease surveillance & outbreak forecasting',
          'Resource and demand prediction systems',
          'AI-driven health intelligence dashboards',
        ],
        Icon: Activity,
      },
      {
        title: 'Data Systems & Interoperability',
        id: 'health-data-systems',
        description: 'Architecture and integration solutions that unify fragmented health data across platforms and systems.',
        items: [
          'Health information system design',
          'Data architecture and system integration',
          'Interoperability frameworks (FHIR / HL7 aligned)',
          'Data pipelines and analytics infrastructure',
        ],
        Icon: Database,
      },
      {
        title: 'Applied Research & Evaluation',
        id: 'applied-research',
        description: 'Rigorous evaluation frameworks that measure real-world impact and translate evidence into practice.',
        items: [
          'AI in healthcare research',
          'Health systems modelling & analytics',
          'Implementation research studies',
          'Policy briefs & evidence reports',
        ],
        Icon: FileText,
      },
    ],
  },
]

export default function Services() {
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
    <div ref={ref}>

      {/* Header sits directly on the #001e60 body background */}
      <div id="services" className={styles.servicesHeader}>
        <div className="container">
          <div className={`${styles.headerInner} fade-up`}>
            <p className={styles.sectionEyebrow}>Our Services</p>
            <h2 className={styles.headerTitle}>Strengthening Health Systems Through Data and AI</h2>
            <p className={styles.headerLead}>
              Evidence-based AI, data, and digital health advisory services designed to strengthen Africa&apos;s health systems.
            </p>
            <div className={styles.headerDivider} />
          </div>
        </div>
      </div>

      {/* Dark card box */}
      <section className={styles.servicesSection}>
        <div className={styles.blob1} aria-hidden="true" />
        <div className={styles.blob2} aria-hidden="true" />

        <div className="container">
          {serviceCategories.map((cat, catIdx) => (
            <div
              key={catIdx}
              className={`${styles.cardGroup} ${catIdx > 0 ? styles.cardGroupBorder : ''}`}
            >
              <div className={`${styles.groupLabel} fade-up`}>
                <span className={styles.groupTag}>{cat.label}</span>
                <p className={styles.groupDesc}>{cat.desc}</p>
              </div>

              <div className={`${styles.capGrid} ${cat.services.length === 4 ? styles.capGrid4 : ''}`}>
                {cat.services.map((service, i) => (
                  <div
                    key={service.title}
                    id={service.id}
                    className={`${styles.capCard} fade-up`}
                    style={{ transitionDelay: `${i * 0.08}s` }}
                  >
                    <div className={styles.capIconWrap}>
                      <service.Icon size={20} strokeWidth={1.7} />
                    </div>
                    <h4 className={styles.capTitle}>{service.title}</h4>
                    <p className={styles.capDesc}>{service.description}</p>
                    <ul className={styles.capBullets}>
                      {service.items.map(b => <li key={b}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
