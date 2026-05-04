import { BarChart3, Brain, Briefcase, Building2, Database, FileText, Globe, Heart, Shield, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';
import '../styles/global.css';
import styles from './Services.module.css';

const services = [
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
    description: 'We support end-to-end transformation of healthcare systems through digital technologies and AI integration.',
    items: [
      'Digital health transformation roadmaps',
      'System modernization and digitization strategy',
      'Scaling frameworks for health innovations',
      'Change management and adoption support',
    ],
    Icon: Zap,
  },
  {
    title: 'Health Data Systems & Architecture',
    id: 'health-data-systems',
    description: 'We build the foundational data infrastructure that enables interoperable, scalable, and real-time health decision-making.',
    items: [
      'Health information system design',
      'Data architecture and system integration',
      'Interoperability frameworks (FHIR / HL7 aligned)',
      'Data pipelines and analytics infrastructure',
    ],
    Icon: Database,
  },
  {
    title: 'AI Governance & Ethics',
    id: 'ai-governance-ethics',
    description: 'We ensure AI in healthcare is safe, ethical, and compliant with African and global standards.',
    items: [
      'Responsible AI frameworks',
      'Data privacy & protection strategies',
      'Regulatory compliance advisory',
      'Ethical risk assessments for AI systems',
    ],
    Icon: Shield,
  },
  {
    title: 'Monitoring, Evaluation & Learning',
    id: 'monitoring-evaluation',
    description: 'We help organizations measure impact and improve decision-making through data-driven evaluation systems.',
    items: [
      'MEL framework design',
      'Impact evaluation of health programs',
      'AI & digital health performance tracking',
      'Learning systems for continuous improvement',
    ],
    Icon: BarChart3,
  },
  {
    title: 'Applied Health Research',
    id: 'applied-research',
    description: 'We generate high-quality, Africa-relevant evidence to guide health policy, innovation, and investment.',
    items: [
      'AI in healthcare research',
      'Health systems modeling & analytics',
      'Implementation research studies',
      'Policy briefs & evidence reports',
    ],
    Icon: FileText,
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

export default function Services() {
  const ref = useRef(null)

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

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div
              id={service.id}
              key={service.title}
              className={`${styles.serviceCard} fade-up`}
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <div className={styles.iconWrap}>
                <service.Icon size={24} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>

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
