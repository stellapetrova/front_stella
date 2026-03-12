import React, { useState } from 'react';
import styled from 'styled-components';
import { ChatItem } from './ChatItem';

const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: var(--color-text-secondary);
  padding: 2rem;
`;

interface Chat {
  id: string;
  title: string;
  lastMessageDate: string;
}

interface ChatListProps {
  onChatSelect: (chatId: string) => void;
  activeChatId?: string;
}

const mockChats: Chat[] = [
  { id: '1', title: 'General Discussion', lastMessageDate: '2024-01-15' },
  { id: '2', title: 'Project Planning Meeting Notes and Tasks', lastMessageDate: '2024-01-14' },
  { id: '3', title: 'Technical Support', lastMessageDate: '2024-01-13' },
  { id: '4', title: 'AI Research Discussion', lastMessageDate: '2024-01-12' },
  { id: '5', title: 'Code Review Session', lastMessageDate: '2024-01-11' },
];

export const ChatList: React.FC<ChatListProps> = ({ onChatSelect, activeChatId }) => {
  const [chats, setChats] = useState(mockChats);

  const handleEdit = (chatId: string) => {
    const newTitle = prompt('Enter new chat title:');
    if (newTitle) {
      setChats(chats.map(chat => 
        chat.id === chatId ? { ...chat, title: newTitle } : chat
      ));
    }
  };

  const handleDelete = (chatId: string) => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      setChats(chats.filter(chat => chat.id !== chatId));
    }
  };

  if (chats.length === 0) {
    return <EmptyMessage>No chats yet. Create a new one!</EmptyMessage>;
  }

  return (
    <ListContainer>
      {chats.map(chat => (
        <ChatItem
          key={chat.id}
          id={chat.id}
          title={chat.title}
          lastMessageDate={chat.lastMessageDate}
          isActive={activeChatId === chat.id}
          onSelect={() => onChatSelect(chat.id)}
          onEdit={() => handleEdit(chat.id)}
          onDelete={() => handleDelete(chat.id)}
        />
      ))}
    </ListContainer>
  );
};

export default ChatList;