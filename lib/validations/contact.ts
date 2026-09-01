import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
  // Honeypot: real users never see or fill this field. Checked explicitly
  // (not constrained here) so a filled value can be rejected server-side
  // with a distinct, deliberate code path instead of a generic validation error.
  company: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
