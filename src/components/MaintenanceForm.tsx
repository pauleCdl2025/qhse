import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Maintenance } from '../types/qhse';

export default function MaintenanceForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Maintenance>({
    equipement: '',
    type: 'Préventive',
    date_intervention: '',
    technicien: '',
    duree: 0,
    observations: '',
    prochaine_echeance: '',
    cout: 0,
    statut: 'Planifié'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qhseStorage = require('../utils/storageQHSE').qhseStorage;
    qhseStorage.saveMaintenance(formData);
    alert('Enregistrement effectué avec succès!');
    navigate('/maintenance');
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Suivi Maintenance & Biomédical</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Équipement *</label>
            <input type="text" className="form-control" value={formData.equipement} onChange={(e) => setFormData(prev => ({...prev, equipement: e.target.value}))} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Type *</label>
            <select className="form-select" value={formData.type} onChange={(e) => setFormData(prev => ({...prev, type: e.target.value as 'Préventive' | 'Corrective' | 'Calibration'}))}>
              <option value="Préventive">Préventive</option>
              <option value="Corrective">Corrective</option>
              <option value="Calibration">Calibration</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Statut</label>
            <select className="form-select" value={formData.statut} onChange={(e) => setFormData(prev => ({...prev, statut: e.target.value as 'Planifié' | 'En cours' | 'Terminé' | 'En retard'}))}>
              <option value="Planifié">Planifié</option>
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
              <option value="En retard">En retard</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Date intervention *</label>
            <input type="datetime-local" className="form-control" value={formData.date_intervention} onChange={(e) => setFormData(prev => ({...prev, date_intervention: e.target.value}))} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Technicien *</label>
            <input type="text" className="form-control" value={formData.technicien} onChange={(e) => setFormData(prev => ({...prev, technicien: e.target.value}))} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Durée (minutes)</label>
            <input type="number" className="form-control" value={formData.duree} onChange={(e) => setFormData(prev => ({...prev, duree: parseInt(e.target.value)}))} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Coût (€)</label>
            <input type="number" step="0.01" className="form-control" value={formData.cout} onChange={(e) => setFormData(prev => ({...prev, cout: parseFloat(e.target.value)}))} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Prochaine échéance</label>
            <input type="date" className="form-control" value={formData.prochaine_echeance} onChange={(e) => setFormData(prev => ({...prev, prochaine_echeance: e.target.value}))} />
          </div>
          <div className="col-12">
            <label className="form-label">Observations</label>
            <textarea className="form-control" rows={4} value={formData.observations} onChange={(e) => setFormData(prev => ({...prev, observations: e.target.value}))} />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Enregistrer</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/maintenance')}>Annuler</button>
          </div>
        </div>
      </form>
    </div>
  );
}

