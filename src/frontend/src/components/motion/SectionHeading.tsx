import SplitText from "@/components/motion/SplitText";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion } from "motion/react";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}

/**
 * Editorial section header: index rail (01 —), split-set title,
 * optional lead paragraph. Replaces the robotic [ SYSTEM::X ] badges
 * with something that reads like a design magazine, not a robot.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  align = "center",
}: SectionHeadingProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`mb-14 sm:mb-20 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <motion.div
        className={`zx-eyebrow zx-mono ${
          align === "center" ? "justify-center" : ""
        }`}
        initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {index} — {eyebrow}
      </motion.div>

      <SplitText
        as="h2"
        text={title}
        by="word"
        stagger={0.05}
        className={`zx-display mt-5 text-4xl font-bold sm:text-5xl ${
          align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"
        }`}
      />

      {lead && (
        <motion.p
          className={`mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {lead}
        </motion.p>
      )}

      <motion.div
        className={`zx-divider mt-10 ${align === "center" ? "mx-auto max-w-xs" : "max-w-xs"}`}
        initial={prefersReducedMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: align === "center" ? "center" : "left" }}
      />
    </div>
  );
}
