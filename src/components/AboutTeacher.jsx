import React from 'react';
import { Sparkles, GraduationCap, Award, UserCheck, ShieldCheck } from 'lucide-react';

export default function AboutTeacher() {
  return (
    <section id="about" style={{ margin: '1.5rem 0' }}>
      <div
        className="clay-card"
        style={{
          padding: '1.8rem 2.2rem',
          borderRadius: '24px',
          background: '#FFFFFF',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--clay-shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
          <Sparkles size={16} color="var(--primary-blue)" />
          <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--primary-blue)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            About Lead Educator
          </span>
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
          Abhishek Vishwakarma — <span style={{ color: 'var(--primary-blue)' }}>Science Specialist</span>
        </h3>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.2rem' }}>
          5+ years of dedicated teaching experience in CBSE secondary Science education (Classes 9th & 10th) and middle school foundation. Official CBSE Board copy correction examiner with focus on conceptual logic over rote learning.
        </p>

        {/* Credentials Pill Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          <div style={pillStyle}>
            <GraduationCap size={15} color="var(--primary-blue)" /> B.Sc. Electronics (Delhi University DU)
          </div>
          <div style={pillStyle}>
            <UserCheck size={15} color="var(--accent-emerald)" /> B.Ed & TET Qualified Educator
          </div>
          <div style={pillStyle}>
            <Award size={15} color="var(--accent-amber)" /> CBSE Board Copy Examiner Experience
          </div>
        </div>
      </div>
    </section>
  );
}

const pillStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  padding: '0.4rem 0.85rem',
  borderRadius: '10px',
  background: '#F8FAFC',
  border: '1px solid var(--border-light)',
  color: 'var(--text-primary)',
  fontSize: '0.82rem',
  fontWeight: '700',
};
