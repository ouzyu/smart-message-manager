import { AppError } from '../types';

// クライアントエラー系 (4xx)
export const validationError = (message: string, field?: string, details?: unknown): AppError => ({
  type: 'VALIDATION_ERROR',
  message,
  field,
  details,
});

export const badRequestError = (message: string, details?: unknown): AppError => ({
  type: 'BAD_REQUEST_ERROR',
  message,
  details,
});

export const authenticationError = (message: string = 'Authentication required'): AppError => ({
  type: 'AUTHENTICATION_ERROR',
  message,
});

export const authorizationError = (message: string = 'Insufficient permissions'): AppError => ({
  type: 'AUTHORIZATION_ERROR',
  message,
});

export const notFoundError = (message: string, resource?: string): AppError => ({
  type: 'NOT_FOUND_ERROR',
  message,
  resource,
});

export const methodNotAllowedError = (message: string, details?: unknown): AppError => ({
  type: 'METHOD_NOT_ALLOWED_ERROR',
  message,
  details,
});

export const conflictError = (message: string, resource?: string): AppError => ({
  type: 'CONFLICT_ERROR',
  message,
  resource,
});

export const unprocessableEntityError = (message: string, field?: string, details?: unknown): AppError => ({
  type: 'UNPROCESSABLE_ENTITY_ERROR',
  message,
  field,
  details,
});

export const rateLimitError = (message: string = 'Rate limit exceeded'): AppError => ({
  type: 'RATE_LIMIT_ERROR',
  message,
});

// サーバーエラー系 (5xx)
export const internalServerError = (message: string, details?: unknown): AppError => ({
  type: 'INTERNAL_SERVER_ERROR',
  message,
  details,
});

export const databaseError = (message: string, details?: unknown): AppError => ({
  type: 'DATABASE_ERROR',
  message,
  details,
});

export const externalApiError = (message: string, code?: string, details?: unknown): AppError => ({
  type: 'EXTERNAL_API_ERROR',
  message,
  code,
  details,
});

export const serviceUnavailableError = (message: string, details?: unknown): AppError => ({
  type: 'SERVICE_UNAVAILABLE_ERROR',
  message,
  details,
});

export const timeoutError = (message: string, details?: unknown): AppError => ({
  type: 'TIMEOUT_ERROR',
  message,
  details,
});

// ビジネスロジック系
export const businessLogicError = (message: string, code?: string, details?: unknown): AppError => ({
  type: 'BUSINESS_LOGIC_ERROR',
  message,
  code,
  details,
});

// その他
export const networkError = (message: string, details?: unknown): AppError => ({
  type: 'NETWORK_ERROR',
  message,
  details,
});

export const unknownError = (message: string, details?: unknown): AppError => ({
  type: 'UNKNOWN_ERROR',
  message,
  details,
});

// 型ガード関数
export const isAppError = (error: unknown): error is AppError => {
  return typeof error === 'object' && error !== null && 'type' in error && 'message' in error;
};
