import React from 'react';
import styled from 'styled-components';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
`;

const StyledSlider = styled.input`
  width: 100%;
  height: 0.5rem;
  background-color: var(--color-border);
  border-radius: 0.25rem;
  outline: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 1rem;
    height: 1rem;
    background-color: var(--color-accent);
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.1s;
    
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 0.1,
  value,
  onChange,
  label
}) => {
  return (
    <SliderContainer>
      {label && (
        <SliderHeader>
          <span>{label}</span>
          <span>{value}</span>
        </SliderHeader>
      )}
      <StyledSlider
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </SliderContainer>
  );
};