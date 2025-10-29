import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DocumentGED } from '../types/qhse';
import { supabaseService } from '../services/supabaseService';

export default function GedList() {
  const [records, setRecords] = useState<DocumentGED[]>([]);

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const allRecords = await supabaseService.getAllDocuments();
        setRecords(allRecords);
      } catch (error) {
        console.error('Error loading documents:', error);
        setRecords(supabaseService.getAllDocumentsSync());
      }
    };
    loadRecords();
  }, []);

  const formatDate = (dt?: string) => {
    if (!dt) return '';
    return new Date(dt).toLocaleDateString('fr-FR');
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>GED Documentaire QHSE</h2>
        <Link to="/ged/new" className="btn btn-primary btn-sm">Nouveau document</Link>
      </div>

      <div className="table-responsive">
        <table className="table table-sm table-striped">
          <thead className="table-light">
            <tr>
              <th>Titre</th>
              <th>Type</th>
              <th>Version</th>
              <th>Auteur</th>
              <th>Statut</th>
              <th>Date création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">Aucun enregistrement</td>
              </tr>
            ) : (
              records.map((r) => (
                <tr key={r.id}>
                  <td>{r.titre}</td>
                  <td>{r.type}</td>
                  <td>v{r.version}</td>
                  <td>{r.auteur}</td>
                  <td><span className={`badge ${r.statut === 'Approuvé' ? 'bg-success' : r.statut === 'En validation' ? 'bg-warning' : 'bg-secondary'}`}>{r.statut}</span></td>
                  <td>{formatDate(r.date_creation)}</td>
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

