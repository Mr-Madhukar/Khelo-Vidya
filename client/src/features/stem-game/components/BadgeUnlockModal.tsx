import React from 'react';
import { GameBadge } from '../types/game.types.ts';
import { Sparkles, X, Award } from 'lucide-react';

interface BadgeUnlockModalProps {
  badge: GameBadge;
  language: 'or' | 'en';
  onClose: () => void;
}

export const BadgeUnlockModal: React.FC<BadgeUnlockModalProps> = ({
  badge,
  language,
  onClose,
}) => {
  const isOdia = language === 'or';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '1rem',
      }}
    >
      <div
        className="glass-card animate-scale-up"
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '2.25rem 1.75rem',
          border: '2px solid var(--accent-orange)',
          background: 'var(--bg-card)',
          boxShadow: 'var(--shadow-lg), 0 0 30px var(--accent-orange-glow)',
          borderRadius: 'var(--radius-xl)',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        {/* Floating Badge Icon */}
        <div
          style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            background: 'var(--accent-orange-soft)',
            border: '2px solid var(--accent-orange)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            margin: '0 auto 1.25rem',
            boxShadow: '0 0 20px var(--accent-orange-glow)',
          }}
        >
          {badge.icon}
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--accent-orange-soft)',
            color: 'var(--accent-orange-dark)',
            fontSize: '0.8rem',
            fontWeight: 800,
            marginBottom: '0.6rem',
            border: '1px solid var(--border-accent)',
          }}
        >
          <Sparkles size={14} color="var(--accent-orange)" />
          <span>{isOdia ? 'ନୂତନ ବ୍ୟାଜ୍ ଅର୍ଜିତ!' : 'NEW BADGE UNLOCKED!'}</span>
        </div>

        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }} className="font-odia">
          {isOdia ? badge.nameOdia : badge.name}
        </h3>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.75rem' }} className="font-odia">
          {isOdia ? badge.descriptionOdia : badge.description}
        </p>

        <button
          onClick={onClose}
          className="btn btn-primary"
          style={{ width: '100%', minHeight: '48px', fontWeight: 800, fontSize: '1rem' }}
        >
          <Award size={18} />
          <span>{isOdia ? 'ସଂଗ୍ରହ କରନ୍ତୁ (Collect Badge)' : 'Collect Badge & Continue'}</span>
        </button>
      </div>
    </div>
  );
};
