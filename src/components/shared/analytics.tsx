"use client";

import * as React from "react";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    window.dataLayer = window.dataLayer || [];
  }, []);

  return <>{children}</>;
}
