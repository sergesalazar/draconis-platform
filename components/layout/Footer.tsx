import Link from "next/link";
import Container from "@/components/ui/Container";
import { navLinks } from "@/components/layout/nav-links";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-obsidian)] text-[var(--color-obsidian-foreground)]">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-3 sm:py-20">
        <div>
          <p className="text-sm font-semibold tracking-[0.3em]">DRACONIS</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-muted-dark)]">
            Representación de talento con visión estratégica y mirada
            cinematográfica.
          </p>
          <p className="mt-8 text-xs text-[var(--color-muted-dark)]">
            © 2026 Draconis Enterprise. Todos los derechos reservados.
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted-dark)]">
            Navegación
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[var(--color-obsidian-foreground)] transition-colors motion-safe:duration-300 hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted-dark)]">
            Contacto
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            <li>
              <a
                href="mailto:hola@draconisenterprise.com"
                className="text-sm text-[var(--color-obsidian-foreground)] transition-colors motion-safe:duration-300 hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                hola@draconisenterprise.com
              </a>
            </li>
            <li className="text-sm text-[var(--color-muted-dark)]">
              Ciudad de México, México
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
