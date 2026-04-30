import { useEffect, useRef, useState } from 'react'
import styles from './StatsBand.module.css'

const stats = [
  { prefix: '$', target: 16.6, suffix: 'B',   decimals: 1, label: 'Africa digital health market by 2030'          },
  { prefix: '',  target: 408,  suffix: 'M',   decimals: 0, label: 'People in SSA without adequate healthcare'     },
  { prefix: '',  target: 33.6, suffix: '%',   decimals: 1, label: 'AI-in-health CAGR across Africa 2024–2030'     },
  { prefix: '',  target: 41,   suffix: '/54', decimals: 0, label: 'African countries with digital health strategies' },
]

const DURATION = 1800

function Counter({ prefix, target, suffix, decimals }) {
  const [val, setVal] = useState(0)
  const elRef    = useRef(null)
  const rafRef   = useRef(null)
  const startRef = useRef(null)
  const firedRef = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || firedRef.current) return
        firedRef.current = true
        observer.disconnect()

        const animate = (ts) => {
          if (!startRef.current) startRef.current = ts
          const progress = Math.min((ts - startRef.current) / DURATION, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setVal(+(target * ease).toFixed(decimals))
          if (progress < 1) rafRef.current = requestAnimationFrame(animate)
        }
        rafRef.current = requestAnimationFrame(animate)
      },
      { threshold: 0.5 }
    )
    observer.observe(elRef.current)
    return () => { observer.disconnect(); cancelAnimationFrame(rafRef.current) }
  }, [target, decimals])

  return (
    <span className={styles.num} ref={elRef}>
      {prefix}{val.toFixed(decimals)}{suffix}
    </span>
  )
}

export default function StatsBand() {
  return (
    <div className={styles.band}>
      <div className="container">
        <div className={styles.grid}>
          {stats.map(s => (
            <div className={styles.item} key={s.label}>
              <Counter {...s} />
              <span className={styles.label}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
