import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background-color: var(--color-accent);
          color: white;
          &:hover:not(:disabled) {
            background-color: var(--color-accent-hover);
          }
        `;
      case 'danger':
        return `
          background-color: var(--color-danger);
          color: white;
          &:hover:not(:disabled) {
            background-color: var(--color-danger-hover);
          }
        `;
      default:
        return `
          background-color: var(--color-bg-secondary);
          color: var(--color-text-primary);
          border: 1px solid var(--color-border);
          &:hover:not(:disabled) {
            background-color: var(--color-border);
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};