"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnnouncementBarProps {
  message: string;
  link?: { label: string; href: string };
  dismissible?: boolean;
}

export function AnnouncementBar({
  message,
  link,
  dismissible = true,
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      const stored = sessionStorage.getItem("announcement-dismissed");
      if (stored === "true") setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("announcement-dismissed", "true");
  };

  if (dismissed) return null;

  return (
    <div className="relative flex items-center justify-center gap-2 bg-primary px-4 py-2 text-center text-sm text-primary-foreground">
      <span>{message}</span>
      {link && (
        <a
          href={link.href}
          className="font-medium underline underline-offset-4 hover:opacity-80"
        >
          {link.label}
        </a>
      )}
      {dismissible && (
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}
