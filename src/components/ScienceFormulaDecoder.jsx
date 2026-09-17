import React, { useState } from 'react';
import { Eye, Sparkles, X, Lightbulb, Zap, CheckCircle2, HelpCircle } from 'lucide-react';

export default function ScienceFormulaDecoder() {
  const [selectedConcept, setSelectedConcept] = useState(null);

  const concepts = [
    {
      id: 'nacl',
      symbol: 'NaCl',
      name: 'Sodium Chloride (Common Salt)',
      category: 'Chemistry',
      badgeBg: 'var(--accent-amber-soft)',
      color: 'var(--accent-amber)',
      meaning: 'Sodium (Na - Reactive Metal) + Chlorine (Cl - Toxic Gas) react chemically to form non-toxic Common Salt (NaCl)!',
      realLife: 'Makes your daily food tasty & helps conduct electrical nerve signals in your brain and heart!',
      cbseTip: 'Class 10th Chapter: Acids, Bases & Salts. Important for Chlor-Alkali Process & Sodium Hydroxide prep.'
    },
    {
      id: 'emc2',
      symbol: 'E = mc²',
      name: 'Mass-Energy Equivalence',
      category: 'Physics',
      badgeBg: 'var(--primary-blue-soft)',
      color: 'var(--primary-blue)',
      meaning: 'Energy (E) equals Mass (m) times the speed of light squared (c²). A tiny amount of mass can create enormous energy!',
      realLife: 'This is the fundamental principle behind how the Sun produces heat/light and nuclear power plants generate electricity!',
      cbseTip: 'Class 9th & 10th Physics: Work, Energy & Nuclear Reaction Foundation.'
    },
    {
      id: 'fma',
      symbol: 'F = m × a',
      name: 'Newton\'s Second Law of Motion',
      category: 'Physics',
      badgeBg: 'var(--primary-blue-soft)',
      color: 'var(--primary-blue)',
      meaning: 'Force (F) applied on an object equals its Mass (m) multiplied by its Acceleration (a).',
      realLife: 'Why catching a heavy cricket ball hurts your hands more, and why pushing a lighter bicycle is easier than pushing a car!',
      cbseTip: 'Class 9th Physics: Force and Laws of Motion. 100% numerical question guaranteed in exams.'
    },
    {
      id: 'glucose',
      symbol: 'C₆H₁₂O₆',
      name: 'Glucose (Photosynthesis Molecule)',
      category: 'Biology',
      badgeBg: 'var(--accent-emerald-soft)',
      color: 'var(--accent-emerald)',
      meaning: '6 Carbon + 12 Hydrogen + 6 Oxygen atoms synthesized by green plants using Sunlight & Chlorophyll!',
      realLife: 'The primary fuel for all living cells! Gives instant energy when you drink Glucon-D on a hot day.',
      cbseTip: 'Class 10th Biology: Life Processes (Autotrophic Nutrition Equation & Respiration).'
    },
    {
      id: 'ph7',
      symbol: 'pH = 7',
      name: 'Neutral Solution (Pure Water)',
      category: 'Chemistry',
      badgeBg: 'var(--accent-amber-soft)',
      color: 'var(--accent-amber)',
      meaning: 'pH scale measures Hydrogen ion concentration from 0 (Strong Acid) to 14 (Strong Base). 7 is perfectly neutral!',
      realLife: 'Pure drinking water has pH 7. Stomach acid has pH 1.5-2.0 to digest food, while soap water has pH 9-10!',
      cbseTip: 'Class 10th Chemistry: Acids, Bases and Salts (pH scale in everyday life).'
    }
  ];

  return (
    <div style={{ margin: '2rem 0' }}>
      <div className="clay-card" style={{ padding: '1.5rem 1.8rem', borderRadius: '24px', background: '#FFFFFF' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={20} color="var(--primary-blue)" />
            <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              Fun Science Decoders & Formulas
            </h4>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>
            Click 👁️ button to reveal the meaning!
          </span>
        </div>

        {/* Formulas Horizontal Scroll Bar */}
        <div style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {concepts.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.6rem 1rem',
                borderRadius: '14px',
                background: item.badgeBg,
                border: `1px solid ${item.color}30`,
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: '1.05rem', fontWeight: '800', color: item.color, fontFamily: 'monospace' }}>
                {item.symbol}
              </span>
              <button
                onClick={() => setSelectedConcept(item)}
                title={`Click to decode ${item.name}`}
                style={{
                  background: '#FFFFFF',
                  border: `1px solid ${item.color}40`,
                  color: item.color,
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  transition: 'transform 0.2s ease',
                }}
              >
                <Eye size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Inline Decoded Concept Showcase Card */}
        {selectedConcept && (
          <div
            style={{
              marginTop: '1.2rem',
              padding: '1.5rem',
              borderRadius: '20px',
              background: '#F8FAFC',
              border: `2px solid ${selectedConcept.color}40`,
              position: 'relative',
              animation: 'modalFadeIn 0.25s ease-out',
            }}
          >
            {/* Close Inline Card */}
            <button
              onClick={() => setSelectedConcept(null)}
              aria-label="Close formula details"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: '#FFFFFF',
                border: '1px solid var(--border-light)',
                color: 'var(--text-primary)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--clay-shadow-sm)',
              }}
            >
              <X size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '900', color: selectedConcept.color, fontFamily: 'monospace' }}>
                {selectedConcept.symbol}
              </span>
              <span className="clay-badge" style={{ fontSize: '0.72rem', background: selectedConcept.badgeBg, color: selectedConcept.color }}>
                {selectedConcept.category}
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              {selectedConcept.name}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }} className="formula-inline-grid">
              {/* Scientific Meaning Box */}
              <div style={{ padding: '0.9rem 1rem', borderRadius: '14px', background: '#FFFFFF', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  🔬 Scientific Meaning
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  {selectedConcept.meaning}
                </p>
              </div>

              {/* Real Life Example Box */}
              <div style={{ padding: '0.9rem 1rem', borderRadius: '14px', background: 'var(--accent-amber-soft)', border: '1px solid rgba(217, 119, 6, 0.15)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  💡 Everyday Real-Life Example
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  {selectedConcept.realLife}
                </p>
              </div>
            </div>

            {/* CBSE Exam Note */}
            <div style={{ padding: '0.85rem 1rem', borderRadius: '14px', background: 'var(--primary-blue-soft)', border: '1px solid rgba(37, 99, 235, 0.15)', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
              <CheckCircle2 size={18} color="var(--primary-blue)" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--primary-blue)', display: 'block' }}>CBSE Board Exam Insight:</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{selectedConcept.cbseTip}</span>
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 640px) {
          .formula-inline-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
