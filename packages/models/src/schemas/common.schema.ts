import { z } from 'zod';

export const IdParamSchema = z.object({
  id: z
    .string()
    .transform(val => {
      const num = parseInt(val, 10);
      if (isNaN(num)) {
        throw new Error('Invalid number format');
      }
      return num;
    })
    .refine(num => num > 0, {
      message: 'ID must be a positive integer',
    }),
});

export type IdParam = z.infer<typeof IdParamSchema>;
