"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { getGsap } from "@/lib/animations/gsap-config";

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(`${prefix}${value}${suffix}`);
      return;
    }

    if (!ref.current) return;

    const el = ref.current;
    let tween: gsap.core.Tween | null = null;

    getGsap().then(({ gsap, ScrollTrigger }) => {
      if (!el.isConnected) return;

      const obj = { val: 0 };
      tween = gsap.to(obj, {
        val: value,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          setDisplayValue(`${prefix}${Math.round(obj.val)}${suffix}`);
        },
      });
    });

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [value, prefix, suffix, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
