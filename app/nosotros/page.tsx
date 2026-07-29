import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import ClosingBanner from "@/components/shared/ClosingBanner";
import AboutContent from "@/features/about/components/AboutContent";

export const metadata: Metadata = {
  title: "Nosotros",
};

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Nosotros"
          title="Draconis Enterprise"
          description="Una agencia curatorial que acompaña carreras a largo plazo, no una agencia de volumen."
        />
        <AboutContent />
        <ClosingBanner
          heading="¿Trabajamos juntos?"
          body="Escríbenos y conversemos sobre tu proyecto o tu carrera."
          buttonLabel="Hablemos"
          buttonHref="/contacto/"
        />
      </main>
      <Footer />
    </>
  );
}
