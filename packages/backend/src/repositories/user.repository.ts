import { UserCreateRequest, UserResponse } from '@workspace/models-client/schemas';

import { prismaClient } from '@/lib/database.config';

export const create = async (body: UserCreateRequest): Promise<UserResponse> => {
  const user = await prismaClient.user.create({
    data: body,
    omit: {
      password: true,
    },
  });

  return user;
};

export const get = async (id: number): Promise<UserResponse | null> => {
  const user = await prismaClient.user.findUnique({
    where: { id },
    omit: {
      password: true,
    },
  });

  return user;
};
