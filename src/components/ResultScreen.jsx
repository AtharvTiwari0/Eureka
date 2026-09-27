import React, { useState } from 'react';
import { ArrowLeft, Trophy, BookOpen, Calendar, Hash, Search, AlertCircle, ChevronRight, CheckCircle2 } from 'lucide-react';

// ─── STUDENT DATA ─────────────────────────────────────────────
const STUDENTS = {
  '10th': {
    '2E01': 'Akanksha Chauhan',
    '2E02': 'Akshat Rajput',
    '2E03': 'Ananya Patel',
    '2E04': 'Anshika Diwakar',
    '2E05': 'Gunjan Verma',
    '2E06': 'Harsh',
    '2E07': 'Himanshi Chaurasiya',
    '2E08': 'Kavya Verma',
    '2E09': 'Priya Yadav',
    '2E10': 'Raunak Parihar',
    '2E11': 'Rohini Yadav',
    '2E12': 'Rohit Yadav',
    '2E13': 'Saksham Yadav',
    '2E14': 'Yuvraj',
  },
  '9th': {
    '3E01': 'Anuj Tripathi',
    '3E02': 'Arun Rajpoot',
    '3E03': 'Atharv',
    '3E04': 'Gaurav',
    '3E05': 'Harsh Sengar',
    '3E06': 'Hitendra',
    '3E07': 'Naman Patel',
    '3E08': 'Om Parihar',
    '3E09': 'Sameer Mansoori',
    '3E10': 'Subh Nigam',
    '3E11': 'Vaibhav Verma',
  },
};

// ─── TEST DATA ────────────────────────────────────────────────
// status: 'coming-soon' → results not published yet
// status: 'live'        → results are available
// To add a result: under results → class → roll: { marks: XX }
// ─────────────────────────────────────────────────────────────
const TESTS = [
  {
    id: 'sunday-mix-test-1',
    title: 'Class 9th & 10th Mix Test',
    subtitle: 'Sunday Special Assessment',
    date: '27 Sep 2026',
    subject: 'Science (PCB)',
    maxMarks: 50,
    badge: 'Mixed',
    badgeColor: '#7C3AED',
    badgeBg: '#F5F3FF',
    status: 'coming-soon', // ← change to 'live' once results are ready
    classes: ['9th', '10th'],
    results: {
      '9th': {
        // Add here after test e.g: '3E01': { marks: 40 }
      },
      '10th': {
        // Add here after test e.g: '2E01': { marks: 38 }
      },
    },
  },
];

// ─── GRADE HELPER ─────────────────────────────────────────────
function getGrade(marks, max) {
  const pct = (marks / max) * 100;
  if (pct >= 90) return { grade: 'A+', color: '#059669', bg: '#ECFDF5', label: 'Outstanding' };
  if (pct >= 80) return { grade: 'A',  color: '#0284C7', bg: '#EFF6FF', label: 'Excellent' };
  if (pct >= 70) return { grade: 'B+', color: '#7C3AED', bg: '#F5F3FF', label: 'Very Good' };
  if (pct >= 60) return { grade: 'B',  color: '#D97706', bg: '#FFFBEB', label: 'Good' };
  if (pct >= 50) return { grade: 'C',  color: '#EA580C', bg: '#FFF7ED', label: 'Average' };
  return { grade: 'D', color: '#DC2626', bg: '#FEF2F2', label: 'Needs Improvement' };
}

// ─── COMPONENT ────────────────────────────────────────────────
export default function ResultScreen({ onBackToHome }) {
  const [view, setView] = useState('tests'); // 'tests' | 'search'
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [rollInput, setRollInput] = useState('');
  const [result, setResult] = useState(null);

  const handleOpenTest = (test) => {
    setSelectedTest(test);
    setSelectedClass('');
    setRollInput('');
    setResult(null);
    setView('search');
  };

  const handleBack = () => {
    if (view === 'search') {
      setView('tests');
      setSelectedTest(null);
      setResult(null);
    } else {
      onBackToHome();
    }
  };

  const handleSearch = () => {
    const roll = rollInput.trim().toUpperCase();
    if (!roll || !selectedClass) return;
    const studentName = STUDENTS[selectedClass]?.[roll];
    if (!studentName) {
      setResult({ found: false });
      return;
    }
    const marksData = selectedTest.results[selectedClass]?.[roll];
    setResult({ found: true, studentName, roll, marksData, maxMarks: selectedTest.maxMarks });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Inter', sans-serif", color: '#111' }}>

      {/* ── HEADER ── */}
      <header className="subscreen-header" style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '0.85rem 1.5rem' }}>
        <div className="subscreen-header-inner" style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          <button onClick={handleBack} title={view === 'search' ? 'Back to Tests' : 'Back to Home'} style={{ background: '#F3F4F6', border: '1px solid #E5E7EB', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '9999px', flexShrink: 0 }}>
            <ArrowLeft size={18} color="#000" />
          </button>
          <span onClick={onBackToHome} style={{ fontSize: '1.8rem', fontWeight: 400, fontFamily: "'Instrument Serif', Georgia, serif", color: '#000', cursor: 'pointer' }}>
            Eureka
          </span>
          <div style={{ padding: '0.3rem 0.85rem', borderRadius: '9999px', background: '#FFF7ED', border: '1px solid #FDE68A', color: '#D97706', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Trophy size={12} /> Results
          </div>
        </div>
      </header>

      {/* ══ VIEW: TEST LIST ══════════════════════════════════ */}
      {view === 'tests' && (
        <main style={{ maxWidth: '680px', margin: '0 auto', padding: '2.5rem 1.25rem 5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.2rem' }}>
            <h1 style={{ fontSize: 'clamp(1.9rem, 5vw, 2.8rem)', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400, color: '#000', margin: '0 0 0.5rem', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
              Test Results
            </h1>
            <p style={{ color: '#6B7280', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
              Select a test below to check your result
            </p>
          </div>

          {TESTS.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#FFF', borderRadius: '20px', border: '1px solid #E5E7EB' }}>
              <BookOpen size={40} color="#D1D5DB" style={{ marginBottom: '0.8rem' }} />
              <div style={{ fontWeight: 700, color: '#374151' }}>No tests published yet</div>
              <div style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: '0.3rem' }}>Results will appear here after each test.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {TESTS.map(test => (
                <button
                  key={test.id}
                  onClick={() => handleOpenTest(test)}
                  className="result-test-card"
                  style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '18px', padding: '1.3rem 1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', textAlign: 'left', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.2s ease', width: '100%' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
                    <div style={{ width: 48, height: 48, borderRadius: '14px', background: test.badgeBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Trophy size={22} color={test.badgeColor} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      {/* Badges row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.15rem 0.55rem', borderRadius: '9999px', background: test.badgeBg, color: test.badgeColor, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {test.badge}
                        </span>
                        {test.status === 'coming-soon' && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.15rem 0.55rem', borderRadius: '9999px', background: '#FFF7ED', border: '1px solid #FDE68A', color: '#D97706', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }} />
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: '#000', lineHeight: 1.2, marginBottom: '0.2rem' }}>{test.title}</div>
                      <div style={{ fontSize: '0.8rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={12} />{test.date}</span>
                        <span>•</span>
                        <span>{test.subject}</span>
                        <span>•</span>
                        <span>Max: {test.maxMarks} marks</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={20} color="#9CA3AF" style={{ flexShrink: 0 }} />
                </button>
              ))}
            </div>
          )}
        </main>
      )}

      {/* ══ VIEW: SEARCH / RESULT ════════════════════════════ */}
      {view === 'search' && selectedTest && (
        <main className="result-search-main" style={{ maxWidth: '540px', margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

          {/* Test info banner */}
          <div style={{ background: selectedTest.badgeBg, border: `1px solid ${selectedTest.badgeColor}33`, borderRadius: '14px', padding: '0.85rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.8rem', flexWrap: 'wrap' }}>
            <Trophy size={18} color={selectedTest.badgeColor} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#000', marginBottom: '0.1rem' }}>{selectedTest.title}</div>
              <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>{selectedTest.date} &nbsp;·&nbsp; Max: {selectedTest.maxMarks} marks</div>
            </div>
          </div>

          {/* Step 1: Class */}
          <div style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '18px', padding: '1.5rem', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.8rem' }}>
              Step 1 — Select Your Class
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {selectedTest.classes.map(cls => (
                <button
                  key={cls}
                  onClick={() => { setSelectedClass(cls); setResult(null); setRollInput(''); }}
                  className="result-class-btn"
                  style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', border: `2px solid ${selectedClass === cls ? '#000' : '#E5E7EB'}`, background: selectedClass === cls ? '#000' : '#FFF', color: selectedClass === cls ? '#FFF' : '#374151', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                >
                  {selectedClass === cls && <CheckCircle2 size={15} />}
                  Class {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Roll number OR Coming Soon */}
          <div style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '18px', padding: '1.5rem', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.8rem' }}>
              Step 2 — Enter Your Roll Number
            </div>

            {selectedTest.status === 'coming-soon' ? (
              /* ── Coming Soon block ── */
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '12px', padding: '1rem 1.1rem' }}>
                <div style={{ fontSize: '1.6rem', lineHeight: 1, flexShrink: 0 }}>⏳</div>
                <div>
                  <div style={{ fontWeight: 800, color: '#92400E', fontSize: '0.95rem' }}>Results Coming Soon</div>
                  <div style={{ fontSize: '0.82rem', color: '#B45309', marginTop: '0.2rem', lineHeight: 1.5 }}>
                    Test is scheduled for <strong>27 Sep 2026</strong>. Results will be published after correction.
                  </div>
                </div>
              </div>
            ) : (
              /* ── Roll number input ── */
              <div className="result-roll-row" style={{ display: 'flex', gap: '0.6rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <Hash size={15} color="#9CA3AF" style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    disabled={!selectedClass}
                    value={rollInput}
                    onChange={e => { setRollInput(e.target.value); setResult(null); }}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    placeholder={selectedClass === '10th' ? 'e.g. 2E01' : selectedClass === '9th' ? 'e.g. 3E01' : 'Select class first'}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '0.75rem 0.9rem 0.75rem 2.1rem', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontSize: '1rem', fontWeight: 700, color: '#111', outline: 'none', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'Inter', sans-serif", background: selectedClass ? '#FFF' : '#F9FAFB' }}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={!selectedClass || !rollInput.trim()}
                  style={{ padding: '0.75rem 1.2rem', borderRadius: '12px', background: (selectedClass && rollInput.trim()) ? '#000' : '#E5E7EB', color: (selectedClass && rollInput.trim()) ? '#FFF' : '#9CA3AF', border: 'none', cursor: (selectedClass && rollInput.trim()) ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.9rem', transition: 'all 0.2s', flexShrink: 0 }}
                >
                  <Search size={16} />
                  Check
                </button>
              </div>
            )}
          </div>

          {/* Result: Not found */}
          {result && !result.found && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '14px', padding: '1rem 1.2rem', color: '#DC2626', fontSize: '0.9rem', fontWeight: 600 }}>
              <AlertCircle size={20} color="#DC2626" style={{ flexShrink: 0 }} />
              <div>
                <div>Roll number not found.</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 500, marginTop: '0.15rem', color: '#EF4444' }}>Check if you selected the correct class and entered the right roll number.</div>
              </div>
            </div>
          )}

          {/* Result: Found */}
          {result && result.found && (
            <div style={{ animation: 'fadeInUp 0.35s ease' }}>
              {/* Student name */}
              <div style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '18px', padding: '1.3rem 1.4rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.2rem', fontWeight: 800, color: '#1565C0' }}>
                  {result.studentName.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#000' }}>{result.studentName}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '0.1rem' }}>
                    Roll No: <strong style={{ color: '#000' }}>{result.roll}</strong> &nbsp;·&nbsp; Class {selectedClass}
                  </div>
                </div>
              </div>

              {/* Marks */}
              {!result.marksData ? (
                <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '16px', padding: '1.3rem 1.4rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <BookOpen size={22} color="#D97706" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#92400E' }}>Result not published yet</div>
                    <div style={{ fontSize: '0.83rem', color: '#B45309', marginTop: '0.2rem' }}>Your result for this test will be available soon.</div>
                  </div>
                </div>
              ) : (() => {
                const g = getGrade(result.marksData.marks, result.maxMarks);
                const pct = Math.round((result.marksData.marks / result.maxMarks) * 100);
                return (
                  <div style={{ background: '#FFF', border: `2px solid ${g.color}33`, borderRadius: '18px', padding: '1.5rem', boxShadow: `0 4px 20px ${g.color}18` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#000' }}>{selectedTest.title}</div>
                        <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '0.15rem' }}>{selectedTest.subject} · {selectedTest.date}</div>
                      </div>
                      <div style={{ padding: '0.4rem 1rem', borderRadius: '9999px', background: g.bg, color: g.color, fontWeight: 900, fontSize: '1.3rem', letterSpacing: '-0.5px', flexShrink: 0 }}>
                        {g.grade}
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
                      <div style={{ fontSize: 'clamp(2.8rem, 10vw, 3.8rem)', fontWeight: 900, color: g.color, lineHeight: 1, letterSpacing: '-2px' }}>
                        {result.marksData.marks}
                        <span style={{ fontSize: '0.45em', color: '#9CA3AF', fontWeight: 600 }}>/{result.maxMarks}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: '0.35rem', fontWeight: 600 }}>{pct}% · {g.label}</div>
                    </div>
                    <div style={{ height: '10px', borderRadius: '99px', background: '#F3F4F6', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${g.color}99, ${g.color})`, borderRadius: '99px', transition: 'width 1s ease' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
                      <span style={{ fontSize: '0.72rem', color: '#9CA3AF', fontWeight: 600 }}>0</span>
                      <span style={{ fontSize: '0.72rem', color: '#9CA3AF', fontWeight: 600 }}>{result.maxMarks}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </main>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input:focus {
          border-color: #000 !important;
          box-shadow: 0 0 0 3px rgba(0,0,0,0.08);
        }

        /* ── ResultScreen Mobile Responsive ── */
        @media (max-width: 480px) {
          .subscreen-header {
            padding: 0.75rem 1rem !important;
          }
          .subscreen-header-inner {
            gap: 0.5rem !important;
          }
          /* Test cards: full width padding */
          .result-test-card {
            padding: 1rem 1rem !important;
          }
          /* Search view: tighter padding */
          .result-search-main {
            padding: 1.5rem 1rem 4rem !important;
          }
          /* Class select buttons */
          .result-class-btn {
            font-size: 0.85rem !important;
            padding: 0.7rem 0.5rem !important;
          }
          /* Roll input + button row: stack on tiny phones */
          .result-roll-row {
            flex-direction: column !important;
          }
          .result-roll-row button {
            width: 100% !important;
            justify-content: center !important;
          }
          /* Score number smaller on mobile */
          .result-score-big {
            font-size: 2.8rem !important;
          }
        }

        @media (max-width: 360px) {
          .subscreen-header-inner span {
            font-size: 1.4rem !important;
          }
          .result-banner-title {
            font-size: 0.85rem !important;
          }
        }
      `}</style>
    </div>
  );
}
