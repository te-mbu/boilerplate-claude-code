import { getGsap } from "./gsap-config";

export async function stagger(parent: Element, childSelector: string, delay = 0) {
  const { gsap } = await getGsap();
  return gsap.from(parent.querySelectorAll(childSelector), {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    delay,
    ease: "power2.out",
  });
}
