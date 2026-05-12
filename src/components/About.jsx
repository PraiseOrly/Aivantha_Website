import { AnimatePresence, motion, useInView } from 'framer-motion'
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
  const [m3Slide, setM3Slide] = useState(0)
  const [capSlide, setCapSlide] = useState(0)
  const [capDir,   setCapDir]   = useState(1)

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(Boolean(mq?.matches))
    update()
    if (!mq) return
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  useSectionParallax('#about .aboutParallax', !reduceMotion)

  useEffect(() => {
    const total = 2
    // Match Hero slideshow pacing for consistent transition speed
    const id = setInterval(() => setM3Slide(s => (s + 1) % total), 8000)
    return () => clearInterval(id)
  }, [])


  const modules = useMemo(() => ({
    m1: {
      eyebrow: 'At a Glance',
      headlinePart1: 'Africa does not lack health data',
      headlinePart2: '— it lacks health intelligence.',
      body: [
        'AiVantha Health is an African AI and data-driven healthcare company transforming fragmented health data into actionable intelligence through research, consulting, technology, and a continent-wide talent ecosystem.',
      ],
      stat: {
        title: 'Continental Reach',
        text: 'Serving 1.4 billion people across Africa, AiVantha integrates research, AI, and consulting into one unified health-intelligence ecosystem.',
      },
      img: 'https://images.unsplash.com/photo-1758691463203-cce9d415b2b5?auto=format&fit=crop&w=1920&h=1080&q=80',
    },
    m2: {
      headline: 'Built at the intersection of African healthcare and global AI innovation.',
      body: [
        'AiVantha was founded on a simple but urgent observation: African healthcare systems generate enormous volumes of data, yet most of it never becomes actionable insight. The infrastructure needed to turn raw data into clinical and operational decisions that are trusted, timely, and locally relevant does not exist at scale.',
        'We set out to build it. Starting with research and consulting, AiVantha has grown into an integrated ecosystem spanning AI solution development, digital health platforms, and a continent-wide network of health data professionals and implementation teams.',
        'Today, we work with governments, hospital networks, and international health organisations across Africa, delivering intelligence that drives real outcomes designed for the complexity of African health systems and built to scale.',
      ],
      img: 'https://images.unsplash.com/photo-1758691463080-30a990ef61bb?auto=format&fit=crop&w=900&h=1100&q=80',
    },
    m3: {
      slides: [
        {
          label: 'Vision',
          headline: 'An Africa where healthcare is powered by trusted data, ethical AI, and local expertise.',
          body: 'We envision a continent where every healthcare decision, from clinics to ministries, is guided by intelligent, ethical, local data systems.',
          img: 'https://images.unsplash.com/photo-1666214280250-41f16ba24a26?auto=format&fit=crop&w=1920&h=1080&q=80',
        },
        {
          label: 'Mission',
          headline: "Accelerating Africa's shift to intelligent, data-driven healthcare.",
          body: 'Through AI research, scalable innovation, and a continent-wide talent network, we build the intelligence infrastructure that African health systems need to thrive.',
          img: 'https://images.unsplash.com/photo-1666214280577-5f90bc36be92?auto=format&fit=crop&w=1920&h=1080&q=80',
        },
      ],
    },
    m4: {
      title: 'A structured ecosystem for intelligent healthcare',
      cards: [
        { title: 'AI & Data Strategy',                 desc: 'Tailored AI and data strategies that align with organisational goals and health system priorities.',      variant: 'cobalt' },
        { title: 'Digital Health Transformation',      desc: 'End-to-end support for digitising health operations, from infrastructure to change management.',         variant: 'gold'   },
        { title: 'AI Governance & Ethics',             desc: 'Frameworks for responsible AI deployment, accountability structures, and ethical compliance.',           variant: 'cobalt' },
        { title: 'Technology & Research',              desc: 'Advisory on emerging health technologies, landscape analysis, and research-driven innovation.',          variant: 'gold'   },
        { title: 'Clinical Decision Support',          desc: 'AI-powered tools that surface actionable insights at the point of care for better clinical outcomes.',   variant: 'cobalt' },
        { title: 'Predictive Analytics & Intelligence',desc: 'Population health modelling, risk stratification, and predictive systems for proactive interventions.',  variant: 'gold'   },
        { title: 'Data Systems & Interoperability',    desc: 'Architecture and integration solutions that unify fragmented health data across platforms and systems.',  variant: 'cobalt' },
        { title: 'Applied Research & Evaluation',      desc: 'Rigorous evaluation frameworks that measure real-world impact and translate evidence into practice.',     variant: 'gold'   },
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

  const CAP_TOTAL = Math.ceil(modules.m4.cards.length / 4)
  const goCapTo   = (i) => { if (i === capSlide) return; setCapDir(i > capSlide ? 1 : -1); setCapSlide(i) }
  const goCapNext = () => { setCapDir(1);  setCapSlide(s => (s + 1) % CAP_TOTAL) }
  const goCapPrev = () => { setCapDir(-1); setCapSlide(s => (s - 1 + CAP_TOTAL) % CAP_TOTAL) }


  const reveal = (delay = 0) => ({
    initial:     { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0  },
    viewport:    { once: true, margin: '-56px' },
    transition:  { duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section className={`section ${styles.aboutSection} ${styles.sectionBgBlue}`} id="about" ref={rootRef}>
      <div className="container">

        {/* ── M1  Overview ── */}
        <div id="about-overview" className={styles.sectionAnchorPad}>
          <div className={styles.overviewGrid}>

            {/* Left — staggered reveal: headline → body → CTAs */}
            <motion.div
              className={styles.overviewLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-56px' }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } } }}
            >
              <motion.h2
                className={styles.overviewHeadline}
                variants={{ hidden: { opacity: 0, y: 36, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}
              >
                {modules.m1.headlinePart1}
                <em>{modules.m1.headlinePart2}</em>
              </motion.h2>
              <div className={styles.overviewBody}>
                {modules.m1.body.map((p, i) => (
                  <motion.p
                    key={i}
                    className={styles.overviewPara}
                    variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } } }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
              <motion.div
                className={styles.aboutCtas}
                variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } } }}
              >
                <a className={[styles.ctaBtn, styles.ctaPrimary].join(' ')} href={'#contact'}>
                  Partner With Us
                </a>
                <a className={[styles.ctaBtn, styles.ctaSecondary].join(' ')} href={'#services'}>
                  See Our Services
                </a>
              </motion.div>
            </motion.div>

          </div>
        </div>


        {/* ── M2  Our Story ── */}
        <div id="about-story" className={styles.sectionAnchorPad}>
          <div className={styles.storyCard}>
            <div className={styles.storyGrid}>

              {/* 2×2 photo frame — slides in from left with subtle zoom */}
              <motion.div
                className={styles.storyImageWrap}
                initial={{ opacity: 0, x: -40, scale: 0.97 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.storyPhotoGrid}>
                  <img className={styles.storyPhoto} src="/Cumi.jfif"    alt="Cumi"    />
                  <img className={styles.storyPhoto} src="/Gilbert.jfif" alt="Gilbert" />
                  <img className={styles.storyPhoto} src="/lincoln.jpeg" alt="Lincoln" />
                  <img className={styles.storyPhoto} src="/Praise.jpeg"  alt="Praise"  />
                </div>
              </motion.div>

              {/* Text column — slides in from right, paragraphs stagger */}
              <motion.div
                className={styles.storyText}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.0, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className={styles.overviewEyebrow}>Our Story</p>
                <h2 className={styles.storyHeadline}>{modules.m2.headline}</h2>
                {modules.m2.body.map((p, i) => (
                  <motion.p
                    key={i}
                    className={styles.storyPara}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-56px' }}
                    transition={{ duration: 0.65, delay: 0.28 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {p}
                  </motion.p>
                ))}
              </motion.div>

            </div>
          </div>
        </div>

        {/* ── M3 Vision & Mission ── */}
        <div id="about-mission" className={styles.sectionAnchorPad}>
          <div className={styles.missionRow}>

            {/* Left column — cobalt text card, same transitions as before */}
            <div className={styles.missionText}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={m3Slide}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.38 }}
                >
                  <span className={styles.slideLabel}>{modules.m3.slides[m3Slide].label}</span>
                  <h3 className={styles.slideHeadline}>{modules.m3.slides[m3Slide].headline}</h3>
                  <p className={styles.slideBody}>{modules.m3.slides[m3Slide].body}</p>
                </motion.div>
              </AnimatePresence>
              <div className={styles.slideDots}>
                {modules.m3.slides.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.slideDot} ${m3Slide === i ? styles.slideDotActive : ''}`}
                    onClick={() => setM3Slide(i)}
                  />
                ))}
              </div>
            </div>

            {/* Right column — crossfading image, contained at half the previous size */}
            <div className={styles.missionImageWrap}>
              {modules.m3.slides.map((slide, i) => (
                <div
                  key={i}
                  className={`${styles.slideBg} ${m3Slide === i ? styles.slideBgActive : ''}`}
                  style={{ backgroundImage: `url(${slide.img})` }}
                  aria-hidden
                />
              ))}
            </div>

          </div>
        </div>

        {/* ── M4  What We Do ── */}
        <div id="about-why" className={`${styles.sectionAnchorPad}`}>
          <motion.div className={styles.capHeader} {...reveal(0.02)}>
            <p className={styles.eyebrow}>What We Do</p>
            <h3 className={styles.capHeaderTitle}>{modules.m4.title}</h3>
            <p className={styles.capIntro}>Eight integrated capabilities spanning research, technology, and implementation.</p>
          </motion.div>

          <div className={styles.capabilityWrap}>

            {/* ── Carousel ── */}
            <motion.div className={styles.capCarousel} {...reveal(0.06)}>
              <div className={styles.capSlideRow}>

                {/* Prev arrow */}
                <button className={styles.capArrow} onClick={goCapPrev} aria-label="Previous service">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>

                {/* Slide area — 4 services per slide */}
                <div className={styles.capSlideWrap}>
                  <AnimatePresence mode="wait" custom={capDir}>
                    <motion.div
                      key={capSlide}
                      className={styles.capSlide}
                      custom={capDir}
                      initial={d => ({ opacity: 0, x: d * 52 })}
                      animate={{ opacity: 1, x: 0 }}
                      exit={d => ({ opacity: 0, x: d * -52 })}
                      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {modules.m4.cards.slice(capSlide * 4, capSlide * 4 + 4).map(card => (
                        <div key={card.title} className={styles.capServiceItem}>
                          <h4 className={styles.capSlideTitle}>{card.title}</h4>
                          <p className={styles.capSlideDesc}>{card.desc}</p>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Next arrow */}
                <button className={styles.capArrow} onClick={goCapNext} aria-label="Next service">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>

              {/* 2 dot indicators */}
              <div className={styles.capDots}>
                {Array.from({ length: CAP_TOTAL }, (_, i) => (
                  <button
                    key={i}
                    className={`${styles.capDot} ${capSlide === i ? styles.capDotActive : ''}`}
                    onClick={() => goCapTo(i)}
                    aria-label={`Go to services ${i * 4 + 1}–${i * 4 + 4}`}
                  />
                ))}
              </div>
            </motion.div>


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
              <p className={styles.overviewEyebrow}>Why AiVantha</p>
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

        {/* ── M6  Impact & Partnerships ── */}
        <div id="about-impact" className={`${styles.sectionAnchorPad}`}>
          <motion.div className={styles.capHeader} {...reveal(0.02)}>
            <p className={styles.eyebrow}>Impact &amp; Partnerships</p>
            <h3>Where we create lasting value</h3>
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
