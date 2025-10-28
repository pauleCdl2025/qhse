export default function Logo() {
  return (
    <div className="d-flex align-items-center" style={{ height: '50px' }}>
      {/* Logo depuis URL */}
      <div className="logo-icon-container">
        <img 
          src="https://res.cloudinary.com/dd64mwkl2/image/upload/v1758286702/Centre_Diagnostic-Logo_xhxxpv.png" 
          alt="Centre Diagnostic Logo" 
          style={{ height: '50px', width: 'auto' }}
        />
      </div>
    </div>
  );
}

