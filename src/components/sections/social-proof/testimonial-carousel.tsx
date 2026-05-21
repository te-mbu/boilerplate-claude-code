"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/lib/content/types";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  heading?: string;
}

export function TestimonialCarousel({
  testimonials,
  heading,
}: TestimonialCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.firstElementChild?.getBoundingClientRect().width ?? 400;
    const gap = 24; // gap-6 = 1.5rem = 24px
    container.scrollBy({
      left: direction === "right" ? cardWidth + gap : -(cardWidth + gap),
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header with nav buttons */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            {heading && (
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                {heading}
              </h2>
            )}
          </div>
          {testimonials.length > 1 && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => scroll("left")}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => scroll("right")}
                aria-label="Next testimonial"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t) => (
            <Card
              key={`${t.name}-${t.company}`}
              className="w-[85vw] shrink-0 snap-start sm:w-[400px]"
            >
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
                <blockquote className="text-base leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  {t.image && (
                    <Image
                      src={t.image.src}
                      alt={t.image.alt}
                      width={48}
                      height={48}
                      className="size-12 rounded-full object-cover"
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
