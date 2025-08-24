import type {
  CurrentUser,
  MessageCategoryBulkOperationRequest,
  MessageCategoryBulkOperationResponse,
  MessageCategoryResponse,
} from '@workspace/models-client/schemas';
import { errorCreator } from '@workspace/models-client/utils';

import { prismaClient, type PrismaTransaction } from '@/configs/database.config';
import { masterMessageCategoryRepository, messageCategoryRepository } from '@/repositories';

export const createFromMasterTable = async (userId: number): Promise<MessageCategoryResponse[]> => {
  return await prismaClient.$transaction(async tx => {
    const currentCount = await tx.messageCategory.count({ where: { userId } });
    if (currentCount > 0) {
      throw errorCreator.badRequestError('Target user already created initial message categories');
    }

    const masterData = await masterMessageCategoryRepository.getMasterData();

    const data = masterData.map((master, index) => ({
      userId,
      categoryName: master.categoryName,
      categoryDescription: master.categoryDescription,
      displayOrder: index + 1,
    }));

    return await messageCategoryRepository.createManyTx(tx, data);
  });
};

export const getAllByUserId = async (currentUser: CurrentUser): Promise<MessageCategoryResponse[]> => {
  return await messageCategoryRepository.getAllByUserId(currentUser.id);
};

export const bulkOperateCRUD = async (currentUser: CurrentUser, data: MessageCategoryBulkOperationRequest) => {
  if (currentUser.id !== data.userId) {
    throw errorCreator.forbiddenError('You do not have permission to operate these message categories');
  }

  return await prismaClient.$transaction(async tx => {
    await validateCategoryCountLimits(tx, data.userId, data.operations.deletes.length, data.operations.creates.length);
    await validateDeletionTargets(tx, data.userId, data.operations.deletes);

    const results: MessageCategoryBulkOperationResponse = {
      updated: [],
      deleted: [],
      created: [],
    };

    // ユニーク制約回避のために、最初に削除処理
    if (data.operations.deletes.length > 0) {
      await messageCategoryRepository.deleteManyByUserIdAndIdsTx(tx, data.userId, data.operations.deletes);
      results.deleted = data.operations.deletes;
    }

    // 連番を保証するためにdisplayOrderを再計算
    await messageCategoryRepository.recalculateDisplayOrderTx(tx, data.userId);

    // 更新処理
    for (const update of data.operations.updates) {
      const updated = await messageCategoryRepository.updateTx(tx, update.id, data.userId, update);
      results.updated.push(updated);
    }

    // 作成処理
    if (data.operations.creates.length > 0) {
      const maxOrder = await messageCategoryRepository.getMaxDisplayOrderByUserIdTx(tx, data.userId);
      const startOrder = maxOrder + 1;

      const createdData = data.operations.creates.map((item, index) => ({
        ...item,
        userId: data.userId,
        displayOrder: item.displayOrder || startOrder + index,
      }));

      const created = await messageCategoryRepository.createManyTx(tx, createdData);
      results.created = created;
    }

    return results;
  });
};

/*
==============================
以下はヘルパー関数
==============================
*/

const validateCategoryCountLimits = async (
  tx: PrismaTransaction,
  userId: number,
  deleteCount: number,
  createCount: number
) => {
  const currentCount = await messageCategoryRepository.countByUserIdTx(tx, userId);
  const finalCount = currentCount - deleteCount + createCount;

  if (finalCount < 3) {
    throw errorCreator.badRequestError('A minimum of 3 categories is required.');
  }

  if (finalCount > 10) {
    throw errorCreator.badRequestError('A maximum of 10 categories is allowed.');
  }
};

const validateDeletionTargets = async (tx: PrismaTransaction, userId: number, targetIds: number[]) => {
  if (targetIds.length === 0) {
    return;
  }

  const existingIds = await messageCategoryRepository.findIdsByUserIdAndIdsTx(tx, userId, targetIds);

  if (existingIds.length !== targetIds.length) {
    throw errorCreator.notFoundError('Categories to be deleted were not found.');
  }
};
