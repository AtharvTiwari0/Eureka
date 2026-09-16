import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, User, PhoneCall, CheckCircle2, ChevronRight, ArrowLeft, Send, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookCallModal({ isOpen, onClose, preselectedBatch }) {
  const [step, setStep] = useState(1);
  
  const today = new Date();
  const upcomingDates = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1);
    return {
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
      fullDate: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    };
  });

  const [selectedDate, setSelectedDate] = useState(upcomingDates[0].fullDate);
  const [selectedSlot, setSelectedSlot] = useState('4:00 PM - 5:00 PM');
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [queryNote, setQueryNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const FORMSPARK_ACTION_URL = 'https://submit-form.com/fQQINef9K';

  const currentBatchName = preselectedBatch || 'Class 10th Science Board Special';

  useEffect(() => {
    if (currentBatchName.includes('10th')) {
      setSelectedSlot('4:00 PM - 5:00 PM (Class 10th Science)');
    } else if (currentBatchName.includes('9th')) {
      setSelectedSlot('5:00 PM - 6:00 PM (Class 9th Science)');
    } else if (currentBatchName.includes('6th') || currentBatchName.includes('8th')) {
      setSelectedSlot('3:00 PM - 4:00 PM (Classes 6th - 8th All Subjects)');
    } else {
      setSelectedSlot('4:00 PM - 5:00 PM');
    }
    setStep(1);
  }, [preselectedBatch, isOpen]);

  if (!isOpen) return null;

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!studentName || !phone) return;

    setSubmitting(true);

    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch (err) {}

    // Formspark submission
    try {
      await fetch(FORMSPARK_ACTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _email: { from: studentName, subject: `Demo Class Request for ${currentBatchName}` },
          batch: currentBatchName,
          date: selectedDate,
          slot: selectedSlot,
          studentName,
          phone,
          note: queryNote,
          submittedAt: new Date().toLocaleString(),
        }),
      });
    } catch (err) {
      console.log('Formspark error:', err);
    }

    setSubmitting(false);
    setStep(3);

    const text = encodeURIComponent(
      `Hello Abhishek Sir! I want to book 2 Free Demo Classes for Eureka Classes.\n\n` +
      `🎯 TARGET BATCH: ${currentBatchName}\n` +
      `📅 Preferred Date: ${selectedDate}\n` +
      `⏰ Preferred Slot: ${selectedSlot}\n` +
      `👤 Student Name: ${studentName}\n` +
      `📞 Contact Phone: ${phone}\n` +
      (queryNote ? `📝 Note: ${queryNote}\n` : '') +
      `\nPlease confirm my demo seat!`
    );

    const waUrl = `https://wa.me/919452184870?text=${text}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="clay-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '540px',
          width: '100%',
          padding: '2.2rem',
          borderRadius: '28px',
          position: 'relative',
          background: '#FFFFFF',
          boxShadow: 'var(--clay-shadow-lg)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            background: '#F1F5F9',
            border: 'none',
            color: 'var(--text-primary)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={18} />
        </button>

        {/* TARGET BATCH BADGE */}
        <div
          style={{
            padding: '0.8rem 1.1rem',
            borderRadius: '16px',
            background: 'var(--primary-blue-soft)',
            border: '1px solid rgba(37, 99, 235, 0.2)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.7rem',
          }}
        >
          <BookOpen size={20} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Selected Batch:
            </span>
            <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary-blue)' }}>
              {currentBatchName}
            </div>
          </div>
        </div>

        {/* STEP 1: Select Date & Time Slot */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom: '1.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <Sparkles size={16} color="var(--accent-amber)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                  Step 1 of 2: Pick Demo Slot
                </span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                Select Preferred Date & Time
              </h3>
            </div>

            {/* Calendar Date Selector */}
            <label style={labelStyle}><CalendarIcon size={15} color="var(--primary-blue)" /> Select Date</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1.4rem' }}>
              {upcomingDates.slice(0, 6).map((d, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedDate(d.fullDate)}
                  style={{
                    padding: '0.75rem 0.4rem',
                    borderRadius: '12px',
                    border: selectedDate === d.fullDate ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                    background: selectedDate === d.fullDate ? 'var(--primary-blue-soft)' : '#F8FAFC',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>{d.dayName}</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: selectedDate === d.fullDate ? 'var(--primary-blue)' : 'var(--text-primary)' }}>{d.dateNum}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{d.monthName}</div>
                </button>
              ))}
            </div>

            {/* Time Slot Selector */}
            <label style={labelStyle}><Clock size={15} color="var(--primary-blue)" /> Time Slot</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.8rem' }}>
              {[
                currentBatchName.includes('10th') ? '4:00 PM - 5:00 PM (Class 10th Regular Batch)' :
                currentBatchName.includes('9th') ? '5:00 PM - 6:00 PM (Class 9th Regular Batch)' :
                '3:00 PM - 4:00 PM (Classes 6th - 8th Regular Batch)',
                '6:30 PM (Special Counseling Call with Sir)',
              ].map((slot, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  style={{
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: selectedSlot === slot ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                    background: selectedSlot === slot ? 'var(--primary-blue-soft)' : '#F8FAFC',
                    color: selectedSlot === slot ? 'var(--primary-blue)' : 'var(--text-primary)',
                    fontWeight: '700',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{slot}</span>
                  {selectedSlot === slot && <CheckCircle2 size={18} color="var(--primary-blue)" />}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="btn-clay-primary"
              style={{ width: '100%', padding: '0.95rem' }}
            >
              Continue To Student Details <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 2: Student Details & Instant Confirmation */}
        {step === 2 && (
          <form onSubmit={handleFinalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div style={{ marginBottom: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <Sparkles size={16} color="var(--primary-blue)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                  Step 2 of 2: Student Details
                </span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                Enter Contact Information
              </h3>
            </div>

            <div>
              <label style={labelStyle}><User size={14} color="var(--primary-blue)" /> Student Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="clay-input"
              />
            </div>

            <div>
              <label style={labelStyle}><PhoneCall size={14} color="var(--primary-blue)" /> WhatsApp Contact Number</label>
              <input
                type="tel"
                required
                placeholder="e.g. 9452184870"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="clay-input"
              />
            </div>

            <div>
              <label style={labelStyle}>Special Request / Question (Optional)</label>
              <textarea
                rows={2}
                placeholder="Type any question or note for Abhishek Sir..."
                value={queryNote}
                onChange={(e) => setQueryNote(e.target.value)}
                className="clay-input"
                style={{ resize: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.4rem' }}>
              <button type="button" onClick={() => setStep(1)} className="btn-clay-secondary" style={{ width: '35%' }}>
                <ArrowLeft size={16} /> Back
              </button>
              <button type="submit" disabled={submitting} className="btn-clay-primary" style={{ width: '65%' }}>
                <Send size={18} /> {submitting ? 'Confirming...' : 'Confirm & Book Demo'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Success Screen */}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--accent-emerald-soft)',
                border: '2px solid var(--accent-emerald)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.2rem auto',
              }}
            >
              <CheckCircle2 size={36} color="var(--accent-emerald)" />
            </div>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: '800', marginBottom: '0.5rem' }}>
              Demo Class Slot Locked!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Your request has been submitted and forwarded to <strong>Abhishek Vishwakarma Sir (+91 9452184870)</strong>.
            </p>

            <button onClick={onClose} className="btn-clay-secondary" style={{ width: '100%' }}>
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontSize: '0.85rem',
  color: 'var(--text-primary)',
  fontWeight: '700',
  marginBottom: '0.35rem',
};
