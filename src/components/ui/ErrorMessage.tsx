import React from 'react';
import styled from 'styled-components';

interface ErrorMessageProps {
  message: string;
}

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid var(--color-danger);
  border-radius: 0.375rem;
  color: var(--color-danger);
  font-size: 0.875rem;
`;

const ErrorIcon = styled.span`
  font-size: 1.25rem;
`;

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <span>{message}</span>
    </ErrorContainer>
  );
};