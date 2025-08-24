import { z } from 'zod';

export const BaseUserSettingSchema = z.object({
  userId: z.number('User IDは必須です。'),
  sendDailyReport: z.boolean().default(false),
  sendReportTime: z.string().default('18:00'),
  sendMonday: z.boolean().default(true),
  sendTuesday: z.boolean().default(true),
  sendWednesday: z.boolean().default(true),
  sendThursday: z.boolean().default(true),
  sendFriday: z.boolean().default(true),
  sendSaturday: z.boolean().default(false),
  sendSunday: z.boolean().default(false),
});

export const UserSettingCreateSchema = BaseUserSettingSchema;

export const UserSettingUpdateSchema = BaseUserSettingSchema.omit({ userId: true }).partial();

export const UserSettingResponseSchema = BaseUserSettingSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserSettingCreateRequest = z.infer<typeof UserSettingCreateSchema>;
export type UserSettingUpdateRequest = z.infer<typeof UserSettingUpdateSchema>;
export type UserSettingResponse = z.infer<typeof UserSettingResponseSchema>;
