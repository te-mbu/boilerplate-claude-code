import Image from "next/image";
import Link from "next/link";

interface Logo {
  src: string;
  alt: string;
  href?: string;
}

interface LogoCloudProps {
  logos: Logo[];
  heading?: string;
}

export function LogoCloud({ logos, heading }: LogoCloudProps) {
  return (
    <section className="px-4 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        {heading && (
          <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
            {heading}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
          {logos.map((logo) => {
            const img = (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="h-8 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:h-10"
              />
            );
            return logo.href ? (
              <Link
                key={logo.alt}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {img}
              </Link>
            ) : (
              <div key={logo.alt}>{img}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
