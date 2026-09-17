import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer
      style={{
        background: '#FFFFFF',
        borderTop: '1px solid var(--border-light)',
        padding: '2.5rem 0 1.8rem 0',
      }}
    >
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.8rem' }}>
          
          {/* Brand Logo & Name */}
          <button
            onClick={() => onNavigate('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                overflow: 'hidden',
                background: '#070B19',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src="/assets/eureka_logo.jpg"
                alt="Eureka Torchbearer Official Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                EUREKA <span style={{ color: 'var(--primary-blue)' }}>CLASSES</span>
              </span>
              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                Abhishek Vishwakarma • TORCHBEARER
              </span>
            </div>
          </button>

          {/* Quick Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('home')} style={footerBtnStyle}>Home Screen</button>
            <button onClick={() => onNavigate('batches')} style={footerBtnStyle}>Batches & Timings</button>
            <button onClick={() => onNavigate('teacher')} style={footerBtnStyle}>Educator Profile</button>
            <button onClick={() => onNavigate('contact')} style={footerBtnStyle}>Location & Map</button>
          </div>

          {/* Contact Button */}
          <button
            onClick={() => onNavigate('book-demo')}
            className="btn-clay-secondary"
            style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}
          >
            <Phone size={14} /> Book Demo Class Portal
          </button>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-light)',
            paddingTop: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.8rem',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Eureka Classes • TORCHBEARER. All rights reserved.
          </div>
          <div>
            Orai, Uttar Pradesh, India
          </div>
        </div>
      </div>
    </footer>
  );
}

const footerBtnStyle = {
  color: 'var(--text-secondary)',
  background: 'none',
  border: 'none',
  fontSize: '0.88rem',
  fontWeight: '600',
  cursor: 'pointer',
  padding: '0.2rem 0.4rem',
  transition: 'color 0.2s ease',
};

