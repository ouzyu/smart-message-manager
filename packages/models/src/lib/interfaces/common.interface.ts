// APIレスポンスの基本の型を定義
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

// データベース設定
export interface DatabaseConfig {
  url: string;
  maxConnections?: number;
}
