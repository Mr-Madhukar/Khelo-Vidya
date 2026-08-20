import React from 'react';
import { ArrowLeft, Sparkles, Globe, Zap, HelpCircle } from 'lucide-react';
import { Difficulty } from '../types/game.types.ts';

interface GameHeaderProps {
  title: string;
  titleOdia: string;
  currentLevel: number;
  totalLevels: number;
  xp: number;
  difficulty: Difficulty;
  language: 'or' | 'en';
  onToggleLanguage: () => void;
  onExit: () => void;
  onOpenHint?: () => void;
  canHint?: boolean;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  title,
  titleOdia,
  currentLevel,
  totalLevels,
  xp,
  difficulty,
  language,
  onToggleLanguage,
  onExit,
  onOpenHint,
  canHint = false,
}) => {
  const isOdia = language === 'or';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '1rem',
        padding: '0.65rem 1rem',
        background: 'var(--bg-card)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-card)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Left: Exit & Level Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <button
          onClick={onExit}
          className="btn btn-secondary"
          style={{ minHeight: '34px', padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
          title={isOdia ? 'ବାହାରକୁ ଯାଆନ୍ତୁ' : 'Exit to lesson'}
        >
          <ArrowLeft size={15} />
          <span>{isOdia ? 'ପାଠ୍ୟ' : 'Lesson'}</span>
        </button>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'var(--accent-orange-soft)',
            color: 'var(--accent-orange-dark)',
            border: '1px solid var(--border-accent)',
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: 700,
          }}
        >
          <Zap size={13} color="var(--accent-orange)" />
          <span>
            {isOdia ? `ପର୍ଯ୍ୟାୟ ${currentLevel} / ${totalLevels}` : `Level ${currentLevel} of ${totalLevels}`}
          </span>
        </div>
      </div>

      {/* Center: Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }} className="font-odia">
          {isOdia ? titleOdia : title}
        </span>
      </div>

      {/* Right: XP, Difficulty, Hint & Language */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* XP Counter */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            background: 'var(--accent-orange-soft)',
            border: '1px solid var(--border-accent)',
            color: 'var(--accent-orange-dark)',
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.82rem',
            fontWeight: 800,
          }}
        >
          <Sparkles size={14} color="var(--accent-orange)" />
          <span>{xp} XP</span>
        </div>

        {/* Adaptive Difficulty Tag */}
        <div
          style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            padding: '0.2rem 0.5rem',
            borderRadius: 'var(--radius-full)',
            background:
              difficulty === 'easy'
                ? 'var(--accent-green-soft)'
                : difficulty === 'hard'
                ? 'var(--danger-bg)'
                : 'var(--accent-orange-soft)',
            color:
              difficulty === 'easy'
                ? 'var(--accent-green)'
                : difficulty === 'hard'
                ? 'var(--danger)'
                : 'var(--accent-orange)',
          }}
        >
          {difficulty}
        </div>

        {/* Hint Button if Available */}
        {canHint && onOpenHint && (
          <button
            onClick={onOpenHint}
            className="btn btn-secondary"
            style={{
              minHeight: '32px',
              padding: '0.2rem 0.55rem',
              fontSize: '0.75rem',
              color: 'var(--accent-orange)',
              borderColor: 'var(--border-accent)',
              background: 'var(--accent-orange-soft)',
              fontWeight: 700,
            }}
          >
            <HelpCircle size={14} />
            <span>{isOdia ? 'ସହାୟତା' : 'Hint'}</span>
          </button>
        )}

        {/* Bilingual Toggle */}
        <button
          onClick={onToggleLanguage}
          className="btn btn-secondary"
          style={{ minHeight: '32px', padding: '0.2rem 0.6rem', fontSize: '0.78rem' }}
          title="Switch Language"
        >
          <Globe size={13} />
          <span>{language === 'or' ? 'English' : 'ଓଡ଼ିଆ'}</span>
        </button>
      </div>
    </div>
  );
};
