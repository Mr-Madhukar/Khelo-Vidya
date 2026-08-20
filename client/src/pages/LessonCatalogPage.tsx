import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Atom,
  Flame,
  Dna,
  Calculator,
  Search,
  Sparkles,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { fetchLessons, fetchTopics, isLessonCachedLocally } from '../services/lessonService.ts';
import { LessonSummary, ContentTopic } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';

export const LessonCatalogPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [lessons, setLessons] = useState<LessonSummary[]>([]);
  const [topics, setTopics] = useState<ContentTopic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>(user?.grade || 7);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cachedStatusMap, setCachedStatusMap] = useState<Record<string, boolean>>({});

  const loadCatalog = React.useCallback(async () => {
    setLoading(true);
    try {
      const [fetchedTopics, fetchedLessons] = await Promise.all([
        fetchTopics(
          selectedGrade === 'all' ? undefined : selectedGrade,
          selectedSubject === 'all' ? undefined : selectedSubject
        ),
        fetchLessons({
          grade: selectedGrade === 'all' ? undefined : selectedGrade,
          subject: selectedSubject === 'all' ? undefined : selectedSubject,
        }),
      ]);

      setTopics(fetchedTopics);
      setLessons(fetchedLessons);

      // Check cache status for all lessons
      const statusMap: Record<string, boolean> = {};
      for (const l of fetchedLessons) {
        statusMap[l.id] = await isLessonCachedLocally(l.id);
      }
      setCachedStatusMap(statusMap);
    } catch (err) {
      console.error('[LessonCatalog] Error loading lessons:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedGrade, selectedSubject]);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  const getSubjectIcon = (subj: string) => {
    if (subj.toLowerCase().includes('physics')) return <Atom size={18} color="var(--primary)" />;
    if (subj.toLowerCase().includes('chemistry')) return <Flame size={18} color="var(--accent-orange)" />;
    if (subj.toLowerCase().includes('biology')) return <Dna size={18} color="var(--accent-green)" />;
    return <Calculator size={18} color="var(--accent-gold)" />;
  };

  const filteredLessons = lessons.filter((l) => {
    const titleMatch =
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.title_odia && l.title_odia.includes(searchQuery));
    const topicMatch =
      l.topic_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.topic_name_odia && l.topic_name_odia.includes(searchQuery));
    
    const cleanSub = selectedSubject.toLowerCase().replace('maths', 'math').replace('mathematics', 'math');
    const subjectMatch =
      selectedSubject === 'all' || l.subject.toLowerCase().includes(cleanSub);

    return (titleMatch || topicMatch) && subjectMatch;
  });

  return (
    <div className="page-container" style={{ paddingBottom: '4rem' }}>
      {/* Header Banner */}
      <div
        className="glass-card"
        style={{
          padding: '2rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, var(--bg-card-accent) 0%, var(--bg-surface) 100%)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
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
                marginBottom: '0.6rem',
                border: '1px solid var(--border-accent)',
              }}
            >
              <Sparkles size={14} color="var(--accent-orange)" />
              <span>{language === 'or' ? '୭ମ ଶ୍ରେଣୀ STEM ପାଠ୍ୟଖସଡ଼ା' : 'Grade 6–9 STEM Curriculum'}</span>
            </div>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)' }} className="font-odia">
              {language === 'or' ? 'ପାଠ୍ୟକ୍ରମ ଏବଂ କୁଇଜ୍ ଅଭ୍ୟାସ' : 'Interactive STEM Lessons & Quizzes'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }} className="font-odia">
              {language === 'or'
                ? 'ଓଡ଼ିଶା ରାଜ୍ୟ ବୋର୍ଡ ସିଲାବସ୍ ଅନୁଯାୟୀ ପ୍ରସ୍ତୁତ ବିଜ୍ଞାନ ଓ ଗଣିତ ପାଠ।'
                : 'Curriculum-aligned science and mathematics modules built for offline classroom practice.'}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div
            style={{
              display: 'flex',
              gap: '1.25rem',
              background: 'var(--bg-card)',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-card)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('lessons')}</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-orange)' }}>
                {lessons.length}
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('topics')}</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)' }}>
                {topics.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.75rem',
        }}
      >
        {/* Subject Filter Pills */}
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', labelEn: 'All STEM', labelOr: 'ସମସ୍ତ' },
            { id: 'physics', labelEn: 'Physics', labelOr: 'ପଦାର୍ଥ ବିଜ୍ଞାନ' },
            { id: 'chemistry', labelEn: 'Chemistry', labelOr: 'ରସାୟନ' },
            { id: 'biology', labelEn: 'Biology', labelOr: 'ଜୀବ ବିଜ୍ଞାନ' },
            { id: 'mathematics', labelEn: 'Maths', labelOr: 'ଗଣିତ' },
          ].map((subj) => {
            const isSelected = selectedSubject === subj.id;
            return (
              <button
                key={subj.id}
                onClick={() => setSelectedSubject(subj.id)}
                className="btn"
                style={{
                  minHeight: '36px',
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  background: isSelected ? 'var(--accent-orange)' : 'var(--bg-surface)',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  border: `1px solid ${isSelected ? 'var(--accent-orange)' : 'var(--border-card)'}`,
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                {language === 'or' ? subj.labelOr : subj.labelEn}
              </button>
            );
          })}
        </div>

        {/* Grade & Search Inputs */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10))}
            className="form-select"
            style={{
              padding: '0.4rem 0.75rem',
              fontSize: '0.85rem',
              minHeight: '36px',
              width: 'auto',
            }}
          >
            <option value={7}>{language === 'or' ? '୭ମ ଶ୍ରେଣୀ (Grade 7)' : 'Grade 7'}</option>
            <option value={6}>{language === 'or' ? '୬ଷ୍ଠ ଶ୍ରେଣୀ (Grade 6)' : 'Grade 6'}</option>
            <option value={8}>{language === 'or' ? '୮ମ ଶ୍ରେଣୀ (Grade 8)' : 'Grade 8'}</option>
            <option value={9}>{language === 'or' ? '୯ମ ଶ୍ରେଣୀ (Grade 9)' : 'Grade 9'}</option>
            <option value="all">{language === 'or' ? 'ସମସ୍ତ ଶ୍ରେଣୀ' : 'All Grades'}</option>
          </select>

          <div style={{ position: 'relative' }}>
            <Search
              size={15}
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              placeholder={language === 'or' ? 'ପାଠ ଖୋଜନ୍ତୁ...' : 'Search lessons...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                padding: '0.4rem 0.75rem 0.4rem 2rem',
                fontSize: '0.85rem',
                minHeight: '36px',
                minWidth: '180px',
              }}
            />
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>
            {language === 'or' ? 'ପାଠ୍ୟକ୍ରମ ଲୋଡ୍ ହେଉଛି...' : 'Loading lessons...'}
          </div>
        </div>
      ) : filteredLessons.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <BookOpen size={40} style={{ margin: '0 auto 1rem', opacity: 0.5, color: 'var(--accent-orange)' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            {language === 'or' ? 'କୌଣସି ପାଠ ମିଳିଲା ନାହିଁ' : 'No lessons found'}
          </h3>
          <p style={{ fontSize: '0.9rem' }}>
            {language === 'or' ? 'ଅନ୍ୟ ଏକ ବିଷୟ ବା ଶ୍ରେଣୀ ଚୟନ କରନ୍ତୁ।' : 'Try selecting another subject or clearing search filters.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filteredLessons.map((lesson) => {
            const isCached = cachedStatusMap[lesson.id];
            const titleDisplay = language === 'or' && lesson.title_odia ? lesson.title_odia : lesson.title;
            const subtitleDisplay = language === 'or' ? lesson.title : (lesson.title_odia || '');

            return (
              <div
                key={lesson.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.6rem',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onClick={() => navigate(`/lessons/${lesson.id}`)}
              >
                <div>
                  {/* Card Header: Subject Pill & Cache Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {getSubjectIcon(lesson.subject)}
                      <span>{lesson.subject.replace('STEM - ', '')}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {(lesson.title.toLowerCase().includes('photosynthesis') || lesson.title.toLowerCase().includes('nutrition')) && (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.2rem',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            color: 'var(--accent-orange)',
                            background: 'var(--accent-orange-soft)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-accent)',
                          }}
                        >
                          <Sparkles size={11} color="var(--accent-orange)" />
                          <span>{language === 'or' ? '🌱 ଗେମ୍' : '🌱 Game'}</span>
                        </div>
                      )}

                      {isCached && (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontSize: '0.72rem',
                            color: 'var(--accent-green)',
                            background: 'var(--accent-green-soft)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: 'var(--radius-sm)',
                            fontWeight: 600,
                          }}
                        >
                          <CheckCircle2 size={12} />
                          <span>{t('cachedReady')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Topic name */}
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 600 }}>
                    {language === 'or' && lesson.topic_name_odia ? lesson.topic_name_odia : lesson.topic_name}
                  </div>

                  {/* Lesson Title */}
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, lineHeight: 1.35, marginBottom: '0.35rem', color: 'var(--text-primary)' }} className="font-odia">
                    {titleDisplay}
                  </h3>

                  {/* Subtitle in other language */}
                  {subtitleDisplay && (
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontStyle: 'italic' }}>
                      {subtitleDisplay}
                    </div>
                  )}
                </div>

                {/* Card Footer: Metadata & Actions */}
                <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                    <Zap size={13} color="var(--accent-orange)" />
                    <span>{lesson.question_count || 3} {language === 'or' ? 'ପ୍ରଶ୍ନ (MCQ)' : 'Questions'}</span>
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      color: 'var(--accent-orange)',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                    }}
                  >
                    <span>{language === 'or' ? 'ପଢ଼ନ୍ତୁ' : 'Explore'}</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
