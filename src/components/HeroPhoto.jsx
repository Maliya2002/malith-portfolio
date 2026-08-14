import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const HeroPhoto = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let time = 0;
    let currentMouse = { x: 0.5, y: 0.5 };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.006;

      // Smooth mouse follow
      currentMouse.x += (mousePos.x - currentMouse.x) * 0.08;
      currentMouse.y += (mousePos.y - currentMouse.y) * 0.08;

      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.28;

      const mx = (currentMouse.x - 0.5) * 20;
      const my = (currentMouse.y - 0.5) * 20;

      // ═══════ BACKGROUND GLOW ═══════
      const bgGlow = ctx.createRadialGradient(
        cx + mx * 0.4, cy + my * 0.4, 0,
        cx + mx * 0.4, cy + my * 0.4, r * 2.5
      );
      bgGlow.addColorStop(0, `rgba(0, 102, 255, ${0.1 + Math.sin(time) * 0.03})`);
      bgGlow.addColorStop(0.4, `rgba(139, 92, 246, 0.04)`);
      bgGlow.addColorStop(1, "transparent");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, w, h);

      // ═══════ ROTATING DASHED RINGS ═══════
      for (let i = 0; i < 4; i++) {
        const ringR = r * (1.45 + i * 0.22);
        const opacity = 0.18 - i * 0.035;
        const speed = (0.15 + i * 0.1) * (i % 2 === 0 ? 1 : -1);

        ctx.save();
        ctx.translate(cx + mx * 0.2, cy + my * 0.2);
        ctx.rotate(time * speed);
        ctx.setLineDash([3, 8]);
        ctx.beginPath();
        ctx.ellipse(0, 0, ringR, ringR * 0.9, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 102, 255, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      // ═══════ SOLID GRADIENT RING ═══════
      ctx.beginPath();
      ctx.arc(cx + mx * 0.3, cy + my * 0.3, r * 1.35, 0, Math.PI * 2);
      const solidRing = ctx.createLinearGradient(
        cx - r * 1.35, cy,
        cx + r * 1.35, cy
      );
      solidRing.addColorStop(0, "rgba(0, 102, 255, 0.5)");
      solidRing.addColorStop(0.5, "rgba(139, 92, 246, 0.3)");
      solidRing.addColorStop(1, "rgba(236, 72, 153, 0.5)");
      ctx.strokeStyle = solidRing;
      ctx.lineWidth = 2;
      ctx.stroke();

      // ═══════ TECH LABELS ═══════
      const techLabels = [
        { name: "REACT", color: "0, 217, 255" },
        { name: "NEXT.JS", color: "255, 255, 255" },
        { name: "NODE.JS", color: "104, 217, 108" },
        { name: "MONGODB", color: "77, 179, 61" },
        { name: "TYPESCRIPT", color: "49, 120, 198" },
        { name: "TAILWIND", color: "56, 189, 248" },
      ];

      techLabels.forEach((tech, i) => {
        const angle = time * 0.2 + (i * Math.PI * 2) / techLabels.length;
        const labelR = r * 1.75;
        const lx = cx + Math.cos(angle) * labelR + mx * 0.15;
        const ly = cy + Math.sin(angle) * labelR * 0.9 + my * 0.15;

        ctx.font = "bold 9px 'JetBrains Mono', monospace";
        const textW = ctx.measureText(tech.name).width;

        // Background
        ctx.fillStyle = `rgba(10, 10, 10, 0.85)`;
        ctx.fillRect(lx - textW / 2 - 6, ly - 8, textW + 12, 16);

        // Border
        ctx.strokeStyle = `rgba(${tech.color}, 0.5)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(lx - textW / 2 - 6, ly - 8, textW + 12, 16);

        // Text
        ctx.fillStyle = `rgba(${tech.color}, 1)`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(tech.name, lx, ly);
      });

      // ═══════ ORBITING PARTICLES ═══════
      const particles = [
        { color: "0, 102, 255", r: r * 1.15, speed: 0.5, size: 5 },
        { color: "139, 92, 246", r: r * 1.25, speed: -0.4, size: 4 },
        { color: "236, 72, 153", r: r * 1.35, speed: 0.6, size: 4.5 },
        { color: "16, 185, 129", r: r * 1.4, speed: -0.7, size: 3.5 },
        { color: "245, 158, 11", r: r * 1.3, speed: 0.45, size: 4 },
      ];

      particles.forEach((p, i) => {
        const angle = time * p.speed + (i * Math.PI * 2) / particles.length;
        const ox = cx + Math.cos(angle) * p.r + mx * 0.25;
        const oy = cy + Math.sin(angle) * p.r * 0.85 + my * 0.25;

        // Glow
        const glow = ctx.createRadialGradient(ox, oy, 0, ox, oy, p.size * 8);
        glow.addColorStop(0, `rgba(${p.color}, 0.7)`);
        glow.addColorStop(0.5, `rgba(${p.color}, 0.15)`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(ox, oy, p.size * 8, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(ox, oy, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, 1)`;
        ctx.fill();

        // Inner white core
        ctx.beginPath();
        ctx.arc(ox, oy, p.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fill();
      });

      // ═══════ FLOATING DOTS ═══════
      for (let i = 0; i < 30; i++) {
        const dotAngle = time * 0.15 + (i * Math.PI * 2) / 30;
        const dotR = r * (1.1 + Math.sin(time * 0.5 + i) * 0.5);
        const dx = cx + Math.cos(dotAngle * (1 + i * 0.05)) * dotR + mx * 0.1;
        const dy = cy + Math.sin(dotAngle * (0.7 + i * 0.03)) * dotR * 0.7 + my * 0.1;
        const dotOpacity = 0.2 + Math.sin(time * 2 + i) * 0.1;

        ctx.beginPath();
        ctx.arc(dx, dy, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dotOpacity})`;
        ctx.fill();
      }

      // ═══════ SCANNING LINE ═══════
      const scanY = cy + Math.sin(time * 0.4) * r * 0.9;
      const scanGrad = ctx.createLinearGradient(0, scanY - 25, 0, scanY + 25);
      scanGrad.addColorStop(0, "transparent");
      scanGrad.addColorStop(0.5, "rgba(0, 102, 255, 0.2)");
      scanGrad.addColorStop(1, "transparent");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(cx - r * 1.2, scanY - 25, r * 2.4, 50);

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [mousePos]);

  const handleMouse = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const photoOffsetX = (mousePos.x - 0.5) * 15;
  const photoOffsetY = (mousePos.y - 0.5) * 15;
  const rotateY = (mousePos.x - 0.5) * 10;
  const rotateX = -(mousePos.y - 0.5) * 10;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouse}
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: "1000px" }}
    >
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Photo */}
      <motion.div
        className="relative z-10"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          transform: `translate(${photoOffsetX}px, ${photoOffsetY}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(0,102,255,0.4), transparent 70%)",
            transform: "scale(1.6)",
            animation: "pulse 3s ease-in-out infinite",
          }}
        />

        {/* Photo Container */}
        <div className="relative w-72 h-72 md:w-80 md:h-80">
          {/* Animated gradient border */}
          <div
            className="absolute inset-0 rounded-full p-[3px]"
            style={{
              background: "linear-gradient(135deg, #0066FF, #8B5CF6, #EC4899, #10B981, #0066FF)",
              backgroundSize: "300% 300%",
              animation: "gradientFlow 6s linear infinite",
            }}
          >
            {/* Inner circle with photo */}
            <div className="w-full h-full rounded-full overflow-hidden bg-[#050505] relative">
              <img
                src="/malith.png"
                alt="Malith Madushan"
                className="w-full h-full object-cover"
                style={{
                  filter: "brightness(1.05) contrast(1.08) saturate(1.1)",
                }}
              />

              {/* Photo overlay gradient */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(135deg, rgba(0,102,255,0.08) 0%, transparent 50%, rgba(139,92,246,0.08) 100%)",
                }}
              />
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-blue rounded-tr-xl" />
          <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-purple rounded-bl-xl" />
          <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-pink rounded-tl-xl" />
          <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-green rounded-br-xl" />
        </div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.6 }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2.5 flex items-center gap-2.5 shadow-2xl">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <div className="w-2 h-2 rounded-full bg-green-400 absolute inset-0 animate-ping" />
            </div>
            <span className="text-white text-[10px] font-mono tracking-[0.15em] font-semibold">
              AVAILABLE FOR HIRE
            </span>
          </div>
        </motion.div>

        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: 0.6 }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="bg-blue/90 backdrop-blur-xl border border-blue/30 rounded-full px-4 py-1.5 shadow-2xl">
            <span className="text-white text-[9px] font-mono tracking-[0.15em] font-bold">
              FULL STACK DEV
            </span>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default HeroPhoto;