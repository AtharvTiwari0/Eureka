import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Calendar, ArrowUp } from 'lucide-react';

export default function MobileBottomNav({ onBookCallClick }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            position: 'fixed',
            bottom: '5rem',
            right: '1.2rem',
            zIndex: 99,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--primary-blue)',
            color: '#FFFFFF',
            border: 'none',
            boxShadow: '0 6px 18px rgba(37, 99, 235, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.25s ease',
          }}
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Sticky Mobile Bottom Floating Dock Bar */}
      <div className="mobile-bottom-dock">
        <a
          href="tel:+919452184870"
          className="dock-item"
          style={{ color: 'var(--text-primary)' }}
        >
          <Phone size={18} color="var(--primary-blue)" />
          <span>Call</span>
        </a>

        <a
          href="https://wa.me/919452184870?text=Hello%20Abhishek%20Vishwakarma!%20I%20visited%20Eureka%20Classes%20website%20and%20want%20to%20inquire%20about%20admissions."
          target="_blank"
          rel="noreferrer"
          className="dock-item"
          style={{ color: 'var(--text-primary)' }}
        >
          <MessageCircle size={18} color="var(--accent-emerald)" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => onBookCallClick('Class 10th Science Board Special')}
          className="dock-item-btn"
        >
          <Calendar size={18} color="#FFFFFF" />
          <span>Book Free Demo</span>
        </button>
      </div>

      <style>{`
        .mobile-bottom-dock {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 999;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-top: 1px solid var(--border-light);
          padding: 0.6rem 1rem;
          box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.08);
          align-items: center;
          justify-content: space-around;
          gap: 0.5rem;
        }

        .dock-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-decoration: none;
          padding: 0.3rem 0.6rem;
          border-radius: 12px;
          transition: background 0.2s ease;
        }

        .dock-item-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.65rem 1.1rem;
          border-radius: 9999px;
          background: var(--primary-blue);
          color: #FFFFFF;
          font-weight: 800;
          font-size: 0.85rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
        }

        @media (max-width: 768px) {
          .mobile-bottom-dock {
            display: flex !important;
          }
          body {
            padding-bottom: 4.5rem !important;
          }
        }
      `}</style>
    </>
  );
}
