import { useEffect, useRef, useState } from 'react';

interface UseRevealOptions {
  /** Root margin for the observer, default '-40px' (trigger 40px before element enters viewport) */
  rootMargin?: string;
  /** Intersection threshold, default 0.08 */
  threshold?: number;
  /** Only fires once — element stays visible once revealed. Default true. */
  once?: boolean;
}

/**
 * Attaches an IntersectionObserver to a ref and returns `revealed` boolean.
 * Use with the global `.reveal` / `.revealed` CSS utility classes.
 */
export function useReveal<T extends Element = HTMLElement>(options: UseRevealOptions = {}) {
  const { rootMargin = '0px 0px -40px 0px', threshold = 0.08, once = true } = options;
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setRevealed(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, revealed };
}
