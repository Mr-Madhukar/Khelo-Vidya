import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  BookOpen,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Medal,
} from 'lucide-react';
import { fetchStudentProgress } from '../services/lessonService.ts';
import { StudentProgressSummary } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';

export const ProgressPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [progressData, setProgressData] = useState<StudentProgressSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadProgress();

    const handleSync = () => {
      loadProgress();
    };

    window.addEventListener('khelo-sync-complete', handleSync);
    window.addEventListener('focus', handleSync);

    return () => {
      window.removeEventListener('khelo-sync-complete', handleSync);
      window.removeEventListener('focus', handleSync);
    };
  }, []);


  const loadProgress = async () => {
    setLoading(true);
    try {
      const data = await fetchStudentProgress();
      setProgressData(data);
    } catch (err) {
      console.error('[ProgressPage] Error fetching progress:', err);
    } finally {
      setLoading(false);
    }
  };

  const isOdia = language === 'or';

  return (
    <div className="page-container" style={{ paddingBottom: '4rem', maxWidth: '860px', margin: '0 auto' }}>
      {/* Student Progress Hero */}
      <div
        className="glass-card"
        style={{
          padding: '2.25rem 2rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, var(--bg-card-accent) 0%, var(--bg-surface) 100%)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.5rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--accent-orange-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-orange)',
              border: '1px solid var(--border-accent)',
            }}
          >
            <TrendingUp size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1.2, color: 'var(--text-primary)' }} className="font-odia">
              {isOdia ? `${user?.name || 'ଛାତ୍ର'}ଙ୍କ ଶିକ୍ଷା ପ୍ରଗତି` : `${user?.name || 'Student'}'s Progress & Mastery`}
            </h1>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              {user?.school_name || 'Odisha Model School'} · {isOdia ? `${user?.grade || 7}ମ ଶ୍ରେଣୀ` : `Grade ${user?.grade || 7}`}
            </div>
          </div>
        </div>

        {/* 3 Top-Level Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginTop: '1.75rem',
          }}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-card)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-orange)', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: 700 }}>
              <Zap size={16} />
              <span>{t('points')}</span>
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {progressData?.stats.totalPoints || 0}
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-card)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-card)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: 700 }}>
              <BookOpen size={16} />
              <span>{isOdia ? 'ସମ୍ପୂର୍ଣ୍ଣ ପାଠ' : 'Completed Lessons'}</span>
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {progressData?.stats.totalCompletedLessons || 0}
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-card)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-card)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-green)', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: 700 }}>
              <Award size={16} />
              <span>{t('badges')}</span>
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {progressData?.stats.badgesCount || progressData?.badges.length || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Badges Showcase */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
          <Sparkles size={20} color="var(--accent-orange)" />
          <span>{t('badges')}</span>
        </h2>

        {loading ? (
          <div style={{ color: 'var(--text-secondary)', padding: '1rem' }}>Loading badges...</div>
        ) : !progressData || progressData.badges.length === 0 ? (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', borderRadius: 'var(--radius-lg)' }}>
            <Medal size={40} style={{ margin: '0 auto 0.75rem', opacity: 0.4, color: 'var(--accent-orange)' }} />
            <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
              {isOdia ? 'ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ବ୍ୟାଜ୍ ଅର୍ଜିତ ହୋଇନାହିଁ' : 'No badges earned yet'}
            </div>
            <p style={{ fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              {isOdia
                ? 'ପ୍ରଥମ କୁଇଜ୍ ସମ୍ପୂର୍ଣ୍ଣ କରି "First Step in Science" ବ୍ୟାଜ୍ ଅନଲକ୍ କରନ୍ତୁ!'
                : 'Complete your first STEM lesson quiz to unlock your first achievement badge!'}
            </p>
            <button onClick={() => navigate('/lessons')} className="btn btn-primary" style={{ minHeight: '38px', padding: '0.4rem 1.1rem' }}>
              <span>{t('startLearning')}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {progressData.badges.map((b) => (
              <div
                key={b.id || b.badge_id}
                className="glass-card"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  border: '1px solid var(--border-accent)',
                  background: 'linear-gradient(135deg, var(--accent-orange-soft) 0%, var(--bg-card) 100%)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--accent-orange)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px var(--accent-orange-glow)',
                  }}
                >
                  <Award size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }} className="font-odia">
                    {isOdia && b.badge_name_odia ? b.badge_name_odia : b.badge_name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {new Date(b.earned_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Topic Mastery Progress Bars */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
          <ShieldCheck size={20} color="var(--primary)" />
          <span>{isOdia ? 'ବିଷୟବସ୍ତୁ ଦକ୍ଷତା ପ୍ରଗତି' : 'Topic Mastery Breakdown'}</span>
        </h2>

        {loading ? (
          <div style={{ color: 'var(--text-secondary)', padding: '1rem' }}>Loading topic stats...</div>
        ) : !progressData || progressData.topicProgress.length === 0 ? (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', borderRadius: 'var(--radius-lg)' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
              {isOdia
                ? 'ପାଠ୍ୟକ୍ରମ ଆରମ୍ଭ କଲେ ଏଠାରେ ପ୍ରତ୍ୟେକ ବିଷୟର ଦକ୍ଷତା ପ୍ରତିଶତ ଦେଖାଯିବ।'
                : 'Complete lessons in different STEM topics to see your subject mastery breakdown here.'}
            </p>
            <button onClick={() => navigate('/lessons')} className="btn btn-primary" style={{ minHeight: '38px', padding: '0.4rem 1.1rem' }}>
              <span>{t('startLearning')}</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {progressData.topicProgress.map((tp) => {
              const mastery = tp.mastery_level || 0;
              const topicTitle = isOdia && tp.topic_name_odia ? tp.topic_name_odia : tp.topic_name;

              return (
                <div key={tp.topic_id} className="glass-card" style={{ padding: '1.35rem', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-primary)' }} className="font-odia">
                        {topicTitle}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{tp.subject}</div>
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--accent-orange)' }}>
                      {mastery}%
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div
                    style={{
                      width: '100%',
                      height: '8px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--bg-input)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${mastery}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--accent-orange) 0%, var(--primary) 100%)',
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
