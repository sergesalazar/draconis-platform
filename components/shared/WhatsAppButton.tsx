import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { whatsappLink } from "@/features/contact/constants";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[var(--color-obsidian)] text-[var(--color-accent)] shadow-lg shadow-black/20 transition-colors motion-safe:duration-300 hover:bg-[var(--color-accent)] hover:text-[var(--color-obsidian)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
