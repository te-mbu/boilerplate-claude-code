"use client";

import { useRef, useLayoutEffect, useCallback } from "react";
import { gsap } from "@/lib/animations/gsap-config";

export function useGsap<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useLayoutEffect(() => {
    return () => {
      // Cleanup on unmount
      tl.current?.kill();
    };
  }, []);

  const animate = useCallback(
    (
      callback: (ctx: {
        ref: T;
        gsap: typeof gsap;
        timeline: gsap.core.Timeline;
      }) => void
    ) => {
      if (prefersReducedMotion || !ref.current) return;

      tl.current = gsap.timeline();
      callback({ ref: ref.current, gsap, timeline: tl.current });
    },
    [prefersReducedMotion]
  );

  return { ref, animate, prefersReducedMotion };
}
