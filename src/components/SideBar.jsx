import React from 'react';
import { 
  exportAdminConsolidated, 
  exportEngineerAPU, 
  exportClientStateOfPayment 
} from '../services/excelService';

export const SideBar = ({ role, setVistaActual, isOpen, onClose, projects, resources }) => {
  if (!isOpen) return null;

  // export por rol
  const handleExportarSegunRol = () => {
    if (role === 'admin') {
      exportAdminConsolidated(projects);
    } else if (role === 'ingeniero' || role === 'engineer') {
      exportEngineerAPU(resources);
    } else if (role === 'cliente' || role === 'client') {
      exportClientStateOfPayment(projects?.[0]);
    }
    if (typeof onClose === 'function') onClose();
  };

  // cambio vista y cerrar sidebar
  const irA = (vista) => {
    if (typeof setVistaActual === 'function') setVistaActual(vista);
    if (typeof onClose === 'function') onClose();
  };

  return (
    <div 
      className="bg-dark text-white p-3 position-fixed top-0 start-0 h-100 shadow-lg"
      style={{ width: '260px', zIndex: 1050, paddingTop: '70px' }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2 border-secondary">
        <h6 className="text-uppercase text-warning fw-bold mb-0">Navegación</h6>
        <button className="btn-close btn-close-white btn-sm" onClick={onClose}></button>
      </div>

      <div className="list-group list-group-flush gap-1">
        {/* Ir al dashboard */}
        <button 
          className="list-group-item list-group-item-action bg-transparent text-light border-0 py-2 fs-6 text-start"
          onClick={() => irA('dashboard')}
        >
          📊 Panel Principal
        </button>

        {/*descarga rportes*/}
        <button 
          className="list-group-item list-group-item-action bg-transparent text-light border-0 py-2 fs-6 text-start"
          onClick={handleExportarSegunRol}
        >
          📥 Descargar Excel (.xlsx)
        </button>

        {/*soporte tecnico*/}
        <button 
          className="list-group-item list-group-item-action bg-transparent text-light border-0 py-2 fs-6 text-start"
          onClick={() => irA('soporte')}
        >
          🎧 Soporte Técnico
        </button>
      </div>

      <div className="position-absolute bottom-0 start-0 p-3 w-100 border-top border-secondary text-center text-muted small">
        ConstruyeFácil v2.4.0
      </div>
    </div>
  );
};

export default SideBar;