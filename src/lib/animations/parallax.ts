import { gsap, ScrollTrigger } from "./gsap-config";

export function parallax(element: Element, speed = 0.5) {
  return gsap.to(element, {
    y: () => speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}
