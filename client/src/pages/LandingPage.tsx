import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  WifiOff,
  Languages,
  Sliders,
  Activity,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Play,
  Volume2,
  Flame,
  Award,
  Users,
  ShieldCheck,
  Zap,
  Download,
  Layers,
  ChevronRight,
  Sun,
  Moon,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useTheme } from '../context/ThemeContext.tsx';

export const LandingPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Interactive Mini-Demo Simulation State in the Hero Mockup
  const [sunlight, setSunlight] = useState<number>(60);
  const [water, setWater] = useState<number>(40);
  const [co2, setCo2] = useState<number>(50);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [showBadgePopup, setShowBadgePopup] = useState<boolean>(true);

  // Calculate simulated photosynthesis reaction efficiency
  const reactionScore = Math.min(100, Math.round((sunlight + water + co2) / 3));
  const isGlucoseReady = reactionScore >= 80;

  const handleAddSunlight = () => setSunlight((prev) => Math.min(100, prev + 20));
  const handleAddWater = () => setWater((prev) => Math.min(100, prev + 20));
  const handleAddCO2 = () => setCo2((prev) => Math.min(100, prev + 20));

  const handleToggleVoice = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <div className="landing-wrapper">
      {/* ====================================================================
          1. HERO SECTION
          ==================================================================== */}
      <section className="landing-section" style={{ paddingTop: '1.5rem' }}>
        <div className="hero-container">
          {/* Left Column: Headline, Subhead, CTAs & Value Props */}
          <div>
            {/* Trust Pill / Government Initiative Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--accent-orange-soft)',
                border: '1px solid var(--border-accent)',
                color: 'var(--accent-orange-dark)',
                fontSize: '0.82rem',
                fontWeight: 700,
                marginBottom: '1.25rem',
              }}
            >
              <Sparkles size={15} color="var(--accent-orange)" />
              <span>
                {language === 'or'
                  ? '🇮🇳 SIH25048 · ଓଡ଼ିଶା ବିଦ୍ୟାଳୟ ଓ ଗଣଶିକ୍ଷା ବିଭାଗ ଅନୁମୋଦିତ'
                  : '🇮🇳 SIH25048 · Odisha School & Mass Education Initiative'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-headline font-odia">
              {language === 'or' ? (
                <>
                  ଇଣ୍ଟରନେଟ୍ ବିନା ମଧ୍ୟ <br />
                  <span className="hero-headline-highlight">ସମ୍ପୂର୍ଣ୍ଣ କାର୍ଯ୍ୟକ୍ଷମ</span> STEM ଶିକ୍ଷା
                </>
              ) : (
                <>
                  STEM Learning That <br />
                  <span className="hero-headline-highlight">Works Without Internet</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="hero-subhead font-odia">
              {language === 'or'
                ? 'ଓଡ଼ିଆ ପ୍ରାଥମିକତା, ଖେଳ ମାଧ୍ୟମରେ ଆନନ୍ଦଦାୟକ ଅନୁଭୂତି ଏବଂ ସମ୍ପୂର୍ଣ୍ଣ ଅଫଲାଇନ୍। ୬ଷ୍ଠରୁ ୯ମ ଶ୍ରେଣୀର ଗ୍ରାମୀଣ ଛାତ୍ରଛାତ୍ରୀଙ୍କ ପାଇଁ ସରଳ ବିଜ୍ଞାନ ଓ ଗଣିତ ଶିକ୍ଷଣ ପ୍ଲାଟଫର୍ମ।'
                : 'Odia-first, gamified, and 100% offline-ready. Engineered specifically for rural government school students (grades 6–9) across Odisha.'}
            </p>

            {/* CTAs */}
            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate('/adventure/photosynthesis')}
                style={{ fontSize: '1.05rem', padding: '0.85rem 1.6rem', fontWeight: 700 }}
              >
                <Play size={18} fill="currentColor" />
                <span>{language === 'or' ? 'ଡେମୋ ପାଠ ଖେଳନ୍ତୁ (Demo)' : 'Try a Demo Lesson'}</span>
              </button>

              <a
                href="#teachers"
                className="btn btn-secondary"
                style={{ fontSize: '1rem', padding: '0.85rem 1.4rem' }}
              >
                <Users size={18} color="var(--primary)" />
                <span>{language === 'or' ? 'ଶିକ୍ଷକଙ୍କ ପାଇଁ (For Teachers)' : 'For Teachers & Schools'}</span>
              </a>
            </div>

            {/* Key Capability Badges */}
            <div className="hero-features-list">
              <div className="hero-feature-item">
                <CheckCircle2 size={16} color="var(--accent-green)" />
                <span>{language === 'or' ? 'ଶ୍ରେଣୀଗୃହରେ 0 KB ଡାଟା' : '0 KB Data in Class'}</span>
              </div>
              <div className="hero-feature-item">
                <CheckCircle2 size={16} color="var(--accent-green)" />
                <span>{language === 'or' ? 'ସ୍ୱଦେଶୀ ଓଡ଼ିଆ ଭଏସ୍' : 'Native Odia Audio'}</span>
              </div>
              <div className="hero-feature-item">
                <CheckCircle2 size={16} color="var(--accent-green)" />
                <span>{language === 'or' ? 'କୌଣସି ବିଷାକ୍ତ ଲିଡରବୋର୍ଡ ନାହିଁ' : 'Zero Toxic Ranks'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Android Device Mockup */}
          <div className="mockup-wrapper">
            <div className="device-frame">
              {/* Speaker Notch */}
              <div className="device-notch" />

              {/* Screen Container */}
              <div className="device-screen">
                {/* Mobile Status Bar */}
                <div className="mockup-status-bar">
                  <span>10:30 AM</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ color: 'var(--success)', fontSize: '0.68rem', fontWeight: 700 }}>
                      ● Offline PWA
                    </span>
                    <span>92% 🔋</span>
                  </div>
                </div>

                {/* In-Game Top Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'var(--bg-surface)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Award size={16} color="var(--accent-orange)" />
                    <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>+140 XP</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-orange)' }}>
                    <Flame size={15} fill="currentColor" />
                    <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>4 Days</span>
                  </div>

                  <button
                    onClick={handleToggleVoice}
                    style={{
                      background: isAudioPlaying ? 'var(--accent-orange)' : 'var(--bg-card)',
                      color: isAudioPlaying ? '#ffffff' : 'var(--text-primary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '0.25rem 0.45rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      cursor: 'pointer',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                    }}
                    title="Audio Narration"
                  >
                    <Volume2 size={13} />
                    <span>{isAudioPlaying ? 'Speaking...' : 'ଓଡ଼ିଆ Audio'}</span>
                  </button>
                </div>

                {/* Mini STEM Quest Card */}
                <div
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-orange)' }}>
                      MISSION 2: LIGHT REACTION
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Class 7 Science</span>
                  </div>

                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                    {language === 'or' ? 'ଆଲୋକସଂଶ୍ଳେଷଣ ପ୍ରକ୍ରିୟା ପୂରଣ କରନ୍ତୁ 🌱' : 'Balance Photosynthesis Elements 🌱'}
                  </div>

                  {/* Leaf Simulation Reaction Box */}
                  <div
                    style={{
                      background: 'var(--bg-surface)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.65rem',
                      textAlign: 'center',
                      border: '1px dashed var(--border-accent)',
                    }}
                  >
                    <div style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>
                      {isGlucoseReady ? '🌿 ✨ 🍃' : '🌱 💧 ☀️'}
                    </div>

                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                      {reactionScore}% Reaction Balanced
                    </div>

                    {/* Progress Bar */}
                    <div
                      style={{
                        height: '6px',
                        background: 'var(--border-subtle)',
                        borderRadius: 'var(--radius-full)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${reactionScore}%`,
                          background: 'linear-gradient(90deg, var(--accent-orange) 0%, var(--primary) 100%)',
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>
                  </div>

                  {/* Interactive Ingredients Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                    <button
                      onClick={handleAddSunlight}
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.2rem', minHeight: '34px', fontSize: '0.75rem', flexDirection: 'column', gap: '0.1rem' }}
                    >
                      <span>☀️ ସୂର୍ଯ୍ୟାଲୋକ</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--accent-orange)' }}>{sunlight}%</span>
                    </button>
                    <button
                      onClick={handleAddWater}
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.2rem', minHeight: '34px', fontSize: '0.75rem', flexDirection: 'column', gap: '0.1rem' }}
                    >
                      <span>💧 ଜଳ (H₂O)</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--primary)' }}>{water}%</span>
                    </button>
                    <button
                      onClick={handleAddCO2}
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.2rem', minHeight: '34px', fontSize: '0.75rem', flexDirection: 'column', gap: '0.1rem' }}
                    >
                      <span>💨 ଅଙ୍ଗାରକାମ୍ଳ</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)' }}>{co2}%</span>
                    </button>
                  </div>
                </div>

                {/* Odia Hint Box */}
                <div
                  style={{
                    background: 'var(--accent-orange-soft)',
                    border: '1px solid var(--border-accent)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.6rem',
                    fontSize: '0.78rem',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.4rem',
                  }}
                >
                  <Sparkles size={14} color="var(--accent-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span className="font-odia">
                    {language === 'or'
                      ? 'ଟିପ୍ପଣୀ: ପତ୍ରହରିତ ସୂର୍ଯ୍ୟାଲୋକକୁ ଶକ୍ତିରେ ପରିଣତ କରି ଗ୍ଲୁକୋଜ୍ ପ୍ରସ୍ତୁତ କରେ।'
                      : 'Hint: Chlorophyll absorbs sunlight to synthesize glucose and release oxygen.'}
                  </span>
                </div>

                {/* Badge Unlocked Celebration Toast inside mockup */}
                {showBadgePopup && (
                  <div
                    style={{
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-card)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.5rem 0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-md)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>🌿</span>
                      <div>
                        <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-orange)' }}>
                          {language === 'or' ? 'ପତ୍ର ପ୍ରବୀଣ ବ୍ୟାଜ୍ ଅର୍ଜିତ!' : 'Leaf Master Unlocked!'}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                          +50 Mastery Points
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowBadgePopup(false)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Jump to Full Game Button */}
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/adventure/photosynthesis')}
                  style={{ minHeight: '38px', padding: '0.4rem', fontSize: '0.82rem', marginTop: 'auto' }}
                >
                  <span>{language === 'or' ? 'ସମ୍ପୂର୍ଣ୍ଣ ଖେଳ ଖେଳନ୍ତୁ' : 'Launch Full Game Experience'}</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. THE PROBLEM SECTION
          ==================================================================== */}
      <section id="problem" className="landing-section">
        <div className="section-header">
          <div className="section-tag">
            {language === 'or' ? 'ଗ୍ରାମୀଣ ଶିକ୍ଷାର ବାସ୍ତବତା' : 'Rural Education Reality'}
          </div>
          <h2 className="section-title font-odia">
            {language === 'or'
              ? 'ଗ୍ରାମୀଣ STEM ଶିକ୍ଷାରେ ପ୍ରକୃତ ସମସ୍ୟା କ\'ଣ?'
              : 'Why Rural STEM Needs a Different Approach'}
          </h2>
          <p className="section-subtitle font-odia">
            {language === 'or'
              ? 'ସାଧାରଣ EdTech ଆପ୍ ହାଇ-ସ୍ପିଡ୍ 5G ଏବଂ ଇଂରାଜୀ ଦକ୍ଷତା ଉପରେ ନିର୍ଭର କରେ। କିନ୍ତୁ ଓଡ଼ିଶାର ଗ୍ରାମାଞ୍ଚଳ ବିଦ୍ୟାଳୟରେ ବାସ୍ତବତା ଭିନ୍ନ।'
              : 'Standard digital learning platforms assume high-speed 4G connectivity and fluent English. In rural Odisha high schools, reality demands a completely offline and localized paradigm.'}
          </p>
        </div>

        {/* 4 Problem Stat Cards Grid */}
        <div className="grid-cols-4">
          {/* Stat 1: Low Connectivity */}
          <div className="problem-card">
            <div className="problem-stat">78%</div>
            <div className="problem-title font-odia">
              {language === 'or' ? 'ଦୁର୍ବଳ ଇଣ୍ଟରନେଟ୍ ସଂଯୋଗ' : 'Frequent Network Blackouts'}
            </div>
            <p className="problem-desc font-odia">
              {language === 'or'
                ? '୭୮% ଗ୍ରାମୀଣ ବିଦ୍ୟାଳୟରେ ଶ୍ରେଣୀ ସମୟରେ ନିୟମିତ ଇଣ୍ଟରନେଟ୍ ମିଳେନାହିଁ। ଭିଡିଓ ଷ୍ଟ୍ରିମିଂ ଆପ୍ ବନ୍ଦ ହୋଇଯାଏ।'
                : '78% of rural school areas experience weak or absent network coverage during school hours. Streaming video lessons fail completely.'}
            </p>
          </div>

          {/* Stat 2: Language Barrier in STEM */}
          <div className="problem-card">
            <div className="problem-stat">84%</div>
            <div className="problem-title font-odia">
              {language === 'or' ? 'ଭାଷାଗତ ପ୍ରତିବନ୍ଧକ' : 'Complex Language Barrier'}
            </div>
            <p className="problem-desc font-odia">
              {language === 'or'
                ? '୮୪% ବୈଜ୍ଞାନିକ ଶବ୍ଦାବଳୀ ଜଟିଳ ଇଂରାଜୀରେ ଥିବାରୁ ଛାତ୍ରଛାତ୍ରୀ ଭୟଭୀତ ହୁଅନ୍ତି। ଓଡ଼ିଆ ଭଏସ୍ ବ୍ୟାଖ୍ୟାର ଅଭାବ ରହିଛି।'
                : '84% of science concepts are presented in abstract English or dense jargon without conversational Odia voice support, causing early STEM disengagement.'}
            </p>
          </div>

          {/* Stat 3: Teacher Visibility Gap */}
          <div className="problem-card">
            <div className="problem-stat">1:45+</div>
            <div className="problem-title font-odia">
              {language === 'or' ? 'ଶିକ୍ଷକ ଦୃଶ୍ୟମାନତା ବ୍ୟବଧାନ' : 'High Teacher-Student Ratio'}
            </div>
            <p className="problem-desc font-odia">
              {language === 'or'
                ? 'ଗୋଟିଏ ଶ୍ରେଣୀରେ ୪୫+ ପିଲା ଥିବାରୁ ପରୀକ୍ଷା ଖାତା ଦେଖିବା ପୂର୍ବରୁ କିଏ କେଉଁଠି ଅଟକିଛି ଜାଣିବା ସମ୍ଭବ ହୁଏ ନାହିଁ।'
                : 'With one STEM teacher per 45+ students, educators only spot student conceptual misconceptions weeks later after term exams are graded.'}
            </p>
          </div>

          {/* Stat 4: Low Engagement from Static PDFs */}
          <div className="problem-card">
            <div className="problem-stat">&lt;22%</div>
            <div className="problem-title font-odia">
              {language === 'or' ? 'ନିଷ୍କ୍ରିୟ ପଠନର ସୀମିତତା' : 'Passive PDF Retention Drop'}
            </div>
            <p className="problem-desc font-odia">
              {language === 'or'
                ? 'କେବଳ ଡିଜିଟାଲ୍ ପିଡିଏଫ୍ ପଢିବା ଦ୍ୱାରା ୨୨% ରୁ କମ୍ ମନେରହେ। ଖେଳ ଓ ଅଭ୍ୟାସ ବିନା ପ୍ରକୃତ ଶିକ୍ଷଣ ହୁଏନାହିଁ।'
                : 'Reading static PDFs yields less than 22% concept retention compared to interactive gamified experiments with real-time feedback loops.'}
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. FEATURES GRID (SIMPLE LINE ICONS, VALUE-DRIVEN)
          ==================================================================== */}
      <section id="features" className="landing-section">
        <div className="section-header">
          <div className="section-tag">
            {language === 'or' ? 'ବିଶେଷତା ସମୂହ' : 'Engineered For Rural Reality'}
          </div>
          <h2 className="section-title font-odia">
            {language === 'or'
              ? 'ଓଡ଼ିଶା ଛାତ୍ରଛାତ୍ରୀଙ୍କ ପାଇଁ ସ୍ୱତନ୍ତ୍ର ନିର୍ମିତ ପ୍ଲାଟଫର୍ମ'
              : 'Built From The Ground Up For Odisha High Schools'}
          </h2>
          <p className="section-subtitle font-odia">
            {language === 'or'
              ? 'ପ୍ରତ୍ୟେକ ବୈଶିଷ୍ଟ୍ୟ ସାଧାରଣ ବଜେଟ୍ ସ୍ମାର୍ଟଫୋନରେ ଇଣ୍ଟରନେଟ୍ ବିନା ସହଜରେ କାମ କରିବା ପାଇଁ ଡିଜାଇନ୍ ହୋଇଛି।'
              : 'Every single capability is optimized for low-cost Android phones with zero dependence on active internet connection.'}
          </p>
        </div>

        <div className="grid-cols-3">
          {/* Feature 1: Offline-First PWA */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <WifiOff size={24} />
            </div>
            <h3 className="feature-title font-odia">
              {language === 'or' ? '୧୦୦% ଅଫଲାଇନ୍ ସୁବିଧା (PWA)' : 'Offline-First PWA Architecture'}
            </h3>
            <p className="feature-desc font-odia">
              {language === 'or'
                ? 'ଗୋଟିଏ ଥର ଇନଷ୍ଟଲ୍ କରନ୍ତୁ। ସମସ୍ତ ପାଠ, ଆନିମେସନ୍ ଓ କୁଇଜ୍ ଫୋନରେ ସଞ୍ଚିତ ରହେ ଏବଂ ଇଣ୍ଟରନେଟ୍ ଆସିଲେ ସ୍ୱୟଂଚାଳିତ ଭାବେ ସିଙ୍କ୍ ହୁଏ।'
                : 'Install once and learn completely offline. Service workers and IndexedDB cache the full curriculum locally, syncing progress idempotently on reconnect.'}
            </p>
          </div>

          {/* Feature 2: Odia-First UI with Voice Narration */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Languages size={24} />
            </div>
            <h3 className="feature-title font-odia">
              {language === 'or' ? 'ଓଡ଼ିଆ ପ୍ରାଥମିକତା ଓ ସ୍ୱର ଉଚ୍ଚାରଣ' : 'Odia-First UI & Voice Narration'}
            </h3>
            <p className="feature-desc font-odia">
              {language === 'or'
                ? 'ଓଡ଼ିଶା ରାଜ୍ୟ ପାଠ୍ୟଖସଡ଼ା ଆଧାରିତ ସରଳ ଓଡ଼ିଆ ଭାଷା ଏବଂ ସ୍ୱର ଶୁଣିବା ସୁବିଧା, ଯାହା ପ୍ରତ୍ୟେକ ଛାତ୍ରଙ୍କୁ ସହଜରେ ବୁଝିବାରେ ସାହାଯ୍ୟ କରେ।'
                : 'Colloquial Odia scientific terminology paired with integrated voice prompts to bridge reading gaps and build deep concept confidence.'}
            </p>
          </div>

          {/* Feature 3: Joyful Gamification (No Toxic Leaderboards) */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Sparkles size={24} />
            </div>
            <h3 className="feature-title font-odia">
              {language === 'or' ? 'ଖେଳ ମାଧ୍ୟମରେ ଆନନ୍ଦଦାୟକ ଶିକ୍ଷା' : 'Gamified Micro-Lessons'}
            </h3>
            <p className="feature-desc font-odia">
              {language === 'or'
                ? 'ବ୍ୟକ୍ତିଗତ ପ୍ରଗତି ପଏଣ୍ଟ୍, ପ୍ରେରଣାଦାୟକ ବ୍ୟାଜ୍ ଓ ଦୈନିକ ଷ୍ଟ୍ରିକ୍ସ। କୌଣସି ମାନସିକ ଚାପ ସୃଷ୍ଟିକାରୀ ସାର୍ବଜନୀନ ଲିଡରବୋର୍ଡ ନାହିଁ।'
                : 'XP points, collectible achievement badges, and positive daily streaks celebrate individual mastery without toxic public rank boards.'}
            </p>
          </div>

          {/* Feature 4: Rule-Based Adaptive Difficulty */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Sliders size={24} />
            </div>
            <h3 className="feature-title font-odia">
              {language === 'or' ? 'ଅନୁକୂଳ କାଠିନ୍ୟ ସ୍ତର ଓ ସହାୟତା' : 'Rule-Based Adaptive Scaffolding'}
            </h3>
            <p className="feature-desc font-odia">
              {language === 'or'
                ? 'ଛାତ୍ରଙ୍କ ପ୍ରୟାସ ଉପରେ ଆଧାର କରି ପ୍ରଶ୍ନର ସ୍ତର ବଦଳେ ଏବଂ ଅସୁବିଧା ହେଲେ ସ୍ୱୟଂଚାଳିତ ଓଡ଼ିଆ ସହାୟକ ଟିପ୍ପଣୀ (Hints) ମିଳେ।'
                : 'Intelligent heuristics detect recurring mistakes in real-time, automatically serving targeted Odia hints before student frustration sets in.'}
            </p>
          </div>

          {/* Feature 5: Teacher Dashboard */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Activity size={24} />
            </div>
            <h3 className="feature-title font-odia">
              {language === 'or' ? 'ଶିକ୍ଷକଙ୍କ ପାଇଁ ଦୁର୍ବଳ ବିଷୟ ଚିହ୍ନଟ' : 'Teacher Diagnostic Dashboard'}
            </h3>
            <p className="feature-desc font-odia">
              {language === 'or'
                ? 'ଛାତ୍ରଙ୍କ ଅଫଲାଇନ୍ ଅଭ୍ୟାସରୁ ଶିକ୍ଷକ ତୁରନ୍ତ ଜାଣିପାରିବେ କେଉଁ ବିଷୟ (ଯଥା: ଷ୍ଟୋମାଟା କାର୍ଯ୍ୟ) ଶ୍ରେଣୀର ପିଲାମାନେ ବୁଝିପାରିନାହାନ୍ତି।'
                : 'Instantly surfaces weak-topic flags across the classroom upon offline sync, allowing teachers to deliver targeted remedial instruction immediately.'}
            </p>
          </div>

          {/* Feature 6: Anonymized Department Analytics */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <BarChart3 size={24} />
            </div>
            <h3 className="feature-title font-odia">
              {language === 'or' ? 'ବିଭାଗୀୟ ସ୍ତରୀୟ ତଥ୍ୟ ବିଶ୍ଳେଷଣ' : 'Department-Level Analytics'}
            </h3>
            <p className="feature-desc font-odia">
              {language === 'or'
                ? 'ବ୍ଲକ ଓ ଜିଲ୍ଲା ଶିକ୍ଷା ଅଧିକାରୀଙ୍କ ପାଇଁ ଗୋପନୀୟତା-ସୁରକ୍ଷିତ ମାକ୍ରୋ ରିପୋର୍ଟ, ଯାହା ଶିକ୍ଷା ବ୍ୟବସ୍ଥାକୁ ଉନ୍ନତ କରିବାରେ ସାହାଯ୍ୟ କରେ।'
                : 'Privacy-first, anonymized aggregate analytics empower Block Education Officers (BEOs) and state administrators to allocate resources wisely.'}
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. HOW IT COMPARES (LIGHTWEIGHT COMPARISON SECTION)
          ==================================================================== */}
      <section id="compare" className="landing-section">
        <div className="section-header">
          <div className="section-tag">
            {language === 'or' ? 'ତୁଳନାତ୍ମକ ବିଶ୍ଳେଷଣ' : 'Strategic Comparison'}
          </div>
          <h2 className="section-title font-odia">
            {language === 'or' ? 'ଖେଳ ବିଦ୍ୟା କାହିଁକି ସ୍ୱତନ୍ତ୍ର?' : 'How Khelo Vidya Compares'}
          </h2>
          <p className="section-subtitle font-odia">
            {language === 'or'
              ? 'ସାଧାରଣ ଡିଜିଟାଲ୍ ଭଣ୍ଡାର ତୁଳନାରେ ଖେଳ ବିଦ୍ୟା ଅଫଲାଇନ୍ ସୁବିଧା ଏବଂ ଖେଳ ଭିତ୍ତିକ ଶିକ୍ଷାର ସର୍ବୋତ୍ତମ ସମନ୍ୱୟ।'
              : 'Positioned uniquely at the intersection of robust offline architecture, game-based tactile inquiry, and native Odia localization.'}
          </p>
        </div>

        <div className="compare-grid">
          {/* Column 1: DIKSHA */}
          <div className="compare-card">
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Generic Repository
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '0.25rem' }}>DIKSHA</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--primary)' }}>✓</span>
                <span>Vast national content library with official textbooks.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--danger)' }}>
                <span>✕</span>
                <span>Requires constant active internet; video streaming buffers on 2G/3G.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--danger)' }}>
                <span>✕</span>
                <span>Passive PDF & video viewing with zero interactive tactile games.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--danger)' }}>
                <span>✕</span>
                <span>No automated offline-synced classroom diagnostic heatmaps.</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Best for: Centralized curriculum distribution when internet is available.
            </div>
          </div>

          {/* Column 2: Kolibri */}
          <div className="compare-card">
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Offline Platform
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '0.25rem' }}>Kolibri</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--primary)' }}>✓</span>
                <span>Robust offline sync architecture across local hardware.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--danger)' }}>
                <span>✕</span>
                <span>Desktop/PC lab-oriented; heavy UI on budget Android smartphones.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--danger)' }}>
                <span>✕</span>
                <span>Generic file-tree browser lacking custom Odia voice narration.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--danger)' }}>
                <span>✕</span>
                <span>Not STEM-game focused; lacks interactive physics/bio simulations.</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Best for: Desktop computer lab file distribution in offline schools.
            </div>
          </div>

          {/* Column 3: Khelo Vidya (Highlight) */}
          <div className="compare-card compare-card-highlight">
            <div className="compare-badge-pill">Best of Both Worlds</div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-orange)', textTransform: 'uppercase' }}>
                Purpose-Built For Odisha
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                Khelo Vidya (ଖେଳ ବିଦ୍ୟା)
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', fontWeight: 600 }}>
                <span style={{ color: 'var(--accent-green)' }}>✓</span>
                <span>100% Offline-First PWA for low-end Android touchscreens (0 KB in class).</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', fontWeight: 600 }}>
                <span style={{ color: 'var(--accent-green)' }}>✓</span>
                <span>Tactile STEM mini-game engines (Photosynthesis, Fractions, Circuits).</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', fontWeight: 600 }}>
                <span style={{ color: 'var(--accent-green)' }}>✓</span>
                <span>Conversational Odia UI + Synchronous Voice Audio Narration.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', fontWeight: 600 }}>
                <span style={{ color: 'var(--accent-green)' }}>✓</span>
                <span>Instant teacher weak-topic flags upon background reconnect.</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-accent)', fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600 }}>
              Tailor-made for rural high school students (grades 6–9) across Odisha.
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. HOW IT WORKS (4-STEP VISUAL FLOW)
          ==================================================================== */}
      <section id="how-it-works" className="landing-section">
        <div className="section-header">
          <div className="section-tag">
            {language === 'or' ? 'କାର୍ଯ୍ୟପ୍ରଣାଳୀ' : 'Simple 4-Step Process'}
          </div>
          <h2 className="section-title font-odia">
            {language === 'or'
              ? 'ଅତି ସରଳ ୪ଟି ପଦକ୍ଷେପରେ ଶିକ୍ଷଣ ଓ ଅନୁଶୀଳନ'
              : 'How Khelo Vidya Works in Practice'}
          </h2>
          <p className="section-subtitle font-odia">
            {language === 'or'
              ? 'ଶିକ୍ଷାର୍ଥୀ ଓ ଶିକ୍ଷକଙ୍କ ପାଇଁ କୌଣସି ଜଟିଳତା ନାହିଁ — ଦୂରବର୍ତ୍ତୀ ପଞ୍ଚାୟତରେ ମଧ୍ୟ ନିର୍ଭରଯୋଗ୍ୟ।'
              : 'Zero operational friction for rural schools — works seamlessly in off-grid panchayats.'}
          </p>
        </div>

        <div className="steps-container">
          {/* Step 1 */}
          <div className="step-card">
            <div className="step-number">1</div>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'var(--accent-orange-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-orange)' }}>
              <Download size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }} className="font-odia">
              {language === 'or' ? 'ପାଠ୍ୟପ୍ୟାକ୍ ଡାଉନଲୋଡ୍ କରନ୍ତୁ' : 'Download Lesson Pack'}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }} className="font-odia">
              {language === 'or'
                ? 'ବିଦ୍ୟାଳୟ ୱାଇଫାଇ କିମ୍ବା ପଞ୍ଚାୟତ କେନ୍ଦ୍ରରୁ ୫ MB ରୁ କମ୍ ପାଠ୍ୟପ୍ୟାକ୍ ଥରେ ଡାଉନଲୋଡ୍ କରନ୍ତୁ।'
                : '1-click download of lightweight (<5MB) micro-lesson packs at the school Wi-Fi or panchayat digital kiosk.'}
            </p>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <div className="step-number">2</div>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'var(--accent-green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-green)' }}>
              <Sparkles size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }} className="font-odia">
              {language === 'or' ? 'ଅଫଲାଇନରେ ଖେଳନ୍ତୁ ଓ ଶିଖନ୍ତୁ' : 'Learn & Play Offline'}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }} className="font-odia">
              {language === 'or'
                ? 'ଘରେ ବା ଶ୍ରେଣୀରେ ବିନା ଇଣ୍ଟରନେଟରେ ଖେଳ ଖେଳି ପାଠ ବୁଝନ୍ତୁ ଏବଂ ବ୍ୟାଜ୍ ଅର୍ଜନ କରନ୍ତୁ।'
                : 'Students interact with science simulations, answer adaptive quizzes, and earn badges completely offline.'}
            </p>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <div className="step-number">3</div>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'var(--accent-orange-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-orange)' }}>
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }} className="font-odia">
              {language === 'or' ? 'ନେଟୱର୍କ ପାଇଲେ ସିଙ୍କ୍ ହୁଏ' : 'Sync When Online'}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }} className="font-odia">
              {language === 'or'
                ? 'ଯେତେବେଳେ ଫୋନ୍ ସାମାନ୍ୟ ନେଟୱର୍କ ପାଏ, ପ୍ରଗତି ଲଗ୍ ସ୍ୱୟଂଚାଳିତ ଏବଂ ତ୍ରୁଟିମୁକ୍ତ ଭାବେ ସିଙ୍କ୍ ହୋଇଯାଏ।'
                : 'Attempts sync idempotently via client UUIDs whenever device briefly catches connectivity without duplicate scores.'}
            </p>
          </div>

          {/* Step 4 */}
          <div className="step-card">
            <div className="step-number">4</div>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'var(--accent-green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-green)' }}>
              <Activity size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }} className="font-odia">
              {language === 'or' ? 'ଶିକ୍ଷକ ଦୁର୍ବଳତା ଜାଣିପାରନ୍ତି' : 'Teacher Sees Progress'}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }} className="font-odia">
              {language === 'or'
                ? 'ଶିକ୍ଷକ ଡ୍ୟାସବୋର୍ଡରେ ଦେଖନ୍ତି କେଉଁ ବିଷୟରେ ପିଲାମାନେ ଅଟକିଛନ୍ତି ଏବଂ ତୁରନ୍ତ ସହାୟତା କରନ୍ତି।'
                : 'Teachers review weak-spot heatmaps to run targeted 5-minute remedial activities before term exam days.'}
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. FOR TEACHERS & SCHOOLS SECTION
          ==================================================================== */}
      <section id="teachers" className="landing-section">
        <div className="teacher-container">
          {/* Left Column: Teacher Value Proposition */}
          <div>
            <div className="section-tag">
              {language === 'or' ? 'ଶିକ୍ଷକ ସଶକ୍ତୀକରଣ' : 'Empowering Rural Educators'}
            </div>
            <h2 className="section-title font-odia">
              {language === 'or'
                ? 'ଶିକ୍ଷକଙ୍କ କାର୍ଯ୍ୟଭାର କମାଇବା ଓ ଶିକ୍ଷାଦାନ ସହଜ କରିବା'
                : 'Empowering Teachers, Not Replacing Them'}
            </h2>
            <p className="section-subtitle font-odia" style={{ marginBottom: '1.75rem' }}>
              {language === 'or'
                ? 'ପରୀକ୍ଷା ଦିନ ପର୍ଯ୍ୟନ୍ତ ଅପେକ୍ଷା କରିବା ଦରକାର ନାହିଁ। ପ୍ରତ୍ୟେକ ସପ୍ତାହରେ ଜାଣନ୍ତୁ କେଉଁ ଛାତ୍ର କେଉଁ ବିଷୟରେ ଅସୁବିଧା ଅନୁଭବ କରୁଛି।'
                : 'No more waiting for term-end exam results. Real-time formative insights reveal conceptual hurdles immediately, enabling high-impact remedial teaching.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: 'var(--accent-orange-soft)', color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <Zap size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                    {language === 'or' ? 'ନିରନ୍ତର ସମୀକ୍ଷା (No Waiting For Exam Day)' : 'Continuous Formative Visibility'}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    {language === 'or'
                      ? 'ଛାତ୍ରଛାତ୍ରୀ କେଉଁ ପ୍ରଶ୍ନରେ ଅଧିକ ସମୟ ନେଉଛନ୍ତି ବା ଭୁଲ କରୁଛନ୍ତି, ତାହା ତୁରନ୍ତ ଡ୍ୟାସବୋର୍ଡରେ ଦେଖାଯାଏ।'
                      : 'Identify persistent misconceptions during regular class cycles instead of discovering them months later.'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: 'var(--accent-green-soft)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                    {language === 'or' ? 'ଖାତା ଦେଖିବାର କୌଣସି ଅତିରିକ୍ତ ବୋଝ ନାହିଁ' : 'Zero Manual Grading Workload'}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    {language === 'or'
                      ? 'ଅଫଲାଇନ୍ କୁଇଜ୍ ଓ ଗେମ୍ ସ୍କୋର ସ୍ୱୟଂଚାଳିତ ଭାବେ ଗଣନା ହୋଇ ଶ୍ରେଣୀ ରିପୋର୍ଟ ପ୍ରସ୍ତୁତ ହୁଏ।'
                      : 'Offline student attempts are auto-graded and aggregated without creating administrative paperwork for teachers.'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: 'var(--accent-orange-soft)', color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <Layers size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                    {language === 'or' ? 'ସ୍ଥାନୀୟ ଓଡ଼ିଆ କାର୍ଯ୍ୟକଳାପ ସୁପାରିଶ' : 'Targeted Odia Remedial Activities'}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    {language === 'or'
                      ? 'ଦୁର୍ବଳ ବିଷୟ ପାଇଁ ୫ ମିନିଟର ହାତତିଆରି ପରୀକ୍ଷା ଓ ଶ୍ରେଣୀ କାର୍ଯ୍ୟକଳାପ ସୁପାରିଶ ମିଳେ।'
                      : 'Actionable classroom demonstration guides tailored for rural teachers with limited lab infrastructure.'}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <Link to="/login" className="btn btn-primary">
                <span>{language === 'or' ? 'ଶିକ୍ଷକ ପୋର୍ଟାଲ୍ ଲଗଇନ୍ କରନ୍ତୁ' : 'Access Teacher Portal'}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: Teacher Dashboard Mockup Card */}
          <div
            className="glass-card"
            style={{
              padding: '1.75rem',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-card)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-orange)' }}>
                  TEACHER DIAGNOSTIC VIEW
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                  {language === 'or' ? '୭ମ ଶ୍ରେଣୀ ବିଜ୍ଞାନ · ବିଷୟବସ୍ତୁ ସ୍ଥିତି' : 'Class 7B Science · Topic Mastery'}
                </h3>
              </div>
              <span className="badge badge-online">38 Synced</span>
            </div>

            {/* Topic Mastery 1: Photosynthesis */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                <span>🌱 ଆଲୋକସଂଶ୍ଳେଷଣ (Photosynthesis Intro)</span>
                <span style={{ color: 'var(--success)' }}>92% Mastered</span>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-input)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '92%', background: 'var(--success)' }} />
              </div>
            </div>

            {/* Topic Mastery 2: Stomata & Gas Exchange (Weak Topic Flag) */}
            <div style={{ marginBottom: '1.5rem', background: 'var(--accent-orange-soft)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-accent)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <AlertTriangle size={15} color="var(--accent-orange)" />
                  <span>🔬 ଷ୍ଟୋମାଟା ଗ୍ୟାସ୍ ବିନିମୟ (Stomata Function)</span>
                </div>
                <span style={{ color: 'var(--accent-orange)', fontWeight: 800 }}>44% Mastery ⚠️</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(0,0,0,0.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden', marginBottom: '0.6rem' }}>
                <div style={{ height: '100%', width: '44%', background: 'var(--accent-orange)' }} />
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <strong>Flag:</strong> 18/38 students confused guard cells with xylem vessels.
              </div>
              <div style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--accent-orange-dark)', fontWeight: 600 }}>
                💡 Suggested Activity: 5-min leaf peel microscopic water immersion test.
              </div>
            </div>

            {/* Topic Mastery 3: Chloroplasts */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                <span>🍃 ପତ୍ରହରିତ କାର୍ଯ୍ୟ (Chloroplast Action)</span>
                <span style={{ color: 'var(--success)' }}>84% Mastered</span>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-input)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '84%', background: 'var(--success)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. FOOTER (TEAM BINARY BEASTS · SIH25048 CREDIT)
          ==================================================================== */}
      <footer className="landing-footer">
        <div className="footer-content">
          {/* Col 1: Initiative Context & Hackathon Attribution */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <img
                src="/android-chrome-192x192.png"
                alt="Khelo Vidya"
                style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)' }}
              />
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {t('appName')} (ଖେଳ ବିଦ୍ୟା)
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '440px', marginBottom: '1.25rem' }}>
              A specialized gamified, offline-first STEM learning platform designed for rural high school students (grades 6–9) in Odisha, India.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
              }}
            >
              <Sparkles size={14} color="var(--accent-orange)" />
              <span>Developed by <strong>Team Binary Beasts</strong> · SIH25048</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Quick Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <a href="#problem" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                The Problem
              </a>
              <a href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                Key Features
              </a>
              <a href="#compare" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                How It Compares
              </a>
              <a href="#how-it-works" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                How It Works
              </a>
              <a href="#teachers" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                Teacher Dashboard
              </a>
            </div>
          </div>

          {/* Col 3: Modules & Actions */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Learning Access
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <Link to="/adventure/photosynthesis" style={{ color: 'var(--accent-orange)', fontWeight: 700, textDecoration: 'none' }}>
                🌱 Try Photosynthesis Demo
              </Link>
              <Link to="/lessons" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                📚 Browse Lesson Catalog
              </Link>
              <Link to="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                🔐 Student / Teacher Login
              </Link>
              <Link to="/register" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                📝 New Registration
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div>
            Odisha School & Mass Education Department · Smart India Hackathon 2024–25
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Built with React 19 + Dexie.js + PWA</span>
            <button
              onClick={toggleTheme}
              style={{ background: 'none', border: 'none', color: 'var(--accent-orange)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', fontWeight: 600 }}
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
