"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (e: MouseEvent) => {
      glow.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 pointer-events-none z-[-1] w-[300px] h-[300px] rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(233,69,96,0.08) 0%, rgba(233,69,96,0.03) 40%, transparent 70%)",
        transition: "transform 0.15s ease-out",
      }}
    />
  );
}
