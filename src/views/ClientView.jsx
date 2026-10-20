import React from 'react';
import { useProjects } from '../context/ProjectContext';
import { MetricCard } from '../components/MetricCard';

export const ClientView = () => {
  const { projects } = useProjects();
  const mainProject = projects.find(p => p.id === 'PR001') || projects[0];

  const handleSimulateExcel = (msg) => alert(`Modulo Excel: ${msg}`);

  return (
    <div className="card shadow-sm p-4 border-0">
      <h4 className="text-info fw-bold mb-3">Portal de Transparencia - Seguimiento Cliente</h4>

      <div className="alert alert-info d-flex justify-content-between align-items-center mb-4">
        <span className="fw-bold small">Certificado de Avance Oficial:</span>
        <button className="btn btn-info text-white btn-sm fw-bold" onClick={() => handleSimulateExcel('Generando Estado de Pago (.xlsx)...')}>
          Descargar Estado de Pago (.xlsx)
        </button>
      </div>

      <div className="border rounded p-4 bg-light">
        <h5 className="text-info fw-bold mb-1">{mainProject.id} - {mainProject.name}</h5>
        <p className="text-muted small mb-3">Cliente: {mainProject.client}</p>

        <div className="mb-4">
          <div className="d-flex justify-content-between small fw-bold mb-1">
            <span>Avance Físico Acumulado:</span>
            <span>{mainProject.progress}% completado</span>
          </div>
          <div className="progress" style={{ height: '12px' }}>
            <div className="progress-bar bg-info" style={{ width: `${mainProject.progress}%` }}></div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-4"><MetricCard title="Fecha de Inicio" value={mainProject.startDate} /></div>
          <div className="col-md-4"><MetricCard title="Última Inspección" value={mainProject.lastInspection} /></div>
          <div className="col-md-4"><MetricCard title="Entrega Estimada" value={mainProject.estimatedDelivery} textColor="text-info" /></div>
        </div>

        <p className="small text-secondary mb-4"><strong>Resumen de avance:</strong> {mainProject.summary}</p>

        <h6 className="text-muted small fw-bold text-uppercase mb-3">Avances Fotográficos de Obra</h6>
        <div className="row g-3">
          <div className="col-6 col-md-3">
            <div className="card h-100 border-0 shadow-sm overflow-hidden">
              <img src="https://hormigonesalmiceran.es/wp-content/uploads/2025/01/Hormigon-en-construcciones-1024x576.jpg" className="card-img-top" alt="Hormigon" style={{ height: '120px', objectFit: 'cover' }} />
              <div className="card-body p-2"><p className="card-text small fw-bold text-center mb-0">Estructura de Hormigón</p></div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card h-100 border-0 shadow-sm overflow-hidden">
              <img src="https://sermaquiperu.com/wp-content/uploads/2022/06/encofrado-para-losa-1.jpg" className="card-img-top" alt="Encofrado" style={{ height: '120px', objectFit: 'cover' }} />
              <div className="card-body p-2"><p className="card-text small fw-bold text-center mb-0">Encofrado de Losas</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};