import React from 'react';
import { useProjects } from '../context/ProjectContext';

export const EngineerView = () => {
  const { resources } = useProjects();

  const handleSimulateExcel = (msg) => alert(`Modulo Excel: ${msg}`);

  return (
    <div className="card shadow-sm p-4 border-0">
      <h4 className="text-success fw-bold mb-3">Gestión Técnica y Catálogo Base</h4>

      <div className="alert alert-success d-flex justify-content-between align-items-center mb-4">
        <span className="fw-bold small">Catálogo de Precios Unitarios (APU):</span>
        <div>
          <button className="btn btn-success btn-sm fw-bold me-2" onClick={() => handleSimulateExcel('Exportando catálogo de insumos...')}>Exportar Precios (.xlsx)</button>
          <button className="btn btn-outline-success btn-sm fw-bold" onClick={() => handleSimulateExcel('Selecciona archivo con nuevos costos...')}>Importar Excel</button>
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
            {resources.map((r) => (
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
    </div>
  );
};