import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ onBookCallClick }) {
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
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
          </div>

          {/* Quick Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="#about" style={footerLinkStyle}>Educator Profile</a>
            <a href="#batches" style={footerLinkStyle}>Batches & Timings</a>
            <a href="#feedback" style={footerLinkStyle}>Quality Guarantee</a>
            <a href="#contact" style={footerLinkStyle}>Location & Map</a>
          </div>

          {/* Contact Button */}
          <button
            onClick={() => onBookCallClick('Class 10th Science Board Special')}
            className="btn-clay-secondary"
            style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}
          >
            <Phone size={14} /> Contact +91 9452184870
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

const footerLinkStyle = {
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  fontSize: '0.88rem',
  fontWeight: '600',
  transition: 'color 0.2s ease',
};
