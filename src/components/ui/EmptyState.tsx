import React from 'react';
import styled from 'styled-components';

interface EmptyStateProps {
  message: string;
  illustration?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  color: var(--color-text-secondary);
`;

const Icon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const Message = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  message, 
  illustration = '💬' 
}) => {
  return (
    <Container>
      <Icon>{illustration}</Icon>
      <Message>{message}</Message>
    </Container>
  );
};