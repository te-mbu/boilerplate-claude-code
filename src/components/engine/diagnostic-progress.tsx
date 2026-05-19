interface DiagnosticProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function DiagnosticProgress({
  currentStep,
  totalSteps,
}: DiagnosticProgressProps) {
  const percent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="mb-8">
      <div className="mb-2 flex justify-between text-sm text-muted-foreground">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
