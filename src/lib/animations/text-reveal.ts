import { getGsap } from "./gsap-config";

export async function textReveal(element: Element, delay = 0) {
  const { gsap } = await getGsap();

  // Split text into words wrapped in spans
  const text = element.textContent || "";
  const words = text.split(" ");
  element.innerHTML = words
    .map(
      (word) =>
        `<span style="display:inline-block;overflow:hidden"><span style="display:inline-block">${word}</span></span>`
    )
    .join(" ");

  const innerSpans = element.querySelectorAll("span > span");

  return gsap.from(innerSpans, {
    y: "100%",
    opacity: 0,
    duration: 0.5,
    stagger: 0.05,
    delay,
    ease: "power3.out",
  });
}
