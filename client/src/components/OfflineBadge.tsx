import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { db } from '../db/dexie.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { syncPendingData } from '../services/syncService.ts';

export const OfflineBadge: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingCount, setPendingCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSyncedToast, setShowSyncedToast] = useState(false);
  const { language, t } = useLanguage();

  const checkPendingAttempts = async () => {
    try {
      const count = await db.attempts_queue.where('status').equals('pending_sync').count();
      setPendingCount(count);
    } catch {
      // Dexie not initialized or table empty
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      handleTriggerSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    const handleSyncComplete = () => {
      checkPendingAttempts();
      setShowSyncedToast(true);
      setTimeout(() => setShowSyncedToast(false), 3000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('khelo-sync-complete', handleSyncComplete);

    checkPendingAttempts();
    const interval = setInterval(checkPendingAttempts, 4000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('khelo-sync-complete', handleSyncComplete);
      clearInterval(interval);
    };
  }, []);

  const handleTriggerSync = async () => {
    if (!navigator.onLine || isSyncing) return;
    setIsSyncing(true);
    try {
      const result = await syncPendingData();
      if (result.success && result.syncedCount > 0) {
        setShowSyncedToast(true);
        setTimeout(() => setShowSyncedToast(false), 3000);
      }
      await checkPendingAttempts();
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="offline-badge-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
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

      {/* Pending Sync Queue Badge with Interactive Click */}
      {pendingCount > 0 && (
        <button
          onClick={handleTriggerSync}
          className="badge"
          style={{
            background: 'rgba(59, 130, 246, 0.2)',
            color: '#60a5fa',
            border: '1px solid rgba(59, 130, 246, 0.35)',
            cursor: isOnline ? 'pointer' : 'default',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.2rem 0.55rem',
            borderRadius: 'var(--radius-full)',
            transition: 'all 0.2s ease',
          }}
          title={
            isOnline
              ? `${pendingCount} attempt(s) ready. Click to sync now!`
              : `${pendingCount} attempt(s) queued offline.`
          }
          disabled={!isOnline || isSyncing}
        >
          <RefreshCw
            size={12}
            style={{
              animation: isSyncing ? 'spin 1s linear infinite' : 'none',
            }}
          />
          <span>{pendingCount}</span>
          {isOnline && (
            <span style={{ fontSize: '0.7rem', opacity: 0.85 }}>
              {isSyncing ? 'Syncing...' : 'Sync'}
            </span>
          )}
        </button>
      )}

      {/* Synced Success Notification Pill */}
      {showSyncedToast && (
        <span
          className="badge"
          style={{
            background: 'var(--accent-green-soft)',
            color: 'var(--accent-green)',
            border: '1px solid var(--accent-green)',
            fontSize: '0.72rem',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <CheckCircle2 size={12} />
          <span>{language === 'or' ? 'ସମନ୍ୱିତ ହେଲା' : 'Synced'}</span>
        </span>
      )}
    </div>
  );
};
