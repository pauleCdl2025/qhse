# Système de Traçabilité HSE

Application web TypeScript/React pour la gestion de la traçabilité des équipements stérilisés et des pièces anatomiques.

## Fonctionnalités

### 1. Traçabilité – Stérilisation des Équipements
- Enregistrement complet du processus de stérilisation
- Suivi depuis la collecte jusqu'à la libération
- Enregistrement des paramètres de cycle (température, pression, durée)
- Vérification des indicateurs chimiques/biologiques
- Gestion des observations et anomalies

### 2. Traçabilité – Pièces Anatomiques
- Suivi complet des pièces anatomiques
- Génération automatique de références (format PA-YYYYMMDD-XXXX)
- Enregistrement du prélèvement, transport et réception
- Gestion des destinations (Laboratoire / Destruction)
- Système de recherche et filtrage

## Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

## Structure du Projet

```
hse/
├── src/
│   ├── components/          # Composants React
│   │   ├── EquipmentSterilizationForm.tsx
│   │   ├── SterilizationList.tsx
│   │   ├── AnatomicalPiecesForm.tsx
│   │   ├── AnatomicalPiecesList.tsx
│   │   └── AnatomicalPieceDetail.tsx
│   ├── types/               # Types TypeScript
│   │   └── index.ts
│   ├── utils/               # Utilitaires
│   │   └── storage.ts       # Service de gestion localStorage
│   ├── App.tsx              # Composant principal avec routing
│   ├── App.css
│   ├── main.tsx             # Point d'entrée
│   └── index.css
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Technologies Utilisées

- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **React Router** - Navigation
- **Bootstrap 5** - Framework CSS
- **Vite** - Build tool
- **localStorage** - Stockage des données

## Utilisation

### Navigation
L'application propose deux modules principaux accessibles via le menu :
1. **Stérilisation** - Gestion de la stérilisation des équipements
2. **Pièces Anatomiques** - Gestion de la traçabilité des pièces

### Création d'un Enregistrement
1. Cliquer sur "Nouvel enregistrement" dans le registre correspondant
2. Remplir les champs obligatoires (marqués avec *)
3. Cliquer sur "Enregistrer"

### Recherche et Filtrage
Dans le module Pièces Anatomiques :
- Recherche par référence, patient ou numéro de dossier
- Filtrage par destination
- Filtrage par plage de dates

## Types de Données

Les données sont stockées localement dans le navigateur (localStorage). Chaque enregistrement comprend :
- Date et heure de création
- Tous les champs du formulaire
- Statut de conformité (pour la stérilisation)
- Observations et anomalies

## Développement

### Ajouter un Nouveau Champ
1. Mettre à jour l'interface TypeScript dans `src/types/index.ts`
2. Ajouter le champ dans le composant formulaire correspondant
3. Mettre à jour la fonction de sauvegarde dans `src/utils/storage.ts`

### Personnalisation
Les styles peuvent être modifiés dans :
- `src/App.css` - Styles globaux
- `src/index.css` - Styles de base

## Licence

Ce projet est destiné à un usage interne dans un établissement de santé.

## Déploiement Netlify

1. Créez un site Netlify et connectez le repo.
2. Build command: `npm run build`  — Publish directory: `dist`
3. Variables d’environnement (tableau Settings > Environment):
   - `VITE_SUPABASE_URL` = `https://uehamaitijekflxpeuxj.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlaGFtYWl0aWpla2ZseHBldXhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NDQ2OTYsImV4cCI6MjA3NzIyMDY5Nn0.fDxXA9GiDrJZTPQdzsFhk6uoS7PgYzpC5wbLBdZn3Ck`

> Les variables doivent commencer par `VITE_` pour être exposées au client.

## Dev local

Créez un fichier `.env.local` à la racine:

```
VITE_SUPABASE_URL=https://uehamaitijekflxpeuxj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlaGFtYWl0aWpla2ZseHBldXhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NDQ2OTYsImV4cCI6MjA3NzIyMDY5Nn0.fDxXA9GiDrJZTPQdzsFhk6uoS7PgYzpC5wbLBdZn3Ck
```

Redémarrez `npm run dev` après modification des variables.

