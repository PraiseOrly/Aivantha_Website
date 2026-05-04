import { ArrowRight, BookOpen, Briefcase, Edit3, FileSearch, FileText } from 'lucide-react'
import { useEffect, useRef } from 'react'
import styles from './Resources.module.css'

const featured = {
  label: 'Featured Report',
  title: 'The State of AI in African Healthcare 2025',
  summary:
    'A comprehensive assessment of AI adoption, readiness gaps, and high-impact opportunities across Sub-Saharan health systems. Covering 18 countries, 40+ health institutions, and emerging technology infrastructure.',
  tags: ['AI', 'Policy', 'Public Health'],
  cta: 'Read the Report',
  href: '/resources/reports/state-of-ai-africa-2025',
}

const categories = [
  {
    title: 'Research & Insights',
    desc: 'Evidence-driven perspectives on AI, data, and healthcare systems across Africa.',
    items: [
      'AI applications in healthcare',
      'Health systems data analysis',
      'Digital health transformation insights',
      'AI readiness and adoption studies',
    ],
    cta: 'Explore Insights',
    href: '/resources/insights',
    Icon: BookOpen,
    tags: ['AI', 'Digital Health'],
  },
  {
    title: 'Publications',
    desc: 'In-depth, structured outputs from our research and advisory work.',
    items: [
      'Research papers',
      'Whitepapers',
      'Technical reports',
      'Policy briefs',
    ],
    cta: 'View Publications',
    href: '/resources/publications',
    Icon: FileText,
    tags: ['Policy', 'Data Systems'],
  },
  {
    title: 'Case Studies',
    desc: 'Real-world examples of how AI and data solutions are applied across African health systems.',
    items: [
      'Implementation approaches',
      'Challenges and lessons learned',
      'Measurable impact and outcomes',
      'Scalable models for replication',
    ],
    cta: 'View Case Studies',
    href: '/resources/case-studies',
    Icon: Briefcase,
    tags: ['Public Health', 'AI'],
  },
  {
    title: 'Reports & Whitepapers',
    desc: 'Strategic and analytical reports designed for decision-makers and stakeholders.',
    items: [
      'Health system performance',
      'AI and data strategy',
      'Market and ecosystem analysis',
      'Investment and policy insights',
    ],
    cta: 'Download Reports',
    href: '/resources/reports',
    Icon: FileSearch,
    tags: ['Policy', 'Data Systems'],
  },
  {
    title: 'Blog & Articles',
    desc: 'Timely commentary and thought leadership on emerging trends in AI and healthcare.',
    items: [
      'AI innovation in Africa',
      'Healthtech trends',
      'Data governance and ethics',
      'Industry updates and perspectives',
    ],
    cta: 'Read Articles',
    href: '/resources/blog',
    Icon: Edit3,
    tags: ['AI', 'Digital Health'],
  },
]

export default function Resources() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.07 }
    )
    ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.resourcesSection} id="resources" ref={ref}>
      <div className="container">

        {/* ── Header ── */}
        <div className="section-header fade-up">
          <span className="section-tag">Resources</span>
          <h2>Insights, Research, and Knowledge</h2>
          <p className="section-lead">
            Our resources bring together research, real-world insights, and practical frameworks to support governments, healthcare providers, and partners in making informed, data-driven decisions.
          </p>
          <div className="divider" />
        </div>

        {/* ── Featured Block ── */}
        <div className={`${styles.featuredBlock} fade-up`}>
          <div className={styles.featuredVisual} aria-hidden="true">
            <div className={styles.vizGrid}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className={styles.vizCell} style={{ animationDelay: `${i * 0.18}s` }} />
              ))}
            </div>
            <div className={styles.vizLabel}>2025 Report</div>
          </div>
          <div className={styles.featuredContent}>
            <span className={styles.featuredBadge}>{featured.label}</span>
            <h3 className={styles.featuredTitle}>{featured.title}</h3>
            <p className={styles.featuredSummary}>{featured.summary}</p>
            <div className={styles.featuredTags}>
              {featured.tags.map(t => (
                <span key={t} className={styles.tagPill}>{t}</span>
              ))}
            </div>
            <a href={featured.href} className={styles.featuredCta}>
              {featured.cta} <ArrowRight size={15} strokeWidth={2} />
            </a>
          </div>
        </div>

        {/* ── Category Cards ── */}
        <div className={styles.categoryGrid}>
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className={`${styles.categoryCard} fade-up`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIconWrap}>
                  <cat.Icon size={20} strokeWidth={1.7} />
                </div>
                <div className={styles.cardTags}>
                  {cat.tags.map(t => (
                    <span key={t} className={styles.tagPill}>{t}</span>
                  ))}
                </div>
              </div>

              <h3 className={styles.cardTitle}>{cat.title}</h3>
              <p className={styles.cardDesc}>{cat.desc}</p>

              <ul className={styles.cardList}>
                {cat.items.map(item => <li key={item}>{item}</li>)}
              </ul>

              <a href={cat.href} className={styles.cardCta}>
                {cat.cta} <ArrowRight size={13} strokeWidth={2.2} />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
