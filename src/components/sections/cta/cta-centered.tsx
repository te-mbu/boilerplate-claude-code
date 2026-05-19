import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CtaCenteredProps {
  heading: string;
  description?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: "default" | "gradient" | "dark";
}

export function CtaCentered({
  heading,
  description,
  primaryCta,
  secondaryCta,
  variant = "default",
}: CtaCenteredProps) {
  const variantClasses: Record<string, string> = {
    default: "bg-muted/50",
    gradient: "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent",
    dark: "bg-foreground text-background",
  };

  const buttonVariant = variant === "dark" ? "secondary" : "default";
  const secondaryButtonVariant = variant === "dark" ? "ghost" : "outline";

  return (
    <section className="px-4 py-12 md:py-20">
      <div
        className={`mx-auto max-w-4xl rounded-2xl px-6 py-12 text-center md:px-12 md:py-16 ${variantClasses[variant]}`}
      >
        <h2
          className={`font-heading text-3xl font-bold tracking-tight sm:text-4xl ${
            variant === "dark" ? "text-background" : "text-foreground"
          }`}
        >
          {heading}
        </h2>
        {description && (
          <p
            className={`mx-auto mt-4 max-w-2xl text-lg ${
              variant === "dark"
                ? "text-background/70"
                : "text-muted-foreground"
            }`}
          >
            {description}
          </p>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            variant={buttonVariant}
            render={<Link href={primaryCta.href} />}
          >
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button
              size="lg"
              variant={secondaryButtonVariant}
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
