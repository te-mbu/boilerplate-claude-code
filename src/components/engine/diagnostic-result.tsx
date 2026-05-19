import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface DiagnosticResultProps {
  score: number;
  maxScore: number;
  category: string;
  recommendations?: string[];
  ctaText: string;
  ctaUrl: string;
}

export function DiagnosticResult({
  score,
  maxScore,
  category,
  recommendations,
  ctaText,
  ctaUrl,
}: DiagnosticResultProps) {
  const percent = Math.round((score / maxScore) * 100);

  return (
    <div className="rounded-lg border border-border bg-card p-8 text-center">
      <h2 className="font-heading text-2xl font-bold text-foreground">
        Your Results
      </h2>

      <div className="mt-6">
        <div className="mx-auto flex size-32 items-center justify-center rounded-full border-4 border-primary">
          <span className="text-3xl font-bold text-foreground">
            {score}/{maxScore}
          </span>
        </div>
        <p className="mt-3 text-lg font-medium text-muted-foreground">
          Level: {category}
        </p>
        <p className="text-sm text-muted-foreground">{percent}%</p>
      </div>

      {recommendations && recommendations.length > 0 && (
        <div className="mt-8 text-left">
          <h3 className="mb-3 text-lg font-semibold text-foreground">
            Our Recommendations
          </h3>
          <ul className="space-y-2">
            {recommendations.map((rec, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8">
        <Link href={ctaUrl} className={buttonVariants({ size: "lg" })}>
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
