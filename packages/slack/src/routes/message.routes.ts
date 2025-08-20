import type { App } from '@slack/bolt';

import { handleHelloMessage } from '../controllers/message.controller';

/**
 * メッセージイベントルート
 */
export const messageRoutes = (app: App): void => {
  // Hello挨拶
  app.message(/^(hello|hi|こんにちは)$/i, async ({ message, client, logger }) => {
    try {
      await handleHelloMessage(message, client, logger);
    } catch (error) {
      logger?.error('Route: Hello message handling failed:', error);
      // 必要に応じてユーザーにエラーメッセージを送信
    }
  });
};
