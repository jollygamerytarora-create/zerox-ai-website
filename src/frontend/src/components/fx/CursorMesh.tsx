import { useEffect, useRef } from "react";

/**
 * Zerox mesh — a full-bleed interactive wireframe terrain.
 * A calm grid of nodes drifts slowly; the cursor COMPRESSES the mesh,
 * pulling nodes toward the pointer like a gravity well (with a soft
 * elastic recovery). Canvas 2D, DPR-aware, pauses when off-screen.
 * theme: "hero" (brighter, denser) | "page" (dimmer backdrop)
 */
export default function CursorMesh({
  theme = "hero",
  fixed = false,
  className = "",
}: {
  theme?: "hero" | "page";
  /** position: fixed (viewport backdrop) instead of absolute */
  fixed?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Mobile: the cursor-compression effect has no meaning on touch —
    // render a static frame and never start the rAF loop.
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
    if (isMobile) canvas.style.opacity = "0.45";

    const conf =
      theme === "hero"
        ? { gap: 64, alpha: 0.5, nodeR: 1.4, well: 190, depth: 26 }
        : { gap: 78, alpha: 0.26, nodeR: 1.1, well: 150, depth: 18 };

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;

    interface Node {
      bx: number; // base grid position
      by: number;
      x: number; // current
      y: number;
      vx: number;
      vy: number;
      phase: number;
    }
    let nodes: Node[] = [];
    let cols = 0;
    let rows = 0;

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, in: false };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / conf.gap) + 1;
      rows = Math.ceil(height / conf.gap) + 1;
      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * conf.gap;
          const by = r * conf.gap;
          nodes.push({
            bx,
            by,
            x: bx,
            y: by,
            vx: 0,
            vy: 0,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      pointer.in = true;
    };
    const onLeave = () => {
      pointer.in = false;
    };

    const step = (now: number) => {
      if (!running) return;
      const t = now * 0.001;

      // pointer easing — the well glides, never teleports
      if (pointer.in) {
        if (pointer.x < -999) {
          pointer.x = pointer.tx;
          pointer.y = pointer.ty;
        }
        pointer.x += (pointer.tx - pointer.x) * 0.12;
        pointer.y += (pointer.ty - pointer.y) * 0.12;
      }

      ctx.clearRect(0, 0, width, height);

      // physics: drift + cursor compression well
      for (const n of nodes) {
        const driftX = Math.sin(t * 0.4 + n.phase) * 2.2;
        const driftY = Math.cos(t * 0.32 + n.phase * 1.7) * 2.2;

        let fx = 0;
        let fy = 0;
        if (pointer.in && !reduced) {
          const dx = n.bx + driftX - pointer.x;
          const dy = n.by + driftY - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < conf.well && d > 0.001) {
            // inverse-square-ish pull, clamped — nodes rush INWARD
            const force = (1 - d / conf.well) ** 2 * conf.depth;
            fx = (dx / d) * -force;
            fy = (dy / d) * -force;
          }
        }

        // spring back to base
        const ax = (n.bx + driftX + fx - n.x) * 0.085;
        const ay = (n.by + driftY + fy - n.y) * 0.085;
        n.vx = (n.vx + ax) * 0.82;
        n.vy = (n.vy + ay) * 0.82;
        n.x += n.vx;
        n.y += n.vy;
      }

      // draw edges (rows + cols) — one path, one stroke
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(168,85,247,${conf.alpha * 0.55})`;
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const n = nodes[r * cols + c];
          if (c < cols - 1) {
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(nodes[r * cols + c + 1].x, nodes[r * cols + c + 1].y);
          }
          if (r < rows - 1) {
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(
              nodes[(r + 1) * cols + c].x,
              nodes[(r + 1) * cols + c].y,
            );
          }
        }
      }
      ctx.stroke();

      // nodes — brighter where compressed
      for (const n of nodes) {
        const disp = Math.hypot(n.x - n.bx, n.y - n.by) / conf.depth;
        const glow = Math.min(1, disp);
        const a = conf.alpha * (0.35 + glow * 0.9);
        ctx.fillStyle =
          glow > 0.45 ? `rgba(232,121,249,${a})` : `rgba(196,181,253,${a})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, conf.nodeR + glow * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    build();
    if (!isMobile) start();

    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !reduced && !isMobile) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVis = () => {
      if (document.hidden) stop();
      else if (running) start();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden={undefined}
      className={`pointer-events-none inset-0 h-full w-full ${
        fixed ? "fixed" : "absolute"
      } ${className}`}
      style={{ opacity: 0.85 }}
    />
  );
}
