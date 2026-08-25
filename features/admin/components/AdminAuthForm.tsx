"use client";

import { useState, type FormEvent } from "react";
import { verifyWordPressCredentials } from "@/lib/wordpress";
import { setStoredCredentials } from "@/features/admin/session";
import { WordPressApiError } from "@/types/updates";
import type { WordPressCredentials } from "@/types/updates";

interface AdminAuthFormProps {
  onAuthenticated: (credentials: WordPressCredentials) => void;
}

const inputClassName =
  "mt-1 w-full border border-[var(--color-line-dark)] bg-transparent px-3 py-2 text-sm text-[var(--color-obsidian-foreground)] focus:border-[var(--color-accent)] focus:outline-none";

export default function AdminAuthForm({
  onAuthenticated,
}: AdminAuthFormProps) {
  const [username, setUsername] = useState("");
  const [applicationPassword, setApplicationPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const credentials: WordPressCredentials = {
      username: username.trim(),
      applicationPassword: applicationPassword.trim(),
    };

    try {
      await verifyWordPressCredentials(credentials);
      setStoredCredentials(credentials);
      onAuthenticated(credentials);
    } catch (err) {
      if (err instanceof WordPressApiError) {
        setError(err.message);
      } else {
        setError("No se pudo conectar con WordPress. Revisá tu conexión.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <h2 className="font-[family-name:var(--font-fraunces)] text-2xl font-medium">
        Iniciar sesión
      </h2>

      <label className="text-sm">
        Usuario de WordPress
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          autoComplete="username"
          className={inputClassName}
        />
      </label>

      <label className="text-sm">
        Application Password
        <input
          type="password"
          value={applicationPassword}
          onChange={(event) => setApplicationPassword(event.target.value)}
          required
          autoComplete="current-password"
          className={inputClassName}
        />
      </label>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 bg-[var(--color-accent)] px-6 py-3 text-sm font-medium uppercase tracking-[0.1em] text-[var(--color-obsidian)] transition-opacity motion-safe:duration-300 hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting ? "Verificando..." : "Entrar"}
      </button>
    </form>
  );
}
