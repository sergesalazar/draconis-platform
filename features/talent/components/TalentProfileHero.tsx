import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import { categories } from "@/features/talent/categories";
import type { Talent } from "@/types/talent";

interface TalentProfileHeroProps {
  talent: Talent;
}

export default function TalentProfileHero({ talent }: TalentProfileHeroProps) {
  const categoryLabel =
    categories.find((category) => category.value === talent.category)
      ?.label ?? talent.category;

  return (
    <section className="bg-[var(--color-paper)] pb-16 pt-32 sm:pb-20 sm:pt-40">
      <Container>
        <Link
          href="/talento/"
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-muted)] transition-colors motion-safe:duration-300 hover:text-[var(--color-accent-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          ← Volver al roster
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-start lg:gap-16">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--color-line)]">
            <Image
              src={`https://i.pravatar.cc/800?img=${talent.portraitSeed}`}
              alt={`${talent.name}, ${talent.role}`}
              fill
              sizes="(max-width: 1024px) 100vw, 22rem"
              className="object-cover"
            />
          </div>

          <div>
            <SectionLabel tone="light">{categoryLabel}</SectionLabel>
            <h1 className="mt-6 font-[family-name:var(--font-fraunces)] text-4xl font-medium tracking-tight text-[var(--color-ink)] sm:text-5xl">
              {talent.name}
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.15em] text-[var(--color-muted)]">
              {talent.role}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-[var(--color-line)] pt-8 sm:max-w-md">
              {talent.vitals.map((vital) => (
                <div key={vital.label}>
                  <dt className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">
                    {vital.label}
                  </dt>
                  <dd className="mt-2 text-base text-[var(--color-ink)]">
                    {vital.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
