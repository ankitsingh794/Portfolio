import { useState, useEffect, useRef } from 'react';

/**
 * Throttled mouse position tracker.
 * @param {number} throttleMs - throttle interval in ms (default 16 = ~60fps)
 * @returns {{ x: number, y: number, normalizedX: number, normalizedY: number }}
 */
export const useMousePosition = (throttleMs = 16) => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0, // -1 to 1
    normalizedY: 0, // -1 to 1
  });
  const lastUpdate = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastUpdate.current < throttleMs) return;
      lastUpdate.current = now;

      setPosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
        normalizedY: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [throttleMs]);

  return position;
};

export default useMousePosition;
