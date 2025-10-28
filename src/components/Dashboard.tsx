import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../utils/storage';

export default function Dashboard() {
  const [stats, setStats] = useState({
    sterilization: { total: 0, conform: 0, nonConform: 0, thisWeek: 0 },
    anatomical: { total: 0, lab: 0, destruction: 0, thisWeek: 0 }
  });

  useEffect(() => {
    const sterilizationRecords = storageService.getAllSterilization();
    const anatomicalRecords = storageService.getAllAnatomical();

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const sterilizationStats = {
      total: sterilizationRecords.length,
      conform: sterilizationRecords.filter(r => r.cycleResult === 'Conforme').length,
      nonConform: sterilizationRecords.filter(r => r.cycleResult === 'Non conforme').length,
      thisWeek: sterilizationRecords.filter(r => {
        if (!r.timestamp) return false;
        return new Date(r.timestamp) >= weekAgo;
      }).length
    };

    const anatomicalStats = {
      total: anatomicalRecords.length,
      lab: anatomicalRecords.filter(r => r.destination === 'Laboratoire').length,
      destruction: anatomicalRecords.filter(r => r.destination === 'Destruction').length,
      thisWeek: anatomicalRecords.filter(r => {
        if (!r.created_at) return false;
        return new Date(r.created_at) >= weekAgo;
      }).length
    };

    setStats({ sterilization: sterilizationStats, anatomical: anatomicalStats });
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Tableau de Bord</h2>
      
      <div className="row g-4 mb-4">
        {/* Stérilisation */}
        <div className="col-md-6">
          <div className="card h-100 card-stat">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h5 className="card-title">Stérilisation</h5>
                  <p className="text-muted mb-0">Équipements médicinaux</p>
                </div>
                <div className="stat-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="8" width="24" height="24" stroke="#4ECDC4" strokeWidth="3" fill="none" rx="2"/>
                    <path d="M18 18 L22 22 M22 18 L18 22" stroke="#4ECDC4" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <div className="row g-2 mt-3">
                <div className="col-6">
                  <div className="stat-item">
                    <div className="stat-value">{stats.sterilization.total}</div>
                    <div className="stat-label">Total</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-item stat-success">
                    <div className="stat-value" style={{color: '#27AE60'}}>{stats.sterilization.conform}</div>
                    <div className="stat-label">Conformes</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-item stat-warning">
                    <div className="stat-value" style={{color: '#F39C12'}}>{stats.sterilization.nonConform}</div>
                    <div className="stat-label">Non conformes</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-item stat-info">
                    <div className="stat-value" style={{color: '#3498DB'}}>{stats.sterilization.thisWeek}</div>
                    <div className="stat-label">Cette semaine</div>
                  </div>
                </div>
              </div>
              
              {/* Barre de progression */}
              {stats.sterilization.total > 0 && (
                <div className="mt-3">
                  <div className="progress" style={{ height: '8px', borderRadius: '10px', overflow: 'hidden' }}>
                    <div 
                      className="bg-success" 
                      role="progressbar" 
                      style={{ 
                        width: `${(stats.sterilization.conform / stats.sterilization.total) * 100}%`,
                        background: 'linear-gradient(90deg, #27AE60, #2ECC71)',
                        transition: 'width 1s ease'
                      }}
                    ></div>
                  </div>
                  <div className="text-center text-muted mt-1" style={{fontSize: '0.75rem'}}>
                    {((stats.sterilization.conform / stats.sterilization.total) * 100).toFixed(1)}% conformes
                  </div>
                </div>
              )}
              <Link to="/sterilization" className="btn btn-primary btn-sm mt-3 w-100">
                Voir le registre →
              </Link>
            </div>
          </div>
        </div>

        {/* Pièces Anatomiques */}
        <div className="col-md-6">
          <div className="card h-100 card-stat">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h5 className="card-title">Pièces Anatomiques</h5>
                  <p className="text-muted mb-0">Traçabilité complète</p>
                </div>
                <div className="stat-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="15" r="7" stroke="#66B8D6" strokeWidth="3" fill="none"/>
                    <path d="M12 30 Q12 25, 20 25 Q28 25, 28 30" stroke="#66B8D6" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <div className="row g-2 mt-3">
                <div className="col-6">
                  <div className="stat-item">
                    <div className="stat-value">{stats.anatomical.total}</div>
                    <div className="stat-label">Total</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-item stat-success">
                    <div className="stat-value" style={{color: '#4ECDC4'}}>{stats.anatomical.lab}</div>
                    <div className="stat-label">Laboratoire</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-item stat-warning">
                    <div className="stat-value" style={{color: '#95A5A6'}}>{stats.anatomical.destruction}</div>
                    <div className="stat-label">Destruction</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-item stat-info">
                    <div className="stat-value" style={{color: '#3498DB'}}>{stats.anatomical.thisWeek}</div>
                    <div className="stat-label">Cette semaine</div>
                  </div>
                </div>
              </div>
              
              {/* Barre de progression */}
              {stats.anatomical.total > 0 && (
                <div className="mt-3">
                  <div className="progress" style={{ height: '8px', borderRadius: '10px', overflow: 'hidden' }}>
                    <div 
                      className="bg-success" 
                      role="progressbar" 
                      style={{ 
                        width: `${(stats.anatomical.lab / stats.anatomical.total) * 100}%`,
                        background: 'linear-gradient(90deg, #4ECDC4, #66B8D6)',
                        transition: 'width 1s ease'
                      }}
                    ></div>
                  </div>
                  <div className="text-center text-muted mt-1" style={{fontSize: '0.75rem'}}>
                    {((stats.anatomical.lab / stats.anatomical.total) * 100).toFixed(1)}% vers laboratoire
                  </div>
                </div>
              )}
              <Link to="/anatomical" className="btn btn-primary btn-sm mt-3 w-100">
                Voir le registre →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card quick-action">
            <div className="card-body">
              <h6 className="card-title">Nouvel enregistrement</h6>
              <p className="text-muted">Créez un nouvel enregistrement de stérilisation</p>
              <Link to="/sterilization/new" className="btn btn-outline-primary">
                Stérilisation
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card quick-action">
            <div className="card-body">
              <h6 className="card-title">Nouvel enregistrement</h6>
              <p className="text-muted">Créez un nouvel enregistrement de pièce anatomique</p>
              <Link to="/anatomical/new" className="btn btn-outline-primary">
                Pièce Anatomique
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

