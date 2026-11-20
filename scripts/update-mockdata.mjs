import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('server/src/db.js');
let content = fs.readFileSync(dbPath, 'utf8');

// Replace linkedin and github in settings
content = content.replace(
  "    linkedin: '',\r\n    github: '',",
  "    linkedin: 'https://linkedin.com/in/yves-yao',\r\n    github: 'https://github.com/0767064168',"
).replace(
  "    linkedin: '',\n    github: '',",
  "    linkedin: 'https://linkedin.com/in/yves-yao',\n    github: 'https://github.com/0767064168',"
);

// New enriched projects list
const enrichedProjectsStr = `  projects: [
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
  ],`;

const projectRegex = /  projects: \[\r?\n[\s\S]*?\r?\n  \],/;
content = content.replace(projectRegex, enrichedProjectsStr);

fs.writeFileSync(dbPath, content, 'utf8');
console.log('✅ server/src/db.js mis à jour avec les études de cas enrichies !');
