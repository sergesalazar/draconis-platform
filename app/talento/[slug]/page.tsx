import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import TalentProfileHero from "@/features/talent/components/TalentProfileHero";
import TalentContactCta from "@/features/talent/components/TalentContactCta";
import { talents } from "@/features/talent/data";

export const dynamicParams = false;

export async function generateStaticParams() {
  return talents.map((talent) => ({ slug: talent.slug }));
}

interface TalentProfilePageProps {
  params: Promise<{ slug: string }>;
}

function findTalent(slug: string) {
  return talents.find((talent) => talent.slug === slug);
}

export async function generateMetadata({
  params,
}: TalentProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const talent = findTalent(slug);

  return {
    title: talent ? talent.name : "Talento",
  };
}

export default async function TalentProfilePage({
  params,
}: TalentProfilePageProps) {
  const { slug } = await params;
  const talent = findTalent(slug);

  if (!talent) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <TalentProfileHero talent={talent} />
        <section className="bg-[var(--color-paper)] pb-24 sm:pb-32">
          <Container className="flex flex-col gap-16">
            <p className="max-w-2xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
              {talent.bio}
            </p>
            <TalentContactCta talent={talent} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
