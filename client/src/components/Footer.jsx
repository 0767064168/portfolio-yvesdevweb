import React from 'react';
import { asset } from '../utils/api.js';
import { SocialGroup } from './SocialLinks.jsx';

export function Footer({ settings = {}, locale }) {
  const role = locale === 'en' ? settings.role_en || settings.role : settings.role;

  return (
    <footer>
      <div className="wrap footer flex flex-col md:flex-row items-center justify-between gap-6 py-8">
        <div className="flex items-center gap-4">
          <picture>
            <source srcSet={asset('assets/logo-yy.webp')} type="image/webp" />
            <img
              className="footer-logo"
              src={asset(settings.logo || 'assets/logo-yy.png')}
              alt={settings.full_name || 'Yves Yao'}
              width="115"
              height="58"
            />
          </picture>
          <div>
            <p className="font-semibold text-slate-200">
              © {new Date().getFullYear()} {settings.full_name || 'Yves Yao'}
            </p>
            <p className="text-xs text-slate-400">{role}</p>
          </div>
        </div>

        {/* Tous les réseaux sociaux : LinkedIn, GitHub, Facebook, Instagram, TikTok */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold hidden sm:inline">
            Réseaux :
          </span>
          <SocialGroup settings={settings} />
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="hover:text-sky-400 transition-colors">
              {settings.email}
            </a>
          )}
          <a
            href="/admin"
            className="text-slate-500 hover:text-slate-300 transition-colors border-l border-white/10 pl-4"
          >
            Administration
          </a>
        </div>
      </div>
    </footer>
  );
}
