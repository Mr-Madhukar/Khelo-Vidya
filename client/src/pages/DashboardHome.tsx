import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Award, Sparkles, CheckCircle2, ShieldCheck, Zap, ArrowRight, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';

export const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const isTeacher = user?.role === 'teacher' || user?.role === 'admin' || user?.role === 'department';

  return (
    <div className="page-container">
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
              <span>{isTeacher ? t('teacherDashboard') : t('startLearning')}</span>
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
