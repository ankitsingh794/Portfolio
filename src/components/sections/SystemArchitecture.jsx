import React, { useRef } from 'react';
import useGSAP from '../../hooks/useGSAP';
import { gsap } from '../../lib/gsap';
import ScrambledText from '../ui/ScrambledText';

/* ── Architecture Data ── */

const layers = [
  {
    id: 'client',
    label: 'Client Layer',
    icon: '🖥',
    items: ['React SPA', 'GSAP Animations', 'Responsive UI'],
    color: 'var(--color-accent-blue)',
  },
  {
    id: 'api',
    label: 'API Gateway',
    icon: '⚡',
    items: ['Express.js', 'Rate Limiting', 'JWT Validation'],
    color: 'var(--color-accent-purple)',
  },
  {
    id: 'services',
    label: 'Service Layer',
    icon: '⚙️',
    items: ['Business Logic', 'WebSocket Handler', 'Auth Service'],
    color: 'var(--color-accent)',
  },
  {
    id: 'data',
    label: 'Data Layer',
    icon: '💾',
    items: ['MongoDB', 'Redis Cache', 'File Storage'],
    color: '#ff6b6b',
  },
];

const stats = [
  { label: 'API Response', value: 120, unit: 'ms', suffix: '<', icon: '⏱' },
  { label: 'Uptime', value: 99.9, unit: '%', suffix: '', icon: '🟢' },
  { label: 'Requests/min', value: 10000, unit: '', suffix: '', icon: '📊' },
  { label: 'Test Coverage', value: 85, unit: '%', suffix: '', icon: '✅' },
];

const principles = [
  { title: 'Separation of Concerns', desc: 'Each layer owns one responsibility. No leaking abstractions.' },
  { title: 'Cache-First Strategy', desc: 'Redis sits between service and database. Hot paths never hit disk.' },
  { title: 'Fail Gracefully', desc: 'Circuit breakers and fallbacks at every integration point.' },
  { title: 'Ship Incrementally', desc: 'Feature flags and incremental rollouts over big-bang deployments.' },
];

const SystemArchitecture = () => {
  const statRefs = useRef([]);

  const containerRef = useGSAP((container) => {
    const heading = container.querySelector('.arch-heading');
    const headingLine = container.querySelector('.heading-underline');
    const layerCards = container.querySelectorAll('.layer-card');
    const dataPackets = container.querySelectorAll('.data-packet');
    const statCards = container.querySelectorAll('.stat-card');
    const statNumbers = container.querySelectorAll('.stat-number');
    const principleCards = container.querySelectorAll('.principle-card');
    const quote = container.querySelector('.arch-quote');
    const diagramLabel = container.querySelector('.diagram-label');
    const principlesLabel = container.querySelector('.principles-label');
    const statsLabel = container.querySelector('.stats-label');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=750%',
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
      },
    });

    /* ── Phase 1: Heading (0 → 1.5) ── */
    tl.fromTo(heading,
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
      0
    );
    tl.fromTo(headingLine,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: 'power3.out' },
      0.8
    );

    /* ── Phase 2: Architecture diagram (2.5 → 6) ── */
    tl.fromTo(diagramLabel,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      2.5
    );

    layerCards.forEach((card, i) => {
      const fromX = i % 2 === 0 ? -60 : 60;
      tl.fromTo(card,
        { opacity: 0, x: fromX, scale: 0.9, filter: 'blur(5px)' },
        { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
        3 + i * 0.6
      );
    });

    dataPackets.forEach((packet, i) => {
      tl.fromTo(packet,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        5.5 + i * 0.2
      );
    });

    /* ── Phase 3: Stats (7 → 10) ── */
    tl.fromTo(statsLabel,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      7
    );

    statCards.forEach((card, i) => {
      tl.fromTo(card,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' },
        7.8 + i * 0.4
      );
    });

    statNumbers.forEach((el, i) => {
      const target = stats[i].value;
      const obj = { val: 0 };
      tl.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          if (el) {
            el.textContent = target % 1 !== 0
              ? obj.val.toFixed(1)
              : Math.round(obj.val).toLocaleString();
          }
        },
      }, 8 + i * 0.4);
    });

    /* ── Phase 4: Principles (10.5 → 13) ── */
    tl.fromTo(principlesLabel,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      10.5
    );

    principleCards.forEach((card, i) => {
      tl.fromTo(card,
        { opacity: 0, y: 25, x: i % 2 === 0 ? -20 : 20 },
        { opacity: 1, y: 0, x: 0, duration: 0.8, ease: 'power3.out' },
        11 + i * 0.5
      );
    });

    /* ── Phase 5: Quote (13.5 → 15) ── */
    tl.fromTo(quote,
      { opacity: 0, y: 30, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' },
      13.5
    );

  }, []);

  return (
    <section
      ref={containerRef}
      className="section-full flex-col bg-[var(--color-bg)] overflow-hidden"
      id="system-architecture"
    >
      <div className="w-full max-w-5xl px-6 md:px-10">

        {/* ── Heading ── */}
        <div className="mb-14 text-center">
          <div className="arch-heading opacity-0">
            <span className="font-mono text-xs text-[var(--color-accent)] tracking-widest uppercase block mb-5">
              {'>'} cat /etc/architecture.conf
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text-primary)] mb-4">
              How I <ScrambledText text="Engineer" className="text-[var(--color-accent)]" trigger="hover" scrambleDuration={1000} />
            </h2>
            <p className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-lg mx-auto leading-relaxed">
              Not just writing code — designing systems that scale, endure, and fail gracefully.
            </p>
          </div>
          <div className="heading-underline h-[2px] w-32 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-blue)] mx-auto mt-8 origin-center" />
        </div>

        {/* ── Architecture Diagram ── */}
        <div className="diagram-label opacity-0 mb-10">
          <span className="font-mono text-xs text-[var(--color-accent-blue)] tracking-widest uppercase">
            {'>'} System Topology — Layered Architecture
          </span>
        </div>

        <div className="relative w-full mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {layers.map((layer, i) => (
              <div
                key={layer.id}
                className="layer-card opacity-0 relative group"
              >
                <div
                  className="relative bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-7 hover:border-opacity-60 transition-all duration-500 group-hover:shadow-lg"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = layer.color + '60';
                    e.currentTarget.style.boxShadow = `0 0 30px ${layer.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  {/* Layer number badge */}
                  <div
                    className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-[0.65rem] font-mono font-bold border"
                    style={{
                      backgroundColor: layer.color + '15',
                      borderColor: layer.color + '40',
                      color: layer.color,
                    }}
                  >
                    L{i}
                  </div>

                  {/* Icon + Label */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{layer.icon}</span>
                    <h3
                      className="font-semibold text-lg"
                      style={{ color: layer.color }}
                    >
                      {layer.label}
                    </h3>
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    {layer.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-3 font-mono text-sm">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: layer.color }}
                        />
                        <span className="text-[var(--color-text-secondary)]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Animated data packets */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden">
            {[0, 1, 2].map((i) => (
              <div
                key={`packet-${i}`}
                className="data-packet opacity-0 absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: layers[i].color,
                  boxShadow: `0 0 10px ${layers[i].color}`,
                  top: `${30 + i * 20}%`,
                  left: `${15 + i * 25}%`,
                  animation: `packet-flow-${i} ${3 + i * 0.5}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Performance Stats ── */}
        <div className="stats-label opacity-0 mb-10">
          <span className="font-mono text-xs text-[var(--color-accent)] tracking-widest uppercase">
            {'>'} Performance Benchmarks
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card opacity-0 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-7 text-center hover:border-[var(--color-accent)]/30 transition-all duration-300 group"
            >
              <span className="text-2xl block mb-4">{stat.icon}</span>
              <div className="flex items-baseline justify-center gap-1 mb-3">
                <span className="font-mono text-xs text-[var(--color-text-muted)]">{stat.suffix}</span>
                <span
                  ref={el => { statRefs.current[i] = el; }}
                  className="stat-number font-mono text-3xl md:text-4xl font-bold text-[var(--color-accent)] tabular-nums"
                >
                  0
                </span>
                <span className="font-mono text-sm text-[var(--color-text-muted)]">{stat.unit}</span>
              </div>
              <span className="font-mono text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-colors">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Engineering Principles ── */}
        <div className="principles-label opacity-0 mb-10">
          <span className="font-mono text-xs text-[var(--color-accent-purple)] tracking-widest uppercase">
            {'>'} Engineering Principles
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className="principle-card opacity-0 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-7 hover:border-[var(--color-accent-purple)]/30 transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-purple)]/10 border border-[var(--color-accent-purple)]/20 flex items-center justify-center shrink-0 font-mono text-sm text-[var(--color-accent-purple)] font-bold">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                    {p.title}
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Quote ── */}
        <div className="arch-quote opacity-0 text-center py-8">
          <blockquote className="inline-block max-w-xl">
            <p className="text-3xl md:text-4xl text-[var(--color-text-primary)] font-light italic leading-relaxed">
              "Good UI is visible.<br />
              Great systems are{' '}
              <span className="text-[var(--color-accent)] font-normal not-italic">invisible</span>."
            </p>
            <div className="mt-8 h-[2px] w-16 bg-gradient-to-r from-[var(--color-accent)] to-transparent mx-auto" />
          </blockquote>
        </div>

      </div>

      {/* Keyframe animations for data packets */}
      <style>{`
        @keyframes packet-flow-0 {
          0%, 100% { transform: translate(0, 0); opacity: 0.8; }
          50% { transform: translate(calc(20vw), -20px); opacity: 1; }
        }
        @keyframes packet-flow-1 {
          0%, 100% { transform: translate(0, 0); opacity: 0.8; }
          50% { transform: translate(calc(15vw), 15px); opacity: 1; }
        }
        @keyframes packet-flow-2 {
          0%, 100% { transform: translate(0, 0); opacity: 0.8; }
          50% { transform: translate(calc(10vw), -10px); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default SystemArchitecture;
