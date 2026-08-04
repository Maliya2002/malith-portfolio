import React, { useEffect, useRef } from "react";

const SmoothScroll = ({ children }) => {
  const scrollRef = useRef(null);
  const currentY = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const el = scrollRef.current;
    document.body.style.height = `${el.scrollHeight}px`;
    el.style.position = "fixed";
    el.style.top = "0";
    el.style.left = "0";
    el.style.width = "100%";

    const onScroll = () => {
      targetY.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll);

    const animate = () => {
      currentY.current += (targetY.current - currentY.current) * 0.08;
      el.style.transform = `translateY(${-currentY.current}px)`;
      requestAnimationFrame(animate);
    };
    animate();

    const resizeObserver = new ResizeObserver(() => {
      document.body.style.height = `${el.scrollHeight}px`;
    });
    resizeObserver.observe(el);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.style.height = "";
      resizeObserver.disconnect();
    };
  }, []);

  return <div ref={scrollRef}>{children}</div>;
};

export default SmoothScroll;