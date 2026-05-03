import { BarChart3, Brain, Database, FileText, Shield, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';
import '../styles/global.css'; // Ensure global styles are available
import styles from './Services.module.css';

// 6 services matching navbar dropdown + task spec
const services = [
  {
    title: 'AI & Data Strategy',
    dropdown: 'AI & Data Strategy',
    description: 'We design AI and data strategies that help health systems turn fragmented data into actionable intelligence.',
    items: [
      'National & institutional AI strategy design',
      'Health data strategy and governance frameworks',
      'AI readiness & maturity assessments',
      'Strategic roadmaps for AI adoption in healthcare'
    ],
    Icon: Brain
  },
  {
    title: 'Digital Health Transformation',
    dropdown: 'Digital Health Transformation',
    description: 'We support end-to-end transformation of healthcare systems through digital technologies and AI integration.',
    items: [
      'Digital health transformation roadmaps',
      'System modernization and digitization strategy',
      'Scaling frameworks for health innovations',
      'Change management and adoption support'
    ],
    Icon: Zap
  },
  {
    title: 'Health Data Systems & Architecture',
    dropdown: 'Health Data Systems',
    description: 'We build the foundational data infrastructure that enables interoperable, scalable, and real-time health decision-making.',
    items: [
      'Health information system design',
      'Data architecture and system integration',
      'Interoperability frameworks (FHIR / HL7 aligned)',
      'Data pipelines and analytics infrastructure'
    ],
    Icon: Database
  },
  {
    title: 'AI Governance & Ethics',
    dropdown: 'AI Governance & Ethics',
    description: 'We ensure AI in healthcare is safe, ethical, and compliant with African and global standards.',
    items: [
      'Responsible AI frameworks',
      'Data privacy & protection strategies',
      'Regulatory compliance advisory',
      'Ethical risk assessments for AI systems'
    ],
    Icon: Shield
  },
  {
    title: 'Monitoring, Evaluation & Learning (MEL)',
    dropdown: 'Monitoring & Evaluation',
    description: 'We help organizations measure impact and improve decision-making through data-driven evaluation systems.',
    items: [
      'MEL framework design',
      'Impact evaluation of health programs',
      'AI & digital health performance tracking',
      'Learning systems for continuous improvement'
    ],
    Icon: BarChart3
  },
  {
    title: 'Applied Health Research',
    dropdown: 'Applied Research',
    description: 'We generate high-quality, Africa-relevant evidence to guide health policy, innovation, and investment.',
    items: [
      'AI in healthcare research',
      'Health systems modeling & analytics',
      'Implementation research studies',
      'Policy briefs & evidence reports'
    ],
    Icon: FileText
  }
]



export default function Services() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    
    const cards = ref.current?.querySelectorAll('.serviceCard')
    cards?.forEach(card => observer.observe(card))
    
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.servicesSection} id="services" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.servicesHeader}>
          <h2>Our Services</h2>
          <p className="section-lead">
            Evidence-based AI, data, and digital health advisory services designed to strengthen Africa&apos;s health systems.
          </p>
        </div>

        {/* 3x2 Services Grid */}
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div 
              id={service.dropdown.toLowerCase().replace(/ & /g, '-').replace(/, /g, '-').replace(/ \(mel\)/i, '').replace(/\s+/g, '-')} 
              key={service.title} 
              className={`${styles.serviceCard} serviceCard fade-up`}
              style={{ 
                transitionDelay: `${index * 0.1}s`,
                '--delay': `${index * 0.1}s`
              }}
            >
              <div className={styles.iconWrap}>
                <service.Icon size={24} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

