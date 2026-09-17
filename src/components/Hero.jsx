import React from 'react';
import { PhoneCall, Sparkles, Award, GraduationCap, ArrowRight, ShieldCheck, CheckCircle2, Clock, BookOpen } from 'lucide-react';

export default function Hero({ onBookCallClick }) {
  const coreServices = [
    {
      title: 'Class 10th Science Board Special',
      time: '4:00 PM - 5:00 PM',
      badge: 'CBSE BOARD FOCUS',
      color: 'var(--primary-blue)',
      bg: 'var(--primary-blue-soft)',
      desc: 'Physics, Chemistry & Biology with CBSE Examiner answer-writing strategy.',
    },
    {
      title: 'Class 9th Science Foundation',
      time: '5:00 PM - 6:00 PM',
      badge: 'BOARD FOUNDATION',
      color: 'var(--accent-emerald)',
      bg: 'var(--accent-emerald-soft)',
      desc: 'Building solid conceptual base in Physics, Chemistry & Biology for 10th.',
    },
    {
      title: 'Classes 6th to 8th All Subjects',
      time: '3:00 PM - 4:00 PM',
      badge: 'MIDDLE SCHOOL STAR',
      color: 'var(--accent-amber)',
      bg: 'var(--accent-amber-soft)',
      desc: 'Multidisciplinary foundation in Science, Math, English & Social Science.',
    },
  ];

  return (
    <section
      style={{
        paddingTop: '8.5rem',
        paddingBottom: '5rem',
        position: 'relative',
        background: 'linear-gradient(180deg, #F1F5F9 0%, #FFFFFF 100%)',
      }}
    >
      <div className="container">
        
        {/* Main Hero 2-Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.95fr', gap: '3.5rem', alignItems: 'center' }} className="hero-grid">
          
          {/* Left Side: Clean Institutional Title */}
          <div>
            <div className="clay-badge" style={{ marginBottom: '1.2rem' }}>
              <Sparkles size={16} /> Science & Middle School Coaching
            </div>

            <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', fontWeight: '800', lineHeight: 1.15, marginBottom: '1.2rem', letterSpacing: '-0.03em' }}>
              Concept-Based Science <br />
              <span style={{ color: 'var(--primary-blue)' }}>Coaching & Foundation</span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '2.2rem', maxWidth: '580px', lineHeight: 1.65 }}>
              Expert mentorship by <strong>Abhishek Vishwakarma</strong>. Specialized CBSE Science for 
              <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}> Classes 9th & 10th </span> and foundation for 
              <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}> Classes 6th to 8th</span>.
            </p>

            {/* Credibility Highlights */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '2.5rem' }}>
              <div style={pillStyle}>
                <Award size={16} color="var(--primary-blue)" /> 5+ Years Exp (CBSE Examiner)
              </div>
              <div style={pillStyle}>
                <GraduationCap size={16} color="var(--accent-emerald)" /> B.Sc (Electronics DU) • B.Ed
              </div>
              <div style={pillStyle}>
                <ShieldCheck size={16} color="var(--accent-amber)" /> 2 Free Demo Classes
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="hero-buttons-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <button
                onClick={() => onBookCallClick('Class 10th Science Board Special')}
                className="btn-clay-primary"
                style={{ padding: '1.05rem 2.2rem', fontSize: '1.05rem' }}
              >
                <PhoneCall size={20} /> Book Free Demo Class
              </button>
              
              <a href="#batches" className="btn-clay-secondary" style={{ padding: '1.05rem 2rem', fontSize: '1.05rem' }}>
                View Batches <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Right Side: OUR 3 CORE BATCHES / SERVICES SUMMARY */}
          <div>
            <div
              className="clay-card"
              style={{
                padding: '2rem',
                borderRadius: '28px',
                background: '#FFFFFF',
                boxShadow: 'var(--clay-shadow-lg)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Our Batches & Timings
                </h3>
                <span className="clay-badge" style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>
                  Admissions Open
                </span>
              </div>

              {/* List of 3 Services Only */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {coreServices.map((service, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '1.1rem',
                      borderRadius: '16px',
                      background: service.bg,
                      border: `1px solid ${service.color}25`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '800', color: service.color, letterSpacing: '0.04em' }}>
                        {service.badge}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: service.color, fontSize: '0.82rem', fontWeight: '800' }}>
                        <Clock size={15} /> {service.time}
                      </div>
                    </div>

                    <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                      {service.title}
                    </h4>

                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {service.desc}
                    </p>

                    <button
                      onClick={() => onBookCallClick(service.title)}
                      style={{
                        alignSelf: 'flex-start',
                        marginTop: '0.3rem',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '8px',
                        background: '#FFFFFF',
                        border: `1px solid ${service.color}40`,
                        color: service.color,
                        fontWeight: '800',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <BookOpen size={14} /> Enroll In This Batch →
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: '600' }}>
                <CheckCircle2 size={16} color="var(--accent-emerald)" /> 2 Free Demo Classes Available For All Batches
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}

const pillStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.45rem 0.9rem',
  borderRadius: '12px',
  background: '#FFFFFF',
  border: '1px solid var(--border-light)',
  boxShadow: 'var(--clay-shadow-sm)',
  color: 'var(--text-primary)',
  fontSize: '0.88rem',
  fontWeight: '600',
};
