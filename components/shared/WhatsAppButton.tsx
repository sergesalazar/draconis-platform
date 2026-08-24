import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { whatsappLink } from "@/features/contact/constants";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[var(--color-obsidian)] text-[var(--color-accent)] shadow-lg shadow-black/20 transition-colors motion-safe:duration-300 hover:bg-[var(--color-accent)] hover:text-[var(--color-obsidian)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-[var(--color-obsidian)] px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-obsidian-foreground)] opacity-0 shadow-lg shadow-black/20 transition-opacity motion-safe:duration-300 group-hover:opacity-100"
      >
        Hablemos
      </span>
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
