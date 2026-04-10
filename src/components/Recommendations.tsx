import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ui/ScrollReveal';
import { recommendations as initialRecs } from '../data/portfolio';
import type { Recommendation } from '../types';

function RecEntry({ rec, index }: { rec: Recommendation; index: number }) {
  return (
    <ScrollReveal delay={index * 0.09}>
      <article className="rec-entry">
        <div className="rec-entry__accent" aria-hidden="true" />

        <div className="rec-entry__body">
          <p className="rec-entry__text">{rec.text}</p>
          {(rec.name || rec.role) && (
            <footer className="rec-entry__footer">
              <span className="rec-entry__dash" aria-hidden="true" />
              <div className="rec-entry__author">
                <span className="rec-entry__name">{rec.name || 'Anonymous'}</span>
                {rec.role && <span className="rec-entry__role">{rec.role}</span>}
              </div>
            </footer>
          )}
        </div>
      </article>
    </ScrollReveal>
  );
}

// ── Success modal ─────────────────────────────────────────────────────────────
function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        className="modal-box"
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 24 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-box__icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="var(--green)" strokeWidth="1.5" />
            <path d="M8.5 14.5l4 4 7-8" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 id="modal-title" className="modal-box__title">Thank you</h3>
        <p className="modal-box__body">Your recommendation has been added successfully.</p>
        <button className="modal-box__btn" onClick={onClose}>
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Recommendations() {
  const [recs, setRecs] = useState<Recommendation[]>(initialRecs);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please write a message before submitting.');
      return;
    }
    setError('');
    const newRec: Recommendation = {
      id: Date.now(),
      name: name.trim() || 'Anonymous',
      role: role.trim() || 'Visitor',
      text: text.trim(),
    };
    setRecs(prev => [...prev, newRec]);
    setName('');
    setRole('');
    setText('');
    setShowModal(true);
  };

  return (
    <section className="recs section" id="recommendations">
      <div className="container">

        {/* Section eyebrow */}
        <ScrollReveal>
          <div className="section-eyebrow">
            <span className="section-eyebrow__number">05</span>
            <span className="section-eyebrow__line" />
            <span className="section-eyebrow__label">Recommendations</span>
          </div>
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal delay={0.06}>
          <h2 className="recs__heading">
            What others are saying
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="recs__sub">
            Colleagues, teachers, and collaborators who have seen the work firsthand.
          </p>
        </ScrollReveal>

        {/* Entries */}
        <div className="recs__entries">
          <AnimatePresence mode="popLayout">
            {recs.map((r, i) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <RecEntry rec={r} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="recs__divider" />

        {/* Form */}
        <ScrollReveal delay={0.18}>
          <div className="recs__form-block">
            <h3 className="recs__form-title">Leave a recommendation</h3>
            <form className="recs__form" onSubmit={handleSubmit} noValidate>
              <div className="recs__form-row">
                <div className="recs__field">
                  <label htmlFor="rec-name" className="recs__label">
                    Name <span className="recs__optional">(optional)</span>
                  </label>
                  <input
                    id="rec-name"
                    type="text"
                    className="recs__input"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    maxLength={60}
                  />
                </div>
                <div className="recs__field">
                  <label htmlFor="rec-role" className="recs__label">
                    Role <span className="recs__optional">(optional)</span>
                  </label>
                  <input
                    id="rec-role"
                    type="text"
                    className="recs__input"
                    placeholder="e.g. Teacher, Classmate"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    maxLength={60}
                  />
                </div>
              </div>

              <div className="recs__field">
                <label htmlFor="rec-text" className="recs__label">
                  Message <span className="recs__required">*</span>
                </label>
                <textarea
                  id="rec-text"
                  className={`recs__textarea ${error ? 'recs__textarea--error' : ''}`}
                  placeholder="Share your experience working with Glen..."
                  value={text}
                  onChange={e => { setText(e.target.value); if (error) setError(''); }}
                  rows={4}
                  maxLength={400}
                  aria-describedby={error ? 'rec-error' : undefined}
                />
                <div className="recs__field-footer">
                  {error && (
                    <span id="rec-error" className="recs__error" role="alert">
                      {error}
                    </span>
                  )}
                  <span className="recs__char-count">
                    {text.length}/400
                  </span>
                </div>
              </div>

              <button type="submit" className="recs__submit">
                Submit Recommendation
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M1 6.5h11M6.5 1l5.5 5.5L6.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>

      {/* Success modal */}
      <AnimatePresence>
        {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      <style>{`
        /* ── Heading ────────────────────────────────────── */
        .recs__heading {
          font-size: clamp(28px, 4vw, 48px);
          color: var(--text);
          margin-bottom: 14px;
          line-height: 1.05;
          letter-spacing: -0.03em;
        }
        .recs__sub {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 48px;
          max-width: 480px;
        }

        /* ── Entries (stacked list) ────────────────────── */
        .recs__entries {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .rec-entry {
          display: flex;
          gap: 20px;
          padding: 32px 0;
          border-bottom: 1px solid var(--border);
        }
        .rec-entry:first-child {
          border-top: 1px solid var(--border);
        }

        .rec-entry__accent {
          width: 2px;
          flex-shrink: 0;
          background: var(--green);
          border-radius: 1px;
          opacity: 0.25;
          transition: opacity 0.3s var(--ease);
        }
        .rec-entry:hover .rec-entry__accent {
          opacity: 0.7;
        }

        .rec-entry__body {
          flex: 1;
        }

        .rec-entry__text {
          font-size: 14px;
          line-height: 1.8;
          color: var(--text-muted);
          margin-bottom: 16px;
          font-style: italic;
        }

        .rec-entry__footer {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .rec-entry__dash {
          width: 16px;
          height: 1px;
          background: var(--text-subtle);
          flex-shrink: 0;
        }
        .rec-entry__author {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .rec-entry__name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          font-family: var(--font-display);
          letter-spacing: -0.01em;
        }
        .rec-entry__role {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }

        /* ── Divider between entries and form ───────────── */
        .recs__divider {
          height: 1px;
          background: var(--border);
          margin: 56px 0 48px;
        }

        /* ── Form (editorial, no card wrap) ─────────────── */
        .recs__form-block {
          max-width: 640px;
        }
        .recs__form-title {
          font-size: 16px;
          font-family: var(--font-display);
          font-weight: 700;
          color: var(--text);
          margin-bottom: 28px;
          letter-spacing: -0.01em;
        }
        .recs__form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .recs__form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .recs__field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .recs__label {
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .recs__optional { color: var(--text-subtle); font-size: 10px; }
        .recs__required { color: var(--green); }

        .recs__input,
        .recs__textarea {
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border);
          padding: 10px 0;
          font-size: 14px;
          color: var(--text);
          outline: none;
          transition: border-color 0.25s var(--ease);
          resize: none;
          width: 100%;
          border-radius: 0;
        }
        .recs__input::placeholder,
        .recs__textarea::placeholder {
          color: var(--text-subtle);
        }
        .recs__input:focus,
        .recs__textarea:focus {
          border-color: var(--green);
        }
        .recs__textarea--error {
          border-color: #ef4444;
        }
        .recs__field-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 16px;
        }
        .recs__error {
          font-size: 11.5px;
          color: #ef4444;
          font-family: var(--font-mono);
        }
        .recs__char-count {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-subtle);
          margin-left: auto;
        }

        .recs__submit {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          align-self: flex-start;
          padding: 12px 28px;
          background: var(--green);
          color: #040d07;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.02em;
          transition: all 0.25s var(--ease);
          font-family: var(--font-body);
        }
        .recs__submit:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
          box-shadow: 0 10px 28px var(--green-glow);
        }

        /* Modal */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 9000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .modal-box {
          background: var(--bg-elevated);
          border: 1px solid var(--border-hover);
          border-radius: 8px;
          padding: 48px 40px;
          text-align: center;
          max-width: 360px;
          width: 100%;
        }
        .modal-box__icon {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .modal-box__title {
          font-size: 22px;
          color: var(--text);
          margin-bottom: 10px;
        }
        .modal-box__body {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 32px;
        }
        .modal-box__btn {
          padding: 11px 32px;
          border-radius: 100px;
          border: 1px solid var(--border-hover);
          font-size: 13px;
          color: var(--text);
          font-family: var(--font-body);
          font-weight: 500;
          transition: all 0.22s var(--ease);
        }
        .modal-box__btn:hover {
          border-color: var(--green);
          color: var(--green);
        }

        @media (max-width: 640px) {
          .recs__form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
