# Tables Supabase Requises

Ce fichier liste toutes les tables nécessaires pour l'application QHSE. Vous devez créer ces tables dans votre projet Supabase.

## Tables QHSE

### 1. `incidents`
Table pour la gestion des incidents/accidents/AES.

```sql
CREATE TABLE incidents (
  id BIGSERIAL PRIMARY KEY,
  numero TEXT NOT NULL,
  date_incident TIMESTAMPTZ NOT NULL,
  type TEXT NOT NULL,
  classification TEXT,
  gravite TEXT NOT NULL,
  lieu TEXT NOT NULL,
  description TEXT,
  actions_correctives TEXT,
  actions_preventives TEXT,
  responsable_suivi TEXT,
  statut TEXT NOT NULL DEFAULT 'En cours',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. `maintenance`
Table pour le suivi maintenance & biomédical.

```sql
CREATE TABLE maintenance (
  id BIGSERIAL PRIMARY KEY,
  equipement TEXT NOT NULL,
  type TEXT NOT NULL,
  date_intervention TIMESTAMPTZ NOT NULL,
  technicien TEXT NOT NULL,
  duree INTEGER,
  observation TEXT,
  cout DECIMAL(10,2),
  prochaine_echeance DATE,
  statut TEXT NOT NULL DEFAULT 'Planifié',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3. `audits`
Table pour les audits & inspections.

```sql
CREATE TABLE audits (
  id BIGSERIAL PRIMARY KEY,
  reference TEXT NOT NULL,
  type TEXT NOT NULL,
  audite TEXT NOT NULL,
  secteur TEXT NOT NULL,
  date_audit DATE NOT NULL,
  auditeur TEXT NOT NULL,
  conformites INTEGER DEFAULT 0,
  non_conformites INTEGER DEFAULT 0,
  plan_action TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. `formations`
Table pour les formations & compétences.

```sql
CREATE TABLE formations (
  id BIGSERIAL PRIMARY KEY,
  theme TEXT NOT NULL,
  type TEXT NOT NULL,
  formateur TEXT NOT NULL,
  date_formation DATE NOT NULL,
  duree INTEGER,
  participants TEXT[],
  certifie BOOLEAN DEFAULT false,
  prochaine_session DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5. `dechets_medicaux`
Table pour le suivi des déchets médicaux.

```sql
CREATE TABLE dechets_medicaux (
  id BIGSERIAL PRIMARY KEY,
  service TEXT NOT NULL,
  type_dechet TEXT NOT NULL,
  quantite DECIMAL(10,2) NOT NULL,
  unite TEXT NOT NULL,
  filiere TEXT NOT NULL,
  date_collecte DATE NOT NULL,
  transporteur TEXT,
  destination TEXT,
  observation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 6. `risques`
Table pour la gestion des risques.

```sql
CREATE TABLE risques (
  id BIGSERIAL PRIMARY KEY,
  identification TEXT NOT NULL,
  description TEXT NOT NULL,
  probabilite INTEGER NOT NULL,
  gravite INTEGER NOT NULL,
  criticite INTEGER GENERATED ALWAYS AS (probabilite * gravite) STORED,
  mesures_prev TEXT,
  mesures_corr TEXT,
  responsable TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 7. `ged_documents`
Table pour la GED documentaire QHSE.

```sql
CREATE TABLE ged_documents (
  id BIGSERIAL PRIMARY KEY,
  titre TEXT NOT NULL,
  type_document TEXT NOT NULL,
  numero TEXT NOT NULL,
  version TEXT,
  date_creation DATE,
  auteur TEXT,
  date_approbation DATE,
  statut TEXT NOT NULL DEFAULT 'Brouillon',
  fichier TEXT,
  mots_cles TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 8. `linge`
Table pour la traçabilité du linge.

```sql
CREATE TABLE linge (
  id BIGSERIAL PRIMARY KEY,
  centre TEXT NOT NULL,
  service TEXT NOT NULL,
  item TEXT NOT NULL,
  date_traitement DATE NOT NULL,
  seq_jour INTEGER NOT NULL,
  code_linge TEXT NOT NULL UNIQUE,
  type_linge TEXT NOT NULL,
  etat_recu TEXT NOT NULL,
  etat_sorti TEXT NOT NULL,
  responsable TEXT,
  observations TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Tables de traçabilité

### 9. `sterilization`
Table pour la stérilisation des équipements.

```sql
CREATE TABLE sterilization (
  id BIGSERIAL PRIMARY KEY,
  registration_number TEXT NOT NULL,
  collection_date_time TIMESTAMPTZ,
  origin_service TEXT,
  equipment_type TEXT,
  quantity_collected INTEGER,
  collector_name TEXT,
  material_condition TEXT,
  washing_date_time TIMESTAMPTZ,
  washer_name TEXT,
  disinfectant_used TEXT,
  washing_observation TEXT,
  cycle_type TEXT,
  autoclave_number TEXT,
  cycle_parameters TEXT,
  cycle_result TEXT,
  sterilizer_name TEXT,
  sterilization_end_date_time TIMESTAMPTZ,
  indicator_verification TEXT,
  release_by_name TEXT,
  release_date_time TIMESTAMPTZ,
  general_observations TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 10. `anatomical_pieces`
Table pour les pièces anatomiques.

```sql
CREATE TABLE anatomical_pieces (
  id BIGSERIAL PRIMARY KEY,
  ref TEXT NOT NULL UNIQUE,
  patient_identite TEXT NOT NULL,
  dossier_num TEXT NOT NULL,
  prelevement_date DATE NOT NULL,
  prelevement_heure TIME NOT NULL,
  nature_prelevement TEXT NOT NULL,
  service_prelevement TEXT NOT NULL,
  medecin_prescripteur TEXT,
  transport_date DATE,
  transport_heure TIME,
  transporteur TEXT,
  conditionnement TEXT,
  temperature_transport TEXT,
  reception_date DATE,
  reception_heure TIME,
  receveur TEXT,
  etat_reception TEXT,
  destination TEXT NOT NULL,
  laboratoire_nom TEXT,
  laboratoire_adresse TEXT,
  destruction_date DATE,
  destruction_heure TIME,
  destruction_methode TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Configuration des politiques RLS (Row Level Security)

Par défaut, Supabase active le RLS. Si vous avez besoin d'accès public (pour développement), vous pouvez désactiver le RLS ou créer des politiques appropriées :

```sql
-- Exemple pour désactiver RLS (développement uniquement)
ALTER TABLE incidents DISABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance DISABLE ROW LEVEL SECURITY;
ALTER TABLE audits DISABLE ROW LEVEL SECURITY;
ALTER TABLE formations DISABLE ROW LEVEL SECURITY;
ALTER TABLE dechets_medicaux DISABLE ROW LEVEL SECURITY;
ALTER TABLE risques DISABLE ROW LEVEL SECURITY;
ALTER TABLE ged_documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE linge DISABLE ROW LEVEL SECURITY;
ALTER TABLE sterilization DISABLE ROW LEVEL SECURITY;
ALTER TABLE anatomical_pieces DISABLE ROW LEVEL SECURITY;
```

Ou créer des politiques pour permettre l'accès public :

```sql
-- Exemple de politique pour permettre tous les accès (développement uniquement)
CREATE POLICY "Enable all operations for all users" ON incidents
FOR ALL USING (true) WITH CHECK (true);
-- Répéter pour chaque table...
```

## Notes importantes

1. **Types de données** : Les champs TEXT peuvent être modifiés en VARCHAR avec des limites si nécessaire.
2. **Indexes** : Vous pouvez ajouter des index sur les colonnes fréquemment recherchées (ex: `numero`, `ref`, `code_linge`).
3. **Unicité** : Certaines colonnes ont la contrainte UNIQUE (ex: `code_linge`, `ref`).
4. **Dates** : Utilisez TIMESTAMPTZ pour les horodatages avec fuseau horaire.
5. **Fallback** : L'application utilise localStorage comme fallback si Supabase n'est pas accessible.

## Commandes SQL complètes

Tous les CREATE TABLE ci-dessus peuvent être exécutés dans l'éditeur SQL de votre dashboard Supabase.

