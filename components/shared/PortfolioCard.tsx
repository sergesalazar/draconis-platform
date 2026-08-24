import Image from "next/image";
import type { PortfolioProject } from "@/types/portfolio";

interface PortfolioCardProps {
  project: PortfolioProject;
}

export default function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <div className="group relative aspect-[4/3] overflow-hidden bg-[var(--color-line)]">
      <Image
        src={`https://picsum.photos/seed/${project.imageSeed}/1200/900`}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover grayscale transition-[filter] motion-safe:duration-500 group-hover:grayscale-0"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-obsidian)] from-15% via-[var(--color-obsidian)]/40 via-45% to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted-dark)]">
          {project.year}
        </p>
        <p className="mt-1 font-[family-name:var(--font-fraunces)] text-lg text-[var(--color-obsidian-foreground)]">
          {project.title}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--color-muted-dark)]">
          {project.description}
        </p>
      </div>
    </div>
  );
}
