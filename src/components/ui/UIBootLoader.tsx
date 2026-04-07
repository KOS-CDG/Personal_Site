import { useEffect, useRef, useState } from 'react';
import type { Theme } from '../../App';

const MODE_META: Record<Theme, { label: string; desc: string; color: string; accent: string }> = {
  dark:  { label: 'TERMINAL',  desc: 'Initializing hacker interface…',    color: '#050505', accent: '#00ff46' },
  light: { label: 'RESUME',    desc: 'Loading professional presentation…', color: '#fafafa', accent: '#1a6b3c' },
  navy:  { label: 'SIGNATURE', desc: 'Entering signature experience…',     color: '#060d1a', accent: '#c8a96e' },
};

const BOOT_LINES: Record<Theme, string[]> = {
  dark: [
    '> BIOS handshake… OK',
    '> Mounting filesystem… OK',
    '> Loading terminal kernel…',
    '> Interface ready.',
  ],
  light: [
    '> Compiling resume data… OK',
    '> Applying typography styles… OK',
    '> Rendering professional layout…',
    '> Document ready.',
  ],
  navy: [
    '> Calibrating signature palette… OK',
    '> Weaving ambient layer… OK',
    '> Composing visual identity…',
    '> Experience ready.',
  ],
};

interface UIBootLoaderProps {
  targetTheme: Theme;
  onComplete: () => void;
}

export default function UIBootLoader({ targetTheme, onComplete }: UIBootLoaderProps) {
  const meta = MODE_META[targetTheme];
  const lines = BOOT_LINES[targetTheme];
  const [progress, setProgress] = useState(1);
  const [shownLines, setShownLines] = useState<string[]>([]);
  const [exiting, setExiting] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const DURATION = 1600; // ms total

  useEffect(() => {
    // Animate progress 1 → 100 over DURATION
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const pct = Math.min(100, Math.round(1 + (elapsed / DURATION) * 99));
      setProgress(pct);

      // Drip in boot lines at 20/40/65/85%
      const thresholds = [20, 40, 65, 85];
      setShownLines(lines.filter((_, i) => pct >= thresholds[i]));

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        // Hold 1 frame then exit
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 420);
        }, 180);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className={`uiboot${exiting ? ' uiboot--exit' : ''}`}
      aria-live="polite"
      aria-label={`Loading ${meta.label} interface`}
    >
      {/* Background */}
      <div className="uiboot__bg" style={{ background: meta.color }} />

      {/* Center content */}
      <div className="uiboot__center">
        {/* GD monogram logo */}
        <div className="uiboot__logo" style={{ '--boot-accent': meta.accent } as React.CSSProperties}>
          <svg viewBox="0 0 120 60" width="120" height="60" aria-hidden="true" fill="none">
            {/* G */}
            <path
              d="M8 12 C8 12 4 12 4 30 C4 48 8 48 20 48 C32 48 36 44 36 36 L36 28 L20 28 L20 36 L28 36 C28 42 24 44 20 44 C12 44 10 40 10 30 C10 20 12 16 20 16 C26 16 28 18 30 22 L36 20 C34 14 28 10 20 10 C12 10 8 12 8 12 Z"
              fill="currentColor"
              className="uiboot__logo-path uiboot__logo-path--1"
            />
            {/* D */}
            <path
              d="M46 10 L46 50 L62 50 C74 50 80 44 80 30 C80 16 74 10 62 10 Z M54 18 L62 18 C70 18 72 22 72 30 C72 38 70 42 62 42 L54 42 Z"
              fill="currentColor"
              className="uiboot__logo-path uiboot__logo-path--2"
            />
            {/* dot */}
            <circle cx="88" cy="44" r="5" fill="currentColor" className="uiboot__logo-dot" />
          </svg>
        </div>

        {/* Mode label */}
        <div className="uiboot__mode" style={{ color: meta.accent }}>
          {meta.label}
        </div>

        {/* Progress bar */}
        <div className="uiboot__bar-wrap">
          <div
            className="uiboot__bar-fill"
            style={{ width: `${progress}%`, background: meta.accent }}
          />
        </div>

        {/* Progress number */}
        <div className="uiboot__pct" style={{ color: meta.accent }}>
          {String(progress).padStart(3, '0')}%
        </div>

        {/* Boot log */}
        <div className="uiboot__log">
          {shownLines.map((line, i) => (
            <div key={i} className="uiboot__log-line" style={{ color: meta.accent }}>
              {line}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .uiboot {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: uiboot-in 0.2s ease both;
        }
        .uiboot--exit {
          animation: uiboot-out 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes uiboot-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes uiboot-out {
          from { opacity: 1; clip-path: inset(0%); }
          to   { opacity: 0; clip-path: inset(50% 0 50% 0); }
        }

        .uiboot__bg {
          position: absolute;
          inset: 0;
        }

        .uiboot__center {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          width: 360px;
          max-width: 90vw;
        }

        .uiboot__logo {
          color: var(--boot-accent, #00ff46);
          opacity: 0;
          animation: boot-logo-appear 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both;
          filter: drop-shadow(0 0 20px var(--boot-accent, #00ff46));
        }
        @keyframes boot-logo-appear {
          from { opacity: 0; transform: scale(0.6) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .uiboot__logo-path,
        .uiboot__logo-dot {
          animation: boot-path-draw 0.6s ease both;
        }
        .uiboot__logo-path--1 { animation-delay: 0.15s; }
        .uiboot__logo-path--2 { animation-delay: 0.25s; }
        .uiboot__logo-dot     { animation-delay: 0.4s; }
        @keyframes boot-path-draw {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .uiboot__mode {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          opacity: 0;
          animation: boot-fade-up 0.4s ease 0.4s both;
        }
        @keyframes boot-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .uiboot__bar-wrap {
          width: 100%;
          height: 1px;
          background: rgba(128,128,128,0.18);
          position: relative;
          overflow: hidden;
          opacity: 0;
          animation: boot-fade-up 0.4s ease 0.5s both;
        }
        .uiboot__bar-fill {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          transition: width 0.05s linear;
        }

        .uiboot__pct {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          opacity: 0;
          animation: boot-fade-up 0.4s ease 0.6s both;
          align-self: flex-end;
        }

        .uiboot__log {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-height: 72px;
        }
        .uiboot__log-line {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 10px;
          letter-spacing: 0.06em;
          opacity: 0.65;
          animation: boot-line-appear 0.25s ease both;
        }
        @keyframes boot-line-appear {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 0.65; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
