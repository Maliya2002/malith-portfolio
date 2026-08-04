import React, { useEffect, useState } from "react";

const CurrentTime = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const options = { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Colombo" };
      setTime(now.toLocaleTimeString("en-US", options));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-white/10 text-[10px] font-mono tracking-wider hidden lg:block">
      SL — {time}
    </span>
  );
};

export default CurrentTime;