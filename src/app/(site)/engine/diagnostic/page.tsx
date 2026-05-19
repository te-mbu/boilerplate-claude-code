import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { DiagnosticClient } from "./client";

export const metadata: Metadata = createMetadata({
  title: "Free Diagnostic",
  description:
    "Answer a few questions to get personalized recommendations for your project.",
  path: "/engine/diagnostic",
  noIndex: true,
});

export default function DiagnosticPage() {
  return (
    <main className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Free Diagnostic
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Answer a few questions to get personalized recommendations.
          </p>
        </div>
        <DiagnosticClient />
      </div>
    </main>
  );
}
