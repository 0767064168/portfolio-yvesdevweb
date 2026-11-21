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
              loading="eager"
              decoding="async"
            />
          </picture>
        </a>

        <button
          className={`menu btn-pro-icon ${menuOpen ? 'is-open' : ''}`}
          aria-label={locale === 'en' ? 'Open navigation menu' : 'Ouvrir le menu de navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg className="w-5 h-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
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

          {/* Social Icons : LinkedIn, Facebook, Instagram, TikTok */}
          <div className="flex items-center gap-1.5 px-1 py-1">
            <SocialIcon name="linkedin" href={settings.linkedin || 'https://linkedin.com/in/yves-yao'} />
            {settings.github && <SocialIcon name="github" href={settings.github} />}
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
            {theme === 'light' ? (
              <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            )}
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
