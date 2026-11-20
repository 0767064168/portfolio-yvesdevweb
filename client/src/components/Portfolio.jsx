import React, { useState } from 'react';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { ProjectCard } from './ProjectCard.jsx';
import { SocialGroup } from './SocialLinks.jsx';
import { api, apiUrl, asset, apiBase } from '../utils/api.js';
import { english, french } from '../locales/messages.js';

export function Portfolio({ data, locale, setLocale, csrfToken }) {
  const fallback = locale === 'en' ? english : french;
  const translate = (key, fallbackText) => data.translations?.[`${locale}.${key}`] || fallbackText;

  const t = {
    ...fallback,
    about: translate('nav.about', fallback.about),
    skills: translate('nav.skills', fallback.skills),
    projects: translate('nav.projects', fallback.projects),
    services: translate('nav.services', fallback.services),
    contact: translate('nav.contact', fallback.contact),
    available: translate('hero.available', fallback.available),
    viewProjects: translate('cta.view_projects', fallback.viewProjects),
    talk: translate('cta.talk_project', fallback.talk),
    aboutTitle: translate('about.heading_prefix', fallback.aboutTitle),
    aboutEnd: translate('about.heading_suffix', fallback.aboutEnd),
    aboutText: translate('about.text', fallback.aboutText),
    skillsTitle: translate('skills.heading_prefix', fallback.skillsTitle),
    skillsEnd: translate('skills.heading_suffix', fallback.skillsEnd),
    projectsTitle: translate('projects.heading_prefix', fallback.projectsTitle),
    projectsEnd: translate('projects.heading_suffix', fallback.projectsEnd),
    servicesTitle: translate('services.heading_prefix', fallback.servicesTitle),
    servicesEnd: translate('services.heading_suffix', fallback.servicesEnd),
    contactTitle: translate('contact.heading_prefix', fallback.contactTitle),
    contactEnd: translate('contact.heading_suffix', fallback.contactEnd),
    contactText: translate('contact.description', fallback.contactText),
    sent: translate('contact.success', fallback.sent),
    name: translate('form.name', fallback.name),
    message: translate('placeholder.message', fallback.message),
    send: translate('form.send', fallback.send),
    reviews: `${translate('reviews.title_prefix', locale === 'en' ? 'Collaborations that make' : 'Des collaborations qui font')} ${translate('reviews.title_suffix', locale === 'en' ? 'a difference.' : 'la différence.')}`
  };

  const { settings = {}, projects = [], skills = [], services = [], videos = [], testimonials = [] } = data;
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [notice, setNotice] = useState(data.sent ? t.sent : '');
  const [sending, setSending] = useState(false);

  const techCount = new Set(
    projects.flatMap((p) => (p.technologies || '').split(',').map((v) => v.trim()).filter(Boolean))
  ).size;

  const text = (fr, en) => (locale === 'en' ? en : fr);

  const send = async (event) => {
    event.preventDefault();
    setSending(true);
    setNotice('');
    try {
      if (apiBase) {
        await api('/contact', {
          method: 'POST',
          headers: { 'x-csrf-token': csrfToken },
          body: JSON.stringify({ ...form, website: event.currentTarget.elements.website?.value || '' })
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 600));
        const newMsg = {
          id: Date.now(),
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          status: 'new',
          created_at: new Date().toISOString()
        };
        const currentMessages = JSON.parse(localStorage.getItem('portfolio-messages') || '[]');
        localStorage.setItem('portfolio-messages', JSON.stringify([newMsg, ...currentMessages]));
      }
      setNotice(t.sent);
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setNotice(error.message);
    } finally {
      setSending(false);
    }
  };

  const videoUrl = (url) => {
    if ((url || '').startsWith('assets/videos/')) return { local: asset(url) };
    try {
      const parsed = new URL(url);
      if (parsed.hostname === 'youtu.be') return { embed: `https://www.youtube.com/embed/${encodeURIComponent(parsed.pathname.slice(1))}` };
      if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(parsed.hostname)) {
        return { embed: `https://www.youtube.com/embed/${encodeURIComponent(parsed.searchParams.get('v') || parsed.pathname.split('/').pop())}` };
      }
      if (['vimeo.com', 'www.vimeo.com'].includes(parsed.hostname) && /^\d+$/.test(parsed.pathname.slice(1))) {
        return { embed: `https://player.vimeo.com/video/${parsed.pathname.slice(1)}` };
      }
    } catch {
      return null;
    }
    return null;
  };

  return (
    <>
      <Header settings={settings} locale={locale} setLocale={setLocale} translations={data.translations} />
      <a className="skip-link" href="#main-content">
        {text('Aller au contenu', 'Skip to content')}
      </a>

      <main id="main-content">
        {/* HERO SECTION */}
        <section className="wrap hero">
          <div className="hero-copy">
            <div className="eyebrow">{t.available}</div>
            <h1>{locale === 'en' ? settings.tagline_en || settings.tagline : settings.tagline}</h1>
            <p>{locale === 'en' ? settings.about_text_en || settings.about_text : settings.about_text}</p>
            <div className="actions flex flex-wrap items-center gap-3.5 pt-2">
              <a className="btn-pro-primary group" href="#projets">
                <span>{t.viewProjects}</span>
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
              <a className="btn-pro-ghost group" href="#contact">
                <span>{t.talk}</span>
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a className="btn-pro-cv group" href={apiUrl('/cv')}>
                <span>{text('Télécharger le CV', 'Download CV')}</span>
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </a>
            </div>
            <div className="meta">
              <span>CODE</span><i>•</i><span>DESIGN</span><i>•</i><span>{text('INNOVE', 'INNOVATE')}</span>
            </div>
          </div>

          <div className="visual">
            <div className="code">
              $ <span className="orange">solution</span> = {'{'}<br />
              &nbsp;&nbsp;architecture: <span className="orange">"scalable"</span>,<br />
              &nbsp;&nbsp;performance: <span className="orange">"ultra-fast"</span>,<br />
              &nbsp;&nbsp;security: <span className="orange">"rock-solid"</span><br />
              {'}'};
            </div>
            <div className="portrait-frame">
              <picture>
                <source srcSet={asset('assets/portrait.webp')} type="image/webp" />
                <img
                  className="portrait"
                  src={asset(settings.photo || 'assets/portrait.jpg')}
                  alt={text('Portrait professionnel', 'Professional portrait')}
                  width="390"
                  height="488"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
            <div className="badge">
              <b>&lt;/&gt;</b><br />
              Full Stack & Mobile
            </div>
          </div>
        </section>

        {/* EXPERTISE TICKER */}
        <div className="expertise-ticker">
          <div className="expertise-track">
            <span>REACT</span><i>✦</i>
            <span>TAILWIND CSS</span><i>✦</i>
            <span>NODE.JS & EXPRESS</span><i>✦</i>
            <span>SUPABASE & POSTGRESQL</span><i>✦</i>
            <span>PHP & MYSQL</span><i>✦</i>
            <span>REST API & WEBSOCKET</span><i>✦</i>
            <span>PWA & MOBILE</span><i>✦</i>
          </div>
        </div>

        {/* 01 ABOUT */}
        <section id="apropos" className="wrap section split">
          <div>
            <span className="kicker">01 — {t.about.toUpperCase()}</span>
            <h2>{t.aboutTitle} <span className="gradient">{t.aboutEnd}</span></h2>
          </div>
          <div className="about">
            <p>{locale === 'en' ? settings.about_text_en || settings.about_text : settings.about_text}</p>
            <p>{t.aboutText}</p>
            <div className="signature">YY —</div>
          </div>
        </section>

        {/* 02 METHOD */}
        <section className="wrap section method">
          <div className="method-intro">
            <span className="kicker">02 — {text('MÉTHODE', 'METHOD')}</span>
            <h2>{text('De l’idée à', 'From idea to')} <span className="gradient">{text('l’impact.', 'impact.')}</span></h2>
            <p>{text('Un processus clair et méthodique pour transformer des besoins complexes en produits digitaux solides et mesurables.', 'A clear, rigorous process to turn complex needs into high-impact digital products.')}</p>
          </div>
          <div className="method-steps">
            <article>
              <span>01</span>
              <div>
                <h3>{text("Comprendre", "Understand")}</h3>
                <p>{text("Clarification approfondie des objectifs métier, des utilisateurs cibles et de la faisabilité technique.", "In-depth discovery of business goals, end-users workflows, and technical feasibility.")}</p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>{text("Concevoir", "Design")}</h3>
                <p>{text("Architecture des données, ergonomie soignée et prototypage d'une expérience intuitive.", "Robust data architecture, clean API design, and intuitive user experience prototyping.")}</p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>{text("Construire", "Build")}</h3>
                <p>{text("Développement modulaire, optimisé pour la vitesse, la scalabilité et la haute disponibilité.", "Modular, high-performance development engineered for speed, security, and scalability.")}</p>
              </div>
            </article>
            <article>
              <span>04</span>
              <div>
                <h3>{text("Améliorer", "Scale")}</h3>
                <p>{text("Monitoring, métriques d’usage, optimisations continues et support technique réactif.", "Continuous monitoring, performance tuning, and proactive post-launch maintenance.")}</p>
              </div>
            </article>
          </div>
        </section>

        {/* PROOF STRIP */}
        <section className="proof-strip">
          <div className="wrap proof-grid">
            <article>
              <strong>{projects.length}</strong>
              <span>{text('Projets présentés', 'Presented projects')}</span>
            </article>
            <article>
              <strong>{skills.length}</strong>
              <span>{text('Expertises clés', 'Core skills')}</span>
            </article>
            <article>
              <strong>{techCount}</strong>
              <span>{text('Technologies maîtrisées', 'Technologies used')}</span>
            </article>
            <article>
              <strong>FR / EN</strong>
              <span>{text('Bilingue', 'Available languages')}</span>
            </article>
          </div>
        </section>

        {/* 03 WHY ME / PRINCIPLES */}
        <section className="wrap section principles">
          <div className="principles-heading">
            <span className="kicker">03 — {text("POURQUOI MOI", "WHY WORK TOGETHER")}</span>
            <h2>{text("Un partenaire qui pense au-delà", "A partner who thinks beyond")} <span className="gradient">{text("du code.", "the code.")}</span></h2>
          </div>
          <div className="principles-grid">
            <article>
              <span className="principle-icon" aria-hidden="true">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3" />
                </svg>
              </span>
              <h3>{text("Vision métier & ROI", "Business-first")}</h3>
              <p>{text("Chaque fonctionnalité est pensée pour résoudre un problème concret et générer un gain de temps ou financier réel.", "Every feature solves a genuine business problem and produces real operational efficiency.")}</p>
            </article>
            <article>
              <span className="principle-icon" aria-hidden="true">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
              <h3>{text("Conçu pour durer", "Built to last")}</h3>
              <p>{text("Bases de données indexées, code maintenable, interfaces fluides et architecture évolutive sans dette technique.", "Well-indexed databases, clean maintainable code, and scalable architecture free of technical debt.")}</p>
            </article>
            <article>
              <span className="principle-icon" aria-hidden="true">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.999-3.199a5.96 5.96 0 01-.037-.666l.001-.031m0 0a5.99 5.99 0 012.04-4.542M12 9.75a3 3 0 100-6 3 3 0 000 6zm-5.25 0a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm10.5 0a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
                </svg>
              </span>
              <h3>{text("Accompagnement continu", "Long-term Partner")}</h3>
              <p>{text("Formation des équipes, documentation technique claire et suivi rigoureux après le déploiement.", "Hands-on team training, comprehensive documentation, and responsive ongoing support beyond launch.")}</p>
            </article>
          </div>
        </section>

        {/* 04 SKILLS */}
        <section id="competences" className="wrap section">
          <div className="section-heading">
            <span className="kicker">04 — {t.skills.toUpperCase()}</span>
            <h2>{t.skillsTitle} <span className="gradient">{t.skillsEnd}</span></h2>
          </div>
          <div className="grid">
            {skills.map((skill, index) => (
              <article className="card" key={skill.id}>
                <span className="num">{String(index + 1).padStart(2, '0')}</span>
                <h3>{locale === 'en' ? skill.name_en || skill.name : skill.name}</h3>
                <p>{locale === 'en' ? skill.category_en || skill.category : skill.category}</p>
                <div className="skill-bar">
                  <span style={{ width: `${Math.min(100, Number(skill.level) || 0)}%` }} />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 05 PROJECTS / CASE STUDIES */}
        <section id="projets" className="wrap section">
          <div className="section-heading">
            <span className="kicker">05 — {t.projects.toUpperCase()}</span>
            <h2>{t.projectsTitle} <span className="gradient">{t.projectsEnd}</span></h2>
          </div>
          <div className="project-filters">
            {['all', ...new Set((projects || []).map((item) => item?.category).filter(Boolean))].map((value) => (
              <button
                key={value}
                className={`btn-pro-filter ${filter === value ? 'is-active' : ''}`}
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
              >
                {value === 'all' ? text('Tous', 'All') : value}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {(projects || [])
              .filter((item) => filter === 'all' || item?.category === filter)
              .map((project) => (
                <ProjectCard key={project?.id || Math.random()} project={project} locale={locale} />
              ))}
          </div>
        </section>

        {/* 06 MEDIA / VIDEOS */}
        <section id="contenus" className="wrap section">
          <div className="section-heading">
            <span className="kicker">06 — {text('MÉDIAS', 'MEDIA')}</span>
            <h2>{text('Démonstrations &', 'Walkthroughs &')} <span className="gradient">{text('vidéos.', 'videos.')}</span></h2>
          </div>
          <div className="video-grid">
            {videos.map((video) => {
              const source = videoUrl(video.video_url);
              return (
                <article className="media-video" key={video.id}>
                  <div className="media-video-frame">
                    {source?.local ? (
                      <video
                        controls
                        preload="metadata"
                        poster={asset(video.poster_path)}
                        src={source.local}
                        onPlay={() => api(`/videos/${video.id}/view`, { method: 'POST' }).catch(() => {})}
                        onPointerDown={() => api(`/videos/${video.id}/click`, { method: 'POST' }).catch(() => {})}
                      />
                    ) : source?.embed ? (
                      <iframe
                        title={video.title}
                        src={source.embed}
                        loading="lazy"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="empty-state">{text('Format vidéo indisponible.', 'Video format unavailable.')}</div>
                    )}
                  </div>
                  <h3>{locale === 'en' ? video.title_en || video.title : video.title}</h3>
                  <p>{locale === 'en' ? video.description_en || video.description : video.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* 07 SERVICES */}
        <section id="services" className="wrap section">
          <div className="section-heading">
            <span className="kicker">07 — {t.services.toUpperCase()}</span>
            <h2>{t.servicesTitle} <span className="gradient">{t.servicesEnd}</span></h2>
          </div>
          <div className="grid">
            {services.map((service, index) => (
              <article className="card service-card" key={service.id}>
                <span className="num">0{index + 1}</span>
                <h3>{locale === 'en' ? service.title_en || service.title : service.title}</h3>
                <p>{locale === 'en' ? service.description_en || service.description : service.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 08 TESTIMONIALS */}
        <section className="wrap section testimonials">
          <div className="section-heading">
            <span className="kicker">08 — {text('RETOURS CLIENTS', 'CLIENT REVIEWS')}</span>
            <h2>{t.reviews}</h2>
          </div>
          <div className="grid">
            {testimonials.map((item) => (
              <article className="card" key={item.id}>
                <span className="principle-icon" aria-hidden="true">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </span>
                <p>{locale === 'en' ? item.quote_en || item.quote : item.quote}</p>
                <h3>{locale === 'en' ? item.client_name_en || item.client_name : item.client_name}</h3>
                <small>{locale === 'en' ? item.company_en || item.company : item.company}</small>
              </article>
            ))}
          </div>
        </section>

        {/* 09 CONTACT */}
        <section id="contact" className="wrap section contact-section">
          <div>
            <span className="kicker">09 — {t.contact.toUpperCase()}</span>
            <h2>{t.contactTitle} <span className="gradient">{t.contactEnd}</span></h2>
            <p>{t.contactText}</p>
            <div className="contact-links flex flex-col gap-2.5">
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="inline-flex items-center gap-2.5 text-slate-300 hover:text-sky-400 transition-colors font-medium text-sm">
                  <svg className="w-4 h-4 text-sky-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span>{settings.email}</span>
                </a>
              )}
              {settings.phone && (
                <a href={`tel:${settings.phone}`} className="inline-flex items-center gap-2.5 text-slate-300 hover:text-sky-400 transition-colors font-medium text-sm">
                  <svg className="w-4 h-4 text-sky-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span>{settings.phone}</span>
                </a>
              )}
              {settings.location && (
                <span className="inline-flex items-center gap-2.5 text-slate-400 font-medium text-sm mt-1">
                  <svg className="w-4 h-4 text-sky-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{settings.location}</span>
                </span>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-3">
                {text('Réseaux sociaux & Profils', 'Social media & Profiles')} :
              </span>
              <SocialGroup settings={settings} />
            </div>
          </div>

          <form className="form" onSubmit={send}>
            <label>
              {t.name}
              <input
                required
                minLength="2"
                maxLength="120"
                value={form.name}
                autoComplete="name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label>
              {translate('form.email', 'Email')}
              <input
                type="email"
                required
                maxLength="190"
                value={form.email}
                autoComplete="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label>
              {translate('form.project', text('Projet / Besoin technique', 'Project / Technical requirements'))}
              <textarea
                name="message"
                required
                minLength="5"
                maxLength="5000"
                placeholder={t.message}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </label>
            <input className="honeypot" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" />
            <div className="message-counter">{form.message.length} / 5000</div>
            {notice && <p role="status" className="form-notice">{notice}</p>}
            <button className="btn-pro-primary w-full sm:w-auto group" type="submit" disabled={sending}>
              <span>{sending ? text('Envoi en cours…', 'Sending…') : t.send}</span>
              {sending ? (
                <svg className="w-4 h-4 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              )}
            </button>
          </form>
        </section>
      </main>

      {/* WHATSAPP FLOAT - CIRCULAR FAB */}
      {(settings.whatsapp || settings.phone) && (
        <a
          className="btn-pro-whatsapp group"
          href={`https://wa.me/${(settings.whatsapp || settings.phone).replace(/\D/g, '')}?text=${encodeURIComponent(
            text('Bonjour Yves, je souhaite échanger avec vous au sujet d’un projet digital.', 'Hello Yves, I would like to discuss a software project with you.')
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={text('Discuter sur WhatsApp', 'Chat on WhatsApp')}
          title={text('Discuter sur WhatsApp', 'Chat on WhatsApp')}
        >
          {/* Status online ping badge */}
          <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-80"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-slate-950"></span>
          </span>
          {/* Official WhatsApp Icon */}
          <svg className="w-7 h-7 fill-white transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.04 2C6.54 2 2.06 6.48 2.06 12c0 1.85.5 3.65 1.45 5.23L2 22l4.9-1.47A9.91 9.91 0 0 0 12.04 22c5.5 0 9.98-4.48 9.98-10s-4.48-10-9.98-10zm5.82 14.15c-.24.68-1.2 1.25-1.89 1.33-.51.05-1.17.08-3.48-.88-2.94-1.28-4.81-4.27-4.96-4.47-.14-.2-1.2-1.6-1.2-3.05 0-1.45.75-2.16 1.02-2.45.27-.3.59-.37.79-.37.2 0 .39 0 .56.01.18.01.41-.07.65.5.24.58.83 2.02.9 2.16.07.14.12.32.03.5-.1.19-.15.31-.3.47-.15.16-.31.37-.44.5-.15.14-.3.3-.13.6.17.31.79 1.3 1.7 2.11 1.16 1.03 2.14 1.35 2.45 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.2-.31.41-.26.68-.16.28.1 1.76.83 2.06.98.31.15.51.23.59.36.08.13.08.74-.16 1.42z"/>
          </svg>
          {/* Tooltip on hover */}
          <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 whitespace-nowrap bg-slate-900/95 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 shadow-xl backdrop-blur-sm">
            {text('Discuter sur WhatsApp', 'Chat on WhatsApp')}
          </span>
        </a>
      )}

      {/* FOOTER TICKER */}
      <div className="footer-ticker">
        <div className="footer-ticker-track">
          <span>CODE · ARCHITECTURE · DESIGN · {text('INNOVE', 'INNOVATE')}</span>
          <i>✦</i>
          <span>{locale === 'en' ? settings.role_en || settings.role : settings.role}</span>
        </div>
      </div>

      <Footer settings={settings} locale={locale} />
    </>
  );
}
