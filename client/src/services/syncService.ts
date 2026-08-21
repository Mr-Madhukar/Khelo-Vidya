import { db } from '../db/dexie.ts';
import { apiRequest } from './api.ts';
import { AttemptSubmissionResponse, CachedBadge } from '../types/index.ts';

let isSyncing = false;

export interface SyncResult {
  success: boolean;
  syncedCount: number;
  error?: string;
}

/**
 * Synchronizes all pending offline quiz attempts and game progress with the cloud backend.
 */
export async function syncPendingData(): Promise<SyncResult> {
  if (isSyncing) {
    return { success: false, syncedCount: 0, error: 'Sync already in progress' };
  }

  if (!navigator.onLine) {
    return { success: false, syncedCount: 0, error: 'Device is offline' };
  }

  isSyncing = true;
  let syncedCount = 0;

  try {
    // 1. Fetch all pending quiz attempts
    const pendingAttempts = await db.attempts_queue
      .where('status')
      .equals('pending_sync')
      .toArray();

    if (pendingAttempts.length > 0) {
      console.log(`[SyncService] Found ${pendingAttempts.length} pending attempt(s) to sync.`);

      for (const attempt of pendingAttempts) {
        try {
          const res = await apiRequest<AttemptSubmissionResponse>('/attempts', {
            method: 'POST',
            body: JSON.stringify({
              attempt_uuid: attempt.attemptUUID,
              lesson_id: attempt.lessonId,
              answers: attempt.answers,
              client_submitted_score: attempt.clientSubmittedScore,
            }),
          });

          // Mark as successfully synced in local Dexie store
          await db.attempts_queue.update(attempt.attemptUUID, {
            status: 'synced',
            syncedAt: new Date().toISOString(),
          });

          // Cache any server-computed new badges
          if (res.newBadges && res.newBadges.length > 0) {
            for (const badge of res.newBadges) {
              const cachedBadge: CachedBadge = {
                id: `${attempt.studentId}-${badge.id}`,
                studentId: attempt.studentId,
                badgeId: badge.id,
                badgeName: badge.name,
                badgeNameOdia: badge.nameOdia,
                earnedAt: new Date().toISOString(),
              };
              await db.badges_cache.put(cachedBadge);
            }
          }

          syncedCount++;
        } catch (attemptErr) {
          console.warn(`[SyncService] Failed to sync attempt ${attempt.attemptUUID}:`, attemptErr);
        }
      }
    }

    // 2. Sync any game progress records
    try {
      const allGameProgress = await db.game_progress.toArray();
      for (const gp of allGameProgress) {
        if (gp.studentId) {
          await apiRequest('/games/progress', {
            method: 'POST',
            body: JSON.stringify({
              lesson_id: gp.lessonId,
              current_level: gp.currentLevel,
              xp: gp.xp,
              score: gp.score,
              difficulty: gp.difficulty,
              plant_stage: gp.plantStage,
              completed: gp.completed,
            }),
          }).catch(() => {
            // Ignore non-critical game sync failures
          });
        }
      }
    } catch {
      // Ignore game progress sync error
    }

    // Emit event so header, dashboard, and progress pages update immediately
    window.dispatchEvent(
      new CustomEvent('khelo-sync-complete', {
        detail: { syncedCount, timestamp: new Date().toISOString() },
      })
    );

    return { success: true, syncedCount };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown sync failure';
    console.error('[SyncService] Sync error:', errorMsg);
    return { success: false, syncedCount, error: errorMsg };
  } finally {
    isSyncing = false;
  }
}

/**
 * Initializes the global sync listener on app startup.
 * Automatically triggers synchronization when network recovers or on window focus.
 */
export function initSyncEngine(): () => void {
  const handleOnline = () => {
    console.log('[SyncEngine] Network online detected. Triggering auto-sync...');
    syncPendingData();
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('focus', handleOnline);

  // Background timer: check for pending sync every 20 seconds when online
  const intervalId = setInterval(() => {
    if (navigator.onLine) {
      db.attempts_queue
        .where('status')
        .equals('pending_sync')
        .count()
        .then((count) => {
          if (count > 0) {
            syncPendingData();
          }
        })
        .catch(() => {});
    }
  }, 20000);

  // Initial trigger if online on boot
  if (navigator.onLine) {
    syncPendingData();
  }

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('focus', handleOnline);
    clearInterval(intervalId);
  };
}
