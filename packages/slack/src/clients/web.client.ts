import { WebClient } from '@slack/web-api';

import type { SlackConfig } from '../types';
import { getLogLevel, sanitizeConfigForLogging, SlackConfigError, validateSlackConfig } from '../utils';

/**
 * WebClient作成（Lambda用）
 */
export const createWebClient = (config: SlackConfig): WebClient => {
  try {
    validateSlackConfig(config);

    const webClient = new WebClient(config.token, {
      logLevel: getLogLevel(config.environment),
    });

    if (config.environment === 'development') {
      console.log('WebClient created successfully:', sanitizeConfigForLogging(config));
    } else {
      console.log('WebClient created successfully');
    }

    return webClient;
  } catch (error) {
    if (error instanceof SlackConfigError) {
      if (config.environment === 'development') {
        console.error('WebClient creation failed:', error.message, sanitizeConfigForLogging(config));
      } else {
        console.error('WebClient creation failed: Invalid configuration');
      }
    } else {
      if (config.environment === 'development') {
        console.error('WebClient creation failed:', error);
      } else {
        console.error('WebClient creation failed');
      }
    }
    throw error;
  }
};

export const createWebClientFromToken = (token: string): WebClient => {
  return createWebClient({ token });
};
