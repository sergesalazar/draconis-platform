import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[var(--color-obsidian)] text-[var(--color-obsidian-foreground)]">
      {/* Decorative studio backdrop: layered radial vignette + grain, no
          stock photography — placeholder photo services return unrelated
          subject matter (verified: unusable for a talent-agency hero). */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 85% 20%, rgba(176,141,87,0.16), transparent 60%), radial-gradient(ellipse 60% 60% at 10% 90%, rgba(246,244,239,0.06), transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[20vw] -right-[20vw] h-[70vw] w-[70vw] opacity-[0.14] sm:-bottom-[13vw] sm:-right-[13vw] sm:h-[46vw] sm:w-[46vw]"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/logo-blanco.webp`}
          alt=""
          fill
          sizes="70vw"
          className="object-contain"
        />
      </div>

      <Container className="relative z-10 pt-24">
        <SectionLabel tone="dark">
          Empresa cultural mexicana
        </SectionLabel>
        <h1 className="mt-6 max-w-4xl font-[family-name:var(--font-fraunces)] text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          El lugar donde puedes brillar.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted-dark)]">
          Desarrollamos, representamos y producimos talento artístico desde la
          cultura hip-hop hacia el teatro, la música, los medios audiovisuales
          y la literatura.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/talento/" variant="primary" tone="dark">
            Ver talento
          </Button>
          <Button href="/contacto/" variant="ghost" tone="dark">
            Contáctanos
          </Button>
        </div>
      </Container>
    </section>
  );
}
