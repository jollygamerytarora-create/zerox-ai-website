import { useReducedMotion } from "@/hooks/useReducedMotion";
import Lenis from "lenis";
import { type ReactNode, useEffect } from "react";

/**
 * Lenis inertia scrolling for the whole app.
 * Respects prefers-reduced-motion (falls back to native scroll).
 * The instance is exposed on window so page-level rAF loops can
 * sync their own reads with Lenis' frame.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      // signature ease — long tail, no bounce
      easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as unknown as { __lenis?: Lenis | undefined }).__lenis =
        undefined;
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
