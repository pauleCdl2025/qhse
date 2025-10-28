import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Audit } from '../types/qhse';
import { qhseStorage } from '../utils/storageQHSE';

export default function AuditsList() {
  const [records, setRecords] = useState<Audit[]>([]);

  useEffect(() => {
    setRecords(qhseStorage.getAllAudits());
  }, []);

  const formatDate = (dt?: string) => {
    if (!dt) return '';
    return new Date(dt).toLocaleDateString('fr-FR');
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Audits & Inspections</h2>
        <Link to="/audits/new" className="btn btn-primary btn-sm">Nouvel audit</Link>
      </div>

      <div className="table-responsive">
        <table className="table table-sm table-striped">
          <thead className="table-light">
            <tr>
              <th>N°</th>
              <th>Type</th>
              <th>Date</th>
              <th>Audité</th>
              <th>Auditeur</th>
              <th>Conformités</th>
              <th>Non-conformités</th>
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
                  <td>{r.numero}</td>
                  <td>{r.type}</td>
                  <td>{formatDate(r.date_audit)}</td>
                  <td>{r.audite}</td>
                  <td>{r.auditeur}</td>
                  <td><span className="badge bg-success">{r.conformites}</span></td>
                  <td><span className="badge bg-warning">{r.non_conformites}</span></td>
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

