import { useEffect, useRef } from 'react'
import './Projects.css'

const projects = [
  {
    name: 'WayMate',
    description: 'AI-powered travel companion with real-time chat, itinerary planning, and personalized recommendations. Features Node.js, Express, MongoDB, Redis, and Socket.IO.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Socket.IO', 'AI'],
    link: 'https://waymate.vercel.app',
    stats: '154 commits',
  },
  {
    name: 'Bookio',
    description: 'Full-stack book management platform with RESTful API, user authentication, and CRUD operations. Backend powered by Node.js and Express.',
    tech: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    link: 'https://bookio-backend.vercel.app',
    stats: 'Full-stack',
  },
  {
    name: 'BitWiseCalc',
    description: 'Interactive bitwise calculator with step-by-step visualization. Perform bitwise operations with real-time explanations.',
    tech: ['React', 'JavaScript', 'Bitwise Ops'],
    link: 'https://bit-wise-calc.vercel.app',
    stats: 'Interactive',
  },
  {
    name: 'IndiLink',
    description: 'Platform connecting Indian communities with local services, businesses, and resources. Built with modern web technologies.',
    tech: ['React', 'Node.js', 'MongoDB'],
    link: 'https://indilink.vercel.app',
    stats: 'Community',
  },
]

const Projects = () => {
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
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="projects-section">
      <div className="section-container">
        <h2 className="section-title animate-on-scroll">
          <span className="title-number">02</span>
          Projects
        </h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-header">
                <h3 className="project-name">{project.name}</h3>
                <span className="project-stats">{project.stats}</span>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-arrow">→</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects