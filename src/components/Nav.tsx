import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../data/portfolio';
import { useTheme, type Theme } from '../App';

const THEMES: { value: Theme; label: string; icon: string }[] = [
  {
    value: 'dark',
    label: 'Terminal',
    icon: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="1" width="12" height="10" rx="1.5" stroke="currentColor" stroke-width="1.3"/>
      <path d="M3 5l2.5 2L3 9M6.5 9h4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    value: 'light',
    label: 'Resume',
    icon: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="1" width="10" height="12" rx="1" stroke="currentColor" stroke-width="1.3"/>
      <path d="M4 4h6M4 6.5h6M4 9h4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
    </svg>`,
  },
  {
    value: 'navy',
    label: 'Signature',
    icon: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1.5C4 1.5 1.5 4 1.5 7S4 12.5 7 12.5 12.5 10 12.5 7 10 1.5 7 1.5z" stroke="currentColor" stroke-width="1.3"/>
      <path d="M7 1.5C5.5 3.5 5.5 10.5 7 12.5M7 1.5C8.5 3.5 8.5 10.5 7 12.5M2 5.5h10M2 8.5h10" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
    </svg>`,
  },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [_themeMenuOpen, setThemeMenuOpen] = useState(false); // kept for mobile menu compat
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY.current && y > 120);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems.map(n => n.href.replace('#', ''));
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) setThemeMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setThemeMenuOpen(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const closeMenu = () => setMobileOpen(false);


  return (
    <>
      <motion.header
        style={{ y: hidden && !mobileOpen ? -100 : 0 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className={`nav nav--${theme} ${scrolled ? 'nav--scrolled' : ''}`}
      >
        <div className="nav__inner container">
          {/* Profile avatar + Logo */}
          <a href="#" className="nav__brand" aria-label="Glen Caparros home">
            <div className="nav__avatar" aria-hidden="true">
              <img
                src="/profilee.jpg"
                alt="Glen Caparros"
                className="nav__avatar-img"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                  const parent = (e.currentTarget as HTMLImageElement).parentElement;
                  if (parent) parent.setAttribute('data-initials', 'GD');
                }}
              />
            </div>
            <span className="nav__logo">
              GD<span className="nav__logo-dot">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <nav className="nav__links" aria-label="Main navigation">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className={`nav__link ${activeSection === item.href.replace('#', '') ? 'nav__link--active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="nav__controls">

            {/* ── UI Mode switcher — prominent pill ── */}
            <div
              className="ui-mode-switcher"
              role="group"
              aria-label="Switch UI mode"
            >
              {THEMES.map(t => (
                <button
                  key={t.value}
                  id={`ui-mode-${t.value}`}
                  className={`ui-mode-btn${theme === t.value ? ' ui-mode-btn--active' : ''}`}
                  onClick={() => setTheme(t.value)}
                  aria-pressed={theme === t.value}
                  title={`Switch to ${t.label} mode`}
                >
                  <span
                    className="ui-mode-btn__icon"
                    dangerouslySetInnerHTML={{ __html: t.icon }}
                  />
                  <span className="ui-mode-btn__label">{t.label}</span>
                </button>
              ))}
            </div>

            <a href="#contact" className="nav__cta">Hire me</a>

            <button
              className={`nav__hamburger ${mobileOpen ? 'nav__hamburger--open' : ''}`}
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 36px) 36px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 36px) 36px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 36px) 36px)' }}
            transition={{ duration: 0.56, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mobile-menu__profile">
              <div className="mobile-menu__avatar">
                <img src="/profilee.jpg" alt="Glen Caparros" className="mobile-menu__avatar-img"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <div>
                <div className="mobile-menu__name">Glen Caparros</div>
                <div className="mobile-menu__title">Web Dev · IoT Engineer</div>
              </div>
            </div>

            <nav className="mobile-menu__links" aria-label="Mobile navigation">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="mobile-menu__link"
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="mobile-menu__link-num">0{i + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.div className="mobile-menu__theme" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
              <span className="mobile-menu__theme-label">UI Mode</span>
              <div className="mobile-menu__theme-btns">
                {THEMES.map(t => (
                  <button
                    key={t.value}
                    id={`mobile-theme-${t.value}`}
                    className={`mobile-theme-btn ${theme === t.value ? 'mobile-theme-btn--active' : ''}`}
                    onClick={() => { setTheme(t.value); closeMenu(); }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: t.icon }} />
                    {t.label}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div className="mobile-menu__footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <span>caparros.ui@email.com</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* ── UI Mode Switcher ───────────────────────────────── */
        .ui-mode-switcher {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 3px;
          border: 1px solid var(--border-hover);
          border-radius: 10px;
          background: var(--bg-elevated);
          flex-shrink: 0;
        }
        .ui-mode-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 13px;
          border-radius: 7px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.05em;
          font-weight: 500;
          color: var(--text-muted);
          transition: all 0.22s var(--ease);
          white-space: nowrap;
        }
        .ui-mode-btn:hover { color: var(--text); background: var(--bg-subtle); }
        .ui-mode-btn--active {
          color: var(--text);
          background: var(--green-dim);
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
        }
        .nav--dark .ui-mode-btn--active {
          color: var(--green);
          background: rgba(0,255,70,0.08);
          box-shadow: 0 0 8px rgba(0,255,70,0.15);
        }
        .nav--navy .ui-mode-btn--active {
          color: var(--gold, #c8a96e);
          background: rgba(200,169,110,0.1);
        }
        .ui-mode-btn__icon { display: flex; align-items: center; line-height: 0; }
        .ui-mode-btn__icon svg { width: 12px; height: 12px; }

        @media (max-width: 820px) {
          .ui-mode-btn__label { display: none; }
          .ui-mode-btn { padding: 6px 9px; }
        }
        @media (max-width: 480px) { .ui-mode-switcher { display: none; } }

        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 900;
          padding: 16px 0 0;
          transition: padding 0.3s var(--ease), background 0.3s var(--ease);
        }
        .nav--scrolled {
          background: var(--nav-bg);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border);
        }

        /* Dark mode: terminal chrome nav */
        .nav--dark.nav--scrolled {
          box-shadow: 0 1px 0 rgba(0,255,70,0.08), 0 4px 24px rgba(0,0,0,0.6);
        }

        /* Navy mode: glass luxury nav */
        .nav--navy.nav--scrolled {
          box-shadow: 0 1px 0 rgba(126,184,247,0.08), 0 8px 40px rgba(0,0,0,0.4);
        }

        /* Light mode: clean document nav */
        .nav--light.nav--scrolled {
          box-shadow: 0 1px 0 rgba(0,0,0,0.06), 0 2px 16px rgba(0,0,0,0.06);
        }

        .nav__inner {
          display: flex;
          align-items: center;
          gap: 28px;
          padding-bottom: 14px;
        }

        .nav__brand {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          text-decoration: none;
        }
        .nav__avatar {
          width: 34px; height: 34px;
          border-radius: 50%;
          border: 1.5px solid var(--green);
          overflow: hidden;
          background: var(--bg-elevated);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
          box-shadow: 0 0 0 0 var(--green-glow);
          transition: box-shadow 0.3s var(--ease);
        }
        .nav__brand:hover .nav__avatar { box-shadow: 0 0 0 4px var(--green-glow); }
        .nav__avatar[data-initials]::after {
          content: attr(data-initials);
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          color: var(--green);
        }
        .nav__avatar-img { width: 100%; height: 100%; object-fit: cover; }
        .nav__logo {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.03em;
        }
        .nav__logo-dot { color: var(--green); }

        /* Navy: gold logo dot */
        .nav--navy .nav__logo-dot { color: var(--gold, var(--green)); }

        .nav__links {
          display: flex;
          align-items: center;
          gap: 28px;
          margin-left: auto;
        }
        .nav__link {
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.01em;
          position: relative;
          transition: color 0.25s var(--ease);
        }
        .nav__link::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0; right: 100%;
          height: 1px;
          background: var(--green);
          transition: right 0.3s var(--ease);
        }
        .nav__link:hover, .nav__link--active { color: var(--text); }
        .nav__link:hover::after, .nav__link--active::after { right: 0; }

        /* Dark mode: terminal-style active link */
        .nav--dark .nav__link--active {
          color: var(--green);
          text-shadow: 0 0 8px rgba(0,255,70,0.4);
        }

        .nav__controls {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .nav__icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px; height: 34px;
          border-radius: 8px;
          border: 1px solid var(--border);
          color: var(--text-muted);
          background: var(--bg-elevated);
          transition: all 0.2s var(--ease);
        }
        .nav__icon-btn:hover, .nav__icon-btn--active {
          border-color: var(--green);
          color: var(--green);
          background: var(--green-dim);
        }
        .nav__icon-btn svg { display: block; }

        .nav__cta {
          flex-shrink: 0;
          padding: 8px 20px;
          border-radius: 100px;
          border: 1px solid var(--green);
          font-size: 13px;
          font-weight: 600;
          color: var(--green);
          letter-spacing: 0.02em;
          transition: background 0.25s var(--ease), color 0.25s var(--ease);
        }
        .nav__cta:hover { background: var(--green); color: var(--bg); }

        /* Navy: gold CTA */
        .nav--navy .nav__cta {
          border-color: var(--gold, var(--green));
          color: var(--gold, var(--green));
        }
        .nav--navy .nav__cta:hover {
          background: var(--gold, var(--green));
          color: #1a0f00;
        }

        .nav__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 6px;
          z-index: 1100;
        }
        .nav__hamburger span {
          display: block;
          width: 22px; height: 1.5px;
          background: var(--text);
          transition: transform 0.3s var(--ease), opacity 0.3s var(--ease);
          transform-origin: center;
        }
        .nav__hamburger--open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nav__hamburger--open span:nth-child(2) { opacity: 0; }
        .nav__hamburger--open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Theme menu (legacy — now replaced by ui-mode-switcher pill) */
        .theme-switcher { position: relative; }

        /* Search bar */
        .nav__search-bar {
          overflow: hidden;
          border-top: 1px solid var(--border);
          background: var(--nav-bg, var(--bg));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .nav__search-form { padding: 12px var(--gutter); }
        .nav__search-input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--search-bg);
          border: 1px solid var(--search-border);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          margin-bottom: 10px;
          transition: border-color 0.2s;
        }
        .nav__search-input-wrap:focus-within {
          border-color: var(--green);
          box-shadow: 0 0 0 3px var(--green-dim);
        }
        .nav__search-icon { color: var(--text-muted); flex-shrink: 0; }
        .nav__search-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          font-size: 14px;
          color: var(--text);
          font-family: var(--font-body);
        }
        .nav__search-input::placeholder { color: var(--text-subtle); }
        .nav__search-clear {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: var(--text-subtle);
          color: var(--bg);
          font-size: 14px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .nav__search-clear:hover { background: var(--green); }
        .nav__search-kbd {
          font-family: var(--font-mono);
          font-size: 10px;
          padding: 2px 6px;
          border: 1px solid var(--border-hover);
          border-radius: 4px;
          color: var(--text-muted);
          flex-shrink: 0;
        }
        .nav__search-suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 0 2px 4px;
        }
        .nav__search-suggestion {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border: 1px solid var(--border);
          border-radius: 100px;
          font-size: 12px;
          font-family: var(--font-mono);
          color: var(--text-muted);
          background: var(--bg-subtle);
          transition: all 0.2s;
          letter-spacing: 0.04em;
        }
        .nav__search-suggestion:hover { border-color: var(--green); color: var(--green); background: var(--green-dim); }

        /* Mobile menu */
        .mobile-menu {
          position: fixed;
          inset: 0;
          background: var(--mobile-menu-bg);
          z-index: 800;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: var(--gutter);
        }
        .mobile-menu__profile {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 40px;
        }
        .mobile-menu__avatar {
          width: 52px; height: 52px;
          border-radius: 50%;
          border: 2px solid var(--green);
          overflow: hidden;
          background: var(--bg-elevated);
          flex-shrink: 0;
        }
        .mobile-menu__avatar-img { width: 100%; height: 100%; object-fit: cover; }
        .mobile-menu__name {
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.02em;
        }
        .mobile-menu__title {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.06em;
          margin-top: 2px;
        }
        .mobile-menu__links { display: flex; flex-direction: column; gap: 8px; }
        .mobile-menu__link {
          display: flex;
          align-items: baseline;
          gap: 20px;
          font-family: var(--font-display);
          font-size: clamp(32px, 8vw, 64px);
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.03em;
          transition: color 0.2s;
        }
        .mobile-menu__link:hover { color: var(--green); }
        .mobile-menu__link-num {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--green);
          letter-spacing: 0.1em;
          align-self: center;
        }
        .mobile-menu__theme { margin-top: 32px; }
        .mobile-menu__theme-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
          display: block;
          margin-bottom: 10px;
        }
        .mobile-menu__theme-btns { display: flex; gap: 8px; flex-wrap: wrap; }
        .mobile-theme-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 100px;
          border: 1px solid var(--border);
          font-size: 13px;
          font-weight: 500;
          color: var(--text-muted);
          background: var(--bg-elevated);
          transition: all 0.2s;
        }
        .mobile-theme-btn:hover { border-color: var(--green); color: var(--green); }
        .mobile-theme-btn--active { border-color: var(--green); color: var(--green); background: var(--green-dim); }
        .mobile-menu__footer {
          position: absolute;
          bottom: 40px; left: var(--gutter);
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }

        @media (max-width: 860px) {
          .nav__links { display: none; }
          .nav__cta { display: none; }
          .nav__hamburger { display: flex; margin-left: auto; }
          .ui-mode-switcher { display: none; }
          .nav__icon-btn:not(.nav__hamburger) { display: none; }
          .nav__controls { gap: 4px; }
          .nav__inner { gap: 12px; }
        }
        @media (max-width: 480px) { .nav__search-suggestions { display: none; } }
      `}</style>
    </>
  );
}
