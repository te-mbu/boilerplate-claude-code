"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

// Placeholder implementation — will be connected when next-intl i18n is fully set up.
// Once ready, replace with:
//   import { useLocale } from "next-intl";
//   import { useRouter, usePathname } from "next-intl/navigation";

export function LanguageSwitcher() {
  const [locale, setLocale] = React.useState<"fr" | "en">("fr");

  const toggle = () => {
    const next = locale === "fr" ? "en" : "fr";
    setLocale(next);
    // TODO: integrate with next-intl router to actually switch locale
    // router.replace(pathname, { locale: next });
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggle} aria-label="Switch language">
      {locale === "fr" ? "EN" : "FR"}
    </Button>
  );
}
