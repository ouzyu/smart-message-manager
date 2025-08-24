import { IdParamSchema, TeamResponse } from '@workspace/models-client/schemas';
import type { ApiResponse } from '@workspace/models-client/types';
import { Request, Response } from 'express';

import { teamService } from '@/services';
import { handleAppError } from '@/utils';

import { CURRENT_USER } from '../constants/debugCurrentUser';

export const remove = async (req: Request, res: Response) => {
  try {
    const currentUser = CURRENT_USER;
    const { id } = IdParamSchema.parse(req.params);
    await teamService.remove(currentUser, id);

    const response: ApiResponse<TeamResponse> = {
      success: true,
    };

    res.status(200).json(response);
  } catch (error) {
    handleAppError(error, res);
  }
};
