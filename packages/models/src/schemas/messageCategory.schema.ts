import { z } from 'zod';

export const BaseMessageCategorySchema = z.object({
  userId: z.number('User IDは必須です。'),
  categoryName: z.string().min(1, 'Category Nameは必須です。').max(100, '文字数制限は100文字までです。'),
  categoryDescription: z.string().min(1, 'Category Descriptionは必須です。').max(200, '文字数制限は200文字までです'),
  displayOrder: z.number(),
});

export const MessageCategoryCreateSchema = BaseMessageCategorySchema;

export const MessageCategoryUpdateSchema = BaseMessageCategorySchema.omit({ userId: true }).partial();

export const MessageCategoryResponseSchema = BaseMessageCategorySchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// 単一リクエストでメッセージカテゴリの複雑な設定変更を行うためのSchema
export const MessageCategoryBulkOperationSchema = z.object({
  userId: z.number('User IDは必須です。'),
  operations: z.object({
    creates: z
      .array(BaseMessageCategorySchema.omit({ userId: true }))
      .optional()
      .default([]),

    updates: z
      .array(
        BaseMessageCategorySchema.omit({ userId: true }).extend({
          id: z.number(),
        })
      )
      .optional()
      .default([]),

    deletes: z.array(z.number()).optional().default([]),
  }),
});

export const MessageCategoryBulkOperationResponseSchema = z.object({
  updated: z.array(MessageCategoryResponseSchema),
  deleted: z.array(z.number()),
  created: z.array(MessageCategoryResponseSchema),
});

export type MessageCategoryCreateRequest = z.infer<typeof MessageCategoryCreateSchema>;
export type MessageCategoryUpdateRequest = z.infer<typeof MessageCategoryUpdateSchema>;
export type MessageCategoryResponse = z.infer<typeof MessageCategoryResponseSchema>;

export type MessageCategoryBulkOperationRequest = z.infer<typeof MessageCategoryBulkOperationSchema>;
export type MessageCategoryBulkOperationResponse = z.infer<typeof MessageCategoryBulkOperationResponseSchema>;
