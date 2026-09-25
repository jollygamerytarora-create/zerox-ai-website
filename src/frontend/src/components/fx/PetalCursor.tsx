import { useEffect, useRef } from "react";
import "./PetalCursor.css";

/**
 * PetalCursor — a cute, elegant teardrop-petal cursor.
 * A translucent pink petal tilts toward its direction of travel;
 * a tiny sparkle dot rides just behind it. Over interactive elements
 * the petal blooms (grows + softens); on click it does a squeeze-bounce
 * and releases a small burst of petal sparks. Auto-disabled on touch /
 * reduced-motion; the native cursor stays visible.
 */
export default function PetalCursor() {
  const petalRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    const petal = petalRef.current;
    const spark = sparkRef.current;
    if (!petal || !spark) return undefined;

    // Petal becomes THE cursor: hide the native one while active
    // (never added on touch / reduced-motion — those keep the native cursor)
    const root = document.documentElement;
    root.classList.add("petal-cursor-on");

    let px = window.innerWidth / 2;
    let py = window.innerHeight / 2;
    let x = px;
    let y = py;
    let sx = px;
    let sy = py;
    let angle = 0;
    let raf = 0;
    let shown = false;
    let scale = 1;
    let targetScale = 1;
    let squish = 0; // click squeeze impulse
    let down = false;

    const loop = () => {
      const dx = px - x;
      const dy = py - y;

      // petal chases; sparkle trails further behind
      x += dx * 0.22;
      y += dy * 0.22;
      sx += (px - sx) * 0.1;
      sy += (py - sy) * 0.1;

      // tilt toward travel when actually moving
      const speed = Math.hypot(dx, dy);
      if (speed > 0.6) {
        const target = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        let diff = target - angle;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        angle += diff * 0.16;
      }

      // springy click squeeze
      squish *= 0.86;
      scale += (targetScale - scale) * 0.14;
      const s = scale * (1 + squish * 0.35);
      const sy2 = scale * (1 - squish * 0.28);

      petal.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%,-50%) rotate(${angle.toFixed(1)}deg) scale(${s.toFixed(3)}, ${sy2.toFixed(3)})`;
      spark.style.transform = `translate3d(${sx}px, ${sy}px, 0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!shown) {
        shown = true;
        layerRef.current?.style.setProperty("opacity", "1");
        x = sx = px;
        y = sy = py;
      }
    };

    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="link"]',
      );
      targetScale = el ? 1.45 : 1;
      petal.classList.toggle("is-bloom", !!el);
    };

    const burst = (cx: number, cy: number) => {
      for (let i = 0; i < 6; i++) {
        const p = document.createElement("span");
        const a = (Math.PI * 2 * i) / 6 + Math.random() * 0.7;
        const dist = 18 + Math.random() * 22;
        p.className = "petal-cursor__spark-bit";
        p.style.left = `${cx}px`;
        p.style.top = `${cy}px`;
        p.style.setProperty("--dx", `${Math.cos(a) * dist}px`);
        p.style.setProperty("--dy", `${Math.sin(a) * dist}px`);
        document.body.appendChild(p);
        const anim = p.animate(
          [
            { transform: "translate(-50%,-50%) scale(1)", opacity: 0.95 },
            {
              transform: `translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0)`,
              opacity: 0,
            },
          ],
          { duration: 460, easing: "cubic-bezier(0.22,1,0.36,1)" },
        );
        anim.onfinish = () => p.remove();
      }
    };

    const onDown = (e: PointerEvent) => {
      down = true;
      squish = 1;
      burst(e.clientX, e.clientY);
    };
    const onUp = () => {
      down = false;
      squish = 0.6;
    };

    const onLeaveDoc = () => {
      layerRef.current?.style.setProperty("opacity", "0");
      shown = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveDoc);
    raf = requestAnimationFrame(loop);

    return () => {
      root.classList.remove("petal-cursor-on");
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener(
        "pointerleave",
        onLeaveDoc,
      );
    };
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="petal-cursor-layer"
      style={{ opacity: 0, transition: "opacity 0.25s ease" }}
    >
      <div ref={petalRef} className="petal-cursor">
        <div className="petal-cursor__inner" />
      </div>
      <div ref={sparkRef} className="petal-cursor__spark" />
    </div>
  );
}
