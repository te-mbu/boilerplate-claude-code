import { gsap } from "./gsap-config";

export function fadeIn(element: Element, delay = 0) {
  return gsap.from(element, {
    opacity: 0,
    duration: 0.6,
    delay,
    ease: "power2.out",
  });
}
