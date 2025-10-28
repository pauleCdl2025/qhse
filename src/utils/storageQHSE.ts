import { Incident, Maintenance, Audit, Formation, DechetMedical, Risque, DocumentGED } from '../types/qhse';

const STORAGE_KEYS = {
  incidents: 'qhse_incidents',
  maintenance: 'qhse_maintenance',
  audits: 'qhse_audits',
  formations: 'qhse_formations',
  dechets: 'qhse_dechets',
  risques: 'qhse_risques',
  ged: 'qhse_ged'
};

export const qhseStorage = {
  // Incidents
  saveIncident: (data: Incident): void => {
    const records = qhseStorage.getAllIncidents();
    records.push({ ...data, id: Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.incidents, JSON.stringify(records));
  },
  
  getAllIncidents: (): Incident[] => {
    const data = localStorage.getItem(STORAGE_KEYS.incidents);
    return data ? JSON.parse(data) : [];
  },

  // Maintenance
  saveMaintenance: (data: Maintenance): void => {
    const records = qhseStorage.getAllMaintenance();
    records.push({ ...data, id: Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.maintenance, JSON.stringify(records));
  },
  
  getAllMaintenance: (): Maintenance[] => {
    const data = localStorage.getItem(STORAGE_KEYS.maintenance);
    return data ? JSON.parse(data) : [];
  },

  // Audits
  saveAudit: (data: Audit): void => {
    const records = qhseStorage.getAllAudits();
    records.push({ ...data, id: Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.audits, JSON.stringify(records));
  },
  
  getAllAudits: (): Audit[] => {
    const data = localStorage.getItem(STORAGE_KEYS.audits);
    return data ? JSON.parse(data) : [];
  },

  // Formations
  saveFormation: (data: Formation): void => {
    const records = qhseStorage.getAllFormations();
    records.push({ ...data, id: Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.formations, JSON.stringify(records));
  },
  
  getAllFormations: (): Formation[] => {
    const data = localStorage.getItem(STORAGE_KEYS.formations);
    return data ? JSON.parse(data) : [];
  },

  // Déchets
  saveDechet: (data: DechetMedical): void => {
    const records = qhseStorage.getAllDechets();
    records.push({ ...data, id: Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.dechets, JSON.stringify(records));
  },
  
  getAllDechets: (): DechetMedical[] => {
    const data = localStorage.getItem(STORAGE_KEYS.dechets);
    return data ? JSON.parse(data) : [];
  },

  // Risques
  saveRisque: (data: Risque): void => {
    const records = qhseStorage.getAllRisques();
    records.push({ ...data, id: Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.risques, JSON.stringify(records));
  },
  
  getAllRisques: (): Risque[] => {
    const data = localStorage.getItem(STORAGE_KEYS.risques);
    return data ? JSON.parse(data) : [];
  },

  // GED
  saveDocument: (data: DocumentGED): void => {
    const records = qhseStorage.getAllDocuments();
    records.push({ ...data, id: Date.now() });
    localStorage.setItem(STORAGE_KEYS.ged, JSON.stringify(records));
  },
  
  getAllDocuments: (): DocumentGED[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ged);
    return data ? JSON.parse(data) : [];
  },

  // Statistiques globales
  getStats: () => {
    return {
      incidents: qhseStorage.getAllIncidents().length,
      maintenance: qhseStorage.getAllMaintenance().length,
      audits: qhseStorage.getAllAudits().length,
      formations: qhseStorage.getAllFormations().length,
      dechets: qhseStorage.getAllDechets().length,
      risques: qhseStorage.getAllRisques().length,
      documents: qhseStorage.getAllDocuments().length
    };
  }
};

