import {
  InstalledChannelCreateRequest,
  InstalledChannelResponse,
  InstalledChannelUpdateRequest,
} from '@workspace/models-client/schemas';
import { errorCreator, handlePrismaError } from '@workspace/models-client/utils';

import { prismaClient, PrismaTransaction } from '@/configs/database.config';

export const create = async (data: InstalledChannelCreateRequest) => {
  try {
    const result = await prismaClient.installedChannel.create({
      data,
    });

    return result;
  } catch (error) {
    handlePrismaError(error, 'create', 'installed-channel');
  }
};

export const getById = async (id: number, slackTeamId: string): Promise<InstalledChannelResponse | null> => {
  try {
    const installedChannel = await prismaClient.installedChannel.findUnique({
      where: { id, slackTeamId },
    });

    return installedChannel;
  } catch (error) {
    if (errorCreator.isAppError(error)) throw error;
    handlePrismaError(error, 'getById', 'installed-channel');
  }
};

export const getAllByUserId = async (installedUserId: number): Promise<InstalledChannelResponse[]> => {
  try {
    const installedChannels = await prismaClient.installedChannel.findMany({
      where: {
        installedUserId,
      },
    });

    return installedChannels;
  } catch (error) {
    if (errorCreator.isAppError(error)) throw error;
    handlePrismaError(error, 'getAllByUserId', 'installed-channel');
  }
};

export const getAllByTeamId = async (slackTeamId: string, userId: number): Promise<InstalledChannelResponse[]> => {
  try {
    const installedChannels = await prismaClient.installedChannel.findMany({
      where: {
        slackTeamId,
        installedUserId: userId,
      },
    });

    if (!installedChannels) {
      throw errorCreator.notFoundError(`Installed Channels with User ID ${userId} not found`, 'installed-channel');
    }

    return installedChannels;
  } catch (error) {
    if (errorCreator.isAppError(error)) throw error;
    handlePrismaError(error, 'getAllByTeamId', 'installed-channel');
  }
};

export const update = async (id: number, data: InstalledChannelUpdateRequest): Promise<InstalledChannelResponse> => {
  try {
    const installedChannel = await prismaClient.installedChannel.update({
      where: { id },
      data,
    });

    return installedChannel;
  } catch (error) {
    handlePrismaError(error, 'update', 'installed-channel');
  }
};

export const updateManyByInstalledUserId = async (
  userId: number,
  data: InstalledChannelUpdateRequest[]
): Promise<void> => {
  try {
    await prismaClient.installedChannel.updateManyAndReturn({
      where: { installedUserId: userId },
      data,
    });

    return;
  } catch (error) {
    handlePrismaError(error, 'updateChannels', 'installed-channel');
  }
};

export const remove = async (id: number): Promise<void> => {
  try {
    await prismaClient.installedChannel.delete({
      where: { id },
    });

    return;
  } catch (error) {
    handlePrismaError(error, 'remove', 'installed-channel');
  }
};

/*
==============================
以下はトランザクション利用を前提としたデータ処理。
定義する際は"suffix"として"Tx"を必ず付与し、トランザクションオブジェクト"tx"を引数として受け取る。
==============================
*/

export const createTx = async (
  tx: PrismaTransaction,
  data: InstalledChannelCreateRequest
): Promise<InstalledChannelResponse> => {
  try {
    const installedChannel = await tx.installedChannel.create({
      data,
    });

    return installedChannel;
  } catch (error) {
    handlePrismaError(error, 'createTx', 'installed-channel');
  }
};

export const removeManyByIdsTx = async (tx: PrismaTransaction, ids: number[]): Promise<void> => {
  try {
    await tx.installedChannel.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return;
  } catch (error) {
    handlePrismaError(error, 'removeManyTx', 'installed-channel');
  }
};
