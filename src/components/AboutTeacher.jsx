import React from 'react';
import { Sparkles, GraduationCap, Award, UserCheck, Mail } from 'lucide-react';

const teachers = [
  {
    name: 'Abhishek Vishwakarma',
    role: 'Science Specialist',
    roleColor: '#1565C0',
    description: '5+ years of dedicated CBSE Science teaching for Classes 9th & 10th and all-subjects foundation for Classes 6th to 8th. CBSE Board copy correction examiner.',
    credentials: [
      { icon: <Award size={14} color="#D97706" />, label: 'M.A. Psychology' },
      { icon: <GraduationCap size={14} color="#1565C0" />, label: 'B.Sc. Electronics — DU' },
      { icon: <UserCheck size={14} color="#059669" />, label: 'B.Ed. & M.Ed.' },
      { icon: <Award size={14} color="#D97706" />, label: 'CBSE Board Examiner' },
    ],
    accentColor: '#1565C0',
    accentBg: '#EFF6FF',
  },
  {
    name: 'Manvinder Singh',
    role: 'Partner Teacher',
    roleColor: '#059669',
    description: 'Dedicated educator specializing in Zoology and Life Sciences. Brings strong academic foundation with M.Sc. Zoology and professional teaching certification.',
    credentials: [
      { icon: <GraduationCap size={14} color="#059669" />, label: 'M.Sc. Zoology' },
      { icon: <UserCheck size={14} color="#059669" />, label: 'B.Ed. Certified' },
      { icon: <Mail size={14} color="#6B7280" />, label: 'manvinders048@gmail.com' },
    ],
    accentColor: '#059669',
    accentBg: '#ECFDF5',
  },
];

export default function AboutTeacher() {
  return (
    <section id="about" style={{ margin: '1.5rem 0' }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
        <Sparkles size={16} color="var(--primary-blue)" />
        <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--primary-blue)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Meet Our Educators
        </span>
      </div>

      {/* Two-teacher grid */}
      <div className="about-teachers-grid">
        {teachers.map((teacher, i) => (
          <div
            key={i}
            className="clay-card about-teacher-card"
            style={{
              padding: '1.6rem 1.8rem',
              borderRadius: '20px',
              background: '#FFFFFF',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--clay-shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {/* Role tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.25rem 0.7rem',
                borderRadius: '9999px',
                background: teacher.accentBg,
                border: `1px solid ${teacher.accentColor}22`,
                color: teacher.accentColor,
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                width: 'fit-content',
              }}
            >
              {teacher.role}
            </div>

            {/* Name */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {teacher.name}
            </h3>

            {/* Description */}
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
              {teacher.description}
            </p>

            {/* Credential pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
              {teacher.credentials.map((cred, j) => (
                <div key={j} style={pillStyle}>
                  {cred.icon} {cred.label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .about-teachers-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }
        @media (max-width: 640px) {
          .about-teachers-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

const pillStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  padding: '0.35rem 0.75rem',
  borderRadius: '10px',
  background: '#F8FAFC',
  border: '1px solid var(--border-light)',
  color: 'var(--text-primary)',
  fontSize: '0.78rem',
  fontWeight: 700,
};
