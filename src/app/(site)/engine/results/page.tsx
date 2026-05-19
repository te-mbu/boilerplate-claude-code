import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { DiagnosticResult } from "@/components/engine/diagnostic-result";

export const metadata: Metadata = createMetadata({
  title: "Your Results",
  description: "Your personalized diagnostic results and recommendations.",
  path: "/engine/results",
  noIndex: true,
});

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ score?: string; max?: string; category?: string }>;
}) {
  const params = await searchParams;
  const score = parseInt(params.score ?? "0", 10);
  const maxScore = parseInt(params.max ?? "100", 10);
  const category = params.category ?? "Unknown";

  return (
    <main className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-2xl">
        <DiagnosticResult
          score={score}
          maxScore={maxScore}
          category={category}
          ctaText="Book a Call"
          ctaUrl="/contact"
        />
      </div>
    </main>
  );
}
