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
                <strong>IBM Front-End Development</strong>, and{' '}
                <strong>IBM Back-End Development</strong>, plus a Specialization in{' '}
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
                {['Google AI','UX Design','React / Front-End','SEO / GEO','ESP32 / IoT','Firebase RTDB','Figma','Responsive CSS'].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.34}>
              <div className="about__cert-callout">
                <div className="about__cert-callout-inner">
                  <div className="about__cert-logos" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="about__ibm-logo">IBM</span>
                  </div>
                  <div>
                    <div className="about__cert-callout-title">5 Certificates Earned · 2026</div>
                    <div className="about__cert-callout-sub">Google AI · Google UX · IBM Front-End · IBM Back-End · SEO Mastery</div>
                  </div>
                </div>
                <a href="#certifications" className="about__cert-callout-link">
                  View all
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </ScrollReveal>

            {/* Light mode: resume-style timeline callout */}
            {theme === 'light' && (
              <ScrollReveal delay={0.40}>
                <div className="about__resume-strip">
                  <div className="about__resume-item">
                    <span className="about__resume-year">2026</span>
                    <span className="about__resume-dot" />
                    <span className="about__resume-label">5 Professional Certificates</span>
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

          {/* Right: visual card + stats */}
          <div className="about__right">
            <ScrollReveal delay={0.1} y={48}>
              <div className="about__card" aria-hidden="true">
                <div className="about__card-monogram">GD</div>
                <div className="about__card-lines">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <span key={i} className="about__card-line" />
                  ))}
                </div>
                <div className="about__card-badge">
                  <span className="dot" />
                  <span>Open to opportunities</span>
                </div>
                <div className="about__card-location">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1C4.07 1 2.5 2.57 2.5 4.5c0 2.67 3.5 6.5 3.5 6.5s3.5-3.83 3.5-6.5C9.5 2.57 7.93 1 6 1Zm0 4.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" fill="currentColor"/>
                  </svg>
                  Gumaca, PH
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.22}>
              <div className="about__stats">
                <AnimatedStat value={5}  label="Certificates" />
                <AnimatedStat value={10} label="Tech skills" suffix="+" />
                <AnimatedStat value={2}  label="Years learning" suffix="+" />
              </div>
            </ScrollReveal>
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

        /* Navy: gold italic accent */
        .about--navy .about__heading-accent { color: var(--gold, var(--green)); }

        .about__para {
          font-size: 15px;
          line-height: 1.8;
          color: var(--text-muted);
          margin-bottom: 20px;
        }
        .about__para strong { color: var(--text); font-weight: 600; }

        .about__tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; margin-bottom: 28px; }

        /* ── Cert call-out ─────────────────────────────────── */
        .about__cert-callout {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 18px;
          border-radius: var(--radius-md);
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          margin-top: 4px;
          transition: border-color 0.25s var(--ease);
        }
        .about__cert-callout:hover { border-color: var(--green); }
        .about__cert-callout-inner { display: flex; align-items: center; gap: 14px; }
        .about__cert-logos { display: flex; align-items: center; gap: 6px; }
        .about__ibm-logo {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: #0F62FE;
          letter-spacing: 0.06em;
        }
        .about__cert-callout-title {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 2px;
        }
        .about__cert-callout-sub {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.03em;
        }
        .about__cert-callout-link {
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
        .about__cert-callout-link:hover { opacity: 0.7; }

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

        /* ── Identity card ──────────────────────────────────── */
        .about__card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 32px;
          position: relative;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-bottom: 20px;
          transition: border-color 0.3s var(--ease);
        }
        .about__card:hover { border-color: var(--border-hover); }
        .about__card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 70% 30%, color-mix(in srgb, var(--green) 5%, transparent) 0%, transparent 70%);
          pointer-events: none;
        }

        .about__card-monogram {
          font-family: var(--font-display);
          font-size: 96px;
          font-weight: 800;
          letter-spacing: -0.06em;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.06);
          user-select: none;
        }
        /* Light mode monogram */
        .about--light .about__card-monogram {
          -webkit-text-stroke: 1px rgba(0,0,0,0.06);
        }

        .about__card-lines {
          position: absolute;
          bottom: 60px; left: 32px; right: 32px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .about__card-line { display: block; height: 1px; background: var(--border); border-radius: 1px; }
        .about__card-line:nth-child(1) { width: 100%; }
        .about__card-line:nth-child(2) { width: 72%; }
        .about__card-line:nth-child(3) { width: 88%; }
        .about__card-line:nth-child(4) { width: 55%; }
        .about__card-line:nth-child(5) { width: 80%; }
        .about__card-line:nth-child(6) { width: 65%; }
        .about__card-line:nth-child(7) { width: 40%; }

        .about__card-badge {
          position: absolute;
          top: 28px; right: 28px;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          border: 1px solid rgba(34,197,94,0.25);
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--green);
          background: var(--green-dim);
          letter-spacing: 0.05em;
        }

        .about__card-location {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          position: relative;
          z-index: 1;
        }

        /* ── Stats grid ─────────────────────────────────────── */
        .about__stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .about__stat {
          background: var(--bg-elevated);
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

        /* Navy: gold stat values */
        .about--navy .about__stat-value { color: var(--gold, var(--green)); }

        @media (max-width: 860px) {
          .about__grid { grid-template-columns: 1fr; gap: 56px; }
        }
      `}</style>
    </section>
  );
}
