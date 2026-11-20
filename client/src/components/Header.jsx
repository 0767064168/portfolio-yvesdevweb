import React, { useState, useEffect } from 'react';
import { asset } from '../utils/api.js';
import { english, french } from '../locales/messages.js';

export function Header({ settings = {}, locale, setLocale, translations = {} }) {
  const fallback = locale === 'en' ? english : french;
  const t = {
    ...fallback,
    about: translations[`${locale}.nav.about`] || fallback.about,
    skills: translations[`${locale}.nav.skills`] || fallback.skills,
    projects: translations[`${locale}.nav.projects`] || fallback.projects,
    services: translations[`${locale}.nav.services`] || fallback.services,
    contact: translations[`${locale}.nav.contact`] || fallback.contact
  };
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme === 'light' ? 'light' : '';
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const navLinks = [
    ['/#apropos', t.about],
    ['/#competences', t.skills],
    ['/#projets', t.projects],
    ['/#contenus', locale === 'en' ? 'Media' : 'Médias'],
    ['/#services', t.services],
    ['/#contact', t.contact]
  ];

  return (
    <header className="header">
      <div className="wrap nav">
        <a className="brand" href="/" aria-label="Accueil">
          <picture>
            <source srcSet={asset('assets/logo-yy.webp')} type="image/webp" />
            <img
              className="brand-logo"
              src={asset(settings.logo || 'assets/logo-yy.png')}
              alt={settings.full_name || 'Yves Yao'}
              width="144"
              height="58"
            />
          </picture>
        </a>

        <button
          className={`menu btn-pro-icon ${menuOpen ? 'is-open' : ''}`}
          aria-label={locale === 'en' ? 'Open navigation menu' : 'Ouvrir le menu de navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <nav className={menuOpen ? 'is-open' : ''}>
          {navLinks.map(([href, label]) => (
            <a
              key={href}
              className={href === '/#contact' ? 'btn-pro-nav' : ''}
              href={href}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}

          {/* Direct Social Links for Quick Developer Verification */}
          {settings.github && (
            <a
              href={settings.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pro-icon"
              title="GitHub"
              aria-label="GitHub de Yves Yao"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          )}

          {settings.linkedin && (
            <a
              href={settings.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pro-icon"
              title="LinkedIn"
              aria-label="LinkedIn de Yves Yao"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          )}

          <button
            className="btn-pro-icon theme-toggle"
            type="button"
            aria-label="Changer le thème"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? '☾' : '☼'}
          </button>

          <button
            className="btn-pro-icon lang-switch"
            type="button"
            aria-label="Changer la langue"
            onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
          >
            {locale === 'fr' ? 'EN' : 'FR'}
          </button>
        </nav>
      </div>
    </header>
  );
}
