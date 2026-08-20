"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { navLinks } from "@/components/layout/nav-links";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-line-dark)] bg-[var(--color-obsidian)]/80 backdrop-blur-md">
      <nav aria-label="Principal">
        <Container className="flex items-center justify-between py-5">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo-blanco.webp"
              alt="Draconis Enterprise"
              width={48}
              height={45}
              className="h-12 w-auto"
              priority
            />
            <span className="whitespace-nowrap text-[11px] font-semibold tracking-[0.12em] text-[var(--color-obsidian-foreground)] sm:text-xs sm:tracking-[0.2em]">
              DRACONIS ENTERPRISE
            </span>
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-muted-dark)] transition-colors motion-safe:duration-300 hover:text-[var(--color-obsidian-foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contacto/" variant="primary" tone="dark">
              Hablemos
            </Button>
          </div>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center text-[var(--color-obsidian-foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] md:hidden"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              {isOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </Container>

        <div
          id="mobile-menu"
          className={`${
            isOpen ? "flex" : "hidden"
          } w-full flex-col gap-1 border-t border-[var(--color-line-dark)] px-6 pb-6 pt-2 md:hidden`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-3 text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-muted-dark)] transition-colors motion-safe:duration-300 hover:text-[var(--color-obsidian-foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Button href="/contacto/" variant="primary" tone="dark">
              Hablemos
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
