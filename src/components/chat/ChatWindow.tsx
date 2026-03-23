import React, { useState } from 'react';
import styled from 'styled-components';
import MessageList from './MessageList/MessageList';
import InputArea from './InputArea/InputArea';
import { Button } from '../ui/Button';
import { Message } from '../../types/message';

const WindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--color-bg-primary);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-bg-secondary);
`;

const ChatTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
`;

const SettingsButton = styled(Button)`
  padding: 0.5rem;
  font-size: 1.25rem;
`;

// Моковые начальные сообщения
const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! How can I help you today?',
    timestamp: new Date().toLocaleTimeString(),
  },
  {
    id: '2',
    role: 'user',
    content: 'Can you explain what React is?',
    timestamp: new Date().toLocaleTimeString(),
  },
  {
    id: '3',
    role: 'assistant',
    content: 'React is a JavaScript library for building user interfaces. Here are some key features:\n\n- **Component-based architecture**\n- *Virtual DOM* for performance\n- One-way data flow\n- JSX syntax\n\n```jsx\nfunction Welcome() {\n  return <h1>Hello, React!</h1>;\n}\n```',
    timestamp: new Date().toLocaleTimeString(),
  },
];

interface ChatWindowProps {
  chatId?: string;
  onOpenSettings?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ 
  chatId, 
  onOpenSettings 
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  // Функция для генерации уникального ID
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Функция отправки сообщения
  const handleSendMessage = (content: string) => {
    if (!content.trim() || isLoading) return;

    // Создаем сообщение пользователя
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    // Добавляем сообщение пользователя
    setMessages(prev => [...prev, userMessage]);
    
    // Устанавливаем состояние загрузки
    setIsLoading(true);

    // Симулируем ответ ассистента через 1-2 секунды
    setTimeout(() => {
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: getMockResponse(content),
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, Math.random() * 1000 + 1000); // Случайная задержка от 1 до 2 секунд
  };

  // Функция генерации мокового ответа
  const getMockResponse = (userMessage: string): string => {
    const responses = [
      `That's an interesting question about "${userMessage}". Let me help you with that.`,
      `I understand you're asking about "${userMessage}". Here's what I think...`,
      `Great question! Regarding "${userMessage}", I'd say it's a fascinating topic.`,
      `Thanks for asking about "${userMessage}". Let me explain...`,
      `I appreciate your question about "${userMessage}". Here's my perspective.`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleStopGeneration = () => {
    console.log('Stopping generation');
    setIsLoading(false);
  };

  return (
    <WindowContainer>
      <Header>
        <ChatTitle>
          {chatId ? `Chat ${chatId}` : 'New Chat'}
        </ChatTitle>
        <SettingsButton variant="secondary" onClick={onOpenSettings}>
          ⚙️
        </SettingsButton>
      </Header>
      
      <MessageList messages={messages} isLoading={isLoading} />
      
      <InputArea
        onSendMessage={handleSendMessage}
        onStopGeneration={handleStopGeneration}
        isGenerating={isLoading}
      />
    </WindowContainer>
  );
};

export default ChatWindow;