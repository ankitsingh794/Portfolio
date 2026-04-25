import React, { useRef } from 'react';
import useGSAP from '../../hooks/useGSAP';
import useMousePosition from '../../hooks/useMousePosition';
import { gsap } from '../../lib/gsap';
import LetterGlitch from '../ui/LetterGlitch';
import ScrambledText from '../ui/ScrambledText';

const bootLines = [
  { text: 'BIOS v2.4.1', status: 'OK', type: 'normal' },
  { text: 'Memory Test: 16384 MB', status: 'OK', type: 'normal' },
  { text: 'Loading kernel modules', status: '...', type: 'normal' },
  { text: 'Mounting filesystem', status: 'OK', type: 'normal' },
  { text: 'Initializing network stack', status: 'OK', type: 'normal' },
  { text: 'Loading user preferences', status: 'OK', type: 'normal' },
  { text: 'Connecting to reality.api', status: '...', type: 'normal' },
  { text: 'WARNING: impostor_syndrome.dll detected', status: 'WARN', type: 'warning' },
  { text: 'ERROR: reality.sys not found', status: 'FAIL', type: 'error' },
  { text: 'ERROR: expectations.dll corrupted', status: 'FAIL', type: 'error' },
  { text: 'PANIC: Too many unknowns in queue', status: '!!!', type: 'panic' },
  { text: '...', status: '', type: 'ellipsis' },
  { text: 'Retrying with experience.patch', status: '...', type: 'retry' },
  { text: 'System recovery initiated', status: 'OK', type: 'recovery' },
];

const BootSequence = () => {
  const mousePos = useMousePosition(32);
  const flashRef = useRef(null);

  const containerRef = useGSAP((container) => {
    const lines = container.querySelectorAll('.boot-line');
    const heroText = container.querySelector('.hero-text');
    const subText = container.querySelector('.sub-text');
    const flash = container.querySelector('.screen-flash');
    const introLines = container.querySelectorAll('.intro-line');
    const glitchBg = container.querySelector('.glitch-bg');

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
          end: isDesktop ? '+=400%' : 'bottom 10%',
          scrub: 0.8,
          pin: isDesktop,
          anticipatePin: isDesktop ? 1 : 0,
        },
      });

      // Phase 1: LetterGlitch bg fades out as we scroll, intro text fades
      tl.to(glitchBg, {
        opacity: 0,
        duration: 2,
        ease: 'power2.in',
      }, 0.5);

      introLines.forEach((line, i) => {
        tl.to(line, {
          opacity: 0,
          y: -30,
          duration: 0.5,
          ease: 'power2.in',
        }, 1 + i * 0.15);
      });

      // Phase 2: Boot lines appear one by one
      lines.forEach((line, i) => {
        const isError = line.classList.contains('error-line');
        const isPanic = line.classList.contains('panic-line');
        const isWarning = line.classList.contains('warning-line');

        tl.fromTo(line,
          { opacity: 0, x: isPanic ? -5 : 0 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
          2.5 + i * 0.4
        );

        if (isError || isWarning) {
          tl.to(line, { x: gsap.utils.random(-3, 3), duration: 0.1, yoyo: true, repeat: 3 }, 2.5 + i * 0.4 + 0.3);
        }

        if (isPanic) {
          tl.fromTo(flash,
            { opacity: 0 },
            { opacity: 0.4, duration: 0.08, yoyo: true, repeat: 1 },
            2.5 + i * 0.4
          );
        }
      });

      // Phase 3: Hero reveal
      const heroStart = 2.5 + lines.length * 0.4 + 1.5;

      tl.to(container.querySelector('.boot-lines'), {
        opacity: 0.15,
        y: -30,
        duration: 1,
        ease: 'power2.in',
      }, heroStart - 0.5);

      tl.fromTo(heroText,
        { opacity: 0, y: 40, filter: 'blur(12px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' },
        heroStart
      );

      tl.fromTo(subText,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        heroStart + 0.8
      );
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="section-full flex-col bg-[var(--color-bg)] overflow-hidden"
      id="boot-sequence"
    >
      {/* LetterGlitch Background */}
      <div className="glitch-bg absolute inset-0 z-0 opacity-40">
        <LetterGlitch
          glitchColors={['#0a2a1f', '#00ff9f', '#1a6fff']}
          glitchSpeed={70}
          outerVignette={true}
          centerVignette={true}
          smooth={true}
          characters="01アイウエオカキクケコ{}[]<>/\|:;?!@#$%^&*"
        />
      </div>

      {/* Screen Flash Effect */}
      <div
        ref={flashRef}
        className="screen-flash fixed inset-0 bg-white pointer-events-none z-50 opacity-0"
      />

      <div
        className="relative z-10 w-full max-w-3xl px-8"
        style={{
          transform: `translate(${mousePos.normalizedX * 2}px, ${mousePos.normalizedY * 1}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* Opening Narrative */}
        <div className="mb-16 text-center">
          <p className="intro-line font-mono text-sm text-[var(--color-text-muted)] mb-5 tracking-wider">
            {'>'} Every developer has a story.
          </p>
          <h1 className="intro-line text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-[var(--color-text-primary)]">The world is </span>
            <ScrambledText
              text="noisy."
              className="text-[var(--color-text-primary)]"
              trigger="mount"
              scrambleDuration={2000}
              scrambleSpeed={40}
              revealDelay={500}
            />
          </h1>
          <p className="intro-line text-xl md:text-2xl text-[var(--color-text-secondary)] font-light leading-relaxed">
            Systems break. Expectations crash.<br />
            <span className="text-[var(--color-text-muted)]">But that's where the story begins.</span>
          </p>
          <div className="intro-line mt-10">
            <span className="terminal-cursor" />
          </div>
        </div>

        {/* Boot Text Lines */}
        <div className="boot-lines font-mono text-xs md:text-sm space-y-2 mb-16">
          {bootLines.map((line, i) => (
            <div
              key={i}
              className={`boot-line opacity-0 flex items-center justify-between gap-4
                ${line.type === 'error' ? 'error-line text-[var(--color-error)]' : ''}
                ${line.type === 'panic' ? 'panic-line text-[var(--color-error)] font-bold' : ''}
                ${line.type === 'recovery' ? 'text-[var(--color-accent)]' : ''}
                ${line.type === 'normal' ? 'text-[var(--color-text-muted)]' : ''}
                ${line.type === 'retry' ? 'text-[var(--color-accent-blue)]' : ''}
                ${line.type === 'warning' ? 'warning-line text-yellow-400' : ''}
                ${line.type === 'ellipsis' ? 'text-[var(--color-text-muted)] text-center justify-center' : ''}
              `}
            >
              <span>{line.text}</span>
              {line.status && line.type !== 'ellipsis' && (
                <span className="flex items-center gap-1 shrink-0">
                  <span className="text-[var(--color-text-muted)] hidden md:inline">
                    {'·'.repeat(Math.max(2, 15 - Math.floor(line.text.length / 3)))}
                  </span>
                  <span className={`text-xs ${
                    line.status === 'OK' ? 'text-[var(--color-accent)]' :
                    line.status === 'FAIL' || line.status === '!!!' ? 'text-[var(--color-error)]' :
                    line.status === 'WARN' ? 'text-yellow-400' :
                    'text-[var(--color-text-muted)]'
                  }`}>
                    [{line.status}]
                  </span>
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Hero Message */}
        <div className="text-center">
          <h2
            className="hero-text opacity-0 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <span className="text-[var(--color-text-primary)]">But I know how to </span>
            <span className="text-[var(--color-accent)]">fix this.</span>
          </h2>
          <p className="sub-text opacity-0 text-base md:text-lg text-[var(--color-text-secondary)] font-mono">
            {'>'} system recovery in progress — loading engineer profile...
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 z-10">
        <span className="text-[0.65rem] font-mono text-[var(--color-text-muted)] tracking-widest">SCROLL TO BOOT</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-text-muted)] to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default BootSequence;
