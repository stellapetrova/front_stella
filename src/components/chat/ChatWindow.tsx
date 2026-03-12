import React, { useState } from 'react';
import styled from 'styled-components';
import { MessageList } from './MessageList/MessageList';
import { InputArea } from './InputArea/InputArea';
import { Button } from '../ui/Button';

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

interface ChatWindowProps {
  chatId?: string;
  onOpenSettings?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ 
  chatId, 
  onOpenSettings 
}) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
    // Здесь будет логика отправки сообщения
  };

  const handleStopGeneration = () => {
    console.log('Stopping generation');
    setIsTyping(false);
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
      
      <MessageList isTyping={isTyping} />
      
      <InputArea
        onSendMessage={handleSendMessage}
        onStopGeneration={handleStopGeneration}
        isGenerating={isTyping}
      />
    </WindowContainer>
  );
};

export default ChatWindow;