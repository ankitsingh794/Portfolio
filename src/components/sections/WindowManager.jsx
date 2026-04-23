import React, { useState, useRef } from 'react';
import useGSAP from '../../hooks/useGSAP';
import { gsap } from '../../lib/gsap';
import { projects } from '../../data/projects';

const WindowManager = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const iframeRefs = useRef([]);

  const containerRef = useGSAP((container) => {
    const projectEls = container.querySelectorAll('.project-window');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=500%`,
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * projects.length),
            projects.length - 1
          );
          setActiveIndex(idx);
        },
      },
    });

    projectEls.forEach((el, i) => {
      const title = el.querySelector('.project-title');
      const desc = el.querySelector('.project-desc');
      const techBadges = el.querySelectorAll('.tech-badge');
      const buttons = el.querySelector('.project-buttons');
      const windowFrame = el.querySelector('.window-frame');
      const counter = el.querySelector('.project-counter');
      const features = el.querySelector('.project-features');

      const seg = 1 / projects.length;
      const start = i * seg;
      const mid = start + seg * 0.2;
      const end = start + seg;

      if (i === 0) {
        tl.set(el, { opacity: 1, y: 0, scale: 1, visibility: 'visible' }, 0);
      } else {
        tl.fromTo(el,
          { opacity: 0, y: 80, scale: 0.95, visibility: 'hidden' },
          { opacity: 1, y: 0, scale: 1, visibility: 'visible', duration: seg * 0.3, ease: 'power3.out' },
          mid - seg * 0.15
        );
      }

      if (windowFrame) {
        tl.fromTo(windowFrame,
          { opacity: 0, y: 20, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: seg * 0.25, ease: 'power3.out' },
          mid - seg * 0.05
        );
      }

      if (counter) tl.fromTo(counter, { opacity: 0 }, { opacity: 1, duration: seg * 0.15 }, mid);
      tl.fromTo(title, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: seg * 0.2 }, mid + seg * 0.03);
      tl.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: seg * 0.15 }, mid + seg * 0.08);
      if (features) tl.fromTo(features, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: seg * 0.12 }, mid + seg * 0.1);
      tl.fromTo(techBadges, { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.02, duration: seg * 0.12 }, mid + seg * 0.13);
      if (buttons) tl.fromTo(buttons, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: seg * 0.12 }, mid + seg * 0.17);

      if (i < projects.length - 1) {
        tl.to(el,
          { opacity: 0, y: -80, scale: 0.95, visibility: 'hidden', duration: seg * 0.3, ease: 'power3.in' },
          end - seg * 0.3
        );
      }
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="section-full flex-col bg-[var(--color-bg)] relative"
      id="window-manager"
    >
      {/* Section Label */}
      <div className="absolute top-10 left-6 md:left-10 z-10">
        <span className="font-mono text-xs text-[var(--color-accent)] tracking-widest uppercase">
          {'>'} Window Manager — Running Apps
        </span>
      </div>

      {/* Progress Dots */}
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {projects.map((p, i) => (
          <div key={p.title} className="flex items-center gap-3">
            <span className={`font-mono text-[0.65rem] transition-all duration-300 ${
              i === activeIndex ? 'opacity-100 text-[var(--color-accent)]' : 'opacity-0'
            }`}>
              {p.title}
            </span>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'bg-[var(--color-accent)] scale-125 shadow-[0_0_10px_rgba(0,255,159,0.5)]'
                : i < activeIndex
                  ? 'bg-[var(--color-accent)]/40'
                  : 'bg-[var(--color-border)]'
            }`} />
          </div>
        ))}
      </div>

      {/* Projects — all absolutely positioned in the same container */}
      <div className="relative w-full max-w-6xl px-6 md:px-10 mx-auto flex items-center justify-center">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className={`project-window w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
              i === 0 ? '' : 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-6 md:px-10'
            }`}
            style={{
              opacity: i === 0 ? 1 : 0,
              visibility: i === 0 ? 'visible' : 'hidden',
            }}
          >
            {/* Left: Preview window */}
            <div
              className="window-frame window-chrome w-full"
              style={{ background: project.windowColor }}
            >
              <div className="window-titlebar">
                <div className="window-dot window-dot--red" />
                <div className="window-dot window-dot--yellow" />
                <div className="window-dot window-dot--green" />
                <span className="window-title">{project.title.toLowerCase()}.app</span>
              </div>
              <div className="window-content relative w-full aspect-[16/10]">
                {project.liveUrl ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-surface)] to-[var(--color-bg)] flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
                        <span className="font-mono text-xs text-[var(--color-text-muted)]">Loading preview...</span>
                      </div>
                    </div>
                    <iframe
                      ref={el => { iframeRefs.current[i] = el; }}
                      src={i === activeIndex || Math.abs(i - activeIndex) <= 1 ? project.liveUrl : undefined}
                      title={`${project.title} preview`}
                      className="relative z-10 w-full h-full border-0"
                      sandbox="allow-scripts allow-same-origin"
                      loading="lazy"
                      style={{ pointerEvents: 'none' }}
                    />
                  </>
                ) : (
                  /* Fallback for projects without live URL */
                  <div className="w-full h-full bg-gradient-to-br from-[var(--color-bg-surface)] via-[#1a1a3e] to-[var(--color-bg)] flex items-center justify-center p-8">
                    <div className="text-center max-w-sm">
                      <div className="w-14 h-14 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] flex items-center justify-center mx-auto mb-5">
                        <span className="font-mono text-2xl text-[var(--color-accent-blue)]">📦</span>
                      </div>
                      <p className="font-mono text-xs text-[var(--color-accent-blue)] mb-3 uppercase tracking-wider">Source Available</p>
                      <p className="text-base text-[var(--color-text-secondary)] mb-5 leading-relaxed">{project.description}</p>
                      {project.features && (
                        <div className="text-left space-y-2 mb-5">
                          {project.features.map((f, fi) => (
                            <div key={fi} className="flex items-center gap-2 font-mono text-xs text-[var(--color-text-muted)]">
                              <span className="text-[var(--color-accent)]">✓</span>
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-sm text-[var(--color-accent)] hover:underline"
                      >
                        <span>View source on GitHub</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col justify-center gap-5">
              <span className="project-counter opacity-0 font-mono text-xs text-[var(--color-text-muted)]">
                Project {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>

              <h3 className="project-title opacity-0 text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">
                {project.title}
              </h3>

              <p className="project-desc opacity-0 text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
                {project.description}
              </p>

              {/* Feature highlights if present */}
              {project.features && (
                <div className="project-features opacity-0 space-y-2">
                  {project.features.map((f, fi) => (
                    <div key={fi} className="flex items-start gap-2">
                      <span className="text-[var(--color-accent)] mt-0.5">›</span>
                      <span className="text-sm text-[var(--color-text-secondary)]">{f}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mt-1">
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="tech-badge opacity-0 font-mono text-xs px-4 py-2 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] bg-[var(--color-bg-surface)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] transition-colors duration-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="project-buttons opacity-0 flex gap-4 mt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm px-8 py-3 rounded-lg bg-[var(--color-accent)] text-[var(--color-bg)] font-semibold hover:shadow-[0_0_25px_rgba(0,255,159,0.3)] transition-all duration-300 hover:scale-105"
                  >
                    Open Live ↗
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm px-8 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 hover:scale-105"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WindowManager;
