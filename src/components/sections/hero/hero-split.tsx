import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { ImageAsset } from "@/lib/content/types";

interface HeroSplitProps {
  heading: string;
  subheading: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image: ImageAsset;
  imagePosition?: "left" | "right";
}

export function HeroSplit({
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  image,
  imagePosition = "right",
}: HeroSplitProps) {
  const textContent = (
    <div className="flex flex-col justify-center px-4 py-12 md:py-0">
      <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {heading}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">{subheading}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" render={<Link href={primaryCta.href} />}>
          {primaryCta.label}
        </Button>
        {secondaryCta && (
          <Button
            variant="outline"
            size="lg"
            render={<Link href={secondaryCta.href} />}
          >
            {secondaryCta.label}
          </Button>
        )}
      </div>
    </div>
  );

  const imageContent = (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl md:aspect-auto md:h-full">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width ?? 800}
        height={image.height ?? 600}
        className="size-full object-cover"
        priority
      />
    </div>
  );

  return (
    <section className="px-4 py-12 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-12">
        {imagePosition === "left" ? (
          <>
            {imageContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
      </div>
    </section>
  );
}
