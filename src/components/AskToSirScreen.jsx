import React, { useState } from 'react';
import { ArrowLeft, Send, Sparkles, User, Phone, MessageSquare, BookOpen, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

export default function AskToSirScreen({ onBackToHome }) {
  const [studentName, setStudentName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedClass, setSelectedClass] = useState('Class 10th Science Board Special');
  const [questionText, setQuestionText] = useState('');

  const classOptions = [
    'Class 10th Science Board Special (2026-27)',
    'Class 9th Science Foundation (2026-27)',
    'Classes 6th to 8th All Subjects Foundation (2026-27)',
    'General Inquiry / Center Details'
  ];

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!studentName || !mobileNumber || !questionText) {
      alert('Please fill in your Name, Mobile Number, and Question.');
      return;
    }

    const targetPhone = '919452184870'; // Abhishek Sir's direct phone number
    const message = `*Hello Abhishek Vishwakarma Sir! I have a direct question regarding Eureka Science Academy:*

👤 *Name:* ${studentName}
📱 *Mobile Number:* ${mobileNumber}
📚 *Target Class/Batch:* ${selectedClass}
❓ *Question/Doubt:* ${questionText}

Please guide me. Thank you!`;

    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#000000', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Top Navigation Header */}
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
          <button
            onClick={onBackToHome}
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
            <span>Back to Home</span>
          </button>

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
            <span>DIRECT TEACHER DOUBT CELL</span>
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
            <HelpCircle size={16} color="#000000" />
            <span>1-ON-1 DIRECT ACADEMIC INQUIRY</span>
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
            Ask Abhishek Vishwakarma <br />
            <span style={{ fontStyle: 'italic', color: '#6F6F6F' }}>Any Academic Query</span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#6F6F6F', lineHeight: 1.6 }}>
            Have a question about 2026-27 NCERT rationalized syllabus, batch timings, or concept guidance? Fill out your question below for a direct personal response.
          </p>
        </div>

        {/* Dedicated Query Card */}
        <div
          style={{
            maxWidth: '640px',
            margin: '0 auto',
            background: '#FFFFFF',
            border: '1px solid #E5E5E5',
            borderRadius: '24px',
            padding: '2.5rem 2.2rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
          }}
        >
          <form onSubmit={handleSendWhatsApp} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            
            {/* Student Name */}
            <div>
              <label style={labelStyle}>
                <User size={16} /> Student / Parent Full Name *
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

            {/* Mobile / WhatsApp Number */}
            <div>
              <label style={labelStyle}>
                <Phone size={16} /> WhatsApp Phone Number *
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

            {/* Target Class Dropdown */}
            <div>
              <label style={labelStyle}>
                <BookOpen size={16} /> Target Class / Batch *
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {classOptions.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Question Text Area */}
            <div>
              <label style={labelStyle}>
                <MessageSquare size={16} /> Type Your Question or Doubt *
              </label>
              <textarea
                required
                rows={4}
                placeholder="e.g. Sir, when do the new 2026-27 Class 10 Board batches start?"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                style={{ ...inputStyle, resize: 'none' }}
              />
            </div>

            {/* Submit Button */}
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
              }}
            >
              <Send size={18} color="#FFFFFF" />
              <span>Send Question to Abhishek Sir</span>
            </button>
          </form>
        </div>

        {/* Info Highlights */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            maxWidth: '640px',
            margin: '3rem auto 0 auto',
          }}
        >
          <div style={trustBoxStyle}>
            <CheckCircle2 size={20} color="#000000" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#000000' }}>Direct Answer</div>
              <div style={{ fontSize: '0.8rem', color: '#6F6F6F' }}>Responded personally by Abhishek Sir</div>
            </div>
          </div>

          <div style={trustBoxStyle}>
            <ShieldCheck size={20} color="#000000" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#000000' }}>Syllabus & Timings</div>
              <div style={{ fontSize: '0.8rem', color: '#6F6F6F' }}>Instant clarity on 2026-27 updates</div>
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
