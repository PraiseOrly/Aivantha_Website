import styles from './StatsBand.module.css'

const stats = [
  { num: '$16.6B', label: 'Africa digital health market by 2030' },
  { num: '408M',   label: 'People in SSA without healthcare access' },
  { num: '33.6%',  label: 'AI-in-health CAGR across Africa 2024–2030' },
  { num: '41/54',  label: 'African countries with digital health strategies' },
]

export default function StatsBand() {
  return (
    <div className={styles.band}>
      <div className="container">
        <div className={styles.grid}>
          {stats.map(s => (
            <div className={styles.item} key={s.num}>
              <span className={styles.num}>{s.num}</span>
              <span className={styles.label}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
