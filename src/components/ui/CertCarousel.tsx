import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../App';
import { certificates } from '../../data/portfolio';

// Per-mode presentation variants
const MODE_LABEL: Record<string, string> = {
  dark:  '// certificates',
  light: 'Professional Certifications',
  navy:  'Credentials',
};

function ProgressDots({ total, active, accent }: { total: number; active: number; accent: string }) {
  return (
    <div className="carousel__dots" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`carousel__dot${i === active ? ' carousel__dot--active' : ''}`}
          style={i === active ? { background: accent } : {}}
        />
      ))}
    </div>
  );
}

export default function CertCarousel() {
  const { theme } = useTheme();
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = backward
  const total = certificates.length;
  const touchStartX = useRef<number | null>(null);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Accent per cert — or fall back to theme accent
  const accentOf = (idx: number) => certificates[idx]?.accentColor ?? '#00ff46';

  const goTo = useCallback((idx: number) => {
    const next = (idx + total) % total;
    setDir(next > active ? 1 : -1);
    setActive(next);
  }, [active, total]);

  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  // Auto-advance
  useEffect(() => {
    autoTimer.current = setInterval(() => {
      setDir(1);
      setActive(i => (i + 1) % total);
    }, 6000);
    return () => { if (autoTimer.current) clearInterval(autoTimer.current); };
  }, [total]);

  const resetAuto = () => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setDir(1);
      setActive(i => (i + 1) % total);
    }, 6000);
  };

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      dx < 0 ? (setDir(1), setActive(i => (i + 1) % total)) : (setDir(-1), setActive(i => (i - 1 + total) % total));
      resetAuto();
    }
    touchStartX.current = null;
  };

  // Keyboard
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { next(); resetAuto(); }
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp'  ) { prev(); resetAuto(); }
  };

  const cert = certificates[active];
  const accent = accentOf(active);
  const modeLabel = MODE_LABEL[theme] ?? 'Certifications';
  const isTerminal = theme === 'dark';
  const isResume   = theme === 'light';
  const isSignature= theme === 'navy';

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div
      className={`cert-carousel cert-carousel--${theme}`}
      role="region"
      aria-label="Certificate carousel"
      aria-roledescription="carousel"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {/* Mode-appropriate label */}
      <div className="carousel__eyebrow">
        {isTerminal && <span className="carousel__terminal-prompt" aria-hidden="true">$ </span>}
        <span className="carousel__label" style={{ '--c-accent': accent } as React.CSSProperties}>
          {modeLabel}
        </span>
        <span className="carousel__counter">
          {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Main display */}
      <div
        className="carousel__stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Accent line */}
        <div
          className="carousel__accent-line"
          style={{ background: accent }}
          aria-hidden="true"
        />

        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={cert.id}
            className="carousel__slide"
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            aria-label={`${cert.title}, issued by ${cert.issuer}, completed ${cert.completedDate}`}
          >
            {/* Issuer + type */}
            <div className="carousel__meta">
              <span className="carousel__issuer" style={{ color: accent }}>{cert.issuer}</span>
              <span className="carousel__sep" aria-hidden="true">·</span>
              <span className="carousel__platform">{cert.platform}</span>
              <span className="carousel__sep" aria-hidden="true">·</span>
              <span className="carousel__type">
                {cert.type === 'professional' ? 'Prof. Certificate' : 'Specialization'}
              </span>
            </div>

            {/* Title */}
            <h3 className="carousel__title" style={{ '--c-accent': accent } as React.CSSProperties}>
              {cert.title}
            </h3>

            {/* Description */}
            <p className="carousel__desc">{cert.description}</p>

            {/* Skills rail */}
            <div className="carousel__skills" aria-label="Skills covered">
              {cert.skills.slice(0, 6).map(s => (
                <span
                  key={s}
                  className="carousel__skill"
                  style={{ borderColor: `color-mix(in srgb, ${accent} 28%, transparent)` }}
                >
                  {s}
                </span>
              ))}
              {cert.skills.length > 6 && (
                <span className="carousel__skill carousel__skill--more">
                  +{cert.skills.length - 6}
                </span>
              )}
            </div>

            {/* Footer: date + verify */}
            <div className="carousel__footer">
              <span className="carousel__date">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M1 5h10M4 1v2M8 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                {cert.completedDate}
              </span>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="carousel__verify"
                style={{ color: accent }}
                aria-label={`Verify ${cert.title}`}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M8 1h3m0 0v3m0-3L5.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Verify
              </a>
            </div>

            {/* Courses count watermark */}
            <div className="carousel__course-count" aria-hidden="true"
              style={{ color: accent }}
            >
              {cert.courseCount}<span>courses</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Background glow (Signature only) */}
        {isSignature && (
          <div
            className="carousel__signature-glow"
            style={{ background: `radial-gradient(ellipse 60% 80% at 80% 50%, color-mix(in srgb, ${accent} 8%, transparent), transparent 70%)` }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Controls row */}
      <div className="carousel__controls">
        {/* Prev */}
        <button
          className="carousel__btn"
          onClick={() => { prev(); resetAuto(); }}
          aria-label="Previous certificate"
          style={{ '--c-accent': accent } as React.CSSProperties}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Progress dots */}
        <ProgressDots total={total} active={active} accent={accent} />

        {/* Next */}
        <button
          className="carousel__btn"
          onClick={() => { next(); resetAuto(); }}
          aria-label="Next certificate"
          style={{ '--c-accent': accent } as React.CSSProperties}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <style>{`
        /* ── Base carousel ──────────────────────────────────────── */
        .cert-carousel {
          position: relative;
          outline: none;
          width: 100%;
        }

        .carousel__eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .carousel__terminal-prompt {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--green);
          opacity: 0.6;
        }
        .carousel__label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .carousel__counter {
          margin-left: auto;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--text-subtle);
        }

        /* ── Stage ──────────────────────────────────────────────── */
        .carousel__stage {
          position: relative;
          overflow: hidden;
          min-height: 260px;
          padding: 28px 32px 24px;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .carousel__accent-line {
          position: absolute;
          top: 0; left: 0;
          width: 3px;
          bottom: 0;
          transition: background 0.5s ease;
        }

        .carousel__slide {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .carousel__meta {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .carousel__issuer {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          transition: color 0.4s ease;
        }
        .carousel__platform,
        .carousel__type {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--text-muted);
        }
        .carousel__sep { color: var(--text-subtle); }

        .carousel__title {
          font-family: 'Syne', 'Helvetica Neue', sans-serif;
          font-size: clamp(16px, 2.5vw, 22px);
          font-weight: 700;
          color: var(--text);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .carousel__desc {
          font-size: 13.5px;
          line-height: 1.7;
          color: var(--text-muted);
          max-width: 640px;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .carousel__skills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .carousel__skill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.04em;
          padding: 3px 10px;
          border: 1px solid var(--border);
          color: var(--text-muted);
          transition: border-color 0.3s ease;
        }
        .carousel__skill--more {
          color: var(--text-subtle);
        }

        .carousel__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 8px;
        }
        .carousel__date {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--text-subtle);
        }
        .carousel__verify {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .carousel__verify:hover { opacity: 0.7; }

        .carousel__course-count {
          position: absolute;
          top: 0;
          right: 0;
          font-family: 'Syne', sans-serif;
          font-size: 56px;
          font-weight: 800;
          letter-spacing: -0.05em;
          opacity: 0.06;
          line-height: 1;
          user-select: none;
          pointer-events: none;
          display: flex;
          align-items: baseline;
          gap: 4px;
        }
        .carousel__course-count span {
          font-size: 12px;
          letter-spacing: 0.1em;
          font-weight: 400;
          opacity: 0.8;
          margin-left: 6px;
        }

        /* ── Controls ───────────────────────────────────────────── */
        .carousel__controls {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-top: 16px;
        }
        .carousel__btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: 1px solid var(--border);
          color: var(--text-muted);
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .carousel__btn:hover {
          border-color: var(--c-accent, var(--green));
          color: var(--c-accent, var(--green));
          background: color-mix(in srgb, var(--c-accent, var(--green)) 8%, transparent);
        }

        .carousel__dots {
          display: flex;
          gap: 7px;
          align-items: center;
        }
        .carousel__dot {
          width: 20px;
          height: 2px;
          background: var(--border);
          transition: background 0.35s ease, width 0.25s ease;
        }
        .carousel__dot--active {
          width: 32px;
          transition: background 0.35s ease, width 0.25s ease;
        }

        /* ── Signature glow ─────────────────────────────────────── */
        .carousel__signature-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          transition: background 0.6s ease;
        }
        .carousel__slide { position: relative; z-index: 1; }

        /* ── Terminal mode overrides ────────────────────────────── */
        .cert-carousel--dark .carousel__stage {
          border-color: rgba(0,255,70,0.08);
        }
        .cert-carousel--dark .carousel__skill {
          border-radius: 0;
        }
        .cert-carousel--dark .carousel__btn {
          border-radius: 0;
        }
        .cert-carousel--dark .carousel__accent-line {
          width: 2px;
        }

        /* ── Resume mode overrides ──────────────────────────────── */
        .cert-carousel--light .carousel__stage {
          border-color: rgba(0,0,0,0.07);
          border-left: none;
          border-right: none;
        }
        .cert-carousel--light .carousel__title {
          letter-spacing: -0.03em;
        }
        .cert-carousel--light .carousel__btn {
          border-radius: 2px;
        }

        /* ── Signature mode overrides ───────────────────────────── */
        .cert-carousel--navy .carousel__stage {
          border-color: rgba(200,169,110,0.12);
        }
        .cert-carousel--navy .carousel__btn {
          border-radius: 0;
        }

        @media (max-width: 600px) {
          .carousel__stage { padding: 20px 20px 20px 26px; min-height: 300px; }
          .carousel__title { font-size: 16px; }
          .carousel__course-count { font-size: 40px; }
        }
      `}</style>
    </div>
  );
}
