import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

type RevealKind =
  | "rise"
  | "fade"
  | "blur"
  | "scale"
  | "clip-up"
  | "slide-left"
  | "slide-right"
  | "letter";

interface RevealProps {
  children: ReactNode;
  kind?: RevealKind;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  /** viewport margin — trigger before fully visible */
  margin?: string;
}

const VARIANTS: Record<
  RevealKind,
  {
    hidden: {
      opacity: number;
      transform?: string;
      filter?: string;
      clipPath?: string;
    };
    show: {
      opacity: number;
      transform?: string;
      filter?: string;
      clipPath?: string;
    };
  }
> = {
  rise: {
    hidden: { opacity: 0, transform: "translateY(36px)" },
    show: { opacity: 1, transform: "translateY(0px)" },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  blur: {
    hidden: { opacity: 0, transform: "translateY(12px)", filter: "blur(10px)" },
    show: { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" },
  },
  scale: {
    hidden: { opacity: 0, transform: "scale(0.92)" },
    show: { opacity: 1, transform: "scale(1)" },
  },
  "clip-up": {
    hidden: { opacity: 1, clipPath: "inset(100% 0 0 0)" },
    show: { opacity: 1, clipPath: "inset(0% 0 0 0)" },
  },
  "slide-left": {
    hidden: { opacity: 0, transform: "translateX(-48px)" },
    show: { opacity: 1, transform: "translateX(0px)" },
  },
  "slide-right": {
    hidden: { opacity: 0, transform: "translateX(48px)" },
    show: { opacity: 1, transform: "translateX(0px)" },
  },
  letter: {
    hidden: { opacity: 0, transform: "translateY(0.5em) rotateX(50deg)" },
    show: { opacity: 1, transform: "translateY(0) rotateX(0deg)" },
  },
};

const PRESETS = {
  rise: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  blur: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
};

/**
 * Scroll reveal — replaces the old generic fade-up with per-section
 * motion languages. Zerox sections each use a different `kind`.
 */
export default function Reveal({
  children,
  kind = "rise",
  delay = 0,
  duration,
  className,
  once = true,
  margin = "-12% 0px -12% 0px",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const variant = VARIANTS[kind];
  const preset = PRESETS[kind];
  const d = duration ?? preset?.duration ?? 0.8;
  const ease = preset?.ease ?? ([0.22, 1, 0.36, 1] as const);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin }}
      transition={{ duration: d, ease, delay }}
      variants={variant}
    >
      {children}
    </motion.div>
  );
}

/** Staggered container helper for grids/lists */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Child of RevealGroup — inherits the stagger */
export function RevealItem({
  children,
  className,
  kind = "rise",
}: {
  children: ReactNode;
  className?: string;
  kind?: RevealKind;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variant = VARIANTS[kind];
  const preset = PRESETS[kind];
  const d = preset?.duration ?? 0.8;
  const ease = preset?.ease ?? ([0.22, 1, 0.36, 1] as const);

  return (
    <motion.div
      className={className}
      variants={variant}
      transition={{ duration: d, ease }}
    >
      {children}
    </motion.div>
  );
}
