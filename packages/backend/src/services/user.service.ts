import type { UserCreateRequest, UserResponse } from '@workspace/models-client/schemas';

import { userRepository } from '@/repositories';

export const create = async (data: UserCreateRequest): Promise<UserResponse> => {
  return await userRepository.create(data);
};

export const get = async (id: number): Promise<UserResponse | null> => {
  return await userRepository.get(id);
};
