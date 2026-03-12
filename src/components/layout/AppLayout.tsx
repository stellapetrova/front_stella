import React, { useState } from 'react';
import styled from 'styled-components';
import { Sidebar } from '../sidebar/Sidebar';
import { ChatWindow } from '../chat/ChatWindow';
import { SettingsPanel } from '../settings/SettingsPanel';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 0;
  
  @media (min-width: 768px) {
    margin-left: 280px;
  }
`;

export const AppLayout: React.FC = () => {
  const [activeChatId, setActiveChatId] = useState<string>('1');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleNewChat = () => {
    console.log('Creating new chat');
    // Здесь будет логика создания нового чата
  };

  return (
    <LayoutContainer>
      <Sidebar
        activeChatId={activeChatId}
        onChatSelect={setActiveChatId}
        onNewChat={handleNewChat}
      />
      
      <MainContent>
        <ChatWindow 
          chatId={activeChatId}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      </MainContent>

      <SettingsPanel 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </LayoutContainer>
  );
};

export default AppLayout;