import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Risque } from '../types/qhse';

export default function RisquesForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Risque>({
    designation: '',
    categorie: '',
    probabilite: 1,
    gravite: 1,
    criticite: 0,
    mesures_prevention: '',
    mesures_mitigation: '',
    responsable: '',
    statut: 'Actif'
  });

  // Calcul automatique de la criticité
  const calculateCriticite = (prob: number, grav: number) => {
    return prob * grav;
  };

  const handleProbOrGravChange = (field: 'probabilite' | 'gravite', value: number) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      const criticite = calculateCriticite(
        field === 'probabilite' ? value : newData.probabilite,
        field === 'gravite' ? value : newData.gravite
      );
      return { ...newData, criticite };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { supabaseService } = await import('../services/supabaseService');
      await supabaseService.saveRisque(formData);
      alert('✅ Enregistrement effectué avec succès!');
      navigate('/risques');
    } catch (error) {
      alert('❌ Erreur lors de l\'enregistrement');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Gestion des Risques</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Désignation du risque *</label>
            <input type="text" className="form-control" value={formData.designation} onChange={(e) => setFormData(prev => ({...prev, designation: e.target.value}))} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Catégorie *</label>
            <input type="text" className="form-control" value={formData.categorie} onChange={(e) => setFormData(prev => ({...prev, categorie: e.target.value}))} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Probabilité (1-5) *</label>
            <input type="number" min="1" max="5" className="form-control" value={formData.probabilite} onChange={(e) => handleProbOrGravChange('probabilite', parseInt(e.target.value))} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Gravité (1-5) *</label>
            <input type="number" min="1" max="5" className="form-control" value={formData.gravite} onChange={(e) => handleProbOrGravChange('gravite', parseInt(e.target.value))} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Criticité (automatique)</label>
            <input type="number" className="form-control bg-light" value={formData.criticite} readOnly />
          </div>
          <div className="col-12">
            <div className="alert alert-info">
              <strong>Criticité : {formData.criticite}</strong><br/>
              {formData.criticite <= 9 && 'Risque faible - Surveillance standard'}
              {formData.criticite > 9 && formData.criticite <= 15 && 'Risque moyen - Actions préventives requises'}
              {formData.criticite > 15 && formData.criticite <= 20 && 'Risque élevé - Actions immédiates requises'}
              {formData.criticite > 20 && 'Risque critique - Mesures d\'urgence'}
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Responsable *</label>
            <input type="text" className="form-control" value={formData.responsable} onChange={(e) => setFormData(prev => ({...prev, responsable: e.target.value}))} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Statut</label>
            <select className="form-select" value={formData.statut} onChange={(e) => setFormData(prev => ({...prev, statut: e.target.value as 'Actif' | 'Mitigé' | 'Résolu'}))}>
              <option value="Actif">Actif</option>
              <option value="Mitigé">Mitigé</option>
              <option value="Résolu">Résolu</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Mesures de prévention *</label>
            <textarea className="form-control" rows={4} value={formData.mesures_prevention} onChange={(e) => setFormData(prev => ({...prev, mesures_prevention: e.target.value}))} required />
          </div>
          <div className="col-12">
            <label className="form-label">Mesures d'atténuation / Correctives</label>
            <textarea className="form-control" rows={4} value={formData.mesures_mitigation} onChange={(e) => setFormData(prev => ({...prev, mesures_mitigation: e.target.value}))} />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Enregistrer</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/risques')}>Annuler</button>
          </div>
        </div>
      </form>
    </div>
  );
}

