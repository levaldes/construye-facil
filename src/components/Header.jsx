import React from 'react';

export const Header = ({ onBack, showBackButton }) => {
  return (
    <header className="p-3 mb-4 rounded-3 shadow-sm bg-dark text-white d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-3">
        <div className="bg-primary px-3 py-2 rounded-3 fw-bold text-white fs-5">CF</div>
        <div>
          <h4 className="h5 mb-0 fw-bold">ConstruyeFácil</h4>
          <small className="text-muted">Control & Gestión de Obras</small>
        </div>
      </div>
      {showBackButton && (
        <button className="btn btn-outline-light btn-sm fw-bold px-3" onClick={onBack}>
          ← Volver al Menú
        </button>
      )}
    </header>
  );
};