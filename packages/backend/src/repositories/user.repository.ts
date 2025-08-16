import { Prisma, type User } from '@workspace/models/entities';

import { prismaClient } from '@/lib/database.config';

export const create = async (body: Prisma.UserCreateInput): Promise<User> => {
  const user = await prismaClient.user.create({
    data: body,
  });

  return user;
};

export const get = async (id: number): Promise<User | null> => {
  const user = await prismaClient.user.findUnique({
    where: { id },
  });

  return user;
};
