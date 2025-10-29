import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SterilizationFormData } from '../types';
import { storageService } from '../utils/storage';

export default function EquipmentSterilizationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SterilizationFormData>({
    registrationNumber: '',
    collectionDateTime: '',
    originService: '',
    equipmentType: '',
    quantityCollected: 0,
    collectorName: '',
    materialCondition: '',
    washingDateTime: '',
    washerName: '',
    disinfectantUsed: '',
    washingObservation: '',
    cycleType: '',
    autoclaveNumber: '',
    cycleParameters: '',
    cycleResult: '',
    sterilizerName: '',
    sterilizationEndDateTime: '',
    indicatorVerification: '',
    releaseByName: '',
    releaseDateTime: '',
    generalObservations: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await storageService.saveSterilization(formData);
      alert('✅ Enregistrement effectué avec succès!');
      navigate('/sterilization');
    } catch (error) {
      alert('❌ Erreur lors de l\'enregistrement');
    }
  };

  const handleChange = (field: keyof SterilizationFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Traçabilité – Stérilisation des Équipements</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">N° d'enregistrement *</label>
            <input
              type="text"
              className="form-control"
              value={formData.registrationNumber}
              onChange={(e) => handleChange('registrationNumber', e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Date & heure de collecte du matériel *</label>
            <input
              type="datetime-local"
              className="form-control"
              value={formData.collectionDateTime}
              onChange={(e) => handleChange('collectionDateTime', e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Service / Bloc opératoire d'origine *</label>
            <select
              className="form-select"
              value={formData.originService}
              onChange={(e) => handleChange('originService', e.target.value)}
              required
            >
              <option value="">Sélectionner...</option>
              <option value="Bloc gynécologique">Bloc gynécologique</option>
              <option value="Bloc digestif">Bloc digestif</option>
              <option value="Bloc ORL">Bloc ORL</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Type de matériel / dispositif *</label>
            <input
              type="text"
              className="form-control"
              value={formData.equipmentType}
              onChange={(e) => handleChange('equipmentType', e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Quantité d'articles collectés *</label>
            <input
              type="number"
              className="form-control"
              value={formData.quantityCollected}
              onChange={(e) => handleChange('quantityCollected', parseInt(e.target.value))}
              required
              min="0"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Nom de l'agent collecteur *</label>
            <input
              type="text"
              className="form-control"
              value={formData.collectorName}
              onChange={(e) => handleChange('collectorName', e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">État du matériel à la collecte *</label>
            <select
              className="form-select"
              value={formData.materialCondition}
              onChange={(e) => handleChange('materialCondition', e.target.value)}
              required
            >
              <option value="">Sélectionner...</option>
              <option value="Propre">Propre</option>
              <option value="Souillé">Souillé</option>
              <option value="Cassé / non conforme">Cassé / non conforme</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Date & heure du lavage / désinfection *</label>
            <input
              type="datetime-local"
              className="form-control"
              value={formData.washingDateTime}
              onChange={(e) => handleChange('washingDateTime', e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Nom de l'opérateur de lavage *</label>
            <input
              type="text"
              className="form-control"
              value={formData.washerName}
              onChange={(e) => handleChange('washerName', e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Produit utilisé pour la désinfection *</label>
            <select
              className="form-select"
              value={formData.disinfectantUsed}
              onChange={(e) => handleChange('disinfectantUsed', e.target.value)}
              required
            >
              <option value="">Sélectionner...</option>
              <option value="Détergent enzymatique">Détergent enzymatique</option>
              <option value="Désinfectant chloré">Désinfectant chloré</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label">Observation lavage / pré-désinfection</label>
            <textarea
              className="form-control"
              rows={3}
              value={formData.washingObservation}
              onChange={(e) => handleChange('washingObservation', e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Type de cycle / N° du cycle *</label>
            <input
              type="text"
              className="form-control"
              value={formData.cycleType}
              onChange={(e) => handleChange('cycleType', e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Appareil utilisé (N° d'autoclave) *</label>
            <select
              className="form-select"
              value={formData.autoclaveNumber}
              onChange={(e) => handleChange('autoclaveNumber', e.target.value)}
              required
            >
              <option value="">Sélectionner...</option>
              <option value="Autoclave 1">Autoclave 1</option>
              <option value="Autoclave 2">Autoclave 2</option>
              <option value="Autoclave 3">Autoclave 3</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Température / Pression / Durée du cycle *</label>
            <input
              type="text"
              className="form-control"
              value={formData.cycleParameters}
              onChange={(e) => handleChange('cycleParameters', e.target.value)}
              placeholder="Ex: 121°C / 15 psi / 30 min"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Résultat du cycle *</label>
            <select
              className="form-select"
              value={formData.cycleResult}
              onChange={(e) => handleChange('cycleResult', e.target.value)}
              required
            >
              <option value="">Sélectionner...</option>
              <option value="Conforme">Conforme</option>
              <option value="Non conforme">Non conforme</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Nom & signature du stérilisateur *</label>
            <input
              type="text"
              className="form-control"
              value={formData.sterilizerName}
              onChange={(e) => handleChange('sterilizerName', e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Date & heure de fin de stérilisation *</label>
            <input
              type="datetime-local"
              className="form-control"
              value={formData.sterilizationEndDateTime}
              onChange={(e) => handleChange('sterilizationEndDateTime', e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Vérification des indicateurs chimiques / biologiques *</label>
            <select
              className="form-select"
              value={formData.indicatorVerification}
              onChange={(e) => handleChange('indicatorVerification', e.target.value)}
              required
            >
              <option value="">Sélectionner...</option>
              <option value="Oui – virage conforme">Oui – virage conforme</option>
              <option value="Non – cycle à reprendre">Non – cycle à reprendre</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Libération du matériel stérile par *</label>
            <input
              type="text"
              className="form-control"
              value={formData.releaseByName}
              onChange={(e) => handleChange('releaseByName', e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Date & heure de libération *</label>
            <input
              type="datetime-local"
              className="form-control"
              value={formData.releaseDateTime}
              onChange={(e) => handleChange('releaseDateTime', e.target.value)}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">Observations générales / anomalies</label>
            <textarea
              className="form-control"
              rows={3}
              value={formData.generalObservations}
              onChange={(e) => handleChange('generalObservations', e.target.value)}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Enregistrer
            </button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/')}>
              Annuler
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

