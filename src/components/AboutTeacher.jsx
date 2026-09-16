import React, { useState } from 'react';
import { Award, BookOpen, CheckCircle, FileText, GraduationCap, Sparkles, UserCheck, X, Download } from 'lucide-react';

export default function AboutTeacher() {
  const [showResumeModal, setShowResumeModal] = useState(false);

  const resumeUrl = '/assets/abhishek_sir_resume.jpg';

  return (
    <section id="about" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="clay-badge" style={{ marginBottom: '1rem' }}>
            <Sparkles size={16} /> Educator Spotlight
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: '800', marginBottom: '0.8rem' }}>
            Meet Your Teacher: <span style={{ color: 'var(--primary-blue)' }}>Abhishek Vishwakarma</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            5+ years of dedicated teaching experience in CBSE secondary Science education and middle school multidisciplinary foundation.
          </p>
        </div>

        {/* Dedicated Teacher Card Grid: Photo & Full Profile */}
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '2.5rem', alignItems: 'stretch' }} className="teacher-grid">
          
          {/* Left: Teacher Portrait & Quick Summary */}
          <div
            className="clay-card"
            style={{
              padding: '1.5rem',
              borderRadius: '28px',
              background: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '380px',
                borderRadius: '20px',
                overflow: 'hidden',
                background: '#F1F5F9',
                marginBottom: '1.2rem',
              }}
            >
              <img
                src="/assets/abhishek_sir.jpg"
                alt="Abhishek Vishwakarma Sir"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, transparent 55%)',
                }}
              />
              <div style={{ position: 'absolute', bottom: '1rem', left: '1.2rem', right: '1.2rem', color: '#FFF' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#FFF' }}>
                  Abhishek Vishwakarma
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#93C5FD', fontWeight: '600' }}>
                  Science Teacher (9th & 10th) • Middle School Specialist
                </p>
              </div>
            </div>

            {/* Resume Actions: View & Download */}
            <div className="teacher-resume-actions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              <button
                onClick={() => setShowResumeModal(true)}
                className="btn-clay-secondary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.75rem', fontSize: '0.85rem' }}
              >
                <FileText size={16} color="var(--primary-blue)" /> View Resume
              </button>

              <a
                href={resumeUrl}
                download="Abhishek_Vishwakarma_Resume.jpg"
                className="btn-clay-primary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.75rem', fontSize: '0.85rem', textDecoration: 'none' }}
              >
                <Download size={16} /> Download
              </a>
            </div>
          </div>

          {/* Right: Qualifications & Experience Details */}
          <div className="clay-card" style={{ padding: '2.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.2rem', color: 'var(--text-primary)' }}>
                Educational Qualifications & Experience
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.8rem' }}>
                <div style={qualItemStyle}>
                  <GraduationCap size={22} color="var(--primary-blue)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.98rem' }}>B.Sc. in Electronics (Delhi University)</strong>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Delhi University (DU) • Core Physics & Technical Principles</span>
                  </div>
                </div>

                <div style={qualItemStyle}>
                  <CheckCircle size={20} color="var(--primary-blue)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.98rem' }}>B.Ed. & Teacher Eligibility Test (TET Qualified)</strong>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Certified Pedagogy & Professional Classroom Management</span>
                  </div>
                </div>

                <div style={qualItemStyle}>
                  <CheckCircle size={20} color="var(--primary-blue)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.98rem' }}>M.A. (Psychology) & M.Ed. (Pursuing)</strong>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Understanding Individual Student Learning Pace</span>
                  </div>
                </div>

                <div style={expBadgeStyle}>
                  <UserCheck size={20} color="var(--accent-amber)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.98rem' }}>CBSE Board Copy Examiner & Invigilator</strong>
                    <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                      Morning Star Sr. Sec. Academy Educator. Direct experience in official CBSE spot copy correction & evaluation.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '0.9rem 1.1rem',
                borderRadius: '14px',
                background: 'var(--primary-blue-soft)',
                border: '1px solid rgba(37, 99, 235, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
              }}
            >
              <Sparkles size={20} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontStyle: 'italic', fontWeight: '500' }}>
                "Ratta Nahi, Concept Samjho! Every student can master Science when taught with logic."
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Verified Resume Modal */}
      {showResumeModal && (
        <div className="modal-overlay" onClick={() => setShowResumeModal(false)}>
          <div
            className="clay-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '820px',
              width: '92%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '1.5rem',
              borderRadius: '24px',
              position: 'relative',
              background: '#FFFFFF',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.8rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>Abhishek Vishwakarma - Official Resume</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Verified Credentials & Certifications</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <a
                  href={resumeUrl}
                  download="Abhishek_Vishwakarma_Resume.jpg"
                  className="btn-clay-primary"
                  style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <Download size={14} /> Download File
                </a>

                <button
                  onClick={() => setShowResumeModal(false)}
                  style={{ background: 'var(--bg-page)', border: 'none', color: 'var(--text-primary)', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <img
              src={resumeUrl}
              alt="Abhishek Sir Verified Resume"
              style={{ width: '100%', borderRadius: '16px', border: '1px solid var(--border-light)' }}
            />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 868px) {
          .teacher-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .teacher-resume-actions { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

const qualItemStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.8rem',
  padding: '0.75rem 1rem',
  borderRadius: '12px',
  background: '#F8FAFC',
  border: '1px solid var(--border-light)',
};

const expBadgeStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.8rem',
  padding: '1rem',
  borderRadius: '14px',
  background: 'var(--accent-amber-soft)',
  border: '1px solid rgba(217, 119, 6, 0.15)',
};
