import { useEffect, useRef } from 'react'
import './AuroraBackground.css'

const AuroraBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrame
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      hue: Math.random() * 60 + 160
    })

    const initParticles = () => {
      particles = []
      for (let i = 0; i < 100; i++) {
        particles.push(createParticle())
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 26, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 70%, 0.8)`)
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    resize()
    initParticles()
    animate()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="aurora-background" />
}

export default AuroraBackground