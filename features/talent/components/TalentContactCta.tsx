import Button from "@/components/ui/Button";
import type { Talent } from "@/types/talent";

interface TalentContactCtaProps {
  talent: Talent;
}

export default function TalentContactCta({ talent }: TalentContactCtaProps) {
  const mailtoHref = `mailto:contacto@draconisenterprise.com?subject=${encodeURIComponent(
    `Interés en ${talent.name}`,
  )}`;

  return (
    <div className="flex flex-col items-start gap-4 border-t border-[var(--color-line)] pt-10 sm:flex-row sm:items-center sm:justify-between">
      <p className="max-w-md text-base leading-relaxed text-[var(--color-muted)]">
        ¿Te interesa trabajar con {talent.name}? Escríbenos y coordinamos los
        siguientes pasos.
      </p>
      <Button href={mailtoHref} variant="primary" tone="light">
        Consultar disponibilidad
      </Button>
    </div>
  );
}
