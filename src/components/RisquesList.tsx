import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Risque } from '../types/qhse';
import { qhseStorage } from '../utils/storageQHSE';

export default function RisquesList() {
  const [records, setRecords] = useState<Risque[]>([]);

  useEffect(() => {
    setRecords(qhseStorage.getAllRisques());
  }, []);

  const getCriticiteColor = (criticite: number) => {
    if (criticite <= 9) return 'bg-success';
    if (criticite <= 15) return 'bg-warning';
    if (criticite <= 20) return 'bg-danger';
    return 'bg-danger';
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestion des Risques</h2>
        <Link to="/risques/new" className="btn btn-primary btn-sm">Nouveau risque</Link>
      </div>

      <div className="table-responsive">
        <table className="table table-sm table-striped">
          <thead className="table-light">
            <tr>
              <th>Désignation</th>
              <th>Catégorie</th>
              <th>Probabilité</th>
              <th>Gravité</th>
              <th>Criticité</th>
              <th>Responsable</th>
              <th>Statut</th>
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
                  <td>{r.designation}</td>
                  <td>{r.categorie}</td>
                  <td>{r.probabilite}/5</td>
                  <td>{r.gravite}/5</td>
                  <td><span className={`badge ${getCriticiteColor(r.criticite)}`}>{r.criticite}</span></td>
                  <td>{r.responsable}</td>
                  <td>{r.statut}</td>
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

