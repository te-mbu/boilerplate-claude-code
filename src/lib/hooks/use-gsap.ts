"use client";

import { useRef, useEffect, useCallback, useMemo } from "react";
import { getGsap } from "@/lib/animations/gsap-config";

export function useGsap<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Memoize reduced motion check — stable across renders
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    return () => {
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

      const element = ref.current;
      getGsap().then(({ gsap: g }) => {
        // Guard: component may have unmounted while GSAP was loading
        if (!element.isConnected) return;

        tl.current = g.timeline();
        callback({
          ref: element,
          gsap: g,
          timeline: tl.current,
        });
      });
    },
    [prefersReducedMotion]
  );

  return { ref, animate, prefersReducedMotion };
}
