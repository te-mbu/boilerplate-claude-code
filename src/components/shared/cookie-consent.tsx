"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, days: number = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value};expires=${expires};path=/;SameSite=Lax`;
}

export function CookieConsent() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const preference = getCookie("cookie-consent");
    if (!preference) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie("cookie-consent", "accepted");
    setVisible(false);
    // Enable GTM by pushing consent event
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "cookie_consent_accepted" });
    }
  };

  const handleReject = () => {
    setCookie("cookie-consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background p-4 shadow-lg">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          We use cookies to improve your experience and analyze site traffic. By
          accepting, you agree to our use of cookies.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" onClick={handleReject}>
            Reject
          </Button>
          <Button onClick={handleAccept}>Accept</Button>
        </div>
      </div>
    </div>
  );
}
