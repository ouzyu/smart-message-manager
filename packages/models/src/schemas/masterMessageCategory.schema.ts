import { z } from 'zod';

export const BaseMasterMessageCategorySchema = z.object({
  categoryName: z.string().min(1).max(100),
  categoryDescription: z.string().min(1).max(200),
});

export const MasterMessageCategoryCreateSchema = BaseMasterMessageCategorySchema;

export const MasterMessageCategoryUpdateSchema = BaseMasterMessageCategorySchema.pick({
  categoryName: true,
  categoryDescription: true,
}).partial();

export const MasterMessageCategoryResponseSchema = BaseMasterMessageCategorySchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type BaseMasterMessageCategory = z.infer<typeof BaseMasterMessageCategorySchema>;
export type MasterMessageCategoryCreateRequest = z.infer<typeof MasterMessageCategoryCreateSchema>;
export type MasterMessageCategoryUpdateRequest = z.infer<typeof MasterMessageCategoryUpdateSchema>;
export type MasterMessageCategoryResponse = z.infer<typeof MasterMessageCategoryResponseSchema>;
