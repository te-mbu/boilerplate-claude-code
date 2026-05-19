import { gsap } from "./gsap-config";

export function counter(
  element: Element,
  endValue: number,
  options: { duration?: number; suffix?: string; prefix?: string } = {}
) {
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
