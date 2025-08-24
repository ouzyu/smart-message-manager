import type { CurrentUser, UserSettingResponse, UserSettingUpdateRequest } from '@workspace/models-client/schemas';
import { errorCreator } from '@workspace/models-client/utils';

import { userSettingRepository } from '@/repositories';

/*
==============================
userSettingは単体で作成されることはないためcreate処理は実装しない
==============================
*/

export const getByUserId = async (currentUser: CurrentUser, userId: number): Promise<UserSettingResponse> => {
  if (currentUser.id !== userId) {
    throw errorCreator.forbiddenError('You do not have permission to get this settings');
  }

  const userSetting = await userSettingRepository.getByUserId(userId);

  if (!userSetting) {
    throw errorCreator.notFoundError(`User Setting with User ID ${userId} not found`, 'user-setting');
  }

  return userSetting;
};

export const update = async (
  currentUser: CurrentUser,
  targetUserId: number,
  data: UserSettingUpdateRequest
): Promise<UserSettingResponse> => {
  const targetSetting = await userSettingRepository.getByUserId(targetUserId);

  if (!targetSetting) {
    throw errorCreator.notFoundError(`User Setting with User ID ${targetUserId} not found`);
  }

  if (targetSetting.userId !== currentUser.id) {
    throw errorCreator.forbiddenError('You do not have permission to update these settings');
  }

  return await userSettingRepository.update(targetUserId, data);
};

/*
==============================
userSettingは単体で削除されることはないためremove処理は実装しない
==============================
*/
