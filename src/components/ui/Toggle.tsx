import React from 'react';
import styled from 'styled-components';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

const ToggleContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const ToggleSwitch = styled.div<{ checked: boolean }>`
  width: 3rem;
  height: 1.5rem;
  background-color: ${props => props.checked ? 'var(--color-accent)' : 'var(--color-border)'};
  border-radius: 1rem;
  position: relative;
  transition: background-color 0.2s;
  
  &::after {
    content: '';
    position: absolute;
    width: 1.25rem;
    height: 1.25rem;
    background-color: white;
    border-radius: 50%;
    top: 0.125rem;
    left: ${props => props.checked ? 'calc(100% - 1.375rem)' : '0.125rem'};
    transition: left 0.2s;
  }
`;

const ToggleInput = styled.input`
  display: none;
`;

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => {
  return (
    <ToggleContainer>
      <ToggleInput
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <ToggleSwitch checked={checked} />
      {label && <span>{label}</span>}
    </ToggleContainer>
  );
};