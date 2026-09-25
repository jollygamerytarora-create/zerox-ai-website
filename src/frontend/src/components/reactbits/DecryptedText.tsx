import { type CSSProperties, useEffect, useRef, useState } from "react";
import "./DecryptedText.css";

interface DecryptedTextProps {
  text?: string;
  speed?: number;
  characters?: string;
  revealDirection?: "left" | "right" | "center";
  startDelay?: number;
  color?: string;
  scrambleColor?: string;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_CHARS = "!<>-_\\/[]{}=+*^?#@$%&";

/**
 * React Bits — DecryptedText (adapted, TypeScript).
 * Characters stream in as noise and decrypt into the phrase,
 * one reveal tick at a time.
 */
export default function DecryptedText({
  text = "Decrypted",
  speed = 42,
  characters = DEFAULT_CHARS,
  revealDirection = "left",
  startDelay = 120,
  color = "#fdf4ff",
  scrambleColor = "#e879f9",
  className = "",
  style,
}: DecryptedTextProps) {
  const [display, setDisplay] = useState<Array<{ ch: string; hot: boolean }>>(
    () =>
      Array.from({ length: Array.from(text).length }, () => ({
        ch: " ",
        hot: true,
      })),
  );
  const hostRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const target = Array.from(text);
    if (reduced) {
      setDisplay(target.map((ch) => ({ ch, hot: false })));
      return undefined;
    }

    let cancelled = false;
    let timer = 0;
    const chars = characters.length > 0 ? characters : DEFAULT_CHARS;
    const total = target.length;

    const noise = () => chars.charAt(Math.floor(Math.random() * chars.length));

    setDisplay(
      target.map((ch) => ({ ch: ch === " " ? " " : noise(), hot: true })),
    );

    let revealed = 0;

    const step = () => {
      if (cancelled) return;

      setDisplay(
        target.map((ch, i) => {
          // center spreads from the middle outward, right runs backwards
          const inPlace =
            revealDirection === "center"
              ? Math.abs(i - (total - 1) / 2) <= revealed / 2
              : revealDirection === "right"
                ? i >= total - revealed
                : i <= revealed;
          return ch === " "
            ? { ch: " ", hot: false }
            : inPlace
              ? { ch, hot: false }
              : { ch: noise(), hot: true };
        }),
      );

      revealed += 1;
      if (revealed >= total) {
        setDisplay(target.map((ch) => ({ ch, hot: false })));
        return;
      }
      timer = window.setTimeout(step, Math.max(12, speed));
    };

    timer = window.setTimeout(step, Math.max(0, startDelay));

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [text, speed, characters, revealDirection, startDelay]);

  return (
    <span
      ref={hostRef}
      className={`decrypted-text ${className}`.trim()}
      style={{ color, ...style }}
      role="img"
      aria-label={text}
    >
      {display.map((glyph, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: glyph positions are positional
          key={`d-${i}`}
          className={`decrypted-text__char${
            glyph.hot ? " decrypted-text__char--scrambled" : ""
          }`}
          style={glyph.hot ? { color: scrambleColor } : undefined}
        >
          {glyph.ch}
        </span>
      ))}
    </span>
  );
}
