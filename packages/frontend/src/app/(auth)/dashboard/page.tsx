import { MessageList } from '@/features/dashboard/components/MessageList';
import type { Message } from '@/types/message';
'use client';

import { Button } from '@/components/shadcn/button';

const TEST_MESSAGES: Array<Message> = [
  {
    title: 'title_1',
    description: 'description_1',
    contents: 'contents_1',
    footer: 'footer_1',
  },
  {
    title: 'title_2',
    description: 'description_2',
    contents: 'contents_2',
    footer: 'footer_2',
  },
  {
    title: 'title_3',
    description: 'description_3',
    contents: 'contents_3',
    footer: 'footer_3',
  },
  {
    title: 'title_4',
    description: 'description_4',
    contents: 'contents_4',
    footer: 'footer_4',
  },
  {
    title: 'title_5',
    description: 'description_5',
    contents: 'contents_5',
    footer: 'footer_5',
  },
  {
    title: 'title_6',
    description: 'description_6',
    contents: 'contents_6',
    footer: 'footer_6',
  },
];

export default function Dashboard() {
  return (
    <div>
      <p>hello world !!</p>
      <Button
        onClick={() => {
          console.log('debug');
        }}
      >
        Push me
      </Button>
      <MessageList messages={TEST_MESSAGES} />
    </div>
  );
}
