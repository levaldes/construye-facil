import React, { useState } from 'react';

export const HomeView = ({ onSelectRole }) => {
  const [inSystem, setInSystem] = useState(false);

  if (!inSystem) {
    return (
      <div className="welcome-card-clean text-center my-auto">
        <div className="mb-4">
          <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill small">
            Plataforma Integrada v2.0
          </span>
        </div>
        <h1 className="fw-extrabold display-4 text-dark mb-3" style={{ letterSpacing: '-1px' }}>
          ConstruyeFácil
        </h1>
        <p className="text-secondary fs-5 mx-auto mb-4" style={{ maxWidth: '580px', lineHeight: '1.6' }}>
          Plataforma integral para la gestión, control presupuestario y seguimiento en tiempo real de proyectos de construcción.
        </p>
        <button 
          className="btn-primary-custom" 
          onClick={() => setInSystem(true)}
        >
          Ingresar al Portal
        </button>
      </div>
    );
  }

  return (
    <div className="py-2">
      <h4 className="fw-bold text-dark mb-4">Selecciona el módulo de acceso según tu rol:</h4>
      
      <div className="row g-4">
        {/* Administrador */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white d-flex flex-column justify-content-between">
            <div>
              <div className="p-3 bg-primary bg-opacity-10 rounded-3 text-primary d-inline-block mb-3 fw-bold">01</div>
              <h5 className="fw-bold text-dark">Administrador</h5>
              <p className="text-muted small">Métricas globales, estados financieros consolidados y alertas de desviación.</p>
            </div>
            <button className="btn btn-primary w-100 fw-bold mt-3 py-2 rounded-3" onClick={() => onSelectRole('admin')}>
              Ingresar al Módulo
            </button>
          </div>
        </div>

        {/* Capataz / Jefe de Obra */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white d-flex flex-column justify-content-between">
            <div>
              <div className="p-3 bg-warning bg-opacity-10 rounded-3 text-warning d-inline-block mb-3 fw-bold">02</div>
              <h5 className="fw-bold text-dark">Jefe de Obra</h5>
              <p className="text-muted small">Registro diario de terreno, avance físico y consumo de insumos en tiempo real.</p>
            </div>
            <button className="btn btn-warning text-white w-100 fw-bold mt-3 py-2 rounded-3" onClick={() => onSelectRole('jefe')}>
              Ingresar al Módulo
            </button>
          </div>
        </div>

        {/* Ingeniero Civil */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white d-flex flex-column justify-content-between">
            <div>
              <div className="p-3 bg-success bg-opacity-10 rounded-3 text-success d-inline-block mb-3 fw-bold">03</div>
              <h5 className="fw-bold text-dark">Ingeniero Civil</h5>
              <p className="text-muted small">Planificación técnica, diseño de precios unitarios (APU) y catálogo maestro.</p>
            </div>
            <button className="btn btn-success w-100 fw-bold mt-3 py-2 rounded-3" onClick={() => onSelectRole('ingeniero')}>
              Ingresar al Módulo
            </button>
          </div>
        </div>

        {/* Portal Cliente */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white d-flex flex-column justify-content-between">
            <div>
              <div className="p-3 bg-info bg-opacity-10 rounded-3 text-info d-inline-block mb-3 fw-bold">04</div>
              <h5 className="fw-bold text-dark">Portal Cliente</h5>
              <p className="text-muted small">Seguimiento del progreso del proyecto, hitos de entrega y avance fotográfico.</p>
            </div>
            <button className="btn btn-info text-white w-100 fw-bold mt-3 py-2 rounded-3" onClick={() => onSelectRole('cliente')}>
              Ingresar al Módulo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};  