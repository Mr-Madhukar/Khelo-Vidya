import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, School as SchoolIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { apiRequest } from '../services/api.ts';
import { School, UserRole } from '../types/index.ts';

export const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<UserRole>('student');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [grade, setGrade] = useState<number>(7);
  const [classSection, setClassSection] = useState('A');
  const [schoolId, setSchoolId] = useState('');
  const [schools, setSchools] = useState<School[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await apiRequest<{ success: boolean; schools: School[] }>('/auth/schools');
        if (res.success && res.schools.length > 0) {
          setSchools(res.schools);
          setSchoolId(res.schools[0].id);
        }
      } catch {
        setSchools([
          { id: '21170100101-demo', name: 'Govt. High School, Khordha', udise_code: '21170100101', district: 'Khordha' },
          { id: '21190200302-demo', name: 'Biju Patnaik High School, Ganjam', udise_code: '21190200302', district: 'Ganjam' },
          { id: '21070300403-demo', name: 'Mayurbhanj Tribal Model School, Baripada', udise_code: '21070300403', district: 'Mayurbhanj' },
          { id: '21260400504-demo', name: 'Kalahandi Model Vidyalaya, Bhawanipatna', udise_code: '21260400504', district: 'Kalahandi' },
        ]);
      }
    };
    fetchSchools();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await register({
        role,
        name,
        email_or_username: username,
        password,
        grade: role === 'student' ? grade : null,
        class_section: classSection,
        school_id: schoolId || null,
        language_pref: language,
      });
      navigate('/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 120px)' }}>
      <div
        className="glass-card auth-wrapper"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '2.25rem 2rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-card)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img
            src="/android-chrome-192x192.png"
            alt="Khelo Vidya Logo"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              margin: '0 auto 0.75rem auto',
              display: 'block',
              boxShadow: '0 4px 14px var(--accent-orange-glow)',
            }}
          />
          <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            {t('register')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }} className="font-odia">
            {language === 'or' ? 'ନୂତନ ଖାତା ସୃଷ୍ଟି କରନ୍ତୁ' : 'Create your STEM learning account'}
          </p>
        </div>

        {/* Role Toggle Selector */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem',
            background: 'var(--bg-surface)',
            padding: '0.35rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-card)',
            marginBottom: '1.25rem',
          }}
        >
          <button
            type="button"
            className="btn"
            style={{
              minHeight: '38px',
              padding: '0.4rem',
              fontSize: '0.88rem',
              fontWeight: 700,
              background: role === 'student' ? 'var(--accent-orange)' : 'transparent',
              color: role === 'student' ? '#ffffff' : 'var(--text-secondary)',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
            }}
            onClick={() => setRole('student')}
          >
            {t('student')}
          </button>
          <button
            type="button"
            className="btn"
            style={{
              minHeight: '38px',
              padding: '0.4rem',
              fontSize: '0.88rem',
              fontWeight: 700,
              background: role === 'teacher' ? 'var(--primary)' : 'transparent',
              color: role === 'teacher' ? '#ffffff' : 'var(--text-secondary)',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
            }}
            onClick={() => setRole('teacher')}
          >
            {t('teacher')}
          </button>
        </div>

        {error && (
          <div
            style={{
              background: 'var(--danger-bg)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              color: 'var(--danger)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">{t('fullName')}</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Subhashree Dash"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('username')}</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. subhashree_7"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('password')}</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {role === 'student' && (
            <div className="grid-cols-2">
              <div className="form-group">
                <label className="form-label">{t('grade')}</label>
                <select
                  className="form-select"
                  value={grade}
                  onChange={(e) => setGrade(parseInt(e.target.value, 10))}
                >
                  <option value={6}>Grade 6 (ଷଷ୍ଠ ଶ୍ରେଣୀ)</option>
                  <option value={7}>Grade 7 (ସପ୍ତମ ଶ୍ରେଣୀ)</option>
                  <option value={8}>Grade 8 (ଅଷ୍ଟମ ଶ୍ରେଣୀ)</option>
                  <option value={9}>Grade 9 (ନବମ ଶ୍ରେଣୀ)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Section / ସେକ୍ସନ</label>
                <input
                  type="text"
                  className="form-input"
                  value={classSection}
                  onChange={(e) => setClassSection(e.target.value)}
                  placeholder="A"
                  maxLength={5}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <SchoolIcon size={15} color="var(--accent-orange)" />
              {t('school')}
            </label>
            <select
              className="form-select"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
            >
              {schools.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.district})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={submitting}
            style={{ marginTop: '0.75rem', fontWeight: 700 }}
          >
            {submitting ? 'Creating account...' : t('register')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Already registered?{' '}
          <Link to="/login" style={{ color: 'var(--accent-orange)', fontWeight: 700, textDecoration: 'none' }}>
            {t('login')}
          </Link>
        </div>
      </div>
    </div>
  );
};
