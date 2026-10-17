import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, Plus, Trash2, Edit3, MoreVertical,
  Check, X, Eye, EyeOff, ShieldCheck, LogOut,
  ChevronRight, Users, ClipboardList, ToggleLeft, ToggleRight,
  UserPlus, BookOpen, AlertTriangle, Search, Wallet, CheckCircle2,
  Clock, Calendar, Sparkles, MessageSquare, CheckSquare, BookMarked, FileText
} from 'lucide-react';
import {
  getData, saveData, getNextRollNumber, DEFAULT_FEE_MONTHS, getStudentFeeDetails
} from '../adminData';
import FeeReceiptCard from './FeeReceiptCard';

const ADMIN_PASSWORD = 'eureka2026';

function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const DUE_DAY_OPTIONS = Array.from({ length: 31 }, (_, i) => i + 1);

const BADGE_PRESETS = [
  { label: 'Test 1', color: '#7C3AED', bg: '#F5F3FF' },
  { label: 'Test 2', color: '#059669', bg: '#ECFDF5' },
  { label: 'Test 3', color: '#DC2626', bg: '#FEF2F2' },
  { label: 'Test 4', color: '#D97706', bg: '#FFFBEB' },
  { label: 'Unit Test', color: '#0284C7', bg: '#EFF6FF' },
];

function getInitials(name) {
  if (!name) return 'ST';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getScoreGrade(marks, max) {
  if (marks === undefined || max === undefined || max === 0) return null;
  const pct = Math.round((marks / max) * 100);
  if (pct >= 90) return { pct, grade: 'A+', color: '#059669', bg: '#ECFDF5' };
  if (pct >= 80) return { pct, grade: 'A',  color: '#0284C7', bg: '#EFF6FF' };
  if (pct >= 70) return { pct, grade: 'B+', color: '#7C3AED', bg: '#F5F3FF' };
  if (pct >= 60) return { pct, grade: 'B',  color: '#D97706', bg: '#FFFBEB' };
  if (pct >= 50) return { pct, grade: 'C',  color: '#EA580C', bg: '#FFF7ED' };
  return { pct, grade: 'D', color: '#DC2626', bg: '#FEF2F2' };
}

// ─── Standard Header (Strictly matching Eureka website theme) ──
// ─── Standard Header (Strictly matching Eureka website theme) ──
function AdminHeader({ onBack, onHome, onLogout, rightElement }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      padding: '0.85rem 1.25rem',
    }}>
      <div style={{
        maxWidth: '680px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
      }}>
        {/* Left: Back button */}
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          style={{
            background: '#F3F4F6',
            border: '1px solid #E5E7EB',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 38,
            height: 38,
            borderRadius: '9999px',
            flexShrink: 0,
            transition: 'background 0.15s'
          }}
        >
          <ArrowLeft size={18} color="#000" />
        </button>

        {/* Center: Eureka Serif Logo */}
        <span
          onClick={onHome}
          style={{
            fontSize: '1.8rem',
            fontWeight: 400,
            fontFamily: "'Instrument Serif', Georgia, serif",
            color: '#000000',
            cursor: 'pointer',
            lineHeight: 1,
          }}
        >
          Eureka
        </span>

        {/* Right: Right element (e.g. Save) or Logout Button or 38px spacer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.45rem', minWidth: 38, flexShrink: 0 }}>
          {rightElement}
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              title="Logout"
              style={{
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '9999px',
                width: 36,
                height: 36,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#DC2626'
              }}
            >
              <LogOut size={15} />
            </button>
          )}
          {!rightElement && !onLogout && <div style={{ width: 38 }} />}
        </div>
      </div>
    </header>
  );
}

// ─── Shared Form Input Styles (Matches Eureka BookDemo / Contact) ─
const formInputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '0.85rem 1.05rem',
  borderRadius: '14px',
  border: '1px solid #E5E5E5',
  fontSize: '0.96rem',
  color: '#000000',
  outline: 'none',
  fontFamily: "'Inter', sans-serif",
  background: '#FFFFFF',
  transition: 'border-color 0.15s, box-shadow 0.15s'
};

const formLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontSize: '0.86rem',
  fontWeight: 700,
  color: '#000000',
  marginBottom: '0.45rem'
};

// ─── 1. LOGIN SCREEN ──────────────────────────────────────────
function LoginView({ onLogin, onBackToSite }) {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setErr('Incorrect password. Please try again.');
      setPw('');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#000000', fontFamily: "'Inter', sans-serif" }}>
      <AdminHeader
        onBack={onBackToSite}
        onHome={onBackToSite}
      />

      <main style={{ maxWidth: '440px', margin: '0 auto', padding: '3.5rem 1.25rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.3rem, 6vw, 3rem)',
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            color: '#000000',
            margin: '0 0 0.4rem',
            lineHeight: 1.1
          }}>
            Admin Portal
          </h1>
          <p style={{ color: '#6F6F6F', fontSize: '0.95rem', margin: 0 }}>
            Enter password to access dashboard
          </p>
        </div>

        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E5E5E5',
          borderRadius: '24px',
          padding: '2rem 1.75rem',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.06)'
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={formLabelStyle}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={show ? 'text' : 'password'}
                  value={pw}
                  onChange={e => { setPw(e.target.value); setErr(''); }}
                  placeholder="Enter admin password..."
                  style={{
                    ...formInputStyle,
                    paddingRight: '2.8rem',
                    borderColor: err ? '#DC2626' : '#E5E5E5'
                  }}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShow(s => !s)}
                  style={{
                    position: 'absolute',
                    right: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6F6F6F'
                  }}
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {err && (
              <div style={{
                fontSize: '0.84rem',
                color: '#DC2626',
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                padding: '0.65rem 0.85rem',
                borderRadius: '12px',
                marginBottom: '1.25rem'
              }}>
                {err}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.95rem',
                borderRadius: '14px',
                background: '#000000',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.96rem',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

// ─── 2. DASHBOARD HOME: 3 LARGE STACKED BUTTONS ───────────────
function DashboardHome({ onNavigate, onLogout, onBackToSite }) {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#000000', fontFamily: "'Inter', sans-serif" }}>
      <AdminHeader
        onBack={onBackToSite}
        onHome={onBackToSite}
        onLogout={onLogout}
      />

      <main style={{ maxWidth: '480px', margin: '0 auto', padding: '3rem 1.25rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 7vw, 3.2rem)',
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            color: '#000000',
            margin: '0 0 0.4rem',
            lineHeight: 1.05
          }}>
            Admin Dashboard
          </h1>
          <p style={{ color: '#6F6F6F', fontSize: '0.95rem', margin: 0 }}>
            Choose a section
          </p>
        </div>

        {/* 3 LARGE STACKED BUTTONS - ONLY MAIN TITLES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
          {/* Button 1: Tests */}
          <button
            type="button"
            onClick={() => onNavigate('tests')}
            style={{
              width: '100%',
              background: '#FFFFFF',
              border: '1px solid #E5E5E5',
              borderRadius: '22px',
              padding: '1.35rem 1.45rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(0,0,0,0.03)',
              transition: 'all 0.15s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                background: '#F5F3FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <ClipboardList size={24} color="#7C3AED" />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#000000' }}>
                Tests
              </span>
            </div>
            <ChevronRight size={20} color="#9CA3AF" />
          </button>

          {/* Button 2: Students */}
          <button
            type="button"
            onClick={() => onNavigate('students')}
            style={{
              width: '100%',
              background: '#FFFFFF',
              border: '1px solid #E5E5E5',
              borderRadius: '22px',
              padding: '1.35rem 1.45rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(0,0,0,0.03)',
              transition: 'all 0.15s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                background: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Users size={24} color="#0284C7" />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#000000' }}>
                Students
              </span>
            </div>
            <ChevronRight size={20} color="#94A3B8" />
          </button>

          {/* Button 3: Fees */}
          <button
            type="button"
            onClick={() => onNavigate('fees')}
            style={{
              width: '100%',
              background: '#FFFFFF',
              border: '1px solid #E5E5E5',
              borderRadius: '22px',
              padding: '1.35rem 1.45rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(0,0,0,0.03)',
              transition: 'all 0.15s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                background: '#ECFDF5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Wallet size={24} color="#059669" />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#000000' }}>
                Fees
              </span>
            </div>
            <ChevronRight size={20} color="#94A3B8" />
          </button>
        </div>
      </main>
    </div>
  );
}

// ─── 3. TESTS LIST SCREEN ─────────────────────────────────────
function TestsScreen({ data, setData, onBack, onSelectTest, onNavigateCreateTest, onHome, onLogout }) {
  const [filter, setFilter] = useState('all');
  const [deleteTestId, setDeleteTestId] = useState(null);

  const filteredTests = data.tests.filter(t => {
    if (filter === 'all') return true;
    return t.classes && t.classes.includes(filter);
  });

  const handleConfirmDeleteTest = (testId) => {
    const updatedTests = data.tests.filter(t => t.id !== testId);
    const updated = { ...data, tests: updatedTests };
    if (setData) {
      setData(updated);
      saveData(updated);
    }
    setDeleteTestId(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#000000', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <AdminHeader
        onBack={onBack}
        onHome={onHome}
        onLogout={onLogout}
      />

      <main style={{ maxWidth: '580px', margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>
        {/* Top Title */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 6vw, 3.2rem)',
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            color: '#000000',
            margin: '0 0 0.35rem',
            lineHeight: 1.08
          }}>
            Tests
          </h1>
          <p style={{ color: '#6F6F6F', fontSize: '0.95rem', margin: 0, fontFamily: "'Inter', sans-serif" }}>
            Select a test to enter marks or create new
          </p>
        </div>

        {/* Rectangular Buttons Filter Navigation (Fees Screen Style) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.65rem',
          marginBottom: '0.9rem'
        }}>
          {[
            { id: 'all', label: 'All Tests' },
            { id: '10th', label: 'Class 10th' },
            { id: '9th', label: 'Class 9th' },
          ].map(tab => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                style={{
                  padding: '0.85rem 0.5rem',
                  borderRadius: '14px',
                  border: `2px solid ${active ? '#000000' : '#E5E5E5'}`,
                  background: active ? '#000000' : '#FAFAFA',
                  color: active ? '#FFFFFF' : '#374151',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  fontFamily: "'Inter', sans-serif",
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Add Test Button - Located Directly Below Class Filter Navigation */}
        <button
          type="button"
          onClick={onNavigateCreateTest}
          style={{
            width: '100%',
            padding: '0.95rem',
            borderRadius: '16px',
            background: '#000000',
            color: '#FFFFFF',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.95rem',
            fontFamily: "'Inter', sans-serif",
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
          }}
        >
          <Plus size={18} />
          <span>Add Test</span>
        </button>

        {/* Delete Test Confirmation Box */}
        {deleteTestId && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '16px',
            padding: '0.9rem 1.1rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '0.84rem', color: '#991B1B', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
              Delete this test and its marks permanently?
            </span>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                type="button"
                onClick={() => setDeleteTestId(null)}
                style={{ padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#FFF', fontSize: '0.78rem', fontWeight: 700, fontFamily: "'Inter', sans-serif", cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleConfirmDeleteTest(deleteTestId)}
                style={{ padding: '0.35rem 0.85rem', borderRadius: '8px', border: 'none', background: '#DC2626', color: '#FFF', fontSize: '0.78rem', fontWeight: 700, fontFamily: "'Inter', sans-serif", cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Tests Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {filteredTests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', background: '#F8FAFC', borderRadius: '20px', border: '1px solid #E5E5E5', color: '#6F6F6F', fontFamily: "'Inter', sans-serif" }}>
              No tests found. Click "Add Test" above to create one.
            </div>
          ) : (
            filteredTests.map(test => {
              let totalEvaluated = 0;
              let totalPossible = 0;
              if (test.classes) {
                test.classes.forEach(c => {
                  const clsStudents = data.students[c] || {};
                  const clsResults = test.results?.[c] || {};
                  totalPossible += Object.keys(clsStudents).length;
                  totalEvaluated += Object.keys(clsResults).filter(r => clsResults[r]?.marks !== undefined || clsResults[r]?.absent).length;
                });
              }

              return (
                <div
                  key={test.id}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    borderRadius: '20px',
                    padding: '1.25rem 1.35rem',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{
                      padding: '0.2rem 0.65rem',
                      borderRadius: '9999px',
                      background: test.badgeBg || '#F4F4F4',
                      color: test.badgeColor || '#000',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      fontFamily: "'Inter', sans-serif",
                      textTransform: 'uppercase'
                    }}>
                      {test.badge}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <span style={{
                        padding: '0.2rem 0.65rem',
                        borderRadius: '9999px',
                        background: test.status === 'live' ? '#ECFDF5' : '#FFFBEB',
                        color: test.status === 'live' ? '#059669' : '#D97706',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        fontFamily: "'Inter', sans-serif"
                      }}>
                        {test.status === 'live' ? 'Live' : 'Draft'}
                      </span>

                      {/* Delete Icon */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteTestId(test.id);
                        }}
                        title="Delete Test"
                        style={{
                          background: '#FEF2F2',
                          border: '1px solid #FECACA',
                          borderRadius: '8px',
                          width: 28,
                          height: 28,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#DC2626',
                          transition: 'all 0.15s'
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <div style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: '1.45rem',
                    fontWeight: 400,
                    color: '#000000',
                    lineHeight: 1.15,
                    marginBottom: '0.35rem'
                  }}>
                    {test.title}
                  </div>

                  <div style={{ fontSize: '0.82rem', color: '#6F6F6F', marginBottom: '1rem', fontFamily: "'Inter', sans-serif" }}>
                    {test.date} · {test.subject} · {totalEvaluated}/{totalPossible} evaluated
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectTest(test)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      background: '#000000',
                      color: '#FFFFFF',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      fontFamily: "'Inter', sans-serif",
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <span>Enter Marks</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}

// ─── 4. DEDICATED SCREEN: CREATE TEST (STRICT WEBSITE FORM THEME)
function CreateTestScreen({ data, setData, onBack, onHome, onLogout }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('Science (PCB)');
  const [selectedClass, setSelectedClass] = useState('10th');
  const [selectedBadge, setSelectedBadge] = useState('Test 1');
  const [isCustomBadge, setIsCustomBadge] = useState(false);
  const [customBadgeText, setCustomBadgeText] = useState('');
  const [status, setStatus] = useState('live');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !date.trim()) return;

    let badgeLabel = selectedBadge;
    let badgeColor = '#7C3AED';
    let badgeBg = '#F5F3FF';

    if (isCustomBadge && customBadgeText.trim()) {
      badgeLabel = customBadgeText.trim();
      badgeColor = '#0284C7';
      badgeBg = '#EFF6FF';
    } else {
      const preset = BADGE_PRESETS.find(b => b.label === selectedBadge);
      if (preset) {
        badgeColor = preset.color;
        badgeBg = preset.bg;
      }
    }

    const newTest = {
      id: `test-${Date.now()}`,
      title: title.trim(),
      subtitle: 'Sunday Special Assessment',
      date: date.trim(),
      subject: subject.trim(),
      badge: badgeLabel,
      badgeColor,
      badgeBg,
      classes: [selectedClass],
      status,
      results: { [selectedClass]: {} }
    };

    const updated = { ...data, tests: [newTest, ...data.tests] };
    setData(updated);
    saveData(updated);
    onBack();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#000000', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <AdminHeader
        onBack={onBack}
        onHome={onHome}
        onLogout={onLogout}
      />

      <main style={{ maxWidth: '640px', margin: '0 auto', padding: '3rem 1.25rem 5rem' }}>
        {/* Top Centered Section Header matching BookDemoScreen */}
        <div style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto 2.5rem auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              background: '#F4F4F4',
              color: '#000000',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '1.25rem',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            <Sparkles size={14} color="#000000" />
            <span>ASSESSMENT BUILDER</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 6vw, 3.5rem)',
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            color: '#000000',
            margin: '0 0 0.6rem',
            lineHeight: 1.08
          }}>
            Create Assessment Test
          </h1>
          <p style={{ color: '#6F6F6F', fontSize: '1rem', margin: 0, lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
            Set up assessment details and prepare evaluation sheet
          </p>
        </div>

        {/* Dedicated Form Card matching website BookDemoScreen */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E5E5E5',
          borderRadius: '24px',
          padding: '2.2rem 1.8rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.06)'
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {/* Step 1: Target Class Cards */}
            <div>
              <label style={formLabelStyle}>
                <BookOpen size={16} /> Select Target Class *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.4rem' }}>
                {['10th', '9th'].map(cls => {
                  const isSelected = selectedClass === cls;
                  return (
                    <div
                      key={cls}
                      onClick={() => setSelectedClass(cls)}
                      style={{
                        padding: '1.05rem 1.15rem',
                        borderRadius: '16px',
                        border: isSelected ? '2px solid #000000' : '1px solid #E5E5E5',
                        background: isSelected ? '#000000' : '#FAFAFA',
                        color: isSelected ? '#FFFFFF' : '#000000',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', fontFamily: "'Inter', sans-serif" }}>
                        Class {cls}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: isSelected ? '#E5E5E5' : '#6F6F6F', marginTop: '0.2rem', fontFamily: "'Inter', sans-serif" }}>
                        {Object.keys(data.students[cls] || {}).length} Students Enrolled
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Test Title */}
            <div>
              <label style={formLabelStyle}>
                <ClipboardList size={16} /> Test Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={`e.g. Class ${selectedClass} — Test 3`}
                style={formInputStyle}
                required
                autoFocus
              />
            </div>

            {/* Step 3: Date & Subject */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <div>
                <label style={formLabelStyle}>
                  <Calendar size={16} /> Date *
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  placeholder="e.g. 18 Oct 2026"
                  style={formInputStyle}
                  required
                />
              </div>

              <div>
                <label style={formLabelStyle}>
                  <BookMarked size={16} /> Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="Science (PCB)"
                  style={formInputStyle}
                />
              </div>
            </div>

            {/* Step 4: Badge Tag Preset + Custom Option */}
            <div>
              <label style={formLabelStyle}>
                <Sparkles size={16} /> Badge Preset / Custom Label
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.35rem' }}>
                {BADGE_PRESETS.map(b => {
                  const isActive = !isCustomBadge && selectedBadge === b.label;
                  return (
                    <button
                      key={b.label}
                      type="button"
                      onClick={() => { setSelectedBadge(b.label); setIsCustomBadge(false); }}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        border: isActive ? '2px solid #000000' : '1px solid #E5E5E5',
                        background: b.bg,
                        color: b.color,
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        fontFamily: "'Inter', sans-serif",
                        cursor: 'pointer'
                      }}
                    >
                      {b.label}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setIsCustomBadge(true)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    border: isCustomBadge ? '2px solid #000000' : '1px dashed #CBD5E1',
                    background: isCustomBadge ? '#F1F5F9' : '#FFFFFF',
                    color: '#000000',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    fontFamily: "'Inter', sans-serif",
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <Edit3 size={13} />
                  <span>+ Custom</span>
                </button>
              </div>

              {isCustomBadge && (
                <div style={{ marginTop: '0.65rem' }}>
                  <input
                    type="text"
                    value={customBadgeText}
                    onChange={e => setCustomBadgeText(e.target.value)}
                    placeholder="Enter custom badge name (e.g. Mid Term, Final Mock)..."
                    style={{ ...formInputStyle, height: 42, fontSize: '0.9rem' }}
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Step 5: Status */}
            <div>
              <label style={formLabelStyle}>
                Publish Status
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginTop: '0.35rem' }}>
                {[
                  { id: 'live', label: 'Live Now' },
                  { id: 'coming-soon', label: 'Draft' }
                ].map(st => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setStatus(st.id)}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: status === st.id ? '2px solid #000000' : '1px solid #E5E5E5',
                      background: status === st.id ? '#F4F4F4' : '#FFFFFF',
                      color: '#000000',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      fontFamily: "'Inter', sans-serif",
                      cursor: 'pointer'
                    }}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1.05rem',
                borderRadius: '16px',
                background: '#000000',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                fontFamily: "'Inter', sans-serif",
                cursor: 'pointer',
                marginTop: '0.5rem',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
              }}
            >
              Publish Assessment Test →
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

// ─── 5. DEDICATED SCREEN: MARKS ENTRY ─────────────────────────
function TestDetailScreen({ test, data, setData, onBack, onHome, onLogout }) {
  const [localTest, setLocalTest] = useState(test);
  const [selectedClass, setSelectedClass] = useState(test.classes && test.classes.length > 0 ? test.classes[0] : '10th');
  const [batchMaxMarks, setBatchMaxMarks] = useState('');
  const [showBatchTool, setShowBatchTool] = useState(false);
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState(false);

  const students = data.students[selectedClass] || {};
  const results = localTest.results && localTest.results[selectedClass] ? localTest.results[selectedClass] : {};

  const handleMarkChange = (roll, val) => {
    setLocalTest(prev => ({
      ...prev,
      results: {
        ...prev.results,
        [selectedClass]: {
          ...prev.results?.[selectedClass],
          [roll]: {
            ...prev.results?.[selectedClass]?.[roll],
            marks: val === '' ? undefined : Number(val)
          }
        }
      }
    }));
  };

  const handleMaxMarkChange = (roll, val) => {
    setLocalTest(prev => ({
      ...prev,
      results: {
        ...prev.results,
        [selectedClass]: {
          ...prev.results?.[selectedClass],
          [roll]: {
            ...prev.results?.[selectedClass]?.[roll],
            maxMarks: val === '' ? undefined : Number(val)
          }
        }
      }
    }));
  };

  const toggleAbsent = (roll) => {
    const isAbsent = !!results[roll]?.absent;
    setLocalTest(prev => ({
      ...prev,
      results: {
        ...prev.results,
        [selectedClass]: {
          ...prev.results?.[selectedClass],
          [roll]: isAbsent ? { marks: '', maxMarks: '' } : { absent: true }
        }
      }
    }));
  };

  const handleApplyBatchMax = () => {
    const maxVal = Number(batchMaxMarks);
    if (!maxVal || isNaN(maxVal)) return;

    const updatedClassResults = { ...(localTest.results?.[selectedClass] || {}) };
    Object.keys(students).forEach(roll => {
      const existing = updatedClassResults[roll] || {};
      if (!existing.absent) {
        updatedClassResults[roll] = { ...existing, maxMarks: maxVal };
      }
    });

    setLocalTest(prev => ({
      ...prev,
      results: { ...prev.results, [selectedClass]: updatedClassResults }
    }));
    setShowBatchTool(false);
    setBatchMaxMarks('');
  };

  const handleSaveAll = () => {
    const updatedTests = data.tests.map(t => t.id === localTest.id ? localTest : t);
    const updated = { ...data, tests: updatedTests };
    setData(updated);
    saveData(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sortedRolls = Object.keys(students).sort();
  const filteredRolls = sortedRolls.filter(r => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return r.toLowerCase().includes(q) || students[r].toLowerCase().includes(q);
  });

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#000000', fontFamily: "'Inter', sans-serif" }}>
      <AdminHeader
        onBack={onBack}
        onHome={onHome}
        onLogout={onLogout}
        rightElement={
          <button
            type="button"
            onClick={handleSaveAll}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              background: saved ? '#059669' : '#000000',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            {saved ? <><Check size={14} /> Saved</> : 'Save'}
          </button>
        }
      />

      <main style={{ maxWidth: '580px', margin: '0 auto', padding: '1.75rem 1.25rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <h1 style={{
            fontSize: 'clamp(1.9rem, 5vw, 2.5rem)',
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            color: '#000000',
            margin: '0 0 0.25rem',
            lineHeight: 1.15
          }}>
            {localTest.title}
          </h1>
          <p style={{ color: '#6F6F6F', fontSize: '0.86rem', margin: 0 }}>
            {localTest.date} · {localTest.subject}
          </p>
        </div>

        {/* Toolbar: Max Marks Batch Apply */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setShowBatchTool(s => !s)}
            style={{
              padding: '0.5rem 0.95rem',
              borderRadius: '12px',
              border: '1px solid #E5E5E5',
              background: '#F8FAFC',
              color: '#000000',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <CheckSquare size={14} color="#000" />
            <span>Set Max Marks for all</span>
          </button>

          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search students..."
            style={{
              ...formInputStyle,
              flex: 1,
              height: 38,
              padding: '0.4rem 0.8rem',
              fontSize: '0.86rem'
            }}
          />
        </div>

        {/* Batch Tool Popdown */}
        {showBatchTool && (
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E5E5E5',
            borderRadius: '14px',
            padding: '0.9rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '0.84rem', color: '#000000', fontWeight: 600, flex: 1 }}>
              Max Marks for all:
            </span>
            <input
              type="number"
              value={batchMaxMarks}
              onChange={e => setBatchMaxMarks(e.target.value)}
              placeholder="40"
              style={{ ...formInputStyle, width: 80, padding: '0.4rem', textAlign: 'center', height: 38 }}
              autoFocus
            />
            <button
              type="button"
              onClick={handleApplyBatchMax}
              style={{ padding: '0.5rem 1rem', borderRadius: '10px', border: 'none', background: '#000000', color: '#FFFFFF', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => setShowBatchTool(false)}
              style={{ background: 'none', border: 'none', color: '#6F6F6F', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Student Marks Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {filteredRolls.map(roll => {
            const name = students[roll];
            const res = results[roll] || {};
            const isAbsent = !!res.absent;
            const scoreGrade = !isAbsent ? getScoreGrade(res.marks, res.maxMarks) : null;

            return (
              <div
                key={roll}
                style={{
                  background: isAbsent ? '#FFFDFD' : '#FFFFFF',
                  borderRadius: '16px',
                  border: `1px solid ${isAbsent ? '#FEE2E2' : '#E5E5E5'}`,
                  padding: '0.9rem 1.05rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: isAbsent ? 0 : '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flex: 1, minWidth: 0 }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.82rem', background: '#F4F4F4', color: '#000000', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                      {roll}
                    </span>
                    <span style={{ fontWeight: 700, fontSize: '0.94rem', color: isAbsent ? '#9CA3AF' : '#000000', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {name}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleAbsent(roll)}
                    style={{
                      padding: '0.28rem 0.75rem',
                      borderRadius: '9999px',
                      border: 'none',
                      background: isAbsent ? '#FEE2E2' : '#ECFDF5',
                      color: isAbsent ? '#DC2626' : '#059669',
                      fontWeight: 800,
                      fontSize: '0.74rem',
                      cursor: 'pointer'
                    }}
                  >
                    {isAbsent ? 'Absent' : 'Present'}
                  </button>
                </div>

                {!isAbsent && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      min="0"
                      value={res.marks ?? ''}
                      onChange={e => handleMarkChange(roll, e.target.value)}
                      placeholder="Marks"
                      style={{
                        ...formInputStyle,
                        height: 40,
                        textAlign: 'center',
                        fontWeight: 800,
                        fontSize: '1rem',
                        flex: 1
                      }}
                    />
                    <span style={{ color: '#9CA3AF', fontWeight: 700 }}>/</span>
                    <input
                      type="number"
                      min="0"
                      value={res.maxMarks ?? ''}
                      onChange={e => handleMaxMarkChange(roll, e.target.value)}
                      placeholder="Max"
                      style={{
                        ...formInputStyle,
                        height: 40,
                        textAlign: 'center',
                        fontWeight: 800,
                        fontSize: '1rem',
                        flex: 1
                      }}
                    />

                    {scoreGrade && (
                      <span style={{
                        background: scoreGrade.bg,
                        color: scoreGrade.color,
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        padding: '0.4rem 0.65rem',
                        borderRadius: '10px',
                        flexShrink: 0
                      }}>
                        {scoreGrade.pct}%
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

// ─── 6. STUDENTS ROSTER SCREEN ────────────────────────────────
function StudentsScreen({ data, onBack, onNavigateAddStudent, onHome, onLogout, setData }) {
  const [selectedClass, setSelectedClass] = useState('10th');
  const [search, setSearch] = useState('');
  const [editRoll, setEditRoll] = useState(null);
  const [editName, setEditName] = useState('');
  const [deleteRoll, setDeleteRoll] = useState(null);

  const students = data.students[selectedClass] || {};

  const handleSaveEdit = (roll) => {
    if (!editName.trim()) return;
    const updated = {
      ...data,
      students: {
        ...data.students,
        [selectedClass]: {
          ...data.students[selectedClass],
          [roll]: editName.trim()
        }
      }
    };
    setData(updated);
    saveData(updated);
    setEditRoll(null);
  };

  const handleConfirmDelete = (roll) => {
    const updatedStudents = { ...data.students[selectedClass] };
    delete updatedStudents[roll];

    const updatedTests = data.tests.map(t => {
      if (!t.results || !t.results[selectedClass]) return t;
      const res = { ...t.results[selectedClass] };
      delete res[roll];
      return { ...t, results: { ...t.results, [selectedClass]: res } };
    });

    const updated = {
      ...data,
      students: { ...data.students, [selectedClass]: updatedStudents },
      tests: updatedTests
    };
    setData(updated);
    saveData(updated);
    setDeleteRoll(null);
  };

  const sortedRolls = Object.keys(students).sort();
  const filteredRolls = sortedRolls.filter(r => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return r.toLowerCase().includes(q) || students[r].toLowerCase().includes(q);
  });

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#000000', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <AdminHeader
        onBack={onBack}
        onHome={onHome}
        onLogout={onLogout}
      />

      <main style={{ maxWidth: '580px', margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 6vw, 3.2rem)',
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            color: '#000000',
            margin: '0 0 0.35rem',
            lineHeight: 1.08
          }}>
            Students
          </h1>
          <p style={{ color: '#6F6F6F', fontSize: '0.95rem', margin: 0, fontFamily: "'Inter', sans-serif" }}>
            Class 9th & 10th student roster records
          </p>
        </div>

        {/* Class Switcher Rectangular Buttons (Fees & Tests Style) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.65rem',
          marginBottom: '0.9rem'
        }}>
          {['10th', '9th'].map(cls => {
            const count = Object.keys(data.students[cls] || {}).length;
            const active = selectedClass === cls;
            return (
              <button
                key={cls}
                type="button"
                onClick={() => { setSelectedClass(cls); setEditRoll(null); }}
                style={{
                  padding: '0.85rem 0.5rem',
                  borderRadius: '14px',
                  border: `2px solid ${active ? '#000000' : '#E5E5E5'}`,
                  background: active ? '#000000' : '#FAFAFA',
                  color: active ? '#FFFFFF' : '#374151',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  fontFamily: "'Inter', sans-serif",
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s'
                }}
              >
                Class {cls} ({count})
              </button>
            );
          })}
        </div>

        {/* Add Student Button Located Directly Below Class Switcher */}
        <button
          type="button"
          onClick={onNavigateAddStudent}
          style={{
            width: '100%',
            padding: '0.95rem',
            borderRadius: '16px',
            background: '#000000',
            color: '#FFFFFF',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.95rem',
            fontFamily: "'Inter', sans-serif",
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1.25rem',
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
          }}
        >
          <UserPlus size={18} />
          <span>Add Student</span>
        </button>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '0.95rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${selectedClass} students...`}
            style={{ ...formInputStyle, paddingLeft: '2.5rem', height: 44, borderRadius: '14px' }}
          />
        </div>

        {/* Delete Confirmation */}
        {deleteRoll && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '16px',
            padding: '0.9rem 1.1rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '0.84rem', color: '#991B1B', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
              Delete <strong>{students[deleteRoll]}</strong>?
            </span>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                type="button"
                onClick={() => setDeleteRoll(null)}
                style={{ padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#FFF', fontSize: '0.78rem', fontWeight: 700, fontFamily: "'Inter', sans-serif", cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleConfirmDelete(deleteRoll)}
                style={{ padding: '0.35rem 0.85rem', borderRadius: '8px', border: 'none', background: '#DC2626', color: '#FFF', fontSize: '0.78rem', fontWeight: 700, fontFamily: "'Inter', sans-serif", cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Student Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
          {filteredRolls.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#F8FAFC', borderRadius: '20px', border: '1px solid #E5E5E5', color: '#6F6F6F', fontFamily: "'Inter', sans-serif" }}>
              No students found. Tap "Add" to enroll student.
            </div>
          ) : (
            filteredRolls.map(roll => {
              const name = students[roll];
              const isEditing = editRoll === roll;

              return (
                <div
                  key={roll}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E5E5E5',
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1, minWidth: 0 }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.82rem', background: '#F4F4F4', color: '#000000', padding: '0.18rem 0.5rem', borderRadius: '6px' }}>
                      {roll}
                    </span>

                    {isEditing ? (
                      <div style={{ display: 'flex', gap: '0.35rem', flex: 1 }}>
                        <input
                          type="text"
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          style={{ ...formInputStyle, padding: '0.3rem 0.55rem', height: 34, fontSize: '0.88rem' }}
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(roll)}
                          style={{ background: '#000000', border: 'none', borderRadius: '8px', padding: '0 0.6rem', color: '#FFFFFF', cursor: 'pointer' }}
                        >
                          <Check size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditRoll(null)}
                          style={{ background: '#F4F4F4', border: 'none', borderRadius: '8px', padding: '0 0.6rem', color: '#6F6F6F', cursor: 'pointer' }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontWeight: 700, fontSize: '0.94rem', color: '#000000', fontFamily: "'Inter', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {name}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
                    <button
                      type="button"
                      onClick={() => { setEditRoll(roll); setEditName(name); }}
                      style={{ background: 'none', border: 'none', color: '#6F6F6F', cursor: 'pointer', padding: '6px' }}
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteRoll(roll)}
                      style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: '6px' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}

// ─── 7. DEDICATED SCREEN: ADD STUDENT (STRICT WEBSITE FORM THEME)
function AddStudentScreen({ data, setData, onBack, onHome, onLogout }) {
  const [selectedClass, setSelectedClass] = useState('10th');
  const [studentName, setStudentName] = useState('');

  const nextRoll = getNextRollNumber(selectedClass, data.students);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    const roll = getNextRollNumber(selectedClass, data.students);
    const updated = {
      ...data,
      students: {
        ...data.students,
        [selectedClass]: {
          ...data.students[selectedClass],
          [roll]: studentName.trim()
        }
      }
    };
    setData(updated);
    saveData(updated);
    onBack();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#000000', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <AdminHeader
        onBack={onBack}
        onHome={onHome}
        onLogout={onLogout}
      />

      <main style={{ maxWidth: '640px', margin: '0 auto', padding: '3rem 1.25rem 5rem' }}>
        {/* Top Centered Section Header matching BookDemoScreen */}
        <div style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto 2.5rem auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              background: '#F4F4F4',
              color: '#000000',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '1.25rem',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            <UserPlus size={14} color="#000000" />
            <span>ENROLLMENT PORTAL</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 6vw, 3.5rem)',
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            color: '#000000',
            margin: '0 0 0.6rem',
            lineHeight: 1.08
          }}>
            Add New Student
          </h1>
          <p style={{ color: '#6F6F6F', fontSize: '1rem', margin: 0, lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
            Enroll student into class batch roster with automated roll assignment
          </p>
        </div>

        {/* Dedicated Form Card matching website BookDemoScreen */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E5E5E5',
          borderRadius: '24px',
          padding: '2.2rem 1.8rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.06)'
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {/* Step 1: Select Class */}
            <div>
              <label style={formLabelStyle}>
                <BookOpen size={16} /> Select Academic Class *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.4rem' }}>
                {['10th', '9th'].map(cls => {
                  const isSelected = selectedClass === cls;
                  const autoRoll = getNextRollNumber(cls, data.students);
                  return (
                    <div
                      key={cls}
                      onClick={() => setSelectedClass(cls)}
                      style={{
                        padding: '1.05rem 1.15rem',
                        borderRadius: '16px',
                        border: isSelected ? '2px solid #000000' : '1px solid #E5E5E5',
                        background: isSelected ? '#000000' : '#FAFAFA',
                        color: isSelected ? '#FFFFFF' : '#000000',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', fontFamily: "'Inter', sans-serif" }}>
                        Class {cls}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: isSelected ? '#E5E5E5' : '#6F6F6F', marginTop: '0.2rem', fontFamily: "'Inter', sans-serif" }}>
                        Auto Roll: <strong>{autoRoll}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Student Name */}
            <div>
              <label style={formLabelStyle}>
                <Users size={16} /> Student Full Name *
              </label>
              <input
                type="text"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                placeholder="Enter student full name..."
                style={formInputStyle}
                required
                autoFocus
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!studentName.trim()}
              style={{
                width: '100%',
                padding: '1.05rem',
                borderRadius: '16px',
                background: studentName.trim() ? '#000000' : '#E5E5E5',
                color: studentName.trim() ? '#FFFFFF' : '#9CA3AF',
                border: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                fontFamily: "'Inter', sans-serif",
                cursor: studentName.trim() ? 'pointer' : 'not-allowed',
                marginTop: '0.5rem',
                boxShadow: studentName.trim() ? '0 8px 24px rgba(0, 0, 0, 0.15)' : 'none'
              }}
            >
              Save Student to Roster →
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

// ─── 8. DEDICATED SCREEN: FEES MANAGEMENT ─────────────────────
function FeesScreen({ data, setData, onBack, onHome, onLogout }) {
  const [selectedClass, setSelectedClass] = useState('10th');
  const [expandedStudentRoll, setExpandedStudentRoll] = useState(null);
  const [filterDueOnly, setFilterDueOnly] = useState('all');
  const [search, setSearch] = useState('');
  const [editingMonthlyAmount, setEditingMonthlyAmount] = useState(false);
  const [monthlyAmountInput, setMonthlyAmountInput] = useState(data.fees?.monthlyAmount || 600);
  const [receiptModal, setReceiptModal] = useState(null); // { student, selectedMonth, mode }

  const students = data.students[selectedClass] || {};
  const feesData = data.fees || { monthlyAmount: 600, records: {} };
  const baseMonthly = feesData.monthlyAmount || 600;

  const handleToggleMonth = (roll, month) => {
    const studentRecord = feesData.records?.[roll] || { monthlyAmount: baseMonthly, joiningMonth: 'April', dueDay: 5, paidMonths: {} };
    const paidMonths = { ...(studentRecord.paidMonths || {}) };

    if (paidMonths[month]) {
      delete paidMonths[month];
    } else {
      const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      paidMonths[month] = { date: today, mode: 'Cash', amount: studentRecord.monthlyAmount || baseMonthly };
    }

    const updatedFeesRecords = {
      ...feesData.records,
      [roll]: { ...studentRecord, paidMonths }
    };
    const updated = {
      ...data,
      fees: {
        ...feesData,
        records: updatedFeesRecords
      }
    };
    setData(updated);
    saveData(updated);

    if (receiptModal && receiptModal.student?.roll === roll) {
      const freshDetails = getStudentFeeDetails(roll, { ...feesData, records: updatedFeesRecords });
      setReceiptModal(prev => ({
        ...prev,
        student: {
          ...prev.student,
          ...freshDetails
        }
      }));
    }
  };

  const handleUpdatePaymentDate = (roll, month, newDate) => {
    const studentRecord = feesData.records?.[roll] || { monthlyAmount: baseMonthly, joiningMonth: 'April', dueDay: 5, paidMonths: {} };
    const paidMonths = { ...(studentRecord.paidMonths || {}) };
    if (!paidMonths[month]) {
      paidMonths[month] = { date: newDate, mode: 'Cash', amount: studentRecord.monthlyAmount || baseMonthly };
    } else {
      paidMonths[month] = { ...paidMonths[month], date: newDate };
    }

    const updatedFeesRecords = {
      ...feesData.records,
      [roll]: { ...studentRecord, paidMonths }
    };
    const updated = {
      ...data,
      fees: {
        ...feesData,
        records: updatedFeesRecords
      }
    };
    setData(updated);
    saveData(updated);

    if (receiptModal && receiptModal.student?.roll === roll) {
      const freshDetails = getStudentFeeDetails(roll, { ...feesData, records: updatedFeesRecords });
      setReceiptModal(prev => ({
        ...prev,
        student: {
          ...prev.student,
          ...freshDetails
        }
      }));
    }
  };

  const handleUpdateStudentFeeSettings = (roll, field, value) => {
    const studentRecord = feesData.records?.[roll] || { monthlyAmount: baseMonthly, joiningMonth: 'April', dueDay: 5, paidMonths: {} };
    const updated = {
      ...data,
      fees: {
        ...feesData,
        records: {
          ...feesData.records,
          [roll]: { ...studentRecord, [field]: value }
        }
      }
    };
    setData(updated);
    saveData(updated);
  };

  const handleSaveStandardMonthlyAmount = () => {
    const val = Number(monthlyAmountInput) || 1500;
    const updated = { ...data, fees: { ...feesData, monthlyAmount: val } };
    setData(updated);
    saveData(updated);
    setEditingMonthlyAmount(false);
  };

  const sortedRolls = Object.keys(students).sort();

  const filteredRolls = sortedRolls.filter(roll => {
    const name = students[roll];
    const details = getStudentFeeDetails(roll, feesData);
    const q = search.toLowerCase().trim();
    const matchesSearch = !q || roll.toLowerCase().includes(q) || name.toLowerCase().includes(q);
    if (!matchesSearch) return false;

    if (filterDueOnly === 'due') return details.dueCount > 0;
    if (filterDueOnly === 'clear') return details.dueCount === 0;
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#000000', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <AdminHeader
        onBack={onBack}
        onHome={onHome}
        onLogout={onLogout}
      />

      <main style={{ maxWidth: '580px', margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 6vw, 3.2rem)',
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            color: '#000000',
            margin: '0 0 0.35rem',
            lineHeight: 1.08
          }}>
            Fees
          </h1>
          <p style={{ color: '#6F6F6F', fontSize: '0.95rem', margin: '0 0 1.25rem', fontFamily: "'Inter', sans-serif" }}>
            Track monthly tuition & individual due dates
          </p>

          {/* Standard Base Fee pill */}
          {editingMonthlyAmount ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <input
                type="number"
                value={monthlyAmountInput}
                onChange={e => setMonthlyAmountInput(e.target.value)}
                style={{ ...formInputStyle, width: 85, height: 34, padding: '0.3rem', textAlign: 'center', fontSize: '0.84rem' }}
                autoFocus
              />
              <button
                type="button"
                onClick={handleSaveStandardMonthlyAmount}
                style={{ background: '#000000', color: '#FFFFFF', border: 'none', borderRadius: '8px', height: 34, padding: '0 0.65rem', cursor: 'pointer' }}
              >
                <Check size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => { setMonthlyAmountInput(baseMonthly); setEditingMonthlyAmount(true); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: '#F4F4F4',
                color: '#000000',
                padding: '0.4rem 0.95rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <span>Base Fee: ₹{baseMonthly.toLocaleString('en-IN')}/mo</span>
              <Edit3 size={12} />
            </button>
          )}
        </div>

        {/* Class Switcher */}
        <div style={{
          background: '#F4F4F4',
          padding: '4px',
          borderRadius: '9999px',
          display: 'flex',
          gap: '4px',
          marginBottom: '1rem'
        }}>
          {['10th', '9th'].map(cls => {
            const count = Object.keys(data.students[cls] || {}).length;
            const active = selectedClass === cls;
            return (
              <button
                key={cls}
                type="button"
                onClick={() => { setSelectedClass(cls); setExpandedStudentRoll(null); }}
                style={{
                  flex: 1,
                  padding: '0.55rem',
                  borderRadius: '9999px',
                  border: 'none',
                  background: active ? '#000000' : 'transparent',
                  color: active ? '#FFFFFF' : '#6F6F6F',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                Class {cls} ({count})
              </button>
            );
          })}
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.45rem', marginBottom: '0.85rem' }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'due', label: 'Pending Due' },
            { id: 'clear', label: 'All Clear' },
          ].map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilterDueOnly(f.id)}
              style={{
                flex: 1,
                padding: '0.45rem',
                borderRadius: '10px',
                border: filterDueOnly === f.id ? '1.5px solid #000000' : '1px solid #E5E5E5',
                background: filterDueOnly === f.id ? '#000000' : '#FFFFFF',
                color: filterDueOnly === f.id ? '#FFFFFF' : '#6F6F6F',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '0.95rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${selectedClass} fees...`}
            style={{ ...formInputStyle, paddingLeft: '2.5rem', height: 42 }}
          />
        </div>

        {/* Student Fee Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {filteredRolls.map(roll => {
            const name = students[roll];
            const details = getStudentFeeDetails(roll, feesData);
            const isExpanded = expandedStudentRoll === roll;

            return (
              <div
                key={roll}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E5E5E5',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedStudentRoll(isExpanded ? null : roll)}
                  style={{
                    padding: '1rem 1.15rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    background: isExpanded ? '#FAFAFA' : '#FFFFFF',
                    borderBottom: isExpanded ? '1px solid #E5E5E5' : 'none'
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.8rem', background: '#F4F4F4', color: '#000000', padding: '0.12rem 0.45rem', borderRadius: '5px' }}>
                        {roll}
                      </span>
                      <span style={{ fontWeight: 800, fontSize: '0.94rem', color: '#000000', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {name}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.74rem', color: '#6F6F6F' }}>
                      Submitted Up To: <strong style={{ color: details.dueCount === 0 ? '#059669' : '#000000' }}>{details.paidUpToDateShort}</strong> · Next Due: <strong>{details.nextDueDate}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexShrink: 0 }}>
                    {details.dueCount === 0 ? (
                      <span style={{ background: '#ECFDF5', color: '#059669', padding: '0.25rem 0.7rem', borderRadius: '9999px', fontSize: '0.74rem', fontWeight: 800 }}>
                        Clear ✓
                      </span>
                    ) : (
                      <span style={{ background: '#FFFBEB', color: '#D97706', border: '1px solid #FDE68A', padding: '0.25rem 0.7rem', borderRadius: '9999px', fontSize: '0.74rem', fontWeight: 800 }}>
                        ₹{details.dueAmount.toLocaleString('en-IN')} Due
                      </span>
                    )}

                    <ChevronRight size={16} color="#94A3B8" style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }} />
                  </div>
                </div>

                {/* Expanded Details: Settings Box & Month-by-Month List */}
                {isExpanded && (
                  <div style={{ padding: '1.1rem', background: '#FFFFFF' }}>
                    {/* Fees Submitted Up To Reassurance Banner */}
                    <div style={{
                      background: details.dueCount === 0 ? '#ECFDF5' : '#FFFBEB',
                      border: `1px solid ${details.dueCount === 0 ? '#A7F3D0' : '#FDE68A'}`,
                      borderRadius: '12px',
                      padding: '0.75rem 0.95rem',
                      marginBottom: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.68rem', fontWeight: 800, color: details.dueCount === 0 ? '#047857' : '#B45309', textTransform: 'uppercase' }}>
                          Fees Submitted Up To
                        </div>
                        <div style={{ fontSize: '0.98rem', fontWeight: 900, color: details.dueCount === 0 ? '#065F46' : '#92400E' }}>
                          {details.paidUpToDate}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.68rem', color: '#6F6F6F' }}>
                          Next Due Date
                        </div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#000000' }}>
                          {details.nextDueDate}
                        </div>
                      </div>
                    </div>

                    {/* Cumulative Fees Paid Summary Banner */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.5rem',
                      marginBottom: '0.85rem'
                    }}>
                      <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '0.65rem 0.8rem' }}>
                        <div style={{ fontSize: '0.66rem', fontWeight: 800, color: '#047857', textTransform: 'uppercase' }}>
                          Total Fees Paid
                        </div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#065F46', marginTop: '1px' }}>
                          ₹{details.paidAmount.toLocaleString('en-IN')}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#059669', marginTop: '1px' }}>
                          {details.paidCount} of {details.totalActive} months
                        </div>
                      </div>

                      <div style={{
                        background: details.dueCount === 0 ? '#F9FAFB' : '#FFF7ED',
                        border: `1px solid ${details.dueCount === 0 ? '#E5E5E5' : '#FDE68A'}`,
                        borderRadius: '12px',
                        padding: '0.65rem 0.8rem'
                      }}>
                        <div style={{ fontSize: '0.66rem', fontWeight: 800, color: details.dueCount === 0 ? '#6B7280' : '#B45309', textTransform: 'uppercase' }}>
                          Pending Due
                        </div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 900, color: details.dueCount === 0 ? '#111' : '#D97706', marginTop: '1px' }}>
                          {details.dueCount === 0 ? 'Nil ✓' : `₹${details.dueAmount.toLocaleString('en-IN')}`}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: details.dueCount === 0 ? '#6B7280' : '#B45309', marginTop: '1px' }}>
                          {details.dueCount === 0 ? 'All fees clear' : `${details.dueCount} month(s) pending`}
                        </div>
                      </div>
                    </div>

                    {/* Settings Row */}
                    <div style={{
                      background: '#FAFAFA',
                      border: '1px solid #E5E5E5',
                      borderRadius: '14px',
                      padding: '0.95rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#000000', marginBottom: '0.25rem' }}>
                            Admission
                          </label>
                          <select
                            value={details.joiningMonth}
                            onChange={e => handleUpdateStudentFeeSettings(roll, 'joiningMonth', e.target.value)}
                            style={{ ...formInputStyle, padding: '0.45rem', height: 38, fontSize: '0.82rem' }}
                          >
                            {DEFAULT_FEE_MONTHS.map(m => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#000000', marginBottom: '0.25rem' }}>
                            Due Day
                          </label>
                          <select
                            value={details.dueDay}
                            onChange={e => handleUpdateStudentFeeSettings(roll, 'dueDay', Number(e.target.value))}
                            style={{ ...formInputStyle, padding: '0.45rem', height: 38, fontSize: '0.82rem' }}
                          >
                            {DUE_DAY_OPTIONS.map(d => (
                              <option key={d} value={d}>{getOrdinal(d)}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#000000', marginBottom: '0.25rem' }}>
                            Monthly (₹)
                          </label>
                          <input
                            type="number"
                            value={details.monthlyAmount}
                            onChange={e => handleUpdateStudentFeeSettings(roll, 'monthlyAmount', Number(e.target.value))}
                            style={{ ...formInputStyle, padding: '0.45rem', height: 38, fontSize: '0.82rem' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem' }}>
                        <button
                          type="button"
                          onClick={() => setReceiptModal({
                            student: { roll, name, cls: selectedClass, ...details },
                            mode: 'cumulative'
                          })}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.35rem',
                            fontSize: '0.76rem',
                            fontWeight: 700,
                            color: '#FFFFFF',
                            background: '#000000',
                            padding: '0.55rem',
                            borderRadius: '10px',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          <FileText size={13} /> View Complete Bill
                        </button>

                        <a
                          href={`https://wa.me/918707833076?text=${encodeURIComponent(`Hello, Eureka Science Classes fee update for ${name} (${roll}): Fees submitted up to: ${details.paidUpToDate}. Next due date: ${details.nextDueDate}. ${details.dueCount > 0 ? `Pending due: ₹${details.dueAmount.toLocaleString('en-IN')}.` : 'All fees are clear.'}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.35rem',
                            fontSize: '0.76rem',
                            fontWeight: 700,
                            color: '#059669',
                            textDecoration: 'none',
                            background: '#ECFDF5',
                            padding: '0.55rem',
                            borderRadius: '10px'
                          }}
                        >
                          <MessageSquare size={13} /> WhatsApp Reminder
                        </a>
                      </div>
                    </div>

                    {/* Month-by-Month Mobile List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                      {DEFAULT_FEE_MONTHS.map(month => {
                        const isEnrolled = details.isMonthActive(month);
                        const paidInfo = details.paidMonths[month];
                        const isPaid = !!paidInfo;
                        const cycle = details.getMonthValidity ? details.getMonthValidity(month) : '';

                        if (!isEnrolled) {
                          return (
                            <div
                              key={month}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.6rem 0.85rem',
                                borderRadius: '10px',
                                background: '#FAFAFA',
                                border: '1px solid #E5E5E5',
                                opacity: 0.65
                              }}
                            >
                              <span style={{ fontSize: '0.82rem', color: '#9CA3AF', fontWeight: 600 }}>{month}</span>
                              <span style={{ fontSize: '0.7rem', color: '#9CA3AF', background: '#F4F4F4', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>Exempt</span>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={month}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '0.65rem 0.85rem',
                              borderRadius: '10px',
                              background: isPaid ? '#ECFDF5' : '#FFFBEB',
                              border: `1px solid ${isPaid ? '#A7F3D0' : '#FDE68A'}`
                            }}
                          >
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <span style={{ fontWeight: 800, fontSize: '0.88rem', color: isPaid ? '#065F46' : '#B45309' }}>
                                  {month}
                                </span>
                                <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>
                                  · ₹{details.monthlyAmount}
                                </span>
                              </div>

                              {/* Editable Payment Date for Admin */}
                              {isPaid ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.15rem' }}>
                                  <span style={{ fontSize: '0.68rem', color: '#047857', fontWeight: 700 }}>
                                    Paid Date:
                                  </span>
                                  <input
                                    key={`${roll}-${month}-${paidInfo?.date || ''}`}
                                    type="text"
                                    defaultValue={paidInfo.date || ''}
                                    placeholder="DD Mon YYYY"
                                    title="Click to edit payment date"
                                    onBlur={e => {
                                      const val = e.target.value.trim();
                                      if (val && val !== paidInfo.date) {
                                        handleUpdatePaymentDate(roll, month, val);
                                      }
                                    }}
                                    style={{
                                      fontSize: '0.7rem',
                                      fontWeight: 800,
                                      color: '#065F46',
                                      background: '#FFFFFF',
                                      border: '1px solid #A7F3D0',
                                      borderRadius: '6px',
                                      padding: '1px 5px',
                                      width: '95px'
                                    }}
                                  />
                                </div>
                              ) : (
                                <div style={{ fontSize: '0.7rem', color: '#6B7280', marginTop: '0.1rem' }}>
                                  Due on {getOrdinal(details.dueDay)} {month}
                                </div>
                              )}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
                              <button
                                type="button"
                                onClick={() => setReceiptModal({
                                  student: { roll, name, cls: selectedClass, ...details },
                                  selectedMonth: month,
                                  mode: 'single'
                                })}
                                style={{
                                  padding: '0.36rem 0.6rem',
                                  borderRadius: '8px',
                                  border: '1px solid #D1D5DB',
                                  background: '#FFFFFF',
                                  color: '#111827',
                                  fontWeight: 700,
                                  fontSize: '0.72rem',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.25rem'
                                }}
                              >
                                <FileText size={12} /> Bill
                              </button>

                              <button
                                type="button"
                                onClick={() => handleToggleMonth(roll, month)}
                                style={{
                                  padding: '0.36rem 0.75rem',
                                  borderRadius: '8px',
                                  border: 'none',
                                  background: isPaid ? '#059669' : '#000000',
                                  color: '#FFFFFF',
                                  fontWeight: 800,
                                  fontSize: '0.72rem',
                                  cursor: 'pointer'
                                }}
                              >
                                {isPaid ? 'Paid ✓' : 'Mark Paid'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ══════════ MODAL: OFFICIAL RECEIPT PREVIEW WITH RED STAMP & JPG DOWNLOAD ══════════ */}
        {receiptModal && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.68)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backdropFilter: 'blur(6px)',
            overflowY: 'auto'
          }}>
            <div style={{
              background: '#F8FAFC',
              borderRadius: '24px',
              maxWidth: '520px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              padding: '1.25rem',
              position: 'relative',
              boxShadow: '0 25px 60px rgba(0,0,0,0.35)'
            }}>
              {/* Modal Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0F172A' }}>
                    Fee Bill Preview
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    {receiptModal.student.name} ({receiptModal.student.roll}) • Class {receiptModal.student.cls}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setReceiptModal(null)}
                  style={{
                    background: '#E2E8F0',
                    border: 'none',
                    borderRadius: '9999px',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={16} color="#0F172A" />
                </button>
              </div>

              {/* Modal Mode Selector: [ Specific Month Bill ] vs [ Complete Master Bill ] */}
              <div style={{
                background: '#E2E8F0',
                padding: '3px',
                borderRadius: '10px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '3px',
                marginBottom: '0.85rem'
              }}>
                <button
                  type="button"
                  onClick={() => setReceiptModal(prev => ({ ...prev, mode: 'single' }))}
                  style={{
                    padding: '0.45rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: (!receiptModal.mode || receiptModal.mode === 'single') ? '#000000' : 'transparent',
                    color: (!receiptModal.mode || receiptModal.mode === 'single') ? '#FFFFFF' : '#475569',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  Monthly Bill ({receiptModal.selectedMonth || 'April'})
                </button>

                <button
                  type="button"
                  onClick={() => setReceiptModal(prev => ({ ...prev, mode: 'cumulative' }))}
                  style={{
                    padding: '0.45rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: receiptModal.mode === 'cumulative' ? '#000000' : 'transparent',
                    color: receiptModal.mode === 'cumulative' ? '#FFFFFF' : '#475569',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  Complete Master Bill
                </button>
              </div>

              {/* Month Switcher inside Modal if single mode */}
              {(!receiptModal.mode || receiptModal.mode === 'single') && (
                <div style={{
                  display: 'flex',
                  gap: '0.35rem',
                  overflowX: 'auto',
                  paddingBottom: '0.65rem',
                  marginBottom: '1rem'
                }}>
                  {DEFAULT_FEE_MONTHS.map(m => {
                    const isAct = receiptModal.student.isMonthActive(m);
                    const isP = !!receiptModal.student.paidMonths[m];
                    const isSel = receiptModal.selectedMonth === m;

                    return (
                      <button
                        key={m}
                        type="button"
                        disabled={!isAct}
                        onClick={() => setReceiptModal({ ...receiptModal, selectedMonth: m, mode: 'single' })}
                        style={{
                          flexShrink: 0,
                          padding: '0.36rem 0.65rem',
                          borderRadius: '8px',
                          border: isSel ? '1.5px solid #000' : '1px solid #E2E8F0',
                          background: isSel ? '#000' : (isP ? '#ECFDF5' : '#FFF'),
                          color: isSel ? '#FFF' : (isP ? '#047857' : '#64748B'),
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          cursor: !isAct ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {m.slice(0, 3)} {isP ? '✓' : ''}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Reusable Minimal Receipt Card with Red Stamp & JPG Download */}
              <FeeReceiptCard
                student={receiptModal.student}
                selectedMonth={receiptModal.selectedMonth || 'April'}
                mode={receiptModal.mode || 'single'}
                showActions={true}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── MAIN CONTROLLER (DEDICATED MULTI-SCREEN ROUTER) ──────────
export default function AdminPanel({ onBackToSite }) {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('eureka_admin_auth') === '1');
  const [data, setData] = useState(() => getData());
  // 'dashboard' | 'tests' | 'create-test' | 'test-detail' | 'students' | 'add-student' | 'fees'
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [selectedTest, setSelectedTest] = useState(null);

  const handleLogin = () => {
    sessionStorage.setItem('eureka_admin_auth', '1');
    setLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('eureka_admin_auth');
    setLoggedIn(false);
    setCurrentScreen('dashboard');
    setSelectedTest(null);
  };

  if (!loggedIn) {
    return <LoginView onLogin={handleLogin} onBackToSite={onBackToSite} />;
  }

  // SCREEN 1: Test Marks Entry
  if (currentScreen === 'test-detail' && selectedTest) {
    return (
      <TestDetailScreen
        test={selectedTest}
        data={data}
        setData={setData}
        onBack={() => {
          setData(getData());
          setCurrentScreen('tests');
        }}
        onHome={onBackToSite}
        onLogout={handleLogout}
      />
    );
  }

  // SCREEN 2: Create Test (Dedicated screen matching website form theme)
  if (currentScreen === 'create-test') {
    return (
      <CreateTestScreen
        data={data}
        setData={setData}
        onBack={() => setCurrentScreen('tests')}
        onHome={onBackToSite}
        onLogout={handleLogout}
      />
    );
  }

  // SCREEN 3: Tests List
  if (currentScreen === 'tests') {
    return (
      <TestsScreen
        data={data}
        setData={setData}
        onBack={() => setCurrentScreen('dashboard')}
        onSelectTest={(test) => {
          setSelectedTest(test);
          setCurrentScreen('test-detail');
        }}
        onNavigateCreateTest={() => setCurrentScreen('create-test')}
        onHome={onBackToSite}
        onLogout={handleLogout}
      />
    );
  }

  // SCREEN 4: Add Student (Dedicated screen matching website form theme)
  if (currentScreen === 'add-student') {
    return (
      <AddStudentScreen
        data={data}
        setData={setData}
        onBack={() => setCurrentScreen('students')}
        onHome={onBackToSite}
        onLogout={handleLogout}
      />
    );
  }

  // SCREEN 5: Students Roster
  if (currentScreen === 'students') {
    return (
      <StudentsScreen
        data={data}
        setData={setData}
        onBack={() => setCurrentScreen('dashboard')}
        onNavigateAddStudent={() => setCurrentScreen('add-student')}
        onHome={onBackToSite}
        onLogout={handleLogout}
      />
    );
  }

  // SCREEN 6: Fees Management
  if (currentScreen === 'fees') {
    return (
      <FeesScreen
        data={data}
        setData={setData}
        onBack={() => setCurrentScreen('dashboard')}
        onHome={onBackToSite}
        onLogout={handleLogout}
      />
    );
  }

  // DEFAULT: Dashboard with 3 Large Stacked Buttons
  return (
    <DashboardHome
      onNavigate={(screen) => setCurrentScreen(screen)}
      onLogout={handleLogout}
      onBackToSite={onBackToSite}
    />
  );
}
