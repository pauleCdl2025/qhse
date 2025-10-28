import { useNavigate, useParams } from 'react-router-dom';
import { AnatomicalPiece } from '../types';
import { storageService } from '../utils/storage';
import { useEffect, useState } from 'react';

export default function AnatomicalPieceDetail() {
  const navigate = useNavigate();
  const { ref } = useParams();
  const [record, setRecord] = useState<AnatomicalPiece | null>(null);

  useEffect(() => {
    if (ref) {
      const data = storageService.getAnatomicalByRef(ref);
      if (data) {
        setRecord(data);
      }
    }
  }, [ref]);

  if (!record) {
    return <div className="container my-4">Enregistrement non trouvé</div>;
  }

  const formatDateTime = (dt?: string) => {
    if (!dt) return '';
    return new Date(dt).toLocaleString('fr-FR');
  };

  return (
    <div className="container my-4">
      <button className="btn btn-sm btn-link mb-3" onClick={() => navigate('/anatomical')}>
        ← Retour
      </button>
      <h3>Détail - {record.ref}</h3>
      <table className="table table-sm">
        <tbody>
          <tr><th>N° d'enregistrement</th><td>{record.ref}</td></tr>
          <tr><th>Date & heure prélèvement</th><td>{formatDateTime(record.date_heure_prelevement)}</td></tr>
          <tr><th>Service / Bloc</th><td>{record.service}</td></tr>
          <tr><th>Identité patient</th><td>{record.patient_identite}</td></tr>
          <tr><th>N° dossier</th><td>{record.dossier_num}</td></tr>
          <tr><th>Type de pièce</th><td>{record.type_piece}</td></tr>
          <tr><th>Conditionnement</th><td>{record.conditionnement}</td></tr>
          <tr><th>Opérateur préleveur</th><td>{record.operateur_preleveur}</td></tr>
          <tr><th>Destination</th><td>{record.destination}</td></tr>
          <tr><th>Date & heure sortie bloc</th><td>{formatDateTime(record.date_heure_sortie_bloc)}</td></tr>
          <tr><th>Transporteur</th><td>{record.transporteur}</td></tr>
          <tr><th>Réception (nom & sign.)</th><td>{record.reception_signature}</td></tr>
          <tr><th>Réf. analyse / N° destruction</th><td>{record.reference_resultat}</td></tr>
          {record.observations && <tr><th>Observations</th><td>{record.observations}</td></tr>}
        </tbody>
      </table>
      <div className="mt-3">
        <button className="btn btn-primary" onClick={() => navigate(`/anatomical/${record.ref}/edit`)}>
          Modifier
        </button>
        <button className="btn btn-secondary ms-2" onClick={() => navigate('/anatomical')}>
          Retour à la liste
        </button>
      </div>
    </div>
  );
}

