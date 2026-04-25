import React from 'react';
import useGSAP from '../../hooks/useGSAP';
import { gsap } from '../../lib/gsap';
import { skillModules } from '../../data/timeline';
import ScrambledText from '../ui/ScrambledText';

/* ── Split modules by status ── */
const loadedModules = skillModules.filter(m => m.status === 'loaded');
const learningModules = skillModules.filter(m => m.status === 'learning');

/* ── Category groups (proven only) ── */
const moduleCategories = [
  {
    label: 'Core',
    color: 'var(--color-accent)',
    modules: ['javascript.core', 'react.mod'],
  },
  {
    label: 'Backend',
    color: 'var(--color-accent-blue)',
    modules: ['node.runtime', 'express.framework', 'socketio.realtime'],
  },
  {
    label: 'Data',
    color: 'var(--color-accent-purple)',
    modules: ['mongodb.driver', 'redis.cache'],
  },
  {
    label: 'Platform',
    color: '#f0b232',
    modules: ['jira-forge.plugin', 'atlassian.sdk'],
  },
];

const getModuleByName = (name) => skillModules.find(m => m.name === name);

const KernelInit = () => {
  const containerRef = useGSAP((container) => {
    const heading = container.querySelector('.section-heading');
    const headingDesc = container.querySelector('.section-heading-desc');
    const categories = container.querySelectorAll('.module-category');
    const moduleTiles = container.querySelectorAll('.module-tile');
    const warningSection = container.querySelector('.warning-section');
    const warningTiles = container.querySelectorAll('.warning-tile');
    const controlText = container.querySelector('.control-text');
    const controlSub = container.querySelector('.control-sub');
    const summary = container.querySelector('.kernel-summary');

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
          end: isDesktop ? '+=550%' : 'bottom 10%',
          scrub: 0.8,
          pin: isDesktop,
          anticipatePin: isDesktop ? 1 : 0,
        },
      });

      /* Phase 1: Heading */
      tl.fromTo(heading,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
        0
      );
      tl.fromTo(headingDesc,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        0.5
      );

      /* Phase 2: Loaded categories */
      categories.forEach((cat, i) => {
        tl.fromTo(cat,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          1.5 + i * 0.5
        );
      });

      /* Phase 3: Module tiles pop in */
      moduleTiles.forEach((tile, i) => {
        tl.fromTo(tile,
          { opacity: 0, scale: 0.85, y: 10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.4)' },
          2 + i * 0.1
        );
      });

      /* Phase 4: Warning section + tiles */
      const warningStart = 2 + moduleTiles.length * 0.1 + 1.5;

      tl.fromTo(warningSection,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        warningStart
      );

      warningTiles.forEach((tile, i) => {
        tl.fromTo(tile,
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' },
          warningStart + 0.4 + i * 0.15
        );
      });

      /* Phase 5: Summary + Statement */
      const phase5Start = warningStart + 0.4 + warningTiles.length * 0.15 + 1.5;

      tl.fromTo(summary,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        phase5Start
      );

      tl.fromTo(controlText,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
        phase5Start + 1.2
      );

      tl.fromTo(controlSub,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        phase5Start + 2
      );
    });

  }, []);

  return (
    <section
      ref={containerRef}
      className="section-full flex-col bg-[var(--color-bg)]"
      id="kernel-init"
    >
      <div className="w-full max-w-5xl px-6 md:px-12">

        {/* ── Heading ── */}
        <div className="text-center mb-20">
          <div className="section-heading opacity-0">
            <span className="font-mono text-xs text-[var(--color-accent)] tracking-widest uppercase block mb-5">
              {'>'} sudo modprobe --all
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] mb-4">
              Kernel <ScrambledText text="Initialization" className="text-[var(--color-accent)]" trigger="hover" scrambleDuration={1000} />
            </h2>
          </div>
          <p className="section-heading-desc opacity-0 text-base text-[var(--color-text-secondary)] max-w-lg mx-auto leading-relaxed">
            Only what ships. Only what I can defend 3 levels deep.
          </p>
        </div>

        {/* ── Loaded Modules ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {moduleCategories.map((category) => (
            <div
              key={category.label}
              className="module-category opacity-0 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-8 transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = category.color + '40';
                e.currentTarget.style.boxShadow = `0 0 25px ${category.color}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-6 pb-5 border-b border-[var(--color-border)]">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: category.color, boxShadow: `0 0 10px ${category.color}60` }}
                />
                <span className="font-mono text-sm tracking-wider uppercase font-medium" style={{ color: category.color }}>
                  {category.label}
                </span>
                <span className="ml-auto font-mono text-xs text-[var(--color-accent)] font-bold">[OK]</span>
              </div>

              {/* Module tiles */}
              <div className="flex flex-wrap gap-3">
                {category.modules.map((modName) => {
                  const mod = getModuleByName(modName);
                  if (!mod) return null;
                  return (
                    <div
                      key={mod.name}
                      className="module-tile opacity-0 px-5 py-3 rounded-xl border font-mono text-sm transition-all duration-200 cursor-default hover:scale-105"
                      style={{
                        borderColor: category.color + '25',
                        backgroundColor: category.color + '08',
                        color: 'var(--color-text-secondary)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = category.color + '60';
                        e.currentTarget.style.color = category.color;
                        e.currentTarget.style.backgroundColor = category.color + '15';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = category.color + '25';
                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                        e.currentTarget.style.backgroundColor = category.color + '08';
                      }}
                    >
                      {mod.label}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Learning Modules (Warnings) ── */}
        <div className="warning-section opacity-0 bg-[var(--color-bg-elevated)] border border-yellow-400/20 rounded-2xl p-8 mb-16">
          <div className="flex items-center gap-4 mb-6 pb-5 border-b border-yellow-400/15">
            <span className="text-yellow-400 text-lg">⚠</span>
            <span className="font-mono text-sm tracking-wider uppercase text-yellow-400 font-medium">
              Under Development — Loading...
            </span>
            <span className="ml-auto font-mono text-xs text-yellow-400 font-bold">[WARN]</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {learningModules.map((mod) => (
              <div
                key={mod.name}
                className="warning-tile opacity-0 px-5 py-3 rounded-xl border font-mono text-sm transition-all duration-200 cursor-default hover:scale-105"
                style={{
                  borderColor: 'rgba(250, 204, 21, 0.15)',
                  backgroundColor: 'rgba(250, 204, 21, 0.04)',
                  color: 'var(--color-text-muted)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(250, 204, 21, 0.4)';
                  e.currentTarget.style.color = 'rgb(250, 204, 21)';
                  e.currentTarget.style.backgroundColor = 'rgba(250, 204, 21, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(250, 204, 21, 0.15)';
                  e.currentTarget.style.color = 'var(--color-text-muted)';
                  e.currentTarget.style.backgroundColor = 'rgba(250, 204, 21, 0.04)';
                }}
              >
                {mod.label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Summary ── */}
        <div className="kernel-summary opacity-0 flex justify-center gap-14 mb-16 py-7 px-8 bg-[var(--color-bg-elevated)] rounded-2xl border border-[var(--color-border)]">
          <div className="text-center">
            <span className="font-mono text-xs text-[var(--color-text-muted)] block mb-2">Loaded</span>
            <span className="font-mono text-2xl text-[var(--color-accent)] font-bold">{loadedModules.length}</span>
          </div>
          <div className="text-center">
            <span className="font-mono text-xs text-[var(--color-text-muted)] block mb-2">Warnings</span>
            <span className="font-mono text-2xl text-yellow-400 font-bold">{learningModules.length}</span>
          </div>
          <div className="text-center">
            <span className="font-mono text-xs text-[var(--color-text-muted)] block mb-2">Errors</span>
            <span className="font-mono text-2xl text-[var(--color-accent)] font-bold">0</span>
          </div>
          <div className="text-center">
            <span className="font-mono text-xs text-[var(--color-text-muted)] block mb-2">Status</span>
            <span className="font-mono text-2xl text-[var(--color-accent)] font-bold">READY</span>
          </div>
        </div>

        {/* ── Statement ── */}
        <div className="text-center">
          <h2 className="control-text opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            <span className="text-[var(--color-text-primary)]">I build </span>
            <ScrambledText text="control." className="text-[var(--color-accent)]" trigger="hover" scrambleDuration={800} />
          </h2>
          <p className="control-sub opacity-0 text-base md:text-lg text-[var(--color-text-secondary)] max-w-md mx-auto leading-relaxed">
            Not just knowing tools — understanding when and why to use each one.
          </p>
        </div>

      </div>
    </section>
  );
};

export default KernelInit;
