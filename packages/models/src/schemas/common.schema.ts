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

export const BigIntIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: 'ID must contain only digits' })
    .transform(val => {
      try {
        return BigInt(val);
      } catch {
        throw new Error('Invalid bigint format');
      }
    })
    .refine(num => num > 0n, {
      message: 'ID must be a positive integer',
    }),
});

export type IdParam = z.infer<typeof IdParamSchema>;
export type BigIntIdParam = z.infer<typeof BigIntIdParamSchema>;
