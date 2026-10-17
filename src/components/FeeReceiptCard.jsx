import React, { useRef, useState } from 'react';
import { Download, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { toJpeg } from 'html-to-image';
import { getOrdinal, SESSION_MONTH_YEARS, DEFAULT_FEE_MONTHS } from '../adminData';

/**
 * Minimal & Modern Eureka Science Classes Fee Receipt Card
 * - Ultra-clean header: ONLY "Eureka" (no address/tagline clutter)
 * - Authentic Red Rubber Stamp (PAID or PENDING)
 * - Supports Mode: 'single' (specific month) OR 'cumulative' (all paid months master bill)
 * - High-resolution 1-tap JPG download
 */
export default function FeeReceiptCard({
  student, // { roll, name, cls, monthlyAmount, dueDay, admissionDate, paidMonths, getMonthValidity, paidUpToDate, nextDueDate, paidAmount, paidCount, totalActive, activeMonths }
  selectedMonth, // e.g. 'October' (used in 'single' mode)
  mode = 'single', // 'single' | 'cumulative'
  showActions = true,
}) {
  const receiptRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!student) return null;

  const isCumulative = mode === 'cumulative';

  // Details for Single Month
  const currentMonth = selectedMonth || 'April';
  const monthIdx = DEFAULT_FEE_MONTHS.indexOf(currentMonth);
  const yearInfo = SESSION_MONTH_YEARS[monthIdx] || { year: 2026 };
  const receiptYear = yearInfo.year;
  const monthShort = currentMonth.slice(0, 3).toUpperCase();
  const paidInfo = student.paidMonths ? student.paidMonths[currentMonth] : null;
  const isPaid = !!paidInfo;
  const cycleValidity = student.getMonthValidity ? student.getMonthValidity(currentMonth) : `${getOrdinal(student.dueDay)} ${currentMonth}`;
  const singleFeeAmount = paidInfo?.amount || student.monthlyAmount || 600;

  // Details for Cumulative All-Months Bill
  const activeMonthsList = student.activeMonths || DEFAULT_FEE_MONTHS;
  const paidMonthsEntries = activeMonthsList
    .filter(m => !!student.paidMonths?.[m])
    .map(m => {
      const p = student.paidMonths[m];
      const mIdx = DEFAULT_FEE_MONTHS.indexOf(m);
      const y = SESSION_MONTH_YEARS[mIdx]?.year || 2026;
      return {
        month: m,
        year: y,
        date: p.date || 'Recorded',
        mode: p.mode || 'Cash',
        amount: p.amount || student.monthlyAmount || 600
      };
    });

  const cumulativeTotal = paidMonthsEntries.reduce((sum, item) => sum + item.amount, 0);
  const isAnyPaid = paidMonthsEntries.length > 0;

  // Trigger high quality JPG download
  const handleDownloadJpg = async () => {
    if (!receiptRef.current || downloading) return;
    setDownloading(true);
    setDownloadSuccess(false);

    try {
      await new Promise(r => setTimeout(r, 120));
      const dataUrl = await toJpeg(receiptRef.current, {
        quality: 0.96,
        backgroundColor: '#FFFFFF',
        pixelRatio: 2,
        cacheBust: true,
      });

      const filename = isCumulative
        ? `Eureka_Complete_Fee_Bill_${student.roll}_2026-27.jpg`
        : `Eureka_Fee_Bill_${student.roll}_${currentMonth}_${receiptYear}.jpg`;

      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to generate JPG receipt:', err);
      alert('Could not download image. Please take a screenshot.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* ══════════ THE MINIMAL RECEIPT / BILL CARD ══════════ */}
      <div
        id="fee-receipt-card"
        ref={receiptRef}
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '1.5px solid #E5E7EB',
          boxShadow: '0 8px 28px rgba(0,0,0,0.05)',
          overflow: 'hidden',
          padding: '1.5rem 1.35rem 1.4rem',
          position: 'relative',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          color: '#111827',
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        {/* Top Minimal Accent Bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: (isCumulative ? isAnyPaid : isPaid)
            ? 'linear-gradient(90deg, #10B981, #059669)'
            : 'linear-gradient(90deg, #DC2626, #EF4444)',
        }} />

        {/* ── 1. ULTRA-MINIMAL HEADER (ONLY "Eureka") ── */}
        <div style={{ textAlign: 'center', paddingBottom: '0.85rem', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{
            fontSize: 'clamp(2.1rem, 6vw, 2.7rem)',
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            color: '#000000',
            letterSpacing: '0.02em',
            lineHeight: 1,
            margin: '0 0 0.25rem',
          }}>
            Eureka
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            padding: '0.2rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#475569',
          }}>
            <span>{isCumulative ? 'Complete Session Bill' : `Fee Bill • ${currentMonth} ${receiptYear}`}</span>
            <span>•</span>
            <span>2026–27</span>
          </div>
        </div>

        {/* ── 2. STUDENT INFO ── */}
        <div style={{
          padding: '0.85rem 0',
          borderBottom: '1px solid #F1F5F9',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '0.5rem',
        }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Student Name
            </div>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#000000', marginTop: '0.1rem' }}>
              {student.name}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.15rem' }}>
              Admission: {student.admissionDate}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.82rem', background: '#EFF6FF', color: '#0284C7', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
              {student.roll}
            </span>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155', marginTop: '0.25rem' }}>
              Class {student.cls}
            </div>
          </div>
        </div>

        {/* ── 3. BILL CONTENT (SINGLE MONTH vs CUMULATIVE ALL MONTHS) ── */}
        {!isCumulative ? (
          /* ── SINGLE MONTH BILL BREAKDOWN ── */
          <div style={{ padding: '0.9rem 0 0.5rem' }}>
            <div style={{ background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '0.85rem 0.95rem', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Billing Month:</span>
                <strong style={{ fontSize: '0.88rem', color: '#0F172A' }}>{currentMonth} {receiptYear}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Validity Cycle:</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#047857' }}>{cycleValidity}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #CBD5E1', paddingTop: '0.4rem', marginTop: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Payment Status:</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isPaid ? '#059669' : '#DC2626' }}>
                  {isPaid ? `Paid on ${paidInfo.date || 'Record'} (${paidInfo.mode || 'Cash'})` : `Pending (Due on ${getOrdinal(student.dueDay)} ${currentMonth})`}
                </span>
              </div>
            </div>

            {/* Total Fee Box */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 0.95rem',
              borderRadius: '12px',
              background: '#000000',
              color: '#FFFFFF',
              marginBottom: '0.85rem'
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>
                  Monthly Tuition
                </div>
                <div style={{ fontSize: '0.76rem', color: '#D1D5DB' }}>
                  Science (Physics, Chemistry, Biology)
                </div>
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900 }}>
                ₹{singleFeeAmount}
              </div>
            </div>
          </div>
        ) : (
          /* ── CUMULATIVE MASTER BILL BREAKDOWN (ALL PAID MONTHS) ── */
          <div style={{ padding: '0.9rem 0 0.5rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
              Paid Months Statement ({paidMonthsEntries.length} Months):
            </div>

            {paidMonthsEntries.length === 0 ? (
              <div style={{ padding: '1rem', textAlign: 'center', background: '#FFFBEB', borderRadius: '12px', color: '#B45309', fontSize: '0.82rem', marginBottom: '0.85rem' }}>
                No fees submitted yet for this session.
              </div>
            ) : (
              <div style={{
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '0.85rem'
              }}>
                <div style={{ maxHeight: '210px', overflowY: 'auto' }}>
                  {paidMonthsEntries.map((item, idx) => (
                    <div
                      key={item.month}
                      style={{
                        padding: '0.55rem 0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: idx === paidMonthsEntries.length - 1 ? 'none' : '1px solid #F1F5F9',
                        background: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                        fontSize: '0.78rem'
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 800, color: '#0F172A' }}>{item.month} {item.year}</span>
                        <div style={{ fontSize: '0.68rem', color: '#059669', marginTop: '1px' }}>
                          Paid on {item.date} ({item.mode})
                        </div>
                      </div>
                      <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.85rem' }}>
                        ₹{item.amount}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Master Total */}
                <div style={{
                  padding: '0.75rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#000000',
                  color: '#FFFFFF'
                }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase' }}>
                      Total Fees Paid Till Date
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#D1D5DB' }}>
                      Fees Submitted Up To: <strong>{student.paidUpToDate}</strong>
                    </div>
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900 }}>
                    ₹{cumulativeTotal.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── 4. OFFICIAL EUREKA RED STAMP SECTION ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          paddingTop: '0.5rem',
          borderTop: '1px dashed #E2E8F0',
        }}>
          {/* Left summary note */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
              Fees Submitted Up To
            </div>
            <div style={{ fontSize: '0.86rem', fontWeight: 900, color: student.dueCount === 0 ? '#059669' : '#0F172A', marginTop: '1px' }}>
              {student.paidUpToDate}
            </div>
          </div>

          {/* Right Red Rubber Stamp */}
          <div style={{ flexShrink: 0, textAlign: 'center' }}>
            {(isCumulative ? isAnyPaid : isPaid) ? (
              /* ── OFFICIAL RED PAID STAMP ── */
              <div
                style={{
                  border: '3px double #DC2626',
                  color: '#DC2626',
                  padding: '6px 12px',
                  borderRadius: '10px',
                  background: 'rgba(254, 242, 242, 0.6)',
                  transform: 'rotate(-5deg)',
                  boxShadow: '0 0 0 1px rgba(220, 38, 38, 0.15)',
                  display: 'inline-block',
                  userSelect: 'none',
                  textAlign: 'center',
                  minWidth: '140px',
                }}
              >
                <div style={{
                  fontSize: '0.58rem',
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#DC2626',
                }}>
                  ★ EUREKA SCIENCE ★
                </div>
                <div style={{
                  fontSize: '0.95rem',
                  fontWeight: 900,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#B91C1C',
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  lineHeight: 1.1,
                  margin: '1px 0',
                }}>
                  FEE VERIFIED
                </div>
                <div style={{
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: '#DC2626',
                }}>
                  ORAI (U.P.) • PAID ✓
                </div>
              </div>
            ) : (
              /* ── OFFICIAL RED PENDING STAMP ── */
              <div
                style={{
                  border: '2px dashed #DC2626',
                  color: '#DC2626',
                  padding: '6px 10px',
                  borderRadius: '10px',
                  background: 'rgba(254, 242, 242, 0.45)',
                  transform: 'rotate(-4deg)',
                  display: 'inline-block',
                  userSelect: 'none',
                  textAlign: 'center',
                  minWidth: '135px',
                }}
              >
                <div style={{
                  fontSize: '0.55rem',
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#DC2626',
                }}>
                  ★ EUREKA SCIENCE ★
                </div>
                <div style={{
                  fontSize: '0.88rem',
                  fontWeight: 900,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: '#DC2626',
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  margin: '1px 0',
                }}>
                  PAYMENT PENDING
                </div>
                <div style={{
                  fontSize: '0.6rem',
                  fontWeight: 800,
                  color: '#B91C1C',
                }}>
                  DUE: {getOrdinal(student.dueDay)} {currentMonth.slice(0, 3)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════ ACTION BAR (DOWNLOAD JPG) ══════════ */}
      {showActions && (
        <div style={{ maxWidth: '480px', margin: '0.85rem auto 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {downloadSuccess && (
            <div style={{
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: '12px',
              padding: '0.6rem 0.85rem',
              color: '#065F46',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}>
              <CheckCircle2 size={15} /> Receipt downloaded successfully in JPG format!
            </div>
          )}

          <button
            type="button"
            onClick={handleDownloadJpg}
            disabled={downloading}
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              borderRadius: '9999px',
              background: downloading ? '#374151' : '#000000',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: downloading ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              transition: 'all 0.15s ease'
            }}
          >
            <Download size={16} />
            <span>
              {downloading
                ? 'Generating JPG...'
                : isCumulative
                ? 'Download Complete Master Bill (JPG)'
                : `Download ${currentMonth} Bill (JPG)`}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
