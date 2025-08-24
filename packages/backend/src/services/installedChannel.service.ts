import { errorCreator } from '@workspace/models-client';
import {
  CurrentUser,
  InstalledChannelCreateRequest,
  InstalledChannelResponse,
  InstalledChannelUpdateRequest,
} from '@workspace/models-client/schemas';

import { prismaClient } from '@/configs/database.config';
import { installedChannelRepository } from '@/repositories';

export const installAppToChannel = async (
  currentUser: CurrentUser,
  data: InstalledChannelCreateRequest
): Promise<InstalledChannelResponse> => {
  return await prismaClient.$transaction(async tx => {
    if (currentUser.slackTeamId !== data.slackTeamId) {
      throw errorCreator.forbiddenError('You do not have permission to create installed channel');
    }

    // TODO: Slack APIを利用してチャンネルにアプリをインストールする処理を実装する

    const installedChannel = await installedChannelRepository.createTx(tx, data);
    return installedChannel;
  });
};

export const getById = async (currentUser: CurrentUser, id: number): Promise<InstalledChannelResponse> => {
  const installedChannel = await installedChannelRepository.getById(id, currentUser.slackTeamId);

  if (!installedChannel) {
    throw errorCreator.notFoundError(`Installed Channel with ID ${id} not found`, 'installed-channel');
  }

  return installedChannel;
};

export const getAllByUserId = async (currentUser: CurrentUser): Promise<InstalledChannelResponse[]> => {
  return await installedChannelRepository.getAllByUserId(currentUser.id);
};

export const update = async (id: number, data: InstalledChannelUpdateRequest): Promise<InstalledChannelResponse> => {
  return await installedChannelRepository.update(id, data);
};

export const remove = async (id: number): Promise<void> => {
  return await installedChannelRepository.remove(id);
};
