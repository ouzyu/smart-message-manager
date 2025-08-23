import { z } from 'zod';

export const BaseTeamSchema = z.object({
  slackTeamId: z.string().min(1, 'Slack Team IDは必須です。'),
  slackTeamName: z.string(),
  slackWorkspaceDomain: z.string().min(1).max(100),
  slackBotToken: z.string().min(1, 'Slack Bot Tokenは必須です。'),
  slackBotUserId: z.string().min(1, 'Slack Bot User DIは必須です。'),
  slackAppId: z.string().min(1, 'Slack App IDは必須です。'),
});

export const TeamCreateSchema = BaseTeamSchema;

export const TeamUpdateSchema = BaseTeamSchema.partial();

export const TeamResponseSchema = BaseTeamSchema.extend({
  id: z.number(),
  installedAt: z.date(),
  updatedAt: z.date(),
});

export type TeamCreateRequest = z.infer<typeof TeamCreateSchema>;
export type TeamUpdateRequest = z.infer<typeof TeamUpdateSchema>;
export type TeamResponse = z.infer<typeof TeamResponseSchema>;
