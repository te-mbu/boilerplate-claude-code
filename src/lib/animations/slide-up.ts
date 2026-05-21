import { getGsap } from "./gsap-config";

export async function slideUp(element: Element, delay = 0) {
  const { gsap } = await getGsap();
  return gsap.from(element, {
    y: 30,
    opacity: 0,
    duration: 0.6,
    delay,
    ease: "power2.out",
  });
}
