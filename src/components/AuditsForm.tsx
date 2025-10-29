import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Audit } from '../types/qhse';

export default function AuditsForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Audit>({
    numero: '',
    type: 'Interne',
    date_audit: '',
    audite: '',
    auditeur: '',
    secteur: '',
    observations: '',
    conformites: 0,
    non_conformites: 0,
    plan_action: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { supabaseService } = await import('../services/supabaseService');
      await supabaseService.saveAudit(formData);
      alert('✅ Enregistrement effectué avec succès!');
      navigate('/audits');
    } catch (error) {
      alert('❌ Erreur lors de l\'enregistrement');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Audits & Inspections</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">N° audit *</label>
            <input type="text" className="form-control" value={formData.numero} onChange={(e) => setFormData(prev => ({...prev, numero: e.target.value}))} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Type *</label>
            <select className="form-select" value={formData.type} onChange={(e) => setFormData(prev => ({...prev, type: e.target.value as 'Interne' | 'Externe' | 'Fournisseur'}))}>
              <option value="Interne">Interne</option>
              <option value="Externe">Externe</option>
              <option value="Fournisseur">Fournisseur</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Date audit *</label>
            <input type="date" className="form-control" value={formData.date_audit} onChange={(e) => setFormData(prev => ({...prev, date_audit: e.target.value}))} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Audité (service/département) *</label>
            <select className="form-select" value={formData.audite} onChange={(e) => setFormData(prev => ({...prev, audite: e.target.value}))} required>
              <option value="">Sélectionner...</option>
              <option value="Bloc opératoire">Bloc opératoire</option>
              <option value="Service de chirurgie">Service de chirurgie</option>
              <option value="Urgences">Urgences</option>
              <option value="Médecine">Médecine</option>
              <option value="Réanimation">Réanimation</option>
              <option value="Radiologie">Radiologie</option>
              <option value="Laboratoire">Laboratoire</option>
              <option value="Blanchisserie">Blanchisserie</option>
              <option value="Stérilisation">Stérilisation</option>
              <option value="Pharmacie">Pharmacie</option>
              <option value="Direction">Direction</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Auditeur *</label>
            <input type="text" className="form-control" value={formData.auditeur} onChange={(e) => setFormData(prev => ({...prev, auditeur: e.target.value}))} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Secteur audité *</label>
            <select className="form-select" value={formData.secteur} onChange={(e) => setFormData(prev => ({...prev, secteur: e.target.value}))} required>
              <option value="">Sélectionner...</option>
              <option value="Qualité">Qualité</option>
              <option value="Hygiène">Hygiène</option>
              <option value="Sécurité">Sécurité</option>
              <option value="Environnement">Environnement</option>
              <option value="QHSE global">QHSE global</option>
              <option value="Procédures">Procédures</option>
              <option value="Tracabilité">Traçabilité</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Conformités</label>
            <input type="number" className="form-control" value={formData.conformites} onChange={(e) => setFormData(prev => ({...prev, conformites: parseInt(e.target.value)}))} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Non-conformités</label>
            <input type="number" className="form-control" value={formData.non_conformites} onChange={(e) => setFormData(prev => ({...prev, non_conformites: parseInt(e.target.value)}))} />
          </div>
          <div className="col-12">
            <label className="form-label">Observations *</label>
            <textarea className="form-control" rows={5} value={formData.observations} onChange={(e) => setFormData(prev => ({...prev, observations: e.target.value}))} required />
          </div>
          <div className="col-12">
            <label className="form-label">Plan d'action</label>
            <textarea className="form-control" rows={4} value={formData.plan_action} onChange={(e) => setFormData(prev => ({...prev, plan_action: e.target.value}))} />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Enregistrer</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/audits')}>Annuler</button>
          </div>
        </div>
      </form>
    </div>
  );
}

