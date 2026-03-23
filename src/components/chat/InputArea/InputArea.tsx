import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../../ui/Button';

const InputContainer = styled.div`
  border-top: 1px solid var(--color-border);
  padding: 1rem;
  background-color: var(--color-bg-primary);
`;

const Form = styled.form`
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
`;

const TextAreaWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  resize: none;
  min-height: 40px;
  max-height: 120px;
  font-family: inherit;
  font-size: 0.875rem;
  line-height: 1.5;
  
  &:focus {
    outline: none;
    border-color: var(--color-accent);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: var(--color-text-secondary);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  border-radius: 0.375rem;
  
  &:hover:not(:disabled) {
    background-color: var(--color-bg-secondary);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  onStopGeneration?: () => void;
  isGenerating?: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({
  onSendMessage,
  onStopGeneration,
  isGenerating = false
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Автоматическая подстройка высоты textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Отправляем только если есть сообщение и не идет генерация
    if (message.trim() && !isGenerating) {
      onSendMessage(message);
      setMessage(''); // Очищаем поле после отправки
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Проверяем, активна ли кнопка отправки
  const isSendDisabled = !message.trim() || isGenerating;

  return (
    <InputContainer>
      <Form onSubmit={handleSubmit}>
        <TextAreaWrapper>
          <StyledTextArea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Shift+Enter for new line)"
            rows={1}
            disabled={isGenerating}
          />
        </TextAreaWrapper>
        
        <ActionButtons>
          <IconButton 
            type="button" 
            title="Attach file"
            disabled={isGenerating}
          >
            📎
          </IconButton>
          
          {isGenerating ? (
            <Button type="button" variant="secondary" onClick={onStopGeneration}>
              ⏹️ Stop
            </Button>
          ) : (
            <Button 
              type="submit" 
              variant="primary" 
              disabled={isSendDisabled}
            >
              Send
            </Button>
          )}
        </ActionButtons>
      </Form>
    </InputContainer>
  );
};

export default InputArea;