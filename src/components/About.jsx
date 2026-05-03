import {
  ArrowRight, BookOpen, Building2, Compass, Cpu,
  Eye, Globe, Heart, Layers, Lightbulb,
  Shield, Star, Target, Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import styles from './About.module.css'

const navSections = [
  { id: 'overview',     label: 'Company Overview',    Icon: Building2 },
  { id: 'vision',       label: 'Vision & Mission',    Icon: Eye       },
  { id: 'approach',     label: 'Our Approach',        Icon: Compass   },
  { id: 'why',          label: 'Why AiVantha Health', Icon: Star      },
  { id: 'partnerships', label: 'Partnerships',        Icon: Users     },
]

const approachSteps = [
  { num: '01', label: 'Research',       desc: 'Generating evidence and insights grounded in African health realities',                      Icon: BookOpen,  accent: 'cobalt' },
  { num: '02', label: 'Consulting',     desc: 'Translating insights into strategies and roadmaps for health system decision-makers',         Icon: Lightbulb, accent: 'gold'   },
  { num: '03', label: 'Technology',     desc: 'Building and deploying AI solutions designed for the realities of African health systems',    Icon: Cpu,       accent: 'cobalt' },
  { num: '04', label: 'Talent',         desc: "Enabling execution at scale with Africa's vetted AI and health data specialists",             Icon: Users,     accent: 'gold'   },
]

const whyItems = [
  { title: 'African-led, Globally Informed', desc: "Built by Africa's top AI and health talent — designed for African realities, benchmarked against global standards.", Icon: Globe   },
  { title: 'Research-Driven',               desc: 'Every solution is grounded in evidence generated before deployment, not assumptions imported from other contexts.',    Icon: BookOpen },
  { title: 'Ethical and Responsible',       desc: 'AI governance and data privacy are core design principles, not compliance add-ons bolted on after the fact.',          Icon: Shield  },
  { title: 'Integrated Platform',           desc: 'Research, consulting, technology, and talent under one roof — compounding value at every stage of impact.',             Icon: Layers  },
  { title: 'Impact-Focused',               desc: 'Every project is designed to improve health outcomes at scale — measured in lives touched and systems transformed.',    Icon: Target  },
]

const partnerTypes = [
  { label: 'Governments and Ministries of Health',       Icon: Building2 },
  { label: 'International Development Organizations',    Icon: Globe     },
  { label: 'Academic and Research Institutions',         Icon: BookOpen  },
  { label: 'Hospitals and Healthcare Networks',          Icon: Heart     },
  { label: 'Technology and Innovation Partners',         Icon: Cpu       },
]

export default function About() {
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    /* fade-up scroll animations */
    const fadeObs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    document.querySelectorAll('#about .fade-up').forEach(el => fadeObs.observe(el))

    /* active section tracking for side nav */
    const sectionObs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.dataset.section)
        })
      },
      { rootMargin: '-15% 0px -60% 0px' }
    )
    navSections.forEach(({ id }) => {
      const el = document.getElementById(`about-${id}`)
      if (el) sectionObs.observe(el)
    })

    return () => { fadeObs.disconnect(); sectionObs.disconnect() }
  }, [])

  const scrollToSection = id => {
    const el = document.getElementById(`about-${id}`)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 108, behavior: 'smooth' })
  }

  return (
    <section className="section" id="about">
      <div className="container">

        {/* ── Page-level header ── */}
        <div className={`section-header fade-up`}>
          <span className="section-tag">About AiVantha Health</span>
          <h2>Africa's Health AI Transformation Partner</h2>
          <p className="section-lead">
            At the intersection of research, consulting, and technology — built to transform how Africa's health systems generate evidence, make decisions, and deliver care.
          </p>
          <div className="divider" />
        </div>

        {/* ── Two-column layout ── */}
        <div className={styles.layout}>

          {/* Sticky side nav */}
          <aside className={styles.sideNav}>
            {navSections.map(({ id, label, Icon }) => (
              <button
                key={id}
                className={`${styles.sideNavItem} ${activeSection === id ? styles.sideNavActive : ''}`}
                onClick={() => scrollToSection(id)}
              >
                <Icon size={14} strokeWidth={1.8} className={styles.sideNavIcon} />
                <span>{label}</span>
              </button>
            ))}
          </aside>

          {/* Scrollable content */}
          <div className={styles.contentArea}>

            {/* ── 1. Company Overview ── */}
            <div id="about-overview" data-section="overview" className={styles.aboutSection}>
              <span className={styles.sectionTag}>Company Overview</span>
              <h3 className={`${styles.sectionHeading} fade-up`}>Who We Are</h3>
              <p className={`${styles.bodyCopy} fade-up`}>
                AiVantha Health is an African AI and data-driven healthcare company operating at the intersection of <strong>research, consulting, and technology</strong>.
              </p>
              <p className={`${styles.bodyCopy} fade-up`} style={{ transitionDelay: '.08s' }}>
                We bridge the gap between <strong>health data and actionable intelligence</strong>, enabling governments, healthcare providers, and partners to make smarter, faster, and more effective decisions.
              </p>

              <div className={`${styles.pillars} fade-up`} style={{ transitionDelay: '.14s' }}>
                {['Research', 'Consulting', 'Technology', 'Talent'].map(p => (
                  <span key={p} className={styles.pillarChip}>{p}</span>
                ))}
              </div>

              <div className={`${styles.foundedStrip} fade-up`} style={{ transitionDelay: '.2s' }}>
                {[
                  { num: '2026', label: 'Year Founded' },
                  { num: 'Kigali', label: 'Headquarters' },
                  { num: 'Pan-African', label: 'Operations' },
                ].map((item, i) => (
                  <>
                    {i > 0 && <div key={`div-${i}`} className={styles.foundedDivider} />}
                    <div key={item.num} className={styles.foundedItem}>
                      <span className={styles.foundedNum}>{item.num}</span>
                      <span className={styles.foundedLabel}>{item.label}</span>
                    </div>
                  </>
                ))}
              </div>
            </div>

            {/* ── 2. Vision & Mission ── */}
            <div id="about-vision" data-section="vision" className={styles.aboutSection}>
              <span className={styles.sectionTag}>Vision & Mission</span>
              <h3 className={`${styles.sectionHeading} fade-up`}>What Drives Us</h3>

              <div className={styles.vmGrid}>
                <div className={`${styles.vmCard} ${styles.vmVision} fade-up`}>
                  <div className={styles.vmQuoteMark}>&ldquo;</div>
                  <div className={styles.vmBadge}>Vision</div>
                  <p className={styles.vmQuote}>
                    An Africa where healthcare decisions are powered by trusted data, ethical AI, and local expertise.
                  </p>
                </div>
                <div className={`${styles.vmCard} ${styles.vmMission} fade-up`} style={{ transitionDelay: '.1s' }}>
                  <div className={styles.vmQuoteMark}>&ldquo;</div>
                  <div className={styles.vmBadge}>Mission</div>
                  <p className={styles.vmQuote}>
                    To accelerate equitable, data-driven healthcare transformation across Africa.
                  </p>
                </div>
              </div>
            </div>

            {/* ── 3. Our Approach ── */}
            <div id="about-approach" data-section="approach" className={styles.aboutSection}>
              <span className={styles.sectionTag}>Our Approach</span>
              <h3 className={`${styles.sectionHeading} fade-up`}>An Integrated Platform</h3>
              <p className={`${styles.bodyCopy} fade-up`} style={{ transitionDelay: '.06s' }}>
                We operate as an integrated platform that connects every stage of health system transformation — ensuring every solution is <strong>evidence-based, contextually relevant, and built for real-world impact</strong>.
              </p>

              <div className={`${styles.approachFlow} fade-up`} style={{ transitionDelay: '.12s' }}>
                {approachSteps.map((step, i) => (
                  <div key={step.label} className={styles.approachStepWrap}>
                    <div className={`${styles.approachStep} ${step.accent === 'cobalt' ? styles.approachStepCobalt : styles.approachStepGold}`}>
                      <span className={styles.approachNum}>{step.num}</span>
                      <step.Icon
                        size={22}
                        strokeWidth={1.6}
                        className={step.accent === 'cobalt' ? styles.approachIconCobalt : styles.approachIconGold}
                      />
                      <span className={styles.approachLabel}>{step.label}</span>
                      <span className={styles.approachDesc}>{step.desc}</span>
                    </div>
                    {i < approachSteps.length - 1 && (
                      <ArrowRight size={18} strokeWidth={1.5} className={styles.approachArrow} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── 4. Why AiVantha Health ── */}
            <div id="about-why" data-section="why" className={styles.aboutSection}>
              <span className={styles.sectionTag}>Why AiVantha Health</span>
              <h3 className={`${styles.sectionHeading} fade-up`}>What Sets Us Apart</h3>

              <div className={styles.whyGrid}>
                {whyItems.map((item, i) => (
                  <div
                    key={item.title}
                    className={`${styles.whyCard} fade-up`}
                    style={{ transitionDelay: `${i * 0.07}s` }}
                  >
                    <div className={styles.whyIcon}>
                      <item.Icon size={20} strokeWidth={1.7} />
                    </div>
                    <h4 className={styles.whyTitle}>{item.title}</h4>
                    <p className={styles.whyDesc}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 5. Partnerships ── */}
            <div id="about-partnerships" data-section="partnerships" className={styles.aboutSection}>
              <span className={styles.sectionTag}>Partnerships</span>
              <h3 className={`${styles.sectionHeading} fade-up`}>Building the Ecosystem</h3>
              <p className={`${styles.bodyCopy} fade-up`} style={{ transitionDelay: '.06s' }}>
                We collaborate with a broad ecosystem of partners to drive impact across Africa. Our partnership approach is built on <strong>trust, long-term collaboration, and shared impact</strong>.
              </p>

              <div className={`${styles.partnerList} fade-up`} style={{ transitionDelay: '.12s' }}>
                {partnerTypes.map(({ label, Icon }) => (
                  <div key={label} className={styles.partnerItem}>
                    <span className={styles.partnerIcon}><Icon size={15} strokeWidth={1.8} /></span>
                    <span className={styles.partnerLabel}>{label}</span>
                  </div>
                ))}
              </div>

              <div className={`${styles.logosWrap} fade-up`} style={{ transitionDelay: '.2s' }}>
                <p className={styles.logosLabel}>Our Partners</p>
                <div className={styles.logosStrip}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className={styles.logoPlaceholder}>
                      <span>Partner {i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
