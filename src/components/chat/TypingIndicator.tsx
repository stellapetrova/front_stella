import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
  } 40% { 
    transform: scale(1.0);
  }
`;

const IndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  background-color: var(--color-assistant-message);
  border-radius: 1rem;
  border-bottom-left-radius: 0.25rem;
  width: fit-content;
`;

const Dot = styled.div<{ delay: string }>`
  width: 8px;
  height: 8px;
  background-color: var(--color-text-secondary);
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out;
  animation-delay: ${props => props.delay};
`;

interface TypingIndicatorProps {
  isVisible?: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isVisible = true }) => {
  if (!isVisible) return null;

  return (
    <IndicatorContainer>
      <Dot delay="-0.32s" />
      <Dot delay="-0.16s" />
      <Dot delay="0s" />
    </IndicatorContainer>
  );
};

export default TypingIndicator;