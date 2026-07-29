import Image from "next/image";
import Container from "@/components/ui/Container";
import { aboutParagraphs, stats } from "@/features/about/data";

const ABOUT_COLLAGE_SEEDS = [18, 52, 8, 41];

export default function AboutContent() {
  return (
    <section className="bg-[var(--color-paper)] py-24 sm:py-32">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
        <div
          className="grid aspect-[4/5] w-full grid-cols-2 gap-4 lg:order-2"
          role="img"
          aria-label="Mosaico de retratos de parte del talento representado por Draconis"
        >
          {ABOUT_COLLAGE_SEEDS.map((seed, index) => (
            <div
              key={seed}
              className={`relative overflow-hidden bg-[var(--color-line)] ${
                index % 2 === 1 ? "mt-8" : "mb-8"
              }`}
            >
              <Image
                src={`https://i.pravatar.cc/600?img=${seed}`}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover grayscale"
              />
            </div>
          ))}
        </div>

        <div className="lg:order-1">
          <div className="flex flex-col gap-6">
            {aboutParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-[var(--color-line)] pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-[family-name:var(--font-fraunces)] text-3xl text-[var(--color-ink)] sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
