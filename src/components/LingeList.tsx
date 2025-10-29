import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LingeTracking } from '../types';
import { validateLingeCode } from '../utils/lingeCodeGenerator';

export default function LingeList() {
  const [records, setRecords] = useState<LingeTracking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('linge_tracking');
    setRecords(data ? JSON.parse(data) : []);
  }, []);

  const filteredRecords = records.filter(r => {
    const searchLower = searchTerm.toLowerCase();
    return r.code_linge.toLowerCase().includes(searchLower) ||
           r.type_linge.toLowerCase().includes(searchLower) ||
           r.responsable.toLowerCase().includes(searchLower) ||
           r.service.toLowerCase().includes(searchLower);
  });

  const formatDate = (dt?: string) => {
    if (!dt) return '';
    return new Date(dt).toLocaleDateString('fr-FR');
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Traçabilité du Linge</h2>
        <Link to="/linge/new" className="btn btn-primary btn-sm">Nouveau suivi</Link>
      </div>

      <div className="row mb-3">
        <div className="col-md-12">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Rechercher par code, type, responsable, service..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-sm table-striped">
          <thead className="table-light">
            <tr>
              <th>Code linge</th>
              <th>Date</th>
              <th>Type</th>
              <th>État réception</th>
              <th>État sortie</th>
              <th>Responsable</th>
              <th>Validité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center">Aucun enregistrement</td>
              </tr>
            ) : (
              filteredRecords.map((r) => (
                <tr key={r.id}>
                  <td><code>{r.code_linge}</code></td>
                  <td>{formatDate(r.date_traitement)}</td>
                  <td>{r.type_linge}</td>
                  <td><span className={`badge ${r.etat_recu === 'Propre' ? 'bg-success' : 'bg-warning'}`}>{r.etat_recu}</span></td>
                  <td><span className={`badge ${r.etat_sorti === 'Propre' ? 'bg-success' : 'bg-info'}`}>{r.etat_sorti}</span></td>
                  <td>{r.responsable}</td>
                  <td>
                    {validateLingeCode(r.code_linge) ? (
                      <span className="badge bg-success">✓ Valide</span>
                    ) : (
                      <span className="badge bg-danger">✗ Invalide</span>
                    )}
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-primary" 
                      onClick={() => {
                        alert(`Détail de l'enregistrement:\n\nCode: ${r.code_linge}\nType: ${r.type_linge}\nCentre: ${r.centre}\nService: ${r.service}\nDate: ${formatDate(r.date_traitement)}\nResponsable: ${r.responsable}\nÉtat entrant: ${r.etat_recu}\nÉtat sortant: ${r.etat_sorti}${r.observations ? '\n\nObservations: ' + r.observations : ''}`);
                      }}
                    >
                      Détails
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

