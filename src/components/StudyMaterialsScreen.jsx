import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Download, Eye, ChevronRight, ArrowRight, FileText, Beaker, FlaskConical } from 'lucide-react';

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

// ─── 10th extra materials ─────────────────────────────────────
const EXTRA_MATERIALS = [
  {
    title: 'Metals & Non-Metals — Eureka Notes',
    file: 'Eureka notesMetals and NonMetals.pdf',
    basePath: '/assets/',
    tag: 'Notes',
    tagColor: '#059669', tagBg: '#ECFDF5',
    desc: 'Handcrafted notes by Abhishek Sir',
  },
  {
    title: 'Science Sample Question Paper (SQP)',
    file: 'Science-SQP_copy.pdf',
    basePath: '/assets/',
    tag: 'SQP',
    tagColor: '#DC2626', tagBg: '#FEF2F2',
    desc: 'CBSE pattern sample paper',
  },
];

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

// ─── Reusable chapter accordion ──────────────────────────────
function ChapterAccordion({ chapters, basePath, isOpen, onToggle, gradient, label, subtitle }) {
  const [hoveredCh, setHoveredCh] = useState(null);
  return (
    <div style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
      {/* Header */}
      <div
        onClick={onToggle}
        style={{ background: gradient, padding: '1.4rem 1.6rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', userSelect: 'none' }}
      >
        <div style={{ width: 46, height: 46, borderRadius: '12px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <BookOpen size={22} color="#FFF" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
            {label}
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFF', letterSpacing: '-0.3px' }}>{subtitle}</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.1rem' }}>
            {chapters.length} Chapters · {isOpen ? 'Click to collapse' : 'Click to expand'}
          </div>
        </div>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'transform 0.3s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
          <ChevronRight size={16} color="#FFF" />
        </div>
      </div>

      {/* Chapter list */}
      {isOpen && (
        <div style={{ padding: '0.4rem' }}>
          {chapters.map((ch, i) => {
            const c = CHIP_COLORS[i];
            const pdfUrl = `${basePath}${ch.file}`;
            return (
              <div
                key={ch.num}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 0.9rem', borderRadius: '12px', background: hoveredCh === ch.num ? '#F8FAFC' : 'transparent', transition: 'background 0.15s' }}
                onMouseEnter={() => setHoveredCh(ch.num)}
                onMouseLeave={() => setHoveredCh(null)}
              >
                {/* Number chip */}
                <div style={{ width: 36, height: 36, borderRadius: '9px', background: c.bg, border: `1px solid ${c.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 900, fontSize: '0.78rem', color: c.color }}>
                  {String(ch.num).padStart(2, '0')}
                </div>
                {/* Title */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {ch.title}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#9CA3AF', marginTop: '0.1rem', fontWeight: 600 }}>Chapter {ch.num}</div>
                </div>
                {/* Buttons */}
                <div className="ch-actions" style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.8rem', borderRadius: '8px', background: '#000', color: '#FFF', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'none' }}>
                    <Eye size={12} /> <span className="btn-label">View</span>
                  </a>
                  <a href={pdfUrl} download={`Ch${String(ch.num).padStart(2,'0')}_${ch.file}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.8rem', borderRadius: '8px', background: '#F3F4F6', border: '1px solid #E5E7EB', color: '#374151', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'none' }}>
                    <Download size={12} /> <span className="btn-label">Save</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────
export default function StudyMaterialsScreen({ onBackToHome, onNavigateToBookDemo }) {
  const [open9th, setOpen9th] = useState(false);
  const [open10th, setOpen10th] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', color: '#000', fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <header className="subscreen-header" style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '0.85rem 1.5rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          <button onClick={onBackToHome} style={{ background: '#F3F4F6', border: '1px solid #E5E7EB', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '9999px', flexShrink: 0 }}>
            <ArrowLeft size={18} color="#000" />
          </button>
          <span onClick={onBackToHome} style={{ fontSize: '1.8rem', fontWeight: 400, fontFamily: "'Instrument Serif', Georgia, serif", color: '#000', cursor: 'pointer' }}>
            Eureka
          </span>
          <button onClick={() => onNavigateToBookDemo && onNavigateToBookDemo('Class 10th Science Board Special')}
            style={{ background: '#000', color: '#FFF', border: 'none', padding: '0.55rem 1.2rem', borderRadius: '9999px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
            Book Demo <ArrowRight size={14} color="#FFF" />
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem 1.25rem 6rem' }}>

        {/* Page title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.35rem 1rem', borderRadius: '9999px', background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1D4ED8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
            <Beaker size={13} /> Free Academic Resources · 2026-27
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400, color: '#000', margin: '0 0 0.75rem', letterSpacing: '-1px', lineHeight: 1.1 }}>
            Study Materials
          </h1>
          <p style={{ color: '#6B7280', fontSize: '1rem', maxWidth: '36rem', margin: '0 auto', lineHeight: 1.65 }}>
            NCERT textbook chapters + Eureka exclusive notes. Select your class below.
          </p>
        </div>

        {/* ── Class labels ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ padding: '0.6rem 1rem', borderRadius: '12px', background: '#F5F3FF', border: '1px solid #DDD6FE', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FlaskConical size={16} color="#7C3AED" />
            <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#7C3AED' }}>Class 9th</span>
          </div>
          <div style={{ padding: '0.6rem 1rem', borderRadius: '12px', background: '#EFF6FF', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FlaskConical size={16} color="#0284C7" />
            <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0284C7' }}>Class 10th</span>
          </div>
        </div>

        {/* ── 9th Accordion ── */}
        <div style={{ marginBottom: '1rem' }}>
          <ChapterAccordion
            chapters={EXPLORATION_CHAPTERS}
            basePath="/assets/exploration/"
            isOpen={open9th}
            onToggle={() => setOpen9th(p => !p)}
            gradient="linear-gradient(135deg, #1E1B4B 0%, #3730A3 100%)"
            label="NCERT · Class 9th Science · 2026-27"
            subtitle="Exploration"
          />
        </div>

        {/* ── 10th Accordion ── */}
        <div style={{ marginBottom: '1.5rem' }}>
          <ChapterAccordion
            chapters={SCIENCE10_CHAPTERS}
            basePath="/assets/10th-science/"
            isOpen={open10th}
            onToggle={() => setOpen10th(p => !p)}
            gradient="linear-gradient(135deg, #0C4A6E 0%, #0284C7 100%)"
            label="NCERT · Class 10th Science · 2026-27"
            subtitle="Science"
          />
        </div>

        {/* ── Extra Materials (Notes + SQP) ── */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.75rem', paddingLeft: '0.25rem' }}>
            Eureka Notes &amp; Sample Papers
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {EXTRA_MATERIALS.map((m, i) => {
              const url = `${m.basePath}${m.file}`;
              return (
                <div key={i} style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '11px', background: m.tagBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FileText size={20} color={m.tagColor} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, color: m.tagColor, background: m.tagBg, padding: '0.1rem 0.5rem', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.tag}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.title}</div>
                    <div style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: '0.1rem' }}>{m.desc}</div>
                  </div>
                  <div className="ch-actions" style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                    <a href={url} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.45rem 0.85rem', borderRadius: '8px', background: '#000', color: '#FFF', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none' }}>
                      <Eye size={13} /> <span className="btn-label">View</span>
                    </a>
                    <a href={url} download={m.file}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.45rem 0.85rem', borderRadius: '8px', background: '#F3F4F6', border: '1px solid #E5E7EB', color: '#374151', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none' }}>
                      <Download size={13} /> <span className="btn-label">Save</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coming soon */}
        <div style={{ textAlign: 'center', padding: '1.8rem 1rem', background: '#FFF', borderRadius: '20px', border: '1px solid #E5E7EB' }}>
          <FileText size={28} color="#D1D5DB" style={{ marginBottom: '0.6rem' }} />
          <div style={{ fontWeight: 700, color: '#374151', fontSize: '0.95rem', marginBottom: '0.25rem' }}>More Materials Coming Soon</div>
          <p style={{ fontSize: '0.85rem', color: '#6B7280', maxWidth: '26rem', margin: '0 auto 1rem', lineHeight: 1.6 }}>
            PYQ decoders, formula sheets, and more notes will be added soon.
          </p>
          <button onClick={() => onNavigateToBookDemo && onNavigateToBookDemo('Class 10th Science Board Special')}
            style={{ padding: '0.65rem 1.4rem', borderRadius: '9999px', background: '#000', color: '#FFF', border: 'none', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            Book Demo Class <ArrowRight size={14} />
          </button>
        </div>
      </main>

      <style>{`
        @media (max-width: 520px) {
          .subscreen-header { padding: 0.75rem 1rem !important; }
          .ch-actions { gap: 0.3rem !important; }
          .btn-label { display: none; }
          .ch-actions a { padding: 0.4rem 0.55rem !important; }
        }
        @media (max-width: 400px) {
          main { padding-left: 0.75rem !important; padding-right: 0.75rem !important; }
        }
      `}</style>
    </div>
  );
}
