import React, { useState, useEffect } from 'react';
import { api, apiUrl, asset } from '../../utils/api.js';
import { messages, navItems, fieldLabels, longFields } from '../../locales/messages.js';

export function AdminLogin({ csrfToken, onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    try {
      const result = await api('/admin/login', {
        method: 'POST',
        headers: { 'x-csrf-token': csrfToken },
        body: JSON.stringify(form)
      });
      onLogin(result);
    } catch (exception) {
      setError(exception.message);
    }
  };

  return (
    <div className="auth">
      <div className="authbox">
        <span className="mark">
          <img src="/assets/logo-yy.png" alt="YY" />
        </span>
        <h1>Administration</h1>
        <p>Connectez-vous pour gérer votre portfolio.</p>
        {error && <div className="alert err">{error}</div>}
        <form onSubmit={submit}>
          <input type="hidden" value={csrfToken} />
          <label>
            Email
            <input
              type="email"
              required
              autoComplete="username"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label>
            Mot de passe
            <input
              type="password"
              required
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>
          <button className="btn-pro-primary w-full mt-2" type="submit">
            Se connecter ↗
          </button>
        </form>
        <a className="btn-pro-ghost w-full text-center mt-4" href="/">
          ← Retour au portfolio
        </a>
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
    <div className="auth">
      <div className="authbox">
        <span className="mark">
          <img src="/assets/logo-yy.png" alt="YY" />
        </span>
        <h1>Créer le compte administrateur</h1>
        <p>Le compte initial n’est disponible qu’une seule fois.</p>
        {error && <div className="alert err">{error}</div>}
        {created ? (
          <>
            <div className="alert ok">
              Compte créé avec succès. Vous pouvez maintenant vous connecter.
            </div>
            <a className="btn-pro-primary w-full text-center mt-3" href="/admin">
              Se connecter ↗
            </a>
          </>
        ) : (
          <form onSubmit={submit}>
            <label>
              Nom
              <input
                required
                maxLength="120"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label>
              Mot de passe (12 caractères minimum)
              <input
                type="password"
                minLength="12"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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
    try {
      await api('/admin/logout', { method: 'POST', headers: { 'x-csrf-token': csrfToken } });
      onLogout();
    } catch (e) {
      console.error('Logout error:', e);
    }
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
        <button className="btn-pro-admin-danger logout w-full justify-start mt-auto" onClick={logout}>
          Déconnexion ↗
        </button>
      </aside>
      <main className="adminmain">{children}</main>
    </div>
  );
}

export function AdminMessages({ csrfToken, onLogout }) {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setRows((await api('/admin/resources/messages')).rows);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (row, status) => {
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
          {rows.length} message(s){' '}
          <a className="btn-pro-admin-secondary action ml-3" href={apiUrl('/admin/export/messages')}>
            Exporter CSV ↗
          </a>
        </span>
      </div>
      {error && <div className="alert err">{error}</div>}
      <section className="panel">
        {rows.map((row) => (
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
        ))}
      </section>
    </AdminFrame>
  );
}

export function AdminBackup({ admin, csrfToken, onLogout }) {
  return (
    <AdminFrame csrfToken={csrfToken} section="backup" onLogout={onLogout}>
      <section className="panel">
        <h1>Sauvegarde des données</h1>
        <p className="mb-6">
          Téléchargez les données de contenu et de portfolio au format JSON. Les mots de passe administrateur et les données de session sont exclus.
        </p>
        {admin.role === 'admin' ? (
          <div className="flex flex-col gap-3 max-w-md">
            <a className="btn-pro-primary" href={apiUrl('/admin/backup')}>
              Télécharger la sauvegarde complète ↗
            </a>
            <a className="btn-pro-admin-secondary" href={apiUrl('/admin/export/messages')}>
              Exporter les messages (CSV) ↗
            </a>
            <a className="btn-pro-admin-secondary" href={apiUrl('/admin/export/media_videos')}>
              Exporter les vidéos (CSV) ↗
            </a>
          </div>
        ) : (
          <p>Accès réservé aux administrateurs.</p>
        )}
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
  };

  const uploadField = async (field, file) => {
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
        setOverview(await api('/admin/overview'));
      } else {
        const data = await api(`/admin/resources/${section}`);
        setRows(data.rows);
        setFields(data.fields);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => { load(); }, [section]);

  const remove = async (row) => {
    if (!confirm('Supprimer définitivement cet élément ?')) return;
    try {
      await api(`/admin/resources/${section}/${row.id}`, { method: 'DELETE', headers: { 'x-csrf-token': csrfToken } });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const logout = async () => {
    try {
      await api('/admin/logout', { method: 'POST', headers: { 'x-csrf-token': csrfToken } });
      onLogout();
    } catch (e) {
      setError(e.message);
    }
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
        <button className="btn-pro-admin-danger logout w-full justify-start mt-auto" onClick={logout}>
          Déconnexion ↗
        </button>
      </aside>

      <main className="adminmain">
        <div className="topbar">
          <div>
            <span className="kicker">ESPACE ADMINISTRATEUR</span>
            <h1>{messages[section] || section}</h1>
          </div>
          <span>Bonjour, {admin.name}</span>
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
                        <span>{messages[k] || ({ newMessages: 'Nouveaux messages', visits: 'Visites (30 j)' }[k] || k)}</span>
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
                    {overview.messages.length ? (
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
                {section === 'media_videos' && (
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
