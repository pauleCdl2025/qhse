import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnatomicalPiece } from '../types';
import { storageService } from '../utils/storage';

export default function AnatomicalPiecesList() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<AnatomicalPiece[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<AnatomicalPiece[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState({
    q: '',
    destination: '',
    date_from: '',
    date_to: ''
  });

  useEffect(() => {
    loadRecords();
  }, [filters]);

  useEffect(() => {
    const filtered = storageService.filterAnatomical(filters);
    
    // Tri
    let sorted = [...filtered];
    if (sortField) {
      sorted.sort((a, b) => {
        const aVal = (a as any)[sortField];
        const bVal = (b as any)[sortField];
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    setRecords(sorted);
    setCurrentPage(1);
  }, [filters, sortField, sortDirection]);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setFilteredRecords(records.slice(start, end));
  }, [records, currentPage]);

  const loadRecords = () => {
    const filtered = storageService.filterAnatomical(filters);
    setRecords(filtered);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFilters({ q: '', destination: '', date_from: '', date_to: '' });
  };

  const formatDateTime = (dt?: string) => {
    if (!dt) return '';
    return new Date(dt).toLocaleString('fr-FR');
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Registre - Pièces Anatomiques</h2>
        <button className="btn btn-sm btn-primary" onClick={() => navigate('/anatomical/new')}>
          Nouvel enregistrement
        </button>
      </div>

      <form className="row g-2 mb-3" onSubmit={(e) => { e.preventDefault(); loadRecords(); }}>
        <div className="col-auto">
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Recherche (ref / patient / dossier)"
            value={filters.q}
            onChange={(e) => handleFilterChange('q', e.target.value)}
          />
        </div>
        <div className="col-auto">
          <select
            className="form-select form-select-sm"
            value={filters.destination}
            onChange={(e) => handleFilterChange('destination', e.target.value)}
          >
            <option value="">Toutes destinations</option>
            <option value="Laboratoire">Laboratoire</option>
            <option value="Destruction">Destruction</option>
          </select>
        </div>
        <div className="col-auto">
          <input
            className="form-control form-control-sm"
            type="date"
            placeholder="Date from"
            value={filters.date_from}
            onChange={(e) => handleFilterChange('date_from', e.target.value)}
          />
        </div>
        <div className="col-auto">
          <input
            className="form-control form-control-sm"
            type="date"
            placeholder="Date to"
            value={filters.date_to}
            onChange={(e) => handleFilterChange('date_to', e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-sm btn-outline-primary">Filtrer</button>
          <button type="button" className="btn btn-sm btn-outline-secondary ms-2" onClick={handleReset}>
            Réinitialiser
          </button>
        </div>
      </form>

      <div className="table-responsive">
          <table className="table table-sm table-striped">
          <thead className="table-light">
            <tr>
              <th 
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('ref')}
              >
                Ref {sortField === 'ref' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('date_heure_prelevement')}
              >
                Prélèvement {sortField === 'date_heure_prelevement' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('patient_identite')}
              >
                Patient {sortField === 'patient_identite' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th>Type</th>
              <th>Conditionnement</th>
              <th 
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('destination')}
              >
                Destination {sortField === 'destination' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th>Transporteur</th>
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
                <tr key={r.ref}>
                  <td>{r.ref}</td>
                  <td>{formatDateTime(r.date_heure_prelevement)}</td>
                  <td>
                    {r.patient_identite}
                    <br />
                    <small className="text-muted">{r.dossier_num}</small>
                  </td>
                  <td>{r.type_piece}</td>
                  <td>{r.conditionnement}</td>
                  <td>{r.destination}</td>
                  <td>{r.transporteur}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-1"
                      onClick={() => navigate(`/anatomical/${r.ref}`)}
                    >
                      Détails
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => navigate(`/anatomical/${r.ref}/edit`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {records.length > itemsPerPage && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="text-muted">
            Affichage {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, records.length)} sur {records.length}
          </div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Précédent
                </button>
              </li>
              {[...Array(Math.ceil(records.length / itemsPerPage))].map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === Math.ceil(records.length / itemsPerPage) ? 'disabled' : ''}`}>
                <button 
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === Math.ceil(records.length / itemsPerPage)}
                >
                  Suivant
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

