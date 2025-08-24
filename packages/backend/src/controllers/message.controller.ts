import { BigIntIdParamSchema, MessageResponse } from '@workspace/models-client/schemas';
import type { ApiResponse } from '@workspace/models-client/types';
import { Request, Response } from 'express';

import { CURRENT_USER } from '@/constants/debugCurrentUser';
import { messageService } from '@/services';
import { handleAppError } from '@/utils';

export const getDailyMessage = async (req: Request, res: Response) => {
  try {
    const currentUser = CURRENT_USER;
    const messages = await messageService.getDailyMessage(currentUser);

    const response: ApiResponse<MessageResponse[]> = {
      success: true,
      data: messages,
    };

    res.status(200).json(response);
  } catch (error) {
    handleAppError(error, res);
  }
};

export const setNotified = async (req: Request, res: Response) => {
  try {
    const currentUser = CURRENT_USER;
    const { id } = BigIntIdParamSchema.parse(req.params);

    const message = await messageService.setNotified(currentUser, id);

    const response: ApiResponse<MessageResponse> = {
      success: true,
      data: message,
    };

    res.status(200).json(response);
  } catch (error) {
    handleAppError(error, res);
  }
};
