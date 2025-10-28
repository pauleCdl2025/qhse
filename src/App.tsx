import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import EquipmentSterilizationForm from './components/EquipmentSterilizationForm';
import SterilizationList from './components/SterilizationList';
import AnatomicalPiecesForm from './components/AnatomicalPiecesForm';
import AnatomicalPiecesList from './components/AnatomicalPiecesList';
import AnatomicalPieceDetail from './components/AnatomicalPieceDetail';
import Logo from './components/Logo';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar mb-4 sticky-top">
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <Logo />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link custom-nav-link" to="/sterilization">
                    Stérilisation
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-nav-link" to="/anatomical">
                    Pièces Anatomiques
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sterilization" element={<SterilizationList />} />
            <Route path="/sterilization/new" element={<EquipmentSterilizationForm />} />
            <Route path="/anatomical" element={<AnatomicalPiecesList />} />
            <Route path="/anatomical/new" element={<AnatomicalPiecesForm />} />
            <Route path="/anatomical/:ref" element={<AnatomicalPieceDetail />} />
            <Route path="/anatomical/:ref/edit" element={<AnatomicalPiecesForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12 text-center mb-5">
          <h1 className="display-4 custom-title">Système de Traçabilité</h1>
          <p className="lead text-muted">Gestion complète de la traçabilité des équipements médicaux et pièces anatomiques</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-circle me-3">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" stroke="#4ECDC4" strokeWidth="2"/>
                    <rect x="12" y="12" width="16" height="16" stroke="#4ECDC4" strokeWidth="2" fill="none"/>
                    <path d="M18 18 L22 22 M22 18 L18 22" stroke="#4ECDC4" strokeWidth="2"/>
                  </svg>
                </div>
                <h5 className="card-title mb-0">Stérilisation des Équipements</h5>
              </div>
              <p className="card-text text-muted">
                Enregistrement du processus complet de stérilisation des dispositifs médicaux réutilisables.
              </p>
              <Link to="/sterilization" className="btn btn-primary">
                Accéder au registre
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-circle me-3">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" stroke="#66B8D6" strokeWidth="2"/>
                    <circle cx="20" cy="15" r="5" stroke="#66B8D6" strokeWidth="2" fill="none"/>
                    <path d="M12 28 Q12 22, 20 22 Q28 22, 28 28" stroke="#66B8D6" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <h5 className="card-title mb-0">Pièces Anatomiques</h5>
              </div>
              <p className="card-text text-muted">
                Traçabilité complète des pièces anatomiques depuis la collecte jusqu'à la destination finale.
              </p>
              <Link to="/anatomical" className="btn btn-primary">
                Accéder au registre
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

