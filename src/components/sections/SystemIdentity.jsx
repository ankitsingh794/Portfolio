import React from 'react';
import useGSAP from '../../hooks/useGSAP';
import { gsap } from '../../lib/gsap';
import ProfileCard from '../ProfileCard';

const neofetchLines = [
  { label: 'OS', value: 'Software Development Engineer' },
  { label: 'Kernel', value: 'System Thinker' },
  { label: 'Shell', value: 'React + JavaScript' },
  { label: 'Stack', value: 'Node · Express · MongoDB' },
  { label: 'Cache', value: 'Redis' },
  { label: 'Protocols', value: 'REST · WebSocket · JWT' },
  { label: 'Uptime', value: '3+ years building' },
  { label: 'Location', value: 'Kolkata, India' },
  { label: 'Status', value: '🟢 Open to opportunities' },
];

const aboutParagraphs = [
  "I don't just write code — I design systems. Every function, every API route, every database query is a conscious architectural decision.",
  "Started with curiosity. Stayed for the craft. Building things that don't just work — they scale, they endure, and they solve real problems.",
  "Currently deep in the React ecosystem, building production-grade full-stack applications with real-time capabilities.",
];

const SystemIdentity = () => {
  const containerRef = useGSAP((container) => {
    const infoLines = container.querySelectorAll('.info-line');
    const nameText = container.querySelector('.name-text');
    const aboutText = container.querySelectorAll('.about-para');
    const profileSection = container.querySelector('.profile-section');
    const sectionLabel = container.querySelector('.section-label');
    const divider = container.querySelector('.section-divider');
    const infoBox = container.querySelector('.info-box');

    let mm = gsap.matchMedia();
    
    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      let { isDesktop } = context.conditions;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: isDesktop ? 'top top' : 'top 85%',
          end: isDesktop ? '+=500%' : 'bottom 10%',
          scrub: 0.8,
          pin: isDesktop,
          anticipatePin: isDesktop ? 1 : 0,
        },
      });

      tl.fromTo(sectionLabel, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6 }, 0);
      tl.fromTo(profileSection, { opacity: 0, scale: 0.85, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 0.5);
      tl.fromTo(nameText, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 2.5);
      tl.fromTo(infoBox, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 3.2);

      infoLines.forEach((line, i) => {
        tl.fromTo(line, { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.3 }, 3.5 + i * 0.2);
      });

      const p3 = 3.5 + neofetchLines.length * 0.2 + 1.5;
      tl.fromTo(divider, { scaleX: 0 }, { scaleX: 1, duration: 0.8 }, p3);

      aboutText.forEach((para, i) => {
        tl.fromTo(para, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, p3 + 1 + i * 0.6);
      });
    });
  }, []);

  return (
    <section ref={containerRef} className="section-full bg-[var(--color-bg)]" id="system-identity">
      <div className="w-full max-w-6xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center">
        <div className="flex flex-col items-center gap-8">
          <div className="section-label opacity-0 self-start">
            <span className="font-mono text-xs text-[var(--color-accent)] tracking-widest uppercase">{'>'} System Login — User Identified</span>
          </div>
          <div className="profile-section opacity-0">
            <ProfileCard avatarUrl="/profile.png" miniAvatarUrl="/profile.png" enableTilt={true} showUserInfo={true} name="Ankit Singh" title="Software Engineer" handle="ankitsingh794" status="Online" contactText="Contact" />
          </div>
        </div>
        <div className="flex flex-col gap-8 max-w-lg">
          <div className="name-text opacity-0">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-2">Ankit Singh</h2>
            <p className="font-mono text-[var(--color-accent)] text-sm tracking-wider">Software Development Engineer · System Thinker</p>
          </div>
          <div className="info-box opacity-0 bg-[var(--color-bg-elevated)] rounded-lg border border-[var(--color-border)] p-6 font-mono text-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--color-border)]">
              <span className="text-[var(--color-accent)]">ankit</span>
              <span className="text-[var(--color-text-muted)]">@</span>
              <span className="text-[var(--color-accent-blue)]">portfolio</span>
              <span className="text-[var(--color-text-muted)]">:~$</span>
              <span className="text-[var(--color-text-secondary)]">neofetch</span>
            </div>
            <div className="space-y-2">
              {neofetchLines.map((line) => (
                <div key={line.label} className="info-line opacity-0 flex gap-3">
                  <span className="text-[var(--color-accent-blue)] w-24 shrink-0">{line.label}:</span>
                  <span className="text-[var(--color-text-secondary)]">{line.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="section-divider h-[1px] bg-gradient-to-r from-[var(--color-accent)]/30 via-[var(--color-accent-blue)]/20 to-transparent origin-left" />
          <div className="space-y-5">
            {aboutParagraphs.map((para, i) => (
              <p key={i} className="about-para opacity-0 text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemIdentity;
