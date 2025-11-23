import { useEffect, useRef } from 'react';

type ScrollRevealOptions = {
  /**
   * Control how much the target must intersect before revealing.
   * Defaults to 20%.
   */
  threshold?: number;
  /**
   * Expand the viewport bounding box to trigger slightly before reaching the element.
   */
  rootMargin?: string;
  /**
     * Reveal only once (default) or toggle as it enters/leaves.
     */
  once?: boolean;
  /**
   * Allow overriding the base class that sets the initial hidden state.
   */
  initialClass?: string;
  /**
   * Allow overriding the class that toggles the visible state.
   */
  visibleClass?: string;
};

/**
 * Hook that reveals the referenced element with a fade + translateY animation
 * once it becomes visible in the viewport. Respects reduced motion preferences.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  {
    threshold = 0.2,
    rootMargin = '0px 0px -10% 0px',
    once = true,
    initialClass = 'scroll-reveal',
    visibleClass = 'is-visible'
  }: ScrollRevealOptions = {}
) {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (!element.classList.contains(initialClass)) {
      element.classList.add(initialClass);
    }

    const supportsWindow = typeof window !== 'undefined';
    if (!supportsWindow) {
      element.classList.add(visibleClass);
      return;
    }

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const shouldReduceMotion = reduceMotionQuery.matches;

    if (shouldReduceMotion) {
      element.classList.add(visibleClass);
      return;
    }

    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(visibleClass);
          if (once) {
            observerInstance.unobserve(entry.target);
          }
        } else if (!once) {
          entry.target.classList.remove(visibleClass);
        }
      });
    }, { threshold, rootMargin });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, initialClass, visibleClass]);

  return elementRef;
}
