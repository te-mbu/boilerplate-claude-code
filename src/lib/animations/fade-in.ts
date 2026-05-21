import { getGsap } from "./gsap-config";

export async function fadeIn(element: Element, delay = 0) {
  const { gsap } = await getGsap();
  return gsap.from(element, {
    opacity: 0,
    duration: 0.6,
    delay,
    ease: "power2.out",
  });
}
