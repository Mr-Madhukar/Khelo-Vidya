import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { db } from '../db/dexie.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

export const OfflineBadge: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingCount, setPendingCount] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Track pending attempts in Dexie IndexedDB
    const checkPendingAttempts = async () => {
      try {
        const count = await db.attempts_queue.where('status').equals('pending_sync').count();
        setPendingCount(count);
      } catch {
        // Dexie not initialized or table empty
      }
    };

    checkPendingAttempts();
    const interval = setInterval(checkPendingAttempts, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="offline-badge-wrapper">
      {isOnline ? (
        <span className="badge badge-online" title={t('online')}>
          <span className="status-dot dot-online" />
          <Wifi size={13} />
          <span className="badge-status-text">{t('online')}</span>
        </span>
      ) : (
        <span className="badge badge-offline" title={t('offline')}>
          <span className="status-dot dot-offline" />
          <WifiOff size={13} />
          <span className="badge-status-text">{t('offline')}</span>
        </span>
      )}

      {pendingCount > 0 && (
        <span
          className="badge"
          style={{
            background: 'rgba(59, 130, 246, 0.2)',
            color: '#60a5fa',
            border: '1px solid rgba(59, 130, 246, 0.3)',
          }}
          title={`${pendingCount} attempt(s) queued for sync`}
        >
          <RefreshCw size={12} className="animate-spin" />
          <span>{pendingCount}</span>
        </span>
      )}
    </div>
  );
};
