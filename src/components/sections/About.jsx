import { useEffect, useRef } from 'react'
import './About.css'

const About = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
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
    <section ref={sectionRef} id="about" className="about-section">
      <div className="section-container">
        <h2 className="section-title animate-on-scroll">
          <span className="title-number">01</span>
          About Me
        </h2>
        
        <div className="about-content animate-on-scroll">
          <div className="about-card">
            <p>
              I'm a <span className="highlight">B.Tech CSE (AI)</span> student at 
              <span className="highlight"> Techno India University</span>, passionate about 
              building scalable, secure, and real-time systems.
            </p>
            <p>
              I specialize in full-stack development with expertise in modern technologies 
              like Node.js, React, MongoDB, Redis, and Socket.IO. With 170+ LeetCode 
              problems solved, I love solving complex algorithmic challenges.
            </p>
            <p>
              When I'm not coding, you'll find me contributing to open-source projects 
              or exploring new technologies.
            </p>
          </div>

          <div className="about-highlights">
            <div className="highlight-item">
              <span className="highlight-icon">🎓</span>
              <span>B.Tech CSE (AI)</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">🏛️</span>
              <span>Techno India University</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">💻</span>
              <span>Full-Stack Developer</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">🚀</span>
              <span>170+ LeetCode Solved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About