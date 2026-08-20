import React, { useState } from 'react';
import { ScenarioQuestion } from '../types/game.types.ts';
import { CheckCircle2, ArrowRight, Sparkles, HelpCircle, Check, MapPin } from 'lucide-react';

interface ScenarioChallengeProps {
  scenarios: ScenarioQuestion[];
  language: 'or' | 'en';
  levelXp: number;
  onComplete: (earnedXp: number) => void;
  onAnswerFeedback?: (isCorrect: boolean, hint?: string, hintOdia?: string) => void;
}

export const ScenarioChallenge: React.FC<ScenarioChallengeProps> = ({
  scenarios,
  language,
  levelXp,
  onComplete,
  onAnswerFeedback,
}) => {
  const isOdia = language === 'or';
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentScenario = scenarios[currentIndex];
  const isLastScenario = currentIndex === scenarios.length - 1;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentScenario.correctOption;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    if (onAnswerFeedback) {
      onAnswerFeedback(isCorrect, currentScenario.hint, currentScenario.hintOdia);
    }
  };

  const handleNext = () => {
    if (isLastScenario) {
      setIsFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const handleFinishLevel = () => {
    onComplete(levelXp);
  };

  if (isFinished) {
    const accuracy = Math.round((correctCount / scenarios.length) * 100);

    return (
      <div
        className="glass-card"
        style={{
          padding: '2rem 1.5rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(30, 58, 138, 0.45) 100%)',
          border: '1px solid #10b981',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <Sparkles size={36} color="#f59e0b" style={{ margin: '0 auto 0.5rem' }} />
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
          {isOdia ? '🎉 ଚ୍ୟାଲେଞ୍ଜ ସଫଳତାର ସହ ସମାପ୍ତ!' : '🎉 Scenario Challenge Completed!'}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
          {isOdia
            ? `ଆପଣ ${scenarios.length} ଟି ମଧ୍ୟରୁ ${correctCount} ଟି ସଠିକ୍ ଉତ୍ତର ଦେଲେ (${accuracy}%)। +${levelXp} XP ଅର୍ଜିତ!`
            : `You answered ${correctCount} of ${scenarios.length} correctly (${accuracy}%). +${levelXp} XP Earned!`}
        </p>

        <button
          onClick={handleFinishLevel}
          className="btn btn-primary"
          style={{ minHeight: '48px', padding: '0.6rem 2rem', fontWeight: 700 }}
        >
          <span>{isOdia ? 'ପରବର୍ତ୍ତୀ ପର୍ଯ୍ୟାୟକୁ ଯାଆନ୍ତୁ' : 'Continue to Next Stage'}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  const isCorrect = selectedOption === currentScenario.correctOption;

  return (
    <div style={{ width: '100%' }}>
      {/* Top Counter Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--primary-glow)',
            color: '#93c5fd',
            fontSize: '0.78rem',
            fontWeight: 700,
          }}
        >
          <MapPin size={12} />
          <span>{isOdia ? currentScenario.contextTagOdia : currentScenario.contextTag}</span>
        </div>

        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
          {isOdia
            ? `ପ୍ରଶ୍ନ ${currentIndex + 1} / ${scenarios.length}`
            : `Case ${currentIndex + 1} of ${scenarios.length}`}
        </span>
      </div>

      {/* Main Scenario Case Card */}
      <div
        className="glass-card"
        style={{
          padding: '1.5rem',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-accent)',
        }}
      >
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
          {isOdia ? currentScenario.titleOdia : currentScenario.title}
        </h3>

        {/* Environmental Factors Gauge Ribbon */}
        {currentScenario.factors && currentScenario.factors.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              marginBottom: '1rem',
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '0.6rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {currentScenario.factors.map((f, fIdx) => (
              <div
                key={fIdx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <span>{f.icon}</span>
                <span style={{ fontWeight: 600 }}>{isOdia ? f.nameOdia : f.name}:</span>
                <span
                  style={{
                    fontWeight: 700,
                    color:
                      f.status === 'high' || f.status === 'normal'
                        ? '#34d399'
                        : f.status === 'low'
                        ? '#fbbf24'
                        : '#f87171',
                  }}
                >
                  {isOdia ? f.statusLabelOdia : f.statusLabel}
                </span>
                {fIdx < currentScenario.factors.length - 1 && (
                  <span style={{ color: 'var(--border-subtle)', marginLeft: '0.3rem' }}>•</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Story Narrative */}
        <p style={{ color: 'var(--text-primary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          {isOdia ? currentScenario.storyOdia : currentScenario.story}
        </p>

        {/* Question Text */}
        <div
          style={{
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(37, 99, 235, 0.1)',
            borderLeft: '4px solid var(--primary)',
            color: 'var(--text-primary)',
            fontWeight: 700,
            fontSize: '0.95rem',
            marginBottom: '1.25rem',
          }}
        >
          {isOdia ? currentScenario.questionOdia : currentScenario.question}
        </div>

        {/* Options List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {(isOdia ? currentScenario.optionsOdia : currentScenario.options).map((opt, oIdx) => {
            const isSelected = selectedOption === oIdx;
            const isThisOptionCorrect = oIdx === currentScenario.correctOption;

            let bg = 'rgba(255, 255, 255, 0.04)';
            let border = '1px solid var(--border-subtle)';
            let textColor = 'var(--text-primary)';

            if (isAnswered) {
              if (isThisOptionCorrect) {
                bg = 'rgba(16, 185, 129, 0.2)';
                border = '2px solid #10b981';
                textColor = '#34d399';
              } else if (isSelected && !isCorrect) {
                bg = 'rgba(239, 68, 68, 0.2)';
                border = '2px solid #ef4444';
                textColor = '#f87171';
              }
            } else if (isSelected) {
              bg = 'rgba(37, 99, 235, 0.2)';
              border = '2px solid var(--primary-light)';
            }

            return (
              <button
                key={oIdx}
                type="button"
                onClick={() => handleSelectOption(oIdx)}
                disabled={isAnswered}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: bg,
                  border,
                  color: textColor,
                  fontSize: '0.9rem',
                  fontWeight: isSelected ? 700 : 500,
                  textAlign: 'left',
                  cursor: isAnswered ? 'default' : 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isThisOptionCorrect && isAnswered
                      ? '#10b981'
                      : isSelected && !isCorrect && isAnswered
                      ? '#ef4444'
                      : 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {String.fromCharCode(65 + oIdx)}
                </div>
                <span style={{ flex: 1 }}>{opt}</span>
                {isAnswered && isThisOptionCorrect && <Check size={16} color="#10b981" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Answer Explanation & Next Button */}
      {isAnswered && (
        <div
          className="glass-card"
          style={{
            padding: '1.25rem',
            marginBottom: '1.5rem',
            borderLeft: isCorrect ? '4px solid #10b981' : '4px solid #f59e0b',
            background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
            {isCorrect ? <CheckCircle2 size={18} color="#10b981" /> : <HelpCircle size={18} color="#f59e0b" />}
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: isCorrect ? '#34d399' : '#fbbf24' }}>
              {isCorrect ? (isOdia ? '✅ ସଠିକ୍ ଉତ୍ତର! (+୧୦ XP)' : '✅ Correct! (+10 XP)') : (isOdia ? '💡 ବୈଜ୍ଞାନିକ କାରଣ ବୁଝନ୍ତୁ:' : '💡 Scientific Explanation:')}
            </span>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '1rem' }}>
            {isOdia ? currentScenario.explanationOdia : currentScenario.explanation}
          </p>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleNext} className="btn btn-primary" style={{ minHeight: '42px', padding: '0.5rem 1.5rem' }}>
              <span>{isLastScenario ? (isOdia ? 'ଫଳାଫଳ ଦେଖନ୍ତୁ' : 'Complete Challenge') : (isOdia ? 'ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ' : 'Next Question')}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
