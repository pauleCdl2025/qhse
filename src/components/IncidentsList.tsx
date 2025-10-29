import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Incident } from '../types/qhse';
import { supabaseService } from '../services/supabaseService';
import { FaSearch, FaPlus, FaEye, FaEdit, FaTrash, FaFilter, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import Toast from './Toast';

export default function IncidentsList() {
  const [records, setRecords] = useState<Incident[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<Incident[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [filterGravite, setFilterGravite] = useState('');
  const [sortField, setSortField] = useState<keyof Incident | ''>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<Incident | null>(null);

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const allRecords = await supabaseService.getAllIncidents();
        setRecords(allRecords);
        setFilteredRecords(allRecords);
      } catch (error) {
        console.error('Error loading incidents:', error);
        const fallback = supabaseService.getAllIncidentsSync();
        setRecords(fallback);
        setFilteredRecords(fallback);
      }
    };
    loadRecords();
  }, []);

  useEffect(() => {
    let filtered = [...records];

    // Filtre recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(r =>
        r.numero.toLowerCase().includes(searchLower) ||
        r.lieu.toLowerCase().includes(searchLower) ||
        r.type.toLowerCase().includes(searchLower) ||
        r.classification.toLowerCase().includes(searchLower)
      );
    }

    // Filtre statut
    if (filterStatut) {
      filtered = filtered.filter(r => r.statut === filterStatut);
    }

    // Filtre gravité
    if (filterGravite) {
      filtered = filtered.filter(r => r.gravite === filterGravite);
    }

    // Tri
    if (sortField) {
      filtered.sort((a, b) => {
        const aVal = a[sortField] || '';
        const bVal = b[sortField] || '';
        const comparison = String(aVal).localeCompare(String(bVal), 'fr');
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    } else {
      // Tri par défaut par date (plus récent en premier)
      filtered.sort((a, b) => {
        const dateA = new Date(a.date_incident || '').getTime();
        const dateB = new Date(b.date_incident || '').getTime();
        return dateB - dateA;
      });
    }

    setFilteredRecords(filtered);
    setCurrentPage(1);
  }, [records, searchTerm, filterStatut, filterGravite, sortField, sortDirection]);

  const handleSort = (field: keyof Incident) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = async (id?: number) => {
    if (id && window.confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement ?')) {
      try {
        await supabaseService.deleteIncident(id);
        const updated = records.filter(r => r.id !== id);
        setRecords(updated);
        setToastMessage('✅ Enregistrement supprimé avec succès');
        setShowToast(true);
      } catch (error) {
        setToastMessage('❌ Erreur lors de la suppression');
        setShowToast(true);
      }
    }
  };

  const formatDateTime = (dt?: string) => {
    if (!dt) return '';
    return new Date(dt).toLocaleString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSortIcon = (field: keyof Incident) => {
    if (sortField !== field) return <FaSort className="text-muted" />;
    return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const stats = {
    total: records.length,
    enCours: records.filter(r => r.statut === 'En cours').length,
    resolu: records.filter(r => r.statut === 'Résolu').length,
    critique: records.filter(r => r.gravite === 'Critique').length
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Gestion des Incidents / Accidents / AES</h2>
          <p className="text-muted mb-0">
            {stats.total} enregistrement{stats.total > 1 ? 's' : ''} au total
          </p>
        </div>
        <Link to="/incidents/new" className="btn btn-primary">
          <FaPlus className="me-2" />Nouvelle déclaration
        </Link>
      </div>

      {/* Stats rapides */}
      <div className="row mb-4">
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card card-stat">
            <div className="card-body text-center">
              <div className="display-6">{stats.total}</div>
              <div className="text-muted small">Total</div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card card-stat" style={{borderTop: '4px solid #F39C12'}}>
            <div className="card-body text-center">
              <div className="display-6">{stats.enCours}</div>
              <div className="text-muted small">En cours</div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card card-stat" style={{borderTop: '4px solid #27AE60'}}>
            <div className="card-body text-center">
              <div className="display-6">{stats.resolu}</div>
              <div className="text-muted small">Résolus</div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card card-stat" style={{borderTop: '4px solid #E74C3C'}}>
            <div className="card-body text-center">
              <div className="display-6">{stats.critique}</div>
              <div className="text-muted small">Critiques</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-5">
              <div className="position-relative">
                <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input 
                  type="text" 
                  className="form-control ps-5" 
                  placeholder="Rechercher par N°, lieu, type, classification..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
            </div>
            <div className="col-md-3">
              <select className="form-select" value={filterStatut} onChange={(e) => setFilterStatut(e.target.value)}>
                <option value="">Tous les statuts</option>
                <option value="En cours">En cours</option>
                <option value="Résolu">Résolu</option>
                <option value="Archivé">Archivé</option>
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select" value={filterGravite} onChange={(e) => setFilterGravite(e.target.value)}>
                <option value="">Toutes les gravités</option>
                <option value="Faible">Faible</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Élevée">Élevée</option>
                <option value="Critique">Critique</option>
              </select>
            </div>
            <div className="col-md-1">
              <button 
                className="btn btn-outline-secondary w-100" 
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatut('');
                  setFilterGravite('');
                }}
                title="Réinitialiser les filtres"
              >
                <FaFilter />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th style={{ cursor: 'pointer' }} onClick={() => handleSort('numero')}>
                    <div className="d-flex align-items-center gap-2">
                      N° <span>{getSortIcon('numero')}</span>
                    </div>
                  </th>
                  <th style={{ cursor: 'pointer' }} onClick={() => handleSort('date_incident')}>
                    <div className="d-flex align-items-center gap-2">
                      Date <span>{getSortIcon('date_incident')}</span>
                    </div>
                  </th>
                  <th style={{ cursor: 'pointer' }} onClick={() => handleSort('type')}>
                    <div className="d-flex align-items-center gap-2">
                      Type <span>{getSortIcon('type')}</span>
                    </div>
                  </th>
                  <th>Classification</th>
                  <th style={{ cursor: 'pointer' }} onClick={() => handleSort('gravite')}>
                    <div className="d-flex align-items-center gap-2">
                      Gravité <span>{getSortIcon('gravite')}</span>
                    </div>
                  </th>
                  <th>Lieu</th>
                  <th style={{ cursor: 'pointer' }} onClick={() => handleSort('statut')}>
                    <div className="d-flex align-items-center gap-2">
                      Statut <span>{getSortIcon('statut')}</span>
                    </div>
                  </th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-5">
                      <div className="text-muted">
                        <FaSearch className="mb-2" style={{fontSize: '2rem', opacity: 0.3}} />
                        <p className="mb-0">Aucun enregistrement trouvé</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentRecords.map((r) => (
                    <tr key={r.id}>
                      <td><strong>{r.numero}</strong></td>
                      <td>{formatDateTime(r.date_incident)}</td>
                      <td>{r.type}</td>
                      <td>{r.classification || '-'}</td>
                      <td>
                        <span className={`badge ${
                          r.gravite === 'Critique' ? 'bg-danger' : 
                          r.gravite === 'Élevée' ? 'bg-warning' : 
                          r.gravite === 'Moyenne' ? 'bg-info' : 
                          'bg-secondary'
                        }`}>
                          {r.gravite}
                        </span>
                      </td>
                      <td>{r.lieu}</td>
                      <td>
                        <span className={`badge ${
                          r.statut === 'Résolu' ? 'bg-success' : 
                          r.statut === 'En cours' ? 'bg-warning' : 
                          'bg-secondary'
                        }`}>
                          {r.statut}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <button 
                            className="btn btn-sm btn-outline-primary" 
                            onClick={() => setSelectedRecord(r)}
                            title="Voir les détails"
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-secondary" 
                            onClick={() => {}}
                            title="Modifier"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger" 
                            onClick={() => handleDelete(r.id)}
                            title="Supprimer"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="text-muted">
                Affichage de {indexOfFirstRecord + 1} à {Math.min(indexOfLastRecord, filteredRecords.length)} sur {filteredRecords.length}
              </div>
              <nav>
                <ul className="pagination mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
                      Précédent
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(page)}>
                        {page}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
                      Suivant
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Modal détails */}
      {selectedRecord && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} onClick={() => setSelectedRecord(null)}>
          <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Détails de l'incident #{selectedRecord.numero}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedRecord(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6"><strong>Date:</strong> {formatDateTime(selectedRecord.date_incident)}</div>
                  <div className="col-md-6"><strong>Type:</strong> {selectedRecord.type}</div>
                  <div className="col-md-6"><strong>Classification:</strong> {selectedRecord.classification || '-'}</div>
                  <div className="col-md-6"><strong>Gravité:</strong> <span className="badge bg-danger">{selectedRecord.gravite}</span></div>
                  <div className="col-md-6"><strong>Lieu:</strong> {selectedRecord.lieu}</div>
                  <div className="col-md-6"><strong>Statut:</strong> <span className="badge bg-warning">{selectedRecord.statut}</span></div>
                  <div className="col-12"><strong>Description:</strong> <p>{selectedRecord.description || '-'}</p></div>
                  <div className="col-12"><strong>Actions correctives:</strong> <p>{selectedRecord.actions_correctives || '-'}</p></div>
                  <div className="col-12"><strong>Actions préventives:</strong> <p>{selectedRecord.actions_preventives || '-'}</p></div>
                  <div className="col-md-6"><strong>Responsable:</strong> {selectedRecord.responsable_suivi || '-'}</div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedRecord(null)}>Fermer</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toast show={showToast} message={toastMessage} type="success" onClose={() => setShowToast(false)} />
    </div>
  );
}
