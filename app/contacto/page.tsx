import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/shared/PageHeader";
import ContactInfo from "@/features/contact/components/ContactInfo";

export const metadata: Metadata = {
  title: "Contacto",
};

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Contacto"
          title="Hablemos"
          description="Escríbenos directamente por correo. Respondemos cada mensaje de forma personal."
        />
        <section className="bg-[var(--color-paper)] pb-24 sm:pb-32">
          <Container>
            <ContactInfo />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
