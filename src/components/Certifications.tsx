import ScrollReveal from './ui/ScrollReveal';
import CertCarousel from './ui/CertCarousel';

export default function Certifications() {
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
              Professional certificates earned through hands-on, project-based learning across AI, UX design, full-stack development, DevOps engineering, and SEO strategy.
            </p>
          </ScrollReveal>
        </div>

        {/* Certificate image carousel */}
        <ScrollReveal delay={0.08}>
          <div className="certs__carousel-wrap">
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
        .certs__carousel-wrap { margin-top: 8px; }
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

        /* ── Footer strip ────────────────────────────────────── */
        .certs__footer-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 48px;
          padding: 16px 0;
          border-top: 1px solid var(--border);
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
      `}</style>
    </section>
  );
}
