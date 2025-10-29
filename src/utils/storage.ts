import { SterilizationFormData, AnatomicalPiece } from '../types';
import { supabaseService } from '../services/supabaseService';

// Wrapper pour compatibilité avec ancien code
export const storageService = {
  // Sterilization records
  saveSterilization: async (data: SterilizationFormData): Promise<void> => {
    await supabaseService.saveSterilization(data);
  },

  getAllSterilization: (): any[] => {
    return supabaseService.getAllSterilizationSync();
  },

  getSterilizationById: (id: number): any => {
    const records = storageService.getAllSterilization();
    return records.find(r => r.id === id);
  },

  // Anatomical pieces records
  saveAnatomical: async (data: AnatomicalPiece): Promise<void> => {
    await supabaseService.saveAnatomical(data);
  },

  getAllAnatomical: (): AnatomicalPiece[] => {
    return supabaseService.getAllAnatomicalSync();
  },

  getAnatomicalByRef: (ref: string): AnatomicalPiece | undefined => {
    const records = storageService.getAllAnatomical();
    return records.find(r => r.ref === ref);
  },

  filterAnatomical: (filters: {
    q?: string;
    destination?: string;
    date_from?: string;
    date_to?: string;
  }): AnatomicalPiece[] => {
    let records = storageService.getAllAnatomical();

    if (filters.q) {
      const query = filters.q.toLowerCase();
      records = records.filter(r =>
        r.ref.toLowerCase().includes(query) ||
        r.patient_identite.toLowerCase().includes(query) ||
        r.dossier_num.toLowerCase().includes(query)
      );
    }

    if (filters.destination) {
      records = records.filter(r => r.destination === filters.destination);
    }

    if (filters.date_from) {
      records = records.filter(r => r.created_at && r.created_at >= filters.date_from!);
    }

    if (filters.date_to) {
      records = records.filter(r => r.created_at && r.created_at <= filters.date_to!);
    }

    return records;
  },

  generateAnatomicalRef: (): string => {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const records = storageService.getAllAnatomical();
    const todayRecords = records.filter(r => r.ref?.startsWith(`PA-${today}-`));
    const seq = todayRecords.length + 1;
    return `PA-${today}-${seq.toString().padStart(4, '0')}`;
  }
};

