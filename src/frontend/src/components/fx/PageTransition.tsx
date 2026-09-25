import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";

/**
 * Page transition veil — a soft blur-fade keyed on the pathname.
 * Sits above content, never blocks clicks longer than ~450ms.
 */
export default function PageTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={pathname}
        className="pointer-events-none fixed inset-0 z-[120] bg-void"
        initial={{ opacity: 0.9, filter: "blur(8px)" }}
        animate={{ opacity: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />
    </AnimatePresence>
  );
}
