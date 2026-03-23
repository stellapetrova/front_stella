import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Message from '../Message';
import TypingIndicator from '../TypingIndicator';
import { EmptyState } from '../../ui/EmptyState';
import { Message as MessageType } from '../../../types/message';

const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EndOfList = styled.div`
  float: left;
  clear: both;
`;

interface MessageListProps {
  messages: MessageType[];
  isLoading?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  isLoading = false 
}) => {
  const endRef = useRef<HTMLDivElement>(null);

  // Автоскролл к последнему сообщению при изменении messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return (
      <ListContainer>
        <EmptyState message="Start a new conversation" />
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {messages.map(message => (
        <Message
          key={message.id}
          variant={message.role === 'user' ? 'user' : 'assistant'}
          sender={message.role === 'user' ? 'You' : 'GigaChat'}
          content={message.content}
          timestamp={message.timestamp}
        />
      ))}
      
      {/* Показываем индикатор загрузки, если isLoading true */}
      {isLoading && (
        <div style={{ marginBottom: '1rem' }}>
          <TypingIndicator />
        </div>
      )}
      
      <EndOfList ref={endRef} />
    </ListContainer>
  );
};

export default MessageList;