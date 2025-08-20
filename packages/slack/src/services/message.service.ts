import type { MessageAttachment } from '@slack/types';
import type { WebClient } from '@slack/web-api';

import { messageBuilder } from '../builders';
import type { MessageBlocks, WelcomeParams } from '../types';

/**
 * メッセージサービス
 * WebClient（Bolt/Web-API共通）のみに依存
 */

export const sendWelcomeMessage = async (client: WebClient, params: WelcomeParams): Promise<void> => {
  try {
    const blocks = messageBuilder.createWelcomeBlocks(params);

    const result = await client.chat.postMessage({
      channel: params.channelId,
      text: `Welcome <@${params.userId}>!`,
      blocks,
      ...(params.threadTs && { thread_ts: params.threadTs }),
    });

    if (!result.ok) {
      throw new Error(`Failed to send welcome message: ${result.error}`);
    }

    console.log(`Welcome message sent to ${params.userId}: ${result.ts}`);
  } catch (error) {
    console.error(`Error sending welcome message to ${params.userId}:`, error);
    throw error;
  }
};

export const sendDirectMessage = async (
  client: WebClient,
  userId: string,
  message: string,
  blocks?: MessageBlocks,
  attachments?: MessageAttachment[]
): Promise<void> => {
  try {
    const dmChannel = await client.conversations.open({ users: userId });

    if (!dmChannel.ok || !dmChannel.channel?.id) {
      throw new Error(`Failed to open DM channel: ${dmChannel.error}`);
    }

    const result = await client.chat.postMessage({
      channel: dmChannel.channel.id,
      text: message,
      ...(blocks && { blocks }),
      ...(attachments && { attachments }),
    });

    if (!result.ok) {
      throw new Error(`Failed to send DM: ${result.error}`);
    }

    console.log(`DM sent to ${userId}: ${result.ts}`);
  } catch (error) {
    console.error(`Error sending DM to ${userId}:`, error);
    throw error;
  }
};
