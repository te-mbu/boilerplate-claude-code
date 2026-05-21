import { getGsap } from "./gsap-config";

export async function pageEnter(element: Element) {
  const { gsap } = await getGsap();
  return gsap.from(element, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.out",
  });
}

export async function pageExit(element: Element) {
  const { gsap } = await getGsap();
  return gsap.to(element, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.in",
  });
}
