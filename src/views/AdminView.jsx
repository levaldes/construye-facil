import React from 'react';
import { useProjects } from '../context/ProjectContext';
import { MetricCard } from '../components/MetricCard';
import { exportAdminConsolidated } from '../services/excelService';

export const AdminView = () => {
  const { projects } = useProjects();

  const handleExportExcel = () => {
    exportAdminConsolidated(projects);
  };

  return (
    <div className="card shadow-sm p-4 border-0">
      <h4 className="text-primary fw-bold mb-3">Panel del Administrador</h4>

      <div className="alert alert-success d-flex justify-content-between align-items-center mb-4">
        <span className="fw-bold small">Reportes Consolidados de la Empresa:</span>
        <button className="btn btn-success btn-sm fw-bold" onClick={handleExportExcel}>
          Exportar Matriz General (.xlsx)
        </button>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4"><MetricCard title="Proyectos Activos" value="15" /></div>
        <div className="col-md-4"><MetricCard title="Presupuesto Gestionado" value="$1.230.000.000 CLP" /></div>
        <div className="col-md-4"><MetricCard title="Desviación Promedio" value="+12%" textColor="text-danger" /></div>
      </div>

      <div className="alert alert-danger d-flex justify-content-between align-items-center mb-4">
        <div><strong>Alerta Presupuestaria:</strong> El proyecto <em>PR001 - Edificio Residencial San Miguel</em> supera el costo previsto en mano de obra.</div>
        <span className="badge bg-primary">Revisar</span>
      </div>

      <h5 className="fw-bold mb-3">Catálogo de Proyectos</h5>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Código</th>
              <th>Proyecto</th>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Presupuesto</th>
              <th>Avance</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td className="fw-bold">{p.id}</td>
                <td>{p.name}</td>
                <td>{p.client}</td>
                <td>{p.type}</td>
                <td>{p.budget}</td>
                <td>
                  <small>{p.progress}%</small>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-primary" style={{ width: `${p.progress}%` }}></div>
                  </div>
                </td>
                <td>
                  <span className={`badge ${p.status === 'En ejecución' ? 'bg-primary' : 'bg-warning text-dark'}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};