"use client";

import { useEffect, useState } from "react";
import AdminAuthForm from "@/features/admin/components/AdminAuthForm";
import AdminUploadForm from "@/features/admin/components/AdminUploadForm";
import AdminManageList from "@/features/admin/components/AdminManageList";
import AdminSuccessPanel from "@/features/admin/components/AdminSuccessPanel";
import { getStoredCredentials } from "@/features/admin/session";
import type { WordPressCredentials } from "@/types/updates";

interface AdminPanelModalProps {
  onClose: () => void;
}

type Step =
  | { name: "auth" }
  | { name: "form"; credentials: WordPressCredentials }
  | { name: "manage"; credentials: WordPressCredentials }
  | { name: "success"; credentials: WordPressCredentials; link: string };

export default function AdminPanelModal({ onClose }: AdminPanelModalProps) {
  const [step, setStep] = useState<Step>(() => {
    const stored = getStoredCredentials();
    return stored ? { name: "form", credentials: stored } : { name: "auth" };
  });

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
      aria-label="Panel de administración"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--color-obsidian)]/90 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[var(--color-obsidian)] p-8 text-[var(--color-obsidian-foreground)] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar panel"
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-[var(--color-muted-dark)] transition-colors motion-safe:duration-300 hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          ✕
        </button>

        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted-dark)]">
          Panel de administración
        </p>

        {step.name === "auth" ? (
          <AdminAuthForm
            onAuthenticated={(credentials) =>
              setStep({ name: "form", credentials })
            }
          />
        ) : null}

        {step.name === "form" ? (
          <AdminUploadForm
            credentials={step.credentials}
            onSessionExpired={() => setStep({ name: "auth" })}
            onPublished={(link) =>
              setStep({ name: "success", credentials: step.credentials, link })
            }
            onManage={() =>
              setStep({ name: "manage", credentials: step.credentials })
            }
          />
        ) : null}

        {step.name === "manage" ? (
          <AdminManageList
            credentials={step.credentials}
            onSessionExpired={() => setStep({ name: "auth" })}
            onBack={() =>
              setStep({ name: "form", credentials: step.credentials })
            }
          />
        ) : null}

        {step.name === "success" ? (
          <AdminSuccessPanel
            link={step.link}
            onPublishAnother={() =>
              setStep({ name: "form", credentials: step.credentials })
            }
            onClose={onClose}
          />
        ) : null}
      </div>
    </div>
  );
}
