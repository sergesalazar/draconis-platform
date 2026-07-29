import Button from "@/components/ui/Button";

export default function ContactInfo() {
  return (
    <div className="flex flex-col items-start gap-10">
      <Button
        href="mailto:hola@draconisenterprise.com"
        variant="primary"
        tone="light"
      >
        Escribir a hola@draconisenterprise.com
      </Button>

      <dl className="flex flex-col gap-6 border-t border-[var(--color-line)] pt-8">
        <div>
          <dt className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">
            Email
          </dt>
          <dd className="mt-2 text-lg text-[var(--color-ink)]">
            hola@draconisenterprise.com
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">
            Ubicación
          </dt>
          <dd className="mt-2 text-lg text-[var(--color-ink)]">
            Ciudad de México, México
          </dd>
        </div>
      </dl>
    </div>
  );
}
