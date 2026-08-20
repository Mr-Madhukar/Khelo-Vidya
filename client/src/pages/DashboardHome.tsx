import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Award,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Database,
  Users,
  TrendingUp,
  AlertTriangle,
  Search,
  RefreshCw,
  Send,
  Eye,
  Target,
  X,
  Atom,
  Flame,
  Dna,
  Calculator,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { fetchClassSummary } from '../services/lessonService.ts';
import {
  ClassSummaryResponse,
  TeacherStudentRosterItem,
} from '../types/index.ts';

export const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const isTeacher = user?.role === 'teacher' || user?.role === 'admin' || user?.role === 'department';

  // Teacher Dashboard State
  const [classSummary, setClassSummary] = useState<ClassSummaryResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(isTeacher);
  const [activeTab, setActiveTab] = useState<'roster' | 'diagnostics' | 'activity' | 'assign'>('roster');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [searchStudent, setSearchStudent] = useState<string>('');
  const [inspectStudent, setInspectStudent] = useState<TeacherStudentRosterItem | null>(null);

  // Custom Assignment Form State
  const [assignmentTopic, setAssignmentTopic] = useState<string>('topic-1');
  const [assignmentSection, setAssignmentSection] = useState<string>('7-A');
  const [assignmentDueDate, setAssignmentDueDate] = useState<string>('2026-08-28');
  const [assignmentSuccessMsg, setAssignmentSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isTeacher) {
      loadTeacherData();
    }
  }, [isTeacher]);

  const loadTeacherData = async () => {
    setLoading(true);
    try {
      const data = await fetchClassSummary();
      setClassSummary(data);
    } catch (err) {
      console.error('[DashboardHome] Error fetching class summary:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    setAssignmentSuccessMsg(
      language === 'or'
        ? `✅ ନୂତନ ଅଭ୍ୟାସ କାର୍ଯ୍ୟ Class ${assignmentSection} କୁ ସଫଳତାର ସହ ପ୍ରଦାନ କରାଗଲା!`
        : `✅ New assignment successfully published to Class ${assignmentSection}!`
    );
    setTimeout(() => setAssignmentSuccessMsg(null), 4000);
  };

  // Filter students by section and search query
  const filteredStudents = (classSummary?.students || []).filter((s) => {
    const sectionMatch = selectedSection === 'all' || s.class_section === selectedSection;
    const nameMatch =
      s.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
      s.email_or_username.toLowerCase().includes(searchStudent.toLowerCase());
    return sectionMatch && nameMatch;
  });

  const getSubjectIcon = (subj: string) => {
    if (subj.toLowerCase().includes('physics')) return <Atom size={16} color="var(--primary)" />;
    if (subj.toLowerCase().includes('chemistry')) return <Flame size={16} color="var(--accent-orange)" />;
    if (subj.toLowerCase().includes('biology')) return <Dna size={16} color="var(--accent-green)" />;
    return <Calculator size={16} color="var(--accent-gold)" />;
  };

  // ==========================================
  // 1. TEACHER & FACILITATOR DASHBOARD VIEW
  // ==========================================
  if (isTeacher) {
    return (
      <div className="page-container" style={{ paddingBottom: '4rem' }}>
        {/* Top Header Card */}
        <div
          className="glass-card"
          style={{
            padding: '1.75rem 2rem',
            background: 'linear-gradient(135deg, var(--bg-card-accent) 0%, var(--bg-surface) 100%)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-xl)',
            marginBottom: '1.75rem',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'var(--accent-orange-soft)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  marginBottom: '0.75rem',
                  fontSize: '0.75rem',
                  color: 'var(--accent-orange-dark)',
                  fontWeight: 800,
                  border: '1px solid var(--border-accent)',
                }}
              >
                <ShieldCheck size={14} color="var(--accent-orange)" />
                <span>
                  {user?.role === 'admin'
                    ? 'State SME Admin Portal'
                    : language === 'or'
                    ? 'ଶିକ୍ଷକ ଓ ପରିଚାଳକ କମାଣ୍ଡ ସେଣ୍ଟର'
                    : 'STEM Lead Teacher Command Center'}
                </span>
              </div>

              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                {language === 'or' ? 'ନମସ୍କାର' : 'Welcome'}, {user?.name || 'Teacher'} 👋
              </h1>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }} className="font-odia">
                {user?.school_name || 'Govt. High School, Khordha'} · {language === 'or' ? 'ଶ୍ରେଣୀ ୭-A ଓ ୭-B' : 'Class 7-A & 7-B STEM Roster'} · UDISE: 21170100101
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <button
                onClick={loadTeacherData}
                className="btn btn-secondary"
                disabled={loading}
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem', fontWeight: 700 }}
              >
                <RefreshCw size={15} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
                <span>{language === 'or' ? 'ସମନ୍ୱୟ ତାଜା କରନ୍ତୁ' : 'Refresh Metrics'}</span>
              </button>
              <button
                onClick={() => navigate('/lessons')}
                className="btn btn-primary"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem', fontWeight: 700 }}
              >
                <BookOpen size={15} />
                <span>{language === 'or' ? 'ପାଠ୍ୟକ୍ରମ ଦେଖନ୍ତୁ' : 'Lesson Catalog'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-card)',
            }}
          >
            {/* Metric 1: Students */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <Users size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {language === 'or' ? 'ମୋଟ ଛାତ୍ରଛାତ୍ରୀ' : 'Enrolled Students'}
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {classSummary?.classStats.totalStudents || 6}
                </div>
              </div>
            </div>

            {/* Metric 2: Average Mastery */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'var(--accent-green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-green)' }}>
                <TrendingUp size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {language === 'or' ? 'ଶ୍ରେଣୀ ହାରାହାରି ଦକ୍ଷତା' : 'Class STEM Mastery'}
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                  {classSummary?.classStats.classAvgScore || 78}%
                </div>
              </div>
            </div>

            {/* Metric 3: Total Attempts */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'var(--accent-gold-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}>
                <CheckCircle2 size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {language === 'or' ? 'ସମନ୍ୱିତ କୁଇଜ୍ ପ୍ରୟାସ' : 'Synced Attempts'}
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {classSummary?.classStats.totalAttempts || 38}
                </div>
              </div>
            </div>

            {/* Metric 4: Weak Topics */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                <AlertTriangle size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {language === 'or' ? 'ଧ୍ୟାନ ଆବଶ୍ୟକ ଥିବା ପାଠ' : 'Remediation Topics'}
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ef4444' }}>
                  {classSummary?.classStats.weakTopicsCount || 2}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-card)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
          {([
            { id: 'roster', labelEn: '👥 Student Roster & Live Scores', labelOr: '👥 ଛାତ୍ର ତାଲିକା ଓ ସ୍କୋର' },
            { id: 'diagnostics', labelEn: '📊 Topic Diagnostics & Weak Areas', labelOr: '📊 ପାଠ୍ୟ ବିଶ୍ଳେଷଣ ଓ ଦୁର୍ବଳ ଅଂଶ' },
            { id: 'activity', labelEn: '🔄 Live Synced Submissions Log', labelOr: '🔄 ସଦ୍ୟତମ କୁଇଜ୍ ଇତିହାସ' },
            { id: 'assign', labelEn: '🛠️ Publish Class Assignment', labelOr: '🛠️ ଅଭ୍ୟାସ କାର୍ଯ୍ୟ ପ୍ରଦାନ' },
          ] as const).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.6rem 1.15rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--accent-orange)' : 'var(--bg-surface)',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  border: `1px solid ${isActive ? 'var(--accent-orange)' : 'var(--border-card)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {language === 'or' ? tab.labelOr : tab.labelEn}
              </button>
            );
          })}
        </div>

        {/* TAB 1: STUDENT ROSTER */}
        {activeTab === 'roster' && (
          <div>
            {/* Filter and Search Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: 'All Sections' },
                  { id: '7-A', label: 'Class 7-A (STEM)' },
                  { id: '7-B', label: 'Class 7-B' },
                ].map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setSelectedSection(sec.id)}
                    style={{
                      padding: '0.35rem 0.8rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      borderRadius: 'var(--radius-sm)',
                      background: selectedSection === sec.id ? 'var(--primary)' : 'var(--bg-surface)',
                      color: selectedSection === sec.id ? '#ffffff' : 'var(--text-secondary)',
                      border: `1px solid ${selectedSection === sec.id ? 'var(--primary)' : 'var(--border-card)'}`,
                      cursor: 'pointer',
                    }}
                  >
                    {sec.label}
                  </button>
                ))}
              </div>

              <div style={{ position: 'relative', minWidth: '240px' }}>
                <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  placeholder={language === 'or' ? 'ଛାତ୍ରଛାତ୍ରୀ ଖୋଜନ୍ତୁ...' : 'Search student by name...'}
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.2rem', paddingRight: '0.75rem', height: '36px', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {/* Students Table */}
            <div className="glass-card" style={{ overflowX: 'auto', padding: '0.5rem', borderRadius: 'var(--radius-lg)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-card)', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>{language === 'or' ? 'ଛାତ୍ର / ଛାତ୍ରୀ' : 'Student Name'}</th>
                    <th style={{ padding: '0.85rem 1rem' }}>{language === 'or' ? 'ଶ୍ରେଣୀ' : 'Class / Sec'}</th>
                    <th style={{ padding: '0.85rem 1rem' }}>{language === 'or' ? 'ସମାପ୍ତ ପାଠ' : 'Lessons'}</th>
                    <th style={{ padding: '0.85rem 1rem' }}>{language === 'or' ? 'ମୋଟ ପଏଣ୍ଟ (XP)' : 'Total XP'}</th>
                    <th style={{ padding: '0.85rem 1rem' }}>{language === 'or' ? 'ଦକ୍ଷତା' : 'Mastery %'}</th>
                    <th style={{ padding: '0.85rem 1rem' }}>{language === 'or' ? 'ଧ୍ୟାନ ଆବଶ୍ୟକ ବିଷୟ' : 'Remediation Need'}</th>
                    <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>{language === 'or' ? 'କାର୍ଯ୍ୟ' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((st) => (
                    <tr key={st.id} style={{ borderBottom: '1px solid var(--border-card)', transition: 'background 0.2s ease' }}>
                      <td style={{ padding: '0.95rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <div
                            style={{
                              width: '34px',
                              height: '34px',
                              borderRadius: 'var(--radius-full)',
                              background: 'var(--primary-soft)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              color: 'var(--primary)',
                              fontSize: '0.85rem',
                            }}
                          >
                            {st.name.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{st.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>@{st.email_or_username}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '0.95rem 1rem', fontWeight: 600 }}>
                        <span style={{ background: 'var(--bg-surface)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-card)' }}>
                          {st.class_section || '7-A'}
                        </span>
                      </td>
                      <td style={{ padding: '0.95rem 1rem', fontWeight: 600 }}>
                        {st.lessons_completed} {language === 'or' ? 'ପାଠ' : 'lessons'}
                      </td>
                      <td style={{ padding: '0.95rem 1rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                        ⚡ {st.total_points} XP
                      </td>
                      <td style={{ padding: '0.95rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ flex: 1, minWidth: '60px', height: '6px', background: 'var(--border-card)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div
                              style={{
                                width: `${st.mastery_percent}%`,
                                height: '100%',
                                background: st.mastery_percent >= 75 ? 'var(--accent-green)' : st.mastery_percent >= 60 ? 'var(--accent-gold)' : '#ef4444',
                              }}
                            />
                          </div>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: st.mastery_percent >= 75 ? 'var(--accent-green)' : st.mastery_percent >= 60 ? 'var(--accent-gold)' : '#ef4444' }}>
                            {st.mastery_percent}%
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '0.95rem 1rem' }}>
                        {st.weak_topics && st.weak_topics.length > 0 ? (
                          <span
                            style={{
                              background: 'rgba(239, 68, 68, 0.12)',
                              color: '#ef4444',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              display: 'inline-block',
                            }}
                          >
                            ⚠️ {st.weak_topics[0]}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--accent-green)', fontSize: '0.8rem', fontWeight: 600 }}>
                            ✅ On Track
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '0.95rem 1rem', textAlign: 'right' }}>
                        <button
                          onClick={() => setInspectStudent(st)}
                          className="btn btn-secondary"
                          style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem', fontWeight: 700 }}
                        >
                          <Eye size={13} />
                          <span>{language === 'or' ? 'ଅନୁସନ୍ଧାନ' : 'Drill-Down'}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: TOPIC DIAGNOSTICS & WEAK AREAS */}
        {activeTab === 'diagnostics' && (
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                {language === 'or' ? 'ଶ୍ରେଣୀଭିତ୍ତିକ ବିଷୟବସ୍ତୁ ପାରଦର୍ଶିତା ବିଶ୍ଳେଷଣ' : 'Classwide Topic Performance & Diagnostics'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {language === 'or'
                  ? 'ଯେଉଁ ପାଠରେ ଶ୍ରେଣୀ ହାରାହାରି ୬୫% ରୁ କମ୍ ଅଛି, ସେଗୁଡ଼ିକ ଉପରେ ପୁନର୍ବାର ଅଭ୍ୟାସ କରାନ୍ତୁ।'
                  : 'Identify concepts where class average accuracy is below 65% for targeted remediation.'}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {(classSummary?.topicDiagnostics || []).map((diag) => {
                const isWeak = diag.is_weak_topic || diag.average_accuracy < 65;
                return (
                  <div
                    key={diag.topic_id}
                    className="glass-card"
                    style={{
                      padding: '1.5rem',
                      borderRadius: 'var(--radius-lg)',
                      border: isWeak ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-card)',
                      background: isWeak ? 'rgba(239, 68, 68, 0.04)' : 'var(--bg-surface)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ padding: '0.4rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)' }}>
                          {getSubjectIcon(diag.subject)}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                            {diag.subject} · Grade {diag.grade}
                          </div>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                            {language === 'or' && diag.topic_name_odia ? diag.topic_name_odia : diag.topic_name}
                          </h3>
                        </div>
                      </div>

                      {isWeak ? (
                        <span
                          style={{
                            background: '#ef4444',
                            color: '#ffffff',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                          }}
                        >
                          Needs Focus
                        </span>
                      ) : (
                        <span
                          style={{
                            background: 'var(--accent-green-soft)',
                            color: 'var(--accent-green)',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                          }}
                        >
                          Mastered
                        </span>
                      )}
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 600 }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Class Average Score:</span>
                        <span style={{ fontWeight: 800, color: isWeak ? '#ef4444' : 'var(--accent-green)' }}>
                          {diag.average_accuracy}%
                        </span>
                      </div>
                      <div style={{ height: '8px', width: '100%', background: 'var(--border-card)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${diag.average_accuracy}%`,
                            height: '100%',
                            background: isWeak ? '#ef4444' : 'var(--accent-green)',
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        📝 {diag.attempts_count} {language === 'or' ? 'ପ୍ରୟାସ' : 'Attempts'}
                      </span>

                      <button
                        onClick={() => {
                          setAssignmentTopic(diag.topic_id);
                          setActiveTab('assign');
                        }}
                        className={`btn ${isWeak ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem', fontWeight: 700 }}
                      >
                        <Target size={14} />
                        <span>{isWeak ? (language === 'or' ? 'ଅଭ୍ୟାସ ପ୍ରଦାନ' : 'Assign Practice') : (language === 'or' ? 'ପୁନରାବୃତ୍ତି' : 'Reassign')}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: LIVE SUBMISSIONS STREAM */}
        {activeTab === 'activity' && (
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                {language === 'or' ? 'ପ୍ରକୃତ ସମୟ କୁଇଜ୍ ସମନ୍ୱୟ ଇତିହାସ' : 'Live Synced Quiz Submissions Stream'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {language === 'or'
                  ? 'ଛାତ୍ରଛାତ୍ରୀମାନେ ଅଫଲାଇନ୍ କୁଇଜ୍ ଦେଇ ଅନଲାଇନ୍ ହେବା ମାତ୍ରେ ତଥ୍ୟ ଏଠାରେ ସମନ୍ୱିତ ହୁଏ।'
                  : 'Real-time log of idempotent quiz submissions synced from student devices.'}
              </p>
            </div>

            <div className="glass-card" style={{ padding: '1rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {(classSummary?.recentActivity || []).map((act) => (
                  <div
                    key={act.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-card)',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'var(--accent-green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-green)' }}>
                        <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                          {act.student_name} <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 400 }}>({act.class_section})</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          {act.lesson_title} · {act.subject}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800, color: 'var(--accent-green)', fontSize: '0.95rem' }}>
                          Score: {act.score} pts ({act.correct_answers}/{act.total_questions})
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {new Date(act.submitted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>

                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          background: 'var(--accent-orange-soft)',
                          color: 'var(--accent-orange-dark)',
                          border: '1px solid var(--border-accent)',
                        }}
                      >
                        Synced
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PUBLISH CLASS ASSIGNMENT */}
        {activeTab === 'assign' && (
          <div style={{ maxWidth: '640px' }}>
            <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <Send size={20} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {language === 'or' ? 'ଶ୍ରେଣୀ ଅଭ୍ୟାସ କାର୍ଯ୍ୟ ସୃଷ୍ଟି କରନ୍ତୁ' : 'Create & Publish STEM Assignment'}
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {language === 'or'
                      ? 'ନିର୍ଦ୍ଦିଷ୍ଟ ଶ୍ରେଣୀ କିମ୍ବା ସେକ୍ସନ ପାଇଁ ଲକ୍ଷ୍ୟଭିତ୍ତିକ କୁଇଜ୍ ଓ ପାଠ ପ୍ରଦାନ କରନ୍ତୁ।'
                      : 'Assign targeted lessons and practice quizzes to your classroom section.'}
                  </p>
                </div>
              </div>

              {assignmentSuccessMsg && (
                <div
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--accent-green-soft)',
                    color: 'var(--accent-green)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    marginBottom: '1.25rem',
                    border: '1px solid var(--accent-green)',
                  }}
                >
                  {assignmentSuccessMsg}
                </div>
              )}

              <form onSubmit={handlePublishAssignment} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                    {language === 'or' ? 'ଶ୍ରେଣୀ ସେକ୍ସନ୍ ଚୟନ କରନ୍ତୁ' : 'Target Class Section'}
                  </label>
                  <select
                    value={assignmentSection}
                    onChange={(e) => setAssignmentSection(e.target.value)}
                    className="form-select"
                  >
                    <option value="7-A">Class 7-A (STEM Focus Group)</option>
                    <option value="7-B">Class 7-B</option>
                    <option value="Grade 6">Grade 6 All</option>
                    <option value="Grade 8">Grade 8 All</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                    {language === 'or' ? 'ଅଭ୍ୟାସ ବିଷୟ / ପାଠ୍ୟକ୍ରମ' : 'STEM Topic Assignment'}
                  </label>
                  <select
                    value={assignmentTopic}
                    onChange={(e) => setAssignmentTopic(e.target.value)}
                    className="form-select"
                  >
                    <option value="topic-1">Physics: Force, Motion & Friction (ବଳ, ଗତି ଏବଂ ଘର୍ଷଣ)</option>
                    <option value="topic-3">Chemistry: Acids, Bases & Indicators (ଅମ୍ଳ, କ୍ଷାରକ ଏବଂ ସୂଚକ)</option>
                    <option value="topic-5">Biology: Plant Nutrition & Photosynthesis (ଉଦ୍ଭିଦରେ ପୋଷଣ)</option>
                    <option value="topic-7">Mathematics: Fractions & Ratios (ଭଗ୍ନାଂଶ ଓ ଅନୁପାତ)</option>
                    <option value="topic-2">Physics: Light & Reflection (ଆଲୋକ ଓ ପ୍ରତିଫଳନ)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                    {language === 'or' ? 'ସମାପନ ତାରିଖ (Due Date)' : 'Target Completion Due Date'}
                  </label>
                  <input
                    type="date"
                    value={assignmentDueDate}
                    onChange={(e) => setAssignmentDueDate(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div style={{ marginTop: '0.5rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', fontWeight: 800 }}>
                    <Send size={16} />
                    <span>{language === 'or' ? 'ଅଭ୍ୟାସ କାର୍ଯ୍ୟ ପ୍ରକାଶ କରନ୍ତୁ' : 'Publish Assignment to Class'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* STUDENT DRILL-DOWN MODAL */}
        {inspectStudent && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(6px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <div
              className="glass-card"
              style={{
                width: '100%',
                maxWidth: '560px',
                padding: '2rem',
                borderRadius: 'var(--radius-xl)',
                position: 'relative',
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
            >
              <button
                onClick={() => setInspectStudent(null)}
                style={{
                  position: 'absolute',
                  right: '1.25rem',
                  top: '1.25rem',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-full)',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                }}
              >
                <X size={16} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--primary-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--primary)',
                  }}
                >
                  {inspectStudent.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {inspectStudent.name}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Section {inspectStudent.class_section} · Grade {inspectStudent.grade || 7} · @{inspectStudent.email_or_username}
                  </div>
                </div>
              </div>

              {/* Student Summary Stats */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  background: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-card)',
                  textAlign: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Mastery</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                    {inspectStudent.mastery_percent}%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Points</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                    ⚡ {inspectStudent.total_points}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Lessons Done</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {inspectStudent.lessons_completed}
                  </div>
                </div>
              </div>

              {/* Recommended Focus */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {language === 'or' ? 'ଶିକ୍ଷକଙ୍କ ପରାମର୍ଶ ଓ ଦୁର୍ବଳ ଅଂଶ' : 'Teacher Guidance & Identified Weak Areas'}
                </h4>
                {inspectStudent.weak_topics && inspectStudent.weak_topics.length > 0 ? (
                  <div
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#ef4444',
                      fontSize: '0.85rem',
                    }}
                  >
                    ⚠️ <strong>Requires 1-on-1 Practice:</strong> Student struggled on <em>{inspectStudent.weak_topics.join(', ')}</em>. Recommend reviewing laboratory concept and re-taking quiz.
                  </div>
                ) : (
                  <div
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--accent-green-soft)',
                      border: '1px solid var(--accent-green)',
                      color: 'var(--accent-green)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    🌟 <strong>Excellent Progress:</strong> Student has achieved above 80% accuracy in all completed STEM modules!
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => {
                    setInspectStudent(null);
                    setAssignmentTopic('topic-3');
                    setActiveTab('assign');
                  }}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', fontWeight: 700 }}
                >
                  <Target size={15} />
                  <span>Assign Practice Quiz</span>
                </button>
                <button
                  onClick={() => setInspectStudent(null)}
                  className="btn btn-secondary"
                  style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', fontWeight: 700 }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // 2. STUDENT DASHBOARD VIEW
  // ==========================================
  return (
    <div className="page-container" style={{ paddingBottom: '4rem' }}>
      {/* Hero Welcome Banner */}
      <div
        className="glass-card"
        style={{
          padding: '2.25rem 2rem',
          background: 'linear-gradient(135deg, var(--bg-card-accent) 0%, var(--bg-surface) 100%)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-xl)',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'var(--accent-orange-soft)',
              padding: '0.3rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              marginBottom: '1rem',
              fontSize: '0.8rem',
              color: 'var(--accent-orange-dark)',
              fontWeight: 700,
              border: '1px solid var(--border-accent)',
            }}
          >
            <Sparkles size={14} color="var(--accent-orange)" />
            <span>SIH25048 · Odisha Smart Education · Offline Learning Loop</span>
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            {t('welcome')}, {user ? user.name : 'Student'}! 👋
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '680px', lineHeight: 1.6 }} className="font-odia">
            {language === 'or'
              ? 'ଖେଳ ବିଦ୍ୟା ହେଉଛି ୬-୯ ଶ୍ରେଣୀର ଗ୍ରାମୀଣ ଛାତ୍ରଛାତ୍ରୀଙ୍କ ପାଇଁ ଏକ ସମ୍ପୂର୍ଣ୍ଣ ଅଫଲାଇନ୍-ଅନୁକୂଳ STEM ଶିକ୍ଷଣ ପ୍ଲାଟଫର୍ମ।'
              : 'Khelo Vidya is a gamified, offline-first STEM education platform designed for rural students across Odisha.'}
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/adventure/photosynthesis')}
              style={{ fontWeight: 800 }}
            >
              <Sparkles size={18} />
              <span>{language === 'or' ? '🌱 ଆଲୋକସଂଶ୍ଳେଷଣ ଅଭିଯାନ' : '🌱 Play Photosynthesis Game'}</span>
            </button>
            <button className="btn btn-green" onClick={() => navigate('/lessons')}>
              <BookOpen size={18} />
              <span>{t('startLearning')}</span>
              <ArrowRight size={16} />
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/progress')}>
              <Award size={18} color="var(--accent-orange)" />
              <span>{t('myProgress')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Key Features & System Status */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.2rem', color: 'var(--text-primary)' }}>
        {language === 'or' ? 'ପ୍ଲାଟଫର୍ମ ବିଶେଷତା ଓ ସ୍ଥିତି' : 'Platform Capabilities & Architecture'}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {/* Card 1: Offline First PWA */}
        <div className="glass-card" style={{ padding: '1.75rem 1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--accent-green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-green)' }}>
            <CheckCircle2 size={24} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }} className="font-odia">
            {language === 'or' ? 'ଅଫଲାଇନ୍ ସୁବିଧା (PWA)' : 'Offline-First Service Worker'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55 }} className="font-odia">
            {language === 'or'
              ? 'ଇଣ୍ଟରନେଟ୍ ନ ଥିଲେ ମଧ୍ୟ ସମସ୍ତ ପାଠ୍ୟଖସଡା ଓ କୁଇଜ୍ ନିରନ୍ତର କାର୍ଯ୍ୟକ୍ଷମ ରହେ।'
              : 'Lessons and quizzes work 100% offline. App shell cached via Workbox precache.'}
          </p>
          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-green)', fontSize: '0.82rem', fontWeight: 700 }}>
            <Zap size={14} /> Active & Pre-cached
          </div>
        </div>

        {/* Card 2: Idempotent Sync & Data Integrity */}
        <div className="glass-card" style={{ padding: '1.75rem 1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--accent-orange-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-orange)' }}>
            <ShieldCheck size={24} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }} className="font-odia">
            {language === 'or' ? 'ତ୍ରୁଟିମୁକ୍ତ ସମନ୍ୱୟ (Idempotent Sync)' : 'Zero-Duplication Sync Log'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55 }} className="font-odia">
            {language === 'or'
              ? 'କ୍ଲାଏଣ୍ଟ-ଜେନେରେଟେଡ୍ UUID ମାଧ୍ୟମରେ ସ୍କୋର ଓ ପ୍ରୟାସ କେବେହେଲେ ଦୁଇଥର ଗଣନା ହୁଏନାହିଁ।'
              : 'Client-generated attemptUUID prevents duplicate score counting on network reconnects.'}
          </p>
          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-orange)', fontSize: '0.82rem', fontWeight: 700 }}>
            <Database size={14} /> Dexie.js Store Initialized
          </div>
        </div>

        {/* Card 3: Odia Localization */}
        <div className="glass-card" style={{ padding: '1.75rem 1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--accent-gold-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-gold)' }}>
            <Award size={24} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }} className="font-odia">
            {language === 'or' ? 'ଓଡ଼ିଆ ପ୍ରାଥମିକତା (Bhashini)' : 'Odia-First STEM Content'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55 }} className="font-odia">
            {language === 'or'
              ? 'ଓଡ଼ିଶା ରାଜ୍ୟ ପାଠ୍ୟକ୍ରମ ଅନୁସାରେ ଓଡ଼ିଆରେ ସରଳ ଭାଷାରେ ବିଜ୍ଞାନ ଓ ଗଣିତ।'
              : 'Pre-translated STEM concepts with instant Odia / English toggle for seamless comprehension.'}
          </p>
          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-gold)', fontSize: '0.82rem', fontWeight: 700 }}>
            <Sparkles size={14} /> Odia & English Ready
          </div>
        </div>
      </div>
    </div>
  );
};

