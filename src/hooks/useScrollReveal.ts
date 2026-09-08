import { useEffect } from 'react';

/**
 * Lightweight IntersectionObserver hook to trigger scroll animations.
 * Applies `.is-revealed` when an element enters viewport.
 * Automatically respects prefers-reduced-motion.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const revealAllImmediately = () => {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-revealed');
      });
    };

    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      if (motionQuery.matches) {
        revealAllImmediately();
        if (observer) {
          observer.disconnect();
          observer = null;
        }
        return;
      }

      observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              obs.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -50px 0px',
          threshold: 0.1,
        }
      );

      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach((el) => observer?.observe(el));
    };

    setupObserver();

    const handleMotionChange = () => {
      setupObserver();
    };

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionChange);
    } else {
      motionQuery.addListener(handleMotionChange);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', handleMotionChange);
      } else {
        motionQuery.removeListener(handleMotionChange);
      }
    };
  }, []);
}
