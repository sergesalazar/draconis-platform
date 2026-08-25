"use client";

import Image from "next/image";
import { updateTypeLabels } from "@/features/updates/labels";
import type { WordPressUpdate } from "@/types/updates";

interface UpdateCardProps {
  update: WordPressUpdate;
  onSelect: (update: WordPressUpdate) => void;
}

export default function UpdateCard({ update, onSelect }: UpdateCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(update)}
      className="group relative aspect-[4/3] overflow-hidden bg-[var(--color-line)] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      {update.media?.kind === "video" ? (
        <video
          src={update.media.url}
          muted
          playsInline
          className="absolute inset-0 size-full object-cover grayscale transition-[filter] motion-safe:duration-500 group-hover:grayscale-0"
        />
      ) : update.media ? (
        <Image
          src={update.media.url}
          alt={update.title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover grayscale transition-[filter] motion-safe:duration-500 group-hover:grayscale-0"
        />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-obsidian)] from-15% via-[var(--color-obsidian)]/40 via-45% to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        {update.type ? (
          <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-accent)]">
            {updateTypeLabels[update.type]}
          </p>
        ) : null}
        <p className="mt-1 font-[family-name:var(--font-fraunces)] text-lg text-[var(--color-obsidian-foreground)]">
          {update.title}
        </p>
      </div>
    </button>
  );
}
