"use client";

import { useEffect, useState } from "react";
import { deleteUpdatePost, getPublishedUpdates } from "@/lib/wordpress";
import { clearStoredCredentials } from "@/features/admin/session";
import { updateTypeLabels } from "@/features/updates/labels";
import { WordPressApiError } from "@/types/updates";
import type { WordPressCredentials, WordPressUpdate } from "@/types/updates";

interface AdminManageListProps {
  credentials: WordPressCredentials;
  onSessionExpired: () => void;
  onBack: () => void;
}

export default function AdminManageList({
  credentials,
  onSessionExpired,
  onBack,
}: AdminManageListProps) {
  const [updates, setUpdates] = useState<WordPressUpdate[] | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublishedUpdates().then(setUpdates);
  }, []);

  async function handleDelete(update: WordPressUpdate) {
    const confirmed = window.confirm(
      `¿Eliminar "${update.title}"? Esta acción no se puede deshacer.`,
    );
    if (!confirmed) return;

    setDeletingId(update.id);
    setError(null);

    try {
      await deleteUpdatePost(update.id, credentials);
      setUpdates((current) => current?.filter((u) => u.id !== update.id) ?? null);
    } catch (err) {
      if (err instanceof WordPressApiError && err.kind === "unauthorized") {
        clearStoredCredentials();
        onSessionExpired();
        return;
      }
      setError("No se pudo eliminar. Intentá de nuevo.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium">
          Publicaciones
        </h2>
        <button
          type="button"
          onClick={onBack}
          className="text-xs uppercase tracking-[0.1em] text-[var(--color-accent)] hover:underline"
        >
          Volver
        </button>
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      {updates === null ? (
        <p className="text-sm text-[var(--color-muted-dark)]">Cargando...</p>
      ) : updates.length === 0 ? (
        <p className="text-sm text-[var(--color-muted-dark)]">
          No hay publicaciones todavía.
        </p>
      ) : (
        <ul className="flex max-h-80 flex-col gap-2 overflow-y-auto">
          {updates.map((update) => (
            <li
              key={update.id}
              className="flex items-center justify-between gap-3 border border-[var(--color-line-dark)] px-3 py-2 text-sm"
            >
              <div className="min-w-0">
                {update.type ? (
                  <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-accent)]">
                    {updateTypeLabels[update.type]}
                  </p>
                ) : null}
                <p className="truncate">{update.title}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(update)}
                disabled={deletingId === update.id}
                className="shrink-0 border border-red-400/40 px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-red-400 transition-colors motion-safe:duration-300 hover:bg-red-400/10 disabled:opacity-50"
              >
                {deletingId === update.id ? "Eliminando..." : "Eliminar"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
