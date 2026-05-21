"use client";

import { useRef, useEffect, useMemo, type ReactNode } from "react";
import { getGsap } from "@/lib/animations/gsap-config";

type Preset = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up";

interface AnimateOnScrollProps {
  children: ReactNode;
  preset?: Preset;
  duration?: number;
  delay?: number;
  className?: string;
}

const presetConfig: Record<Preset, gsap.TweenVars> = {
  "fade-up": { y: 40, opacity: 0 },
  "fade-in": { opacity: 0 },
  "slide-left": { x: 60, opacity: 0 },
  "slide-right": { x: -60, opacity: 0 },
  "scale-up": { scale: 0.9, opacity: 0 },
};

export function AnimateOnScroll({
  children,
  preset = "fade-up",
  duration = 0.7,
  delay = 0,
  className,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;

    const el = ref.current;
    let tween: gsap.core.Tween | null = null;

    getGsap().then(({ gsap, ScrollTrigger }) => {
      if (!el.isConnected) return;

      tween = gsap.from(el, {
        ...presetConfig[preset],
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    });

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [preset, duration, delay, prefersReducedMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
