import { useEffect, useRef } from 'react'
import styles from './Challenge.module.css'

const problems = [
  'Fragmented, siloed health information systems that cannot share data',
  'Clinicians making high-stakes decisions without AI decision support',
  'Billions invested in health programs with no evaluation framework',
  'AI tools designed elsewhere that fail in African clinical realities',
  'Shortage of vetted African AI talent in the health sector',
]

const responses = [
  'Interoperable health analytics and data systems advisory',
  'NuruMed and CardiacTek — AI tools built for African clinical contexts',
  'Applied research and MEL services that generate real evidence',
  'Africa-first design: every tool validated in the field before scale',
  "Africa's first vetted AI and health talent marketplace",
]

const market = [
  { fig: '$16.6B',  desc: 'Africa digital health market by 2030',       src: 'Grand View Research'       },
  { fig: '23.4%',  desc: 'CAGR — Africa digital health',                src: 'Grand View Research'       },
  { fig: '33.6%',  desc: 'AI-in-health CAGR 2024–2030',                 src: 'Grand View Research'       },
  { fig: '408M',   desc: 'People in SSA without healthcare access',      src: 'UNDP, 2020'                },
  { fig: '416M',   desc: 'Mobile internet users in Africa (2024)',       src: 'GSMA'                      },
  { fig: '0.4 vs 1.0', desc: 'Physician ratio per 1,000: Nigeria vs. WHO minimum', src: 'World Bank, 2021' },
]

export default function Challenge() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section-alt" id="challenge" ref={ref}>
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-tag">The Challenge</span>
          <h2>Africa's Health Data Challenge</h2>
          <p className="section-lead">
            Africa carries 25% of the world's disease burden but has access to less than 1% of
            global health expenditure. The challenge is not simply a lack of resources — it is an
            inability to harness the data that already exists to make smarter decisions with what
            is available.
          </p>
        </div>

        <div className={styles.dualGrid}>
          <div className={`${styles.card} ${styles.problemCard} fade-up`} style={{ transitionDelay: '.1s' }}>
            <div className={styles.cardHeader}>
              <span className={`${styles.dot} ${styles.dotRed}`} />
              <h3>The Problem</h3>
            </div>
            <ul>
              {problems.map(p => <li key={p}><span className={styles.dash}>—</span>{p}</li>)}
            </ul>
          </div>
          <div className={`${styles.card} ${styles.responseCard} fade-up`} style={{ transitionDelay: '.2s' }}>
            <div className={styles.cardHeader}>
              <span className={`${styles.dot} ${styles.dotGreen}`} />
              <h3>Our Response</h3>
            </div>
            <ul>
              {responses.map(r => <li key={r}><span className={styles.check}>✓</span>{r}</li>)}
            </ul>
          </div>
        </div>

        <div className={`${styles.marketSection} fade-up`} style={{ transitionDelay: '.3s' }}>
          <h3 className={styles.marketTitle}>Market Context</h3>
          <div className={styles.marketGrid}>
            {market.map(m => (
              <div className={styles.mCard} key={m.fig}>
                <div className={styles.mFig}>{m.fig}</div>
                <div className={styles.mDesc}>{m.desc}</div>
                <div className={styles.mSrc}>{m.src}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
