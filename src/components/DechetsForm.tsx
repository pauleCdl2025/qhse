import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DechetMedical } from '../types/qhse';

export default function DechetsForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<DechetMedical>({
    numero_collecte: '',
    service: '',
    type_dechet: '',
    quantite: 0,
    date_collecte: '',
    filiere: '',
    transporteur: '',
    destination: '',
    observation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Enregistrement effectué avec succès!');
    navigate('/dechets');
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Suivi des Déchets Médicaux</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">N° collecte *</label>
            <input type="text" className="form-control" value={formData.numero_collecte} onChange={(e) => setFormData(prev => ({...prev, numero_collecte: e.target.value}))} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Service *</label>
            <input type="text" className="form-control" value={formData.service} onChange={(e) => setFormData(prev => ({...prev, service: e.target.value}))} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Date collecte *</label>
            <input type="datetime-local" className="form-control" value={formData.date_collecte} onChange={(e) => setFormData(prev => ({...prev, date_collecte: e.target.value}))} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Type de déchet *</label>
            <select className="form-select" value={formData.type_dechet} onChange={(e) => setFormData(prev => ({...prev, type_dechet: e.target.value}))} required>
              <option value="">Sélectionner...</option>
              <option value="Piquants">Piquants</option>
              <option value="Infectieux">Infectieux</option>
              <option value="Chimiques">Chimiques</option>
              <option value="Anatomiques">Anatomiques</option>
              <option value="Pharmaceutiques">Pharmaceutiques</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Quantité (kg) *</label>
            <input type="number" step="0.1" className="form-control" value={formData.quantite} onChange={(e) => setFormData(prev => ({...prev, quantite: parseFloat(e.target.value)}))} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Filière d'élimination *</label>
            <input type="text" className="form-control" value={formData.filiere} onChange={(e) => setFormData(prev => ({...prev, filiere: e.target.value}))} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Transporteur *</label>
            <input type="text" className="form-control" value={formData.transporteur} onChange={(e) => setFormData(prev => ({...prev, transporteur: e.target.value}))} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Destination finale *</label>
            <input type="text" className="form-control" value={formData.destination} onChange={(e) => setFormData(prev => ({...prev, destination: e.target.value}))} required />
          </div>
          <div className="col-12">
            <label className="form-label">Observations</label>
            <textarea className="form-control" rows={3} value={formData.observation} onChange={(e) => setFormData(prev => ({...prev, observation: e.target.value}))} />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Enregistrer</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/dechets')}>Annuler</button>
          </div>
        </div>
      </form>
    </div>
  );
}

