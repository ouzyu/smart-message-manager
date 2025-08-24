import type { ApiResponse, AppError } from '@workspace/models-client/types';
import { errorCreator } from '@workspace/models-client/utils';
import { Response } from 'express';
import { ZodError } from 'zod';

export const handleAppError = (error: unknown, res: Response): void => {
  // Zodエラーの処理
  if (error instanceof ZodError) {
    const appError = errorCreator.validationError('Validation failed', undefined, error.issues);
    sendErrorResponse(appError, res, 400);
    return;
  }

  // AppErrorの処理
  if (errorCreator.isAppError(error)) {
    const statusCode = getStatusCodeForError(error);
    sendErrorResponse(error, res, statusCode);
    return;
  }

  // 未知のエラー
  const unknownError = errorCreator.unknownError('An unexpected error occurred', error);
  sendErrorResponse(unknownError, res, 500);
};

/*
==============================
以下はヘルパー関数
==============================
*/

const getStatusCodeForError = (error: AppError): number => {
  switch (error.type) {
    case 'VALIDATION_ERROR':
    case 'BAD_REQUEST_ERROR':
      return 400;
    case 'AUTHENTICATION_ERROR':
      return 401;
    case 'FORBIDDEN_ERROR':
      return 403;
    case 'NOT_FOUND_ERROR':
      return 404;
    case 'METHOD_NOT_ALLOWED_ERROR':
      return 405;
    case 'CONFLICT_ERROR':
    case 'BUSINESS_LOGIC_ERROR':
      return 409;
    case 'UNPROCESSABLE_ENTITY_ERROR':
      return 422;
    case 'RATE_LIMIT_ERROR':
      return 429;
    case 'INTERNAL_SERVER_ERROR':
    case 'DATABASE_ERROR':
      return 500;
    case 'EXTERNAL_API_ERROR':
      return 502;
    case 'SERVICE_UNAVAILABLE_ERROR':
      return 503;
    case 'TIMEOUT_ERROR':
      return 504;
    default:
      return 500;
  }
};

const sendErrorResponse = (error: AppError, res: Response, statusCode: number): void => {
  const response: ApiResponse<never> = {
    success: false,
    error: {
      code: error.type,
      message: error.message,
      details: getErrorDetails(error),
    },
  };

  res.status(statusCode).json(response);
};

const getErrorDetails = (error: AppError): unknown => {
  switch (error.type) {
    case 'VALIDATION_ERROR':
      return error.details || { field: error.field };
    case 'NOT_FOUND_ERROR':
      return { resource: error.resource };
    case 'CONFLICT_ERROR':
      return { resource: error.resource };
    case 'BUSINESS_LOGIC_ERROR':
      return { code: error.code };
    case 'EXTERNAL_API_ERROR':
      return { code: error.code };
    default:
      return error.details;
  }
};
