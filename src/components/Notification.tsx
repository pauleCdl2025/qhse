import { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Notification({ message, type, onClose, duration = 3000 }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#27AE60" strokeWidth="2"/>
            <path d="M8 12 L11 15 L16 8" stroke="#27AE60" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'error':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#E74C3C" strokeWidth="2"/>
            <path d="M15 9 L9 15 M9 9 L15 15" stroke="#E74C3C" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#3498DB" strokeWidth="2"/>
            <path d="M12 8 V12 M12 16 H12" stroke="#3498DB" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
    }
  };

  const bgColor = type === 'success' ? '#27AE60' : type === 'error' ? '#E74C3C' : '#3498DB';

  return (
    <div className="notification-container">
      <div 
        className="notification"
        style={{
          backgroundColor: bgColor,
          boxShadow: `0 8px 24px ${bgColor}40`
        }}
      >
        <div className="notification-icon">{getIcon()}</div>
        <div className="notification-message">{message}</div>
        <button className="notification-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5 L15 15 M15 5 L5 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

