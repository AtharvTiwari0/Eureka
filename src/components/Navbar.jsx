import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight, BookOpen, GraduationCap, FileText, MessageSquare, UserCheck, X, Menu, Sparkles } from 'lucide-react';

export default function Navbar({ onBookCallClick, onNavigateScreen }) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMegaMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectBatch = (batchName) => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    if (onBookCallClick) {
      onBookCallClick(batchName);
    }
  };

  const scrollToSection = (sectionId) => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={navRef}
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled
          ? 'rgba(255, 255, 255, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '80rem', // max-w-7xl
          margin: '0 auto',
          padding: '1.5rem 2rem',
          position: 'relative',
        }}
      >
        {/* Left: Aethera Style Instrument Serif Brand Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', cursor: 'pointer' }}
        >
          <span
            style={{
              fontSize: '2rem',
              fontWeight: '400',
              fontFamily: "'Instrument Serif', Georgia, serif",
              color: '#000000',
              letterSpacing: '-0.025em',
            }}
          >
            Eureka
          </span>
        </div>

        {/* Center/Right Menu: Minimalist "More Info v" Mega Dropdown & Black Pill CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          
          <nav className="desktop-nav-menu" style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
            {/* More Info Dropdown Trigger */}
            <button
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              onMouseEnter={() => setMegaMenuOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: megaMenuOpen ? '#000000' : '#6F6F6F',
                fontSize: '0.92rem',
                fontWeight: '500',
                fontFamily: "'Inter', sans-serif",
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0',
                transition: 'color 0.2s ease',
              }}
            >
              <span>More Info</span>
              <ChevronDown
                size={15}
                style={{
                  transform: megaMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease',
                  color: megaMenuOpen ? '#000000' : '#6F6F6F',
                }}
              />
            </button>
          </nav>

          {/* Black CTA Button ("Begin Journey" / "Book 2 Free Demos") */}
          <button
            onClick={() => handleSelectBatch('Class 10th Science Board Special')}
            className="aethera-nav-cta"
            style={{
              background: '#000000',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.65rem 1.6rem',
              borderRadius: '9999px',
              fontWeight: '500',
              fontSize: '0.88rem',
              fontFamily: "'Inter', sans-serif",
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <span>Book 2 Free Demos</span>
            <ArrowRight size={15} color="#FFFFFF" />
          </button>

          {/* Mobile Menu Toggle Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-nav-toggle"
            style={{
              background: 'transparent',
              border: '1px solid #E5E5E5',
              color: '#000000',
              padding: '0.5rem',
              borderRadius: '9999px',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* 
        =====================================================
        MEGA MENU DROPDOWN ("PITARA") - TRIGGERED BY MORE INFO
        Contains ONLY 4 required cards:
        1. Meet Teacher
        2. Batches
        3. Study Materials
        4. Ask to Sir
        =====================================================
      */}
      {megaMenuOpen && (
        <div
          onMouseLeave={() => setMegaMenuOpen(false)}
          className="pitara-dropdown-wrapper"
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 3rem)',
            maxWidth: '1080px',
            marginTop: '0.6rem',
            background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
            borderRadius: '26px',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(56, 189, 248, 0.2)',
            padding: '1.6rem 2rem',
            animation: 'pitaraOpen 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 1001,
          }}
        >
          {/* Header Tag line inside Dropdown */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '1rem',
              marginBottom: '1.2rem',
              borderBottom: '1px solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: '800', color: '#0284C7', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <Sparkles size={15} color="#0284C7" />
              <span>Eureka Knowledge Hub & Navigation</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600' }}>
              Select an option below
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.2rem',
            }}
            className="pitara-4grid"
          >
            {/* ITEM 1: MEET TEACHER */}
            <div
              onClick={() => {
                setMegaMenuOpen(false);
                if (onNavigateScreen) onNavigateScreen('meet-teacher');
              }}
              className="pitara-card"
              style={pitaraCardStyle}
            >
              <div style={iconBadgeStyle('#0284C7', 'rgba(14, 165, 233, 0.1)')}>
                <GraduationCap size={22} color="#0284C7" />
              </div>
              <div>
                <h4 style={pitaraTitleStyle}>Meet Teacher</h4>
                <p style={pitaraDescStyle}>
                  Learn about Abhishek Sir's M.Sc. Physics Gold Medal credentials & 10+ yrs experience.
                </p>
              </div>
              <div style={pitaraActionStyle('#0284C7')}>
                <span>View Profile</span>
                <ArrowRight size={13} />
              </div>
            </div>

            {/* ITEM 2: BATCHES */}
            <div
              onClick={() => {
                setMegaMenuOpen(false);
                if (onNavigateScreen) onNavigateScreen('batches');
              }}
              className="pitara-card"
              style={pitaraCardStyle}
            >
              <div style={iconBadgeStyle('#2563EB', 'rgba(37, 99, 235, 0.1)')}>
                <BookOpen size={22} color="#2563EB" />
              </div>
              <div>
                <h4 style={pitaraTitleStyle}>Batches</h4>
                <p style={pitaraDescStyle}>
                  Class 10th Board, Class 9th Foundation & Classes 6th-8th timings and structure.
                </p>
              </div>
              <div style={pitaraActionStyle('#2563EB')}>
                <span>Explore Batches</span>
                <ArrowRight size={13} />
              </div>
            </div>

            {/* ITEM 3: STUDY MATERIALS */}
            <div
              onClick={() => {
                setMegaMenuOpen(false);
                if (onNavigateScreen) onNavigateScreen('study-materials');
              }}
              className="pitara-card"
              style={pitaraCardStyle}
            >
              <div style={iconBadgeStyle('#7C3AED', 'rgba(124, 58, 237, 0.1)')}>
                <FileText size={22} color="#7C3AED" />
              </div>
              <div>
                <h4 style={pitaraTitleStyle}>Study Materials</h4>
                <p style={pitaraDescStyle}>
                  CBSE PYQ decoders, formula cheat-sheets & handcrafted exam revision handouts.
                </p>
              </div>
              <div style={pitaraActionStyle('#7C3AED')}>
                <span>Get Notes</span>
                <ArrowRight size={13} />
              </div>
            </div>

            {/* ITEM 4: ASK TO SIR */}
            <div
              onClick={() => {
                setMegaMenuOpen(false);
                if (onNavigateScreen) onNavigateScreen('ask-to-sir');
              }}
              className="pitara-card"
              style={pitaraCardStyle}
            >
              <div style={iconBadgeStyle('#059669', 'rgba(5, 150, 105, 0.1)')}>
                <MessageSquare size={22} color="#059669" />
              </div>
              <div>
                <h4 style={pitaraTitleStyle}>Ask to Sir</h4>
                <p style={pitaraDescStyle}>
                  Direct WhatsApp doubt solution & center location details for student queries.
                </p>
              </div>
              <div style={pitaraActionStyle('#059669')}>
                <span>Ask Doubt Now</span>
                <ArrowRight size={13} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div
          style={{
            background: '#0B1120',
            borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
            padding: '1.2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.9rem',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
            More Info Links
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onNavigateScreen) onNavigateScreen('meet-teacher');
            }}
            style={mobileLinkStyle}
          >
            <GraduationCap size={18} color="#000000" />
            <span>Meet Teacher</span>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onNavigateScreen) onNavigateScreen('batches');
            }}
            style={mobileLinkStyle}
          >
            <BookOpen size={18} color="#000000" />
            <span>Batches</span>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onNavigateScreen) onNavigateScreen('study-materials');
            }}
            style={mobileLinkStyle}
          >
            <FileText size={18} color="#38BDF8" />
            <span>Study Materials</span>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onNavigateScreen) onNavigateScreen('ask-to-sir');
            }}
            style={mobileLinkStyle}
          >
            <MessageSquare size={18} color="#38BDF8" />
            <span>Ask to Sir</span>
          </button>

          <button
            onClick={() => handleSelectBatch('Class 10th Science Board Special')}
            style={{
              width: '100%',
              padding: '0.8rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #F4F0EA 0%, #FFFFFF 100%)',
              color: '#0F172A',
              fontWeight: '800',
              fontSize: '0.9rem',
              border: 'none',
              marginTop: '0.6rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <span>Book 2 Free Demos</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      <style>{`
        @keyframes pitaraOpen {
          from { opacity: 0; transform: translate(-50%, -10px) scale(0.97); }
          to { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }

        .pitara-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 18px;
          padding: 1.25rem 1.1rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify: space-between;
          gap: 1rem;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pitara-card:hover {
          transform: translateY(-4px);
          border-color: #38BDF8;
          box-shadow: 0 12px 28px rgba(14, 165, 233, 0.15);
          background: #F8FAFC;
        }

        .solidroad-demo-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.3) !important;
        }

        @media (max-width: 900px) {
          .desktop-nav-menu { display: none !important; }
          .mobile-nav-toggle { display: block !important; }
          .pitara-dropdown-wrapper { display: none !important; }
        }

        @media (min-width: 901px) {
          .mobile-nav-toggle { display: none !important; }
        }

        @media (max-width: 1000px) {
          .pitara-4grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </header>
  );
}

const pitaraCardStyle = {
  background: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: '18px',
  padding: '1.25rem 1.1rem',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '185px',
};

const iconBadgeStyle = (color, bg) => ({
  width: '42px',
  height: '42px',
  borderRadius: '12px',
  background: bg,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '0.4rem',
});

const pitaraTitleStyle = {
  fontSize: '1rem',
  fontWeight: '800',
  color: '#0F172A',
  marginBottom: '0.35rem',
  letterSpacing: '-0.01em',
};

const pitaraDescStyle = {
  fontSize: '0.8rem',
  color: '#64748B',
  lineHeight: '1.45',
};

const pitaraActionStyle = (color) => ({
  fontSize: '0.78rem',
  fontWeight: '800',
  color: color,
  display: 'flex',
  alignItems: 'center',
  gap: '0.3rem',
  marginTop: '0.5rem',
});

const mobileLinkStyle = {
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  color: '#F8FAFC',
  fontSize: '0.92rem',
  fontWeight: '700',
  textAlign: 'left',
  padding: '0.75rem 1rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
};

