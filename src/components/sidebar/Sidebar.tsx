import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../ui/Button';
import { SearchInput } from './SearchInput';
import { ChatList } from './ChatList';

const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  width: 280px;
  height: 100vh;
  background-color: var(--color-bg-sidebar);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  z-index: 1000;
  
  @media (min-width: 768px) {
    transform: translateX(0);
    position: sticky;
  }
`;

const Header = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
`;

const NewChatButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
`;

const BurgerButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1100;
  background-color: var(--color-accent);
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 900;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

interface SidebarProps {
  activeChatId?: string;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeChatId,
  onChatSelect,
  onNewChat
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <BurgerButton onClick={toggleSidebar}>
        {isOpen ? '✕' : '☰'}
      </BurgerButton>
      
      <Overlay isOpen={isOpen} onClick={toggleSidebar} />
      
      <SidebarContainer isOpen={isOpen}>
        <Header>
          <NewChatButton variant="primary" onClick={onNewChat}>
            <span>+</span> New Chat
          </NewChatButton>
        </Header>
        
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        
        <ChatList
          activeChatId={activeChatId}
          onChatSelect={(chatId) => {
            onChatSelect(chatId);
            setIsOpen(false);
          }}
        />
      </SidebarContainer>
    </>
  );
};

export default Sidebar;