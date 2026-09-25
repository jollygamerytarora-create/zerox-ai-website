import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: string;
}

export default function FireDrop({ onComplete }: { onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const startTime = Date.now();
    let dropY = -60;
    const dropTargetY = canvas.height * 0.45;
    const dropX = canvas.width / 2;
    let hitBottom = false;
    let doneTime = 0;

    function spawnFireParticle(x: number, y: number) {
      const isViolet = Math.random() > 0.5;
      particles.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + 10,
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * -3 - 1,
        life: 1,
        size: Math.random() * 8 + 4,
        hue: isViolet ? "280" : "320",
      });
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = (Date.now() - startTime) / 1000;

      // Animate drop falling
      if (!hitBottom) {
        dropY = Math.min(
          dropY + (elapsed < 0.8 ? elapsed * 200 : 300),
          dropTargetY,
        );
        if (dropY >= dropTargetY) {
          hitBottom = true;
          doneTime = Date.now();
        }
      }

      // Spawn fire particles
      if (hitBottom) {
        for (let i = 0; i < 5; i++) spawnFireParticle(dropX, dropTargetY + 30);
      } else if (dropY > 0) {
        for (let i = 0; i < 3; i++) spawnFireParticle(dropX, dropY + 30);
      }

      // Draw glowing drop
      const grad = ctx.createRadialGradient(dropX, dropY, 0, dropX, dropY, 40);
      grad.addColorStop(0, "rgba(192,132,252,0.9)");
      grad.addColorStop(0.5, "rgba(126,34,206,0.5)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(dropX, dropY, 40, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Draw outer glow
      const outerGrad = ctx.createRadialGradient(
        dropX,
        dropY,
        0,
        dropX,
        dropY,
        80,
      );
      outerGrad.addColorStop(0, "rgba(192,132,252,0.22)");
      outerGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(dropX, dropY, 80, 0, Math.PI * 2);
      ctx.fillStyle = outerGrad;
      ctx.fill();

      // Draw "Z" symbol inside
      ctx.font = "bold 32px monospace";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "#e879f9";
      ctx.shadowBlur = 10;
      ctx.fillText("Z", dropX, dropY);
      ctx.shadowBlur = 0;

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.life -= 0.025;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        const color =
          p.hue === "280"
            ? `hsla(280, 100%, 70%, ${p.life})`
            : `hsla(${310 + Math.random() * 20}, 100%, 70%, ${p.life})`;
        ctx.fillStyle = color;
        ctx.fill();
      }

      // End after 2.5 seconds total
      if (hitBottom && Date.now() - doneTime > 2000) {
        cancelAnimationFrame(animRef.current);
        onComplete?.();
        return;
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
