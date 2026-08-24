export type TalentCategory =
  | "actores-actrices"
  | "directores"
  | "guionistas"
  | "cantantes-raperos"
  | "musicos"
  | "productores-musicales"
  | "compositores"
  | "bailarines";

export interface TalentVital {
  label: string;
  value: string;
}

export interface Talent {
  slug: string;
  name: string;
  role: string;
  category: TalentCategory;
  featured?: boolean;
  portraitSeed: number;
  bio: string;
  vitals: TalentVital[];
}
