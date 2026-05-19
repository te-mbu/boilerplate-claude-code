"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import type { DiagnosticStep as DiagnosticStepType } from "@/types/engine";

interface DiagnosticStepProps {
  step: DiagnosticStepType;
  answers: Record<string, string | string[]>;
  onAnswer: (questionId: string, value: string | string[]) => void;
}

export function DiagnosticStep({ step, answers, onAnswer }: DiagnosticStepProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
      {step.description && (
        <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
      )}

      <div className="mt-6 space-y-5">
        {step.fields.map((field) => {
          const value = answers[field.id];

          switch (field.type) {
            case "text":
              return (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <Input
                    id={field.id}
                    value={(value as string) ?? ""}
                    onChange={(e) => onAnswer(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                </div>
              );

            case "textarea":
              return (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <Textarea
                    id={field.id}
                    value={(value as string) ?? ""}
                    onChange={(e) => onAnswer(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                </div>
              );

            case "select":
              return (
                <div key={field.id} className="space-y-2">
                  <Label>{field.label}</Label>
                  <Select
                    value={(value as string) ?? ""}
                    onValueChange={(v) => { if (v !== null) onAnswer(field.id, v); }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder ?? "Select..."} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );

            case "radio":
              return (
                <div key={field.id} className="space-y-2">
                  <Label>{field.label}</Label>
                  <RadioGroup
                    value={(value as string) ?? ""}
                    onValueChange={(v) => onAnswer(field.id, v)}
                    className="space-y-2"
                  >
                    {field.options?.map((opt) => (
                      <div key={opt.value} className="flex items-center gap-2">
                        <RadioGroupItem value={opt.value} id={`${field.id}-${opt.value}`} />
                        <Label htmlFor={`${field.id}-${opt.value}`} className="font-normal">
                          {opt.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              );

            case "checkbox":
              return (
                <div key={field.id} className="space-y-2">
                  <Label>{field.label}</Label>
                  <div className="space-y-2">
                    {field.options?.map((opt) => {
                      const checked = Array.isArray(value) && value.includes(opt.value);
                      return (
                        <div key={opt.value} className="flex items-center gap-2">
                          <Checkbox
                            id={`${field.id}-${opt.value}`}
                            checked={checked}
                            onCheckedChange={(c) => {
                              const current = (Array.isArray(value) ? value : []) as string[];
                              const next = c
                                ? [...current, opt.value]
                                : current.filter((v) => v !== opt.value);
                              onAnswer(field.id, next);
                            }}
                          />
                          <Label htmlFor={`${field.id}-${opt.value}`} className="font-normal">
                            {opt.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
