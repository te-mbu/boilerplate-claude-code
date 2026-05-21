"use client";

import { useRef, useLayoutEffect } from "react";
import { getGsap } from "@/lib/animations/gsap-config";

interface ScrollTriggerOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  once?: boolean;
}

export function useScrollTrigger<T extends HTMLElement = HTMLDivElement>(
  animation: (
    element: T,
    gsapInstance: typeof import("gsap").gsap
  ) => gsap.core.Tween | gsap.core.Timeline,
  options: ScrollTriggerOptions = {}
) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let cancelled = false;

    getGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      const {
        once = true,
        start = "top 80%",
        end = "bottom 20%",
        ...restOptions
      } = options;

      const tween = animation(element, gsap);

      ScrollTrigger.create({
        trigger: element,
        start,
        end,
        toggleActions: once
          ? "play none none none"
          : "play reverse play reverse",
        animation: tween,
        ...restOptions,
      });
    });

    return () => {
      cancelled = true;
      getGsap().then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === element) st.kill();
        });
      });
    };
  }, [animation, options]);

  return ref;
}
