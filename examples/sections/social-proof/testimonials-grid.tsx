import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/content/types";

interface TestimonialsGridProps {
  testimonials: Testimonial[];
  heading?: string;
  columns?: 2 | 3;
}

export function TestimonialsGrid({
  testimonials,
  heading,
  columns = 3,
}: TestimonialsGridProps) {
  const gridCols =
    columns === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        {heading && (
          <h2 className="font-heading mb-10 text-center text-3xl font-bold tracking-tight text-foreground">
            {heading}
          </h2>
        )}
        <div className={`grid gap-6 ${gridCols}`}>
          {testimonials.map((t) => (
            <Card key={`${t.name}-${t.company}`}>
              <CardContent className="flex flex-col gap-4">
                {t.rating != null && (
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < t.rating!
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                )}
                <blockquote className="text-sm leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  {t.image && (
                    <Image
                      src={t.image.src}
                      alt={t.image.alt}
                      width={40}
                      height={40}
                      className="size-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
