import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Award,
  Zap,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { fetchLessonById, submitQuizAttempt } from '../services/lessonService.ts';
import { CachedLesson, CachedQuestion, AttemptSubmissionResponse } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';

export const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [lesson, setLesson] = useState<CachedLesson | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Client-generated attemptUUID created BEFORE student starts answering
  const attemptUUIDRef = useRef<string>(crypto.randomUUID());

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<AttemptSubmissionResponse | null>(null);

  useEffect(() => {
    if (id) {
      loadQuiz(id);
    }
  }, [id]);

  const loadQuiz = async (lessonId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLessonById(lessonId);
      if (!data.questions || data.questions.length === 0) {
        throw new Error('No quiz questions found for this lesson.');
      }
      setLesson(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!lesson || !user) return;
    setSubmitting(true);

    const questions = lesson.questions || [];
    let estimatedScore = 0;
    let correctCount = 0;

    const answersPayload = questions.map((q) => {
      const selected = selectedAnswers[q.id] ?? -1;
      const isCorrect = selected === q.correctOption;
      if (isCorrect) {
        correctCount++;
        estimatedScore += q.points || 10;
      }
      return {
        question_id: q.id,
        selected_option: selected,
      };
    });

    try {
      const submissionResponse = await submitQuizAttempt({
        attemptUUID: attemptUUIDRef.current,
        studentId: user.id,
        lessonId: lesson.id,
        answers: answersPayload,
        clientSubmittedScore: estimatedScore,
        totalQuestions: questions.length,
        correctAnswers: correctCount,
      });

      setResult(submissionResponse);
    } catch (err) {
      console.error('[QuizPage] Submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestartQuiz = () => {
    // Generate new attemptUUID for the fresh attempt
    attemptUUIDRef.current = crypto.randomUUID();
    setSelectedAnswers({});
    setCurrentIndex(0);
    setResult(null);
  };

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {language === 'or' ? 'କୁଇଜ୍ ପ୍ରସ୍ତୁତ ହେଉଛି...' : 'Loading quiz engine...'}
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
          <h3 style={{ color: 'var(--danger)', marginBottom: '0.75rem' }}>{t('quizResults')}</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {error || 'Unable to start quiz.'}
          </p>
          <button onClick={() => navigate('/lessons')} className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>{t('backToLessons')}</span>
          </button>
        </div>
      </div>
    );
  }

  const questions = lesson.questions || [];
  const currentQ: CachedQuestion = questions[currentIndex];
  const isOdia = language === 'or';
  const totalQuestions = questions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const answeredCount = Object.keys(selectedAnswers).length;

  // ==========================================
  // Result View (After Quiz Submission)
  // ==========================================
  if (result) {
    const accuracy = Math.round((result.correctCount / (result.totalQuestions || 1)) * 100);

    return (
      <div className="page-container" style={{ maxWidth: '780px', margin: '0 auto', paddingBottom: '4rem' }}>
        {/* Results Hero Card */}
        <div
          className="glass-card"
          style={{
            padding: '2.5rem 2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, var(--bg-card-accent) 0%, var(--bg-surface) 100%)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-xl)',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: accuracy >= 70 ? 'var(--accent-green-soft)' : 'var(--accent-orange-soft)',
              color: accuracy >= 70 ? 'var(--accent-green)' : 'var(--accent-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              border: `2px solid ${accuracy >= 70 ? 'var(--accent-green)' : 'var(--accent-orange)'}`,
            }}
          >
            <Award size={36} />
          </div>

          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--text-primary)' }} className="font-odia">
            {accuracy >= 80
              ? isOdia ? 'ଅଭିନନ୍ଦନ! ଉତ୍କୃଷ୍ଟ ପ୍ରଦର୍ଶନ 🎉' : 'Outstanding Performance! 🎉'
              : accuracy >= 50
              ? isOdia ? 'ଭଲ ପ୍ରୟାସ! ଆଗକୁ ବଢ଼ନ୍ତୁ 👍' : 'Good Effort! Keep Learning 👍'
              : isOdia ? 'ଆଉଥରେ ଚେଷ୍ଟା କରନ୍ତୁ 💪' : 'Keep Practicing! 💪'}
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.75rem' }} className="font-odia">
            {isOdia && lesson.titleOdia ? lesson.titleOdia : lesson.title}
          </p>

          {/* Stats Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              background: 'var(--bg-card)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-card)',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t('score')}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>
                {result.correctCount} / {result.totalQuestions}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t('accuracy')}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: accuracy >= 60 ? 'var(--accent-green)' : 'var(--accent-orange)' }}>
                {accuracy}%
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t('points')}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-orange)' }}>
                +{result.score}
              </div>
            </div>
          </div>

          {/* New Badges Celebration Banner */}
          {result.newBadges && result.newBadges.length > 0 && (
            <div
              style={{
                background: 'var(--accent-orange-soft)',
                border: '1px solid var(--border-accent)',
                borderRadius: 'var(--radius-lg)',
                padding: '1rem 1.25rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textAlign: 'left',
              }}
            >
              <Sparkles size={28} color="var(--accent-orange)" />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-orange)' }}>
                  {t('newBadgeUnlocked')}
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }} className="font-odia">
                  {result.newBadges.map((b) => (isOdia && b.nameOdia ? b.nameOdia : b.name)).join(', ')}
                </div>
              </div>
            </div>
          )}

          {/* Idempotency & Data Integrity Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <ShieldCheck size={14} color="var(--accent-green)" />
            <span>Attempt UUID: {attemptUUIDRef.current.slice(0, 8)}... (Verified & Idempotent)</span>
          </div>
        </div>

        {/* Question Review Section */}
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }} className="font-odia">
          {t('reviewAnswers')}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {questions.map((q, idx) => {
            const userChoice = selectedAnswers[q.id];
            const isCorrect = userChoice === q.correctOption;
            const questionText = isOdia && q.questionTextOdia ? q.questionTextOdia : q.questionText;
            const opts = isOdia && q.optionsOdia && q.optionsOdia.length > 0 ? q.optionsOdia : q.options;

            return (
              <div
                key={q.id}
                className="glass-card"
                style={{
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  borderLeft: isCorrect ? '4px solid var(--accent-green)' : '4px solid var(--danger)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    {language === 'or' ? `ପ୍ରଶ୍ନ ${idx + 1}` : `Question ${idx + 1}`}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: isCorrect ? 'var(--accent-green)' : 'var(--danger)',
                    }}
                  >
                    {isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                    <span>{isCorrect ? '+10 Pts' : '0 Pts'}</span>
                  </span>
                </div>

                <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.85rem', color: 'var(--text-primary)' }} className="font-odia">
                  {questionText}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.45rem' }}>
                  {opts.map((opt, oIdx) => {
                    const isOptionCorrect = oIdx === q.correctOption;
                    const isOptionSelected = oIdx === userChoice;

                    let bg = 'var(--bg-surface)';
                    let border = 'var(--border-subtle)';
                    let textColor = 'var(--text-secondary)';

                    if (isOptionCorrect) {
                      bg = 'var(--accent-green-soft)';
                      border = 'var(--accent-green)';
                      textColor = 'var(--accent-green)';
                    } else if (isOptionSelected && !isCorrect) {
                      bg = 'var(--danger-bg)';
                      border = 'var(--danger)';
                      textColor = 'var(--danger)';
                    }

                    return (
                      <div
                        key={oIdx}
                        style={{
                          padding: '0.65rem 0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          background: bg,
                          border: `1px solid ${border}`,
                          color: textColor,
                          fontSize: '0.88rem',
                          fontWeight: isOptionCorrect || isOptionSelected ? 600 : 400,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                        className="font-odia"
                      >
                        <span>{opt}</span>
                        {isOptionCorrect && <Check size={14} color="var(--accent-green)" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button onClick={handleRestartQuiz} className="btn btn-secondary" style={{ flex: 1 }}>
            <RotateCcw size={16} />
            <span>{language === 'or' ? 'ପୁନର୍ବାର କୁଇଜ୍ ଦିଅନ୍ତୁ' : 'Retake Quiz'}</span>
          </button>

          <button onClick={() => navigate('/progress')} className="btn btn-primary" style={{ flex: 1 }}>
            <Award size={16} />
            <span>{t('myProgress')}</span>
          </button>

          <button onClick={() => navigate('/lessons')} className="btn btn-secondary" style={{ flex: 1 }}>
            <ArrowRight size={16} />
            <span>{t('backToLessons')}</span>
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // Active Quiz Taking Runner View
  // ==========================================
  const activeQText = isOdia && currentQ.questionTextOdia ? currentQ.questionTextOdia : currentQ.questionText;
  const activeOptions = isOdia && currentQ.optionsOdia && currentQ.optionsOdia.length > 0 ? currentQ.optionsOdia : currentQ.options;
  const currentSelected = selectedAnswers[currentQ.id];

  return (
    <div className="page-container" style={{ maxWidth: '720px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Top Bar: Progress & Counter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <button
          onClick={() => navigate(`/lessons/${lesson.id}`)}
          className="btn btn-secondary"
          style={{ minHeight: '34px', padding: '0.25rem 0.6rem', fontSize: '0.8rem' }}
        >
          <ArrowLeft size={14} />
          <span>{language === 'or' ? 'ପାଠକୁ ଫେରନ୍ତୁ' : 'Exit Quiz'}</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>
            {language === 'or'
              ? `ପ୍ରଶ୍ନ ${currentIndex + 1} / ${totalQuestions}`
              : `Question ${currentIndex + 1} of ${totalQuestions}`}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '6px',
          background: 'var(--bg-input)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--accent-orange) 0%, var(--primary) 100%)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Main Question Card */}
      <div
        className="glass-card"
        style={{
          padding: '2rem',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* Difficulty and Points header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              background:
                currentQ.difficultyTag === 'easy'
                  ? 'var(--accent-green-soft)'
                  : currentQ.difficultyTag === 'hard'
                  ? 'var(--danger-bg)'
                  : 'var(--accent-orange-soft)',
              color:
                currentQ.difficultyTag === 'easy'
                  ? 'var(--accent-green)'
                  : currentQ.difficultyTag === 'hard'
                  ? 'var(--danger)'
                  : 'var(--accent-orange)',
            }}
          >
            {currentQ.difficultyTag}
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.82rem',
              fontWeight: 800,
              color: 'var(--accent-orange)',
            }}
          >
            <Zap size={14} />
            <span>+{currentQ.points || 10} {t('points')}</span>
          </div>
        </div>

        {/* Question Text */}
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, lineHeight: 1.5, marginBottom: '1.75rem', color: 'var(--text-primary)' }} className="font-odia">
          {activeQText}
        </h2>

        {/* 4 Interactive Option Choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {activeOptions.map((opt, oIdx) => {
            const isSelected = currentSelected === oIdx;

            return (
              <button
                key={oIdx}
                type="button"
                onClick={() => handleSelectOption(currentQ.id, oIdx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--accent-orange-soft)' : 'var(--bg-surface)',
                  border: isSelected ? '2px solid var(--accent-orange)' : '1px solid var(--border-card)',
                  color: isSelected ? 'var(--accent-orange-dark)' : 'var(--text-primary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.95rem',
                  fontWeight: isSelected ? 700 : 500,
                  transition: 'all var(--transition-fast)',
                }}
                className="font-odia"
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isSelected ? 'var(--accent-orange)' : 'var(--bg-input)',
                    color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    flexShrink: 0,
                  }}
                >
                  {String.fromCharCode(65 + oIdx)}
                </div>
                <span style={{ flex: 1 }}>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation and Submission Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="btn btn-secondary"
          style={{ opacity: currentIndex === 0 ? 0.4 : 1, minHeight: '46px', padding: '0.6rem 1.25rem' }}
        >
          <ArrowLeft size={16} />
          <span>{t('prevQuestion')}</span>
        </button>

        {isLastQuestion ? (
          <button
            onClick={handleSubmitQuiz}
            disabled={submitting || answeredCount === 0}
            className="btn btn-primary"
            style={{
              minHeight: '46px',
              padding: '0.6rem 1.85rem',
              fontWeight: 800,
            }}
          >
            <Sparkles size={18} />
            <span>{submitting ? 'Submitting...' : t('submitQuiz')}</span>
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
            className="btn btn-primary"
            style={{ minHeight: '46px', padding: '0.6rem 1.5rem', fontWeight: 700 }}
          >
            <span>{t('nextQuestion')}</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
