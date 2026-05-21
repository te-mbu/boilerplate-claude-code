import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { ImageAsset } from "@/lib/content/types";

interface HeroCinematicProps {
  /** First line — rendered in heading font, bold, tight tracking */
  line1: string;
  /** Second line — rendered in serif italic, much larger */
  line2: string;
  description?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Background image with gradient overlay */
  backgroundImage?: ImageAsset;
  /** Overlay darkness: 0 = no overlay, 1 = full black. Default 0.6 */
  overlayOpacity?: number;
}

export function HeroCinematic({
  line1,
  line2,
  description,
  primaryCta,
  secondaryCta,
  backgroundImage,
  overlayOpacity = 0.6,
}: HeroCinematicProps) {
  return (
    <section className="relative flex min-h-svh items-end overflow-hidden">
      {/* Background image */}
      {backgroundImage && (
        <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt}
          width={backgroundImage.width ?? 1920}
          height={backgroundImage.height ?? 1080}
          sizes="100vw"
          className="absolute inset-0 size-full object-cover"
          priority
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content — pushed to bottom-left */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 md:pb-24 lg:px-8">
        <div className="max-w-4xl">
          {/* Line 1 — heading font, bold, smaller */}
          <p className="font-heading text-lg font-bold uppercase tracking-widest text-white/70 sm:text-xl md:text-2xl">
            {line1}
          </p>

          {/* Line 2 — serif italic, massive */}
          <h1 className="mt-2 font-serif text-5xl font-light italic leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {line2}
          </h1>

          {description && (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
              {description}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              render={<Link href={primaryCta.href} />}
              className="bg-white text-black hover:bg-white/90"
            >
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button
                variant="outline"
                size="lg"
                render={<Link href={secondaryCta.href} />}
                className="border-white/20 text-white hover:bg-white/10"
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
