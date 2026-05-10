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
          const translate = (visible - 0.5) * -20
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
  const rootRef  = useRef(null)
  useInView(rootRef, { margin: '-100px' })
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(Boolean(mq?.matches))
    update()
    if (!mq) return
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  useSectionParallax('#about .aboutParallax', !reduceMotion)

  const modules = useMemo(() => ({
    m1: {
      title: 'AiVantha Health is an AI-driven healthcare intelligence company',
      body: [
        'We translate fragmented health data into actionable intelligence to strengthen healthcare decisions across Africa.',
        'Built for enterprise realities, we connect research, consulting, and technology into one integrated ecosystem.',
        'Our teams work with institutions to turn evidence into measurable system performance.',
      ],
      img: 'https://images.unsplash.com/photo-1758691463203-cce9d415b2b5?auto=format&fit=crop&w=1920&h=1080&q=80',
    },
    m2: {
      headline: 'Africa does not lack health data—it lacks health intelligence.',
      sub: 'We close the gap between information and insight through AI, interoperability, and evidence-based system intelligence.',
      img: 'https://images.unsplash.com/photo-1758691463080-30a990ef61bb?auto=format&fit=crop&w=1920&h=1080&q=80',
    },
    m3: {
      vision:  'An Africa where healthcare systems are powered by trusted data, ethical AI, and local expertise for better outcomes.',
      mission: "To accelerate Africa's shift to intelligent, data-driven healthcare through AI, research, and scalable innovation.",
      img: 'https://images.unsplash.com/photo-1622674777904-386b3ef30c4a?auto=format&fit=crop&w=1920&h=1080&q=80',
    },
    m4: {
      title: 'A structured ecosystem for intelligent healthcare',
      cards: [
        { title: 'AI & Health Research',          desc: 'Evidence-led discovery and model-driven insights.',             variant: 'cobalt' },
        { title: 'Healthcare Consulting',          desc: 'Strategy, data architecture, and health system design.',        variant: 'gold'   },
        { title: 'Systems Advisory',               desc: 'Interoperability, governance, and evaluation frameworks.',     variant: 'cobalt' },
        { title: 'Governance & MEL',               desc: 'Measurement, learning, and responsible AI operations.',        variant: 'gold'   },
        { title: 'AI Health Solutions',            desc: 'Applied AI for real-world healthcare intelligence.',            variant: 'cobalt' },
        { title: 'Digital Health Platforms',       desc: 'Platforms that support analytics and interoperability.',       variant: 'gold'   },
        { title: 'Talent Marketplace',             desc: 'African AI & data specialists for mission-ready teams.',       variant: 'cobalt' },
        { title: 'Implementation Teams',           desc: 'Embedded delivery to operationalize intelligence.',            variant: 'gold'   },
      ],
      img: 'https://images.unsplash.com/photo-1707944746058-4da338d0f827?auto=format&fit=crop&w=1920&h=1080&q=80',
    },
    m5: {
      headline: 'Authority shaped by\nAfrican realities',
      statements: [
        'African-led design',
        'Research-first approach',
        'Ethical AI foundation',
        'Integrated ecosystem model',
        'Scalable architecture',
      ],
      img: 'https://images.unsplash.com/photo-1758873269276-9518d0cb4a0b?auto=format&fit=crop&w=1920&h=1080&q=80',
    },
    m6: {
      panels: [
        { kicker: 'Impact',       text: 'Transforming healthcare systems across Africa through AI and data intelligence.', img: 'https://images.unsplash.com/photo-1758873269317-51888e824b28?auto=format&fit=crop&w=1920&h=1080&q=80' },
        { kicker: 'Partnerships', text: 'Building healthcare ecosystems through collaboration.',                           img: 'https://images.unsplash.com/photo-1758691737543-09a1b2b715fa?auto=format&fit=crop&w=1920&h=1080&q=80' },
        { kicker: 'Careers',      text: 'Join us in shaping the future of intelligent healthcare.',                       img: 'https://images.unsplash.com/photo-1758691737045-3ece61135061?auto=format&fit=crop&w=1920&h=1080&q=80' },
      ],
    },
  }), [])

  const reveal = (delay = 0) => ({
    initial:     { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0  },
    viewport:    { once: true, margin: '-56px' },
    transition:  { duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section className={`section ${styles.aboutSection}`} id="about" ref={rootRef}>
      <div className="container">

        {/* ── M1  Identity & Purpose ── */}
        <div id="about-overview" className={styles.sectionAnchorPad}>
          <div className={styles.splitModule}>

            <motion.div className={styles.splitText} {...reveal(0.04)}>
              <p className={styles.eyebrow}>Healthcare Intelligence</p>
              <h2 className={styles.m1Headline}>{modules.m1.title}</h2>
              <div className={styles.m1Divider} />
              <div className={styles.progText}>
                {modules.m1.body.map((p, i) => (
                  <motion.p
                    key={i}
                    className={`${styles.modParagraph} ${i === 0 ? styles.modLead : ''}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-56px' }}
                    transition={{ duration: 0.62, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            <motion.div className={styles.splitVisual} {...reveal(0.08)}>
              <div className={styles.bgImageCard}>
                <img
                  className={`aboutParallax ${styles.bgImage}`}
                  src={modules.m1.img} alt=""
                  onError={e => (e.currentTarget.style.display = 'none')}
                />
                <div className={styles.bgOverlay} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── M2  The Problem ── */}
        <div id="about-vision" className={`${styles.sectionAnchorPad} ${styles.sectionBgBlue}`}>
          <section className={styles.cineModule} aria-label="Why we exist">
            <div className={styles.cineBg}>
              <img
                className={`aboutParallax ${styles.cineImg}`}
                src={modules.m2.img} alt=""
                onError={e => (e.currentTarget.style.display = 'none')}
              />
              <div className={styles.cineOverlay} />
            </div>
            <div className={styles.cineContent}>
              <motion.div className={styles.cineInner} {...reveal(0.03)}>
                <h3 className={styles.cineHeadline}>{modules.m2.headline}</h3>
                <div className={styles.cineDivider} />
                <p className={styles.cineSub}>{modules.m2.sub}</p>
              </motion.div>
            </div>
          </section>
        </div>

        {/* ── M3  Vision & Mission ── */}
        <div id="about-approach" className={styles.sectionAnchorPad}>
          <div className={styles.stackModuleBg}>
            <img
              className={`aboutParallax ${styles.stackBgImg}`}
              src={modules.m3.img} alt=""
              onError={e => (e.currentTarget.style.display = 'none')}
            />
            <div className={styles.stackBgOverlay} />
          </div>
          <div className={styles.stackModuleContent}>
            <div className={styles.cardStack}>
              <motion.div
                className={`${styles.promiseCard} ${styles.promiseVision}`}
                {...reveal(0.05)}
                whileHover={{ y: -5, transition: { duration: 0.24 } }}
              >
                <span className={`${styles.promiseBadge} ${styles.promiseVisionBadge}`}>Vision</span>
                <p>{modules.m3.vision}</p>
              </motion.div>
              <motion.div
                className={`${styles.promiseCard} ${styles.promiseMission}`}
                {...reveal(0.11)}
                whileHover={{ y: -5, transition: { duration: 0.24 } }}
              >
                <span className={`${styles.promiseBadge} ${styles.promiseMissionBadge}`}>Mission</span>
                <p>{modules.m3.mission}</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── M4  Capabilities ── */}
        <div id="about-why" className={`${styles.sectionAnchorPad} ${styles.sectionBgBlue}`}>
          <motion.div className={styles.capHeader} {...reveal(0.02)}>
            <h3>{modules.m4.title}</h3>
            <p className={styles.capIntro}>Eight integrated capabilities spanning research, technology, and implementation.</p>
          </motion.div>

          <div className={styles.capabilityWrap}>
            <div className={styles.capabilityBg}>
              <img
                className={`aboutParallax ${styles.capBgImg}`}
                src={modules.m4.img} alt=""
                onError={e => (e.currentTarget.style.display = 'none')}
              />
              <div className={styles.capBgOverlay} />
            </div>
            <div className={styles.capGrid}>
              {modules.m4.cards.map((c, i) => (
                <motion.div
                  key={c.title}
                  className={`${styles.capCard} ${c.variant === 'gold' ? styles.capGold : styles.capCobalt}`}
                  {...reveal(0.03 + i * 0.05)}
                  whileHover={{ y: -4, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
                >
                  <div className={styles.capCardMeta}>
                    <div className={styles.capIcon} aria-hidden>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className={styles.capNum}>0{i + 1}</span>
                  </div>
                  <div className={styles.capCardBody}>
                    <h4>{c.title}</h4>
                    <p>{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── M5  Differentiation ── */}
        <div id="about-partnerships" className={styles.sectionAnchorPad}>
          <div className={styles.fullBleedDiff}>
            <img
              className={`aboutParallax ${styles.diffImg}`}
              src={modules.m5.img} alt=""
              onError={e => (e.currentTarget.style.display = 'none')}
            />
            <div className={styles.diffOverlay} />
          </div>

          <div className={styles.diffContent}>
            <motion.div className={styles.diffText} {...reveal(0.02)}>
              <h3 className={styles.diffHeadline}>
                {modules.m5.headline.split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h3>
              <div className={styles.diffStatements}>
                {modules.m5.statements.map((s, i) => (
                  <motion.div
                    key={s}
                    className={styles.diffLine}
                    {...reveal(0.06 + i * 0.09)}
                  >
                    <span className={styles.diffNum}>0{i + 1}</span>
                    <span className={styles.diffStatement}>{s}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── M6  Impact Narrative ── */}
        <div className={`${styles.sectionAnchorPad} ${styles.sectionBgBlue}`}>
          <motion.div className={styles.capHeader} {...reveal(0.02)}>
            <h3>Impact, partnerships, and careers</h3>
          </motion.div>
          <div className={styles.panelStack}>
            {modules.m6.panels.map((p, i) => (
              <motion.div
                key={p.kicker}
                id={i === 0 ? 'about-impact' : i === 2 ? 'about-careers' : undefined}
                className={styles.panel}
                {...reveal(0.04 + i * 0.09)}
                whileHover={{ y: -5, transition: { duration: 0.28 } }}
              >
                <img
                  className={`aboutParallax ${styles.panelImg}`}
                  src={p.img} alt=""
                  onError={e => (e.currentTarget.style.display = 'none')}
                />
                <div className={styles.panelOverlay} />
                <div className={styles.panelContent}>
                  <span className={styles.panelKicker}>{p.kicker}</span>
                  <p className={styles.panelText}>{p.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={styles.bottomPad} />
      </div>
    </section>
  )
}
