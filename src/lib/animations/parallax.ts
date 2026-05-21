import { getGsap } from "./gsap-config";

export async function parallax(element: Element, speed = 0.5) {
  const { gsap } = await getGsap();
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
