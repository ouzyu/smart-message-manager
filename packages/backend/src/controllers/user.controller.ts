import { IdParamSchema, UserCreateSchema, UserResponse, UserUpdateSchema } from '@workspace/models-client/schemas';
import type { ApiResponse } from '@workspace/models-client/types';
import { Request, Response } from 'express';

import { CURRENT_USER } from '@/constants/debugCurrentUser';
import { userService } from '@/services';
import { handleAppError } from '@/utils';

export const createWithSettings = async (req: Request, res: Response) => {
  try {
    const validatedData = UserCreateSchema.parse(req.body);
    const user = await userService.createWithSettings(validatedData);

    const response: ApiResponse<UserResponse> = {
      success: true,
      data: user,
    };

    res.status(201).json(response);
  } catch (error) {
    handleAppError(error, res);
  }
};

export const getBySlackTeamId = async (req: Request, res: Response) => {
  try {
    const { isAdmin, slackTeamId } = CURRENT_USER; // TODO: firebase auth middlewareから取得するように
    const users = await userService.getBySlackTeamId(isAdmin, slackTeamId);

    const response: ApiResponse<UserResponse[]> = {
      success: true,
      data: users,
    };

    res.status(200).json(response);
  } catch (error) {
    handleAppError(error, res);
  }
};

export const setAdminStatus = async (req: Request, res: Response) => {
  try {
    const currentUser = CURRENT_USER; // TODO: firebase auth middlewareから取得するように
    const { id } = IdParamSchema.parse(req.params);
    const validatedData = UserUpdateSchema.parse(req.body);

    const user = await userService.setAdminStatus(currentUser, id, validatedData);

    const response: ApiResponse<UserResponse> = {
      success: true,
      data: user,
    };

    res.status(200).json(response);
  } catch (error) {
    handleAppError(error, res);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const currentUser = CURRENT_USER;
    const { id } = IdParamSchema.parse(req.params);
    await userService.remove(currentUser, id);

    const response: ApiResponse<UserResponse> = {
      success: true,
    };

    res.status(200).json(response);
  } catch (error) {
    handleAppError(error, res);
  }
};
