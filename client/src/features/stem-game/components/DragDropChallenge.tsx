import React, { useState } from 'react';
import { ProcessSlot, ProcessItem } from '../types/game.types.ts';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

interface DragDropChallengeProps {
  instruction: string;
  instructionOdia: string;
  slots: ProcessSlot[];
  availableItems: ProcessItem[];
  language: 'or' | 'en';
  onComplete: (earnedXp: number) => void;
  onItemPlaced?: (category: string) => void;
}

export const DragDropChallenge: React.FC<DragDropChallengeProps> = ({
  instruction,
  instructionOdia,
  slots: initialSlots,
  availableItems,
  language,
  onComplete,
  onItemPlaced,
}) => {
  const isOdia = language === 'or';
  const [placedMap, setPlacedMap] = useState<Record<string, string | null>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  // Placed items tracking
  const placedItemIds = Object.values(placedMap).filter(Boolean) as string[];
  const remainingItems = availableItems.filter((item) => !placedItemIds.includes(item.id));

  const handleSelectPoolItem = (itemId: string) => {
    setSelectedItemId(itemId);
    setFeedbackError(null);
  };

  const handleSlotClick = (slot: ProcessSlot) => {
    // If a slot is clicked while an item is selected from pool
    if (selectedItemId) {
      const itemObj = availableItems.find((i) => i.id === selectedItemId);
      if (!itemObj) return;

      // Validation check
      if (itemObj.category === slot.acceptedCategory) {
        const nextMap = { ...placedMap, [slot.id]: itemObj.id };
        setPlacedMap(nextMap);
        setSelectedItemId(null);
        setFeedbackError(null);
        if (onItemPlaced) onItemPlaced(itemObj.category);

        // Check if all slots are now correctly filled
        const filledCount = Object.keys(nextMap).filter((k) => Boolean(nextMap[k])).length;
        if (filledCount === initialSlots.length) {
          setIsSuccess(true);
        }
      } else {
        setFeedbackError(
          isOdia
            ? `❌ "${itemObj.nameOdia}" ଏହି ସ୍ଥାନ ପାଇଁ ଉପଯୁକ୍ତ ନୁହେଁ। ସଠିକ୍ ସ୍ଥାନରେ ରଖନ୍ତୁ।`
            : `❌ "${itemObj.name}" cannot go into "${slot.label}". Place it in its designated flow position.`
        );
      }
    } else if (placedMap[slot.id]) {
      // Remove placed item back to pool
      const nextMap = { ...placedMap, [slot.id]: null };
      setPlacedMap(nextMap);
      setIsSuccess(false);
      setFeedbackError(null);
    }
  };

  const handleReset = () => {
    setPlacedMap({});
    setSelectedItemId(null);
    setIsSuccess(false);
    setFeedbackError(null);
  };

  const handleProceed = () => {
    onComplete(30);
  };

  const getItemForSlot = (slotId: string): ProcessItem | undefined => {
    const placedId = placedMap[slotId];
    if (!placedId) return undefined;
    return availableItems.find((i) => i.id === placedId);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Instruction Card */}
      <div
        className="glass-card"
        style={{
          padding: '1.25rem',
          marginBottom: '1.25rem',
          borderLeft: '4px solid var(--primary-light)',
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
            {isOdia ? 'ଆଲୋକସଂଶ୍ଳେଷଣ ରାସାୟନିକ ପ୍ରବାହ' : 'Photosynthesis Reaction Builder'}
          </h3>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(59, 130, 246, 0.15)',
              color: '#60a5fa',
            }}
          >
            {Object.values(placedMap).filter(Boolean).length} / {initialSlots.length} {isOdia ? 'ସଜ୍ଜିତ' : 'Arranged'}
          </span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
          {isOdia ? instructionOdia : instruction}
        </p>
      </div>

      {/* Interactive Equation Diagram Board */}
      <div
        className="glass-card"
        style={{
          padding: '1.5rem 1rem',
          marginBottom: '1.5rem',
          background: 'rgba(10, 14, 23, 0.85)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          position: 'relative',
        }}
      >
        {/* Top Slot: Energy Source (Sunlight) */}
        {(() => {
          const topSlot = initialSlots.find((s) => s.position === 'top')!;
          const item = getItemForSlot(topSlot.id);

          return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fde047' }}>
                {isOdia ? '⚡ ଶକ୍ତି ଉତ୍ସ (Energy)' : '⚡ Energy Input'}
              </span>
              <button
                type="button"
                onClick={() => handleSlotClick(topSlot)}
                style={{
                  width: '180px',
                  minHeight: '62px',
                  borderRadius: 'var(--radius-md)',
                  background: item ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: item ? '2px solid #f59e0b' : '2px dashed var(--border-subtle)',
                  color: item ? '#ffffff' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: item ? '0 0 15px rgba(245, 158, 11, 0.3)' : 'none',
                }}
              >
                {item ? (
                  <>
                    <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                    <span>{isOdia ? item.nameOdia : item.name}</span>
                  </>
                ) : (
                  <span style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
                    {isOdia ? '👆 ସୂର୍ଯ୍ୟାଲୋକ ବସାନ୍ତୁ' : '👆 Place Sunlight'}
                  </span>
                )}
              </button>
              <div style={{ fontSize: '1rem', color: '#f59e0b', fontWeight: 900 }}>↓</div>
            </div>
          );
        })()}

        {/* Middle Row: Left Air Input + Central Plant + Right Water Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '620px',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Left Slot: CO2 */}
          {(() => {
            const leftSlot = initialSlots.find((s) => s.position === 'left')!;
            const item = getItemForSlot(leftSlot.id);

            return (
              <div style={{ flex: 1, minWidth: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.25rem' }}>
                  {isOdia ? '🌫️ ବାୟୁରୁ (Stomata)' : '🌫️ Air (CO₂)'}
                </span>
                <button
                  type="button"
                  onClick={() => handleSlotClick(leftSlot)}
                  style={{
                    width: '100%',
                    minHeight: '62px',
                    borderRadius: 'var(--radius-md)',
                    background: item ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: item ? '2px solid #38bdf8' : '2px dashed var(--border-subtle)',
                    color: item ? '#ffffff' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {item ? (
                    <>
                      <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                      <span>{isOdia ? item.nameOdia : item.name}</span>
                    </>
                  ) : (
                    <span style={{ fontSize: '0.78rem', fontStyle: 'italic' }}>
                      {isOdia ? '👆 CO₂ ବସାନ୍ତୁ' : '👆 Place CO₂'}
                    </span>
                  )}
                </button>
              </div>
            );
          })()}

          {/* Central Reactor: Plant & Chlorophyll */}
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(15, 23, 42, 0.9) 100%)',
              border: '2px solid #10b981',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '120px',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
            }}
          >
            <span style={{ fontSize: '1.8rem' }}>🌿</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#34d399' }}>
              {isOdia ? 'ପତ୍ର (କୋଷ)' : 'Leaf Chloroplast'}
            </span>
            <span style={{ fontSize: '0.68rem', color: '#93c5fd' }}>
              {isOdia ? 'କ୍ଲୋରୋଫିଲ୍ ସକ୍ରିୟ' : 'Chlorophyll Active'}
            </span>
          </div>

          {/* Right Slot: Water */}
          {(() => {
            const rightSlot = initialSlots.find((s) => s.position === 'right')!;
            const item = getItemForSlot(rightSlot.id);

            return (
              <div style={{ flex: 1, minWidth: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa', marginBottom: '0.25rem' }}>
                  {isOdia ? '💧 ମାଟି ଚେରରୁ (H₂O)' : '💧 Root (Water)'}
                </span>
                <button
                  type="button"
                  onClick={() => handleSlotClick(rightSlot)}
                  style={{
                    width: '100%',
                    minHeight: '62px',
                    borderRadius: 'var(--radius-md)',
                    background: item ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: item ? '2px solid #3b82f6' : '2px dashed var(--border-subtle)',
                    color: item ? '#ffffff' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {item ? (
                    <>
                      <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                      <span>{isOdia ? item.nameOdia : item.name}</span>
                    </>
                  ) : (
                    <span style={{ fontSize: '0.78rem', fontStyle: 'italic' }}>
                      {isOdia ? '👆 ଜଳ ବସାନ୍ତୁ' : '👆 Place Water'}
                    </span>
                  )}
                </button>
              </div>
            );
          })()}
        </div>

        {/* Arrow Down to Outputs */}
        <div style={{ fontSize: '1rem', color: '#10b981', fontWeight: 900 }}>↓ PRODUCES / ଉତ୍ପାଦନ ↓</div>

        {/* Bottom Outputs: Glucose + Oxygen */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            width: '100%',
            maxWidth: '520px',
            flexWrap: 'wrap',
          }}
        >
          {/* Bottom Left: Glucose */}
          {(() => {
            const gluSlot = initialSlots.find((s) => s.position === 'bottom_left')!;
            const item = getItemForSlot(gluSlot.id);

            return (
              <div style={{ flex: 1, minWidth: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b', marginBottom: '0.25rem' }}>
                  {isOdia ? '🍬 ଉଦ୍ଭିଦ ଖାଦ୍ୟ (Food)' : '🍬 Plant Food (Glucose)'}
                </span>
                <button
                  type="button"
                  onClick={() => handleSlotClick(gluSlot)}
                  style={{
                    width: '100%',
                    minHeight: '62px',
                    borderRadius: 'var(--radius-md)',
                    background: item ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: item ? '2px solid #f59e0b' : '2px dashed var(--border-subtle)',
                    color: item ? '#ffffff' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {item ? (
                    <>
                      <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                      <span>{isOdia ? item.nameOdia : item.name}</span>
                    </>
                  ) : (
                    <span style={{ fontSize: '0.78rem', fontStyle: 'italic' }}>
                      {isOdia ? '👆 ଗ୍ଲୁକୋଜ୍ ବସାନ୍ତୁ' : '👆 Place Glucose'}
                    </span>
                  )}
                </button>
              </div>
            );
          })()}

          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#94a3b8' }}>+</div>

          {/* Bottom Right: Oxygen */}
          {(() => {
            const oxySlot = initialSlots.find((s) => s.position === 'bottom_right')!;
            const item = getItemForSlot(oxySlot.id);

            return (
              <div style={{ flex: 1, minWidth: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', marginBottom: '0.25rem' }}>
                  {isOdia ? '💨 ପ୍ରାଣବାୟୁ (Oxygen)' : '💨 Life Gas (Oxygen)'}
                </span>
                <button
                  type="button"
                  onClick={() => handleSlotClick(oxySlot)}
                  style={{
                    width: '100%',
                    minHeight: '62px',
                    borderRadius: 'var(--radius-md)',
                    background: item ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: item ? '2px solid #10b981' : '2px dashed var(--border-subtle)',
                    color: item ? '#ffffff' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {item ? (
                    <>
                      <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                      <span>{isOdia ? item.nameOdia : item.name}</span>
                    </>
                  ) : (
                    <span style={{ fontSize: '0.78rem', fontStyle: 'italic' }}>
                      {isOdia ? '👆 ଅମ୍ଳଜାନ ବସାନ୍ତୁ' : '👆 Place Oxygen'}
                    </span>
                  )}
                </button>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Available Items Pool to Select */}
      {remainingItems.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
            {isOdia ? '👇 ପ୍ରଥମେ ଏଠାରୁ ଉପାଦାନ ବାଛନ୍ତୁ, ତା’ପରେ ଉପର ଚିତ୍ରର ସଠିକ୍ ସ୍ଥାନରେ କ୍ଲିକ୍ କରନ୍ତୁ:' : '👇 Step 1: Select an item below, then Step 2: Click its matching diagram slot above:'}
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {remainingItems.map((item) => {
              const isSelected = selectedItemId === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectPoolItem(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.6rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'var(--primary)' : 'rgba(255, 255, 255, 0.07)',
                    border: isSelected ? '2px solid var(--primary-light)' : '1px solid var(--border-subtle)',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 0 16px var(--primary-glow)' : 'none',
                    transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  <span>{isOdia ? item.nameOdia : item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Error feedback if misarranged */}
      {feedbackError && (
        <div
          style={{
            padding: '0.75rem 1rem',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            borderRadius: 'var(--radius-sm)',
            color: '#f87171',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
          }}
        >
          {feedbackError}
        </div>
      )}

      {/* Success Celebration */}
      {isSuccess && (
        <div
          className="glass-card"
          style={{
            padding: '1.5rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(30, 58, 138, 0.45) 100%)',
            border: '1px solid #10b981',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <Sparkles size={32} color="#f59e0b" style={{ margin: '0 auto 0.5rem' }} />
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>
            {isOdia ? '🎉 ଆଲୋକସଂଶ୍ଳେଷଣ ପ୍ରକ୍ରିୟା ସମ୍ପୂର୍ଣ୍ଣ ସଫଳ!' : '🎉 Process Diagram Mastered!'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            {isOdia
              ? 'ସୂର୍ଯ୍ୟାଲୋକ + ଜଳ + CO₂ → କ୍ଲୋରୋଫିଲ୍ → ଗ୍ଲୁକୋଜ୍ + ଅମ୍ଳଜାନ! +୩୦ XP ଅର୍ଜିତ।'
              : 'Sunlight + Water + CO2 → Chlorophyll → Glucose + Oxygen! +30 XP Awarded. The plant is growing strong.'}
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleReset} className="btn btn-secondary" style={{ minHeight: '44px' }}>
              <RotateCcw size={16} />
              <span>{isOdia ? 'ପୁନର୍ବାର ସଜାନ୍ତୁ' : 'Rearrange'}</span>
            </button>

            <button
              onClick={handleProceed}
              className="btn btn-primary"
              style={{ minHeight: '44px', padding: '0.6rem 1.75rem', fontWeight: 700 }}
            >
              <span>{isOdia ? 'ପରବର୍ତ୍ତୀ ପର୍ଯ୍ୟାୟ (Level 3)' : 'Next Level: Missing Resource Scenarios'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
