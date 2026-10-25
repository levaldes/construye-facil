import React from 'react';

export const SideBar = ({ isOpen, onClose, userName, userRole }) => {
  if (!isOpen) return null;

  const renderRoleActions = () => {
    switch (userRole?.toLowerCase()) {
      case 'admin':
        return (
          <div className="list-group list-group-flush">
            <span className="text-warning extra-small fw-bold text-uppercase px-3 mb-2">Herramientas Administrador</span>
            <button className="list-group-item list-group-item-action bg-transparent text-light border-0 py-2 fs-6">
              📊 Exportar Matriz Consolidada
            </button>
            <button className="list-group-item list-group-item-action bg-transparent text-light border-0 py-2 fs-6">
              ⚠️ Ver Alertas Presupuestarias
            </button>
            <button className="list-group-item list-group-item-action bg-transparent text-light border-0 py-2 fs-6">
              👥 Gestión de Usuarios
            </button>
          </div>
        );
      case 'jefe':
      case 'capataz':
        return (
          <div className="list-group list-group-flush">
            <span className="text-warning extra-small fw-bold text-uppercase px-3 mb-2">Herramientas Terreno</span>
            <button className="list-group-item list-group-item-action bg-transparent text-light border-0 py-2 fs-6">
              📝 Nuevo Registro de Avance
            </button>
            <button className="list-group-item list-group-item-action bg-transparent text-light border-0 py-2 fs-6">
              📦 Solicitud de Materiales
            </button>
            <button className="list-group-item list-group-item-action bg-transparent text-light border-0 py-2 fs-6">
              📋 Bitácora Digital
            </button>
          </div>
        );
      case 'ingeniero':
        return (
          <div className="list-group list-group-flush">
            <span className="text-warning extra-small fw-bold text-uppercase px-3 mb-2">Gestión Técnica APU</span>
            <button className="list-group-item list-group-item-action bg-transparent text-light border-0 py-2 fs-6">
              📐 Catálogo de Recursos
            </button>
            <button className="list-group-item list-group-item-action bg-transparent text-light border-0 py-2 fs-6">
              📊 Exportar Precios (.xlsx)
            </button>
            <button className="list-group-item list-group-item-action bg-transparent text-light border-0 py-2 fs-6">
              📥 Importar Tarifario
            </button>
          </div>
        );
      case 'cliente':
        return (
          <div className="list-group list-group-flush">
            <span className="text-warning extra-small fw-bold text-uppercase px-3 mb-2">Portal Transparencia</span>
            <button className="list-group-item list-group-item-action bg-transparent text-light border-0 py-2 fs-6">
              📄 Certificado de Avance Oficial
            </button>
            <button className="list-group-item list-group-item-action bg-transparent text-light border-0 py-2 fs-6">
              🖼️ Avances Fotográficos
            </button>
            <button className="list-group-item list-group-item-action bg-transparent text-light border-0 py-2 fs-6">
              💬 Contactar Inspección Técnica
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100" 
      style={{ zIndex: 1050, backgroundColor: 'rgba(15, 23, 42, 0.65)' }}
      onClick={onClose}
    >
      <div 
        className="bg-dark text-white h-100 p-4 d-flex flex-column justify-content-between shadow-lg"
        style={{ width: '320px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom border-secondary">
            <div className="d-flex align-items-center gap-2">
              <span className="fs-3">🏗️</span>
              <h5 className="fw-bold text-warning mb-0">Panel del Sistema</h5>
            </div>
            <button className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="p-3 bg-secondary bg-opacity-25 rounded-3 mb-4 border border-secondary">
            <small className="text-warning fw-bold text-uppercase d-block extra-small">Sesión Activa</small>
            <h6 className="fw-bold text-white mb-1">Bienvenido/a, {userName || 'Usuario'}</h6>
            <span className="badge bg-warning text-dark extra-small text-uppercase">
              Rol: {userRole || 'General'}
            </span>
          </div>

          {renderRoleActions()}
        </div>

        <div className="pt-3 border-top border-secondary text-center">
          <p className="extra-small text-muted mb-0">
            ConstruyeFácil v2.0 • 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;