import { Separator } from "@/components/ui/separator";

interface Stat {
  value: string;
  label: string;
}

interface StatsBarProps {
  stats: Stat[];
  heading?: string;
  variant?: "default" | "card" | "dark";
}

export function StatsBar({
  stats,
  heading,
  variant = "default",
}: StatsBarProps) {
  const variantClasses: Record<string, string> = {
    default: "",
    card: "bg-muted/50 rounded-2xl px-6 py-10 md:px-12",
    dark: "bg-foreground text-background rounded-2xl px-6 py-10 md:px-12",
  };

  const valueColor = variant === "dark" ? "text-background" : "text-foreground";
  const labelColor =
    variant === "dark" ? "text-background/60" : "text-muted-foreground";

  return (
    <section className="px-4 py-12 md:py-20">
      <div
        className={`mx-auto max-w-5xl ${variantClasses[variant]}`}
      >
        {heading && (
          <p className={`mb-8 text-center text-sm font-medium ${labelColor}`}>
            {heading}
          </p>
        )}
        <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-0">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8">
              {i > 0 && (
                <Separator
                  orientation="vertical"
                  className={`hidden h-12 sm:block ${
                    variant === "dark" ? "bg-background/20" : ""
                  }`}
                />
              )}
              <div className="flex flex-col items-center gap-1 px-6 text-center">
                <span
                  className={`font-heading text-3xl font-bold tracking-tight md:text-4xl ${valueColor}`}
                >
                  {stat.value}
                </span>
                <span className={`text-sm ${labelColor}`}>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
