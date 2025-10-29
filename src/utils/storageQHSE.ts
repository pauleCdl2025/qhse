import { Incident, Maintenance, Audit, Formation, DechetMedical, Risque, DocumentGED } from '../types/qhse';
import { supabaseService } from '../services/supabaseService';

// Wrapper pour compatibilité avec l'ancien code
export const qhseStorage = {
  // Incidents
  saveIncident: async (data: Incident): Promise<void> => {
    await supabaseService.saveIncident(data);
  },
  
  getAllIncidents: (): Incident[] => {
    // Sync pour compatibilité
    return supabaseService.getAllIncidentsSync();
  },

  // Maintenance
  saveMaintenance: async (data: Maintenance): Promise<void> => {
    await supabaseService.saveMaintenance(data);
  },
  
  getAllMaintenance: (): Maintenance[] => {
    return supabaseService.getAllMaintenanceSync();
  },

  // Audits
  saveAudit: async (data: Audit): Promise<void> => {
    await supabaseService.saveAudit(data);
  },
  
  getAllAudits: (): Audit[] => {
    return supabaseService.getAllAuditsSync();
  },

  // Formations
  saveFormation: async (data: Formation): Promise<void> => {
    await supabaseService.saveFormation(data);
  },
  
  getAllFormations: (): Formation[] => {
    return supabaseService.getAllFormationsSync();
  },

  // Déchets
  saveDechet: async (data: DechetMedical): Promise<void> => {
    await supabaseService.saveDechet(data);
  },
  
  getAllDechets: (): DechetMedical[] => {
    return supabaseService.getAllDechetsSync();
  },

  // Risques
  saveRisque: async (data: Risque): Promise<void> => {
    await supabaseService.saveRisque(data);
  },
  
  getAllRisques: (): Risque[] => {
    return supabaseService.getAllRisquesSync();
  },

  // GED
  saveDocument: async (data: DocumentGED): Promise<void> => {
    await supabaseService.saveDocument(data);
  },
  
  getAllDocuments: (): DocumentGED[] => {
    return supabaseService.getAllDocumentsSync();
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

