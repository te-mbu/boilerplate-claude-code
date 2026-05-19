"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DiagnosticForm } from "@/components/engine/diagnostic-form";
import { DiagnosticProgress } from "@/components/engine/diagnostic-progress";
import type { DiagnosticStep } from "@/types/engine";

// Define your diagnostic steps here or fetch from content provider
const steps: DiagnosticStep[] = [
  {
    id: "step-1",
    title: "About You",
    description: "Tell us about your current situation.",
    fields: [
      {
        id: "q1",
        type: "select",
        label: "What best describes your business?",
        required: true,
        options: [
          { label: "Startup (0-2 years)", value: "startup", score: 1 },
          { label: "Growing business (2-5 years)", value: "growing", score: 2 },
          { label: "Established (5+ years)", value: "established", score: 3 },
        ],
      },
    ],
  },
  {
    id: "step-2",
    title: "Your Goals",
    description: "What are you looking to achieve?",
    fields: [
      {
        id: "q2",
        type: "radio",
        label: "What is your primary goal?",
        required: true,
        options: [
          { label: "Increase visibility", value: "visibility", score: 1 },
          { label: "Generate leads", value: "leads", score: 2 },
          { label: "Automate processes", value: "automation", score: 3 },
        ],
      },
    ],
  },
];

export function DiagnosticClient() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, string | string[]>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleAnswer(questionId: string, value: string | string[]) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleNext() {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }

  function handlePrevious() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  async function handleSubmit(contactName: string, contactEmail: string) {
    setIsSubmitting(true);
    try {
      const payload = {
        answers: Object.entries(answers).map(([questionId, value]) => ({
          questionId,
          value,
        })),
        contactName,
        contactEmail,
      };

      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");

      const data = await res.json();
      const params = new URLSearchParams({
        score: String(data.result.score),
        max: String(data.result.maxScore),
        category: data.result.category,
      });
      router.push(`/engine/results?${params.toString()}`);
    } catch {
      // TODO: show error UI
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <DiagnosticProgress
        currentStep={currentStep + 1}
        totalSteps={steps.length}
      />
      <DiagnosticForm
        step={steps[currentStep]}
        answers={answers}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
        isFirst={currentStep === 0}
        isLast={currentStep === steps.length - 1}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
