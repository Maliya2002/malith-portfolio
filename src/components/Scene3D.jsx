import React, { useEffect, useRef } from "react";

const Scene3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let mouse = { x: -500, y: -500 };
    let smoothMouse = { x: -500, y: -500 };
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
      mouse = { x: e.clientX, y: e.clientY };
    });

    // ═══════ TECH ICONS ═══════
    const techIcons = [
      { name: "REACT", color: "97, 218, 251", x: 0.15, y: 0.2, speed: 0.4, size: 60 },
      { name: "NODE", color: "104, 217, 108", x: 0.85, y: 0.25, speed: 0.5, size: 55 },
      { name: "MONGO", color: "77, 179, 61", x: 0.75, y: 0.75, speed: 0.35, size: 50 },
      { name: "JS", color: "247, 223, 30", x: 0.1, y: 0.7, speed: 0.45, size: 45 },
      { name: "TS", color: "49, 120, 198", x: 0.9, y: 0.55, speed: 0.4, size: 50 },
      { name: "NEXT", color: "255, 255, 255", x: 0.5, y: 0.15, speed: 0.3, size: 55 },
      { name: "HTML", color: "227, 79, 38", x: 0.25, y: 0.85, speed: 0.35, size: 45 },
      { name: "CSS", color: "38, 77, 228", x: 0.7, y: 0.15, speed: 0.4, size: 45 },
      { name: "GIT", color: "240, 80, 51", x: 0.05, y: 0.45, speed: 0.5, size: 45 },
      { name: "SQL", color: "0, 117, 143", x: 0.95, y: 0.85, speed: 0.35, size: 45 },
      { name: "TAILWIND", color: "56, 189, 248", x: 0.4, y: 0.9, speed: 0.4, size: 50 },
      { name: "PHP", color: "119, 123, 180", x: 0.6, y: 0.4, speed: 0.3, size: 45 },
      { name: "API", color: "0, 212, 255", x: 0.3, y: 0.5, speed: 0.45, size: 50 },
      { name: "GITHUB", color: "255, 255, 255", x: 0.55, y: 0.65, speed: 0.35, size: 50 },
    ];

    // Gradient Orbs
    const orbs = [
      { x: 0.2, y: 0.15, r: 400, color: "0, 102, 255", speed: 0.0004, offset: 0, intensity: 0.05 },
      { x: 0.8, y: 0.85, r: 350, color: "139, 92, 246", speed: 0.0003, offset: 2, intensity: 0.04 },
      { x: 0.5, y: 0.5, r: 300, color: "236, 72, 153", speed: 0.00025, offset: 4, intensity: 0.03 },
    ];

    // Stars
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.15 + 0.03,
      speed: Math.random() * 0.03 + 0.008,
      phase: Math.random() * Math.PI * 2,
    }));

    // Small particles
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.08 + 0.02,
    }));

    // Draw hexagon shape for tech icons
    const drawHex = (ctx, x, y, size) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    // Draw code brackets
    const drawBrackets = (ctx, x, y, size, opacity, color) => {
      ctx.save();
      ctx.strokeStyle = `rgba(${color}, ${opacity})`;
      ctx.lineWidth = 1.5;
      ctx.font = `${size}px 'JetBrains Mono', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = `rgba(${color}, ${opacity * 0.7})`;
      ctx.fillText("</>", x, y);
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      // Smooth mouse
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.08;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.08;

      // ═══════ ORBS ═══════
      orbs.forEach((orb) => {
        const ox = canvas.width * orb.x + Math.sin(time * orb.speed + orb.offset) * 80;
        const oy = canvas.height * orb.y + Math.cos(time * orb.speed * 1.2 + orb.offset) * 60;

        const dx = smoothMouse.x - ox;
        const dy = smoothMouse.y - oy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const pull = Math.max(0, 1 - dist / 500) * 30;

        const fx = ox + (dx / dist) * pull;
        const fy = oy + (dy / dist) * pull;

        const g = ctx.createRadialGradient(fx, fy, 0, fx, fy, orb.r);
        g.addColorStop(0, `rgba(${orb.color},${orb.intensity})`);
        g.addColorStop(0.5, `rgba(${orb.color},${orb.intensity * 0.3})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // ═══════ MOUSE GLOW ═══════
      const mg = ctx.createRadialGradient(smoothMouse.x, smoothMouse.y, 0, smoothMouse.x, smoothMouse.y, 250);
      mg.addColorStop(0, "rgba(0,102,255,0.03)");
      mg.addColorStop(0.5, "rgba(0,102,255,0.01)");
      mg.addColorStop(1, "transparent");
      ctx.fillStyle = mg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ═══════ STARS ═══════
      stars.forEach((s) => {
        const twinkle = Math.sin(time * s.speed + s.phase) * 0.5 + 0.5;
        const op = s.opacity * (0.4 + twinkle * 0.6);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${op})`;
        ctx.fill();
      });

      // ═══════ TECH ICONS FLOATING ═══════
      techIcons.forEach((tech, i) => {
        // Position with floating motion
        const floatY = Math.sin(time * 0.005 * tech.speed + i) * 15;
        const floatX = Math.cos(time * 0.004 * tech.speed + i) * 10;
        const tx = canvas.width * tech.x + floatX;
        const ty = canvas.height * tech.y + floatY;

        // Mouse repel
        const dx = smoothMouse.x - tx;
        const dy = smoothMouse.y - ty;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        let finalX = tx;
        let finalY = ty;
        if (dist < 200) {
          const push = (200 - dist) / 200;
          finalX = tx - (dx / dist) * push * 30;
          finalY = ty - (dy / dist) * push * 30;
        }

        // Rotation
        const rotation = time * 0.003 * tech.speed * (i % 2 === 0 ? 1 : -1);

        ctx.save();
        ctx.translate(finalX, finalY);
        ctx.rotate(rotation);

        // Icon opacity based on distance to mouse
        const proximity = Math.max(0, 1 - dist / 400);
        const baseOpacity = 0.15 + proximity * 0.3;

        // Outer glow when mouse near
        if (proximity > 0.3) {
          const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, tech.size * 2);
          glow.addColorStop(0, `rgba(${tech.color}, ${proximity * 0.15})`);
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(0, 0, tech.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Hexagon outline
        drawHex(ctx, 0, 0, tech.size);
        ctx.strokeStyle = `rgba(${tech.color}, ${baseOpacity * 0.8})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner hexagon
        drawHex(ctx, 0, 0, tech.size * 0.7);
        ctx.strokeStyle = `rgba(${tech.color}, ${baseOpacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Fill background
        drawHex(ctx, 0, 0, tech.size * 0.85);
        ctx.fillStyle = `rgba(${tech.color}, ${baseOpacity * 0.05})`;
        ctx.fill();

        // Reset rotation for text
        ctx.rotate(-rotation);

        // Tech name text
        ctx.font = `bold ${tech.size * 0.28}px 'JetBrains Mono', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(${tech.color}, ${baseOpacity * 1.5})`;
        ctx.fillText(tech.name, 0, 0);

        // Corner accents
        const accentSize = tech.size * 0.15;
        ctx.strokeStyle = `rgba(${tech.color}, ${baseOpacity})`;
        ctx.lineWidth = 1;
        // Top-left
        ctx.beginPath();
        ctx.moveTo(-tech.size * 0.9, -tech.size * 0.5 + accentSize);
        ctx.lineTo(-tech.size * 0.9, -tech.size * 0.5);
        ctx.lineTo(-tech.size * 0.9 + accentSize, -tech.size * 0.5);
        ctx.stroke();
        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(tech.size * 0.9 - accentSize, tech.size * 0.5);
        ctx.lineTo(tech.size * 0.9, tech.size * 0.5);
        ctx.lineTo(tech.size * 0.9, tech.size * 0.5 - accentSize);
        ctx.stroke();

        ctx.restore();
      });

      // ═══════ CONNECTION LINES BETWEEN NEARBY TECH ICONS ═══════
      for (let i = 0; i < techIcons.length; i++) {
        const t1 = techIcons[i];
        const t1x = canvas.width * t1.x + Math.cos(time * 0.004 * t1.speed + i) * 10;
        const t1y = canvas.height * t1.y + Math.sin(time * 0.005 * t1.speed + i) * 15;

        for (let j = i + 1; j < techIcons.length; j++) {
          const t2 = techIcons[j];
          const t2x = canvas.width * t2.x + Math.cos(time * 0.004 * t2.speed + j) * 10;
          const t2y = canvas.height * t2.y + Math.sin(time * 0.005 * t2.speed + j) * 15;

          const dx = t1x - t2x;
          const dy = t1y - t2y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 250) {
            const opacity = (1 - dist / 250) * 0.05;
            ctx.beginPath();
            ctx.moveTo(t1x, t1y);
            ctx.lineTo(t2x, t2y);
            ctx.strokeStyle = `rgba(0, 102, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // ═══════ SMALL PARTICLES ═══════
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      });

      // ═══════ CODE SYMBOLS FLOATING ═══════
      const codeSymbols = [
        { symbol: "{ }", x: 0.4, y: 0.3, color: "0, 102, 255" },
        { symbol: "< />", x: 0.65, y: 0.5, color: "139, 92, 246" },
        { symbol: "( )", x: 0.2, y: 0.6, color: "236, 72, 153" },
        { symbol: "=>", x: 0.8, y: 0.4, color: "16, 185, 129" },
        { symbol: "[ ]", x: 0.35, y: 0.75, color: "245, 158, 11" },
      ];

      codeSymbols.forEach((sym, i) => {
        const sx = canvas.width * sym.x + Math.sin(time * 0.003 + i) * 20;
        const sy = canvas.height * sym.y + Math.cos(time * 0.004 + i) * 15;
        const opacity = 0.08 + Math.sin(time * 0.01 + i) * 0.03;

        ctx.font = "bold 32px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(${sym.color}, ${opacity})`;
        ctx.fillText(sym.symbol, sx, sy);
      });

      // ═══════ GRID ═══════
      ctx.strokeStyle = "rgba(255,255,255,0.01)";
      ctx.lineWidth = 0.5;
      const gs = 120;
      for (let x = 0; x < canvas.width; x += gs) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gs) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Grid dots near mouse
      for (let x = 0; x < canvas.width; x += gs) {
        for (let y = 0; y < canvas.height; y += gs) {
          const gd = Math.sqrt((smoothMouse.x - x) ** 2 + (smoothMouse.y - y) ** 2);
          if (gd < 200) {
            const op = 0.06 * (1 - gd / 200);
            ctx.beginPath();
            ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,102,255,${op})`;
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

export default Scene3D;