import React from 'react';

export const Header = ({ userName, userRole, onLogout }) => {
  return (
    <header className="p-3 mb-4 rounded-3 shadow-sm bg-dark text-white d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-3">
        <div className="bg-primary px-3 py-2 rounded-3 fw-bold text-white fs-5">CF</div>
        <div>
          <h4 className="h5 mb-0 fw-bold">ConstruyeFácil</h4>
          <small className="text-muted">
            {userName ? `${userName} (${userRole.toUpperCase()})` : 'Control & Gestión de Obras'}
          </small>
        </div>
      </div>
      {onLogout && (
        <button className="btn btn-outline-danger btn-sm fw-bold px-3" onClick={onLogout}>
          Cerrar Sesión
        </button>
      )}
    </header>
  );
};