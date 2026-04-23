import { useEffect, useRef } from 'react'
import './Stats.css'

const stats = [
  { number: '170+', label: 'LeetCode Solved', icon: '⚡' },
  { number: '154+', label: 'GitHub Commits', icon: '📊' },
  { number: '4', label: 'Projects Built', icon: '🚀' },
  { number: '2+', label: 'Years Experience', icon: '💼' },
]

const Stats = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            const counters = entry.target.querySelectorAll('.stat-number')
            counters.forEach((counter) => {
              const target = parseInt(counter.dataset.target)
              let current = 0
              const increment = target / 50
              const timer = setInterval(() => {
                current += increment
                if (current >= target) {
                  counter.textContent = target + '+'
                  clearInterval(timer)
                } else {
                  counter.textContent = Math.floor(current) + '+'
                }
              }, 30)
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="stats" className="stats-section">
      <div className="section-container">
        <h2 className="section-title animate-on-scroll">
          <span className="title-number">04</span>
          Stats
        </h2>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-number" data-target={stat.number.replace(/\D/g, '')}>0</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats