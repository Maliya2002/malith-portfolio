import React, { useEffect, useRef } from "react";

const MouseTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const trail = [];
    const maxTrail = 30;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      trail.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        size: 3,
      });

      if (trail.length > maxTrail) {
        trail.shift();
      }
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = trail.length - 1; i >= 0; i--) {
        const point = trail[i];
        point.life -= 0.03;
        point.size *= 0.97;

        if (point.life <= 0) {
          trail.splice(i, 1);
          continue;
        }

        // Glow
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.size * 8
        );
        gradient.addColorStop(0, `rgba(0, 102, 255, ${point.life * 0.15})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${point.life * 0.05})`);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(
          point.x - point.size * 8,
          point.y - point.size * 8,
          point.size * 16,
          point.size * 16
        );

        // Core dot
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size * point.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${point.life * 0.4})`;
        ctx.fill();
      }

      // Connect trail points
      if (trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length; i++) {
          ctx.lineTo(trail[i].x, trail[i].y);
        }
        ctx.strokeStyle = `rgba(0, 102, 255, 0.08)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
};

export default MouseTrail;