import { gsap } from "./gsap-config";

export function slideUp(element: Element, delay = 0) {
  return gsap.from(element, {
    y: 30,
    opacity: 0,
    duration: 0.6,
    delay,
    ease: "power2.out",
  });
}
