import './config.js';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import multer from 'multer';
import {
  ensureRuntimeSchema,
  getPublicData,
  getProjectById,
  addContactMessage,
  recordInteractionEvent,
  incrementVideoMetric,
  recordVisit,
  getRecentLoginAttempts,
  addLoginAttempt,
  clearLoginAttempts,
  getAdminByEmail,
  getAdminCount,
  createAdminAccount,
  logAdminActivity,
  getAdminOverviewData,
  getFullBackup,
  getTableRows,
  insertTableRow,
  updateTableRow,
  deleteTableRow,
  getSession,
  setSession,
  destroySession,
  touchSession,
  isConfigured
} from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const app = express();
const port = Number(process.env.PORT || 3000);

const tables = {
  projects: ['title','title_en','category','category_en','description','description_en','technologies','image','project_url','featured','sort_order'],
  skills: ['name','name_en','category','category_en','level','sort_order'],
  services: ['title','title_en','description','description_en','sort_order','active'],
  media_videos: ['title','title_en','description','description_en','video_url','poster_path','content_type','published','sort_order'],
  settings: ['full_name','role','tagline','about_text','role_en','tagline_en','about_text_en','email','phone','location','photo','logo','linkedin','github','whatsapp'],
  testimonials: ['client_name','client_name_en','company','company_en','quote','quote_en','role','role_en','active','sort_order'],
  project_images: ['project_id','image_path','caption','sort_order'],
  translations: ['translation_key','locale','translation_value'],
  messages: ['name','email','message','status'],
  admins: ['name','email','role','active'],
  login_attempts: ['ip_hash','attempted_at'],
  admin_activity: ['admin_id','action','details','ip_hash','created_at'],
  visits: ['path','visited_at','ip_hash']
};

const adminOnlyTables = new Set(['settings','translations','admins','admin_activity','login_attempts','visits']);
const readOnlyTables = new Set(['login_attempts','admin_activity','visits']);
const uploadFolders = { image: 'assets/projects', video: 'assets/videos', poster: 'assets/projects', photo: 'assets/uploads' };

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      const folder = uploadFolders[req.params.kind];
      if (!folder) return callback(new Error('Type de fichier non accepté.'));
      const destination = path.join(root, folder);
      fs.mkdirSync(destination, { recursive: true });
      callback(null, destination);
    },
    filename(req, file, callback) {
      const safeExtension = path.extname(file.originalname).toLowerCase().replace(/[^.a-z0-9]/g, '');
      callback(null, `${crypto.randomUUID()}${safeExtension}`);
    }
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const allowed = req.params.kind === 'video' ? /^video\/(mp4|webm|ogg)$/ : /^image\/(jpeg|png|webp|gif)$/;
    callback(allowed.test(file.mimetype) ? null : new Error('Format de fichier non accepté.'), allowed.test(file.mimetype));
  }
});

class SupabaseSessionStore extends session.Store {
  async get(sessionId, callback) {
    try {
      const data = await getSession(sessionId);
      callback(null, data);
    } catch (error) {
      callback(error);
    }
  }

  async set(sessionId, sessionData, callback = () => {}) {
    try {
      await setSession(sessionId, sessionData);
      callback();
    } catch (error) {
      callback(error);
    }
  }

  async destroy(sessionId, callback = () => {}) {
    try {
      await destroySession(sessionId);
      callback();
    } catch (error) {
      callback(error);
    }
  }

  async touch(sessionId, sessionData, callback = () => {}) {
    try {
      await touchSession(sessionId, sessionData);
      callback();
    } catch (error) {
      callback(error);
    }
  }
}

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

const sessionSecret = process.env.SESSION_SECRET || 'yy-portfolio-default-dev-secret-change-in-production';
const sessionStore = new SupabaseSessionStore();

app.use(session({
  name: 'yy.sid',
  secret: sessionSecret,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.COOKIE_SECURE === 'true',
    maxAge: 2 * 60 * 60 * 1000
  }
}));

app.use('/assets', express.static(path.join(root, 'client', 'dist', 'assets')));
app.use('/assets', express.static(path.join(root, 'assets'), { index: false }));
app.use('/uploads', express.static(path.join(root, 'assets', 'uploads'), { index: false }));
app.use('/admin/assets', express.static(path.join(root, 'admin', 'assets'), { index: false }));

function ipHash(req) {
  return crypto.createHash('sha256').update(req.ip || 'unknown').digest('hex');
}

function requireAdmin(req, res, next) {
  if (!req.session.admin) return res.status(401).json({ error: 'Authentification requise.' });
  if (Date.now() - req.session.lastActivity > 2 * 60 * 60 * 1000) {
    return req.session.destroy(() => res.status(401).json({ error: 'Session expirée.' }));
  }
  req.session.lastActivity = Date.now();
  next();
}

function requireRole(role) {
  return (req, res, next) => req.session.admin?.role === role ? next() : res.status(403).json({ error: 'Accès réservé aux administrateurs.' });
}

function csrf(req, res, next) {
  if (!req.session.csrf || req.get('x-csrf-token') !== req.session.csrf) {
    return res.status(419).json({ error: 'Jeton de sécurité invalide.' });
  }
  next();
}

function asyncRoute(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

function pickFields(allowed, body) {
  return Object.fromEntries(allowed.filter((field) => Object.hasOwn(body, field)).map((field) => [field, body[field]]));
}

// ---------------- API Routes ----------------

app.get('/api/health', asyncRoute(async (req, res) => {
  res.json({
    status: 'ok',
    database: 'supabase',
    supabaseConnected: isConfigured
  });
}));

app.get('/api/csrf', (req, res) => {
  req.session.csrf ||= crypto.randomBytes(32).toString('hex');
  res.json({ csrfToken: req.session.csrf });
});

app.get('/api/public', asyncRoute(async (req, res) => {
  const publicData = await getPublicData();
  res.json({
    ...publicData,
    sent: req.query.sent === '1',
    supabaseConnected: isConfigured
  });
}));

app.get('/api/projects/:id', asyncRoute(async (req, res) => {
  const projectData = await getProjectById(req.params.id);
  if (!projectData) return res.status(404).json({ error: 'Projet introuvable.' });
  res.json(projectData);
}));

app.post('/api/contact', csrf, asyncRoute(async (req, res) => {
  const { name, email, message, website } = req.body;
  if (website) return res.status(202).json({ ok: true }); // Honeypot
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 120 ||
      typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 190 ||
      typeof message !== 'string' || message.trim().length < 5 || message.length > 5000) {
    return res.status(400).json({ error: 'Vérifiez les champs du formulaire.' });
  }
  await addContactMessage({ name: name.trim(), email: email.trim(), message: message.trim() });
  res.status(201).json({ ok: true });
}));

app.post('/api/events', asyncRoute(async (req, res) => {
  const event = req.body.event;
  if (!['whatsapp_click', 'email_click'].includes(event)) {
    return res.status(400).json({ error: 'Événement invalide.' });
  }
  await recordInteractionEvent(event, ipHash(req));
  res.status(201).json({ ok: true });
}));

app.post('/api/videos/:id/view', asyncRoute(async (req, res) => {
  const updated = await incrementVideoMetric(req.params.id, 'view');
  if (!updated) return res.status(404).json({ error: 'Vidéo introuvable.' });
  res.json({ ok: true });
}));

app.post('/api/videos/:id/click', asyncRoute(async (req, res) => {
  const updated = await incrementVideoMetric(req.params.id, 'click');
  if (!updated) return res.status(404).json({ error: 'Vidéo introuvable.' });
  res.json({ ok: true });
}));

// Admin authentication & endpoints
app.get('/api/admin/session', (req, res) => {
  res.json({ admin: req.session.admin || null });
});

app.get('/api/admin/setup', asyncRoute(async (req, res) => {
  const total = await getAdminCount();
  req.session.csrf ||= crypto.randomBytes(32).toString('hex');
  res.json({ available: total === 0, csrfToken: req.session.csrf });
}));

app.post('/api/admin/login', csrf, asyncRoute(async (req, res) => {
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body.password === 'string' ? req.body.password : '';
  const hash = ipHash(req);

  const attempts = await getRecentLoginAttempts(hash, 15);
  if (attempts >= 5) {
    return res.status(429).json({ error: 'Trop de tentatives. Réessayez dans quelques minutes.' });
  }

  const admin = await getAdminByEmail(email);
  if (!admin || !await bcrypt.compare(password, admin.password_hash)) {
    await addLoginAttempt(hash);
    return res.status(401).json({ error: 'Identifiants incorrects.' });
  }

  await clearLoginAttempts(hash);

  req.session.regenerate(async (error) => {
    if (error) return res.status(500).json({ error: 'Impossible de créer la session.' });
    req.session.admin = { id: admin.id, name: admin.name, email: admin.email, role: admin.role || 'admin' };
    req.session.lastActivity = Date.now();
    req.session.csrf = crypto.randomBytes(32).toString('hex');
    try {
      await logAdminActivity(admin.id, 'Connexion réussie', '', hash);
      res.json({ admin: req.session.admin, csrfToken: req.session.csrf });
    } catch (logError) {
      res.status(500).json({ error: 'Connexion réussie, journalisation échouée.' });
    }
  });
}));

app.post('/api/admin/logout', requireAdmin, csrf, (req, res, next) => {
  req.session.destroy((error) => error ? next(error) : res.json({ ok: true }));
});

app.get('/api/admin/overview', requireAdmin, asyncRoute(async (req, res) => {
  const overview = await getAdminOverviewData();
  res.json(overview);
}));

app.get('/api/admin/backup', requireAdmin, requireRole('admin'), asyncRoute(async (req, res) => {
  const names = ['settings','projects','project_images','skills','services','media_videos','testimonials','translations','messages','admins'];
  const backup = await getFullBackup(names);
  res.attachment(`portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`).json({
    createdAt: new Date().toISOString(),
    database: 'supabase',
    data: backup
  });
}));

app.get('/api/admin/export/:table', requireAdmin, asyncRoute(async (req, res) => {
  const table = req.params.table;
  if (!['messages','media_videos'].includes(table)) return res.status(404).json({ error: 'Export introuvable.' });
  if (req.session.admin.role !== 'admin') return res.status(403).json({ error: 'Accès réservé aux administrateurs.' });

  const rows = await getTableRows(table, 5000);
  const columns = Object.keys(rows[0] || (table === 'messages' ? { name: '', email: '', message: '', status: '', created_at: '' } : { title: '', video_url: '', published: '', view_count: '', click_count: '' }));
  const escapeCsv = (value) => {
    let cell = String(value ?? '');
    if (/^[\s]*[=+\-@]/.test(cell)) cell = `'${cell}`;
    return `"${cell.replaceAll('"', '""')}"`;
  };
  const csv = [columns.map(escapeCsv).join(','), ...rows.map((row) => columns.map((column) => escapeCsv(row[column])).join(','))].join('\r\n');
  res.type('text/csv').attachment(`${table}-${new Date().toISOString().slice(0, 10)}.csv`).send(`\uFEFF${csv}`);
}));

app.get('/api/admin/resources/:table', requireAdmin, asyncRoute(async (req, res) => {
  const table = req.params.table;
  if (!tables[table]) return res.status(404).json({ error: 'Section introuvable.' });
  if (adminOnlyTables.has(table) && req.session.admin.role !== 'admin') return res.status(403).json({ error: 'Accès réservé aux administrateurs.' });

  const rows = await getTableRows(table, 500);
  res.json({ rows, fields: tables[table] });
}));

app.post('/api/admin/resources/:table', requireAdmin, csrf, asyncRoute(async (req, res) => {
  const table = req.params.table;
  if (!tables[table]) return res.status(404).json({ error: 'Section introuvable.' });
  if (table === 'settings') return res.status(405).json({ error: 'Le profil existant doit être modifié, pas recréé.' });
  if (readOnlyTables.has(table)) return res.status(403).json({ error: 'Cette section est en lecture seule.' });
  if (adminOnlyTables.has(table) && req.session.admin.role !== 'admin') return res.status(403).json({ error: 'Accès réservé aux administrateurs.' });

  const values = pickFields(tables[table], req.body);
  if (table === 'admins') {
    if (typeof req.body.password !== 'string' || req.body.password.length < 12) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 12 caractères.' });
    }
    values.password_hash = await bcrypt.hash(req.body.password, 12);
  }

  if (!Object.keys(values).length) return res.status(400).json({ error: 'Aucune donnée à enregistrer.' });

  const result = await insertTableRow(table, values);
  await logAdminActivity(req.session.admin?.id, `Création: ${table}`, `ID ${result.id || ''}`, ipHash(req));
  res.status(201).json(result);
}));

app.put('/api/admin/resources/:table/:id', requireAdmin, csrf, asyncRoute(async (req, res) => {
  const table = req.params.table;
  if (!tables[table]) return res.status(404).json({ error: 'Section introuvable.' });
  if (readOnlyTables.has(table)) return res.status(403).json({ error: 'Cette section est en lecture seule.' });
  if (adminOnlyTables.has(table) && req.session.admin.role !== 'admin') return res.status(403).json({ error: 'Accès réservé aux administrateurs.' });

  const values = pickFields(tables[table], req.body);
  if (table === 'admins' && req.body.password) {
    values.password_hash = await bcrypt.hash(req.body.password, 12);
  }
  if (!Object.keys(values).length) return res.status(400).json({ error: 'Aucune donnée à enregistrer.' });

  const updated = await updateTableRow(table, req.params.id, values);
  if (!updated) return res.status(404).json({ error: 'Élément introuvable.' });
  await logAdminActivity(req.session.admin?.id, `Modification: ${table}`, `ID ${req.params.id}`, ipHash(req));
  res.json({ ok: true });
}));

app.delete('/api/admin/resources/:table/:id', requireAdmin, csrf, asyncRoute(async (req, res) => {
  const table = req.params.table;
  if (!tables[table] || table === 'settings') return res.status(404).json({ error: 'Section introuvable.' });
  if (readOnlyTables.has(table)) return res.status(403).json({ error: 'Cette section est en lecture seule.' });
  if (adminOnlyTables.has(table) && req.session.admin.role !== 'admin') return res.status(403).json({ error: 'Accès réservé aux administrateurs.' });
  if (table === 'admins' && Number(req.params.id) === req.session.admin.id) {
    return res.status(400).json({ error: 'Impossible de supprimer votre propre compte.' });
  }

  const deleted = await deleteTableRow(table, req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Élément introuvable.' });
  await logAdminActivity(req.session.admin?.id, `Suppression: ${table}`, `ID ${req.params.id}`, ipHash(req));
  res.json({ ok: true });
}));

app.post('/api/admin/upload/:kind', requireAdmin, csrf, (req, res, next) => upload.single('file')(req, res, (error) => {
  if (error) return res.status(400).json({ error: error.message });
  if (!req.file) return res.status(400).json({ error: 'Sélectionnez un fichier.' });
  const folder = uploadFolders[req.params.kind];
  res.status(201).json({ path: `${folder}/${req.file.filename}` });
}));

app.post('/api/admin/setup', csrf, asyncRoute(async (req, res) => {
  const { name, email, password } = req.body;
  if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof password !== 'string' || password.length < 12) {
    return res.status(400).json({ error: 'Nom, email valide et mot de passe de 12 caractères minimum requis.' });
  }

  const total = await getAdminCount();
  if (total > 0) return res.status(409).json({ error: 'Un compte administrateur existe déjà.' });

  const hash = await bcrypt.hash(password, 12);
  const id = await createAdminAccount({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password_hash: hash,
    role: 'admin',
    active: true
  });

  res.status(201).json({ id });
}));

app.get('/api/cv', (req, res) => res.sendFile(path.join(root, 'assets', 'cv', 'yves-yao-cv.pdf')));

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nSitemap: ${(process.env.APP_URL || `http://localhost:${port}`).replace(/\/$/, '')}/sitemap.xml\n`);
});

app.post('/api/visits', asyncRoute(async (req, res) => {
  const visitedPath = typeof req.body.path === 'string' ? req.body.path : '';
  if (!visitedPath.startsWith('/') || visitedPath.length > 255 || visitedPath.startsWith('//')) {
    return res.status(400).json({ error: 'Chemin invalide.' });
  }
  await recordVisit(visitedPath, ipHash(req));
  res.status(201).json({ ok: true });
}));

app.get(['/api/sitemap.xml','/sitemap.xml'], asyncRoute(async (req, res) => {
  const publicData = await getPublicData();
  const projects = publicData.projects || [];
  const base = (process.env.APP_URL || `http://localhost:${port}`).replace(/\/$/, '');
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${base}/</loc></url>${projects.map((project) => `<url><loc>${base}/projects/${project.id}</loc></url>`).join('')}</urlset>`);
}));

app.use('/api', (req, res) => res.status(404).json({ error: 'Route API introuvable.' }));

app.use(express.static(path.join(root, 'client', 'dist'), { index: false }));
app.get('*', (req, res, next) => {
  res.sendFile(path.join(root, 'client', 'dist', 'index.html'), (error) => error && next(error));
});

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);
  res.status(500).json({ error: 'Une erreur interne est survenue.' });
});

await ensureRuntimeSchema();
app.listen(port, () => console.log(`Portfolio Express prêt sur http://localhost:${port} (Base: Supabase)`));
