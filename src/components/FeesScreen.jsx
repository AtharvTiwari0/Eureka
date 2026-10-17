import React, { useState } from 'react';
import { ArrowLeft, Wallet, CheckCircle2, Clock, Search, AlertCircle, RotateCcw, MessageSquare, ChevronRight, FileText, Layers, Calendar } from 'lucide-react';
import { getData, DEFAULT_FEE_MONTHS, getStudentFeeDetails, getOrdinal } from '../adminData';
import FeeReceiptCard from './FeeReceiptCard';

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
          type="button"
          onClick={onBack}
          title={backLabel}
          style={{ background: '#F3F4F6', border: '1px solid #E5E7EB', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '9999px', flexShrink: 0, transition: 'background 0.18s' }}
        >
          <ArrowLeft size={18} color="#000" />
        </button>

        <span
          onClick={onHome}
          style={{ fontSize: '1.8rem', fontWeight: 400, fontFamily: "'Instrument Serif', Georgia, serif", color: '#000', cursor: 'pointer' }}
        >
          Eureka
        </span>

        <div style={{ padding: '0.3rem 0.85rem', borderRadius: '9999px', background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#059669', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Wallet size={12} /> Fee Portal
        </div>
      </div>
    </header>
  );
}

export default function FeesScreen({ onBackToHome }) {
  const [data] = useState(() => getData());
  // 'search' | 'student-overview' | 'month-bill' | 'cumulative-bill'
  const [view, setView] = useState('search');
  const [selectedReceiptMonth, setSelectedReceiptMonth] = useState('April');
  const [selectedClass, setSelectedClass] = useState('');
  const [rollInput, setRollInput] = useState('');
  const [error, setError] = useState('');
  const [studentFeeData, setStudentFeeData] = useState(null);

  const students = data.students || {};
  const feesData = data.fees || { monthlyAmount: 600, records: {} };

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');
    const roll = rollInput.trim().toUpperCase();

    if (!selectedClass) {
      setError('Please select your class first.');
      return;
    }
    if (!roll) {
      setError('Please enter student roll number.');
      return;
    }

    const studentName = students[selectedClass]?.[roll];
    if (!studentName) {
      setError(`Roll number "${roll}" not found in Class ${selectedClass}. Please check and try again.`);
      return;
    }

    const details = getStudentFeeDetails(roll, feesData);
    const paidMonthsList = (details.activeMonths || []).filter(m => !!details.paidMonths[m]);
    const initialMonth = paidMonthsList.length > 0
      ? paidMonthsList[paidMonthsList.length - 1]
      : (details.activeMonths?.[0] || 'April');

    setSelectedReceiptMonth(initialMonth);
    setStudentFeeData({
      roll,
      name: studentName,
      cls: selectedClass,
      ...details
    });
    setView('student-overview');
  };

  const handleBack = () => {
    if (view === 'month-bill' || view === 'cumulative-bill') {
      setView('student-overview');
    } else if (view === 'student-overview') {
      setView('search');
    } else {
      onBackToHome();
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Inter', sans-serif", color: '#111' }}>
      <Header
        onBack={handleBack}
        backLabel={view === 'search' ? 'Back to Home' : 'Back'}
        onHome={onBackToHome}
      />

      {/* ══════════ SCREEN 1: SEARCH STUDENT ══════════ */}
      {view === 'search' && (
        <main style={{ maxWidth: '480px', margin: '0 auto', padding: '2.5rem 1.25rem 5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: 'clamp(1.9rem, 5vw, 2.7rem)', fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400, color: '#000', margin: '0 0 0.4rem', lineHeight: 1.1 }}>
              Student Fee Portal
            </h1>
            <p style={{ color: '#6B7280', fontSize: '0.92rem', margin: 0, lineHeight: 1.5 }}>
              Check fee bills, verified red stamps & complete payment statement
            </p>
          </div>

          <form onSubmit={handleSearch}>
            {/* Step 1: Class Selection */}
            <div style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '18px', padding: '1.4rem', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.8rem' }}>
                Step 1 — Select Class
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                {['10th', '9th'].map(cls => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => { setSelectedClass(cls); setError(''); }}
                    style={{
                      padding: '0.85rem',
                      borderRadius: '12px',
                      border: `2px solid ${selectedClass === cls ? '#000' : '#E5E7EB'}`,
                      background: selectedClass === cls ? '#000' : '#F9FAFB',
                      color: selectedClass === cls ? '#FFF' : '#374151',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    Class {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Roll Number Input */}
            <div style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: '18px', padding: '1.4rem', marginBottom: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
                Step 2 — Student Roll Number
              </div>
              <input
                type="text"
                value={rollInput}
                onChange={e => { setRollInput(e.target.value); setError(''); }}
                placeholder={selectedClass === '9th' ? 'e.g. 3E01' : 'e.g. 2E01'}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  border: '1.5px solid #E5E7EB',
                  fontSize: '1rem',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  outline: 'none',
                  textTransform: 'uppercase'
                }}
              />
              <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.4rem' }}>
                Example: 10th roll numbers start with <strong>2E</strong> (e.g. 2E01), 9th with <strong>3E</strong> (e.g. 3E01)
              </div>
            </div>

            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', padding: '0.75rem 1rem', color: '#DC2626', fontSize: '0.84rem', marginBottom: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.95rem',
                borderRadius: '9999px',
                background: '#000',
                color: '#FFF',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 6px 18px rgba(0,0,0,0.12)'
              }}
            >
              <Search size={16} /> Check Fee Details
            </button>
          </form>
        </main>
      )}

      {/* ══════════ SCREEN 2: STUDENT OVERVIEW & MONTH SELECTOR ══════════ */}
      {view === 'student-overview' && studentFeeData && (
        <main style={{ maxWidth: '480px', margin: '0 auto', padding: '1.75rem 1.25rem 5rem' }}>
          {/* Prominent Student Header Card */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E5E7EB',
            padding: '1.35rem 1.4rem',
            marginBottom: '1rem',
            boxShadow: '0 4px 18px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Student
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#000000', marginTop: '0.1rem' }}>
                  {studentFeeData.name}
                </div>
                <div style={{ fontSize: '0.76rem', color: '#6B7280', marginTop: '0.15rem' }}>
                  Admission: {studentFeeData.admissionDate} • Class {studentFeeData.cls}
                </div>
              </div>

              <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.85rem', background: '#EFF6FF', color: '#0284C7', padding: '0.25rem 0.65rem', borderRadius: '8px' }}>
                {studentFeeData.roll}
              </span>
            </div>

            {/* Fees Submitted Up To Reassurance Badge */}
            <div style={{
              marginTop: '1rem',
              padding: '0.85rem 1rem',
              borderRadius: '14px',
              background: studentFeeData.dueCount === 0 ? '#ECFDF5' : '#FFFBEB',
              border: `1.5px solid ${studentFeeData.dueCount === 0 ? '#10B981' : '#F59E0B'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem'
            }}>
              <div>
                <div style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', color: studentFeeData.dueCount === 0 ? '#047857' : '#B45309' }}>
                  Fees Submitted Up To
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 900, color: studentFeeData.dueCount === 0 ? '#065F46' : '#92400E', marginTop: '1px' }}>
                  {studentFeeData.paidUpToDate}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.68rem', color: '#6B7280' }}>
                  Total Paid
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#000000' }}>
                  ₹{studentFeeData.paidAmount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>

          {/* ── OPTION A: COMPLETE MASTER BILL BUTTON ── */}
          <div
            onClick={() => setView('cumulative-bill')}
            style={{
              background: '#000000',
              borderRadius: '18px',
              padding: '1.15rem 1.25rem',
              marginBottom: '1.35rem',
              cursor: 'pointer',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
              transition: 'transform 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: 42, height: 42, borderRadius: '12px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Layers size={20} color="#FFFFFF" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#FFFFFF' }}>
                  Complete Cumulative Bill
                </div>
                <div style={{ fontSize: '0.74rem', color: '#D1D5DB', marginTop: '0.15rem' }}>
                  All {studentFeeData.paidCount} paid months combined statement (₹{studentFeeData.paidAmount.toLocaleString('en-IN')})
                </div>
              </div>
            </div>

            <ChevronRight size={20} color="#9CA3AF" />
          </div>

          {/* ── OPTION B: SELECT SPECIFIC MONTH ── */}
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Or Select Specific Month's Bill:
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.1rem' }}>
              Click any month to open its dedicated individual receipt screen
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {DEFAULT_FEE_MONTHS.map(month => {
              const isActive = studentFeeData.isMonthActive(month);
              const paidInfo = studentFeeData.paidMonths[month];
              const isPaid = !!paidInfo;
              const cycle = studentFeeData.getMonthValidity ? studentFeeData.getMonthValidity(month) : '';

              if (!isActive) {
                return (
                  <div
                    key={month}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      opacity: 0.65,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: '#94A3B8' }}>{month}</div>
                      <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Pre-admission (Joined {studentFeeData.admissionDate})</div>
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, background: '#F1F5F9', color: '#64748B', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                      Exempt
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={month}
                  onClick={() => {
                    setSelectedReceiptMonth(month);
                    setView('month-bill');
                  }}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '14px',
                    background: '#FFFFFF',
                    border: `1.5px solid ${isPaid ? '#A7F3D0' : '#E5E7EB'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.92rem', color: isPaid ? '#065F46' : '#111827' }}>
                        {month}
                      </span>
                      <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#4B5563' }}>
                        • ₹{studentFeeData.monthlyAmount}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: isPaid ? '#059669' : '#D97706', marginTop: '0.15rem' }}>
                      {isPaid ? `Paid on ${paidInfo.date || 'Record'} (${paidInfo.mode || 'Cash'})` : `Pending (Due on ${getOrdinal(studentFeeData.dueDay)} ${month})`}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      background: isPaid ? '#ECFDF5' : '#FFFBEB',
                      color: isPaid ? '#047857' : '#B45309',
                      border: `1px solid ${isPaid ? '#A7F3D0' : '#FDE68A'}`,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      {isPaid ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      <span>{isPaid ? 'Paid' : 'Pending'}</span>
                    </span>

                    <ChevronRight size={16} color="#94A3B8" />
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => { setView('search'); setRollInput(''); setError(''); }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              padding: '0.85rem',
              borderRadius: '9999px',
              background: '#FFF',
              border: '1px solid #E5E7EB',
              color: '#374151',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={15} /> Search Another Student
          </button>
        </main>
      )}

      {/* ══════════ SCREEN 3: DEDICATED SPECIFIC MONTH BILL ══════════ */}
      {view === 'month-bill' && studentFeeData && (
        <main style={{ maxWidth: '480px', margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>
          {/* Minimal Fee Bill Card */}
          <FeeReceiptCard
            student={studentFeeData}
            selectedMonth={selectedReceiptMonth}
            mode="single"
            showActions={true}
          />
        </main>
      )}

      {/* ══════════ SCREEN 4: DEDICATED COMPLETE CUMULATIVE MASTER BILL ══════════ */}
      {view === 'cumulative-bill' && studentFeeData && (
        <main style={{ maxWidth: '480px', margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>
          {/* Minimal Master Cumulative Fee Bill Card */}
          <FeeReceiptCard
            student={studentFeeData}
            mode="cumulative"
            showActions={true}
          />
        </main>
      )}
    </div>
  );
}
