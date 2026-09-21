import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, Download, Award, GraduationCap, UserCheck, ShieldCheck, Sparkles, X, CheckCircle2 } from 'lucide-react';

export default function MeetTeacherScreen({ onBackToHome, onBookCallClick }) {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#000000', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Top Navigation Bar */}
      <header
        className="subscreen-header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          padding: '0.85rem 1.5rem',
        }}
      >
        <div
          className="subscreen-header-inner"
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
        >
          {/* Back Button — Arrow Only */}
          <button
            onClick={onBackToHome}
            style={{
              background: '#F3F4F6',
              border: '1px solid #E5E7EB',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '9999px',
              flexShrink: 0,
              transition: 'background 0.2s ease',
            }}
            className="subscreen-back-btn"
            title="Back to Home"
          >
            <ArrowLeft size={18} color="#000000" />
          </button>

          {/* Brand Logo */}
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

          {/* Book Demo CTA Button */}
          <button
            onClick={() => onBookCallClick('Class 10th Science Board Special')}
            className="subscreen-cta-btn"
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
            <span>Book 2 Free Demos</span>
            <ArrowRight size={15} color="#FFFFFF" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '80rem', margin: '0 auto', padding: '3.5rem 2rem 6rem 2rem' }}>
        
        {/* Title Header */}
        <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 4rem auto' }}>
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
            <span>LEAD SCIENCE EDUCATOR PROFILE</span>
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
            Abhishek Vishwakarma <br />
            <span style={{ fontStyle: 'italic', color: '#6F6F6F' }}>Science & Foundation Educator</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: '#6F6F6F', lineHeight: 1.65 }}>
            5+ years of dedicated Science teaching experience — Classes 9th & 10th (CBSE Science) 
            and all-subjects foundation for Classes 6th to 8th. Currently at Morning Star Senior Secondary Academy, Orai, U.P.
          </p>
        </div>

        {/* Teacher Profile & Credentials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 420px) 1fr',
            gap: '3.5rem',
            alignItems: 'start',
            marginBottom: '4.5rem',
          }}
          className="teacher-grid-responsive"
        >
          {/* Left Column: Teacher Portrait Photo & Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.12)',
                border: '1px solid #E5E5E5',
                background: '#F8FAFC',
              }}
            >
              <img
                src="/assets/abhishek_sir.jpg"
                alt="Abhishek Vishwakarma - Lead Educator"
                style={{
                  width: '100%',
                  maxHeight: '520px',
                  objectFit: 'contain',
                  objectPosition: 'top center',
                  background: '#F1F5F9',
                  display: 'block',
                  borderRadius: '24px 24px 0 0',
                }}
              />
              
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.85) 100%)',
                  padding: '1.5rem 1.2rem 1.2rem 1.2rem',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Abhishek Vishwakarma</div>
                <div style={{ fontSize: '0.85rem', color: '#E2E8F0', marginTop: '0.2rem' }}>
                  Science Specialist & CBSE Examiner
                </div>
              </div>
            </div>

            {/* Resume Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <button
                onClick={() => setResumeModalOpen(true)}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: '14px',
                  background: '#000000',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                  transition: 'transform 0.2s ease',
                }}
                className="hover:scale-105"
              >
                <Eye size={17} />
                <span>View Resume</span>
              </button>

              <a
                href="/assets/abhishek_sir_resume.jpg"
                download="Abhishek_Vishwakarma_Resume.jpg"
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: '14px',
                  background: '#F4F4F4',
                  color: '#000000',
                  border: '1px solid #E5E5E5',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease',
                }}
              >
                <Download size={17} color="#000000" />
                <span>Download CV</span>
              </a>
            </div>

          </div>

          {/* Right Column: Detailed Credentials & Teaching Highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Qualification Badges */}
            <div>
              <h3 style={{ fontSize: '1.5rem', fontFamily: "'Instrument Serif', Georgia, serif", color: '#000000', marginBottom: '1rem' }}>
                Academic Credentials & Qualifications
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={credCardStyle}>
                  <div style={iconBoxStyle}>
                    <Award size={22} color="#000000" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#000000' }}>
                      M.A. Psychology — Post Graduate
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#6F6F6F', marginTop: '0.2rem' }}>
                      Post graduation with specialization in Psychology.
                    </div>
                  </div>
                </div>

                <div style={credCardStyle}>
                  <div style={iconBoxStyle}>
                    <GraduationCap size={22} color="#000000" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#000000' }}>
                      B.Sc. Electronics (Delhi University — DU)
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#6F6F6F', marginTop: '0.2rem' }}>
                      Graduated with honors in Electronics from prestigious Delhi University.
                    </div>
                  </div>
                </div>

                <div style={credCardStyle}>
                  <div style={iconBoxStyle}>
                    <UserCheck size={22} color="#000000" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#000000' }}>
                      B.Ed. &amp; M.Ed. — Teacher Training
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#6F6F6F', marginTop: '0.2rem' }}>
                      Bachelor of Education (completed) and Master of Education (pursuing) — certified pedagogical training.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Teaching Methodology */}
            <div>
              <h3 style={{ fontSize: '1.5rem', fontFamily: "'Instrument Serif', Georgia, serif", color: '#000000', marginBottom: '1rem' }}>
                Why Students Excel Under Abhishek Sir's Guidance
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="method-grid-responsive">
                <div style={featureBoxStyle}>
                  <CheckCircle2 size={18} color="#000000" style={{ marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#000000' }}>CBSE Examiner Secrets</div>
                    <div style={{ fontSize: '0.82rem', color: '#6F6F6F', lineHeight: 1.4, marginTop: '0.2rem' }}>
                      Learn exact keyword formatting and diagram techniques to maximize step marking.
                    </div>
                  </div>
                </div>

                <div style={featureBoxStyle}>
                  <CheckCircle2 size={18} color="#000000" style={{ marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#000000' }}>Zero Rote Memorization</div>
                    <div style={{ fontSize: '0.82rem', color: '#6F6F6F', lineHeight: 1.4, marginTop: '0.2rem' }}>
                      Focus on 100% conceptual clarity in Physics, Chemistry & Biology.
                    </div>
                  </div>
                </div>

                <div style={featureBoxStyle}>
                  <CheckCircle2 size={18} color="#000000" style={{ marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#000000' }}>Small Batch Focus (Max 15)</div>
                    <div style={{ fontSize: '0.82rem', color: '#6F6F6F', lineHeight: 1.4, marginTop: '0.2rem' }}>
                      Every student receives personalized attention and 1-on-1 doubt resolution.
                    </div>
                  </div>
                </div>

                <div style={featureBoxStyle}>
                  <CheckCircle2 size={18} color="#000000" style={{ marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#000000' }}>100% PYQ Practice</div>
                    <div style={{ fontSize: '0.82rem', color: '#6F6F6F', lineHeight: 1.4, marginTop: '0.2rem' }}>
                      Solve last 10 years CBSE board exam question papers before final exams.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Call to Action Card */}
            <div
              style={{
                background: '#F8FAFC',
                border: '1px solid #E5E5E5',
                borderRadius: '20px',
                padding: '1.6rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.2rem',
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#000000' }}>
                  Experience Classroom Mentorship Live
                </div>
                <div style={{ fontSize: '0.88rem', color: '#6F6F6F', marginTop: '0.2rem' }}>
                  Book 2 Free Demo Classes before taking admission.
                </div>
              </div>

              <button
                onClick={() => onBookCallClick('Class 10th Science Board Special')}
                style={{
                  background: '#000000',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.75rem 1.6rem',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>Book Free Demos</span>
                <ArrowRight size={16} color="#FFFFFF" />
              </button>
            </div>

          </div>
        </div>

      </main>

      {/* FULLSCREEN RESUME VIEW MODAL */}
      {resumeModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          {/* Modal Top Bar */}
          <div
            style={{
              width: '100%',
              maxWidth: '900px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              color: '#FFFFFF',
            }}
          >
            <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              Abhishek Vishwakarma — Official Resume
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <a
                href="/assets/abhishek_sir_resume.jpg"
                download="Abhishek_Vishwakarma_Resume.jpg"
                style={{
                  background: '#FFFFFF',
                  color: '#000000',
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <Download size={15} color="#000000" />
                <span>Download</span>
              </a>

              <button
                onClick={() => setResumeModalOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: '#FFFFFF',
                  padding: '0.45rem',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Modal Resume Image Container */}
          <div
            style={{
              maxWidth: '900px',
              maxHeight: '82vh',
              overflow: 'auto',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
              background: '#FFFFFF',
            }}
          >
            <img
              src="/assets/abhishek_sir_resume.jpg"
              alt="Abhishek Vishwakarma Full Resume Document"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .teacher-grid-responsive {
            grid-template-columns: 1fr !important;
          }
          .method-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}

const credCardStyle = {
  background: '#F8FAFC',
  border: '1px solid #E5E5E5',
  borderRadius: '16px',
  padding: '1.2rem',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1rem',
};

const iconBoxStyle = {
  width: '44px',
  height: '44px',
  borderRadius: '12px',
  background: '#FFFFFF',
  border: '1px solid #E5E5E5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const featureBoxStyle = {
  background: '#FFFFFF',
  border: '1px solid #E5E5E5',
  borderRadius: '14px',
  padding: '1rem',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.75rem',
};
