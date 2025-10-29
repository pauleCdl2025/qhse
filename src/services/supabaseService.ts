import { supabase } from '../lib/supabaseClient';
import { Incident, Maintenance, Audit, Formation, DechetMedical, Risque, DocumentGED } from '../types/qhse';
import { SterilizationFormData, AnatomicalPiece } from '../types';
import { LingeTracking } from '../types';

// Service Supabase avec fallback localStorage
export const supabaseService = {
  // ============ INCIDENTS ============
  async saveIncident(data: Incident): Promise<Incident> {
    try {
      const { data: result, error } = await supabase
        .from('incidents')
        .insert([{ ...data, created_at: new Date().toISOString() }])
        .select()
        .single();
      
      if (error) throw error;
      return result;
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      // Fallback localStorage
      const records = supabaseService.getAllIncidentsSync();
      const newRecord = { ...data, id: Date.now(), created_at: new Date().toISOString() };
      records.push(newRecord);
      localStorage.setItem('qhse_incidents', JSON.stringify(records));
      return newRecord;
    }
  },

  async getAllIncidents(): Promise<Incident[]> {
    try {
      const { data, error } = await supabase
        .from('incidents')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      return this.getAllIncidentsSync();
    }
  },

  getAllIncidentsSync(): Incident[] {
    const data = localStorage.getItem('qhse_incidents');
    return data ? JSON.parse(data) : [];
  },

  async deleteIncident(id: number): Promise<void> {
    try {
      const { error } = await supabase
        .from('incidents')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      const records = this.getAllIncidentsSync();
      const updated = records.filter((r: Incident) => r.id !== id);
      localStorage.setItem('qhse_incidents', JSON.stringify(updated));
    }
  },

  // ============ MAINTENANCE ============
  async saveMaintenance(data: Maintenance): Promise<Maintenance> {
    try {
      const { data: result, error } = await supabase
        .from('maintenance')
        .insert([{ ...data, created_at: new Date().toISOString() }])
        .select()
        .single();
      
      if (error) throw error;
      return result;
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      const records = this.getAllMaintenanceSync();
      const newRecord = { ...data, id: Date.now(), created_at: new Date().toISOString() };
      records.push(newRecord);
      localStorage.setItem('qhse_maintenance', JSON.stringify(records));
      return newRecord;
    }
  },

  async getAllMaintenance(): Promise<Maintenance[]> {
    try {
      const { data, error } = await supabase
        .from('maintenance')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      return this.getAllMaintenanceSync();
    }
  },

  getAllMaintenanceSync(): Maintenance[] {
    const data = localStorage.getItem('qhse_maintenance');
    return data ? JSON.parse(data) : [];
  },

  // ============ AUDITS ============
  async saveAudit(data: Audit): Promise<Audit> {
    try {
      const { data: result, error } = await supabase
        .from('audits')
        .insert([{ ...data, created_at: new Date().toISOString() }])
        .select()
        .single();
      
      if (error) throw error;
      return result;
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      const records = this.getAllAuditsSync();
      const newRecord = { ...data, id: Date.now(), created_at: new Date().toISOString() };
      records.push(newRecord);
      localStorage.setItem('qhse_audits', JSON.stringify(records));
      return newRecord;
    }
  },

  async getAllAudits(): Promise<Audit[]> {
    try {
      const { data, error } = await supabase
        .from('audits')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      return this.getAllAuditsSync();
    }
  },

  getAllAuditsSync(): Audit[] {
    const data = localStorage.getItem('qhse_audits');
    return data ? JSON.parse(data) : [];
  },

  // ============ FORMATIONS ============
  async saveFormation(data: Formation): Promise<Formation> {
    try {
      const { data: result, error } = await supabase
        .from('formations')
        .insert([{ ...data, created_at: new Date().toISOString() }])
        .select()
        .single();
      
      if (error) throw error;
      return result;
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      const records = this.getAllFormationsSync();
      const newRecord = { ...data, id: Date.now(), created_at: new Date().toISOString() };
      records.push(newRecord);
      localStorage.setItem('qhse_formations', JSON.stringify(records));
      return newRecord;
    }
  },

  async getAllFormations(): Promise<Formation[]> {
    try {
      const { data, error } = await supabase
        .from('formations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      return this.getAllFormationsSync();
    }
  },

  getAllFormationsSync(): Formation[] {
    const data = localStorage.getItem('qhse_formations');
    return data ? JSON.parse(data) : [];
  },

  // ============ DÉCHETS ============
  async saveDechet(data: DechetMedical): Promise<DechetMedical> {
    try {
      const { data: result, error } = await supabase
        .from('dechets_medicaux')
        .insert([{ ...data, created_at: new Date().toISOString() }])
        .select()
        .single();
      
      if (error) throw error;
      return result;
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      const records = this.getAllDechetsSync();
      const newRecord = { ...data, id: Date.now(), created_at: new Date().toISOString() };
      records.push(newRecord);
      localStorage.setItem('qhse_dechets', JSON.stringify(records));
      return newRecord;
    }
  },

  async getAllDechets(): Promise<DechetMedical[]> {
    try {
      const { data, error } = await supabase
        .from('dechets_medicaux')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      return this.getAllDechetsSync();
    }
  },

  getAllDechetsSync(): DechetMedical[] {
    const data = localStorage.getItem('qhse_dechets');
    return data ? JSON.parse(data) : [];
  },

  // ============ RISQUES ============
  async saveRisque(data: Risque): Promise<Risque> {
    try {
      const { data: result, error } = await supabase
        .from('risques')
        .insert([{ ...data, created_at: new Date().toISOString() }])
        .select()
        .single();
      
      if (error) throw error;
      return result;
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      const records = this.getAllRisquesSync();
      const newRecord = { ...data, id: Date.now(), created_at: new Date().toISOString() };
      records.push(newRecord);
      localStorage.setItem('qhse_risques', JSON.stringify(records));
      return newRecord;
    }
  },

  async getAllRisques(): Promise<Risque[]> {
    try {
      const { data, error } = await supabase
        .from('risques')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      return this.getAllRisquesSync();
    }
  },

  getAllRisquesSync(): Risque[] {
    const data = localStorage.getItem('qhse_risques');
    return data ? JSON.parse(data) : [];
  },

  // ============ GED DOCUMENTS ============
  async saveDocument(data: DocumentGED): Promise<DocumentGED> {
    try {
      const { data: result, error } = await supabase
        .from('ged_documents')
        .insert([data])
        .select()
        .single();
      
      if (error) throw error;
      return result;
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      const records = this.getAllDocumentsSync();
      const newRecord = { ...data, id: Date.now() };
      records.push(newRecord);
      localStorage.setItem('qhse_ged', JSON.stringify(records));
      return newRecord;
    }
  },

  async getAllDocuments(): Promise<DocumentGED[]> {
    try {
      const { data, error } = await supabase
        .from('ged_documents')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      return this.getAllDocumentsSync();
    }
  },

  getAllDocumentsSync(): DocumentGED[] {
    const data = localStorage.getItem('qhse_ged');
    return data ? JSON.parse(data) : [];
  },

  // ============ LINGE ============
  async saveLinge(data: LingeTracking): Promise<LingeTracking> {
    try {
      const { data: result, error } = await supabase
        .from('linge')
        .insert([{ ...data, created_at: new Date().toISOString() }])
        .select()
        .single();
      
      if (error) throw error;
      return result;
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      const records = this.getAllLingeSync();
      const newRecord = { ...data, id: Date.now(), created_at: new Date().toISOString() };
      records.push(newRecord);
      localStorage.setItem('linge_tracking', JSON.stringify(records));
      return newRecord;
    }
  },

  async getAllLinge(): Promise<LingeTracking[]> {
    try {
      const { data, error } = await supabase
        .from('linge')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      return this.getAllLingeSync();
    }
  },

  getAllLingeSync(): LingeTracking[] {
    const data = localStorage.getItem('linge_tracking');
    return data ? JSON.parse(data) : [];
  },

  // ============ STÉRILISATION ============
  async saveSterilization(data: SterilizationFormData): Promise<any> {
    try {
      const { data: result, error } = await supabase
        .from('sterilization')
        .insert([{ ...data, created_at: new Date().toISOString() }])
        .select()
        .single();
      
      if (error) throw error;
      return result;
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      const records = this.getAllSterilizationSync();
      const newRecord = { ...data, id: Date.now(), timestamp: new Date().toISOString() };
      records.push(newRecord);
      localStorage.setItem('sterilization_records', JSON.stringify(records));
      return newRecord;
    }
  },

  async getAllSterilization(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('sterilization')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      return this.getAllSterilizationSync();
    }
  },

  getAllSterilizationSync(): any[] {
    const data = localStorage.getItem('sterilization_records');
    return data ? JSON.parse(data) : [];
  },

  // ============ PIÈCES ANATOMIQUES ============
  async saveAnatomical(data: AnatomicalPiece): Promise<AnatomicalPiece> {
    try {
      if (data.id) {
        // Update
        const { data: result, error } = await supabase
          .from('anatomical_pieces')
          .update({ ...data, updated_at: new Date().toISOString() })
          .eq('id', data.id)
          .select()
          .single();
        
        if (error) throw error;
        return result;
      } else {
        // Insert
        const { data: result, error } = await supabase
          .from('anatomical_pieces')
          .insert([{ ...data, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
          .select()
          .single();
        
        if (error) throw error;
        return result;
      }
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      const records = this.getAllAnatomicalSync();
      const timestamp = new Date().toISOString();
      if (data.id) {
        const index = records.findIndex(r => r.id === data.id);
        if (index !== -1) {
          records[index] = { ...data, updated_at: timestamp };
        }
      } else {
        records.push({ ...data, created_at: timestamp, updated_at: timestamp });
      }
      localStorage.setItem('anatomical_records', JSON.stringify(records));
      return data;
    }
  },

  async getAllAnatomical(): Promise<AnatomicalPiece[]> {
    try {
      const { data, error } = await supabase
        .from('anatomical_pieces')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Supabase error, fallback to localStorage:', error);
      return this.getAllAnatomicalSync();
    }
  },

  getAllAnatomicalSync(): AnatomicalPiece[] {
    const data = localStorage.getItem('anatomical_records');
    return data ? JSON.parse(data) : [];
  },

  // ============ STATISTIQUES ============
  async getStats() {
    try {
      const [incidents, maintenance, audits, formations, dechets, risques, documents] = await Promise.all([
        this.getAllIncidents(),
        this.getAllMaintenance(),
        this.getAllAudits(),
        this.getAllFormations(),
        this.getAllDechets(),
        this.getAllRisques(),
        this.getAllDocuments()
      ]);

      return {
        incidents: incidents.length,
        maintenance: maintenance.length,
        audits: audits.length,
        formations: formations.length,
        dechets: dechets.length,
        risques: risques.length,
        documents: documents.length
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      // Fallback to sync
      return {
        incidents: this.getAllIncidentsSync().length,
        maintenance: this.getAllMaintenanceSync().length,
        audits: this.getAllAuditsSync().length,
        formations: this.getAllFormationsSync().length,
        dechets: this.getAllDechetsSync().length,
        risques: this.getAllRisquesSync().length,
        documents: this.getAllDocumentsSync().length
      };
    }
  }
};

