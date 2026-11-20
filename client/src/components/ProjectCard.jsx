import React from 'react';
import { asset } from '../utils/api.js';

export function ProjectCard({ project, locale }) {
  if (!project) return null;
  const category = locale === 'en' ? project.category_en || project.category : project.category;
  const title = locale === 'en' ? project.title_en || project.title : project.title;
  const description = locale === 'en' ? project.description_en || project.description : project.description;
  const primaryMetric = project.metrics && project.metrics[0];

  return (
    <a
      className="project group"
      href={`/projects/${project.id}`}
      data-project-filter={`${project.category || ''} ${project.technologies || ''}`.toLowerCase()}
    >
      <div className="project-image relative overflow-hidden">
        <img
          src={asset(project.cover_image || project.image)}
          alt={title || ''}
          loading="lazy"
          decoding="async"
          width="600"
          height="340"
        />
        {primaryMetric && (
          <div className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur-md border border-sky-400/30 text-sky-300 text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
            {primaryMetric.label}: {primaryMetric.value}
          </div>
        )}
      </div>

      <div className="project-content">
        <span className="project-category">{category || ''}</span>
        <h3>{title}</h3>
        <p>{description?.slice(0, 160)}...</p>

        <div className="techs">
          {(project.technologies || '')
            .split(',')
            .slice(0, 4)
            .map((tech) => (
              <span key={tech}>{tech.trim()}</span>
            ))}
        </div>

        <span className="project-link group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200 inline-flex items-center justify-center">
          <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </span>
      </div>
    </a>
  );
}
