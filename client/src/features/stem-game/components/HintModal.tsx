import React from 'react';
import { Lightbulb, X } from 'lucide-react';

interface HintModalProps {
  hintText: string;
  hintTextOdia?: string | null;
  language: 'or' | 'en';
  onClose: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({
  hintText,
  hintTextOdia,
  language,
  onClose,
}) => {
  const isOdia = language === 'or';
  const text = isOdia && hintTextOdia ? hintTextOdia : hintText;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem',
      }}
    >
      <div
        className="glass-card animate-scale-up"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '1.75rem',
          border: '1px solid var(--border-accent)',
          background: 'var(--bg-card)',
          boxShadow: 'var(--shadow-lg), 0 0 25px var(--accent-orange-glow)',
          borderRadius: 'var(--radius-xl)',
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

        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'var(--accent-orange-soft)',
            color: 'var(--accent-orange)',
            border: '1px solid var(--border-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
          }}
        >
          <Lightbulb size={28} />
        </div>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, textAlign: 'center', color: 'var(--text-primary)', marginBottom: '0.5rem' }} className="font-odia">
          {isOdia ? '💡 ଶିକ୍ଷଣ ସହାୟକ ଟିପ୍ସ (Hint)' : '💡 Learning Hint'}
        </h3>

        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            color: 'var(--text-primary)',
            fontSize: '0.92rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}
          className="font-odia"
        >
          {text}
        </div>

        <button
          onClick={onClose}
          className="btn btn-primary"
          style={{ width: '100%', minHeight: '46px', fontWeight: 700 }}
        >
          <span>{isOdia ? 'ମୁଁ ବୁଝିଲି (Got It!)' : 'Got It! Let Me Try'}</span>
        </button>
      </div>
    </div>
  );
};
