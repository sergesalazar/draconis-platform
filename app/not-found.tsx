import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section className="flex min-h-[100svh] items-center bg-[var(--color-obsidian)] text-[var(--color-obsidian-foreground)]">
          <Container>
            <SectionLabel tone="dark">Error 404</SectionLabel>
            <h1 className="mt-6 max-w-2xl font-[family-name:var(--font-fraunces)] text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
              Página no encontrada
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--color-muted-dark)]">
              No encontramos el contenido que buscas. Puede que el enlace
              haya cambiado o ya no esté disponible.
            </p>
            <div className="mt-10">
              <Button href="/" variant="primary" tone="dark">
                Volver al inicio
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
