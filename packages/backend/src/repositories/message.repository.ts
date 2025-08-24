import type { MessageCreateRequest, MessageResponse, MessageUpdateRequest } from '@workspace/models-client/schemas';
import { errorCreator, handlePrismaError } from '@workspace/models-client/utils';

import { prismaClient, type PrismaTransaction } from '@/configs/database.config';

export const create = async (data: MessageCreateRequest): Promise<MessageResponse> => {
  try {
    const message = await prismaClient.message.create({
      data,
    });

    return message;
  } catch (error) {
    handlePrismaError(error, 'create', 'message');
  }
};

export const getById = async (id: bigint, slackTeamId: string): Promise<MessageResponse | null> => {
  try {
    const message = await prismaClient.message.findUnique({
      where: { id, slackTeamId },
    });

    return message;
  } catch (error) {
    if (errorCreator.isAppError(error)) throw error;
    handlePrismaError(error, 'getById', 'message');
  }
};

export const getAllByUserId = async (mentionedUserId: number): Promise<MessageResponse[]> => {
  try {
    const messages = await prismaClient.message.findMany({
      where: { mentionedUserId },
    });

    return messages;
  } catch (error) {
    if (errorCreator.isAppError(error)) throw error;
    handlePrismaError(error, 'getAllByUserId', 'message');
  }
};

export const getByUserIdAndDataRange = async (
  mentionedUserId: number,
  startDate: Date,
  endDate: Date,
  isNotified?: boolean | false
): Promise<MessageResponse[]> => {
  try {
    const messages = await prismaClient.message.findMany({
      where: {
        mentionedUserId,
        isNotified,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return messages;
  } catch (error) {
    if (errorCreator.isAppError(error)) throw error;
    handlePrismaError(error, 'getByUserIdAndDataRange', 'message');
  }
};

export const update = async (id: bigint, data: MessageUpdateRequest): Promise<MessageResponse> => {
  try {
    const message = await prismaClient.message.update({
      where: { id },
      data,
    });

    return message;
  } catch (error) {
    handlePrismaError(error, 'update', 'message');
  }
};

export const updateManyByUserId = async (mentionedUserId: number, data: MessageUpdateRequest[]): Promise<void> => {
  try {
    await prismaClient.message.updateMany({
      where: { mentionedUserId },
      data,
    });

    return;
  } catch (error) {
    handlePrismaError(error, 'updateManyByUserId', 'message');
  }
};

export const remove = async (id: bigint): Promise<void> => {
  try {
    await prismaClient.message.delete({
      where: { id },
    });

    return;
  } catch (error) {
    handlePrismaError(error, 'remove', 'message');
  }
};

/*
==============================
以下はトランザクション利用を前提としたデータ処理。
定義する際は"suffix"として"Tx"を必ず付与し、トランザクションオブジェクト"tx"を引数として受け取る。
==============================
*/

export const getByIdTx = async (tx: PrismaTransaction, id: bigint): Promise<MessageResponse | null> => {
  return await tx.message.findUnique({ where: { id } });
};

export const updateTx = async (
  tx: PrismaTransaction,
  id: bigint,
  data: MessageUpdateRequest
): Promise<MessageResponse> => {
  const message = await tx.message.update({
    where: { id },
    data,
  });

  return message;
};
