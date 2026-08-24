import PortfolioCard from "@/components/shared/PortfolioCard";
import type { PortfolioProject } from "@/types/portfolio";

interface PortfolioGridProps {
  projects: PortfolioProject[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {projects.map((project) => (
        <PortfolioCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
