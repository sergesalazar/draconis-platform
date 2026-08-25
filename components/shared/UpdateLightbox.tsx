"use client";

import { useEffect } from "react";
import Image from "next/image";
import { updateTypeLabels } from "@/features/updates/labels";
import type { WordPressUpdate } from "@/types/updates";

interface UpdateLightboxProps {
  update: WordPressUpdate;
  onClose: () => void;
}

export default function UpdateLightbox({
  update,
  onClose,
}: UpdateLightboxProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={update.title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-obsidian)]/90 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden bg-[var(--color-obsidian)] text-[var(--color-obsidian-foreground)] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full bg-[var(--color-obsidian)]/70 text-[var(--color-obsidian-foreground)] transition-colors motion-safe:duration-300 hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          ✕
        </button>

        {update.media ? (
          <div className="relative aspect-video w-full bg-black">
            {update.media.kind === "video" ? (
              <video
                src={update.media.url}
                controls
                className="size-full object-contain"
              />
            ) : (
              <Image
                src={update.media.url}
                alt={update.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            )}
          </div>
        ) : null}

        <div className="overflow-y-auto p-6 sm:p-8">
          {update.type ? (
            <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-accent)]">
              {updateTypeLabels[update.type]}
            </p>
          ) : null}
          <h3 className="mt-2 font-[family-name:var(--font-fraunces)] text-2xl font-medium sm:text-3xl">
            {update.title}
          </h3>
          {update.description ? (
            <p className="mt-4 text-base leading-relaxed text-[var(--color-muted-dark)]">
              {update.description}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
