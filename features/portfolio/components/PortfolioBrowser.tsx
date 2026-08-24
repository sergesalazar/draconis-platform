"use client";

import { useState } from "react";
import PortfolioGrid from "@/components/shared/PortfolioGrid";
import { categories } from "@/features/portfolio/categories";
import { projects } from "@/features/portfolio/data";
import type { PortfolioCategory } from "@/types/portfolio";

type Filter = PortfolioCategory | "todos";

const filters: { value: Filter; label: string }[] = [
  { value: "todos", label: "Todos" },
  ...categories,
];

export default function PortfolioBrowser() {
  const [activeFilter, setActiveFilter] = useState<Filter>("todos");

  const filteredProjects =
    activeFilter === "todos"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <div>
      <div
        role="group"
        aria-label="Filtrar por categoría"
        className="flex flex-wrap gap-3"
      >
        {filters.map((filter) => {
          const isActive = filter.value === activeFilter;

          return (
            <button
              key={filter.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] transition-colors motion-safe:duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
                isActive
                  ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                  : "border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent-ink)]"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        <PortfolioGrid projects={filteredProjects} />
      </div>
    </div>
  );
}
