export type TalentCategory = "actuacion" | "modelaje" | "contenido" | "conduccion";

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
