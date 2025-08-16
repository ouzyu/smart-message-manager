import { z } from 'zod';

import type { Prisma, User } from '../entities';

export const UserCreateSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  name: z.string().min(1, '名前は必須です').max(100, '名前は100文字以内で入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
}) satisfies z.ZodType<Prisma.UserCreateInput>;

export const UserUpdateSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).max(100).optional(),
  password: z.string().min(8).optional(),
}) satisfies z.ZodType<Prisma.UserUpdateInput>;

export const UserResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<Omit<User, 'password'>>;
