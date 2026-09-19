import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink } from 'lucide-react';

export default function LocationContact() {
  const mapEmbedUrl = `https://maps.google.com/maps?q=25.987894,79.462561&hl=en&z=17&output=embed`;

  return (
    <section id="contact" style={{ margin: '2.5rem 0' }}>
      <div>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
          <div className="clay-badge" style={{ marginBottom: '1rem' }}>
            <MapPin size={16} /> Center Location
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: '800', marginBottom: '0.6rem' }}>
            Coaching Center <span style={{ color: 'var(--primary-blue)' }}>Location & Directions</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Visit Eureka Classes Torchbearer Science Academy in Orai, Uttar Pradesh.
          </p>
        </div>

        {/* Large Prominent Full-Width Map Card */}
        <div className="clay-card" style={{ padding: '1.2rem', borderRadius: '28px', background: '#FFFFFF', marginBottom: '1.8rem', boxShadow: 'var(--clay-shadow-md)' }}>
          <div style={{ width: '100%', height: '480px', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
            <iframe
              title="Eureka Classes Location Map"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.2rem', padding: '0 0.5rem', flexWrap: 'wrap', gap: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600' }}>
              <Navigation size={16} color="var(--primary-blue)" /> Coordinates: 25.987894, 79.462561 (Orai, UP)
            </div>
            <a
              href="https://maps.google.com/?q=25.987894,79.462561"
              target="_blank"
              rel="noreferrer"
              className="btn-clay-primary"
              style={{ padding: '0.6rem 1.4rem', fontSize: '0.86rem', textDecoration: 'none' }}
            >
              Open In Google Maps <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Contact Information Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }} className="contact-cards-grid">
          <div className="clay-card" style={{ padding: '1.4rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '1rem', background: '#FFFFFF' }}>
            <div style={iconBoxStyle}>
              <Phone size={22} color="var(--primary-blue)" />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '800' }}>Direct Phone</span>
              <a href="tel:+919452184870" style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', textDecoration: 'none', display: 'block', marginTop: '0.1rem' }}>
                +91 9452184870
              </a>
            </div>
          </div>

          <div className="clay-card" style={{ padding: '1.4rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '1rem', background: '#FFFFFF' }}>
            <div style={{ ...iconBoxStyle, background: 'var(--accent-emerald-soft)' }}>
              <Mail size={22} color="var(--accent-emerald)" />
            </div>
            <div style={{ minWidth: 0 }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '800' }}>Official Email</span>
              <span style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '0.1rem' }}>
                av7529365@gmail.com
              </span>
            </div>
          </div>

          <div className="clay-card" style={{ padding: '1.4rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '1rem', background: '#FFFFFF' }}>
            <div style={{ ...iconBoxStyle, background: 'var(--accent-amber-soft)' }}>
              <Clock size={22} color="var(--accent-amber)" />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '800' }}>Center Hours</span>
              <span style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-primary)', display: 'block', marginTop: '0.1rem' }}>
                Mon - Sat (2:00 PM - 7:00 PM)
              </span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 868px) {
          .contact-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

const iconBoxStyle = {
  width: '46px',
  height: '46px',
  borderRadius: '14px',
  background: 'var(--primary-blue-soft)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};
