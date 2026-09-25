import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  type CSSProperties,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./StrokeText.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_TEXT = "Draw Attention";

interface StrokeTextProps {
  text?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  drawDuration?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: string;
  trigger?: "mount" | "hover" | "scroll" | "loop";
  fillMode?: "fade" | "wipe" | "none";
  fontSize?: number | string;
  fontWeight?: number | string;
  letterSpacing?: number | string;
  reverse?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * React Bits — StrokeText (adapted, TypeScript).
 * SVG letterforms draw themselves in outline, then flood with fill.
 */
export default function StrokeText({
  text = DEFAULT_TEXT,
  strokeColor = "#A78BFA",
  fillColor = "#F8FAFC",
  strokeWidth = 1.4,
  drawDuration = 1.6,
  fillDelay = 0.2,
  stagger = 0.05,
  ease = "power2.out",
  trigger = "mount",
  fillMode = "wipe",
  fontSize = 128,
  fontWeight = 800,
  letterSpacing = -4,
  reverse = false,
  className = "",
  style = {},
}: StrokeTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const strokeTextRef = useRef<SVGTextElement>(null);
  const wipeRectRef = useRef<SVGRectElement>(null);

  const [box, setBox] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const rawId = useId();
  const wipeId = `stroke-text-wipe-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const characters = useMemo(() => Array.from(String(text ?? "")), [text]);

  // numeric estimate from responsive strings: use the clamp ceiling
  // (last token, rem/em ×16) for padding/dash math
  const fontSizePx = (() => {
    if (typeof fontSize === "number") return fontSize;
    const tokens = String(fontSize).match(/[\d.]+\s*(rem|em|px)?/g);
    if (!tokens?.length) return 110;
    const last = tokens[tokens.length - 1];
    const n = Number.parseFloat(last);
    if (Number.isNaN(n)) return 110;
    return /rem|em/.test(last) ? n * 16 : n;
  })();
  const fontSizeCss =
    typeof fontSize === "number" ? `${fontSize}px` : String(fontSize);
  const heightCss =
    typeof fontSize === "number"
      ? `${Math.round(fontSize * 1.3)}px`
      : `calc(${String(fontSize)} * 1.3)`;
  const dash = Math.max(fontSizePx * 7, 200);

  const fontStyle = useMemo(
    () => ({
      fontSize: fontSizeCss,
      fontWeight: String(fontWeight),
      letterSpacing: `${typeof letterSpacing === "number" ? letterSpacing : String(letterSpacing)}px`,
    }),
    [fontSizeCss, fontWeight, letterSpacing],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: measured node changes with characters/font inputs
  useLayoutEffect(() => {
    const node = strokeTextRef.current;
    if (!node) return undefined;

    let cancelled = false;

    const measure = () => {
      if (cancelled || !strokeTextRef.current) return;
      let bbox: DOMRect;
      try {
        bbox = strokeTextRef.current.getBBox();
      } catch {
        return;
      }
      // Guard against degenerate measurements (font not yet applied,
      // display:none ancestors). A stale tiny box combined with
      // preserveAspectRatio="meet" would blow the glyphs up into a blob.
      if (!bbox || !bbox.width || bbox.width < 4 || bbox.height < 2) return;
      if (bbox.width < fontSizePx * 0.12) return;

      const pad = Math.max(Number(strokeWidth) || 1, fontSizePx * 0.1);
      const next = {
        x: bbox.x - pad,
        y: bbox.y - pad,
        width: bbox.width + pad * 2,
        height: bbox.height + pad * 2,
      };

      setBox((prev) =>
        prev &&
        Math.abs(prev.x - next.x) < 0.5 &&
        Math.abs(prev.width - next.width) < 0.5 &&
        Math.abs(prev.y - next.y) < 0.5
          ? prev
          : next,
      );
    };

    // measure after layout, then re-measure once fonts settle — the first
    // pass usually runs against the fallback font and MUST be corrected
    const raf = requestAnimationFrame(measure);
    let fontsCancelled = false;
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready
        .then(() => {
          if (!fontsCancelled) measure();
        })
        .catch(() => {});
    }

    // any box resize (responsive layout, late font swap) re-measures
    const observer = new ResizeObserver(() => measure());
    observer.observe(node);

    return () => {
      cancelled = true;
      fontsCancelled = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [
    characters,
    fontSize,
    fontWeight,
    letterSpacing,
    strokeWidth,
    fontSizePx,
  ]);

  useEffect(() => {
    const root = rootRef.current;
    if (typeof window === "undefined" || !root || !box) return undefined;

    const strokes = gsap.utils.toArray(
      root.querySelectorAll("[data-stroke-char]"),
    );
    const fills = gsap.utils.toArray(root.querySelectorAll("[data-fill-char]"));
    const wipe = wipeRectRef.current;
    if (!strokes.length) return undefined;

    const fillEnabled = fillMode !== "none";
    const useWipe = fillEnabled && fillMode === "wipe";
    const fillDuration = Math.max(0.4, drawDuration * 0.5);
    const staggerConfig: number | { each: number; from: "end" } = reverse
      ? { each: stagger, from: "end" }
      : stagger;
    const targets = [...strokes, ...fills, wipe].filter(Boolean);

    const setStart = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: dash });
      gsap.set(fills, { opacity: useWipe ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: { width: 0 } });
    };

    const setEnd = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: 0 });
      gsap.set(fills, { opacity: fillEnabled ? 1 : 0 });
      if (wipe)
        gsap.set(wipe, { attr: { width: fillEnabled ? box.width : 0 } });
    };

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      setEnd();
      return () => gsap.killTweensOf(targets);
    }

    const build = () => {
      setStart();
      const tl = gsap.timeline({
        paused: true,
        repeat: trigger === "loop" ? -1 : 0,
        repeatDelay: trigger === "loop" ? 0.9 : 0,
        defaults: { overwrite: "auto" },
      });

      tl.to(
        strokes,
        {
          strokeDashoffset: 0,
          duration: drawDuration,
          ease,
          stagger: staggerConfig,
        },
        0,
      );

      if (useWipe && wipe) {
        tl.to(
          wipe,
          {
            attr: { width: box.width },
            duration: fillDuration,
            ease: "power2.inOut",
          },
          drawDuration + fillDelay,
        );
      } else if (fillEnabled) {
        tl.to(
          fills,
          {
            opacity: 1,
            duration: fillDuration,
            ease: "power2.out",
            stagger: staggerConfig,
          },
          drawDuration + fillDelay,
        );
      }

      return tl;
    };

    let timeline: gsap.core.Timeline | null = null;
    let scrollTrigger: ScrollTrigger | null = null;
    let removeHover: (() => void) | null = null;

    if (trigger === "hover") {
      setEnd();
      const play = () => {
        timeline?.kill();
        timeline = build();
        timeline.play(0);
      };
      root.addEventListener("pointerenter", play);
      removeHover = () => root.removeEventListener("pointerenter", play);
    } else {
      timeline = build();
      if (trigger === "scroll") {
        scrollTrigger = ScrollTrigger.create({
          trigger: root,
          start: "top 82%",
          once: true,
          onEnter: () => timeline?.play(0),
        });
      } else {
        timeline.play(0);
      }
    }

    return () => {
      removeHover?.();
      scrollTrigger?.kill();
      timeline?.kill();
      gsap.killTweensOf(targets);
    };
  }, [
    box,
    dash,
    drawDuration,
    fillDelay,
    stagger,
    ease,
    trigger,
    fillMode,
    reverse,
  ]);

  const viewBox = box
    ? `${box.x} ${box.y} ${box.width} ${box.height}`
    : `0 ${-fontSizePx} 600 ${fontSizePx * 1.3}`;

  return (
    <span
      ref={rootRef}
      className={`stroke-text ${trigger === "hover" ? "stroke-text--hover" : ""} ${className}`.trim()}
      style={
        {
          ...style,
          "--stroke-text-height": heightCss,
        } as CSSProperties
      }
      role="img"
      aria-label={String(text ?? "")}
    >
      {/* Invisible until the glyph box is measured — painting against the
          estimated fallback viewBox blows the glyphs up into a blob. */}
      <svg
        className="stroke-text__svg"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        style={{ opacity: box ? 1 : 0, transition: "opacity 0.25s ease" }}
      >
        {fillMode === "wipe" && box && (
          <defs>
            <clipPath id={wipeId} clipPathUnits="userSpaceOnUse">
              <rect
                ref={wipeRectRef}
                x={box.x}
                y={box.y}
                width="0"
                height={box.height}
              />
            </clipPath>
          </defs>
        )}

        <text
          ref={strokeTextRef}
          className="stroke-text__stroke"
          x="0"
          y="0"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          style={fontStyle}
        >
          {characters.map((char, index) => (
            <tspan
              data-stroke-char
              // biome-ignore lint/suspicious/noArrayIndexKey: glyph positions are inherently indexed
              key={`s-${index}`}
            >
              {char}
            </tspan>
          ))}
        </text>

        <text
          className="stroke-text__fill"
          x="0"
          y="0"
          fill={fillColor}
          stroke="none"
          style={fontStyle}
          clipPath={fillMode === "wipe" && box ? `url(#${wipeId})` : undefined}
        >
          {characters.map((char, index) => (
            <tspan
              data-fill-char
              // biome-ignore lint/suspicious/noArrayIndexKey: glyph positions are inherently indexed
              key={`f-${index}`}
            >
              {char}
            </tspan>
          ))}
        </text>
      </svg>
    </span>
  );
}
