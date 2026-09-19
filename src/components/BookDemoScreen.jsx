import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Send, Calendar, User, Phone, MessageSquare, CheckCircle2, BookOpen, ShieldCheck } from 'lucide-react';

export default function BookDemoScreen({ initialBatch, onBackToBatches, onBackToHome }) {
  const [selectedBatch, setSelectedBatch] = useState(
    initialBatch || 'Class 10th Science Board Special'
  );
  const [studentName, setStudentName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [demoDate, setDemoDate] = useState('');
  const [studentNote, setStudentNote] = useState('');

  const batchOptions = [
    { title: 'Class 10th Science Board Special', code: '10th', fee: '₹600/month', subtitle: 'CBSE 2026-27 Board Examiner Strategy' },
    { title: 'Class 9th Science Foundation', code: '9th', fee: '₹600/month', subtitle: 'NEP 2026-27 Exploration Series NCERT' },
    { title: 'Classes 6th to 8th All Subjects Foundation', code: 'middle', fee: '₹600/month', subtitle: 'NCERT Curiosity Series Science, Math & English' }
  ];

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!studentName || !mobileNumber) {
      alert('Please enter your Name and Mobile Number.');
      return;
    }

    const targetPhone = '919876543210'; // Academy WhatsApp contact
    const message = `*Hello Abhishek Sir! I want to Book 2 Free Demo Classes at Eureka Science Academy!*

📌 *Student Name:* ${studentName}
📱 *Mobile Number:* ${mobileNumber}
📚 *Selected Batch:* ${selectedBatch} (Academic Year 2026-27)
💰 *Monthly Fee:* ₹600 / month
📅 *Preferred Demo Date:* ${demoDate || 'As soon as possible'}
📝 *Note / Inquiry:* ${studentNote || 'None'}

Please confirm my Demo Class slot. Thank you!`;

    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#000000', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Navigation Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          padding: '1.1rem 2rem',
        }}
      >
        <div
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onBackToBatches || onBackToHome}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#000000',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              <ArrowLeft size={18} color="#000000" />
              <span>Back to Batches</span>
            </button>
          </div>

          <span
            onClick={onBackToHome}
            style={{
              fontSize: '1.8rem',
              fontWeight: '400',
              fontFamily: "'Instrument Serif', Georgia, serif",
              color: '#000000',
              cursor: 'pointer',
            }}
          >
            Eureka
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#F4F4F4', padding: '0.4rem 0.9rem', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: 600 }}>
            <Sparkles size={14} color="#000000" />
            <span>2 FREE DEMO CLASSES</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '64rem', margin: '0 auto', padding: '3.5rem 1.5rem 6rem 1.5rem' }}>
        
        {/* Page Title */}
        <div style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto 3rem auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              background: '#F4F4F4',
              color: '#000000',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginBottom: '1.2rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            <ShieldCheck size={16} color="#000000" />
            <span>OFFICIAL 2026-27 ADMISSION & DEMO REGISTRATION</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-1.5px',
              color: '#000000',
              marginBottom: '1rem',
            }}
          >
            Book 2 Free Demo Classes <br />
            <span style={{ fontStyle: 'italic', color: '#6F6F6F' }}>Academic Session 2026-27</span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#6F6F6F', lineHeight: 1.6 }}>
            Reserve your student's seat in Abhishek Sir's interactive small batch (Max 15 students). Experience our step-by-step teaching method before taking admission.
          </p>
        </div>

        {/* Dedicated Booking Card */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            background: '#FFFFFF',
            border: '1px solid #E5E5E5',
            borderRadius: '24px',
            padding: '2.5rem 2.2rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
          }}
        >

          {/* Fee & Guarantee Banner */}
          <div
            style={{
              background: '#F8FAFC',
              border: '1px solid #E5E5E5',
              borderRadius: '16px',
              padding: '1.2rem 1.5rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6F6F6F', textTransform: 'uppercase' }}>
                Batch Fee (2026-27)
              </span>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#000000', lineHeight: 1.1 }}>
                ₹600 <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#6F6F6F' }}>/ month</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#10B981', fontWeight: 700, fontSize: '0.88rem' }}>
                <CheckCircle2 size={16} color="#10B981" />
                <span>2 Free Demos Included</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#6F6F6F', marginTop: '0.2rem' }}>
                No advance payment required for Demo
              </div>
            </div>
          </div>

          <form onSubmit={handleSendWhatsApp} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            
            {/* Batch Selection Selector */}
            <div>
              <label style={labelStyle}>
                <BookOpen size={16} /> Select Academic Batch (2026-27) *
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.5rem' }}>
                {batchOptions.map((b) => {
                  const isSelected = selectedBatch === b.title;
                  return (
                    <div
                      key={b.code}
                      onClick={() => setSelectedBatch(b.title)}
                      style={{
                        padding: '0.9rem 1.1rem',
                        borderRadius: '14px',
                        border: isSelected ? '2px solid #000000' : '1px solid #E5E5E5',
                        background: isSelected ? '#F8FAFC' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: isSelected ? 700 : 600, color: '#000000' }}>
                          {b.title}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#6F6F6F', marginTop: '0.15rem' }}>
                          {b.subtitle}
                        </div>
                      </div>
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: isSelected ? '6px solid #000000' : '2px solid #D1D5DB',
                          background: '#FFFFFF',
                          flexShrink: 0,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Student Full Name */}
            <div>
              <label style={labelStyle}>
                <User size={16} /> Student Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Atharv Tiwari"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label style={labelStyle}>
                <Phone size={16} /> Mobile / WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 9876543210"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Preferred Demo Date */}
            <div>
              <label style={labelStyle}>
                <Calendar size={16} /> Preferred Demo Class Date (Optional)
              </label>
              <input
                type="date"
                value={demoDate}
                onChange={(e) => setDemoDate(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Additional Note */}
            <div>
              <label style={labelStyle}>
                <MessageSquare size={16} /> Additional Note / Timing Preference (Optional)
              </label>
              <textarea
                placeholder="e.g. Please call in the evening after 5 PM..."
                rows={3}
                value={studentNote}
                onChange={(e) => setStudentNote(e.target.value)}
                style={{ ...inputStyle, resize: 'none' }}
              />
            </div>

            {/* Submission Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1.05rem',
                borderRadius: '9999px',
                background: '#000000',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                fontFamily: "'Inter', sans-serif",
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                marginTop: '0.5rem',
                transition: 'transform 0.15s ease',
              }}
            >
              <Send size={18} color="#FFFFFF" />
              <span>Submit & Open WhatsApp</span>
            </button>
          </form>
        </div>

        {/* Feature Highlights beneath Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            maxWidth: '680px',
            margin: '3rem auto 0 auto',
          }}
        >
          <div style={trustBoxStyle}>
            <CheckCircle2 size={20} color="#000000" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#000000' }}>2 Free Demo Classes</div>
              <div style={{ fontSize: '0.8rem', color: '#6F6F6F' }}>Experience teaching before joining</div>
            </div>
          </div>

          <div style={trustBoxStyle}>
            <CheckCircle2 size={20} color="#000000" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#000000' }}>Max 15 Students</div>
              <div style={{ fontSize: '0.8rem', color: '#6F6F6F' }}>Small batch for personal attention</div>
            </div>
          </div>

          <div style={trustBoxStyle}>
            <CheckCircle2 size={20} color="#000000" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#000000' }}>2026-27 NCERT Aligned</div>
              <div style={{ fontSize: '0.8rem', color: '#6F6F6F' }}>Updated latest curriculum</div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

const labelStyle = {
  fontSize: '0.88rem',
  fontWeight: 600,
  color: '#000000',
  marginBottom: '0.45rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.45rem',
};

const inputStyle = {
  width: '100%',
  padding: '0.85rem 1rem',
  borderRadius: '12px',
  background: '#F8FAFC',
  border: '1px solid #E5E5E5',
  fontSize: '0.95rem',
  color: '#000000',
  outline: 'none',
  boxSizing: 'border-box',
};

const trustBoxStyle = {
  background: '#F8FAFC',
  border: '1px solid #E5E5E5',
  borderRadius: '16px',
  padding: '1rem 1.2rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
};
