import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Message from '../Message';
import TypingIndicator from '../TypingIndicator';
import { EmptyState } from '../../ui/EmptyState';

const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const EndOfList = styled.div`
  float: left;
  clear: both;
`;

interface MessageType {
  id: string;
  variant: 'user' | 'assistant';
  sender: string;
  content: string;
  timestamp: string;
}

interface MessageListProps {
  messages?: MessageType[];
  isTyping?: boolean;
}

const mockMessages: MessageType[] = [
  {
    id: '1',
    variant: 'assistant',
    sender: 'GigaChat',
    content: 'Hello! How can I help you today?',
    timestamp: '10:00 AM'
  },
  {
    id: '2',
    variant: 'user',
    sender: 'You',
    content: 'Can you explain what React is?',
    timestamp: '10:01 AM'
  },
  {
    id: '3',
    variant: 'assistant',
    sender: 'GigaChat',
    content: 'React is a JavaScript library for building user interfaces. Here are some key features:\n\n- **Component-based architecture**\n- *Virtual DOM* for performance\n- One-way data flow\n- JSX syntax\n\n```jsx\nfunction Welcome() {\n  return <h1>Hello, React!</h1>;\n}\n```',
    timestamp: '10:01 AM'
  },
  {
    id: '4',
    variant: 'user',
    sender: 'You',
    content: 'What about hooks?',
    timestamp: '10:02 AM'
  },
  {
    id: '5',
    variant: 'assistant',
    sender: 'GigaChat',
    content: 'Hooks are functions that let you "hook into" React state and lifecycle features. Common hooks include:\n1. useState\n2. useEffect\n3. useContext\n4. useReducer',
    timestamp: '10:02 AM'
  },
  {
    id: '6',
    variant: 'user',
    sender: 'You',
    content: 'Thanks for the explanation!',
    timestamp: '10:03 AM'
  }
];

export const MessageList: React.FC<MessageListProps> = ({ 
  messages = mockMessages, 
  isTyping = true 
}) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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
        <Message key={message.id} {...message} />
      ))}
      
      {isTyping && (
        <div style={{ marginBottom: '1rem' }}>
          <TypingIndicator />
        </div>
      )}
      
      <EndOfList ref={endRef} />
    </ListContainer>
  );
};

export default MessageList;