import { motion, useInView } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './About.module.css'

function useSectionParallax(selector, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const els = Array.from(document.querySelectorAll(selector))
    if (!els.length) return

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        els.forEach(el => {
          const rect = el.getBoundingClientRect()
          const vh = window.innerHeight || 800
          const visible = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1)
          const translate = (visible - 0.5) * -18 // subtle
          el.style.transform = `translateY(${translate}px)`
        })
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [selector, enabled])
}

export default function About() {
  const rootRef = useRef(null)
  const inView = useInView(rootRef, { margin: '-100px' })
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(Boolean(mq?.matches))
    update()
    if (!mq) return
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible')
        }),
      { threshold: 0.08 }
    )

    document.querySelectorAll('#about .fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // subtle parallax on background image layers only
  useSectionParallax('#about .aboutParallax', !reduceMotion)

  const modules = useMemo(
    () => ({
      m1: {
        tag: 'Overview — Who We Are',
        title: 'AiVantha Health is an AI-driven healthcare intelligence company',
        body: [
          'We translate fragmented health data into actionable intelligence to strengthen healthcare decisions across Africa.',
          'Built for enterprise realities, we connect research, consulting, and technology into one integrated ecosystem.',
          'Our teams work with institutions to turn evidence into measurable system performance.'
        ],
        img: 'https://images.unsplash.com/photo-1758691463203-cce9d415b2b5?auto=format&fit=crop&w=1920&h=1080&q=80'
      },
      m2: {
        tag: 'Why We Exist',
        headline: 'Africa does not lack health data — it lacks health intelligence.',
        sub: 'We close the gap between information and insight through AI, interoperability, and evidence-based system intelligence.',
        img: 'https://images.unsplash.com/photo-1758691463080-30a990ef61bb?auto=format&fit=crop&w=1920&h=1080&q=80'
      },
      m3: {
        tag: 'Mission & Vision',
        vision: 'An Africa where healthcare systems are powered by trusted data, ethical AI, and local expertise for better outcomes.',
        mission: "To accelerate Africa's shift to intelligent, data-driven healthcare through AI, research, and scalable innovation.",
        img: 'https://images.unsplash.com/photo-1622674777904-386b3ef30c4a?auto=format&fit=crop&w=1920&h=1080&q=80'
      },
      m4: {
        tag: 'What We Do',
        title: 'A structured ecosystem for intelligent healthcare',
        left: [
          { title: 'AI & Health Research', desc: 'Evidence-led discovery and model-driven insights.', variant: 'cobalt' },
          { title: 'Healthcare Consulting', desc: 'Strategy, data architecture, and health system design.', variant: 'gold' },
          { title: 'Systems Advisory', desc: 'Interoperability, governance, and evaluation frameworks.', variant: 'cobalt' },
          { title: 'Governance & MEL', desc: 'Measurement, learning, and responsible AI operations.', variant: 'gold' }
        ],
        right: [
          { title: 'AI Health Solutions', desc: 'Applied AI for real-world healthcare intelligence.', variant: 'cobalt' },
          { title: 'Digital Health Platforms', desc: 'Platforms that support analytics and interoperability.', variant: 'gold' },
          { title: 'Talent Marketplace', desc: 'African AI & data specialists for mission-ready teams.', variant: 'cobalt' },
          { title: 'Implementation Teams', desc: 'Embedded delivery to operationalize intelligence.', variant: 'gold' }
        ],
        img: 'https://images.unsplash.com/photo-1707944746058-4da338d0f827?auto=format&fit=crop&w=1920&h=1080&q=80'
      },
      m5: {
        tag: 'Why AiVantha',
        bullets: [
          'African-led design',
          'Research-first approach',
          'Ethical AI foundation',
          'Integrated ecosystem model',
          'Scalable architecture'
        ],
        img: 'https://images.unsplash.com/photo-1758873269276-9518d0cb4a0b?auto=format&fit=crop&w=1920&h=1080&q=80'
      },
      m6: {
        impact: 'Transforming healthcare systems across Africa through AI and data intelligence.',
        partners: 'Building healthcare ecosystems through collaboration.',
        careers: 'Join us in shaping the future of intelligent healthcare.',
        img1: 'https://images.unsplash.com/photo-1758873269317-51888e824b28?auto=format&fit=crop&w=1920&h=1080&q=80',
        img2: 'https://images.unsplash.com/photo-1758691737543-09a1b2b715fa?auto=format&fit=crop&w=1920&h=1080&q=80',
        img3: 'https://images.unsplash.com/photo-1758691737045-3ece61135061?auto=format&fit=crop&w=1920&h=1080&q=80'
      }
    }),
    []
  )

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
  })

  return (
    <section className="section" id="about" ref={rootRef}>
      <div className="container">
        {/* MODULE 1 — OVERVIEW */}
        <div id="about-overview" className={styles.sectionAnchorPad}>
          <motion.div className="section-header fade-up" {...reveal(0.02)}>
            <span className="section-tag">{modules.m1.tag}</span>
            <h2>{modules.m1.title}</h2>
            <div className="divider" />
          </motion.div>

          <div className={styles.splitModule}>
            <motion.div className={styles.splitText} {...reveal(0.07)}>
              <div className={styles.progText}>
                {modules.m1.body.map((p, idx) => (
                  <motion.p
                    key={idx}
                    className={styles.modParagraph}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: 0.06 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            <div className={styles.splitVisual}>
              <div className={styles.bgImageCard}>
                <img className={`aboutParallax ${styles.bgImage}`} src={modules.m1.img} alt="" onError={e => (e.currentTarget.style.display = 'none')} />
                <div className={styles.bgOverlay} />
              </div>
            </div>
          </div>
        </div>

        {/* MODULE 2 — OUR STORY */}
        <div id="about-vision" className={styles.sectionAnchorPad}>
          <section className={styles.cineModule} aria-label="Our story">
            <div className={styles.cineBg}>
              <img className={`aboutParallax ${styles.cineImg}`} src={modules.m2.img} alt="" onError={e => (e.currentTarget.style.display = 'none')} />
              <div className={styles.cineOverlay} />
            </div>
            <div className={styles.cineContent}>
              <motion.div className={styles.cineInner} {...reveal(0.03)}>
                <span className={`${styles.cineTag} section-tag`}>{modules.m2.tag}</span>
                <h3 className={styles.cineHeadline}>{modules.m2.headline}</h3>
                <div className={styles.cineDivider} />
                <p className={styles.cineSub}>{modules.m2.sub}</p>
              </motion.div>
            </div>
          </section>
        </div>

        {/* MODULE 3 — MISSION & VISION */}
        <div id="about-approach" className={styles.sectionAnchorPad}>
          <div className={styles.stackModuleBg}>
            <img className={`aboutParallax ${styles.stackBgImg}`} src={modules.m3.img} alt="" onError={e => (e.currentTarget.style.display = 'none')} />
            <div className={styles.stackBgOverlay} />
          </div>

          <div className={styles.stackModuleContent}>
            <motion.div className="section-header" {...reveal(0.02)}>
              <span className="section-tag">{modules.m3.tag}</span>
              <div className="divider" />
            </motion.div>

            <div className={styles.cardStack}>
              <motion.div
                className={`${styles.promiseCard} ${styles.promiseVision}`}
                {...reveal(0.06)}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
              >
                <span className={`${styles.promiseBadge} ${styles.promiseVisionBadge}`}>Vision</span>
                <p>{modules.m3.vision}</p>
              </motion.div>
              <motion.div
                className={`${styles.promiseCard} ${styles.promiseMission}`}
                {...reveal(0.12)}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
              >
                <span className={`${styles.promiseBadge} ${styles.promiseMissionBadge}`}>Mission</span>
                <p>{modules.m3.mission}</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* MODULE 4 — WHAT WE DO */}
        <div id="about-why" className={styles.sectionAnchorPad}>
          <motion.div className={styles.sectionHeaderLeft} {...reveal(0.02)}>
            <span className="section-tag">{modules.m4.tag}</span>
            <h3>{modules.m4.title}</h3>
          </motion.div>

          <div className={styles.capabilityWrap}>
            <div className={styles.capabilityBg}>
              <img className={`aboutParallax ${styles.capBgImg}`} src={modules.m4.img} alt="" onError={e => (e.currentTarget.style.display = 'none')} />
              <div className={styles.capBgOverlay} />
            </div>

            <div className={styles.capGrid}>
              {[...modules.m4.left, ...modules.m4.right].map((c, idx) => (
                <motion.div
                  key={c.title}
                  className={`${styles.capCard} ${c.variant === 'gold' ? styles.capGold : styles.capCobalt}`}
                  {...reveal(0.03 + idx * 0.06)}
                  whileHover={{ y: -6, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
                >
                  <div className={styles.capIcon} aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* MODULE 5 — WHY AIVANTHA (shared anchor for Why AiVantha + Partnerships) */}
        <div id="about-partnerships" className={styles.sectionAnchorPad}>
          <div className={styles.fullBleedDiff}>
            <img className={`aboutParallax ${styles.diffImg}`} src={modules.m5.img} alt="" onError={e => (e.currentTarget.style.display = 'none')} />
            <div className={styles.diffOverlay} />
          </div>

          <div className={styles.diffContent}>
            <motion.div className={styles.diffText} {...reveal(0.02)}>
              <span className="section-tag">{modules.m5.tag}</span>
              <h3 className={styles.diffHeadline}>Authority shaped by African realities</h3>
              <ul className={styles.diffBullets}>
                {modules.m5.bullets.map((b, idx) => (
                  <motion.li key={b} {...reveal(0.06 + idx * 0.05)}>
                    <span className={styles.bulletDot} aria-hidden />
                    {b}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* MODULE 6 — IMPACT, PARTNERSHIPS, CAREERS */}
        <div className={styles.sectionAnchorPad}>
          <motion.div className={styles.sectionHeaderLeft} {...reveal(0.02)}>
            <span className="section-tag">Our Impact</span>
            <h3>Impact, partnerships, and careers</h3>
          </motion.div>

          <div className={styles.panelStack}>
            <motion.div id="about-impact" key="Impact" className={styles.panel} {...reveal(0.04)} whileHover={{ y: -5, transition: { duration: 0.28 } }}>
              <img className={`aboutParallax ${styles.panelImg}`} src={modules.m6.img1} alt="" onError={e => (e.currentTarget.style.display = 'none')} />
              <div className={styles.panelOverlay} />
              <div className={styles.panelContent}>
                <span className={styles.panelKicker}>Impact</span>
                <p className={styles.panelText}>{modules.m6.impact}</p>
              </div>
            </motion.div>

            <motion.div key="Partnerships" className={styles.panel} {...reveal(0.10)} whileHover={{ y: -5, transition: { duration: 0.28 } }}>
              <img className={`aboutParallax ${styles.panelImg}`} src={modules.m6.img2} alt="" onError={e => (e.currentTarget.style.display = 'none')} />
              <div className={styles.panelOverlay} />
              <div className={styles.panelContent}>
                <span className={styles.panelKicker}>Partnerships</span>
                <p className={styles.panelText}>{modules.m6.partners}</p>
              </div>
            </motion.div>

            <motion.div id="about-careers" key="Careers" className={styles.panel} {...reveal(0.17)} whileHover={{ y: -5, transition: { duration: 0.28 } }}>
              <img className={`aboutParallax ${styles.panelImg}`} src={modules.m6.img3} alt="" onError={e => (e.currentTarget.style.display = 'none')} />
              <div className={styles.panelOverlay} />
              <div className={styles.panelContent}>
                <span className={styles.panelKicker}>Careers</span>
                <p className={styles.panelText}>{modules.m6.careers}</p>
              </div>
            </motion.div>
          </div>
        </div>


        {/* Keep a11y anchor spacing end */}
        <div className={styles.bottomPad} />
      </div>
    </section>
  )
}


