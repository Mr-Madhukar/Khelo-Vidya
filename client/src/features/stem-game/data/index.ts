import { GameConfig } from '../types/game.types.ts';
import { PHOTOSYNTHESIS_GAME_DATA } from './photosynthesisData.ts';

export const STEM_GAMES_REGISTRY: Record<string, GameConfig> = {
  photosynthesis: PHOTOSYNTHESIS_GAME_DATA,
};

export function getGameConfig(topicKey: string): GameConfig | null {
  return STEM_GAMES_REGISTRY[topicKey] || null;
}

export { PHOTOSYNTHESIS_GAME_DATA };
