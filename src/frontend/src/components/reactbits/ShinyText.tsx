import type { CSSProperties } from "react";
import "./ShinyText.css";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * React Bits — ShinyText (adapted, TypeScript).
 * A light sweep that periodically crosses the text.
 */
export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = "",
  style = {},
}: ShinyTextProps) {
  return (
    <span
      className={`shiny-text ${disabled ? "shiny-text-disabled" : ""} ${className}`.trim()}
      style={
        {
          ...style,
          "--shiny-text-animation-duration": `${speed}s`,
        } as CSSProperties
      }
    >
      {text}
    </span>
  );
}
