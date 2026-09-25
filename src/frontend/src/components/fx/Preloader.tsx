import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useState } from "react";

/**
 * Cinematic preloader.
 * Ink void → particle-core converges → "ZEROX" letters set in
 * one by one → bar completes → the veil lifts upward.
 * Skipped instantly when prefers-reduced-motion.
 */
export default function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"boot" | "reveal" | "gone">("boot");

  useEffect(() => {
    if (prefersReducedMotion) return;

    let raf = 0;
    const start = performance.now();
    const DURATION = 1600;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // fast start, slow crawl to 100
      const eased = 1 - (1 - t) ** 2.2;
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase("reveal"), 250);
        setTimeout(() => setPhase("gone"), 1350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || phase === "gone") return null;

  const bootHtml = document.getElementById("boot");
  if (bootHtml) bootHtml.classList.add("done");

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#08050f] ${
        phase === "reveal"
          ? "pointer-events-none [-webkit-mask-image:linear-gradient(to_top,black_0%,transparent_100%)] [-webkit-mask-size:100%_0%] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:bottom]"
          : ""
      }`}
      style={
        phase === "reveal"
          ? ({
              animation:
                "zx-veil-lift 1.1s cubic-bezier(0.76,0,0.24,1) forwards",
            } as React.CSSProperties)
          : undefined
      }
      aria-hidden="true"
    >
      {/* particle core */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="h-40 w-40 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(192,132,252,0.4) 0%, rgba(168,85,247,0.15) 35%, transparent 70%)",
            animation: "zx-core-pulse 1.6s ease-in-out infinite",
          }}
        />
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI * 2;
          const r = 64;
          return (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: static positional orbits
              key={`orbit-${i}`}
              className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-fuchsia-300"
              style={{
                transform: `translate(-50%,-50%) translate(${
                  Math.cos(angle) * r
                }px, ${Math.sin(angle) * r}px)`,
                opacity: 0.6,
                animation: `zx-core-orbit ${
                  2.4 + (i % 5) * 0.35
                }s linear infinite ${-i * 0.22}s`,
                animationDelay: `${-i * 0.22}s`,
              }}
            />
          );
        })}
      </div>

      {/* wordmark */}
      <div className="relative flex items-baseline gap-[0.55em] font-display text-2xl sm:text-3xl tracking-[0.55em] text-mist">
        {"ZEROX".split("").map((ch, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: static wordmark positions
            key={`${ch}-${i}`}
            className="inline-block"
            style={{
              animation: "zx-letter-set 0.6s cubic-bezier(0.22,1,0.36,1) both",
              animationDelay: `${0.25 + i * 0.14}s`,
            }}
          >
            {ch}
          </span>
        ))}
      </div>

      {/* progress */}
      <div className="absolute bottom-[30%] flex w-52 flex-col items-center gap-3">
        <div className="h-px w-full overflow-hidden bg-fuchsia-300/15">
          <div
            className="h-full bg-gradient-to-r from-fuchsia-400 to-fuchsia-400"
            style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
          />
        </div>
        <div className="zx-mono flex w-full justify-between text-[10px] tracking-[0.3em] text-fuchsia-200/40">
          <span>BOOTING CORE</span>
          <span>{progress}%</span>
        </div>
      </div>

      <style>{`
        @keyframes zx-veil-lift {
          from { clip-path: inset(0 0 0 0); opacity: 1; }
          to   { clip-path: inset(0 0 100% 0); opacity: 1; }
        }
        @keyframes zx-core-pulse {
          0%,100% { transform: scale(1); opacity: 0.7; }
          50%     { transform: scale(1.35); opacity: 1; }
        }
        @keyframes zx-core-orbit {
          from { transform: translate(-50%,-50%) rotate(0deg) translateX(64px) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg) translateX(64px) rotate(-360deg); }
        }
        @keyframes zx-letter-set {
          from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
    </div>
  );
}
