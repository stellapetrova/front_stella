import React from 'react';
import styled from 'styled-components';

interface ChatItemProps {
  id: string;
  title: string;
  lastMessageDate: string;
  isActive: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ItemContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  cursor: pointer;
  background-color: ${props => props.isActive ? 'var(--color-accent)' : 'transparent'};
  color: ${props => props.isActive ? 'white' : 'var(--color-text-primary)'};
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.isActive ? 'var(--color-accent-hover)' : 'var(--color-bg-secondary)'};
  }
`;

const ChatInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ChatTitle = styled.div`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatDate = styled.div<{ isActive: boolean }>`
  font-size: 0.75rem;
  color: ${props => props.isActive ? 'rgba(255, 255, 255, 0.8)' : 'var(--color-text-secondary)'};
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
  
  ${ItemContainer}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  font-size: 1rem;
  color: inherit;
  
  &:hover {
    transform: scale(1.1);
  }
`;

export const ChatItem: React.FC<ChatItemProps> = ({
  title,
  lastMessageDate,
  isActive,
  onSelect,
  onEdit,
  onDelete
}) => {
  return (
    <ItemContainer
      isActive={isActive}
      onClick={onSelect}
    >
      <ChatInfo>
        <ChatTitle>{title}</ChatTitle>
        <ChatDate isActive={isActive}>{lastMessageDate}</ChatDate>
      </ChatInfo>
      <Actions>
        <ActionButton onClick={(e) => { e.stopPropagation(); onEdit(); }}>
          ✏️
        </ActionButton>
        <ActionButton onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          🗑️
        </ActionButton>
      </Actions>
    </ItemContainer>
  );
};

export default ChatItem;