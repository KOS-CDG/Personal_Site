import { useState, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser'; // Moved to top-level for reliability on Vercel
import ScrollReveal from './ui/ScrollReveal';
import { contactInfo } from '../data/portfolio';

type FormState = 'idle' | 'sending' | 'success' | 'error';

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const socials: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/glen-dhale-caparros-a884a23b9/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${contactInfo.email}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fields.name || !fields.email || !fields.message) return;

    setFormState('sending');

    try {
      // Send explicit object directly to EmailJS
      await emailjs.send(
        contactInfo.emailjsServiceId,
        contactInfo.emailjsTemplateId,
        {
          name: fields.name,
          email: fields.email,
          message: fields.message,
        },
        contactInfo.emailjsPublicKey
      );
      
      setFormState('success');
      setFields({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormState('error');
    }

    // Reset status after delay
    setTimeout(() => setFormState('idle'), 4000);
  };

  const isSending = formState === 'sending';

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <ScrollReveal>
          <div className="section-eyebrow">
            <span className="section-eyebrow__number">06</span>
            <span className="section-eyebrow__line" />
            <span className="section-eyebrow__label">Contact</span>
          </div>
        </ScrollReveal>

        <div className="contact__layout">
          {/* Left: copy */}
          <div className="contact__left">
            <ScrollReveal delay={0.06}>
              <h2 className="contact__heading">
                Let's build<br />
                something<br />
                <span className="contact__heading-accent">together.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.14}>
              <p className="contact__desc">
                Whether you have a project idea, need a junior developer on your team,
                or just want to say hi — my inbox is open.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="contact__info-list">
                <a href={`mailto:${contactInfo.email}`} className="contact__info-item">
                  <span className="contact__info-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
                    </svg>
                  </span>
                  <span>{contactInfo.email}</span>
                </a>
                <div className="contact__info-item">
                  <span className="contact__info-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                      <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                  </span>
                  <span>{contactInfo.location}</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.26}>
              <div className="contact__socials">
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="contact__social-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: form */}
          <ScrollReveal delay={0.1} className="contact__right">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="contact__form"
              noValidate
            >
              <div className="contact__field">
                <label htmlFor="contact-name" className="contact__label">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className="contact__input"
                  placeholder="Your Name"
                  value={fields.name}
                  onChange={handleChange}
                  required
                  disabled={isSending}
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-email" className="contact__label">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className="contact__input"
                  placeholder="you@example.com"
                  value={fields.email}
                  onChange={handleChange}
                  required
                  disabled={isSending}
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-message" className="contact__label">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="contact__input contact__textarea"
                  placeholder="Hey Glen, I'd love to talk about…"
                  value={fields.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  disabled={isSending}
                />
              </div>

              {/* Submit + status */}
              <div className="contact__submit-row">
                <button
                  type="submit"
                  className={`contact__submit contact__submit--${formState}`}
                  disabled={isSending}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={formState}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22 }}
                    >
                      {formState === 'idle' && 'Send Message'}
                      {formState === 'sending' && 'Sending…'}
                      {formState === 'success' && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          Message Sent
                        </span>
                      )}
                      {formState === 'error' && 'Failed — Try Again'}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        .contact__layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: start;
        }

        .contact__heading {
          font-size: clamp(36px, 6vw, 64px);
          color: var(--text);
          line-height: 1.0;
          margin-bottom: 24px;
        }
        .contact__heading-accent { color: var(--green); }

        .contact__desc {
          font-size: 14.5px;
          line-height: 1.75;
          color: var(--text-muted);
          margin-bottom: 36px;
          max-width: 320px;
        }

        .contact__info-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 36px;
        }
        .contact__info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13.5px;
          color: var(--text-muted);
          transition: color 0.22s var(--ease);
        }
        a.contact__info-item:hover { color: var(--green); }
        .contact__info-icon {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--green);
          flex-shrink: 0;
        }

        .contact__socials {
          display: flex;
          gap: 10px;
        }
        .contact__social-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: border-color 0.22s var(--ease), color 0.22s var(--ease), transform 0.22s var(--ease);
        }
        .contact__social-btn:hover {
          border-color: var(--green);
          color: var(--green);
          transform: translateY(-3px);
        }

        /* Form */
        .contact__form {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contact__field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .contact__label {
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .contact__input {
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          font-size: 14px;
          color: var(--text);
          outline: none;
          transition: border-color 0.22s var(--ease), box-shadow 0.22s var(--ease);
          width: 100%;
          resize: none;
        }
        .contact__input::placeholder { color: var(--text-subtle); }
        .contact__input:focus {
          border-color: rgba(34, 197, 94, 0.5);
          box-shadow: 0 0 0 3px var(--green-dim);
        }
        .contact__input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .contact__textarea {
          min-height: 120px;
        }

        .contact__submit-row {
          margin-top: 4px;
        }
        .contact__submit {
          width: 100%;
          padding: 14px;
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-weight: 700;
          font-family: var(--font-body);
          letter-spacing: 0.02em;
          transition: all 0.25s var(--ease);
          position: relative;
          overflow: hidden;
          min-height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .contact__submit--idle,
        .contact__submit--sending {
          background: var(--green);
          color: #040d07;
        }
        .contact__submit--idle:hover:not(:disabled) {
          background: #16a34a;
          box-shadow: 0 12px 32px var(--green-glow);
        }
        .contact__submit--sending {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .contact__submit--success {
          background: rgba(34, 197, 94, 0.15);
          color: var(--green);
          border: 1px solid rgba(34, 197, 94, 0.3);
        }
        .contact__submit--error {
          background: rgba(239, 68, 68, 0.12);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.25);
        }

        @media (max-width: 860px) {
          .contact__layout {
            grid-template-columns: 1fr;
            gap: 56px;
          }
          .contact__desc { max-width: 100%; }
        }
        @media (max-width: 480px) {
          .contact__form { padding: 24px; }
        }
      `}</style>
    </section>
  );
}
