# Senelectro — Plateforme de vente auto & électroménager

## Stack technique
- **Frontend** : Next.js 14 + TypeScript + Tailwind CSS
- **Backend** : API Routes Next.js
- **Base de données** : PostgreSQL (Railway)
- **Stockage photos** : Cloudinary
- **Déploiement** : Vercel

## Installation

```bash
npm install
```

## Configuration

Remplis les variables dans `.env.local` :
- `DATABASE_URL` — URL PostgreSQL depuis Railway
- `JWT_SECRET` — clé secrète pour les tokens
- `CLOUDINARY_*` — clés depuis cloudinary.com

## Base de données

Exécute le schéma SQL dans Railway :
```bash
psql $DATABASE_URL -f src/lib/schema.sql
```

## Lancer en développement

```bash
npm run dev
```

## Déploiement

1. Push sur GitHub
2. Connecter le repo à Vercel
3. Ajouter les variables d'environnement sur Vercel
4. Changer les DNS de senelectro.com vers Vercel

## Panel Admin

Accessible sur `/admin/login`
- Email : admin@senelectro.com
- Mot de passe : admin123 (à changer en production !)
