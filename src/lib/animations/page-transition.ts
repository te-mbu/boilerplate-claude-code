import { gsap } from "./gsap-config";

export function pageEnter(element: Element) {
  return gsap.from(element, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.out",
  });
}

export function pageExit(element: Element) {
  return gsap.to(element, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.in",
  });
}
