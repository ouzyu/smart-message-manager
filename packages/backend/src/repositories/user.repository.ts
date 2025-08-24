import { UserCreateRequest, UserResponse, UserUpdateRequest } from '@workspace/models-client/schemas';
import { errorCreator, handlePrismaError } from '@workspace/models-client/utils';

import { prismaClient } from '@/configs/database.config';

export const createWithSettings = async (data: UserCreateRequest): Promise<UserResponse> => {
  try {
    const user = await prismaClient.user.create({
      data: {
        ...data,
        userSetting: {
          create: {},
        },
      },
    });

    return user;
  } catch (error) {
    handlePrismaError(error, 'createWithSettings', 'user');
  }
};

export const getById = async (id: number, slackTeamId: string): Promise<UserResponse | null> => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { id, slackTeamId },
    });

    return user;
  } catch (error) {
    handlePrismaError(error, 'get', 'user');
  }
};

export const getByFirebaseUserId = async (firebaseUserId: string): Promise<UserResponse | null> => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { firebaseUserId },
    });

    return user;
  } catch (error) {
    if (errorCreator.isAppError(error)) throw error;
    handlePrismaError(error, 'getByFirebaseUserId', 'user');
  }
};

export const getBySlackTeamId = async (slackTeamId: string): Promise<UserResponse[]> => {
  try {
    const users = await prismaClient.user.findMany({
      where: { slackTeamId },
    });

    return users;
  } catch (error) {
    handlePrismaError(error, 'getBySlackTeamId', 'user');
  }
};

export const update = async (id: number, data: UserUpdateRequest): Promise<UserResponse> => {
  try {
    const user = await prismaClient.user.update({
      where: { id },
      data,
    });

    return user;
  } catch (error) {
    handlePrismaError(error, 'update', 'user');
  }
};

export const remove = async (id: number): Promise<void> => {
  try {
    await prismaClient.user.delete({ where: { id } });

    return;
  } catch (error) {
    handlePrismaError(error, 'remove', 'user');
  }
};
