import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formation } from '../types/qhse';
import { supabaseService } from '../services/supabaseService';

export default function FormationsList() {
  const [records, setRecords] = useState<Formation[]>([]);

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const allRecords = await supabaseService.getAllFormations();
        setRecords(allRecords);
      } catch (error) {
        console.error('Error loading formations:', error);
        setRecords(supabaseService.getAllFormationsSync());
      }
    };
    loadRecords();
  }, []);

  const formatDateTime = (dt?: string) => {
    if (!dt) return '';
    return new Date(dt).toLocaleString('fr-FR');
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Formations & Compétences</h2>
        <Link to="/formations/new" className="btn btn-primary btn-sm">Nouvelle formation</Link>
      </div>

      <div className="table-responsive">
        <table className="table table-sm table-striped">
          <thead className="table-light">
            <tr>
              <th>Titre</th>
              <th>Type</th>
              <th>Date</th>
              <th>Formateur</th>
              <th>Participants</th>
              <th>Durée</th>
              <th>Certifiée</th>
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
                  <td>{r.titre}</td>
                  <td>{r.type}</td>
                  <td>{formatDateTime(r.date_formation)}</td>
                  <td>{r.formateur}</td>
                  <td>{r.participants.length}</td>
                  <td>{r.duree}h</td>
                  <td>{r.certifie ? <span className="badge bg-success">Oui</span> : <span className="badge bg-secondary">Non</span>}</td>
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

