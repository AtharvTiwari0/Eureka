import React, { useState } from 'react';
import { ArrowLeft, Trophy, BookOpen, Calendar, Hash, Search, AlertCircle, ChevronRight, CheckCircle2, RotateCcw } from 'lucide-react';

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
    '2E15': 'Kanha Ji Awasthi',
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
// Each result: { marks: XX, maxMarks: XX }  (individual per student)
// ─────────────────────────────────────────────────────────────
const TESTS = [
  {
    id: 'sunday-mix-test-1',
    title: 'Class 9th & 10th Mix Test',
    subtitle: 'Sunday Special Assessment',
    date: '27 Sep 2026',
    subject: 'Science (PCB)',
    badge: 'Mixed',
    badgeColor: '#7C3AED',
    badgeBg: '#F5F3FF',
    status: 'live',
    classes: ['9th', '10th'],
    results: {
      '9th': {
        '3E01': { marks: 23, maxMarks: 40 }, // Anuj Tripathi
        '3E02': { marks: 7,  maxMarks: 20 }, // Arun Rajpoot
        '3E03': { marks: 47, maxMarks: 60 }, // Atharv
        '3E04': { marks: 65, maxMarks: 70 }, // Gaurav
        '3E05': { marks: 45, maxMarks: 60 }, // Harsh Sengar
        '3E06': { marks: 10, maxMarks: 20 }, // Hitendra
        '3E07': { marks: 35, maxMarks: 50 }, // Naman Patel
        '3E08': { marks: 20, maxMarks: 40 }, // Om Parihar
        '3E09': { marks: 6,  maxMarks: 20 }, // Sameer Mansoori
        '3E10': { marks: 50, maxMarks: 60 }, // Subh Nigam
        '3E11': { marks: 16, maxMarks: 30 }, // Vaibhav Verma
      },
      '10th': {
        '2E01': { marks: 15, maxMarks: 50 }, // Akanksha Chauhan
        '2E02': { marks: 11, maxMarks: 50 }, // Akshat Rajput
        '2E03': { marks: 30, maxMarks: 50 }, // Ananya Patel
        '2E04': { marks: 25, maxMarks: 50 }, // Anshika Diwakar
        '2E05': { marks: 20, maxMarks: 50 }, // Gunjan Verma
        '2E06': { absent: true },             // Harsh
        '2E07': { marks: 5,  maxMarks: 50 }, // Himanshi Chaurasiya
        '2E08': { marks: 14, maxMarks: 50 }, // Kavya Verma
        '2E09': { marks: 23, maxMarks: 50 }, // Priya Yadav
        '2E10': { absent: true },             // Raunak Parihar
        '2E11': { marks: 10, maxMarks: 50 }, // Rohini Yadav
        '2E12': { marks: 30, maxMarks: 50 }, // Rohit Yadav
        '2E13': { marks: 7,  maxMarks: 50 }, // Saksham Yadav
        '2E14': { absent: true },             // Yuvraj
        '2E15': { marks: 35, maxMarks: 50 }, // Kanha Ji Awasthi
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

// ─── SHARED HEADER ────────────────────────────────────────────
function Header({ onBack, backLabel, onHome }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
      padding: '0.85rem 1.5rem',
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
        <button
          onClick={onBack}
          title={backLabel}
          style={{ background: '#F3F4F6', border: '1px solid #E5E7EB', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '9999px', flexShrink: 0, transition: 'background 0.18s' }}
        >
          <ArrowLeft size={18} color="#000" />
        </button>
        <span onClick={onHome} style={{ fontSize: '1.8rem', fontWeight: 400, fontFamily: "'Instrument Serif', Georgia, serif", color: '#000', cursor: 'pointer' }}>
          Eureka
        </span>
        <div style={{ padding: '0.3rem 0.85rem', borderRadius: '9999px', background: '#FFF7ED', border: '1px solid #FDE68A', color: '#D97706', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Trophy size={12} /> Results
        </div>
      </div>
    </header>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────
export default function ResultScreen({ onBackToHome }) {
  // view: 'tests' | 'search' | 'result'
  const [view, setView] = useState('tests');
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [rollInput, setRollInput] = useState('');
  const [searchError, setSearchError] = useState('');
  const [resultData, setResultData] = useState(null);

  const goToTests = () => {
    setView('tests');
    setSelectedTest(null);
    setSelectedClass('');
    setRollInput('');
    setSearchError('');
    setResultData(null);
  };

  const handleOpenTest = (test) => {
    setSelectedTest(test);
    setSelectedClass('');
    setRollInput('');
    setSearchError('');
    setResultData(null);
    setView('search');
  };

  const handleSearch = () => {
    const roll = rollInput.trim().toUpperCase();
    if (!roll || !selectedClass) return;
    setSearchError('');

    const studentName = STUDENTS[selectedClass]?.[roll];
    if (!studentName) {
      setSearchError('Roll number not found. Check your class and roll number.');
      return;
    }
    const marksData = selectedTest.results[selectedClass]?.[roll];
    setResultData({ studentName, roll, marksData, cls: selectedClass });
    setView('result'); // ← switch to separate result view
  };

  const handleBack = () => {
    if (view === 'result') { setView('search'); setResultData(null); }
    else if (view === 'search') goToTests();
    else onBackToHome();
  };

  const backLabel = view === 'result' ? 'Search Again' : view === 'search' ? 'Back to Tests' : 'Back to Home';

  // ── Shared container ────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Inter', sans-serif", color: '#111' }}>
      <Header onBack={handleBack} backLabel={backLabel} onHome={onBackToHome} />

      {/* ══════════ VIEW 1: TEST LIST ══════════════════════ */}
      {view === 'tests' && (
        <main style={{ maxWidth: '660px', margin: '0 auto', padding: '2.5rem 1.25rem 5rem' }}>
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
                  style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '18px', padding: '1.3rem 1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', textAlign: 'left', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.2s ease', width: '100%' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
                    <div style={{ width: 48, height: 48, borderRadius: '14px', background: test.badgeBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Trophy size={22} color={test.badgeColor} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
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
                        <span>•</span><span>{test.subject}</span>
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

      {/* ══════════ VIEW 2: SEARCH (input only, NO result) ═ */}
      {view === 'search' && selectedTest && (
        <main style={{ maxWidth: '480px', margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>
          {/* Test banner */}
          <div style={{ background: selectedTest.badgeBg, border: `1px solid ${selectedTest.badgeColor}33`, borderRadius: '14px', padding: '0.85rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.8rem', flexWrap: 'wrap' }}>
            <Trophy size={18} color={selectedTest.badgeColor} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#000' }}>{selectedTest.title}</div>
              <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '0.1rem' }}>{selectedTest.date}</div>
            </div>
          </div>

          {/* Step 1: Class */}
          <div style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '18px', padding: '1.5rem', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.8rem' }}>
              Step 1 — Select Your Class
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {selectedTest.classes.map(cls => (
                <button
                  key={cls}
                  onClick={() => { setSelectedClass(cls); setSearchError(''); setRollInput(''); }}
                  style={{ flex: 1, padding: '0.85rem', borderRadius: '12px', border: `2px solid ${selectedClass === cls ? '#000' : '#E5E7EB'}`, background: selectedClass === cls ? '#000' : '#FFF', color: selectedClass === cls ? '#FFF' : '#374151', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                >
                  {selectedClass === cls && <CheckCircle2 size={15} />}
                  Class {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Roll No */}
          <div style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '18px', padding: '1.5rem', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', opacity: selectedClass ? 1 : 0.5, transition: 'opacity 0.2s' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.8rem' }}>
              Step 2 — Enter Your Roll Number
            </div>

            {selectedTest.status === 'coming-soon' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '12px', padding: '1rem 1.1rem' }}>
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>⏳</div>
                <div>
                  <div style={{ fontWeight: 800, color: '#92400E', fontSize: '0.95rem' }}>Results Coming Soon</div>
                  <div style={{ fontSize: '0.82rem', color: '#B45309', marginTop: '0.2rem', lineHeight: 1.5 }}>
                    Test is scheduled for <strong>27 Sep 2026</strong>. Results will be published after correction.
                  </div>
                </div>
              </div>
            ) : (
              <div className="roll-input-row" style={{ display: 'flex', gap: '0.6rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <Hash size={15} color="#9CA3AF" style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input
                    type="text"
                    disabled={!selectedClass}
                    value={rollInput}
                    onChange={e => { setRollInput(e.target.value); setSearchError(''); }}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    placeholder={selectedClass === '10th' ? 'e.g. 2E01' : selectedClass === '9th' ? 'e.g. 3E01' : 'Select class first'}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '0.78rem 0.9rem 0.78rem 2.1rem', borderRadius: '12px', border: `1.5px solid ${searchError ? '#FCA5A5' : '#E5E7EB'}`, fontSize: '1rem', fontWeight: 700, color: '#111', outline: 'none', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'Inter', sans-serif", background: selectedClass ? '#FFF' : '#F9FAFB', transition: 'border-color 0.2s' }}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={!selectedClass || !rollInput.trim()}
                  style={{ padding: '0.78rem 1.25rem', borderRadius: '12px', background: (selectedClass && rollInput.trim()) ? '#000' : '#E5E7EB', color: (selectedClass && rollInput.trim()) ? '#FFF' : '#9CA3AF', border: 'none', cursor: (selectedClass && rollInput.trim()) ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.9rem', transition: 'all 0.2s', flexShrink: 0 }}
                >
                  <Search size={16} /> Check
                </button>
              </div>
            )}

            {searchError && (
              <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#DC2626', fontSize: '0.85rem', fontWeight: 600 }}>
                <AlertCircle size={15} color="#DC2626" style={{ flexShrink: 0 }} />
                {searchError}
              </div>
            )}
          </div>
        </main>
      )}

      {/* ══════════ VIEW 3: RESULT ONLY (no input visible) ═ */}
      {view === 'result' && resultData && selectedTest && (() => {
        const { studentName, roll, marksData, cls } = resultData;

        // ── Absent ──
        if (marksData?.absent) {
          return (
            <main style={{ maxWidth: '440px', margin: '0 auto', padding: '2.5rem 1.25rem 5rem', animation: 'fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
              <div style={{ background: '#FFF', borderRadius: '24px', border: '1.5px solid #FCA5A520', boxShadow: '0 12px 40px #DC262614, 0 2px 10px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                <div style={{ height: '5px', background: 'linear-gradient(90deg, #DC2626, #FCA5A5)' }} />
                <div style={{ padding: '1.8rem 1.6rem 1.6rem', textAlign: 'center' }}>
                  {/* Avatar */}
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#FEF2F2', border: '2px solid #FCA5A5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 900, color: '#DC2626', margin: '0 auto 1rem' }}>
                    {studentName.charAt(0)}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#000', marginBottom: '0.2rem' }}>{studentName}</div>
                  <div style={{ fontSize: '0.78rem', color: '#9CA3AF', marginBottom: '1.5rem' }}>
                    Roll: <strong style={{ color: '#6B7280' }}>{roll}</strong> &nbsp;·&nbsp; Class {cls}
                  </div>
                  {/* Absent badge */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.4rem', borderRadius: '9999px', background: '#FEF2F2', border: '1.5px solid #FCA5A5', color: '#DC2626', fontWeight: 900, fontSize: '1rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>❌</span> Absent
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                    {studentName} was <strong style={{ color: '#DC2626' }}>absent</strong> for this test.
                  </div>
                  <button onClick={() => { setView('search'); setResultData(null); setRollInput(''); setSelectedClass(''); }}
                    style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', background: '#F8FAFC', border: '1.5px solid #E5E7EB', color: '#374151', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <RotateCcw size={15} /> Search Another Roll No.
                  </button>
                </div>
              </div>
            </main>
          );
        }

        // ── Not published ──
        if (!marksData) {
          return (
            <main style={{ maxWidth: '480px', margin: '0 auto', padding: '2.5rem 1.25rem 5rem' }}>
              <div style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '20px', padding: '2rem', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <BookOpen size={36} color="#D97706" style={{ marginBottom: '0.8rem' }} />
                <div style={{ fontWeight: 800, color: '#92400E', fontSize: '1rem', marginBottom: '0.3rem' }}>Result not published yet</div>
                <div style={{ fontSize: '0.85rem', color: '#B45309' }}>Your marks will be available soon.</div>
                <button onClick={() => setView('search')} style={{ marginTop: '1.2rem', padding: '0.7rem 1.4rem', borderRadius: '9999px', background: '#000', color: '#FFF', border: 'none', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <RotateCcw size={14} /> Search Again
                </button>
              </div>
            </main>
          );
        }


        const { marks, maxMarks } = marksData;
        const g = getGrade(marks, maxMarks);
        const pct = Math.round((marks / maxMarks) * 100);
        const R = 56;
        const circumference = 2 * Math.PI * R;
        const dash = (pct / 100) * circumference;

        return (
          <main style={{ maxWidth: '440px', margin: '0 auto', padding: '2rem 1.25rem 5rem', animation: 'fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1)' }}>

            {/* ── Premium Result Card ── */}
            <div style={{ background: '#FFF', borderRadius: '24px', border: `1.5px solid ${g.color}28`, boxShadow: `0 12px 40px ${g.color}14, 0 2px 10px rgba(0,0,0,0.06)`, overflow: 'hidden' }}>

              {/* Top color stripe */}
              <div style={{ height: '5px', background: `linear-gradient(90deg, ${g.color}, ${g.color}66)` }} />

              <div style={{ padding: '1.8rem 1.6rem 1.6rem' }}>

                {/* Student row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.8rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: `linear-gradient(135deg, ${g.color}20, ${g.color}40)`, border: `2px solid ${g.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 900, color: g.color, flexShrink: 0 }}>
                    {studentName.charAt(0)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {studentName}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#9CA3AF', marginTop: '0.15rem' }}>
                      Roll: <strong style={{ color: '#6B7280' }}>{roll}</strong> &nbsp;·&nbsp; Class {cls} &nbsp;·&nbsp; {selectedTest.date}
                    </div>
                  </div>
                  {/* Grade badge */}
                  <div style={{ padding: '0.35rem 0.9rem', borderRadius: '9999px', background: g.bg, color: g.color, fontWeight: 900, fontSize: '1.1rem', border: `1px solid ${g.color}30`, flexShrink: 0 }}>
                    {g.grade}
                  </div>
                </div>

                {/* Score circle */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.8rem' }}>
                  <div style={{ position: 'relative', width: 148, height: 148 }}>
                    <svg width="148" height="148" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="74" cy="74" r={R} fill="none" stroke="#F0F0F0" strokeWidth="11" />
                      <circle
                        cx="74" cy="74" r={R}
                        fill="none"
                        stroke={g.color}
                        strokeWidth="11"
                        strokeLinecap="round"
                        strokeDasharray={`${dash} ${circumference}`}
                        style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.16,1,0.3,1)', filter: `drop-shadow(0 0 6px ${g.color}66)` }}
                      />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ fontSize: '2.2rem', fontWeight: 900, color: g.color, lineHeight: 1, letterSpacing: '-2px' }}>{marks}</div>
                      <div style={{ fontSize: '0.7rem', color: '#9CA3AF', fontWeight: 700, marginTop: '3px' }}>out of {maxMarks}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: '0.85rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#111', letterSpacing: '-0.5px' }}>{pct}%</div>
                    <div style={{ fontSize: '0.78rem', color: g.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: '0.1rem' }}>{g.label}</div>
                  </div>
                </div>

                {/* Info chips */}
                <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {[
                    { label: 'Test', value: selectedTest.subtitle },
                    { label: 'Subject', value: selectedTest.subject },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '0.45rem 0.95rem', borderRadius: '10px', background: '#F8FAFC', border: '1px solid #E5E7EB', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginTop: '0.1rem' }}>{item.value}</div>
                    </div>
                  ))}
                </div>

                {/* Search again button */}
                <button
                  onClick={() => { setView('search'); setResultData(null); setRollInput(''); setSelectedClass(''); }}
                  style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', background: '#F8FAFC', border: '1.5px solid #E5E7EB', color: '#374151', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.borderColor = '#CBD5E1'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#E5E7EB'; }}
                >
                  <RotateCcw size={15} /> Search Another Roll No.
                </button>
              </div>
            </div>
          </main>
        );
      })()}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input:focus {
          border-color: #000 !important;
          box-shadow: 0 0 0 3px rgba(0,0,0,0.07);
        }
        /* ── Mobile: roll input stacks vertically ── */
        @media (max-width: 480px) {
          .roll-input-row { flex-direction: column !important; }
          .roll-input-row button { width: 100% !important; justify-content: center !important; }
        }
        /* ── Mobile: tighter padding for all views ── */
        @media (max-width: 420px) {
          main { padding-left: 0.85rem !important; padding-right: 0.85rem !important; }
          /* Result card inner padding */
          .result-card-inner { padding: 1.2rem 1rem 1rem !important; }
          /* Student name subtitle wraps */
          .result-meta { flex-wrap: wrap !important; }
        }
        /* ── Tiny phones 360px ── */
        @media (max-width: 370px) {
          main { padding-left: 0.6rem !important; padding-right: 0.6rem !important; }
        }
      `}</style>
    </div>
  );
}
