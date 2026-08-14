import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
  { name: "REACT", color: "#61DAFB" },
  { name: "NEXT.JS", color: "#FFFFFF" },
  { name: "NODE", color: "#68D96C" },
  { name: "MONGODB", color: "#4DB33D" },
  { name: "TYPESCRIPT", color: "#3178C6" },
  { name: "JAVASCRIPT", color: "#F7DF1E" },
  { name: "TAILWIND", color: "#38BDF8" },
  { name: "EXPRESS", color: "#FFFFFF" },
  { name: "MYSQL", color: "#4479A1" },
  { name: "PHP", color: "#777BB4" },
  { name: "HTML", color: "#E34F26" },
  { name: "CSS", color: "#1572B6" },
  { name: "GIT", color: "#F05033" },
  { name: "GITHUB", color: "#FFFFFF" },
  { name: "FIGMA", color: "#F24E1E" },
  { name: "POSTMAN", color: "#FF6C37" },
  { name: "VERCEL", color: "#FFFFFF" },
  { name: "PYTHON", color: "#3776AB" },
  { name: "REST API", color: "#00D4FF" },
  { name: "PRISMA", color: "#2D3748" },
];

const SkillsGlobe = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const mouseRef = useRef({ x: 0, y: 0, down: false, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let currentRot = { x: 0, y: 0 };
    let targetRot = { x: 0, y: 0 };
    let auto = { x: 0, y: 0 };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate sphere points
    const points = [];
    const radius = 150;
    skills.forEach((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      points.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        skill,
      });
    });

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Auto rotation
      if (autoRotate && !mouseRef.current.down) {
        auto.x += 0.003;
        auto.y += 0.002;
        targetRot = { x: auto.x, y: auto.y };
      }

      // Smooth transition
      currentRot.x += (targetRot.x - currentRot.x) * 0.1;
      currentRot.y += (targetRot.y - currentRot.y) * 0.1;

      // Rotate and project points
      const projected = points.map((p) => {
        // Rotate Y
        let x = p.x * Math.cos(currentRot.y) - p.z * Math.sin(currentRot.y);
        let z = p.x * Math.sin(currentRot.y) + p.z * Math.cos(currentRot.y);
        // Rotate X
        let y = p.y * Math.cos(currentRot.x) - z * Math.sin(currentRot.x);
        z = p.y * Math.sin(currentRot.x) + z * Math.cos(currentRot.x);

        // Perspective
        const scale = 400 / (400 + z);
        return {
          x: cx + x * scale,
          y: cy + y * scale,
          z,
          scale,
          skill: p.skill,
        };
      });

      // Sort by z (depth)
      projected.sort((a, b) => a.z - b.z);

      // Draw connections
      projected.forEach((p1, i) => {
        projected.forEach((p2, j) => {
          if (i >= j) return;
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            const alpha = ((1 - dist / 60) * (p1.scale + p2.scale)) / 4;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 102, 255, ${alpha * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Draw points and labels
      projected.forEach((p) => {
        const alpha = p.scale;

        // Dot glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 20 * p.scale);
        glow.addColorStop(0, `${p.skill.color}30`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 20 * p.scale, 0, Math.PI * 2);
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = p.skill.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Label
        ctx.font = `bold ${10 * p.scale}px 'JetBrains Mono', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
        ctx.fillText(p.skill.name, p.x, p.y + 15 * p.scale);

        ctx.globalAlpha = 1;
      });

      animId = requestAnimationFrame(animate);
    };

    // Mouse interaction
    const handleMouseDown = (e) => {
      mouseRef.current.down = true;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const handleMouseMove = (e) => {
      if (!mouseRef.current.down) return;
      const dx = e.clientX - mouseRef.current.lastX;
      const dy = e.clientY - mouseRef.current.lastY;
      targetRot.y += dx * 0.01;
      targetRot.x -= dy * 0.01;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const handleMouseUp = () => {
      mouseRef.current.down = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [autoRotate]);

  return (
    <section className="py-32 border-b border-white/[0.05]" ref={ref}>
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-blue text-xs font-mono tracking-[0.2em]">07</span>
          <div className="h-[1px] flex-1 max-w-[60px] bg-white/10" />
          <span className="text-slate-500 text-xs font-mono tracking-[0.2em] uppercase">Tech Universe</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-4 text-white text-center"
        >
          My Tech <span className="text-blue">Universe</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-sm text-center mb-12 font-mono"
        >
          Drag to rotate · Interactive 3D globe
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative h-[500px] cursor-grab active:cursor-grabbing"
        >
          <canvas ref={canvasRef} className="w-full h-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsGlobe;