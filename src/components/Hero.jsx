import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

const INTERVAL = 7000

const slides = [
  {
    tag: 'Healthcare AI · Africa-First',
    headline: "Building Africa's Intelligent Health Future",
    sub: "AI-powered, data-driven healthcare solutions designed for Africa — transforming fragmented health data into actionable intelligence that improves outcomes.",
    support: "AiVantha Health combines research, consulting, and AI innovation to help governments, hospitals, and partners make smarter, data-driven decisions.",
    cta1: { label: 'Explore Solutions', href: '#solutions' },
    cta2: { label: 'Partner With Us', href: '#contact' },
    stat: '$16.6B', statLabel: 'Africa digital health market by 2030',
    visual: 'dashboard',
  },
  {
    tag: '$16.6B Market · 33.6% CAGR',
    headline: "Africa's Health Crisis Is a Data Intelligence Problem",
    sub: "Africa carries 25% of the world's disease burden but receives less than 1% of global health AI investment. The data exists — the systems to act on it do not.",
    support: "We bridge the gap with research, strategy, AI solutions, and the vetted talent needed to deploy them at scale across the continent.",
    cta1: { label: 'See the Challenge', href: '#challenge' },
    cta2: { label: 'Our Approach', href: '#pillars' },
    stat: '408M+', statLabel: 'People in SSA without adequate healthcare',
    visual: 'map',
  },
  {
    tag: 'Invest · Partner · Collaborate',
    headline: "The Time to Build Africa's Health AI Future Is Now",
    sub: "41 of 54 African countries have digital health strategies. The infrastructure is ready, the market is open, and the talent exists.",
    support: "AiVantha is actively seeking governments, development partners, hospitals, and investors aligned to transformative, systemic health impact.",
    cta1: { label: 'Get in Touch', href: '#contact' },
    cta2: { label: 'View Solutions', href: '#solutions' },
    stat: '41/54', statLabel: 'African countries with digital health strategies',
    visual: 'chart',
  },
]

/* ── SVG Illustrations ── */
const DashboardVisual = () => (
  <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.vizSvg}>
    {/* Outer card */}
    <rect x="1" y="1" width="478" height="358" rx="18" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.12)" strokeWidth="1.5"/>
    {/* Header */}
    <rect x="1" y="1" width="478" height="52" rx="18" fill="rgba(255,255,255,.09)"/>
    <rect x="1" y="34" width="478" height="19" fill="rgba(255,255,255,.09)"/>
    <circle cx="26" cy="26" r="6" fill="rgba(200,150,12,.8)"/>
    <circle cx="44" cy="26" r="6" fill="rgba(255,255,255,.25)"/>
    <circle cx="62" cy="26" r="6" fill="rgba(255,255,255,.15)"/>
    <rect x="82" y="19" width="110" height="14" rx="5" fill="rgba(255,255,255,.22)"/>
    <rect x="384" y="18" width="80" height="16" rx="8" fill="rgba(0,74,173,.55)"/>

    {/* KPI cards */}
    <rect x="14" y="66" width="138" height="74" rx="12" fill="rgba(0,74,173,.18)" stroke="rgba(0,74,173,.45)" strokeWidth="1"/>
    <rect x="166" y="66" width="138" height="74" rx="12" fill="rgba(200,150,12,.13)" stroke="rgba(200,150,12,.4)" strokeWidth="1"/>
    <rect x="318" y="66" width="148" height="74" rx="12" fill="rgba(16,185,129,.11)" stroke="rgba(16,185,129,.35)" strokeWidth="1"/>

    <rect x="26" y="78" width="52" height="20" rx="5" fill="rgba(0,74,173,.8)"/>
    <rect x="26" y="104" width="110" height="8" rx="4" fill="rgba(255,255,255,.18)"/>
    <rect x="26" y="116" width="78" height="7" rx="3" fill="rgba(255,255,255,.10)"/>

    <rect x="178" y="78" width="52" height="20" rx="5" fill="rgba(200,150,12,.75)"/>
    <rect x="178" y="104" width="110" height="8" rx="4" fill="rgba(255,255,255,.18)"/>
    <rect x="178" y="116" width="60" height="7" rx="3" fill="rgba(255,255,255,.10)"/>

    <rect x="330" y="78" width="52" height="20" rx="5" fill="rgba(16,185,129,.65)"/>
    <rect x="330" y="104" width="120" height="8" rx="4" fill="rgba(255,255,255,.18)"/>
    <rect x="330" y="116" width="90" height="7" rx="3" fill="rgba(255,255,255,.10)"/>

    {/* Chart panel */}
    <rect x="14" y="154" width="286" height="164" rx="12" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
    <rect x="26" y="165" width="90" height="11" rx="4" fill="rgba(255,255,255,.2)"/>
    <rect x="240" y="165" width="48" height="11" rx="4" fill="rgba(200,150,12,.4)"/>

    {/* Grid lines */}
    <line x1="26" y1="248" x2="288" y2="248" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
    <line x1="26" y1="224" x2="288" y2="224" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
    <line x1="26" y1="200" x2="288" y2="200" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>

    {/* Area fill */}
    <path d="M26,248 68,232 110,238 152,216 194,204 236,188 278,174 288,170 288,296 26,296 Z" fill="rgba(200,150,12,.07)"/>
    {/* Trend line */}
    <polyline points="26,248 68,232 110,238 152,216 194,204 236,188 278,174" stroke="rgba(200,150,12,.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Data dots */}
    <circle cx="68"  cy="232" r="3.5" fill="rgba(200,150,12,.9)"/>
    <circle cx="152" cy="216" r="3.5" fill="rgba(200,150,12,.9)"/>
    <circle cx="236" cy="188" r="3.5" fill="rgba(200,150,12,.9)"/>
    <circle cx="278" cy="174" r="5"   fill="rgba(200,150,12,1)" stroke="rgba(255,255,255,.4)" strokeWidth="2"/>

    {/* ECG overlay */}
    <path d="M26,280 55,280 68,280 78,262 88,298 98,268 108,280 145,280 160,280" stroke="rgba(0,74,173,.55)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>

    {/* Side list panel */}
    <rect x="314" y="154" width="152" height="164" rx="12" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
    <rect x="326" y="165" width="80" height="10" rx="4" fill="rgba(255,255,255,.2)"/>

    {[0,1,2,3].map((i) => (
      <g key={i} transform={`translate(0, ${i * 30})`}>
        <circle cx="334" cy="194" r="9" fill={`rgba(${i===0?'0,74,173':i===1?'200,150,12':i===2?'16,185,129':'255,255,255'},.28)`} stroke={`rgba(${i===0?'0,74,173':i===1?'200,150,12':i===2?'16,185,129':'255,255,255'},.5)`} strokeWidth="1"/>
        <rect x="350" y="189" width="100" height="8" rx="4" fill="rgba(255,255,255,.18)"/>
        <rect x="350" y="200" width="64"  height="6" rx="3" fill="rgba(255,255,255,.10)"/>
      </g>
    ))}

    {/* AI badge */}
    <rect x="314" y="290" width="152" height="28" rx="9" fill="rgba(0,74,173,.45)" stroke="rgba(0,74,173,.7)" strokeWidth="1"/>
    <circle cx="330" cy="304" r="6" fill="rgba(200,150,12,.85)"/>
    <rect x="342" y="299" width="112" height="10" rx="4" fill="rgba(255,255,255,.32)"/>
  </svg>
)

const MapVisual = () => (
  <svg viewBox="0 0 480 380" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.vizSvg}>
    {/* Background grid */}
    {[0,1,2,3,4,5,6].map(i => (
      <line key={`h${i}`} x1="0" y1={i*60+20} x2="480" y2={i*60+20} stroke="rgba(255,255,255,.04)" strokeWidth="1"/>
    ))}
    {[0,1,2,3,4,5,6,7].map(i => (
      <line key={`v${i}`} x1={i*60+20} y1="0" x2={i*60+20} y2="380" stroke="rgba(255,255,255,.04)" strokeWidth="1"/>
    ))}

    {/* Africa continent silhouette */}
    <path
      d="M200,30 L260,20 L310,35 L345,65 L360,105 L368,150 L362,195 L350,230 L330,262 L305,288 L275,310 L250,330 L232,340 L215,328 L200,305 L182,275 L168,245 L158,215 L150,185 L148,155 L152,120 L160,88 L172,60 Z"
      fill="rgba(0,74,173,.12)" stroke="rgba(0,74,173,.4)" strokeWidth="1.5"
    />

    {/* City nodes */}
    {[
      { cx: 272, cy: 210, label: 'Nairobi',      color: '200,150,12', size: 10 },
      { cx: 195, cy: 195, label: 'Lagos',         color: '0,74,173',  size: 9  },
      { cx: 300, cy: 100, label: 'Cairo',          color: '16,185,129',size: 8  },
      { cx: 268, cy: 295, label: 'Johannesburg',  color: '200,150,12', size: 8  },
      { cx: 165, cy: 155, label: 'Dakar',          color: '0,74,173',  size: 7  },
      { cx: 220, cy: 240, label: 'Kampala',        color: '16,185,129', size: 7  },
    ].map(({ cx, cy, color, size }) => (
      <g key={`${cx}-${cy}`}>
        <circle cx={cx} cy={cy} r={size + 10} fill={`rgba(${color},.1)`}/>
        <circle cx={cx} cy={cy} r={size + 5}  fill={`rgba(${color},.18)`}/>
        <circle cx={cx} cy={cy} r={size}       fill={`rgba(${color},.75)`} stroke={`rgba(${color},1)`} strokeWidth="1.5"/>
      </g>
    ))}

    {/* Connection lines */}
    {[
      [272,210, 195,195], [272,210, 220,240], [272,210, 268,295],
      [195,195, 165,155], [195,195, 220,240], [300,100, 272,210],
    ].map(([x1,y1,x2,y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(200,150,12,.3)" strokeWidth="1" strokeDasharray="4 4"/>
    ))}

    {/* Floating metric badges */}
    <rect x="340" y="180" width="128" height="44" rx="10" fill="rgba(0,74,173,.6)" stroke="rgba(0,74,173,.8)" strokeWidth="1"/>
    <rect x="350" y="190" width="60" height="12" rx="4" fill="rgba(255,255,255,.35)"/>
    <rect x="350" y="206" width="100" height="8"  rx="4" fill="rgba(255,255,255,.18)"/>

    <rect x="20" y="260" width="128" height="44" rx="10" fill="rgba(200,150,12,.45)" stroke="rgba(200,150,12,.7)" strokeWidth="1"/>
    <rect x="30" y="270" width="60" height="12" rx="4" fill="rgba(255,255,255,.35)"/>
    <rect x="30" y="286" width="100" height="8"  rx="4" fill="rgba(255,255,255,.18)"/>

    <rect x="355" y="85" width="110" height="36" rx="10" fill="rgba(16,185,129,.35)" stroke="rgba(16,185,129,.6)" strokeWidth="1"/>
    <rect x="365" y="94" width="50" height="10" rx="4" fill="rgba(255,255,255,.3)"/>
    <rect x="365" y="107" width="84" height="7"  rx="3" fill="rgba(255,255,255,.15)"/>

    {/* Data stream lines at edges */}
    <path d="M20,30 Q60,60 40,100" stroke="rgba(0,74,173,.25)" strokeWidth="1.5" strokeDasharray="3 5" fill="none"/>
    <path d="M440,300 Q420,260 450,230" stroke="rgba(200,150,12,.2)" strokeWidth="1.5" strokeDasharray="3 5" fill="none"/>
  </svg>
)

const ChartVisual = () => (
  <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.vizSvg}>
    {/* Card */}
    <rect x="1" y="1" width="478" height="358" rx="18" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.1)" strokeWidth="1.5"/>

    {/* Title row */}
    <rect x="20" y="20" width="130" height="14" rx="5" fill="rgba(255,255,255,.22)"/>
    <rect x="20" y="40" width="200" height="9"  rx="4" fill="rgba(255,255,255,.1)"/>

    {/* Legend */}
    <circle cx="360" cy="26" r="6" fill="rgba(200,150,12,.8)"/>
    <rect x="372" y="21" width="70" height="10" rx="4" fill="rgba(255,255,255,.18)"/>
    <circle cx="360" cy="46" r="6" fill="rgba(0,74,173,.8)"/>
    <rect x="372" y="41" width="70" height="10" rx="4" fill="rgba(255,255,255,.18)"/>

    {/* Axes */}
    <line x1="56" y1="66" x2="56"  y2="280" stroke="rgba(255,255,255,.12)" strokeWidth="1.5"/>
    <line x1="56" y1="280" x2="460" y2="280" stroke="rgba(255,255,255,.12)" strokeWidth="1.5"/>

    {/* Grid */}
    {[0,1,2,3,4].map(i => (
      <line key={i} x1="56" y1={280 - i*48} x2="460" y2={280 - i*48} stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
    ))}

    {/* Bars (6 countries) */}
    {[
      { x: 80,  h1: 140, h2: 92  },
      { x: 150, h1: 160, h2: 108 },
      { x: 220, h1: 180, h2: 120 },
      { x: 290, h1: 200, h2: 140 },
      { x: 360, h1: 178, h2: 124 },
      { x: 430, h1: 210, h2: 148 },
    ].map(({ x, h1, h2 }, i) => (
      <g key={i}>
        <rect x={x - 18} y={280 - h1} width="16" height={h1} rx="4" fill="rgba(0,74,173,.45)" stroke="rgba(0,74,173,.6)" strokeWidth="1"/>
        <rect x={x + 2}  y={280 - h2} width="16" height={h2} rx="4" fill="rgba(200,150,12,.55)" stroke="rgba(200,150,12,.75)" strokeWidth="1"/>
      </g>
    ))}

    {/* Trend line */}
    <polyline points="80,214 150,200 220,186 290,168 360,188 430,156" stroke="rgba(16,185,129,.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="430" cy="156" r="5" fill="rgba(16,185,129,1)" stroke="rgba(255,255,255,.4)" strokeWidth="2"/>

    {/* Growth arrow badge */}
    <rect x="336" y="100" width="118" height="50" rx="12" fill="rgba(16,185,129,.2)" stroke="rgba(16,185,129,.45)" strokeWidth="1"/>
    <path d="M352,132 L352,112 L372,112" stroke="rgba(16,185,129,.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <rect x="378" y="114" width="64" height="10" rx="4" fill="rgba(255,255,255,.25)"/>
    <rect x="378" y="128" width="50" height="8"  rx="3" fill="rgba(255,255,255,.14)"/>

    {/* X-axis labels */}
    {['KE','NG','GH','ET','TZ','ZA'].map((label, i) => (
      <rect key={label} x={72 + i * 70} y="288" width="26" height="10" rx="3" fill="rgba(255,255,255,.15)"/>
    ))}

    {/* Bottom stat row */}
    {[0,1,2].map(i => (
      <g key={i}>
        <rect x={20 + i * 156} y="316" width="144" height="32" rx="10" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
        <rect x={32 + i * 156} y="324" width="60" height="10" rx="4" fill="rgba(200,150,12,.45)"/>
        <rect x={32 + i * 156} y="338" width="100" height="7" rx="3" fill="rgba(255,255,255,.12)"/>
      </g>
    ))}
  </svg>
)

const visuals = { dashboard: <DashboardVisual />, map: <MapVisual />, chart: <ChartVisual /> }

const trustChips = ['Research-First', 'Ethical AI', 'Africa-Led', 'Built to Scale']

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
      <div className={styles.heroBg} />
      <div className={styles.bgGrid} />
      <div className={styles.overlay} />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          className={styles.slide}
          custom={direction}
          initial={d => ({ x: d > 0 ? 60 : -60, opacity: 0 })}
          animate={{ x: 0, opacity: 1 }}
          exit={d => ({ x: d < 0 ? 60 : -60, opacity: 0 })}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="container">
            <div className={styles.slideGrid}>

              {/* ── Left: glassmorphic content card ── */}
              <div className={styles.glassCard}>
              <div className={styles.content}>
                <motion.span
                  className={styles.tag}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05, duration: 0.5, ease: [0.16,1,0.3,1] }}
                >
                  {slide.tag}
                </motion.span>

                <motion.h1
                  className={styles.headline}
                  initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6, ease: [0.16,1,0.3,1] }}
                >
                  {slide.headline}
                </motion.h1>

                <motion.p
                  className={styles.sub}
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.6, ease: [0.16,1,0.3,1] }}
                >
                  {slide.sub}
                </motion.p>

                <motion.p
                  className={styles.support}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.33, duration: 0.6, ease: [0.16,1,0.3,1] }}
                >
                  {slide.support}
                </motion.p>

                <motion.div
                  className={styles.actions}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42, duration: 0.6, ease: [0.16,1,0.3,1] }}
                >
                  <button className={`btn ${styles.ctaPrimary} ${styles.btnPrimary}`} onClick={() => scrollTo(slide.cta1.href)}>
                    {slide.cta1.label}
                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd"/>
                    </svg>
                  </button>
                  <button className={`btn btn-outline-white`} onClick={() => scrollTo(slide.cta2.href)}>
                    {slide.cta2.label}
                  </button>
                </motion.div>

                <motion.div
                  className={styles.chips}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.5 }}
                >
                  {trustChips.map(c => <span key={c} className={styles.chip}>{c}</span>)}
                </motion.div>
              </div>
              </div>

              {/* ── Right: data visualization ── */}
              <motion.div
                className={styles.visual}
                initial={{ opacity: 0, scale: 0.94, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.16,1,0.3,1] }}
              >
                {visuals[slide.visual]}

                {/* Floating stat badge overlaid on visual */}
                <motion.div
                  className={styles.statBadge}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <span className={styles.statNum}>{slide.stat}</span>
                  <span className={styles.statLabel}>{slide.statLabel}</span>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Controls ── */}
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
        <span className={styles.counterSep}> / </span>
        <span className={styles.counterTotal}>{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* Progress bar */}
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
    </section>
  )
}
