import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

const INTERVAL = 5000 // 5 seconds auto-slide
const SLIDE_OFFSET = 300 // pixels for sideways animation

// Slide variants for enter, center, exit states with direction-aware animation
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? SLIDE_OFFSET : -SLIDE_OFFSET,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? SLIDE_OFFSET : -SLIDE_OFFSET,
    opacity: 0,
  }),
}

// Content fade-in animation variants
const contentVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.1,
      ease: [0.4, 0, 0.2, 1],
    }
  },
}

function parseHeadline(text) {
  return text.split('||').map((part, i) =>
    i % 2 === 1
      ? <em key={i} className={styles.accent}>{part}</em>
      : part
  )
}

const slides = [
  {
    tag: 'Healthcare AI · Africa-First',
    headline: "Building Africa's ||Intelligent Health|| Future",
    sub: "One platform combining research, consulting, innovation, and talent — transforming health systems across the continent.",
    cta1: { label: 'Explore Our Work', href: '#pillars' },
    cta2: { label: 'Partner With Us', href: '#contact' },
    metric: { num: '4', label: 'Integrated Pillars' },
    wm: 'health',
    accentColor: '#c8960c',
  },
  {
    tag: '$16.6B Market Opportunity',
    headline: "Africa's Health Crisis Is a ||Data Intelligence|| Problem",
    sub: "Africa bears 25% of global disease burden but receives <1% of health AI investment. The data exists — the intelligence to act on it does not.",
    cta1: { label: 'See the Challenge', href: '#challenge' },
    cta2: { label: 'Our Approach', href: '#pillars' },
    metric: { num: '25%', label: 'global disease burden' },
    wm: 'globe',
    accentColor: '#e11d48',
  },
  {
    tag: 'Invest · Partner · Transform',
    headline: "The Time to Build ||Africa's Health AI Future|| Is Now",
    sub: "41 of 54 African countries have digital health strategies. $16.6B addressable market. Be part of the transformation.",
    cta1: { label: 'Investment Enquiries', href: '#contact' },
    cta2: { label: 'Partnership Opportunities', href: '#contact' },
    metric: { num: '41/54', label: 'countries ready' },
    wm: 'chart',
    accentColor: '#059669',
  },
  {
    tag: 'Solutions',
    headline: "||AI Solutions|| Built for African Clinical Reality",
    sub: "Clinical decision support, predictive surveillance, health intelligence platforms — validated in real African healthcare settings.",
    cta1: { label: 'View Solutions', href: '#solutions' },
    cta2: { label: 'Talent Hub', href: '#contact' },
    metric: { num: '408M+', label: 'people served' },
    wm: 'circuit',
    accentColor: '#2563eb',
  },
  {
    tag: 'Impact',
    headline: "||Built for Africa||. Scaled for the World.",
    sub: "Improving clinical decisions, strengthening health planning, reducing fragmentation, expanding access, building local capacity.",
    cta1: { label: 'See Our Impact', href: '#why' },
    cta2: { label: 'Partner With Us', href: '#contact' },
    metric: { num: 'Pan-African', label: 'Operations' },
    wm: 'chart',
    accentColor: '#c8960c',
  },
]

const watermarks = {
  health: (
    <svg className={styles.wm} viewBox="0 0 200 200" fill="none" stroke="currentColor">
      <path d="M20 100 L50 100 L65 40 L85 160 L100 80 L115 120 L130 100 L180 100" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="100" cy="100" r="90" strokeWidth="3" opacity=".3"/>
    </svg>
  ),
  globe: (
    <svg className={styles.wm} viewBox="0 0 200 200" fill="none" stroke="currentColor">
      <circle cx="100" cy="100" r="90" strokeWidth="4"/>
      <ellipse cx="100" cy="100" rx="40" ry="90" strokeWidth="3"/>
      <line x1="10" y1="100" x2="190" y2="100" strokeWidth="3"/>
      <line x1="10" y1="65" x2="190" y2="65" strokeWidth="2" opacity=".5"/>
      <line x1="10" y1="135" x2="190" y2="135" strokeWidth="2" opacity=".5"/>
    </svg>
  ),
  research: (
    <svg className={styles.wm} viewBox="0 0 200 200" fill="none" stroke="currentColor">
      <rect x="30" y="20" width="140" height="160" rx="8" strokeWidth="4"/>
      <line x1="60" y1="70" x2="140" y2="70" strokeWidth="4" strokeLinecap="round"/>
      <line x1="60" y1="100" x2="140" y2="100" strokeWidth="4" strokeLinecap="round"/>
      <line x1="60" y1="130" x2="110" y2="130" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  ),
  circuit: (
    <svg className={styles.wm} viewBox="0 0 200 200" fill="none" stroke="currentColor">
      <circle cx="100" cy="100" r="20" strokeWidth="4"/>
      <circle cx="40"  cy="40"  r="12" strokeWidth="3"/>
      <circle cx="160" cy="40"  r="12" strokeWidth="3"/>
      <circle cx="40"  cy="160" r="12" strokeWidth="3"/>
      <circle cx="160" cy="160" r="12" strokeWidth="3"/>
      <line x1="52" y1="52" x2="85" y2="85" strokeWidth="3"/>
      <line x1="148" y1="52" x2="115" y2="85" strokeWidth="3"/>
      <line x1="52" y1="148" x2="85" y2="115" strokeWidth="3"/>
      <line x1="148" y1="148" x2="115" y2="115" strokeWidth="3"/>
    </svg>
  ),
  chart: (
    <svg className={styles.wm} viewBox="0 0 200 200" fill="none" stroke="currentColor">
      <polyline points="20,160 60,120 100,80 130,95 170,40" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="170,40 170,50 160,40" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="20" y1="160" x2="20" y2="20" strokeWidth="3" opacity=".4"/>
      <line x1="20" y1="160" x2="185" y2="160" strokeWidth="3" opacity=".4"/>
    </svg>
  ),
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for previous, +1 for next
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)
  const progressRef = useRef(null)
  const startTimeRef = useRef(Date.now())

  const goToSlide = (index) => {
    // Calculate direction based on whether going forward or backward
    if (index === currentSlide) return
    
    const newDirection = index > currentSlide 
      ? (index - currentSlide > slides.length / 2 ? -1 : 1)
      : (currentSlide - index > slides.length / 2 ? 1 : -1)
    
    setDirection(newDirection)
    setCurrentSlide(index)
    setProgress(0)
    startTimeRef.current = Date.now()
  }

  const goToNext = () => {
    const nextIndex = (currentSlide + 1) % slides.length
    setDirection(1)
    goToSlide(nextIndex)
  }

  const goToPrev = () => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length
    setDirection(-1)
    goToSlide(prevIndex)
  }

  // Auto-slide with setInterval
  useEffect(() => {
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setProgress(0)
      startTimeRef.current = Date.now()
    }, INTERVAL)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [currentSlide, paused])

  // Progress bar animation
  useEffect(() => {
    if (paused) {
      if (progressRef.current) cancelAnimationFrame(progressRef.current)
      return
    }

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current
      const newProgress = Math.min((elapsed / INTERVAL) * 100, 100)
      setProgress(newProgress)
      
      if (newProgress < 100) {
        progressRef.current = requestAnimationFrame(updateProgress)
      }
    }

    progressRef.current = requestAnimationFrame(updateProgress)
    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current)
    }
  }, [currentSlide, paused])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' })
  }

  const currentSlideData = slides[currentSlide]

  return (
    <section
      className={styles.hero}
      id="home"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.bgGrid} />

      {/* Background overlay */}
      <div className={styles.overlay} />

      {/* Slides with Framer Motion */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          className={styles.slide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'tween', duration: 1 },
            opacity: { duration: 0.5 },
          }}
        >
          <div className={styles.wmWrap}>{watermarks[currentSlideData.wm]}</div>
          <div className="container">
            <motion.div 
              className={styles.content}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <span className={styles.tag}>{currentSlideData.tag}</span>
              <h1 className={styles.headline}>{parseHeadline(currentSlideData.headline)}</h1>
              <p className={styles.sub}>{currentSlideData.sub}</p>
              <div className={styles.actions}>
                <button 
                  className={`btn btn-gold ${styles.btnMain}`} 
                  onClick={() => scrollTo(currentSlideData.cta1.href)}
                >
                  {currentSlideData.cta1.label}
                </button>
                <button 
                  className={`btn btn-outline-white`} 
                  onClick={() => scrollTo(currentSlideData.cta2.href)}
                >
                  {currentSlideData.cta2.label}
                </button>
              </div>
            </motion.div>
          </div>
          <motion.div 
            className={styles.metric}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className={styles.metricNum}>{currentSlideData.metric.num}</span>
            <span className={styles.metricLabel}>{currentSlideData.metric.label}</span>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className={styles.controls}>
        {/* Previous Arrow with backdrop blur */}
        <motion.button 
          className={styles.arrow}
          onClick={goToPrev}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {/* ChevronLeftIcon path */}
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </motion.button>

        {/* Dot Indicators */}
        <div className={styles.dots}>
          {slides.map((_, index) => (
            <motion.button
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={index === currentSlide ? { width: 28 } : { width: 10 }}
              transition={{ type: 'tween', duration: 0.3 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Arrow with backdrop blur */}
        <motion.button 
          className={styles.arrow}
          onClick={goToNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {/* ChevronRightIcon path */}
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </motion.button>
      </div>

      {/* Slide Counter */}
      <div className={styles.counter}>
        <span className={styles.counterCurrent}>
          {String(currentSlide + 1).padStart(2, '0')}
        </span>
        <span className={styles.counterSep}> / </span>
        <span className={styles.counterTotal}>
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressTrack}>
        <motion.div 
          className={styles.progressFill} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  )
}
