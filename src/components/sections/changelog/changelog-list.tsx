import { Badge } from "@/components/ui/badge";
import type { ChangelogEntry } from "@/lib/content/types";

interface ChangelogListProps {
  entries: ChangelogEntry[];
  heading?: string;
}

const typeBadgeVariant: Record<
  ChangelogEntry["type"],
  { label: string; className: string }
> = {
  feature: {
    label: "Feature",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  improvement: {
    label: "Improvement",
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  fix: {
    label: "Fix",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
};

export function ChangelogList({ entries, heading }: ChangelogListProps) {
  return (
    <section className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        {heading && (
          <h2 className="font-heading mb-10 text-center text-3xl font-bold tracking-tight text-foreground">
            {heading}
          </h2>
        )}
        <div className="relative flex flex-col gap-8 border-l border-border pl-6">
          {entries.map((entry, i) => {
            const badge = typeBadgeVariant[entry.type];
            return (
              <div key={i} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-[calc(1.5rem+4px)] top-1.5 size-2 rounded-full bg-border" />
                <div className="flex flex-wrap items-center gap-2">
                  <time className="text-xs text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${badge.className}`}
                  >
                    {badge.label}
                  </Badge>
                  {entry.version && (
                    <Badge variant="outline" className="text-xs font-normal">
                      v{entry.version}
                    </Badge>
                  )}
                </div>
                <h3 className="mt-1.5 text-base font-semibold text-foreground">
                  {entry.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {entry.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
