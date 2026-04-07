import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ui/ScrollReveal';
import { recommendations as initialRecs } from '../data/portfolio';
import type { Recommendation } from '../types';

function RecCard({ rec, index }: { rec: Recommendation; index: number }) {
  return (
    <ScrollReveal delay={index * 0.09}>
      <article className="rec-card">
        {/* Quote mark */}
        <span className="rec-card__quote" aria-hidden="true">"</span>

        <p className="rec-card__text">{rec.text}</p>

        <footer className="rec-card__footer">
          {/* Initials avatar */}
          <div className="rec-card__avatar" aria-hidden="true">
            {rec.name.split(' ')[0][0]}
          </div>
          <div className="rec-card__author">
            <span className="rec-card__name">{rec.name}</span>
            <span className="rec-card__role">{rec.role}</span>
          </div>
        </footer>
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
        <h3 id="modal-title" className="modal-box__title">Thank you!</h3>
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

        <div className="recs__layout">
          {/* Left: heading + form */}
          <div className="recs__left">
            <ScrollReveal delay={0.06}>
              <h2 className="recs__heading">
                What others<br />
                are saying.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <p className="recs__sub">
                Colleagues, teachers, and collaborators who've seen the work firsthand.
              </p>
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal delay={0.18}>
              <div className="recs__form-wrap">
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
                      placeholder="Share your experience working with Glen…"
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

          {/* Right: rec cards */}
          <div className="recs__cards">
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
                  <RecCard rec={r} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Success modal */}
      <AnimatePresence>
        {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      <style>{`
        .recs__layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .recs__heading {
          font-size: clamp(28px, 4vw, 48px);
          color: var(--text);
          margin-bottom: 16px;
          line-height: 1.05;
        }
        .recs__sub {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 48px;
        }

        /* Form */
        .recs__form-wrap {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 32px;
        }
        .recs__form-title {
          font-size: 15px;
          font-family: var(--font-display);
          font-weight: 700;
          color: var(--text);
          margin-bottom: 24px;
          letter-spacing: -0.01em;
        }
        .recs__form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .recs__form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .recs__field {
          display: flex;
          flex-direction: column;
          gap: 7px;
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
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 11px 14px;
          font-size: 13.5px;
          color: var(--text);
          outline: none;
          transition: border-color 0.22s var(--ease), box-shadow 0.22s var(--ease);
          resize: none;
          width: 100%;
        }
        .recs__input::placeholder,
        .recs__textarea::placeholder {
          color: var(--text-subtle);
        }
        .recs__input:focus,
        .recs__textarea:focus {
          border-color: rgba(34, 197, 94, 0.5);
          box-shadow: 0 0 0 3px var(--green-dim);
        }
        .recs__textarea--error {
          border-color: rgba(239, 68, 68, 0.5);
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
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
          padding: 12px 26px;
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
          background: #16a34a;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px var(--green-glow);
        }

        /* Recommendation cards */
        .recs__cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .rec-card {
          position: relative;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 28px 28px 24px;
          transition: border-color 0.25s var(--ease);
          overflow: hidden;
        }
        .rec-card:hover {
          border-color: rgba(34, 197, 94, 0.2);
        }
        .rec-card__quote {
          position: absolute;
          top: 14px;
          right: 22px;
          font-family: var(--font-display);
          font-size: 72px;
          font-weight: 800;
          color: var(--green-dim);
          line-height: 1;
          user-select: none;
        }
        .rec-card__text {
          font-size: 13.5px;
          line-height: 1.75;
          color: var(--text-muted);
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
          font-style: italic;
        }
        .rec-card__footer {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .rec-card__avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--green-dim);
          border: 1px solid rgba(34, 197, 94, 0.2);
          color: var(--green);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .rec-card__author {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .rec-card__name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          font-family: var(--font-display);
        }
        .rec-card__role {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--text-muted);
          letter-spacing: 0.06em;
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
          border-radius: var(--radius-lg);
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

        @media (max-width: 900px) {
          .recs__layout {
            grid-template-columns: 1fr;
            gap: 56px;
          }
        }
        @media (max-width: 480px) {
          .recs__form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
