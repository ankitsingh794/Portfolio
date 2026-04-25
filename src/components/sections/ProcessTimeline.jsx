import React from 'react';
import useGSAP from '../../hooks/useGSAP';
import { gsap } from '../../lib/gsap';
import { timelineSteps } from '../../data/timeline';

const ProcessTimeline = () => {
  const containerRef = useGSAP((container) => {
    const track = container.querySelector('.timeline-track');
    const cards = container.querySelectorAll('.process-card');
    const heading = container.querySelector('.tl-heading');
    const desc = container.querySelector('.tl-desc');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=600%`,
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Phase 1: Heading
    tl.fromTo(heading, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0);
    tl.fromTo(desc, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5);

    // Phase 2: Scroll track horizontally (more space per card)
    const trackWidth = (cards.length - 1) * 420;
    tl.to(track, { x: -trackWidth, duration: cards.length * 3, ease: 'none' }, 1.5);

    cards.forEach((card, i) => {
      const dot = card.querySelector('.status-dot');
      const bar = card.querySelector('.process-bar-fill');
      const cardStart = 1.5 + (i / cards.length) * cards.length * 3;

      tl.fromTo(card, { opacity: 0.2, scale: 0.88 }, { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }, cardStart);
      tl.fromTo(dot, { scale: 0 }, { scale: 1, backgroundColor: '#00ff9f', duration: 0.5, ease: 'back.out(1.7)' }, cardStart + 0.3);
      tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power3.out' }, cardStart + 0.5);

      if (i < cards.length - 1) {
        tl.to(card, { opacity: 0.15, scale: 0.85, duration: 1 }, cardStart + 2.5);
      }
    });
  }, []);

  return (
    <section ref={containerRef} className="section-full flex-col bg-bg overflow-hidden" id="process-timeline">
      <div className="px-6 md:px-8 w-full max-w-6xl mx-auto mb-14">
        <div className="tl-heading opacity-0">
          <span className="font-mono text-xs text-[var(--color-accent)] tracking-widest uppercase block mb-3">
            {'>'} Process Manager — Journey Log
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">The Journey</h2>
        </div>
        <p className="tl-desc opacity-0 text-base md:text-lg text-[var(--color-text-secondary)] mt-4 max-w-xl">
          From first commit to production deployments. Every phase built on the failures of the last.
        </p>
      </div>

      <div className="relative w-full overflow-visible">
        <div className="absolute top-1/2 left-0 w-[300%] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent -translate-y-1/2" />
        <div className="timeline-track flex gap-8 md:gap-10 pl-[30vw]" style={{ width: 'max-content' }}>
          {timelineSteps.map((step) => (
            <div key={step.pid} className="process-card opacity-20 shrink-0 w-[320px] md:w-[380px] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6 md:p-8 relative" style={{ transform: 'scale(0.88)' }}>
              <div className="status-dot absolute -top-3 left-6 w-6 h-6 rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-text-muted)]" style={{ transform: 'scale(0)' }} />
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[var(--color-text-muted)]">PID {step.pid}</span>
                <span className={`font-mono text-xs px-2 py-0.5 rounded ${step.status === 'RUNNING' ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)]'}`}>{step.status}</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{step.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{step.title}</h3>
                  <span className="font-mono text-xs text-[var(--color-accent)] uppercase">{step.phase}</span>
                </div>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] my-4 leading-relaxed">{step.description}</p>
              <div className="w-full h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
                <div className="process-bar-fill h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-blue)] rounded-full origin-left" />
              </div>
              <span className="font-mono text-xs text-[var(--color-text-muted)] mt-2 block text-right">{step.progress}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
