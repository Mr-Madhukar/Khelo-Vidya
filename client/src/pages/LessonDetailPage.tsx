import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  Award,
  CheckCircle2,
  MapPin,
  Lightbulb,
  Check,
  Zap,
} from 'lucide-react';
import { fetchLessonById } from '../services/lessonService.ts';
import { CachedLesson, LessonContentBody } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

export const LessonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const [lesson, setLesson] = useState<CachedLesson | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [savedOffline, setSavedOffline] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      loadLesson(id);
    }
  }, [id]);

  const loadLesson = async (lessonId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLessonById(lessonId);
      setLesson(data);
      setSavedOffline(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load lesson content');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {language === 'or' ? 'ପାଠ୍ୟ ବିଷୟବସ୍ତୁ ଲୋଡ୍ ହେଉଛି...' : 'Loading lesson content...'}
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
          <h3 style={{ color: 'var(--danger)', marginBottom: '0.75rem' }}>
            {language === 'or' ? 'ପାଠ ମିଳିଲା ନାହିଁ' : 'Lesson Unavailable'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {error || 'Unable to load lesson details.'}
          </p>
          <Link to="/lessons" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>{t('backToLessons')}</span>
          </Link>
        </div>
      </div>
    );
  }

  const contentBody = (lesson.contentBody || {}) as LessonContentBody;
  const isOdia = language === 'or';
  const displayTitle = isOdia && lesson.titleOdia ? lesson.titleOdia : lesson.title;
  const displaySubtitle = isOdia ? lesson.title : lesson.titleOdia;
  const displaySummary = isOdia && contentBody.summaryOdia ? contentBody.summaryOdia : contentBody.summary;

  return (
    <div className="page-container" style={{ paddingBottom: '6rem', maxWidth: '860px', margin: '0 auto' }}>
      {/* Navigation Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button
          onClick={() => navigate('/lessons')}
          className="btn btn-secondary"
          style={{ minHeight: '36px', padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={15} />
          <span>{t('backToLessons')}</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {savedOffline && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--accent-green)',
                background: 'var(--accent-green-soft)',
                padding: '0.3rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(22, 163, 74, 0.2)',
              }}
            >
              <CheckCircle2 size={13} />
              <span>{t('cachedReady')}</span>
            </div>
          )}

          <button
            onClick={() => navigate(`/lessons/${lesson.id}/adventure`)}
            className="btn btn-green"
            style={{
              minHeight: '36px',
              padding: '0.35rem 0.9rem',
              fontSize: '0.85rem',
            }}
          >
            <span>🌱 {language === 'or' ? 'ଅଭିଯାନ ଖେଳନ୍ତୁ' : 'Play Adventure'}</span>
          </button>

          <button
            onClick={() => navigate(`/lessons/${lesson.id}/quiz`)}
            className="btn btn-primary"
            style={{ minHeight: '36px', padding: '0.35rem 0.9rem', fontSize: '0.85rem' }}
          >
            <Zap size={15} />
            <span>{t('startQuiz')}</span>
          </button>
        </div>
      </div>

      {/* Gamified Adventure Feature Banner */}
      <div
        className="glass-card"
        style={{
          padding: '1.75rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, var(--accent-orange-soft) 0%, var(--bg-card) 100%)',
          border: '2px solid var(--border-accent)',
          borderRadius: 'var(--radius-xl)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '260px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--accent-green-soft)',
              border: '2px solid var(--accent-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              flexShrink: 0,
            }}
          >
            🌱
          </div>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-orange)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <Sparkles size={12} color="var(--accent-orange)" />
              <span>{language === 'or' ? 'ଇଣ୍ଟରାକ୍ଟିଭ୍ ଗେମିଫାଏଡ୍ ଲର୍ଣ୍ଣିଂ' : 'Gamified Learning Module'}</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.2rem 0' }} className="font-odia">
              {language === 'or' ? '🌱 ଆଲୋକସଂଶ୍ଳେଷଣ ଅଭିଯାନ: ଗଛଟିକୁ ବଞ୍ଚାନ୍ତୁ' : '🌱 Photosynthesis Adventure: Save the Plant'}
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }} className="font-odia">
              {language === 'or'
                ? '୫ଟି ମଜାଦାର ଲେଭଲ୍ ଖେଳି ଗଛକୁ ବଡ଼ କରନ୍ତୁ, XP ପଏଣ୍ଟ ଓ ସୁନ୍ଦର ବ୍ୟାଜ୍ ଅର୍ଜନ କରନ୍ତୁ!'
                : 'Interact with a virtual plant across 5 game levels, earn XP, and unlock STEM badges!'}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate(`/lessons/${lesson.id}/adventure`)}
          className="btn btn-primary"
          style={{
            minHeight: '48px',
            padding: '0.6rem 1.5rem',
            fontWeight: 800,
            fontSize: '0.95rem',
          }}
        >
          <span>{language === 'or' ? 'ଅଭିଯାନ ଆରମ୍ଭ କରନ୍ତୁ 🚀' : 'Start Adventure 🚀'}</span>
        </button>
      </div>

      {/* Lesson Header Banner */}
      <div
        className="glass-card"
        style={{
          padding: '2rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, var(--bg-card-accent) 0%, var(--bg-surface) 100%)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-xl)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--accent-orange-soft)',
            color: 'var(--accent-orange-dark)',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '0.75rem',
            border: '1px solid var(--border-accent)',
          }}
        >
          <BookOpen size={14} color="var(--accent-orange)" />
          <span>{lesson.subject} · {language === 'or' ? `${lesson.grade}ମ ଶ୍ରେଣୀ` : `Grade ${lesson.grade}`}</span>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '0.4rem', color: 'var(--text-primary)' }} className="font-odia">
          {displayTitle}
        </h1>

        {displaySubtitle && (
          <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontStyle: 'italic', marginBottom: '1.25rem' }}>
            {displaySubtitle}
          </div>
        )}

        {displaySummary && (
          <div
            style={{
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-surface)',
              borderLeft: '4px solid var(--accent-orange)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              lineHeight: 1.6,
            }}
          >
            <strong>{t('summary')}: </strong> {displaySummary}
          </div>
        )}
      </div>

      {/* Section Content Cards */}
      {contentBody.sections && contentBody.sections.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
          {contentBody.sections.map((sec, sIdx) => {
            const secTitle = isOdia && sec.titleOdia ? sec.titleOdia : sec.title;
            const secContent = isOdia && sec.contentOdia ? sec.contentOdia : sec.content;
            const secKeyPoints = isOdia && sec.keyPointsOdia ? sec.keyPointsOdia : sec.keyPoints;

            return (
              <div key={sIdx} className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: 'var(--accent-orange-soft)',
                      color: 'var(--accent-orange)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      border: '1px solid var(--border-accent)',
                    }}
                  >
                    {sIdx + 1}
                  </div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }} className="font-odia">
                    {secTitle}
                  </h2>
                </div>

                <div
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-line',
                    marginBottom: secKeyPoints && secKeyPoints.length > 0 ? '1.25rem' : 0,
                  }}
                  className="font-odia"
                >
                  {secContent}
                </div>

                {/* Key Takeaways / Points */}
                {secKeyPoints && secKeyPoints.length > 0 && (
                  <div
                    style={{
                      background: 'var(--bg-surface)',
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-card)',
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-orange)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Sparkles size={14} />
                      <span>{t('keyPoints')}</span>
                    </div>
                    <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {secKeyPoints.map((pt, pIdx) => (
                        <li key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-primary)' }} className="font-odia">
                          <Check size={14} color="var(--accent-green)" style={{ marginTop: '3px', flexShrink: 0 }} />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Odisha Real-World Context Spotlight */}
      {contentBody.realWorldOdisha && (
        <div
          className="glass-card"
          style={{
            padding: '1.75rem',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, var(--accent-orange-soft) 0%, var(--bg-card) 100%)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--accent-orange)' }}>
            <MapPin size={20} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }} className="font-odia">
              {isOdia && contentBody.realWorldOdisha.titleOdia
                ? contentBody.realWorldOdisha.titleOdia
                : contentBody.realWorldOdisha.title}
            </h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }} className="font-odia">
            {isOdia && contentBody.realWorldOdisha.contextOdia
              ? contentBody.realWorldOdisha.contextOdia
              : contentBody.realWorldOdisha.context}
          </p>
        </div>
      )}

      {/* Did You Know? / Fun Fact Box */}
      {contentBody.funFact && (
        <div
          className="glass-card"
          style={{
            padding: '1.5rem',
            marginBottom: '2.5rem',
            background: 'linear-gradient(135deg, var(--accent-green-soft) 0%, var(--bg-card) 100%)',
            border: '1px solid rgba(22, 163, 74, 0.25)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-green)', marginBottom: '0.4rem' }}>
            <Lightbulb size={18} />
            <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>{t('funFact')}</h4>
          </div>
          <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.5 }} className="font-odia">
            {isOdia && contentBody.funFact.or ? contentBody.funFact.or : contentBody.funFact.en}
          </p>
        </div>
      )}

      {/* Ready for Assessment CTA Banner */}
      <div
        className="glass-card"
        style={{
          padding: '2.25rem 2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, var(--bg-card-accent) 0%, var(--bg-surface) 100%)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <Award size={36} color="var(--accent-orange)" style={{ margin: '0 auto 0.75rem' }} />
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }} className="font-odia">
          {language === 'or' ? 'ପାଠ ଶେଷ ହେଲା! ଏବେ କୁଇଜ୍ ଦେଇ ନିଜ ଦକ୍ଷତା ପରୀକ୍ଷା କରନ୍ତୁ।' : 'Ready to test your knowledge? Take the quiz!'}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }} className="font-odia">
          {language === 'or'
            ? 'କୁଇଜ୍ ସମ୍ପୂର୍ଣ୍ଣ କରି ପଏଣ୍ଟ୍ ଓ ସୁନ୍ଦର ବ୍ୟାଜ୍ ଅର୍ଜନ କରନ୍ତୁ।'
            : 'Answer the interactive questions to earn mastery points and unlock STEM explorer badges.'}
        </p>

        <button
          onClick={() => navigate(`/lessons/${lesson.id}/quiz`)}
          className="btn btn-primary"
          style={{ minHeight: '50px', padding: '0.8rem 2.25rem', fontSize: '1.05rem', fontWeight: 800 }}
        >
          <Zap size={18} />
          <span>{t('startQuiz')}</span>
        </button>
      </div>
    </div>
  );
};
