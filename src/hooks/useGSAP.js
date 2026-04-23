import { useRef, useLayoutEffect, useCallback } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

/**
 * Custom hook for GSAP animations with automatic cleanup.
 * Uses gsap.context() for safe cleanup on unmount.
 * 
 * @param {Function} animationFn - receives (gsap context, ref element)
 * @param {Array} deps - dependency array
 * @returns {React.RefObject} ref to attach to the container element
 */
export const useGSAP = (animationFn, deps = []) => {
  const containerRef = useRef(null);
  const contextRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // Create GSAP context scoped to the container
    contextRef.current = gsap.context(() => {
      animationFn(containerRef.current);
    }, containerRef.current);

    // Refresh ScrollTrigger after animations are set up
    ScrollTrigger.refresh();

    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, deps);

  return containerRef;
};

export default useGSAP;
