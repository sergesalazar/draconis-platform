import UpdateCard from "@/components/shared/UpdateCard";
import type { WordPressUpdate } from "@/types/updates";

interface UpdatesGridProps {
  updates: WordPressUpdate[];
  onSelect: (update: WordPressUpdate) => void;
}

export default function UpdatesGrid({ updates, onSelect }: UpdatesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {updates.map((update) => (
        <UpdateCard key={update.id} update={update} onSelect={onSelect} />
      ))}
    </div>
  );
}
