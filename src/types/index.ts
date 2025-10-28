// Equipment Sterilization Types
export interface SterilizationFormItem {
  type: 'SHORT_ANSWER' | 'DATETIME' | 'MULTIPLE_CHOICE' | 'NUMBER' | 'PARAGRAPH';
  title: string;
  required: boolean;
  choices?: string[];
}

export interface SterilizationFormData {
  registrationNumber: string;
  collectionDateTime: string;
  originService: string;
  equipmentType: string;
  quantityCollected: number;
  collectorName: string;
  materialCondition: string;
  washingDateTime: string;
  washerName: string;
  disinfectantUsed: string;
  washingObservation?: string;
  cycleType: string;
  autoclaveNumber: string;
  cycleParameters: string;
  cycleResult: string;
  sterilizerName: string;
  sterilizationEndDateTime: string;
  indicatorVerification: string;
  releaseByName: string;
  releaseDateTime: string;
  generalObservations?: string;
}

export interface AnatomicalPieceFormData {
  ref: string;
  date_heure_prelevement: string;
  service: string;
  patient_identite: string;
  dossier_num: string;
  type_piece: string;
  conditionnement: string;
  operateur_preleveur: string;
  destination: 'Laboratoire' | 'Destruction';
  date_heure_sortie_bloc: string;
  transporteur: string;
  reception_signature: string;
  reference_resultat: string;
  observations?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AnatomicalPiece extends AnatomicalPieceFormData {
  id?: number;
}

