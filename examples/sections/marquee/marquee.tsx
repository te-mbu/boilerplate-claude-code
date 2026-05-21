import Image from "next/image";

interface MarqueeItem {
  text?: string;
  image?: { src: string; alt: string };
}

interface MarqueeProps {
  items: MarqueeItem[];
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  separator?: string;
}

export function Marquee({
  items,
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  separator = "·",
}: MarqueeProps) {
  const speedDuration: Record<string, string> = {
    slow: "60s",
    normal: "35s",
    fast: "20s",
  };

  const duration = speedDuration[speed];
  const animDirection = direction === "right" ? "reverse" : "normal";

  // Duplicate items for seamless loop
  const renderItems = (key: string) => (
    <div
      className="flex shrink-0 items-center gap-8"
      aria-hidden={key === "dup"}
    >
      {items.map((item, i) => (
        <div key={`${key}-${i}`} className="flex shrink-0 items-center gap-8">
          {item.image ? (
            <Image
              src={item.image.src}
              alt={item.image.alt}
              width={120}
              height={40}
              className="h-8 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:h-10"
            />
          ) : (
            <span className="whitespace-nowrap font-heading text-lg font-medium text-foreground md:text-xl">
              {item.text}
            </span>
          )}
          {i < items.length - 1 && (
            <span className="text-muted-foreground/40">{separator}</span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <section
      className="overflow-hidden py-8 md:py-12"
      aria-label="Scrolling content"
    >
      <div
        className={`flex gap-8 ${pauseOnHover ? "hover:[animation-play-state:paused] hover:[&>*]:[animation-play-state:paused]" : ""}`}
        style={{
          // Respect reduced motion
          animationPlayState: "running",
        }}
      >
        <div
          className="flex shrink-0 animate-marquee items-center gap-8"
          style={{
            animationDuration: duration,
            animationDirection: animDirection,
          }}
        >
          {renderItems("a")}
        </div>
        <div
          className="flex shrink-0 animate-marquee items-center gap-8"
          style={{
            animationDuration: duration,
            animationDirection: animDirection,
          }}
        >
          {renderItems("dup")}
        </div>
      </div>
    </section>
  );
}
