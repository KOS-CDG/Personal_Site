import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from './ui/ScrollReveal';
import { skills } from '../data/portfolio';
import type { Skill } from '../types';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useTheme } from '../App';

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });
  const reduced = useReducedMotion();
  const { theme } = useTheme();

  return (
    <div ref={ref} className={`skill-item skill-item--${theme}`}>
      <div className="skill-item__header">
        <div className="skill-item__info">
          <img src={skill.icon} alt="" className="skill-item__icon" width={20} height={20} loading="lazy" />
          <span className="skill-item__name">{skill.name}</span>
          <span className="skill-item__label tag">{skill.label}</span>
        </div>
        <span className="skill-item__pct">{skill.level}%</span>
      </div>

      <div className="skill-item__track">
        <motion.div
          className="skill-item__fill"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: skill.level / 100 } : {}}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 1, delay: 0.1 + index * 0.07, ease: [0.16, 1, 0.3, 1] }
          }
          style={{ transformOrigin: 'left' }}
        />
        {/* Dark mode: terminal scan line on fill */}
        {theme === 'dark' && inView && (
          <motion.div
            className="skill-item__scan"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: skill.level / 100 }}
            transition={reduced ? { duration: 0 } : { duration: 1, delay: 0.1 + index * 0.07 + 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left' }}
          />
        )}
      </div>
    </div>
  );
}

export default function Skills() {
  const frontend = skills.filter(s => s.category === 'Frontend');
  const hardware = skills.filter(s => s.category === 'Tools & Hardware');
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
            <p className="skills__sub">Built through projects, research, and a lot of soldering.</p>
          </ScrollReveal>
        </div>

        <div className="skills__columns">
          {/* Frontend column */}
          <ScrollReveal delay={0.08} className="skills__col">
            <h3 className="skills__col-title">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="12" height="9" rx="1.5" stroke="var(--green)" strokeWidth="1.2"/>
                <path d="M4 13h6M7 10v3" stroke="var(--green)" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Frontend
            </h3>
            <div className="skills__list">
              {frontend.map((s, i) => <SkillBar key={s.name} skill={s} index={i} />)}
            </div>
          </ScrollReveal>

          {/* Hardware column */}
          <ScrollReveal delay={0.16} className="skills__col">
            <h3 className="skills__col-title">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="8" height="8" rx="1" stroke="var(--green)" strokeWidth="1.2"/>
                <path d="M5 1v2M9 1v2M5 11v2M9 11v2M1 5h2M11 5h2M1 9h2M11 9h2" stroke="var(--green)" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Tools &amp; Hardware
            </h3>
            <div className="skills__list">
              {hardware.map((s, i) => <SkillBar key={s.name} skill={s} index={i} />)}
            </div>

            <div className="skills__also">
              <p className="skills__also-label">Also comfortable with</p>
              <div className="skills__also-tags">
                {['ESP32-S3', 'TFT Displays', 'Firebase Auth', 'EmailJS', 'Vite'].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        .skills__header { margin-bottom: 64px; }
        .skills__heading { font-size: clamp(28px, 4.5vw, 48px); color: var(--text); margin-bottom: 12px; }
        .skills__sub { font-size: 15px; color: var(--text-muted); }
        .skills__columns { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
        .skills__col-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 500;
          margin-bottom: 32px;
        }
        .skills__list { display: flex; flex-direction: column; gap: 24px; }

        .skill-item__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .skill-item__info { display: flex; align-items: center; gap: 10px; }
        .skill-item__icon { width: 20px; height: 20px; object-fit: contain; flex-shrink: 0; }
        .skill-item__name { font-size: 14px; font-weight: 600; color: var(--text); font-family: var(--font-display); }
        .skill-item__label { font-size: 10px; padding: 3px 10px; }
        .skill-item__pct { font-family: var(--font-mono); font-size: 12px; color: var(--green); }

        .skill-item__track {
          height: 3px;
          background: var(--bg-subtle);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }
        .skill-item__fill {
          height: 100%;
          background: linear-gradient(90deg, var(--green-muted), var(--green));
          border-radius: 2px;
          position: relative;
        }

        /* Dark mode: glowing neon fill */
        .skill-item--dark .skill-item__fill {
          background: linear-gradient(90deg, rgba(0,200,50,0.8), rgba(0,255,70,1));
          box-shadow: 0 0 6px rgba(0,255,70,0.5);
        }
        .skill-item--dark .skill-item__track {
          background: rgba(0,255,70,0.06);
        }

        /* Dark mode scan line effect */
        .skill-item__scan {
          position: absolute;
          top: 0; left: 0;
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.8) 100%);
          border-radius: 2px;
        }

        /* Navy: gradient fill with glow */
        .skill-item--navy .skill-item__fill {
          background: linear-gradient(90deg, rgba(90,157,232,0.7), rgba(126,184,247,1));
          box-shadow: 0 0 8px rgba(126,184,247,0.3);
        }

        /* Light: confident solid fill */
        .skill-item--light .skill-item__fill {
          background: linear-gradient(90deg, var(--green-muted), var(--green));
          box-shadow: none;
        }
        .skill-item--light .skill-item__track { background: rgba(0,0,0,0.06); height: 4px; border-radius: 4px; }
        .skill-item--light .skill-item__fill { border-radius: 4px; }

        .skills__also {
          margin-top: 48px;
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
        }
        .skills__also-tags { display: flex; flex-wrap: wrap; gap: 8px; }

        @media (max-width: 720px) { .skills__columns { grid-template-columns: 1fr; gap: 48px; } }
      `}</style>
    </section>
  );
}
