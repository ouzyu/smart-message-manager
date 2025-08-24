import type {
  MessageCategoryCreateRequest,
  MessageCategoryResponse,
  MessageCategoryUpdateRequest,
} from '@workspace/models-client/schemas';
import { errorCreator, handlePrismaError } from '@workspace/models-client/utils';

import { prismaClient, type PrismaTransaction } from '@/configs/database.config';

export const create = async (data: MessageCategoryCreateRequest): Promise<MessageCategoryResponse> => {
  try {
    const messageCategory = await prismaClient.messageCategory.create({
      data,
    });

    return messageCategory;
  } catch (error) {
    handlePrismaError(error, 'create', 'message-category');
  }
};

export const createMany = async (data: MessageCategoryCreateRequest[]): Promise<MessageCategoryResponse[]> => {
  try {
    const messageCategories = await prismaClient.messageCategory.createManyAndReturn({
      data,
    });

    return messageCategories;
  } catch (error) {
    handlePrismaError(error, 'createMany', 'message-category');
  }
};

export const getById = async (id: number, userId: number): Promise<MessageCategoryResponse | null> => {
  try {
    const messageCategory = await prismaClient.messageCategory.findUnique({
      where: { id, userId },
    });

    return messageCategory;
  } catch (error) {
    if (errorCreator.isAppError(error)) throw error;
    handlePrismaError(error, 'get', 'message-category');
  }
};

export const getAllByUserId = async (userId: number): Promise<MessageCategoryResponse[]> => {
  try {
    const messageCategories = await prismaClient.messageCategory.findMany({
      where: { userId },
    });

    return messageCategories;
  } catch (error) {
    if (errorCreator.isAppError(error)) throw error;
    handlePrismaError(error, 'getAllByUserId', 'message-category');
  }
};

export const update = async (id: number, data: MessageCategoryUpdateRequest): Promise<MessageCategoryResponse> => {
  try {
    const messageCategory = await prismaClient.messageCategory.update({
      where: { id },
      data,
    });

    return messageCategory;
  } catch (error) {
    handlePrismaError(error, 'update', 'message-category');
  }
};

export const updateMany = async (data: MessageCategoryUpdateRequest): Promise<MessageCategoryResponse[]> => {
  try {
    const messageCategories = await prismaClient.messageCategory.updateManyAndReturn({
      data,
    });

    return messageCategories;
  } catch (error) {
    handlePrismaError(error, 'updateMany', 'message-category');
  }
};

export const remove = async (id: number): Promise<void> => {
  try {
    await prismaClient.messageCategory.delete({ where: { id } });

    return;
  } catch (error) {
    handlePrismaError(error, 'remove', 'message-category');
  }
};

/*
==============================
以下はトランザクション利用を前提としたデータ処理。
定義する際は"suffix"として"Tx"を必ず付与し、トランザクションオブジェクト"tx"を引数として受け取る。
==============================
*/

export const findIdsByUserIdAndIdsTx = async (
  tx: PrismaTransaction,
  userId: number,
  ids: number[]
): Promise<{ id: number }[]> => {
  return await tx.messageCategory.findMany({
    where: {
      id: { in: ids },
      userId,
    },
    select: { id: true },
  });
};

export const countByUserIdTx = async (tx: PrismaTransaction, userId: number): Promise<number> => {
  return await tx.messageCategory.count({
    where: { userId },
  });
};

export const createManyTx = async (
  tx: PrismaTransaction,
  data: MessageCategoryCreateRequest[]
): Promise<MessageCategoryResponse[]> => {
  return await tx.messageCategory.createManyAndReturn({
    data,
  });
};

export const getMaxDisplayOrderByUserIdTx = async (tx: PrismaTransaction, userId: number): Promise<number> => {
  const result = await tx.messageCategory.aggregate({
    where: { userId },
    _max: { displayOrder: true },
  });
  return result._max.displayOrder || 0;
};

export const updateTx = async (
  tx: PrismaTransaction,
  id: number,
  userId: number,
  data: MessageCategoryUpdateRequest
): Promise<MessageCategoryResponse> => {
  return await tx.messageCategory.update({
    where: { id, userId },
    data,
  });
};

export const deleteManyByUserIdAndIdsTx = async (
  tx: PrismaTransaction,
  userId: number,
  ids: number[]
): Promise<void> => {
  await tx.messageCategory.deleteMany({
    where: {
      id: { in: ids },
      userId,
    },
  });

  return;
};

export const recalculateDisplayOrderTx = async (tx: PrismaTransaction, userId: number): Promise<void> => {
  const categories = await tx.messageCategory.findMany({
    where: { userId },
    orderBy: { displayOrder: 'asc' },
    select: { id: true },
  });

  for (let i = 0; i < categories.length; i++) {
    await tx.messageCategory.update({
      where: { id: categories[i].id },
      data: { displayOrder: i + 1 },
    });
  }
};
