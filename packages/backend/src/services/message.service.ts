import { CurrentUser, MessageCreateRequest, MessageResponse } from '@workspace/models-client/schemas';
import { errorCreator } from '@workspace/models-client/utils';

import { prismaClient } from '@/configs/database.config';
import { messageRepository } from '@/repositories';

export const create = async (data: MessageCreateRequest): Promise<MessageResponse> => {
  return await messageRepository.create(data);
};

export const getDailyMessage = async (currentUser: CurrentUser): Promise<MessageResponse[]> => {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  return await messageRepository.getByUserIdAndDataRange(currentUser.id, startDate, endDate);
};

export const setNotified = async (currentUser: CurrentUser, id: bigint): Promise<MessageResponse> => {
  return await prismaClient.$transaction(async tx => {
    const targetMessage = await messageRepository.getByIdTx(tx, id);

    if (!targetMessage) {
      throw errorCreator.notFoundError(`Message with ID ${id} not found`, 'message');
    }

    if (currentUser.id !== targetMessage.mentionedUserId) {
      throw errorCreator.forbiddenError('You do not have permission to update this message');
    }

    return await messageRepository.updateTx(tx, id, { isNotified: true });
  });
};
