import { Prisma, type User } from '@workspace/models/entities';

import { userRepository } from '@/repositories';

export const create = async (data: Prisma.UserCreateInput): Promise<User> => {
  return await userRepository.create(data);
};

export const get = async (id: number): Promise<User | null> => {
  return await userRepository.get(id);
};
