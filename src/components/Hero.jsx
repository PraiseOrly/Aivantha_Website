import styles from './Hero.module.css'

export default function Hero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' })
  }

  return (
    <section className={styles.hero} id="home">
      <div className={styles.glow} />
      <div className={styles.dots} />
      <div className="container">
        <div className={styles.content}>
          <span className={styles.pill}>African-Led &nbsp;·&nbsp; Evidence-Based &nbsp;·&nbsp; Built to Scale</span>
          <h1 className={styles.headline}>
            Building Africa's<br />
            <span className={styles.accent}>Intelligent Health</span><br />
            Future
          </h1>
          <p className={styles.sub}>
            AiVantha Health is an African AI and data-driven healthcare company operating at the
            intersection of <strong>Research | Consulting | Innovation | Talent</strong>. We design
            and deliver ethical, scalable, and locally grounded digital health solutions — powered
            by cutting-edge research and Africa's top AI talent.
          </p>
          <div className={styles.actions}>
            <button className="btn btn-gold" onClick={() => scrollTo('#pillars')}>Explore Our Work</button>
            <button className="btn btn-outline-white" onClick={() => scrollTo('#contact')}>Partner With Us</button>
          </div>
        </div>
      </div>
      <div className={styles.scrollHint}>
        <span>Scroll</span>
        <div className={styles.chevron} />
      </div>
    </section>
  )
}
