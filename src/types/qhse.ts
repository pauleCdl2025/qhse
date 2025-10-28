// Types pour tous les modules QHSE

export interface Incident {
  id?: number;
  numero: string;
  date_incident: string;
  type: 'Incident' | 'Accident' | 'AES';
  classification: string;
  gravite: string;
  lieu: string;
  description: string;
  temoins?: string;
  actions_correctives?: string;
  actions_preventives?: string;
  responsable_suivi: string;
  statut: 'En cours' | 'Résolu' | 'Clôturé';
  created_at?: string;
  updated_at?: string;
}

export interface Maintenance {
  id?: number;
  equipement: string;
  type: 'Préventive' | 'Corrective' | 'Calibration';
  date_intervention: string;
  technicien: string;
  duree: number;
  observations: string;
  prochaine_echeance?: string;
  cout?: number;
  statut: 'Planifié' | 'En cours' | 'Terminé' | 'En retard';
  created_at?: string;
}

export interface DocumentGED {
  id?: number;
  titre: string;
  type: string;
  version: string;
  statut: 'Brouillon' | 'En validation' | 'Approuvé' | 'Archivé';
  auteur: string;
  valideur?: string;
  date_creation: string;
  date_approbation?: string;
  fichier?: string;
  mots_cles?: string;
  created_at?: string;
}

export interface Audit {
  id?: number;
  numero: string;
  type: 'Interne' | 'Externe' | 'Fournisseur';
  date_audit: string;
  audite: string;
  auditeur: string;
  secteur: string;
  observations: string;
  conformites: number;
  non_conformites: number;
  plan_action: string;
  created_at?: string;
}

export interface Formation {
  id?: number;
  titre: string;
  type: string;
  formateur: string;
  date_formation: string;
  participants: string[];
  duree: number;
  objectifs: string;
  evaluation: string;
  certifie: boolean;
  prochaine_session?: string;
  created_at?: string;
}

export interface DechetMedical {
  id?: number;
  numero_collecte: string;
  service: string;
  type_dechet: string;
  quantite: number;
  date_collecte: string;
  filiere: string;
  transporteur: string;
  destination: string;
  observation?: string;
  created_at?: string;
}

export interface Risque {
  id?: number;
  designation: string;
  categorie: string;
  probabilite: number;
  gravite: number;
  criticite: number;
  mesures_prevention: string;
  mesures_mitigation: string;
  responsable: string;
  statut: 'Actif' | 'Mitigé' | 'Résolu';
  created_at?: string;
}

