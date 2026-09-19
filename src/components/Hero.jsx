import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero({ onBookCallClick }) {
  const videoRef = useRef(null);
  const [videoOpacity, setVideoOpacity] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animFrameId;

    const checkTime = () => {
      if (video.duration && !video.paused) {
        const currentTime = video.currentTime;
        const duration = video.duration;
        const fadeDuration = 0.5; // 0.5s fade duration

        let opacity = 1;

        // Fade in over 0.5s at the start
        if (currentTime < fadeDuration) {
          opacity = currentTime / fadeDuration;
        } 
        // Fade out over 0.5s before the end
        else if (currentTime > duration - fadeDuration) {
          opacity = Math.max(0, (duration - currentTime) / fadeDuration);
        }

        setVideoOpacity(opacity);
      }
      animFrameId = requestAnimationFrame(checkTime);
    };

    animFrameId = requestAnimationFrame(checkTime);

    const handleEnded = () => {
      setVideoOpacity(0);
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      }, 100);
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      cancelAnimationFrame(animFrameId);
      if (video) {
        video.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  return (
    <section
      className="hero-section-responsive"
      style={{
        position: 'relative',
        minHeight: '75vh',
        width: '100%',
        overflow: 'hidden',
        background: '#FFFFFF',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Background Video Layer (z-0) with top: 120px and smooth opacity loop */}
      <div
        style={{
          position: 'absolute',
          top: '120px',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
          autoPlay
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: videoOpacity,
            transition: 'opacity 0.1s linear',
          }}
        />
        
        {/* Gradient overlays positioned over the video */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, #FFFFFF 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Hero Content Section (z-10) */}
      <div
        className="hero-content-responsive"
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '2.5rem',
          paddingBottom: '3.5rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          maxWidth: '80rem',
          margin: '0 auto',
        }}
      >
        {/* Main Headline */}
        <h1
          className="animate-fade-rise hero-heading-responsive"
          style={{
            fontSize: 'clamp(2.1rem, 5.5vw, 5.2rem)',
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-1.5px',
            color: '#000000',
            maxWidth: '75rem',
            margin: '0 auto',
          }}
        >
          Specialized CBSE Science & <span style={{ fontStyle: 'italic', color: '#6F6F6F' }}>Foundation Coaching</span>
        </h1>

        {/* Subtitle / Description */}
        <p
          className="animate-fade-rise-delay"
          style={{
            fontSize: 'clamp(1.08rem, 1.4vw, 1.25rem)',
            fontFamily: "'Inter', sans-serif",
            color: '#0F172A', // Dark Slate for 100% crisp visibility
            maxWidth: '46rem',
            marginTop: '1.8rem',
            lineHeight: 1.7,
            fontWeight: 500,
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
          }}
        >
          Concept-based Science coaching by <strong style={{ color: '#000000', fontWeight: 700 }}>Abhishek Vishwakarma</strong> (M.Sc. Physics Gold Medalist). 
          Specialized CBSE Board preparation for <span style={{ color: '#000000', fontWeight: 700 }}>Classes 9th & 10th</span> and multidisciplinary foundation for <span style={{ color: '#000000', fontWeight: 700 }}>Classes 6th to 8th</span>.
        </p>

        {/* Creative Interactive Scroll Down Indicator */}
        <div
          onClick={() => {
            const decodersElem = document.getElementById('decoders');
            if (decodersElem) {
              decodersElem.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="animate-fade-rise-delay-2 scroll-indicator-btn"
          style={{
            marginTop: '3.2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <span style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
            Scroll to explore
          </span>
          <div
            style={{
              width: '24px',
              height: '38px',
              borderRadius: '9999px',
              border: '1.5px solid #000000',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '6px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
              background: '#FFFFFF',
            }}
          >
            <div
              style={{
                width: '4px',
                height: '8px',
                borderRadius: '9999px',
                background: '#000000',
                animation: 'mouseWheelScroll 1.6s ease-in-out infinite',
              }}
            />
          </div>
          <ChevronDown size={16} color="#000000" style={{ animation: 'bounceDown 1.5s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes mouseWheelScroll {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(9px); opacity: 0.3; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        .scroll-indicator-btn:hover {
          transform: translateY(2px);
        }

        .aethera-nav-cta:hover {
          transform: scale(1.03);
          background: #1A1A1A !important;
        }
      `}</style>
    </section>
  );
}


const chipStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.55rem 1rem',
  borderRadius: '9999px',
  background: 'rgba(15, 23, 42, 0.65)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  color: '#F8FAFC',
  fontSize: '0.82rem',
  fontWeight: '700',
};

