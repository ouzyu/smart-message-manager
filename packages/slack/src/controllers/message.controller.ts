import type { MessageEvent } from '@slack/types';
import type { Logger, WebClient } from '@slack/web-api';

import { messageService } from '../services';
import { isRegularMessage } from '../utils';

/**
 * Hello挨拶メッセージのコントローラー
 */
export const handleHelloMessage = async (message: MessageEvent, client: WebClient, logger?: Logger): Promise<void> => {
  try {
    // バリデーション
    if (!isRegularMessage(message)) {
      logger?.warn('Received non-regular message event');
      return;
    }

    // ビジネスロジック呼び出し
    await messageService.sendWelcomeMessage(client, {
      userId: message.user,
      channelId: message.channel,
      customMessage: 'Hello! How can I help you today?',
    });

    logger?.info(`Welcome message sent to user: ${message.user}`);
  } catch (error) {
    logger?.error('Error handling hello message:', error);
    throw error;
  }
};
