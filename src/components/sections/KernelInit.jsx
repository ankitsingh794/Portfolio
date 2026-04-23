import React from 'react';
import useGSAP from '../../hooks/useGSAP';
import { gsap } from '../../lib/gsap';
import { skillModules } from '../../data/timeline';
import ScrambledText from '../ui/ScrambledText';

const KernelInit = () => {
  const containerRef = useGSAP((container) => {
    const modules = container.querySelectorAll('.module-row');
    const heading = container.querySelector('.section-heading');
    const headingDesc = container.querySelector('.section-heading-desc');
    const controlText = container.querySelector('.control-text');
    const controlSub = container.querySelector('.control-sub');
    const summary = container.querySelector('.kernel-summary');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=350%',
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Phase 1: Heading
    tl.fromTo(heading,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      0
    );

    tl.fromTo(headingDesc,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      0.4
    );

    // Phase 2: Each module loads sequentially (well-spaced)
    modules.forEach((mod, i) => {
      const bar = mod.querySelector('.module-bar');
      const check = mod.querySelector('.module-check');

      tl.fromTo(mod,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
        1.5 + i * 0.35
      );

      tl.fromTo(bar,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: 'power3.out' },
        1.7 + i * 0.35
      );

      tl.fromTo(check,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(1.7)' },
        2.0 + i * 0.35
      );
    });

    // Phase 3: Summary + Statement (starts well after modules)
    const phase3Start = 1.5 + modules.length * 0.35 + 2;

    tl.fromTo(summary,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      phase3Start
    );

    tl.fromTo(controlText,
      { opacity: 0, y: 30, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
      phase3Start + 1.2
    );

    tl.fromTo(controlSub,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      phase3Start + 2
    );

  }, []);

  return (
    <section
      ref={containerRef}
      className="section-full flex-col bg-[var(--color-bg)]"
      id="kernel-init"
    >
      <div className="w-full max-w-2xl px-6 md:px-8">
        {/* Section Label */}
        <div className="section-heading opacity-0 mb-3">
          <span className="font-mono text-xs text-[var(--color-accent)] tracking-widest uppercase">
            {'>'} Kernel Initialization
          </span>
        </div>
        <p className="section-heading-desc opacity-0 text-sm md:text-base text-[var(--color-text-secondary)] mb-12 max-w-lg">
          Loading the tools that keep the system alive. Every module is battle-tested.
        </p>

        {/* Module Loading List */}
        <div className="space-y-4 mb-14">
          {skillModules.map((mod) => (
            <div key={mod.name} className="module-row opacity-0 flex items-center gap-3 md:gap-4 font-mono text-xs md:text-sm">
              <span className="text-[var(--color-accent-blue)] w-12 shrink-0">[LOAD]</span>
              <span className="text-[var(--color-text-secondary)] w-40 md:w-48 shrink-0 truncate">
                {mod.name}
              </span>
              <div className="flex-1 h-1 bg-[var(--color-border)] rounded-full overflow-hidden">
                <div
                  className="module-bar h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-blue)] rounded-full origin-left"
                  style={{ transformOrigin: 'left' }}
                />
              </div>
              <span className="module-check opacity-0 text-[var(--color-accent)] text-sm w-6 text-center">
                ✓
              </span>
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="kernel-summary opacity-0 flex flex-wrap gap-8 mb-14 py-5 px-6 bg-[var(--color-bg-elevated)] rounded-lg border border-[var(--color-border)]">
          <div>
            <span className="font-mono text-xs text-[var(--color-text-muted)] block mb-1">Modules</span>
            <span className="font-mono text-lg text-[var(--color-accent)]">{skillModules.length}</span>
            <span className="font-mono text-xs text-[var(--color-text-muted)]"> loaded</span>
          </div>
          <div>
            <span className="font-mono text-xs text-[var(--color-text-muted)] block mb-1">Warnings</span>
            <span className="font-mono text-lg text-yellow-400">0</span>
          </div>
          <div>
            <span className="font-mono text-xs text-[var(--color-text-muted)] block mb-1">Errors</span>
            <span className="font-mono text-lg text-[var(--color-accent)]">0</span>
          </div>
          <div>
            <span className="font-mono text-xs text-[var(--color-text-muted)] block mb-1">Status</span>
            <span className="font-mono text-lg text-[var(--color-accent)]">READY</span>
          </div>
        </div>

        {/* Control Text */}
        <div className="text-center">
          <h2 className="control-text opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="text-[var(--color-text-primary)]">I build </span>
            <ScrambledText text="control." className="text-[var(--color-accent)]" trigger="hover" scrambleDuration={800} />
          </h2>
          <p className="control-sub opacity-0 text-base md:text-lg text-[var(--color-text-secondary)] max-w-md mx-auto">
            Not just knowing tools — understanding when and why to use each one.
          </p>
        </div>
      </div>
    </section>
  );
};

export default KernelInit;
