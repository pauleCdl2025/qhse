import { useEffect } from 'react';

interface ToastProps {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

export default function Toast({ show, message, type, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const bgClass = {
    success: 'bg-success',
    error: 'bg-danger',
    info: 'bg-info',
    warning: 'bg-warning'
  }[type];

  return (
    <div className={`toast show position-fixed top-0 end-0 m-3 ${bgClass} text-white`} style={{zIndex: 9999}}>
      <div className="toast-header">
        <strong className="me-auto">Notification</strong>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
      <div className="toast-body">
        {message}
      </div>
    </div>
  );
}

