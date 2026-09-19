import React from 'react';
import { ShieldCheck, Star, Sparkles, Lock } from 'lucide-react';

export default function Testimonials() {
  const verifiedReviews = [
    {
      id: 1,
      name: 'Aarav Sharma',
      role: 'Class 10th CBSE Board',
      rating: 5,
      comment: 'Abhishek Sir\'s conceptual method saved my Physics & Chemistry! Scored 96% in Science board exam.',
      date: 'Verified Admission',
    },
    {
      id: 2,
      name: 'Priya Verma (Parent)',
      role: 'Parent of Aniket (Class 9th)',
      rating: 5,
      comment: 'Best teacher in Orai for Science! Aniket used to fear Physics numericals, now he loves solving them.',
      date: 'Verified Parent',
    },
    {
      id: 3,
      name: 'Rohan Gupta',
      role: 'Class 10th CBSE Board',
      rating: 5,
      comment: 'The CBSE spot copy evaluation tips given by Sir helped me format answer keywords perfectly in Board papers!',
      date: 'Verified Admission',
    },
    {
      id: 4,
      name: 'Sneha Patel',
      role: 'Class 9th Foundation',
      rating: 5,
      comment: 'No rote learning at all! Every chemical equation and diagram is explained with practical real-life examples.',
      date: 'Verified Student',
    },
    {
      id: 5,
      name: 'Vikram Singh (Parent)',
      role: 'Parent of Class 8th Student',
      rating: 5,
      comment: 'Middle school foundation for my son improved drastically. Regular assessment tests keep parents informed.',
      date: 'Verified Parent',
    },
    {
      id: 6,
      name: 'Aditya Srivastava',
      role: 'Class 10th CBSE Board',
      rating: 5,
      comment: 'Biology diagrams and NCERT key concepts were memorized effortlessly in classroom sessions. Highly recommended!',
      date: 'Verified Admission',
    },
  ];

  return (
    <section id="feedback" style={{ margin: '2.5rem 0' }}>
      <div>
        
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.8rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <ShieldCheck size={18} color="var(--primary-blue)" />
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--primary-blue)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Verified Student Reviews
              </span>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              Student & Parent Testimonials
            </h3>
          </div>

          <div className="clay-badge" style={{ fontSize: '0.75rem', background: '#F8FAFC', color: 'var(--text-muted)', border: '1px solid var(--border-light)' }}>
            <Lock size={13} color="var(--accent-amber)" /> Admin Verified Reviews Hub
          </div>
        </div>

        {/* 6-Card Horizontal Grid Layout (No Search Bar) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }} className="testimonials-6-grid">
          {verifiedReviews.map((rev) => (
            <div
              key={rev.id}
              className="clay-card"
              style={{
                padding: '1.4rem',
                borderRadius: '20px',
                background: '#FFFFFF',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--clay-shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#D97706" color="#D97706" />
                    ))}
                  </div>
                  <span className="clay-badge" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', background: 'var(--accent-emerald-soft)', color: 'var(--accent-emerald)' }}>
                    {rev.date}
                  </span>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.55, marginBottom: '1rem', fontStyle: 'italic' }}>
                  "{rev.comment}"
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '0.6rem' }}>
                <div style={{ fontWeight: '800', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  {rev.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                  {rev.role}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .testimonials-6-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .testimonials-6-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
