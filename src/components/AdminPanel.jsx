import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, Plus, Trash2, Edit3, MoreVertical,
  Check, X, Eye, EyeOff, ShieldCheck, LogOut,
  ChevronRight, Users, ClipboardList, ToggleLeft, ToggleRight,
  UserPlus, BookOpen, AlertTriangle
} from 'lucide-react';
import { getData, saveData, resetData, getNextRollNumber } from '../adminData';

const ADMIN_PASSWORD = 'eureka2026';

const CLASS_OPTIONS = ['9th', '10th'];
const BADGE_PRESETS = [
  { label: 'Test 1', color: '#7C3AED', bg: '#F5F3FF' },
  { label: 'Test 2', color: '#059669', bg: '#ECFDF5' },
  { label: 'Test 3', color: '#DC2626', bg: '#FEF2F2' },
  { label: 'Test 4', color: '#D97706', bg: '#FFFBEB' },
  { label: 'Unit Test', color: '#0284C7', bg: '#EFF6FF' },
  { label: 'Mixed', color: '#0891B2', bg: '#ECFEFF' },
];

// ─── Tiny helpers ─────────────────────────────────────────────
function Badge({ label, color, bg }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.15rem 0.55rem', borderRadius: '9999px', background: bg, color, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
      {label}
    </span>
  );
}

function StatusPill({ status }) {
  return status === 'live'
    ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.15rem 0.6rem', borderRadius: '9999px', background: '#ECFDF5', color: '#059669', fontSize: '0.7rem', fontWeight: 700 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669', display: 'inline-block' }} /> Live
      </span>
    : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.15rem 0.6rem', borderRadius: '9999px', background: '#FFFBEB', color: '#D97706', fontSize: '0.7rem', fontWeight: 700 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }} /> Coming Soon
      </span>;
}

// ─── Modal wrapper ────────────────────────────────────────────
function Modal({ title, onClose, children, width = 440 }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: '#FFF', borderRadius: '20px', width: '100%', maxWidth: width, boxShadow: '0 24px 64px rgba(0,0,0,0.2)', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.2rem 1.4rem', borderBottom: '1px solid #F3F4F6' }}>
          <div style={{ fontWeight: 800, fontSize: '1rem', color: '#111' }}>{title}</div>
          <button onClick={onClose} style={{ background: '#F3F4F6', border: 'none', borderRadius: '9999px', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={16} color="#6B7280" />
          </button>
        </div>
        <div style={{ padding: '1.2rem 1.4rem', overflowY: 'auto' }}>{children}</div>
      </div>
    </div>
  );
}

// ─── Confirm dialog ───────────────────────────────────────────
function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <Modal title="Confirm" onClose={onCancel} width={360}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <AlertTriangle size={22} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>{message}</p>
      </div>
      <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end' }}>
        <button onClick={onCancel} style={{ padding: '0.6rem 1.2rem', borderRadius: '10px', border: '1px solid #E5E7EB', background: '#FFF', color: '#374151', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}>
          Cancel
        </button>
        <button onClick={onConfirm} style={{ padding: '0.6rem 1.2rem', borderRadius: '10px', border: 'none', background: '#DC2626', color: '#FFF', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}>
          Delete
        </button>
      </div>
    </Modal>
  );
}

// ─── 3-dot menu ──────────────────────────────────────────────
function DotMenu({ items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{ background: open ? '#F3F4F6' : 'transparent', border: 'none', borderRadius: '8px', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}>
        <MoreVertical size={16} color="#6B7280" />
      </button>
      {open && (
        <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 4, background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 100, minWidth: 150, overflow: 'hidden' }}>
          {items.map((item, i) => (
            <button key={i} onClick={() => { item.action(); setOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%', padding: '0.65rem 1rem', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600, color: item.danger ? '#DC2626' : '#374151', transition: 'background 0.1s' }}
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

// ─── Input helper ─────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = { width: '100%', boxSizing: 'border-box', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '0.9rem', color: '#111', outline: 'none', fontFamily: "'Inter', sans-serif", background: '#FFF' };

// ─── VIEWS ────────────────────────────────────────────────────

// ── 1. LOGIN ──────────────────────────────────────────────────
function LoginView({ onLogin, onBackToSite }) {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { onLogin(); }
    else { setErr('Galat password! Dobara try karo.'); setPw(''); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 380, background: '#FFF', borderRadius: '24px', padding: '2.5rem 2rem', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'linear-gradient(135deg, #1E1B4B, #3730A3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <ShieldCheck size={26} color="#FFF" />
          </div>
          <div style={{ fontSize: '1.5rem', fontFamily: "'Instrument Serif', Georgia, serif", color: '#000', marginBottom: '0.3rem' }}>Eureka Admin</div>
          <div style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>Password enter karke login karo</div>
        </div>

        <form onSubmit={handleSubmit}>
          <Field label="Admin Password">
            <div style={{ position: 'relative' }}>
              <input
                type={show ? 'text' : 'password'}
                value={pw}
                onChange={e => { setPw(e.target.value); setErr(''); }}
                placeholder="Password enter karo..."
                style={{ ...inputStyle, paddingRight: '2.5rem', borderColor: err ? '#FCA5A5' : '#E5E7EB' }}
                autoFocus
              />
              <button type="button" onClick={() => setShow(s => !s)}
                style={{ position: 'absolute', right: '0.7rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </Field>
          {err && <div style={{ fontSize: '0.82rem', color: '#DC2626', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>⚠️ {err}</div>}
          <button type="submit" style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', background: 'linear-gradient(135deg, #1E1B4B, #3730A3)', color: '#FFF', border: 'none', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer' }}>
            Login
          </button>
          {onBackToSite && (
            <button
              type="button"
              onClick={onBackToSite}
              style={{
                width: '100%',
                marginTop: '0.8rem',
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
              <ArrowLeft size={15} /> Website pe wapas jao
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

// ── 2. DASHBOARD ──────────────────────────────────────────────
function DashboardView({ data, setData, onSelectTest, onLogout, onBackToSite }) {
  const [showAddTest, setShowAddTest] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({ title: '', subtitle: '', date: '', subject: 'Science (PCB)', badge: 'Test 1', badgeColor: '#7C3AED', badgeBg: '#F5F3FF', classes: ['9th'], status: 'coming-soon' });

  const handleAddTest = () => {
    if (!form.title.trim() || !form.date.trim()) return;
    const newTest = {
      id: `test-${Date.now()}`,
      ...form,
      results: Object.fromEntries(form.classes.map(c => [c, {}])),
    };
    const updated = { ...data, tests: [...data.tests, newTest] };
    setData(updated); saveData(updated);
    setShowAddTest(false);
    setForm({ title: '', subtitle: '', date: '', subject: 'Science (PCB)', badge: 'Test 1', badgeColor: '#7C3AED', badgeBg: '#F5F3FF', classes: ['9th'], status: 'coming-soon' });
  };

  const handleDeleteTest = (id) => {
    const updated = { ...data, tests: data.tests.filter(t => t.id !== id) };
    setData(updated); saveData(updated);
    setDeleteTarget(null);
  };

  const toggleClass = (cls) => {
    setForm(f => ({
      ...f,
      classes: f.classes.includes(cls)
        ? f.classes.filter(c => c !== cls)
        : [...f.classes, cls],
    }));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ background: '#FFF', borderBottom: '1px solid #E5E7EB', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg, #1E1B4B, #3730A3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShieldCheck size={18} color="#FFF" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: '#000' }}>Eureka Admin</div>
            <div style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>Dashboard</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {onBackToSite && (
            <button onClick={onBackToSite} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '9999px', padding: '0.45rem 0.85rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, color: '#374151' }}>
              <ArrowLeft size={13} /> Website
            </button>
          )}
          <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '9999px', padding: '0.45rem 0.85rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, color: '#DC2626' }}>
            <LogOut size={13} /> Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '1.5rem 1rem 5rem' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total Tests', value: data.tests.length, icon: <ClipboardList size={18} color="#7C3AED" /> },
            { label: 'Total Students', value: Object.values(data.students).reduce((a, c) => a + Object.keys(c).length, 0), icon: <Users size={18} color="#0284C7" /> },
          ].map((s, i) => (
            <div key={i} style={{ background: '#FFF', borderRadius: '16px', padding: '1rem 1.2rem', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {s.icon}
              <div>
                <div style={{ fontWeight: 900, fontSize: '1.5rem', color: '#000', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.15rem' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tests list */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#111' }}>Tests</div>
          <button onClick={() => setShowAddTest(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#000', color: '#FFF', border: 'none', borderRadius: '9999px', padding: '0.5rem 1.1rem', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>
            <Plus size={14} /> Naya Test
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {data.tests.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', background: '#FFF', borderRadius: '16px', border: '1px solid #E5E7EB', color: '#9CA3AF', fontSize: '0.9rem' }}>
              Koi test nahi hai. "Naya Test" button se add karo.
            </div>
          )}
          {data.tests.map(test => (
            <div key={test.id} style={{ background: '#FFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '1rem 1.1rem', display: 'flex', alignItems: 'center', gap: '0.85rem', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ width: 42, height: 42, borderRadius: '12px', background: test.badgeBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <BookOpen size={18} color={test.badgeColor} />
              </div>
              <div style={{ flex: 1, minWidth: 0, cursor: 'pointer' }} onClick={() => onSelectTest(test)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                  <Badge label={test.badge} color={test.badgeColor} bg={test.badgeBg} />
                  <StatusPill status={test.status} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{test.title}</div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.1rem' }}>{test.date} · {test.classes.join(', ')}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
                <button onClick={() => onSelectTest(test)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32 }}>
                  <ChevronRight size={18} color="#9CA3AF" />
                </button>
                <button onClick={() => setDeleteTarget(test.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32 }}>
                  <Trash2 size={15} color="#DC2626" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Test Modal */}
      {showAddTest && (
        <Modal title="Naya Test Add Karo" onClose={() => setShowAddTest(false)}>
          <Field label="Title">
            <input style={inputStyle} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Class 9th — Test 2" />
          </Field>
          <Field label="Subtitle">
            <input style={inputStyle} value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} placeholder="e.g. Sunday Special" />
          </Field>
          <Field label="Date">
            <input style={inputStyle} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="e.g. 10 Oct 2026" />
          </Field>
          <Field label="Subject">
            <input style={inputStyle} value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
          </Field>
          <Field label="Badge Style">
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {BADGE_PRESETS.map(p => (
                <button key={p.label} onClick={() => setForm(f => ({ ...f, badge: p.label, badgeColor: p.color, badgeBg: p.bg }))}
                  style={{ padding: '0.35rem 0.8rem', borderRadius: '9999px', border: `2px solid ${form.badge === p.label ? p.color : '#E5E7EB'}`, background: form.badge === p.label ? p.bg : '#FFF', cursor: 'pointer', fontWeight: 700, fontSize: '0.75rem', color: p.color }}>
                  {p.label}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Kis Class ke liye">
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {CLASS_OPTIONS.map(cls => (
                <button key={cls} onClick={() => toggleClass(cls)}
                  style={{ flex: 1, padding: '0.6rem', borderRadius: '10px', border: `2px solid ${form.classes.includes(cls) ? '#000' : '#E5E7EB'}`, background: form.classes.includes(cls) ? '#000' : '#FFF', color: form.classes.includes(cls) ? '#FFF' : '#374151', fontWeight: 800, cursor: 'pointer' }}>
                  {form.classes.includes(cls) && <Check size={14} style={{ marginRight: 4 }} />}Class {cls}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Status">
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['coming-soon', 'live'].map(s => (
                <button key={s} onClick={() => setForm(f => ({ ...f, status: s }))}
                  style={{ flex: 1, padding: '0.6rem', borderRadius: '10px', border: `2px solid ${form.status === s ? '#000' : '#E5E7EB'}`, background: form.status === s ? '#000' : '#FFF', color: form.status === s ? '#FFF' : '#374151', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>
                  {s === 'live' ? '🟢 Live' : '🟡 Coming Soon'}
                </button>
              ))}
            </div>
          </Field>
          <button onClick={handleAddTest} disabled={!form.title.trim() || !form.date.trim() || !form.classes.length}
            style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', background: (!form.title.trim() || !form.date.trim() || !form.classes.length) ? '#E5E7EB' : '#000', color: (!form.title.trim() || !form.date.trim() || !form.classes.length) ? '#9CA3AF' : '#FFF', border: 'none', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer' }}>
            Test Add Karo
          </button>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmModal
          message="Yeh test aur uske saare results delete ho jayenge. Pakka karna hai?"
          onConfirm={() => handleDeleteTest(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

// ── 3. TEST DETAIL ────────────────────────────────────────────
function TestDetailView({ test, data, setData, onBack }) {
  const [localTest, setLocalTest] = useState(() => JSON.parse(JSON.stringify(test)));
  const [selectedClass, setSelectedClass] = useState(test.classes[0]);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', marks: '', maxMarks: '', absent: false });
  const [editStudentRoll, setEditStudentRoll] = useState(null);
  const [editName, setEditName] = useState('');
  const [deleteStudentTarget, setDeleteStudentTarget] = useState(null);
  const [saved, setSaved] = useState(false);

  const students = data.students[selectedClass] || {};
  const results = localTest.results[selectedClass] || {};

  const handleMarkChange = (roll, field, value) => {
    setLocalTest(prev => ({
      ...prev,
      results: {
        ...prev.results,
        [selectedClass]: {
          ...prev.results[selectedClass],
          [roll]: { ...prev.results[selectedClass]?.[roll], [field]: field === 'absent' ? value : (value === '' ? undefined : Number(value)) },
        },
      },
    }));
  };

  const handleToggleAbsent = (roll) => {
    const cur = results[roll];
    const isAbsent = cur?.absent;
    setLocalTest(prev => ({
      ...prev,
      results: {
        ...prev.results,
        [selectedClass]: {
          ...prev.results[selectedClass],
          [roll]: isAbsent ? { marks: '', maxMarks: '' } : { absent: true },
        },
      },
    }));
  };

  const handleAddStudent = () => {
    if (!newStudent.name.trim()) return;
    const roll = getNextRollNumber(selectedClass, data.students);
    const updatedStudents = {
      ...data.students,
      [selectedClass]: { ...data.students[selectedClass], [roll]: newStudent.name.trim() },
    };
    const resultEntry = newStudent.absent
      ? { absent: true }
      : { marks: Number(newStudent.marks) || 0, maxMarks: Number(newStudent.maxMarks) || 0 };
    const updatedLocalTest = {
      ...localTest,
      results: {
        ...localTest.results,
        [selectedClass]: { ...localTest.results[selectedClass], [roll]: resultEntry },
      },
    };
    const updatedData = { ...data, students: updatedStudents };
    setData(updatedData);
    setLocalTest(updatedLocalTest);
    setShowAddStudent(false);
    setNewStudent({ name: '', marks: '', maxMarks: '', absent: false });
  };

  const handleDeleteStudent = (roll) => {
    const updatedStudents = { ...data.students, [selectedClass]: { ...data.students[selectedClass] } };
    delete updatedStudents[selectedClass][roll];
    const updatedResults = { ...localTest.results[selectedClass] };
    delete updatedResults[roll];
    const updatedLocalTest = {
      ...localTest,
      results: { ...localTest.results, [selectedClass]: updatedResults },
    };
    const updatedData = { ...data, students: updatedStudents };
    setData(updatedData);
    setLocalTest(updatedLocalTest);
    setDeleteStudentTarget(null);
  };

  const handleSaveEditName = (roll) => {
    const updatedStudents = {
      ...data.students,
      [selectedClass]: { ...data.students[selectedClass], [roll]: editName.trim() },
    };
    const updatedData = { ...data, students: updatedStudents };
    setData(updatedData);
    setEditStudentRoll(null);
  };

  const handleToggleStatus = () => {
    setLocalTest(prev => ({ ...prev, status: prev.status === 'live' ? 'coming-soon' : 'live' }));
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
      {/* Header */}
      <div style={{ background: '#FFF', borderBottom: '1px solid #E5E7EB', padding: '0.9rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'sticky', top: 0, zIndex: 50 }}>
        <button onClick={onBack} style={{ background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '9999px', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ArrowLeft size={16} color="#000" />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{localTest.title}</div>
          <div style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{localTest.date} · {localTest.subject}</div>
        </div>
        <button onClick={handleSaveAll} style={{ background: saved ? '#059669' : '#000', color: '#FFF', border: 'none', borderRadius: '9999px', padding: '0.5rem 1.1rem', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', transition: 'background 0.3s', flexShrink: 0 }}>
          {saved ? <><Check size={14} /> Saved!</> : 'Save'}
        </button>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '1.2rem 1rem 6rem' }}>
        {/* Test meta controls */}
        <div style={{ background: '#FFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '1rem 1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Test Status</div>
            <StatusPill status={localTest.status} />
          </div>
          <button onClick={handleToggleStatus} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '9999px', padding: '0.45rem 1rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.82rem', color: '#374151' }}>
            {localTest.status === 'live' ? <><ToggleLeft size={16} /> Coming Soon karo</> : <><ToggleRight size={16} /> Live karo</>}
          </button>
        </div>

        {/* Class selector */}
        {localTest.classes.length > 1 && (
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {localTest.classes.map(cls => (
              <button key={cls} onClick={() => setSelectedClass(cls)}
                style={{ flex: 1, padding: '0.6rem', borderRadius: '10px', border: `2px solid ${selectedClass === cls ? '#000' : '#E5E7EB'}`, background: selectedClass === cls ? '#000' : '#FFF', color: selectedClass === cls ? '#FFF' : '#374151', fontWeight: 800, cursor: 'pointer', fontSize: '0.88rem' }}>
                Class {cls}
              </button>
            ))}
          </div>
        )}

        {/* Column labels */}
        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 70px 70px 36px', gap: '0.5rem', padding: '0.4rem 0.9rem', marginBottom: '0.25rem' }}>
          {['Roll', 'Student', 'Marks', 'Total', ''].map((h, i) => (
            <div key={i} style={{ fontSize: '0.68rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
          ))}
        </div>

        {/* Student rows */}
        <div style={{ background: '#FFF', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden', marginBottom: '1rem' }}>
          {sortedRolls.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF', fontSize: '0.88rem' }}>
              Koi student nahi. Neeche se add karo.
            </div>
          )}
          {sortedRolls.map((roll, idx) => {
            const name = students[roll];
            const res = results[roll] || {};
            const isAbsent = !!res.absent;
            const isEditing = editStudentRoll === roll;
            return (
              <div key={roll} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 70px 70px 36px', gap: '0.5rem', alignItems: 'center', padding: '0.65rem 0.9rem', borderBottom: idx < sortedRolls.length - 1 ? '1px solid #F3F4F6' : 'none', background: isAbsent ? '#FFF8F8' : 'transparent' }}>
                {/* Roll */}
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#6B7280', fontFamily: 'monospace' }}>{roll}</div>

                {/* Name */}
                {isEditing ? (
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    <input style={{ ...inputStyle, padding: '0.35rem 0.5rem', fontSize: '0.82rem' }} value={editName} onChange={e => setEditName(e.target.value)} autoFocus />
                    <button onClick={() => handleSaveEditName(roll)} style={{ background: '#000', border: 'none', borderRadius: '7px', padding: '0 0.5rem', cursor: 'pointer', color: '#FFF', display: 'flex', alignItems: 'center' }}><Check size={13} /></button>
                    <button onClick={() => setEditStudentRoll(null)} style={{ background: '#F3F4F6', border: 'none', borderRadius: '7px', padding: '0 0.5rem', cursor: 'pointer', color: '#6B7280', display: 'flex', alignItems: 'center' }}><X size={13} /></button>
                  </div>
                ) : (
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: isAbsent ? '#9CA3AF' : '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textDecoration: isAbsent ? 'line-through' : 'none' }}>{name}</div>
                )}

                {/* Marks */}
                {isAbsent ? (
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#DC2626', textAlign: 'center' }}>Absent</div>
                ) : (
                  <input type="number" min="0" value={res.marks ?? ''} onChange={e => handleMarkChange(roll, 'marks', e.target.value)}
                    style={{ ...inputStyle, padding: '0.35rem 0.4rem', fontSize: '0.88rem', textAlign: 'center' }} />
                )}

                {/* MaxMarks */}
                {isAbsent ? (
                  <div />
                ) : (
                  <input type="number" min="0" value={res.maxMarks ?? ''} onChange={e => handleMarkChange(roll, 'maxMarks', e.target.value)}
                    style={{ ...inputStyle, padding: '0.35rem 0.4rem', fontSize: '0.88rem', textAlign: 'center' }} />
                )}

                {/* 3-dot menu */}
                <DotMenu items={[
                  { label: 'Naam Badlo', icon: <Edit3 size={14} />, action: () => { setEditStudentRoll(roll); setEditName(name); } },
                  { label: isAbsent ? 'Present Karo' : 'Absent Karo', icon: isAbsent ? <Check size={14} /> : <X size={14} />, action: () => handleToggleAbsent(roll) },
                  { label: 'Delete Karo', icon: <Trash2 size={14} />, danger: true, action: () => setDeleteStudentTarget(roll) },
                ]} />
              </div>
            );
          })}
        </div>

        {/* Add student button */}
        <button onClick={() => setShowAddStudent(true)} style={{ width: '100%', padding: '0.85rem', borderRadius: '14px', border: '2px dashed #D1D5DB', background: 'transparent', color: '#6B7280', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#000'; e.currentTarget.style.color = '#000'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.color = '#6B7280'; }}>
          <UserPlus size={16} /> Naya Student Add Karo
        </button>
      </div>

      {/* Add Student Modal */}
      {showAddStudent && (
        <Modal title="Naya Student Add Karo" onClose={() => setShowAddStudent(false)} width={380}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: '10px', padding: '0.6rem 0.9rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#7C3AED', fontWeight: 700 }}>
              Auto Roll Number: <strong>{getNextRollNumber(selectedClass, data.students)}</strong>
            </div>
          </div>
          <Field label="Student ka Naam">
            <input style={inputStyle} value={newStudent.name} onChange={e => setNewStudent(s => ({ ...s, name: e.target.value }))} placeholder="Full name" autoFocus />
          </Field>
          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem' }}>
            <button onClick={() => setNewStudent(s => ({ ...s, absent: false }))}
              style={{ flex: 1, padding: '0.6rem', borderRadius: '10px', border: `2px solid ${!newStudent.absent ? '#000' : '#E5E7EB'}`, background: !newStudent.absent ? '#000' : '#FFF', color: !newStudent.absent ? '#FFF' : '#374151', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
              Present
            </button>
            <button onClick={() => setNewStudent(s => ({ ...s, absent: true }))}
              style={{ flex: 1, padding: '0.6rem', borderRadius: '10px', border: `2px solid ${newStudent.absent ? '#DC2626' : '#E5E7EB'}`, background: newStudent.absent ? '#FEF2F2' : '#FFF', color: newStudent.absent ? '#DC2626' : '#374151', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
              Absent
            </button>
          </div>
          {!newStudent.absent && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              <Field label="Marks">
                <input type="number" style={inputStyle} value={newStudent.marks} onChange={e => setNewStudent(s => ({ ...s, marks: e.target.value }))} placeholder="e.g. 25" />
              </Field>
              <Field label="Total Marks">
                <input type="number" style={inputStyle} value={newStudent.maxMarks} onChange={e => setNewStudent(s => ({ ...s, maxMarks: e.target.value }))} placeholder="e.g. 50" />
              </Field>
            </div>
          )}
          <button onClick={handleAddStudent} disabled={!newStudent.name.trim()}
            style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', background: !newStudent.name.trim() ? '#E5E7EB' : '#000', color: !newStudent.name.trim() ? '#9CA3AF' : '#FFF', border: 'none', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', marginTop: '0.5rem' }}>
            Add Student
          </button>
        </Modal>
      )}

      {deleteStudentTarget && (
        <ConfirmModal
          message={`"${students[deleteStudentTarget]}" ko delete karna hai? Yeh student is test se hata diya jayega.`}
          onConfirm={() => handleDeleteStudent(deleteStudentTarget)}
          onCancel={() => setDeleteStudentTarget(null)}
        />
      )}
    </div>
  );
}

// ─── MAIN ADMIN PANEL ─────────────────────────────────────────
export default function AdminPanel({ onBackToSite }) {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('eureka_admin_auth') === '1');
  const [data, setData] = useState(() => getData());
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

  if (!loggedIn) return <LoginView onLogin={handleLogin} onBackToSite={onBackToSite} />;

  if (selectedTest) {
    return (
      <TestDetailView
        test={selectedTest}
        data={data}
        setData={setData}
        onBack={() => { setData(getData()); setSelectedTest(null); }}
      />
    );
  }

  return (
    <DashboardView
      data={data}
      setData={setData}
      onSelectTest={setSelectedTest}
      onLogout={handleLogout}
      onBackToSite={onBackToSite}
    />
  );
}
