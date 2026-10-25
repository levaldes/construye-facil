import React, { useState } from 'react';
import { SideBar } from './SideBar';

export const Header = ({ userName, userRole, onLogout, projectsData, setVistaActual }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <>
      <header className="p-3 mb-4 rounded-3 shadow-sm bg-dark text-white d-flex justify-content-between align-items-center border-start border-4 border-warning">
        <div className="d-flex align-items-center gap-3">
          <button 
            className="btn btn-outline-warning btn-sm p-2 rounded-3 d-flex align-items-center justify-content-center"
            onClick={() => setIsSideBarOpen(true)}
            title="Abrir menú de usuario"
            style={{ width: '38px', height: '38px' }}
          >
            ☰
          </button>

          <div 
            className="d-flex align-items-center justify-content-center rounded-3 text-dark fw-bold shadow-sm"
            style={{
              width: '42px',
              height: '42px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              fontSize: '1.1rem',
              border: '2px solid #fbbf24'
            }}
          >
            CF
          </div>

          <div>
            <h4 className="h5 mb-0 fw-bold">
              Construye<span className="text-warning">Fácil</span>
            </h4>
            <small className="text-muted">
              {userName ? `${userName} (${userRole ? userRole.toUpperCase() : 'GENERAL'})` : 'Control & Gestión de Obras'}
            </small>
          </div>
        </div>

        {onLogout && (
          <button className="btn btn-outline-danger btn-sm fw-bold px-3" onClick={onLogout}>
            Cerrar Sesión
          </button>
        )}
      </header>

      <SideBar 
        isOpen={isSideBarOpen} 
        onClose={() => setIsSideBarOpen(false)} 
        role={userRole} 
        setVistaActual={setVistaActual}
        projects={projectsData}
      />
    </>
  );
};

export default Header;