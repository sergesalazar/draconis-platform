import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <section className="bg-[var(--color-paper)] pb-16 pt-32 sm:pb-20 sm:pt-40">
      <Container>
        <SectionLabel tone="light">{eyebrow}</SectionLabel>
        <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-fraunces)] text-4xl font-medium tracking-tight text-[var(--color-ink)] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
