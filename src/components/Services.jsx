import { AnimatePresence, motion } from 'framer-motion'
import { BarChart3, Brain, Briefcase, Building2, Database, FileText, Globe, Heart, Shield, Stethoscope, Zap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import '../styles/global.css'
import styles from './Services.module.css'

const serviceCategories = [
  {
    category: 'Advisory & Strategy',
    id: 'advisory-strategy',
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
    category: 'Technology & Research',
    id: 'technology-research',
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
        Icon: BarChart3,
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

const clients = [
  {
    title: 'Governments & Ministries',
    value: 'National AI strategy and health system transformation',
    points: [
      'National AI & data strategy',
      'Health information system modernisation',
      'AI readiness assessments',
      'Policy research & implementation support',
    ],
    Icon: Building2,
  },
  {
    title: 'Hospitals & Clinics',
    value: 'Decision support, diagnostics, and workflow AI',
    points: [
      'AI clinical decision support',
      'Predictive analytics & diagnostics',
      'Workflow optimisation',
      'Embedded AI talent deployment',
    ],
    Icon: Heart,
  },
  {
    title: 'NGOs & Development Partners',
    value: 'Applied research, MEL, and AI governance',
    points: [
      'Applied research & evidence generation',
      'MEL frameworks & evaluation',
      'Pilot deployment support',
      'AI governance advisory',
    ],
    Icon: Globe,
  },
  {
    title: 'Private Sector',
    value: 'AI tools, vetted talent, and co-development',
    points: [
      'Purpose-built AI health solutions',
      'Vetted AI & data talent',
      'Digital health product co-development',
      'Research collaboration & joint publication',
    ],
    Icon: Briefcase,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.10, delayChildren: 0.05 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] } },
}

export default function Services() {
  const ref = useRef(null)
  const [activeCategory, setActiveCategory] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.servicesSection} id="services" ref={ref}>
      <div className="container">

        <div className="section-header fade-up">
          <span className="section-tag">Our Services</span>
          <h2>Strengthening Health Systems Through Data and AI</h2>
          <p className="section-lead">
            Evidence-based AI, data, and digital health advisory services designed to strengthen Africa&apos;s health systems.
          </p>
          <div className="divider" />
        </div>

        {serviceCategories.map((cat, catIdx) => (
          <motion.div
            key={cat.category}
            id={cat.id}
            className={styles.categoryBlock}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.72, delay: catIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Category header */}
            <div className={styles.categoryHeader}>
              <span className={styles.categoryLabel}>{cat.category}</span>
              <p className={styles.categoryDesc}>{cat.desc}</p>
            </div>

            {/* Service cards */}
            <motion.div
              className={`${styles.servicesGrid} ${cat.services.length === 4 ? styles.servicesGrid4 : ''}`}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {cat.services.map(service => (
                <motion.div
                  id={service.id}
                  key={service.title}
                  className={styles.serviceCard}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.24 } }}
                  onHoverStart={() => setActiveCategory(cat.category)}
                  onHoverEnd={() => setActiveCategory(null)}
                >
                  <div className={styles.iconWrap}>
                    <service.Icon size={24} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}

        <div className={`${styles.whoWeServe} fade-up`}>
          <h3>Who We Serve</h3>
          <p className="section-lead">
            Trusted by health system stakeholders across the continent. We build partnerships that strengthen systems — not dependencies.
          </p>
          <div className={styles.clientsGrid}>
            {clients.map((client, i) => (
              <div
                key={client.title}
                className={`${styles.clientCard} fade-up`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className={styles.clientIcon}>
                  <client.Icon size={22} strokeWidth={1.7} />
                </div>
                <h4>{client.title}</h4>
                <p className={styles.clientValue}>{client.value}</p>
                <ul>
                  {client.points.map(point => <li key={point}>{point}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
