import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroCenteredProps {
  heading: string;
  subheading: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  badge?: string;
  fullHeight?: boolean;
}

export function HeroCentered({
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  badge,
  fullHeight = false,
}: HeroCenteredProps) {
  return (
    <section
      className={`flex items-center justify-center px-4 py-20 md:py-32 ${
        fullHeight ? "min-h-svh" : ""
      }`}
    >
      <div className="mx-auto max-w-3xl text-center">
        {badge && (
          <Badge variant="secondary" className="mb-4">
            {badge}
          </Badge>
        )}
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {heading}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
          {subheading}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" render={<Link href={primaryCta.href} />}>
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button
              variant="outline"
              size="lg"
              render={<Link href={secondaryCta.href} />}
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
