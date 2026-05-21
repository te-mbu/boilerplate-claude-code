import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon?: string;
}

interface ProcessStepsProps {
  steps: Step[];
  heading?: string;
  subheading?: string;
  layout?: "vertical" | "horizontal";
}

function getIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? LucideIcons.CircleDot;
}

export function ProcessSteps({
  steps,
  heading,
  subheading,
  layout = "vertical",
}: ProcessStepsProps) {
  return (
    <section className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        {(heading || subheading) && (
          <div className="mb-12 text-center">
            {heading && (
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
                {subheading}
              </p>
            )}
          </div>
        )}

        {layout === "horizontal" ? (
          <HorizontalSteps steps={steps} />
        ) : (
          <VerticalSteps steps={steps} />
        )}
      </div>
    </section>
  );
}

function VerticalSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="relative mx-auto max-w-2xl">
      {/* Vertical line */}
      <div className="absolute left-5 top-0 h-full w-px bg-border md:left-6" />

      <div className="flex flex-col gap-10">
        {steps.map((step, i) => {
          const Icon = step.icon ? getIcon(step.icon) : null;
          return (
            <div key={step.title} className="relative flex gap-5 md:gap-6">
              {/* Step number / icon */}
              <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground md:size-12">
                {Icon ? (
                  <Icon className="size-4 md:size-5" />
                ) : (
                  <span className="text-sm font-semibold md:text-base">
                    {i + 1}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="pt-1">
                <h3 className="text-base font-semibold text-foreground md:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HorizontalSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => {
        const Icon = step.icon ? getIcon(step.icon) : null;
        return (
          <div key={step.title} className="relative flex flex-col items-center text-center">
            {/* Connector line (between steps) */}
            {i < steps.length - 1 && (
              <div className="absolute left-[calc(50%+1.5rem)] top-5 hidden h-px w-[calc(100%-3rem)] bg-border lg:block" />
            )}

            {/* Step number / icon */}
            <div className="relative z-10 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {Icon ? (
                <Icon className="size-4" />
              ) : (
                <span className="text-sm font-semibold">{i + 1}</span>
              )}
            </div>

            {/* Content */}
            <h3 className="mt-4 text-base font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
