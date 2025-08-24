import { MasterMessageCategoryResponse } from '@workspace/models-client/schemas';

import { MASTER_MESSAGE_CATEGORY_DATA } from '@/constants/masterMessageCategory';
import { masterMessageCategoryRepository } from '@/repositories';

export const createMasterData = async (): Promise<void> => {
  return await masterMessageCategoryRepository.createMany(MASTER_MESSAGE_CATEGORY_DATA);
};

export const getMasterData = async (): Promise<MasterMessageCategoryResponse[]> => {
  return await masterMessageCategoryRepository.getAll();
};
