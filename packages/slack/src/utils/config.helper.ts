import { LogLevel } from '@slack/logger';

import type { SlackConfig } from '../types';

export class SlackConfigError extends Error {
  constructor(
    message: string,
    public field?: string
  ) {
    super(message);
    this.name = 'SlackConfigError';
  }
}

export const validateSlackConfig = (config: SlackConfig): void => {
  if (!config.token || config.token.trim() === '') {
    throw new SlackConfigError('Slack token is required', 'token');
  }
};

export const getLogLevel = (environment?: string): LogLevel => {
  return environment === 'development' ? LogLevel.DEBUG : LogLevel.INFO;
};

export const sanitizeConfigForLogging = (config: SlackConfig) => {
  return {
    ...config,
    token: config.token ? `${config.token.substring(0, 10)}...` : 'undefined',
    signingSecret: config.signingSecret ? '***' : 'undefined',
    appToken: config.appToken ? '***' : 'undefined',
  };
};
