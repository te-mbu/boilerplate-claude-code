import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header skeleton */}
        <div className="mb-12 flex flex-col items-center gap-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Content grid skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="aspect-video w-full rounded-xl" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
