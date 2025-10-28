import { SterilizationFormData, AnatomicalPiece } from '../types';

const STERILIZATION_KEY = 'sterilization_records';
const ANATOMICAL_KEY = 'anatomical_records';

export const storageService = {
  // Sterilization records
  saveSterilization: (data: SterilizationFormData): void => {
    const records = storageService.getAllSterilization();
    records.push({ ...data, id: Date.now(), timestamp: new Date().toISOString() });
    localStorage.setItem(STERILIZATION_KEY, JSON.stringify(records));
  },

  getAllSterilization: (): any[] => {
    const data = localStorage.getItem(STERILIZATION_KEY);
    return data ? JSON.parse(data) : [];
  },

  getSterilizationById: (id: number): any => {
    const records = storageService.getAllSterilization();
    return records.find(r => r.id === id);
  },

  // Anatomical pieces records
  saveAnatomical: (data: AnatomicalPiece): void => {
    const records = storageService.getAllAnatomical();
    const timestamp = new Date().toISOString();
    if (data.id) {
      // Update existing
      const index = records.findIndex(r => r.id === data.id);
      if (index !== -1) {
        records[index] = { ...data, updated_at: timestamp };
      }
    } else {
      // Create new
      const newRecord = { ...data, created_at: timestamp, updated_at: timestamp };
      records.push(newRecord);
    }
    localStorage.setItem(ANATOMICAL_KEY, JSON.stringify(records));
  },

  getAllAnatomical: (): AnatomicalPiece[] => {
    const data = localStorage.getItem(ANATOMICAL_KEY);
    return data ? JSON.parse(data) : [];
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

