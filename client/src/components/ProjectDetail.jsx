import React, { useEffect, useState } from 'react';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { api, asset } from '../utils/api.js';
import { english, french } from '../locales/messages.js';

export function ProjectDetail({ data, locale, setLocale }) {
  const id = location.pathname.split('/').pop();
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState('');
  const t = locale === 'en' ? english : french;

  useEffect(() => {
    api(`/projects/${id}`)
      .then((res) => {
        if (res && res.project) {
          setDetail(res);
        } else {
          const localProj = (data?.projects || []).find((p) => String(p.id) === String(id));
          if (localProj) {
            const localImages = (data?.images || []).filter((img) => String(img.project_id) === String(id));
            setDetail({ project: localProj, images: localImages });
          } else {
            setError(locale === 'en' ? 'Project not found.' : 'Projet introuvable.');
          }
        }
      })
      .catch(() => {
        const localProj = (data?.projects || []).find((p) => String(p.id) === String(id));
        if (localProj) {
          const localImages = (data?.images || []).filter((img) => String(img.project_id) === String(id));
          setDetail({ project: localProj, images: localImages });
        } else {
          setError(locale === 'en' ? 'Project not found.' : 'Projet introuvable.');
        }
      });
  }, [id, data, locale]);

  if (error) {
    return (
      <>
        <Header settings={data.settings || {}} locale={locale} setLocale={setLocale} translations={data.translations} />
        <main className="wrap section text-center py-24">
          <h1 className="text-3xl font-bold mb-4">{error}</h1>
          <a className="btn-pro-ghost inline-flex" href="/#projets">
            ← {t.back}
          </a>
        </main>
        <Footer settings={data.settings || {}} locale={locale} />
      </>
    );
  }

  if (!detail || !detail.project) {
    return (
      <>
        <Header settings={data.settings || {}} locale={locale} setLocale={setLocale} translations={data.translations} />
        <main className="wrap section text-center py-24 text-slate-400">
          <div className="inline-block animate-spin text-3xl mb-4">⟳</div>
          <p>{locale === 'en' ? 'Loading case study…' : 'Chargement de l’étude de cas…'}</p>
        </main>
        <Footer settings={data.settings || {}} locale={locale} />
      </>
    );
  }

  const { project, images = [] } = detail;
  const category = locale === 'en' ? project.category_en || project.category : project.category;
  const title = locale === 'en' ? project.title_en || project.title : project.title;
  const description = locale === 'en' ? project.description_en || project.description : project.description;
  const challenge = locale === 'en' ? project.challenge_en || project.challenge : project.challenge;
  const solution = locale === 'en' ? project.solution_en || project.solution : project.solution;
  const impact = locale === 'en' ? project.impact_en || project.impact : project.impact;
  const metrics = project.metrics || [];

  return (
    <>
      <Header settings={data.settings || {}} locale={locale} setLocale={setLocale} translations={data.translations} />

      <main className="wrap section py-12">
        {/* Navigation retour */}
        <div className="mb-8">
          <a className="btn-pro-ghost group inline-flex items-center gap-2 text-sm font-semibold" href="/#projets">
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>{t.back}</span>
          </a>
        </div>

        {/* En-tête Étude de cas */}
        <header className="border-b border-white/10 pb-12 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="kicker">{category || 'Case Study'}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-400/20 font-mono">
              PROJET #{project.id}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6 tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            {description}
          </p>

          {/* Boutons d'action : GitHub + Démo */}
          <div className="flex flex-wrap items-center gap-4">
            {project.project_url && (
              <a
                className="btn-pro-primary group flex items-center gap-2"
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{t.viewDemo}</span>
                <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
              </a>
            )}

            {project.github_url && (
              <a
                className="btn-pro-ghost group flex items-center gap-2"
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>{t.sourceCode}</span>
                <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
              </a>
            )}

            <a className="btn-pro-nav group flex items-center gap-1.5" href="/#contact">
              <span>{t.talk}</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </header>

        {/* Métriques clés */}
        {metrics.length > 0 && (
          <section className="mb-14">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="card p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-sky-400/20"
                >
                  <span className="text-xs text-sky-400 uppercase tracking-wider font-semibold block mb-1">
                    {m.label}
                  </span>
                  <strong className="text-3xl md:text-4xl font-bold font-display text-white">
                    {m.value}
                  </strong>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Deep Dive Architecture & Problem Solving */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-10">
            {challenge && (
              <div className="p-8 rounded-2xl bg-slate-900/40 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                    !
                  </span>
                  <h2 className="text-2xl font-bold text-white font-display">
                    {t.challenge}
                  </h2>
                </div>
                <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                  {challenge}
                </p>
              </div>
            )}

            {solution && (
              <div className="p-8 rounded-2xl bg-slate-900/40 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold">
                    ⚡
                  </span>
                  <h2 className="text-2xl font-bold text-white font-display">
                    {t.solution}
                  </h2>
                </div>
                <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                  {solution}
                </p>
              </div>
            )}

            {impact && (
              <div className="p-8 rounded-2xl bg-slate-900/40 border border-emerald-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                    ✓
                  </span>
                  <h2 className="text-2xl font-bold text-white font-display">
                    {t.impact}
                  </h2>
                </div>
                <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                  {impact}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar : Stack & Technologies */}
          <aside className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 sticky top-28">
              <h3 className="text-lg font-bold text-white font-display mb-4">
                {t.technologies}
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {(project.technologies || '')
                  .split(',')
                  .map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 font-mono"
                    >
                      {tech.trim()}
                    </span>
                  ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Rôle</span>
                  <span className="text-slate-200 font-semibold">Lead Developer</span>
                </div>
                <div className="flex justify-between">
                  <span>Architecture</span>
                  <span className="text-slate-200 font-semibold">Full Stack / Modular</span>
                </div>
                <div className="flex justify-between">
                  <span>Type</span>
                  <span className="text-slate-200 font-semibold">{category}</span>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* Galerie visuelle / Interface */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold font-display text-white mb-6">
            {locale === 'en' ? 'Interface & Architecture Overview' : 'Aperçu de l’interface & de l’architecture'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-950 p-2">
              <img
                src={asset(project.cover_image || project.image)}
                alt={title}
                className="w-full h-auto rounded-xl object-contain max-h-[500px]"
                loading="lazy"
              />
            </div>

            {images.map((img) => (
              <div
                key={img.id}
                className="rounded-2xl overflow-hidden border border-white/10 bg-slate-950 p-2"
              >
                <img
                  src={asset(img.image_path)}
                  alt={img.caption || title}
                  className="w-full h-auto rounded-xl object-contain max-h-[500px]"
                  loading="lazy"
                />
                {img.caption && (
                  <p className="text-xs text-slate-400 px-3 py-2 text-center">
                    {img.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer settings={data.settings || {}} locale={locale} />
    </>
  );
}
