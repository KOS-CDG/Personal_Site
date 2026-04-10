import { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import ScrollReveal from './ui/ScrollReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useTheme } from '../App';

interface StatProps { value: number; label: string; suffix?: string; }

function AnimatedStat({ value, label, suffix = '' }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, v => Math.round(v).toString());
  if (inView && !reduced) raw.set(value);
  if (reduced || inView) raw.set(value);
  return (
    <div ref={ref} className="about__stat">
      <div className="about__stat-value"><motion.span>{display}</motion.span>{suffix}</div>
      <div className="about__stat-label">{label}</div>
    </div>
  );
}

export default function About() {
  const { theme } = useTheme();

  return (
    <section className={`about section about--${theme}`} id="about">
      <div className="container">
        <ScrollReveal>
          <div className="section-eyebrow">
            <span className="section-eyebrow__number">01</span>
            <span className="section-eyebrow__line" />
            <span className="section-eyebrow__label">About Me</span>
          </div>
        </ScrollReveal>

        <div className="about__grid">
          {/* Left: text content */}
          <div className="about__left">
            <ScrollReveal delay={0.08}>
              <h2 className="about__heading">
                Building smart,{' '}
                <span className="about__heading-accent">human-centered</span>
                <br />
                digital experiences.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <p className="about__para">
                I'm Glen Dhale L. Caparros — a Grade 11 STEM student and self-taught
                developer from Gumaca, Quezon, Philippines. I hold Professional Certificates
                in <strong>Google AI</strong>, <strong>Google UX Design</strong>,{' '}
                <strong>IBM Front-End Development</strong>,{' '}
                <strong>IBM Back-End Development</strong>,{' '}
                <strong>IBM DevOps &amp; Software Engineering</strong>, and{' '}
                <strong>IBM Full Stack Software Development</strong>, plus a Specialization in{' '}
                <strong>SEO &amp; Generative Engine Optimization</strong>.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.22}>
              <p className="about__para">
                My work sits at the intersection of physical hardware and seamless digital
                experiences — from ESP32-based IoT systems and Firebase real-time databases,
                to pixel-perfect Figma prototypes and AI-augmented web applications. I care
                deeply about craft at every layer of the stack.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.28}>
              <div className="about__tags">
                {['Google AI', 'UX Design', 'React / Front-End', 'Python / Back-End', 'DevOps / CI/CD', 'Full Stack', 'SEO / GEO', 'ESP32 / IoT', 'Firebase RTDB', 'Figma', 'Docker / K8s', 'Responsive CSS'].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.34}>
              <div className="about__cert-strip">
                <div className="about__cert-strip-inner">
                  <div className="about__cert-logos" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span className="about__ibm-logo">IBM</span>
                  </div>
                  <div className="about__cert-strip-text">
                    <span className="about__cert-strip-title">7 Certificates Earned</span>
                    <span className="about__cert-strip-sep" aria-hidden="true">/</span>
                    <span className="about__cert-strip-year">2026</span>
                  </div>
                </div>
                <a href="#certifications" className="about__cert-strip-link">
                  View all
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </ScrollReveal>

            {/* Light mode: resume-style timeline */}
            {theme === 'light' && (
              <ScrollReveal delay={0.40}>
                <div className="about__resume-strip">
                  <div className="about__resume-item">
                    <span className="about__resume-year">2026</span>
                    <span className="about__resume-dot" />
                    <span className="about__resume-label">7 Professional Certificates</span>
                  </div>
                  <div className="about__resume-item">
                    <span className="about__resume-year">2025</span>
                    <span className="about__resume-dot" />
                    <span className="about__resume-label">LRSAC Web Portal · Launched</span>
                  </div>
                  <div className="about__resume-item">
                    <span className="about__resume-year">2024</span>
                    <span className="about__resume-dot" />
                    <span className="about__resume-label">Began self-directed web development</span>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Right: visual + stats */}
          <div className="about__right">
            <ScrollReveal delay={0.1} y={48}>
              <div className="about__identity" aria-hidden="true">
                <div className="about__identity-monogram">GD</div>
                <div className="about__identity-rule" />
                <div className="about__identity-meta">
                  <span className="about__identity-name">Glen Dhale Caparros</span>
                  <span className="about__identity-loc">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1C4.07 1 2.5 2.57 2.5 4.5c0 2.67 3.5 6.5 3.5 6.5s3.5-3.83 3.5-6.5C9.5 2.57 7.93 1 6 1Zm0 4.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" fill="currentColor" />
                    </svg>
                    Gumaca, PH
                  </span>
                </div>
                <div className="about__identity-status">
                  <span className="dot" />
                  <span>Open to opportunities</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.22}>
              <div className="about__stats">
                <AnimatedStat value={7} label="Certificates" />
                <AnimatedStat value={23} label="Tech skills" suffix="+" />
                <AnimatedStat value={2} label="Years learning" suffix="+" />
              </div>
            </ScrollReveal>

            {/* Resume download preview — RESUME UI ONLY */}
            {theme === 'light' && (
              <ScrollReveal delay={0.3}>
                <div className="about__resume-preview">
                  {/* Document thumbnail */}
                  <a
                    href="/glen-caparros-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about__resume-thumb-link"
                    aria-label="Preview resume PDF"
                  >
                    <div className="about__resume-thumb">
                      {/* Placeholder document icon */}
                      <div className="about__resume-thumb-doc">
                        <div className="about__resume-thumb-header">
                          <div className="about__resume-thumb-bar" />
                          <div className="about__resume-thumb-bar about__resume-thumb-bar--short" />
                        </div>
                        <div className="about__resume-thumb-body">
                          <div className="about__resume-thumb-line" />
                          <div className="about__resume-thumb-line" />
                          <div className="about__resume-thumb-line about__resume-thumb-line--short" />
                          <div className="about__resume-thumb-spacer" />
                          <div className="about__resume-thumb-line" />
                          <div className="about__resume-thumb-line" />
                          <div className="about__resume-thumb-line about__resume-thumb-line--med" />
                          <div className="about__resume-thumb-spacer" />
                          <div className="about__resume-thumb-line" />
                          <div className="about__resume-thumb-line about__resume-thumb-line--short" />
                        </div>
                        <div className="about__resume-thumb-badge">PDF</div>
                      </div>
                      <div className="about__resume-thumb-overlay">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M12 8v5M9.5 11l2.5 2.5 2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  </a>

                  {/* Info + download button */}
                  <div className="about__resume-info">
                    <span className="about__resume-info-label">Resume</span>
                    <span className="about__resume-info-file">glen-caparros-resume.pdf</span>
                    <a
                      href="/glen-caparros-resume.pdf"
                      download="Glen_Caparros_Resume.pdf"
                      className="about__resume-download-btn"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 4v12M8 12l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      Download Resume
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .about__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .about__heading {
          font-size: clamp(32px, 5vw, 56px);
          line-height: 1.05;
          margin-bottom: 28px;
          color: var(--text);
        }
        .about__heading-accent { color: var(--green); font-style: italic; }
        .about--navy .about__heading-accent { color: var(--gold, var(--green)); }

        .about__para {
          font-size: 15px;
          line-height: 1.8;
          color: var(--text-muted);
          margin-bottom: 20px;
        }
        .about__para strong { color: var(--text); font-weight: 600; }

        .about__tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; margin-bottom: 28px; }

        /* ── Cert strip (editorial, not a card) ────────────── */
        .about__cert-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          margin-top: 4px;
        }
        .about__cert-strip-inner { display: flex; align-items: center; gap: 14px; }
        .about__cert-logos { display: flex; align-items: center; gap: 6px; }
        .about__ibm-logo {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: #0F62FE;
          letter-spacing: 0.06em;
        }
        .about__cert-strip-text {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .about__cert-strip-title {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
        }
        .about__cert-strip-sep {
          font-size: 11px;
          color: var(--text-subtle);
        }
        .about__cert-strip-year {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--green);
          letter-spacing: 0.06em;
        }
        .about__cert-strip-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--green);
          white-space: nowrap;
          flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .about__cert-strip-link:hover { opacity: 0.7; }

        /* ── Light mode resume timeline ─────────────────────── */
        .about__resume-strip {
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 0;
          border-left: 1.5px solid var(--border);
          padding-left: 20px;
        }
        .about__resume-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          position: relative;
        }
        .about__resume-dot {
          position: absolute;
          left: -26px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--green);
          border: 2px solid var(--bg);
          box-shadow: 0 0 0 2px var(--green);
        }
        .about__resume-year {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--green);
          letter-spacing: 0.05em;
          min-width: 36px;
        }
        .about__resume-label {
          font-size: 13px;
          color: var(--text-muted);
        }

        /* ── Identity block (replaces card) ───────────────── */
        .about__identity {
          padding: 40px 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .about__identity-monogram {
          font-family: var(--font-display);
          font-size: 96px;
          font-weight: 800;
          letter-spacing: -0.06em;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px var(--border-hover);
          user-select: none;
        }
        .about--light .about__identity-monogram {
          -webkit-text-stroke: 1px rgba(0,0,0,0.08);
        }
        .about__identity-rule {
          width: 48px;
          height: 1px;
          background: var(--green);
          opacity: 0.5;
        }
        .about--navy .about__identity-rule {
          background: var(--gold, var(--green));
        }
        .about__identity-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .about__identity-name {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
        }
        .about__identity-loc {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
        }
        .about__identity-status {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--green);
          letter-spacing: 0.05em;
        }

        /* ── Stats grid ─────────────────────────────────────── */
        .about__stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
        }
        .about__stat {
          background: var(--bg);
          padding: 24px 20px;
          text-align: center;
          transition: background 0.2s;
        }
        .about__stat:hover { background: var(--bg-subtle); }
        .about__stat-value {
          font-family: var(--font-display);
          font-size: 36px;
          font-weight: 800;
          color: var(--green);
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 6px;
        }
        .about__stat-label {
          font-size: 11px;
          color: var(--text-muted);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .about--navy .about__stat-value { color: var(--gold, var(--green)); }

        /* ── Resume preview (light mode only) ─────────────── */
        .about__resume-preview {
          display: flex;
          gap: 20px;
          align-items: center;
          margin-top: 20px;
          padding: 20px;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 4px;
          background: #fff;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .about__resume-preview:hover {
          border-color: rgba(26,107,60,0.25);
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        .about__resume-thumb-link {
          display: block;
          flex-shrink: 0;
          text-decoration: none;
          color: inherit;
        }

        .about__resume-thumb {
          position: relative;
          width: 90px;
          height: 120px;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 3px;
          background: #f8f9fb;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.25s var(--ease), box-shadow 0.25s;
        }
        .about__resume-thumb:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }
        .about__resume-thumb:hover .about__resume-thumb-overlay {
          opacity: 1;
        }

        .about__resume-thumb-doc {
          padding: 10px 10px 8px;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .about__resume-thumb-header {
          display: flex;
          flex-direction: column;
          gap: 3px;
          margin-bottom: 8px;
        }
        .about__resume-thumb-bar {
          height: 3px;
          border-radius: 1px;
          background: rgba(0,0,0,0.12);
          width: 70%;
        }
        .about__resume-thumb-bar--short { width: 45%; }

        .about__resume-thumb-body {
          display: flex;
          flex-direction: column;
          gap: 3px;
          flex: 1;
        }
        .about__resume-thumb-line {
          height: 2px;
          border-radius: 1px;
          background: rgba(0,0,0,0.06);
          width: 100%;
        }
        .about__resume-thumb-line--short { width: 60%; }
        .about__resume-thumb-line--med { width: 80%; }
        .about__resume-thumb-spacer { height: 4px; }

        .about__resume-thumb-badge {
          position: absolute;
          bottom: 6px;
          right: 6px;
          font-family: var(--font-mono);
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #fff;
          background: var(--green);
          padding: 2px 5px;
          border-radius: 2px;
          line-height: 1;
        }

        .about__resume-thumb-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(26,107,60,0.08);
          color: var(--green);
          opacity: 0;
          transition: opacity 0.25s;
        }

        .about__resume-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          min-width: 0;
        }
        .about__resume-info-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-subtle);
        }
        .about__resume-info-file {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
          letter-spacing: 0.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 8px;
        }
        .about__resume-download-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          background: var(--green);
          color: #fff;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          transition: all 0.22s var(--ease);
          width: fit-content;
          text-decoration: none;
        }
        .about__resume-download-btn:hover {
          background: #15593a;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(26,107,60,0.20);
        }

        @media (max-width: 860px) {
          .about__grid { grid-template-columns: 1fr; gap: 56px; }
          .about__resume-preview { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}
