import React, { useState, useEffect } from 'react';
import { asset } from '../utils/api.js';
import { english, french } from '../locales/messages.js';
import { SocialIcon } from './SocialLinks.jsx';

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

          {/* Social Icons : LinkedIn, GitHub, Facebook, Instagram, TikTok */}
          <div className="flex items-center gap-1.5 px-1 py-1">
            <SocialIcon name="linkedin" href={settings.linkedin || 'https://linkedin.com/in/yves-yao'} />
            <SocialIcon name="github" href={settings.github || 'https://github.com/0767064168'} />
            <SocialIcon name="facebook" href={settings.facebook || 'https://facebook.com/yvesyao'} />
            <SocialIcon name="instagram" href={settings.instagram || 'https://instagram.com/yvesyao'} />
            <SocialIcon name="tiktok" href={settings.tiktok || 'https://tiktok.com/@yvesyao'} />
          </div>

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
