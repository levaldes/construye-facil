import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';
import { exportarPreciosAPU } from '../services/excelService';

export const EngineerView = () => {
  const { resources } = useProjects();
  
  // controlar el modal de importar
  const [mostrarModalImportar, setMostrarModalImportar] = useState(false);

  // manejo export
  const handleExportar = () => {
    exportarPreciosAPU(resources);
  };

  return (
    <div className="card shadow-sm p-4 border-0">
      <h4 className="text-success fw-bold mb-3">Gestión Técnica y Catálogo Base</h4>

      <div className="alert alert-success d-flex justify-content-between align-items-center mb-4">
        <span className="fw-bold small">Catálogo de Precios Unitarios (APU):</span>
        <div>
          <button className="btn btn-success btn-sm fw-bold me-2" onClick={handleExportar}>
            Exportar Precios (.xlsx)
          </button>
          <button 
            className="btn btn-outline-success btn-sm fw-bold" 
            onClick={() => setMostrarModalImportar(true)}
          >
            Importar Excel
          </button>
        </div>
      </div>

      <h5 className="fw-bold mb-3">Catálogo Base de Recursos</h5>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Código</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Unidad</th>
              <th>Costo Unitario</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {resources && resources.map((r) => (
              <tr key={r.id}>
                <td className="fw-bold">{r.id}</td>
                <td>{r.type}</td>
                <td>{r.description}</td>
                <td>{r.unit}</td>
                <td>{r.cost}</td>
                <td><span className="badge bg-success">{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarModalImportar && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white border-secondary shadow-lg">
              <div className="modal-header border-secondary">
                <h5 className="modal-title fw-bold text-warning d-flex align-items-center gap-2">
                  <span>⚙️</span> Módulo en Fase de Integración
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setMostrarModalImportar(false)}
                ></button>
              </div>
              <div className="modal-body py-4">
                <div className="p-3 bg-secondary bg-opacity-25 rounded-3 border border-secondary mb-3">
                  <span className="badge bg-warning text-dark mb-2 text-uppercase fw-bold">Actualización de Sistema</span>
                  <p className="mb-0 text-light small lead fs-6">
                    La ingesta e importación masiva de estructuras de costos (APU) mediante matrices <strong>.xlsx / .csv</strong> estará habilitada para las siguientes etapas operativas del proyecto.
                  </p>
                </div>
                <small className="text-muted d-block">
                  * Por el momento, la parametrización de partidas e insumos se gestiona mediante la base centralizada del sistema.
                </small>
              </div>
              <div className="modal-footer border-secondary">
                <button 
                  type="button" 
                  className="btn btn-warning fw-bold px-4 text-dark"
                  onClick={() => setMostrarModalImportar(false)}
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngineerView;