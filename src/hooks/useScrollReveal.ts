import { useEffect } from 'react';

/**
 * Lightweight IntersectionObserver hook to trigger scroll animations.
 * Applies `.is-revealed` when an element enters viewport.
 * Automatically respects prefers-reduced-motion.
 */
export function useScrollReveal() {
  useEffect(() => {
    // Respect reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve after revealing to save CPU
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before it hits bottom of viewport
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);
}
