import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formation } from '../types/qhse';

export default function FormationsForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Formation>({
    titre: '',
    type: '',
    formateur: '',
    date_formation: '',
    participants: [],
    duree: 0,
    objectifs: '',
    evaluation: '',
    certifie: false,
    prochaine_session: ''
  });
  const [participant, setParticipant] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qhseStorage = require('../utils/storageQHSE').qhseStorage;
    qhseStorage.saveFormation(formData);
    alert('Enregistrement effectué avec succès!');
    navigate('/formations');
  };

  const addParticipant = () => {
    if (participant.trim()) {
      setFormData(prev => ({...prev, participants: [...prev.participants, participant.trim()]}));
      setParticipant('');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Formations & Compétences</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Titre de la formation *</label>
            <input type="text" className="form-control" value={formData.titre} onChange={(e) => setFormData(prev => ({...prev, titre: e.target.value}))} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Type de formation *</label>
            <input type="text" className="form-control" value={formData.type} onChange={(e) => setFormData(prev => ({...prev, type: e.target.value}))} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Formateur *</label>
            <input type="text" className="form-control" value={formData.formateur} onChange={(e) => setFormData(prev => ({...prev, formateur: e.target.value}))} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Date de la formation *</label>
            <input type="datetime-local" className="form-control" value={formData.date_formation} onChange={(e) => setFormData(prev => ({...prev, date_formation: e.target.value}))} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Durée (heures)</label>
            <input type="number" className="form-control" value={formData.duree} onChange={(e) => setFormData(prev => ({...prev, duree: parseInt(e.target.value)}))} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Prochaine session</label>
            <input type="date" className="form-control" value={formData.prochaine_session} onChange={(e) => setFormData(prev => ({...prev, prochaine_session: e.target.value}))} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Certifiée</label>
            <select className="form-select" value={formData.certifie ? 'Oui' : 'Non'} onChange={(e) => setFormData(prev => ({...prev, certifie: e.target.value === 'Oui'}))}>
              <option value="Non">Non</option>
              <option value="Oui">Oui</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Ajouter un participant</label>
            <div className="input-group">
              <input type="text" className="form-control" value={participant} onChange={(e) => setParticipant(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addParticipant())} />
              <button type="button" className="btn btn-outline-primary" onClick={addParticipant}>Ajouter</button>
            </div>
          </div>
          {formData.participants.length > 0 && (
            <div className="col-12">
              <label className="form-label">Participants ({formData.participants.length})</label>
              <div className="badge-container">
                {formData.participants.map((p, i) => (
                  <span key={i} className="badge bg-primary me-2 mb-2">
                    {p}
                    <button type="button" className="btn-close btn-close-white ms-1" onClick={() => setFormData(prev => ({...prev, participants: prev.participants.filter((_, idx) => idx !== i)}))} />
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="col-12">
            <label className="form-label">Objectifs</label>
            <textarea className="form-control" rows={3} value={formData.objectifs} onChange={(e) => setFormData(prev => ({...prev, objectifs: e.target.value}))} />
          </div>
          <div className="col-12">
            <label className="form-label">Évaluation</label>
            <textarea className="form-control" rows={3} value={formData.evaluation} onChange={(e) => setFormData(prev => ({...prev, evaluation: e.target.value}))} />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Enregistrer</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/formations')}>Annuler</button>
          </div>
        </div>
      </form>
    </div>
  );
}

