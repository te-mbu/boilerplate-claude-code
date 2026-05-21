// GSAP lazy loader — imports GSAP + ScrollTrigger on first use (client-only).
// This keeps ~50KB gzipped out of the initial bundle.

let gsapInstance: typeof import("gsap").gsap | null = null;
let scrollTriggerInstance: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;
let loadPromise: Promise<void> | null = null;

async function loadGsap() {
  if (gsapInstance) return;

  const [gsapModule, stModule] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);

  gsapInstance = gsapModule.gsap;
  scrollTriggerInstance = stModule.ScrollTrigger;
  gsapInstance.registerPlugin(scrollTriggerInstance);
}

/**
 * Returns GSAP + ScrollTrigger, loading them lazily on first call.
 * Must be called from client-side code only.
 */
export async function getGsap() {
  if (!loadPromise) {
    loadPromise = loadGsap();
  }
  await loadPromise;
  return {
    gsap: gsapInstance!,
    ScrollTrigger: scrollTriggerInstance!,
  };
}

// Re-export types for convenience
export type { default as GSAPType } from "gsap";

// Synchronous access for components that have already awaited getGsap()
export function getScrollTrigger() {
  if (!scrollTriggerInstance) {
    throw new Error("ScrollTrigger not loaded. Call getGsap() first.");
  }
  return scrollTriggerInstance;
}
