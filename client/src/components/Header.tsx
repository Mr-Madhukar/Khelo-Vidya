import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Globe,
  LogOut,
  User as UserIcon,
  Sun,
  Moon,
  Sparkles,
  BookOpen,
  LayoutDashboard,
  Award,
  Menu,
  X,
  LogIn,
  UserPlus,
  Compass,
  Layers,
  HelpCircle,
  Users,
  CheckCircle2,
} from 'lucide-react';
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleLanguage = () => {
    setLanguage(language === 'or' ? 'en' : 'or');
  };

  const handleLogout = async () => {
    setMobileMenuOpen(false);
    await logout();
    navigate('/login');
  };

  const isLandingPage = location.pathname === '/';

  return (
    <>
      <header className="header-container">
        {/* Brand / Logo */}
        <Link to={user ? '/dashboard' : '/'} className="header-brand">
          <img
            src="/android-chrome-192x192.png"
            alt="Khelo Vidya Logo"
            className="brand-logo-img"
          />
          <div className="brand-text-container">
            <div className="brand-title">
              <span className="brand-name font-odia">{t('appName')}</span>
            </div>
            <div className="brand-subtitle font-odia">
              {language === 'or' ? 'ଗ୍ରାମୀଣ STEM ଶିକ୍ଷା (୬-୯)' : 'Rural STEM (Grades 6–9)'}
            </div>
          </div>
        </Link>

        {/* Center Navigation - Desktop only (Landing page anchors or app nav) */}
        {!user && isLandingPage ? (
          <nav className="desktop-only-nav">
            <a href="#problem" className="nav-link">
              {language === 'or' ? 'ସମସ୍ୟା' : 'The Problem'}
            </a>
            <a href="#features" className="nav-link">
              {language === 'or' ? 'ବିଶେଷତା' : 'Features'}
            </a>
            <a href="#compare" className="nav-link">
              {language === 'or' ? 'ତୁଳନା' : 'Comparison'}
            </a>
            <a href="#how-it-works" className="nav-link">
              {language === 'or' ? 'କାର୍ଯ୍ୟପ୍ରଣାଳୀ' : 'How it Works'}
            </a>
            <a href="#teachers" className="nav-link">
              {language === 'or' ? 'ଶିକ୍ଷକଙ୍କ ପାଇଁ' : 'For Teachers'}
            </a>
          </nav>
        ) : user ? (
          <nav className="desktop-only-nav">
            <Link
              to="/dashboard"
              className={`btn btn-secondary nav-btn ${location.pathname === '/dashboard' ? 'nav-btn-active' : ''}`}
            >
              <LayoutDashboard size={15} />
              <span>{language === 'or' ? 'ଡ୍ୟାସବୋର୍ଡ' : 'Dashboard'}</span>
            </Link>
            <Link
              to="/lessons"
              className={`btn btn-secondary nav-btn ${location.pathname.startsWith('/lessons') ? 'nav-btn-active' : ''}`}
            >
              <BookOpen size={15} />
              <span>{language === 'or' ? 'ପାଠ୍ୟଖସଡ଼ା' : 'Lessons'}</span>
            </Link>
            <Link
              to="/progress"
              className={`btn btn-secondary nav-btn ${location.pathname === '/progress' ? 'nav-btn-active' : ''}`}
            >
              <Award size={15} />
              <span>{language === 'or' ? 'ପ୍ରଗତି' : 'Progress'}</span>
            </Link>
          </nav>
        ) : null}

        {/* Right Controls: Online Status, Language, Theme, Auth, Mobile Menu Toggle */}
        <div className="header-actions">
          {/* Demo button if guest (desktop only) */}
          {!user && (
            <Link
              to="/adventure/photosynthesis"
              className="btn btn-secondary desktop-only-demo"
            >
              <Sparkles size={14} color="var(--accent-orange)" />
              <span>{language === 'or' ? 'ଡେମୋ ଖେଳ' : 'Demo Game'}</span>
            </Link>
          )}

          {/* Offline / Online network badge */}
          <OfflineBadge />

          {/* Language switcher button */}
          <button
            onClick={toggleLanguage}
            className="btn btn-secondary header-lang-btn"
            title="Switch Language / ଭାଷା ପରିବର୍ତ୍ତନ କରନ୍ତୁ"
            aria-label="Toggle language"
          >
            <Globe size={15} />
            <span className="lang-text-desktop">{language === 'or' ? 'English' : 'ଓଡ଼ିଆ'}</span>
            <span className="lang-text-mobile">{language === 'or' ? 'EN' : 'ଓଡ଼ି'}</span>
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label="Toggle light or dark theme"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Desktop User Profile / Login Button */}
          <div className="desktop-only-auth">
            {user ? (
              <div className="user-profile-group">
                <div className="user-profile-pill" title={user.name}>
                  <UserIcon size={14} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <span className="user-profile-name">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary btn-icon-only"
                  title={t('logout')}
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-header-login">
                {t('login')}
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle Button (Visible on <= 900px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle-btn"
            aria-label="Open mobile navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="mobile-nav-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
            {/* Drawer Header */}
            <div className="mobile-drawer-header">
              <div className="mobile-drawer-brand">
                <img
                  src="/android-chrome-192x192.png"
                  alt="Khelo Vidya"
                  style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)' }}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }} className="font-odia">
                    {t('appName')}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }} className="font-odia">
                    {language === 'or' ? 'ଗ୍ରାମୀଣ STEM ଶିକ୍ଷା' : 'Rural STEM Platform'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-drawer-close"
                aria-label="Close navigation"
              >
                <X size={18} />
              </button>
            </div>

            {/* Logged-in User Profile Banner inside Drawer */}
            {user && (
              <div className="mobile-user-card">
                <div className="mobile-user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="mobile-user-name">{user.name}</div>
                  <div className="mobile-user-meta font-odia">
                    {user.role === 'teacher'
                      ? (language === 'or' ? 'ଶିକ୍ଷକ / Facilitator' : 'Teacher / Facilitator')
                      : (language === 'or' ? `${user.grade || 7}ମ ଶ୍ରେଣୀ · Section ${user.class_section || 'A'}` : `Grade ${user.grade || 7} · Section ${user.class_section || 'A'}`)}
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Nav Links Section */}
            <div className="mobile-drawer-links">
              {user ? (
                <>
                  <div className="mobile-nav-section-title">
                    {language === 'or' ? 'ମୁଖ୍ୟ ମେନୁ' : 'Main Menu'}
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`mobile-drawer-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                  >
                    <LayoutDashboard size={18} />
                    <span>{language === 'or' ? 'ଡ୍ୟାସବୋର୍ଡ' : 'Dashboard'}</span>
                  </Link>

                  <Link
                    to="/lessons"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`mobile-drawer-link ${location.pathname.startsWith('/lessons') ? 'active' : ''}`}
                  >
                    <BookOpen size={18} />
                    <span>{language === 'or' ? 'ପାଠ୍ୟଖସଡ଼ା ଏବଂ କୁଇଜ୍' : 'Lessons & Quizzes'}</span>
                  </Link>

                  <Link
                    to="/progress"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`mobile-drawer-link ${location.pathname === '/progress' ? 'active' : ''}`}
                  >
                    <Award size={18} />
                    <span>{language === 'or' ? 'ମୋର ପ୍ରଗତି ଏବଂ ବ୍ୟାଜ୍' : 'My Progress & Badges'}</span>
                  </Link>
                </>
              ) : (
                <>
                  <div className="mobile-nav-section-title">
                    {language === 'or' ? 'ପ୍ଲାଟଫର୍ମ ବିଷୟରେ' : 'About Platform'}
                  </div>
                  {isLandingPage ? (
                    <>
                      <a
                        href="#problem"
                        onClick={() => setMobileMenuOpen(false)}
                        className="mobile-drawer-link"
                      >
                        <Compass size={18} />
                        <span>{language === 'or' ? 'ଗ୍ରାମୀଣ ସମସ୍ୟା ଓ ସମାଧାନ' : 'The Problem'}</span>
                      </a>
                      <a
                        href="#features"
                        onClick={() => setMobileMenuOpen(false)}
                        className="mobile-drawer-link"
                      >
                        <Layers size={18} />
                        <span>{language === 'or' ? 'ପ୍ରମୁଖ ବିଶେଷତା' : 'Features'}</span>
                      </a>
                      <a
                        href="#compare"
                        onClick={() => setMobileMenuOpen(false)}
                        className="mobile-drawer-link"
                      >
                        <CheckCircle2 size={18} />
                        <span>{language === 'or' ? 'ଅନ୍ୟାନ୍ୟ ଆପ୍ ସହ ତୁଳନା' : 'Comparison'}</span>
                      </a>
                      <a
                        href="#how-it-works"
                        onClick={() => setMobileMenuOpen(false)}
                        className="mobile-drawer-link"
                      >
                        <HelpCircle size={18} />
                        <span>{language === 'or' ? 'କାର୍ଯ୍ୟପ୍ରଣାଳୀ' : 'How it Works'}</span>
                      </a>
                      <a
                        href="#teachers"
                        onClick={() => setMobileMenuOpen(false)}
                        className="mobile-drawer-link"
                      >
                        <Users size={18} />
                        <span>{language === 'or' ? 'ଶିକ୍ଷକ ଓ ସ୍କୁଲ୍ ପାଇଁ' : 'For Teachers & Schools'}</span>
                      </a>
                    </>
                  ) : (
                    <Link
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mobile-drawer-link"
                    >
                      <Compass size={18} />
                      <span>{language === 'or' ? 'ମୁଖ୍ୟ ପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ' : 'Back to Home'}</span>
                    </Link>
                  )}
                </>
              )}

              {/* STEM Game Demo CTA */}
              <div style={{ marginTop: '0.75rem' }}>
                <Link
                  to="/adventure/photosynthesis"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontWeight: 700, padding: '0.8rem' }}
                >
                  <Sparkles size={18} />
                  <span>{language === 'or' ? '🌱 ଡେମୋ ଖେଳ ଖେଳନ୍ତୁ' : '🌱 Play Demo Game'}</span>
                </Link>
              </div>
            </div>

            {/* Mobile Drawer Footer: Auth Actions */}
            <div className="mobile-drawer-footer">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary btn-full"
                  style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                >
                  <LogOut size={16} />
                  <span>{t('logout')}</span>
                </button>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', width: '100%' }}>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-secondary"
                    style={{ justifyContent: 'center' }}
                  >
                    <LogIn size={15} />
                    <span>{t('login')}</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-primary"
                    style={{ justifyContent: 'center' }}
                  >
                    <UserPlus size={15} />
                    <span>{t('register')}</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
