import { PrismaError } from '../types';
import { errorCreator } from './index';

export const handlePrismaError = (error: unknown, operation: string, resource: string): never => {
  if (isPrismaError(error)) {
    switch (error.code) {
      case 'P2002': {
        const target = error.meta?.target ? ` (${error.meta.target.join(', ')})` : '';
        throw errorCreator.conflictError(`${resource} with this${target} already exists`, resource);
      }

      case 'P2025': {
        throw errorCreator.notFoundError(`${resource} not found`, resource);
      }

      case 'P2003': {
        throw errorCreator.badRequestError(`Invalid reference to related ${resource}`);
      }

      case 'P2014': {
        throw errorCreator.conflictError(`Cannot delete ${resource} due to related records`, resource);
      }

      default: {
        throw errorCreator.databaseError(`Database ${operation} failed: ${error.code}`, error);
      }
    }
  }

  throw errorCreator.databaseError(`Failed to ${operation} ${resource}`, error);
};

/*
==============================
以下はヘルパー関数
==============================
*/

const isPrismaError = (error: unknown): error is PrismaError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as Record<string, unknown>).code === 'string'
  );
};
