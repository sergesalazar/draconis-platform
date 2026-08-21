import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo funciona este sitio web de Draconis Enterprise: qué información se recolecta al navegarlo, cómo se protege y dónde consultar el Aviso de Privacidad.",
};

export default function PoliticaPrivacidadPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Legal"
          title="Política de Privacidad"
          description="Este documento explica cómo funciona este sitio web y qué ocurre con la información que compartes al navegarlo o al contactarnos a través de él."
        />
        <section className="bg-[var(--color-paper)] pb-24 sm:pb-32">
          <Container className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-muted)]">
              Última actualización: agosto de 2026
            </p>

            <div className="mt-10 flex flex-col gap-14">
              <div>
                <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[var(--color-ink)] sm:text-3xl">
                  1. Información que recolectamos a través de este sitio
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
                  Este sitio no tiene formularios que envíen información a un
                  servidor propio: los botones de contacto abren tu cliente
                  de correo o de WhatsApp para que nos escribas directamente.
                  Por eso, Draconis Enterprise solo recibe la información que
                  tú decides compartirnos por esos medios, como tu nombre,
                  correo, teléfono o el contenido de tu mensaje.
                </p>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
                  Actualmente este sitio no utiliza cookies de rastreo ni
                  herramientas de analítica de terceros. Si en el futuro se
                  incorpora alguna herramienta de este tipo, esta política
                  será actualizada para reflejarlo antes de su
                  implementación.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[var(--color-ink)] sm:text-3xl">
                  2. Seguridad de la información
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
                  Este sitio se publica como contenido estático, sin bases de
                  datos ni procesamiento de información en el servidor, lo
                  que reduce de forma importante los riesgos asociados al
                  almacenamiento de datos. Draconis Enterprise implementa
                  medidas razonables para proteger la información que recibe
                  a través de sus canales de contacto directo, aunque ningún
                  medio de transmisión por internet puede considerarse
                  absolutamente seguro.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[var(--color-ink)] sm:text-3xl">
                  3. Aviso de Privacidad y derechos ARCO
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
                  Para conocer con detalle qué datos personales recaba
                  Draconis Enterprise al representar y gestionar talento
                  artístico, las finalidades de dicho tratamiento y cómo
                  ejercer tus derechos de Acceso, Rectificación, Cancelación
                  y Oposición (ARCO), consulta nuestro{" "}
                  <Link
                    href="/aviso-privacidad/"
                    className="text-[var(--color-accent-ink)] underline-offset-4 hover:underline"
                  >
                    Aviso de Privacidad
                  </Link>
                  , documento que rige en materia de protección de datos
                  personales conforme a la LFPDPPP.
                </p>
              </div>

              <p className="text-xs leading-relaxed text-[var(--color-muted)]">
                Este documento es una plantilla de referencia; se recomienda
                su revisión por un profesional legal especializado en
                protección de datos antes de su publicación definitiva.
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
