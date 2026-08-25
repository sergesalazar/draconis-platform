import type { WordPressCredentials } from "@/types/updates";

const STORAGE_KEY = "draconis-admin-credentials";

export function getStoredCredentials(): WordPressCredentials | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WordPressCredentials) : null;
  } catch {
    return null;
  }
}

export function setStoredCredentials(credentials: WordPressCredentials): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
  } catch {
    // sessionStorage no disponible (modo privado estricto, etc.) — se ignora;
    // el admin simplemente deberá volver a loguearse si recarga la página.
  }
}

export function clearStoredCredentials(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op
  }
}
