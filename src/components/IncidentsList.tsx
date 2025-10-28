import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Incident } from '../types/qhse';
import { qhseStorage } from '../utils/storageQHSE';

export default function IncidentsList() {
  const [records, setRecords] = useState<Incident[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('');

  useEffect(() => {
    setRecords(qhseStorage.getAllIncidents());
  }, []);

  const filteredRecords = records.filter(r => {
    const matchesSearch = r.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         r.lieu.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         r.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterStatut || r.statut === filterStatut;
    return matchesSearch && matchesFilter;
  });

  const formatDateTime = (dt?: string) => {
    if (!dt) return '';
    return new Date(dt).toLocaleString('fr-FR');
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestion des Incidents / Accidents / AES</h2>
        <Link to="/incidents/new" className="btn btn-primary btn-sm">Nouvelle déclaration</Link>
      </div>

      <div className="row mb-3">
        <div className="col-md-8">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Rechercher par N°, lieu, type..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        <div className="col-md-4">
          <select className="form-select" value={filterStatut} onChange={(e) => setFilterStatut(e.target.value)}>
            <option value="">Tous les statuts</option>
            <option value="En cours">En cours</option>
            <option value="Résolu">Résolu</option>
            <option value="Archivé">Archivé</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-sm table-striped">
          <thead className="table-light">
            <tr>
              <th>N°</th>
              <th>Date</th>
              <th>Type</th>
              <th>Classification</th>
              <th>Gravité</th>
              <th>Lieu</th>
              <th>Statut</th>
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
                  <td>{r.numero}</td>
                  <td>{formatDateTime(r.date_incident)}</td>
                  <td>{r.type}</td>
                  <td>{r.classification}</td>
                  <td><span className={`badge ${r.gravite === 'Critique' ? 'bg-danger' : r.gravite === 'Élevée' ? 'bg-warning' : 'bg-info'}`}>{r.gravite}</span></td>
                  <td>{r.lieu}</td>
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

