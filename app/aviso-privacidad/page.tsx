import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description:
    "Aviso de privacidad de Draconis Enterprise conforme a la LFPDPPP: datos que recabamos, finalidades del tratamiento y cómo ejercer tus derechos ARCO.",
};

export default function AvisoPrivacidadPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Legal"
          title="Aviso de Privacidad"
          description="En cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), este aviso explica cómo Draconis Enterprise recaba, usa y protege los datos personales de clientes, prospectos y del talento artístico que representa."
        />
        <section className="bg-[var(--color-paper)] pb-24 sm:pb-32">
          <Container className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-muted)]">
              Última actualización: agosto de 2026
            </p>

            <div className="mt-10 flex flex-col gap-14">
              <div>
                <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[var(--color-ink)] sm:text-3xl">
                  1. Identidad y domicilio del responsable
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
                  Draconis Enterprise, empresa cultural mexicana dedicada al
                  desarrollo, representación y producción de talento
                  artístico, con domicilio en Cuautitlán Izcalli, Estado de
                  México, es responsable del tratamiento de tus datos
                  personales conforme a este aviso. Puedes contactarnos en{" "}
                  <a
                    href="mailto:contacto@draconisenterprise.com"
                    className="text-[var(--color-accent-ink)] underline-offset-4 hover:underline"
                  >
                    contacto@draconisenterprise.com
                  </a>{" "}
                  o al +52 55 4904 5618.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[var(--color-ink)] sm:text-3xl">
                  2. Datos personales que recabamos
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
                  De clientes, prospectos y personas que nos contactan
                  recabamos datos de identificación y contacto: nombre,
                  correo electrónico, número telefónico, y cualquier dato que
                  decidas compartirnos voluntariamente en tu mensaje.
                </p>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
                  Del talento artístico que representamos, además de sus
                  datos de identificación y contacto, recabamos y tratamos
                  material fotográfico, material audiovisual y grabaciones
                  de voz, así como, en su caso, datos biométricos o de imagen
                  y voz necesarios para la gestión de su carrera, su
                  promoción y el cumplimiento de los contratos de
                  representación. Estos últimos pueden constituir datos
                  personales sensibles conforme a la ley, por lo que
                  solicitamos el consentimiento expreso del titular para su
                  tratamiento.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[var(--color-ink)] sm:text-3xl">
                  3. Finalidades del tratamiento
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
                  <strong className="text-[var(--color-ink)]">
                    Finalidades primarias:
                  </strong>{" "}
                  prestar servicios de representación, gestión y producción
                  artística; negociar y dar cumplimiento a contratos; y
                  coordinar presentaciones, campañas de promoción y demás
                  actividades propias de la carrera del talento representado.
                </p>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
                  <strong className="text-[var(--color-ink)]">
                    Finalidades secundarias:
                  </strong>{" "}
                  enviar boletines, invitaciones a eventos y novedades sobre
                  el talento representado o los servicios de Draconis
                  Enterprise. Puedes oponerte al tratamiento de tus datos
                  para estas finalidades secundarias en cualquier momento,
                  escribiendo a contacto@draconisenterprise.com, sin que ello
                  condicione de ninguna manera tu relación con Draconis
                  Enterprise.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[var(--color-ink)] sm:text-3xl">
                  4. Derechos ARCO
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
                  Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al
                  tratamiento de tus datos personales (derechos ARCO). Para
                  ejercerlos, envía tu solicitud a
                  contacto@draconisenterprise.com incluyendo: tu nombre
                  completo, un documento que acredite tu identidad (o la de
                  tu representante legal), una descripción clara del derecho
                  que deseas ejercer y de los datos sobre los que recae, y
                  cualquier documento que sustente tu solicitud.
                  Responderemos dentro de los plazos que establece la ley.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[var(--color-ink)] sm:text-3xl">
                  5. Medios para limitar el uso o divulgación de tus datos
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
                  Puedes solicitar en cualquier momento, a través de
                  contacto@draconisenterprise.com, que limitemos el uso o
                  divulgación de tus datos personales para fines distintos a
                  los estrictamente necesarios para la relación de
                  representación o prestación de servicios que mantengas con
                  nosotros.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[var(--color-ink)] sm:text-3xl">
                  6. Transferencia de datos
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
                  Para cumplir con las finalidades descritas, podemos
                  compartir los datos del talento representado con terceros
                  como plataformas de distribución y streaming, casas
                  productoras, medios de comunicación, y clientes o
                  contratantes que requieran su participación artística. No
                  transferimos datos personales a terceros sin tu
                  consentimiento, salvo en los casos que la ley permite sin
                  necesidad de éste.
                </p>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium text-[var(--color-ink)] sm:text-3xl">
                  7. Cambios a este aviso de privacidad
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
                  Este aviso puede modificarse derivado de nuevos
                  requerimientos legales, de nuestras propias necesidades o
                  de cambios en nuestras prácticas. Cualquier actualización
                  será publicada en esta misma página, indicando la fecha de
                  su última revisión.
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
