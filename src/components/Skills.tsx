import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from './ui/ScrollReveal';
import { skills } from '../data/portfolio';
import type { Skill } from '../types';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useTheme } from '../App';

// ── Category config ───────────────────────────────────────────────────────────
const CATEGORIES: { key: Skill['category']; label: string; icon: React.ReactNode }[] = [
  {
    key: 'Frontend',
    label: 'Frontend',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M4 13h6M7 10v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: 'Backend',
    label: 'Backend',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect x="2" y="1" width="10" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="2" y="9" width="10" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M7 5v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: 'DevOps',
    label: 'DevOps',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M7 4v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: 'Design',
    label: 'Design',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 12l3.5-3.5M7 3l4 4-6 6H2v-3l6-6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: 'AI',
    label: 'AI',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 1v2M7 11v2M1 7h2M11 7h2M3 3l1.5 1.5M9.5 9.5L11 11M11 3l-1.5 1.5M4.5 9.5L3 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    key: 'Tools & Hardware',
    label: 'Tools & Hardware',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5 1v2M9 1v2M5 11v2M9 11v2M1 5h2M11 5h2M1 9h2M11 9h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

function SkillRow({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });
  const reduced = useReducedMotion();
  const { theme } = useTheme();

  return (
    <div ref={ref} className={`skill-row skill-row--${theme}`}>
      <div className="skill-row__left">
        <img src={skill.icon} alt="" className="skill-row__icon" width={18} height={18} loading="lazy" />
        <span className="skill-row__name">{skill.name}</span>
      </div>
      <div className="skill-row__right">
        <div className="skill-row__track">
          <motion.div
            className="skill-row__fill"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: skill.level / 100 } : {}}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 1, delay: 0.05 + index * 0.04, ease: [0.16, 1, 0.3, 1] }
            }
            style={{ transformOrigin: 'left' }}
          />
        </div>
        <span className="skill-row__pct">{skill.level}%</span>
      </div>
    </div>
  );
}

export default function Skills() {
  const { theme } = useTheme();

  return (
    <section className={`skills section skills--${theme}`} id="skills">
      <div className="container">
        <ScrollReveal>
          <div className="section-eyebrow">
            <span className="section-eyebrow__number">03</span>
            <span className="section-eyebrow__line" />
            <span className="section-eyebrow__label">Skills</span>
          </div>
        </ScrollReveal>

        <div className="skills__header">
          <ScrollReveal delay={0.06}>
            <h2 className="skills__heading">The tools I reach for.</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <p className="skills__sub">Built through 7 professional certificates, real projects, and a lot of soldering.</p>
          </ScrollReveal>
        </div>

        <div className="skills__grid">
          {CATEGORIES.map((cat, catIdx) => {
            const catSkills = skills.filter(s => s.category === cat.key);
            if (catSkills.length === 0) return null;

            return (
              <ScrollReveal key={cat.key} delay={0.06 + catIdx * 0.06} className="skills__category">
                <h3 className="skills__cat-title">
                  {cat.icon}
                  {cat.label}
                  <span className="skills__cat-count">{catSkills.length}</span>
                </h3>
                <div className="skills__cat-list">
                  {catSkills.map((s, i) => <SkillRow key={s.name} skill={s} index={i} />)}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Also comfortable with */}
        <ScrollReveal delay={0.3}>
          <div className="skills__also">
            <span className="skills__also-label">Also comfortable with</span>
            <div className="skills__also-tags">
              {['OpenShift', 'Microservices', 'Serverless', 'REST APIs', 'Flask', 'Express.js', 'Firebase Auth', 'EmailJS', 'Vite', 'TFT Displays', 'SEO & GEO', 'Agile & Scrum'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .skills__header { margin-bottom: 64px; }
        .skills__heading { font-size: clamp(28px, 4.5vw, 48px); color: var(--text); margin-bottom: 12px; }
        .skills__sub { font-size: 15px; color: var(--text-muted); }

        /* ── Multi-category grid ── */
        .skills__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px 60px;
        }

        .skills__cat-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 500;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }
        .skills__cat-title svg { color: var(--green); flex-shrink: 0; }
        .skills__cat-count {
          margin-left: auto;
          font-size: 9px;
          color: var(--text-subtle);
          letter-spacing: 0.06em;
        }

        .skills__cat-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        /* ── Skill row (typographic, no card) ── */
        .skill-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .skill-row__left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          min-width: 120px;
        }
        .skill-row__icon { width: 18px; height: 18px; object-fit: contain; flex-shrink: 0; }
        .skill-row__name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          font-family: var(--font-display);
          white-space: nowrap;
        }

        .skill-row__right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .skill-row__track {
          flex: 1;
          height: 3px;
          background: var(--bg-subtle);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }
        .skill-row__fill {
          height: 100%;
          background: linear-gradient(90deg, var(--green-muted), var(--green));
          border-radius: 2px;
        }

        /* Dark mode: neon glow */
        .skill-row--dark .skill-row__fill {
          background: linear-gradient(90deg, rgba(0,200,50,0.8), rgba(0,255,70,1));
          box-shadow: 0 0 6px rgba(0,255,70,0.5);
        }
        .skill-row--dark .skill-row__track {
          background: rgba(0,255,70,0.06);
        }

        /* Navy: blue gradient */
        .skill-row--navy .skill-row__fill {
          background: linear-gradient(90deg, rgba(90,157,232,0.7), rgba(126,184,247,1));
          box-shadow: 0 0 8px rgba(126,184,247,0.3);
        }

        /* Light: solid */
        .skill-row--light .skill-row__fill {
          background: linear-gradient(90deg, var(--green-muted), var(--green));
          box-shadow: none;
        }
        .skill-row--light .skill-row__track { background: rgba(0,0,0,0.06); height: 4px; border-radius: 4px; }
        .skill-row--light .skill-row__fill { border-radius: 4px; }

        .skill-row__pct {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--green);
          min-width: 32px;
          text-align: right;
        }

        /* ── Also comfortable ── */
        .skills__also {
          margin-top: 56px;
          padding-top: 32px;
          border-top: 1px solid var(--border);
        }
        .skills__also-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 14px;
          display: block;
        }
        .skills__also-tags { display: flex; flex-wrap: wrap; gap: 8px; }

        @media (max-width: 720px) { .skills__grid { grid-template-columns: 1fr; gap: 40px; } }
      `}</style>
    </section>
  );
}
