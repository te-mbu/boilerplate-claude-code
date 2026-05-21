"use client";

import { useRef, useEffect, useMemo, type ReactNode } from "react";
import { getGsap } from "@/lib/animations/gsap-config";

type Preset = "fade-up" | "fade-in" | "scale-up";

interface StaggerChildrenProps {
  children: ReactNode;
  preset?: Preset;
  stagger?: number;
  duration?: number;
  /** CSS selector for the direct children to animate. Defaults to "> *" (all direct children). */
  selector?: string;
  className?: string;
}

const presetConfig: Record<Preset, gsap.TweenVars> = {
  "fade-up": { y: 30, opacity: 0 },
  "fade-in": { opacity: 0 },
  "scale-up": { scale: 0.9, opacity: 0 },
};

export function StaggerChildren({
  children,
  preset = "fade-up",
  stagger = 0.1,
  duration = 0.5,
  selector = "> *",
  className,
}: StaggerChildrenProps) {
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

      const targets = el.querySelectorAll(selector);
      if (targets.length === 0) return;

      tween = gsap.from(targets, {
        ...presetConfig[preset],
        duration,
        stagger,
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
  }, [preset, stagger, duration, selector, prefersReducedMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
