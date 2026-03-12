import React, { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { AuthForm } from './components/auth/AuthForm';
import './styles/theme.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AuthForm onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AppLayout />;
}

export default App;