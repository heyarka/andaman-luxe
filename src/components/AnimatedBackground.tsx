import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.002;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = "rgba(59, 130, 246, 0.08)";
      ctx.lineWidth = 0.5;
      const gridSize = 60;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Highlight grid intersections with pulsing dots
      const dotAlpha = 0.15 + Math.sin(time * 3) * 0.08;
      ctx.fillStyle = `rgba(59, 130, 246, ${dotAlpha})`;
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw floating orbs
      const orbs = [
        { x: 0.2 + Math.sin(time * 0.7) * 0.15, y: 0.3 + Math.cos(time * 0.5) * 0.1, r: 350, color: "59, 130, 246", alpha: 0.14 },
        { x: 0.8 + Math.sin(time * 0.5 + 2) * 0.12, y: 0.5 + Math.cos(time * 0.8 + 1) * 0.15, r: 300, color: "217, 160, 45", alpha: 0.1 },
        { x: 0.5 + Math.sin(time * 0.6 + 4) * 0.18, y: 0.7 + Math.cos(time * 0.4 + 3) * 0.12, r: 250, color: "139, 92, 246", alpha: 0.1 },
      ];

      orbs.forEach((orb) => {
        const gradient = ctx.createRadialGradient(
          orb.x * canvas.width, orb.y * canvas.height, 0,
          orb.x * canvas.width, orb.y * canvas.height, orb.r
        );
        gradient.addColorStop(0, `rgba(${orb.color}, ${orb.alpha})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Scanning diagonal lines — more visible
      for (let i = 0; i < 5; i++) {
        const offset = (time * 100 + i * 350) % (canvas.width + canvas.height + 400) - 200;
        const lineAlpha = 0.08 + Math.sin(time * 2 + i) * 0.04;
        ctx.strokeStyle = `rgba(59, 130, 246, ${lineAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(offset, 0);
        ctx.lineTo(offset - canvas.height * 0.6, canvas.height);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;
