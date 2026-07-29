import Image from "next/image";
import Link from "next/link";
import type { Talent } from "@/types/talent";

interface TalentCardProps {
  talent: Talent;
}

export default function TalentCard({ talent }: TalentCardProps) {
  return (
    <Link
      href={`/talento/${talent.slug}/`}
      className="group relative aspect-[3/4] overflow-hidden bg-[var(--color-line)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      <Image
        src={`https://i.pravatar.cc/800?img=${talent.portraitSeed}`}
        alt={`${talent.name}, ${talent.role}`}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover grayscale transition-[filter] motion-safe:duration-500 group-hover:grayscale-0"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-obsidian)] from-15% via-[var(--color-obsidian)]/40 via-45% to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="font-[family-name:var(--font-fraunces)] text-lg text-[var(--color-obsidian-foreground)]">
          {talent.name}
        </p>
        <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted-dark)]">
          {talent.role}
        </p>
      </div>
    </Link>
  );
}
