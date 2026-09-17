import React, { useState, useEffect } from 'react';
import { PhoneCall, Menu, X, BookOpen, User, MapPin, MessageCircle } from 'lucide-react';

export default function Navbar({ activeScreen, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '0.6rem 0' : '0.9rem 0',
        background: scrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(241, 245, 249, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid var(--border-light)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo Image */}
        <button
          onClick={() => onNavigate('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#070B19',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              border: '1px solid var(--border-light)',
            }}
          >
            <img
              src="/assets/eureka_logo.jpg"
              alt="Eureka Torchbearer Official Logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div>
            <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              EUREKA <span style={{ color: 'var(--primary-blue)' }}>CLASSES</span>
            </span>
            <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              TORCHBEARER • Science Academy
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }} className="desktop-only">
          <button onClick={() => onNavigate('home')} style={getNavStyle(activeScreen === 'home')}><User size={16} /> Home</button>
          <button onClick={() => onNavigate('batches')} style={getNavStyle(activeScreen === 'batches')}><BookOpen size={16} /> Batches</button>
          <button onClick={() => onNavigate('teacher')} style={getNavStyle(activeScreen === 'teacher')}><User size={16} /> Educator</button>
          <button onClick={() => onNavigate('contact')} style={getNavStyle(activeScreen === 'contact')}><MapPin size={16} /> Location</button>

          <button onClick={() => onNavigate('book-demo')} className="btn-clay-primary" style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}>
            <PhoneCall size={16} /> Book Demo Class
          </button>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-only"
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-light)',
            color: 'var(--text-primary)',
            padding: '0.6rem',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: 'var(--clay-shadow-sm)',
          }}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#FFFFFF',
            borderBottom: '1px solid var(--border-light)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            boxShadow: '0 20px 30px rgba(0,0,0,0.1)',
          }}
        >
          <button onClick={() => { setMobileMenuOpen(false); onNavigate('home'); }} style={mobileBtnStyle}>Home Screen</button>
          <button onClick={() => { setMobileMenuOpen(false); onNavigate('batches'); }} style={mobileBtnStyle}>Batches & Timings Screen</button>
          <button onClick={() => { setMobileMenuOpen(false); onNavigate('teacher'); }} style={mobileBtnStyle}>Educator Profile Screen</button>
          <button onClick={() => { setMobileMenuOpen(false); onNavigate('contact'); }} style={mobileBtnStyle}>Center Location Screen</button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('book-demo');
            }}
            className="btn-clay-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            <PhoneCall size={18} /> Book Demo Class Portal
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 868px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: block !important; }
        }
        @media (min-width: 869px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </header>
  );
}

const getNavStyle = (isActive) => ({
  color: isActive ? 'var(--primary-blue)' : 'var(--text-secondary)',
  fontWeight: isActive ? '800' : '600',
  fontSize: '0.92rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '0.3rem 0.6rem',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
});

const mobileBtnStyle = {
  color: 'var(--text-primary)',
  background: 'none',
  border: 'none',
  textAlign: 'left',
  fontSize: '1.05rem',
  fontWeight: '600',
  padding: '0.6rem 0',
  borderBottom: '1px solid var(--border-light)',
  cursor: 'pointer',
};


const navLinkStyle = {
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '0.92rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  transition: 'color 0.2s ease',
};

const mobileNavLinkStyle = {
  color: 'var(--text-primary)',
  textDecoration: 'none',
  fontSize: '1.05rem',
  fontWeight: '600',
  padding: '0.5rem 0',
  borderBottom: '1px solid var(--border-light)',
};
