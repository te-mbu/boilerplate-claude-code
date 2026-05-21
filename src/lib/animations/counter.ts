import { getGsap } from "./gsap-config";

export async function counter(
  element: Element,
  endValue: number,
  options: { duration?: number; suffix?: string; prefix?: string } = {}
) {
  const { gsap } = await getGsap();
  const { duration = 2, suffix = "", prefix = "" } = options;
  const obj = { value: 0 };

  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
    },
  });
}
