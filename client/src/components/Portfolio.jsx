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
            <div className="actions">
              <a className="btn-pro-primary group" href="#projets">
                <span>{t.viewProjects}</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
              <a className="btn-pro-ghost" href="#contact">
                {t.talk}
              </a>
              <a className="btn-pro-cv group" href={apiUrl('/cv')}>
                <span>{text('Télécharger le CV', 'Download CV')}</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
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
              <span className="principle-icon">🎯</span>
              <h3>{text("Vision métier & ROI", "Business-first")}</h3>
              <p>{text("Chaque fonctionnalité est pensée pour résoudre un problème concret et générer un gain de temps ou financier réel.", "Every feature solves a genuine business problem and produces real operational efficiency.")}</p>
            </article>
            <article>
              <span className="principle-icon">⚙️</span>
              <h3>{text("Conçu pour durer", "Built to last")}</h3>
              <p>{text("Bases de données indexées, code maintenable, interfaces fluides et architecture évolutive sans dette technique.", "Well-indexed databases, clean maintainable code, and scalable architecture free of technical debt.")}</p>
            </article>
            <article>
              <span className="principle-icon">🤝</span>
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
                <span className="principle-icon">“</span>
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
            <div className="contact-links">
              {settings.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}
              {settings.phone && <a href={`tel:${settings.phone}`}>{settings.phone}</a>}
              {settings.location && <span className="text-slate-400 block mt-2 text-sm">📍 {settings.location}</span>}
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
            <button className="btn-pro-primary w-full sm:w-auto" type="submit" disabled={sending}>
              <span>{sending ? text('Envoi en cours…', 'Sending…') : t.send}</span>
              {sending ? <span className="inline-block animate-spin">⟳</span> : <span className="inline-block">↗</span>}
            </button>
          </form>
        </section>
      </main>

      {/* WHATSAPP FLOAT */}
      {(settings.whatsapp || settings.phone) && (
        <a
          className="btn-pro-whatsapp group"
          href={`https://wa.me/${(settings.whatsapp || settings.phone).replace(/\D/g, '')}?text=${encodeURIComponent(
            text('Bonjour Yves, je souhaite échanger avec vous au sujet d’un projet digital.', 'Hello Yves, I would like to discuss a software project with you.')
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <span className="whatsapp-icon group-hover:scale-110 transition-transform">✆</span>
          <span className="whatsapp-label">{text('Écrire sur WhatsApp', 'Chat on WhatsApp')}</span>
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
