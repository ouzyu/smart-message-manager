import type { ApiResponse } from '@workspace/models-client/interfaces';
import { IdParamSchema, UserCreateSchema, UserResponse } from '@workspace/models-client/schemas';
import { Request, Response } from 'express';

import { userService } from '@/services';

export const create = async (req: Request, res: Response) => {
  try {
    const validatedData = UserCreateSchema.parse(req.body);

    const user = await userService.create(validatedData);

    const response: ApiResponse<UserResponse> = {
      success: true,
      data: user,
      message: 'User created successfully',
    };

    res.status(201).json(response);
  } catch (error) {
    if (error instanceof Error && 'issues' in error) {
      // Zodバリデーションエラーの場合
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: error.issues,
        },
      });
    }

    res.status(400).json({
      success: false,
      error: {
        code: 'CREATE_USER_ERROR',
        message: 'Failed to create user',
        details: error,
      },
    });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const { id } = IdParamSchema.parse(req.params);

    const user = await userService.get(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found',
        },
      });
    }

    const response: ApiResponse<UserResponse> = {
      success: true,
      data: user,
    };

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error && 'issues' in error) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid parameter format',
          details: error.issues,
        },
      });
    }

    res.status(500).json({
      success: false,
      error: {
        code: 'GET_USER_ERROR',
        message: 'Failed to get user',
        details: error,
      },
    });
  }
};
