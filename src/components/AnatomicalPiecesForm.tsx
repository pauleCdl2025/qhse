import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnatomicalPiece } from '../types';
import { storageService } from '../utils/storage';

export default function AnatomicalPiecesForm() {
  const navigate = useNavigate();
  const { ref } = useParams();
  const [formData, setFormData] = useState<AnatomicalPiece>({
    ref: '',
    date_heure_prelevement: '',
    service: '',
    patient_identite: '',
    dossier_num: '',
    type_piece: '',
    conditionnement: '',
    operateur_preleveur: '',
    destination: 'Laboratoire',
    date_heure_sortie_bloc: '',
    transporteur: '',
    reception_signature: '',
    reference_resultat: '',
    observations: ''
  });

  useEffect(() => {
    if (ref) {
      const existing = storageService.getAnatomicalByRef(ref);
      if (existing) {
        setFormData(existing);
      }
    } else {
      // Generate new reference
      const newRef = storageService.generateAnatomicalRef();
      setFormData(prev => ({ ...prev, ref: newRef }));
    }
  }, [ref]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await storageService.saveAnatomical(formData);
      alert('✅ Enregistrement effectué avec succès!');
      navigate('/anatomical');
    } catch (error) {
      alert('❌ Erreur lors de l\'enregistrement');
    }
  };

  const handleChange = (field: keyof AnatomicalPiece, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Traçabilité – Pièces Anatomiques</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">N° d'enregistrement (référence)</label>
            <input
              type="text"
              className="form-control"
              value={formData.ref}
              readOnly
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Date & heure prélèvement</label>
            <input
              type="datetime-local"
              className="form-control"
              value={formData.date_heure_prelevement}
              onChange={(e) => handleChange('date_heure_prelevement', e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Service / Bloc</label>
            <input
              type="text"
              className="form-control"
              value={formData.service}
              onChange={(e) => handleChange('service', e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Identité patient (code/initiales)</label>
            <input
              type="text"
              className="form-control"
              value={formData.patient_identite}
              onChange={(e) => handleChange('patient_identite', e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">N° dossier</label>
            <input
              type="text"
              className="form-control"
              value={formData.dossier_num}
              onChange={(e) => handleChange('dossier_num', e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Type de pièce</label>
            <input
              type="text"
              className="form-control"
              value={formData.type_piece}
              onChange={(e) => handleChange('type_piece', e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Conditionnement (type & N° de pot)</label>
            <input
              type="text"
              className="form-control"
              value={formData.conditionnement}
              onChange={(e) => handleChange('conditionnement', e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Opérateur préleveur</label>
            <input
              type="text"
              className="form-control"
              value={formData.operateur_preleveur}
              onChange={(e) => handleChange('operateur_preleveur', e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Destination</label>
            <select
              className="form-select"
              value={formData.destination}
              onChange={(e) => handleChange('destination', e.target.value)}
            >
              <option value="Laboratoire">Laboratoire</option>
              <option value="Destruction">Destruction</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Date & heure sortie bloc</label>
            <input
              type="datetime-local"
              className="form-control"
              value={formData.date_heure_sortie_bloc}
              onChange={(e) => handleChange('date_heure_sortie_bloc', e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Nom & signature du transporteur</label>
            <input
              type="text"
              className="form-control"
              value={formData.transporteur}
              onChange={(e) => handleChange('transporteur', e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Réception labo / incinération (nom & sign.)</label>
            <input
              type="text"
              className="form-control"
              value={formData.reception_signature}
              onChange={(e) => handleChange('reception_signature', e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Réf. analyse / N° destruction</label>
            <input
              type="text"
              className="form-control"
              value={formData.reference_resultat}
              onChange={(e) => handleChange('reference_resultat', e.target.value)}
            />
          </div>

          <div className="col-12">
            <label className="form-label">Observations / Anomalies</label>
            <textarea
              className="form-control"
              rows={3}
              value={formData.observations}
              onChange={(e) => handleChange('observations', e.target.value)}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Enregistrer
            </button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/anatomical')}>
              Annuler
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

