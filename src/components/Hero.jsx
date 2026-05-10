import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

const INTERVAL = 8000

const slides = [
  {
    tag: 'Challenge · Africa Healthcare',
    headline: 'Fragmented healthcare systems across Africa',
    sub: 'Limited infrastructure, disconnected data, and unequal access continue to slow healthcare progress across the continent.',
    cta1: { label: 'See the Challenge', href: '#challenge' },
    cta2: { label: 'Our Approach', href: '#about' },
    bg: [
      'radial-gradient(ellipse 70% 75% at 68% 38%, rgba(100,45,8,.55) 0%, transparent 65%)',
      'radial-gradient(ellipse 40% 50% at 25% 75%, rgba(60,20,4,.35) 0%, transparent 55%)',
      'linear-gradient(162deg, #060301 0%, #120703 45%, #080504 100%)',
    ].join(','),
  },
  {
    tag: 'Solution · AI Health Intelligence',
    headline: 'AI-powered healthcare intelligence for Africa',
    sub: 'Ethical, data-driven, and locally grounded AI systems that connect and strengthen healthcare delivery across the continent.',
    cta1: { label: 'Explore Products', href: '#solutions' },
    cta2: { label: 'Our Services', href: '#services' },
    bg: [
      'radial-gradient(ellipse 70% 70% at 72% 34%, rgba(0,58,168,.52) 0%, transparent 65%)',
      'radial-gradient(ellipse 45% 55% at 20% 72%, rgba(0,30,90,.3) 0%, transparent 55%)',
      'linear-gradient(148deg, #01050f 0%, #020a1d 48%, #01060f 100%)',
    ].join(','),
  },
  {
    tag: 'Impact · Continental Transformation',
    headline: 'Transforming healthcare outcomes across Africa',
    sub: 'Smarter decisions, stronger systems, and improved access through AI-driven healthcare innovation at continental scale.',
    cta1: { label: 'Partner With Us', href: '#contact' },
    cta2: { label: 'View Solutions', href: '#solutions' },
    bg: [
      'radial-gradient(ellipse 68% 70% at 62% 32%, rgba(6,88,50,.5) 0%, transparent 65%)',
      'radial-gradient(ellipse 45% 50% at 22% 74%, rgba(3,50,28,.3) 0%, transparent 55%)',
      'linear-gradient(148deg, #020b05 0%, #031208 48%, #020b05 100%)',
    ].join(','),
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

      {/* Per-slide ambient background — cross-fades independently */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          className={styles.slideBg}
          style={{ background: slide.bg }}
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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="container">
            <div className={styles.slideContent}>

              <motion.span
                className={styles.tag}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.55, ease: [0.16,1,0.3,1] }}
              >
                {slide.tag}
              </motion.span>

              <motion.h1
                className={styles.headline}
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.7, ease: [0.16,1,0.3,1] }}
              >
                {slide.headline}
              </motion.h1>

              <motion.p
                className={styles.sub}
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.65, ease: [0.16,1,0.3,1] }}
              >
                {slide.sub}
              </motion.p>

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

      {/* Navigation controls */}
      <div className={styles.controls}>
        <motion.button className={styles.arrow} onClick={goPrev} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }} aria-label="Previous slide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </motion.button>

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

        <motion.button className={styles.arrow} onClick={goNext} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }} aria-label="Next slide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </motion.button>
      </div>

      {/* Slide counter */}
      <div className={styles.counter}>
        <span className={styles.counterCurrent}>{String(current + 1).padStart(2, '0')}</span>
        <span className={styles.counterSep}>/</span>
        <span className={styles.counterTotal}>{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* Progress bar */}
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
    </section>
  )
}
