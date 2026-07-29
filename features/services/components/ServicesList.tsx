import { services } from "@/features/services/data";

export default function ServicesList() {
  return (
    <div className="border-t border-[var(--color-line)]">
      {services.map((service) => (
        <div
          key={service.number}
          className="grid grid-cols-[3rem_1fr] items-baseline gap-x-6 gap-y-2 border-b border-[var(--color-line)] py-8 transition-colors motion-safe:duration-300 hover:bg-[var(--color-ink)]/5 sm:grid-cols-[4rem_1fr_1fr] sm:items-center sm:py-10"
        >
          <span className="font-[family-name:var(--font-fraunces)] text-2xl text-[var(--color-accent-ink)] sm:text-3xl">
            {service.number}
          </span>
          <h3 className="font-[family-name:var(--font-fraunces)] text-xl text-[var(--color-ink)] sm:text-2xl">
            {service.title}
          </h3>
          <p className="col-span-2 text-sm leading-relaxed text-[var(--color-muted)] sm:col-span-1">
            {service.description}
          </p>
        </div>
      ))}
    </div>
  );
}
