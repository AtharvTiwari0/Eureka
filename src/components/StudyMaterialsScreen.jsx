import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Download, Eye, ChevronRight, ArrowRight, FileText, Beaker } from 'lucide-react';

// ─── Class 9 "Exploration" — 2026-27 NCERT Chapter Data ───────
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

const BASE_PATH = '/assets/exploration/';

const CHIP_COLORS = [
  { color: '#7C3AED', bg: '#F5F3FF' },
  { color: '#0284C7', bg: '#EFF6FF' },
  { color: '#059669', bg: '#ECFDF5' },
  { color: '#D97706', bg: '#FFFBEB' },
  { color: '#DC2626', bg: '#FEF2F2' },
  { color: '#0891B2', bg: '#ECFEFF' },
  { color: '#7C3AED', bg: '#F5F3FF' },
  { color: '#0284C7', bg: '#EFF6FF' },
  { color: '#059669', bg: '#ECFDF5' },
  { color: '#D97706', bg: '#FFFBEB' },
  { color: '#DC2626', bg: '#FEF2F2' },
  { color: '#0891B2', bg: '#ECFEFF' },
  { color: '#7C3AED', bg: '#F5F3FF' },
];

export default function StudyMaterialsScreen({ onBackToHome, onNavigateToBookDemo }) {
  const [hoveredCh, setHoveredCh] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', color: '#000', fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <header className="subscreen-header" style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '0.85rem 1.5rem' }}>
        <div className="subscreen-header-inner" style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          <button onClick={onBackToHome} style={{ background: '#F3F4F6', border: '1px solid #E5E7EB', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '9999px', flexShrink: 0 }}>
            <ArrowLeft size={18} color="#000" />
          </button>
          <span onClick={onBackToHome} style={{ fontSize: '1.8rem', fontWeight: 400, fontFamily: "'Instrument Serif', Georgia, serif", color: '#000', cursor: 'pointer' }}>
            Eureka
          </span>
          <button
            onClick={() => onNavigateToBookDemo && onNavigateToBookDemo('Class 10th Science Board Special')}
            style={{ background: '#000', color: '#FFF', border: 'none', padding: '0.55rem 1.2rem', borderRadius: '9999px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0, whiteSpace: 'nowrap' }}
          >
            Book Demo <ArrowRight size={14} color="#FFF" />
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '2.5rem 1.25rem 6rem' }}>

        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.35rem 1rem', borderRadius: '9999px', background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1D4ED8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
            <Beaker size={13} /> Free Academic Resources · 2026-27
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400, color: '#000', margin: '0 0 0.75rem', letterSpacing: '-1px', lineHeight: 1.1 }}>
            Study Materials
          </h1>
          <p style={{ color: '#6B7280', fontSize: '1rem', maxWidth: '36rem', margin: '0 auto', lineHeight: 1.65 }}>
            Download or view chapters directly from the NCERT <strong style={{ color: '#000' }}>Exploration</strong> textbook for Class 9th. New curriculum · 2026-27 session.
          </p>
        </div>

        {/* Exploration accordion card */}
        <div style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>

          {/* Clickable header */}
          <div
            onClick={() => setIsOpen(prev => !prev)}
            style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #3730A3 100%)', padding: '1.6rem 1.8rem', display: 'flex', alignItems: 'center', gap: '1.1rem', cursor: 'pointer', userSelect: 'none' }}
          >
            <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <BookOpen size={26} color="#FFF" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                NCERT · Class 9th Science · 2026-27
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFF', letterSpacing: '-0.3px' }}>Exploration</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.15rem' }}>
                13 Chapters · {isOpen ? 'Click to collapse' : 'Click to expand'}
              </div>
            </div>
            {/* Arrow */}
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
              <ChevronRight size={18} color="#FFF" />
            </div>
          </div>

          {/* Chapter list — only when open */}
          {isOpen && (
            <div style={{ padding: '0.5rem' }}>
              {EXPLORATION_CHAPTERS.map((ch, i) => {
                const c = CHIP_COLORS[i];
                const pdfUrl = `${BASE_PATH}${ch.file}`;
                const isHovered = hoveredCh === ch.num;
                return (
                  <div
                    key={ch.num}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.9rem 1rem', borderRadius: '14px', background: isHovered ? '#F8FAFC' : 'transparent', transition: 'background 0.15s', cursor: 'default' }}
                    onMouseEnter={() => setHoveredCh(ch.num)}
                    onMouseLeave={() => setHoveredCh(null)}
                  >
                    {/* Number chip */}
                    <div style={{ width: 38, height: 38, borderRadius: '10px', background: c.bg, border: `1px solid ${c.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 900, fontSize: '0.82rem', color: c.color }}>
                      {String(ch.num).padStart(2, '0')}
                    </div>

                    {/* Title */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111', lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {ch.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: '0.15rem', fontWeight: 600 }}>
                        Chapter {ch.num}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="ch-actions" style={{ display: 'flex', gap: '0.45rem', flexShrink: 0 }}>
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.45rem 0.85rem', borderRadius: '8px', background: '#000', color: '#FFF', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none' }}
                      >
                        <Eye size={13} /> <span className="btn-label">View</span>
                      </a>
                      <a
                        href={pdfUrl}
                        download={`Exploration_Ch${String(ch.num).padStart(2, '0')}.pdf`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.45rem 0.85rem', borderRadius: '8px', background: '#F3F4F6', border: '1px solid #E5E7EB', color: '#374151', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none' }}
                      >
                        <Download size={13} /> <span className="btn-label">Save</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* More coming soon */}
        <div style={{ textAlign: 'center', padding: '2rem 1rem', background: '#FFF', borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <FileText size={32} color="#D1D5DB" style={{ marginBottom: '0.7rem' }} />
          <div style={{ fontWeight: 700, color: '#374151', fontSize: '1rem', marginBottom: '0.3rem' }}>More Materials Coming Soon</div>
          <p style={{ fontSize: '0.88rem', color: '#6B7280', maxWidth: '28rem', margin: '0 auto 1.2rem', lineHeight: 1.6 }}>
            Formula sheets, PYQ decoders, and Class 10th materials will be added soon.
          </p>
          <button
            onClick={() => onNavigateToBookDemo && onNavigateToBookDemo('Class 10th Science Board Special')}
            style={{ padding: '0.7rem 1.6rem', borderRadius: '9999px', background: '#000', color: '#FFF', border: 'none', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            Book Demo Class <ArrowRight size={14} />
          </button>
        </div>
      </main>

      <style>{`
        @media (max-width: 520px) {
          .subscreen-header { padding: 0.75rem 1rem !important; }
          .ch-actions { gap: 0.3rem !important; }
          .btn-label { display: none; }
          .ch-actions a { padding: 0.45rem 0.6rem !important; }
        }
      `}</style>
    </div>
  );
}
