"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DiagnosticStep } from "@/components/engine/diagnostic-step";
import type { DiagnosticStep as DiagnosticStepType } from "@/types/engine";

interface DiagnosticFormProps {
  step: DiagnosticStepType;
  answers: Record<string, string | string[]>;
  onAnswer: (questionId: string, value: string | string[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: (contactName: string, contactEmail: string) => void;
  isFirst: boolean;
  isLast: boolean;
  isSubmitting: boolean;
}

export function DiagnosticForm({
  step,
  answers,
  onAnswer,
  onNext,
  onPrevious,
  onSubmit,
  isFirst,
  isLast,
  isSubmitting,
}: DiagnosticFormProps) {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <DiagnosticStep step={step} answers={answers} onAnswer={onAnswer} />

      {isLast && (
        <div className="mt-6 space-y-4 border-t border-border pt-6">
          <p className="text-sm font-medium text-foreground">
            Enter your details to see your results:
          </p>
          <div className="space-y-3">
            <div>
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirst}
        >
          Previous
        </Button>
        {isLast ? (
          <Button
            onClick={() => onSubmit(contactName, contactEmail)}
            disabled={isSubmitting || !contactName || !contactEmail}
          >
            {isSubmitting ? "Submitting..." : "See my results"}
          </Button>
        ) : (
          <Button onClick={onNext}>Next</Button>
        )}
      </div>
    </div>
  );
}
