import Image from "next/image";
import { Check } from "lucide-react";
import type { ImageAsset } from "@/lib/content/types";

interface AlternatingFeature {
  title: string;
  description: string;
  image: ImageAsset;
  bullets?: string[];
}

interface FeaturesAlternatingProps {
  features: AlternatingFeature[];
  heading?: string;
}

export function FeaturesAlternating({
  features,
  heading,
}: FeaturesAlternatingProps) {
  return (
    <section className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        {heading && (
          <h2 className="font-heading mb-16 text-center text-3xl font-bold tracking-tight text-foreground">
            {heading}
          </h2>
        )}
        <div className="flex flex-col gap-16 md:gap-24">
          {features.map((feature, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={feature.title}
                className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${
                  isEven ? "md:[&>:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                  {feature.bullets && feature.bullets.length > 0 && (
                    <ul className="mt-4 flex flex-col gap-2">
                      {feature.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={feature.image.src}
                    alt={feature.image.alt}
                    width={feature.image.width ?? 600}
                    height={feature.image.height ?? 400}
                    className="size-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
