import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Users, BookOpen, Sparkles } from 'lucide-react';

export default function BatchesScreen({ onBackToHome, onNavigateToBookDemo }) {
  const [activeTab, setActiveTab] = useState('10th'); // '10th' | '9th' | 'middle'
  const [selectedExploreBatch, setSelectedExploreBatch] = useState(null);

  const batchesData = {
    '10th': {
      id: '10th',
      title: 'Class 10th Science Board Special',
      subtitle: 'Latest 2026-27 Rationalized CBSE Board Syllabus with Examiner Step-Marking Strategy.',
      fee: '₹600',
      timing: '3:00 PM - 4:30 PM Daily',
      batchSize: 'Max 15 Students per batch',
      subjects: [
        'Physics (2026-27): Light (Reflection & Refraction), Human Eye & Colourful World, Electricity, Magnetic Effects of Electric Current',
        'Chemistry (2026-27): Chemical Reactions & Equations, Acids Bases & Salts, Metals & Non-metals, Carbon & Its Compounds',
        'Biology & Environment (2026-27): Life Processes, Control & Coordination, How do Organisms Reproduce?, Heredity, Our Environment'
      ],
      features: [
        'Official CBSE Board copy correction examiner tips & keyword formatting guide',
        'Solve last 10+ Years CBSE Previous Year Question Papers (PYQs)',
        'Weekly Chapter-wise Formula Decoder tests & ray diagram speed techniques',
        '100% Doubt Resolution & 1-on-1 Student Academic Mentorship'
      ],
      detailedBreakdown: 'Designed for CBSE 2026-27 Board aspirants. Abhishek Sir teaches exact keyword answer formatting, ray diagram speed techniques, and chemical equation balancing shortcuts to ensure 95%+ marks.'
    },
    '9th': {
      id: '9th',
      title: 'Class 9th Science Foundation',
      subtitle: 'New 2026-27 NCERT "Exploration" Series Curriculum: Physics, Chemistry, Biology & Earth Science.',
      fee: '₹600',
      timing: '4:30 PM - 6:00 PM Daily',
      batchSize: 'Max 15 Students per batch',
      subjects: [
        'Physics & Earth Systems (2026-27): Motion, Force & Laws of Motion, Work Energy & Simple Machines, Sound, Earth as a System (Energy & Life)',
        'Chemistry & Matter (2026-27): World of Science Exploration, Exploring Mixtures & Separation Methods, Atoms & Molecules, Structure of an Atom',
        'Biology & Living World (2026-27): Cell (Fundamental Unit of Life), Tissues, Reproduction in Organisms, Diversity in the Living World'
      ],
      features: [
        'Build strong numerical problem-solving skills in Physics equations of motion',
        'Detailed atomic structure & chemical formula valency balancing',
        'Diagram drawing practice for Biology board foundation',
        'Regular parent-teacher progress tracking & monthly assessment'
      ],
      detailedBreakdown: 'Class 9th Science forms 60% of senior competitive physics & chemistry base. We focus on deep conceptual understanding without rote learning.'
    },
    'middle': {
      id: 'middle',
      title: 'Classes 6th to 8th All Subjects Foundation',
      subtitle: 'Comprehensive middle school foundation in NCERT 2026-27 "Curiosity" General Science, Mathematics & English.',
      fee: '₹600',
      timing: '3:00 PM - 5:00 PM Alternate Days',
      batchSize: 'Max 12 Students per batch',
      subjects: [
        'NCERT Curiosity Science (2026-27): Diversity in Living World, Mindful Eating & Health, Materials & Separation, Heat & Temperature, Motion & Measurement, Electricity, Light & Shadows, Earth Moon & Sun',
        'Mathematics (2026-27): Number Systems, Fractions & Decimals, Algebra Basics, Linear Equations, Geometry & Mensuration',
        'English & Communication (2026-27): Essential English Grammar, Vocabulary Building & Speaking Confidence'
      ],
      features: [
        'Fundamental concept building in Curiosity Science & Practical Math',
        'School homework assistance & periodic test preparation',
        'Interactive science experiments and real-life problem solving',
        'Personality development & academic confidence building'
      ],
      detailedBreakdown: 'Young minds need curiosity-driven learning. We strengthen basic math tables, scientific curiosity, and English grammar fundamentals early on.'
    }
  };

  const handleBookDemoClick = (batchTitle) => {
    if (onNavigateToBookDemo) {
      onNavigateToBookDemo(batchTitle);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#000000', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Top Navigation Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          padding: '1.2rem 2rem',
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
              gap: '0.5rem',
              color: '#6F6F6F',
              fontSize: '0.92rem',
              fontWeight: 500,
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
            onClick={() => handleBookDemoClick('Class 10th Science Board Special')}
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
      <main style={{ maxWidth: '80rem', margin: '0 auto', padding: '3.5rem 2rem 6rem 2rem' }}>
        
        {/* Page Title Header */}
        <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 3rem auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              background: '#F4F4F4',
              color: '#000000',
              fontSize: '0.82rem',
              fontWeight: 600,
              marginBottom: '1.2rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={15} color="#000000" />
            <span>2026-27 ACADEMIC BATCHES & STRUCTURE</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-1.5px',
              color: '#000000',
              marginBottom: '1.2rem',
            }}
          >
            Science Batches <br />
            <span style={{ fontStyle: 'italic', color: '#6F6F6F' }}>& Fee Breakdown</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: '#6F6F6F', lineHeight: 1.65 }}>
            Small interactive batches (Max 15 students) with dedicated 1-on-1 mentorship by Abhishek Vishwakarma.
          </p>
        </div>

        {/* 3 BATCH NAVIGATION TABS */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.8rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => setActiveTab('10th')}
            style={tabButtonStyle(activeTab === '10th')}
          >
            Class 10th Board
          </button>
          
          <button
            onClick={() => setActiveTab('9th')}
            style={tabButtonStyle(activeTab === '9th')}
          >
            Class 9th Foundation
          </button>
          
          <button
            onClick={() => setActiveTab('middle')}
            style={tabButtonStyle(activeTab === 'middle')}
          >
            Classes 6th - 8th All Subjects
          </button>
        </div>

        {/* BATCH DISPLAY CARD */}
        {(() => {
          const currentBatch = batchesData[activeTab];
          const isExplored = selectedExploreBatch === currentBatch.id;

          return (
            <div
              style={{
                maxWidth: '920px',
                margin: '0 auto',
                background: '#FFFFFF',
                border: '1px solid #E5E5E5',
                borderRadius: '24px',
                padding: '2.5rem',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
              }}
            >
              {/* Batch Card Header */}
              <div
                className="batch-card-header"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  paddingBottom: '1.8rem',
                  borderBottom: '1px solid #E5E5E5',
                  marginBottom: '1.8rem',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#6F6F6F', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    CBSE Science Program (2026-27)
                  </span>
                  <h2 style={{ fontSize: '2.2rem', fontFamily: "'Instrument Serif', Georgia, serif", color: '#000000', margin: '0.3rem 0 0.5rem 0' }}>
                    {currentBatch.title}
                  </h2>
                  <p style={{ fontSize: '1rem', color: '#6F6F6F', maxWidth: '540px', lineHeight: 1.55 }}>
                    {currentBatch.subtitle}
                  </p>
                </div>

                {/* Price Tag Box */}
                <div
                  style={{
                    background: '#F8FAFC',
                    border: '1.5px solid #000000',
                    borderRadius: '18px',
                    padding: '1rem 1.6rem',
                    textAlign: 'center',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                  }}
                >
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6F6F6F', textTransform: 'uppercase' }}>
                    Monthly Fee
                  </div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#000000', lineHeight: 1.1 }}>
                    {currentBatch.fee}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700, marginTop: '0.2rem' }}>
                    Per Month • No Hidden Charges
                  </div>
                </div>
              </div>

              {/* Timing & Batch Size Row */}
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', fontWeight: 600, color: '#000000' }}>
                  <Clock size={18} color="#000000" />
                  <span>{currentBatch.timing}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', fontWeight: 600, color: '#000000' }}>
                  <Users size={18} color="#000000" />
                  <span>{currentBatch.batchSize}</span>
                </div>
              </div>

              {/* Latest 2026-27 NCERT Syllabus Chapters List */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#000000', marginBottom: '0.8rem' }}>
                  Latest 2026-27 NCERT Syllabus & Chapters:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {currentBatch.subjects.map((sub, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.92rem', color: '#000000', lineHeight: 1.5 }}>
                      <BookOpen size={17} color="#000000" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features List */}
              <div style={{ marginBottom: '2.2rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#000000', marginBottom: '0.8rem' }}>
                  Key Batch Features:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }} className="method-grid-responsive">
                  {currentBatch.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: '#6F6F6F' }}>
                      <CheckCircle2 size={16} color="#000000" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded Detailed Breakdown */}
              {isExplored && (
                <div
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E5E5E5',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    marginBottom: '2rem',
                    animation: 'fadeIn 0.25s ease-out',
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#000000', marginBottom: '0.5rem' }}>
                    Detailed Batch Mentorship Overview
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: '#6F6F6F', lineHeight: 1.6 }}>
                    {currentBatch.detailedBreakdown}
                  </p>
                </div>
              )}

              {/* Action Buttons: Explore Details + Redirect to Dedicated Booking Screen */}
              <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                
                <button
                  onClick={() => setSelectedExploreBatch(isExplored ? null : currentBatch.id)}
                  style={{
                    padding: '0.85rem 1.8rem',
                    borderRadius: '9999px',
                    background: isExplored ? '#000000' : '#F4F4F4',
                    color: isExplored ? '#FFFFFF' : '#000000',
                    border: '1px solid #E5E5E5',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isExplored ? 'Hide Details' : 'Explore Batch Details'}
                </button>

                <button
                  onClick={() => handleBookDemoClick(currentBatch.title)}
                  style={{
                    padding: '0.85rem 2.2rem',
                    borderRadius: '9999px',
                    background: '#000000',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.15)',
                  }}
                >
                  <span>Book Seat ({currentBatch.fee}/mo)</span>
                  <ArrowRight size={16} color="#FFFFFF" />
                </button>

              </div>

            </div>
          );
        })()}

      </main>

    </div>
  );
}

const tabButtonStyle = (isActive) => ({
  padding: '0.75rem 1.8rem',
  borderRadius: '9999px',
  background: isActive ? '#000000' : '#F4F4F4',
  color: isActive ? '#FFFFFF' : '#000000',
  border: isActive ? 'none' : '1px solid #E5E5E5',
  fontWeight: 600,
  fontSize: '0.95rem',
  fontFamily: "'Inter', sans-serif",
  cursor: 'pointer',
  transition: 'all 0.25s ease',
  boxShadow: isActive ? '0 4px 14px rgba(0,0,0,0.15)' : 'none',
});
