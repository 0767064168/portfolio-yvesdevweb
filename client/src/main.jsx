import React, { useEffect, useState, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import './site.css';
import './admin.css';
import defaultData from './defaultData.json';
import { api, apiBase } from './utils/api.js';
import { Portfolio } from './components/Portfolio.jsx';
import { ProjectDetail } from './components/ProjectDetail.jsx';

// Lazy-load all Admin code so normal visitors download zero admin JS overhead
const LazyAdminLogin = lazy(() =>
  import('./components/admin/AdminComponents.jsx').then((m) => ({ default: m.AdminLogin }))
);
const LazyAdminSetup = lazy(() =>
  import('./components/admin/AdminComponents.jsx').then((m) => ({ default: m.AdminSetup }))
);
const LazyAdminPanel = lazy(() =>
  import('./components/admin/AdminComponents.jsx').then((m) => ({ default: m.AdminPanel }))
);
const LazyAdminMessages = lazy(() =>
  import('./components/admin/AdminComponents.jsx').then((m) => ({ default: m.AdminMessages }))
);
const LazyAdminBackup = lazy(() =>
  import('./components/admin/AdminComponents.jsx').then((m) => ({ default: m.AdminBackup }))
);

function useLocale() {
  const [locale, setLocale] = useState(() => {
    const requested = new URLSearchParams(location.search).get('lang');
    const saved = localStorage.getItem('portfolio-locale');
    return ['fr', 'en'].includes(requested) ? requested : ['fr', 'en'].includes(saved) ? saved : 'fr';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  return [locale, setLocale];
}

function App() {
  const [locale, setLocale] = useLocale();
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-custom-data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.settings && Array.isArray(parsed.projects)) {
          return parsed;
        }
      }
    } catch (e) {}
    return defaultData;
  });

  const handleUpdateData = (newData) => {
    setData(newData);
    try {
      localStorage.setItem('portfolio-custom-data', JSON.stringify(newData));
    } catch (e) {}
  };

  const [admin, setAdmin] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');
  const [setupAvailable, setSetupAvailable] = useState(false);
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    // Attempt live data fetch from API if a backend is configured
    if (apiBase) {
      api('/public')
        .then((publicData) => {
          if (publicData && publicData.settings && Array.isArray(publicData.projects) && publicData.projects.length > 0) {
            setData(publicData);
          }
        })
        .catch(() => {});
    }

    if (isAdmin) {
      const savedAdmin = localStorage.getItem('portfolio-admin-session');
      if (savedAdmin) {
        try {
          const parsed = JSON.parse(savedAdmin);
          if (parsed && parsed.email) {
            setAdmin(parsed);
          }
        } catch {}
      }
      if (apiBase) {
        Promise.allSettled([api('/admin/setup'), api('/admin/session')]).then(([setupRes, sessionRes]) => {
          if (setupRes.status === 'fulfilled' && setupRes.value) {
            setCsrfToken(setupRes.value.csrfToken || '');
            setSetupAvailable(Boolean(setupRes.value.available));
          }
          if (sessionRes.status === 'fulfilled' && sessionRes.value) {
            setAdmin(sessionRes.value.admin || null);
          }
        });
      }
    }
  }, [isAdmin]);

  // Visit analytics tracking (active only when a live backend is configured)
  useEffect(() => {
    if (isAdmin || !apiBase) return;
    api('/visits', { method: 'POST', body: JSON.stringify({ path: location.pathname }) }).catch(() => {});
  }, [isAdmin]);

  // Dynamic SEO metadata updates
  useEffect(() => {
    if (isAdmin) {
      document.title = 'Administration — Yves Yao';
      return;
    }
    const settings = data?.settings || {};
    const role = locale === 'en' ? settings.role_en || settings.role || 'Web & Mobile Developer' : settings.role || 'Développeur Web & Mobile';
    document.title = `${settings.full_name || 'Yves Yao'} — ${role}`;

    const description = locale === 'en' ? settings.about_text_en || settings.about_text : settings.about_text;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.append(meta);
    }
    meta.content = description || '';

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.append(canonical);
    }
    canonical.href = location.href.split('#')[0];
  }, [isAdmin, data, locale]);

  // Route: Project Detail Case Study
  if (location.pathname.startsWith('/projects/')) {
    return <ProjectDetail data={data} locale={locale} setLocale={setLocale} />;
  }

  // Route: Admin Area (Lazy loaded)
  if (isAdmin) {
    const route = location.pathname.replace(/^\/admin\/?/, '') || 'overview';
    return (
      <Suspense fallback={<div className="wrap section text-center py-20 text-slate-400">Chargement de l’espace admin…</div>}>
        {admin ? (
          <LazyAdminPanel
            admin={admin}
            csrfToken={csrfToken}
            onLogout={() => {
              setAdmin(null);
              localStorage.removeItem('portfolio-admin-session');
            }}
            initialSection={route}
            data={data}
            onUpdateData={handleUpdateData}
          />
        ) : location.pathname.endsWith('/setup') && setupAvailable ? (
          <LazyAdminSetup csrfToken={csrfToken} />
        ) : (
          <LazyAdminLogin
            csrfToken={csrfToken}
            onLogin={(result) => {
              setAdmin(result.admin);
              setCsrfToken(result.csrfToken);
              location.href = '/admin';
            }}
          />
        )}
      </Suspense>
    );
  }

  // Route: Main Portfolio
  return <Portfolio data={data} locale={locale} setLocale={setLocale} csrfToken={csrfToken} />;
}

const reactRoot = createRoot(document.getElementById('root'));
if (import.meta.hot) import.meta.hot.dispose(() => reactRoot.unmount());
reactRoot.render(<App />);
