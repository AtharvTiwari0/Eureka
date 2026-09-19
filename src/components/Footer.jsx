import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'transparent',
        paddingTop: '3rem',
        paddingBottom: '1rem',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div className="container">
        
        {/* Quick Footer Navigation Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                overflow: 'hidden',
                background: '#070B19',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--clay-shadow-sm)',
              }}
            >
              <img
                src="/assets/eureka_logo.jpg"
                alt="Eureka Torchbearer Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div>
              <span style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                EUREKA <span style={{ color: 'var(--primary-blue)' }}>CLASSES</span>
              </span>
              <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                Abhishek Vishwakarma • TORCHBEARER
              </span>
            </div>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
            © {new Date().getFullYear()} Eureka Classes • Orai, Uttar Pradesh, India
          </div>
        </div>

      </div>

      {/* BLENDED BACKGROUND WATERMARK TYPOGRAPHY */}
      <div style={{ width: '100%', overflow: 'hidden', marginTop: '0.5rem', padding: '0 0.5rem' }}>
        <h2 className="blinkit-footer-text">
          EUREKA CLASSES
        </h2>
      </div>
    </footer>
  );
}
