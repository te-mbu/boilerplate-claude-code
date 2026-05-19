"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function getCookiePreferences(): CookiePreferences {
  if (typeof document === "undefined") return DEFAULT_PREFERENCES;
  const match = document.cookie.match(
    /(^| )cookie-preferences=([^;]+)/
  );
  if (!match) return DEFAULT_PREFERENCES;
  try {
    return JSON.parse(decodeURIComponent(match[2]));
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

function saveCookiePreferences(prefs: CookiePreferences) {
  const expires = new Date(Date.now() + 365 * 864e5).toUTCString();
  document.cookie = `cookie-preferences=${encodeURIComponent(
    JSON.stringify(prefs)
  )};expires=${expires};path=/;SameSite=Lax`;
}

export function CookieSettings({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [preferences, setPreferences] =
    React.useState<CookiePreferences>(DEFAULT_PREFERENCES);

  React.useEffect(() => {
    setPreferences(getCookiePreferences());
  }, []);

  const handleSave = () => {
    saveCookiePreferences(preferences);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<span />}>
        {children ?? (
          <Button variant="ghost" size="sm">
            Cookie Settings
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cookie Preferences</DialogTitle>
          <DialogDescription>
            Manage your cookie preferences. Necessary cookies are always
            enabled.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          {/* Necessary */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Necessary</p>
              <p className="text-xs text-muted-foreground">
                Required for the site to function.
              </p>
            </div>
            <Toggle
              pressed={true}
              disabled
              aria-label="Necessary cookies (always on)"
            >
              On
            </Toggle>
          </div>
          {/* Analytics */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Analytics</p>
              <p className="text-xs text-muted-foreground">
                Help us understand how you use the site.
              </p>
            </div>
            <Toggle
              pressed={preferences.analytics}
              onPressedChange={(pressed) =>
                setPreferences((p) => ({ ...p, analytics: pressed }))
              }
              aria-label="Analytics cookies"
            >
              {preferences.analytics ? "On" : "Off"}
            </Toggle>
          </div>
          {/* Marketing */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Marketing</p>
              <p className="text-xs text-muted-foreground">
                Used to deliver relevant ads.
              </p>
            </div>
            <Toggle
              pressed={preferences.marketing}
              onPressedChange={(pressed) =>
                setPreferences((p) => ({ ...p, marketing: pressed }))
              }
              aria-label="Marketing cookies"
            >
              {preferences.marketing ? "On" : "Off"}
            </Toggle>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Preferences</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
