import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ui/ScrollReveal';
import { projects } from '../data/portfolio';
import { useTheme } from '../App';
import type { Project } from '../types';

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.article
        className={`proj-entry ${project.featured ? 'proj-entry--featured' : ''}`}
        layout
      >
        {/* Top row: number + year */}
        <div className="proj-entry__top">
          <div className="proj-entry__num-wrap">
            <span className="proj-entry__num">{String(index + 1).padStart(2, '0')}</span>
            {project.featured && (
              <span className="proj-entry__featured">Featured</span>
            )}
          </div>
          <time className="proj-entry__year">{project.year}</time>
        </div>

        {/* Title */}
        <h3 className="proj-entry__title">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-entry__title-link"
            >
              {project.title}
              <svg
                className="proj-entry__arrow"
                width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
          ) : (
            project.title
          )}
        </h3>

        {/* Description */}
        <p className="proj-entry__desc">{project.description}</p>

        {/* Bullets (expandable) */}
        <AnimatePresence initial={false}>
          {(project.featured || expanded) && (
            <motion.ul
              className="proj-entry__bullets"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {project.bullets.map((b, i) => (
                <li key={i} className="proj-entry__bullet">
                  <span className="proj-entry__bullet-dash" aria-hidden="true">--</span>
                  {b}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Tags */}
        <div className="proj-entry__tags">
          {project.tags.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        {/* Expand toggle */}
        {!project.featured && (
          <button
            className="proj-entry__toggle"
            onClick={() => setExpanded(e => !e)}
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : 'Show details'}
            <svg
              width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
              style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
            >
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </motion.article>
    </ScrollReveal>
  );
}

export default function Projects() {
  const { theme } = useTheme();

  return (
    <section className={`projects section projects--${theme}`} id="projects">
      <div className="container">
        <ScrollReveal>
          <div className="section-eyebrow">
            <span className="section-eyebrow__number">04</span>
            <span className="section-eyebrow__line" />
            <span className="section-eyebrow__label">Projects</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.06}>
          <div className="projects__header">
            <h2 className="projects__heading">Things I've built.</h2>
            <p className="projects__sub">
              Each project solves a real problem — from automating school attendance
              to publishing an organisation's identity online.
            </p>
          </div>
        </ScrollReveal>

        {/* All projects as editorial entries */}
        <div className="projects__list">
          {projects.map((p, i) => (
            <ProjectEntry key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .projects__header {
          margin-bottom: 56px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 40px;
          flex-wrap: wrap;
        }
        .projects__heading {
          font-size: clamp(28px, 4.5vw, 48px);
          color: var(--text);
        }
        .projects__sub {
          font-size: 14px;
          color: var(--text-muted);
          max-width: 320px;
          line-height: 1.7;
          text-align: right;
        }

        .projects__list {
          display: flex;
          flex-direction: column;
        }

        /* ── Project entry (editorial, no card) ─────────── */
        .proj-entry {
          padding: 40px 0;
          border-bottom: 1px solid var(--border);
          cursor: default;
          position: relative;
        }
        .proj-entry:first-child {
          border-top: 1px solid var(--border);
        }

        .proj-entry__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .proj-entry__num-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .proj-entry__num {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--green);
          letter-spacing: 0.1em;
        }
        .proj-entry__featured {
          padding: 3px 10px;
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 10px;
          background: var(--green-dim);
          color: var(--green);
          border: 1px solid rgba(34,197,94,0.25);
          letter-spacing: 0.08em;
        }
        .proj-entry__year {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-subtle);
        }

        .proj-entry__title {
          font-size: clamp(20px, 2.5vw, 32px);
          color: var(--text);
          margin-bottom: 16px;
          line-height: 1.15;
        }
        .proj-entry--featured .proj-entry__title {
          font-size: clamp(24px, 3.5vw, 40px);
        }

        .proj-entry__title-link {
          color: inherit;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: color 0.3s var(--ease);
        }
        .proj-entry__arrow {
          opacity: 0;
          transform: translate(-4px, 4px);
          transition: all 0.3s var(--ease);
          color: var(--green);
        }
        .proj-entry__title-link:hover {
          color: var(--green);
        }
        .proj-entry__title-link:hover .proj-entry__arrow {
          opacity: 1;
          transform: translate(0, 0);
        }

        .proj-entry__desc {
          font-size: 14px;
          line-height: 1.75;
          color: var(--text-muted);
          margin-bottom: 20px;
          max-width: 640px;
        }

        .proj-entry__bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
          overflow: hidden;
        }
        .proj-entry__bullet {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13.5px;
          color: var(--text-muted);
          line-height: 1.6;
        }
        .proj-entry__bullet-dash {
          font-family: var(--font-mono);
          color: var(--green);
          flex-shrink: 0;
          font-size: 12px;
          margin-top: 1px;
        }

        .proj-entry__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 24px;
        }

        .proj-entry__toggle {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 18px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--green);
          letter-spacing: 0.08em;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: opacity 0.2s;
        }
        .proj-entry__toggle:hover { opacity: 0.7; }

        @media (max-width: 680px) {
          .projects__sub { text-align: left; max-width: 100%; }
        }
      `}</style>
    </section>
  );
}