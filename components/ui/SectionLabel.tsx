import type { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  tone?: "light" | "dark";
}

export default function SectionLabel({
  children,
  tone = "light",
}: SectionLabelProps) {
  const textColor =
    tone === "dark" ? "text-[var(--color-muted-dark)]" : "text-[var(--color-muted)]";

  return (
    <p
      className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] ${textColor}`}
    >
      <span aria-hidden="true" className="h-px w-8 bg-[var(--color-accent)]" />
      {children}
    </p>
  );
}
