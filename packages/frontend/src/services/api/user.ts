import { api } from './client';
import { API } from './endpoints';

import { ApiResponse } from '@workspace/models-types/interfaces';
import { UserResponse, UserResponseSchema } from '@workspace/models-types/schemas';

/**
 * ユーザー情報をIDから取得
 * @param id ユーザーID
 * @returns ユーザー情報
 */
export const getUser = async (id: number): Promise<UserResponse> => {
  try {
    const response = await api.get<ApiResponse<UserResponse>>(API.users.getById(id));

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'ユーザーデータの取得に失敗しました');
    }

    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('予期しないエラーが発生しました');
  }
};
