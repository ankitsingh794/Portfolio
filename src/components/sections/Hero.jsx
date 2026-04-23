import { useEffect, useRef } from 'react'
import ProfileCard from '../../components/ProfileCard'
import { GithubIcon, LinkedinIcon, EmailIcon } from '../icons/SocialIcons'
import './Hero.css'

const Hero = () => {
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

  const handleContact = () => {
    const contactSection = document.getElementById('contact')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} id="hero" className="hero-section">
      <div className="hero-content">
        <div className="hero-text animate-on-scroll">
          <h1 className="hero-title">
            <span className="name-gradient">Ankit Singh</span>
            <span className="hero-subtitle">Full-Stack Developer</span>
          </h1>
          <p className="hero-tagline">Building scalable, secure, real-time systems</p>
        </div>

        <div className="profile-wrapper animate-on-scroll">
          <ProfileCard
            name="Ankit Singh"
            title="Full-Stack Developer"
            handle="ankitsingh794"
            status="Online"
            contactText="Get In Touch"
            avatarUrl="https://res.cloudinary.com/divulwxho/image/upload/v1751456065/WhatsApp_Image_2025-07-02_at_17.00.05_63987d7e-removebg-preview_mntuxp.png"
            showUserInfo={true}
            enableTilt={true}
            onContactClick={handleContact}
          />
        </div>

        <div className="social-links animate-on-scroll">
          <a href="https://github.com/ankitsingh794" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
            <GithubIcon size={28} />
          </a>
          <a href="https://linkedin.com/in/ankitsingh794" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
            <LinkedinIcon size={28} />
          </a>
          <a href="mailto:ankitsingh794@gmail.com" className="social-link" aria-label="Email">
            <EmailIcon size={28} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero