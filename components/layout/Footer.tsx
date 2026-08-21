import Link from "next/link";
import Container from "@/components/ui/Container";
import { navLinks } from "@/components/layout/nav-links";
import { whatsappLink } from "@/features/contact/constants";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-obsidian)] text-[var(--color-obsidian-foreground)]">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-3 sm:py-20">
        <div>
          <p className="text-sm font-semibold tracking-[0.3em]">DRACONIS</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-muted-dark)]">
            Empresa cultural mexicana dedicada al desarrollo, representación y
            producción de talento artístico.
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
                href="mailto:contacto@draconisenterprise.com"
                className="text-sm text-[var(--color-obsidian-foreground)] transition-colors motion-safe:duration-300 hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                contacto@draconisenterprise.com
              </a>
            </li>
            <li>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-obsidian-foreground)] transition-colors motion-safe:duration-300 hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                +52 55 4904 5618
              </a>
            </li>
            <li className="text-sm text-[var(--color-muted-dark)]">
              Cuautitlán Izcalli, Estado de México
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-[var(--color-line-dark)]">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-[var(--color-muted-dark)] sm:flex-row">
          <p>
            © 2026 Draconis Enterprise. Todos los derechos reservados.
            {" "}Desarrollado por{" "}
            <a
              href="https://sstmexico.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-obsidian-foreground)] transition-colors motion-safe:duration-300 hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              SSTMéxico
            </a>
            .
          </p>
          <div className="flex gap-6">
            <Link
              href="/politica-privacidad"
              className="transition-colors motion-safe:duration-300 hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              Política de Privacidad
            </Link>
            <Link
              href="/aviso-privacidad"
              className="transition-colors motion-safe:duration-300 hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              Aviso de Privacidad
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
