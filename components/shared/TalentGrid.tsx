import TalentCard from "@/components/shared/TalentCard";
import type { Talent } from "@/types/talent";

interface TalentGridProps {
  talents: Talent[];
}

export default function TalentGrid({ talents }: TalentGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
      {talents.map((talent) => (
        <TalentCard key={talent.slug} talent={talent} />
      ))}
    </div>
  );
}
