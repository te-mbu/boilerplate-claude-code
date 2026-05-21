"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ImageAsset } from "@/lib/content/types";

interface GalleryGridProps {
  images: ImageAsset[];
  heading?: string;
  columns?: 2 | 3 | 4;
}

export function GalleryGrid({
  images,
  heading,
  columns = 3,
}: GalleryGridProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const gridCols: Record<number, string> = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    },
    [goNext, goPrev],
  );

  const activeImage = images[activeIndex];

  return (
    <section className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        {heading && (
          <h2 className="font-heading mb-10 text-center text-3xl font-bold tracking-tight text-foreground">
            {heading}
          </h2>
        )}

        {/* Grid */}
        <div className={`grid gap-3 ${gridCols[columns]}`}>
          {images.map((image, i) => (
            <button
              key={`${image.src}-${i}`}
              type="button"
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              onClick={() => {
                setActiveIndex(i);
                setOpen(true);
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width ?? 400}
                height={image.height ?? 400}
                sizes={`(max-width: 768px) 50vw, ${Math.round(100 / columns)}vw`}
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>

        {/* Lightbox */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            className="max-w-4xl bg-black/95 p-0 ring-0 sm:max-w-4xl"
            onKeyDown={handleKeyDown}
          >
            <DialogTitle className="sr-only">
              {activeImage?.alt ?? "Gallery image"}
            </DialogTitle>

            {activeImage && (
              <div className="relative flex items-center justify-center">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  width={activeImage.width ?? 1200}
                  height={activeImage.height ?? 800}
                  sizes="90vw"
                  className="max-h-[80vh] w-auto object-contain"
                />

                {/* Navigation */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                      onClick={goPrev}
                    >
                      <ChevronLeft className="size-5" />
                      <span className="sr-only">Previous</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                      onClick={goNext}
                    >
                      <ChevronRight className="size-5" />
                      <span className="sr-only">Next</span>
                    </Button>
                  </>
                )}
              </div>
            )}

            {/* Counter */}
            {images.length > 1 && (
              <p className="pb-3 text-center text-xs text-white/50">
                {activeIndex + 1} / {images.length}
              </p>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
