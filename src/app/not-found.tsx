import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="font-heading text-6xl font-bold tracking-tight text-foreground">
        404
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button className="mt-8" render={<Link href="/" />}>
        Back to home
      </Button>
    </main>
  );
}
