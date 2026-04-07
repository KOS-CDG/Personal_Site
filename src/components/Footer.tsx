import { motion } from 'framer-motion';

const MARQUEE_ITEMS = [
  'Web Development',
  'IoT Engineering',
  'ESP32',
  'Firebase',
  'RFID Systems',
  'Responsive Design',
  'HTML · CSS · JS',
  'Gumaca, PH',
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* Marquee strip */}
      <div className="footer__marquee" aria-hidden="true">
        <div className="footer__marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="footer__marquee-item">
              {item}
              <span className="footer__marquee-dot">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main footer content */}
      <div className="footer__main container">
        <div className="footer__left">
          <a href="#" className="footer__logo" aria-label="Back to top">
            GD<span style={{ color: 'var(--green)' }}>.</span>
          </a>
          <p className="footer__tagline">
            Building at the intersection of<br />
            <span style={{ color: 'var(--green)' }}>hardware</span> and the web.
          </p>
        </div>

        <div className="footer__center">
          <nav className="footer__nav" aria-label="Footer navigation">
            {['#about', '#skills', '#projects', '#recommendations', '#contact'].map(href => (
              <a key={href} href={href} className="footer__nav-link">
                {href.replace('#', '')}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer__right">
          <motion.button
            className="footer__top-btn"
            onClick={scrollTop}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.2 }}
            aria-label="Back to top"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 12V2M2 7l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to top
          </motion.button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom container">
        <span className="footer__copy">
          © {year} Glen Dhale L. Caparros. Designed &amp; built with care.
        </span>
        <span className="footer__stack">
          React · TypeScript · Framer Motion · Vite
        </span>
      </div>

      <style>{`
        .footer {
          margin-top: 40px;
          border-top: 1px solid var(--border);
        }

        /* Marquee */
        .footer__marquee {
          padding: 14px 0;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }
        .footer__marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .footer__marquee-track { animation: none; }
        }
        .footer__marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          padding: 0 18px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-subtle);
          white-space: nowrap;
        }
        .footer__marquee-dot {
          color: var(--green);
          opacity: 0.5;
        }

        /* Main grid */
        .footer__main {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px;
          padding-top: 56px;
          padding-bottom: 56px;
          align-items: start;
        }

        .footer__logo {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--text);
          display: block;
          margin-bottom: 16px;
        }
        .footer__tagline {
          font-size: 13.5px;
          line-height: 1.7;
          color: var(--text-muted);
        }

        .footer__nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer__nav-link {
          font-size: 13px;
          color: var(--text-muted);
          text-transform: capitalize;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
          transition: color 0.22s var(--ease);
        }
        .footer__nav-link:hover { color: var(--green); }

        .footer__right {
          display: flex;
          justify-content: flex-end;
        }
        .footer__top-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border: 1px solid var(--border);
          border-radius: 100px;
          font-size: 12px;
          font-family: var(--font-mono);
          color: var(--text-muted);
          letter-spacing: 0.06em;
          transition: border-color 0.22s var(--ease), color 0.22s var(--ease);
        }
        .footer__top-btn:hover {
          border-color: var(--green);
          color: var(--green);
        }

        /* Bottom bar */
        .footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 20px;
          padding-bottom: 32px;
          border-top: 1px solid var(--border);
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer__copy,
        .footer__stack {
          font-family: var(--font-mono);
          font-size: 10.5px;
          letter-spacing: 0.06em;
          color: var(--text-subtle);
        }

        @media (max-width: 720px) {
          .footer__main {
            grid-template-columns: 1fr;
            gap: 36px;
            padding-top: 40px;
            padding-bottom: 40px;
          }
          .footer__right { justify-content: flex-start; }
          .footer__bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </footer>
  );
}
