import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

interface ClosingBannerProps {
  heading: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
}

export default function ClosingBanner({
  heading,
  body,
  buttonLabel,
  buttonHref,
}: ClosingBannerProps) {
  return (
    <section className="bg-[var(--color-obsidian)] py-24 text-[var(--color-obsidian-foreground)] sm:py-32">
      <Container className="flex flex-col items-start gap-8">
        <h2 className="max-w-2xl font-[family-name:var(--font-fraunces)] text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
          {heading}
        </h2>
        <p className="max-w-md text-lg leading-relaxed text-[var(--color-muted-dark)]">
          {body}
        </p>
        <Button href={buttonHref} variant="primary" tone="dark">
          {buttonLabel}
        </Button>
      </Container>
    </section>
  );
}
