import type { AppMentionEvent, MessageEvent } from '@slack/types';

/**
 * 型ガード関数：通常のメッセージかどうか判定
 */
export function isRegularMessage(message: MessageEvent): message is MessageEvent & {
  user: string;
  channel: string;
  text?: string;
  subtype?: undefined;
} {
  return (
    'user' in message &&
    'channel' in message &&
    typeof message.user === 'string' &&
    typeof message.channel === 'string' &&
    message.subtype === undefined
  );
}

/**
 * アプリメンションイベントの検証
 */
export function isValidAppMention(event: AppMentionEvent): event is AppMentionEvent & {
  user: string;
  channel: string;
  text: string;
} {
  return typeof event.user === 'string' && typeof event.channel === 'string' && typeof event.text === 'string';
}
