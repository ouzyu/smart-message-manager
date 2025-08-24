import { z } from 'zod';

import { TeamResponse } from './team.schema';
import { UserSettingResponse } from './userSetting.schema';

export const BaseUserSchema = z.object({
  slackTeamId: z.string().min(1, 'Slack Team IDは必須です。'),
  slackUserId: z.string().min(1, 'Slack User IDは必須です。'),
  firebaseUserId: z.string().min(1).max(128),
  isAdmin: z.boolean().default(false),
});

export const UserCreateSchema = BaseUserSchema;

export const UserUpdateSchema = BaseUserSchema.pick({ isAdmin: true }).partial();

export const UserResponseSchema = BaseUserSchema.extend({
  id: z.number(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserCreateRequest = z.infer<typeof UserCreateSchema>;
export type UserUpdateRequest = z.infer<typeof UserUpdateSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;

export type CurrentUser = UserResponse & {
  teamId: TeamResponse['id'];
  settingsId: UserSettingResponse['id'];
};
