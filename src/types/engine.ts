export interface DiagnosticStep {
  id: string;
  title: string;
  description?: string;
  fields: DiagnosticField[];
}

export interface DiagnosticField {
  id: string;
  type: "text" | "textarea" | "select" | "radio" | "checkbox" | "range";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: { label: string; value: string; score?: number }[];
}

export interface DiagnosticResult {
  score: number;
  maxScore: number;
  category: string;
  recommendations: string[];
  ctaText: string;
  ctaUrl: string;
}
