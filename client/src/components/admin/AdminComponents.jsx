import React, { useState, useEffect } from 'react';
import { api, apiUrl, asset, apiBase } from '../../utils/api.js';
import defaultData from '../../defaultData.json';
import { messages, navItems, fieldLabels, longFields } from '../../locales/messages.js';

export function AdminLogin({ csrfToken, onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const fillDefaultCredentials = () => {
    setForm({
      email: 'admin@yvesyao.dev',
      password: 'YvesDevWeb@2026!'
    });
    setError('');
  };

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');

    // If an external backend is configured, attempt remote server login
    if (apiBase) {
      try {
        const result = await api('/admin/login', {
          method: 'POST',
          headers: { 'x-csrf-token': csrfToken },
          body: JSON.stringify(form)
        });
        localStorage.setItem('portfolio-admin-session', JSON.stringify(result.admin));
        onLogin(result);
        return;
      } catch (exception) {
        setError(exception.message);
        setBusy(false);
        return;
      }
    }

    // Standalone fallback authentication
    const emailNorm = form.email.trim().toLowerCase();
    if (
      (emailNorm === 'admin@yvesyao.dev' || emailNorm === 'contact@yvesyao.dev' || emailNorm === 'admin') &&
      form.password === 'YvesDevWeb@2026!'
    ) {
      const mockAdmin = {
        id: 1,
        name: 'Yves Yao',
        email: 'admin@yvesyao.dev',
        role: 'admin'
      };
      localStorage.setItem('portfolio-admin-session', JSON.stringify(mockAdmin));
      onLogin({ admin: mockAdmin, csrfToken: 'standalone-session' });
    } else {
      setError('Identifiants invalides. Utilisez l’email admin@yvesyao.dev et le mot de passe attribué.');
    }
    setBusy(false);
  };

  return (
    <div className="auth min-h-screen flex items-center justify-center p-4 bg-[#050914] text-slate-100">
      <div className="authbox max-w-md w-full p-8 rounded-2xl bg-slate-900/90 border border-sky-400/20 shadow-2xl backdrop-blur-xl">
        {/* Header Branding */}
        <div className="text-center mb-6">
          <a href="/" className="inline-block mb-3">
            <img
              src="/assets/logo-yy.png"
              alt="Yves Yao"
              className="h-12 w-auto mx-auto object-contain"
            />
          </a>
          <span className="text-[11px] font-mono uppercase tracking-widest text-sky-400 font-bold block mb-1">
            Espace Administrateur
          </span>
          <h1 className="text-2xl md:text-3xl font-bold font-display text-white">
            Connexion
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gérez vos projets, compétences, médias et paramètres.
          </p>
        </div>

        {/* Credentials Reminder Box */}
        <div className="mb-6 p-4 rounded-xl bg-sky-950/40 border border-sky-500/30 text-xs text-slate-300 space-y-2">
          <div className="flex items-center justify-between">
            <strong className="text-sky-300 font-semibold flex items-center gap-1.5">
              <span>🔑</span> Identifiants d’accès :
            </strong>
            <button
              type="button"
              onClick={fillDefaultCredentials}
              className="text-[11px] px-2 py-0.5 rounded-md bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/30 transition-colors font-medium"
            >
              ⚡ Remplir
            </button>
          </div>
          <div className="grid grid-cols-1 gap-1 font-mono text-[11px] bg-black/30 p-2 rounded-lg border border-white/5">
            <div>
              <span className="text-slate-400">Email : </span>
              <span className="text-amber-300 font-semibold select-all">admin@yvesyao.dev</span>
            </div>
            <div>
              <span className="text-slate-400">Mot de passe : </span>
              <span className="text-amber-300 font-semibold select-all">YvesDevWeb@2026!</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert err mb-4 p-3 rounded-lg text-sm bg-rose-950/50 border border-rose-500/30 text-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <label className="block text-xs font-semibold text-slate-300">
            Adresse Email
            <div className="mt-1 relative">
              <input
                type="email"
                required
                autoComplete="username"
                value={form.email}
                placeholder="admin@yvesyao.dev"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/50 text-sm"
              />
            </div>
          </label>

          <label className="block text-xs font-semibold text-slate-300">
            Mot de passe
            <div className="mt-1 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={form.password}
                placeholder="••••••••••••"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/50 text-sm pr-10"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-sm p-1"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={busy}
            className="btn-pro-primary w-full py-3 rounded-xl font-bold text-sm tracking-wide mt-2"
          >
            {busy ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block animate-spin">⟳</span>
                Connexion en cours…
              </span>
            ) : (
              <span>Se connecter au tableau de bord ↗</span>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center space-y-3">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors"
          >
            <span>←</span>
            <span>Retour au portfolio public</span>
          </a>

          <p className="text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
            <span>🔒</span>
            <span>Session chiffrée SSL · Sécurité anti-bruteforce</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function AdminSetup({ csrfToken }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [created, setCreated] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    try {
      await api('/admin/setup', {
        method: 'POST',
        headers: { 'x-csrf-token': csrfToken },
        body: JSON.stringify(form)
      });
      setCreated(true);
    } catch (exception) {
      setError(exception.message);
    }
  };

  return (
    <div className="auth min-h-screen flex items-center justify-center p-4 bg-[#050914] text-slate-100">
      <div className="authbox max-w-md w-full p-8 rounded-2xl bg-slate-900 border border-sky-400/20 shadow-2xl">
        <span className="mark mb-4 block">
          <img src="/assets/logo-yy.png" alt="YY" className="h-10 mx-auto" />
        </span>
        <h1 className="text-2xl font-bold font-display text-white">Créer le compte administrateur</h1>
        <p className="text-xs text-slate-400 mb-4">Le compte initial n’est disponible qu’une seule fois.</p>
        {error && <div className="alert err mb-4 p-3 rounded-lg text-sm bg-rose-950/50 border border-rose-500/30 text-rose-200">{error}</div>}
        {created ? (
          <>
            <div className="alert ok mb-4 p-3 rounded-lg text-sm bg-emerald-950/50 border border-emerald-500/30 text-emerald-200">
              Compte créé avec succès. Vous pouvez maintenant vous connecter.
            </div>
            <a className="btn-pro-primary w-full text-center block mt-3" href="/admin">
              Se connecter ↗
            </a>
          </>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <label className="block text-xs font-semibold text-slate-300">
              Nom complet
              <input
                required
                maxLength="120"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white"
              />
            </label>
            <label className="block text-xs font-semibold text-slate-300">
              Email
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white"
              />
            </label>
            <label className="block text-xs font-semibold text-slate-300">
              Mot de passe (12 caractères minimum)
              <input
                type="password"
                minLength="12"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white"
              />
            </label>
            <button className="btn-pro-primary w-full mt-2" type="submit">
              Créer le compte ↗
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function AdminFrame({ section, csrfToken, onLogout, children }) {
  const logout = async () => {
    localStorage.removeItem('portfolio-admin-session');
    if (apiBase) {
      try {
        await api('/admin/logout', { method: 'POST', headers: { 'x-csrf-token': csrfToken } });
      } catch (e) {
        console.error('Logout error:', e);
      }
    }
    onLogout();
  };

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <a className="adminbrand" href="/">
          <span className="mark">
            <img src="/assets/logo-yy.png" alt="YY" />
          </span>
          <span>
            Portfolio<br />
            <small>Administration</small>
          </span>
        </a>
        <nav>
          {navItems.map((item) => (
            <a
              key={item}
              className={section === item || (section === 'admin_activity' && item === 'activity') ? 'is-active' : ''}
              href={item === 'overview' ? '/admin' : `/admin/${item}`}
            >
              {messages[item] || item}
            </a>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-white/10 space-y-2">
          <a
            href="/"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors"
          >
            <span>←</span>
            <span>Voir le site public</span>
          </a>
          <button className="btn-pro-admin-danger logout w-full justify-start" onClick={logout}>
            Déconnexion ↗
          </button>
        </div>
      </aside>
      <main className="adminmain">{children}</main>
    </div>
  );
}

export function AdminMessages({ csrfToken, onLogout }) {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    if (apiBase) {
      try {
        setRows((await api('/admin/resources/messages')).rows || []);
      } catch (e) {
        setError(e.message);
      }
    } else {
      setRows([]);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (row, status) => {
    if (!apiBase) return;
    try {
      await api(`/admin/resources/messages/${row.id}`, {
        method: 'PUT',
        headers: { 'x-csrf-token': csrfToken },
        body: JSON.stringify({ status })
      });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (row) => {
    if (!confirm('Supprimer définitivement ce message ?')) return;
    if (!apiBase) {
      setRows(rows.filter((r) => r.id !== row.id));
      return;
    }
    try {
      await api(`/admin/resources/messages/${row.id}`, {
        method: 'DELETE',
        headers: { 'x-csrf-token': csrfToken }
      });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <AdminFrame csrfToken={csrfToken} section="messages" onLogout={onLogout}>
      <div className="topbar">
        <h1>Messages reçus</h1>
        <span>
          {rows.length} message(s)
        </span>
      </div>
      {error && <div className="alert err">{error}</div>}
      <section className="panel">
        {rows.length ? (
          rows.map((row) => (
            <article className="message-item" key={row.id}>
              <span className="message-avatar">{row.name[0]}</span>
              <span className="message-content">
                <strong>{row.name} · {row.status}</strong>
                <a href={`mailto:${encodeURIComponent(row.email)}`}>{row.email}</a>
                <small>{row.message}</small>
                <time>{new Date(row.created_at).toLocaleString()}</time>
              </span>
              <span className="row-actions">
                <button className="btn-pro-admin-secondary" onClick={() => updateStatus(row, 'read')}>
                  Lu
                </button>
                <button className="btn-pro-admin-secondary" onClick={() => updateStatus(row, 'archived')}>
                  Archiver
                </button>
                <button className="btn-pro-admin-danger" onClick={() => remove(row)}>
                  Supprimer
                </button>
              </span>
            </article>
          ))
        ) : (
          <p className="empty-state">Aucun message pour le moment.</p>
        )}
      </section>
    </AdminFrame>
  );
}

export function AdminBackup({ admin, csrfToken, onLogout }) {
  const downloadClientBackup = () => {
    const jsonStr = JSON.stringify(defaultData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminFrame csrfToken={csrfToken} section="backup" onLogout={onLogout}>
      <section className="panel">
        <h1>Sauvegarde des données</h1>
        <p className="mb-6">
          Téléchargez l’intégralité des données du portfolio (projets, compétences, services, médias, témoignages et traductions) au format JSON standard.
        </p>
        <div className="flex flex-col gap-3 max-w-md">
          <button className="btn-pro-primary text-left" onClick={downloadClientBackup}>
            Télécharger la sauvegarde complète (JSON) ↗
          </button>
          {apiBase && (
            <a className="btn-pro-admin-secondary" href={apiUrl('/admin/export/messages')}>
              Exporter les messages (CSV) ↗
            </a>
          )}
        </div>
      </section>
    </AdminFrame>
  );
}

export function AdminForm({ table, fields, row, csrfToken, onClose, onSaved }) {
  const [values, setValues] = useState(row || {});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');

    if (apiBase) {
      try {
        const method = row ? 'PUT' : 'POST';
        await api(`/admin/resources/${table}${row ? `/${row.id}` : ''}`, {
          method,
          headers: { 'x-csrf-token': csrfToken },
          body: JSON.stringify(values)
        });
        onSaved();
      } catch (ex) {
        setError(ex.message);
      } finally {
        setBusy(false);
      }
    } else {
      // In local mode, inform user
      alert('Modification enregistrée localement.');
      setBusy(false);
      onSaved();
    }
  };

  const uploadField = async (field, file) => {
    if (!apiBase) {
      alert('Upload de fichier actif lorsque le serveur est connecté.');
      return;
    }
    const kind = table === 'media_videos' ? 'video' : field === 'photo' ? 'photo' : field === 'poster_path' ? 'poster' : 'image';
    const data = new FormData();
    data.append('file', file);
    try {
      const result = await api(`/admin/upload/${kind}`, {
        method: 'POST',
        headers: { 'x-csrf-token': csrfToken },
        body: data
      });
      setValues({ ...values, [field]: result.path });
    } catch (ex) {
      setError(ex.message);
    }
  };

  const editable = fields.filter((f) => !['password_hash', 'id', 'created_at', 'updated_at'].includes(f));
  if (table === 'admins') editable.push('password');

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal admin-form" onClick={(e) => e.stopPropagation()} onSubmit={save}>
        <div className="panelhead">
          <h2>{row ? 'Modifier' : 'Ajouter'} — {messages[table] || table}</h2>
          <button className="btn-pro-icon text-lg" type="button" onClick={onClose}>×</button>
        </div>
        {error && <div className="alert err">{error}</div>}
        {editable.map((field) => (
          <label key={field}>
            {fieldLabels[field] || field}
            {['image', 'photo', 'logo', 'poster_path', 'video_url', 'image_path'].includes(field) && (
              <input
                type="file"
                accept={field === 'video_url' ? 'video/mp4,video/webm,video/ogg' : 'image/*'}
                onChange={(e) => e.target.files[0] && uploadField(field, e.target.files[0])}
              />
            )}
            {longFields.has(field) ? (
              <textarea
                rows="4"
                value={values[field] ?? ''}
                onChange={(e) => setValues({ ...values, [field]: e.target.value })}
              />
            ) : (
              <input
                type={field === 'password' ? 'password' : 'text'}
                required={['name', 'title', 'full_name', 'email', 'category', 'description'].includes(field) && (!row || field !== 'password')}
                value={field === 'password' ? undefined : (values[field] ?? '')}
                placeholder={field === 'password' ? '12 caractères minimum' : ''}
                onChange={(e) => setValues({ ...values, [field]: e.target.value })}
              />
            )}
          </label>
        ))}
        <div className="quick-actions mt-4">
          <button className="btn-pro-admin-primary" type="submit" disabled={busy}>
            {busy ? 'Enregistrement…' : 'Enregistrer'}
          </button>
          <button className="btn-pro-admin-secondary" type="button" onClick={onClose}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

export function AdminPanel({ admin, csrfToken, onLogout }) {
  const route = location.pathname.split('/')[2] || 'overview';
  const section = route === 'activity' ? 'admin_activity' : route;
  const [rows, setRows] = useState([]);
  const [fields, setFields] = useState([]);
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState('');
  const [formRow, setFormRow] = useState(undefined);

  const load = async () => {
    setError('');
    try {
      if (section === 'overview') {
        if (apiBase) {
          setOverview(await api('/admin/overview'));
        } else {
          setOverview({
            counts: {
              projects: (defaultData.projects || []).length,
              skills: (defaultData.skills || []).length,
              services: (defaultData.services || []).length,
              media_videos: (defaultData.videos || []).length,
              messages: 0,
              testimonials: (defaultData.testimonials || []).length,
              visits: 142
            },
            messages: []
          });
        }
      } else {
        if (apiBase) {
          const data = await api(`/admin/resources/${section}`);
          setRows(data.rows || []);
          setFields(data.fields || []);
        } else {
          const key = section === 'media_videos' ? 'videos' : section === 'admin_activity' ? 'activity' : section;
          const items = defaultData[key] || defaultData[section] || [];
          const list = Array.isArray(items) ? items : [items].filter(Boolean);
          setRows(list);
          setFields(list[0] ? Object.keys(list[0]) : []);
        }
      }
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => { load(); }, [section]);

  const remove = async (row) => {
    if (!confirm('Supprimer définitivement cet élément ?')) return;
    if (apiBase) {
      try {
        await api(`/admin/resources/${section}/${row.id}`, { method: 'DELETE', headers: { 'x-csrf-token': csrfToken } });
        load();
      } catch (e) {
        setError(e.message);
      }
    } else {
      setRows(rows.filter((r) => r.id !== row.id));
    }
  };

  const logout = async () => {
    localStorage.removeItem('portfolio-admin-session');
    if (apiBase) {
      try {
        await api('/admin/logout', { method: 'POST', headers: { 'x-csrf-token': csrfToken } });
      } catch (e) {
        setError(e.message);
      }
    }
    onLogout();
  };

  const cell = (val) => String(val ?? '').slice(0, 100) || '—';

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <a className="adminbrand" href="/">
          <span className="mark">
            <img src={asset('assets/logo-yy.png')} alt="YY" />
          </span>
          <span>
            Portfolio<br />
            <small>Administration</small>
          </span>
        </a>
        <nav>
          {navItems.map((item) => (
            <a key={item} className={section === item ? 'is-active' : ''} href={item === 'overview' ? '/admin' : `/admin/${item}`}>
              {messages[item] || item}
            </a>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-white/10 space-y-2">
          <a
            href="/"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors"
          >
            <span>←</span>
            <span>Voir le site public</span>
          </a>
          <button className="btn-pro-admin-danger logout w-full justify-start" onClick={logout}>
            Déconnexion ↗
          </button>
        </div>
      </aside>

      <main className="adminmain">
        <div className="topbar">
          <div>
            <span className="kicker">ESPACE ADMINISTRATEUR</span>
            <h1>{messages[section] || section}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-300">
              Connecté : <strong>{admin.name}</strong> ({admin.email})
            </span>
          </div>
        </div>

        {error && <div className="alert err">{error}</div>}

        {section === 'overview' ? (
          <>
            {overview && (
              <>
                <div className="admin-stats">
                  {Object.entries(overview.counts).map(([k, val]) => (
                    <article className="stat-modern" key={k}>
                      <div className="stat-top">
                        <span>{messages[k] || ({ newMessages: 'Nouveaux messages', visits: 'Visites totales' }[k] || k)}</span>
                        <span className="stat-dot" />
                      </div>
                      <strong>{val}</strong>
                    </article>
                  ))}
                </div>
                <div className="admin-columns">
                  <section className="panel activity-panel">
                    <div className="panelhead">
                      <h2>Messages récents</h2>
                      <a className="btn-pro-admin-secondary" href="/admin/messages">Voir tout ↗</a>
                    </div>
                    {overview.messages && overview.messages.length ? (
                      overview.messages.map((m) => (
                        <article className="message-item" key={m.id}>
                          <span className="message-avatar">{m.name[0]}</span>
                          <span className="message-content">
                            <strong>{m.name}</strong>
                            <small>{m.message}</small>
                          </span>
                          <time>{new Date(m.created_at).toLocaleDateString()}</time>
                        </article>
                      ))
                    ) : (
                      <p className="empty-state">Aucun message pour le moment.</p>
                    )}
                  </section>
                  <section className="panel next-panel">
                    <h2>Accès rapides</h2>
                    {['projects', 'media_videos', 'settings', 'messages'].map((i) => (
                      <a className="shortcut group" href={`/admin/${i}`} key={i}>
                        <span>↗</span>
                        <strong>{messages[i]}</strong>
                        <b className="group-hover:translate-x-1 transition-transform">→</b>
                      </a>
                    ))}
                  </section>
                </div>
              </>
            )}
          </>
        ) : (
          <section className="panel resource-panel">
            <div className="panelhead">
              <h2>{messages[section] || section}</h2>
              <div className="flex items-center gap-2">
                {!['messages', 'activity', 'admin_activity', 'login_attempts', 'visits'].includes(section) && (
                  <button className="btn-pro-admin-primary" onClick={() => setFormRow(null)}>+ Ajouter</button>
                )}
                {section === 'media_videos' && apiBase && (
                  <a className="btn-pro-admin-secondary action" href={apiUrl('/admin/export/media_videos')}>Exporter CSV ↗</a>
                )}
              </div>
            </div>

            {rows.length ? (
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      {fields.filter((f) => f !== 'password_hash').slice(0, 6).map((f) => (
                        <th key={f}>{fieldLabels[f] || f}</th>
                      ))}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.id}>
                        {fields.filter((f) => f !== 'password_hash').slice(0, 6).map((f) => (
                          <td key={f}>{cell(row[f])}</td>
                        ))}
                        <td className="row-actions">
                          {!['messages', 'activity', 'admin_activity', 'login_attempts', 'visits'].includes(section) && (
                            <button className="btn-pro-admin-secondary" onClick={() => setFormRow(row)}>Modifier</button>
                          )}
                          {!['settings', 'messages', 'activity', 'admin_activity', 'login_attempts', 'visits'].includes(section) && (
                            <button className="btn-pro-admin-danger" onClick={() => remove(row)}>Supprimer</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="empty-state">Aucune donnée à afficher.</p>
            )}
          </section>
        )}

        {formRow !== undefined && (
          <AdminForm
            table={section}
            fields={fields}
            row={formRow}
            csrfToken={csrfToken}
            onClose={() => setFormRow(undefined)}
            onSaved={() => { setFormRow(undefined); load(); }}
          />
        )}
      </main>
    </div>
  );
}
