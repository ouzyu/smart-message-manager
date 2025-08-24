import {
  MessageCategoryBulkOperationResponse,
  MessageCategoryBulkOperationSchema,
  MessageCategoryResponse,
} from '@workspace/models-client/schemas';
import type { ApiResponse } from '@workspace/models-client/types';
import { Request, Response } from 'express';

import { CURRENT_USER } from '@/constants/debugCurrentUser';
import { messageCategoryService } from '@/services';
import { handleAppError } from '@/utils';

export const getAllByUserId = async (req: Request, res: Response) => {
  try {
    const currentUser = CURRENT_USER; // TODO: firebase auth middlewareから取得するように
    const messageCategories = await messageCategoryService.getAllByUserId(currentUser);

    const response: ApiResponse<MessageCategoryResponse[]> = {
      success: true,
      data: messageCategories,
    };

    res.status(200).json(response);
  } catch (error) {
    handleAppError(error, res);
  }
};

export const bulkOperateCRUD = async (req: Request, res: Response) => {
  try {
    const currentUser = CURRENT_USER; // TODO: firebase auth middlewareから取得するように
    const validatedData = MessageCategoryBulkOperationSchema.parse(req.body);

    const messageCategories = await messageCategoryService.bulkOperateCRUD(currentUser, validatedData);

    const response: ApiResponse<MessageCategoryBulkOperationResponse> = {
      success: true,
      data: messageCategories,
    };

    res.status(200).json(response);
  } catch (error) {
    // エラーハンドリング
    handleAppError(error, res);
  }
};
