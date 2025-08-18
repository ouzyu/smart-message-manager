import { MessageCard } from '@/components/card/MessageCard';
import { Message } from '@/types/message';

interface MessageCardListProps {
  messages: Array<Message>;
}

export function MessageList({ messages }: MessageCardListProps) {
  return (
    <div>
      {messages.map((message, index) => (
        <MessageCard message={message} key={index} />
      ))}
    </div>
  );
}
