import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Sparkles, User, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed. Please check credentials.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemoLogin = (role: 'student' | 'teacher') => {
    setError(null);
    if (role === 'student') {
      setUsername('subhashree_7');
      setPassword('password123');
    } else {
      setUsername('teacher_pradeep');
      setPassword('password123');
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 120px)' }}>
      <div
        className="glass-card auth-wrapper"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '2.25rem 2rem',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-card)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
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
            {t('login')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }} className="font-odia">
            {language === 'or'
              ? 'ଓଡ଼ିଶା ଗ୍ରାମୀଣ STEM ଶିକ୍ଷା ପୋର୍ଟାଲ୍'
              : 'Odisha Rural STEM Education Portal'}
          </p>
        </div>

        {/* Quick Demo Fill Buttons */}
        <div style={{ marginBottom: '1.25rem', background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-orange)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Sparkles size={13} />
            <span>QUICK DEMO ACCOUNTS</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleQuickDemoLogin('student')}
              style={{ minHeight: '34px', padding: '0.25rem 0.5rem', fontSize: '0.78rem' }}
            >
              <User size={13} color="var(--primary)" />
              <span>Student (୭ମ)</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleQuickDemoLogin('teacher')}
              style={{ minHeight: '34px', padding: '0.25rem 0.5rem', fontSize: '0.78rem' }}
            >
              <GraduationCap size={14} color="var(--accent-orange)" />
              <span>Teacher (ଶିକ୍ଷକ)</span>
            </button>
          </div>
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
              marginBottom: '1.25rem',
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">{t('username')}</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. subhashree_7 or anita_grade7"
              required
              autoFocus
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

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={submitting}
            style={{ marginTop: '0.5rem', fontWeight: 700 }}
          >
            {submitting ? 'Signing in...' : t('login')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--accent-orange)', fontWeight: 700, textDecoration: 'none' }}>
            {t('register')}
          </Link>
        </div>
      </div>
    </div>
  );
};
