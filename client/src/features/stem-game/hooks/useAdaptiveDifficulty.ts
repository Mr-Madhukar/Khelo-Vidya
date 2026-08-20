import { useState, useCallback } from 'react';
import { Difficulty } from '../types/game.types.ts';

export interface AdaptiveDifficultyHook {
  difficulty: Difficulty;
  consecutiveCorrect: number;
  consecutiveMistakes: number;
  shouldOfferHint: boolean;
  hintExplanation: string | null;
  hintExplanationOdia: string | null;
  recordSuccess: (bonusPoints?: number) => void;
  recordMistake: (hintText?: string, hintTextOdia?: string) => void;
  dismissHint: () => void;
  setDifficultyDirect: (diff: Difficulty) => void;
}

export function useAdaptiveDifficulty(initialDifficulty: Difficulty = 'medium'): AdaptiveDifficultyHook {
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState<number>(0);
  const [consecutiveMistakes, setConsecutiveMistakes] = useState<number>(0);
  const [shouldOfferHint, setShouldOfferHint] = useState<boolean>(false);
  const [hintExplanation, setHintExplanation] = useState<string | null>(null);
  const [hintExplanationOdia, setHintExplanationOdia] = useState<string | null>(null);

  const recordSuccess = useCallback((_bonusPoints?: number) => {
    setConsecutiveMistakes(0);
    setConsecutiveCorrect((prev) => {
      const next = prev + 1;
      // Rule: 3 consecutive correct at easy -> promote to medium; at medium -> promote to hard
      if (next >= 3) {
        if (difficulty === 'easy') {
          setDifficulty('medium');
        } else if (difficulty === 'medium') {
          setDifficulty('hard');
        }
      }
      return next;
    });
    setShouldOfferHint(false);
  }, [difficulty]);

  const recordMistake = useCallback((hintText?: string, hintTextOdia?: string) => {
    setConsecutiveCorrect(0);
    setConsecutiveMistakes((prev) => {
      const next = prev + 1;
      // Rule: 2 mistakes -> offer hint immediately; drop difficulty if on hard/medium
      if (next >= 2) {
        setShouldOfferHint(true);
        if (hintText) setHintExplanation(hintText);
        if (hintTextOdia) setHintExplanationOdia(hintTextOdia);

        if (difficulty === 'hard') {
          setDifficulty('medium');
        } else if (difficulty === 'medium' && next >= 3) {
          setDifficulty('easy');
        }
      }
      return next;
    });
  }, [difficulty]);

  const dismissHint = useCallback(() => {
    setShouldOfferHint(false);
  }, []);

  const setDifficultyDirect = useCallback((diff: Difficulty) => {
    setDifficulty(diff);
  }, []);

  return {
    difficulty,
    consecutiveCorrect,
    consecutiveMistakes,
    shouldOfferHint,
    hintExplanation,
    hintExplanationOdia,
    recordSuccess,
    recordMistake,
    dismissHint,
    setDifficultyDirect,
  };
}
