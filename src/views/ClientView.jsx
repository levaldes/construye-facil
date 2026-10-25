import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';
import { MetricCard } from '../components/MetricCard';
import { exportClientStateOfPayment } from '../services/excelService';

export const ClientView = () => {
  const { projects, user } = useProjects();

  const [selectedClient, setSelectedClient] = useState(
    user?.name || 'Inmobiliaria Sur'
  );

  const filteredProjects = projects.filter(
    (p) => p.client.toLowerCase() === selectedClient.toLowerCase()
  );

  const handleExportExcel = () => {
    // Toma el primer proyecto filtrado del cliente activo para generar su certificado
    const currentProject = filteredProjects[0];
    exportClientStateOfPayment(currentProject);
  };

  return (
    <div className="card shadow-sm p-4 border-0">
      <h4 className="text-info fw-bold mb-3">
        Portal de Transparencia - Seguimiento Cliente
      </h4>

      <div className="card bg-light border-info mb-4">
        <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 py-2">
          <div>
            <span className="badge bg-info text-white me-2">Privacidad de Datos</span>
            <small className="text-muted fw-bold">
              Acceso restringido por contrato para el cliente autenticado
            </small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <label className="small fw-bold text-nowrap mb-0">Cliente Activo:</label>
            <select
              className="form-select form-select-sm fw-bold border-info"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              <option value="Inmobiliaria Sur">Inmobiliaria Sur (PR001)</option>
              <option value="Corporación Educacional">Corporación Educacional (PR002)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="alert alert-info d-flex justify-content-between align-items-center mb-4">
        <span className="fw-bold small">Certificado de Avance Oficial:</span>
        <button
          className="btn btn-info text-white btn-sm fw-bold"
          onClick={handleExportExcel}
        >
          Descargar Estado de Pago (.xlsx)
        </button>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="alert alert-warning text-center p-4">
          No hay proyectos registrados para el cliente <strong>{selectedClient}</strong>.
        </div>
      ) : (
        filteredProjects.map((project) => (
          <div className="border rounded p-4 bg-light mb-4" key={project.id}>
            <h5 className="text-info fw-bold mb-1">
              {project.id} - {project.name}
            </h5>
            <p className="text-muted small mb-3">Cliente: {project.client}</p>

            <div className="mb-4">
              <div className="d-flex justify-content-between small fw-bold mb-1">
                <span>Avance Físico Acumulado:</span>
                <span>{project.progress}% completado</span>
              </div>
              <div className="progress" style={{ height: '12px' }}>
                <div
                  className="progress-bar bg-info"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <MetricCard title="Fecha de Inicio" value={project.startDate} />
              </div>
              <div className="col-md-4">
                <MetricCard title="Última Inspección" value={project.lastInspection} />
              </div>
              <div className="col-md-4">
                <MetricCard
                  title="Entrega Estimada"
                  value={project.estimatedDelivery}
                  textColor="text-info"
                />
              </div>
            </div>

            <p className="small text-secondary mb-4">
              <strong>Resumen de avance:</strong> {project.summary}
            </p>

            <h6 className="text-muted small fw-bold text-uppercase mb-3">
              Avances Fotográficos de Obra
            </h6>
            <div className="row g-3">
              <div className="col-6 col-md-3">
                <div className="card h-100 border-0 shadow-sm overflow-hidden">
                  <img
                    src="https://hormigonesalmiceran.es/wp-content/uploads/2025/01/Hormigon-en-construcciones-1024x576.jpg"
                    className="card-img-top"
                    alt="Hormigon"
                    style={{ height: '120px', objectFit: 'cover' }}
                  />
                  <div className="card-body p-2">
                    <p className="card-text small fw-bold text-center mb-0">
                      Estructura de Hormigón
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="card h-100 border-0 shadow-sm overflow-hidden">
                  <img
                    src="https://sermaquiperu.com/wp-content/uploads/2022/06/encofrado-para-losa-1.jpg"
                    className="card-img-top"
                    alt="Encofrado"
                    style={{ height: '120px', objectFit: 'cover' }}
                  />
                  <div className="card-body p-2">
                    <p className="card-text small fw-bold text-center mb-0">
                      Encofrado de Losas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};