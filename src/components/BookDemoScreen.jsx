import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, User, PhoneCall, CheckCircle2, ChevronRight, ArrowLeft, Send, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookDemoScreen({ preselectedBatch, onBackToHome }) {
  const [step, setStep] = useState(1);
  const [selectedBatchName, setSelectedBatchName] = useState(preselectedBatch || 'Class 10th Science Board Special');

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

  // Sync preselectedBatch prop whenever user clicks a specific batch button
  useEffect(() => {
    if (preselectedBatch) {
      setSelectedBatchName(preselectedBatch);
    }
  }, [preselectedBatch]);

  // Sync slot whenever selectedBatchName changes
  useEffect(() => {
    if (selectedBatchName.includes('10th')) {
      setSelectedSlot('4:00 PM - 5:00 PM (Class 10th Science)');
    } else if (selectedBatchName.includes('9th')) {
      setSelectedSlot('5:00 PM - 6:00 PM (Class 9th Science)');
    } else if (selectedBatchName.includes('6th') || selectedBatchName.includes('8th')) {
      setSelectedSlot('3:00 PM - 4:00 PM (Classes 6th - 8th All Subjects)');
    } else {
      setSelectedSlot('4:00 PM - 5:00 PM');
    }
  }, [selectedBatchName]);

  const progressPercent = step === 1 ? 33 : step === 2 ? 66 : 100;

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!studentName || !phone) return;

    setSubmitting(true);

    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } catch (err) {}

    // Submit to Formspark
    try {
      await fetch(FORMSPARK_ACTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _email: { from: studentName, subject: `Demo Class Request for ${selectedBatchName}` },
          batch: selectedBatchName,
          date: selectedDate,
          slot: selectedSlot,
          studentName,
          phone,
          note: queryNote,
          submittedAt: new Date().toLocaleString(),
        }),
      });
    } catch (err) {
      console.log('Formspark submission error:', err);
    }

    setSubmitting(false);
    setStep(3);

    const text = encodeURIComponent(
      `Hello Abhishek Vishwakarma! I want to book 2 Free Demo Classes for Eureka Classes.\n\n` +
      `🎯 TARGET BATCH: ${selectedBatchName}\n` +
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
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', padding: '6rem 0 4rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Top Screen Header & Back Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <button
            onClick={onBackToHome}
            className="btn-clay-secondary"
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <ArrowLeft size={16} /> Back to Main Site
          </button>
          <div className="clay-badge" style={{ fontSize: '0.8rem', background: 'var(--accent-amber-soft)', color: 'var(--accent-amber)' }}>
            <Sparkles size={14} /> 2 Free Demo Classes Guaranteed
          </div>
        </div>

        {/* SCREEN TITLE & STEP DESCRIPTION */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
            Book Demo Class <span style={{ color: 'var(--primary-blue)' }}>Portal</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
            Follow the 3 simple steps below to reserve your free seat with Abhishek Vishwakarma.
          </p>
        </div>

        {/* PROMINENT PROCESS PROGRESS BAR */}
        <div
          className="clay-card"
          style={{
            padding: '1.2rem 1.5rem',
            borderRadius: '20px',
            background: '#FFFFFF',
            marginBottom: '2rem',
            boxShadow: 'var(--clay-shadow-sm)',
          }}
        >
          {/* Progress Percent Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--primary-blue)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Progress: {progressPercent}% Completed
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)' }}>
              Step {step} of 3
            </span>
          </div>

          <div style={{ height: '8px', width: '100%', background: '#E2E8F0', borderRadius: '10px', overflow: 'hidden', marginBottom: '1.2rem' }}>
            <div
              style={{
                height: '100%',
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)',
                borderRadius: '10px',
                transition: 'width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            />
          </div>

          {/* Step Badges Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
            {[
              { num: 1, title: 'Class & Batch', icon: BookOpen },
              { num: 2, title: 'Date & Slot', icon: CalendarIcon },
              { num: 3, title: 'Confirm & WA', icon: ShieldCheck },
            ].map((s) => {
              const IconComp = s.icon;
              const isActive = step === s.num;
              const isDone = step > s.num;

              return (
                <div
                  key={s.num}
                  style={{
                    padding: '0.55rem 0.3rem',
                    borderRadius: '12px',
                    background: isActive ? 'var(--primary-blue-soft)' : isDone ? '#F1F5F9' : 'transparent',
                    border: isActive ? '1.5px solid var(--primary-blue)' : '1px solid transparent',
                    color: isActive ? 'var(--primary-blue)' : isDone ? 'var(--text-primary)' : 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                    {isDone ? (
                      <CheckCircle2 size={16} color="var(--accent-emerald)" />
                    ) : (
                      <IconComp size={15} color={isActive ? 'var(--primary-blue)' : 'var(--text-muted)'} />
                    )}
                    <span style={{ fontSize: '0.8rem', fontWeight: isActive || isDone ? '800' : '600' }}>
                      {s.num}. {s.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MAIN STEP FORM CONTAINER */}
        <div
          className="clay-card"
          style={{
            padding: '2.2rem',
            borderRadius: '28px',
            background: '#FFFFFF',
            boxShadow: 'var(--clay-shadow-lg)',
          }}
        >
          {/* STEP 1: Select Class / Batch */}
          {step === 1 && (
            <div>
              <div style={{ marginBottom: '1.4rem' }}>
                <span className="clay-badge" style={{ fontSize: '0.78rem', marginBottom: '0.4rem', background: 'var(--primary-blue-soft)', color: 'var(--primary-blue)' }}>
                  Step 1: Choose Your Course
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Select Target Class / Batch
                </h2>
                {preselectedBatch && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: '700', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <CheckCircle2 size={15} /> Pre-filled from selected section: "{selectedBatchName}"
                  </p>
                )}
              </div>

              {/* Class Selection Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.8rem' }}>
                {[
                  {
                    id: 'Class 10th Science Board Special',
                    title: 'Class 10th Science Board Special',
                    desc: 'Complete NCERT Science + Physics, Chemistry, Biology + Board Sample Papers',
                    timing: '4:00 PM - 5:00 PM Daily',
                    badge: 'Most Popular',
                  },
                  {
                    id: 'Class 9th Science Foundation',
                    title: 'Class 9th Science Foundation',
                    desc: 'Strong Conceptual Foundation in Physics & Chemistry for Senior Board Prep',
                    timing: '5:00 PM - 6:00 PM Daily',
                    badge: 'Foundation',
                  },
                  {
                    id: 'Classes 6th to 8th All Subjects',
                    title: 'Classes 6th to 8th All Subjects',
                    desc: 'Middle School Science, Maths & General Knowledge Conceptual Mastery',
                    timing: '3:00 PM - 4:00 PM Daily',
                    badge: 'Middle School',
                  },
                ].map((b) => {
                  const isSelected = selectedBatchName === b.id || selectedBatchName.includes(b.title.slice(0, 9));

                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBatchName(b.id)}
                      style={{
                        padding: '1rem 1.2rem',
                        borderRadius: '16px',
                        border: isSelected ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                        background: isSelected ? 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)' : '#F8FAFC',
                        boxShadow: isSelected ? '0 4px 14px rgba(37, 99, 235, 0.15)' : 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.3rem' }}>
                        <span style={{ fontWeight: '800', fontSize: '0.98rem', color: isSelected ? 'var(--primary-blue)' : 'var(--text-primary)' }}>
                          {b.title}
                        </span>
                        {isSelected && <CheckCircle2 size={20} color="var(--primary-blue)" style={{ flexShrink: 0 }} />}
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', lineHeight: 1.4 }}>
                        {b.desc}
                      </p>
                      <span className="clay-badge" style={{ fontSize: '0.72rem', padding: '0.18rem 0.55rem', background: '#FFFFFF', color: 'var(--text-muted)' }}>
                        ⏰ Timings: {b.timing}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setStep(2)}
                className="btn-clay-primary"
                style={{
                  width: '100%',
                  padding: '0.9rem 0.8rem',
                  fontSize: 'clamp(0.85rem, 3.8vw, 1rem)',
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  lineHeight: '1.3',
                }}
              >
                <span>Continue to Step 2: Pick Date & Slot</span> <ChevronRight size={18} style={{ flexShrink: 0 }} />
              </button>
            </div>
          )}

          {/* STEP 2: Pick Date & Time Slot */}
          {step === 2 && (
            <div>
              <div style={{ marginBottom: '1.4rem' }}>
                <span className="clay-badge" style={{ fontSize: '0.78rem', marginBottom: '0.4rem', background: 'var(--primary-blue-soft)', color: 'var(--primary-blue)' }}>
                  Step 2: Schedule Demo
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Select Preferred Date & Time
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Target Course: <strong style={{ color: 'var(--primary-blue)' }}>{selectedBatchName}</strong>
                </p>
              </div>

              {/* Date Picker Grid */}
              <label style={labelStyle}><CalendarIcon size={15} color="var(--primary-blue)" /> Select Date</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {upcomingDates.map((d, i) => {
                  const isSelected = selectedDate === d.fullDate;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedDate(d.fullDate)}
                      style={{
                        padding: '0.85rem 0.4rem',
                        borderRadius: '14px',
                        border: isSelected ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                        background: isSelected ? 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)' : '#F8FAFC',
                        boxShadow: isSelected ? '0 4px 12px rgba(37, 99, 235, 0.2)' : 'none',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ fontSize: '0.72rem', color: isSelected ? 'var(--primary-blue)' : 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase' }}>{d.dayName}</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: '900', color: isSelected ? 'var(--primary-blue)' : 'var(--text-primary)', margin: '0.1rem 0' }}>{d.dateNum}</div>
                      <div style={{ fontSize: '0.72rem', color: isSelected ? 'var(--primary-blue)' : 'var(--text-muted)', fontWeight: '600' }}>{d.monthName}</div>
                    </button>
                  );
                })}
              </div>

              {/* Time Slot Picker */}
              <label style={labelStyle}><Clock size={15} color="var(--primary-blue)" /> Select Time Slot</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.8rem' }}>
                {[
                  selectedBatchName.includes('10th') ? '4:00 PM - 5:00 PM (Class 10th Regular Batch)' :
                  selectedBatchName.includes('9th') ? '5:00 PM - 6:00 PM (Class 9th Regular Batch)' :
                  '3:00 PM - 4:00 PM (Classes 6th - 8th Regular Batch)',
                  '6:30 PM (Special Counseling Session)',
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
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    <span>{slot}</span>
                    {selectedSlot === slot && <CheckCircle2 size={18} color="var(--primary-blue)" style={{ flexShrink: 0 }} />}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '0.8rem' }} className="demo-step-actions">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-clay-secondary"
                  style={{ width: '100%', padding: '0.85rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                >
                  <ArrowLeft size={16} /> Change Class
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn-clay-primary"
                  style={{ width: '100%', padding: '0.85rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                >
                  <span>Continue to Step 3: Student Details</span> <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Student Details & Confirm */}
          {step === 3 && (
            <div>
              {studentName && phone ? (
                /* Success Confirmation View */
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
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

                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: '800', marginBottom: '0.5rem' }}>
                    Demo Seat Confirmed!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.4rem', lineHeight: 1.5 }}>
                    Opening WhatsApp automatically... <br />
                    <strong style={{ color: 'var(--text-primary)', display: 'block', marginTop: '0.4rem' }}>
                      Please click "Send" in WhatsApp to confirm your demo seat with Abhishek Vishwakarma (+91 9452184870).
                    </strong>
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <a
                      href={`https://wa.me/919452184870?text=${encodeURIComponent(`Hello Abhishek Vishwakarma! I want to book 2 Free Demo Classes for Eureka Classes.\n\n🎯 TARGET BATCH: ${selectedBatchName}\n📅 Preferred Date: ${selectedDate}\n⏰ Preferred Slot: ${selectedSlot}\n👤 Student Name: ${studentName}\n📞 Contact Phone: ${phone}\n${queryNote ? `📝 Note: ${queryNote}\n` : ''}\nPlease confirm my demo seat!`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-clay-primary"
                      style={{ width: '100%', padding: '0.8rem', fontSize: '0.9rem', textDecoration: 'none', boxSizing: 'border-box' }}
                    >
                      Click Here if WhatsApp Doesn't Open Automatically
                    </a>

                    <button onClick={onBackToHome} className="btn-clay-secondary" style={{ width: '100%', padding: '0.8rem', fontSize: '0.9rem', boxSizing: 'border-box' }}>
                      Return to Main Homepage
                    </button>
                  </div>
                </div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleFinalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <div>
                    <span className="clay-badge" style={{ fontSize: '0.78rem', marginBottom: '0.4rem', background: 'var(--primary-blue-soft)', color: 'var(--primary-blue)' }}>
                      Step 3: Student Details
                    </span>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                      Enter Student Information
                    </h2>
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
                    <label style={labelStyle}><PhoneCall size={14} color="var(--primary-blue)" /> WhatsApp Contact Phone Number</label>
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
                    <label style={labelStyle}>Questions or Notes for Abhishek Vishwakarma (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="Type any specific requirement or question..."
                      value={queryNote}
                      onChange={(e) => setQueryNote(e.target.value)}
                      className="clay-input"
                      style={{ resize: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '0.8rem', marginTop: '0.6rem' }} className="demo-step-actions">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn-clay-secondary"
                      style={{ width: '100%', padding: '0.85rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                    >
                      <ArrowLeft size={16} /> Back to Date
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-clay-primary"
                      style={{ width: '100%', padding: '0.85rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                    >
                      <Send size={16} /> {submitting ? 'Confirming...' : 'Confirm & Reserve Seat'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>

      </div>

      <style>{`
        @media (max-width: 576px) {
          .demo-step-actions { grid-template-columns: 1fr !important; }
        }
      `}</style>
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
