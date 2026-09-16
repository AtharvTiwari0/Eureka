import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation, ExternalLink, HelpCircle, User } from 'lucide-react';

export default function LocationContact() {
  const mapEmbedUrl = `https://maps.google.com/maps?q=25.987894,79.462561&hl=en&z=17&output=embed`;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [query, setQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [querySubmitted, setQuerySubmitted] = useState(false);

  const FORMSPARK_ACTION_URL = 'https://submit-form.com/fQQINef9K';

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !query) return;

    setIsSubmitting(true);

    try {
      await fetch(FORMSPARK_ACTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _email: {
            from: name,
            subject: `New Student Query from ${name}`,
          },
          name: name,
          phone: phone,
          query: query,
          submittedAt: new Date().toLocaleString(),
        }),
      });
    } catch (err) {
      console.log('Formspark submission:', err);
    }

    setIsSubmitting(false);
    setQuerySubmitted(true);

    const text = encodeURIComponent(
      `Hello Abhishek Sir! I submitted a query on Eureka Classes website:\n\n` +
      `👤 Name: ${name}\n` +
      `📞 Phone: ${phone}\n` +
      `❓ Query: ${query}`
    );

    setTimeout(() => {
      window.open(`https://wa.me/919452184870?text=${text}`, '_blank');
    }, 1200);
  };

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="clay-badge" style={{ marginBottom: '1rem' }}>
            <MapPin size={16} /> Location & Inquiry
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: '800', marginBottom: '0.8rem' }}>
            Coaching Center Location & <span style={{ color: 'var(--primary-blue)' }}>Ask A Query</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            Visit our coaching center in Orai or submit your question below.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', alignItems: 'stretch' }} className="location-grid">
          
          {/* Left: Map & Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div className="clay-card" style={{ padding: '1rem', borderRadius: '24px' }}>
              <div style={{ width: '100%', height: '340px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
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

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.9rem', padding: '0 0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>
                  <Navigation size={15} color="var(--primary-blue)" /> Coordinates: 25.987894, 79.462561
                </div>
                <a
                  href="https://maps.google.com/?q=25.987894,79.462561"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'var(--primary-blue)', fontSize: '0.85rem', fontWeight: '800', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  Open In Google Maps <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Direct Cards */}
            <div className="contact-cards-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="clay-card" style={{ padding: '1.2rem', borderRadius: '18px', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={iconBoxStyle}>
                  <Phone size={20} color="var(--primary-blue)" />
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Direct Phone</span>
                  <a href="tel:+919452184870" style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>
                    +91 9452184870
                  </a>
                </div>
              </div>

              <div className="clay-card" style={{ padding: '1.2rem', borderRadius: '18px', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{ ...iconBoxStyle, background: 'var(--accent-emerald-soft)' }}>
                  <Mail size={20} color="var(--accent-emerald)" />
                </div>
                <div style={{ minWidth: 0 }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Official Email</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    av7529365@gmail.com
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Queries Form */}
          <div className="clay-card" style={{ padding: '2.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <HelpCircle size={22} color="var(--primary-blue)" />
                <h3 style={{ fontSize: '1.38rem', fontWeight: '800' }}>Ask A Query</h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Have questions about Class 9th/10th Science, 6th-8th Subjects, timings, or fees? Send a message directly to Abhishek Sir.
              </p>

              {!querySubmitted ? (
                <form onSubmit={handleQuerySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <div>
                    <label style={labelStyle}><User size={14} /> Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyanshu Singh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="clay-input"
                    />
                  </div>

                  <div>
                    <label style={labelStyle}><Phone size={14} /> Contact Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9452184870"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="clay-input"
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Your Query / Question</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Type your question..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="clay-input"
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-clay-primary"
                    style={{ width: '100%', marginTop: '0.4rem' }}
                  >
                    <Send size={16} /> {isSubmitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <CheckCircle2 size={48} color="var(--accent-emerald)" style={{ margin: '0 auto 1rem auto' }} />
                  <h4 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.5rem' }}>Query Submitted!</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Your message has been sent to Abhishek Sir. Opening WhatsApp...
                  </p>
                </div>
              )}
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
              <Clock size={15} color="var(--accent-amber)" /> Center Hours: Monday - Saturday (2:00 PM - 7:00 PM)
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .location-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .contact-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

const iconBoxStyle = {
  width: '42px',
  height: '42px',
  borderRadius: '12px',
  background: 'var(--primary-blue-soft)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontSize: '0.85rem',
  fontWeight: '700',
  color: 'var(--text-primary)',
  marginBottom: '0.3rem',
};
