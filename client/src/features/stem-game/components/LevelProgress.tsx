import React from 'react';
import { Check, Lock } from 'lucide-react';
import { GameLevelConfig } from '../types/game.types.ts';

interface LevelProgressProps {
  levels: GameLevelConfig[];
  currentLevel: number;
  maxUnlockedLevel: number;
  completedLevels: number[];
  language: 'or' | 'en';
  onSelectLevel: (levelNum: number) => void;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({
  levels,
  currentLevel,
  maxUnlockedLevel,
  completedLevels,
  language,
  onSelectLevel,
}) => {
  const isOdia = language === 'or';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        padding: '0.75rem 0.5rem',
        marginBottom: '1.25rem',
        background: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        overflowX: 'auto',
      }}
    >
      {/* Connecting Track Line */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '5%',
          right: '5%',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.1)',
          transform: 'translateY(-50%)',
          zIndex: 0,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${((Math.max(1, maxUnlockedLevel) - 1) / (levels.length - 1)) * 100}%`,
            background: 'linear-gradient(90deg, #10b981 0%, #3b82f6 100%)',
            transition: 'width 0.4s ease',
          }}
        />
      </div>

      {/* 5 Step Nodes */}
      {levels.map((lvl) => {
        const isCompleted = completedLevels.includes(lvl.levelNumber);
        const isCurrent = currentLevel === lvl.levelNumber;
        const isUnlocked = lvl.levelNumber <= maxUnlockedLevel;

        let nodeBg = 'rgba(30, 41, 59, 0.9)';
        let nodeBorder = 'var(--border-subtle)';
        let nodeColor = 'var(--text-muted)';

        if (isCompleted) {
          nodeBg = 'rgba(16, 185, 129, 0.9)';
          nodeBorder = '#10b981';
          nodeColor = '#ffffff';
        } else if (isCurrent) {
          nodeBg = 'var(--primary)';
          nodeBorder = 'var(--primary-light)';
          nodeColor = '#ffffff';
        } else if (isUnlocked) {
          nodeBg = 'rgba(59, 130, 246, 0.2)';
          nodeBorder = '#3b82f6';
          nodeColor = '#93c5fd';
        }

        return (
          <button
            key={lvl.levelNumber}
            onClick={() => isUnlocked && onSelectLevel(lvl.levelNumber)}
            disabled={!isUnlocked}
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'transparent',
              border: 'none',
              cursor: isUnlocked ? 'pointer' : 'not-allowed',
              opacity: isUnlocked ? 1 : 0.45,
              padding: '0.2rem 0.4rem',
              transition: 'transform 0.2s',
            }}
          >
            {/* Circle Node */}
            <div
              style={{
                width: isCurrent ? '38px' : '32px',
                height: isCurrent ? '38px' : '32px',
                borderRadius: '50%',
                background: nodeBg,
                border: `2px solid ${nodeBorder}`,
                color: nodeColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem',
                boxShadow: isCurrent ? '0 0 16px var(--primary-glow)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {isCompleted ? (
                <Check size={16} strokeWidth={3} />
              ) : isUnlocked ? (
                lvl.levelNumber
              ) : (
                <Lock size={13} />
              )}
            </div>

            {/* Level Label */}
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: isCurrent ? 700 : 500,
                color: isCurrent ? 'var(--text-primary)' : isUnlocked ? 'var(--text-secondary)' : 'var(--text-muted)',
                marginTop: '4px',
                whiteSpace: 'nowrap',
              }}
            >
              {isOdia ? `L${lvl.levelNumber}` : `L${lvl.levelNumber}`}
            </span>
          </button>
        );
      })}
    </div>
  );
};
