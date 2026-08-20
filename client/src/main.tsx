import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './index.css';

// Register PWA service worker
import { registerSW } from 'virtual:pwa-register';

registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('[PWA] New content available, refresh to update.');
  },
  onOfflineReady() {
    console.log('[PWA] App is ready to work offline.');
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
