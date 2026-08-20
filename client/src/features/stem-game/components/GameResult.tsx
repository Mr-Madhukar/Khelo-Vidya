import React from 'react';
import { GameConfig, GameProgressState } from '../types/game.types.ts';
import { Award, RotateCcw, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GameResultProps {
  config: GameConfig;
  state: GameProgressState;
  language: 'or' | 'en';
  onRestart: () => void;
}

export const GameResult: React.FC<GameResultProps> = ({
  config,
  state,
  language,
  onRestart,
}) => {
  const isOdia = language === 'or';
  const navigate = useNavigate();

  const scorePercent = state.score || 85;
  const starsCount = scorePercent >= 90 ? 5 : scorePercent >= 75 ? 4 : scorePercent >= 60 ? 3 : 2;

  const earnedBadgeObjs = config.badges.filter((b) => state.badges.includes(b.id));

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Hero Victory Card */}
      <div
        className="glass-card"
        style={{
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.45) 0%, rgba(15, 23, 42, 0.98) 100%)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            width: '74px',
            height: '74px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, rgba(217, 119, 6, 0.1) 100%)',
            border: '2px solid var(--accent-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.6rem',
            margin: '0 auto 1rem',
            boxShadow: '0 0 30px var(--accent-gold-glow)',
          }}
        >
          🌳
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.3rem', marginBottom: '0.75rem' }}>
          {Array.from({ length: 5 }).map((_, sIdx) => (
            <span
              key={sIdx}
              style={{
                fontSize: '1.6rem',
                color: sIdx < starsCount ? '#fbbf24' : '#475569',
                filter: sIdx < starsCount ? 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))' : 'none',
              }}
            >
              ★
            </span>
          ))}
        </div>

        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
          {isOdia ? 'ଅଭିନନ୍ଦନ! ଆପଣ ଗଛଟିକୁ ବଞ୍ଚାଇ ପାରିଲେ! 🎉' : 'Congratulations! You Saved the Plant! 🎉'}
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
          {isOdia
            ? 'ଆପଣ ଆଲୋକସଂଶ୍ଳେଷଣର ସମସ୍ତ ୫ଟି ପର୍ଯ୍ୟାୟ ସଫଳତାର ସହ ଶେଷ କରି ନିଜର ଦକ୍ଷତା ପ୍ରମାଣ କଲେ।'
            : 'You successfully completed all 5 interactive levels of Photosynthesis and nurtured the seedling into a healthy tree!'}
        </p>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1.75rem',
          }}
        >
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{isOdia ? 'ସ୍କୋର' : 'Accuracy'}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: scorePercent >= 75 ? '#34d399' : '#fbbf24' }}>
              {scorePercent}%
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{isOdia ? 'ମୋଟ XP' : 'Total XP'}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24' }}>
              +{state.xp} ⭐
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{isOdia ? 'ବ୍ୟାଜ୍ ଅର୍ଜିତ' : 'Badges'}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#60a5fa' }}>
              {earnedBadgeObjs.length}
            </div>
          </div>
        </div>

        {/* Badges Showcase */}
        {earnedBadgeObjs.length > 0 && (
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              {isOdia ? '🏆 ଅର୍ଜିତ ବ୍ୟାଜ୍ ସମୂହ' : '🏆 Badges Earned'}
            </h3>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {earnedBadgeObjs.map((badge) => (
                <div
                  key={badge.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(245, 158, 11, 0.15)',
                    border: '1px solid var(--accent-gold)',
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>{badge.icon}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                    {isOdia ? badge.nameOdia : badge.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={onRestart} className="btn btn-secondary" style={{ flex: 1, minWidth: '150px' }}>
            <RotateCcw size={16} />
            <span>{isOdia ? 'ପୁଣି ଖେଳନ୍ତୁ' : 'Play Again'}</span>
          </button>

          <button onClick={() => navigate('/progress')} className="btn btn-primary" style={{ flex: 1, minWidth: '150px' }}>
            <Award size={16} />
            <span>{isOdia ? 'ମୋ ପ୍ରଗତି' : 'My Progress'}</span>
          </button>

          <button onClick={() => navigate('/lessons')} className="btn btn-secondary" style={{ flex: 1, minWidth: '150px' }}>
            <BookOpen size={16} />
            <span>{isOdia ? 'ପାଠ୍ୟକ୍ରମ' : 'All Lessons'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
