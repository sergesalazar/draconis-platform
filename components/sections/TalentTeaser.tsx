import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import TalentGrid from "@/components/shared/TalentGrid";
import { talents } from "@/features/talent/data";

const featuredTalents = talents
  .filter((talent) => talent.featured)
  .slice(0, 8);

export default function TalentTeaser() {
  return (
    <section className="bg-[var(--color-paper)] py-24 sm:py-32">
      <Container>
        <SectionLabel tone="light">Talento destacado</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-[family-name:var(--font-fraunces)] text-4xl font-medium tracking-tight text-[var(--color-ink)] sm:text-5xl">
          Nuestro roster
        </h2>

        <div className="mt-14">
          <TalentGrid talents={featuredTalents} />
        </div>

        <div className="mt-14">
          <Button href="/talento/" variant="ghost" tone="light">
            Ver todo el talento
          </Button>
        </div>
      </Container>
    </section>
  );
}
