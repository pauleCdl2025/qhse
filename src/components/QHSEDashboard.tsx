import { Link } from 'react-router-dom';
import { qhseStorage } from '../utils/storageQHSE';

export default function QHSEDashboard() {
  const stats = qhseStorage.getStats();
  const modules = [
    {
      id: 'sterilization',
      icon: '🔬',
      title: 'Stérilisation',
      desc: 'Traçabilité des équipements médicaux stérilisés',
      color: '#4ECDC4',
      path: '/sterilization'
    },
    {
      id: 'anatomical',
      icon: '🔬',
      title: 'Pièces Anatomiques',
      desc: 'Traçabilité complète des pièces anatomiques',
      color: '#66B8D6',
      path: '/anatomical'
    },
    {
      id: 'incidents',
      icon: '⚠️',
      title: 'Incidents / Accidents / AES',
      desc: 'Déclaration et suivi des actions correctives',
      color: '#E74C3C',
      path: '/incidents'
    },
    {
      id: 'maintenance',
      icon: '🔧',
      title: 'Maintenance & Biomédical',
      desc: 'Planification et suivi des interventions',
      color: '#F39C12',
      path: '/maintenance'
    },
    {
      id: 'audits',
      icon: '📋',
      title: 'Audits & Inspections',
      desc: 'Programmation et checklists d\'audit',
      color: '#27AE60',
      path: '/audits'
    },
    {
      id: 'formations',
      icon: '🎓',
      title: 'Formations & Compétences',
      desc: 'Suivi des formations et habilitations',
      color: '#3498DB',
      path: '/formations'
    },
    {
      id: 'dechets',
      icon: '♻️',
      title: 'Déchets Médicaux',
      desc: 'Traçabilité et élimination',
      color: '#95A5A6',
      path: '/dechets'
    },
    {
      id: 'risques',
      icon: '🛡️',
      title: 'Gestion des Risques',
      desc: 'Identification et évaluation des risques',
      color: '#8E44AD',
      path: '/risques'
    },
    {
      id: 'ged',
      icon: '📁',
      title: 'GED Documentaire',
      desc: 'Gestion documentaire QHSE',
      color: '#16A085',
      path: '/ged'
    },
    {
      id: 'linge',
      icon: '🧺',
      title: 'Traçabilité du Linge',
      desc: 'Suivi du linge avec génération automatique de codes',
      color: '#9B59B6',
      path: '/linge'
    },
    {
      id: 'reporting',
      icon: '📊',
      title: 'Reporting',
      desc: 'Export et rapports périodiques',
      color: '#34495E',
      path: '/reporting'
    }
  ];

  const totalRecords = Object.values(stats).reduce((sum, val) => sum + val, 0);

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="display-4 custom-title">Tableau de Bord QHSE</h1>
        <p className="lead text-muted">Gestion complète de la Qualité, Hygiène, Sécurité et Environnement</p>
        <div className="alert alert-info d-inline-block">
          <strong>📊 Total d'enregistrements : {totalRecords}</strong>
        </div>
      </div>

      {/* Statistiques Globales */}
      <div className="row mb-4">
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card card-stat" style={{borderTop: '4px solid #E74C3C'}}>
            <div className="card-body text-center">
              <div className="display-4">{stats.incidents}</div>
              <div className="text-muted">Incidents</div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card card-stat" style={{borderTop: '4px solid #F39C12'}}>
            <div className="card-body text-center">
              <div className="display-4">{stats.maintenance}</div>
              <div className="text-muted">Maintenances</div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card card-stat" style={{borderTop: '4px solid #27AE60'}}>
            <div className="card-body text-center">
              <div className="display-4">{stats.audits}</div>
              <div className="text-muted">Audits</div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card card-stat" style={{borderTop: '4px solid #3498DB'}}>
            <div className="card-body text-center">
              <div className="display-4">{stats.formations}</div>
              <div className="text-muted">Formations</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {modules.map((module) => (
          <div key={module.id} className="col-md-6 col-lg-4">
            <div className="card h-100 module-card" style={{ borderTop: `4px solid ${module.color}` }}>
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                  <div className="module-icon me-3" style={{ fontSize: '2.5rem' }}>
                    {module.icon}
                  </div>
                  <h5 className="card-title mb-0">{module.title}</h5>
                </div>
                <p className="card-text text-muted flex-grow-1">{module.desc}</p>
                <Link to={module.path} className="btn btn-primary btn-sm">
                  Accéder au module →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

