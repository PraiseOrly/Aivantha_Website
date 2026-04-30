import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

const INTERVAL = 6000 // 6 seconds auto-slide
const SLIDE_OFFSET = 300

// Slide variants for enter, center, exit states
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

const contentVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.15,
      ease: [0.4, 0, 0.2, 1],
    }
  },
}

// 3 command slides per tone guidelines
const slides = [
  {
    tag: 'Intelligence Gap',
    headline: "Africa's Health Systems Are Flying Blind",
    sub: "Africa bears 25% of global disease burden but receives less than 1% of health AI investment. The data exists. The intelligence to act on it does not.",
    cta1: { label: 'Explore our services', href: '#services' },
    cta2: { label: 'View the opportunity', href: '#solutions' },
    stat: '$16.6B',
    statLabel: 'Africa digital health market by 2030',
    wm: 'globe',
  },
  {
    tag: 'End-to-End AI',
    headline: "Building Africa's Intelligent Health Future",
    sub: "Research. Consulting. Innovation. Talent. One platform — transforming health systems across the continent from within.",
    cta1: { label: 'Explore our services', href: '#services' },
    cta2: { label: 'View the opportunity', href: '#solutions' },
    stat: '41/54',
    statLabel: 'African countries with digital health strategies',
    wm: 'health',
  },
  {
    tag: 'Transform Now',
    headline: "The Time to Act Is Now",
    sub: "41 of 54 African countries have digital health strategies. $16.6B addressable market. Be part of the continental transformation.",
    cta1: { label: 'Get in touch', href: '#contact' },
    cta2: { label: 'Partner with us', href: '#contact' },
    stat: '408M+',
    statLabel: 'People without adequate healthcare access',
    wm: 'chart',
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
  const [direction, setDirection] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)
  const progressRef = useRef(null)
  const startTimeRef = useRef(Date.now())

  const goToSlide = (index) => {
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
      <div className={styles.overlay} />

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
              <h1 className={styles.headline}>{currentSlideData.headline}</h1>
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
            className={styles.statBadge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <span className={styles.statNum}>{currentSlideData.stat}</span>
            <span className={styles.statLabel}>{currentSlideData.statLabel}</span>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className={styles.controls}>
        <motion.button 
          className={styles.arrow}
          onClick={goToPrev}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </motion.button>

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

        <motion.button 
          className={styles.arrow}
          onClick={goToNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </motion.button>
      </div>

      <div className={styles.counter}>
        <span className={styles.counterCurrent}>
          {String(currentSlide + 1).padStart(2, '0')}
        </span>
        <span className={styles.counterSep}> / </span>
        <span className={styles.counterTotal}>
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      <div className={styles.progressTrack}>
        <motion.div 
          className={styles.progressFill} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  )
}
