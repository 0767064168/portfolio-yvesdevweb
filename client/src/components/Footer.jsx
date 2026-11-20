import React from 'react';
import { asset } from '../utils/api.js';

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

        {/* Social / Contact quick links */}
        <div className="flex items-center gap-4 text-sm text-slate-400">
          {settings.github && (
            <a
              href={settings.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
            >
              <span>GitHub</span>
              <span className="text-xs">↗</span>
            </a>
          )}
          {settings.linkedin && (
            <a
              href={settings.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
            >
              <span>LinkedIn</span>
              <span className="text-xs">↗</span>
            </a>
          )}
          {settings.email && (
            <a
              href={`mailto:${settings.email}`}
              className="hover:text-sky-400 transition-colors"
            >
              {settings.email}
            </a>
          )}
        </div>

        <a
          href="/admin"
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          Administration
        </a>
      </div>
    </footer>
  );
}
