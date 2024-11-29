import { z } from 'zod';

export const ErrorResponse = z.object({
  statusCode: z.number(),
  message: z.string(),
  error: z.string().optional(),
});

export type ErrorResponse = z.infer<typeof ErrorResponse>;