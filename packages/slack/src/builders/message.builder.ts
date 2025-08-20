import type { Block, KnownBlock } from '@slack/types';

import type { WelcomeParams } from '../types';

/**
 * ウェルカムメッセージのブロック作成
 */
export const createWelcomeBlocks = (params: WelcomeParams): (Block | KnownBlock)[] => {
  const blocks: (Block | KnownBlock)[] = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Welcome <@${params.userId}>!`,
      },
    },
  ];

  if (params.customMessage) {
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: params.customMessage,
      },
    });
  }

  // アクションボタンを追加
  blocks.push({
    type: 'actions',
    elements: [
      {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'Get Help',
        },
        value: 'help_button',
        action_id: 'help_action',
      },
    ],
  });

  return blocks;
};
