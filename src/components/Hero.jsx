import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

const INTERVAL = 8000

const slides = [
  {
    headlineParts: ['AI-driven ', 'healthcare', ' intelligence systems'],
    sub: 'We design AI systems that transform raw health data into actionable clinical and operational insights for governments, hospitals, and healthcare networks.',
    cta1: { label: 'Explore Solutions', href: '#solutions' },
    cta2: { label: 'Our Approach', href: '#about' },
    bgImage: 'https://images.unsplash.com/photo-1741707039536-113e200f9e0d?auto=format&fit=crop&w=1920&h=1080&q=85',
    bgPos: 'center center',
  },
  {
    headlineParts: ['Transforming ', 'healthcare', ' through digital systems'],
    sub: 'We enable institutions to modernize workflows, improve interoperability, and build scalable digital health infrastructure.',
    cta1: { label: 'Explore Services', href: '#services' },
    cta2: { label: 'Our Approach', href: '#about' },
    bgImage: 'https://images.unsplash.com/photo-1666886573212-2de95596d509?auto=format&fit=crop&w=1920&h=1080&q=85',
    bgPos: 'center center',
  },
  {
    headlineParts: ['Building ', 'healthcare', ' capacity with AI innovation'],
    sub: "We support institutions with AI research, advisory services, and training to scale sustainable innovation across Africa's healthcare ecosystem.",
    cta1: { label: 'AI Innovation', href: '#solutions' },
    cta2: { label: 'Partner With Us', href: '#contact' },
    bgImage: 'https://images.unsplash.com/photo-1536064479547-7ee40b74b807?auto=format&fit=crop&w=1920&h=1080&q=85',
    bgPos: 'center 30%',
  },
]

export default function Hero() {
  const [current,   setCurrent]   = useState(0)
  const [direction, setDirection] = useState(0)
  const [paused,    setPaused]    = useState(false)
  const [progress,  setProgress]  = useState(0)
  const intervalRef  = useRef(null)
  const rafRef       = useRef(null)
  const startTimeRef = useRef(Date.now())

  const goTo = (index) => {
    if (index === current) return
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
    setProgress(0)
    startTimeRef.current = Date.now()
  }

  useEffect(() => {
    if (paused) { clearInterval(intervalRef.current); return }
    intervalRef.current = setInterval(() => {
      setDirection(1)
      setCurrent(p => (p + 1) % slides.length)
      setProgress(0)
      startTimeRef.current = Date.now()
    }, INTERVAL)
    return () => clearInterval(intervalRef.current)
  }, [current, paused])

  useEffect(() => {
    if (paused) { cancelAnimationFrame(rafRef.current); return }
    const tick = () => {
      const p = Math.min(((Date.now() - startTimeRef.current) / INTERVAL) * 100, 100)
      setProgress(p)
      if (p < 100) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [current, paused])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }

  const slide = slides[current]

  return (
    <section
      className={styles.hero}
      id="home"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Inset image card — blue frame visible on all 4 sides */}
      <div className={styles.imageCard}>

        {/* Crossfading background photo */}
        <AnimatePresence mode="sync">
          <motion.div
            key={`bg-${current}`}
            className={styles.slideBg}
            style={{
              backgroundImage: `url(${slide.bgImage})`,
              backgroundPosition: slide.bgPos,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </AnimatePresence>

        {/* Gradient — darkens left zone for text readability */}
        <div className={styles.imageOverlay} />

        {/* Slide text — transitions on each slide change */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            className={styles.textOverlay}
            custom={direction}
            initial={{ opacity: 0, x: direction * 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -22 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.slideContent}>

              <motion.h1
                className={styles.headline}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.65, ease: [0.16,1,0.3,1] }}
              >
                {slide.headlineParts[0]}
                <em className={styles.headlineEmphasis}>{slide.headlineParts[1]}</em>
                {slide.headlineParts[2]}
              </motion.h1>

              <motion.p
                className={styles.sub}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.6, ease: [0.16,1,0.3,1] }}
              >
                {slide.sub}
              </motion.p>

              <motion.div
                className={styles.actions}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.5, ease: [0.16,1,0.3,1] }}
              >
                <button className={styles.ctaPrimary} onClick={() => scrollTo(slide.cta1.href)}>
                  {slide.cta1.label}
                  <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd"/>
                  </svg>
                </button>
                <button className={styles.ctaSecondary} onClick={() => scrollTo(slide.cta2.href)}>
                  {slide.cta2.label}
                </button>
              </motion.div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar — sits on the bottom edge of the card */}
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

      </div>
    </section>
  )
}
