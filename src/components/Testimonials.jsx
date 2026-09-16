import React, { useState, useEffect } from 'react';
import { ShieldCheck, MessageSquare, Send, CheckCircle2, User, Star, Flame, Search, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Testimonials() {
  // Clear old test review from localStorage on component mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('eureka_user_feedbacks');
      if (saved) {
        localStorage.removeItem('eureka_user_feedbacks');
      }
    } catch (e) {}
  }, []);

  // Unlimited live user-submitted reviews feed
  const [userReviews, setUserReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayLimit, setDisplayLimit] = useState(10);

  const [name, setName] = useState('');
  const [role, setRole] = useState('Student');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!name || !feedback) return;

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      role: role === 'Student' ? 'Class 9th / 10th Student' : 'Parent',
      comment: feedback.trim(),
      rating: rating,
      date: 'Just Now',
    };

    // 1. Add directly to live reviews on screen and persist locally
    const updatedReviews = [newReview, ...userReviews];
    setUserReviews(updatedReviews);
    try {
      localStorage.setItem('eureka_user_feedbacks', JSON.stringify(updatedReviews));
    } catch (err) {}

    // 2. Confetti animation
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (err) {}

    setSubmitted(true);
    // Note: No Formspark & No WhatsApp redirect for Review Form as requested!
  };

  // Filter reviews by search term
  const filteredReviews = userReviews.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="feedback" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="clay-badge" style={{ marginBottom: '1rem' }}>
            <ShieldCheck size={16} /> Student & Parent Reviews
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: '800', marginBottom: '0.8rem' }}>
            Live Student & Parent <span style={{ color: 'var(--primary-blue)' }}>Reviews Hub</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            Enrolled students and parents can submit their feedback below to publish live on screen.
          </p>
        </div>

        {/* 2-Column Swapped Layout: Live Reviews with Search (Left 1.1fr) & Write Review Form (Right 1fr) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '2.5rem', alignItems: 'stretch' }} className="feedback-grid">
          
          {/* LEFT COLUMN: UNLIMITED LIVE REVIEWS FEED WITH SEARCH BAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Flame size={20} color="var(--accent-amber)" />
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>
                  Live Reviews ({filteredReviews.length})
                </h3>
              </div>
              <span className="clay-badge" style={{ fontSize: '0.72rem', background: 'var(--accent-emerald-soft)', color: 'var(--accent-emerald)' }}>
                ● Real-Time Feed
              </span>
            </div>

            {/* Search Bar */}
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search live reviews by name or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="clay-input"
                style={{ paddingLeft: '2.5rem', fontSize: '0.88rem' }}
              />
            </div>

            {/* List or Clean Empty State */}
            {filteredReviews.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '480px', overflowY: 'auto', paddingRight: '0.4rem' }}>
                {filteredReviews.slice(0, displayLimit).map((item) => (
                  <div
                    key={item.id}
                    className="clay-card"
                    style={{
                      padding: '1.3rem',
                      borderRadius: '18px',
                      background: 'var(--primary-blue-soft)',
                      border: '2px solid var(--primary-blue)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="#D97706" color="#D97706" />
                        ))}
                      </div>
                      <span className="clay-badge" style={{ fontSize: '0.68rem', background: 'var(--primary-blue)', color: '#FFF', padding: '0.15rem 0.5rem' }}>
                        LIVE SUBMISSION
                      </span>
                    </div>

                    <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.55, marginBottom: '0.7rem', fontStyle: 'italic' }}>
                      "{item.comment}"
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '0.5rem', fontSize: '0.82rem' }}>
                      <span style={{ fontWeight: '800', color: 'var(--text-primary)' }}>{item.name}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{item.role} • {item.date}</span>
                    </div>
                  </div>
                ))}

                {filteredReviews.length > displayLimit && (
                  <button
                    onClick={() => setDisplayLimit((prev) => prev + 10)}
                    className="btn-clay-secondary"
                    style={{ width: '100%', padding: '0.7rem', fontSize: '0.88rem' }}
                  >
                    Load More Reviews <ChevronDown size={16} />
                  </button>
                )}
              </div>
            ) : (
              <div
                className="clay-card"
                style={{
                  padding: '3rem 2rem',
                  borderRadius: '24px',
                  textAlign: 'center',
                  background: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '320px',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'var(--primary-blue-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <MessageSquare size={28} color="var(--primary-blue)" />
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  No Reviews Published Yet!
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '320px', lineHeight: 1.5 }}>
                  Be the first student or parent to write a review! Fill out the form on the right to publish your feedback live.
                </p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: WRITE REVIEW FORM */}
          <div className="clay-card" style={{ padding: '2.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <MessageSquare size={22} color="var(--primary-blue)" />
                <h3 style={{ fontSize: '1.38rem', fontWeight: '800' }}>Submit Your Review</h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Share your learning experience or feedback with Abhishek Vishwakarma Sir.
              </p>

              {!submitted ? (
                <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <div>
                    <label style={labelStyle}><User size={14} /> Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="clay-input"
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>You are a:</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                      <button
                        type="button"
                        onClick={() => setRole('Student')}
                        style={{
                          padding: '0.65rem',
                          borderRadius: '10px',
                          border: role === 'Student' ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                          background: role === 'Student' ? 'var(--primary-blue-soft)' : '#F8FAFC',
                          color: role === 'Student' ? 'var(--primary-blue)' : 'var(--text-muted)',
                          fontWeight: '800',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                        }}
                      >
                        🎓 Student
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('Parent')}
                        style={{
                          padding: '0.65rem',
                          borderRadius: '10px',
                          border: role === 'Parent' ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                          background: role === 'Parent' ? 'var(--primary-blue-soft)' : '#F8FAFC',
                          color: role === 'Parent' ? 'var(--primary-blue)' : 'var(--text-muted)',
                          fontWeight: '800',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                        }}
                      >
                        👨‍👩‍👦 Parent
                      </button>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Rating</label>
                    <div style={{ display: 'flex', gap: '0.4rem', cursor: 'pointer' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={24}
                          onClick={() => setRating(star)}
                          fill={star <= rating ? '#D97706' : 'none'}
                          color={star <= rating ? '#D97706' : '#CBD5E1'}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Feedback Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your genuine feedback or experience..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="clay-input"
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-clay-primary"
                    style={{ width: '100%', marginTop: '0.4rem', padding: '0.95rem' }}
                  >
                    <Send size={16} /> Publish Review Live
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <CheckCircle2 size={48} color="var(--accent-emerald)" style={{ margin: '0 auto 1rem auto' }} />
                  <h4 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.4rem' }}>Review Published Live!</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.4rem' }}>
                    Thank you for your feedback! Your review is now visible live in the feed on the left.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-clay-secondary" style={{ width: '100%' }}>
                    Write Another Review
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .feedback-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontSize: '0.85rem',
  fontWeight: '700',
  color: 'var(--text-primary)',
  marginBottom: '0.3rem',
};
