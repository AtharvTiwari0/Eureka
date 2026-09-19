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
        className="navbar-main-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '80rem', // max-w-7xl
          margin: '0 auto',
          padding: '0.85rem 1.5rem',
          position: 'relative',
        }}
      >
        {/* Left: Brand Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="navbar-brand-logo"
          style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', cursor: 'pointer', height: '42px' }}
        >
          <span
            style={{
              fontSize: '1.85rem',
              fontWeight: '400',
              fontFamily: "'Instrument Serif', Georgia, serif",
              color: '#000000',
              letterSpacing: '-0.025em',
              lineHeight: '1',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Eureka
          </span>
        </div>

        {/* Center/Right Menu: Minimalist "More Info v" Mega Dropdown & Black Pill CTA */}
        <div className="navbar-right-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          <nav className="desktop-nav-menu" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* More Info Dropdown Trigger */}
            <button
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              onMouseEnter={() => setMegaMenuOpen(true)}
              style={{
                background: megaMenuOpen ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                border: 'none',
                borderRadius: '9999px',
                color: megaMenuOpen ? '#000000' : '#4B5563',
                fontSize: '0.9rem',
                fontWeight: '600',
                fontFamily: "'Inter', sans-serif",
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                height: '42px',
                padding: '0 1rem',
                lineHeight: '1',
                transition: 'all 0.2s ease',
              }}
            >
              <span>More Info</span>
              <ChevronDown
                size={15}
                style={{
                  transform: megaMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease',
                  color: megaMenuOpen ? '#000000' : '#6B7280',
                }}
              />
            </button>
          </nav>

          {/* Black CTA Button ("Book 2 Free Demos") */}
          <button
            onClick={() => handleSelectBatch('Class 10th Science Board Special')}
            className="aethera-nav-cta"
            style={{
              background: '#000000',
              color: '#FFFFFF',
              border: 'none',
              height: '42px',
              padding: '0 1.25rem',
              borderRadius: '9999px',
              fontWeight: '600',
              fontSize: '0.88rem',
              fontFamily: "'Inter', sans-serif",
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              lineHeight: '1',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
              transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
              whiteSpace: 'nowrap',
            }}
          >
            <span className="cta-full-text">Book 2 Free Demos</span>
            <span className="cta-short-text">Book Demo</span>
            <ArrowRight size={15} color="#FFFFFF" />
          </button>

          {/* Mobile Menu Toggle Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-nav-toggle"
            style={{
              background: '#F3F4F6',
              border: '1px solid #E5E7EB',
              color: '#000000',
              height: '42px',
              width: '42px',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              lineHeight: '1',
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
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid #E5E5E5',
            padding: '1.4rem 1.2rem 1.6rem 1.2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            animation: 'fadeIn 0.25s ease-out',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6F6F6F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem', paddingLeft: '0.3rem' }}>
            Navigation Menu
          </div>

          {/* Item 1: Meet Teacher */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onNavigateScreen) onNavigateScreen('meet-teacher');
            }}
            style={mobileLinkStyle}
          >
            <div style={mobileIconBoxStyle}>
              <GraduationCap size={20} color="#000000" />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#000000' }}>Meet Teacher</div>
              <div style={{ fontSize: '0.78rem', color: '#6F6F6F', marginTop: '0.1rem' }}>Abhishek Sir Credentials & Gold Medal</div>
            </div>
          </button>

          {/* Item 2: Batches */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onNavigateScreen) onNavigateScreen('batches');
            }}
            style={mobileLinkStyle}
          >
            <div style={mobileIconBoxStyle}>
              <BookOpen size={20} color="#000000" />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#000000' }}>Batches & Syllabus</div>
              <div style={{ fontSize: '0.78rem', color: '#6F6F6F', marginTop: '0.1rem' }}>Class 10th Board, Class 9th & Middle School</div>
            </div>
          </button>

          {/* Item 3: Study Materials */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onNavigateScreen) onNavigateScreen('study-materials');
            }}
            style={mobileLinkStyle}
          >
            <div style={mobileIconBoxStyle}>
              <FileText size={20} color="#000000" />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#000000' }}>Study Materials</div>
              <div style={{ fontSize: '0.78rem', color: '#6F6F6F', marginTop: '0.1rem' }}>NCERT Formula Cheat-Sheets & Handouts</div>
            </div>
          </button>

          {/* Item 4: Ask to Sir */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onNavigateScreen) onNavigateScreen('ask-to-sir');
            }}
            style={mobileLinkStyle}
          >
            <div style={mobileIconBoxStyle}>
              <MessageSquare size={20} color="#000000" />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#000000' }}>Ask to Sir</div>
              <div style={{ fontSize: '0.78rem', color: '#6F6F6F', marginTop: '0.1rem' }}>1-on-1 Direct WhatsApp Academic Doubt Cell</div>
            </div>
          </button>

          {/* Mobile Drawer CTA Button */}
          <button
            onClick={() => handleSelectBatch('Class 10th Science Board Special')}
            style={{
              width: '100%',
              padding: '0.9rem',
              borderRadius: '9999px',
              background: '#000000',
              color: '#FFFFFF',
              fontWeight: '600',
              fontSize: '0.95rem',
              border: 'none',
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
              cursor: 'pointer',
            }}
          >
            <span>Book 2 Free Demos</span>
            <ArrowRight size={16} color="#FFFFFF" />
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

        @media (max-width: 600px) {
          .navbar-main-container {
            padding: 0.65rem 0.85rem !important;
          }
          .navbar-brand-logo span {
            font-size: 1.45rem !important;
          }
          .navbar-right-actions {
            gap: 0.35rem !important;
          }
          .aethera-nav-cta {
            padding: 0 0.75rem !important;
            font-size: 0.78rem !important;
            height: 38px !important;
          }
          .mobile-nav-toggle {
            height: 38px !important;
            width: 38px !important;
          }
        }

        @media (max-width: 380px) {
          .cta-full-text { display: none !important; }
          .cta-short-text { display: inline !important; }
        }

        @media (min-width: 381px) {
          .cta-short-text { display: none !important; }
        }
      `}</style>
    </header>
  );
}

const pitaraCardStyle = {
  textDecoration: 'none',
};

const pitaraTitleStyle = {
  fontSize: '1.05rem',
  fontWeight: '800',
  color: '#0F172A',
  margin: '0 0 0.35rem 0',
  fontFamily: "'Inter', sans-serif",
};

const pitaraDescStyle = {
  fontSize: '0.84rem',
  color: '#64748B',
  lineHeight: '1.45',
  margin: 0,
  fontWeight: '500',
  fontFamily: "'Inter', sans-serif",
};

const iconBadgeStyle = (color, bg) => ({
  width: '44px',
  height: '44px',
  borderRadius: '12px',
  background: bg,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const pitaraActionStyle = (color) => ({
  fontSize: '0.82rem',
  fontWeight: '800',
  color: color,
  display: 'flex',
  alignItems: 'center',
  gap: '0.3rem',
  marginTop: '0.5rem',
});

const mobileLinkStyle = {
  background: '#F8FAFC',
  border: '1px solid #E5E5E5',
  borderRadius: '16px',
  color: '#000000',
  fontSize: '0.92rem',
  fontWeight: '600',
  textAlign: 'left',
  padding: '0.85rem 1rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.85rem',
  transition: 'all 0.2s ease',
};

const mobileIconBoxStyle = {
  width: '38px',
  height: '38px',
  borderRadius: '10px',
  background: '#FFFFFF',
  border: '1px solid #E5E5E5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};
