# YY — Yves Yao | Portfolio React + Tailwind CSS + Express & Supabase

Portfolio professionnel développé avec **React 18**, **Tailwind CSS**, **Vite**, **Express** et **Supabase** (PostgreSQL cloud).

---

## Nouveautés

- **Base de données Supabase** : Migration de MySQL vers Supabase via `@supabase/supabase-js`. Script SQL complet prêt pour le SQL Editor Supabase disponible dans `database/supabase_schema.sql`.
- **Boutons Ultra Pro avec Tailwind CSS** : Tous les boutons (CTA Hero, Filtres, Formulaire de contact, Téléchargement de CV, Thème/Langue, WhatsApp flottant et boutons d'Administration) ont été modernisés avec Tailwind CSS (gradients subtils, effets de survol réactifs, glow et transitions fluides).

---

## Prérequis

- Node.js 20+ et npm
- Un compte / projet [Supabase](https://supabase.com) (gratuit)

---

## Configuration de Supabase

1. Créez un projet sur [Supabase](https://supabase.com).
2. Rendez-vous dans le **SQL Editor** de votre projet Supabase.
3. Copiez et exécutez le script contenu dans [`database/supabase_schema.sql`](file:///c:/Users/hp/Documents/portfolio-yvesdevweb/database/supabase_schema.sql). Ce script crée toutes les tables (`settings`, `projects`, `skills`, `services`, `media_videos`, `testimonials`, `project_images`, `translations`, `messages`, `admins`, `sessions`, `visits`, etc.) et insère les données initiales.
4. Rendez-vous dans **Project Settings > API** sur Supabase et récupérez :
   - `Project URL`
   - `service_role` (clé secrète pour le serveur Express) ou `anon` (clé publique).

---

## Variables d'environnement

Copiez `server/.env.example` vers `server/.env` :

```env
PORT=3000
APP_URL=http://localhost:3000
SESSION_SECRET=votre-cle-secrete-aleatoire-tres-longue
COOKIE_SECURE=false

# Supabase
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_ROLE_KEY=votre-cle-service-role-supabase
```

> **Note :** Si les clés Supabase ne sont pas encore renseignées, le serveur Express démarre automatiquement en mode local/démonstration sans planter, avec affichage d'un rappel explicatif.

---

## Démarrage en développement

Pour lancer à la fois le client Vite et l'API Express :

```powershell
npm run dev
```

- Frontend : `http://localhost:5173`
- Backend API : `http://localhost:3000`

---

## Construction pour la production

```powershell
npm run build
npm start
```
