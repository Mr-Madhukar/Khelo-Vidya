import Dexie, { type Table } from 'dexie';
import { QueuedAttempt, CachedLesson, CachedBadge, User } from '../types/index.ts';

export interface CachedGameProgress {
  lessonId: string;
  studentId?: string;
  currentLevel: number;
  maxUnlockedLevel: number;
  xp: number;
  score: number;
  completedLevels: number[];
  difficulty: 'easy' | 'medium' | 'hard';
  plantStage: 'seed' | 'small' | 'growing' | 'healthy' | 'fully-grown';
  badges: string[];
  completed: boolean;
  updatedAt: string;
}

export class KheloVidyaDB extends Dexie {
  attempts_queue!: Table<QueuedAttempt, string>;
  lessons_cache!: Table<CachedLesson, string>;
  session!: Table<{ key: string; value: unknown }, string>;
  badges_cache!: Table<CachedBadge, string>;
  game_progress!: Table<CachedGameProgress, string>;

  constructor() {
    super('KheloVidyaOfflineDB');
    this.version(2).stores({
      attempts_queue: 'attemptUUID, studentId, lessonId, status, submittedAt',
      lessons_cache: 'id, topicId, grade, subject, language, contentVersion',
      session: 'key',
      badges_cache: 'id, studentId, badgeId, earnedAt',
      game_progress: 'lessonId, studentId, currentLevel, completed, updatedAt',
    });
  }
}

export const db = new KheloVidyaDB();

// Helper functions for offline session persistence
export const saveOfflineSession = async (token: string, user: User) => {
  await db.session.put({ key: 'token', value: token });
  await db.session.put({ key: 'user', value: user });
};

export const getOfflineSession = async (): Promise<{ token: string | null; user: User | null }> => {
  const tokenItem = await db.session.get('token');
  const userItem = await db.session.get('user');
  return {
    token: tokenItem ? (tokenItem.value as string) : null,
    user: userItem ? (userItem.value as User) : null,
  };
};

export const clearOfflineSession = async () => {
  await db.session.delete('token');
  await db.session.delete('user');
};
