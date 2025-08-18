import { UserCreateRequest, UserResponse } from '@workspace/models-client/schemas';

import { prismaClient } from '@/lib/database.config';

export const create = async (body: UserCreateRequest): Promise<UserResponse> => {
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
