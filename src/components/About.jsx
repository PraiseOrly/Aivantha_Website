import { motion, useInView } from 'framer-motion'
import { ArrowRight, BookOpen, Brain, Globe, Layers, Lightbulb, Shield, Target, Users } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import styles from './About.module.css'

const stats = [
  { num: '1.4B+', label: 'People impacted potential' },
  { num: '25%', label: 'Global disease burden' },
  { num: '<1%', label: 'Health expenditure' },
]

const platformSteps = [
  { label: 'Research', desc: 'Evidence generation', Icon: BookOpen, accent: 'cobalt' },
  { label: 'Consulting', desc: 'Strategy roadmaps', Icon: Lightbulb, accent: 'gold' },
  { label: 'Technology', desc: 'AI deployment', Icon: Brain, accent: 'cobalt' },
  { label: 'Talent', desc: 'Scale execution', Icon: Users, accent: 'gold' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-100px' })
  const [hoveredStep, setHoveredStep] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    document.querySelectorAll('#about .fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        
        {/* HEADER */}
        <motion.div 
          className="section-header fade-up" 
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-tag">About AiVantha Health</span>
          <h2>Bridging Africa's health data and intelligent decision-making through ethical AI, research, and innovation.</h2>
          <div className="divider" />
        </motion.div>

        {/* SPLIT HERO */}
        <div className={styles.splitHero}>
          <motion.div 
            className={styles.splitText} 
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <h3 className={styles.heroHeadline}>Turning Health Data into Actionable Intelligence</h3>
            <p className={styles.heroBody}>
              AiVantha Health is an African AI and data-driven healthcare company operating at the intersection of research, consulting, and technology.
            </p>
            <p className={styles.heroBody}>
              We exist to solve a critical challenge across the continent: health systems generate data—but lack the tools to turn it into meaningful, real-time decisions.
            </p>
          </motion.div>

          <motion.div 
            className={styles.splitVisual}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            {/* Africa Map + Data Visualization */}
            <svg viewBox="0 0 480 320" className={styles.africaViz}>
              {/* Simplified Africa outline */}
              <path d="M210 20 L280 15 L340 30 L370 70 L390 120 L410 170 L420 220 L410 260 L390 280 L360 300 L320 320 L280 330 L250 320 L220 300 L190 270 L170 240 L160 200 L150 160 L155 120 L170 80 Z" fill="rgba(10,58,173,0.04)" stroke="rgba(10,58,173,0.15)" strokeWidth="1.5"/>
              
              {/* Data nodes */}
              <g className={styles.dataNode}>
                <circle cx="265" cy="215" r="10" fill="rgba(200,142,40,0.6)"/>
                <circle cx="225" cy="250" r="8" fill="rgba(10,58,173,0.6)"/>
                <circle cx="340" cy="120" r="7" fill="rgba(200,142,40,0.5)"/>
                <circle cx="310" cy="290" r="9" fill="rgba(10,58,173,0.5)"/>
                <circle cx="180" cy="220" r="6" fill="rgba(200,142,40,0.4)"/>
                <circle cx="255" cy="180" r="8" fill="rgba(10,58,173,0.6)"/>
              </g>

              {/* Data connections */}
              <g stroke="rgba(200,142,40,0.2)" strokeWidth="1.5" strokeLinecap="round">
                <path d="M265 215 Q240 235 225 250" strokeDasharray="4 4"/>
                <path d="M265 215 Q290 200 255 180" strokeDasharray="3 3"/>
                <path d="M340 120 Q310 170 265 215" strokeDasharray="5 5"/>
              </g>

              {/* Dashboard overlay */}
              <rect x="320" y="20" width="140" height="90" rx="12" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
              <circle cx="340" cy="40" r="8" fill="rgba(16,185,129,0.8)"/>
              <rect x="370" y="32" width="40" height="12" rx="4" fill="rgba(255,255,255,0.3)"/>
            </svg>
          </motion.div>
        </div>

        {/* STATS STRIP */}
        <motion.div 
          className={styles.statsStrip}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.statNum}>{stat.num}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* VISION MISSION PROMISE */}
        <div className={styles.promiseGrid}>
          <motion.div 
            className={`${styles.promiseCard} ${styles.promiseVision} fade-up`}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <div className={styles.quoteMark}>&ldquo;</div>
            <span className={styles.promiseBadge}>Vision</span>
            <p>An Africa where healthcare decisions are powered by trusted data, ethical AI, and local expertise.</p>
          </motion.div>

          <motion.div 
            className={`${styles.promiseCard} ${styles.promiseMission} fade-up`}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <div className={styles.quoteMark}>&ldquo;</div>
            <span className={styles.promiseBadge}>Mission</span>
            <p>To accelerate equitable, data-driven healthcare transformation across Africa.</p>
          </motion.div>

          <motion.div 
            className={`${styles.promiseCard} ${styles.promisePromise} fade-up`}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <span className={styles.promiseBadge}>Promise</span>
            <p>Every project delivers measurable health outcomes at population scale.</p>
          </motion.div>
        </div>

        {/* WHY AIVANTHA */}
        <div className={styles.whySection}>
          <motion.h3 
            className={`${styles.sectionHeading} fade-up`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Why AiVantha Health
          </motion.h3>

          <div className={styles.whyGrid}>
            {[
              { title: 'African-led, Globally Informed', desc: 'Built by Africa\'s talent for African realities', Icon: Globe },
              { title: 'Research-Driven', desc: 'Evidence before deployment', Icon: BookOpen },
              { title: 'Ethical AI', desc: 'Governance built-in from day one', Icon: Shield },
              { title: 'Integrated Platform', desc: 'End-to-end execution', Icon: Layers },
              { title: 'Impact-Focused', desc: 'Population-scale outcomes', Icon: Target },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className={styles.whyCard}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className={styles.whyIcon}>
                  <item.Icon size={22} strokeWidth={1.7} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* INTEGRATED PLATFORM DIAGRAM */}
        <div className={styles.platformSection}>
          <motion.h3 
            className={`${styles.sectionHeading} fade-up`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Our Integrated Platform
          </motion.h3>

          <div className={styles.platformFlow}>
            {platformSteps.map((step, i) => (
              <div key={step.label} className={styles.platformFlowItem}>
                <motion.div
                  className={`${styles.platformNode} ${styles[step.accent]}`}
                  onHoverStart={() => setHoveredStep(i)}
                  onHoverEnd={() => setHoveredStep(null)}
                  animate={hoveredStep === i ? { scale: 1.08, y: -8 } : { scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <step.Icon size={28} strokeWidth={1.8} className={styles.platformIcon} />
                  <h4>{step.label}</h4>
                  <p>{step.desc}</p>
                </motion.div>
                {i < platformSteps.length - 1 && (
                  <div className={styles.platformArrow}>
                    <ArrowRight size={20} strokeWidth={1.6} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
