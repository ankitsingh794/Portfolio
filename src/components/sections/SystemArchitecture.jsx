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
    y: 0,
  },
  {
    id: 'api',
    label: 'API Gateway',
    icon: '⚡',
    items: ['Express.js', 'Rate Limiting', 'JWT Validation'],
    color: 'var(--color-accent-purple)',
    y: 1,
  },
  {
    id: 'services',
    label: 'Service Layer',
    icon: '⚙️',
    items: ['Business Logic', 'WebSocket Handler', 'Auth Service'],
    color: 'var(--color-accent)',
    y: 2,
  },
  {
    id: 'data',
    label: 'Data Layer',
    icon: '💾',
    items: ['MongoDB', 'Redis Cache', 'File Storage'],
    color: '#ff6b6b',
    y: 3,
  },
];

const flowPaths = [
  { from: 0, to: 1, label: 'HTTPS' },
  { from: 1, to: 2, label: 'Internal' },
  { from: 2, to: 3, label: 'Query' },
  { from: 3, to: 2, label: 'Response' },
  { from: 2, to: 1, label: 'Result' },
  { from: 1, to: 0, label: 'JSON' },
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
    const flowArrows = container.querySelectorAll('.flow-arrow');
    const flowLabels = container.querySelectorAll('.flow-label');
    const dataPackets = container.querySelectorAll('.data-packet');
    const statCards = container.querySelectorAll('.stat-card');
    const statNumbers = container.querySelectorAll('.stat-number');
    const principleCards = container.querySelectorAll('.principle-card');
    const quote = container.querySelector('.arch-quote');
    const diagramLabel = container.querySelector('.diagram-label');
    const principlesLabel = container.querySelector('.principles-label');
    const statsLabel = container.querySelector('.stats-label');
    const ringPulse = container.querySelectorAll('.ring-pulse');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=700%',
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
      },
    });

    /* ── Phase 1: Heading reveal ── */
    tl.fromTo(heading,
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
      0
    );
    tl.fromTo(headingLine,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: 'power3.out' },
      0.5
    );

    /* ── Phase 2: Architecture diagram ── */
    tl.fromTo(diagramLabel,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      2
    );

    // Layer cards stagger in from alternating sides
    layerCards.forEach((card, i) => {
      const fromX = i % 2 === 0 ? -60 : 60;
      tl.fromTo(card,
        { opacity: 0, x: fromX, scale: 0.9, filter: 'blur(5px)' },
        { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
        2.5 + i * 0.6
      );
    });

    // Pulsing rings appear on each layer
    ringPulse.forEach((ring, i) => {
      tl.fromTo(ring,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' },
        2.8 + i * 0.6
      );
    });

    // Flow arrows draw in
    flowArrows.forEach((arrow, i) => {
      const len = arrow.getTotalLength ? arrow.getTotalLength() : 100;
      gsap.set(arrow, { strokeDasharray: len, strokeDashoffset: len });
      tl.to(arrow,
        { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' },
        5 + i * 0.3
      );
    });

    // Flow labels fade in
    flowLabels.forEach((label, i) => {
      tl.fromTo(label,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4 },
        5.3 + i * 0.3
      );
    });

    // Data packets start animating (continuous after reveal)
    dataPackets.forEach((packet, i) => {
      tl.fromTo(packet,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        7 + i * 0.2
      );
    });

    /* ── Phase 3: Stats with counter animation ── */
    const statsStart = 9;
    tl.fromTo(statsLabel,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      statsStart
    );

    statCards.forEach((card, i) => {
      tl.fromTo(card,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' },
        statsStart + 0.5 + i * 0.3
      );
    });

    // Animate stat numbers from 0 to target
    statNumbers.forEach((el, i) => {
      const target = stats[i].value;
      const obj = { val: 0 };
      tl.to(obj, {
        val: target,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          if (el) {
            el.textContent = target % 1 !== 0
              ? obj.val.toFixed(1)
              : Math.round(obj.val).toLocaleString();
          }
        },
      }, statsStart + 0.8 + i * 0.3);
    });

    /* ── Phase 4: Engineering Principles ── */
    const principlesStart = 12;
    tl.fromTo(principlesLabel,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      principlesStart
    );

    principleCards.forEach((card, i) => {
      tl.fromTo(card,
        { opacity: 0, y: 25, x: i % 2 === 0 ? -20 : 20 },
        { opacity: 1, y: 0, x: 0, duration: 0.6, ease: 'power3.out' },
        principlesStart + 0.5 + i * 0.4
      );
    });

    /* ── Phase 5: Quote ── */
    tl.fromTo(quote,
      { opacity: 0, y: 30, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' },
      principlesStart + 0.5 + principles.length * 0.4 + 1.5
    );

  }, []);

  // SVG helpers for flow arrows
  const arrowYPositions = [85, 170, 255, 255, 170, 85];
  const arrowDirections = [1, 1, 1, -1, -1, -1]; // 1 = right, -1 = left

  return (
    <section
      ref={containerRef}
      className="section-full flex-col bg-[var(--color-bg)] overflow-hidden"
      id="system-architecture"
    >
      <div className="w-full max-w-6xl px-6 md:px-10">

        {/* ── Heading ── */}
        <div className="mb-16 text-center">
          <div className="arch-heading opacity-0">
            <span className="font-mono text-xs text-[var(--color-accent)] tracking-widest uppercase block mb-4">
              {'>'} cat /etc/architecture.conf
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text-primary)] mb-3">
              How I <ScrambledText text="Engineer" className="text-[var(--color-accent)]" trigger="hover" scrambleDuration={1000} />
            </h2>
            <p className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-lg mx-auto">
              Not just writing code — designing systems that scale, endure, and fail gracefully.
            </p>
          </div>
          <div className="heading-underline h-[2px] w-32 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-blue)] mx-auto mt-6 origin-center" />
        </div>

        {/* ── Architecture Diagram ── */}
        <div className="diagram-label opacity-0 mb-8">
          <span className="font-mono text-xs text-[var(--color-accent-blue)] tracking-widest uppercase">
            {'>'} System Topology — Layered Architecture
          </span>
        </div>

        <div className="relative w-full mb-20">
          {/* Layer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {layers.map((layer, i) => (
              <div
                key={layer.id}
                className="layer-card opacity-0 relative group"
              >
                {/* Pulsing ring behind */}
                <div
                  className="ring-pulse opacity-0 absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle, ${layer.color}15 0%, transparent 70%)`,
                  }}
                />

                <div
                  className="relative bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6 hover:border-opacity-60 transition-all duration-500 group-hover:shadow-lg"
                  style={{
                    '--hover-color': layer.color,
                    borderColor: 'var(--color-border)',
                  }}
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
                    className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-[0.6rem] font-mono font-bold border"
                    style={{
                      backgroundColor: layer.color + '15',
                      borderColor: layer.color + '40',
                      color: layer.color,
                    }}
                  >
                    L{i}
                  </div>

                  {/* Icon + Label */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{layer.icon}</span>
                    <h3
                      className="font-semibold text-base"
                      style={{ color: layer.color }}
                    >
                      {layer.label}
                    </h3>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    {layer.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-2 font-mono text-xs">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: layer.color }}
                        />
                        <span className="text-[var(--color-text-secondary)]">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Connection arrow (except last) */}
                  {i < layers.length - 1 && (
                    <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 items-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" className="flow-arrow-icon">
                        <line
                          className="flow-arrow"
                          x1="0" y1="10" x2="16" y2="10"
                          stroke="var(--color-accent)"
                          strokeWidth="1.5"
                          opacity="0.4"
                        />
                        <polygon
                          points="14,6 20,10 14,14"
                          fill="var(--color-accent)"
                          opacity="0.4"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Animated data packets flowing between layers */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden">
            {[0, 1, 2].map((i) => (
              <div
                key={`packet-${i}`}
                className="data-packet opacity-0 absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: layers[i].color,
                  boxShadow: `0 0 10px ${layers[i].color}`,
                  top: '50%',
                  left: `${12 + i * 25}%`,
                  animation: `packet-flow-${i} ${3 + i * 0.5}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Performance Stats ── */}
        <div className="stats-label opacity-0 mb-8">
          <span className="font-mono text-xs text-[var(--color-accent)] tracking-widest uppercase">
            {'>'} Performance Benchmarks
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card opacity-0 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6 text-center hover:border-[var(--color-accent)]/30 transition-all duration-300 group"
            >
              <span className="text-2xl block mb-3">{stat.icon}</span>
              <div className="flex items-baseline justify-center gap-1 mb-2">
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
        <div className="principles-label opacity-0 mb-8">
          <span className="font-mono text-xs text-[var(--color-accent-purple)] tracking-widest uppercase">
            {'>'} Engineering Principles
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className="principle-card opacity-0 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--color-accent-purple)]/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-purple)]/10 border border-[var(--color-accent-purple)]/20 flex items-center justify-center shrink-0 font-mono text-xs text-[var(--color-accent-purple)] font-bold">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
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
            <div className="mt-6 h-[2px] w-16 bg-gradient-to-r from-[var(--color-accent)] to-transparent mx-auto" />
          </blockquote>
        </div>

      </div>

      {/* ── Keyframe animations for data packets ── */}
      <style>{`
        @keyframes packet-flow-0 {
          0%, 100% { transform: translate(0, -50%); opacity: 0.8; }
          50% { transform: translate(calc(25vw - 50px), -50%); opacity: 1; }
        }
        @keyframes packet-flow-1 {
          0%, 100% { transform: translate(0, -50%); opacity: 0.8; }
          50% { transform: translate(calc(25vw - 50px), -50%); opacity: 1; }
        }
        @keyframes packet-flow-2 {
          0%, 100% { transform: translate(0, -50%); opacity: 0.8; }
          50% { transform: translate(calc(25vw - 50px), -50%); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default SystemArchitecture;
