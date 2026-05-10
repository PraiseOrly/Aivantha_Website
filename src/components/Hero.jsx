import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

const INTERVAL = 8000

const slides = [
  {
    phaseNum: '01',
    phase: 'The Challenge',
    tag: "Africa's Health Intelligence Crisis",
    headline: "Africa Carries the Burden. The Systems Don't.",
    sub: "25% of global disease burden. Less than 1% of health AI investment. Fragmented data, absent intelligence, and 408 million people without adequate care.",
    cta1: { label: 'See the Challenge', href: '#challenge' },
    cta2: { label: 'Our Approach', href: '#about' },
    stats: [
      { num: '25%', label: 'Global disease burden' },
      { num: '<1%', label: 'Health AI investment' },
      { num: '408M+', label: 'Underserved population' },
    ],
    visual: 'problem',
  },
  {
    phaseNum: '02',
    phase: 'The Solution',
    tag: 'AI-Powered Health Intelligence for Africa',
    headline: "Converting Data Into Decisions That Save Lives.",
    sub: "AiVantha Health builds Africa's intelligence layer — AI products, research, consulting, and vetted talent, deployed at scale across the continent.",
    cta1: { label: 'Explore Products', href: '#solutions' },
    cta2: { label: 'Our Services', href: '#services' },
    stats: [
      { num: '5', label: 'Proprietary AI products' },
      { num: '7', label: 'Service capabilities' },
      { num: '$16.6B', label: 'Market by 2030' },
    ],
    visual: 'solution',
  },
  {
    phaseNum: '03',
    phase: 'The Impact',
    tag: 'Pan-African Digital Health Transformation',
    headline: "Smarter Systems. Better Outcomes. At Continental Scale.",
    sub: "From Nairobi to Lagos to Accra — building the digital health infrastructure that empowers institutions, improves outcomes, and shapes policy across Africa.",
    cta1: { label: 'Partner With Us', href: '#contact' },
    cta2: { label: 'View Solutions', href: '#solutions' },
    stats: [
      { num: '41/54', label: 'Countries with digital health plans' },
      { num: '33.6%', label: 'Digital health CAGR' },
      { num: '2030', label: 'Transformation horizon' },
    ],
    visual: 'impact',
  },
]

/* ── Problem: The Healthcare Gap ── */
const ProblemVisual = () => (
  <svg viewBox="0 0 480 380" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.vizSvg}>
    <defs>
      <linearGradient id="burdenBar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(239,100,72,.85)"/>
        <stop offset="100%" stopColor="rgba(220,60,40,.2)"/>
      </linearGradient>
      <linearGradient id="investBar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(0,74,173,.7)"/>
        <stop offset="100%" stopColor="rgba(0,74,173,.2)"/>
      </linearGradient>
    </defs>

    {/* Card */}
    <rect x="1" y="1" width="478" height="378" rx="18" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.1)" strokeWidth="1.5"/>

    {/* Warning badge */}
    <rect x="16" y="16" width="112" height="24" rx="8" fill="rgba(239,100,72,.16)" stroke="rgba(239,100,72,.4)" strokeWidth="1"/>
    <circle cx="30" cy="28" r="4" fill="rgba(239,100,72,.9)"/>
    <rect x="40" y="23" width="76" height="9" rx="3" fill="rgba(239,100,72,.55)"/>

    {/* ─── DISPARITY BARS ─── */}
    {/* Burden bar — tall, urgent */}
    <rect x="44" y="58" width="80" height="220" rx="8" fill="url(#burdenBar)" stroke="rgba(239,100,72,.3)" strokeWidth="1"/>
    <rect x="44" y="58" width="80" height="22" rx="8" fill="rgba(239,100,72,.35)"/>
    <rect x="56" y="148" width="56" height="28" rx="6" fill="rgba(255,255,255,.12)"/>
    <rect x="56" y="180" width="56" height="9" rx="3" fill="rgba(255,255,255,.2)"/>
    <rect x="60" y="193" width="48" height="7" rx="3" fill="rgba(255,255,255,.1)"/>

    {/* Investment bar — tiny, striking contrast */}
    <rect x="154" y="248" width="80" height="30" rx="8" fill="url(#investBar)" stroke="rgba(0,74,173,.45)" strokeWidth="1"/>
    <rect x="154" y="248" width="80" height="14" rx="8" fill="rgba(0,74,173,.45)"/>

    {/* Gap arrow */}
    <path d="M134,168 Q145,200 149,248" stroke="rgba(239,100,72,.3)" strokeWidth="1.5" strokeDasharray="4 5" fill="none"/>

    {/* Column labels */}
    <rect x="44" y="290" width="80" height="10" rx="4" fill="rgba(255,255,255,.2)"/>
    <rect x="154" y="290" width="80" height="10" rx="4" fill="rgba(255,255,255,.2)"/>
    <rect x="52" y="303" width="64" height="8" rx="3" fill="rgba(239,100,72,.35)"/>
    <rect x="162" y="303" width="64" height="8" rx="3" fill="rgba(0,74,173,.35)"/>

    {/* ─── FRAGMENTED NODES ─── */}
    {[
      { cx: 330, cy: 76, warn: true  },
      { cx: 425, cy: 128, warn: false },
      { cx: 375, cy: 200, warn: true  },
      { cx: 445, cy: 268, warn: false },
      { cx: 310, cy: 270, warn: true  },
    ].map(({ cx, cy, warn }, i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r={warn ? 33 : 28} fill="rgba(255,255,255,.02)"/>
        <circle cx={cx} cy={cy} r={warn ? 28 : 23} fill="rgba(255,255,255,.04)"
          stroke={warn ? 'rgba(239,100,72,.3)' : 'rgba(255,255,255,.1)'}
          strokeWidth="1" strokeDasharray={warn ? '4 3' : '0'}/>
        <rect x={cx - 20} y={cy - 8} width="40" height="9" rx="3" fill="rgba(255,255,255,.14)"/>
        <rect x={cx - 16} y={cy + 4} width="32" height="7" rx="3" fill="rgba(255,255,255,.07)"/>
        {warn && (
          <>
            <circle cx={cx + 19} cy={cy - 19} r="8" fill="rgba(239,80,60,.28)" stroke="rgba(239,80,60,.7)" strokeWidth="1"/>
            <line x1={cx+16} y1={cy-22} x2={cx+22} y2={cy-16} stroke="rgba(239,80,60,.9)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1={cx+22} y1={cy-22} x2={cx+16} y2={cy-16} stroke="rgba(239,80,60,.9)" strokeWidth="1.5" strokeLinecap="round"/>
          </>
        )}
      </g>
    ))}

    {/* Broken connections */}
    <line x1="330" y1="104" x2="355" y2="172" stroke="rgba(255,255,255,.05)" strokeWidth="1" strokeDasharray="5 8"/>
    <line x1="425" y1="156" x2="403" y2="172" stroke="rgba(255,255,255,.05)" strokeWidth="1" strokeDasharray="5 8"/>
    <line x1="375" y1="228" x2="417" y2="240" stroke="rgba(255,255,255,.05)" strokeWidth="1" strokeDasharray="5 8"/>
    <line x1="375" y1="228" x2="338" y2="242" stroke="rgba(255,255,255,.05)" strokeWidth="1" strokeDasharray="5 8"/>

    {/* Bottom stat strip */}
    <rect x="16" y="326" width="448" height="44" rx="10" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
    <line x1="165" y1="326" x2="165" y2="370" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
    <line x1="314" y1="326" x2="314" y2="370" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
    <rect x="30" y="335" width="60" height="14" rx="4" fill="rgba(239,100,72,.5)"/>
    <rect x="30" y="353" width="112" height="7" rx="3" fill="rgba(255,255,255,.12)"/>
    <rect x="180" y="335" width="60" height="14" rx="4" fill="rgba(0,74,173,.5)"/>
    <rect x="180" y="353" width="108" height="7" rx="3" fill="rgba(255,255,255,.12)"/>
    <rect x="328" y="335" width="60" height="14" rx="4" fill="rgba(239,100,72,.35)"/>
    <rect x="328" y="353" width="108" height="7" rx="3" fill="rgba(255,255,255,.12)"/>
  </svg>
)

/* ── Solution: AiVantha AI Ecosystem ── */
const SolutionVisual = () => (
  <svg viewBox="0 0 480 380" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.vizSvg}>
    <defs>
      <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(0,74,173,.45)"/>
        <stop offset="100%" stopColor="rgba(0,74,173,.0)"/>
      </radialGradient>
    </defs>

    {/* Card */}
    <rect x="1" y="1" width="478" height="378" rx="18" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.1)" strokeWidth="1.5"/>

    {/* Live badge */}
    <rect x="16" y="16" width="88" height="24" rx="8" fill="rgba(16,185,129,.12)" stroke="rgba(16,185,129,.4)" strokeWidth="1"/>
    <circle cx="30" cy="28" r="4" fill="rgba(16,185,129,.9)"/>
    <rect x="40" y="23" width="52" height="9" rx="3" fill="rgba(16,185,129,.6)"/>

    {/* Central hub glow */}
    <circle cx="240" cy="192" r="78" fill="url(#hubGlow)"/>

    {/* Hub rings */}
    <circle cx="240" cy="192" r="62" fill="none" stroke="rgba(0,74,173,.15)" strokeWidth="1" strokeDasharray="8 6"/>
    <circle cx="240" cy="192" r="80" fill="none" stroke="rgba(0,74,173,.08)" strokeWidth="1" strokeDasharray="12 8"/>

    {/* Hub core */}
    <circle cx="240" cy="192" r="48" fill="rgba(0,74,173,.22)" stroke="rgba(0,74,173,.55)" strokeWidth="1.5"/>
    <circle cx="240" cy="192" r="32" fill="rgba(0,74,173,.38)" stroke="rgba(0,74,173,.7)" strokeWidth="1"/>
    <rect x="214" y="184" width="52" height="11" rx="4" fill="rgba(255,255,255,.28)"/>
    <rect x="220" y="199" width="40" height="8" rx="3" fill="rgba(255,255,255,.16)"/>

    {/* ─── 5 PRODUCT NODES ─── */}
    {[
      { cx: 118, cy: 80,  label: 'CardiacTek', color: '0,74,173'   },
      { cx: 362, cy: 80,  label: 'Oxylytics',  color: '200,142,40' },
      { cx: 72,  cy: 220, label: 'Coach',       color: '200,142,40' },
      { cx: 408, cy: 220, label: 'Data',         color: '16,185,129' },
      { cx: 240, cy: 334, label: 'Talent Hub',  color: '0,74,173'   },
    ].map(({ cx, cy, color }, i) => (
      <g key={i}>
        {/* Connection to hub */}
        <line x1={cx} y1={cy} x2={240} y2={192}
          stroke={`rgba(${color},.22)`} strokeWidth="1.5" strokeDasharray="6 5"/>
        {/* Midpoint data dot */}
        <circle cx={(cx+240)/2} cy={(cy+192)/2} r="3" fill={`rgba(${color},.65)`}/>
        {/* Node glow */}
        <circle cx={cx} cy={cy} r="38" fill={`rgba(${color},.05)`}/>
        {/* Node */}
        <circle cx={cx} cy={cy} r="28" fill={`rgba(${color},.16)`} stroke={`rgba(${color},.5)`} strokeWidth="1"/>
        <rect x={cx-20} y={cy-8} width="40" height="9" rx="3" fill="rgba(255,255,255,.22)"/>
        <rect x={cx-16} y={cy+4} width="32" height="7" rx="3" fill={`rgba(${color},.45)`}/>
      </g>
    ))}

    {/* Research + Advisory flanking nodes */}
    <rect x="40" y="144" width="92" height="38" rx="10" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
    <rect x="52" y="153" width="54" height="9" rx="3" fill="rgba(255,255,255,.2)"/>
    <rect x="52" y="165" width="40" height="7" rx="3" fill="rgba(255,255,255,.1)"/>
    <line x1="132" y1="163" x2="192" y2="178" stroke="rgba(255,255,255,.07)" strokeWidth="1" strokeDasharray="4 5"/>

    <rect x="348" y="144" width="92" height="38" rx="10" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
    <rect x="360" y="153" width="54" height="9" rx="3" fill="rgba(255,255,255,.2)"/>
    <rect x="360" y="165" width="40" height="7" rx="3" fill="rgba(255,255,255,.1)"/>
    <line x1="348" y1="163" x2="288" y2="178" stroke="rgba(255,255,255,.07)" strokeWidth="1" strokeDasharray="4 5"/>

    {/* Processing status bottom strip */}
    <rect x="16" y="326" width="448" height="44" rx="10" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
    <line x1="165" y1="326" x2="165" y2="370" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
    <line x1="314" y1="326" x2="314" y2="370" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
    <circle cx="38" cy="348" r="6" fill="rgba(16,185,129,.8)"/>
    <rect x="50" y="340" width="96" height="9" rx="3" fill="rgba(255,255,255,.2)"/>
    <rect x="50" y="353" width="72" height="7" rx="3" fill="rgba(255,255,255,.1)"/>
    <circle cx="186" cy="348" r="6" fill="rgba(200,142,40,.8)"/>
    <rect x="198" y="340" width="96" height="9" rx="3" fill="rgba(255,255,255,.2)"/>
    <rect x="198" y="353" width="72" height="7" rx="3" fill="rgba(255,255,255,.1)"/>
    <circle cx="334" cy="348" r="6" fill="rgba(0,74,173,.8)"/>
    <rect x="346" y="340" width="96" height="9" rx="3" fill="rgba(255,255,255,.2)"/>
    <rect x="346" y="353" width="72" height="7" rx="3" fill="rgba(255,255,255,.1)"/>
  </svg>
)

/* ── Impact: Africa Transformation ── */
const ImpactVisual = () => (
  <svg viewBox="0 0 480 380" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.vizSvg}>
    <defs>
      <radialGradient id="africaGlow" cx="50%" cy="60%" r="45%">
        <stop offset="0%" stopColor="rgba(16,185,129,.14)"/>
        <stop offset="100%" stopColor="transparent"/>
      </radialGradient>
    </defs>

    {/* Card */}
    <rect x="1" y="1" width="478" height="378" rx="18" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.1)" strokeWidth="1.5"/>

    {/* Impact badge */}
    <rect x="16" y="16" width="128" height="24" rx="8" fill="rgba(16,185,129,.12)" stroke="rgba(16,185,129,.4)" strokeWidth="1"/>
    <circle cx="30" cy="28" r="4" fill="rgba(16,185,129,.9)"/>
    <rect x="40" y="23" width="92" height="9" rx="3" fill="rgba(16,185,129,.6)"/>

    {/* Africa continent */}
    <circle cx="210" cy="210" r="108" fill="url(#africaGlow)"/>
    <path
      d="M168,42 L222,30 L270,44 L302,74 L318,115 L324,158 L318,204 L304,238 L280,264 L252,286 L228,302 L208,292 L190,268 L174,240 L162,210 L156,180 L158,148 L164,116 L174,88 Z"
      fill="rgba(16,185,129,.07)" stroke="rgba(16,185,129,.32)" strokeWidth="1.5"
    />

    {/* City nodes */}
    {[
      { cx: 238, cy: 198, r: 12, color: '200,142,40', pri: true  },
      { cx: 178, cy: 182, r:  9, color: '0,74,173',   pri: false },
      { cx: 272, cy: 98,  r:  8, color: '16,185,129', pri: false },
      { cx: 244, cy: 278, r:  9, color: '200,142,40', pri: false },
      { cx: 148, cy: 148, r:  7, color: '0,74,173',   pri: false },
      { cx: 198, cy: 238, r:  8, color: '16,185,129', pri: false },
    ].map(({ cx, cy, r, color, pri }, i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r={r+15} fill={`rgba(${color},.05)`}/>
        <circle cx={cx} cy={cy} r={r+7}  fill={`rgba(${color},.1)`}/>
        <circle cx={cx} cy={cy} r={r}    fill={`rgba(${color},.7)`} stroke={`rgba(${color},1)`} strokeWidth={pri ? '2' : '1.5'}/>
        {pri && <circle cx={cx} cy={cy} r={r+22} fill="none" stroke={`rgba(${color},.18)`} strokeWidth="1" strokeDasharray="4 4"/>}
      </g>
    ))}

    {/* City connections */}
    {[
      [238,198,178,182],[238,198,198,238],[238,198,244,278],[272,98,238,198],[178,182,148,148],
    ].map(([x1,y1,x2,y2],i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(200,142,40,.22)" strokeWidth="1" strokeDasharray="4 5"/>
    ))}

    {/* ─── GROWTH CHART top-right ─── */}
    <rect x="324" y="22" width="144" height="118" rx="12" fill="rgba(16,185,129,.07)" stroke="rgba(16,185,129,.22)" strokeWidth="1"/>
    <rect x="336" y="34" width="72" height="10" rx="3" fill="rgba(255,255,255,.18)"/>
    {/* Area fill */}
    <path d="M336,130 L362,118 L387,106 L412,88 L437,70 L456,52 L456,140 L336,140 Z" fill="rgba(16,185,129,.08)"/>
    {/* Trend line */}
    <polyline points="336,130 362,118 387,106 412,88 437,70 456,52"
      stroke="rgba(16,185,129,.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    {/* End dot */}
    <circle cx="456" cy="52" r="5" fill="rgba(16,185,129,1)" stroke="rgba(255,255,255,.4)" strokeWidth="2"/>
    {/* Grid lines */}
    <line x1="336" y1="100" x2="456" y2="100" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
    <line x1="336" y1="128" x2="456" y2="128" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>

    {/* ─── METRIC CARDS right column ─── */}
    {[
      { y: 158, color: '16,185,129' },
      { y: 218, color: '200,142,40' },
      { y: 278, color: '0,74,173'   },
    ].map(({ y, color }, i) => (
      <g key={i}>
        <rect x="324" y={y} width="144" height="52" rx="10" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.07)" strokeWidth="1"/>
        <rect x="336" y={y+10} width="54" height="16" rx="4" fill={`rgba(${color},.45)`}/>
        <rect x="336" y={y+30} width="112" height="8" rx="3" fill="rgba(255,255,255,.14)"/>
        <rect x="336" y={y+41} width="80" height="7" rx="3" fill="rgba(255,255,255,.08)"/>
      </g>
    ))}

    {/* ─── BOTTOM TRANSFORM STRIP ─── */}
    <rect x="16" y="326" width="296" height="44" rx="10" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
    <line x1="115" y1="326" x2="115" y2="370" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
    <line x1="214" y1="326" x2="214" y2="370" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
    <rect x="28"  y="335" width="54" height="14" rx="4" fill="rgba(16,185,129,.45)"/>
    <rect x="28"  y="353" width="76" height="7"  rx="3" fill="rgba(255,255,255,.12)"/>
    <rect x="128" y="335" width="54" height="14" rx="4" fill="rgba(200,142,40,.45)"/>
    <rect x="128" y="353" width="76" height="7"  rx="3" fill="rgba(255,255,255,.12)"/>
    <rect x="228" y="335" width="54" height="14" rx="4" fill="rgba(0,74,173,.45)"/>
    <rect x="228" y="353" width="76" height="7"  rx="3" fill="rgba(255,255,255,.12)"/>
  </svg>
)

const visuals = {
  problem:  <ProblemVisual  />,
  solution: <SolutionVisual />,
  impact:   <ImpactVisual   />,
}

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

              {/* ── Left: content ── */}
              <div className={styles.content}>
                <motion.div
                  className={styles.phaseLabel}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.02, duration: 0.45, ease: [0.16,1,0.3,1] }}
                >
                  <span className={styles.phaseNum}>{slide.phaseNum}</span>
                  <span className={styles.phaseDivider}>/</span>
                  <span className={styles.phaseName}>{slide.phase}</span>
                </motion.div>

                <motion.span
                  className={styles.tag}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5, ease: [0.16,1,0.3,1] }}
                >
                  {slide.tag}
                </motion.span>

                <motion.h1
                  className={styles.headline}
                  initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.6, ease: [0.16,1,0.3,1] }}
                >
                  {slide.headline}
                </motion.h1>

                <motion.p
                  className={styles.sub}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.6, ease: [0.16,1,0.3,1] }}
                >
                  {slide.sub}
                </motion.p>

                <motion.div
                  className={styles.slideStats}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.36, duration: 0.5, ease: [0.16,1,0.3,1] }}
                >
                  {slide.stats.map((s, i) => (
                    <div key={i} className={styles.slideStat}>
                      <span className={styles.slideStatNum}>{s.num}</span>
                      <span className={styles.slideStatLabel}>{s.label}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  className={styles.actions}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.44, duration: 0.5, ease: [0.16,1,0.3,1] }}
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

              {/* ── Right: visualization ── */}
              <motion.div
                className={styles.visual}
                initial={{ opacity: 0, scale: 0.94, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.16,1,0.3,1] }}
              >
                {visuals[slide.visual]}
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
