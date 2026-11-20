import React, { useState, useEffect } from 'react';
import { api, apiUrl, asset, apiBase } from '../../utils/api.js';
import defaultData from '../../defaultData.json';
import { messages, fieldLabels } from '../../locales/messages.js';
import {
  IconOverview,
  IconProfile,
  IconProjects,
  IconSkills,
  IconServices,
  IconMessages,
  IconTestimonials,
  IconVideos,
  IconBackup,
  IconLogout,
  IconExternal,
  IconPlus,
  IconEdit,
  IconTrash,
  IconCheck,
  IconSearch,
  IconSave,
  IconCopy,
  IconDownload,
  IconUpload,
  IconKey,
  IconLightning,
  IconEye,
  IconEyeOff,
  IconPhone,
  IconMail,
  IconMapPin,
  IconStar,
  IconRefresh,
  IconClose,
  IconArchive,
  IconSettings,
  IconImage,
  BrandBadgeLinkedIn,
  BrandBadgeGitHub,
  BrandBadgeTikTok,
  BrandBadgeInstagram,
  BrandBadgeFacebook,
  BrandBadgeWhatsApp
} from './AdminIcons.jsx';

// Helper: load initial messages from localStorage or defaults
function getStoredMessages() {
  try {
    const saved = localStorage.getItem('portfolio-messages');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [
    {
      id: 1,
      name: 'Client Entreprise',
      email: 'directeur@tech-solutions.ci',
      message: 'Bonjour Yves, nous avons un projet d’application mobile et web de gestion logistique à vous confier. Êtes-vous disponible pour un échange cette semaine ?',
      status: 'new',
      created_at: new Date(Date.now() - 3600000 * 4).toISOString()
    }
  ];
}

// --------------------------------------------------------------------------
// 1. ADMIN LOGIN
// --------------------------------------------------------------------------
export function AdminLogin({ csrfToken, onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');

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
                {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
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
              <span className="flex items-center justify-center gap-2">
                <span>Se connecter au tableau de bord</span>
                <IconExternal size={14} />
              </span>
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
            <IconKey size={12} className="text-slate-400" />
            <span>Session sécurisée · Protection anti-bruteforce</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 2. ADMIN SETUP
// --------------------------------------------------------------------------
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

// --------------------------------------------------------------------------
// 3. ADMIN PROFILE / SETTINGS EDITOR
// --------------------------------------------------------------------------
function AdminSettingsView({ data, onUpdateData, onShowToast }) {
  const [form, setForm] = useState(data.settings || {});
  const [saving, setSaving] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);

    if (apiBase) {
      try {
        await api('/admin/resources/settings/1', {
          method: 'PUT',
          body: JSON.stringify(form)
        });
      } catch (err) {
        console.error('Remote save error:', err);
      }
    }

    const updatedData = { ...data, settings: form };
    onUpdateData(updatedData);
    setSaving(false);
    onShowToast('Profil et réseaux sociaux enregistrés avec succès !');
  };

  return (
    <form onSubmit={save} className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <IconProfile size={20} className="text-sky-400" />
            <span>Profil Professionnel & Coordonnées</span>
          </h2>
          <p className="text-xs text-slate-400">
            Modifiez vos informations personnelles, bio, coordonnées directes et liens réseaux sociaux.
          </p>
        </div>
        <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
          <IconSave size={15} />
          <span>{saving ? 'Enregistrement…' : 'Enregistrer les modifications'}</span>
        </button>
      </div>

      {/* Identité & Rôles */}
      <div className="admin-card">
        <div className="admin-card-head">
          <h2>
            <IconProfile size={18} className="text-sky-400" />
            <span>Identité & Titres</span>
          </h2>
        </div>
        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label>Nom complet</label>
            <input
              className="admin-input"
              value={form.full_name || ''}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Localisation</label>
            <input
              className="admin-input"
              value={form.location || ''}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Abidjan, Côte d’Ivoire"
            />
          </div>
          <div className="admin-form-group">
            <label>Rôle (Français)</label>
            <input
              className="admin-input"
              value={form.role || ''}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Rôle (Anglais)</label>
            <input
              className="admin-input"
              value={form.role_en || ''}
              onChange={(e) => setForm({ ...form, role_en: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>Accroche / Tagline (Français)</label>
            <input
              className="admin-input"
              value={form.tagline || ''}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>Accroche / Tagline (Anglais)</label>
            <input
              className="admin-input"
              value={form.tagline_en || ''}
              onChange={(e) => setForm({ ...form, tagline_en: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Biographie & Présentation */}
      <div className="admin-card">
        <div className="admin-card-head">
          <h2>
            <IconEdit size={18} className="text-sky-400" />
            <span>Biographie & Présentation (À propos)</span>
          </h2>
        </div>
        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label>À propos (Français)</label>
            <textarea
              className="admin-textarea"
              rows="4"
              value={form.about_text || ''}
              onChange={(e) => setForm({ ...form, about_text: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>À propos (Anglais)</label>
            <textarea
              className="admin-textarea"
              rows="4"
              value={form.about_text_en || ''}
              onChange={(e) => setForm({ ...form, about_text_en: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Coordonnées de contact */}
      <div className="admin-card">
        <div className="admin-card-head">
          <h2>
            <IconPhone size={18} className="text-sky-400" />
            <span>Coordonnées Directes</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="admin-form-group">
            <label className="flex items-center gap-1.5">
              <IconMail size={14} className="text-slate-400" />
              <span>Email de contact</span>
            </label>
            <input
              type="email"
              className="admin-input"
              value={form.email || ''}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="flex items-center gap-1.5">
              <IconPhone size={14} className="text-slate-400" />
              <span>Téléphone direct</span>
            </label>
            <input
              type="tel"
              className="admin-input"
              value={form.phone || ''}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+225 07 67 06 41 68"
            />
          </div>
          <div className="admin-form-group">
            <label className="flex items-center gap-1.5">
              <BrandBadgeWhatsApp size={16} />
              <span>Numéro WhatsApp</span>
            </label>
            <input
              type="tel"
              className="admin-input"
              value={form.whatsapp || ''}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              placeholder="+225 07 67 06 41 68"
            />
          </div>
        </div>
      </div>

      {/* Réseaux Sociaux & Liens */}
      <div className="admin-card">
        <div className="admin-card-head">
          <h2>
            <IconExternal size={18} className="text-sky-400" />
            <span>Liens Réseaux Sociaux & Profils Web</span>
          </h2>
        </div>
        <p className="text-xs text-slate-400 mb-5">
          Renseignez vos URLs de profils officiels. Chaque réseau dispose de son logo officiel avec ses couleurs authentiques et sera affiché dans l’en-tête, le pied de page et les contacts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LinkedIn */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/10 hover:border-[#0A66C2]/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <BrandBadgeLinkedIn size={24} />
                <div>
                  <strong className="text-white text-xs block">LinkedIn</strong>
                  <span className="text-[10px] text-slate-400">Réseau professionnel</span>
                </div>
              </div>
              {form.linkedin && (
                <a
                  href={form.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
                >
                  <span>Tester</span>
                  <IconExternal size={11} />
                </a>
              )}
            </div>
            <input
              type="url"
              className="admin-input text-xs"
              value={form.linkedin || ''}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/votre-nom"
            />
          </div>

          {/* GitHub */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/10 hover:border-white/30 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <BrandBadgeGitHub size={24} />
                <div>
                  <strong className="text-white text-xs block">GitHub</strong>
                  <span className="text-[10px] text-slate-400">Dépôts & Code source</span>
                </div>
              </div>
              {form.github && (
                <a
                  href={form.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
                >
                  <span>Tester</span>
                  <IconExternal size={11} />
                </a>
              )}
            </div>
            <input
              type="url"
              className="admin-input text-xs"
              value={form.github || ''}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
              placeholder="https://github.com/0767064168"
            />
          </div>

          {/* TikTok */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/10 hover:border-[#EE1D52]/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <BrandBadgeTikTok size={24} />
                <div>
                  <strong className="text-white text-xs block">TikTok</strong>
                  <span className="text-[10px] text-slate-400">Vidéos courtes & Tech</span>
                </div>
              </div>
              {form.tiktok && (
                <a
                  href={form.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
                >
                  <span>Tester</span>
                  <IconExternal size={11} />
                </a>
              )}
            </div>
            <input
              type="url"
              className="admin-input text-xs"
              value={form.tiktok || ''}
              onChange={(e) => setForm({ ...form, tiktok: e.target.value })}
              placeholder="https://tiktok.com/@votre-compte"
            />
          </div>

          {/* Instagram */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/10 hover:border-[#E4405F]/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <BrandBadgeInstagram size={24} />
                <div>
                  <strong className="text-white text-xs block">Instagram</strong>
                  <span className="text-[10px] text-slate-400">Photos & Stories pro</span>
                </div>
              </div>
              {form.instagram && (
                <a
                  href={form.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
                >
                  <span>Tester</span>
                  <IconExternal size={11} />
                </a>
              )}
            </div>
            <input
              type="url"
              className="admin-input text-xs"
              value={form.instagram || ''}
              onChange={(e) => setForm({ ...form, instagram: e.target.value })}
              placeholder="https://instagram.com/votre-compte"
            />
          </div>

          {/* Facebook */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/10 hover:border-[#1877F2]/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <BrandBadgeFacebook size={24} />
                <div>
                  <strong className="text-white text-xs block">Facebook</strong>
                  <span className="text-[10px] text-slate-400">Page / Profil public</span>
                </div>
              </div>
              {form.facebook && (
                <a
                  href={form.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
                >
                  <span>Tester</span>
                  <IconExternal size={11} />
                </a>
              )}
            </div>
            <input
              type="url"
              className="admin-input text-xs"
              value={form.facebook || ''}
              onChange={(e) => setForm({ ...form, facebook: e.target.value })}
              placeholder="https://facebook.com/votre-page"
            />
          </div>

          {/* WhatsApp Direct */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/10 hover:border-[#25D366]/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <BrandBadgeWhatsApp size={24} />
                <div>
                  <strong className="text-white text-xs block">WhatsApp Direct</strong>
                  <span className="text-[10px] text-slate-400">Discussion instantanée</span>
                </div>
              </div>
              {form.whatsapp && (
                <a
                  href={`https://wa.me/${(form.whatsapp || '').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
                >
                  <span>Tester</span>
                  <IconExternal size={11} />
                </a>
              )}
            </div>
            <input
              type="tel"
              className="admin-input text-xs"
              value={form.whatsapp || ''}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              placeholder="+225 07 67 06 41 68"
            />
          </div>
        </div>
      </div>

      {/* Médias & Visuels */}
      <div className="admin-card">
        <div className="admin-card-head">
          <h2>
            <IconImage size={18} className="text-sky-400" />
            <span>Médias & Branding</span>
          </h2>
        </div>
        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label>Chemin de la photo de portrait</label>
            <input
              className="admin-input"
              value={form.photo || ''}
              onChange={(e) => setForm({ ...form, photo: e.target.value })}
              placeholder="assets/portrait.jpg"
            />
          </div>
          <div className="admin-form-group">
            <label>Chemin du Logo</label>
            <input
              className="admin-input"
              value={form.logo || ''}
              onChange={(e) => setForm({ ...form, logo: e.target.value })}
              placeholder="assets/logo-yy.png"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" disabled={saving} className="admin-btn admin-btn-primary px-8 py-3 text-sm">
          <IconSave size={16} />
          <span>{saving ? 'Enregistrement…' : 'Enregistrer les modifications'}</span>
        </button>
      </div>
    </form>
  );
}

// --------------------------------------------------------------------------
// 4. ADMIN PROJECTS LIST & MODAL FORM
// --------------------------------------------------------------------------
function AdminProjectsView({ data, onUpdateData, onShowToast }) {
  const [projects, setProjects] = useState(data.projects || []);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [editingProject, setEditingProject] = useState(null);

  const categories = ['all', ...new Set(projects.map((p) => p.category).filter(Boolean))];

  const filtered = projects.filter((p) => {
    const matchCat = filter === 'all' || p.category === filter;
    const matchSearch =
      !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.technologies?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const saveProject = (proj) => {
    let updated;
    if (proj.id) {
      updated = projects.map((p) => (p.id === proj.id ? proj : p));
    } else {
      const newProj = { ...proj, id: Date.now() };
      updated = [newProj, ...projects];
    }
    setProjects(updated);
    onUpdateData({ ...data, projects: updated });
    setEditingProject(null);
    onShowToast('Projet enregistré avec succès !');
  };

  const deleteProject = (id) => {
    if (!confirm('Supprimer définitivement ce projet ?')) return;
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    onUpdateData({ ...data, projects: updated });
    onShowToast('Projet supprimé.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <IconProjects size={20} className="text-sky-400" />
            <span>Projets & Études de Cas ({projects.length})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Gérez vos réalisations, les technologies utilisées et le détail des études de cas (Challenge, Solution, Impact).
          </p>
        </div>
        <button
          onClick={() =>
            setEditingProject({
              title: '',
              title_en: '',
              category: 'Web App',
              category_en: 'Web App',
              technologies: '',
              description: '',
              description_en: '',
              challenge: '',
              challenge_en: '',
              solution: '',
              solution_en: '',
              impact: '',
              impact_en: '',
              project_url: '',
              github_url: '',
              image: 'assets/projects/demo-pointage-rh.svg',
              featured: 1,
              sort_order: projects.length + 1
            })
          }
          className="admin-btn admin-btn-primary"
        >
          <IconPlus size={15} />
          <span>Nouveau Projet</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <IconSearch size={14} />
          </span>
          <input
            type="text"
            placeholder="Rechercher par titre, stack ou mot-clé…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                filter === c
                  ? 'bg-sky-500/20 text-sky-300 border-sky-400/40 font-semibold'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              {c === 'all' ? 'Tous' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((proj) => (
          <div key={proj.id} className="admin-card hover:border-sky-400/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[11px] font-mono text-sky-400 font-semibold uppercase tracking-wider block">
                    {proj.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">{proj.title}</h3>
                </div>
                {proj.featured ? (
                  <span className="admin-badge admin-badge-amber flex items-center gap-1">
                    <IconStar size={12} />
                    <span>En vedette</span>
                  </span>
                ) : null}
              </div>

              <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                {proj.description || 'Aucune description'}
              </p>

              {proj.technologies && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {proj.technologies.split(',').map((tech, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <a
                href={`/projects/${proj.id}`}
                target="_blank"
                rel="noreferrer"
                className="text-sky-400 hover:text-sky-300 flex items-center gap-1.5 font-medium"
              >
                <span>Fiche publique</span>
                <IconExternal size={12} />
              </a>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingProject(proj)}
                  className="admin-btn admin-btn-secondary py-1 px-2.5 text-xs flex items-center gap-1"
                >
                  <IconEdit size={12} />
                  <span>Modifier</span>
                </button>
                <button
                  onClick={() => deleteProject(proj.id)}
                  className="admin-btn admin-btn-danger py-1 px-2.5 text-xs"
                  aria-label="Supprimer le projet"
                >
                  <IconTrash size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Project Form */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0b1526] border border-sky-400/30 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <IconProjects size={18} className="text-sky-400" />
                <span>{editingProject.id ? 'Modifier le projet' : 'Nouveau Projet'}</span>
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Fermer"
              >
                <IconClose size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveProject(editingProject);
              }}
              className="space-y-4 text-xs"
            >
              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label>Titre (Français)</label>
                  <input
                    className="admin-input"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Titre (Anglais)</label>
                  <input
                    className="admin-input"
                    value={editingProject.title_en || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title_en: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Catégorie (Français)</label>
                  <input
                    className="admin-input"
                    required
                    value={editingProject.category || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Catégorie (Anglais)</label>
                  <input
                    className="admin-input"
                    value={editingProject.category_en || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, category_en: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Stack Technologies (séparées par virgules)</label>
                <input
                  className="admin-input"
                  placeholder="React, Node.js, Express, PostgreSQL, Tailwind"
                  value={editingProject.technologies || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value })}
                />
              </div>

              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label>Description (Français)</label>
                  <textarea
                    rows="3"
                    className="admin-textarea"
                    value={editingProject.description || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Description (Anglais)</label>
                  <textarea
                    rows="3"
                    className="admin-textarea"
                    value={editingProject.description_en || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, description_en: e.target.value })}
                  />
                </div>
              </div>

              {/* Étude de cas (Challenge, Solution, Impact) */}
              <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-3">
                <span className="font-semibold text-sky-400 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <IconSkills size={14} />
                  <span>Étude de cas détaillée (Case Study)</span>
                </span>
                <div className="admin-form-grid-2">
                  <div className="admin-form-group">
                    <label>Le Défi / Challenge (FR)</label>
                    <textarea
                      rows="2"
                      className="admin-textarea"
                      value={editingProject.challenge || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Le Défi / Challenge (EN)</label>
                    <textarea
                      rows="2"
                      className="admin-textarea"
                      value={editingProject.challenge_en || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, challenge_en: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Solution Technique (FR)</label>
                    <textarea
                      rows="2"
                      className="admin-textarea"
                      value={editingProject.solution || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Solution Technique (EN)</label>
                    <textarea
                      rows="2"
                      className="admin-textarea"
                      value={editingProject.solution_en || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, solution_en: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Impact Métier & ROI (FR)</label>
                    <textarea
                      rows="2"
                      className="admin-textarea"
                      value={editingProject.impact || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, impact: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Impact Métier & ROI (EN)</label>
                    <textarea
                      rows="2"
                      className="admin-textarea"
                      value={editingProject.impact_en || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, impact_en: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Liens & Médias */}
              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label>Lien du Projet / Démo</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={editingProject.project_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, project_url: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Lien GitHub (Code source)</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={editingProject.github_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Chemin de l'image / maquette</label>
                  <input
                    className="admin-input"
                    value={editingProject.image || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                  />
                </div>
                <div className="admin-form-group flex items-center gap-4 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(editingProject.featured)}
                      onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked ? 1 : 0 })}
                    />
                    <span className="text-white font-medium flex items-center gap-1.5">
                      <IconStar size={13} className="text-amber-400" />
                      <span>Mettre en vedette</span>
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="admin-btn admin-btn-secondary"
                >
                  Annuler
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <IconSave size={14} />
                  <span>Enregistrer le projet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
// 5. ADMIN MESSAGES INBOX
// --------------------------------------------------------------------------
export function AdminMessages({ csrfToken, onLogout }) {
  const [messagesList, setMessagesList] = useState(getStoredMessages);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState('');

  const showToast = (txt) => {
    setToast(txt);
    setTimeout(() => setToast(''), 3000);
  };

  const updateStatus = (id, newStatus) => {
    const updated = messagesList.map((m) => (m.id === id ? { ...m, status: newStatus } : m));
    setMessagesList(updated);
    localStorage.setItem('portfolio-messages', JSON.stringify(updated));
    showToast(`Statut mis à jour : ${newStatus}`);
  };

  const removeMessage = (id) => {
    if (!confirm('Supprimer ce message ?')) return;
    const updated = messagesList.filter((m) => m.id !== id);
    setMessagesList(updated);
    localStorage.setItem('portfolio-messages', JSON.stringify(updated));
    showToast('Message supprimé.');
  };

  const addTestMessage = () => {
    const sample = {
      id: Date.now(),
      name: 'Nouveau Prospect',
      email: 'contact@prospect-startup.com',
      message: 'Bonjour Yves, nous avons vu votre portfolio et nous souhaitons moderniser notre application web React/Node.js. Pouvez-vous nous contacter ?',
      status: 'new',
      created_at: new Date().toISOString()
    };
    const updated = [sample, ...messagesList];
    setMessagesList(updated);
    localStorage.setItem('portfolio-messages', JSON.stringify(updated));
    showToast('Message de test ajouté !');
  };

  const filtered = messagesList.filter((m) => {
    if (filter === 'all') return true;
    return m.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <IconMessages size={20} className="text-sky-400" />
            <span>Boîte de réception ({messagesList.length})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Messages reçus via le formulaire de contact public de votre portfolio.
          </p>
        </div>
        <button onClick={addTestMessage} className="admin-btn admin-btn-secondary text-xs flex items-center gap-1.5">
          <IconPlus size={13} />
          <span>Simuler un message de test</span>
        </button>
      </div>

      {toast && <div className="admin-toast">{toast}</div>}

      <div className="flex gap-2">
        {['all', 'new', 'read', 'archived'].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
              filter === st
                ? 'bg-sky-500/20 text-sky-300 border-sky-400/40 font-semibold'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            {st === 'all' ? 'Tous' : st === 'new' ? 'Nouveaux' : st === 'read' ? 'Lus' : 'Archivés'}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="admin-card text-center py-12 text-slate-400 text-sm">
          Aucun message dans cette catégorie.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((msg) => (
            <div key={msg.id} className="admin-card hover:border-sky-400/30 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                    {msg.name ? msg.name[0].toUpperCase() : 'M'}
                  </div>
                  <div>
                    <strong className="text-white text-sm block">{msg.name}</strong>
                    <a href={`mailto:${msg.email}`} className="text-xs text-sky-400 hover:underline">
                      {msg.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`admin-badge ${
                      msg.status === 'new'
                        ? 'admin-badge-green'
                        : msg.status === 'archived'
                        ? 'admin-badge-slate'
                        : 'admin-badge-blue'
                    }`}
                  >
                    {msg.status === 'new' ? 'Nouveau' : msg.status === 'archived' ? 'Archivé' : 'Lu'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {new Date(msg.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-black/30 border border-white/5 text-sm text-slate-200 mb-4 whitespace-pre-wrap">
                {msg.message}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-xs">
                <a
                  href={`mailto:${msg.email}?subject=Re:%20Votre%20projet%20-%20Yves%20Yao`}
                  className="admin-btn admin-btn-primary py-1 px-3 text-xs flex items-center gap-1.5"
                >
                  <IconMail size={13} />
                  <span>Répondre par email</span>
                </a>
                <div className="flex items-center gap-2">
                  {msg.status !== 'read' && (
                    <button
                      onClick={() => updateStatus(msg.id, 'read')}
                      className="admin-btn admin-btn-secondary py-1 px-2.5 text-xs flex items-center gap-1"
                    >
                      <IconCheck size={12} />
                      <span>Marquer comme lu</span>
                    </button>
                  )}
                  {msg.status !== 'archived' && (
                    <button
                      onClick={() => updateStatus(msg.id, 'archived')}
                      className="admin-btn admin-btn-secondary py-1 px-2.5 text-xs flex items-center gap-1"
                    >
                      <IconArchive size={12} />
                      <span>Archiver</span>
                    </button>
                  )}
                  <button
                    onClick={() => removeMessage(msg.id)}
                    className="admin-btn admin-btn-danger py-1 px-2.5 text-xs flex items-center gap-1"
                    aria-label="Supprimer le message"
                  >
                    <IconTrash size={12} />
                    <span>Supprimer</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
// 6. ADMIN BACKUP & RESTORE
// --------------------------------------------------------------------------
export function AdminBackup({ admin, csrfToken, onLogout, data, onUpdateData, onShowToast }) {
  const downloadBackup = () => {
    const jsonStr = JSON.stringify(data || defaultData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    if (onShowToast) onShowToast('Fichier de sauvegarde JSON téléchargé !');
  };

  const copyJsonToClipboard = () => {
    const jsonStr = JSON.stringify(data || defaultData, null, 2);
    navigator.clipboard.writeText(jsonStr);
    if (onShowToast) onShowToast('Données JSON copiées dans le presse-papier !');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed && parsed.settings && Array.isArray(parsed.projects)) {
          onUpdateData(parsed);
          if (onShowToast) onShowToast('Sauvegarde restaurée avec succès !');
        } else {
          alert('Format de fichier JSON invalide. Le fichier doit contenir les clés "settings" et "projects".');
        }
      } catch (err) {
        alert('Erreur lors de la lecture du fichier JSON : ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const resetToFactory = () => {
    if (!confirm('Attention : réinitialiser toutes les données aux valeurs par défaut de démonstration ?')) return;
    onUpdateData(defaultData);
    localStorage.removeItem('portfolio-custom-data');
    if (onShowToast) onShowToast('Données réinitialisées aux valeurs par défaut.');
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-white/10">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <IconBackup size={20} className="text-sky-400" />
          <span>Sauvegarde, Export & Restauration</span>
        </h2>
        <p className="text-xs text-slate-400">
          Exportez et importez l’ensemble des données de votre portfolio (projets, compétences, profils, services).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="admin-card space-y-4">
          <div className="admin-card-head">
            <h2>
              <IconDownload size={18} className="text-sky-400" />
              <span>Exporter les données</span>
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Téléchargez un snapshot complet de toutes vos modifications au format JSON. Idéal pour conserver une copie ou synchroniser avec le dépôt GitHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={downloadBackup} className="admin-btn admin-btn-primary flex-1">
              <IconDownload size={15} />
              <span>Télécharger la sauvegarde JSON</span>
            </button>
            <button onClick={copyJsonToClipboard} className="admin-btn admin-btn-secondary">
              <IconCopy size={15} />
              <span>Copier JSON</span>
            </button>
          </div>
        </div>

        <div className="admin-card space-y-4">
          <div className="admin-card-head">
            <h2>
              <IconUpload size={18} className="text-sky-400" />
              <span>Restaurer une sauvegarde</span>
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Sélectionnez un fichier JSON de sauvegarde précédemment exporté pour écraser et actualiser instantanément les données du site.
          </p>
          <label className="admin-btn admin-btn-secondary w-full text-center cursor-pointer flex items-center justify-center gap-2">
            <IconUpload size={15} />
            <span>Choisir un fichier JSON à restaurer…</span>
            <input type="file" accept=".json,application/json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      <div className="admin-card border-rose-500/20 bg-rose-950/10 p-4">
        <div className="flex items-center justify-between">
          <div>
            <strong className="text-rose-300 text-sm block">Zone de réinitialisation</strong>
            <span className="text-xs text-slate-400">
              Rétablit les données de démonstration initiales et efface les modifications locales.
            </span>
          </div>
          <button onClick={resetToFactory} className="admin-btn admin-btn-danger text-xs flex items-center gap-1.5">
            <IconRefresh size={13} />
            <span>Réinitialiser les données</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 7. GENERIC TABLE VIEW (Skills, Services, Testimonials, Videos)
// --------------------------------------------------------------------------
function AdminGenericView({ section, data, onUpdateData, onShowToast }) {
  const key = section === 'media_videos' ? 'videos' : section;
  const items = Array.isArray(data[key]) ? data[key] : [];
  const [list, setList] = useState(items);
  const [search, setSearch] = useState('');
  const [modalItem, setModalItem] = useState(null);

  useEffect(() => {
    setList(Array.isArray(data[key]) ? data[key] : []);
  }, [section, data]);

  const fields = list[0] ? Object.keys(list[0]).filter((k) => k !== 'id') : ['name', 'category', 'level'];

  const saveItem = (item) => {
    let updated;
    if (item.id) {
      updated = list.map((x) => (x.id === item.id ? item : x));
    } else {
      updated = [{ ...item, id: Date.now() }, ...list];
    }
    setList(updated);
    onUpdateData({ ...data, [key]: updated });
    setModalItem(null);
    onShowToast('Élément enregistré.');
  };

  const removeItem = (id) => {
    if (!confirm('Supprimer cet élément ?')) return;
    const updated = list.filter((x) => x.id !== id);
    setList(updated);
    onUpdateData({ ...data, [key]: updated });
    onShowToast('Élément supprimé.');
  };

  const filtered = list.filter((item) => {
    if (!search) return true;
    return JSON.stringify(item).toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <IconSettings size={20} className="text-sky-400" />
            <span>{messages[section] || section} ({list.length})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Gestion des éléments de la section {messages[section] || section}.
          </p>
        </div>
        <button
          onClick={() => {
            const blank = {};
            fields.forEach((f) => (blank[f] = ''));
            setModalItem(blank);
          }}
          className="admin-btn admin-btn-primary"
        >
          <IconPlus size={15} />
          <span>Ajouter</span>
        </button>
      </div>

      <div className="relative max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
          <IconSearch size={14} />
        </span>
        <input
          type="text"
          placeholder="Rechercher…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-input pl-9"
        />
      </div>

      <div className="admin-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/30 border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
              <tr>
                {fields.slice(0, 5).map((f) => (
                  <th key={f} className="p-3">
                    {fieldLabels[f] || f}
                  </th>
                ))}
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  {fields.slice(0, 5).map((f) => (
                    <td key={f} className="p-3 max-w-[200px] truncate">
                      {String(item[f] ?? '—')}
                    </td>
                  ))}
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setModalItem(item)}
                        className="admin-btn admin-btn-secondary py-1 px-2.5 text-xs"
                        aria-label="Modifier"
                      >
                        <IconEdit size={12} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="admin-btn admin-btn-danger py-1 px-2.5 text-xs"
                        aria-label="Supprimer"
                      >
                        <IconTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b1526] border border-sky-400/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-base font-bold text-white">
                {modalItem.id ? 'Modifier' : 'Ajouter'} — {messages[section] || section}
              </h3>
              <button onClick={() => setModalItem(null)} className="text-slate-400 hover:text-white">
                <IconClose size={18} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveItem(modalItem);
              }}
              className="space-y-3 text-xs"
            >
              {fields.map((f) => (
                <div key={f} className="admin-form-group">
                  <label>{fieldLabels[f] || f}</label>
                  <input
                    className="admin-input"
                    value={modalItem[f] ?? ''}
                    onChange={(e) => setModalItem({ ...modalItem, [f]: e.target.value })}
                  />
                </div>
              ))}
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setModalItem(null)} className="admin-btn admin-btn-secondary">
                  Annuler
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <IconSave size={14} />
                  <span>Enregistrer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
// 8. ADMIN OVERVIEW DASHBOARD
// --------------------------------------------------------------------------
function AdminOverviewView({ data, admin, onNavigate, onShowToast }) {
  const projects = data.projects || [];
  const skills = data.skills || [];
  const services = data.services || [];
  const messagesList = getStoredMessages();
  const unreadCount = messagesList.filter((m) => m.status === 'new').length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/60 via-slate-900 to-indigo-950/60 border border-sky-400/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono text-sky-400 font-bold uppercase tracking-wider block mb-1">
            Tableau de Bord
          </span>
          <h2 className="text-2xl font-bold text-white">
            Bonjour, {admin?.name || 'Yves Yao'}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Bienvenue dans votre centre de commande professionnel. Toute modification enregistrée est instantanément synchronisée sur votre site public.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="admin-btn admin-btn-primary text-xs flex items-center gap-1.5"
          >
            <span>Voir le site public</span>
            <IconExternal size={13} />
          </a>
          <button
            onClick={() => onNavigate('settings')}
            className="admin-btn admin-btn-secondary text-xs flex items-center gap-1.5"
          >
            <IconProfile size={14} />
            <span>Profil & Réseaux</span>
          </button>
        </div>
      </div>

      {/* KPI Cards (Bleu pure, Jaune, Vert, Orange) */}
      <div className="admin-kpis">
        {/* 1. BLEU PURE : Projets */}
        <div className="admin-kpi kpi-blue cursor-pointer" onClick={() => onNavigate('projects')}>
          <div className="admin-kpi-top">
            <span className="admin-kpi-label">Projets publiés</span>
            <span className="admin-kpi-icon kpi-ico-blue">
              <IconProjects size={20} />
            </span>
          </div>
          <div className="admin-kpi-value kpi-val-blue">{projects.length}</div>
          <div className="admin-kpi-meta text-blue-400 flex items-center gap-1 font-medium">
            <IconStar size={12} />
            <span>{projects.filter((p) => p.featured).length} mis en vedette</span>
          </div>
        </div>

        {/* 2. JAUNE : Compétences */}
        <div className="admin-kpi kpi-yellow cursor-pointer" onClick={() => onNavigate('skills')}>
          <div className="admin-kpi-top">
            <span className="admin-kpi-label">Compétences</span>
            <span className="admin-kpi-icon kpi-ico-yellow">
              <IconSkills size={20} />
            </span>
          </div>
          <div className="admin-kpi-value kpi-val-yellow">{skills.length}</div>
          <div className="admin-kpi-meta text-yellow-400 font-medium">
            Technologies & Frameworks
          </div>
        </div>

        {/* 3. VERT : Messages */}
        <div className="admin-kpi kpi-green cursor-pointer" onClick={() => onNavigate('messages')}>
          <div className="admin-kpi-top">
            <span className="admin-kpi-label">Messages reçus</span>
            <span className="admin-kpi-icon kpi-ico-green">
              <IconMessages size={20} />
            </span>
          </div>
          <div className="admin-kpi-value kpi-val-green">{messagesList.length}</div>
          <div className="admin-kpi-meta text-emerald-400 font-medium">
            {unreadCount > 0 ? `${unreadCount} nouveau(x) à traiter` : 'Tous traités'}
          </div>
        </div>

        {/* 4. ORANGE : Visites */}
        <div className="admin-kpi kpi-orange">
          <div className="admin-kpi-top">
            <span className="admin-kpi-label">Visites estimées</span>
            <span className="admin-kpi-icon kpi-ico-orange">
              <IconEye size={20} />
            </span>
          </div>
          <div className="admin-kpi-value kpi-val-orange">142</div>
          <div className="admin-kpi-meta text-orange-400 font-medium">
            Trafic Portfolio
          </div>
        </div>
      </div>

      {/* 2-Columns Layout */}
      <div className="admin-grid-2">
        {/* Messages Récents */}
        <div className="admin-card">
          <div className="admin-card-head">
            <h2>
              <IconMail size={18} className="text-sky-400" />
              <span>Messages récents</span>
            </h2>
            <button
              onClick={() => onNavigate('messages')}
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
            >
              <span>Voir tout ({messagesList.length})</span>
              <IconExternal size={12} />
            </button>
          </div>
          {messagesList.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">Aucun message pour l'instant.</p>
          ) : (
            <div className="space-y-3">
              {messagesList.slice(0, 3).map((m) => (
                <div
                  key={m.id}
                  onClick={() => onNavigate('messages')}
                  className="p-3 rounded-xl bg-black/20 hover:bg-white/5 border border-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <strong className="text-white">{m.name}</strong>
                    <span className="text-[10px] text-slate-500">
                      {new Date(m.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-1">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projets Clés & Liens rapides */}
        <div className="admin-card space-y-4">
          <div className="admin-card-head">
            <h2>
              <IconLightning size={18} className="text-amber-400" />
              <span>Accès Rapides</span>
            </h2>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Gérer les Projets & Études de cas', sec: 'projects', IconComp: IconProjects },
              { label: 'Mettre à jour le Profil & Réseaux Sociaux', sec: 'settings', IconComp: IconProfile },
              { label: 'Consulter la Boîte de Réception', sec: 'messages', IconComp: IconMessages },
              { label: 'Compétences & Stack technique', sec: 'skills', IconComp: IconSkills },
              { label: 'Sauvegarder & Exporter les données (JSON)', sec: 'backup', IconComp: IconBackup }
            ].map((item) => (
              <button
                key={item.sec}
                onClick={() => onNavigate(item.sec)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-black/20 hover:bg-sky-500/10 border border-white/5 hover:border-sky-500/30 text-xs text-slate-300 hover:text-white transition-all text-left"
              >
                <span className="flex items-center gap-2.5">
                  <item.IconComp size={16} className="text-sky-400" />
                  <span className="font-medium">{item.label}</span>
                </span>
                <span className="text-sky-400 font-bold">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 9. UNIFIED MAIN ADMIN PANEL
// --------------------------------------------------------------------------
export function AdminPanel({ admin, csrfToken, onLogout, initialSection, data: propData, onUpdateData }) {
  const [data, setData] = useState(() => {
    if (propData) return propData;
    try {
      const saved = localStorage.getItem('portfolio-custom-data');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultData;
  });

  const getSectionFromUrl = () => {
    const seg = location.pathname.split('/')[2];
    return seg && seg.length > 0 ? seg : 'overview';
  };

  const [section, setSection] = useState(initialSection || getSectionFromUrl);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleUpdate = (newData) => {
    setData(newData);
    try {
      localStorage.setItem('portfolio-custom-data', JSON.stringify(newData));
    } catch (e) {}
    if (onUpdateData) onUpdateData(newData);
  };

  const navigate = (sec) => {
    setSection(sec);
    const newPath = sec === 'overview' ? '/admin' : `/admin/${sec}`;
    window.history.pushState(null, '', newPath);
  };

  useEffect(() => {
    const handlePop = () => {
      setSection(getSectionFromUrl());
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const navLinks = [
    { id: 'overview', label: "Vue d'ensemble", IconComp: IconOverview },
    { id: 'settings', label: 'Profil & Réseaux', IconComp: IconProfile },
    { id: 'projects', label: 'Projets & Études', IconComp: IconProjects },
    { id: 'skills', label: 'Compétences', IconComp: IconSkills },
    { id: 'services', label: 'Services', IconComp: IconServices },
    { id: 'messages', label: 'Messages', IconComp: IconMessages, badge: getStoredMessages().filter((m) => m.status === 'new').length },
    { id: 'testimonials', label: 'Témoignages', IconComp: IconTestimonials },
    { id: 'media_videos', label: 'Vidéos', IconComp: IconVideos },
    { id: 'backup', label: 'Sauvegarde & Export', IconComp: IconBackup }
  ];

  return (
    <div className="admin-shell">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <a href="/admin" onClick={(e) => { e.preventDefault(); navigate('overview'); }} className="admin-sidebar-logo">
            <img src="/assets/logo-yy.png" alt="Yves Yao" />
            <div className="admin-sidebar-title">
              <strong>Yves Yao</strong>
              <span>Administration Pro</span>
            </div>
          </a>
        </div>

        <nav className="admin-sidebar-nav">
          {navLinks.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`admin-nav-item ${section === item.id ? 'is-active' : ''}`}
            >
              <span className="admin-nav-icon">
                <item.IconComp size={17} />
              </span>
              <span>{item.label}</span>
              {item.badge > 0 && <span className="admin-nav-badge">{item.badge}</span>}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <a
            href="/"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
          >
            <span>←</span>
            <span>Voir le site public</span>
          </a>
          <button
            onClick={onLogout}
            className="admin-btn admin-btn-danger w-full justify-start text-xs py-2 flex items-center gap-2"
          >
            <IconLogout size={14} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-content">
        <div className="admin-topbar">
          <div className="admin-topbar-left">
            <span>ESPACE DE GESTION</span>
            <h1>{navLinks.find((l) => l.id === section)?.label || 'Administration'}</h1>
          </div>
          <div className="admin-topbar-right">
            <div className="admin-status-pill">
              <span className="admin-status-dot" />
              <span>{apiBase ? 'Connecté (API)' : 'Autonome (Vercel)'}</span>
            </div>
            <div className="admin-user-pill">
              <IconProfile size={14} className="text-sky-400" />
              <span>{admin?.name || 'Yves Yao'}</span>
            </div>
          </div>
        </div>

        <div className="admin-page-body">
          {section === 'overview' && (
            <AdminOverviewView
              data={data}
              admin={admin}
              onNavigate={navigate}
              onShowToast={showToast}
            />
          )}

          {section === 'settings' && (
            <AdminSettingsView
              data={data}
              onUpdateData={handleUpdate}
              onShowToast={showToast}
            />
          )}

          {section === 'projects' && (
            <AdminProjectsView
              data={data}
              onUpdateData={handleUpdate}
              onShowToast={showToast}
            />
          )}

          {section === 'messages' && (
            <AdminMessages csrfToken={csrfToken} onLogout={onLogout} />
          )}

          {section === 'backup' && (
            <AdminBackup
              admin={admin}
              csrfToken={csrfToken}
              onLogout={onLogout}
              data={data}
              onUpdateData={handleUpdate}
              onShowToast={showToast}
            />
          )}

          {['skills', 'services', 'testimonials', 'media_videos'].includes(section) && (
            <AdminGenericView
              section={section}
              data={data}
              onUpdateData={handleUpdate}
              onShowToast={showToast}
            />
          )}
        </div>
      </main>

      {toast && (
        <div className="admin-toast flex items-center gap-2">
          <IconCheck size={16} className="text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
