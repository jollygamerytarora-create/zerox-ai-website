import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion } from "motion/react";
import { useMemo } from "react";

interface SplitTextProps {
  text: string;
  /** per-character or per-word animation */
  by?: "char" | "word";
  className?: string;
  /** class for the masking wrapper — use overflow-hidden for rise-from-line effect */
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

/**
 * Editorial split-text — characters/words rise out of a clipping mask.
 * Used for display headings so every headline enters like type
 * being set by hand, not a generic fade-up.
 */
export default function SplitText({
  text,
  by = "char",
  className,
  lineClassName = "overflow-hidden",
  delay = 0,
  stagger = 0.028,
  once = true,
  as: Tag = "span",
}: SplitTextProps) {
  const prefersReducedMotion = useReducedMotion();

  const parts = useMemo(() => {
    if (by === "word") return text.split(/(\s+)/);
    return Array.from(text);
  }, [text, by]);

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      {parts.map((part, i) => {
        const isSpace = /^\s+$/.test(part);
        const key = `${part}-${i}`;
        if (isSpace) {
          return (
            <span key={key} className="inline-block">
              &nbsp;
            </span>
          );
        }
        return (
          <span
            key={key}
            className={`inline-block align-bottom ${lineClassName}`}
          >
            <motion.span
              className="inline-block will-change-transform"
              aria-hidden="true"
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once, margin: "-8% 0px" }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + i * stagger,
              }}
            >
              {part}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
