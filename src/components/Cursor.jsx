import React, { useEffect, useRef, useState } from "react";

const Cursor = () => {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (window.innerWidth < 768) return;
    setVisible(true);

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Dot follows INSTANTLY — no lag
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX - 2.5}px`;
        dotRef.current.style.top = `${e.clientY - 2.5}px`;
      }
    };
    document.addEventListener("mousemove", onMove);

    // Ring follows with smooth lerp
    let animId;
    const animateRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x - 20}px`;
        ringRef.current.style.top = `${ring.current.y - 20}px`;
      }

      animId = requestAnimationFrame(animateRing);
    };
    animateRing();

    const enter = () => setActive(true);
    const leave = () => setActive(false);

    const updateHovers = () => {
      document.querySelectorAll("a, button, .hover-trigger, input, textarea").forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };

    updateHovers();
    const obs = new MutationObserver(updateHovers);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMove);
      obs.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        ref={ringRef}
        className={`cursor-ring ${active ? "active" : ""}`}
      />
      <div
        ref={dotRef}
        className={`cursor-dot ${active ? "active" : ""}`}
      />
    </>
  );
};

export default Cursor;