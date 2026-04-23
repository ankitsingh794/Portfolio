import { useEffect, useRef } from 'react'
import './Skills.css'

const skills = [
  { name: 'React', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'MongoDB', level: 80 },
  { name: 'Express', level: 85 },
  { name: 'Redis', level: 75 },
  { name: 'Socket.IO', level: 80 },
  { name: 'JavaScript', level: 90 },
  { name: 'TypeScript', level: 75 },
  { name: 'Python', level: 70 },
  { name: 'SQL', level: 75 },
  { name: 'Git', level: 85 },
  { name: 'Docker', level: 65 },
]

const Skills = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            const bars = entry.target.querySelectorAll('.skill-bar-fill')
            bars.forEach((bar, i) => {
              setTimeout(() => {
                bar.style.width = bar.dataset.width + '%'
              }, i * 50)
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="skills-section">
      <div className="section-container">
        <h2 className="section-title animate-on-scroll">
          <span className="title-number">03</span>
          Skills
        </h2>

        <div className="skills-grid animate-on-scroll">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-item">
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-bar-fill"
                  data-width={skill.level}
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="skills-tags animate-on-scroll">
          {skills.map((skill) => (
            <span key={skill.name} className="skill-tag">
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills