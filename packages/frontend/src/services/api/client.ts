import axios from 'axios';
import { ApiResponse } from '@workspace/models/interfaces';

export const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000, // 10秒でタイムアウト -> TODO: 環境変数かどこかに入れるべき
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    // 将来的にCSRFトークンを入れる
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error.response?.data || error.message);
    }

    const apiError: ApiResponse<null> = {
      success: false,
      error: {
        code: error.response?.status?.toString() || 'NETWORK_ERROR',
        message: error.response?.data?.message || 'ネットワークエラーが発生しました',
        details: error.response?.data || error.message,
      },
    };

    return Promise.reject(apiError);
  }
);
