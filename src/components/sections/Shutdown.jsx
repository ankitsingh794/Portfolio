import React from 'react';
import useGSAP from '../../hooks/useGSAP';
import { gsap } from '../../lib/gsap';
import ScrambledText from '../ui/ScrambledText';

const terminalLines = [
  { prompt: true, text: 'echo "From chaos to precision."' },
  { prompt: false, text: 'From chaos to precision.' },
  { prompt: true, text: 'echo "Let\'s build something that works."' },
  { prompt: false, text: "Let's build something that works." },
  { prompt: true, text: 'connect --initiate' },
];

const connectCards = [
  {
    label: 'Email',
    desc: 'Drop me a line',
    value: 'ankitsinghrjt794@gmail.com',
    href: 'mailto:ankitsinghrjt794@gmail.com',
    primary: true,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    desc: 'See my code',
    value: 'ankitsingh794',
    href: 'https://github.com/ankitsingh794',
    primary: false,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    desc: 'Connect with me',
    value: 'Ankit Singh',
    href: 'https://www.linkedin.com/in/ankit-singh-274792276/',
    primary: false,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    desc: 'Follow my journey',
    value: '@__.ank.it.__',
    href: 'https://www.instagram.com/__.ank.it.__/',
    primary: false,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'LeetCode',
    desc: 'Problem solving',
    value: 'ankitsingh794',
    href: 'https://leetcode.com/ankitsingh794',
    primary: false,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
];

const Shutdown = () => {
  const containerRef = useGSAP((container) => {
    const lines = container.querySelectorAll('.terminal-line');
    const cards = container.querySelectorAll('.connect-card');
    const avatar = container.querySelector('.avatar');
    const footer = container.querySelector('.footer-text');
    const heading = container.querySelector('.shutdown-heading');
    const subtext = container.querySelector('.shutdown-sub');
    const termBlock = container.querySelector('.term-block');
    const linksHeading = container.querySelector('.links-heading');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=500%',
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Phase 1: Avatar + heading + subtext
    tl.fromTo(avatar, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, 0);
    tl.fromTo(heading, { opacity: 0, y: 25, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2 }, 0.6);
    tl.fromTo(subtext, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8 }, 1.2);

    // Phase 2: Terminal block
    tl.fromTo(termBlock, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8 }, 2.5);
    lines.forEach((line, i) => {
      tl.fromTo(line, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.5 }, 3 + i * 0.4);
    });

    // Phase 3: Connect cards (spread out)
    const cardsStart = 3 + lines.length * 0.4 + 2;
    tl.fromTo(linksHeading, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, cardsStart - 0.5);

    cards.forEach((card, i) => {
      tl.fromTo(card,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
        cardsStart + i * 0.5
      );
    });

    // Phase 4: Footer
    const footerStart = cardsStart + cards.length * 0.5 + 2;
    tl.fromTo(footer, { opacity: 0 }, { opacity: 1, duration: 0.5 }, footerStart);
  }, []);

  return (
    <section ref={containerRef} className="section-full flex-col bg-[var(--color-bg)]" id="shutdown">
      <div className="w-full max-w-3xl px-8 flex flex-col items-center text-center">

        {/* Avatar */}
        <div className="avatar opacity-0 mb-8">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[var(--color-accent)] shadow-[0_0_30px_rgba(0,255,159,0.15)]">
            <img src="/profile.png" alt="Ankit Singh" className="w-full h-full object-cover object-top" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="shutdown-heading opacity-0 text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
          Let's <ScrambledText text="connect" className="text-[var(--color-accent)]" trigger="hover" scrambleDuration={800} />.
        </h2>
        <p className="shutdown-sub opacity-0 text-base md:text-lg text-[var(--color-text-secondary)] mb-12 max-w-md">
          I'm always open to new opportunities, collaborations, and interesting conversations.
        </p>

        {/* Terminal Block */}
        <div className="term-block opacity-0 w-full bg-[var(--color-bg-elevated)] rounded-xl border border-[var(--color-border)] p-6 md:p-8 mb-14 text-left font-mono text-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--color-border)]">
            <div className="w-3 h-3 rounded-full bg-[var(--color-window-dot-red)]" />
            <div className="w-3 h-3 rounded-full bg-[var(--color-window-dot-yellow)]" />
            <div className="w-3 h-3 rounded-full bg-[var(--color-window-dot-green)]" />
            <span className="ml-2 text-xs text-[var(--color-text-muted)]">terminal — zsh</span>
          </div>
          <div className="space-y-3">
            {terminalLines.map((line, i) => (
              <div key={i} className="terminal-line opacity-0">
                {line.prompt ? (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[var(--color-accent)]">ankit@world</span>
                    <span className="text-[var(--color-text-muted)]">:</span>
                    <span className="text-[var(--color-accent-blue)]">~</span>
                    <span className="text-[var(--color-text-muted)]">$</span>
                    <span className="text-[var(--color-text-primary)] ml-1">{line.text}</span>
                  </div>
                ) : (
                  <div className="text-[var(--color-text-secondary)] pl-1">{line.text}</div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[var(--color-accent)]">ankit@world</span>
              <span className="text-[var(--color-text-muted)]">:</span>
              <span className="text-[var(--color-accent-blue)]">~</span>
              <span className="text-[var(--color-text-muted)]">$</span>
              <span className="terminal-cursor" />
            </div>
          </div>
        </div>

        {/* Connect heading */}
        <div className="links-heading opacity-0 mb-8">
          <span className="font-mono text-xs text-[var(--color-accent)] tracking-widest uppercase">
            {'>'} Available Connections
          </span>
        </div>

        {/* Connect Cards Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {connectCards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`connect-card opacity-0 group flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-300 hover:scale-[1.03] ${
                card.primary
                  ? 'bg-[var(--color-accent)]/5 border-2 border-[var(--color-accent)]/30 hover:border-[var(--color-accent)] hover:shadow-[0_0_30px_rgba(0,255,159,0.1)]'
                  : 'bg-[var(--color-bg-elevated)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 hover:shadow-[0_0_20px_rgba(0,255,159,0.05)]'
              }`}
            >
              <div className={`transition-colors duration-300 ${
                card.primary
                  ? 'text-[var(--color-accent)]'
                  : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]'
              }`}>
                {card.icon}
              </div>
              <span className={`font-semibold text-sm transition-colors duration-300 ${
                card.primary ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]'
              }`}>
                {card.label}
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">{card.desc}</span>
              <span className="font-mono text-[0.65rem] text-[var(--color-text-muted)] opacity-60 group-hover:opacity-100 transition-opacity truncate max-w-full">
                {card.value}
              </span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <p className="footer-text opacity-0 font-mono text-xs text-[var(--color-text-muted)]">
          © 2026 Ankit Singh · Built with React · Animated with GSAP
        </p>
      </div>
    </section>
  );
};

export default Shutdown;
