import { UserSettingResponse, UserSettingUpdateRequest } from '@workspace/models-client/schemas';
import { handlePrismaError } from '@workspace/models-client/utils';

import { prismaClient } from '@/configs/database.config';

/*
==============================
userSettingは単体で作成されることはないためcreate処理は実装しない
==============================
*/

export const getByUserId = async (userId: number): Promise<UserSettingResponse | null> => {
  try {
    const userSetting = await prismaClient.userSetting.findUnique({
      where: { userId },
    });

    return userSetting;
  } catch (error) {
    handlePrismaError(error, 'getByUserId', 'user-setting');
  }
};

// TODO: 日報送信がオンで、指定した曜日の送信設定がオンのユーザーをすべて取得するメソッドを追加する

export const update = async (userId: number, data: UserSettingUpdateRequest): Promise<UserSettingResponse> => {
  try {
    const userSetting = await prismaClient.userSetting.update({
      where: {
        userId,
      },
      data,
    });

    return userSetting;
  } catch (error) {
    handlePrismaError(error, 'update', 'user-setting');
  }
};

/*
==============================
userSettingは単体で削除されることはないためremove処理は実装しない
==============================
*/
