"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType } from "react";

interface AnimatedWordsProps {
  text: string;
  as?: ElementType;
  className?: string;
}

export default function AnimatedWords({
  text,
  as: Tag = "span",
  className,
}: AnimatedWordsProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-out"
          style={{
            transitionDelay: `${index * 65}ms`,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(0.4em)",
          }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
