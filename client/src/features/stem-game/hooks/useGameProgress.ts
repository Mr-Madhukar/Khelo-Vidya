import { useState, useEffect, useCallback, useRef } from 'react';
import { GameConfig, GameProgressState, PlantStage, GameBadge } from '../types/game.types.ts';
import { fetchGameProgress, saveGameProgress } from '../services/gameService.ts';
import { submitQuizAttempt } from '../../../services/lessonService.ts';

export interface GameProgressHook {
  state: GameProgressState;
  loading: boolean;
  activeBadgeCelebration: GameBadge | null;
  completeLevel: (levelNum: number, earnedXp: number, targetStage: PlantStage) => void;
  jumpToLevel: (levelNum: number) => void;
  awardBadge: (badgeId: string) => void;
  dismissBadgeCelebration: () => void;
  finishGame: (finalScorePercent: number) => Promise<void>;
  resetProgress: () => void;
}

export function useGameProgress(config: GameConfig, studentId?: string): GameProgressHook {
  const [loading, setLoading] = useState<boolean>(true);
  const [activeBadgeCelebration, setActiveBadgeCelebration] = useState<GameBadge | null>(null);

  // Attempt UUID generated upfront for zero-trust idempotency
  const attemptUUIDRef = useRef<string>(crypto.randomUUID());

  const [state, setState] = useState<GameProgressState>({
    lessonId: config.topicKey,
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
  });

  // Load progress on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const loaded = await fetchGameProgress(config.topicKey, studentId);
        if (mounted) {
          setState(loaded);
        }
      } catch (err) {
        console.error('[useGameProgress] Failed to load progress:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [config.topicKey, studentId]);

  // Check and trigger badge celebration
  const awardBadge = useCallback((badgeId: string) => {
    setState((prev) => {
      if (prev.badges.includes(badgeId)) return prev;

      const badgeObj = config.badges.find((b) => b.id === badgeId);
      if (badgeObj) {
        setActiveBadgeCelebration(badgeObj);
      }

      const updatedBadges = [...prev.badges, badgeId];
      const nextState = { ...prev, badges: updatedBadges };

      saveGameProgress(
        nextState,
        studentId,
        badgeObj ? [{ id: badgeObj.id, name: badgeObj.name, nameOdia: badgeObj.nameOdia }] : []
      );

      return nextState;
    });
  }, [config.badges, studentId]);

  // Complete a level
  const completeLevel = useCallback((levelNum: number, earnedXp: number, targetStage: PlantStage) => {
    setState((prev) => {
      const nextCompletedLevels = Array.from(new Set([...prev.completedLevels, levelNum]));
      const nextMaxUnlocked = Math.min(5, Math.max(prev.maxUnlockedLevel, levelNum + 1));
      const nextCurrentLevel = Math.min(5, levelNum + 1);
      const nextXp = prev.xp + earnedXp;

      const nextState: GameProgressState = {
        ...prev,
        completedLevels: nextCompletedLevels,
        maxUnlockedLevel: nextMaxUnlocked,
        currentLevel: nextCurrentLevel,
        xp: nextXp,
        plantStage: targetStage,
        mistakesInCurrentLevel: 0,
        correctInCurrentLevel: 0,
      };

      // Check level-based badge unlocks
      const levelBadges = config.badges.filter((b) => b.unlockedAtLevel === levelNum);
      levelBadges.forEach((b) => {
        if (!prev.badges.includes(b.id)) {
          setActiveBadgeCelebration(b);
          nextState.badges = Array.from(new Set([...nextState.badges, b.id]));
        }
      });

      saveGameProgress(
        nextState,
        studentId,
        levelBadges.map((b) => ({ id: b.id, name: b.name, nameOdia: b.nameOdia }))
      );

      return nextState;
    });
  }, [config.badges, studentId]);

  const jumpToLevel = useCallback((levelNum: number) => {
    setState((prev) => {
      if (levelNum <= prev.maxUnlockedLevel) {
        const nextState = { ...prev, currentLevel: levelNum };
        saveGameProgress(nextState, studentId);
        return nextState;
      }
      return prev;
    });
  }, [studentId]);

  const dismissBadgeCelebration = useCallback(() => {
    setActiveBadgeCelebration(null);
  }, []);

  const finishGame = useCallback(async (finalScorePercent: number) => {
    setState((prev) => {
      const nextBadges = [...prev.badges];
      const newlyAwardedBadges: Array<{ id: string; name: string; nameOdia: string }> = [];

      // Check score threshold badges
      config.badges.forEach((b) => {
        if (b.scoreThreshold && finalScorePercent >= b.scoreThreshold && !nextBadges.includes(b.id)) {
          nextBadges.push(b.id);
          newlyAwardedBadges.push({ id: b.id, name: b.name, nameOdia: b.nameOdia });
          setActiveBadgeCelebration(b);
        }
      });

      const nextState: GameProgressState = {
        ...prev,
        completed: true,
        plantStage: 'fully-grown',
        score: finalScorePercent,
        badges: nextBadges,
      };

      saveGameProgress(nextState, studentId, newlyAwardedBadges);
      return nextState;
    });

    // Submit attempt to idempotent sync queue
    if (studentId) {
      try {
        await submitQuizAttempt({
          attemptUUID: attemptUUIDRef.current,
          studentId,
          lessonId: config.topicKey,
          answers: [
            { question_id: 'q_photosynthesis_game', selected_option: 0 }
          ],
          clientSubmittedScore: finalScorePercent,
          totalQuestions: 5,
          correctAnswers: Math.round((finalScorePercent / 100) * 5),
        });
      } catch (err) {
        console.warn('[useGameProgress] Attempt queued offline:', err);
      }
    }
  }, [config.badges, config.topicKey, studentId]);

  const resetProgress = useCallback(() => {
    attemptUUIDRef.current = crypto.randomUUID();
    const freshState: GameProgressState = {
      lessonId: config.topicKey,
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
    setState(freshState);
    saveGameProgress(freshState, studentId);
  }, [config.topicKey, studentId]);

  return {
    state,
    loading,
    activeBadgeCelebration,
    completeLevel,
    jumpToLevel,
    awardBadge,
    dismissBadgeCelebration,
    finishGame,
    resetProgress,
  };
}
