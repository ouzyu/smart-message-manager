import { IdParamSchema, UserSettingResponse, UserSettingUpdateSchema } from '@workspace/models-client/schemas';
import type { ApiResponse } from '@workspace/models-client/types';
import { Request, Response } from 'express';

import { CURRENT_USER } from '@/constants/debugCurrentUser';
import { userSettingService } from '@/services';
import { handleAppError } from '@/utils';

export const getCurrentUserSetting = async (req: Request, res: Response) => {
  try {
    const currentUser = CURRENT_USER; // TODO: firebase auth middlewareから取得するように
    const userSetting = await userSettingService.getByUserId(currentUser.id);

    const response: ApiResponse<UserSettingResponse> = {
      success: true,
      data: userSetting,
    };

    res.status(200).json(response);
  } catch (error) {
    handleAppError(error, res);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const currentUser = CURRENT_USER; // TODO: firebase auth middlewareから取得するように
    const { id } = IdParamSchema.parse(req.params);
    const validatedData = UserSettingUpdateSchema.parse(req.body);
    const userSetting = await userSettingService.update(currentUser, id, validatedData);

    const response: ApiResponse<UserSettingResponse> = {
      success: true,
      data: userSetting,
    };

    res.status(200).json(response);
  } catch (error) {
    handleAppError(error, res);
  }
};
