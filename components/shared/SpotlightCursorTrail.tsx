"use client";

import { useEffect, useRef, useState } from "react";

const SPAWN_INTERVAL_MS = 45;
const PARTICLE_LIFETIME_MS = 700;
const MAX_PARTICLES = 18;

interface Glow {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function SpotlightCursorTrail() {
  const [trail, setTrail] = useState<Glow[]>([]);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const lastSpawn = useRef(0);
  const enabledRef = useRef(false);

  useEffect(() => {
    const fineMedia = window.matchMedia("(pointer: fine)");

    const updateEnabled = () => {
      enabledRef.current = fineMedia.matches;
    };
    updateEnabled();
    fineMedia.addEventListener("change", updateEnabled);

    function handleMouseMove(event: MouseEvent) {
      if (!enabledRef.current) return;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
        spotlightRef.current.style.opacity = "0.45";
      }

      const now = performance.now();
      if (now - lastSpawn.current < SPAWN_INTERVAL_MS) return;
      lastSpawn.current = now;

      const id = nextId.current++;
      const glow: Glow = {
        id,
        x: event.clientX,
        y: event.clientY,
        size: 12 + Math.random() * 10,
      };

      setTrail((prev) => {
        const next = [...prev, glow];
        return next.length > MAX_PARTICLES
          ? next.slice(next.length - MAX_PARTICLES)
          : next;
      });

      setTimeout(() => {
        setTrail((prev) => prev.filter((g) => g.id !== id));
      }, PARTICLE_LIFETIME_MS);
    }

    function handleMouseLeave() {
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = "0";
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
      fineMedia.removeEventListener("change", updateEnabled);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      {trail.map((glow) => (
        <div
          key={glow.id}
          className="absolute rounded-full"
          style={{
            left: glow.x,
            top: glow.y,
            width: glow.size,
            height: glow.size,
            background:
              "radial-gradient(circle, #ffffff 0%, transparent 70%)",
            filter: "blur(4px)",
            animation: `spotlight-fade ${PARTICLE_LIFETIME_MS}ms ease-out forwards`,
          }}
        />
      ))}
      <div
        ref={spotlightRef}
        className="absolute -left-14 -top-14 size-28 rounded-full opacity-0 transition-opacity motion-safe:duration-300"
        style={{
          background: "radial-gradient(circle, #ffffff 0%, transparent 65%)",
          filter: "blur(10px)",
        }}
      />
    </div>
  );
}
