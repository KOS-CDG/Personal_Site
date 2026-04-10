import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from './ui/ScrollReveal';
import { useTheme } from '../App';

const RESUME_PDF = '/Glen_Caparros_Resume.pdf';
const RESUME_PREVIEW = '/resume-preview.jpg';

export default function Resume() {
  const { theme } = useTheme();
  const imgRef = useRef<HTMLDivElement>(null);
  const inView = useInView(imgRef, { once: true, margin: '-80px 0px' });

  return (
    <section className={`resume section resume--${theme}`} id="resume">
      <div className="container">
        <ScrollReveal>
          <div className="resume__header">
            <div className="resume__eyebrow">
              {theme === 'dark' ? '// resume' : theme === 'light' ? 'Résumé' : 'Curriculum Vitae'}
            </div>
            <h2 className="resume__heading">Glen Dhale Caparros</h2>
            <p className="resume__sub">
              Web Developer · IoT Engineer · STEM Student
            </p>
          </div>
        </ScrollReveal>

        <div className="resume__body">
          {/* ── PDF Preview ── */}
          <ScrollReveal delay={0.1}>
            <div className="resume__preview-wrap" ref={imgRef}>
              <motion.div
                className="resume__preview-frame"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* The resume preview image */}
                <img
                  src={RESUME_PREVIEW}
                  alt="Glen Dhale Caparros – Résumé preview"
                  className="resume__preview-img"
                  onError={(e) => {
                    const el = e.currentTarget.closest('.resume__preview-frame') as HTMLElement;
                    if (el) el.classList.add('resume__preview-frame--no-image');
                  }}
                />
                {/* Overlay with page curl effect */}
                <div className="resume__preview-overlay" aria-hidden="true" />
                <div className="resume__preview-corner" aria-hidden="true" />

                {/* Page number indicator */}
                <div className="resume__preview-label" aria-hidden="true">
                  <span>1 page</span>
                </div>
              </motion.div>

              {/* Setup note (hidden when image loads) */}
              <p className="resume__setup-note">
                Add <code>resume-preview.jpg</code> to <code>/public/</code> to show the preview image.
              </p>
            </div>
          </ScrollReveal>

          {/* ── Actions + Info ── */}
          <ScrollReveal delay={0.18}>
            <div className="resume__info">
              <div className="resume__info-block">
                <div className="resume__info-label">Document</div>
                <div className="resume__info-value">Glen_Caparros_Resume.pdf</div>
              </div>
              <div className="resume__info-block">
                <div className="resume__info-label">Format</div>
                <div className="resume__info-value">PDF · 1 page</div>
              </div>
              <div className="resume__info-block">
                <div className="resume__info-label">Contact</div>
                <div className="resume__info-value">dhale.caparros@caparrosui.com</div>
              </div>
              <div className="resume__info-block">
                <div className="resume__info-label">Location</div>
                <div className="resume__info-value">Gumaca, Quezon, Philippines</div>
              </div>
              <div className="resume__info-block">
                <div className="resume__info-label">Phone</div>
                <div className="resume__info-value">+63 920 695 6275</div>
              </div>
              <div className="resume__info-block">
                <div className="resume__info-label">Website</div>
                <div className="resume__info-value">
                  <a href="https://caparrosui.com" target="_blank" rel="noopener noreferrer" className="resume__info-link">
                    caparrosui.com
                  </a>
                </div>
              </div>
              <div className="resume__info-block">
                <div className="resume__info-label">GitHub</div>
                <div className="resume__info-value">
                  <a href="https://github.com/dhalecaparros" target="_blank" rel="noopener noreferrer" className="resume__info-link">
                    github.com/dhalecaparros
                  </a>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="resume__actions">
                <a
                  href={RESUME_PDF}
                  download="Glen_Caparros_Resume.pdf"
                  className="resume__btn resume__btn--download"
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <path d="M7.5 1v9M4 7l3.5 3.5L11 7M2 13h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download PDF
                </a>
                <a
                  href={RESUME_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume__btn resume__btn--view"
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <path d="M7.5 3C4 3 1 7.5 1 7.5S4 12 7.5 12 14 7.5 14 7.5 11 3 7.5 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                    <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.4"/>
                  </svg>
                  View in browser
                </a>
              </div>

              <p className="resume__note">
                References available upon request. Portfolio work at{' '}
                <a href="https://caparrosui.com" target="_blank" rel="noopener noreferrer" className="resume__note-link">caparrosui.com</a>.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        .resume {
          padding: var(--section-padding, 100px 0);
        }

        .resume__header {
          margin-bottom: 52px;
        }
        .resume__eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-subtle);
          margin-bottom: 14px;
        }
        .resume__heading {
          font-family: var(--font-sans);
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 8px;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .resume__sub {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
          margin: 0;
          letter-spacing: 0.04em;
        }

        .resume__body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }

        /* ── Preview ── */
        .resume__preview-wrap {
          position: relative;
        }
        .resume__preview-frame {
          position: relative;
          border: 1px solid var(--border);
          background: var(--bg-subtle);
          border-radius: 0;
          overflow: hidden;
          aspect-ratio: 8.5 / 11;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .resume__preview-frame--no-image {
          background: var(--bg-subtle);
        }
        .resume__preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .resume__preview-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.04) 0%,
            transparent 50%,
            rgba(0,0,0,0.04) 100%
          );
          pointer-events: none;
        }
        .resume__preview-corner {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 28px;
          height: 28px;
          background: linear-gradient(225deg, var(--bg-elevated) 0%, var(--bg-elevated) 50%, transparent 50%);
          border-top: 1px solid var(--border);
          border-left: 1px solid var(--border);
          pointer-events: none;
        }
        .resume__preview-label {
          position: absolute;
          bottom: 10px;
          left: 12px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          color: var(--text-subtle);
          opacity: 0.7;
        }
        .resume__setup-note {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-subtle);
          margin-top: 10px;
          text-align: center;
          display: none; /* shown via JS when image fails */
        }

        /* ── Info panel ── */
        .resume__info {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .resume__info-block {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 8px;
          padding: 12px 0;
          border-bottom: 1px solid var(--border);
          align-items: baseline;
        }
        .resume__info-block:first-child {
          border-top: 1px solid var(--border);
        }
        .resume__info-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-subtle);
        }
        .resume__info-value {
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--text-muted);
        }
        .resume__info-link {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.15s;
        }
        .resume__info-link:hover { color: var(--text); }

        /* ── Actions ── */
        .resume__actions {
          display: flex;
          gap: 10px;
          padding-top: 24px;
          flex-wrap: wrap;
        }
        .resume__btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-decoration: none;
          padding: 11px 20px;
          border-radius: 2px;
          transition: opacity 0.15s, transform 0.15s;
          white-space: nowrap;
        }
        .resume__btn:hover { opacity: 0.82; transform: translateY(-1px); }
        .resume__btn--download {
          background: var(--section-accent, var(--green));
          color: #000;
          font-weight: 600;
        }
        .resume__btn--view {
          background: transparent;
          color: var(--text-muted);
          border: 1px solid var(--border);
        }
        .resume__btn--view:hover { color: var(--text); }

        .resume__note {
          font-family: var(--font-sans);
          font-size: 12px;
          color: var(--text-subtle);
          margin: 16px 0 0;
          line-height: 1.6;
        }
        .resume__note-link {
          color: var(--text-muted);
          text-decoration: none;
          border-bottom: 1px solid var(--border);
        }
        .resume__note-link:hover { color: var(--text); }

        /* ── Light theme ── */
        .resume--light .resume__preview-frame {
          box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.06);
        }

        /* ── Responsive ── */
        @media (max-width: 840px) {
          .resume__body {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .resume__preview-frame {
            max-width: 420px;
            margin-inline: auto;
          }
          .resume__actions { flex-direction: column; }
          .resume__btn { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
