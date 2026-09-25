import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

interface MaskedVideoHeadingProps {
  /** each string = one massive line of the heading */
  lines: string[];
  /** looping ambient video that shows THROUGH the letterforms */
  src: string;
  /** fallback fill if the video fails (kept on-theme) */
  fallbackGradient?: string;
  className?: string;
}

/**
 * MaskedVideoHeading — huge Syne display type with a living video
 * playing INSIDE the letterforms. Built as inline SVG clipPath +
 * foreignObject so the real webfont is used for the mask.
 */
export default function MaskedVideoHeading({
  lines,
  src,
  fallbackGradient = "linear-gradient(120deg, #7c3aed 0%, #a855f7 30%, #e879f9 55%, #7c3aed 85%)",
  className = "",
}: MaskedVideoHeadingProps) {
  const rawId = useId();
  const clipId = `mvh-clip-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [videoOk, setVideoOk] = useState(true);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], [44, -44]);

  const VB_W = 1600;
  // exact fit: measure the real Syne glyph widths once fonts are ready
  const [fontSize, setFontSize] = useState(150);
  const linesKey = lines.join("\u0000");
  useEffect(() => {
    let cancelled = false;
    const measure = () => {
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return;
      ctx.font = "800 100px 'Syne', 'Inter', sans-serif";
      const widest = lines.reduce(
        (max, l) => Math.max(max, ctx.measureText(l).width),
        1,
      );
      const size = Math.floor(((VB_W * 0.92) / widest) * 100);
      if (!cancelled && size > 10) setFontSize(size);
    };
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [linesKey]);
  const lineHeight = fontSize * 1.06;
  const VB_H = Math.round(lineHeight * lines.length + fontSize * 0.32);

  return (
    <div ref={wrapRef} className={`relative w-full ${className}`}>
      <motion.svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={lines.join(" ")}
        style={{ y: parallax }}
      >
        <defs>
          <clipPath id={clipId}>
            {lines.map((line, lineIndex) => (
              <text
                key={line}
                x={VB_W / 2}
                y={
                  VB_H / 2 +
                  (lineIndex - (lines.length - 1) / 2) * lineHeight +
                  fontSize * 0.32
                }
                textAnchor="middle"
                style={{
                  fontFamily: "'Syne', 'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: `${fontSize}px`,
                  letterSpacing: "-0.02em",
                }}
              >
                {line}
              </text>
            ))}
          </clipPath>
        </defs>

        <foreignObject
          x="0"
          y="0"
          width={VB_W}
          height={VB_H}
          clipPath={`url(#${clipId})`}
        >
          {videoOk ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setVideoOk(false)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "saturate(1.35) brightness(1.02)",
              }}
            >
              <source src={src} type="video/mp4" />
            </video>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: fallbackGradient,
              }}
            />
          )}
          {/* violet duotone wash so any footage sits in the theme */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(120deg, rgba(124,58,237,0.38) 0%, rgba(232,121,249,0.24) 50%, rgba(8,5,15,0.34) 100%)",
            }}
          />
        </foreignObject>

        {/* faint echo for depth — identical metrics, so always aligned */}
        {lines.map((line, lineIndex) => (
          <text
            key={`echo-${line}`}
            x={VB_W / 2 + 10}
            y={
              VB_H / 2 +
              (lineIndex - (lines.length - 1) / 2) * lineHeight +
              fontSize * 0.32 +
              12
            }
            textAnchor="middle"
            style={{
              fontFamily: "'Syne', 'Inter', sans-serif",
              fontWeight: 800,
              fontSize: `${fontSize}px`,
              letterSpacing: "-0.02em",
              fill: "rgba(240,171,252,0.07)",
            }}
          >
            {line}
          </text>
        ))}
      </motion.svg>
    </div>
  );
}
