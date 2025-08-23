import { AppErrorType } from './error.type';

// APIレスポンスの基本の型を定義
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: AppErrorType;
    message: string;
    details?: unknown;
  };
};

// データベース設定
export type DatabaseConfig = {
  url: string;
  maxConnections?: number;
};
