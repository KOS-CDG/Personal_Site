import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ui/ScrollReveal';
import { projects } from '../data/portfolio';
import { useTheme } from '../App';
import type { Project } from '../types';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.article
        className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        layout
      >
        {/* Card header */}
        <div className="project-card__header">
          <div className="project-card__meta">
            <span className="project-card__num">
              {String(index + 1).padStart(2, '0')}
            </span>
            {project.featured && (
              <span className="project-card__featured-badge">Featured</span>
            )}
          </div>
          <span className="project-card__year">{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="project-card__title">
          {project.link ? (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-card__title-link"
            >
              {project.title}
              <svg 
                className="project-card__title-icon" 
                width="14" height="14" viewBox="0 0 24 24" fill="none" 
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
        <p className="project-card__desc">{project.description}</p>

        {/* Bullets (expandable on non-featured) */}
        <AnimatePresence initial={false}>
          {(project.featured || expanded) && (
            <motion.ul
              className="project-card__bullets"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {project.bullets.map((b, i) => (
                <li key={i} className="project-card__bullet">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <circle cx="5" cy="5" r="2" fill="var(--green)" />
                  </svg>
                  {b}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Tags */}
        <div className="project-card__tags">
          {project.tags.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        {/* Expand toggle (non-featured only) */}
        {!project.featured && (
          <button
            className="project-card__toggle"
            onClick={() => setExpanded(e => !e)}
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : 'Show details'}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
            >
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Hover border glow (decorative) */}
        <div className="project-card__glow" aria-hidden="true" />
      </motion.article>
    </ScrollReveal>
  );
}

export default function Projects() {
  const { theme } = useTheme();
  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);

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

        {/* Featured projects */}
        <div className="projects__featured">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* Rest of projects */}
        <div className="projects__grid">
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={featured.length + i} />
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

        .projects__featured {
          margin-bottom: 20px;
        }
        .projects__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        /* Project Card */
        .project-card {
          position: relative;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 36px;
          overflow: hidden;
          cursor: default;
          transition: border-color 0.3s var(--ease);
          margin-bottom: 20px;
        }
        .project-card:hover {
          border-color: rgba(34, 197, 94, 0.3);
        }
        .project-card:hover .project-card__glow {
          opacity: 1;
        }

        /* Featured gets extra flair */
        .project-card--featured {
          background: linear-gradient(135deg, var(--bg-elevated) 0%, rgba(34,197,94,0.04) 100%);
        }
        .project-card--featured .project-card__title {
          font-size: clamp(24px, 3.5vw, 40px);
        }

        .project-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .project-card__meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .project-card__num {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--green);
          letter-spacing: 0.1em;
        }
        .project-card__featured-badge {
          padding: 3px 10px;
          border-radius: 100px;
          font-family: var(--font-mono);
          font-size: 10px;
          background: var(--green-dim);
          color: var(--green);
          border: 1px solid rgba(34,197,94,0.25);
          letter-spacing: 0.08em;
        }
        .project-card__year {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-subtle);
        }

        .project-card__title {
          font-size: clamp(20px, 2.5vw, 28px);
          color: var(--text);
          margin-bottom: 16px;
          line-height: 1.15;
        }

        /* New Title Link Styles */
        .project-card__title-link {
          color: inherit;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: color 0.3s var(--ease);
        }

        .project-card__title-icon {
          opacity: 0;
          transform: translate(-4px, 4px);
          transition: all 0.3s var(--ease);
          color: var(--green);
        }

        .project-card__title-link:hover {
          color: var(--green);
        }

        .project-card__title-link:hover .project-card__title-icon {
          opacity: 1;
          transform: translate(0, 0);
        }

        .project-card__desc {
          font-size: 14px;
          line-height: 1.75;
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .project-card__bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
          overflow: hidden;
        }
        .project-card__bullet {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13.5px;
          color: var(--text-muted);
          line-height: 1.6;
        }
        .project-card__bullet svg {
          margin-top: 5px;
          flex-shrink: 0;
        }

        .project-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 24px;
        }

        .project-card__toggle {
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
        .project-card__toggle:hover { opacity: 0.7; }

        /* Hover glow */
        .project-card__glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(34,197,94,0.06) 0%, transparent 70%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s var(--ease);
        }

        @media (max-width: 680px) {
          .projects__grid { grid-template-columns: 1fr; }
          .projects__sub { text-align: left; max-width: 100%; }
        }
      `}</style>
    </section>
  );
}