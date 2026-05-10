import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

const INTERVAL = 8000

const slides = [
  {
    headline: 'AI-driven healthcare intelligence systems',
    sub: 'We design AI systems that transform raw health data into actionable clinical and operational insights.',
    micro: 'Built for governments, hospitals, and healthcare networks.',
    cta1: { label: 'Explore Solutions', href: '#solutions' },
    cta2: { label: 'Our Approach', href: '#about' },
    bgImage: 'https://images.unsplash.com/photo-1741707039536-113e200f9e0d?auto=format&fit=crop&w=1920&h=1080&q=85',
    bgPos: 'center center',
  },
  {
    headline: 'Digital transformation for healthcare systems',
    sub: 'We enable institutions to modernize workflows, improve interoperability, and build scalable digital health infrastructure.',
    micro: 'From fragmented systems to connected healthcare ecosystems.',
    cta1: { label: 'Explore Services', href: '#services' },
    cta2: { label: 'Our Approach', href: '#about' },
    bgImage: 'https://images.unsplash.com/photo-1666886573212-2de95596d509?auto=format&fit=crop&w=1920&h=1080&q=85',
    bgPos: 'center center',
  },
  {
    headline: 'AI innovation and healthcare capacity building',
    sub: 'We support healthcare institutions with AI research, advisory services, and training to scale sustainable innovation.',
    micro: "Empowering Africa's healthcare ecosystem with AI talent and research-driven solutions.",
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
  const goNext = () => goTo((current + 1) % slides.length)
  const goPrev = () => goTo((current - 1 + slides.length) % slides.length)

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
      {/* Static deep-dark base */}
      <div className={styles.heroBase} />

      {/* Subtle grid texture */}
      <div className={styles.bgGrid} />

      {/* Per-slide background photo — cross-fades independently */}
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
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Cinematic readability gradient — darkens bottom for text */}
      <div className={styles.overlay} />

      {/* Slide content — text only, bottom-anchored */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          className={styles.slide}
          custom={direction}
          initial={{ opacity: 0, x: direction * 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -24 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="container">
            <div className={styles.slideContent}>

              <motion.h1
                className={styles.headline}
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.7, ease: [0.16,1,0.3,1] }}
              >
                {slide.headline}
              </motion.h1>

              <motion.p
                className={styles.sub}
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.65, ease: [0.16,1,0.3,1] }}
              >
                {slide.sub}
              </motion.p>

              {slide.micro && (
                <motion.p
                  className={styles.micro}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.55, ease: [0.16,1,0.3,1] }}
                >
                  {slide.micro}
                </motion.p>
              )}

              <motion.div
                className={styles.actions}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.55, ease: [0.16,1,0.3,1] }}
              >
                <button className={`btn ${styles.ctaPrimary} ${styles.btnPrimary}`} onClick={() => scrollTo(slide.cta1.href)}>
                  {slide.cta1.label}
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd"/>
                  </svg>
                </button>
                <button className="btn btn-outline-white" onClick={() => scrollTo(slide.cta2.href)}>
                  {slide.cta2.label}
                </button>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <motion.button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            animate={i === current ? { width: 28 } : { width: 10 }}
            transition={{ type: 'tween', duration: 0.3 }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
    </section>
  )
}
