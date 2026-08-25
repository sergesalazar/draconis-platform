"use client";

import { useState } from "react";

interface AdminSuccessPanelProps {
  link: string;
  onPublishAnother: () => void;
  onClose: () => void;
}

export default function AdminSuccessPanel({
  link,
  onPublishAnother,
  onClose,
}: AdminSuccessPanelProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium">
        ¡Publicado!
      </h2>
      <p className="text-sm text-[var(--color-muted-dark)]">
        Tu contenido ya está disponible en la sección de Novedades del sitio.
      </p>

      <div className="flex items-center gap-2 border border-[var(--color-line-dark)] px-3 py-2 text-xs text-[var(--color-muted-dark)]">
        <span className="truncate">{link}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 text-[var(--color-accent)] hover:underline"
        >
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>

      <div className="mt-2 flex gap-3">
        <button
          type="button"
          onClick={onPublishAnother}
          className="flex-1 border border-[var(--color-line-dark)] px-6 py-3 text-sm font-medium uppercase tracking-[0.1em] transition-colors motion-safe:duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          Publicar otro
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-[var(--color-accent)] px-6 py-3 text-sm font-medium uppercase tracking-[0.1em] text-[var(--color-obsidian)] transition-opacity motion-safe:duration-300 hover:opacity-90"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
