import AuroraBackground from '../components/AuroraBackground'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Projects from '../components/sections/Projects'
import Skills from '../components/sections/Skills'
import Stats from '../components/sections/Stats'
import Contact from '../components/sections/Contact'
import './Introduction.css'

export const Introduction = () => {
  return (
    <div className="introduction">
      <AuroraBackground />
      
      <nav className="nav-bar">
        <div className="nav-links">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#stats">Stats</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Stats />
        <Contact />
      </main>

      <footer className="footer">
        <p>© 2026 Ankit Singh. Built with React</p>
      </footer>
    </div>
  )
}

export default Introduction