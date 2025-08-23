import { z } from 'zod';

export const BaseMessageSchema = z.object({
  slackTeamId: z.string().min(1, 'Slack Team IDは必須です。'),
  mentionedUserId: z.string().min(1, 'Mentioned User IDは必須です。'),
  slackMessageId: z.string().min(1, 'Slack Message IDは必須です。'),
  slackChannelId: z.string().min(1, 'Slack Channel IDは必須です。'),
  slackThreadId: z.string().min(1, 'Slack Thread IDは必須です。'),
  isNotified: z.boolean().default(false),
});

export const MessageCreateSchema = BaseMessageSchema;

export const MessageUpdateSchema = BaseMessageSchema.partial();

export const MessageResponseSchema = BaseMessageSchema.extend({
  id: z.bigint(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type MessageCreateRequest = z.infer<typeof MessageCreateSchema>;
export type MessageUpdateRequest = z.infer<typeof MessageUpdateSchema>;
export type MessageResponse = z.infer<typeof MessageResponseSchema>;
