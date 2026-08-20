import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/shared/PageHeader";
import ClosingBanner from "@/components/shared/ClosingBanner";
import TalentBrowser from "@/features/talent/components/TalentBrowser";

export const metadata: Metadata = {
  title: "Talento",
};

export default function TalentoPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Talento"
          title="Nuestro roster"
          description="Actores y actrices, directores, guionistas y dramaturgos, cantantes y raperos, músicos, productores musicales y compositores impulsados desde la cultura hip-hop hacia el teatro, la música y lo audiovisual."
        />
        <section className="bg-[var(--color-paper)] pb-24 sm:pb-32">
          <Container>
            <TalentBrowser />
          </Container>
        </section>
        <ClosingBanner
          heading="¿Buscas sumar talento a tu proyecto?"
          body="Escríbenos y te ayudamos a encontrar el perfil correcto."
          buttonLabel="Hablemos"
          buttonHref="/contacto/"
        />
      </main>
      <Footer />
    </>
  );
}
