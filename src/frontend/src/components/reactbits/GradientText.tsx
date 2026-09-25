import type { CSSProperties, ReactNode } from "react";
import "./GradientText.css";

interface GradientTextProps {
  children: ReactNode;
  colors?: string[];
  speed?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * React Bits — GradientText (adapted, TypeScript).
 * A living gradient that sweeps through the letterforms forever.
 */
export default function GradientText({
  children,
  colors = ["#a855f7", "#e879f9", "#f0abfc", "#a855f7"],
  speed = 6,
  className = "",
  style,
}: GradientTextProps) {
  const image = `linear-gradient(90deg, ${colors.join(", ")}, ${colors[0]})`;
  return (
    <span
      className={`gradient-text ${className}`.trim()}
      style={
        {
          "--gradient-text-image": image,
          "--gradient-text-speed": `${Math.max(1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </span>
  );
}
