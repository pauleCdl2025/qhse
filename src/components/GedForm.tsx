import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentGED } from '../types/qhse';

export default function GedForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<DocumentGED>({
    titre: '',
    type: '',
    version: '1.0',
    statut: 'Brouillon',
    auteur: '',
    valideur: '',
    date_creation: '',
    date_approbation: '',
    fichier: '',
    mots_cles: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { supabaseService } = await import('../services/supabaseService');
      await supabaseService.saveDocument(formData);
      alert('✅ Enregistrement effectué avec succès!');
      navigate('/ged');
    } catch (error) {
      alert('❌ Erreur lors de l\'enregistrement');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">GED Documentaire QHSE</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-8">
            <label className="form-label">Titre du document *</label>
            <input type="text" className="form-control" value={formData.titre} onChange={(e) => setFormData(prev => ({...prev, titre: e.target.value}))} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Type *</label>
            <select className="form-select" value={formData.type} onChange={(e) => setFormData(prev => ({...prev, type: e.target.value}))} required>
              <option value="">Sélectionner...</option>
              <option value="Procédure">Procédure</option>
              <option value="Instruction">Instruction</option>
              <option value="Registre">Registre</option>
              <option value="Fiche de poste">Fiche de poste</option>
              <option value="Plan">Plan</option>
              <option value="Rapport">Rapport</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Version *</label>
            <input type="text" className="form-control" value={formData.version} onChange={(e) => setFormData(prev => ({...prev, version: e.target.value}))} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Statut *</label>
            <select className="form-select" value={formData.statut} onChange={(e) => setFormData(prev => ({...prev, statut: e.target.value as 'Brouillon' | 'En validation' | 'Approuvé' | 'Archivé'}))}>
              <option value="Brouillon">Brouillon</option>
              <option value="En validation">En validation</option>
              <option value="Approuvé">Approuvé</option>
              <option value="Archivé">Archivé</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Auteur *</label>
            <input type="text" className="form-control" value={formData.auteur} onChange={(e) => setFormData(prev => ({...prev, auteur: e.target.value}))} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Validateur</label>
            <input type="text" className="form-control" value={formData.valideur} onChange={(e) => setFormData(prev => ({...prev, valideur: e.target.value}))} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Date de création *</label>
            <input type="date" className="form-control" value={formData.date_creation} onChange={(e) => setFormData(prev => ({...prev, date_creation: e.target.value}))} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Date d'approbation</label>
            <input type="date" className="form-control" value={formData.date_approbation} onChange={(e) => setFormData(prev => ({...prev, date_approbation: e.target.value}))} />
          </div>
          <div className="col-12">
            <label className="form-label">Fichier (URL ou chemin)</label>
            <input type="text" className="form-control" value={formData.fichier} onChange={(e) => setFormData(prev => ({...prev, fichier: e.target.value}))} placeholder="Ex: /documents/procedure-qhse-v1.pdf" />
          </div>
          <div className="col-12">
            <label className="form-label">Mots-clés</label>
            <input type="text" className="form-control" value={formData.mots_cles} onChange={(e) => setFormData(prev => ({...prev, mots_cles: e.target.value}))} placeholder="Séparés par des virgules" />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Enregistrer</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/ged')}>Annuler</button>
          </div>
        </div>
      </form>
    </div>
  );
}

