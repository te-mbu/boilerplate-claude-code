import { z } from "zod";

export const diagnosticSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string(),
      value: z.union([z.string(), z.array(z.string())]),
    })
  ),
  contactEmail: z.string().email(),
  contactName: z.string().min(2),
});

export type DiagnosticFormData = z.infer<typeof diagnosticSchema>;
