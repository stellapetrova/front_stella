import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../ui/ErrorMessage';

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--color-bg-secondary);
`;

const AuthCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: var(--color-bg-primary);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-md);
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--color-text-primary);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
`;

const Input = styled.input`
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

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
`;

type Scope = 'GIGACHAT_API_PERS' | 'GIGACHAT_API_B2B' | 'GIGACHAT_API_CORP';

interface AuthFormProps {
  onLogin: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState('');
  const [scope, setScope] = useState<Scope>('GIGACHAT_API_PERS');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.trim()) {
      setError('Credentials field cannot be empty');
      return;
    }
    
    setError('');
    onLogin();
  };

  return (
    <AuthContainer>
      <AuthCard>
        <Title>Authentication</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Credentials (Base64)</Label>
            <Input
              type="password"
              value={credentials}
              onChange={(e) => setCredentials(e.target.value)}
              placeholder="Enter Base64 credentials"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Scope</Label>
            <RadioGroup>
              <RadioLabel>
                <input
                  type="radio"
                  value="GIGACHAT_API_PERS"
                  checked={scope === 'GIGACHAT_API_PERS'}
                  onChange={(e) => setScope(e.target.value as Scope)}
                />
                Personal
              </RadioLabel>
              <RadioLabel>
                <input
                  type="radio"
                  value="GIGACHAT_API_B2B"
                  checked={scope === 'GIGACHAT_API_B2B'}
                  onChange={(e) => setScope(e.target.value as Scope)}
                />
                B2B
              </RadioLabel>
              <RadioLabel>
                <input
                  type="radio"
                  value="GIGACHAT_API_CORP"
                  checked={scope === 'GIGACHAT_API_CORP'}
                  onChange={(e) => setScope(e.target.value as Scope)}
                />
                Corporate
              </RadioLabel>
            </RadioGroup>
          </FormGroup>
          
          {error && <ErrorMessage message={error} />}
          
          <Button type="submit" variant="primary" fullWidth>
            Login
          </Button>
        </Form>
      </AuthCard>
    </AuthContainer>
  );
};