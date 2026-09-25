import { useEffect, useRef } from "react";

/**
 * AudioWave — a living oscilloscope ribbon for the podcast section.
 * Three layered violet waves drift and interfere like a voice signal.
 * Canvas 2D, DPR-aware, pauses off-screen, static under reduced motion.
 */
export default function AudioWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const t = now * 0.001;
      ctx.clearRect(0, 0, width, height);

      const mid = height / 2;
      const waves: Array<{
        amp: number;
        freq: number;
        speed: number;
        phase: number;
        color: string;
        width: number;
      }> = [
        {
          amp: height * 0.24,
          freq: 2.1,
          speed: 0.9,
          phase: 0,
          color: "rgba(168,85,247,0.55)",
          width: 2,
        },
        {
          amp: height * 0.17,
          freq: 3.4,
          speed: -1.25,
          phase: 1.8,
          color: "rgba(232,121,249,0.5)",
          width: 1.6,
        },
        {
          amp: height * 0.1,
          freq: 5.2,
          speed: 1.7,
          phase: 4.1,
          color: "rgba(196,181,253,0.3)",
          width: 1.2,
        },
      ];

      // soft center glow bed
      const bed = ctx.createLinearGradient(0, 0, width, 0);
      bed.addColorStop(0, "rgba(168,85,247,0)");
      bed.addColorStop(0.5, "rgba(168,85,247,0.12)");
      bed.addColorStop(1, "rgba(168,85,247,0)");
      ctx.fillStyle = bed;
      ctx.fillRect(0, mid - height * 0.3, width, height * 0.6);

      for (const w of waves) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 4) {
          const nx = x / width;
          // envelope: fades at the edges like a real waveform
          const env = Math.sin(nx * Math.PI) ** 0.7;
          // layered sines = organic interference
          const y =
            mid +
            env *
              w.amp *
              (0.62 * Math.sin(nx * Math.PI * 2 * w.freq + t * w.speed + w.phase) +
                0.3 * Math.sin(nx * Math.PI * 2 * w.freq * 2.3 - t * w.speed * 0.8) +
                0.14 * Math.sin(nx * Math.PI * 2 * w.freq * 4.1 + t * w.speed * 1.6));
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = w.color;
        ctx.lineWidth = w.width;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    };

    const loop = (now: number) => {
      if (!running) return;
      if (visible && !document.hidden) draw(now);
      raf = requestAnimationFrame(loop);
    };

    const renderStatic = () => {
      // one frozen frame for reduced motion
      resize();
      draw(4200);
    };

    const start = () => {
      if (reduced) {
        renderStatic();
        return;
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    resize();
    start();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) renderStatic();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) stop();
      else start();
    });
    io.observe(canvas);

    const onVis = () => {
      if (!document.hidden && visible) start();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="relative mx-auto flex h-24 w-full max-w-2xl items-center justify-center">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Animated audio waveform"
        className="h-full w-full"
      />
    </div>
  );
}
