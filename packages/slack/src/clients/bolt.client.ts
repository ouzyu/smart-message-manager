import { App } from '@slack/bolt';

import { slackEventRouter } from '../routes/router';
import type { SlackAppInstance, SlackConfig } from '../types';
import { getLogLevel, sanitizeConfigForLogging, SlackConfigError, validateSlackConfig } from '../utils/config.helper';

/**
 * Boltアプリの作成
 */
export const createBoltApp = (config: SlackConfig): SlackAppInstance => {
  try {
    validateSlackConfig(config);

    if (!config.signingSecret || !config.clientId || !config.clientSecret) {
      throw new SlackConfigError('OAuth credentials are required', 'oauth');
    }

    const app = new App({
      signingSecret: config.signingSecret,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      stateSecret: config.stateSecret || 'my-state-secret',
      scopes: config.scopes || [
        'app_mentions:read',
        'channels:history',
        'channels:read',
        'chat:write',
        'im:history',
        'users:read',
      ],
      installationStore: {
        storeInstallation: async installation => {
          try {
            console.log('Installing to team:', installation.team?.id);
            // TODO: Prisma + MySQLでの保存実装
            return Promise.resolve();
          } catch (error) {
            console.error('Failed to store installation:', error);
            throw error;
          }
        },
        fetchInstallation: async installQuery => {
          try {
            console.log('Fetching installation for team:', installQuery.teamId);
            // TODO: Prisma + MySQLでの取得実装
            throw new Error(`No installation found for team: ${installQuery.teamId}`);
          } catch (error) {
            console.error('Failed to fetch installation:', error);
            throw error;
          }
        },
      },
      processBeforeResponse: true,
      logLevel: getLogLevel(config.environment),
    });

    // 共通ミドルウェア
    app.use(async ({ next, logger }) => {
      logger.info('Slack event received');
      await next();
    });

    // ルート設定を自動で適用
    slackEventRouter(app);

    if (config.environment === 'development') {
      console.log('Bolt app created successfully:', sanitizeConfigForLogging(config));
    } else {
      console.log('Bolt app created successfully');
    }

    return {
      app,
      client: app.client,
      start: async (port: number = 3000) => {
        try {
          await app.start(port);
          console.log(`Slack app is running on port ${port}!`);
          console.log(`Install URL: http://localhost:${port}/slack/install`);
        } catch (error) {
          if (config.environment === 'development') {
            console.error('Slack app start failed:', error);
          } else {
            console.error('Slack app start failed');
          }
          throw error;
        }
      },
    };
  } catch (error) {
    if (error instanceof SlackConfigError) {
      if (config.environment === 'development') {
        console.error('Bolt app creation failed:', error.message, sanitizeConfigForLogging(config));
      } else {
        console.error('Bolt app creation failed: Invalid configuration');
      }
    } else {
      if (config.environment === 'development') {
        console.error('Bolt app creation failed:', error);
      } else {
        console.error('Bolt app creation failed');
      }
    }
    throw error;
  }
};
