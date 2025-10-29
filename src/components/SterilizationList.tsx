import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../utils/storage';
import { supabaseService } from '../services/supabaseService';

export default function SterilizationList() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const all = await supabaseService.getAllSterilization();
      setRecords(all);
    } catch (error) {
      console.error('Error loading sterilization:', error);
      setRecords(storageService.getAllSterilization());
    }
  };

  const formatDateTime = (dt?: string) => {
    if (!dt) return '';
    return new Date(dt).toLocaleString('fr-FR');
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Registre - Stérilisation des Équipements</h2>
        <button className="btn btn-sm btn-primary" onClick={() => navigate('/sterilization/new')}>
          Nouvel enregistrement
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-sm table-striped">
          <thead className="table-light">
            <tr>
              <th>N° Enregistrement</th>
              <th>Collecte</th>
              <th>Service</th>
              <th>Type Matériel</th>
              <th>Quantité</th>
              <th>Agent</th>
              <th>État</th>
              <th>Résultat Cycle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center">Aucun enregistrement</td>
              </tr>
            ) : (
              records.map((r, idx) => (
                <tr key={r.id || idx}>
                  <td>{r.registrationNumber}</td>
                  <td>{formatDateTime(r.collectionDateTime)}</td>
                  <td>{r.originService}</td>
                  <td>{r.equipmentType}</td>
                  <td>{r.quantityCollected}</td>
                  <td>{r.collectorName}</td>
                  <td>{r.materialCondition}</td>
                  <td>{r.cycleResult}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => alert('Détail: ' + JSON.stringify(r, null, 2))}
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

