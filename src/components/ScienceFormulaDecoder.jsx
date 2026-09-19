import React, { useState } from 'react';
import { Sparkles, Eye, CheckCircle2, ChevronDown, ChevronUp, Lightbulb, Zap } from 'lucide-react';

export default function ScienceFormulaDecoder() {
  const [expandedId, setExpandedId] = useState(null);

  const concepts = [
    {
      id: 'nacl',
      symbol: 'NaCl',
      name: 'Sodium Chloride (Common Salt)',
      category: 'Chemistry',
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      meaning: 'Sodium (Na - Explosive Metal) + Chlorine (Cl - Toxic Gas) bond chemically to form non-toxic, delicious Common Salt (NaCl)!',
      realLife: 'Essential for seasoning food and generating electrical nerve impulses in human heart & brain!',
      cbseTip: 'Class 10th Chapter: Acids, Bases & Salts. High frequency question in CBSE Board Chlor-Alkali process.'
    },
    {
      id: 'emc2',
      symbol: 'E = mc²',
      name: 'Mass-Energy Equivalence',
      category: 'Physics',
      color: '#38BDF8',
      bgColor: 'rgba(56, 189, 248, 0.1)',
      meaning: 'Energy (E) equals Mass (m) multiplied by speed of light squared (c²). A tiny speck of mass releases immense atomic energy.',
      realLife: 'Powers the Sun, stellar nuclear fusion, and nuclear power generation across Earth.',
      cbseTip: 'Class 9th & 10th Physics: Key conceptual foundation for Energy Conservation & Nuclear Reactions.'
    },
    {
      id: 'fma',
      symbol: 'F = m × a',
      name: 'Newton\'s Second Law of Motion',
      category: 'Physics',
      color: '#38BDF8',
      bgColor: 'rgba(56, 189, 248, 0.1)',
      meaning: 'Force (F) equals Mass (m) times Acceleration (a). Pushing heavier objects requires proportionally higher force.',
      realLife: 'Explains why catching a cricket ball requires pulling hands backward, and why heavier vehicles need stronger brakes.',
      cbseTip: 'Class 9th Physics: Force and Laws of Motion. 100% numerical question guaranteed in school exam.'
    },
    {
      id: 'glucose',
      symbol: 'C₆H₁₂O₆',
      name: 'Glucose Molecule',
      category: 'Biology',
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      meaning: '6 Carbon + 12 Hydrogen + 6 Oxygen synthesized by green plant leaves using Sunlight & Chlorophyll.',
      realLife: 'Instant cellular fuel for living bodies! Gives rapid energy when drinking Glucon-D.',
      cbseTip: 'Class 10th Biology: Life Processes (Photosynthesis Equation & Aerobic Respiration).'
    },
    {
      id: 'ph7',
      symbol: 'pH = 7',
      name: 'Neutral pH Level (Pure Water)',
      category: 'Chemistry',
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      meaning: 'Logarithmic scale measuring Hydrogen ion concentration. 0-6 Acidic, 7 Neutral, 8-14 Basic.',
      realLife: 'Pure drinking water has pH 7. Stomach digestive acid has pH 1.5-2.0, while hand soap is pH 9-10.',
      cbseTip: 'Class 10th Chemistry: Acids, Bases & Salts (Importance of pH in Everyday Life).'
    }
  ];

  return (
    <div style={{ margin: '2rem 0' }}>
      <div style={{ marginBottom: '1.2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
          <Sparkles size={18} color="var(--primary-blue)" />
          <span style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--primary-blue)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Concept Decoders (Vertical Stack)
          </span>
        </div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
          Fun Science Formulas Decoded
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Click any card to expand scientific meaning, real-life examples, and CBSE exam tips.
        </p>
      </div>

      {/* Vertical Stack of Formula Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {concepts.map((c) => {
          const isExpanded = expandedId === c.id;

          return (
            <div
              key={c.id}
              className="clay-card"
              style={{
                padding: '1.4rem 1.6rem',
                borderRadius: '20px',
                background: 'var(--bg-surface)',
                border: isExpanded ? `1.5px solid ${c.color}` : '1px solid var(--border-light)',
                boxShadow: isExpanded ? `0 8px 24px ${c.color}25` : 'var(--clay-shadow-sm)',
                transition: 'all 0.25s ease',
              }}
            >
              {/* Card Header Row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : c.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '1.3rem',
                      fontWeight: '900',
                      color: c.color,
                      padding: '0.3rem 0.8rem',
                      borderRadius: '10px',
                      background: c.bgColor,
                    }}
                  >
                    {c.symbol}
                  </span>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                      {c.name}
                    </h4>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: c.color, textTransform: 'uppercase' }}>
                      {c.category}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--bg-page)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-blue)',
                    flexShrink: 0,
                  }}
                >
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {/* Expanded Card Details */}
              {isExpanded && (
                <div style={{ marginTop: '1.2rem', paddingTop: '1.2rem', borderTop: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '0.9rem', animation: 'modalFadeIn 0.25s ease-out' }}>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }} className="formula-vertical-grid">
                    {/* Meaning Box */}
                    <div style={{ padding: '0.9rem', borderRadius: '14px', background: 'var(--bg-page)', border: '1px solid var(--border-light)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary-blue)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                        🔬 Scientific Meaning
                      </div>
                      <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {c.meaning}
                      </p>
                    </div>

                    {/* Real Life Box */}
                    <div style={{ padding: '0.9rem', borderRadius: '14px', background: 'var(--accent-amber-soft)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                        💡 Everyday Real-Life Example
                      </div>
                      <p style={{ fontSize: '0.86rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                        {c.realLife}
                      </p>
                    </div>
                  </div>

                  {/* CBSE Board Tip */}
                  <div style={{ padding: '0.8rem 1rem', borderRadius: '12px', background: 'var(--accent-emerald-soft)', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                      <strong style={{ color: 'var(--accent-emerald)' }}>CBSE Insight:</strong> {c.cbseTip}
                    </span>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .formula-vertical-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
