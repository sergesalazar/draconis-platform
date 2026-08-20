import type { TalentCategory } from "@/types/talent";

export const categories: { value: TalentCategory; label: string }[] = [
  { value: "actores-actrices", label: "Actores y Actrices" },
  { value: "directores", label: "Directores de Cine y Teatro" },
  { value: "guionistas", label: "Guionistas y Dramaturgos" },
  { value: "cantantes-raperos", label: "Cantantes y Raperos" },
  { value: "musicos", label: "Músicos" },
  { value: "productores-musicales", label: "Productores Musicales" },
  { value: "compositores", label: "Compositores" },
];
