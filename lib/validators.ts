import { z } from 'zod';

export const sendEmailSchema = z.object({
  to: z.string().min(1, 'At least one recipient is required'),
  subject: z.string().min(1, 'Subject is required'),
  html: z.string().min(1, 'Email content is required'),
  from: z.string().optional(),
});

export const createTemplateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  subject: z.string().default(''),
  category: z.string().default('general'),
  description: z.string().default(''),
  code: z.string().min(1, 'Template code is required'),
  variables: z.string().default('[]'),
});

export const updateTemplateSchema = createTemplateSchema.partial();

export const emailSchema = z
  .string()
  .email('Invalid email address')
  .toLowerCase();

export function parseRecipients(input: string): string[] {
  return input
    .split(/[\n,]/)
    .map((e) => e.trim())
    .filter(Boolean);
}
