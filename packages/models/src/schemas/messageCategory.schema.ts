import { z } from 'zod';

export const BaseMessageCategorySchema = z.object({
  userId: z.number('User IDは必須です。'),
  categoryName: z.string().min(1, 'Category Nameは必須です。').max(100, '文字数制限は100文字までです。'),
  categoryDescription: z.string().min(1, 'Category Descriptionは必須です。').max(200, '文字数制限は200文字までです'),
  displayOrder: z.number(),
});

export const MessageCategoryCreateSchema = BaseMessageCategorySchema;

export const MessageCategoryUpdateSchema = BaseMessageCategorySchema.partial();

export const MessageCategoryResponseSchema = BaseMessageCategorySchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type MessageCategoryCreateRequest = z.infer<typeof MessageCategoryCreateSchema>;
export type MessageCategoryUpdateRequest = z.infer<typeof MessageCategoryUpdateSchema>;
export type MessageCategoryResponse = z.infer<typeof MessageCategoryResponseSchema>;
