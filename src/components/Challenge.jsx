import { useEffect, useRef } from 'react'

// 4 core problems per tone guidelines


// Verbatim framing line
export default function Challenge() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="challenge" ref={ref}>
    </section>
  )
}
