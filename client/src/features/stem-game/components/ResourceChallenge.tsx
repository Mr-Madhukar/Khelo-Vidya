import React, { useState } from 'react';
import { ResourceItem } from '../types/game.types.ts';
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface ResourceChallengeProps {
  instruction: string;
  instructionOdia: string;
  items: ResourceItem[];
  requiredCount: number;
  language: 'or' | 'en';
  onComplete: (earnedXp: number) => void;
  onItemSelect: (item: ResourceItem) => void;
}

export const ResourceChallenge: React.FC<ResourceChallengeProps> = ({
  instruction,
  instructionOdia,
  items,
  requiredCount,
  language,
  onComplete,
  onItemSelect,
}) => {
  const isOdia = language === 'or';
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{
    text: string;
    isError: boolean;
    itemName: string;
  } | null>(null);

  const [isDone, setIsDone] = useState<boolean>(false);

  const handleItemClick = (item: ResourceItem) => {
    onItemSelect(item);

    if (item.isEssential) {
      if (!selectedIds.includes(item.id)) {
        const nextSelected = [...selectedIds, item.id];
        setSelectedIds(nextSelected);

        setFeedback({
          text: isOdia ? item.feedbackCorrectOdia : item.feedbackCorrect,
          isError: false,
          itemName: isOdia ? item.nameOdia : item.name,
        });

        if (nextSelected.length >= requiredCount) {
          setIsDone(true);
        }
      }
    } else {
      // Incorrect item chosen: provide friendly educational explanation
      setFeedback({
        text: isOdia ? item.feedbackIncorrectOdia : item.feedbackIncorrect,
        isError: true,
        itemName: isOdia ? item.nameOdia : item.name,
      });
    }
  };

  const handleReset = () => {
    setSelectedIds([]);
    setFeedback(null);
    setIsDone(false);
  };

  const handleProceed = () => {
    onComplete(20);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Instruction Banner */}
      <div
        className="glass-card"
        style={{
          padding: '1.25rem 1.5rem',
          marginBottom: '1.25rem',
          borderLeft: '4px solid var(--primary-light)',
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {isOdia ? 'ପ୍ରାକୃତିକ ଉପାଦାନ ନିର୍ବାଚନ' : 'Select Essential Inputs'}
          </h3>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#34d399',
            }}
          >
            {selectedIds.length} / {requiredCount} {isOdia ? 'ସଂଗୃହୀତ' : 'Collected'}
          </span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
          {isOdia ? instructionOdia : instruction}
        </p>
      </div>

      {/* Grid of Resource Options */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.75rem',
          marginBottom: '1.5rem',
        }}
      >
        {items.map((item) => {
          const isSelected = selectedIds.includes(item.id);

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(30, 41, 59, 0.9) 100%)'
                  : 'rgba(255, 255, 255, 0.04)',
                border: isSelected ? '2px solid #10b981' : '1px solid var(--border-subtle)',
                color: isSelected ? '#ffffff' : 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                position: 'relative',
                minHeight: '110px',
                boxShadow: isSelected ? '0 0 16px rgba(16, 185, 129, 0.3)' : 'none',
              }}
            >
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#10b981',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckCircle2 size={14} />
                </div>
              )}

              <span style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>{item.icon}</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, textAlign: 'center', lineHeight: 1.3 }}>
                {isOdia ? item.nameOdia : item.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Live Educational Feedback Toast/Box */}
      {feedback && (
        <div
          className="glass-card"
          style={{
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            background: feedback.isError
              ? 'rgba(239, 68, 68, 0.15)'
              : 'rgba(16, 185, 129, 0.15)',
            border: feedback.isError ? '1px solid #ef4444' : '1px solid #10b981',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
          }}
        >
          {feedback.isError ? (
            <AlertCircle size={22} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
          ) : (
            <CheckCircle2 size={22} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
          )}

          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: feedback.isError ? '#f87171' : '#34d399', marginBottom: '0.2rem' }}>
              {feedback.itemName} {feedback.isError ? (isOdia ? '❌ ଅନାବଶ୍ୟକ' : '❌ Not Required') : (isOdia ? '✅ ସଠିକ୍ ପ୍ରୟୋଗ' : '✅ Essential Resource (+5 XP)')}
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {feedback.text}
            </p>
          </div>
        </div>
      )}

      {/* Level Completion CTA */}
      {isDone && (
        <div
          className="glass-card"
          style={{
            padding: '1.5rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(30, 58, 138, 0.4) 100%)',
            border: '1px solid #10b981',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <Sparkles size={32} color="#f59e0b" style={{ margin: '0 auto 0.5rem' }} />
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>
            {isOdia ? '🎉 ଚମତ୍କାର! ଗଛଟିକୁ ସମସ୍ତ ଉପାଦାନ ମିଳିଗଲା!' : '🎉 Great Job! The Seed Has Sprouted!'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            {isOdia
              ? 'ଆପଣ ସମସ୍ତ ୪ଟି ଆବଶ୍ୟକୀୟ ଉପାଦାନ ପ୍ରଦାନ କଲେ। +୨୦ XP ଅର୍ଜିତ!'
              : 'You provided Sunlight, Water, CO2 and Chlorophyll. +20 XP Awarded! Next, arrange the process in Level 2.'}
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleReset} className="btn btn-secondary" style={{ minHeight: '44px' }}>
              <RotateCcw size={16} />
              <span>{isOdia ? 'ପୁନର୍ବାର କରନ୍ତୁ' : 'Try Again'}</span>
            </button>

            <button
              onClick={handleProceed}
              className="btn btn-primary"
              style={{ minHeight: '44px', padding: '0.6rem 1.75rem', fontWeight: 700 }}
            >
              <span>{isOdia ? 'ପରବର୍ତ୍ତୀ ପର୍ଯ୍ୟାୟ (Level 2)' : 'Next Level: Build Process'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
