import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';
import { Slider } from '../ui/Slider';

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
`;

const Panel = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background-color: var(--color-bg-primary);
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  z-index: 2001;
  overflow-y: auto;
  box-shadow: var(--shadow-md);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text-secondary);
  
  &:hover {
    color: var(--color-text-primary);
  }
`;

const Content = styled.div`
  padding: 1rem;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SectionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 1rem 0;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--color-accent);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--color-accent);
  }
`;

const NumberInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--color-accent);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const [model, setModel] = useState('GigaChat');
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [systemPrompt, setSystemPrompt] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleSave = () => {
    console.log('Saving settings:', {
      model,
      temperature,
      topP,
      maxTokens,
      systemPrompt,
      isDarkTheme
    });
    onClose();
  };

  const handleReset = () => {
    setModel('GigaChat');
    setTemperature(0.7);
    setTopP(0.9);
    setMaxTokens(2048);
    setSystemPrompt('');
    setIsDarkTheme(false);
  };

  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <Panel isOpen={isOpen}>
        <Header>
          <Title>Settings</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>
        
        <Content>
          <Section>
            <SectionTitle>Model</SectionTitle>
            <FormGroup>
              <Label>Select Model</Label>
              <Select value={model} onChange={(e) => setModel(e.target.value)}>
                <option value="GigaChat">GigaChat</option>
                <option value="GigaChat-Plus">GigaChat-Plus</option>
                <option value="GigaChat-Pro">GigaChat-Pro</option>
                <option value="GigaChat-Max">GigaChat-Max</option>
              </Select>
            </FormGroup>
          </Section>

          <Section>
            <SectionTitle>Generation Parameters</SectionTitle>
            <FormGroup>
              <Slider
                min={0}
                max={2}
                step={0.1}
                value={temperature}
                onChange={setTemperature}
                label="Temperature"
              />
            </FormGroup>
            
            <FormGroup>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={topP}
                onChange={setTopP}
                label="Top-P"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Max Tokens</Label>
              <NumberInput
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                min={1}
                max={4096}
              />
            </FormGroup>
          </Section>

          <Section>
            <SectionTitle>System Prompt</SectionTitle>
            <FormGroup>
              <TextArea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Enter system prompt..."
              />
            </FormGroup>
          </Section>

          <Section>
            <SectionTitle>Appearance</SectionTitle>
            <FormGroup>
              <Toggle
                checked={isDarkTheme}
                onChange={setIsDarkTheme}
                label="Dark Theme"
              />
            </FormGroup>
          </Section>

          <ButtonGroup>
            <Button variant="primary" onClick={handleSave} fullWidth>
              Save
            </Button>
            <Button variant="secondary" onClick={handleReset} fullWidth>
              Reset
            </Button>
          </ButtonGroup>
        </Content>
      </Panel>
    </>
  );
};

export default SettingsPanel;