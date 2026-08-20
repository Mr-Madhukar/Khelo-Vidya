import { apiRequest } from '../../../services/api.ts';
import { db, CachedGameProgress } from '../../../db/dexie.ts';
import { GameProgressState, Difficulty, PlantStage } from '../types/game.types.ts';

export async function fetchGameProgress(topicKey: string, studentId?: string): Promise<GameProgressState> {
  // First check Dexie cache
  const local = await db.game_progress.get(topicKey);

  try {
    const res = await apiRequest<{ success: boolean; progress: any }>(`/game/${topicKey}/progress`);
    if (res.success && res.progress) {
      const p = res.progress;
      const remoteState: GameProgressState = {
        lessonId: topicKey,
        currentLevel: p.currentLevel || 1,
        maxUnlockedLevel: p.maxUnlockedLevel || Math.max(p.currentLevel || 1, local?.maxUnlockedLevel || 1),
        xp: Math.max(p.xp || 0, local?.xp || 0),
        score: Math.max(p.score || 0, local?.score || 0),
        completedLevels: local?.completedLevels || (p.completed ? [1, 2, 3, 4, 5] : []),
        difficulty: (p.difficulty as Difficulty) || 'medium',
        plantStage: (p.plantStage as PlantStage) || 'seed',
        badges: Array.from(new Set([...(p.badges || []), ...(local?.badges || [])])),
        completed: Boolean(p.completed || local?.completed),
        mistakesInCurrentLevel: 0,
        correctInCurrentLevel: 0,
        updatedAt: p.updatedAt || new Date().toISOString(),
      };

      // Update Dexie cache
      await db.game_progress.put({
        ...remoteState,
        studentId,
        updatedAt: new Date().toISOString(),
      });

      return remoteState;
    }
  } catch (_err) {
    console.warn('[gameService] Offline: loading game progress from local IndexedDB...');
  }

  // Fallback to local Dexie cache or default initial state
  if (local) {
    return {
      lessonId: local.lessonId,
      currentLevel: local.currentLevel,
      maxUnlockedLevel: local.maxUnlockedLevel,
      xp: local.xp,
      score: local.score,
      completedLevels: local.completedLevels || [],
      difficulty: local.difficulty,
      plantStage: local.plantStage,
      badges: local.badges || [],
      completed: local.completed,
      mistakesInCurrentLevel: 0,
      correctInCurrentLevel: 0,
      updatedAt: local.updatedAt,
    };
  }

  return {
    lessonId: topicKey,
    currentLevel: 1,
    maxUnlockedLevel: 1,
    xp: 0,
    score: 0,
    completedLevels: [],
    difficulty: 'medium',
    plantStage: 'seed',
    badges: [],
    completed: false,
    mistakesInCurrentLevel: 0,
    correctInCurrentLevel: 0,
  };
}

export async function saveGameProgress(
  state: GameProgressState,
  studentId?: string,
  newBadges?: Array<{ id: string; name: string; nameOdia: string }>
): Promise<void> {
  const cachedRecord: CachedGameProgress = {
    lessonId: state.lessonId,
    studentId,
    currentLevel: state.currentLevel,
    maxUnlockedLevel: state.maxUnlockedLevel,
    xp: state.xp,
    score: state.score,
    completedLevels: state.completedLevels,
    difficulty: state.difficulty,
    plantStage: state.plantStage,
    badges: state.badges,
    completed: state.completed,
    updatedAt: new Date().toISOString(),
  };

  // Always write immediately to local Dexie
  await db.game_progress.put(cachedRecord);

  // Sync with backend API if online
  try {
    await apiRequest('/game/progress', {
      method: 'POST',
      body: JSON.stringify({
        lessonId: state.lessonId,
        currentLevel: state.currentLevel,
        xp: state.xp,
        score: state.score,
        difficulty: state.difficulty,
        plantStage: state.plantStage,
        completed: state.completed,
        newBadges: newBadges || [],
      }),
    });
  } catch (_err) {
    console.warn('[gameService] Offline: game progress stored locally, will sync automatically.');
  }
}
