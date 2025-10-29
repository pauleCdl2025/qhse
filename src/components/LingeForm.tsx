import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LingeTracking } from '../types';
import { generateLingeCode } from '../utils/lingeCodeGenerator';
import Toast from './Toast';

export default function LingeForm() {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [codeAuto, setCodeAuto] = useState('');
  
  const [formData, setFormData] = useState<LingeTracking>({
    centre: 'CD',
    service: '',
    item: 'DR',
    date_traitement: new Date().toISOString().split('T')[0],
    seq_jour: 1,
    code_linge: '',
    type_linge: '',
    etat_recu: 'Propre',
    etat_sorti: 'Propre',
    responsable: ''
  });

  // Génération automatique du code
  useEffect(() => {
    if (formData.centre && formData.service && formData.item && formData.date_traitement) {
      const code = generateLingeCode(
        formData.centre,
        formData.service,
        formData.item,
        new Date(formData.date_traitement),
        formData.seq_jour
      );
      setCodeAuto(code);
    }
  }, [formData.centre, formData.service, formData.item, formData.date_traitement, formData.seq_jour]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sauvegarde dans localStorage
    const records = JSON.parse(localStorage.getItem('linge_tracking') || '[]');
    records.push({
      ...formData,
      code_linge: codeAuto,
      id: Date.now(),
      created_at: new Date().toISOString()
    });
    localStorage.setItem('linge_tracking', JSON.stringify(records));
    
    setToastMessage('✅ Code généré et enregistré avec succès!');
    setShowToast(true);
    setTimeout(() => navigate('/linge'), 1500);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Traçabilité du Linge</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-2">
            <label className="form-label">Centre *</label>
            <input 
              type="text" 
              className="form-control" 
              value={formData.centre} 
              onChange={(e) => setFormData(prev => ({...prev, centre: e.target.value.toUpperCase()}))} 
              maxLength={2}
              required 
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Service *</label>
            <input 
              type="text" 
              className="form-control" 
              value={formData.service} 
              onChange={(e) => setFormData(prev => ({...prev, service: e.target.value.toUpperCase()}))} 
              maxLength={2}
              required 
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Item *</label>
            <select 
              className="form-select" 
              value={formData.item} 
              onChange={(e) => setFormData(prev => ({...prev, item: e.target.value}))}
              required
            >
              <option value="DR">Draps (DR)</option>
              <option value="BM">Blouses Médicales (BM)</option>
              <option value="SG">Surgir (SG)</option>
              <option value="SC">Scrubs (SC)</option>
              <option value="GN">Gants (GN)</option>
              <option value="CM">Champs Médicaux (CM)</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Date de traitement *</label>
            <input 
              type="date" 
              className="form-control" 
              value={formData.date_traitement} 
              onChange={(e) => setFormData(prev => ({...prev, date_traitement: e.target.value}))} 
              required 
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">N° séquence *</label>
            <input 
              type="number" 
              className="form-control" 
              value={formData.seq_jour} 
              onChange={(e) => setFormData(prev => ({...prev, seq_jour: parseInt(e.target.value)}))}
              min="1"
              required 
            />
          </div>
          
          <div className="col-12">
            <div className="alert alert-info">
              <strong>Code généré automatiquement :</strong> {codeAuto || 'Non généré'}
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Type de linge *</label>
            <input 
              type="text" 
              className="form-control" 
              value={formData.type_linge} 
              onChange={(e) => setFormData(prev => ({...prev, type_linge: e.target.value}))} 
              placeholder="Ex: Draps de lit, Blouse OP..." 
              required 
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Responsable *</label>
            <input 
              type="text" 
              className="form-control" 
              value={formData.responsable} 
              onChange={(e) => setFormData(prev => ({...prev, responsable: e.target.value}))} 
              required 
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">État à la réception *</label>
            <select 
              className="form-select" 
              value={formData.etat_recu} 
              onChange={(e) => setFormData(prev => ({...prev, etat_recu: e.target.value}))}
              required
            >
              <option value="Propre">Propre</option>
              <option value="Sale">Sale</option>
              <option value="Contaminé">Contaminé</option>
              <option value="Abîmé">Abîmé</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">État à la sortie *</label>
            <select 
              className="form-select" 
              value={formData.etat_sorti} 
              onChange={(e) => setFormData(prev => ({...prev, etat_sorti: e.target.value}))}
              required
            >
              <option value="Propre">Propre</option>
              <option value="Stérilisé">Stérilisé</option>
              <option value="Conditionné">Conditionné</option>
              <option value="Envoyé">Envoyé</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Observations</label>
            <textarea 
              className="form-control" 
              rows={3} 
              value={formData.observations} 
              onChange={(e) => setFormData(prev => ({...prev, observations: e.target.value}))}
              placeholder="Notes additionnelles..."
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Enregistrer</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/linge')}>Annuler</button>
          </div>
        </div>
      </form>
      
      <Toast show={showToast} message={toastMessage} type="success" onClose={() => setShowToast(false)} />
    </div>
  );
}

