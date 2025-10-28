import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DechetMedical } from '../types/qhse';
import { qhseStorage } from '../utils/storageQHSE';

export default function DechetsList() {
  const [records, setRecords] = useState<DechetMedical[]>([]);

  useEffect(() => {
    setRecords(qhseStorage.getAllDechets());
  }, []);

  const formatDateTime = (dt?: string) => {
    if (!dt) return '';
    return new Date(dt).toLocaleString('fr-FR');
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Suivi des Déchets Médicaux</h2>
        <Link to="/dechets/new" className="btn btn-primary btn-sm">Nouvelle collecte</Link>
      </div>

      <div className="table-responsive">
        <table className="table table-sm table-striped">
          <thead className="table-light">
            <tr>
              <th>N° Collecte</th>
              <th>Service</th>
              <th>Type</th>
              <th>Quantité (kg)</th>
              <th>Date</th>
              <th>Filière</th>
              <th>Destination</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center">Aucun enregistrement</td>
              </tr>
            ) : (
              records.map((r) => (
                <tr key={r.id}>
                  <td>{r.numero_collecte}</td>
                  <td>{r.service}</td>
                  <td>{r.type_dechet}</td>
                  <td>{r.quantite}</td>
                  <td>{formatDateTime(r.date_collecte)}</td>
                  <td>{r.filiere}</td>
                  <td>{r.destination}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => alert('Détail: ' + JSON.stringify(r, null, 2))}>Détails</button>
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

