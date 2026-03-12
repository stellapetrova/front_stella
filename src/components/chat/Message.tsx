import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

interface MessageProps {
  variant: 'user' | 'assistant';
  sender: string;
  content: string;
  timestamp?: string;
}

const MessageContainer = styled.div<{ variant: 'user' | 'assistant' }>`
  display: flex;
  margin-bottom: 1rem;
  justify-content: ${props => props.variant === 'user' ? 'flex-end' : 'flex-start'};
`;

const MessageBubble = styled.div<{ variant: 'user' | 'assistant' }>`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  background-color: ${props => 
    props.variant === 'user' 
      ? 'var(--color-user-message)' 
      : 'var(--color-assistant-message)'
  };
  color: ${props => props.variant === 'user' ? 'white' : 'var(--color-text-primary)'};
  position: relative;
  
  ${props => props.variant === 'user' 
    ? 'border-bottom-right-radius: 0.25rem;' 
    : 'border-bottom-left-radius: 0.25rem;'
  }
`;

const MessageHeader = styled.div<{ variant: 'user' | 'assistant' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
  color: ${props => props.variant === 'user' 
    ? 'rgba(255, 255, 255, 0.8)' 
    : 'var(--color-text-secondary)'
  };
`;

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
`;

const MessageContent = styled.div`
  font-size: 0.875rem;
  line-height: 1.5;
  
  p {
    margin: 0 0 0.5rem 0;
  }
  
  p:last-child {
    margin-bottom: 0;
  }
  
  code {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: monospace;
  }
  
  pre {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    border-radius: 0.375rem;
    overflow-x: auto;
  }
  
  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }
`;

const CopyButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
  padding: 0.25rem;
  font-size: 1rem;
  color: inherit;
  
  ${MessageBubble}:hover & {
    opacity: 1;
  }
  
  &:hover {
    transform: scale(1.1);
  }
`;

const Timestamp = styled.span`
  font-size: 0.625rem;
  opacity: 0.6;
  margin-left: 0.5rem;
`;

export const Message: React.FC<MessageProps> = ({
  variant,
  sender,
  content,
  timestamp
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MessageContainer variant={variant}>
      <MessageBubble variant={variant}>
        <MessageHeader variant={variant}>
          {variant === 'assistant' && (
            <Avatar>AI</Avatar>
          )}
          <span>{sender}</span>
          {timestamp && <Timestamp>{timestamp}</Timestamp>}
        </MessageHeader>
        
        <MessageContent>
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </MessageContent>
        
        <CopyButton onClick={handleCopy}>
          {copied ? '✓' : '📋'}
        </CopyButton>
      </MessageBubble>
    </MessageContainer>
  );
};

export default Message;