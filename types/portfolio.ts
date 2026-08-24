export type PortfolioCategory =
  | "musical"
  | "audiovisual"
  | "escenico"
  | "eventos-en-vivo";

export interface PortfolioProject {
  slug: string;
  title: string;
  category: PortfolioCategory;
  year: string;
  description: string;
  imageSeed: string;
}
