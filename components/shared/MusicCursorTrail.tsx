"use client";

import { useEffect, useRef, useState } from "react";

const NOTE_CHARS = ["♪", "♫", "♬"];
const SPAWN_INTERVAL_MS = 70;
const PARTICLE_LIFETIME_MS = 1100;
const MAX_PARTICLES = 24;

interface Note {
  id: number;
  x: number;
  y: number;
  char: string;
  size: number;
  drift: number;
  rotate: number;
}

export default function MusicCursorTrail() {
  const [notes, setNotes] = useState<Note[]>([]);
  const nextId = useRef(0);
  const lastSpawn = useRef(0);
  const enabledRef = useRef(false);

  useEffect(() => {
    const fineMedia = window.matchMedia("(pointer: fine)");
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateEnabled = () => {
      enabledRef.current = fineMedia.matches && !motionMedia.matches;
    };
    updateEnabled();
    fineMedia.addEventListener("change", updateEnabled);
    motionMedia.addEventListener("change", updateEnabled);

    function handleMouseMove(event: MouseEvent) {
      if (!enabledRef.current) return;

      const now = performance.now();
      if (now - lastSpawn.current < SPAWN_INTERVAL_MS) return;
      lastSpawn.current = now;

      const id = nextId.current++;
      const note: Note = {
        id,
        x: event.clientX,
        y: event.clientY,
        char: NOTE_CHARS[Math.floor(Math.random() * NOTE_CHARS.length)],
        size: 14 + Math.random() * 10,
        drift: (Math.random() - 0.5) * 40,
        rotate: (Math.random() - 0.5) * 50,
      };

      setNotes((prev) => {
        const next = [...prev, note];
        return next.length > MAX_PARTICLES
          ? next.slice(next.length - MAX_PARTICLES)
          : next;
      });

      setTimeout(() => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
      }, PARTICLE_LIFETIME_MS);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      fineMedia.removeEventListener("change", updateEnabled);
      motionMedia.removeEventListener("change", updateEnabled);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      {notes.map((note) => (
        <span
          key={note.id}
          className="absolute select-none text-[var(--color-accent)]"
          style={
            {
              left: note.x,
              top: note.y,
              fontSize: note.size,
              "--drift": `${note.drift}px`,
              "--rotate": `${note.rotate}deg`,
              animation: `cursor-note-float ${PARTICLE_LIFETIME_MS}ms ease-out forwards`,
            } as React.CSSProperties
          }
        >
          {note.char}
        </span>
      ))}
    </div>
  );
}
