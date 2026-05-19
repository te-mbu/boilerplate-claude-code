import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10).max(2000),
});

export type ContactFormData = z.infer<typeof contactSchema>;
