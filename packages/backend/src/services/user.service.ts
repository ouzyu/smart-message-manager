import type { CurrentUser, UserCreateRequest, UserResponse, UserUpdateRequest } from '@workspace/models-client/schemas';
import { errorCreator } from '@workspace/models-client/utils';

import { userRepository } from '@/repositories';

export const createWithSettings = async (data: UserCreateRequest): Promise<UserResponse> => {
  return await userRepository.createWithSettings(data);
};

export const getByFirebaseUserId = async (firebaseUserId: string): Promise<UserResponse> => {
  const user = await userRepository.getByFirebaseUserId(firebaseUserId);

  if (!user) {
    throw errorCreator.notFoundError(`User with Firebase User ID ${firebaseUserId} not found`, 'user');
  }

  return user;
};

export const getBySlackTeamId = async (isAdmin: boolean, slackTeamId: string): Promise<UserResponse[]> => {
  if (!isAdmin) {
    throw errorCreator.forbiddenError('You do not have permission to get these users');
  }

  return await userRepository.getBySlackTeamId(slackTeamId);
};

export const setAdminStatus = async (
  currentUser: CurrentUser,
  targetUserId: number,
  data: UserUpdateRequest
): Promise<UserResponse> => {
  if (!currentUser.isAdmin) {
    throw errorCreator.forbiddenError('You do not have permission to update this user');
  }

  const targetUser = await userRepository.getById(targetUserId, currentUser.slackTeamId);

  if (!targetUser) {
    throw errorCreator.notFoundError(`User with User ID ${targetUserId} not found`, 'user');
  }

  // 明示的にisAdmin値のみを取り出す。
  const { isAdmin } = data;

  return await userRepository.update(targetUserId, { isAdmin });
};

export const remove = async (currentUser: CurrentUser, targetUserId: number): Promise<void> => {
  if (currentUser.id !== targetUserId) {
    throw errorCreator.forbiddenError('You do not have permission to remove this user');
  }

  return await userRepository.remove(targetUserId);
};
