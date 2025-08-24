import {
  BaseMasterMessageCategory,
  MasterMessageCategoryCreateRequest,
  MasterMessageCategoryResponse,
} from '@workspace/models-client/schemas';
import { errorCreator, handlePrismaError } from '@workspace/models-client/utils';

import { prismaClient } from '@/configs/database.config';

export const createMany = async (data: MasterMessageCategoryCreateRequest[]): Promise<void> => {
  try {
    await prismaClient.masterMessageCategory.createMany({
      data,
    });

    return;
  } catch (error) {
    handlePrismaError(error, 'createMany', 'master-message-category');
  }
};

export const getAll = async (): Promise<MasterMessageCategoryResponse[]> => {
  try {
    const results = await prismaClient.masterMessageCategory.findMany();

    return results;
  } catch (error) {
    if (errorCreator.isAppError(error)) throw error;
    handlePrismaError(error, 'getAll', 'master-message-category');
  }
};

export const getMasterData = async (): Promise<BaseMasterMessageCategory[]> => {
  try {
    const results = await prismaClient.masterMessageCategory.findMany({
      omit: {
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return results;
  } catch (error) {
    if (errorCreator.isAppError(error)) throw error;
    handlePrismaError(error, 'getMasterData', 'master-message-category');
  }
};
