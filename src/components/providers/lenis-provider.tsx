"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { getGsap } from "@/lib/animations/gsap-config";

/**
 * Syncs Lenis smooth scroll with GSAP's ticker so ScrollTrigger
 * stays perfectly aligned with the Lenis scroll position.
 */
function LenisGsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    let removeTicker: (() => void) | null = null;

    getGsap().then(({ gsap, ScrollTrigger }) => {
      // Pipe Lenis scroll into ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      // Drive Lenis from GSAP's ticker for frame-perfect sync
      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tick);

      removeTicker = () => {
        gsap.ticker.remove(tick);
        lenis.off("scroll", ScrollTrigger.update);
      };
    });

    return () => {
      removeTicker?.();
    };
  }, [lenis]);

  return null;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false }}
    >
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
}
