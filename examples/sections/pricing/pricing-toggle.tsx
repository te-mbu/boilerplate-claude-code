"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface PricingToggleProps {
  onToggle: (isYearly: boolean) => void;
  defaultYearly?: boolean;
  savingsLabel?: string;
}

export function PricingToggle({
  onToggle,
  defaultYearly = false,
  savingsLabel = "Save 20%",
}: PricingToggleProps) {
  const [isYearly, setIsYearly] = useState(defaultYearly);

  function handleToggle() {
    const next = !isYearly;
    setIsYearly(next);
    onToggle(next);
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <span
        className={`text-sm font-medium ${
          !isYearly ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        Monthly
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isYearly}
        onClick={handleToggle}
        className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=checked]:bg-primary"
        data-state={isYearly ? "checked" : "unchecked"}
      >
        <span
          className={`pointer-events-none block size-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
            isYearly ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
      <span
        className={`text-sm font-medium ${
          isYearly ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        Yearly
      </span>
      {isYearly && (
        <Badge variant="secondary" className="text-xs">
          {savingsLabel}
        </Badge>
      )}
    </div>
  );
}
