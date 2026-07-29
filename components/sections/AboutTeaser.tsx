import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import { aboutTeaser } from "@/features/home/content";

export default function AboutTeaser() {
  return (
    <section className="bg-[var(--color-paper)] py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <SectionLabel tone="light">{aboutTeaser.eyebrow}</SectionLabel>
          <h2 className="mt-6 font-[family-name:var(--font-fraunces)] text-4xl font-medium tracking-tight text-[var(--color-ink)] sm:text-5xl">
            {aboutTeaser.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
            {aboutTeaser.body}
          </p>
          <div className="mt-10">
            <Button href="/nosotros/" variant="ghost" tone="light">
              Conocer más
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
