import React from 'react';
import { ChevronDown, Award, GraduationCap, MapPin, Star } from 'lucide-react';

export default function Hero({ onBookCallClick }) {

  return (
    <section
      className="hero-section-responsive"
      style={{
        position: 'relative',
        minHeight: '82vh',
        width: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
        background: 'linear-gradient(135deg, #1a1a6e 0%, #2d2d8f 20%, #1565C0 50%, #0288D1 75%, #00ACC1 100%)',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Background decorative orbs */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Top-right large orb */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100,181,246,0.25) 0%, transparent 70%)',
        }} />
        {/* Bottom-left orb */}
        <div style={{
          position: 'absolute',
          bottom: '-60px',
          left: '-60px',
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,188,212,0.2) 0%, transparent 70%)',
        }} />
        {/* Center glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '40%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.05) 0%, transparent 70%)',
        }} />
        {/* Floating dots pattern */}
        {[
          { top: '15%', left: '8%', size: 6, opacity: 0.25 },
          { top: '70%', left: '5%', size: 4, opacity: 0.2 },
          { top: '30%', right: '12%', size: 5, opacity: 0.2 },
          { top: '80%', right: '8%', size: 7, opacity: 0.15 },
          { top: '50%', left: '15%', size: 3, opacity: 0.3 },
          { top: '20%', right: '30%', size: 4, opacity: 0.2 },
        ].map((dot, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: dot.top,
            left: dot.left,
            right: dot.right,
            width: dot.size,
            height: dot.size,
            borderRadius: '50%',
            background: '#FFFFFF',
            opacity: dot.opacity,
          }} />
        ))}
      </div>

      {/* Grid overlay lines (subtle) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Main Content */}
      <div
        className="hero-content-responsive"
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '3.5rem',
          paddingBottom: '5rem',
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
          maxWidth: '72rem',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Location pill */}
        <div
          className="animate-fade-rise hero-location-pill"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.38rem 1rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255,255,255,0.25)',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            color: 'rgba(255,255,255,0.85)',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '1.6rem',
            maxWidth: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <MapPin size={12} color="rgba(255,255,255,0.85)" style={{ flexShrink: 0 }} />
          <span className="pill-full">Orai, Uttar Pradesh — CBSE Science Coaching</span>
          <span className="pill-short">Orai, UP • CBSE Coaching</span>
        </div>

        {/* Main Heading */}
        <h1
          className="animate-fade-rise hero-heading-responsive"
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 5.8rem)',
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-1.5px',
            color: '#FFFFFF',
            margin: '0 0 1.6rem 0',
            maxWidth: '16ch',
            textShadow: '0 2px 20px rgba(0,0,0,0.2)',
          }}
        >
          Specialized<br />
          CBSE Science<br />
          <span style={{ color: 'rgba(186,225,255,0.7)', fontStyle: 'italic' }}>
            & Foundation Coaching
          </span>
        </h1>

        {/* Accent divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.6rem',
        }}>
          <div style={{ width: '36px', height: '2px', background: 'rgba(255,255,255,0.5)', borderRadius: '2px' }} />
          <Star size={10} color="rgba(255,255,255,0.5)" fill="rgba(255,255,255,0.5)" />
          <div style={{ width: '12px', height: '2px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px' }} />
        </div>

        {/* Subtitle */}
        <p
          className="animate-fade-rise-delay"
          style={{
            fontSize: 'clamp(1rem, 1.3vw, 1.12rem)',
            fontFamily: "'Inter', sans-serif",
            color: 'rgba(220,240,255,0.8)',
            maxWidth: '40rem',
            lineHeight: 1.8,
            fontWeight: 400,
            margin: '0 0 2.5rem 0',
          }}
        >
          Concept-based coaching by{' '}
          <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>
            Abhishek Vishwakarma
          </strong>
          {' '}— 5 years of dedicated Science teaching. CBSE Board preparation for Classes 9th & 10th and all-subjects foundation for Classes 6th to 8th.
        </p>

        {/* Credential pills */}
        <div
          className="animate-fade-rise-delay"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.55rem',
            marginBottom: '3.5rem',
          }}
        >
          {[
            { label: 'M.A. Psychology', color: 'rgba(100,181,246,0.2)', border: 'rgba(100,181,246,0.35)' },
            { label: 'B.Sc. Electronics — DU', color: 'rgba(129,212,250,0.15)', border: 'rgba(129,212,250,0.3)' },
            { label: 'B.Ed. & M.Ed.', color: 'rgba(77,208,225,0.15)', border: 'rgba(77,208,225,0.3)' },
            { label: 'TET Qualified', color: 'rgba(178,235,242,0.12)', border: 'rgba(178,235,242,0.25)' },
            { label: 'CBSE Board Examiner', color: 'rgba(224,247,250,0.1)', border: 'rgba(224,247,250,0.22)' },
          ].map((pill, i) => (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.38rem 0.85rem',
                borderRadius: '9999px',
                border: `1px solid ${pill.border}`,
                background: pill.color,
                backdropFilter: 'blur(4px)',
                color: 'rgba(220,240,255,0.85)',
                fontSize: '0.78rem',
                fontWeight: 500,
              }}
            >
              {pill.label}
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div
          className="animate-fade-rise-delay-2 hero-stats-row"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            paddingTop: '1.8rem',
            borderTop: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          {[
            { num: '5+', label: 'Years Teaching' },
            { num: '3', label: 'Batch Programs' },
            { num: '₹600', label: 'Monthly Fee' },
            { num: '15', label: 'Max Batch Size' },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '-1px',
              }}>
                {stat.num}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: 'rgba(186,225,255,0.6)',
                marginTop: '0.3rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        onClick={() => {
          const el = document.getElementById('decoders');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="animate-fade-rise-delay-2 scroll-indicator-btn"
        style={{
          position: 'absolute',
          bottom: '1.8rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: '0.68rem', color: 'rgba(186,225,255,0.45)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Explore
        </span>
        <ChevronDown size={16} color="rgba(186,225,255,0.45)" style={{ animation: 'bounceDown 1.5s ease-in-out infinite' }} />
      </div>

      <style>{`
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        .scroll-indicator-btn:hover { opacity: 0.7; }
        .aethera-nav-cta:hover {
          transform: scale(1.03);
          background: #1A1A1A !important;
        }

        /* Mobile: always show short pill text */
        .pill-short { display: none; }
        @media (max-width: 480px) {
          .pill-full { display: none; }
          .pill-short { display: inline; }

          /* Tighter heading on tiny phones */
          .hero-heading-responsive {
            letter-spacing: -0.5px !important;
            line-height: 1.08 !important;
          }

          /* Stats row: 2x2 grid on mobile */
          .hero-stats-row {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 1.2rem 1.5rem !important;
          }

          /* Credential pills smaller */
          .hero-pills-row > div {
            font-size: 0.72rem !important;
            padding: 0.3rem 0.65rem !important;
          }

          /* Hide decorative orbs on tiny phones */
          .hero-orb { display: none !important; }
        }

        @media (max-width: 360px) {
          .hero-content-responsive {
            padding-left: 0.9rem !important;
            padding-right: 0.9rem !important;
          }
          .hero-location-pill {
            font-size: 0.7rem !important;
            padding: 0.3rem 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}
