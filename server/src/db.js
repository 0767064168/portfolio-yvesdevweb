import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

export const isConfigured = Boolean(supabaseUrl && supabaseKey && !supabaseUrl.includes('votre-projet'));

if (!isConfigured) {
  console.warn(
    '[Supabase] Note: SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY ne sont pas encore configurés dans server/.env.\n' +
    'Le serveur fonctionne avec les données par défaut locales. Pour connecter votre base Supabase, renseignez vos clés dans server/.env.'
  );
}

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    })
  : null;

// Données locales initiales de secours (lorsque Supabase n'est pas encore lié)
const mockData = {
  settings: {
    id: 1,
    full_name: 'Yves Yao',
    role: 'Développeur Web & Mobile',
    tagline: 'Je transforme les idées en solutions digitales.',
    about_text: 'Je conçois des interfaces modernes, des applications web et mobiles et des systèmes de gestion pensés pour être utiles, rapides et élégants.',
    role_en: 'Web & Mobile Developer',
    tagline_en: 'Transforming ideas into digital solutions.',
    about_text_en: 'I design modern interfaces, web & mobile applications, and management systems built to be efficient, fast and elegant.',
    email: 'contact@yvesyao.dev',
    phone: '+225 00 00 00 00 00',
    location: 'Côte d’Ivoire',
    photo: 'assets/portrait.jpg',
    logo: 'assets/logo-yy.png',
    linkedin: 'https://linkedin.com/in/yves-yao',
    github: 'https://github.com/0767064168',
    facebook: 'https://facebook.com/yvesyao',
    instagram: 'https://instagram.com/yvesyao',
    tiktok: 'https://tiktok.com/@yvesyao',
    whatsapp: '+225 00 00 00 00 00'
  },
  projects: [
    {
      id: 1,
      title: 'PointageRH',
      title_en: 'PointageRH — HR & Attendance Platform',
      category: 'Web App · Enterprise RH',
      category_en: 'Web App · Enterprise HR',
      description: 'Système complet de gestion des ressources humaines, pointage en temps réel, suivi des congés avec validation hiérarchique et génération automatisée des états de paie.',
      description_en: 'Comprehensive HR & attendance platform featuring real-time punch clock, leave approval workflows, employee records and automated payroll export reports.',
      challenge: 'Remplacer les feuilles d’émargement papier sujettes aux erreurs et retards par un outil digital fiable, rapide et accessible sur tout terminal.',
      challenge_en: 'Replace error-prone manual paper sign-in sheets with a reliable, instant digital clock-in system accessible across mobile and desktop.',
      solution: 'Dashboard réactif avec graphiques interactifs (Chart.js), exports Excel (XLSX), calcul automatique des heures supplémentaires et alertes d’absences.',
      solution_en: 'Reactive dashboard featuring interactive analytics (Chart.js), instant spreadsheet export (XLSX), automated overtime calculations, and leave notifications.',
      impact: 'Réduction de 85% du temps de traitement mensuel de la paie et suivi transparent des présences pour plus de 150 collaborateurs.',
      impact_en: '85% reduction in monthly payroll processing time and transparent attendance tracking across 150+ staff members.',
      metrics: [
        { label: 'Gain de temps', value: '-85%' },
        { label: 'Utilisateurs actifs', value: '150+' },
        { label: 'Disponibilité', value: '99.9%' }
      ],
      technologies: 'PHP 8, MySQL, JavaScript ES6+, Tailwind CSS, Chart.js, SheetJS',
      image: 'assets/projects/demo-pointage-rh.svg',
      cover_image: 'assets/projects/demo-pointage-rh.svg',
      project_url: 'https://github.com/0767064168',
      github_url: 'https://github.com/0767064168/portfolio-yvesdevweb',
      featured: 1,
      sort_order: 1
    },
    {
      id: 2,
      title: 'Gestion des expéditions & Logistique',
      title_en: 'Smart Logistics & Dispatch System',
      category: 'Système métier · Supply Chain',
      category_en: 'Business System · Logistics',
      description: 'Application logistique pour le scanning de codes-barres, préparation de colis, édition de bordereaux et suivi en temps réel des tournées de livraison.',
      description_en: 'Mission-critical logistics application for barcode scanning, parcel preparation, manifest generation, and live dispatch tracking.',
      challenge: 'Gérer des cadences intenses de préparation avec risques de doublons d’envoi et pertes de traçabilité en entrepôt.',
      challenge_en: 'Handle high-volume warehouse fulfillment while eliminating duplicate dispatches and tracking errors.',
      solution: 'Module de flashage ultra-rapide par caméra/douchette, architecture tolérante aux pertes de réseau temporaires (Offline-ready) et audit trail exhaustif.',
      solution_en: 'High-speed camera/laser barcode scanning engine, offline-tolerant data sync, and rigorous verification before manifest validation.',
      impact: 'Zéro colis égaré en 6 mois d’exploitation et vitesse de préparation de commande multipliée par 2.5.',
      impact_en: 'Zero missing parcels in 6 months of operations, with fulfillment speed boosted by 2.5x.',
      metrics: [
        { label: 'Erreurs de dispatch', value: '0%' },
        { label: 'Vitesse de scan', value: '2.5x' },
        { label: 'Colis / jour', value: '1 200+' }
      ],
      technologies: 'PHP, MySQL, REST API, PWA, QuaggaJS, IndexedDB',
      image: 'assets/projects/demo-expeditions.svg',
      cover_image: 'assets/projects/demo-expeditions.svg',
      project_url: 'https://github.com/0767064168',
      github_url: 'https://github.com/0767064168/portfolio-yvesdevweb',
      featured: 1,
      sort_order: 2
    },
    {
      id: 3,
      title: 'ERP Quincaillerie & Vente au comptoir',
      title_en: 'Hardware Store ERP & POS',
      category: 'Management · Commerce & Stock',
      category_en: 'Management · Retail & Inventory',
      description: 'Logiciel centralisé de gestion commerciale : catalogue de plus de 5 000 références, caisse comptoir, réapprovisionnement automatique et marges brutes en direct.',
      description_en: 'Comprehensive retail management software: 5,000+ SKU inventory catalog, point-of-sale checkout, automated purchase orders and real-time margin tracking.',
      challenge: 'Nombreuses références techniques avec unités variées (mètres, poids, pièces) et rupture récurrente de stock critique.',
      challenge_en: 'Managing thousands of hardware parts with mixed units and frequent stockouts due to manual replenishment.',
      solution: 'Moteur de recherche instantané multi-critères, calcul automatique des seuils de réassort et génération de tickets / factures normalisées.',
      solution_en: 'Multi-criteria instantaneous product search, automated stock thresholds, and instant compliant receipt/invoice printing.',
      impact: 'Visibilité totale sur la rentabilité par rayon et suppression des ruptures de stock sur les produits phares.',
      impact_en: 'Complete financial visibility per department and total elimination of stockouts on top-tier items.',
      metrics: [
        { label: 'Références gérées', value: '5 000+' },
        { label: 'Temps d’encaissement', value: '< 20s' },
        { label: 'Ruptures évitées', value: '98%' }
      ],
      technologies: 'PHP, PostgreSQL, JavaScript, Chart.js, HTML5 Canvas',
      image: 'assets/projects/demo-quincaillerie.svg',
      cover_image: 'assets/projects/demo-quincaillerie.svg',
      project_url: 'https://github.com/0767064168',
      github_url: 'https://github.com/0767064168/portfolio-yvesdevweb',
      featured: 0,
      sort_order: 3
    }
  ],
  skills: [
    { id: 1, name: 'HTML / CSS / JavaScript', name_en: 'HTML / CSS / JavaScript', category: 'Front-end', category_en: 'Front-end', level: 95, sort_order: 1 },
    { id: 2, name: 'React & Tailwind CSS', name_en: 'React & Tailwind CSS', category: 'Front-end', category_en: 'Front-end', level: 90, sort_order: 2 },
    { id: 3, name: 'Node.js & Express', name_en: 'Node.js & Express', category: 'Back-end', category_en: 'Back-end', level: 88, sort_order: 3 },
    { id: 4, name: 'Supabase & PostgreSQL', name_en: 'Supabase & PostgreSQL', category: 'Database', category_en: 'Database', level: 85, sort_order: 4 },
    { id: 5, name: 'PHP / MySQL', name_en: 'PHP / MySQL', category: 'Back-end', category_en: 'Back-end', level: 90, sort_order: 5 },
    { id: 6, name: 'UI/UX Design', name_en: 'UI/UX Design', category: 'Design', category_en: 'Design', level: 82, sort_order: 6 }
  ],
  services: [
    { id: 1, title: 'Sites Web & e-commerce', title_en: 'Websites & E-commerce', description: 'Présence digitale moderne, responsive et orientée conversion.', description_en: 'Modern, responsive and conversion-oriented digital presence.', sort_order: 1, active: 1 },
    { id: 2, title: 'Applications Web & Mobile', title_en: 'Web & Mobile Apps', description: 'Interfaces métier et applications adaptées aux usages réels.', description_en: 'Business-ready interfaces and web applications crafted for real workflows.', sort_order: 2, active: 1 },
    { id: 3, title: 'Systèmes de gestion & API', title_en: 'Management Systems & APIs', description: 'Dashboards, RH, stocks, ventes, rapports et automatisation cloud avec Supabase.', description_en: 'Dashboards, inventory, sales, automated reports and cloud APIs with Supabase.', sort_order: 3, active: 1 },
    { id: 4, title: 'UI/UX & identité visuelle', title_en: 'UI/UX & Visual Identity', description: 'Design d’interfaces, prototypes interactifs et direction artistique digitale.', description_en: 'Interface design, interactive prototypes and modern digital direction.', sort_order: 4, active: 1 }
  ],
  videos: [
    {
      id: 1,
      title: 'Démonstration application & workflow',
      title_en: 'Application Demo & Workflow',
      description: 'Aperçu complet du tableau de bord de gestion, du pointage et des exports de données.',
      description_en: 'Comprehensive overview of management dashboard, attendance tracking and data exports.',
      video_url: 'assets/videos/2facca38c8bb088df970.mp4',
      poster_path: 'assets/projects/demo-pointage-rh.svg',
      content_type: 'formation',
      published: 1,
      sort_order: 1
    },
    {
      id: 2,
      title: 'Système métier & Expéditions',
      title_en: 'Logistics & Business System',
      description: 'Fonctionnalités de préparation, validation d’expéditions et récapitulatif opérationnel.',
      description_en: 'Preparation workflow, shipment validation and operational summary features.',
      video_url: 'assets/videos/c16fdec68237f1074a92.mp4',
      poster_path: 'assets/projects/demo-expeditions.svg',
      content_type: 'seminaire',
      published: 1,
      sort_order: 2
    }
  ],
  testimonials: [
    { id: 1, client_name: 'Client projet RH', client_name_en: 'HR Project Client', company: 'Projet PointageRH', company_en: 'PointageRH Project', quote: 'Une solution claire, rapide et adaptée à nos besoins quotidiens.', quote_en: 'A clear, fast and reliable solution tailored to our daily operations.', role: 'Responsable projet', role_en: 'Project Lead', active: 1, sort_order: 1 },
    { id: 2, client_name: 'Partenaire métier', client_name_en: 'Operations Partner', company: 'Projet expéditions', company_en: 'Shipments Project', quote: 'Une compréhension rapide du besoin et un outil vraiment opérationnel.', quote_en: 'Quick understanding of requirements and a truly operational tool.', role: 'Direction des opérations', role_en: 'Operations Director', active: 1, sort_order: 2 }
  ],
  translations: [
    { translation_key: 'nav.about', locale: 'fr', translation_value: 'À propos' },
    { translation_key: 'nav.about', locale: 'en', translation_value: 'About' },
    { translation_key: 'nav.skills', locale: 'fr', translation_value: 'Compétences' },
    { translation_key: 'nav.skills', locale: 'en', translation_value: 'Skills' },
    { translation_key: 'nav.projects', locale: 'fr', translation_value: 'Projets' },
    { translation_key: 'nav.projects', locale: 'en', translation_value: 'Projects' },
    { translation_key: 'nav.services', locale: 'fr', translation_value: 'Services' },
    { translation_key: 'nav.services', locale: 'en', translation_value: 'Services' },
    { translation_key: 'nav.contact', locale: 'fr', translation_value: 'Me contacter' },
    { translation_key: 'nav.contact', locale: 'en', translation_value: 'Contact me' },
    { translation_key: 'cta.view_projects', locale: 'fr', translation_value: 'Voir mes projets' },
    { translation_key: 'cta.view_projects', locale: 'en', translation_value: 'View my projects' },
    { translation_key: 'cta.talk_project', locale: 'fr', translation_value: 'Parlons de votre projet' },
    { translation_key: 'cta.talk_project', locale: 'en', translation_value: 'Let’s talk about your project' },
    { translation_key: 'contact.success', locale: 'fr', translation_value: 'Merci, votre message a bien été envoyé.' },
    { translation_key: 'contact.success', locale: 'en', translation_value: 'Thank you, your message has been sent.' }
  ],
  images: [
    { id: 1, project_id: 1, image_path: 'assets/projects/demo-pointage-rh.svg', caption: 'PointageRH Vue principale', sort_order: 1 },
    { id: 2, project_id: 2, image_path: 'assets/projects/demo-expeditions.svg', caption: 'Expéditions Préparation & Scan', sort_order: 1 },
    { id: 3, project_id: 3, image_path: 'assets/projects/demo-quincaillerie.svg', caption: 'Quincaillerie Gestion des stocks', sort_order: 1 }
  ],
  messages: [],
  admins: [],
  login_attempts: [],
  admin_activity: [],
  visits: [],
  interaction_events: [],
  sessions: {}
};

export async function ensureRuntimeSchema() {
  if (isConfigured) {
    try {
      const { error } = await supabase.from('settings').select('id').limit(1);
      if (error) {
        console.warn('[Supabase] Connexion initiée avec avertissement:', error.message);
      } else {
        console.log('[Supabase] Connexion réussie à Supabase.');
      }
    } catch (error) {
      console.warn('[Supabase] Erreur de vérification du schéma:', error.message);
    }
  }
}

// Récupération de l'ensemble des données publiques
export async function getPublicData() {
  if (isConfigured) {
    const [
      { data: settings },
      { data: projects },
      { data: skills },
      { data: services },
      { data: videos },
      { data: testimonials },
      { data: translations },
      { data: images }
    ] = await Promise.all([
      supabase.from('settings').select('*').eq('id', 1).maybeSingle(),
      supabase.from('projects').select('*').order('featured', { ascending: false }).order('sort_order', { ascending: true }),
      supabase.from('skills').select('*').order('sort_order', { ascending: true }),
      supabase.from('services').select('*').eq('active', true).order('sort_order', { ascending: true }),
      supabase.from('media_videos').select('*').eq('published', true).order('sort_order', { ascending: true }),
      supabase.from('testimonials').select('*').eq('active', true).order('sort_order', { ascending: true }),
      supabase.from('translations').select('translation_key, locale, translation_value'),
      supabase.from('project_images').select('*').order('sort_order', { ascending: true })
    ]);

    const formattedProjects = (projects || []).map((p) => {
      const pImages = (images || []).filter((img) => img.project_id === p.id);
      const firstImage = pImages[0]?.image_path;
      const defaultImage = p.id === 1 ? 'assets/projects/demo-pointage-rh.svg' : p.id === 2 ? 'assets/projects/demo-expeditions.svg' : 'assets/projects/demo-quincaillerie.svg';
      return {
        ...p,
        cover_image: firstImage || p.image || defaultImage
      };
    });

    return {
      settings: settings || mockData.settings,
      projects: formattedProjects,
      skills: skills || [],
      services: services || [],
      videos: videos || [],
      testimonials: testimonials || [],
      images: images || [],
      translations: (translations || []).reduce((acc, item) => {
        acc[`${item.locale}.${item.translation_key}`] = item.translation_value;
        return acc;
      }, {})
    };
  }

  // Fallback local
  return {
    settings: mockData.settings,
    projects: mockData.projects,
    skills: mockData.skills,
    services: mockData.services,
    videos: mockData.videos,
    testimonials: mockData.testimonials,
    images: mockData.images,
    translations: mockData.translations.reduce((acc, item) => {
      acc[`${item.locale}.${item.translation_key}`] = item.translation_value;
      return acc;
    }, {})
  };
}

// Récupération d'un projet par son ID
export async function getProjectById(id) {
  if (isConfigured) {
    const [{ data: project, error: projErr }, { data: images }] = await Promise.all([
      supabase.from('projects').select('*').eq('id', id).single(),
      supabase.from('project_images').select('*').eq('project_id', id).order('sort_order', { ascending: true })
    ]);
    if (projErr || !project) return null;
    return { project, images: images || [] };
  }

  const project = mockData.projects.find((p) => String(p.id) === String(id));
  if (!project) return null;
  const images = mockData.images.filter((img) => String(img.project_id) === String(id));
  return { project, images };
}

// Ajout d'un message depuis le formulaire de contact
export async function addContactMessage({ name, email, message }) {
  if (isConfigured) {
    const { error } = await supabase.from('messages').insert({ name, email, message, status: 'new' });
    if (error) throw new Error(error.message);
    return true;
  }
  mockData.messages.unshift({ id: Date.now(), name, email, message, status: 'new', created_at: new Date().toISOString() });
  return true;
}

// Enregistrement d'événements de clic
export async function recordInteractionEvent(eventName, ipHash) {
  if (isConfigured) {
    await supabase.from('interaction_events').insert({ event_name: eventName, ip_hash: ipHash });
    return true;
  }
  mockData.interaction_events.push({ id: Date.now(), event_name: eventName, ip_hash: ipHash, created_at: new Date().toISOString() });
  return true;
}

// Incrémentation des vues/clics vidéos
export async function incrementVideoMetric(id, type = 'view') {
  if (isConfigured) {
    const column = type === 'view' ? 'view_count' : 'click_count';
    const { data } = await supabase.from('media_videos').select(column).eq('id', id).single();
    if (data) {
      await supabase.from('media_videos').update({ [column]: (data[column] || 0) + 1 }).eq('id', id);
      return true;
    }
    return false;
  }
  const video = mockData.videos.find((v) => String(v.id) === String(id));
  if (video) {
    if (type === 'view') video.view_count = (video.view_count || 0) + 1;
    else video.click_count = (video.click_count || 0) + 1;
    return true;
  }
  return false;
}

// Enregistrement d'une visite
export async function recordVisit(path, ipHash) {
  if (isConfigured) {
    await supabase.from('visits').insert({ path, ip_hash: ipHash });
    return true;
  }
  mockData.visits.push({ id: Date.now(), path, ip_hash: ipHash, visited_at: new Date().toISOString() });
  return true;
}

// Sécurité des tentatives de connexion
export async function getRecentLoginAttempts(ipHash, minutes = 15) {
  const cutoff = new Date(Date.now() - minutes * 60 * 1000).toISOString();
  if (isConfigured) {
    const { count, error } = await supabase
      .from('login_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('attempted_at', cutoff);
    if (error) return 0;
    return count || 0;
  }
  return mockData.login_attempts.filter((a) => a.ip_hash === ipHash && a.attempted_at >= cutoff).length;
}

export async function addLoginAttempt(ipHash) {
  if (isConfigured) {
    await supabase.from('login_attempts').insert({ ip_hash: ipHash });
    return;
  }
  mockData.login_attempts.push({ id: Date.now(), ip_hash: ipHash, attempted_at: new Date().toISOString() });
}

export async function clearLoginAttempts(ipHash) {
  if (isConfigured) {
    await supabase.from('login_attempts').delete().eq('ip_hash', ipHash);
    return;
  }
  mockData.login_attempts = mockData.login_attempts.filter((a) => a.ip_hash !== ipHash);
}

// Administration des administrateurs
export async function getAdminByEmail(email) {
  if (isConfigured) {
    const { data } = await supabase.from('admins').select('*').eq('email', email).eq('active', true).maybeSingle();
    return data;
  }
  return mockData.admins.find((a) => a.email === email && a.active);
}

export async function getAdminCount() {
  if (isConfigured) {
    const { count, error } = await supabase.from('admins').select('*', { count: 'exact', head: true });
    if (error) return 0;
    return count || 0;
  }
  return mockData.admins.length;
}

export async function createAdminAccount({ name, email, password_hash, role = 'admin', active = true }) {
  if (isConfigured) {
    const { data, error } = await supabase.from('admins').insert({ name, email, password_hash, role, active }).select('id').single();
    if (error) throw new Error(error.message);
    return data.id;
  }
  const id = mockData.admins.length + 1;
  mockData.admins.push({ id, name, email, password_hash, role, active, created_at: new Date().toISOString() });
  return id;
}

export async function logAdminActivity(adminId, action, details, ipHash) {
  if (isConfigured) {
    await supabase.from('admin_activity').insert({ admin_id: adminId || null, action, details: String(details || '').slice(0, 255), ip_hash: ipHash });
    return;
  }
  mockData.admin_activity.unshift({ id: Date.now(), admin_id: adminId, action, details, ip_hash: ipHash, created_at: new Date().toISOString() });
}

// Vue d'ensemble du tableau de bord admin
export async function getAdminOverviewData() {
  if (isConfigured) {
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const [
      { count: projectsCount },
      { count: skillsCount },
      { count: servicesCount },
      { count: newMessagesCount },
      { count: videosCount },
      { count: visitsCount },
      { data: recentMessages },
      { data: recentActivity }
    ] = await Promise.all([
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('skills').select('*', { count: 'exact', head: true }),
      supabase.from('services').select('*', { count: 'exact', head: true }),
      supabase.from('messages').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('media_videos').select('*', { count: 'exact', head: true }),
      supabase.from('visits').select('*', { count: 'exact', head: true }).gte('visited_at', monthAgo),
      supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(8),
      supabase.from('admin_activity').select('*').order('created_at', { ascending: false }).limit(10)
    ]);

    return {
      counts: {
        projects: projectsCount || 0,
        skills: skillsCount || 0,
        services: servicesCount || 0,
        newMessages: newMessagesCount || 0,
        videos: videosCount || 0,
        visits: visitsCount || 0
      },
      messages: recentMessages || [],
      activity: recentActivity || []
    };
  }

  return {
    counts: {
      projects: mockData.projects.length,
      skills: mockData.skills.length,
      services: mockData.services.length,
      newMessages: mockData.messages.filter((m) => m.status === 'new').length,
      videos: mockData.videos.length,
      visits: mockData.visits.length
    },
    messages: mockData.messages.slice(0, 8),
    activity: mockData.admin_activity.slice(0, 10)
  };
}

// Sauvegarde complète de la base de données
export async function getFullBackup(tablesList) {
  const backup = {};
  if (isConfigured) {
    for (const table of tablesList) {
      const { data } = await supabase.from(table).select('*');
      const rows = data || [];
      if (table === 'admins') rows.forEach((row) => delete row.password_hash);
      backup[table] = rows;
    }
    return backup;
  }

  for (const table of tablesList) {
    const list = Array.isArray(mockData[table]) ? [...mockData[table]] : [];
    if (table === 'admins') list.forEach((row) => delete row.password_hash);
    backup[table] = list;
  }
  return backup;
}

// Opérations génériques de ressources CRUD
export async function getTableRows(table, limit = 500) {
  if (isConfigured) {
    const { data, error } = await supabase.from(table).select('*').order('id', { ascending: false }).limit(limit);
    if (error) throw new Error(error.message);
    const rows = data || [];
    if (table === 'admins') rows.forEach((r) => delete r.password_hash);
    return rows;
  }
  const rows = Array.isArray(mockData[table]) ? [...mockData[table]] : [];
  if (table === 'admins') rows.forEach((r) => delete r.password_hash);
  return rows.reverse();
}

export async function insertTableRow(table, values) {
  if (isConfigured) {
    if (table === 'translations') {
      const { error } = await supabase.from('translations').upsert(values, { onConflict: 'translation_key,locale' });
      if (error) throw new Error(error.message);
      return { ok: true };
    }
    const { data, error } = await supabase.from(table).insert(values).select('id').single();
    if (error) throw new Error(error.message);
    return { id: data.id };
  }

  if (table === 'translations') {
    const existingIndex = mockData.translations.findIndex(
      (t) => t.translation_key === values.translation_key && t.locale === values.locale
    );
    if (existingIndex >= 0) mockData.translations[existingIndex] = { ...mockData.translations[existingIndex], ...values };
    else mockData.translations.push({ id: Date.now(), ...values });
    return { ok: true };
  }

  const id = Date.now();
  if (Array.isArray(mockData[table])) mockData[table].push({ id, ...values });
  return { id };
}

export async function updateTableRow(table, id, values) {
  if (isConfigured) {
    const { error } = await supabase.from(table).update(values).eq('id', id);
    if (error) throw new Error(error.message);
    return true;
  }

  if (table === 'settings') {
    mockData.settings = { ...mockData.settings, ...values };
    return true;
  }

  if (Array.isArray(mockData[table])) {
    const item = mockData[table].find((x) => String(x.id) === String(id));
    if (item) {
      Object.assign(item, values);
      return true;
    }
  }
  return false;
}

export async function deleteTableRow(table, id) {
  if (isConfigured) {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
  }

  if (Array.isArray(mockData[table])) {
    const index = mockData[table].findIndex((x) => String(x.id) === String(id));
    if (index >= 0) {
      mockData[table].splice(index, 1);
      return true;
    }
  }
  return false;
}

// Gestion des sessions avec Supabase ou fallback mémoire
export async function getSession(sessionId) {
  if (isConfigured) {
    try {
      const { data } = await supabase.from('sessions').select('data, expires').eq('session_id', sessionId).maybeSingle();
      if (!data || Number(data.expires) <= Math.floor(Date.now() / 1000)) {
        if (data) await supabase.from('sessions').delete().eq('session_id', sessionId);
        return null;
      }
      return JSON.parse(data.data);
    } catch {
      return null;
    }
  }

  const stored = mockData.sessions[sessionId];
  if (!stored || stored.expires <= Math.floor(Date.now() / 1000)) {
    delete mockData.sessions[sessionId];
    return null;
  }
  return JSON.parse(stored.data);
}

export async function setSession(sessionId, sessionData) {
  const expiry = sessionData.cookie?.expires ? new Date(sessionData.cookie.expires).getTime() : Date.now() + 7200000;
  const expires = Math.floor(expiry / 1000);
  const data = JSON.stringify(sessionData);

  if (isConfigured) {
    try {
      await supabase.from('sessions').upsert({ session_id: sessionId, expires, data }, { onConflict: 'session_id' });
    } catch (e) {
      console.warn('[Supabase Session] Upsert error:', e.message);
    }
    return;
  }

  mockData.sessions[sessionId] = { expires, data };
}

export async function destroySession(sessionId) {
  if (isConfigured) {
    try {
      await supabase.from('sessions').delete().eq('session_id', sessionId);
    } catch {}
    return;
  }
  delete mockData.sessions[sessionId];
}

export async function touchSession(sessionId, sessionData) {
  const expiry = sessionData.cookie?.expires ? new Date(sessionData.cookie.expires).getTime() : Date.now() + 7200000;
  const expires = Math.floor(expiry / 1000);

  if (isConfigured) {
    try {
      await supabase.from('sessions').update({ expires }).eq('session_id', sessionId);
    } catch {}
    return;
  }

  if (mockData.sessions[sessionId]) {
    mockData.sessions[sessionId].expires = expires;
  }
}
