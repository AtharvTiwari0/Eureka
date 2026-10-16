import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, Plus, Trash2, Edit3, MoreVertical,
  Check, X, Eye, EyeOff, ShieldCheck, LogOut,
  ChevronRight, Users, ClipboardList, ToggleLeft, ToggleRight,
  UserPlus, BookOpen, AlertTriangle, Sparkles, Filter
} from 'lucide-react';
import { getData, saveData, getNextRollNumber } from '../adminData';

const ADMIN_PASSWORD = 'eureka2026';

const BADGE_PRESETS = [
  { label: 'Test 1', color: '#7C3AED', bg: '#F5F3FF' },
  { label: 'Test 2', color: '#059669', bg: '#ECFDF5' },
  { label: 'Test 3', color: '#DC2626', bg: '#FEF2F2' },
  { label: 'Test 4', color: '#D97706', bg: '#FFFBEB' },
  { label: 'Unit Test', color: '#0284C7', bg: '#EFF6FF' },
  { label: 'Mixed Test', color: '#0891B2', bg: '#ECFEFF' },
];

const BADGE_COLORS = [
  { color: '#7C3AED', bg: '#F5F3FF' },
  { color: '#059669', bg: '#ECFDF5' },
  { color: '#DC2626', bg: '#FEF2F2' },
  { color: '#D97706', bg: '#FFFBEB' },
  { color: '#0284C7', bg: '#EFF6FF' },
  { color: '#4B5563', bg: '#F3F4F6' },
];

// ─── Helpers ──────────────────────────────────────────────────
function Badge({ label, color, bg }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.2rem 0.6rem',
      borderRadius: '9999px',
      background: bg || '#F3F4F6',
      color: color || '#111',
      fontSize: '0.72rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.04em'
    }}>
      {label}
    </span>
  );
}

function StatusPill({ status }) {
  return status === 'live' ? (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.35rem',
      padding: '0.2rem 0.65rem',
      borderRadius: '9999px',
      background: '#ECFDF5',
      color: '#059669',
      fontSize: '0.72rem',
      fontWeight: 700
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669', display: 'inline-block' }} /> Live
    </span>
  ) : (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.35rem',
      padding: '0.2rem 0.65rem',
      borderRadius: '9999px',
      background: '#FFFBEB',
      color: '#D97706',
      fontSize: '0.72rem',
      fontWeight: 700
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }} /> Coming Soon
    </span>
  );
}

// ─── 3-Dot Menu ───────────────────────────────────────────────
function DotMenu({ items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label="More options"
        style={{
          background: open ? '#F3F4F6' : 'transparent',
          border: 'none',
          borderRadius: '8px',
          width: 32,
          height: 32,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.15s'
        }}
      >
        <MoreVertical size={16} color="#6B7280" />
      </button>
      {open && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: '100%',
          marginTop: 4,
          background: '#FFF',
          border: '1px solid #E5E7EB',
          borderRadius: '12px',
          boxShadow: '0 10px 28px rgba(0,0,0,0.12)',
          zIndex: 100,
          minWidth: 160,
          overflow: 'hidden'
        }}>
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { item.action(); setOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                width: '100%',
                padding: '0.65rem 1rem',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: item.danger ? '#DC2626' : '#374151',
                transition: 'background 0.1s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = item.danger ? '#FEF2F2' : '#F9FAFB'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Input field helper ───────────────────────────────────────
function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: '0.9rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {label}
        </label>
        {hint && <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '0.65rem 0.85rem',
  borderRadius: '10px',
  border: '1.5px solid #E5E7EB',
  fontSize: '0.88rem',
  color: '#111',
  outline: 'none',
  fontFamily: "'Inter', sans-serif",
  background: '#FFF'
};

// ─── 1. LOGIN VIEW ────────────────────────────────────────────
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
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 390, background: '#FFF', borderRadius: '24px', padding: '2.5rem 2rem', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'linear-gradient(135deg, #1E1B4B, #3730A3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <ShieldCheck size={28} color="#FFF" />
          </div>
          <div style={{ fontSize: '1.6rem', fontFamily: "'Instrument Serif', Georgia, serif", color: '#000', marginBottom: '0.25rem' }}>Eureka Admin</div>
          <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>Enter your administrator password</div>
        </div>

        <form onSubmit={handleSubmit}>
          <Field label="Admin Password">
            <div style={{ position: 'relative' }}>
              <input
                type={show ? 'text' : 'password'}
                value={pw}
                onChange={e => { setPw(e.target.value); setErr(''); }}
                placeholder="Enter password..."
                style={{ ...inputStyle, paddingRight: '2.5rem', borderColor: err ? '#FCA5A5' : '#E5E7EB' }}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </Field>
          {err && (
            <div style={{ fontSize: '0.82rem', color: '#DC2626', marginBottom: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              ⚠️ {err}
            </div>
          )}
          <button
            type="submit"
            style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', background: 'linear-gradient(135deg, #1E1B4B, #3730A3)', color: '#FFF', border: 'none', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer' }}
          >
            Login to Admin
          </button>
          {onBackToSite && (
            <button
              type="button"
              onClick={onBackToSite}
              style={{
                width: '100%',
                marginTop: '0.75rem',
                padding: '0.75rem',
                borderRadius: '12px',
                background: '#F3F4F6',
                color: '#4B5563',
                border: '1px solid #E5E7EB',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
              }}
            >
              <ArrowLeft size={15} /> Back to Website
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

// ─── 2. ALL STUDENTS SECTION ──────────────────────────────────
function StudentsView({ data, setData }) {
  const [selectedClass, setSelectedClass] = useState('10th');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [editRoll, setEditRoll] = useState(null);
  const [editName, setEditName] = useState('');
  const [deleteRoll, setDeleteRoll] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const students = data.students[selectedClass] || {};
  const nextRoll = getNextRollNumber(selectedClass, data.students);

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    const roll = getNextRollNumber(selectedClass, data.students);
    const updated = {
      ...data,
      students: {
        ...data.students,
        [selectedClass]: {
          ...data.students[selectedClass],
          [roll]: newStudentName.trim()
        }
      }
    };
    setData(updated);
    saveData(updated);
    setNewStudentName('');
    setShowAddForm(false);
  };

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

    // Also remove from all test results
    const updatedTests = data.tests.map(t => {
      if (!t.results || !t.results[selectedClass]) return t;
      const res = { ...t.results[selectedClass] };
      delete res[roll];
      return {
        ...t,
        results: {
          ...t.results,
          [selectedClass]: res
        }
      };
    });

    const updated = {
      ...data,
      students: {
        ...data.students,
        [selectedClass]: updatedStudents
      },
      tests: updatedTests
    };
    setData(updated);
    saveData(updated);
    setDeleteRoll(null);
  };

  const sortedRolls = Object.keys(students).sort();
  const filteredRolls = sortedRolls.filter(roll => {
    const name = students[roll] || '';
    const q = searchQuery.toLowerCase().trim();
    return !q || roll.toLowerCase().includes(q) || name.toLowerCase().includes(q);
  });

  return (
    <div>
      {/* Class Switcher & Add Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.5rem', background: '#E5E7EB', padding: '0.25rem', borderRadius: '12px' }}>
          {['10th', '9th'].map(cls => {
            const count = Object.keys(data.students[cls] || {}).length;
            const active = selectedClass === cls;
            return (
              <button
                key={cls}
                type="button"
                onClick={() => { setSelectedClass(cls); setEditRoll(null); setShowAddForm(false); }}
                style={{
                  padding: '0.55rem 1.1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: active ? '#000' : 'transparent',
                  color: active ? '#FFF' : '#374151',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                Class {cls} ({count})
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(v => !v)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: showAddForm ? '#F3F4F6' : '#000',
            color: showAddForm ? '#111' : '#FFF',
            border: showAddForm ? '1px solid #D1D5DB' : 'none',
            borderRadius: '9999px',
            padding: '0.55rem 1.15rem',
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer'
          }}
        >
          {showAddForm ? <X size={15} /> : <UserPlus size={15} />}
          {showAddForm ? 'Cancel' : 'Add Student'}
        </button>
      </div>

      {/* Inline Add Student Form (NO POPUP) */}
      {showAddForm && (
        <form onSubmit={handleAddStudent} style={{ background: '#FFF', borderRadius: '18px', border: '1.5px solid #6366F1', padding: '1.25rem', marginBottom: '1.25rem', boxShadow: '0 4px 16px rgba(99, 102, 241, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#111' }}>
              Add New Student to Class {selectedClass}
            </div>
            <div style={{ background: '#EEF2FF', color: '#4F46E5', padding: '0.2rem 0.65rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
              Auto Roll: <strong>{nextRoll}</strong>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={newStudentName}
              onChange={e => setNewStudentName(e.target.value)}
              placeholder="Enter student full name..."
              style={{ ...inputStyle, flex: 1, minWidth: 200 }}
              autoFocus
            />
            <button
              type="submit"
              disabled={!newStudentName.trim()}
              style={{
                padding: '0.65rem 1.4rem',
                borderRadius: '10px',
                border: 'none',
                background: newStudentName.trim() ? '#4F46E5' : '#D1D5DB',
                color: '#FFF',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: newStudentName.trim() ? 'pointer' : 'not-allowed'
              }}
            >
              Save Student
            </button>
          </div>
        </form>
      )}

      {/* Search Input */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={`Search ${selectedClass} students by name or roll number...`}
          style={{ ...inputStyle, background: '#FFF', padding: '0.65rem 0.95rem' }}
        />
      </div>

      {/* Delete Confirmation Inline Banner */}
      {deleteRoll && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '14px', padding: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <AlertTriangle size={18} color="#DC2626" />
            <span style={{ fontSize: '0.88rem', color: '#991B1B', fontWeight: 600 }}>
              Delete <strong>{students[deleteRoll]}</strong> ({deleteRoll}) permanently?
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setDeleteRoll(null)}
              style={{ padding: '0.4rem 0.85rem', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#FFF', color: '#374151', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleConfirmDelete(deleteRoll)}
              style={{ padding: '0.4rem 0.95rem', borderRadius: '8px', border: 'none', background: '#DC2626', color: '#FFF', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      )}

      {/* Students List */}
      <div style={{ background: '#FFF', borderRadius: '18px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 40px', padding: '0.75rem 1.1rem', background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', fontSize: '0.72rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          <div>Roll No</div>
          <div>Student Name</div>
          <div></div>
        </div>

        {filteredRolls.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#9CA3AF', fontSize: '0.9rem' }}>
            {searchQuery ? 'No students match your search.' : 'No students registered for this class.'}
          </div>
        ) : (
          filteredRolls.map((roll, idx) => {
            const name = students[roll];
            const isEditing = editRoll === roll;
            return (
              <div
                key={roll}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '90px 1fr 40px',
                  alignItems: 'center',
                  padding: '0.75rem 1.1rem',
                  borderBottom: idx < filteredRolls.length - 1 ? '1px solid #F3F4F6' : 'none'
                }}
              >
                {/* Roll */}
                <div style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.85rem', color: '#4B5563' }}>
                  {roll}
                </div>

                {/* Name / Inline Edit */}
                {isEditing ? (
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      style={{ ...inputStyle, padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(roll)}
                      style={{ background: '#000', border: 'none', borderRadius: '8px', padding: '0.45rem 0.65rem', color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <Check size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditRoll(null)}
                      style={{ background: '#F3F4F6', border: 'none', borderRadius: '8px', padding: '0.45rem 0.65rem', color: '#6B7280', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111' }}>
                    {name}
                  </div>
                )}

                {/* 3-Dot Menu */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <DotMenu
                    items={[
                      {
                        label: 'Edit Name',
                        icon: <Edit3 size={14} />,
                        action: () => { setEditRoll(roll); setEditName(name); }
                      },
                      {
                        label: 'Delete Student',
                        icon: <Trash2 size={14} />,
                        danger: true,
                        action: () => setDeleteRoll(roll)
                      }
                    ]}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ─── 3. TESTS SECTION ─────────────────────────────────────────
function TestsListView({ data, setData, onSelectTest }) {
  const [classFilter, setClassFilter] = useState('all'); // 'all' | '10th' | '9th'
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Add Test Form State
  const [form, setForm] = useState({
    title: '',
    subtitle: 'Sunday Special Assessment',
    date: '',
    subject: 'Science (PCB)',
    badgePreset: 'Test 1',
    customBadgeText: '',
    isCustomBadge: false,
    badgeColor: '#7C3AED',
    badgeBg: '#F5F3FF',
    classes: ['10th'],
    status: 'coming-soon'
  });

  const handleToggleClass = (cls) => {
    setForm(f => {
      const exists = f.classes.includes(cls);
      if (exists && f.classes.length === 1) return f; // Keep at least one class
      return {
        ...f,
        classes: exists ? f.classes.filter(c => c !== cls) : [...f.classes, cls]
      };
    });
  };

  const handleCreateTest = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.date.trim()) return;

    const finalBadge = form.isCustomBadge && form.customBadgeText.trim()
      ? form.customBadgeText.trim()
      : form.badgePreset;

    const newTest = {
      id: `test-${Date.now()}`,
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      date: form.date.trim(),
      subject: form.subject.trim(),
      badge: finalBadge,
      badgeColor: form.badgeColor,
      badgeBg: form.badgeBg,
      classes: form.classes,
      status: form.status,
      results: Object.fromEntries(form.classes.map(c => [c, {}])),
    };

    const updated = {
      ...data,
      tests: [newTest, ...data.tests]
    };
    setData(updated);
    saveData(updated);
    setShowAddForm(false);
    setForm({
      title: '',
      subtitle: 'Sunday Special Assessment',
      date: '',
      subject: 'Science (PCB)',
      badgePreset: 'Test 1',
      customBadgeText: '',
      isCustomBadge: false,
      badgeColor: '#7C3AED',
      badgeBg: '#F5F3FF',
      classes: ['10th'],
      status: 'coming-soon'
    });
  };

  const handleConfirmDeleteTest = (testId) => {
    const updated = {
      ...data,
      tests: data.tests.filter(t => t.id !== testId)
    };
    setData(updated);
    saveData(updated);
    setDeleteTargetId(null);
  };

  // Filter tests by class
  const filteredTests = data.tests.filter(test => {
    if (classFilter === 'all') return true;
    return test.classes && test.classes.includes(classFilter);
  });

  return (
    <div>
      {/* Top Filter Bar & Add Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {/* Class Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', background: '#E5E7EB', padding: '0.25rem', borderRadius: '12px' }}>
          {[
            { id: 'all', label: 'All Tests' },
            { id: '10th', label: 'Class 10th' },
            { id: '9th', label: 'Class 9th' },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setClassFilter(tab.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                border: 'none',
                background: classFilter === tab.id ? '#000' : 'transparent',
                color: classFilter === tab.id ? '#FFF' : '#374151',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(v => !v)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: showAddForm ? '#F3F4F6' : '#000',
            color: showAddForm ? '#111' : '#FFF',
            border: showAddForm ? '1px solid #D1D5DB' : 'none',
            borderRadius: '9999px',
            padding: '0.55rem 1.15rem',
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer'
          }}
        >
          {showAddForm ? <X size={15} /> : <Plus size={15} />}
          {showAddForm ? 'Cancel' : 'Add New Test'}
        </button>
      </div>

      {/* Inline Delete Test Warning (NO POPUP) */}
      {deleteTargetId && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '14px', padding: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <AlertTriangle size={18} color="#DC2626" />
            <span style={{ fontSize: '0.88rem', color: '#991B1B', fontWeight: 600 }}>
              Delete this test and all its entered marks permanently?
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setDeleteTargetId(null)}
              style={{ padding: '0.4rem 0.85rem', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#FFF', color: '#374151', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleConfirmDeleteTest(deleteTargetId)}
              style={{ padding: '0.4rem 0.95rem', borderRadius: '8px', border: 'none', background: '#DC2626', color: '#FFF', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      )}

      {/* Inline Add Test Form (NO POPUP) */}
      {showAddForm && (
        <form onSubmit={handleCreateTest} style={{ background: '#FFF', borderRadius: '20px', border: '1.5px solid #111', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.75rem' }}>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#000' }}>Create New Assessment Test</div>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              style={{ background: '#F3F4F6', border: 'none', borderRadius: '9999px', width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={15} color="#6B7280" />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {/* Title */}
            <Field label="Test Title" hint="e.g. Class 10th — Test 3">
              <input
                type="text"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Class 10th — Test 3"
                style={inputStyle}
                required
              />
            </Field>

            {/* Subtitle */}
            <Field label="Subtitle" hint="e.g. Sunday Assessment">
              <input
                type="text"
                value={form.subtitle}
                onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))}
                placeholder="Assessment title / description"
                style={inputStyle}
              />
            </Field>

            {/* Date */}
            <Field label="Test Date" hint="e.g. 18 Oct 2026">
              <input
                type="text"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                placeholder="18 Oct 2026"
                style={inputStyle}
                required
              />
            </Field>

            {/* Subject */}
            <Field label="Subject">
              <input
                type="text"
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                placeholder="Science (PCB)"
                style={inputStyle}
              />
            </Field>
          </div>

          {/* Classes Checkboxes */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
              Target Class (Select applicable)
            </label>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {['10th', '9th'].map(cls => {
                const selected = form.classes.includes(cls);
                return (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => handleToggleClass(cls)}
                    style={{
                      padding: '0.55rem 1.1rem',
                      borderRadius: '10px',
                      border: `1.5px solid ${selected ? '#000' : '#D1D5DB'}`,
                      background: selected ? '#000' : '#FFF',
                      color: selected ? '#FFF' : '#374151',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    Class {cls} {selected && '✓'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Badge Selection & Custom Option */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
              Badge Type (Select preset or write custom)
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
              {BADGE_PRESETS.map(b => {
                const selected = !form.isCustomBadge && form.badgePreset === b.label;
                return (
                  <button
                    key={b.label}
                    type="button"
                    onClick={() => setForm(f => ({
                      ...f,
                      isCustomBadge: false,
                      badgePreset: b.label,
                      badgeColor: b.color,
                      badgeBg: b.bg
                    }))}
                    style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: '9999px',
                      border: selected ? '2px solid #000' : '1px solid #E5E7EB',
                      background: b.bg,
                      color: b.color,
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    {b.label}
                  </button>
                );
              })}

              {/* Custom Badge Button */}
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, isCustomBadge: true }))}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '9999px',
                  border: form.isCustomBadge ? '2px solid #000' : '1px dashed #9CA3AF',
                  background: form.isCustomBadge ? '#000' : '#FFF',
                  color: form.isCustomBadge ? '#FFF' : '#374151',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Edit3 size={12} /> Custom Badge
              </button>
            </div>

            {/* Custom Badge Edit Input */}
            {form.isCustomBadge && (
              <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '0.85rem' }}>
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    value={form.customBadgeText}
                    onChange={e => setForm(f => ({ ...f, customBadgeText: e.target.value }))}
                    placeholder="Enter custom badge name (e.g. Weekly Quiz, Mock 1)..."
                    style={{ ...inputStyle, flex: 1, minWidth: 200 }}
                    autoFocus
                  />
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    {BADGE_COLORS.map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, badgeColor: c.color, badgeBg: c.bg }))}
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: '50%',
                          background: c.color,
                          border: form.badgeColor === c.color ? '2.5px solid #000' : 'none',
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  Preview: <Badge label={form.customBadgeText || 'Custom Badge'} color={form.badgeColor} bg={form.badgeBg} />
                </div>
              </div>
            )}
          </div>

          {/* Initial Status */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
              Publish Status
            </label>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {[
                { id: 'coming-soon', label: 'Coming Soon (Draft)' },
                { id: 'live', label: 'Live (Visible to Students)' }
              ].map(st => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, status: st.id }))}
                  style={{
                    padding: '0.5rem 0.9rem',
                    borderRadius: '10px',
                    border: `1.5px solid ${form.status === st.id ? '#000' : '#E5E7EB'}`,
                    background: form.status === st.id ? '#000' : '#FFF',
                    color: form.status === st.id ? '#FFF' : '#374151',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              style={{ padding: '0.65rem 1.25rem', borderRadius: '10px', border: '1px solid #D1D5DB', background: '#FFF', color: '#374151', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: '0.65rem 1.5rem', borderRadius: '10px', border: 'none', background: '#000', color: '#FFF', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}
            >
              Create Assessment Test
            </button>
          </div>
        </form>
      )}

      {/* Tests Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filteredTests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#FFF', borderRadius: '18px', border: '1px solid #E5E7EB', color: '#9CA3AF' }}>
            <BookOpen size={36} color="#D1D5DB" style={{ marginBottom: '0.6rem' }} />
            <div style={{ fontWeight: 700, color: '#374151' }}>No tests found in this section</div>
            <div style={{ fontSize: '0.82rem', color: '#9CA3AF', marginTop: '0.2rem' }}>
              Click "+ Add New Test" to publish or create an assessment.
            </div>
          </div>
        ) : (
          filteredTests.map(test => (
            <div
              key={test.id}
              style={{
                background: '#FFF',
                borderRadius: '18px',
                border: '1px solid #E5E7EB',
                padding: '1.1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                transition: 'border-color 0.15s'
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: '14px', background: test.badgeBg || '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <BookOpen size={20} color={test.badgeColor || '#111'} />
              </div>

              <div style={{ flex: 1, minWidth: 0, cursor: 'pointer' }} onClick={() => onSelectTest(test)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                  <Badge label={test.badge} color={test.badgeColor} bg={test.badgeBg} />
                  <StatusPill status={test.status} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {test.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '0.15rem' }}>
                  {test.date} · Classes: {test.classes ? test.classes.join(', ') : 'All'} · {test.subject}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => onSelectTest(test)}
                  style={{
                    background: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    borderRadius: '10px',
                    padding: '0.45rem 0.9rem',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#111',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  Enter Marks <ChevronRight size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTargetId(test.id)}
                  title="Delete Test"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    width: 34,
                    height: 34,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#DC2626'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ─── 4. TEST DETAIL VIEW (ENTER MARKS) ────────────────────────
function TestDetailView({ test, data, setData, onBack }) {
  const [localTest, setLocalTest] = useState(test);
  const [selectedClass, setSelectedClass] = useState(test.classes && test.classes.length > 0 ? test.classes[0] : '10th');
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', marks: '', maxMarks: '', absent: false });
  const [editStudentRoll, setEditStudentRoll] = useState(null);
  const [editName, setEditName] = useState('');
  const [deleteTargetRoll, setDeleteTargetRoll] = useState(null);
  const [saved, setSaved] = useState(false);

  const students = data.students[selectedClass] || {};
  const results = localTest.results && localTest.results[selectedClass] ? localTest.results[selectedClass] : {};

  const handleMarkChange = (roll, field, value) => {
    setLocalTest(prev => ({
      ...prev,
      results: {
        ...prev.results,
        [selectedClass]: {
          ...prev.results?.[selectedClass],
          [roll]: {
            ...prev.results?.[selectedClass]?.[roll],
            [field]: field === 'absent' ? value : (value === '' ? undefined : Number(value))
          }
        }
      }
    }));
  };

  const handleToggleAbsent = (roll) => {
    const cur = results[roll];
    const isAbsent = !!cur?.absent;
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

  const handleAddStudentToTest = (e) => {
    e.preventDefault();
    if (!newStudent.name.trim()) return;
    const roll = getNextRollNumber(selectedClass, data.students);

    // Save in global students list
    const updatedStudents = {
      ...data.students,
      [selectedClass]: {
        ...data.students[selectedClass],
        [roll]: newStudent.name.trim()
      }
    };

    // Save marks entry in this test
    const resultEntry = newStudent.absent
      ? { absent: true }
      : {
          marks: newStudent.marks !== '' ? Number(newStudent.marks) : 0,
          maxMarks: newStudent.maxMarks !== '' ? Number(newStudent.maxMarks) : 0
        };

    const updatedLocalTest = {
      ...localTest,
      results: {
        ...localTest.results,
        [selectedClass]: {
          ...localTest.results?.[selectedClass],
          [roll]: resultEntry
        }
      }
    };

    const updatedData = { ...data, students: updatedStudents };
    setData(updatedData);
    setLocalTest(updatedLocalTest);
    setShowAddStudentForm(false);
    setNewStudent({ name: '', marks: '', maxMarks: '', absent: false });
  };

  const handleRemoveStudentFromTest = (roll) => {
    const updatedResults = { ...localTest.results?.[selectedClass] };
    delete updatedResults[roll];

    setLocalTest(prev => ({
      ...prev,
      results: {
        ...prev.results,
        [selectedClass]: updatedResults
      }
    }));
    setDeleteTargetRoll(null);
  };

  const handleSaveEditName = (roll) => {
    if (!editName.trim()) return;
    const updatedStudents = {
      ...data.students,
      [selectedClass]: {
        ...data.students[selectedClass],
        [roll]: editName.trim()
      }
    };
    const updatedData = { ...data, students: updatedStudents };
    setData(updatedData);
    setEditStudentRoll(null);
  };

  const handleToggleStatus = () => {
    setLocalTest(prev => ({
      ...prev,
      status: prev.status === 'live' ? 'coming-soon' : 'live'
    }));
  };

  const handleSaveAll = () => {
    const updatedTests = data.tests.map(t => t.id === localTest.id ? localTest : t);
    const updatedData = { ...data, tests: updatedTests };
    setData(updatedData);
    saveData(updatedData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sortedRolls = Object.keys(students).sort();

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Inter', sans-serif" }}>
      {/* Sticky Header */}
      <div style={{ background: '#FFF', borderBottom: '1px solid #E5E7EB', padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50, gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
          <button
            type="button"
            onClick={onBack}
            style={{ background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '9999px', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <ArrowLeft size={16} color="#000" />
          </button>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {localTest.title}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#6B7280' }}>
              {localTest.date} · {localTest.subject}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          style={{
            background: saved ? '#059669' : '#000',
            color: '#FFF',
            border: 'none',
            borderRadius: '9999px',
            padding: '0.55rem 1.25rem',
            fontWeight: 800,
            fontSize: '0.84rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'background 0.25s',
            flexShrink: 0
          }}
        >
          {saved ? <><Check size={14} /> Saved!</> : 'Save Marks'}
        </button>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '1.25rem 1rem 6rem' }}>
        {/* Status Toggle Card */}
        <div style={{ background: '#FFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '1rem 1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.2rem' }}>
              Test Publication Status
            </div>
            <StatusPill status={localTest.status} />
          </div>
          <button
            type="button"
            onClick={handleToggleStatus}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#F3F4F6',
              border: '1px solid #E5E7EB',
              borderRadius: '9999px',
              padding: '0.45rem 1rem',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.82rem',
              color: '#374151'
            }}
          >
            {localTest.status === 'live' ? (
              <><ToggleLeft size={16} /> Switch to Coming Soon</>
            ) : (
              <><ToggleRight size={16} /> Switch to Live</>
            )}
          </button>
        </div>

        {/* Class Selection Buttons (if multi-class) */}
        {localTest.classes && localTest.classes.length > 1 && (
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {localTest.classes.map(cls => (
              <button
                key={cls}
                type="button"
                onClick={() => setSelectedClass(cls)}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  borderRadius: '12px',
                  border: `2px solid ${selectedClass === cls ? '#000' : '#E5E7EB'}`,
                  background: selectedClass === cls ? '#000' : '#FFF',
                  color: selectedClass === cls ? '#FFF' : '#374151',
                  fontWeight: 800,
                  cursor: 'pointer',
                  fontSize: '0.88rem'
                }}
              >
                Class {cls}
              </button>
            ))}
          </div>
        )}

        {/* Inline Add Student Form (NO POPUP) */}
        {showAddStudentForm && (
          <form onSubmit={handleAddStudentToTest} style={{ background: '#FFF', borderRadius: '18px', border: '1.5px solid #000', padding: '1.25rem', marginBottom: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#000' }}>
                Add Student to Class {selectedClass}
              </div>
              <div style={{ background: '#F3F4F6', color: '#374151', padding: '0.2rem 0.65rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                Auto Roll: {getNextRollNumber(selectedClass, data.students)}
              </div>
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <input
                type="text"
                value={newStudent.name}
                onChange={e => setNewStudent(s => ({ ...s, name: e.target.value }))}
                placeholder="Student full name"
                style={inputStyle}
                autoFocus
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
              <input
                type="number"
                value={newStudent.marks}
                onChange={e => setNewStudent(s => ({ ...s, marks: e.target.value }))}
                placeholder="Marks scored"
                disabled={newStudent.absent}
                style={inputStyle}
              />
              <input
                type="number"
                value={newStudent.maxMarks}
                onChange={e => setNewStudent(s => ({ ...s, maxMarks: e.target.value }))}
                placeholder="Total marks"
                disabled={newStudent.absent}
                style={inputStyle}
              />
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', fontWeight: 700, color: '#DC2626', cursor: 'pointer', padding: '0 0.4rem' }}>
                <input
                  type="checkbox"
                  checked={newStudent.absent}
                  onChange={e => setNewStudent(s => ({ ...s, absent: e.target.checked }))}
                />
                Absent
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setShowAddStudentForm(false)}
                style={{ padding: '0.55rem 1.1rem', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#FFF', color: '#374151', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ padding: '0.55rem 1.3rem', borderRadius: '8px', border: 'none', background: '#000', color: '#FFF', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer' }}
              >
                Add to Test
              </button>
            </div>
          </form>
        )}

        {/* Inline Student Delete Confirmation (NO POPUP) */}
        {deleteTargetRoll && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '14px', padding: '0.9rem 1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.6rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', color: '#991B1B', fontWeight: 600 }}>
              Remove <strong>{students[deleteTargetRoll]}</strong> from this test?
            </span>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                type="button"
                onClick={() => setDeleteTargetRoll(null)}
                style={{ padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#FFF', color: '#374151', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleRemoveStudentFromTest(deleteTargetRoll)}
                style={{ padding: '0.35rem 0.85rem', borderRadius: '8px', border: 'none', background: '#DC2626', color: '#FFF', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {/* Table Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '75px 1fr 75px 75px 36px', gap: '0.5rem', padding: '0.5rem 0.9rem', marginBottom: '0.3rem' }}>
          {['Roll', 'Student Name', 'Marks', 'Total', ''].map((h, i) => (
            <div key={i} style={{ fontSize: '0.7rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {h}
            </div>
          ))}
        </div>

        {/* Student Rows Table */}
        <div style={{ background: '#FFF', borderRadius: '18px', border: '1px solid #E5E7EB', overflow: 'hidden', marginBottom: '1rem' }}>
          {sortedRolls.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem', color: '#9CA3AF', fontSize: '0.88rem' }}>
              No students found. Use "Add Student" below.
            </div>
          ) : (
            sortedRolls.map((roll, idx) => {
              const name = students[roll];
              const res = results[roll] || {};
              const isAbsent = !!res.absent;
              const isEditing = editStudentRoll === roll;

              return (
                <div
                  key={roll}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '75px 1fr 75px 75px 36px',
                    gap: '0.5rem',
                    alignItems: 'center',
                    padding: '0.65rem 0.9rem',
                    borderBottom: idx < sortedRolls.length - 1 ? '1px solid #F3F4F6' : 'none',
                    background: isAbsent ? '#FFF8F8' : 'transparent'
                  }}
                >
                  {/* Roll */}
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#4B5563', fontFamily: 'monospace' }}>
                    {roll}
                  </div>

                  {/* Name */}
                  {isEditing ? (
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      <input
                        type="text"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        style={{ ...inputStyle, padding: '0.35rem 0.5rem', fontSize: '0.82rem' }}
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveEditName(roll)}
                        style={{ background: '#000', border: 'none', borderRadius: '7px', padding: '0 0.5rem', color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <Check size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditStudentRoll(null)}
                        style={{ background: '#F3F4F6', border: 'none', borderRadius: '7px', padding: '0 0.5rem', color: '#6B7280', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ) : (
                    <div style={{
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      color: isAbsent ? '#9CA3AF' : '#111',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      textDecoration: isAbsent ? 'line-through' : 'none'
                    }}>
                      {name}
                    </div>
                  )}

                  {/* Marks */}
                  {isAbsent ? (
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#DC2626', textAlign: 'center' }}>
                      Absent
                    </div>
                  ) : (
                    <input
                      type="number"
                      min="0"
                      value={res.marks ?? ''}
                      onChange={e => handleMarkChange(roll, 'marks', e.target.value)}
                      placeholder="0"
                      style={{ ...inputStyle, padding: '0.35rem 0.4rem', fontSize: '0.88rem', textAlign: 'center' }}
                    />
                  )}

                  {/* Max Marks */}
                  {isAbsent ? (
                    <div />
                  ) : (
                    <input
                      type="number"
                      min="0"
                      value={res.maxMarks ?? ''}
                      onChange={e => handleMarkChange(roll, 'maxMarks', e.target.value)}
                      placeholder="0"
                      style={{ ...inputStyle, padding: '0.35rem 0.4rem', fontSize: '0.88rem', textAlign: 'center' }}
                    />
                  )}

                  {/* 3-Dot Menu */}
                  <DotMenu
                    items={[
                      {
                        label: 'Edit Name',
                        icon: <Edit3 size={14} />,
                        action: () => { setEditStudentRoll(roll); setEditName(name); }
                      },
                      {
                        label: isAbsent ? 'Mark Present' : 'Mark Absent',
                        icon: isAbsent ? <Check size={14} /> : <X size={14} />,
                        action: () => handleToggleAbsent(roll)
                      },
                      {
                        label: 'Remove from Test',
                        icon: <Trash2 size={14} />,
                        danger: true,
                        action: () => setDeleteTargetRoll(roll)
                      }
                    ]}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Add Student Button */}
        <button
          type="button"
          onClick={() => setShowAddStudentForm(true)}
          style={{
            width: '100%',
            padding: '0.85rem',
            borderRadius: '14px',
            border: '2px dashed #D1D5DB',
            background: 'transparent',
            color: '#4B5563',
            fontWeight: 700,
            fontSize: '0.86rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#000'; e.currentTarget.style.color = '#000'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.color = '#4B5563'; }}
        >
          <UserPlus size={16} /> Add Student to this Test
        </button>
      </div>
    </div>
  );
}

// ─── MAIN ADMIN PANEL COMPONENT ───────────────────────────────
export default function AdminPanel({ onBackToSite }) {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('eureka_admin_auth') === '1');
  const [data, setData] = useState(() => getData());
  const [activeTab, setActiveTab] = useState('tests'); // 'tests' | 'students'
  const [selectedTest, setSelectedTest] = useState(null);

  const handleLogin = () => {
    sessionStorage.setItem('eureka_admin_auth', '1');
    setLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('eureka_admin_auth');
    setLoggedIn(false);
    setSelectedTest(null);
  };

  if (!loggedIn) {
    return <LoginView onLogin={handleLogin} onBackToSite={onBackToSite} />;
  }

  // If a test is opened to enter marks
  if (selectedTest) {
    return (
      <TestDetailView
        test={selectedTest}
        data={data}
        setData={setData}
        onBack={() => {
          setData(getData());
          setSelectedTest(null);
        }}
      />
    );
  }

  const totalStudents = Object.values(data.students).reduce((acc, curr) => acc + Object.keys(curr).length, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Inter', sans-serif", color: '#111' }}>
      {/* Top Navbar */}
      <header style={{ background: '#FFF', borderBottom: '1px solid #E5E7EB', padding: '0.85rem 1.25rem', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 740, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: 34, height: 34, borderRadius: '10px', background: 'linear-gradient(135deg, #1E1B4B, #3730A3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={18} color="#FFF" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#000', lineHeight: 1.1 }}>Eureka Admin</div>
              <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>Dashboard</div>
            </div>
          </div>

          {/* Navigation Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            {onBackToSite && (
              <button
                type="button"
                onClick={onBackToSite}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  background: '#F3F4F6',
                  border: '1px solid #E5E7EB',
                  borderRadius: '9999px',
                  padding: '0.45rem 0.85rem',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#374151'
                }}
              >
                <ArrowLeft size={13} /> Website
              </button>
            )}
            <button
              type="button"
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: '#FEE2E2',
                border: '1px solid #FECACA',
                borderRadius: '9999px',
                padding: '0.45rem 0.85rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#DC2626'
              }}
            >
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: 740, margin: '0 auto', padding: '1.5rem 1rem 5rem' }}>
        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div
            onClick={() => setActiveTab('tests')}
            style={{
              background: '#FFF',
              borderRadius: '16px',
              padding: '1.1rem 1.25rem',
              border: `1.5px solid ${activeTab === 'tests' ? '#000' : '#E5E7EB'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              cursor: 'pointer',
              boxShadow: activeTab === 'tests' ? '0 4px 16px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            <div style={{ width: 42, height: 42, borderRadius: '12px', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ClipboardList size={20} color="#7C3AED" />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '1.5rem', color: '#000', lineHeight: 1 }}>{data.tests.length}</div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.2rem' }}>Total Tests</div>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('students')}
            style={{
              background: '#FFF',
              borderRadius: '16px',
              padding: '1.1rem 1.25rem',
              border: `1.5px solid ${activeTab === 'students' ? '#000' : '#E5E7EB'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              cursor: 'pointer',
              boxShadow: activeTab === 'students' ? '0 4px 16px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            <div style={{ width: 42, height: 42, borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} color="#0284C7" />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '1.5rem', color: '#000', lineHeight: 1 }}>{totalStudents}</div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.2rem' }}>All Students</div>
            </div>
          </div>
        </div>

        {/* Section Switcher Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
          <button
            type="button"
            onClick={() => setActiveTab('tests')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '9999px',
              border: 'none',
              background: activeTab === 'tests' ? '#000' : '#F3F4F6',
              color: activeTab === 'tests' ? '#FFF' : '#4B5563',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <ClipboardList size={15} /> Tests
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('students')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '9999px',
              border: 'none',
              background: activeTab === 'students' ? '#000' : '#F3F4F6',
              color: activeTab === 'students' ? '#FFF' : '#4B5563',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Users size={15} /> All Students
          </button>
        </div>

        {/* Active Tab Content */}
        {activeTab === 'tests' ? (
          <TestsListView
            data={data}
            setData={setData}
            onSelectTest={setSelectedTest}
          />
        ) : (
          <StudentsView
            data={data}
            setData={setData}
          />
        )}
      </main>
    </div>
  );
}
