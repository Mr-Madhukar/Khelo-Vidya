import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Globe, LogOut, User as UserIcon, Sun, Moon, Sparkles, BookOpen, LayoutDashboard, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useTheme } from '../context/ThemeContext.tsx';
import { OfflineBadge } from './OfflineBadge.tsx';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === 'or' ? 'en' : 'or');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isLandingPage = location.pathname === '/';

  return (
    <header className="header-container">
      {/* Brand / Logo */}
      <Link to={user ? '/dashboard' : '/'} className="header-brand" style={{ flexShrink: 0 }}>
        <img
          src="/android-chrome-192x192.png"
          alt="Khelo Vidya Logo"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-sm)',
            objectFit: 'contain',
            boxShadow: '0 2px 8px var(--accent-orange-glow)',
          }}
        />
        <div>
          <div className="brand-title">
            <span style={{ fontWeight: 800 }}>{t('appName')}</span>
            <span
              style={{
                fontSize: '0.68rem',
                padding: '0.15rem 0.45rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--accent-orange-soft)',
                color: 'var(--accent-orange-dark)',
                fontWeight: 700,
                letterSpacing: '0.02em',
              }}
            >
              SIH25048
            </span>
          </div>
          <div className="brand-subtitle font-odia" style={{ fontSize: '0.72rem', whiteSpace: 'nowrap' }}>
            {language === 'or' ? 'ଗ୍ରାମୀଣ STEM ଶିକ୍ଷା (୬-୯)' : 'Rural STEM (Grades 6–9)'}
          </div>
        </div>
      </Link>

      {/* Center Navigation - Landing page anchors for guests, or app nav for logged-in users */}
      {!user && isLandingPage ? (
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            fontSize: '0.88rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
          className="desktop-only-nav"
        >
          <a
            href="#problem"
            style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            {language === 'or' ? 'ସମସ୍ୟା' : 'The Problem'}
          </a>
          <a
            href="#features"
            style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            {language === 'or' ? 'ବିଶେଷତା' : 'Features'}
          </a>
          <a
            href="#compare"
            style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            {language === 'or' ? 'ତୁଳନା' : 'Comparison'}
          </a>
          <a
            href="#how-it-works"
            style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            {language === 'or' ? 'କାର୍ଯ୍ୟପ୍ରଣାଳୀ' : 'How it Works'}
          </a>
          <a
            href="#teachers"
            style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            {language === 'or' ? 'ଶିକ୍ଷକଙ୍କ ପାଇଁ' : 'For Teachers'}
          </a>
        </nav>
      ) : user ? (
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.88rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
          className="desktop-only-nav"
        >
          <Link
            to="/dashboard"
            className="btn btn-secondary"
            style={{
              minHeight: '36px',
              padding: '0.35rem 0.85rem',
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              background: location.pathname === '/dashboard' || location.pathname === '/' ? 'var(--accent-orange-soft)' : 'var(--bg-surface)',
              color: location.pathname === '/dashboard' || location.pathname === '/' ? 'var(--accent-orange-dark)' : 'var(--text-primary)',
              borderColor: location.pathname === '/dashboard' || location.pathname === '/' ? 'var(--border-accent)' : 'var(--border-card)',
            }}
          >
            <LayoutDashboard size={15} />
            <span>{language === 'or' ? 'ଡ୍ୟାସବୋର୍ଡ' : 'Dashboard'}</span>
          </Link>
          <Link
            to="/lessons"
            className="btn btn-secondary"
            style={{
              minHeight: '36px',
              padding: '0.35rem 0.85rem',
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              background: location.pathname.startsWith('/lessons') ? 'var(--accent-orange-soft)' : 'var(--bg-surface)',
              color: location.pathname.startsWith('/lessons') ? 'var(--accent-orange-dark)' : 'var(--text-primary)',
              borderColor: location.pathname.startsWith('/lessons') ? 'var(--border-accent)' : 'var(--border-card)',
            }}
          >
            <BookOpen size={15} />
            <span>{language === 'or' ? 'ପାଠ୍ୟଖସଡ଼ା' : 'Lessons'}</span>
          </Link>
          <Link
            to="/progress"
            className="btn btn-secondary"
            style={{
              minHeight: '36px',
              padding: '0.35rem 0.85rem',
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              background: location.pathname === '/progress' ? 'var(--accent-orange-soft)' : 'var(--bg-surface)',
              color: location.pathname === '/progress' ? 'var(--accent-orange-dark)' : 'var(--text-primary)',
              borderColor: location.pathname === '/progress' ? 'var(--border-accent)' : 'var(--border-card)',
            }}
          >
            <Award size={15} />
            <span>{language === 'or' ? 'ପ୍ରଗତି' : 'Progress'}</span>
          </Link>
        </nav>
      ) : null}

      {/* Right Controls: Online, Language, Theme, Auth */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        {/* Demo button if guest */}
        {!user && (
          <Link
            to="/adventure/photosynthesis"
            className="btn btn-secondary"
            style={{
              minHeight: '36px',
              padding: '0.35rem 0.75rem',
              fontSize: '0.85rem',
              borderColor: 'var(--border-accent)',
              color: 'var(--accent-orange)',
              whiteSpace: 'nowrap',
            }}
          >
            <Sparkles size={14} />
            <span className="hide-on-mobile">{language === 'or' ? 'ଡେମୋ ଖେଳ' : 'Demo Game'}</span>
          </Link>
        )}

        {/* Offline / Online network badge */}
        <OfflineBadge />

        {/* Language switcher button */}
        <button
          onClick={toggleLanguage}
          className="btn btn-secondary"
          style={{ padding: '0.4rem 0.65rem', minHeight: '36px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
          title="Switch Language / ଭାଷା ପରିବର୍ତ୍ତନ କରନ୍ତୁ"
        >
          <Globe size={15} />
          <span>{language === 'or' ? 'English' : 'ଓଡ଼ିଆ'}</span>
        </button>

        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          aria-label="Toggle light or dark theme"
        >
          {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
        </button>

        {/* User profile / Logout / Login */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'var(--bg-surface)',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-card)',
                whiteSpace: 'nowrap',
                maxWidth: '160px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={user.name}
            >
              <UserIcon size={14} color="var(--primary)" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.name}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.55rem', minHeight: '36px' }}
              title={t('logout')}
            >
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-primary"
            style={{ padding: '0.4rem 1rem', minHeight: '36px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
          >
            {t('login')}
          </Link>
        )}
      </div>
    </header>
  );
};
