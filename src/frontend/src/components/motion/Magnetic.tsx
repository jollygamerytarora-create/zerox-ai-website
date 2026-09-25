import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

interface MagneticProps {
  children: ReactNode;
  /** pull strength 0–1 */
  strength?: number;
  className?: string;
}

/**
 * Magnetic hover — the element leans toward the cursor with a spring.
 * Used on primary CTAs and the navbar mark. Skipped on touch/reduced-motion.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: MagneticProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
