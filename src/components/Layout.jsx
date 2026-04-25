import React from 'react';
import useLenis from '../hooks/useLenis';

const Layout = ({ children }) => {
  useLenis();

  return (
    <div className="relative min-h-screen">
      {/* Neon Grid Background */}
      <div className="neon-grid" />



      {/* Corner accents */}
      <div className="corner-accent corner-accent--tl" />
      <div className="corner-accent corner-accent--br" />

      {/* CRT Scanline Overlay */}
      <div className="crt-overlay" />

      {/* Subtle Noise Texture */}
      <div className="noise-overlay" />

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[9990] bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-blue)]"
        id="scroll-progress"
        style={{ width: '0%' }}
      />

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
