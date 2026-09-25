import { motion, useScroll, useSpring } from "motion/react";

/**
 * Hairline scroll progress — the page's "reading" indicator.
 * Sits above the navbar, subtle until you move.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[130] h-[2px] origin-left bg-gradient-to-r from-violet-400 via-fuchsia-400 to-rose-400"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
