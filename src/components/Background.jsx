import React, { useEffect, useRef } from "react";

const Background = () => {
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

    // Orbs
    const orbs = [
      { x: 0.2, y: 0.15, r: 450, color: "0,102,255", speed: 0.0004, offset: 0, intensity: 0.06 },
      { x: 0.8, y: 0.85, r: 400, color: "139,92,246", speed: 0.0003, offset: 2, intensity: 0.045 },
      { x: 0.5, y: 0.5, r: 380, color: "236,72,153", speed: 0.00025, offset: 4, intensity: 0.035 },
      { x: 0.9, y: 0.2, r: 320, color: "6,182,212", speed: 0.00035, offset: 1, intensity: 0.025 },
    ];

    // Stars — precalculated
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1 + 0.3,
      baseOpacity: Math.random() * 0.12 + 0.02,
      speed: Math.random() * 0.03 + 0.008,
      phase: Math.random() * Math.PI * 2,
    }));

    // Particles — reduced count
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.08 + 0.02,
      color: ["0,102,255", "139,92,246", "255,255,255"][Math.floor(Math.random() * 3)],
    }));

    // Shooting stars
    const shootingStars = [];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      // Smooth mouse — FAST lerp
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.08;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.08;

      // Orbs
      orbs.forEach((orb) => {
        const ox = canvas.width * orb.x + Math.sin(time * orb.speed + orb.offset) * 100;
        const oy = canvas.height * orb.y + Math.cos(time * orb.speed * 1.2 + orb.offset) * 80;

        const dx = smoothMouse.x - ox;
        const dy = smoothMouse.y - oy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const pull = Math.max(0, 1 - dist / 600) * 35;

        const fx = ox + (dx / dist) * pull;
        const fy = oy + (dy / dist) * pull;

        const g = ctx.createRadialGradient(fx, fy, 0, fx, fy, orb.r);
        g.addColorStop(0, `rgba(${orb.color},${orb.intensity})`);
        g.addColorStop(0.5, `rgba(${orb.color},${orb.intensity * 0.3})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Mouse glow
      const mg = ctx.createRadialGradient(smoothMouse.x, smoothMouse.y, 0, smoothMouse.x, smoothMouse.y, 280);
      mg.addColorStop(0, "rgba(0,102,255,0.035)");
      mg.addColorStop(0.5, "rgba(0,102,255,0.012)");
      mg.addColorStop(1, "transparent");
      ctx.fillStyle = mg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      stars.forEach((s) => {
        const twinkle = Math.sin(time * s.speed + s.phase) * 0.5 + 0.5;
        const op = s.baseOpacity * (0.4 + twinkle * 0.6);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${op})`;
        ctx.fill();
      });

      // Particles + connections
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse push
        const pdx = smoothMouse.x - p.x;
        const pdy = smoothMouse.y - p.y;
        const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
        if (pdist < 160) {
          p.x -= (pdx / pdist) * 1.5;
          p.y -= (pdy / pdist) * 1.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
        ctx.fill();
      });

      // Particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / 100) * 0.02})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }

        // Mouse connections
        const mx = smoothMouse.x - particles[i].x;
        const my = smoothMouse.y - particles[i].y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < 180) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(smoothMouse.x, smoothMouse.y);
          ctx.strokeStyle = `rgba(0,102,255,${(1 - md / 180) * 0.05})`;
          ctx.lineWidth = 0.3;
          ctx.stroke();
        }
      }

      // Shooting stars
      if (Math.random() > 0.996 && shootingStars.length < 2) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.4,
          vx: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 4 + 3),
          vy: Math.random() * 2 + 1,
          life: 1,
          decay: 0.012 + Math.random() * 0.008,
        });
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life -= ss.decay;
        if (ss.life <= 0) { shootingStars.splice(i, 1); continue; }

        const tx = ss.x - ss.vx * 15;
        const ty = ss.y - ss.vy * 15;
        const sg = ctx.createLinearGradient(tx, ty, ss.x, ss.y);
        sg.addColorStop(0, "transparent");
        sg.addColorStop(1, `rgba(255,255,255,${ss.life * 0.35})`);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = sg;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Grid
      ctx.strokeStyle = "rgba(255,255,255,0.01)";
      ctx.lineWidth = 0.5;
      const gs = 120;
      for (let x = 0; x < canvas.width; x += gs) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gs) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Grid dots near mouse
      for (let x = 0; x < canvas.width; x += gs) {
        for (let y = 0; y < canvas.height; y += gs) {
          const gd = Math.sqrt((smoothMouse.x - x) ** 2 + (smoothMouse.y - y) ** 2);
          if (gd < 250) {
            const op = 0.06 * (1 - gd / 250);
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

export default Background;