import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/shared/PageHeader";
import ClosingBanner from "@/components/shared/ClosingBanner";
import PortfolioBrowser from "@/features/portfolio/components/PortfolioBrowser";

export const metadata: Metadata = {
  title: "Portafolio",
};

export default function PortafolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Portafolio"
          title="Proyectos en desarrollo"
          description="Un registro documental de las producciones musicales, audiovisuales, escénicas y presentaciones en vivo que vamos trabajando junto a nuestro roster de talento."
        />
        <section className="bg-[var(--color-paper)] pb-24 sm:pb-32">
          <Container>
            <PortfolioBrowser />
          </Container>
        </section>
        <ClosingBanner
          heading="¿Tienes un proyecto en mente?"
          body="Escríbenos y platicamos cómo darle forma junto a nuestro talento."
          buttonLabel="Hablemos"
          buttonHref="/contacto/"
        />
      </main>
      <Footer />
    </>
  );
}
