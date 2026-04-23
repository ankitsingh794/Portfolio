import { useEffect, useRef, useCallback } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

const ScrambledText = ({
  text,
  className = '',
  scrambleSpeed = 30,
  revealDelay = 0,
  scrambleDuration = 1500,
  trigger = 'hover', // 'hover' | 'mount' | 'manual'
  isScrambling = false, // only used when trigger='manual'
  scrambleChars = CHARS,
  as: Tag = 'span',
  style = {},
}) => {
  const elRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const scramble = useCallback(() => {
    const el = elRef.current;
    if (!el || !text) return;

    const chars = text.split('');
    const totalLen = chars.length;
    let iteration = 0;
    const maxIterations = Math.ceil(scrambleDuration / scrambleSpeed);

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const progress = iteration / maxIterations;

      el.textContent = chars
        .map((char, i) => {
          // Characters before the "reveal frontier" show original
          if (i < totalLen * progress) return char;
          // Spaces stay as spaces
          if (char === ' ') return ' ';
          // Random character
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join('');

      iteration++;

      if (iteration > maxIterations) {
        clearInterval(intervalRef.current);
        el.textContent = text;
      }
    }, scrambleSpeed);
  }, [text, scrambleSpeed, scrambleDuration, scrambleChars]);

  const startScramble = useCallback(() => {
    clearTimeout(timeoutRef.current);
    if (revealDelay > 0) {
      // Show scrambled immediately
      const el = elRef.current;
      if (el) {
        el.textContent = text
          .split('')
          .map(c => (c === ' ' ? ' ' : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]))
          .join('');
      }
      timeoutRef.current = setTimeout(scramble, revealDelay);
    } else {
      scramble();
    }
  }, [scramble, revealDelay, text, scrambleChars]);

  useEffect(() => {
    if (trigger === 'mount') {
      startScramble();
    }
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [trigger, startScramble]);

  useEffect(() => {
    if (trigger === 'manual' && isScrambling) {
      startScramble();
    }
  }, [trigger, isScrambling, startScramble]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      startScramble();
    }
  };

  return (
    <Tag
      ref={elRef}
      className={className}
      style={{ ...style, display: 'inline-block' }}
      onMouseEnter={handleMouseEnter}
    >
      {text}
    </Tag>
  );
};

export default ScrambledText;
