import { useEffect, useRef, useState } from 'react'
import { GithubIcon, LinkedinIcon, EmailIcon } from '../icons/SocialIcons'
import './Contact.css'

const Contact = () => {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailtoLink = `mailto:ankitsingh794@gmail.com?subject=Portfolio Contact from ${formData.name}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0D%0D%0AMessage:%0D%0A${formData.message}`
    window.location.href = mailtoLink
  }

  return (
    <section ref={sectionRef} id="contact" className="contact-section">
      <div className="section-container">
        <h2 className="section-title animate-on-scroll">
          <span className="title-number">05</span>
          Get In Touch
        </h2>

        <div className="contact-content">
          <form className="contact-form animate-on-scroll" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>

          <div className="contact-info animate-on-scroll">
            <p className="contact-text">
              Feel free to reach out for collaborations, projects, or just to say hi!
            </p>
            <div className="contact-links">
              <a href="https://github.com/ankitsingh794" target="_blank" rel="noopener noreferrer" className="contact-link">
                <GithubIcon size={24} />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/ankitsingh794" target="_blank" rel="noopener noreferrer" className="contact-link">
                <LinkedinIcon size={24} />
                <span>LinkedIn</span>
              </a>
              <a href="mailto:ankitsingh794@gmail.com" className="contact-link">
                <EmailIcon size={24} />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact