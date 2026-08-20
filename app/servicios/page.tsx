import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/shared/PageHeader";
import ClosingBanner from "@/components/shared/ClosingBanner";
import ServicesList from "@/features/services/components/ServicesList";

export const metadata: Metadata = {
  title: "Servicios",
};

export default function ServiciosPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Servicios"
          title="Cómo trabajamos"
          description="Representación audiovisual, gestión de derechos literarios, producción musical y circulación de presentaciones culturales."
        />
        <section className="bg-[var(--color-paper)] pb-24 sm:pb-32">
          <Container>
            <ServicesList />
          </Container>
        </section>
        <ClosingBanner
          heading="¿Necesitas alguno de estos servicios?"
          body="Escríbenos y armamos una propuesta a medida."
          buttonLabel="Hablemos"
          buttonHref="/contacto/"
        />
      </main>
      <Footer />
    </>
  );
}
