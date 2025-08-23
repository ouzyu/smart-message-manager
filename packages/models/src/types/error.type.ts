export type AppErrorType =
  // クライアントエラー系 (4xx)
  | 'VALIDATION_ERROR' // 400 - バリデーションエラー
  | 'BAD_REQUEST_ERROR' // 400 - 一般的な不正リクエスト
  | 'AUTHENTICATION_ERROR' // 401 - 認証エラー（ログインが必要）
  | 'AUTHORIZATION_ERROR' // 403 - 認可エラー（権限不足）
  | 'NOT_FOUND_ERROR' // 404 - リソースが見つからない
  | 'METHOD_NOT_ALLOWED_ERROR' // 405 - HTTPメソッドが許可されていない
  | 'CONFLICT_ERROR' // 409 - データの競合（重複など）
  | 'UNPROCESSABLE_ENTITY_ERROR' // 422 - エンティティ処理不可
  | 'RATE_LIMIT_ERROR' // 429 - レート制限超過

  // サーバーエラー系 (5xx)
  | 'INTERNAL_SERVER_ERROR' // 500 - 内部サーバーエラー
  | 'DATABASE_ERROR' // 500 - データベースエラー
  | 'EXTERNAL_API_ERROR' // 502/503 - 外部API連携エラー
  | 'SERVICE_UNAVAILABLE_ERROR' // 503 - サービス利用不可
  | 'TIMEOUT_ERROR' // 504 - タイムアウト

  // ビジネスロジック系
  | 'BUSINESS_LOGIC_ERROR' // 409 - ビジネスルール違反

  // その他
  | 'NETWORK_ERROR' // ネットワークエラー（フロントエンド用）
  | 'UNKNOWN_ERROR'; // 未分類エラー

export type AppError = {
  type: AppErrorType;
  message: string;
  field?: string;
  resource?: string;
  code?: string;
  details?: unknown;
  originalError?: unknown;
};

export type PrismaError = {
  code: string;
  message: string;
  meta?: {
    target?: string[];
    [key: string]: unknown;
  };
};
