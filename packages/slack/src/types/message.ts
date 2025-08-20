import type { Block, KnownBlock } from '@slack/types';

export type MessageBlocks = (Block | KnownBlock)[];

export interface WelcomeParams {
  userId: string;
  channelId: string;
  customMessage?: string;
  threadTs?: string;
}

export interface NotificationParams {
  channelId: string;
  title: string;
  message: string;
  priority?: 'low' | 'normal' | 'high';
  mentions?: string[];
}

export interface HelpParams {
  userId: string;
  channelId: string;
}

export interface DirectMessageParams {
  userId: string;
  channelId: string;
  text: string;
}

export interface AppMentionParams {
  userId: string;
  channelId: string;
  text: string;
}
