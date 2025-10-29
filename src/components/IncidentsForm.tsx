import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Incident } from '../types/qhse';
import Toast from './Toast';

export default function IncidentsForm() {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [formData, setFormData] = useState<Incident>({
    numero: '',
    date_incident: '',
    type: 'Incident',
    classification: '',
    gravite: '',
    lieu: '',
    description: '',
    temoins: '',
    actions_correctives: '',
    actions_preventives: '',
    responsable_suivi: '',
    statut: 'En cours'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qhseStorage = require('../utils/storageQHSE').qhseStorage;
    qhseStorage.saveIncident(formData);
    setToastMessage('✅ Enregistrement effectué avec succès!');
    setShowToast(true);
    setTimeout(() => navigate('/incidents'), 1500);
  };

  const handleChange = (field: keyof Incident, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Déclaration d'Incident / Accident / AES</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">N° de déclaration *</label>
            <input type="text" className="form-control" value={formData.numero} onChange={(e) => handleChange('numero', e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Date de l'incident *</label>
            <input type="datetime-local" className="form-control" value={formData.date_incident} onChange={(e) => handleChange('date_incident', e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Type *</label>
            <select className="form-select" value={formData.type} onChange={(e) => handleChange('type', e.target.value)} required>
              <option value="Incident">Incident</option>
              <option value="Accident">Accident</option>
              <option value="AES">Accident avec Exposition au Sang (AES)</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Classification</label>
            <select className="form-select" value={formData.classification} onChange={(e) => handleChange('classification', e.target.value)}>
              <option value="">Sélectionner...</option>
              <option value="Incident bénin">Incident bénin</option>
              <option value="Incident grave">Incident grave</option>
              <option value="Accident du travail">Accident du travail</option>
              <option value="Accident de trajet">Accident de trajet</option>
              <option value="AES niveau 1">AES niveau 1</option>
              <option value="AES niveau 2">AES niveau 2</option>
              <option value="AES niveau 3">AES niveau 3</option>
              <option value="Presque accident">Presque accident</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Gravité</label>
            <select className="form-select" value={formData.gravite} onChange={(e) => handleChange('gravite', e.target.value)}>
              <option value="">Sélectionner...</option>
              <option value="Faible">Faible</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Élevée">Élevée</option>
              <option value="Critique">Critique</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Statut</label>
            <select className="form-select" value={formData.statut} onChange={(e) => handleChange('statut', e.target.value)}>
              <option value="En cours">En cours</option>
              <option value="Résolu">Résolu</option>
              <option value="Clôturé">Clôturé</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Lieu *</label>
            <select className="form-select" value={formData.lieu} onChange={(e) => handleChange('lieu', e.target.value)} required>
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
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Responsable du suivi *</label>
            <input type="text" className="form-control" value={formData.responsable_suivi} onChange={(e) => handleChange('responsable_suivi', e.target.value)} required />
          </div>
          <div className="col-12">
            <label className="form-label">Description détaillée *</label>
            <textarea className="form-control" rows={4} value={formData.description} onChange={(e) => handleChange('description', e.target.value)} required />
          </div>
          <div className="col-12">
            <label className="form-label">Témoins</label>
            <input type="text" className="form-control" value={formData.temoins} onChange={(e) => handleChange('temoins', e.target.value)} />
          </div>
          <div className="col-12">
            <label className="form-label">Actions correctives (CAPA)</label>
            <textarea className="form-control" rows={3} value={formData.actions_correctives} onChange={(e) => handleChange('actions_correctives', e.target.value)} />
          </div>
          <div className="col-12">
            <label className="form-label">Actions préventives</label>
            <textarea className="form-control" rows={3} value={formData.actions_preventives} onChange={(e) => handleChange('actions_preventives', e.target.value)} />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Enregistrer</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/incidents')}>Annuler</button>
          </div>
        </div>
      </form>
      
      <Toast show={showToast} message={toastMessage} type="success" onClose={() => setShowToast(false)} />
    </div>
  );
}

