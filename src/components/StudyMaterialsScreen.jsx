import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Download, Eye, ChevronRight, ArrowRight, FileText, FlaskConical, Beaker } from 'lucide-react';

// ─── 9th: Exploration (2026-27) ───────────────────────────────
const EXPLORATION_CHAPTERS = [
  { num: 1,  file: 'iesc101.pdf', title: 'Exploration: Entering the World of Secondary Science' },
  { num: 2,  file: 'iesc102.pdf', title: 'Cell: The Building Block of Life' },
  { num: 3,  file: 'iesc103.pdf', title: 'Tissues in Action' },
  { num: 4,  file: 'iesc104.pdf', title: 'Describing Motion Around Us' },
  { num: 5,  file: 'iesc105.pdf', title: 'Exploring Mixtures and their Separation' },
  { num: 6,  file: 'iesc106.pdf', title: 'How Forces Affect Motion' },
  { num: 7,  file: 'iesc107.pdf', title: 'Work, Energy, and Simple Machines' },
  { num: 8,  file: 'iesc108.pdf', title: 'Journey Inside the Atom' },
  { num: 9,  file: 'iesc109.pdf', title: 'Atomic Foundations of Matter' },
  { num: 10, file: 'iesc110.pdf', title: 'Sound Wave: Characteristics and Applications' },
  { num: 11, file: 'iesc111.pdf', title: 'Reproduction: How Life Continues' },
  { num: 12, file: 'iesc112.pdf', title: 'Patterns in Life: Diversity and Classification' },
  { num: 13, file: 'iesc113.pdf', title: 'Earth as a System: Energy, Matter, and Life' },
];

// ─── 10th: Science (2026-27) ─────────────────────────────────
const SCIENCE10_CHAPTERS = [
  { num: 1,  file: 'jesc101.pdf', title: 'Chemical Reactions and Equations' },
  { num: 2,  file: 'jesc102.pdf', title: 'Acids, Bases and Salts' },
  { num: 3,  file: 'jesc103.pdf', title: 'Metals and Non-metals' },
  { num: 4,  file: 'jesc104.pdf', title: 'Carbon and Its Compounds' },
  { num: 5,  file: 'jesc105.pdf', title: 'Life Processes' },
  { num: 6,  file: 'jesc106.pdf', title: 'Control and Coordination' },
  { num: 7,  file: 'jesc107.pdf', title: 'How do Organisms Reproduce?' },
  { num: 8,  file: 'jesc108.pdf', title: 'Heredity and Evolution' },
  { num: 9,  file: 'jesc109.pdf', title: 'Light – Reflection and Refraction' },
  { num: 10, file: 'jesc110.pdf', title: 'The Human Eye and the Colourful World' },
  { num: 11, file: 'jesc111.pdf', title: 'Electricity' },
  { num: 12, file: 'jesc112.pdf', title: 'Magnetic Effects of Electric Current' },
  { num: 13, file: 'jesc113.pdf', title: 'Our Environment' },
];

// ─── 10th extra PDFs ──────────────────────────────────────────
const EXTRA_10TH = [
  { title: 'Metals & Non-Metals — Eureka Notes', file: 'Eureka notesMetals and NonMetals.pdf', path: '/assets/', tag: 'Notes', color: '#059669', bg: '#ECFDF5' },
  { title: 'Science Sample Question Paper (SQP)', file: 'Science-SQP_copy.pdf',               path: '/assets/', tag: 'SQP',   color: '#DC2626', bg: '#FEF2F2' },
];

const CHIP_COLORS = [
  '#7C3AED','#0284C7','#059669','#D97706','#DC2626','#0891B2',
  '#7C3AED','#0284C7','#059669','#D97706','#DC2626','#0891B2','#7C3AED',
];
const CHIP_BG = [
  '#F5F3FF','#EFF6FF','#ECFDF5','#FFFBEB','#FEF2F2','#ECFEFF',
  '#F5F3FF','#EFF6FF','#ECFDF5','#FFFBEB','#FEF2F2','#ECFEFF','#F5F3FF',
];

// ─── Chapter list component ───────────────────────────────────
function ChapterList({ chapters, basePath }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div>
      {chapters.map((ch, i) => {
        const url = `${basePath}${ch.file}`;
        return (
          <div key={ch.num}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0.5rem', borderRadius: '12px', background: hovered === ch.num ? '#F8FAFC' : 'transparent', transition: 'background 0.15s', borderBottom: i < chapters.length - 1 ? '1px solid #F3F4F6' : 'none' }}
            onMouseEnter={() => setHovered(ch.num)}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={{ width: 36, height: 36, borderRadius: '9px', background: CHIP_BG[i], border: `1px solid ${CHIP_COLORS[i]}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 900, fontSize: '0.78rem', color: CHIP_COLORS[i] }}>
              {String(ch.num).padStart(2, '0')}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ch.title}</div>
              <div style={{ fontSize: '0.7rem', color: '#9CA3AF', fontWeight: 600, marginTop: '0.1rem' }}>Chapter {ch.num}</div>
            </div>
            <div className="ch-btns" style={{ display: 'flex', gap: '0.35rem', flexShrink: 0 }}>
              <a href={url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.38rem 0.75rem', borderRadius: '8px', background: '#000', color: '#FFF', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'none' }}>
                <Eye size={12} /><span className="btn-text">View</span>
              </a>
              <a href={url} download={`Ch${String(ch.num).padStart(2,'0')}.pdf`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.38rem 0.75rem', borderRadius: '8px', background: '#F3F4F6', border: '1px solid #E5E7EB', color: '#374151', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'none' }}>
                <Download size={12} /><span className="btn-text">Save</span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────
export default function StudyMaterialsScreen({ onBackToHome, onNavigateToBookDemo }) {
  // view: 'classes' | '9th' | '10th'
  const [view, setView] = useState('classes');

  const handleBack = () => {
    if (view !== 'classes') setView('classes');
    else onBackToHome();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Inter', sans-serif", color: '#111' }}>

      {/* ── Header ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '0.85rem 1.5rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          <button onClick={handleBack}
            style={{ background: '#F3F4F6', border: '1px solid #E5E7EB', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '9999px', flexShrink: 0 }}>
            <ArrowLeft size={18} color="#000" />
          </button>
          <span onClick={onBackToHome} style={{ fontSize: '1.8rem', fontWeight: 400, fontFamily: "'Instrument Serif', Georgia, serif", color: '#000', cursor: 'pointer' }}>
            Eureka
          </span>
          <button onClick={() => onNavigateToBookDemo && onNavigateToBookDemo('Class 10th Science Board Special')}
            style={{ background: '#000', color: '#FFF', border: 'none', padding: '0.55rem 1.1rem', borderRadius: '9999px', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
            Book Demo <ArrowRight size={13} color="#FFF" />
          </button>
        </div>
      </header>

      {/* ══════ VIEW 1: Class selector ══════════════════════════ */}
      {view === 'classes' && (
        <main style={{ maxWidth: '560px', margin: '0 auto', padding: '2.5rem 1.25rem 5rem', animation: 'fadeIn 0.3s ease' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 1rem', borderRadius: '9999px', background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1D4ED8', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
              <Beaker size={12} /> Free Resources · 2026-27
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400, color: '#000', margin: '0 0 0.6rem', letterSpacing: '-1px', lineHeight: 1.1 }}>
              Study Materials
            </h1>
            <p style={{ color: '#6B7280', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
              Select your class to view textbook chapters and notes
            </p>
          </div>

          {/* Class cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* 9th card */}
            <button onClick={() => setView('9th')}
              style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '20px', padding: '1.5rem 1.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.1rem', textAlign: 'left', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', transition: 'all 0.2s', width: '100%' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(124,58,237,0.12)'; e.currentTarget.style.borderColor = '#A78BFA'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#E5E7EB'; }}
            >
              <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'linear-gradient(135deg, #1E1B4B, #3730A3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FlaskConical size={26} color="#FFF" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.2rem' }}>NCERT · 2026-27</div>
                <div style={{ fontWeight: 900, fontSize: '1.3rem', color: '#000', letterSpacing: '-0.5px' }}>Class 9th</div>
                <div style={{ fontSize: '0.82rem', color: '#6B7280', marginTop: '0.2rem' }}>Exploration · 13 Chapters</div>
              </div>
              <ChevronRight size={22} color="#9CA3AF" style={{ flexShrink: 0 }} />
            </button>

            {/* 10th card */}
            <button onClick={() => setView('10th')}
              style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '20px', padding: '1.5rem 1.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.1rem', textAlign: 'left', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', transition: 'all 0.2s', width: '100%' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(2,132,199,0.12)'; e.currentTarget.style.borderColor = '#7DD3FC'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#E5E7EB'; }}
            >
              <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'linear-gradient(135deg, #0C4A6E, #0284C7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <BookOpen size={26} color="#FFF" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0284C7', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.2rem' }}>NCERT · 2026-27</div>
                <div style={{ fontWeight: 900, fontSize: '1.3rem', color: '#000', letterSpacing: '-0.5px' }}>Class 10th</div>
                <div style={{ fontSize: '0.82rem', color: '#6B7280', marginTop: '0.2rem' }}>Science · 13 Chapters + Notes & SQP</div>
              </div>
              <ChevronRight size={22} color="#9CA3AF" style={{ flexShrink: 0 }} />
            </button>
          </div>
        </main>
      )}

      {/* ══════ VIEW 2: Class 9th material ══════════════════════ */}
      {view === '9th' && (
        <main style={{ maxWidth: '680px', margin: '0 auto', padding: '2rem 1.25rem 5rem', animation: 'fadeIn 0.3s ease' }}>
          {/* Section header */}
          <div style={{ background: 'linear-gradient(135deg, #1E1B4B, #3730A3)', borderRadius: '18px', padding: '1.4rem 1.6rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 46, height: 46, borderRadius: '12px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FlaskConical size={22} color="#FFF" />
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.15rem' }}>NCERT · Class 9th · 2026-27</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>Exploration</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.1rem' }}>13 Chapters · Click View or Save</div>
            </div>
          </div>

          <div style={{ background: '#FFF', borderRadius: '18px', border: '1px solid #E5E7EB', padding: '0.6rem 1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <ChapterList chapters={EXPLORATION_CHAPTERS} basePath="/assets/exploration/" />
          </div>
        </main>
      )}

      {/* ══════ VIEW 3: Class 10th material ═════════════════════ */}
      {view === '10th' && (
        <main style={{ maxWidth: '680px', margin: '0 auto', padding: '2rem 1.25rem 5rem', animation: 'fadeIn 0.3s ease' }}>
          {/* Section header */}
          <div style={{ background: 'linear-gradient(135deg, #0C4A6E, #0284C7)', borderRadius: '18px', padding: '1.4rem 1.6rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 46, height: 46, borderRadius: '12px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <BookOpen size={22} color="#FFF" />
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.15rem' }}>NCERT · Class 10th · 2026-27</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>Science</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.1rem' }}>13 Chapters + Notes & SQP</div>
            </div>
          </div>

          {/* Chapters */}
          <div style={{ background: '#FFF', borderRadius: '18px', border: '1px solid #E5E7EB', padding: '0.6rem 1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '1rem' }}>
            <ChapterList chapters={SCIENCE10_CHAPTERS} basePath="/assets/10th-science/" />
          </div>

          {/* Extra PDFs */}
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.6rem', paddingLeft: '0.25rem' }}>
            Eureka Notes &amp; Sample Papers
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {EXTRA_10TH.map((m, i) => {
              const url = `${m.path}${m.file}`;
              return (
                <div key={i} style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '14px', padding: '1rem 1.1rem', display: 'flex', alignItems: 'center', gap: '0.9rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '10px', background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FileText size={18} color={m.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: m.color, background: m.bg, padding: '0.1rem 0.45rem', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{m.tag}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.87rem', color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.title}</div>
                  </div>
                  <div className="ch-btns" style={{ display: 'flex', gap: '0.35rem', flexShrink: 0 }}>
                    <a href={url} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.42rem 0.8rem', borderRadius: '8px', background: '#000', color: '#FFF', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'none' }}>
                      <Eye size={12} /><span className="btn-text">View</span>
                    </a>
                    <a href={url} download={m.file}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.42rem 0.8rem', borderRadius: '8px', background: '#F3F4F6', border: '1px solid #E5E7EB', color: '#374151', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'none' }}>
                      <Download size={12} /><span className="btn-text">Save</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Mobile */
        @media (max-width: 480px) {
          .btn-text { display: none; }
          .ch-btns a { padding: 0.42rem 0.6rem !important; }
          .ch-btns { gap: 0.25rem !important; }
        }
        @media (max-width: 380px) {
          main { padding-left: 0.75rem !important; padding-right: 0.75rem !important; }
        }
      `}</style>
    </div>
  );
}
