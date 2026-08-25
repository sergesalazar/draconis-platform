"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { createUpdatePost, uploadMediaToWordPress } from "@/lib/wordpress";
import { clearStoredCredentials } from "@/features/admin/session";
import { updateTypeLabels } from "@/features/updates/labels";
import { WordPressApiError } from "@/types/updates";
import type { UpdateType, WordPressCredentials } from "@/types/updates";

interface AdminUploadFormProps {
  credentials: WordPressCredentials;
  onSessionExpired: () => void;
  onPublished: (link: string) => void;
  onManage: () => void;
}

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/quicktime",
  "video/webm",
];

const MAX_FILE_SIZE_MB = 50;

const inputClassName =
  "mt-1 w-full border border-[var(--color-line-dark)] bg-transparent px-3 py-2 text-sm text-[var(--color-obsidian-foreground)] focus:border-[var(--color-accent)] focus:outline-none";

export default function AdminUploadForm({
  credentials,
  onSessionExpired,
  onPublished,
  onManage,
}: AdminUploadFormProps) {
  const [type, setType] = useState<UpdateType>("promocion");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    setError(null);

    if (!selected) {
      setFile(null);
      return;
    }

    if (/\.(heic|heif)$/i.test(selected.name)) {
      setError(
        "Las fotos en formato HEIC no son compatibles. Convertila a JPG o PNG antes de subirla.",
      );
      setFile(null);
      return;
    }

    if (!ALLOWED_MIME_TYPES.includes(selected.type)) {
      setError("Formato no soportado. Usá JPG, PNG, WEBP, MP4, MOV o WEBM.");
      setFile(null);
      return;
    }

    if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`El archivo supera los ${MAX_FILE_SIZE_MB}MB permitidos.`);
      setFile(null);
      return;
    }

    setFile(selected);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!file) {
      setError("Elegí una foto o video para publicar.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const media = await uploadMediaToWordPress(file, credentials);
      const post = await createUpdatePost(
        { title, description, type, mediaId: media.id },
        credentials,
      );
      onPublished(post.link);
    } catch (err) {
      if (err instanceof WordPressApiError) {
        if (err.kind === "unauthorized") {
          clearStoredCredentials();
          onSessionExpired();
          return;
        }
        setError(err.message);
      } else {
        setError(
          "No se pudo publicar. Revisá tu conexión e intentá de nuevo.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium">
          Nueva publicación
        </h2>
        <button
          type="button"
          onClick={onManage}
          className="text-xs uppercase tracking-[0.1em] text-[var(--color-accent)] hover:underline"
        >
          Ver publicaciones
        </button>
      </div>

      <label className="text-sm">
        Tipo
        <select
          value={type}
          onChange={(event) => setType(event.target.value as UpdateType)}
          className={inputClassName}
        >
          {(Object.keys(updateTypeLabels) as UpdateType[]).map((value) => (
            <option key={value} value={value} className="text-black">
              {updateTypeLabels[value]}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm">
        Título
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          className={inputClassName}
        />
      </label>

      <label className="text-sm">
        Descripción
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={3}
          className={inputClassName}
        />
      </label>

      <label className="text-sm">
        Foto o video
        <input
          type="file"
          accept={ALLOWED_MIME_TYPES.join(",")}
          onChange={handleFileChange}
          required
          className="mt-1 w-full text-sm text-[var(--color-muted-dark)] file:mr-4 file:border-0 file:bg-[var(--color-accent)] file:px-4 file:py-2 file:text-xs file:font-medium file:uppercase file:tracking-[0.1em] file:text-[var(--color-obsidian)]"
        />
      </label>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 bg-[var(--color-accent)] px-6 py-3 text-sm font-medium uppercase tracking-[0.1em] text-[var(--color-obsidian)] transition-opacity motion-safe:duration-300 hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting ? "Publicando..." : "Publicar"}
      </button>
    </form>
  );
}
