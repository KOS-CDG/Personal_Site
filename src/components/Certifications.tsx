import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ui/ScrollReveal';
import CertCarousel from './ui/CertCarousel';
import { certificates } from '../data/portfolio';
import type { Certificate } from '../types';

// ── Issuer logo SVGs ───────────────────────────────────────────
function IssuerIcon({ type }: { type: Certificate['icon'] }) {
  if (type === 'google') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    );
  }
  if (type === 'ibm') {
    return (
      <svg width="32" height="13" viewBox="0 0 32 13" aria-hidden="true">
        <rect x="0" y="0" width="32" height="3" rx="1" fill="#0F62FE"/>
        <rect x="0" y="5" width="32" height="3" rx="1" fill="#0F62FE"/>
        <rect x="0" y="10" width="32" height="3" rx="1" fill="#0F62FE"/>
        <rect x="4" y="0" width="5" height="3" rx="0" fill="#fff"/>
        <rect x="4" y="5" width="5" height="3" rx="0" fill="#fff"/>
        <rect x="4" y="10" width="5" height="3" rx="0" fill="#fff"/>
        <rect x="23" y="0" width="5" height="3" rx="0" fill="#fff"/>
        <rect x="23" y="5" width="5" height="3" rx="0" fill="#fff"/>
        <rect x="23" y="10" width="5" height="3" rx="0" fill="#fff"/>
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="13" fill="#00B4D8" opacity="0.15"/>
      <path d="M9 14l3.5 3.5L19 10" stroke="#00B4D8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

// ── Certificate fullscreen overlay ────────────────────────────
function CertOverlay({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const typeLabel = cert.type === 'professional' ? 'Professional Certificate' : 'Specialization';

  return (
    <AnimatePresence>
      <motion.div
        className="cert-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        role="dialog"
        aria-modal="true"
        aria-label={`Certificate: ${cert.title}`}
      >
        {/* Backdrop */}
        <motion.div
          className="cert-overlay__backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Close button */}
        <button
          className="cert-overlay__close"
          onClick={onClose}
          aria-label="Close certificate preview"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Certificate document */}
        <motion.div
          className="cert-overlay__content"
          initial={{ scale: 0.88, opacity: 0, y: 32 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 16 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="cert-document"
            style={{ '--cert-accent-color': cert.accentColor } as React.CSSProperties}
          >
            {/* Corner ornaments */}
            <span className="cert-document__corner cert-document__corner--tl" />
            <span className="cert-document__corner cert-document__corner--tr" />
            <span className="cert-document__corner cert-document__corner--bl" />
            <span className="cert-document__corner cert-document__corner--br" />

            {/* Header */}
            <div
              className="cert-document__header"
              style={{
                background: `linear-gradient(150deg, color-mix(in srgb, ${cert.accentColor} 22%, #050505) 0%, #080808 65%)`,
              }}
            >
              <div className="cert-document__watermark">GD</div>

              <div className="cert-document__seal">
                <IssuerIcon type={cert.icon} />
              </div>

              <div className="cert-document__provider">{cert.issuer} · {cert.platform}</div>
              <div className="cert-document__cert-label">{typeLabel} · {cert.courseCount} courses</div>
              <h2 className="cert-document__title">{cert.title}</h2>
            </div>

            {/* Body */}
            <div className="cert-document__body">
              <div className="cert-document__meta-row">
                <div className="cert-document__meta-item">
                  <span className="cert-document__meta-key">Completed</span>
                  <span className="cert-document__meta-val">{cert.completedDate}</span>
                </div>
                <div className="cert-document__meta-item">
                  <span className="cert-document__meta-key">Issuer</span>
                  <span className="cert-document__meta-val">{cert.issuer}</span>
                </div>
                <div className="cert-document__meta-item">
                  <span className="cert-document__meta-key">Platform</span>
                  <span className="cert-document__meta-val">{cert.platform}</span>
                </div>
                <div className="cert-document__meta-item">
                  <span className="cert-document__meta-key">Courses</span>
                  <span className="cert-document__meta-val">{cert.courseCount}</span>
                </div>
              </div>

              <div className="cert-document__desc-label">About this certificate</div>
              <p className="cert-document__desc">{cert.description}</p>

              <div className="cert-document__desc-label">Skills covered</div>
              <div className="cert-document__skills-grid">
                {cert.skills.map(s => (
                  <span key={s} className="cert-document__skill-chip">{s}</span>
                ))}
              </div>

              <div className="cert-document__footer">
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-document__verify-btn"
                  aria-label={`Verify ${cert.title} on Coursera`}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    <path d="M8 1h3m0 0v3m0-3L5.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Verify Certificate
                </a>
                <span className="cert-document__platform">Verified via Coursera</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Single certificate card ────────────────────────────────────
function CertCard({ cert, index }: { cert: Certificate; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPress = useRef(false);

  const typeLabel = cert.type === 'professional' ? 'Professional Certificate' : 'Specialization';

  // ── Long-press detection (mobile) ────────────────────────────
  const handleTouchStart = useCallback(() => {
    didLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      didLongPress.current = true;
      setPreviewOpen(true);
    }, 500);
  }, []);

  const cancelLongPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    cancelLongPress();
    if (didLongPress.current) {
      e.preventDefault(); // Suppress click if long press triggered preview
    }
  }, [cancelLongPress]);

  // ── Click handler: only expand/collapse; preview via long-press or dedicated btn ──
  const handleClick = useCallback(() => {
    if (!didLongPress.current) {
      setExpanded(e => !e);
    }
    didLongPress.current = false;
  }, []);

  return (
    <>
      <ScrollReveal delay={0.06 + index * 0.08} y={32}>
        <div
          className="cert-card-frame"
          style={{ '--cert-frame-color': cert.accentColor } as React.CSSProperties}
        >
          {/* Preview hint label */}
          <span className="cert-card__preview-hint" aria-hidden="true">
            Hold to preview
          </span>

          <motion.article
            className={`cert-card ${expanded ? 'cert-card--expanded' : ''}`}
            style={{ '--cert-accent': cert.accentColor } as React.CSSProperties}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={cancelLongPress}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter') setExpanded(o => !o);
              if (e.key === ' ') { e.preventDefault(); setPreviewOpen(true); }
            }}
            aria-expanded={expanded}
            aria-label={`${cert.title} — press Enter to expand, Space to preview`}
          >
            {/* Accent top bar */}
            <div className="cert-card__accent-bar" />

            {/* Card header */}
            <div className="cert-card__header">
              <div className="cert-card__logo">
                <IssuerIcon type={cert.icon} />
              </div>
              <div className="cert-card__meta">
                <span className="cert-card__type-badge">{typeLabel}</span>
                <span className="cert-card__courses">{cert.courseCount} courses</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="cert-card__title">{cert.title}</h3>

            {/* Issuer + date row */}
            <div className="cert-card__info">
              <span className="cert-card__issuer">{cert.issuer}</span>
              <span className="cert-card__sep" aria-hidden="true">·</span>
              <span className="cert-card__platform">{cert.platform}</span>
              <span className="cert-card__sep" aria-hidden="true">·</span>
              <time className="cert-card__date">{cert.completedDate}</time>
            </div>

            {/* Description */}
            <p className={`cert-card__desc ${expanded ? 'cert-card__desc--full' : ''}`}>
              {cert.description}
            </p>

            {/* Skills */}
            <div className="cert-card__skills">
              {cert.skills.map(s => (
                <span key={s} className="cert-card__skill">{s}</span>
              ))}
            </div>

            {/* Footer: verify + preview + expand toggle */}
            <div className="cert-card__footer">
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-card__verify"
                onClick={e => e.stopPropagation()}
                aria-label={`Verify ${cert.title} certificate`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M8 1h3m0 0v3m0-3L5.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Verify
              </a>

              <div className="cert-card__footer-right">
                {/* Preview button (desktop) */}
                <button
                  className="cert-card__preview-btn"
                  onClick={e => { e.stopPropagation(); setPreviewOpen(true); }}
                  aria-label={`Preview ${cert.title} certificate`}
                  title="Preview certificate"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M1 6s1.8-4 5-4 5 4 5 4-1.8 4-5 4-5-4-5-4z" stroke="currentColor" strokeWidth="1.2"/>
                    <circle cx="6" cy="6" r="1.5" fill="currentColor"/>
                  </svg>
                </button>

                <button className="cert-card__toggle" aria-label={expanded ? 'Collapse' : 'Expand'}>
                  <motion.svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </button>
              </div>
            </div>

            {/* Hover glow overlay */}
            <div className="cert-card__glow" aria-hidden="true" />
          </motion.article>
        </div>
      </ScrollReveal>

      {/* Fullscreen preview portal */}
      {previewOpen && (
        <CertOverlay cert={cert} onClose={() => setPreviewOpen(false)} />
      )}
    </>
  );
}

export default function Certifications() {
  const professional = certificates.filter(c => c.type === 'professional');
  const specializations = certificates.filter(c => c.type === 'specialization');

  return (
    <section className="certifications section" id="certifications">
      <div className="container">
        {/* Section eyebrow */}
        <ScrollReveal>
          <div className="section-eyebrow">
            <span className="section-eyebrow__number">02</span>
            <span className="section-eyebrow__line" />
            <span className="section-eyebrow__label">Certifications</span>
          </div>
        </ScrollReveal>

        {/* Heading */}
        <div className="certs__header">
          <ScrollReveal delay={0.06}>
            <h2 className="certs__heading">
              Verified skills,{' '}
              <span className="certs__heading-accent">applied daily.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <p className="certs__sub">
              Professional certificates earned through hands-on, project-based learning across AI, UX design, frontend development, and SEO engineering.
            </p>
          </ScrollReveal>
        </div>

        {/* Professional Certificates */}
        <ScrollReveal delay={0.04}>
          <div className="certs__group-label">
            <span className="certs__group-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </span>
            Professional Certificates
            <span className="certs__group-count">{professional.length}</span>
          </div>
        </ScrollReveal>

        <div className="certs__grid">
          {professional.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>

        {/* Specializations */}
        <ScrollReveal delay={0.04}>
          <div className="certs__group-label certs__group-label--second">
            <span className="certs__group-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </span>
            Specializations
            <span className="certs__group-count">{specializations.length}</span>
          </div>
        </ScrollReveal>

        <div className="certs__grid certs__grid--wide">
          {specializations.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>

        {/* ── Certificate Carousel ── */}
        <ScrollReveal delay={0.06}>
          <div className="certs__carousel-section">
            <div className="certs__carousel-header">
              <div className="certs__group-label certs__group-label--second">
                <span className="certs__group-icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2M12 12v4M10 14h4"/></svg>
                </span>
                All Certifications — Carousel View
              </div>
            </div>
            <CertCarousel />
          </div>
        </ScrollReveal>

        {/* Coursera badge strip */}
        <ScrollReveal delay={0.1}>
          <div className="certs__footer-strip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M12 8v4l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            All certificates issued via <strong>Coursera</strong> and verified on-chain.
            <span className="certs__year-badge">2026</span>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .certs__header { margin-bottom: 48px; }
        .certs__heading {
          font-size: clamp(28px, 4.5vw, 52px);
          color: var(--text);
          margin-bottom: 14px;
          line-height: 1.1;
        }
        .certs__heading-accent { color: var(--green); }
        .certs__sub {
          font-size: 15px;
          color: var(--text-muted);
          max-width: 560px;
          line-height: 1.75;
        }

        .certs__group-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 24px;
        }
        .certs__group-label--second { margin-top: 56px; }
        .certs__group-icon { font-size: 14px; }
        .certs__group-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--green-dim);
          color: var(--green);
          font-size: 10px;
          font-weight: 700;
        }

        .certs__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 0;
        }
        .certs__grid--wide {
          grid-template-columns: 1fr;
          max-width: 680px;
        }

        /* ── Certificate card ──────────────────────────────── */
        .cert-card {
          position: relative;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          cursor: pointer;
          overflow: hidden;
          transition:
            border-color 0.25s var(--ease),
            box-shadow 0.3s var(--ease),
            background 0.35s var(--ease);
          display: flex;
          flex-direction: column;
          gap: 14px;
          user-select: none;
          -webkit-user-select: none;
        }
        .cert-card:hover,
        .cert-card--expanded {
          border-color: var(--cert-accent, var(--green));
          box-shadow: 0 8px 40px rgba(0,0,0,0.2), 0 0 0 1px var(--cert-accent, var(--green)) inset;
        }

        /* Accent top bar */
        .cert-card__accent-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--cert-accent, var(--green));
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
          opacity: 0;
          transition: opacity 0.3s var(--ease);
        }
        .cert-card:hover .cert-card__accent-bar,
        .cert-card--expanded .cert-card__accent-bar { opacity: 1; }

        .cert-card__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .cert-card__logo {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          flex-shrink: 0;
          padding: 8px;
        }
        .cert-card__meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }
        .cert-card__type-badge {
          display: inline-flex;
          align-items: center;
          padding: 3px 8px;
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: color-mix(in srgb, var(--cert-accent, var(--green)) 12%, transparent);
          color: var(--cert-accent, var(--green));
          border: 1px solid color-mix(in srgb, var(--cert-accent, var(--green)) 25%, transparent);
          white-space: nowrap;
        }
        .cert-card__courses {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-subtle);
          letter-spacing: 0.05em;
        }

        .cert-card__title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          line-height: 1.3;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .cert-card__info {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .cert-card__issuer {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--cert-accent, var(--green));
          font-weight: 600;
        }
        .cert-card__platform, .cert-card__date {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
        }
        .cert-card__sep { color: var(--text-subtle); font-size: 11px; }

        .cert-card__desc {
          font-size: 13px;
          line-height: 1.65;
          color: var(--text-muted);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: all 0.3s var(--ease);
          margin: 0;
        }
        .cert-card__desc--full {
          -webkit-line-clamp: unset;
          overflow: visible;
        }

        .cert-card__skills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .cert-card__skill {
          display: inline-flex;
          align-items: center;
          padding: 3px 9px;
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.03em;
          background: var(--bg-subtle);
          color: var(--text-muted);
          border: 1px solid var(--border);
          white-space: nowrap;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .cert-card:hover .cert-card__skill {
          border-color: color-mix(in srgb, var(--cert-accent, var(--green)) 30%, transparent);
          color: var(--text);
        }

        .cert-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid var(--border);
          margin-top: auto;
        }
        .cert-card__footer-right {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .cert-card__verify {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--cert-accent, var(--green));
          letter-spacing: 0.04em;
          transition: opacity 0.2s;
          text-decoration: none;
        }
        .cert-card__verify:hover { opacity: 0.75; }

        /* Preview button */
        .cert-card__preview-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 1px solid var(--border);
          color: var(--text-muted);
          opacity: 0;
          transition: opacity 0.2s, border-color 0.2s, color 0.2s, background 0.2s;
        }
        .cert-card:hover .cert-card__preview-btn {
          opacity: 1;
          border-color: var(--cert-accent, var(--green));
          color: var(--cert-accent, var(--green));
          background: color-mix(in srgb, var(--cert-accent, var(--green)) 10%, transparent);
        }

        .cert-card__toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 1px solid var(--border);
          color: var(--text-muted);
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .cert-card:hover .cert-card__toggle {
          border-color: var(--cert-accent, var(--green));
          color: var(--cert-accent, var(--green));
          background: color-mix(in srgb, var(--cert-accent, var(--green)) 10%, transparent);
        }

        .cert-card__glow {
          position: absolute;
          inset: 0;
          border-radius: var(--radius-lg);
          background: radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in srgb, var(--cert-accent, var(--green)) 6%, transparent) 0%, transparent 70%);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s var(--ease);
        }
        .cert-card:hover .cert-card__glow,
        .cert-card--expanded .cert-card__glow { opacity: 1; }

        /* ── Carousel section wrapper ──────────────────────── */
        .certs__carousel-section {
          margin-top: 72px;
          padding-top: 48px;
          border-top: 1px solid var(--border);
        }
        .certs__carousel-header { margin-bottom: 28px; }

        /* ── Footer strip ────────────────────────────────────── */
        .certs__footer-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 48px;
          padding: 14px 20px;
          border-radius: var(--radius-md);
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }
        .certs__footer-strip svg { flex-shrink: 0; color: var(--green); }
        .certs__footer-strip strong { color: var(--text); }
        .certs__year-badge {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          border-radius: 100px;
          background: var(--green-dim);
          color: var(--green);
          font-size: 10px;
          letter-spacing: 0.08em;
        }

        @media (max-width: 980px) {
          .certs__grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .certs__grid { grid-template-columns: 1fr; }
          .certs__grid--wide { max-width: 100%; }
        }
      `}</style>
    </section>
  );
}
