import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Typewriter effect: reveals text character by character
 * @param {HTMLElement} element - target element
 * @param {string} text - text to type
 * @param {object} opts - options { duration, delay, scrollTrigger }
 * @returns {gsap.core.Tween}
 */
export const typewriterEffect = (element, text, opts = {}) => {
  const { duration = 1.5, delay = 0, scrollTrigger: st } = opts;
  element.textContent = '';

  const chars = text.split('');
  const tl = gsap.timeline({
    scrollTrigger: st || undefined,
    delay,
  });

  chars.forEach((char, i) => {
    tl.to(element, {
      duration: duration / chars.length,
      onStart: () => {
        element.textContent = text.substring(0, i + 1);
      },
    }, i * (duration / chars.length));
  });

  return tl;
};

/**
 * Scroll-triggered reveal animation
 * @param {HTMLElement} element
 * @param {object} opts
 * @returns {gsap.core.Tween}
 */
export const revealOnScroll = (element, opts = {}) => {
  const {
    direction = 'up',
    distance = 60,
    duration = 1,
    delay = 0,
    ease = 'power3.out',
  } = opts;

  const from = {
    opacity: 0,
    y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
    x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
  };

  return gsap.from(element, {
    ...from,
    duration,
    delay,
    ease,
    scrollTrigger: opts.scrollTrigger || {
      trigger: element,
      start: 'top 85%',
      end: 'top 50%',
      toggleActions: 'play none none reverse',
    },
  });
};

/**
 * SVG line drawing effect
 * @param {SVGPathElement} path
 * @param {object} opts
 * @returns {gsap.core.Tween}
 */
export const drawSVGPath = (path, opts = {}) => {
  const length = path.getTotalLength();
  const { duration = 1.5, delay = 0, ease = 'power3.inOut' } = opts;

  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  return gsap.to(path, {
    strokeDashoffset: 0,
    duration,
    delay,
    ease,
    scrollTrigger: opts.scrollTrigger || undefined,
  });
};

/**
 * Staggered children reveal
 * @param {HTMLElement} parent
 * @param {string} childSelector
 * @param {object} opts
 * @returns {gsap.core.Tween}
 */
export const staggerReveal = (parent, childSelector, opts = {}) => {
  const {
    stagger = 0.1,
    duration = 0.8,
    ease = 'power3.out',
    y = 40,
  } = opts;

  return gsap.from(parent.querySelectorAll(childSelector), {
    opacity: 0,
    y,
    duration,
    stagger,
    ease,
    scrollTrigger: opts.scrollTrigger || {
      trigger: parent,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
};

export { gsap, ScrollTrigger };
