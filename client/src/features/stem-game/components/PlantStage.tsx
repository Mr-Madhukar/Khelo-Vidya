import React from 'react';
import { PlantStage } from '../types/game.types.ts';
import { Sparkles, Heart } from 'lucide-react';

interface PlantStageProps {
  stage: PlantStage;
  healthPercent?: number;
  language: 'or' | 'en';
  isSunlightActive?: boolean;
  isWaterActive?: boolean;
  isCO2Active?: boolean;
  isPhotosynthesizing?: boolean;
}

export const PlantStageVisual: React.FC<PlantStageProps> = ({
  stage,
  healthPercent = 100,
  language,
  isSunlightActive = true,
  isWaterActive = false,
  isCO2Active = false,
  isPhotosynthesizing = false,
}) => {
  const isOdia = language === 'or';

  const getStageTitle = () => {
    switch (stage) {
      case 'seed':
        return isOdia ? 'ସୁପ୍ତ ମଞ୍ଜି (Seed Stage)' : 'Dormant Seed';
      case 'small':
        return isOdia ? 'ଅଙ୍କୁରିତ ଚାରା (Sprouting)' : 'Sprouted Seedling';
      case 'growing':
        return isOdia ? 'ବୃଦ୍ଧିଶୀଳ ଗଛ (Growing Plant)' : 'Growing Plant';
      case 'healthy':
        return isOdia ? 'ସତେଜ ସବୁଜ ବୃକ୍ଷ (Healthy Plant)' : 'Healthy Plant';
      case 'fully-grown':
        return isOdia ? 'ପୁଷ୍ପିତ ମହାରଥୀ ବୃକ୍ଷ (Blooming Tree)' : 'Master Blooming Tree 🌸';
      default:
        return 'Plant';
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '240px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.8) 60%, rgba(20, 14, 8, 0.95) 100%)',
        border: '1px solid var(--border-accent)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1rem',
        boxShadow: isPhotosynthesizing ? '0 0 30px rgba(16, 185, 129, 0.35)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Sun & Solar Beams (Top Right) */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: isSunlightActive ? 1 : 0.4,
          transition: 'opacity 0.3s',
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #fde047 30%, #f59e0b 80%)',
            boxShadow: '0 0 20px #f59e0b',
            animation: 'pulse 2s infinite ease-in-out',
          }}
        />
        <span style={{ fontSize: '0.65rem', color: '#fde047', fontWeight: 700, marginTop: '2px' }}>
          {isOdia ? 'ସୂର୍ଯ୍ୟାଲୋକ' : 'Sunlight'}
        </span>
      </div>

      {/* Atmospheric Gas Cloud (Top Left) */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '15px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          background: 'rgba(255, 255, 255, 0.08)',
          padding: '0.2rem 0.5rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.7rem',
          color: isCO2Active ? '#38bdf8' : 'var(--text-muted)',
          border: isCO2Active ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
        }}
      >
        <span>🌫️ CO₂ {isCO2Active ? (isOdia ? 'ଶୋଷିତ' : 'Absorbed') : (isOdia ? 'ବାୟୁ' : 'Air')}</span>
      </div>

      {/* Top Plant Stage Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '0.25rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.78rem',
          fontWeight: 700,
          color: '#34d399',
          zIndex: 2,
        }}
      >
        <Sparkles size={13} color="#10b981" />
        <span>{getStageTitle()}</span>
      </div>

      {/* SVG Plant Graphic Canvas */}
      <div
        style={{
          position: 'relative',
          width: '180px',
          height: '140px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <svg
          viewBox="0 0 200 160"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          {/* Soil Layer & Terracotta Pot */}
          <ellipse cx="100" cy="148" rx="75" ry="12" fill="#3b2314" opacity="0.9" />
          <path
            d="M 55,120 L 145,120 L 135,152 L 65,152 Z"
            fill="url(#potGradient)"
            stroke="#9a3412"
            strokeWidth="1.5"
          />
          <ellipse cx="100" cy="120" rx="45" ry="6" fill="#451a03" />

          {/* Gradients */}
          <defs>
            <linearGradient id="potGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#7c2d12" />
            </linearGradient>
            <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
          </defs>

          {/* STAGE 1: Seed in Soil */}
          {stage === 'seed' && (
            <g className="animate-bounce-subtle">
              {/* Seed Body */}
              <ellipse cx="100" cy="118" rx="8" ry="12" fill="#78350f" stroke="#b45309" strokeWidth="1.5" />
              {/* Tiny emerging root */}
              <path d="M 100,128 Q 97,136 102,142" stroke="#fde68a" strokeWidth="1.5" fill="none" />
            </g>
          )}

          {/* STAGE 2: Sprouted Seedling */}
          {stage === 'small' && (
            <g>
              {/* Small Stem */}
              <path d="M 100,120 Q 99,105 100,90" stroke="url(#stemGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Left Leaf */}
              <path d="M 100,98 Q 80,90 82,82 Q 95,84 100,98" fill="url(#leafGradient)" stroke="#15803d" strokeWidth="0.8" />
              {/* Right Leaf */}
              <path d="M 100,94 Q 120,86 118,78 Q 105,80 100,94" fill="url(#leafGradient)" stroke="#15803d" strokeWidth="0.8" />
            </g>
          )}

          {/* STAGE 3: Growing Young Plant */}
          {stage === 'growing' && (
            <g>
              {/* Main Stem */}
              <path d="M 100,120 Q 98,90 100,60" stroke="url(#stemGradient)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              {/* Lower Left Leaf */}
              <path d="M 100,105 Q 70,100 68,88 Q 86,90 100,105" fill="url(#leafGradient)" stroke="#15803d" strokeWidth="1" />
              {/* Lower Right Leaf */}
              <path d="M 100,98 Q 130,94 132,82 Q 114,84 100,98" fill="url(#leafGradient)" stroke="#15803d" strokeWidth="1" />
              {/* Mid Left Leaf */}
              <path d="M 100,80 Q 75,70 76,58 Q 90,62 100,80" fill="url(#leafGradient)" stroke="#15803d" strokeWidth="1" />
              {/* Top Shoot */}
              <path d="M 100,60 Q 115,48 112,42 Q 102,46 100,60" fill="url(#leafGradient)" stroke="#15803d" strokeWidth="1" />
            </g>
          )}

          {/* STAGE 4: Lush Healthy Plant */}
          {stage === 'healthy' && (
            <g>
              {/* Thick Stem */}
              <path d="M 100,120 Q 96,80 100,45" stroke="url(#stemGradient)" strokeWidth="6" fill="none" strokeLinecap="round" />
              {/* Left Branch */}
              <path d="M 98,90 Q 70,80 50,75" stroke="url(#stemGradient)" strokeWidth="3" fill="none" />
              <path d="M 50,75 Q 35,60 40,50 Q 55,55 50,75" fill="url(#leafGradient)" stroke="#15803d" strokeWidth="1" />
              <path d="M 68,82 Q 55,95 45,90 Q 55,78 68,82" fill="url(#leafGradient)" stroke="#15803d" strokeWidth="1" />
              {/* Right Branch */}
              <path d="M 100,85 Q 130,75 150,70" stroke="url(#stemGradient)" strokeWidth="3" fill="none" />
              <path d="M 150,70 Q 165,55 160,45 Q 145,50 150,70" fill="url(#leafGradient)" stroke="#15803d" strokeWidth="1" />
              <path d="M 132,77 Q 145,90 155,85 Q 145,74 132,77" fill="url(#leafGradient)" stroke="#15803d" strokeWidth="1" />
              {/* Top Crown Leaves */}
              <path d="M 100,45 Q 85,25 90,15 Q 102,22 100,45" fill="url(#leafGradient)" stroke="#15803d" strokeWidth="1" />
              <path d="M 100,45 Q 115,25 110,15 Q 98,22 100,45" fill="url(#leafGradient)" stroke="#15803d" strokeWidth="1" />
            </g>
          )}

          {/* STAGE 5: Master Blooming Tree */}
          {stage === 'fully-grown' && (
            <g>
              {/* Sturdy Trunk */}
              <path d="M 100,120 Q 95,75 100,35" stroke="url(#stemGradient)" strokeWidth="8" fill="none" strokeLinecap="round" />
              {/* Canopy Foliage Masses */}
              <circle cx="70" cy="50" r="32" fill="#16a34a" opacity="0.9" />
              <circle cx="130" cy="50" r="32" fill="#16a34a" opacity="0.9" />
              <circle cx="100" cy="30" r="36" fill="#22c55e" opacity="0.95" />
              <circle cx="80" cy="35" r="25" fill="#4ade80" opacity="0.75" />
              <circle cx="120" cy="35" r="25" fill="#4ade80" opacity="0.75" />

              {/* Blooming Flowers & Tulsi Buds */}
              <circle cx="75" cy="40" r="6" fill="#f43f5e" />
              <circle cx="75" cy="40" r="2" fill="#fef08a" />

              <circle cx="125" cy="42" r="6" fill="#f43f5e" />
              <circle cx="125" cy="42" r="2" fill="#fef08a" />

              <circle cx="100" cy="18" r="7" fill="#fb7185" />
              <circle cx="100" cy="18" r="2.5" fill="#fef08a" />

              <circle cx="90" cy="58" r="5" fill="#ec4899" />
              <circle cx="90" cy="58" r="1.5" fill="#fef08a" />

              <circle cx="115" cy="56" r="5" fill="#ec4899" />
              <circle cx="115" cy="56" r="1.5" fill="#fef08a" />
            </g>
          )}

          {/* Active Photosynthesis Oxygen & Sugar Sparkles */}
          {isPhotosynthesizing && (
            <g>
              <circle cx="85" cy="70" r="3" fill="#67e8f9" opacity="0.8">
                <animate attributeName="cy" values="70;30;10" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;1;0" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="115" cy="65" r="3.5" fill="#67e8f9" opacity="0.8">
                <animate attributeName="cy" values="65;25;5" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;1;0" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <text x="140" y="30" fontSize="12" fill="#38bdf8" fontWeight="bold">O₂ ↑</text>
              <text x="35" y="40" fontSize="11" fill="#fde047" fontWeight="bold">Glucose 🍬</text>
            </g>
          )}

          {/* Water Droplets Active Animation */}
          {isWaterActive && (
            <g>
              <circle cx="95" cy="135" r="2.5" fill="#38bdf8" opacity="0.9">
                <animate attributeName="cy" values="135;120;105" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="105" cy="138" r="2.5" fill="#38bdf8" opacity="0.9">
                <animate attributeName="cy" values="138;123;108" dur="1.2s" repeatCount="indefinite" />
              </circle>
            </g>
          )}
        </svg>
      </div>

      {/* Bottom Health & Vitality Bar */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
          <Heart size={13} fill="#10b981" />
          <span>{isOdia ? 'ସୁସ୍ଥତା' : 'Health'}</span>
        </div>

        <div
          style={{
            flex: 1,
            height: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${healthPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
              transition: 'width 0.5s ease',
            }}
          />
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399' }}>{healthPercent}%</span>
      </div>
    </div>
  );
};
