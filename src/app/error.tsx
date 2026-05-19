"use client";

import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-base text-muted-foreground">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <Button className="mt-8" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
