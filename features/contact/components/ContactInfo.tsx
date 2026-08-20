import Button from "@/components/ui/Button";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { whatsappLink } from "@/features/contact/constants";

export default function ContactInfo() {
  return (
    <div className="flex flex-col items-start gap-10">
      <div className="flex flex-wrap gap-4">
        <Button href={whatsappLink} variant="primary" tone="light">
          <WhatsAppIcon className="size-4" />
          Escribir por WhatsApp
        </Button>
        <Button
          href="mailto:contacto@draconisenterprise.com"
          variant="ghost"
          tone="light"
        >
          Escribir por correo
        </Button>
      </div>

      <dl className="flex flex-col gap-6 border-t border-[var(--color-line)] pt-8">
        <div>
          <dt className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">
            WhatsApp
          </dt>
          <dd className="mt-2 text-lg text-[var(--color-ink)]">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors motion-safe:duration-300 hover:text-[var(--color-accent-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              <WhatsAppIcon className="size-4 text-[var(--color-accent-ink)]" />
              +52 55 4904 5618
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">
            Email
          </dt>
          <dd className="mt-2 text-lg text-[var(--color-ink)]">
            contacto@draconisenterprise.com
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">
            Teléfono
          </dt>
          <dd className="mt-2 text-lg text-[var(--color-ink)]">
            <a
              href="tel:+525549045618"
              className="transition-colors motion-safe:duration-300 hover:text-[var(--color-accent-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              +52 55 4904 5618
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">
            Ubicación
          </dt>
          <dd className="mt-2 text-lg text-[var(--color-ink)]">
            Cuautitlán Izcalli, Estado de México
          </dd>
        </div>
      </dl>
    </div>
  );
}
