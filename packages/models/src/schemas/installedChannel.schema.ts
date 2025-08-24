import { z } from 'zod';

export const BaseInstalledChannelSchema = z.object({
  slackTeamId: z.string().min(1, 'Slack Team IDは必須です。'),
  slackChannelId: z.string().min(1, 'Slack Channel IDは必須です。'),
  installedUserId: z.number('Installed User IDは必須です。'),
  isImportant: z.boolean().default(false),
});

export const InstalledChannelCreateSchema = BaseInstalledChannelSchema;

export const InstalledChannelUpdateSchema = BaseInstalledChannelSchema.pick({ isImportant: true }).partial();

export const InstalledChannelResponseSchema = BaseInstalledChannelSchema.extend({
  id: z.number(),
  installedAt: z.date(),
  updatedAt: z.date(),
});

export type InstalledChannelCreateRequest = z.infer<typeof InstalledChannelCreateSchema>;
export type InstalledChannelUpdateRequest = z.infer<typeof InstalledChannelUpdateSchema>;
export type InstalledChannelResponse = z.infer<typeof InstalledChannelResponseSchema>;
