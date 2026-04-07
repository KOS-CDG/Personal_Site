import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useTheme } from '../App';

const ROLES = [
  'Web Developer',
  'IoT Engineer',
  'STEM Student',
  'Circuit Tinkerer',
];

export default function Hero() {
  const reduced = useReducedMotion();
  const { theme } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  // Typewriter effect for role
  useEffect(() => {
    if (reduced) {
      setDisplayed(ROLES[0]);
      return;
    }

    const target = ROLES[roleIndex];
    let i = typing ? 0 : target.length;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (typing) {
        setDisplayed(target.slice(0, i + 1));
        i++;
        if (i >= target.length) {
          timer = setTimeout(() => setTyping(false), 2200);
          return;
        }
      } else {
        setDisplayed(target.slice(0, i - 1));
        i--;
        if (i <= 0) {
          setRoleIndex(r => (r + 1) % ROLES.length);
          setTyping(true);
          return;
        }
      }
      timer = setTimeout(tick, typing ? 70 : 40);
    };

    timer = setTimeout(tick, typing ? 120 : 40);
    return () => clearTimeout(timer);
  }, [roleIndex, typing, reduced]);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className={`hero hero--${theme}`} id="home">
      {/* Background grid */}
      <div className="hero__grid" aria-hidden="true" />

      {/* Ambient glow orbs */}
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />

      {/* Dark mode: terminal prompt decoration */}
      {theme === 'dark' && (
        <div className="hero__terminal-bar" aria-hidden="true">
          <span className="hero__terminal-dot hero__terminal-dot--r" />
          <span className="hero__terminal-dot hero__terminal-dot--y" />
          <span className="hero__terminal-dot hero__terminal-dot--g" />
          <span className="hero__terminal-path">~/portfolio/glen-caparros</span>
        </div>
      )}

      {/* Navy mode: depth rings */}
      {theme === 'navy' && (
        <div className="hero__navy-rings" aria-hidden="true">
          <div className="hero__navy-ring" />
          <div className="hero__navy-ring hero__navy-ring--2" />
          <div className="hero__navy-ring hero__navy-ring--3" />
        </div>
      )}

      <div className="container hero__content">
        {/* ── LEFT: Text content ─────────────────────── */}
        <motion.div
          variants={reduced ? {} : containerVariants}
          initial="hidden"
          animate="show"
          className="hero__text"
        >
          {/* Status badge */}
          <motion.div variants={reduced ? {} : itemVariants} className="hero__badge">
            <span className="dot" aria-hidden="true" />
            <span>Available for projects</span>
          </motion.div>

          {/* Big headline */}
          <motion.h1 variants={reduced ? {} : itemVariants} className="hero__heading">
            <span className="hero__heading-line">Glen</span>
            <span className="hero__heading-line hero__heading-line--accent">
              Dhale.
            </span>
          </motion.h1>

          {/* Role typewriter */}
          <motion.div variants={reduced ? {} : itemVariants} className="hero__role">
            <span className="hero__role-prefix">I build as a&nbsp;</span>
            <span className="hero__role-typed" aria-live="polite">
              {displayed}
              <span className="hero__cursor" aria-hidden="true">|</span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p variants={reduced ? {} : itemVariants} className="hero__desc">
            Grade 11 STEM student from Gumaca, Philippines.
            <br />
            Bridging hardware and the web through ESP32, RFID, Firebase,
            <br className="hero__desc-br" />
            and responsive front-end interfaces.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={reduced ? {} : itemVariants} className="hero__ctas">
            <a href="#projects" className="hero__btn hero__btn--primary">
              View Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact" className="hero__btn hero__btn--ghost">
              Let's talk
            </a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Profile picture + visuals ──────── */}
        <motion.div
          className="hero__visual"
          initial={reduced ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ── TERMINAL MODE: scan-line avatar with matrix border ── */}
          {theme === 'dark' && (
            <div className="hero__profile-card hero__profile-card--terminal">
              <div className="hero__avatar-glow" aria-hidden="true" />
              <div className="hero__terminal-frame" aria-hidden="true">
                <span className="hero__terminal-corner hero__terminal-corner--tl" />
                <span className="hero__terminal-corner hero__terminal-corner--tr" />
                <span className="hero__terminal-corner hero__terminal-corner--bl" />
                <span className="hero__terminal-corner hero__terminal-corner--br" />
              </div>
              <div className="hero__avatar hero__avatar--terminal">
                <img src="/profilee.jpg" alt="Glen Dhale Caparros – profile photo"
                  className="hero__avatar-img hero__avatar-img--terminal"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    const p = (e.currentTarget as HTMLImageElement).closest('.hero__avatar');
                    if (p) p.classList.add('hero__avatar--fallback');
                  }} />
                <div className="hero__avatar-scanlines" aria-hidden="true" />
                <div className="hero__avatar-initials" aria-hidden="true">GD</div>
              </div>
              <div className="hero__avatar-status" aria-hidden="true">
                <span className="dot" /><span>Open to work</span>
              </div>
              <div className="hero__ring hero__ring--1" aria-hidden="true" />
              <div className="hero__ring hero__ring--2" aria-hidden="true" />
              <div className="hero__ring hero__ring--3" aria-hidden="true" />
              <motion.div className="hero__info-card hero__info-card--location"
                initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 1C4.07 1 2.5 2.57 2.5 4.5c0 2.67 3.5 6.5 3.5 6.5s3.5-3.83 3.5-6.5C9.5 2.57 7.93 1 6 1Zm0 4.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" fill="currentColor"/>
                </svg>
                <span>Gumaca, PH</span>
              </motion.div>
              <motion.div className="hero__info-card hero__info-card--stack"
                initial={reduced ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}>
                <span className="hero__stack-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </span>
                <span>ESP32 + Firebase</span>
              </motion.div>
            </div>
          )}

          {/* ── RESUME MODE: clean document-style portrait ── */}
          {theme === 'light' && (
            <div className="hero__profile-card hero__profile-card--resume">
              <div className="hero__resume-portrait">
                <div className="hero__resume-portrait-inner">
                  <img src="/profilee.jpg" alt="Glen Dhale Caparros – profile photo"
                    className="hero__avatar-img hero__avatar-img--resume"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                      const p = (e.currentTarget as HTMLImageElement).closest('.hero__resume-portrait-inner');
                      if (p) (p as HTMLElement).classList.add('hero__resume-portrait--fallback');
                    }} />
                  <div className="hero__resume-initials" aria-hidden="true">GD</div>
                </div>
                <div className="hero__resume-corner-accent hero__resume-corner-accent--br" aria-hidden="true" />
              </div>
              <div className="hero__resume-byline">
                <span className="hero__resume-name-label">Glen Dhale Caparros</span>
                <span className="hero__resume-title-label">Web Developer · IoT Engineer · STEM Student</span>
              </div>
              <div className="hero__resume-divider" aria-hidden="true" />
              <div className="hero__resume-meta-row">
                <div className="hero__resume-meta-item">
                  <span className="hero__resume-meta-key">Location</span>
                  <span className="hero__resume-meta-val">Gumaca, PH</span>
                </div>
                <div className="hero__resume-meta-item">
                  <span className="hero__resume-meta-key">Status</span>
                  <span className="hero__resume-meta-val hero__resume-meta-val--open">
                    <span className="dot" aria-hidden="true" />Open to work
                  </span>
                </div>
                <div className="hero__resume-meta-item">
                  <span className="hero__resume-meta-key">Certs</span>
                  <span className="hero__resume-meta-val">5 issued 2026</span>
                </div>
              </div>
            </div>
          )}

          {/* ── SIGNATURE MODE: gold-framed portrait with depth ── */}
          {theme === 'navy' && (
            <div className="hero__profile-card hero__profile-card--signature">
              <div className="hero__avatar-glow" aria-hidden="true" />
              <div className="hero__signature-frame" aria-hidden="true">
                <div className="hero__signature-frame-ring hero__signature-frame-ring--1" />
                <div className="hero__signature-frame-ring hero__signature-frame-ring--2" />
                <div className="hero__signature-frame-ring hero__signature-frame-ring--3" />
              </div>
              <div className="hero__avatar hero__avatar--signature">
                <img src="/profilee.jpg" alt="Glen Dhale Caparros – profile photo"
                  className="hero__avatar-img"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    const p = (e.currentTarget as HTMLImageElement).closest('.hero__avatar');
                    if (p) p.classList.add('hero__avatar--fallback');
                  }} />
                <div className="hero__avatar-gold-overlay" aria-hidden="true" />
                <div className="hero__avatar-initials" aria-hidden="true">GD</div>
              </div>
              <div className="hero__avatar-status hero__avatar-status--gold" aria-hidden="true">
                <span className="dot" /><span>Open to work</span>
              </div>
              <motion.div className="hero__info-card hero__info-card--location"
                initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 1C4.07 1 2.5 2.57 2.5 4.5c0 2.67 3.5 6.5 3.5 6.5s3.5-3.83 3.5-6.5C9.5 2.57 7.93 1 6 1Zm0 4.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" fill="currentColor"/>
                </svg>
                <span>Gumaca, PH</span>
              </motion.div>
              <motion.div className="hero__info-card hero__info-card--stack"
                initial={reduced ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}>
                <span className="hero__stack-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </span>
                <span>ESP32 + Firebase</span>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="hero__scroll"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          aria-hidden="true"
        >
          <motion.div
            className="hero__scroll-line"
            animate={reduced ? {} : { scaleY: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span>scroll</span>
        </motion.div>
      </div>

      {/* Floating tech chips (decorative) */}
      {!reduced && (
        <div className="hero__chips" aria-hidden="true">
          {['ESP32', 'Firebase', 'RFID', 'HTML5', 'CSS3', 'JS'].map((chip, i) => (
            <motion.span
              key={chip}
              className="hero__chip"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ delay: 1 + i * 0.08, duration: 0.5 }}
            >
              {chip}
            </motion.span>
          ))}
        </div>
      )}

      <style>{`
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: 80px;
        }

        /* Dark mode: terminal aesthetic grid */
        .hero--dark .hero__grid {
          background-image:
            linear-gradient(rgba(0,255,70,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,70,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%);
        }

        /* Light mode: subtle dot grid */
        .hero--light .hero__grid {
          background-image: radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 100%);
        }

        /* Navy mode: no hard grid — depth handled by rings and particles */
        .hero--navy .hero__grid {
          background-image: radial-gradient(circle, rgba(126,184,247,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 100%);
        }

        .hero__grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 100%);
        }

        .hero__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .hero__orb--1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, var(--green-glow, rgba(34,197,94,0.08)) 0%, transparent 70%);
          top: -100px; left: -100px;
        }
        .hero__orb--2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, var(--green-glow, rgba(34,197,94,0.05)) 0%, transparent 70%);
          bottom: 0; right: -80px;
        }

        /* Dark mode: terminal title bar */
        .hero__terminal-bar {
          position: absolute;
          top: 90px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: rgba(0, 255, 70, 0.04);
          border: 1px solid rgba(0, 255, 70, 0.10);
          border-radius: 8px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: rgba(0, 255, 70, 0.35);
          letter-spacing: 0.08em;
          z-index: 2;
          pointer-events: none;
        }
        .hero__terminal-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .hero__terminal-dot--r { background: #ff5f57; }
        .hero__terminal-dot--y { background: #ffbd2e; }
        .hero__terminal-dot--g { background: #28c840; }
        .hero__terminal-path { margin-left: 6px; }

        /* Navy depth rings (background decoration) */
        .hero__navy-rings {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 8%;
          pointer-events: none;
          z-index: 0;
        }
        .hero__navy-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(126, 184, 247, 0.04);
          width: 600px; height: 600px;
          animation: navy-ring-pulse 6s ease-in-out infinite;
        }
        .hero__navy-ring--2 {
          width: 780px; height: 780px;
          animation-delay: 2s;
          border-color: rgba(126, 184, 247, 0.025);
        }
        .hero__navy-ring--3 {
          width: 960px; height: 960px;
          animation-delay: 4s;
          border-color: rgba(126, 184, 247, 0.015);
        }
        @keyframes navy-ring-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.015); }
        }

        .hero__content {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 420px auto;
          align-items: center;
          gap: 40px;
          padding-bottom: 60px;
          padding-top: 20px;
        }

        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          border: 1px solid var(--border-hover);
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 28px;
          width: fit-content;
        }

        .hero__heading {
          display: flex;
          flex-direction: column;
          font-size: clamp(60px, 10vw, 140px);
          font-weight: 800;
          line-height: 0.9;
          letter-spacing: -0.04em;
          margin-bottom: 32px;
        }

        .hero__heading-line { color: var(--text); }
        .hero__heading-line--accent {
          color: transparent;
          -webkit-text-stroke: 2px var(--green);
        }

        /* Navy: gold accent on second line */
        .hero--navy .hero__heading-line--accent {
          -webkit-text-stroke-color: var(--gold, var(--green));
        }

        .hero__role {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 0;
          font-size: clamp(15px, 2vw, 20px);
          font-weight: 400;
          margin-bottom: 24px;
          min-height: 1.5em;
        }
        .hero__role-prefix { color: var(--text-muted); }
        .hero__role-typed {
          font-family: var(--font-display);
          font-weight: 700;
          color: var(--green);
        }
        .hero__cursor {
          display: inline-block;
          margin-left: 2px;
          animation: blink 1s step-end infinite;
          color: var(--green);
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        .hero__desc {
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-muted);
          max-width: 400px;
          margin-bottom: 40px;
        }
        .hero__desc-br { display: none; }
        @media (min-width: 640px) { .hero__desc-br { display: block; } }

        .hero__ctas {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero__btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.02em;
          transition: all 0.25s var(--ease);
        }
        .hero__btn--primary {
          background: var(--green);
          color: #040d07;
        }
        .hero__btn--primary:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px var(--green-glow);
        }
        .hero__btn--ghost {
          border: 1px solid var(--border-hover);
          color: var(--text-muted);
        }
        .hero__btn--ghost:hover {
          border-color: var(--green);
          color: var(--green);
        }

        /* Navy: gold CTA button */
        .hero--navy .hero__btn--primary {
          background: linear-gradient(135deg, var(--gold, #c8a96e) 0%, #a87d3c 100%);
          color: #1a0f00;
        }

        .hero__visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero__profile-card {
          position: relative;
          width: 340px;
          height: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Terminal mode profile ──────────────────────────── */
        .hero__avatar--terminal {
          border-color: var(--green) !important;
          border-radius: 4px !important;
          box-shadow: 0 0 0 1px var(--green), 0 0 32px rgba(0,255,70,0.20), inset 0 0 20px rgba(0,255,70,0.04) !important;
        }
        .hero__avatar--terminal:hover {
          box-shadow: 0 0 0 2px var(--green), 0 0 60px rgba(0,255,70,0.35), inset 0 0 30px rgba(0,255,70,0.08) !important;
          border-radius: 4px !important;
        }
        .hero__avatar-img--terminal { filter: contrast(1.08) saturate(0.92); }
        .hero__avatar-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0,255,70,0.025) 3px,
            rgba(0,255,70,0.025) 4px
          );
          pointer-events: none;
          z-index: 2;
        }
        .hero__terminal-frame {
          position: absolute;
          inset: -16px;
          z-index: 3;
          pointer-events: none;
        }
        .hero__terminal-corner {
          position: absolute;
          width: 18px; height: 18px;
          border-color: var(--green);
          border-style: solid;
          opacity: 0.7;
        }
        .hero__terminal-corner--tl { top: 0; left: 0; border-width: 2px 0 0 2px; }
        .hero__terminal-corner--tr { top: 0; right: 0; border-width: 2px 2px 0 0; }
        .hero__terminal-corner--bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
        .hero__terminal-corner--br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

        /* ── Resume mode profile ───────────────────────────── */
        .hero__profile-card--resume {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 320px;
          height: auto;
          gap: 16px;
        }
        .hero__resume-portrait {
          position: relative;
          width: 190px;
          height: 230px;
        }
        .hero__resume-portrait-inner {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border: 2px solid rgba(0,0,0,0.14);
          box-shadow: 4px 4px 0 rgba(26,107,60,0.18), 0 2px 24px rgba(0,0,0,0.08);
          background: var(--bg-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero__resume-portrait--fallback { }
        .hero__avatar-img--resume {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.5s var(--ease);
          filter: grayscale(8%);
        }
        .hero__resume-portrait:hover .hero__avatar-img--resume { transform: scale(1.03); }
        .hero__resume-initials {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 56px;
          font-weight: 800;
          color: var(--green);
          letter-spacing: -0.04em;
          opacity: 0;
          pointer-events: none;
        }
        .hero__resume-portrait--fallback .hero__avatar-img--resume { display: none; }
        .hero__resume-portrait--fallback .hero__resume-initials { opacity: 1; }
        .hero__resume-corner-accent--br {
          position: absolute;
          bottom: -8px;
          right: -8px;
          width: 40px;
          height: 40px;
          border-right: 2px solid var(--green);
          border-bottom: 2px solid var(--green);
          pointer-events: none;
        }
        .hero__resume-byline {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          text-align: center;
        }
        .hero__resume-name-label {
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.02em;
        }
        .hero__resume-title-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.07em;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .hero__resume-divider {
          width: 100%;
          height: 1px;
          background: var(--border);
        }
        .hero__resume-meta-row {
          display: flex;
          gap: 20px;
          width: 100%;
          justify-content: center;
        }
        .hero__resume-meta-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
          align-items: center;
        }
        .hero__resume-meta-key {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-subtle);
        }
        .hero__resume-meta-val {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text);
          font-weight: 600;
        }
        .hero__resume-meta-val--open {
          display: flex;
          align-items: center;
          gap: 5px;
          color: var(--green);
        }

        /* ── Signature mode profile ────────────────────────── */
        .hero__avatar--signature {
          border-color: var(--gold, #c8a96e) !important;
          box-shadow: 0 0 0 6px rgba(200,169,110,0.12), 0 24px 64px rgba(0,0,0,0.5) !important;
          overflow: hidden;
        }
        .hero__avatar--signature:hover {
          box-shadow: 0 0 0 12px rgba(200,169,110,0.18), 0 32px 80px rgba(0,0,0,0.6) !important;
        }
        .hero__avatar-gold-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 50% at 30% 20%, rgba(200,169,110,0.12) 0%, transparent 60%);
          pointer-events: none;
          z-index: 2;
          transition: opacity 0.4s ease;
        }
        .hero__avatar--signature:hover .hero__avatar-gold-overlay { opacity: 0; }
        .hero__avatar-status--gold {
          border-color: var(--gold, #c8a96e) !important;
          color: var(--gold, #c8a96e) !important;
        }
        .hero__avatar-status--gold .dot {
          background: var(--gold, #c8a96e) !important;
          box-shadow: 0 0 6px var(--gold, #c8a96e);
        }
        .hero__signature-frame {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .hero__signature-frame-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid var(--gold, #c8a96e);
        }
        .hero__signature-frame-ring--1 { width: 240px; height: 240px; opacity: 0.18; animation: ring-rotate 10s linear infinite; border-style: dashed; }
        .hero__signature-frame-ring--2 { width: 292px; height: 292px; opacity: 0.10; animation: ring-rotate 18s linear infinite reverse; }
        .hero__signature-frame-ring--3 { width: 344px; height: 344px; opacity: 0.05; animation: ring-rotate 26s linear infinite; }

        .hero__avatar-glow {
          position: absolute;
          inset: -20px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--green-glow) 0%, transparent 65%);
          animation: glow-pulse 3s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }

        .hero__avatar {
          position: relative;
          z-index: 4;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          border: 2.5px solid var(--green);
          overflow: hidden;
          background: var(--bg-elevated);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 6px var(--green-dim), 0 24px 64px rgba(0,0,0,0.4);
          transition: box-shadow 0.4s var(--ease);
        }
        .hero__avatar:hover {
          box-shadow: 0 0 0 10px var(--green-dim), 0 32px 80px rgba(0,0,0,0.5);
        }
        .hero__avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }
        .hero__avatar--fallback .hero__avatar-img { display: none; }
        .hero__avatar-initials {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 52px;
          font-weight: 800;
          color: var(--green);
          letter-spacing: -0.04em;
          opacity: 0;
          pointer-events: none;
        }
        .hero__avatar--fallback .hero__avatar-initials { opacity: 1; }

        .hero__avatar-status {
          position: absolute;
          bottom: 72px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 6;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: var(--bg-elevated);
          border: 1px solid var(--green);
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--green);
          letter-spacing: 0.06em;
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .hero__ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid var(--green);
          pointer-events: none;
        }
        .hero__ring--1 { width: 240px; height: 240px; opacity: 0.14; animation: ring-rotate 8s linear infinite; border-style: dashed; }
        .hero__ring--2 { width: 290px; height: 290px; opacity: 0.08; animation: ring-rotate 14s linear infinite reverse; }
        .hero__ring--3 { width: 340px; height: 340px; opacity: 0.04; animation: ring-rotate 20s linear infinite; }
        @keyframes ring-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .hero__info-card {
          position: absolute;
          z-index: 6;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          white-space: nowrap;
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          animation: float-card 4s ease-in-out infinite;
        }
        .hero__info-card--location { bottom: 24px; right: -10px; animation-delay: 0s; }
        .hero__info-card--stack { top: 24px; left: -10px; animation-delay: 2s; }
        @keyframes float-card {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .hero__stack-icon { font-size: 12px; }

        .hero__scroll {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-subtle);
          padding-bottom: 20px;
          align-self: end;
        }
        .hero__scroll-line {
          width: 1px;
          height: 56px;
          background: linear-gradient(to bottom, var(--green), transparent);
          transform-origin: top;
        }

        .hero__chips {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .hero__chip {
          position: absolute;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.08em;
          padding: 5px 12px;
          border: 1px solid var(--border);
          border-radius: 100px;
          color: var(--text-subtle);
          background: var(--bg-subtle);
        }
        .hero__chips .hero__chip:nth-child(1) { top: 18%; right: 8%; }
        .hero__chips .hero__chip:nth-child(2) { top: 32%; right: 4%; }
        .hero__chips .hero__chip:nth-child(3) { top: 54%; right: 2%; }
        .hero__chips .hero__chip:nth-child(4) { bottom: 28%; right: 7%; }
        .hero__chips .hero__chip:nth-child(5) { bottom: 16%; right: 12%; }
        .hero__chips .hero__chip:nth-child(6) { top: 20%; left: 4%; }

        @media (max-width: 900px) {
          .hero__content {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            text-align: center;
          }
          .hero__visual { order: -1; margin-bottom: 8px; }
          .hero__profile-card { width: 240px; height: 240px; }
          .hero__avatar { width: 150px; height: 150px; }
          .hero__ring--1 { width: 180px; height: 180px; }
          .hero__ring--2 { width: 210px; height: 210px; }
          .hero__ring--3 { width: 240px; height: 240px; }
          .hero__avatar-status { bottom: 50px; }
          .hero__badge { margin-inline: auto; }
          .hero__desc { margin-inline: auto; }
          .hero__ctas { justify-content: center; }
          .hero__scroll { display: none; }
          .hero__chips { display: none; }
          .hero__heading-line--accent { -webkit-text-stroke-width: 1.5px; }
          .hero__info-card { display: none; }
          .hero__terminal-bar { display: none; }
          .hero__navy-rings { display: none; }
        }
      `}</style>
    </section>
  );
}
