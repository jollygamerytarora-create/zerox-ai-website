import { useLowPowerMode } from "@/hooks/useLowPowerMode";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** max tilt in degrees */
  max?: number;
  /** also track a cursor light via --zx-mx/--zx-my (zx-card-lit) */
  lit?: boolean;
}

/**
 * Zerox card treatment: 3D tilt (±4°), cursor-tracked light sweep,
 * spring return. Deliberately subtle — depth, not gimmick.
 */
export default function TiltCard({
  children,
  className = "",
  max = 4,
  lit = true,
}: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const isLowPower = useLowPowerMode();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });

  const disabled = prefersReducedMotion || isLowPower;

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    if (!disabled) {
      ry.set((px - 0.5) * max * 2);
      rx.set(-(py - 0.5) * max * 2);
    }

    if (lit) {
      el.style.setProperty("--zx-mx", `${px * 100}%`);
      el.style.setProperty("--zx-my", `${py * 100}%`);
    }
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
