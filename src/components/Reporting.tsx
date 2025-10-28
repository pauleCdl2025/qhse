import { useState } from 'react';

export default function Reporting() {
  const [reportType, setReportType] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleGenerate = () => {
    if (!reportType) {
      alert('Veuillez sélectionner un type de rapport');
      return;
    }
    alert(`Génération du rapport ${reportType} en cours...`);
  };

  const handleExport = (format: 'pdf' | 'excel' | 'word') => {
    alert(`Export ${format.toUpperCase()} en préparation...`);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Reporting & Exportation</h2>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Génération de Rapports</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Type de rapport *</label>
              <select className="form-select" value={reportType} onChange={(e) => setReportType(e.target.value)} required>
                <option value="">Sélectionner...</option>
                <option value="incidents">Incidents & Accidents</option>
                <option value="maintenance">Maintenance & Biomédical</option>
                <option value="audits">Audits & Inspections</option>
                <option value="formations">Formations</option>
                <option value="dechets">Déchets Médicaux</option>
                <option value="sterilization">Stérilisation</option>
                <option value="risques">Gestion des Risques</option>
                <option value="dashboard">Dashboard QHSE Global</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Date début</label>
              <input type="date" className="form-control" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Date fin</label>
              <input type="date" className="form-control" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
            <div className="col-12">
              <button className="btn btn-primary" onClick={handleGenerate}>Générer le rapport</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="mb-3" style={{fontSize: '3rem'}}>📄</div>
              <h5 className="card-title">Export PDF</h5>
              <p className="card-text text-muted">Génère un rapport PDF professionnel avec graphiques et statistiques</p>
              <button className="btn btn-outline-danger" onClick={() => handleExport('pdf')}>Export PDF</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="mb-3" style={{fontSize: '3rem'}}>📊</div>
              <h5 className="card-title">Export Excel</h5>
              <p className="card-text text-muted">Tableaux Excel exploitables avec formules et graphiques</p>
              <button className="btn btn-outline-success" onClick={() => handleExport('excel')}>Export Excel</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="mb-3" style={{fontSize: '3rem'}}>📝</div>
              <h5 className="card-title">Export Word</h5>
              <p className="card-text text-muted">Document Word formaté pour rapports officiels</p>
              <button className="btn btn-outline-primary" onClick={() => handleExport('word')}>Export Word</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h5>Rapports Automatiques Disponibles</h5>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Rapport mensuel QHSE
            <button className="btn btn-sm btn-outline-primary">Générer</button>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Rapport annuel de conformité
            <button className="btn btn-sm btn-outline-primary">Générer</button>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Bilan des incidents trimestriel
            <button className="btn btn-sm btn-outline-primary">Générer</button>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            État des formations
            <button className="btn btn-sm btn-outline-primary">Générer</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

