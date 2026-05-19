"use client";

import { createContext, useCallback, useContext } from "react";

interface AnalyticsContextValue {
  trackEvent: (name: string, properties?: Record<string, unknown>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(
  undefined
);

function getCookieConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) return false;
    const parsed = JSON.parse(consent);
    return parsed.analytics === true;
  } catch {
    return false;
  }
}

export function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const trackEvent = useCallback(
    (name: string, properties?: Record<string, unknown>) => {
      if (!getCookieConsent()) return;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: name,
        ...properties,
      });
    },
    []
  );

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
}
