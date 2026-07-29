import type { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  href: string;
  variant: "primary" | "ghost";
  tone?: "light" | "dark";
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-medium uppercase tracking-[0.1em] transition-colors motion-safe:duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";

const variantStyles: Record<"light" | "dark", Record<"primary" | "ghost", string>> = {
  dark: {
    primary:
      "bg-[var(--color-paper)] text-[var(--color-obsidian)] hover:bg-[var(--color-accent)] hover:text-[var(--color-obsidian)]",
    ghost:
      "border border-[var(--color-line-dark)] text-[var(--color-obsidian-foreground)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
  },
  light: {
    primary:
      "bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)]",
    ghost:
      "border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent-ink)]",
  },
};

export default function Button({
  href,
  variant,
  tone = "dark",
  children,
}: ButtonProps) {
  const className = `${base} ${variantStyles[tone][variant]}`;

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
