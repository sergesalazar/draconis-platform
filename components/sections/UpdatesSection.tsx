"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import UpdatesGrid from "@/components/shared/UpdatesGrid";
import UpdateLightbox from "@/components/shared/UpdateLightbox";
import { getPublishedUpdates } from "@/lib/wordpress";
import type { WordPressUpdate } from "@/types/updates";

export default function UpdatesSection() {
  const [updates, setUpdates] = useState<WordPressUpdate[]>([]);
  const [selected, setSelected] = useState<WordPressUpdate | null>(null);

  useEffect(() => {
    getPublishedUpdates().then(setUpdates);
  }, []);

  if (updates.length === 0) return null;

  return (
    <section className="bg-[var(--color-paper)] py-24 sm:py-32">
      <Container>
        <SectionLabel tone="light">Novedades</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-[family-name:var(--font-fraunces)] text-4xl font-medium tracking-tight text-[var(--color-ink)] sm:text-5xl">
          Promociones, ofertas y noticias
        </h2>

        <div className="mt-14">
          <UpdatesGrid updates={updates} onSelect={setSelected} />
        </div>
      </Container>

      {selected ? (
        <UpdateLightbox update={selected} onClose={() => setSelected(null)} />
      ) : null}
    </section>
  );
}
