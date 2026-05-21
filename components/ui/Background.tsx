"use client";
import { useEffect, useRef } from "react";

/* ── Layered atmospheric background ───────────────────────── */
export function GridLayer({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 grid-bg mask-radial ${className}`}
    />
  );
}

export function Spotlight({
  className = "",
  size = 800,
  opacity = 0.04,
  x = "50%",
  y = "30%",
}: {
  className?: string;
  size?: number;
  opacity?: number;
  x?: string;
  y?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, rgba(255,255,255,${opacity}), transparent 70%)`,
      }}
    />
  );
}

/* ── Subtle particle canvas (white only, lightweight) ───── */
export function ParticleField({ density = 36, opacity = 0.5 }: { density?: number; opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    type N = { x: number; y: number; vx: number; vy: number; r: number; pulse: number; alpha: number };
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const nodes: N[] = Array.from({ length: density }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.8,
      pulse: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.5 + 0.25,
    }));

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, W(), H());

      // Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 160) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.06 * (1 - d / 160)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        n.pulse += 0.022;
        const a = n.alpha * (0.7 + 0.3 * Math.sin(n.pulse));

        // glow
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        g.addColorStop(0, `rgba(255,255,255,${a * 0.3})`);
        g.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W()) n.vx *= -1;
        if (n.y < 0 || n.y > H()) n.vy *= -1;
      });

      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  );
}
