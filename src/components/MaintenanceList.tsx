import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Maintenance } from '../types/qhse';
import { supabaseService } from '../services/supabaseService';

export default function MaintenanceList() {
  const [records, setRecords] = useState<Maintenance[]>([]);

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const allRecords = await supabaseService.getAllMaintenance();
        setRecords(allRecords);
      } catch (error) {
        console.error('Error loading maintenance:', error);
        setRecords(supabaseService.getAllMaintenanceSync());
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
        <h2>Suivi Maintenance & Biomédical</h2>
        <Link to="/maintenance/new" className="btn btn-primary btn-sm">Nouvelle intervention</Link>
      </div>

      <div className="table-responsive">
        <table className="table table-sm table-striped">
          <thead className="table-light">
            <tr>
              <th>Équipement</th>
              <th>Type</th>
              <th>Date</th>
              <th>Technicien</th>
              <th>Durée</th>
              <th>Statut</th>
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
                  <td>{r.equipement}</td>
                  <td>{r.type}</td>
                  <td>{formatDateTime(r.date_intervention)}</td>
                  <td>{r.technicien}</td>
                  <td>{r.duree} min</td>
                  <td><span className={`badge ${r.statut === 'En retard' ? 'bg-danger' : r.statut === 'Terminé' ? 'bg-success' : 'bg-warning'}`}>{r.statut}</span></td>
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

