import { gsap } from "gsap";
import { useLowPowerMode } from "@/hooks/useLowPowerMode";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
} from "react";
import "./MaskedHeading.css";

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

interface MaskedHeadingProps {
  text: string;
  tag?: "h1" | "h2" | "h3";
  src: string;
  fillScale?: number;
  parallax?: number;
  drift?: number;
  brightness?: number;
  saturation?: number;
  grayscale?: boolean;
  reveal?: "rise" | "wipe" | "fade" | "none";
  trigger?: "view" | "mount" | "hover";
  duration?: number;
  stagger?: number;
  align?: "left" | "center" | "right";
  weight?: number;
  tracking?: number;
  lineHeight?: number;
  textScale?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * React Bits — MaskedHeading (adapted, TypeScript).
 * The words act as a mask over an aurora texture; the texture drifts
 * and leans with the pointer, so the headline itself feels alive.
 */
export default function MaskedHeading({
  text,
  tag = "h2",
  src,
  fillScale = 1.25,
  parallax = 26,
  drift = 18,
  brightness = 1,
  saturation = 1,
  grayscale = false,
  reveal = "rise",
  trigger = "view",
  duration = 1.1,
  stagger = 0.09,
  align = "center",
  weight = 700,
  tracking = -0.03,
  lineHeight = 1.06,
  textScale = 0.115,
  className = "",
  style,
  ...rest
}: MaskedHeadingProps) {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const revealRef = useRef<HTMLSpanElement>(null);
  const mediaRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const baseRefs = useRef<Array<HTMLElement | null>>([]);
  const glyphRefs = useRef<Array<SVGTextElement | null>>([]);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const offsetRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const clipId = `mh-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const words = useMemo(
    () => String(text).split(/\s+/).filter(Boolean),
    [text],
  );

  const isMobile = useLowPowerMode();

  const settingsRef = useRef<Record<string, unknown>>({});
  settingsRef.current = {
    fillScale,
    parallax,
    drift,
    brightness,
    saturation,
    grayscale,
    textScale,
  };

  const place = useCallback(() => {
    const root = rootRef.current;
    const media = mediaRef.current;
    if (!root || !media) return;
    const s = settingsRef.current as {
      fillScale: number;
      parallax: number;
      drift: number;
      brightness: number;
      saturation: number;
      grayscale: boolean;
      textScale: number;
    };
    const W = root.clientWidth;
    const H = root.clientHeight;
    const off = offsetRef.current;

    const maxX = Math.max(0, ((s.fillScale - 1) / 2) * W);
    const maxY = Math.max(0, ((s.fillScale - 1) / 2) * H);

    media.style.transform = `translate3d(${clamp(off.x, -maxX, maxX).toFixed(2)}px, ${clamp(off.y, -maxY, maxY).toFixed(2)}px, 0) scale(${s.fillScale})`;
    media.style.filter = `brightness(${s.brightness}) saturate(${s.saturation})${s.grayscale ? " grayscale(1)" : ""}`;
  }, []);

  const sync = useCallback(() => {
    const root = rootRef.current;
    const measure = measureRef.current;
    if (!root || !measure) return;
    const s = settingsRef.current as { textScale: number };

    root.style.fontSize = `${clamp(root.clientWidth * s.textScale, 20, 200).toFixed(1)}px`;

    const cs = window.getComputedStyle(measure);
    for (let i = 0; i < wordRefs.current.length; i += 1) {
      const box = wordRefs.current[i];
      const base = baseRefs.current[i];
      const glyph = glyphRefs.current[i];
      if (!box || !base || !glyph) continue;
      glyph.setAttribute("x", `${box.offsetLeft}`);
      glyph.setAttribute("y", `${base.offsetTop}`);
      glyph.style.fontFamily = cs.fontFamily;
      glyph.style.fontSize = cs.fontSize;
      glyph.style.fontWeight = cs.fontWeight;
      glyph.style.fontStyle = cs.fontStyle;
      glyph.style.letterSpacing = cs.letterSpacing;
    }
    place();
  }, [place]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(root);
    if (document.fonts?.ready) document.fonts.ready.then(sync).catch(() => {});

    // Mobile: skip the infinite drift rAF loop entirely — the heading
    // renders perfectly still (and stays visible) at zero runtime cost.
    if (isMobile) return;

    let raf = 0;
    let last = performance.now();
    let clock = 0;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      clock += dt;
      const s = settingsRef.current as { drift: number };
      const off = offsetRef.current;

      const dx = Math.sin(clock * 0.21) * s.drift;
      const dy = Math.cos(clock * 0.17) * s.drift * 0.6;

      const ease = 1 - Math.exp(-dt / 0.18);
      off.x += (off.tx + dx - off.x) * ease;
      off.y += (off.ty + dy - off.y) * ease;

      place();
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const s = settingsRef.current as { parallax: number };
      if (s.parallax <= 0) return;
      const r = root.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / (r.width || 1)) * 2 - 1;
      const ny = ((e.clientY - r.top) / (r.height || 1)) * 2 - 1;
      offsetRef.current.tx = clamp(nx, -1, 1) * -s.parallax;
      offsetRef.current.ty = clamp(ny, -1, 1) * -s.parallax;
    };

    const onLeave = () => {
      offsetRef.current.tx = 0;
      offsetRef.current.ty = 0;
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [place, sync, isMobile]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-syncs geometry when the rendered words change
  useEffect(() => {
    sync();
  }, [sync]);

  useEffect(() => {
    const root = rootRef.current;
    const layer = revealRef.current;
    if (!root || !layer) return;
    const glyphs = glyphRefs.current.filter(Boolean) as SVGTextElement[];
    if (!glyphs.length) return;

    const riseDistance = () =>
      (Number.parseFloat(window.getComputedStyle(root).fontSize) || 48) * 1.15;

    const settle = () => {
      gsap.set(glyphs, { y: 0 });
      gsap.set(layer, {
        opacity: 1,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)",
      });
    };

    const rest = () => {
      if (reveal === "rise") {
        gsap.set(glyphs, { y: riseDistance() });
      } else if (reveal === "wipe") {
        gsap.set(layer, { clipPath: "inset(0% 100% 0% 0%)" });
      } else if (reveal === "fade") {
        gsap.set(layer, { opacity: 0, scale: 1.08 });
      }
    };

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Mobile: settle immediately — glyphs never start hidden, so the
    // headline is always readable even if observers fire late.
    if (reveal === "none" || reduce || isMobile) {
      settle();
      return;
    }

    const play = () => {
      tweenRef.current?.kill();
      if (reveal === "rise") {
        gsap.set(layer, {
          opacity: 1,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
        });
        tweenRef.current = gsap.fromTo(
          glyphs,
          { y: riseDistance() },
          { y: 0, duration, stagger, ease: "power4.out", overwrite: "auto" },
        );
      } else if (reveal === "wipe") {
        gsap.set(glyphs, { y: 0 });
        const state = { p: 100 };
        tweenRef.current = gsap.to(state, {
          p: 0,
          duration,
          ease: "power3.inOut",
          overwrite: "auto",
          onUpdate: () => {
            layer.style.clipPath = `inset(0% ${state.p}% 0% 0%)`;
          },
        });
      } else {
        gsap.set(glyphs, { y: 0 });
        tweenRef.current = gsap.fromTo(
          layer,
          { opacity: 0, scale: 1.08 },
          {
            opacity: 1,
            scale: 1,
            duration,
            ease: "power3.out",
            overwrite: "auto",
          },
        );
      }
    };

    if (trigger === "hover") {
      settle();
      root.addEventListener("pointerenter", play);
      return () => {
        root.removeEventListener("pointerenter", play);
        tweenRef.current?.kill();
      };
    }

    if (trigger === "view") {
      settle();
      rest();
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            play();
            io.disconnect();
          }
        },
        { threshold: 0.25 },
      );
      io.observe(root);
      return () => {
        io.disconnect();
        tweenRef.current?.kill();
      };
    }

    play();
    return () => tweenRef.current?.kill();
  }, [reveal, trigger, duration, stagger, isMobile]);

  const Tag = tag;

  return (
    <Tag
      ref={rootRef}
      className={`masked-heading ${className}`.trim()}
      style={{
        textAlign: align,
        fontWeight: weight,
        letterSpacing: `${tracking}em`,
        lineHeight,
        ...style,
      }}
      {...rest}
    >
      <span ref={measureRef} className="masked-heading__measure">
        {words.map((word, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: word positions are inherently indexed
            key={`${word}-${i}`}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            className="masked-heading__word"
          >
            {word}
            <i
              ref={(el) => {
                baseRefs.current[i] = el;
              }}
              className="masked-heading__baseline"
            />
          </span>
        ))}
      </span>

      <svg
        className="masked-heading__defs"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            {words.map((word, i) => (
              <text
                // biome-ignore lint/suspicious/noArrayIndexKey: glyph positions are inherently indexed
                key={`${word}-${i}`}
                ref={(el) => {
                  glyphRefs.current[i] = el;
                }}
              >
                {word}
              </text>
            ))}
          </clipPath>
        </defs>
      </svg>

      <span ref={revealRef} className="masked-heading__reveal">
        <span
          className="masked-heading__clip"
          style={{ clipPath: `url(#${clipId})` }}
        >
          <span ref={mediaRef} className="masked-heading__media">
            <img
              className="masked-heading__source"
              src={src}
              alt=""
              draggable={false}
            />
          </span>
        </span>
      </span>
    </Tag>
  );
}
