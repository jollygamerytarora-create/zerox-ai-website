import type { CSSProperties } from "react";
import "./GlitchText.css";

interface GlitchTextProps {
  text: string;
  speed?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * React Bits — GlitchText (adapted, TypeScript).
 * Occasional chromatic split flickers over an otherwise steady headline —
 * a data-ghost in the machine.
 */
export default function GlitchText({
  text,
  speed = 2.8,
  className = "",
  style,
}: GlitchTextProps) {
  return (
    <span
      className={`glitch-text ${className}`.trim()}
      style={
        {
          "--glitch-speed": `${Math.max(0.5, speed)}s`,
          ...style,
        } as CSSProperties
      }
      role="img"
      aria-label={text}
    >
      <span
        aria-hidden="true"
        className="glitch-text__layer glitch-text__layer--rgb-a"
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className="glitch-text__layer glitch-text__layer--rgb-b"
      >
        {text}
      </span>
      <span className="relative">{text}</span>
    </span>
  );
}
