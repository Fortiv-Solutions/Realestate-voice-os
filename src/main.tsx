import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastProvider } from './context/ToastContext';
import { AppProvider } from './context/AppContext';
import { AppContent } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ToastProvider>
  </React.StrictMode>
);
