import React from 'react';
import { ArrowLeft, Clock, Sparkles, BookOpen, FileText, ArrowRight } from 'lucide-react';

export default function StudyMaterialsScreen({ onBackToHome, onNavigateToBookDemo }) {
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

          <button
            onClick={() => onNavigateToBookDemo && onNavigateToBookDemo('Class 10th Science Board Special')}
            style={{
              background: '#000000',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.6rem 1.4rem',
              borderRadius: '9999px',
              fontWeight: 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span>Book Demo</span>
            <ArrowRight size={15} color="#FFFFFF" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '64rem', margin: '0 auto', padding: '5rem 1.5rem 6rem 1.5rem', textAlign: 'center' }}>
        
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1.1rem',
            borderRadius: '9999px',
            background: '#F4F4F4',
            color: '#000000',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          <Clock size={16} color="#000000" />
          <span>FREE ACADEMIC RESOURCES (2026-27)</span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-1.5px',
            color: '#000000',
            marginBottom: '1.2rem',
          }}
        >
          Study Materials <br />
          <span style={{ fontStyle: 'italic', color: '#6F6F6F' }}>Coming Soon</span>
        </h1>

        <p style={{ fontSize: '1.15rem', color: '#6F6F6F', maxWidth: '38rem', margin: '0 auto 2.8rem auto', lineHeight: 1.65 }}>
          We are currently preparing handcrafted NCERT 2026-27 formula cheat-sheets, CBSE last 10-year PYQ decoders, and middle school Curiosity activity handouts for Classes 6th to 10th.
        </p>

        {/* Coming Soon Card Container */}
        <div
          style={{
            maxWidth: '560px',
            margin: '0 auto 3rem auto',
            background: '#F8FAFC',
            border: '1px solid #E5E5E5',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: '#000000',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.2rem auto',
            }}
          >
            <FileText size={30} color="#FFFFFF" />
          </div>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#000000', marginBottom: '0.5rem' }}>
            2026-27 Syllabus Handouts in Progress
          </h3>
          <p style={{ fontSize: '0.92rem', color: '#6F6F6F', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Abhishek Sir is meticulously curating step-by-step keyword notes and formula sheets. Check back soon or enroll in a demo class to get physical handouts.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={onBackToHome}
              style={{
                padding: '0.75rem 1.6rem',
                borderRadius: '9999px',
                background: '#FFFFFF',
                color: '#000000',
                border: '1px solid #E5E5E5',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              Back to Home
            </button>

            <button
              onClick={() => onNavigateToBookDemo && onNavigateToBookDemo('Class 10th Science Board Special')}
              style={{
                padding: '0.75rem 1.8rem',
                borderRadius: '9999px',
                background: '#000000',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>Book Demo</span>
              <ArrowRight size={15} color="#FFFFFF" />
            </button>
          </div>
        </div>

      </main>

    </div>
  );
}
