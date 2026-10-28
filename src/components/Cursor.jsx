import React, { useEffect, useRef, useState } from "react";

const Cursor = () => {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    setVisible(true);

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Dot follows INSTANTLY — no lag
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX - 2.5}px`;
        dotRef.current.style.top = `${e.clientY - 2.5}px`;
      }
    };
    document.addEventListener("mousemove", onMove, { passive: true });

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

    // Delegated hover detection. Attaching listeners to every interactive
    // element and re-scanning the whole document on each DOM mutation (the
    // typewriter alone mutates ~25x a second) made scrolling visibly janky.
    const INTERACTIVE =
      "a, button, .hover-trigger, input, textarea, select, [role='button']";

    const onOver = (e) => {
      if (e.target instanceof Element && e.target.closest(INTERACTIVE)) {
        setActive(true);
      }
    };

    const onOut = (e) => {
      if (e.target instanceof Element && e.target.closest(INTERACTIVE)) {
        setActive(false);
      }
    };

    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
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
