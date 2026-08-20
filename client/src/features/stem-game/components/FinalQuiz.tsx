import React, { useState } from 'react';
import { QuizQuestion } from '../types/game.types.ts';
import { CheckCircle2, ArrowRight, Sparkles, HelpCircle, Check, Award } from 'lucide-react';

interface FinalQuizProps {
  questions: QuizQuestion[];
  language: 'or' | 'en';
  levelXp: number;
  onComplete: (finalScorePercent: number, earnedXp: number) => void;
  onAnswerFeedback?: (isCorrect: boolean, hint?: string, hintOdia?: string) => void;
}

export const FinalQuiz: React.FC<FinalQuizProps> = ({
  questions,
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

  const currentQ = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctOption;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    if (onAnswerFeedback) {
      onAnswerFeedback(isCorrect, currentQ.hint, currentQ.hintOdia);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setIsFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const handleFinish = () => {
    const finalPercent = Math.round((correctCount / questions.length) * 100);
    onComplete(finalPercent, levelXp);
  };

  if (isFinished) {
    const finalPercent = Math.round((correctCount / questions.length) * 100);

    return (
      <div
        className="glass-card"
        style={{
          padding: '2rem 1.5rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <Award size={48} color="var(--accent-gold)" style={{ margin: '0 auto 0.75rem' }} />
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
          {isOdia ? '🏆 ଚୂଡ଼ାନ୍ତ ପରୀକ୍ଷା ସମ୍ପୂର୍ଣ୍ଣ!' : '🏆 Grand Challenge Complete!'}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          {isOdia
            ? `ଆପଣ ${questions.length} ଟି ମଧ୍ୟରୁ ${correctCount} ଟି ପ୍ରଶ୍ନର ସଠିକ୍ ଉତ୍ତର ଦେଇଛନ୍ତି (${finalPercent}%)।`
            : `You scored ${correctCount} out of ${questions.length} (${finalPercent}%).`}
        </p>

        <button
          onClick={handleFinish}
          className="btn btn-accent"
          style={{ minHeight: '50px', padding: '0.7rem 2.25rem', fontWeight: 800, fontSize: '1.05rem' }}
        >
          <Sparkles size={18} />
          <span>{isOdia ? 'ସମଗ୍ର ଅଭିଯାନ ଫଳାଫଳ ଦେଖନ୍ତୁ' : 'View Master Adventure Results'}</span>
        </button>
      </div>
    );
  }

  const isCorrect = selectedOption === currentQ.correctOption;

  return (
    <div style={{ width: '100%' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            background:
              currentQ.difficulty === 'easy'
                ? 'rgba(16, 185, 129, 0.15)'
                : currentQ.difficulty === 'hard'
                ? 'rgba(239, 68, 68, 0.15)'
                : 'rgba(245, 158, 11, 0.15)',
            color:
              currentQ.difficulty === 'easy'
                ? '#34d399'
                : currentQ.difficulty === 'hard'
                ? '#f87171'
                : '#fbbf24',
          }}
        >
          {currentQ.difficulty}
        </span>

        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
          {isOdia
            ? `ପ୍ରଶ୍ନ ${currentIndex + 1} / ${questions.length}`
            : `Question ${currentIndex + 1} of ${questions.length}`}
        </span>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '5px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          marginBottom: '1.25rem',
        }}
      >
        <div
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Question Card */}
      <div
        className="glass-card"
        style={{
          padding: '1.5rem',
          marginBottom: '1.25rem',
          border: '1px solid var(--border-accent)',
        }}
      >
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.5, marginBottom: '1.25rem' }}>
          {isOdia ? currentQ.questionOdia : currentQ.question}
        </h3>

        {/* Options List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {(isOdia ? currentQ.optionsOdia : currentQ.options).map((opt, oIdx) => {
            const isSelected = selectedOption === oIdx;
            const isThisOptionCorrect = oIdx === currentQ.correctOption;

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

      {/* Explanation Box on Answer */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
            {isCorrect ? <CheckCircle2 size={18} color="#10b981" /> : <HelpCircle size={18} color="#f59e0b" />}
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: isCorrect ? '#34d399' : '#fbbf24' }}>
              {isCorrect ? (isOdia ? '✅ ସଠିକ୍!' : '✅ Correct!') : (isOdia ? '💡 ବ୍ୟାଖ୍ୟା:' : '💡 Explanation:')}
            </span>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '1rem' }}>
            {isOdia ? currentQ.explanationOdia : currentQ.explanation}
          </p>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleNext} className="btn btn-primary" style={{ minHeight: '42px', padding: '0.5rem 1.5rem' }}>
              <span>{isLastQuestion ? (isOdia ? 'ଚୂଡ଼ାନ୍ତ ଫଳାଫଳ ଦେଖନ୍ତୁ' : 'Submit Final Quiz') : (isOdia ? 'ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ' : 'Next Question')}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
