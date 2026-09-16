import React, { useState } from 'react';
import { BookOpen, Clock, CheckCircle2, Sparkles, PhoneCall, ChevronRight, Award, Zap, FileText } from 'lucide-react';

export default function Batches({ onSelectBatch }) {
  const [activeTab, setActiveTab] = useState('class-10');

  const batches = {
    'class-10': {
      id: 'class-10',
      title: 'Class 10th Science Board Special',
      subtitle: 'Complete CBSE Board Preparation & Step-Marking Strategy',
      badge: 'CBSE BOARD SPECIAL',
      accentColor: 'var(--primary-blue)',
      badgeBg: 'var(--primary-blue-soft)',
      timing: '4:00 PM - 5:00 PM (Monday to Saturday)',
      mode: 'Offline Center & Live Hybrid',
      subjects: ['Physics', 'Chemistry', 'Biology'],
      features: [
        'Complete CBSE Board Class 10th Syllabus Coverage',
        'Official CBSE Copy Evaluator Answer-Writing Tips',
        'Chapter-wise PYQs (Previous 10 Years Board Papers)',
        'Weekly Assessment Tests & Detailed Parent Progress Reports',
        'Special Fast-Track Board Revision & Formula Sheets'
      ],
      outcomes: [
        'Target 95%+ Marks in CBSE Board Science',
        'Master Board Answer Keyword Formatting',
        'Speed & Accuracy in Science Numericals'
      ]
    },
    'class-9': {
      id: 'class-9',
      title: 'Class 9th Science Concept Foundation',
      badge: 'FOUNDATION SPECIAL',
      accentColor: 'var(--accent-emerald)',
      badgeBg: 'var(--accent-emerald-soft)',
      subtitle: 'Building Solid Conceptual Base for Class 10th Board Success',
      timing: '5:00 PM - 6:00 PM (Monday to Saturday)',
      mode: 'Offline Center & Live Hybrid',
      subjects: ['Physics', 'Chemistry', 'Biology'],
      features: [
        'Deep Conceptual Understanding of NCERT Science',
        'Interactive Visual Diagram & Model Demonstrations',
        'Daily Practice Problems (DPP) & Chapter Handouts',
        'Numerical & Problem Solving Logic Building',
        'Regular Progress Evaluation & Olympiad Foundation'
      ],
      outcomes: [
        'Strong Foundation for Class 10th & Board Prep',
        'Eliminate Science & Numerical Fear',
        'Concept Clarity over Rote Learning'
      ]
    },
    'middle-school': {
      id: 'middle-school',
      title: 'Classes 6th to 8th All Subjects',
      badge: 'MIDDLE SCHOOL FOUNDATION',
      accentColor: 'var(--accent-amber)',
      badgeBg: 'var(--accent-amber-soft)',
      subtitle: 'Multidisciplinary Foundation & Academic Excellence',
      timing: '3:00 PM - 4:00 PM (Monday to Saturday)',
      mode: 'Offline Center & Live Hybrid',
      subjects: ['Science', 'Mathematics', 'English', 'Social Science', 'Hindi'],
      features: [
        'Comprehensive Coverage of All Middle School Subjects',
        'Strong Base in Mathematics & Logical Reasoning',
        'School Exam Preparation & Daily Homework Support',
        'Interactive & Engaging Classroom Environment',
        'Individual Student Focus & Personality Growth'
      ],
      outcomes: [
        'Top Marks in Middle School Exams',
        'Strong Mathematical & Science Logic',
        'Habit of Structured Regular Studying'
      ]
    }
  };

  const currentBatch = batches[activeTab];

  return (
    <section id="batches" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem auto' }}>
          <div className="clay-badge" style={{ marginBottom: '1rem' }}>
            <Sparkles size={16} /> Academic Programs 2026-27
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: '800', marginBottom: '0.8rem' }}>
            Explore Our <span style={{ color: 'var(--primary-blue)' }}>Classroom Batches</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            Select your class below to view batch timing, subject breakdown, and learning outcomes.
          </p>
        </div>

        {/* Interactive Segmented Tab Selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            gap: '0.8rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            { id: 'class-10', label: 'Class 10th Science', sub: '4:00 - 5:00 PM' },
            { id: 'class-9', label: 'Class 9th Science', sub: '5:00 - 6:00 PM' },
            { id: 'middle-school', label: 'Classes 6th - 8th All Subjects', sub: '3:00 - 4:00 PM' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.9rem 1.6rem',
                borderRadius: '16px',
                border: activeTab === tab.id ? `2px solid ${batches[tab.id].accentColor}` : '1px solid var(--border-light)',
                background: activeTab === tab.id ? batches[tab.id].badgeBg : '#FFFFFF',
                color: activeTab === tab.id ? batches[tab.id].accentColor : 'var(--text-secondary)',
                fontWeight: '800',
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: activeTab === tab.id ? 'var(--clay-shadow-md)' : 'var(--clay-shadow-sm)',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.2rem',
              }}
            >
              <span>{tab.label}</span>
              <span style={{ fontSize: '0.78rem', opacity: 0.8, fontWeight: '600' }}>{tab.sub}</span>
            </button>
          ))}
        </div>

        {/* Active Program Showcase Card */}
        <div
          className="clay-card"
          style={{
            padding: '2.5rem',
            borderRadius: '28px',
            background: '#FFFFFF',
            border: `1px solid ${currentBatch.accentColor}30`,
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'flex-start' }} className="program-grid">
            
            {/* Left Side: Program Overview & Features */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                <span
                  style={{
                    background: currentBatch.badgeBg,
                    color: currentBatch.accentColor,
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '8px',
                    letterSpacing: '0.04em',
                  }}
                >
                  {currentBatch.badge}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: '700' }}>
                  <Clock size={16} color={currentBatch.accentColor} /> {currentBatch.timing}
                </div>
              </div>

              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                {currentBatch.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1.8rem' }}>
                {currentBatch.subtitle}
              </p>

              {/* Subjects Pills */}
              <div style={{ marginBottom: '1.8rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>
                  Subjects Covered:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {currentBatch.subjects.map((sub, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '0.4rem 1rem',
                        borderRadius: '10px',
                        background: '#F1F5F9',
                        color: 'var(--text-primary)',
                        fontSize: '0.88rem',
                        fontWeight: '700',
                        border: '1px solid var(--border-light)',
                      }}
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Course Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.2rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Key Batch Features:
                </span>
                {currentBatch.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem' }}>
                    <CheckCircle2 size={18} color={currentBatch.accentColor} style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '500' }}>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onSelectBatch(currentBatch.title)}
                className="btn-clay-primary"
                style={{
                  background: currentBatch.accentColor,
                  padding: '1rem 2.2rem',
                  fontSize: '1.05rem',
                }}
              >
                <PhoneCall size={18} /> Enroll In {currentBatch.title}
              </button>
            </div>

            {/* Right Side: Key Learning Outcomes Box */}
            <div
              style={{
                padding: '2rem',
                borderRadius: '20px',
                background: '#F8FAFC',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
                  <Award size={22} color={currentBatch.accentColor} />
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Target Learning Outcomes</h4>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  {currentBatch.outcomes.map((out, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '0.9rem 1.1rem',
                        borderRadius: '12px',
                        background: '#FFFFFF',
                        border: '1px solid var(--border-light)',
                        boxShadow: 'var(--clay-shadow-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                      }}
                    >
                      <Zap size={18} color={currentBatch.accentColor} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-primary)' }}>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  background: currentBatch.badgeBg,
                  border: `1px solid ${currentBatch.accentColor}30`,
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: '800', color: currentBatch.accentColor, marginBottom: '0.2rem' }}>
                  🎓 2 Free Demo Classes
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Attend two full classes free of cost to experience Abhishek Sir's conceptual teaching before taking admission.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .program-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
