-- ============================================
-- Script SQL pour créer toutes les tables QHSE
-- Exécutez ce script dans l'éditeur SQL de Supabase
-- ============================================

-- 1. Table INCIDENTS
CREATE TABLE IF NOT EXISTS incidents (
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

-- 2. Table MAINTENANCE
CREATE TABLE IF NOT EXISTS maintenance (
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

-- 3. Table AUDITS
CREATE TABLE IF NOT EXISTS audits (
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

-- 4. Table FORMATIONS
CREATE TABLE IF NOT EXISTS formations (
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

-- 5. Table DÉCHETS MÉDICAUX
CREATE TABLE IF NOT EXISTS dechets_medicaux (
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

-- 6. Table RISQUES
CREATE TABLE IF NOT EXISTS risques (
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

-- 7. Table GED DOCUMENTS
CREATE TABLE IF NOT EXISTS ged_documents (
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

-- 8. Table LINGE
CREATE TABLE IF NOT EXISTS linge (
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

-- 9. Table STÉRILISATION
CREATE TABLE IF NOT EXISTS sterilization (
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

-- 10. Table PIÈCES ANATOMIQUES
CREATE TABLE IF NOT EXISTS anatomical_pieces (
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

-- ============================================
-- Désactivation RLS (pour développement)
-- À commenter/décommenter selon vos besoins
-- ============================================

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

-- ============================================
-- Création d'index pour améliorer les performances
-- ============================================

CREATE INDEX IF NOT EXISTS idx_incidents_numero ON incidents(numero);
CREATE INDEX IF NOT EXISTS idx_incidents_date ON incidents(date_incident);
CREATE INDEX IF NOT EXISTS idx_maintenance_equipement ON maintenance(equipement);
CREATE INDEX IF NOT EXISTS idx_maintenance_date ON maintenance(date_intervention);
CREATE INDEX IF NOT EXISTS idx_linge_code ON linge(code_linge);
CREATE INDEX IF NOT EXISTS idx_anatomical_ref ON anatomical_pieces(ref);
CREATE INDEX IF NOT EXISTS idx_sterilization_registration ON sterilization(registration_number);

