import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import EquipmentSterilizationForm from './components/EquipmentSterilizationForm';
import SterilizationList from './components/SterilizationList';
import AnatomicalPiecesForm from './components/AnatomicalPiecesForm';
import AnatomicalPiecesList from './components/AnatomicalPiecesList';
import AnatomicalPieceDetail from './components/AnatomicalPieceDetail';
import Logo from './components/Logo';
// import Dashboard from './components/Dashboard';
import QHSEDashboard from './components/QHSEDashboard';
import IncidentsForm from './components/IncidentsForm';
import MaintenanceForm from './components/MaintenanceForm';
import AuditsForm from './components/AuditsForm';
import FormationsForm from './components/FormationsForm';
import DechetsForm from './components/DechetsForm';
import RisquesForm from './components/RisquesForm';
import GedForm from './components/GedForm';
import Reporting from './components/Reporting';
import IncidentsList from './components/IncidentsList';
import MaintenanceList from './components/MaintenanceList';
import AuditsList from './components/AuditsList';
import FormationsList from './components/FormationsList';
import DechetsList from './components/DechetsList';
import RisquesList from './components/RisquesList';
import GedList from './components/GedList';
import LingeForm from './components/LingeForm';
import LingeList from './components/LingeList';
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
                  <Link className="nav-link custom-nav-link" to="/">
                    Dashboard QHSE
                  </Link>
                </li>
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
                <li className="nav-item">
                  <Link className="nav-link custom-nav-link" to="/linge">
                    Traçabilité Linge
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<QHSEDashboard />} />
            <Route path="/sterilization" element={<SterilizationList />} />
            <Route path="/sterilization/new" element={<EquipmentSterilizationForm />} />
            <Route path="/anatomical" element={<AnatomicalPiecesList />} />
            <Route path="/anatomical/new" element={<AnatomicalPiecesForm />} />
            <Route path="/anatomical/:ref" element={<AnatomicalPieceDetail />} />
            <Route path="/anatomical/:ref/edit" element={<AnatomicalPiecesForm />} />
            {/* QHSE Routes */}
            <Route path="/incidents" element={<IncidentsList />} />
            <Route path="/incidents/new" element={<IncidentsForm />} />
            <Route path="/maintenance" element={<MaintenanceList />} />
            <Route path="/maintenance/new" element={<MaintenanceForm />} />
            <Route path="/audits" element={<AuditsList />} />
            <Route path="/audits/new" element={<AuditsForm />} />
            <Route path="/formations" element={<FormationsList />} />
            <Route path="/formations/new" element={<FormationsForm />} />
            <Route path="/dechets" element={<DechetsList />} />
            <Route path="/dechets/new" element={<DechetsForm />} />
            <Route path="/risques" element={<RisquesList />} />
            <Route path="/risques/new" element={<RisquesForm />} />
            <Route path="/ged" element={<GedList />} />
            <Route path="/ged/new" element={<GedForm />} />
            <Route path="/linge" element={<LingeList />} />
            <Route path="/linge/new" element={<LingeForm />} />
            <Route path="/reporting" element={<Reporting />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

