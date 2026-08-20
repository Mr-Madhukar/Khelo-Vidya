import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameConfig, PlantStage } from './types/game.types.ts';
import { useGameProgress } from './hooks/useGameProgress.ts';
import { useAdaptiveDifficulty } from './hooks/useAdaptiveDifficulty.ts';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { useAuth } from '../../context/AuthContext.tsx';

import { GameHeader } from './components/GameHeader.tsx';
import { PlantStageVisual } from './components/PlantStage.tsx';
import { LevelProgress } from './components/LevelProgress.tsx';
import { ResourceChallenge } from './components/ResourceChallenge.tsx';
import { DragDropChallenge } from './components/DragDropChallenge.tsx';
import { ScenarioChallenge } from './components/ScenarioChallenge.tsx';
import { FinalQuiz } from './components/FinalQuiz.tsx';
import { HintModal } from './components/HintModal.tsx';
import { BadgeUnlockModal } from './components/BadgeUnlockModal.tsx';
import { GameResult } from './components/GameResult.tsx';

interface STEMGameEngineProps {
  config: GameConfig;
  lessonIdToReturn?: string;
}

export const STEMGameEngine: React.FC<STEMGameEngineProps> = ({
  config,
  lessonIdToReturn,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language, setLanguage } = useLanguage();

  const {
    state,
    loading,
    activeBadgeCelebration,
    completeLevel,
    jumpToLevel,
    dismissBadgeCelebration,
    finishGame,
    resetProgress,
  } = useGameProgress(config, user?.id);

  const {
    difficulty,
    shouldOfferHint,
    hintExplanation,
    hintExplanationOdia,
    recordSuccess,
    recordMistake,
    dismissHint,
  } = useAdaptiveDifficulty(state.difficulty);

  const [activeHintOverride, setActiveHintOverride] = useState<{ text: string; textOdia?: string } | null>(null);

  // Active interaction indicators for plant canvas
  const [isWaterActive, setIsWaterActive] = useState<boolean>(false);
  const [isCO2Active, setIsCO2Active] = useState<boolean>(false);
  const [isPhotosynthesizing, setIsPhotosynthesizing] = useState<boolean>(false);

  const handleToggleLanguage = () => {
    setLanguage(language === 'or' ? 'en' : 'or');
  };

  const handleExit = () => {
    if (lessonIdToReturn) {
      navigate(`/lessons/${lessonIdToReturn}`);
    } else {
      navigate('/lessons');
    }
  };

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {language === 'or' ? 'ଗେମ୍ ଇଞ୍ଜିନ୍ ଲୋଡ୍ ହେଉଛି...' : 'Loading STEM Game Adventure...'}
        </div>
      </div>
    );
  }

  // If entire game is completed and at final result state
  if (state.completed) {
    return (
      <div className="page-container" style={{ maxWidth: '840px', margin: '0 auto', paddingTop: '1rem' }}>
        <GameHeader
          title={config.title}
          titleOdia={config.titleOdia}
          currentLevel={5}
          totalLevels={5}
          xp={state.xp}
          difficulty={difficulty}
          language={language}
          onToggleLanguage={handleToggleLanguage}
          onExit={handleExit}
        />
        <GameResult
          config={config}
          state={state}
          language={language}
          onRestart={resetProgress}
        />
        {activeBadgeCelebration && (
          <BadgeUnlockModal
            badge={activeBadgeCelebration}
            language={language}
            onClose={dismissBadgeCelebration}
          />
        )}
      </div>
    );
  }

  const currentLevelConfig = config.levels.find((l) => l.levelNumber === state.currentLevel) || config.levels[0];

  return (
    <div className="page-container" style={{ maxWidth: '840px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Game Header with Level & XP */}
      <GameHeader
        title={config.title}
        titleOdia={config.titleOdia}
        currentLevel={state.currentLevel}
        totalLevels={config.levels.length}
        xp={state.xp}
        difficulty={difficulty}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onExit={handleExit}
        onOpenHint={() => {
          if (hintExplanation) {
            setActiveHintOverride({ text: hintExplanation, textOdia: hintExplanationOdia || undefined });
          }
        }}
        canHint={Boolean(hintExplanation)}
      />

      {/* Level Roadmap */}
      <LevelProgress
        levels={config.levels}
        currentLevel={state.currentLevel}
        maxUnlockedLevel={state.maxUnlockedLevel}
        completedLevels={state.completedLevels}
        language={language}
        onSelectLevel={jumpToLevel}
      />

      {/* Visual Plant Growth Stage Container */}
      <div style={{ marginBottom: '1.5rem' }}>
        <PlantStageVisual
          stage={state.plantStage}
          healthPercent={Math.min(100, Math.max(20, state.currentLevel * 20))}
          language={language}
          isSunlightActive={true}
          isWaterActive={isWaterActive}
          isCO2Active={isCO2Active}
          isPhotosynthesizing={isPhotosynthesizing || state.currentLevel >= 3}
        />
      </div>

      {/* LEVEL 1: Resource Selection Challenge */}
      {currentLevelConfig.type === 'resource_selection' && currentLevelConfig.resourceChallenge && (
        <ResourceChallenge
          instruction={currentLevelConfig.resourceChallenge.instruction}
          instructionOdia={currentLevelConfig.resourceChallenge.instructionOdia}
          items={currentLevelConfig.resourceChallenge.items}
          requiredCount={currentLevelConfig.resourceChallenge.requiredCount}
          language={language}
          onItemSelect={(item) => {
            if (item.id === 'water') setIsWaterActive(true);
            if (item.id === 'co2') setIsCO2Active(true);
            if (item.id === 'sunlight' || item.id === 'chlorophyll') setIsPhotosynthesizing(true);
          }}
          onComplete={(earnedXp) => {
            completeLevel(1, earnedXp, 'small');
          }}
        />
      )}

      {/* LEVEL 2: Process Builder / Drag & Drop Challenge */}
      {currentLevelConfig.type === 'process_builder' && currentLevelConfig.processChallenge && (
        <DragDropChallenge
          instruction={currentLevelConfig.processChallenge.instruction}
          instructionOdia={currentLevelConfig.processChallenge.instructionOdia}
          slots={currentLevelConfig.processChallenge.slots}
          availableItems={currentLevelConfig.processChallenge.availableItems}
          language={language}
          onItemPlaced={() => {
            setIsPhotosynthesizing(true);
          }}
          onComplete={(earnedXp) => {
            completeLevel(2, earnedXp, 'growing');
          }}
        />
      )}

      {/* LEVEL 3 & LEVEL 4: Scenario-Based Challenges */}
      {(currentLevelConfig.type === 'scenario' || currentLevelConfig.type === 'real_world_problem') &&
        currentLevelConfig.scenarioChallenge && (
          <ScenarioChallenge
            scenarios={currentLevelConfig.scenarioChallenge.scenarios}
            language={language}
            levelXp={currentLevelConfig.xpReward}
            onAnswerFeedback={(isCorrect, hint, hintOdia) => {
              if (isCorrect) {
                recordSuccess(10);
              } else {
                recordMistake(hint, hintOdia);
              }
            }}
            onComplete={(earnedXp) => {
              const targetStage: PlantStage = currentLevelConfig.levelNumber === 3 ? 'healthy' : 'healthy';
              completeLevel(currentLevelConfig.levelNumber, earnedXp, targetStage);
            }}
          />
        )}

      {/* LEVEL 5: Final Challenge Quiz */}
      {currentLevelConfig.type === 'final_quiz' && currentLevelConfig.quizChallenge && (
        <FinalQuiz
          questions={currentLevelConfig.quizChallenge.questions}
          language={language}
          levelXp={currentLevelConfig.xpReward}
          onAnswerFeedback={(isCorrect, hint, hintOdia) => {
            if (isCorrect) {
              recordSuccess(10);
            } else {
              recordMistake(hint, hintOdia);
            }
          }}
          onComplete={(finalScorePercent) => {
            finishGame(finalScorePercent);
          }}
        />
      )}

      {/* Supportive Hint Modal */}
      {(shouldOfferHint || activeHintOverride) && (
        <HintModal
          hintText={activeHintOverride?.text || hintExplanation || 'Think about what natural resources give energy to plants.'}
          hintTextOdia={activeHintOverride?.textOdia || hintExplanationOdia}
          language={language}
          onClose={() => {
            dismissHint();
            setActiveHintOverride(null);
          }}
        />
      )}

      {/* Badge Unlock Celebration Modal */}
      {activeBadgeCelebration && (
        <BadgeUnlockModal
          badge={activeBadgeCelebration}
          language={language}
          onClose={dismissBadgeCelebration}
        />
      )}
    </div>
  );
};
